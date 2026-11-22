// Anel que acompanha o mouse (só aparece em aparelhos com mouse e sem "reduzir movimento").

import { useEffect, useRef } from 'react';
import { prefereMenosMovimento } from '../lib/rolagem.js';

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const temMouse = window.matchMedia('(pointer: fine)').matches;
    if (!temMouse || prefereMenosMovimento()) return undefined;

    const anel = ref.current;
    let alvoX = 0;
    let alvoY = 0;
    let x = 0;
    let y = 0;
    let idAnimacao = 0;

    const aoMover = (evento) => {
      alvoX = evento.clientX;
      alvoY = evento.clientY;
      anel.classList.add('on');
    };

    // Aumenta o anel ao passar por links, botões e quadros de projeto.
    const aoEntrar = (evento) => {
      if (evento.target.closest('a, button, .shot')) anel.classList.add('big');
    };
    const aoSair = (evento) => {
      if (evento.target.closest('a, button, .shot')) anel.classList.remove('big');
    };

    // O anel segue o mouse com um pequeno atraso, o que deixa o movimento suave.
    const animar = () => {
      x += (alvoX - x) * 0.2;
      y += (alvoY - y) * 0.2;
      anel.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      idAnimacao = requestAnimationFrame(animar);
    };
    idAnimacao = requestAnimationFrame(animar);

    window.addEventListener('pointermove', aoMover, { passive: true });
    document.addEventListener('pointerover', aoEntrar);
    document.addEventListener('pointerout', aoSair);

    return () => {
      cancelAnimationFrame(idAnimacao);
      window.removeEventListener('pointermove', aoMover);
      document.removeEventListener('pointerover', aoEntrar);
      document.removeEventListener('pointerout', aoSair);
    };
  }, []);

  return <div className="ring" ref={ref} aria-hidden="true" />;
}
