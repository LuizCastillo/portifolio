// Envolve um elemento e anima a entrada dele ao rolar a página.
// Descendo, o elemento sobe para o lugar. Subindo, ele desce de cima para o lugar.
// A animação acontece toda vez que o elemento volta para a tela.

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefereMenosMovimento } from '../lib/rolagem.js';

gsap.registerPlugin(ScrollTrigger);

// "como" define a tag HTML usada (div, p, h2, section...). O padrão é div.
export default function Revelar({ como: Tag = 'div', className, children, ...resto }) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefereMenosMovimento()) return undefined;
    const elemento = ref.current;

    const entrar = (deslocamento) =>
      gsap.fromTo(
        elemento,
        { y: deslocamento },
        { y: 0, duration: 0.9, ease: 'power3.out', overwrite: 'auto' },
      );

    const gatilho = ScrollTrigger.create({
      trigger: elemento,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => entrar(44), // entrando por baixo (descendo a página)
      onEnterBack: () => entrar(-44), // entrando por cima (subindo a página)
    });

    return () => {
      gatilho.kill();
      gsap.set(elemento, { clearProps: 'transform' });
    };
  }, []);

  return (
    <Tag ref={ref} className={className} {...resto}>
      {children}
    </Tag>
  );
}
