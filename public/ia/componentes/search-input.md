---
slug: search-input
nome: Search Input
camada: organism
codigo: src/components/ui/search-input.tsx
story: src/components/ui/search-input.stories.tsx
status: piloto
sinonimos: [busca, campo-de-busca, search, pesquisa, search-bar, barra-de-busca]
vizinhos: [input-group, command, combobox]
referencias: [spec:search-input]
---

# Search Input

Campo de busca pronto: lupa no início, botão de limpar quando há texto e, se quiser, uma tecla de atalho que leva o foco até ele. Resolve a busca de lista ou página sem montar o `input-group` à mão.

## Quando usar

- Filtrar uma lista, tabela ou página pelo texto digitado.
- Busca principal de uma tela, com atalho de teclado (`shortcut="/"`).

## Quando NÃO usar

- Escolher um valor de uma lista fechada → `combobox`
- Executar comandos ou navegar por atalhos → `command`
- Campo com outro ícone ou botão que não é busca → `input-group`

## Anatomia

| Parte | O que é |
|---|---|
| `SearchInput` | Raiz `input-group` com `data-slot="search-input"`; o `className` vai nela. |
| Lupa | `input-group-addon` no início, com o ícone `search`. |
| Campo | `input-group-input` com `type="search"`; recebe as props de `<input>`. |
| Limpar | `input-group-button` com ícone `close`, no fim, só quando há texto. |
| Atalho | `kbd` com a tecla, no fim, enquanto o campo está vazio. |

## Composição

Usa: [`icon`](icon.md) · [`input-group`](input-group.md) · [`kbd`](kbd.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` / `defaultValue` | `string` | — | Texto controlado ou inicial |
| `aria-label` | `string` | "Buscar" | Nome do campo; troque quando a busca tem alvo ("Buscar pedidos") |
| `onValueChange` | `(value: string) => void` | — | Recebe o texto a cada mudança, inclusive ao limpar. Em modo controlado, é por ele que o limpar chega ao estado |
| `shortcut` | `string` | — | Uma tecla (ex.: `"/"`) que leva o foco ao campo; aparece com `kbd` |

## Variantes

Sem variantes: o visual é o do `input-group`.

## Tamanhos

Sem tamanhos próprios: a altura é a do `input-group`.

## Estados

| Estado | Como aparece |
|---|---|
| Vazio | Lupa e, se houver atalho, a tecla no fim |
| Com texto | O botão de limpar troca a tecla do atalho |
| Foco | Anel de foco do `input-group` em volta de tudo |
| Desabilitado | `disabled` no campo, herdado do `input`

## Conteúdo

- O `placeholder` diz o que se busca ("Buscar pedidos"), sem reticências.
- "Buscar" e "Limpar busca" vêm do dicionário de idioma; não escreva por fora.

## Acessibilidade

- **Teclado:** Esc com texto limpa o campo. A tecla de `shortcut`, apertada fora de outro campo e sem Ctrl, ⌘ ou Alt, leva o foco à busca.
- **Leitor de tela:** O campo é `type="search"` com nome "Buscar" por padrão; o atalho é anunciado por `aria-keyshortcuts` e a `kbd` fica fora da leitura. O botão diz "Limpar busca".
- **Foco:** Limpar pelo botão devolve o foco ao campo.
- **Cuidados:** O atalho não dispara enquanto alguém digita em outro campo. Evite letras comuns como atalho; prefira `/`.

## Tokens usados

Nenhum.

## Faça

- Use `onValueChange` para filtrar; ele também avisa quando o campo é limpo.
- Dê um `aria-label` com o alvo quando houver mais de uma busca na tela.
- Prefira `/` como atalho: não briga com a digitação nem com atalhos do navegador.

## NÃO faça

- Montar lupa e limpar à mão no `input-group` → `search-input`
- Usar busca para escolher um único valor → `combobox`
- Tratar o limpar só pelo `onChange` em modo controlado → use `onValueChange`

## Exemplo mínimo

```tsx
import { SearchInput } from "@/components/ui/search-input"

export function ExemploBusca() {
  return <SearchInput shortcut="/" placeholder="Buscar pedidos" onValueChange={console.log} />
}
```
