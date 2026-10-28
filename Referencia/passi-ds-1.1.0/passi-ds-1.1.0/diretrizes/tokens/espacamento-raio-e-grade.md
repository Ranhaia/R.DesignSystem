# Tokens de espaçamento, raio e borda

Todo espaço é múltiplo de 4. Use os tokens em preenchimentos internos e espaços entre elementos.

## Unidades

No código, espaços e textos estão em rem: 1 rem vale 16 px no tamanho padrão do navegador e cresce quando a pessoa aumenta a fonte, como pede a WCAG. Cantos, bordas e sombras ficam em px, porque não devem crescer com o texto. No Figma, tudo aparece em px, porque o Figma só trabalha em pixel. O número no nome do espaço é o fator da base 4: `--espaco-4` = 4 × 4 px = 16 px = 1 rem. Por que o PASSI usa fator e não o valor no nome: [decisoes.md](../decisoes.md) (D3).

| Token | CSS | Valor no código | No Figma |
|---|---|---|---|
| espaco/0 | `--espaco-0` | 0 | 0 px |
| espaco/0-5 | `--espaco-0-5` | 0.125rem | 2 px |
| espaco/1 | `--espaco-1` | 0.25rem | 4 px |
| espaco/2 | `--espaco-2` | 0.5rem | 8 px |
| espaco/3 | `--espaco-3` | 0.75rem | 12 px |
| espaco/4 | `--espaco-4` | 1rem | 16 px |
| espaco/5 | `--espaco-5` | 1.25rem | 20 px |
| espaco/6 | `--espaco-6` | 1.5rem | 24 px |
| espaco/8 | `--espaco-8` | 2rem | 32 px |
| espaco/10 | `--espaco-10` | 2.5rem | 40 px |
| espaco/12 | `--espaco-12` | 3rem | 48 px |
| espaco/16 | `--espaco-16` | 4rem | 64 px |
| espaco/20 | `--espaco-20` | 5rem | 80 px |
| espaco/24 | `--espaco-24` | 6rem | 96 px |
| raio/nenhum | `--raio-nenhum` | 0 px | 0 px |
| raio/pequeno | `--raio-pequeno` | 4 px | 4 px |
| raio/medio | `--raio-medio` | 8 px | 8 px |
| raio/grande | `--raio-grande` | 12 px | 12 px |
| raio/extra | `--raio-extra` | 20 px | 20 px |
| raio/pilula | `--raio-pilula` | 999 px | 999 px |
| borda/fina | `--borda-fina` | 1 px | 1 px |
| borda/grossa | `--borda-grossa` | 2 px | 2 px |

Regra dos cantos: quanto maior o elemento, maior o canto. `--borda-fina` (1 px) em cards, campos e divisores; `--borda-grossa` (2 px) em foco, seleção e destaque.

## Grades

- computador: 12 colunas, 24 px (1.5rem) entre colunas, margem de 80 px (5rem).
- tablet: 8 colunas, 24 px (1.5rem) entre colunas, margem de 40 px (2.5rem).
- celular: 4 colunas, 16 px (1rem) entre colunas, margem de 16 px (1rem).
- Larguras de referência: computador 1440 px (conteúdo até 1280 px), tablet 768 px, celular 375 px. Abaixo de 768 px, use a grade de celular.
