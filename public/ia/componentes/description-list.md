---
slug: description-list
nome: Description List
camada: atom
codigo: src/components/ui/description-list.tsx
story: src/components/ui/description-list.stories.tsx
status: piloto
sinonimos: [lista-de-definicoes, lista-de-descricao, ficha, ficha-de-detalhes, detalhes, rotulo-valor, chave-valor, dl, definition-list, key-value]
vizinhos: [table, item, card]
referencias: [spec:description-list]
---

# Description List

Pares rótulo/valor de um único registro, como numa ficha de detalhes. Usa a lista de definições do HTML, para o leitor de tela ligar cada rótulo ao seu valor.

## Quando usar

- Mostrar os dados de um registro só: perfil, pedido, contrato, resumo antes de confirmar.
- Rótulos curtos com valores de tamanho variado.

## Quando NÃO usar

- Vários registros com os mesmos campos → `table`.
- Lista de itens parecidos, cada um com ação → `item` / `list`.
- Valores que a pessoa edita → `field` com o controle certo.

## Anatomia

| Parte | O que é |
|---|---|
| `DescriptionList` | O conjunto (`dl`). Define o layout. |
| `DescriptionItem` | Um par (`div`), o agrupador válido dentro de `dl`. |
| `DescriptionTerm` | O rótulo (`dt`), texto base apagado. |
| `DescriptionDetails` | O valor (`dd`), texto base médio. Pode haver mais de um por item. |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `layout` | `stacked` · `inline` | `stacked` | `stacked` põe o rótulo em cima do valor; `inline` põe lado a lado, com a coluna de rótulos alinhada. |

## Variantes

Sem variantes de visual. A disposição vem da prop `layout`: `stacked` (padrão) para coluna estreita e valores longos; `inline` para espaço largo e valores curtos.

## Tamanhos

Sem tamanhos próprios: o texto é o `text` base.

## Estados

Só leitura; não tem estados interativos.

## Conteúdo

- Rótulo curto, sem dois-pontos (o layout já separa).
- Valor ausente: mostre um traço ou "Não informado", nunca deixe o `dd` vazio.

## Acessibilidade

- **Teclado:** não recebe foco; links ou botões dentro do valor seguem a ordem normal.
- **Leitor de tela:** anuncia a lista de definições e cada rótulo com seu valor.
- **Foco:** sem foco próprio.
- **Cuidados:** só `DescriptionItem`, `dt` e `dd` dentro de `dl`; não troque por `div` soltos.

## Tokens usados

- **Espaço:** `gap-4` `gap-x-6` `gap-y-1` `gap-y-3`

## Faça

- Agrupar fichas longas em seções com título (`title`) acima de cada lista.
- Manter a mesma ordem de campos em todas as fichas do mesmo tipo.
- Usar `inline` só quando os rótulos têm tamanho parecido.

## NÃO faça

- Comparar vários registros lado a lado numa lista → `table`.
- Deixar o valor vazio → traço ou "Não informado".
- Pôr campo editável no valor → `field` num formulário.

## Exemplo mínimo

```tsx
import {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list"

<DescriptionList>
  <DescriptionItem>
    <DescriptionTerm>Plano</DescriptionTerm>
    <DescriptionDetails>Profissional</DescriptionDetails>
  </DescriptionItem>
</DescriptionList>
```
