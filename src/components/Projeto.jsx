// Seção de um projeto. Os mesmos componentes servem para o NeuroClass e para a Castillo;
// o que muda vem do arquivo de conteúdo.

import { useState } from 'react';
import Revelar from './Revelar.jsx';
import { prefereMenosMovimento } from '../lib/rolagem.js';

// Quadro que parece a janela de um navegador e se inclina em 3D seguindo o mouse.
// Se houver "imagem", mostra o print; senão, mostra um aviso do que falta enviar.
function CartaoTela({ legenda, imagem }) {
  const [estilo, setEstilo] = useState(undefined);

  const inclinar = (evento) => {
    // No toque (celular) não há mouse, então não inclina.
    if (prefereMenosMovimento() || evento.pointerType === 'touch') return;
    const caixa = evento.currentTarget.getBoundingClientRect();
    const px = (evento.clientX - caixa.left) / caixa.width - 0.5;
    const py = (evento.clientY - caixa.top) / caixa.height - 0.5;
    setEstilo({
      transform: `rotateY(${(px * 14).toFixed(2)}deg) rotateX(${(-py * 14).toFixed(2)}deg) translateZ(10px)`,
    });
  };

  return (
    <Revelar>
      <div
        className="shot tilt"
        style={estilo}
        onPointerMove={inclinar}
        onPointerLeave={() => setEstilo(undefined)}
      >
        <div className="shot-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="shot-body">
          {imagem ? (
            <img className="shot-img" src={imagem} alt={legenda} loading="lazy" />
          ) : (
            <span className="ph">ENVIAR: {legenda}</span>
          )}
        </div>
      </div>
    </Revelar>
  );
}

export default function Projeto({ projeto }) {
  return (
    <section id={projeto.id} data-forma={projeto.forma}>
      <div className="wrap">
        <div className="col">
          <Revelar como="p" className="eyebrow">
            {projeto.rotulo}
          </Revelar>
          <Revelar como="h2">{projeto.titulo}</Revelar>
          <Revelar como="p" className="lead">
            {projeto.descricao}
          </Revelar>
          <Revelar className="tags">
            {projeto.tecnologias.map((tecnologia) => (
              <span key={tecnologia}>{tecnologia}</span>
            ))}
          </Revelar>
          <Revelar className="links">
            {projeto.github && (
              <a className="btn" href={projeto.github} target="_blank" rel="noopener noreferrer">
                Ver código no GitHub ↗
              </a>
            )}
            {projeto.linkSite ? (
              <a className="btn" href={projeto.linkSite} target="_blank" rel="noopener noreferrer">
                Abrir o site ↗
              </a>
            ) : (
              <span className="ph">ENVIAR: link do site no ar</span>
            )}
          </Revelar>
        </div>

        <Revelar como="dl" className="facts">
          {projeto.fatos.map((fato) => (
            <div key={fato.titulo}>
              <dt>{fato.titulo}</dt>
              <dd>{fato.texto}</dd>
            </div>
          ))}
        </Revelar>

        <div className="shots">
          {projeto.telas.map((tela) => (
            <CartaoTela key={tela.legenda} legenda={tela.legenda} imagem={tela.imagem} />
          ))}
        </div>
      </div>
    </section>
  );
}
