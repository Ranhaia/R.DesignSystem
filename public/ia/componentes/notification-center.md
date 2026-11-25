---
slug: notification-center
nome: Notification Center
camada: organism
codigo: src/components/ui/notification-center.tsx
story: src/components/ui/notification-center.stories.tsx
status: piloto
sinonimos: [central-de-notificacoes, central-de-notificações, sino, sino-de-notificacoes, notification-center, notification-bell, inbox]
vizinhos: [sonner, popover, badge]
referencias: [docs/active/componentes/notification-center/spec.md]
---

# Notification Center

Sino com o número de não lidas que abre, num `popover`, a lista de notificações lidas e não lidas. Junta num lugar os avisos que a pessoa lê depois.

## Quando usar

- Avisos que se acumulam e a pessoa lê quando quiser: comentários, relatórios prontos, aprovações.
- No cabeçalho do app, perto do avatar.

## Quando NÃO usar

- Confirmação de algo que acabou de acontecer → `sonner`.
- Recado para todos, de uma vez → `announcement-banner`.
- Número solto, sem lista → `badge`.

## Anatomia

| Parte | O que é |
|---|---|
| `NotificationList` | Título, "Marcar todas como lidas" e a lista; cada item é um botão com ponto de não lida, título, descrição e hora |
| `NotificationCenter` | Sino (`icon-button`) com o `badge` de não lidas, que abre a `NotificationList` num `popover` |

## Composição

Usa: [`badge`](badge.md) · [`button`](button.md) · [`icon`](icon.md) · [`icon-button`](icon-button.md) · [`popover`](popover.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `open` / `onOpenChange` | `boolean` / `(open: boolean) => void` | — | Controlam o popover, como no `popover` |
| `notifications` (NotificationList) | `Notification[]` | — | Lista com `id`, `title`, `description?`, `time?` e `read?` |
| `onSelect` (NotificationList) | `(id: string) => void` | — | Clique num item: o produto marca como lida e/ou navega |
| `onMarkAllRead` (NotificationList) | `() => void` | — | Clique em "Marcar todas como lidas" |
| `className` (NotificationList) | `string` | — | Classes extras na raiz |
| `notifications` | `Notification[]` | — | Lista com `id`, `title`, `description?`, `time?` e `read?` |
| `onSelect` | `(id: string) => void` | — | Clique num item: o produto marca como lida e/ou navega |
| `onMarkAllRead` | `() => void` | — | Clique em "Marcar todas como lidas" |
| `className` | `string` | — | Classes extras na raiz |

## Variantes

Nenhuma.

## Tamanhos

Um só: sino de 40 px e lista de 320 px (`w-80`).

## Estados

| Estado | Como aparece |
|---|---|
| Com não lidas | `badge` com o número no sino (9+ acima de 9); itens com ponto e título em destaque |
| Tudo lido | Sino sem `badge`; "Marcar todas como lidas" some |
| Vazia | "Nenhuma notificação" no lugar da lista |

## Conteúdo

- Título curto que diz o que aconteceu: "Relatório mensal pronto".
- Descrição opcional com o próximo passo; hora já formatada pelo produto ("há 5 min").

## Acessibilidade

- **Teclado:** Tab chega ao sino; Enter ou Espaço abre. Dentro, Tab percorre os itens; Esc fecha e devolve o foco ao sino.
- **Leitor de tela:** O nome do sino traz o número ("Notificações, 2 não lidas"); o `badge` é escondido para não repetir. Item não lido começa com "Não lida:".
- **Foco:** Ao abrir, vai para o painel (comportamento do `popover`); ao fechar, volta ao sino.
- **Cuidados:** Não lida nunca é só cor: tem ponto, peso do título e o prefixo para o leitor.

## Tokens usados

- **Cor:** `bg-accent` `bg-primary` `text-muted-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs`
- **Espaço:** `gap-0.5` `gap-2` `min-h-5` `min-w-0` `min-w-5` `mt-1.5`
  `mx-2` `px-1` `px-2` `py-2` `py-6` `right-0.5` `size-2` `top-0.5`
  `w-80`
- **Raio:** `rounded-full` `rounded-md`
- **Foco:** `ring-ring`

## Faça

- Marque como lida no `onSelect`, ao abrir o item.
- Ofereça "Marcar todas como lidas" pelo `onMarkAllRead`.
- Ordene da mais nova para a mais antiga.

## NÃO faça

- Usar para confirmar uma ação que acabou de acontecer → `sonner`.
- Contador sem a lista → `badge` sozinho.
- Pôr ações longas dentro do item → leve para a tela do assunto.

## Exemplo mínimo

```tsx
import { NotificationCenter } from "@/components/ui/notification-center"

<NotificationCenter
  notifications={itens}
  onSelect={marcarComoLida}
  onMarkAllRead={marcarTodas}
/>
```
