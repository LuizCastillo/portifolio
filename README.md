# Portfólio de Luiz Castillo

Site pessoal com apresentação, conhecimentos, projetos e contato.
Feito em **React** com **Vite**, fundo 3D com **Three.js**, animações com **GSAP** e rolagem suave com **Lenis**.

## Como rodar

```bash
npm install
npm run dev      # abre o site em modo de desenvolvimento
npm run build    # gera a versão de produção na pasta dist
npm run preview  # testa a versão de produção
```

## Onde mudar o conteúdo

Todo texto, link e imagem fica em `src/dados/conteudo.js`.

- Links do site no ar: troque `linkSite: null` pelo endereço.
- Prints dos projetos: coloque o arquivo na pasta `public` e use `imagem: '/nome-do-arquivo.png'` em `telas`.

## Estrutura

```
src/
  components/   seções e peças da página (Hero, Sobre, Stack, Projeto, Contato...)
  dados/        conteúdo do site
  lib/          rolagem suave e formas 3D das partículas
  styles.css    estilos
public/         foto e favicon
```

## Deploy

O site é estático e está publicado na Vercel. Não há back-end.
