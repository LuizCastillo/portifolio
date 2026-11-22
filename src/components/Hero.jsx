// Seção inicial: nome animado letra por letra, foto e apresentação.

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Revelar from './Revelar.jsx';
import { pessoa } from '../dados/conteudo.js';
import { prefereMenosMovimento, rebobinar } from '../lib/rolagem.js';

gsap.registerPlugin(ScrollTrigger);

// Nome grande. Cada letra é um <span> para poder ser animada separadamente.
function NomeAnimado({ linhas }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (prefereMenosMovimento()) return undefined;

    const contexto = gsap.context(() => {
      // Na primeira visita, as letras sobem para o lugar.
      gsap.from('.ch', { yPercent: 115, duration: 1.2, ease: 'expo.out', stagger: 0.045, delay: 0.15 });

      // Ao voltar para o topo, as letras caem de cima, no sentido contrário.
      ScrollTrigger.create({
        trigger: document.getElementById('topo'),
        start: 'top top',
        end: 'bottom 40%',
        onEnterBack: () => {
          gsap.fromTo(
            '.ch',
            { yPercent: -115 },
            { yPercent: 0, duration: 1, ease: 'expo.out', stagger: { each: 0.03, from: 'end' }, overwrite: 'auto' },
          );
          rebobinar(-1, true);
        },
      });
    }, ref);

    // Desfaz as animações e os gatilhos se o componente sair da tela.
    return () => contexto.revert();
  }, []);

  return (
    <h1 className="name" ref={ref} aria-label={linhas.join(' ')}>
      {linhas.map((linha) => (
        <span className="line" key={linha}>
          <span className="word" aria-hidden="true">
            {linha.split('').map((letra, indice) => (
              <span className="ch" key={`${linha}-${indice}`}>
                {letra}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="topo" data-forma="0">
      <div className="wrap">
        <Revelar como="p" className="eyebrow">
          {pessoa.etiqueta}
        </Revelar>
        <NomeAnimado linhas={pessoa.linhasDoNome} />
        <Revelar className="who">
          <span className="portrait">
            <img src={pessoa.foto} alt={pessoa.textoDaFoto} width="132" height="165" />
          </span>
          <p className="lead">{pessoa.apresentacao}</p>
        </Revelar>
        <Revelar como="span" className="scrollcue">
          <i />
          Role para ver
        </Revelar>
      </div>
    </section>
  );
}
