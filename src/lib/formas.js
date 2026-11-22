// Formas 3D feitas de partículas. Cada forma é um conjunto de posições (x, y, z)
// e cores (r, g, b) para N pontos. As partículas se movem de uma forma para outra
// conforme a seção da página muda.

// Converte uma cor hexadecimal (0xRRGGBB) em [r, g, b] de 0 a 1.
function hex(h) {
  return [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255];
}

const AZUL = hex(0x5b6bff);
const OSSO = hex(0xecebe5);
const LARANJA = hex(0xff6b3d);
const GELO = hex(0xb9c0ff);

// Mistura duas cores; t vai de 0 (primeira) a 1 (segunda).
function misturar(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

// Degrau suave entre a e b.
function suave(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// Grava um vetor de 3 valores na posição i de um array plano.
function gravar(arr, i, v) {
  arr[i * 3] = v[0];
  arr[i * 3 + 1] = v[1];
  arr[i * 3 + 2] = v[2];
}

function novaForma(n) {
  return { p: new Float32Array(n * 3), c: new Float32Array(n * 3) };
}

// Aplica um brilho aleatório a uma cor, para os pontos não ficarem todos iguais.
function comBrilho(cor, minimo) {
  const k = minimo + (1 - minimo) * Math.random();
  return [cor[0] * k, cor[1] * k, cor[2] * k];
}

// Forma 0: nuvem esférica (início, "Sobre" e "Stack").
function nuvem(n) {
  const forma = novaForma(n);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const q = Math.sqrt(1 - u * u);
    const raio = 2.2 + (Math.random() - 0.5) * 0.5 + Math.sin(theta * 3 + u * 5) * 0.12;
    gravar(forma.p, i, [raio * q * Math.cos(theta), raio * u, raio * q * Math.sin(theta)]);
    gravar(forma.c, i, comBrilho(misturar(AZUL, OSSO, Math.pow(Math.random(), 2)), 0.55));
  }
  return forma;
}

// Forma 1: cérebro, feito de dois hemisférios com dobras (projeto NeuroClass).
function cerebro(n) {
  const forma = novaForma(n);
  for (let i = 0; i < n; i++) {
    const lado = Math.random() < 0.5 ? -1 : 1;
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const q = Math.sqrt(1 - u * u);
    const dx = q * Math.cos(theta);
    const dy = u;
    const dz = q * Math.sin(theta);
    // As "dobras" do cérebro vêm de uma pequena variação no raio.
    const dobra = 1 + Math.sin(dx * 7 + dy * 5) * Math.sin(dz * 6 + dx * 3) * 0.09;
    const x = lado * 0.62 + dx * 1.05 * dobra;
    const y = dy * 1.2 * dobra;
    const z = dz * 1.75 * dobra;
    gravar(forma.p, i, [x, y, z]);
    const t = Math.min(1, Math.max(0, (y + 1.3) / 2.6));
    // Uns poucos pontos laranja funcionam como "faíscas" de atenção.
    const cor = Math.random() < 0.05 ? LARANJA : misturar(AZUL, GELO, t);
    gravar(forma.c, i, comBrilho(cor, 0.6));
  }
  return forma;
}

// Altura da carroceria do carro em cada posição x (perfil lateral).
function alturaDoCarro(x) {
  const t = x / 2.4;
  const cabine = Math.exp(-Math.pow(Math.abs((t + 0.15) / 0.36), 3));
  let h = 0.42 + 0.78 * cabine;
  h *= 1 - 0.3 * suave(0.75, 1, t); // capô mais baixo na frente
  h *= 1 - 0.15 * suave(0.8, 1, -t); // porta-malas mais baixo atrás
  return h;
}

// Forma 2: carro (projeto da oficina Castillo).
function carro(n) {
  const forma = novaForma(n);
  const largura = 0.78;
  const deslocamentoY = -0.6;
  // A parte de cima da cabine é mais estreita que a lataria, como num carro de verdade.
  const meiaLargura = (altura) => largura * (1 - 0.3 * Math.min(1, Math.max(0, (altura - 0.42) / 0.78)));
  for (let i = 0; i < n; i++) {
    const sorteio = Math.random();
    let x;
    let y;
    let z;
    let cor;
    if (sorteio < 0.5) {
      // Teto e capô
      x = (Math.random() * 2 - 1) * 2.4;
      y = alturaDoCarro(x);
      z = (Math.random() * 2 - 1) * meiaLargura(y);
      cor = misturar(LARANJA, OSSO, Math.pow(Math.random(), 4) * 0.7);
    } else if (sorteio < 0.82) {
      // Laterais
      x = (Math.random() * 2 - 1) * 2.4;
      y = 0.14 + Math.random() * (alturaDoCarro(x) - 0.14);
      z = (Math.random() < 0.5 ? -1 : 1) * meiaLargura(y);
      cor = misturar(LARANJA, [1, 0.35, 0.2], Math.random());
    } else {
      // Rodas
      const angulo = Math.random() * Math.PI * 2;
      const centroX = Math.random() < 0.5 ? -1.4 : 1.45;
      const raio = 0.42 + (Math.random() - 0.5) * 0.06;
      x = centroX + Math.cos(angulo) * raio;
      y = 0.1 + Math.sin(angulo) * raio;
      z = (Math.random() < 0.5 ? -1 : 1) * (largura + 0.02 + Math.random() * 0.18);
      cor = OSSO;
    }
    gravar(forma.p, i, [
      x + (Math.random() - 0.5) * 0.03,
      y + deslocamentoY + (Math.random() - 0.5) * 0.03,
      z,
    ]);
    gravar(forma.c, i, comBrilho(cor, 0.65));
  }
  return forma;
}

// Forma 3: anel que junta o azul e o laranja (seção de contato).
function anel(n) {
  const forma = novaForma(n);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const raioMaior = 2.0;
    const raioMenor = 0.55 * (0.6 + 0.4 * Math.random());
    const distancia = raioMaior + raioMenor * Math.cos(v);
    gravar(forma.p, i, [distancia * Math.cos(u), distancia * Math.sin(u), raioMenor * Math.sin(v)]);
    gravar(forma.c, i, comBrilho(misturar(AZUL, LARANJA, (Math.sin(u) + 1) / 2), 0.6));
  }
  return forma;
}

// Cria todas as formas, na ordem usada pelo atributo data-forma das seções.
export function criarFormas(n) {
  return [nuvem(n), cerebro(n), carro(n), anel(n)];
}

// Inclinação inicial de cada forma, para ela aparecer de um bom ângulo.
export const rotacoesBase = [
  { ry: 0, rx: 0.12, rz: 0 },
  { ry: 1.25, rx: 0.1, rz: 0 },
  { ry: -0.5, rx: 0.12, rz: 0 },
  { ry: 0.3, rx: 1.15, rz: 0.3 },
];
