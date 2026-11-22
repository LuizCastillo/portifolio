// Seção "Sobre mim": texto de apresentação e quadro com dados rápidos.

import Revelar from './Revelar.jsx';
import { sobre } from '../dados/conteudo.js';

export default function Sobre() {
  return (
    <section id="sobre" data-forma="0">
      <div className="wrap about-grid">
        <div className="col">
          <Revelar como="p" className="eyebrow">
            Sobre mim
          </Revelar>
          <Revelar como="h2">{sobre.titulo}</Revelar>
          {sobre.paragrafos.map((texto) => (
            <Revelar como="p" className="lead" key={texto}>
              {texto}
            </Revelar>
          ))}
        </div>
        <Revelar como="dl" className="dl">
          {sobre.quadro.map((item) => (
            <div key={item.titulo}>
              <dt>{item.titulo}</dt>
              <dd>{item.texto}</dd>
            </div>
          ))}
        </Revelar>
      </div>
    </section>
  );
}
