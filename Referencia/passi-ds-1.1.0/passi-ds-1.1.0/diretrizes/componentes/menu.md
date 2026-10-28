# Menu

Componente do PASSI DS 1.1.0 · página "Menu" no arquivo Figma.

O menu reúne ações que não cabem na tela, como editar, duplicar ou excluir. Ele abre a partir de um botão e fecha quando a pessoa escolhe uma opção ou clica fora.

## Item de menu

Item de menu · uma ação dentro de um Menu. Use o tipo Perigo para ações destrutivas e coloque-as sempre no fim, separadas por um divisor.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Editar |
| Atalho | Texto |  | ⌘E |
| Mostrar ícone | Liga/desliga |  | Ligado |
| Mostrar atalho | Liga/desliga |  | Ligado |
| Trocar ícone | Troca de ícone ou componente |  |  |
| Estado | Variante | Padrão, Hover, Pressionado, Selecionado, Perigo, Desabilitado | Padrão |

## Menu

Menu · lista de ações que abre a partir de um botão (por exemplo o botão “mais opções”). Agrupe ações parecidas, use divisores entre grupos e deixe ações destrutivas no fim.

## Como usar

### Item de menu

Cada linha é uma ação. Pode ter ícone e atalho de teclado.

Exemplos no Figma: ⌘E; Padrão; Hover; Pressionado; Selecionado; Perigo; Desabilitado.

### Menu

Grupo com título, ações comuns, divisor e ação destrutiva no fim.

Exemplos no Figma: Capítulo; ⌘E; ⌘D; ⌘L; Claro; Escuro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Cada item começa com verbo: Editar, Duplicar, Excluir.
- Atalhos no formato do sistema: ⌘E no Mac, Ctrl+E no Windows.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Enter, Espaço ou seta para baixo no botão abrem o menu. Setas percorrem os itens, Enter escolhe e Esc fecha.
- Leitor de tela: Botão que anuncia que abre um menu. Papéis menu e menuitem. O atalho de cada item é lido junto.
- Foco: Ao abrir, o foco vai para o primeiro item. Ao fechar, volta para o botão.
- Cuidados: Item de perigo, como Excluir, diz isso no texto, não só com a cor vermelha. Menus são para ações; para navegar entre páginas, use links.

## Tokens usados

Fundo: cor/fundo/superficie, cor/fundo/sutil (hover), cor/fundo/sutil-hover (pressionado). Texto: cor/texto/padrao, cor/texto/secundario, cor/texto/terciario, cor/texto/erro. Borda: cor/borda/padrao. Sombra: Sombra/Média. Canto: raio/grande (menu) e raio/pequeno (item).

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Comece cada opção com um verbo.
- Agrupe ações relacionadas e separe grupos com divisor.
- Deixe ações destrutivas por último, em vermelho.

## NÃO faça

- Menus com mais de 10 opções sem grupos.
- Esconder no menu a ação mais usada da tela.
- Submenus dentro de submenus.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
