---
slug: announcement-banner
nome: Announcement Banner
camada: organism
codigo: src/components/ui/announcement-banner.tsx
story: src/components/ui/announcement-banner.stories.tsx
status: piloto
sinonimos: [banner, banner-de-anuncio, faixa-de-anuncio, anuncio, announcement, announcement-bar, site-banner]
vizinhos: [alert, sonner, alert-dialog]
referencias: [passi:alerta, docs/active/componentes/announcement-banner/spec.md]
---

# Announcement Banner

Faixa no topo do app com um recado para todas as pessoas, que cada uma pode fechar. É o `alert` em largura total, sem cantos, com o botão de fechar.

## Quando usar

- Recado que vale para todo o app e por um tempo: manutenção programada, novidade, mudança de termos.
- Uma faixa por vez, acima do cabeçalho do app.

## Quando NÃO usar

- Recado sobre um trecho da página → `alert`.
- Confirmação de uma ação que acabou de acontecer → `sonner`.
- Decisão que a pessoa precisa tomar antes de seguir → `alert-dialog`.

## Anatomia

| Parte | O que é |
|---|---|
| `AnnouncementBanner` | Raiz: `alert` com role="region", largura total, sem cantos e só a borda de baixo |
| Conteúdo | Texto e, se houver, um `link`, centralizados e quebrando linha no celular |
| Fechar | `icon-button` ghost com ícone `close`, no fim da faixa |

## Composição

Usa: [`alert`](alert.md) · [`icon`](icon.md) · [`icon-button`](icon-button.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `destructive` | `default` | Tom do `alert`: `destructive` para recado de problema em andamento |
| `dismissible` | `boolean` | `true` | Mostra o botão de fechar |
| `onDismiss` | `() => void` | — | Chamado ao fechar; o produto usa para lembrar que a pessoa já viu |
| `label` | `string` | — | Nome da região para o leitor de tela. Padrão do dicionário: "Anúncio" |
| `closeLabel` | `string` | — | Nome do fechar. Padrão do dicionário: "Fechar anúncio" |

## Variantes

Nenhuma própria. O tom vem do `variant` do `alert`.

## Tamanhos

Um só: largura do container e altura do conteúdo, com `py-2`.

## Estados

| Estado | Como aparece |
|---|---|
| Aberta | Faixa visível com o recado |
| Fechada | Sai da página; `onDismiss` é chamado |

## Conteúdo

- Uma frase curta, com data e hora quando houver: "O sistema fica fora do ar no sábado, das 22h às 23h."
- No máximo um link para detalhes.

## Acessibilidade

- **Teclado:** O fechar entra na ordem do Tab; Enter ou Espaço fecha.
- **Leitor de tela:** Região com nome ("Anúncio"), achada pela lista de regiões. Não usa role="alert": o recado está lá desde a carga e não interrompe a leitura.
- **Foco:** Não rouba o foco ao aparecer. Ao fechar, o foco segue para o primeiro controle depois da faixa.
- **Cuidados:** Não use a faixa para algo urgente que exige ação; aí é `alert-dialog`.

## Tokens usados

- **Espaço:** `gap-3` `gap-x-2` `py-2`

## Faça

- Guarde no produto, via `onDismiss`, que a pessoa fechou, para não mostrar de novo.
- Escreva a data e a hora do que vai acontecer.
- Ponha a faixa acima do cabeçalho, ocupando a largura toda.

## NÃO faça

- Empilhar várias faixas → uma por vez, a mais importante.
- Recado que só vale para uma tela → `alert` nessa tela.
- Recado sem como fechar quando não é obrigatório → deixe `dismissible`.

## Exemplo mínimo

```tsx
import { AnnouncementBanner } from "@/components/ui/announcement-banner"

<AnnouncementBanner onDismiss={() => salvarVisto()}>
  O sistema fica fora do ar no sábado, das 22h às 23h.
</AnnouncementBanner>
```
