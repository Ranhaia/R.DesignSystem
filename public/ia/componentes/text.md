---
slug: text
nome: Text
camada: primitive
codigo: src/components/ui/text.tsx
story: src/components/ui/text.stories.tsx
status: piloto
sinonimos: [texto, paragrafo, parágrafo]
vizinhos: [title, label, link]
referencias: [spec:text]
---

# Text

Formata blocos de texto e parágrafos com escala tipográfica e peso definidos. Garante a semântica correta com a tag HTML adequada.

## Quando usar

- Parágrafos de texto corrido ou blocos de descrição em páginas, cards e diálogos.
- Trechos de texto dentro de outros blocos que precisam de formatação visual diferenciada.
- Legendas, notas de rodapé ou metadados auxiliares usando tamanho reduzido.

## Quando NÃO usar

- Títulos e subtítulos estruturais de páginas ou seções → title
- Rótulo descritivo conectado a um controle de formulário → label
- Elemento textual interativo que dispara ação ou navegação → link

## Anatomia

| Parte | O que é |
|---|---|
| `Text` | Elemento textual raiz que aplica as variantes de tamanho, peso e cor atenuada |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` | `caption` · `base` · `highlight` | `base` | Tamanho do texto na escala tipográfica |
| `weight` | `regular` · `medium` · `bold` | `regular` | Peso da fonte aplicado |
| `muted` | `true` · `false` | `false` | Aplica cor atenuada para texto secundário |
| `as` | `TextElement` | `p` | Tag HTML real renderizada |

## Variantes

Nenhuma. O peso vem de weight e a cor atenuada de muted.

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `caption` | — | Texto auxiliar, legendas e notas de apoio |
| `base` | — | Corpo de texto padrão para leitura |
| `highlight` | — | Destaque visual ou parágrafos introdutórios |

## Estados

Só leitura: não recebe foco.

## Conteúdo

- Inicie frases completas em maiúscula e finalize com pontuação: "As configurações foram atualizadas."
- Mantenha legendas e textos auxiliares concisos: "Formatos aceitos: PDF e PNG."
- Use a variante muted para informações secundárias ou complementares.

## Acessibilidade

- **Teclado:** Não recebe foco.
- **Leitor de tela:** Anunciado como texto estático conforme a semântica da tag informada na prop as.
- **Foco:** Não retém nem recebe foco.
- **Cuidados:** Use as="p" para blocos e as="span" para trechos em linha; nunca use para substituir títulos estruturais (critério WCAG 1.3.1).

## Tokens usados

- **Cor:** `text-foreground` `text-muted-foreground`
- **Tipografia:** `font-bold` `font-medium` `font-normal` `text-base`
  `text-sm` `text-xs`

## Faça

- Defina o elemento HTML adequado via prop as para preservar a semântica.
- Mantenha o tamanho base como padrão para parágrafos e corpo de texto.
- Aplique muted apenas em textos que possuem papel secundário ou auxiliar.

## NÃO faça

- Text como parágrafo longo em negrito constante → weight regular com ênfase pontual
- Text com tamanho caption para corpo principal de leitura → size base
- Estilização de cor arbitrária fora do sistema de tokens → prop muted ou token semântico

## Exemplo mínimo

```tsx
import { Text } from "@/components/ui/text"

<Text>
  Texto de corpo padrão para leitura e formatação de blocos de conteúdo.
</Text>
```
