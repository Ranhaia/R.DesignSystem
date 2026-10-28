# Atalho de teclado

Componente do PASSI DS 1.1.0 · página "Atalho de teclado" no arquivo Figma.

O atalho de teclado mostra quais teclas fazem uma ação mais rápido, como ⌘ + K para buscar. Aparece em menus, dicas flutuantes e na documentação.

## Tecla

Tecla · uma tecla do teclado. Combine várias no componente Atalho de teclado.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tecla | Texto |  | K |
| Tamanho | Variante | P, M | P |

## Atalho de teclado

Atalho de teclado · mostra a combinação de teclas para uma ação, em menus, dicas flutuantes e documentação. Troque o texto de cada tecla.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Teclas | Variante | 1, 2, 3 | 1 |

## Como usar

### Combinações

Exemplos no Figma: Esc; ⌘; K; ⌘ + K; Ctrl; Shift; P; Ctrl + Shift + P.

### Tamanhos da tecla

Exemplos no Figma: K; P; M.

### Em uso

Dentro de um texto de ajuda.

Exemplos no Figma: ⌘; K.

### Modo escuro

Exemplos no Figma: Esc; ⌘; K; Ctrl; Shift; P.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Use os nomes do sistema: ⌘ no Mac, Ctrl no Windows.
- Para leitor de tela, escreva por extenso: Command mais K.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Não recebe foco: só mostra a combinação.
- Leitor de tela: Leia as teclas por extenso, por exemplo Command mais K, e não o símbolo ⌘.
- Foco: Nenhum.
- Cuidados: Atalhos de uma letra só precisam poder ser desligados ou trocados (WCAG 2.1.4). Mostre a tecla certa para cada sistema: ⌘ no Mac, Ctrl no Windows.

## Tokens usados

Tecla: cor/fundo/superficie, borda cor/borda/forte (2 px embaixo, dando volume), texto IBM Plex Mono em cor/texto/padrao. Canto: raio/pequeno.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use os símbolos do sistema da pessoa: ⌘ no Mac, Ctrl no Windows.
- Mostre atalhos só para ações frequentes.

## NÃO faça

- Atalhos que conflitam com os do navegador.
- Depender só do atalho, sem outra forma de fazer a ação.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
