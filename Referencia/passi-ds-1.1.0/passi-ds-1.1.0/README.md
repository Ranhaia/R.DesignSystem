# PASSI DS

Design system aberto e em português que acompanha o livro **"Design System: o que você também precisa saber"**, de João Passini.

O desenho completo está no Figma: 107 páginas, 182 variáveis (claro, escuro e alto contraste, e a tipografia), 52 componentes (7 deles para produtos com IA), 20 padrões de tela, 201 ícones, um guia de escrita de interface em português e um registro de decisões. Este pacote é a ponte entre o Figma, o código e a inteligência artificial: os mesmos tokens e as mesmas regras, em arquivos que pessoas e ferramentas de IA conseguem ler.

## O que tem aqui

| Pasta ou arquivo | Para que serve |
|---|---|
| `tokens/` | Todos os tokens no formato padrão do W3C (DTCG 2025.10): cores, espaçamento, raio, movimento, tipografia, sombras, desfoques, gradientes e grade. `passi.resolver.json` monta o conjunto e escolhe o modo claro ou escuro. |
| `css/passi.css` | Variáveis CSS prontas, com modo escuro automático, movimento reduzido e uma classe para cada estilo de texto. Texto e espaço em rem, para crescer quando a pessoa aumenta a fonte do navegador. |
| `tailwind/passi-tailwind.css` | Tema para Tailwind CSS v4 ligado às variáveis do PASSI. |
| `diretrizes/` | As regras de cada fundamento, componente e padrão, em texto. Comece por `diretrizes/Guidelines.md`. O porquê das escolhas, inclusive onde o PASSI faz diferente do livro, está em `diretrizes/decisoes.md`. |
| `AGENTS.md` | Regras para assistentes de IA que escrevem código (Claude Code, Cursor, Copilot, v0). |
| `llms.txt` e `llms-full.txt` | Índice e texto completo para ferramentas de IA. |
| `DESIGN.md` | Resumo visual em um arquivo só, para ferramentas de design com IA. |
| `exemplos/index.html` | Página de demonstração usando só o `passi.css`. |

## Como usar no site ou no aplicativo

1. Carregue as fontes do Google Fonts: Archivo (600, 700, 800), Inter (400, 600) e IBM Plex Mono (400, 500).
2. Inclua `css/passi.css` na página.
3. Use as variáveis: `background: var(--cor-fundo-superficie); padding: var(--espaco-4); border-radius: var(--raio-medio);`
4. Use as classes de texto: `<h1 class="texto-titulo-1">`, `<p class="texto-corpo-medio">`.
5. Modos: o escuro e o alto contraste seguem o sistema da pessoa, e o movimento reduzido também. Para forçar um modo, coloque `data-tema="escuro"`, `"claro"`, `"alto-contraste-claro"` ou `"alto-contraste-escuro"` no `<html>`.

Com Tailwind v4: importe `tailwindcss`, depois `passi.css` e `passi-tailwind.css`. As classes ficam assim: `bg-fundo-marca`, `text-texto-padrao`, `border-borda-padrao`, `rounded-medio`, `shadow-media`, `p-4` (1 rem = 16 px).

## Onde funciona melhor

O PASSI DS é feito e testado para a web, e é lá que ele rende mais: o `passi.css`, os componentes em código e os testes de zoom são de web. Em apps nativos, rem e px não existem, mas os tokens valem por equivalência: 1 rem = 16 pt no iOS (texto com Dynamic Type) e 16 dp no Android (texto em sp). Nomes, cores e regras de uso continuam os mesmos.

## Como usar com IA

- **Para escrever código:** copie o `AGENTS.md` para o seu projeto (ou com o nome que a sua ferramenta lê, como `CLAUDE.md`) e deixe a pasta `diretrizes/` acessível.
- **No Figma Make:** use `diretrizes/Guidelines.md` como arquivo de diretrizes e os arquivos de `diretrizes/componentes/` como complemento.
- **Em ferramentas de chat ou de busca:** aponte para o `llms.txt`.

Testes da Atlassian mostram que muitos arquivos curtos, consultados quando necessário, funcionam melhor que um arquivo grande. Por isso as regras estão divididas: um arquivo por componente e por tipo de token.

## Onde encontrar

- Arquivo Figma na Comunidade: https://www.figma.com/community/file/1694426075578751653/passi-ds-design-system-aberto-em-portugues
- Página do pacote: https://joaopassini.com.br/passi-ds
- Livro: https://joaopassini.com.br/livro-design-system

## Versão

1.1.0 · 21 de outubro de 2026. As versões seguem a numeração semântica: correções mudam o último número, novidades compatíveis o do meio, e mudanças que quebram algo o primeiro. Antes de sair, uma peça fica marcada como descontinuada por pelo menos uma versão.

O que mudou na 1.1.0:

- Novo: ícone de abrir fora no Link, ícone à direita no Campo de texto (mostrar senha), Código de verificação com 4, 6 ou 8 dígitos, Migalhas de pão com o "…" aberto Índice alfabético na horizontal para computador (a vertical fica para o celular) e a coleção Tipografia: 31 variáveis de família, peso, tamanho e entrelinha, ligadas aos 21 estilos de texto.
- Corrigido: fundo dos grupos de componentes ligado a cor/fundo/pagina, para o modo escuro funcionar no Figma, e variantes sobrepostas no Botão de ícone.
- Mudou: cor/texto/secundario ficou um degrau mais escuro; Migalhas de pão sem sublinhado nos links.
- Documentação: camadas (página, superfície, flutuante e sobreposição), bordas por dentro, uso fora da web e a decisão D10. Os tokens de marca valem para qualquer marca: troque os valores, não os nomes.
- Descontinuado: estilo Pílula das Abas. Use o Controle segmentado. Sai na versão 2.0.

1.0.0 · 20 de outubro de 2026: primeira publicação.

## Licença

Creative Commons Atribuição 4.0 Internacional (CC BY 4.0). Use e adapte à vontade, inclusive em projetos comerciais, e dê o crédito. Detalhes em `LICENSE.md`.

Crédito sugerido: *Baseado no PASSI DS, de João Passini (joaopassini.com.br). Licença CC BY 4.0.*
