// Ponto de entrada: coloca o aplicativo React dentro da div "root" do index.html.
// O React.StrictMode não é usado porque o fundo 3D cria um contexto WebGL
// que não deve ser montado duas vezes durante o desenvolvimento.

import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
