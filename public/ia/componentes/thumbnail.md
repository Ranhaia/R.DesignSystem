---
slug: thumbnail
nome: Thumbnail
camada: atom
codigo: src/components/ui/thumbnail.tsx
story: src/components/ui/thumbnail.stories.tsx
status: piloto
sinonimos: [miniatura, foto-miniatura]
vizinhos: [avatar, aspect-ratio]
referencias: [spec:thumbnail]
---

# Thumbnail

Miniatura visual de imagem com proporção fixa e cantos arredondados. Oferece fallback integrado para erros de carregamento e preserva o layout.

## Quando usar

- Apresentação de fotos de produtos em listagens, catálogos e carrinhos de compras.
- Exibição de prévias em galerias de mídia, comprovantes ou detalhes de pedidos.

## Quando NÃO usar

- Exibir foto de perfil ou identificação de usuário em formato circular → `avatar`.
- Bloquear a proporção de containers de mídia arbitrária sem tratamento de imagem → `aspect-ratio`.

## Anatomia

| Parte | O que é |
|---|---|
| `Thumbnail` | Container raiz com proporção fixa (`AspectRatio`) que renderiza a imagem ou fallback de erro |
| `Thumbnail.Skeleton` | Placeholder de carregamento (`ThumbnailSkeleton`) que preserva as dimensões e o aspecto |

## Composição

Usa: [`skeleton`](skeleton.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `alt` | `string` | — | Texto alternativo e acessível obrigatório da imagem |
| `src` | `string` | — | Caminho ou URL da imagem a ser exibida |
| `size` | `sm` · `default` · `lg` | `default` | Largura da miniatura |
| `aspectRatio` | `1/1` · `4/3` · `3/4` · `16/9` · `9/16` · `2/1` · `1/2` | `1/1` | Proporção fixa entre largura e altura |
| `children` | `React.ReactNode` | — | Conteúdo opcional sobreposto à miniatura, como badges |
| `size` (ThumbnailSkeleton) | `sm` · `default` · `lg` | `default` | Mesma largura do thumbnail substituído |
| `aspectRatio` (ThumbnailSkeleton) | `ThumbnailAspectRatio` | `1/1` | Mesma proporção mantida durante o carregamento |

## Variantes

Nenhuma variante pré-definida. A aparência do container é neutra (`bg-muted`) com cantos arredondados (`rounded-md`).

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `sm` | — | Miniatura compacta com largura de 64 px (`w-16`) para listas densas ou tabelas |
| `default` | — | Tamanho intermediário com largura de 96 px (`w-24`) para visualização de pedidos ou produtos |
| `lg` | — | Destaque com largura de 160 px (`w-40`) para galerias de fotos ou cartões amplos |

## Estados

| Estado | Como aparece |
|---|---|
| Carregada | Imagem exibida cobrindo toda a área proporcional (`object-cover`) |
| Fallback | Superfície neutra em `bg-muted` com `role="img"` e `aria-label` quando a imagem falha ou não possui `src` |

## Conteúdo

- Passe sempre um texto alternativo significativo e descritivo na prop `alt`: "Tênis esportivo azul", "Foto de capa do artigo".
- Evite frases redundantes como "Foto de" ou "Imagem de" no texto alternativo.

## Acessibilidade

- **Teclado:** Não recebe foco direto; quando a miniatura for interativa, envolva-a em um botão ou link.
- **Leitor de tela:** Elemento de imagem anuncia a propriedade `alt` obrigatória. No fallback de erro, expõe `role="img"` com o mesmo `aria-label`.
- **Foco:** Não retém foco de navegação por padrão.
- **Cuidados:** A propriedade `alt` é obrigatória no componente para atender às diretrizes da WCAG 1.1.1 (conteúdo não textual).

## Tokens usados

- **Cor:** `bg-muted`
- **Espaço:** `w-16` `w-24` `w-40`
- **Raio:** `rounded-md`

## Faça

- Sempre preencha a propriedade `alt` com uma descrição objetiva do conteúdo da imagem.
- Escolha a proporção `aspectRatio` adequada à orientação original da imagem para evitar cortes excessivos.
- Use `Thumbnail.Skeleton` com a mesma proporção e tamanho enquanto a imagem carrega.

## NÃO faça

- Omitir o texto alternativo descritivo na prop `alt` → descreva o conteúdo visual da imagem.
- Usar Thumbnail para exibir avatares de pessoas com recorte circular → `avatar`.
- Usar para containers de proporção livre sem imagem → `aspect-ratio`.

## Exemplo mínimo

```tsx
import { Thumbnail } from "@/components/ui/thumbnail"

<Thumbnail
  src="/produtos/relogio.jpg"
  alt="Relógio de pulso clássico com pulseira de couro marrom"
  size="default"
  aspectRatio="1/1"
/>
```
