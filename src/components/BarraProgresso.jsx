// Linha fina no topo da tela que cresce conforme a página é rolada.

import { useEffect, useRef } from 'react';

export default function BarraProgresso() {
  const ref = useRef(null);

  useEffect(() => {
    const atualizar = () => {
      const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progresso = alturaTotal > 0 ? Math.min(1, Math.max(0, window.scrollY / alturaTotal)) : 0;
      ref.current.style.transform = `scaleX(${progresso})`;
    };
    window.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar);
    atualizar();
    return () => {
      window.removeEventListener('scroll', atualizar);
      window.removeEventListener('resize', atualizar);
    };
  }, []);

  return <div className="progress" ref={ref} />;
}
