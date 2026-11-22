// Seção de contato: GitHub, LinkedIn, WhatsApp e e-mail (com botão de copiar).

import { useRef, useState } from 'react';
import Revelar from './Revelar.jsx';
import { contato } from '../dados/conteudo.js';

export default function Contato() {
  const [mensagemBotao, setMensagemBotao] = useState('Copiar');
  const emailRef = useRef(null);

  // Mostra um aviso rápido no botão e depois volta ao texto normal.
  const avisar = (mensagem) => {
    setMensagemBotao(mensagem);
    setTimeout(() => setMensagemBotao('Copiar'), 1800);
  };

  // Seleciona o texto do e-mail, caso o navegador não deixe copiar automaticamente.
  const selecionarEmail = () => {
    const faixa = document.createRange();
    faixa.selectNodeContents(emailRef.current);
    const selecao = window.getSelection();
    selecao.removeAllRanges();
    selecao.addRange(faixa);
    avisar('Selecionado');
  };

  const copiarEmail = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(contato.email).then(() => avisar('Copiado'), selecionarEmail);
    } else {
      selecionarEmail();
    }
  };

  return (
    <section className="contact" id="contato" data-forma="3">
      <div className="wrap">
        <div className="col">
          <Revelar como="p" className="eyebrow">
            Contato
          </Revelar>
          <Revelar como="h2">{contato.titulo}</Revelar>
          <Revelar como="p" className="lead">
            {contato.texto}
          </Revelar>
        </div>

        <Revelar className="contact-list">
          <a href={contato.github.link} target="_blank" rel="noopener noreferrer">
            <span className="k">GitHub</span>
            <span className="v">{contato.github.texto} ↗</span>
          </a>
          <a href={contato.linkedin.link} target="_blank" rel="noopener noreferrer">
            <span className="k">LinkedIn</span>
            <span className="v">{contato.linkedin.texto} ↗</span>
          </a>
          <a href={contato.whatsapp.link} target="_blank" rel="noopener noreferrer">
            <span className="k">WhatsApp</span>
            <span className="v">{contato.whatsapp.texto} ↗</span>
          </a>
          <div>
            <span className="k">E-mail</span>
            <span className="v mail">
              <span ref={emailRef}>{contato.email}</span>
              <button className="copy" type="button" onClick={copiarEmail}>
                {mensagemBotao}
              </button>
            </span>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
