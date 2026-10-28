# Barra de progresso

Componente do PASSI DS 1.1.0 · página "Barra de progresso" no arquivo Figma.

A barra de progresso mostra quanto de uma tarefa já foi feito, como um envio de arquivo ou o avanço na leitura. Ela tranquiliza a pessoa: algo está acontecendo e já dá para ter ideia de quanto falta.

## Barra de progresso

Barra de progresso · mostra quanto falta para terminar uma tarefa com duração conhecida, como um envio. Linear para listas e formulários; Circular para espaços pequenos. Ajuste a largura do “Preenchimento” (ou o arco) para o valor real.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Linear, Circular | Linear |
| Estado | Variante | Em andamento, Concluída, Erro | Em andamento |

## Como usar

### Linear

Exemplos no Figma: Em andamento; Concluída; Erro.

### Circular

Exemplos no Figma: Em andamento; Concluída; Erro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Diga o que está acontecendo e quanto falta: Enviando 2 de 5 arquivos.
- No fim, confirme: Envio concluído.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Não recebe foco.
- Leitor de tela: Papel progressbar com nome, por exemplo Envio do arquivo, e o valor em porcentagem. No tipo indeterminado, anuncie Carregando.
- Foco: Nenhum.
- Cuidados: Anuncie o fim, por exemplo Envio concluído, sem anunciar cada porcentagem. Mostre o número junto da barra quando ele importa.

## Tokens usados

Trilho: cor/fundo/sutil-hover. Preenchimento: cor/fundo/marca, cor/fundo/sucesso, cor/fundo/erro. Texto: cor/texto/padrao, cor/texto/secundario.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mostre a porcentagem ou o que falta, como “2,1 MB de 3,5 MB”.
- Explique o erro e ofereça tentar de novo.
- Use para tarefas que levam mais de 2 segundos.

## NÃO faça

- Usar quando não dá para saber quanto falta. Use Carregando.
- Barras que voltam para trás.
- Esconder a barra antes de confirmar o resultado.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
