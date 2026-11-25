---
slug: timeline
nome: Timeline
camada: molecule
codigo: src/components/ui/timeline.tsx
story: src/components/ui/timeline.stories.tsx
status: piloto
sinonimos: [linha-do-tempo, historico, historico-de-atividade, atividade, eventos, cronologia, feed-de-atividade, activity]
vizinhos: [list, item, stepper]
referencias: [spec:timeline]
---

# Timeline

Eventos em ordem, como o histórico de atividade de um pedido ou chamado. É o `list` como lista ordenada, com um marcador por evento e uma linha ligando os marcadores.

## Quando usar

- Mostrar o que já aconteceu com um registro, na ordem: pedido, chamado, aprovação.
- Feed de atividade de uma pessoa ou de um projeto.

## Quando NÃO usar

- Etapas que a pessoa ainda vai percorrer → `stepper`.
- Itens sem ordem no tempo, com ações → `item` / `list`.

## Anatomia

| Parte | O que é |
|---|---|
| `Timeline` | A lista ordenada (`ol`) com os eventos. |
| `TimelineItem` | Um evento (`li`): marcador à esquerda, conteúdo à direita e a linha até o próximo. |
| `TimelineMarker` | O ponto do evento, ou o ícone passado como filho. Decorativo. |
| `TimelineContent` | Coluna do texto do evento. |
| `TimelineTitle` | O que aconteceu, texto médio (não é cabeçalho). |
| `TimelineTime` | Quando aconteceu, em `<time>` com `dateTime`. |
| `TimelineDescription` | Detalhe opcional, texto apagado. |

## Composição

Usa: [`list`](list.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `dateTime` (TimelineTime) | `string` | — | Data em formato de máquina (ISO), para leitor de tela e buscadores. |
| `tone` (TimelineMarker) | `default` · `primary` · `destructive` | `default` | Cor do marcador: neutro, destaque ou problema. |

## Variantes

Sem variantes da lista. O marcador tem `tone`: `default` para eventos comuns, `primary` para o evento atual ou de destaque, `destructive` para falha.

## Tamanhos

Sem tamanhos: o marcador é `size-6` e o texto é o `text` base.

## Estados

Só leitura; não tem estados interativos. O destaque de um evento vem do `tone` do marcador.

## Conteúdo

- Título no passado e curto: "Pagamento aprovado".
- Data no formato da tela e a mesma data em ISO no `dateTime`.

## Acessibilidade

- **Teclado:** não recebe foco; links dentro do evento seguem a ordem normal.
- **Leitor de tela:** anuncia a lista com o número de eventos; marcador e linha ficam de fora.
- **Foco:** sem foco próprio.
- **Cuidados:** a cor do marcador não pode ser a única pista: falha precisa estar escrita no título.

## Tokens usados

- **Cor:** `bg-border` `bg-destructive` `bg-muted` `bg-primary`
  `text-destructive-foreground` `text-muted-foreground`
  `text-primary-foreground`
- **Espaço:** `bottom-1` `gap-0` `gap-1` `gap-x-3` `left-3` `min-w-0`
  `pb-0` `pb-6` `pt-0.5` `size-2` `size-4` `size-6` `top-7` `w-px`
- **Raio:** `rounded-full`

## Faça

- Manter uma ordem só na tela inteira (mais novo em cima ou embaixo).
- Usar ícone no marcador quando os tipos de evento variam.
- Pôr a data em todo evento.

## NÃO faça

- Usar para passos futuros → `stepper`.
- Usar cabeçalho no título de cada evento → `TimelineTitle`, que é texto.
- Marcar falha só com a cor → escrever a falha no título.

## Exemplo mínimo

```tsx
import {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline"

<Timeline>
  <TimelineItem>
    <TimelineMarker />
    <TimelineContent>
      <TimelineTitle>Pedido criado</TimelineTitle>
      <TimelineTime dateTime="2026-11-20">20 nov</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```
