---
slug: separator
nome: Separator
camada: primitive
codigo: src/components/ui/separator.tsx
story: src/components/ui/separator.stories.tsx
status: piloto
sinonimos: [divisor, divider, hr, linha-divisoria]
vizinhos: [field, button-group, dropdown-menu]
referencias: [passi:divisor, shadcn:separator]
---

# Separator

Linha fina que separa grupos de conteúdo dentro do mesmo container. Use com moderação: espaço costuma separar melhor do que linha.

## Quando usar

- Separar grupos dentro do mesmo container: blocos de um card, grupos de um painel.
- Separar itens lado a lado numa barra de texto: Blog | Documentação | Código-fonte.

## Quando NÃO usar

- Separar os itens de uma lista curta → espaço no container (`gap-*`, `space-y-*`).
- Separador dentro de menu, grupo de botões ou formulário, inclusive linha com texto ("ou continue com") → o da própria peça: `DropdownMenuSeparator` (`dropdown-menu`), `ButtonGroupSeparator` (`button-group`), `FieldSeparator` (`field`, que aceita texto).
- Marcar o começo de uma seção da página → um título (`title`) acima dela.

## Anatomia

| Parte | O que é |
|---|---|
| `Separator` | Linha de 1 px em `bg-border` (Radix Separator). Na horizontal ocupa a largura; na vertical, a altura do pai |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `orientation` | `horizontal` · `vertical` | `horizontal` | Direção da linha |
| `decorative` | `boolean` | `true` | `true` esconde do leitor de tela (`role="none"`). `false` anuncia como separador (`role="separator"`) |

## Variantes

Nenhuma. A direção vem de `orientation`.

## Tamanhos

Um só: 1 px de espessura (`h-px` ou `w-px`). O comprimento acompanha o container.

## Estados

Só leitura: não recebe foco.

## Conteúdo

- Não tem texto próprio. Para linha com texto, use `FieldSeparator` com uma ou duas palavras em minúsculas: "ou".

## Acessibilidade

- **Teclado:** Não recebe foco.
- **Leitor de tela:** Com `decorative` (padrão), fica fora da árvore de acessibilidade. Com `decorative={false}`, é anunciado como separador.
- **Foco:** Nenhum.
- **Cuidados:** A linha decorativa não precisa de contraste mínimo, mas nenhuma informação pode depender só dela. Seção de verdade se marca com título, não com a linha.

## Tokens usados

- **Cor:** `bg-border`
- **Espaço:** `h-px` `w-px`

## Faça

- Separe grupos de conteúdo diferentes dentro do mesmo container.
- Na vertical, dê altura ao pai (ex.: `flex h-5`), porque a linha ocupa `h-full`.
- Use `decorative={false}` só quando a divisão precisa ser anunciada ao leitor de tela.

## NÃO faça

- Linha entre todos os itens de uma lista curta → espaço no container (`gap-*`).
- Separator para criar margem → espaçamento do container (`my-*`, `gap-*`).
- Linha grossa ou colorida para chamar atenção → `bg-border` de 1 px; para destacar, um título ou `card`.

## Exemplo mínimo

```tsx
import { Separator } from "@/components/ui/separator"

<Separator className="my-4" />

<div className="flex h-5 items-center gap-4 text-sm">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Documentação</span>
</div>
```
