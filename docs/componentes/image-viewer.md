---
slug: image-viewer
nome: Image Viewer
camada: organism
codigo: src/components/ui/image-viewer.tsx
story: src/components/ui/image-viewer.stories.tsx
status: piloto
sinonimos: [visualizador-de-imagem, lightbox, galeria, ampliar-imagem, zoom, visualizar-foto, image-gallery, fotos]
vizinhos: [dialog, carousel, aspect-ratio]
referencias: [spec:image-viewer]
---

# Image Viewer

Imagem grande por cima da página, com zoom, arrastar e galeria. É o `dialog` em tela cheia, com barra de ações, setas para trocar de imagem e miniaturas.

## Quando usar

- Ver em detalhe a foto de um produto, imóvel ou documento.
- Percorrer as fotos de uma galeria a partir da miniatura.

## Quando NÃO usar

- Fotos passando dentro da própria página → `carousel`.
- Imagem em proporção fixa na página → `aspect-ratio`.

## Anatomia

| Parte | O que é |
|---|---|
| `ImageViewer` | O visualizador: gatilho, barra (posição, reduzir, ampliar, fechar), palco com a imagem e as setas, e as miniaturas. |

## Composição

Usa: [`dialog`](dialog.md) · [`icon`](icon.md) · [`icon-button`](icon-button.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `images` | `ImagemDoVisualizador[]` | — | Lista de imagens (`src` e `alt`); com mais de uma, vira galeria. |
| `children` | `React.ReactNode` | — | Gatilho que abre o visualizador, como a miniatura. |
| `open` | `boolean` | — | Aberto, controlado. |
| `defaultOpen` | `boolean` | — | Aberto no início, sem controle. |
| `onOpenChange` | `(aberto: boolean) => void` | — | Chamado ao abrir ou fechar. |
| `index` | `number` | — | Imagem atual, controlada. |
| `defaultIndex` | `number` | `0` | Imagem mostrada ao abrir, sem controle. |
| `onIndexChange` | `(indice: number) => void` | — | Chamado ao trocar de imagem. |
| `className` | `string` | — | Classes extras na superfície em tela cheia. |

## Variantes

Sem variantes. Com uma imagem só, somem a posição, as setas e as miniaturas.

## Tamanhos

Sem tamanhos: ocupa a tela inteira; a imagem cabe no palco sem cortar.

## Estados

| Estado | Como aparece |
|---|---|
| Sem zoom | Imagem inteira; cursor de lupa. |
| Com zoom | De 1,5× a 4×; cursor de mão, arrastar move a imagem. |
| Limite do zoom | O botão do limite fica marcado como indisponível. |
| Miniatura atual | Opaca e com contorno; as outras, esmaecidas. |

## Conteúdo

- `alt` de cada imagem descreve o que se vê; ele vira o título do dialog e o nome da miniatura.
- Imagem em resolução alta: o zoom chega a 4×.

## Acessibilidade

- **Teclado:** setas trocam a imagem; `+`, `-` e `0` controlam o zoom; Esc fecha; Tab passa pela barra, setas e miniaturas.
- **Leitor de tela:** anuncia o dialog com o `alt` da imagem; a posição ("2 de 5") é anunciada ao trocar.
- **Foco:** preso no visualizador enquanto aberto e devolvido ao gatilho ao fechar (do `dialog`).
- **Cuidados:** sem pinça de dois dedos; no toque, o zoom é pelo duplo toque e pelos botões.

## Tokens usados

- **Cor:** `text-muted-foreground`
- **Tipografia:** `text-sm`
- **Espaço:** `end-2` `gap-0` `gap-1` `gap-2` `inset-0` `left-0`
  `min-h-0` `p-0` `p-2` `px-2` `size-14` `start-2` `top-0` `top-1`
- **Raio:** `rounded-full` `rounded-md`
- **Movimento:** `duration-motion-fast`
- **Foco:** `ring-primary` `ring-ring`

## Faça

- Usar a miniatura como gatilho, com nome ("Ampliar foto 1").
- Abrir na imagem clicada (`defaultIndex`).
- Escrever o `alt` de cada imagem.

## NÃO faça

- Usar para imagem decorativa → deixar só na página.
- Pôr formulário ou texto longo junto da imagem → `dialog`.
- Abrir sem gatilho visível → miniatura ou botão "Ver fotos".

## Exemplo mínimo

```tsx
import { ImageViewer } from "@/components/ui/image-viewer"

<ImageViewer images={[{ src: "/foto.jpg", alt: "Fachada" }]}>
  <button type="button">Ver foto</button>
</ImageViewer>
```
