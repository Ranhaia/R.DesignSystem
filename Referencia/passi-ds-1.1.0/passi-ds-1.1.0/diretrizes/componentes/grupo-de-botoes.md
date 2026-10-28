# Grupo de botões

Componente do PASSI DS 1.1.0 · página "Grupo de botões" no arquivo Figma.

O grupo de botões organiza duas ou mais ações relacionadas, como cancelar e salvar. A ordem e o espaçamento são sempre os mesmos, então a pessoa encontra a ação principal sem pensar.

## Grupo de botões

Grupo de botões · combinações prontas de ações. A ação principal fica à direita no computador e em cima no celular. Troque os textos e tipos nas instâncias internas.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Formulário, Destrutivo, Três ações, Empilhado | Formulário |

## Como usar

### Formulário

Fim de formulários e janelas. Ação principal à direita.

### Destrutivo

Confirmação de algo que não dá para desfazer.

### Três ações

Voltar à esquerda, ações principais à direita.

### Empilhado

No celular, botões em largura total, com a ação principal em cima.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Cada botão diz a própria ação. Cancelar não precisa de objeto; a ação principal precisa: Salvar capítulo.
- Evite pares como Sim e Não ou OK e Cancelar.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Cada botão recebe Tab na ordem visual: primeiro a ação secundária, por último a principal.
- Leitor de tela: Cada botão tem seu próprio nome. Quando o grupo é uma barra de opções, use o papel group com um nome, por exemplo Ações do capítulo.
- Foco: Segue a ordem visual da esquerda para a direita. Nunca mude a ordem só no código.
- Cuidados: No celular, quando os botões ficam empilhados, a ação principal vai em cima e a ordem do foco acompanha.

## Tokens usados

Botões internos: componente Botão. Espaço entre botões: espaco/3 (computador) e espaco/2 (celular).

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mantenha a ação principal sempre na mesma posição.
- Use 12 px entre botões no computador e 8 px no celular.
- Deixe claro no texto o que cada botão faz.

## NÃO faça

- Mais de três botões no mesmo grupo.
- Dois botões Primários juntos.
- Mudar a ordem das ações de uma tela para outra.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
