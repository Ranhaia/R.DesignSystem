# Tokens de tipografia

Três famílias: Archivo (títulos), Inter (textos e interface) e IBM Plex Mono (rótulos técnicos e código). Todas gratuitas no Google Fonts.

No CSS, use a classe do estilo (ex.: `texto-titulo-1`) ou as variáveis `--texto-*`. Os tamanhos estão em rem (1 rem = 16 px), para o texto crescer quando a pessoa aumenta a fonte do navegador; a entrelinha é proporcional ao tamanho. No Figma, os mesmos valores aparecem em px.

| Estilo | Classe CSS | Fonte | Tamanho / entrelinha | No Figma | Letras | Uso |
|---|---|---|---|---|---|---|
| Display/Grande | `.texto-display-grande` | Archivo 800 | 4.5rem / 1.0556 | 72/76 px | -0.1125rem | Títulos de capa e abertura de seção. |
| Display/Médio | `.texto-display-medio` | Archivo 800 | 3.5rem / 1.0714 | 56/60 px | -0.07rem | Títulos de destaque em páginas de marketing. |
| Título/1 | `.texto-titulo-1` | Archivo 700 | 2.5rem / 1.15 | 40/46 px | -0.0375rem | Título principal da página (h1). |
| Título/2 | `.texto-titulo-2` | Archivo 700 | 2rem / 1.1875 | 32/38 px | -0.02rem | Título de seção (h2). |
| Título/3 | `.texto-titulo-3` | Archivo 700 | 1.5rem / 1.25 | 24/30 px | -0.0075rem | Título de bloco ou card grande (h3). |
| Título/4 | `.texto-titulo-4` | Archivo 600 | 1.25rem / 1.3 | 20/26 px | -0.0031rem | Título de card, janela ou grupo (h4). |
| Corpo/Grande | `.texto-corpo-grande` | Inter 400 | 1.125rem / 1.5556 | 18/28 px | 0 | Textos de leitura longa e introduções. |
| Corpo/Médio | `.texto-corpo-medio` | Inter 400 | 1rem / 1.5 | 16/24 px | 0 | Texto padrão de interface. |
| Corpo/Pequeno | `.texto-corpo-pequeno` | Inter 400 | 0.875rem / 1.4286 | 14/20 px | 0 | Textos de apoio e descrições. |
| Rótulo/Grande | `.texto-rotulo-grande` | Inter 600 | 1rem / 1.5 | 16/24 px | 0 | Botões grandes e destaques curtos. |
| Rótulo/Médio | `.texto-rotulo-medio` | Inter 600 | 0.875rem / 1.4286 | 14/20 px | 0 | Botões, abas, rótulos de campo. |
| Rótulo/Pequeno | `.texto-rotulo-pequeno` | Inter 600 | 0.75rem / 1.3333 | 12/16 px | 0 | Selos, etiquetas e botões pequenos. |
| Legenda | `.texto-legenda` | Inter 400 | 0.75rem / 1.3333 | 12/16 px | 0 | Mensagens de ajuda, datas e notas. |
| Sobretítulo | `.texto-sobretitulo` | IBM Plex Mono 500 | 0.75rem / 1.3333 | 12/16 px | 0.06rem | Rótulo em caixa alta acima de títulos. |
| Código | `.texto-codigo` | IBM Plex Mono 400 | 0.875rem / 1.4286 | 14/20 px | 0 | Trechos de código e atalhos. |
| Link/Médio | `.texto-link-medio` | Inter 400 sublinhado | 1rem / 1.5 | 16/24 px | 0 | Links de 16 px. Mesmo texto do Corpo/Médio, sempre sublinhado. |
| Link/Pequeno | `.texto-link-pequeno` | Inter 400 sublinhado | 0.875rem / 1.4286 | 14/20 px | 0 | Links de 14 px. Mesmo texto do Corpo/Pequeno, sempre sublinhado. |
| Rótulo/Mínimo | `.texto-rotulo-minimo` | Inter 600 | 0.6875rem / 1.2727 | 11/14 px | 0 | Rótulos mínimos: contadores, letras do índice, barra inferior do celular e medidas. Só para textos de 1 a 2 palavras. |
| Rótulo/Sigla | `.texto-rotulo-sigla` | Inter 700 | 0.625rem / 1.6 | 10/16 px | 0.025rem | Siglas de formato em ícones de arquivo (PDF, DOC, ZIP). |
| Código/Pequeno | `.texto-codigo-pequeno` | IBM Plex Mono 500 | 0.75rem / 1.3333 | 12/16 px | 0 | Teclas de atalho e nomes de arquivo em trechos de código. |
| Código/Bloco | `.texto-codigo-bloco` | IBM Plex Mono 400 | 0.875rem / 1.7143 | 14/24 px | 0 | Código em várias linhas: blocos, terminal e números de linha. |

