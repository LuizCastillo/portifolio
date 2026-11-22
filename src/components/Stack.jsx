// Seção "Stack": faixa em movimento, tecnologias por área e o que estou estudando.

import Revelar from './Revelar.jsx';
import { stack } from '../dados/conteudo.js';

export default function Stack() {
  // A lista é repetida duas vezes para a faixa poder rodar em ciclo sem pausa.
  const palavras = [...stack.faixa, ...stack.faixa];

  return (
    <section id="stack" data-forma="0">
      <div className="wrap">
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {palavras.map((palavra, indice) => (
              <span key={`${palavra}-${indice}`}>{palavra}</span>
            ))}
          </div>
        </div>

        <Revelar como="p" className="eyebrow">
          Stack
        </Revelar>

        <div className="stack-grid">
          {stack.grupos.map((grupo) => (
            <Revelar key={grupo.titulo}>
              <h3>{grupo.titulo}</h3>
              <ul>
                {grupo.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Revelar>
          ))}
        </div>

        <Revelar className="studying">
          <h3>Estudando agora</h3>
          <div className="tags">
            {stack.estudando.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Revelar>
      </div>
    </section>
  );
}
