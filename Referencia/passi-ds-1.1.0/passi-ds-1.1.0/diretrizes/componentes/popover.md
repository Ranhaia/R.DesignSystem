# Popover

Componente do PASSI DS 1.1.0 · página "Popover" no arquivo Figma.

O popover é um painel pequeno que abre quando a pessoa clica em algo. Ele mostra mais informação ou ações rápidas, sem tirar a pessoa da tela em que está.

## Popover

Popover · painel pequeno que abre ao clicar em um elemento, com título, texto curto e até duas ações. Fecha ao clicar fora ou no “x”.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Título | Texto |  | Novidade: modo escuro |
| Descrição | Texto |  | Agora todos os componentes funcionam no claro e no escuro. Troque o modo na coleção “Cor”. |
| Mostrar ações | Liga/desliga |  | Ligado |
| Pode fechar | Liga/desliga |  | Ligado |
| Seta | Variante | Cima, Baixo, Nenhuma | Cima |

## Como usar

### Variações

A seta aponta para o elemento que abriu o popover.

Exemplos no Figma: Seta para cima; Seta para baixo; Sem seta.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Título curto e uma ou duas frases.
- Até duas ações, com verbo.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Enter ou Espaço no gatilho abrem. Tab percorre o conteúdo. Esc fecha.
- Leitor de tela: O gatilho anuncia que abre um painel e se está aberto. O painel tem o título como nome.
- Foco: Ao abrir, o foco vai para o primeiro elemento do painel. Ao fechar, volta para o gatilho.
- Cuidados: Se o conteúdo for uma decisão importante que bloqueia a tela, use Janela modal.

## Tokens usados

Painel e seta: cor/fundo/superficie, borda cor/borda/padrao, Sombra/Média. Texto: cor/texto/padrao e cor/texto/secundario. Espaço: espaco/3 e espaco/5. Canto: raio/grande.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mantenha o conteúdo curto: título, uma ou duas frases e até duas ações.
- Feche ao clicar fora ou apertar Esc.
- Use para apresentar novidades ou detalhes de um item.

## NÃO faça

- Formulários longos dentro do popover. Use Janela modal.
- Abrir popover só com o hover. Para isso use Dica flutuante.
- Vários popovers abertos ao mesmo tempo.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
