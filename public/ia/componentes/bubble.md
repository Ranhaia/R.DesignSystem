---
slug: bubble
nome: Bubble
camada: molecule
codigo: src/components/ui/bubble.tsx
story: src/components/ui/bubble.stories.tsx
status: piloto
sinonimos: [balao, balão, balao-de-mensagem, balão-de-mensagem, bolha-de-chat]
vizinhos: [message, card, alert]
referencias: [passi:mensagem-da-conversa, spec:bubble]
---

# Bubble

Exibe o texto ou mídia de uma mensagem em formato de balão de conversa. Oferece variantes de destaque, alinhamento direcional para remetente ou destinatário e suporte a reações.

## Quando usar

- Interfaces de chat e mensagens bidirecionais entre pessoa e atendente ou assistente virtual.
- Histórico de comentários em formato de linha do tempo conversacional.
- Respostas curtas e transcrições de comandos de voz em assistentes interativos.

## Quando NÃO usar

- Estrutura completa de conversa com avatar, metadados e barra de ações integradas → `message`.
- Cartão genérico para agrupamento de dados fora do fluxo de conversa → `card`.
- Mensagem fixa na página para avisos de sistema ou validação de tela → `alert`.

## Anatomia

| Parte | O que é |
|---|---|
| `BubbleGroup` | Contêiner vertical com `data-slot="bubble-group"` que empilha mensagens com espaçamento padronizado. |
| `Bubble` | Elemento delimitador da fala com `data-slot="bubble"`, controlando variante visual, alinhamento e largura máxima de 80%. |
| `BubbleContent` | Superfície do balão com `data-slot="bubble-content"`, cantos arredondados, quebra de linha automática e suporte a `asChild`. |
| `BubbleReactions` | Contêiner flutuante com `data-slot="bubble-reactions"` para exibir emojis ou contador de reações fixados na borda. |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `secondary` · `muted` · `tinted` · `outline` · `ghost` · `destructive` | `default` | Estilo visual e hierarquia de cores da superfície do balão |
| `align` | `start` · `end` | `start` | Alinhamento do balão à esquerda (`start`) ou à direita (`end`) |
| `asChild` (BubbleContent) | `boolean` | `false` | Delega a renderização para o elemento filho (ex.: botão interativo) |
| `align` (BubbleReactions) | `start` · `end` | `end` | Alinhamento horizontal das reações em relação ao balão |
| `side` (BubbleReactions) | `top` · `bottom` | `bottom` | Posição vertical das reações na borda superior ou inferior |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Mensagens enviadas pela própria pessoa usuária com fundo primário em destaque |
| `secondary` | Mensagens de interlocutores com superfície secundária sólida |
| `muted` | Mensagens recebidas do interlocutor ou assistente com tom sutil e neutro |
| `tinted` | Respostas com leve tonalidade cromática derivada da cor da marca |
| `outline` | Mensagens neutras com borda sutil sobre fundo limpo |
| `ghost` | Conteúdos transparentes sem superfície de fundo destacados no fluxo |
| `destructive` | Notificações de falha de envio ou avisos críticos dentro do chat |

## Tamanhos

Tamanho fluido limitado a 80% da largura do contêiner (`max-w-[80%]`), adaptando-se ao volume de texto.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Superfície opaca com cantos `rounded-xl` e texto com entrelinha relaxada |
| Alinhado ao fim (`end`) | Balão alinhado à direita com `self-end`, indicando envio pela pessoa |
| Alinhado ao início (`start`) | Balão alinhado à esquerda, indicando mensagem recebida |
| Interativo (botão/link) | Efeito hover com alteração de luminosidade e anel de foco visível ao receber foco |
| Com reações | Contêiner em pílula (`rounded-full`) suspenso na borda com anel protetor (`ring-3 ring-card`) |

## Conteúdo

- Mantenha mensagens concisas e parágrafos curtos para facilitar a leitura rápida na conversa.
- O balão quebra palavras automaticamente quando necessário (`wrap-break-word`).
- Em mensagens de erro, inclua instruções objetivas sobre como tentar novamente.

## Acessibilidade

- **Teclado:** Se o conteúdo do balão for clicável (via botão ou `asChild`), Tab alcança o elemento e Enter ou Espaço o ativam. As reações interativas também são alcançadas por Tab.
- **Leitor de tela:** Leitores anunciam o texto da mensagem. Em interfaces de chat com atualização em tempo real, novos balões devem ser expostos via região com `aria-live="polite"` sem interromper a fala atual.
- **Foco:** O foco da pessoa usuária não deve ser movido para o balão quando uma nova mensagem é recebida; ele deve permanecer no campo de digitação.
- **Cuidados:** Garanta contraste adequado entre o texto e a cor de fundo do balão, em especial na variante `default` e nas cores escuras de tema.

## Tokens usados

- **Cor:** `--foreground` `--muted` `--primary` `--secondary`
  `bg-background` `bg-destructive` `bg-input` `bg-muted` `bg-primary`
  `bg-secondary` `border-border` `border-ring` `text-destructive`
  `text-foreground` `text-primary-foreground`
  `text-secondary-foreground`
- **Tipografia:** `leading-relaxed` `text-sm`
- **Espaço:** `bottom-0` `gap-1` `gap-2` `left-3` `min-w-0` `p-0`
  `px-1.5` `px-3` `py-0.5` `py-2` `right-3` `top-0`
- **Raio:** `rounded-full` `rounded-xl`
- **Foco:** `ring-card` `ring-ring`

## Faça

- Alinhe mensagens enviadas pela pessoa à direita (`align="end"`) e mensagens recebidas à esquerda (`align="start"`).
- Agrupe balões consecutivos do mesmo interlocutor usando `BubbleGroup`.
- Respeite a largura máxima de 80% para preservar o formato visual característico de conversa.

## NÃO faça

- Ocupar 100% da largura do contêiner em balões de fala comuns → mantenha o limite padrão de largura ou use `variant="ghost"`.
- Mover o foco do teclado para cada nova mensagem recebida → mantenha o foco no campo de entrada de texto.
- Omitir contraste adequado em mensagens coloridas → use as variantes calibradas do Design System.

## Exemplo mínimo

```tsx
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

<BubbleGroup>
  <Bubble align="start" variant="muted">
    <BubbleContent>Olá! Como posso ajudar você hoje?</BubbleContent>
  </Bubble>
  <Bubble align="end" variant="default">
    <BubbleContent>Gostaria de verificar o status da minha solicitação.</BubbleContent>
  </Bubble>
</BubbleGroup>
```
