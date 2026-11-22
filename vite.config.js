import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração do Vite: apenas o plugin do React é necessário.
export default defineConfig({
  plugins: [react()],
});
