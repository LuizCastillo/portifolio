// Fundo 3D: uma nuvem de partículas (Three.js) que muda de forma conforme a seção
// da página que está na tela. Também reage ao mouse, à rolagem e ao efeito de rebobinar.

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { criarFormas, rotacoesBase } from '../lib/formas.js';
import { aoRebobinar, obterDirecao, prefereMenosMovimento } from '../lib/rolagem.js';

// Código dos "shaders": desenham cada ponto como um círculo suave com a cor do ponto.
const SHADER_VERTICE = `
  attribute vec3 aCor;
  uniform float uTamanho;
  uniform float uProporcao;
  varying vec3 vCor;
  void main() {
    vCor = aCor;
    vec4 posicao = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uTamanho * uProporcao * (1.0 / -posicao.z);
    gl_Position = projectionMatrix * posicao;
  }
`;

const SHADER_FRAGMENTO = `
  varying vec3 vCor;
  void main() {
    float distancia = length(gl_PointCoord - 0.5);
    if (distancia > 0.5) discard;
    float alfa = smoothstep(0.5, 0.0, distancia);
    gl_FragColor = vec4(vCor, alfa * 0.85);
  }
`;

export default function FundoParticulas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduzir = prefereMenosMovimento();
    const ehTelaFina = window.matchMedia('(pointer: fine)').matches;

    // Se o aparelho não suportar WebGL, o fundo simplesmente não aparece.
    let renderizador;
    try {
      renderizador = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (erro) {
      canvas.style.display = 'none';
      return undefined;
    }

    // Menos partículas em telas pequenas, para manter a fluidez no celular.
    const total = window.innerWidth < 700 ? 3600 : 7500;
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderizador.setClearColor(0x000000, 0);

    const cena = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7.5;
    const grupo = new THREE.Group();
    cena.add(grupo);

    // Estado atual das partículas (começa na forma 0) e formas de destino.
    const formas = criarFormas(total);
    const posicoes = new Float32Array(formas[0].p);
    const cores = new Float32Array(formas[0].c);
    // Cada partícula se move numa velocidade um pouco diferente, o que deixa a transformação orgânica.
    const velocidades = new Float32Array(total);
    for (let i = 0; i < total; i++) velocidades[i] = 0.018 + Math.random() * 0.05;

    const geometria = new THREE.BufferGeometry();
    geometria.setAttribute('position', new THREE.BufferAttribute(posicoes, 3));
    geometria.setAttribute('aCor', new THREE.BufferAttribute(cores, 3));
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTamanho: { value: 24 },
        uProporcao: { value: renderizador.getPixelRatio() },
      },
      vertexShader: SHADER_VERTICE,
      fragmentShader: SHADER_FRAGMENTO,
    });
    grupo.add(new THREE.Points(geometria, material));

    // Variáveis que mudam durante a animação.
    let formaAtual = 0; // índice da forma de destino
    let escalaBase = 0.95;
    let pulso = 0; // aumenta ou diminui a forma momentaneamente
    let giro = 0; // impulso extra de rotação
    let mouseX = 0;
    let mouseY = 0;

    // Efeito de ida e volta: descendo, a forma se expande e gira para um lado;
    // subindo, ela se contrai e gira para o outro. "forte" é a chegada ao topo.
    const desfazerRebobinar = aoRebobinar((direcao, forte) => {
      if (reduzir) return;
      pulso = direcao > 0 ? 0.14 : -0.32;
      giro = direcao > 0 ? 0.03 : -0.11;
      if (forte) {
        pulso = -0.45;
        giro = -0.2;
      }
    });

    // Observa as seções: a que estiver no meio da tela define a forma.
    const secoes = Array.from(document.querySelectorAll('[data-forma]'));
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const nova = parseInt(entrada.target.getAttribute('data-forma'), 10);
          if (nova !== formaAtual) {
            formaAtual = nova;
            if (!reduzir) {
              pulso = obterDirecao() > 0 ? 0.14 : -0.32;
              giro = obterDirecao() > 0 ? 0.03 : -0.11;
            }
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    secoes.forEach((secao) => observador.observe(secao));

    // Ajusta a câmera e a posição da forma ao tamanho da janela.
    // Em telas largas a forma fica à direita; em telas estreitas, centralizada atrás do texto.
    function ajustarTamanho() {
      const largura = window.innerWidth;
      const altura = window.innerHeight;
      renderizador.setSize(largura, altura, false);
      camera.aspect = largura / altura;
      camera.updateProjectionMatrix();
      const metadeAltura = Math.tan((45 * Math.PI) / 360) * camera.position.z;
      const metadeLargura = metadeAltura * camera.aspect;
      if (camera.aspect > 1.15) {
        grupo.position.x = metadeLargura * 0.42;
        escalaBase = 0.95;
      } else {
        grupo.position.x = 0;
        escalaBase = 0.8;
      }
      grupo.scale.setScalar(escalaBase);
    }
    window.addEventListener('resize', ajustarTamanho);
    ajustarTamanho();

    const aoMoverMouse = (evento) => {
      mouseX = (evento.clientX / window.innerWidth) * 2 - 1;
      mouseY = (evento.clientY / window.innerHeight) * 2 - 1;
    };
    if (ehTelaFina) window.addEventListener('pointermove', aoMoverMouse, { passive: true });

    // Laço de animação: roda a cada quadro.
    let idAnimacao = 0;
    let ultimoTempo = performance.now();
    function quadro(agora) {
      idAnimacao = requestAnimationFrame(quadro);
      if (document.hidden) {
        ultimoTempo = agora;
        return;
      }
      const delta = Math.min((agora - ultimoTempo) / 1000, 0.05);
      ultimoTempo = agora;
      const tempo = agora / 1000;
      // Fator que mantém a velocidade igual em qualquer taxa de quadros.
      const k = reduzir ? 1 : Math.min(delta * 60, 3);

      // Aproxima cada partícula da posição e da cor da forma de destino.
      const destino = formas[formaAtual];
      for (let i = 0; i < total; i++) {
        const j = i * 3;
        const passo = Math.min(1, velocidades[i] * k);
        posicoes[j] += (destino.p[j] - posicoes[j]) * passo;
        posicoes[j + 1] += (destino.p[j + 1] - posicoes[j + 1]) * passo;
        posicoes[j + 2] += (destino.p[j + 2] - posicoes[j + 2]) * passo;
        cores[j] += (destino.c[j] - cores[j]) * passo;
        cores[j + 1] += (destino.c[j + 1] - cores[j + 1]) * passo;
        cores[j + 2] += (destino.c[j + 2] - cores[j + 2]) * passo;
      }
      geometria.attributes.position.needsUpdate = true;
      geometria.attributes.aCor.needsUpdate = true;

      // Rotação: balanço suave + mouse + posição da rolagem.
      const base = rotacoesBase[formaAtual];
      const balanco = reduzir ? 0 : Math.sin(tempo * 0.35) * 0.3;
      const rolagem = reduzir ? 0 : window.scrollY * 0.0004;
      const suavizacao = reduzir ? 1 : 0.05;
      grupo.rotation.y += (base.ry + balanco + mouseX * 0.35 + rolagem - grupo.rotation.y) * suavizacao;
      grupo.rotation.x += (base.rx + mouseY * 0.15 - grupo.rotation.x) * suavizacao;
      grupo.rotation.z += (base.rz - grupo.rotation.z) * suavizacao;

      // Pulso e giro do efeito de rebobinar, que vão diminuindo sozinhos.
      pulso *= Math.pow(0.92, k);
      giro *= Math.pow(0.94, k);
      grupo.rotation.y += giro * k;
      grupo.scale.setScalar(escalaBase * (1 + pulso));
      material.uniforms.uTamanho.value = 24 * (1 + Math.abs(pulso) * 1.2);

      renderizador.render(cena, camera);
    }
    idAnimacao = requestAnimationFrame(quadro);

    // Limpeza: remove tudo o que foi criado quando o componente sai da tela.
    return () => {
      cancelAnimationFrame(idAnimacao);
      window.removeEventListener('resize', ajustarTamanho);
      window.removeEventListener('pointermove', aoMoverMouse);
      observador.disconnect();
      desfazerRebobinar();
      geometria.dispose();
      material.dispose();
      renderizador.dispose();
    };
  }, []);

  return <canvas id="gl" className="fundo-3d" ref={canvasRef} aria-hidden="true" />;
}
