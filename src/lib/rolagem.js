// Controle de rolagem do site: rolagem suave (Lenis), direção do scroll
// e o efeito de "rebobinar" usado quando o visitante volta para o topo.

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null; // instância da rolagem suave (fica nula se o visitante prefere menos movimento)
let direcao = 1; // 1 = descendo, -1 = subindo
let ultimoY = 0;
const ouvintesRebobinar = new Set();

// Respeita a configuração "reduzir movimento" do aparelho.
export function prefereMenosMovimento() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function obterDirecao() {
  return direcao;
}

// Quem quiser reagir ao efeito de rebobinar (as partículas, por exemplo) se registra aqui.
// Devolve uma função para cancelar o registro.
export function aoRebobinar(funcao) {
  ouvintesRebobinar.add(funcao);
  return () => ouvintesRebobinar.delete(funcao);
}

// Dispara o efeito. "dir" é a direção (-1 = voltando) e "forte" indica o efeito maior de chegada ao topo.
export function rebobinar(dir, forte = false) {
  ouvintesRebobinar.forEach((funcao) => funcao(dir, forte));
}

// Liga a rolagem suave e o controle de direção. Devolve a função que desfaz tudo.
export function iniciarRolagem() {
  ultimoY = window.scrollY;

  const aoRolar = () => {
    const y = window.scrollY;
    if (Math.abs(y - ultimoY) > 2) {
      direcao = y > ultimoY ? 1 : -1;
      ultimoY = y;
    }
  };
  window.addEventListener('scroll', aoRolar, { passive: true });

  let quadro = null;
  if (!prefereMenosMovimento()) {
    lenis = new Lenis({ lerp: 0.1 });
    // Mantém o ScrollTrigger sincronizado com a rolagem suave.
    lenis.on('scroll', ScrollTrigger.update);
    quadro = (tempo) => lenis.raf(tempo * 1000);
    gsap.ticker.add(quadro);
    gsap.ticker.lagSmoothing(0);
  }

  return () => {
    window.removeEventListener('scroll', aoRolar);
    if (quadro) gsap.ticker.remove(quadro);
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  };
}

// Rola até uma seção pelo id.
export function irPara(id) {
  const elemento = document.getElementById(id);
  if (!elemento) return;
  if (id === 'topo') rebobinar(-1, true);
  if (lenis) {
    lenis.scrollTo(elemento, { offset: id === 'topo' ? 0 : -8, duration: 1.4 });
  } else {
    elemento.scrollIntoView({ behavior: prefereMenosMovimento() ? 'auto' : 'smooth', block: 'start' });
  }
}

// Volta ao início da página com o efeito de rebobinar.
export function subirAoTopo() {
  rebobinar(-1, true);
  if (lenis) {
    lenis.scrollTo(0, { duration: 2, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: 0, behavior: prefereMenosMovimento() ? 'auto' : 'smooth' });
  }
}
