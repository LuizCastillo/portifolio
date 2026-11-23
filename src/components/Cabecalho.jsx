// Cabeçalho fixo com o nome e o menu de navegação.

import { menu, pessoa } from '../dados/conteudo.js';
import { irPara } from '../lib/rolagem.js';

export default function Cabecalho() {
  // Rola até a seção sem alterar o endereço da página.
  const navegar = (evento, id) => {
    evento.preventDefault();
    irPara(id);
  };

  return (
    <header className="top">
      <div className="wrap">
        <a className="mark" href="#topo" onClick={(e) => navegar(e, 'topo')}>
          {pessoa.nomeCurto}
        </a>
        <nav className="nav" aria-label="Seções">
          {menu.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => navegar(e, item.id)}>
              {item.rotulo}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
