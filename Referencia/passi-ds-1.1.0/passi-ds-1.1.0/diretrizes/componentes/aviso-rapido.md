# Aviso rápido

Componente do PASSI DS 1.1.0 · página "Aviso rápido" no arquivo Figma.

O aviso rápido confirma que algo aconteceu, como “Link copiado”. Ele aparece por alguns segundos, geralmente no canto da tela, e some sozinho sem interromper a pessoa.

## Aviso rápido

Aviso rápido · mensagem curta que aparece por alguns segundos, geralmente no canto inferior, para confirmar uma ação. Não use para erros que exigem decisão.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Mensagem | Texto |  | Link copiado. |
| Ação | Texto |  | Desfazer |
| Mostrar ação | Liga/desliga |  | Desligado |
| Tipo | Variante | Neutro, Sucesso, Atenção, Erro | Neutro |

## Como usar

### Tipos

### Posição

No computador, no canto inferior direito ou centralizado na base. No celular, na base, acima da navegação.

### Modo escuro

No modo escuro o aviso fica claro, para continuar se destacando do fundo.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Uma linha, no passado: Link copiado.
- Ofereça Desfazer quando a ação puder ser revertida.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Se tiver ação, como Desfazer, ela precisa ser alcançável pelo teclado antes de o aviso sumir.
- Leitor de tela: Fica numa região que anuncia sozinha, de forma discreta (status).
- Foco: Não recebe o foco ao aparecer. Não pode cobrir o item em foco (WCAG 2.4.11).
- Cuidados: Pelo menos 5 segundos na tela, e o tempo pausa com o mouse ou o foco em cima. Nunca coloque informação importante só num aviso que some.

## Tokens usados

Fundo: cor/fundo/invertido. Texto: cor/texto/invertido. Ícones: cor/fundo/sucesso, alerta e erro. Sombra: Sombra/Grande. Canto: raio/grande.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use mensagens curtas, de uma linha.
- Ofereça “Desfazer” para ações que podem ser revertidas.
- Deixe o aviso na tela por 4 a 6 segundos.

## NÃO faça

- Mostrar vários avisos empilhados.
- Usar para erros que pedem uma decisão. Use Alerta ou Janela modal.
- Colocar links importantes que somem com o aviso.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
