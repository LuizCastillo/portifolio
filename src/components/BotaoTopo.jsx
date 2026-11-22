// Botão flutuante "Topo": aparece depois de rolar um pouco e volta ao início com o efeito de rebobinar.

import { useEffect, useState } from 'react';
import { subirAoTopo } from '../lib/rolagem.js';

export default function BotaoTopo() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const verificar = () => setVisivel(window.scrollY > 700);
    window.addEventListener('scroll', verificar, { passive: true });
    verificar();
    return () => window.removeEventListener('scroll', verificar);
  }, []);

  return (
    <button
      className={`totop${visivel ? ' show' : ''}`}
      type="button"
      aria-label="Voltar ao topo"
      onClick={subirAoTopo}
      tabIndex={visivel ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
      <em>Topo</em>
    </button>
  );
}
