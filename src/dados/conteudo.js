// Todo o conteúdo do site fica aqui, separado dos componentes.
// Para trocar um texto, um link ou uma imagem, basta editar este arquivo.

export const pessoa = {
  nome: 'Luiz Castillo',
  linhasDoNome: ['Luiz', 'Castillo'],
  etiqueta: 'Técnico em Informática para Internet · Etec Albert Einstein',
  apresentacao:
    'Desenvolvedor full stack em formação, de São Paulo. Eu desenho a arquitetura, construo a interface e coloco no ar.',
  foto: '/foto-luiz.jpg',
  textoDaFoto: 'Foto de Luiz Castillo sorrindo, de camisa azul clara',
};

// Itens do menu do cabeçalho (o "id" aponta para a seção da página).
export const menu = [
  { id: 'sobre', rotulo: 'Sobre' },
  { id: 'stack', rotulo: 'Stack' },
  { id: 'neuroclass', rotulo: 'Projetos' },
  { id: 'contato', rotulo: 'Contato' },
];

export const sobre = {
  titulo: 'Front-end, back-end e documentação.',
  paragrafos: [
    'Estou no 3º ano do curso Técnico em Informática para Internet (Infonet). No front-end eu trabalho com React, TypeScript e Tailwind. No back-end, com Python, FastAPI, Node.js e bancos de dados como PostgreSQL e Supabase.',
    'Gosto de aprender na prática, transformar ideias em projetos e resolver problemas reais. Em cada projeto eu também escrevo a documentação: requisitos, diagramas e manual técnico.',
  ],
  quadro: [
    { titulo: 'Formação', texto: 'Técnico em Informática para Internet, 3º Infonet' },
    { titulo: 'Escola', texto: 'Etec Albert Einstein' },
    { titulo: 'Foco', texto: 'Front-end, back-end, arquitetura de sistemas e documentação' },
    { titulo: 'Cidade', texto: 'São Paulo, SP' },
  ],
};

export const stack = {
  // Palavras que passam na faixa em movimento.
  faixa: [
    'React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Supabase', 'Vite',
    'Tailwind', 'Three.js', 'Figma', 'Vercel', 'Railway',
  ],
  grupos: [
    { titulo: 'Front-end', itens: ['React e TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js'] },
    { titulo: 'Back-end e dados', itens: ['Python e FastAPI', 'Node.js e Express', 'PostgreSQL', 'Supabase'] },
    { titulo: 'Deploy', itens: ['Vercel', 'Railway', 'Render', 'Git e GitHub'] },
    { titulo: 'Design e documentação', itens: ['Figma', 'DER e UML', 'Documento de requisitos', 'LGPD'] },
  ],
  estudando: ['Python', 'Node.js', 'APIs e integração entre sistemas', 'Deploy'],
};

// Projetos em destaque. "forma" é a forma 3D que aparece ao fundo enquanto a seção está na tela.
// Quando "linkSite" for null, a página mostra um aviso "ENVIAR" no lugar do link.
// Em "telas", troque a "legenda" por "imagem: '/nome-do-arquivo.png'" (arquivo na pasta public).
export const projetos = [
  {
    id: 'neuroclass',
    forma: 1,
    rotulo: 'Trabalho de conclusão de curso',
    titulo: 'NeuroClass',
    descricao:
      'Plataforma web educacional sobre TDAH para estudantes, educadores e famílias. Tem quizzes em níveis, cadastro e login, recuperação de senha, perfil e conteúdo baseado em fontes reais como CDC, DSM-5 e CHADD.',
    tecnologias: ['React', 'Vite', 'FastAPI', 'PostgreSQL', 'Supabase'],
    fatos: [
      { titulo: 'Interface', texto: 'React e Vite, publicado na Vercel' },
      { titulo: 'API', texto: 'FastAPI em Python, publicada no Railway' },
      { titulo: 'Banco', texto: 'PostgreSQL no Supabase, com esquema modelado em DER' },
      { titulo: 'Documentação', texto: 'Requisitos, diagramas UML, manual técnico de 35 páginas e adequação à LGPD' },
    ],
    github: 'https://github.com/LuizCastillo/TCC-NeuroClass',
    linkSite: null,
    telas: [
      { legenda: 'print da tela inicial' },
      { legenda: 'print do quiz' },
      { legenda: 'print do resultado ou perfil' },
    ],
  },
  {
    id: 'castillo',
    forma: 2,
    rotulo: 'Cliente real, em família',
    titulo: 'Castillo Reparação Automotiva',
    descricao:
      'Site institucional da oficina de funilaria e pintura da minha família, na Zona Norte de São Paulo. Mostra o trabalho com fotos de antes e depois e leva o cliente direto para o WhatsApp.',
    tecnologias: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'],
    fatos: [
      { titulo: 'Antes e depois', texto: 'Comparação de fotos dos reparos' },
      { titulo: 'Contato', texto: 'Integração com WhatsApp e Google Maps' },
      { titulo: 'SEO local', texto: 'Voltado para Vila Nova Cachoeirinha e Zona Norte' },
      { titulo: 'Responsivo', texto: 'Pensado primeiro para o celular do cliente' },
    ],
    github: null,
    linkSite: null,
    telas: [
      { legenda: 'print da página inicial' },
      { legenda: 'print do antes e depois' },
      { legenda: 'print da versão no celular' },
    ],
  },
];

export const contato = {
  titulo: 'Vamos conversar.',
  texto: 'Estou aberto a estágio, projetos e conversas sobre desenvolvimento web.',
  github: { texto: 'github.com/LuizCastillo', link: 'https://github.com/LuizCastillo' },
  linkedin: {
    texto: 'Luiz Fernando Castillo',
    link: 'https://www.linkedin.com/in/luiz-fernando-castillo-9a6b41396/',
  },
  whatsapp: { texto: '(11) 95376-6206', link: 'https://wa.me/5511953766206' },
  email: 'luiz.castillo011@gmail.com',
};

export const rodape = {
  esquerda: 'São Paulo, SP',
  direita: 'Feito com React, Three.js, GSAP e Lenis',
};
