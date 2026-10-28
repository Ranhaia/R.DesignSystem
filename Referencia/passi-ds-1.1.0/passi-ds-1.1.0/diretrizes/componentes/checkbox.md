# Checkbox

Componente do PASSI DS 1.1.0 · página "Checkbox" no arquivo Figma.

O checkbox permite escolher uma ou mais opções de uma lista, ou confirmar algo de forma independente, como aceitar os termos de uso.

## Checkbox

Checkbox · permite marcar uma ou várias opções independentes. Use Indeterminado no item “selecionar todos” quando só parte da lista está marcada. A caixa tem 20 px; toda a linha (caixa + texto) deve ser clicável.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Quero receber novidades do livro |
| Descrição | Texto |  | Um e-mail por mês, sem spam. |
| Mostrar descrição | Liga/desliga |  | Ligado |
| Marcação | Variante | Desmarcado, Marcado, Indeterminado | Desmarcado |
| Estado | Variante | Padrão, Hover, Pressionado, Foco, Erro, Desabilitado | Padrão |

## Como usar

### Marcações

Desmarcado, marcado e indeterminado. O indeterminado aparece no item “selecionar todos” quando só parte da lista foi escolhida.

Exemplos no Figma: Desmarcado; Marcado; Indeterminado.

### Estados

O erro aparece quando o item é obrigatório e não foi marcado, por exemplo os termos de uso.

Exemplos no Figma: Padrão; Hover; Pressionado; Foco; Erro; Desabilitado.

### Em uso

Lista de opções com um item “selecionar todos” no topo.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Rótulo como afirmação positiva: Quero receber novidades.
- Evite negações duplas, como Não quero deixar de receber.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega a cada checkbox. Espaço marca e desmarca.
- Leitor de tela: Papel checkbox. O nome é o rótulo. Anuncia marcado, desmarcado ou parcialmente marcado.
- Foco: Anel de foco de 2 px em volta da caixa.
- Cuidados: Clicar no rótulo também marca. Para um grupo, use um título de grupo (fieldset e legend no código). A área de clique inclui o texto, não só a caixa.

## Tokens usados

Fundo: cor/fundo/superficie, cor/fundo/marca, cor/fundo/marca-hover, cor/fundo/marca-pressionado, cor/fundo/marca-sutil (desmarcado pressionado), cor/fundo/erro, cor/fundo/desabilitado. Borda: cor/borda/controle, cor/borda/marca, cor/borda/erro. Texto: cor/texto/padrao, cor/texto/secundario, cor/texto/sobre-marca. Canto: raio/pequeno.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Escreva o rótulo como uma afirmação positiva: “Quero receber novidades”.
- Deixe a linha inteira clicável, não só a caixa.
- Use para opções independentes, que podem ser marcadas juntas.

## NÃO faça

- Usar checkbox quando só uma opção pode ser escolhida. Nesse caso use Rádio.
- Rótulos negativos, como “Não quero receber e-mails”.
- Disparar uma ação imediata ao marcar. Para isso use o Interruptor.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
