---
name: PASSI DS
version: 1.1.0
language: pt-BR
colors:
  light:
    background: "#fafaf7"
    surface: "#ffffff"
    primary: "#2544ec"
    on-primary: "#ffffff"
    text: "#0a0a0a"
    text-muted: "#3c3c3a"
    border: "#e8e8e3"
    success: "#0f7a36"
    warning: "#ffb020"
    error: "#dc2626"
  dark:
    background: "#0a0a0a"
    surface: "#161615"
    primary: "#2544ec"
    on-primary: "#ffffff"
    text: "#fafaf7"
    text-muted: "#d6d6d0"
    border: "#262625"
typography:
  headings: { family: "Archivo", weights: [600, 700, 800] }
  body: { family: "Inter", weights: [400, 600] }
  mono: { family: "IBM Plex Mono", weights: [400, 500] }
  scale-px: [72, 56, 40, 32, 24, 20, 18, 16, 14, 12, 11, 10]
spacing-px: [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
units: { code: "rem for font sizes and spacing (1rem = 16px)", px: "radius, borders and shadows" }
radius-px: { small: 4, medium: 8, large: 12, extra: 20, pill: 999 }
---

# PASSI DS

Visual limpo e editorial: fundo creme quase branco, um único azul de marca (#2544EC), neutros levemente quentes e títulos fortes em Archivo. Claro e escuro com os mesmos nomes de token.

## Princípios visuais

- Um único botão Primário (azul) por tela, para a ação mais importante.
- Bordas finas separam; sombras só em elementos que flutuam (menus, janelas, avisos).
- Cantos crescem com o tamanho do elemento: 4 px em itens pequenos, 8 px em campos e botões, 12 a 20 px em cards e janelas.
- Espaços sempre em múltiplos de 4. No código, texto e espaço em rem (1 rem = 16 px); cantos, bordas e sombras em px.
- Elementos clicáveis com cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados também usam ícone, forma ou texto.

## Importante

Este resumo serve como ponto de partida. As regras completas de cada componente estão em diretrizes/ e os valores exatos em css/passi.css. Prefira consultar esses arquivos.
