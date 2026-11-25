---
slug: tabs
nome: Tabs
camada: molecule
codigo: src/components/ui/tabs.tsx
story: src/components/ui/tabs.stories.tsx
status: estavel
sinonimos: [abas, aba, tab, tablist]
vizinhos: [segmented-control, stepper, navigation-menu, accordion]
referencias: [passi:abas, shadcn:tabs]
---

# Tabs

Divide um conteúdo em partes e mostra uma de cada vez, sem sair da
página. A aba ativa fica destacada para a pessoa saber onde está.

## Quando usar

- Visões relacionadas do mesmo contexto: Detalhes, Histórico, Arquivos.
- Conteúdo que a pessoa consulta uma parte por vez.

## Quando NÃO usar

- Etapas em sequência → `stepper`.
- Filtrar ou alternar a visão de uma área, sem painel próprio → `segmented-control`.
- Ir para outra página → `navigation-menu` ou `link`.

## Anatomia

| Parte | O que é |
|---|---|
| `Tabs` | Raiz (Radix). Define `orientation` e a aba ativa |
| `TabsList` | Envolve os gatilhos. Define a `variant` |
| `TabsTrigger` | Cada aba. `data-state="active"` quando selecionada |
| `TabsContent` | Painel de cada aba. Só o ativo aparece |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` · `defaultValue` (Tabs) | `string` | — | Aba ativa, controlada ou inicial |
| `onValueChange` (Tabs) | `(v: string) => void` | — | Troca de aba |
| `orientation` (Tabs) | `horizontal` · `vertical` | `horizontal` | Direção do layout e das setas |
| `variant` (TabsList) | `default` · `line` | `default` | Estilo da lista |
| `value` (Trigger, Content) | `string` | — | Liga a aba ao painel. Obrigatório |
| `disabled` (Trigger) | `boolean` | `false` | Desabilita uma aba |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Trilho `bg-muted`, aba ativa com fundo e `shadow-sm`. Áreas compactas, dentro de card |
| `line` | Sem fundo; aba ativa ganha linha de 2 px. Topo de página ou seção |

## Tamanhos

Um só: lista com 36 px (`h-9`) na horizontal.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Texto `text-muted-foreground` |
| Hover | Texto vira `text-foreground` |
| Pressionado | `active:scale-(--scale-pressed)` |
| Ativa | Fundo `bg-background` (default) ou linha de 2 px (line) |
| Foco | Anel de 3 px em `ring` |
| Desabilitada | `opacity-50`, sem clique |

## Conteúdo

- Uma ou duas palavras por aba: Detalhes, Histórico.
- Substantivos, não verbos.

## Acessibilidade

- **Teclado:** Tab entra na lista e para na aba ativa. Setas trocam de aba (↑↓ na vertical). Tab de novo leva ao painel.
- **Leitor de tela:** papéis `tablist`, `tab` e `tabpanel` (Radix). Anuncia a aba, se está selecionada e a posição ("2 de 4").
- **Foco:** anel na aba. Na `line`, a ativa se diferencia também pela linha, não só pela cor.
- **Cuidados:** abas trocam conteúdo na mesma página. Para levar a outra página, use navegação.

## Tokens usados

- **Cor:** `bg-background` `bg-foreground` `bg-muted` `bg-secondary`
  `border-input` `border-ring` `text-foreground` `text-muted-foreground`
- **Tipografia:** `font-medium` `text-sm`
- **Espaço:** `bottom-1.25` `gap-1` `gap-1.5` `gap-2` `h-0.5` `h-9`
  `inset-x-0` `inset-y-0` `p-0.75` `px-2` `py-1` `right-1` `size-4`
  `w-0.5`
- **Raio:** `radius-inset-0.75` `rounded-inner` `rounded-outer-lg`
- **Sombra:** `shadow-sm`
- **Movimento:** `--scale-pressed` `duration-motion-base`
  `duration-motion-fast` `ease-spring`
- **Foco:** `outline-ring` `ring-ring`

## Faça

- Nomes curtos, de uma ou duas palavras.
- Ordem das abas fixa.
- Primeira aba aberta por padrão.

## NÃO faça

- Mais de 6 abas lado a lado → agrupe, ou use `select` para escolher a seção.
- Abas para etapas em sequência → `stepper`.
- Abas que levam a outras páginas → `navigation-menu`.

## Exemplo mínimo

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="detalhes">
  <TabsList variant="line">
    <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
    <TabsTrigger value="historico">Histórico</TabsTrigger>
  </TabsList>
  <TabsContent value="detalhes">…</TabsContent>
  <TabsContent value="historico">…</TabsContent>
</Tabs>
```