## Variáveis de tipografia

Os estilos acima usam as variáveis da coleção Tipografia. Mude uma variável e todos os estilos que a usam acompanham. O nome do tamanho e da entrelinha é o valor em px no Figma; no código, vira rem.

| Variável | CSS | Valor no código | No Figma |
|---|---|---|---|
| fonte/titulos | `--fonte-titulos` | "Archivo", sans-serif | Archivo |
| fonte/textos | `--fonte-textos` | "Inter", sans-serif | Inter |
| fonte/codigo | `--fonte-codigo` | "IBM Plex Mono", monospace | IBM Plex Mono |
| peso/regular | `--peso-regular` | 400 | 400 |
| peso/medio | `--peso-medio` | 500 | 500 |
| peso/seminegrito | `--peso-seminegrito` | 600 | 600 |
| peso/negrito | `--peso-negrito` | 700 | 700 |
| peso/extranegrito | `--peso-extranegrito` | 800 | 800 |
| tamanho/10 | `--tamanho-10` | 0.625rem | 10 px |
| tamanho/11 | `--tamanho-11` | 0.6875rem | 11 px |
| tamanho/12 | `--tamanho-12` | 0.75rem | 12 px |
| tamanho/14 | `--tamanho-14` | 0.875rem | 14 px |
| tamanho/16 | `--tamanho-16` | 1rem | 16 px |
| tamanho/18 | `--tamanho-18` | 1.125rem | 18 px |
| tamanho/20 | `--tamanho-20` | 1.25rem | 20 px |
| tamanho/24 | `--tamanho-24` | 1.5rem | 24 px |
| tamanho/32 | `--tamanho-32` | 2rem | 32 px |
| tamanho/40 | `--tamanho-40` | 2.5rem | 40 px |
| tamanho/56 | `--tamanho-56` | 3.5rem | 56 px |
| tamanho/72 | `--tamanho-72` | 4.5rem | 72 px |
| entrelinha/14 | `--entrelinha-14` | 0.875rem | 14 px |
| entrelinha/16 | `--entrelinha-16` | 1rem | 16 px |
| entrelinha/20 | `--entrelinha-20` | 1.25rem | 20 px |
| entrelinha/24 | `--entrelinha-24` | 1.5rem | 24 px |
| entrelinha/26 | `--entrelinha-26` | 1.625rem | 26 px |
| entrelinha/28 | `--entrelinha-28` | 1.75rem | 28 px |
| entrelinha/30 | `--entrelinha-30` | 1.875rem | 30 px |
| entrelinha/38 | `--entrelinha-38` | 2.375rem | 38 px |
| entrelinha/46 | `--entrelinha-46` | 2.875rem | 46 px |
| entrelinha/60 | `--entrelinha-60` | 3.75rem | 60 px |
| entrelinha/76 | `--entrelinha-76` | 4.75rem | 76 px |

Regras: no máximo três tamanhos de texto por tela; corpo de texto nunca menor que 14 px; Archivo só em títulos; linhas de leitura entre 60 e 80 caracteres.
