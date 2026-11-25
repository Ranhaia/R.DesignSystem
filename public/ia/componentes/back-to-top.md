---
slug: back-to-top
nome: Back To Top
camada: organism
codigo: src/components/ui/back-to-top.tsx
story: src/components/ui/back-to-top.stories.tsx
status: piloto
sinonimos: [voltar-ao-topo, ir-ao-topo, subir, scroll-to-top, back-to-top]
vizinhos: [icon-button, link, scroll-area]
referencias: [docs/active/componentes/back-to-top/spec.md]
---

# Back To Top

Botão flutuante que aparece depois de rolar uma página longa e leva de volta ao começo. Poupa a pessoa de rolar tudo para cima.

## Quando usar

- Páginas longas: listas, artigos, documentação, resultados de busca.
- Um por página, no canto inferior direito.

## Quando NÃO usar

- Página curta, que cabe em duas telas → não precisa.
- Ir para uma seção específica → `link` para a âncora.
- Rolagem dentro de um painel → `scroll-area`.

## Anatomia

| Parte | O que é |
|---|---|
| `BackToTop` | `icon-button` outline redondo com a seta para cima, fixo no canto inferior direito |

## Composição

Usa: [`icon`](icon.md) · [`icon-button`](icon-button.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `className` | `string` | — | Ajusta a posição (ex.: subir acima de outro botão fixo) |
| `threshold` | `number` | `400` | Quanto rolar, em pixels de rolagem, até o botão aparecer |
| `label` | `string` | — | Nome para o leitor de tela. Padrão do dicionário: "Voltar ao topo" |

## Variantes

Nenhuma.

## Tamanhos

Um só: o tamanho `icon` do `icon-button`.

## Estados

| Estado | Como aparece |
|---|---|
| Escondido | Antes de rolar o `threshold`: invisível e fora da ordem do Tab |
| Visível | Depois de rolar: aparece com transição de opacidade |

## Conteúdo

- Só o ícone de seta para cima; o nome vai no `aria-label`.

## Acessibilidade

- **Teclado:** Quando visível, entra na ordem do Tab; Enter ou Espaço leva ao topo.
- **Leitor de tela:** Botão com nome "Voltar ao topo". Escondido, não é anunciado.
- **Foco:** Ao clicar, o foco vai para o conteúdo principal (`main`, ou o documento se não houver), e o próximo Tab segue dali.
- **Cuidados:** Com `prefers-reduced-motion`, o salto é direto, sem rolagem suave.

## Tokens usados

- **Espaço:** `bottom-6` `right-6`
- **Raio:** `rounded-full`
- **Sombra:** `shadow-md`

## Faça

- Use em páginas com mais de duas telas de conteúdo.
- Ajuste o `threshold` para a altura de uma tela, mais ou menos.
- Deixe espaço no canto para ele não cobrir conteúdo.

## NÃO faça

- Dois botões fixos no mesmo canto → suba um deles com `className`.
- Usar em página curta → tire o botão.
- Texto no lugar do ícone → mantenha só a seta e o nome acessível.

## Exemplo mínimo

```tsx
import { BackToTop } from "@/components/ui/back-to-top"

<BackToTop />
```
