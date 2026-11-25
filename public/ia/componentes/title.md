---
slug: title
nome: Title
camada: primitive
codigo: src/components/ui/title.tsx
story: src/components/ui/title.stories.tsx
status: piloto
sinonimos: [titulo, título, heading, subtitulo, subtítulo]
vizinhos: [text, label, separator]
referencias: [spec:title]
---

# Title

Aplica hierarquia visual e semântica a cabeçalhos e títulos de páginas ou seções. Permite desacoplar a tag HTML semântica da escala visual aplicada.

## Quando usar

- Títulos de páginas ou telas principais usando h1 semântico.
- Cabeçalhos de seções, blocos de conteúdo e grupos em páginas ou painéis.
- Títulos de caixas de diálogo, cards ou painéis laterais que precisam de destaque visual específico.

## Quando NÃO usar

- Corpo de texto, parágrafos explicativos ou descrições longas → text
- Rótulo descritivo conectado a um controle de formulário → label
- Linha divisória visual sem texto de cabeçalho → separator

## Anatomia

| Parte | O que é |
|---|---|
| `Title` | Elemento raiz h1 a h6 que renderiza o título com a escala visual escolhida |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` | `h1` · `h2` · `h3` · `h4` · `h5` · `h6` | `h2` | Escala visual aplicada ao título |
| `as` | `TitleElement` | `h2` | Tag HTML semântica renderizada no documento |

## Variantes

Nenhuma. A escala visual é controlada pela prop size.

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `h1` | — | Título principal da página ou tela |
| `h2` | — | Seções principais dentro de uma página |
| `h3` | — | Subseções e blocos de conteúdo agrupados |
| `h4` | — | Cabeçalhos de cards e painéis médios |
| `h5` | — | Títulos de pequenos grupos ou listas |
| `h6` | — | Menor nível de cabeçalho para agrupamentos pontuais |

## Estados

Só leitura: não recebe foco.

## Conteúdo

- Títulos devem ser curtos, objetivos e começar com letra maiúscula: "Dados cadastrais"
- Não utilize ponto final em títulos ou subtítulos.
- Mantenha consistência gramatical entre títulos do mesmo nível hierárquico na tela.

## Acessibilidade

- **Teclado:** Não recebe foco.
- **Leitor de tela:** Anunciado com o nível de cabeçalho semântico definido pela prop as.
- **Foco:** Não retém nem recebe foco.
- **Cuidados:** Mantenha a ordem hierárquica semântica sem pular níveis no documento (h1 antes de h2, h2 antes de h3), mesmo se divergir a escala visual com a prop size (critério WCAG 1.3.1 e 2.4.6).

## Tokens usados

- **Cor:** `text-foreground`
- **Tipografia:** `font-bold` `font-heading` `font-semibold` `text-2xl`
  `text-3xl` `text-4xl` `text-base` `text-lg` `text-xl` `tracking-tight`

## Faça

- Use a prop as para estruturar a árvore semântica do documento em ordem lógica.
- Mantenha apenas um título h1 por página para clareza em leitores de tela e SEO.
- Ajuste a prop size quando um cabeçalho secundário demandar peso visual diferente do padrão.

## NÃO faça

- Pular níveis na hierarquia semântica (como h1 direto para h4) → ordenação sequencial de as
- Usar Title para parágrafos corridos em busca de destaque visual → text com weight bold
- Criar títulos em caixa alta integral por meio de digitação manual → estilo visual controlado

## Exemplo mínimo

```tsx
import { Title } from "@/components/ui/title"

<Title as="h1">Painel principal</Title>
<Title as="h2" size="h3">Visão geral</Title>
```
