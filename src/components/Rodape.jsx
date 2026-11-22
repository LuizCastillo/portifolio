// Rodapé com o ano atual e os créditos das ferramentas.

import { pessoa, rodape } from '../dados/conteudo.js';

export default function Rodape() {
  return (
    <footer>
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} {pessoa.nome} · {rodape.esquerda}
        </span>
        <span>{rodape.direita}</span>
      </div>
    </footer>
  );
}
