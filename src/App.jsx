// Componente principal: monta a página juntando todas as seções.

import { useEffect } from 'react';
import Cabecalho from './components/Cabecalho.jsx';
import Hero from './components/Hero.jsx';
import Sobre from './components/Sobre.jsx';
import Stack from './components/Stack.jsx';
import Projeto from './components/Projeto.jsx';
import Contato from './components/Contato.jsx';
import Rodape from './components/Rodape.jsx';
import FundoParticulas from './components/FundoParticulas.jsx';
import BarraProgresso from './components/BarraProgresso.jsx';
import BotaoTopo from './components/BotaoTopo.jsx';
import Cursor from './components/Cursor.jsx';
import { projetos } from './dados/conteudo.js';
import { iniciarRolagem } from './lib/rolagem.js';

export default function App() {
  // Liga a rolagem suave quando a página abre e desliga quando ela fecha.
  useEffect(() => iniciarRolagem(), []);

  return (
    <>
      <BarraProgresso />
      <Cursor />
      <FundoParticulas />
      <Cabecalho />

      <main>
        <Hero />
        <Sobre />
        <Stack />
        {projetos.map((projeto) => (
          <Projeto key={projeto.id} projeto={projeto} />
        ))}
        <Contato />
      </main>

      <Rodape />
      <BotaoTopo />
    </>
  );
}
