---
slug: currency-input
nome: Currency Input
camada: organism
codigo: src/components/ui/currency-input.tsx
story: src/components/ui/currency-input.stories.tsx
status: piloto
sinonimos: [dinheiro, moeda, valor, preco, preço, campo-de-dinheiro, money-input, currency]
vizinhos: [input, slider]
referencias: [spec:currency-input]
---

# Currency Input

Campo para valor em dinheiro: digita livre e, ao sair, mostra no formato do idioma e da moeda, com o símbolo ao lado. Entrega o número pronto em `onValueChange`.

## Quando usar

- Preço, valor de seguro, renda, limite: qualquer quantia em dinheiro.
- Telas em mais de um idioma ou moeda (`currency="USD"`).

## Quando NÃO usar

- Quantidade sem moeda, com − e + → `number-input`
- Faixa de preço aproximada → `slider`

## Anatomia

| Parte | O que é |
|---|---|
| `CurrencyInput` | Raiz `input-group` com `data-slot="currency-input"`; o `className` vai nela. |
| Símbolo | `input-group-addon` no início com o símbolo da moeda no idioma (`R$`, `$`). |
| Campo | `input-group-input` com `inputMode="decimal"` e números tabulares. |

## Composição

Usa: [`input-group`](input-group.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `aria-label` | `string` | — | Nome do campo quando não há `label` por fora |
| `value` | `number` · `null` | — | Valor controlado; `null` é vazio |
| `defaultValue` | `number` · `null` | — | Valor inicial |
| `onValueChange` | `(value: number | null) => void` | — | Recebe o número (ou `null`) ao sair do campo ou com Enter, só quando muda |
| `currency` | `string` | `BRL` | Código ISO 4217; define o símbolo e as casas decimais |

## Variantes

Sem variantes: o visual é o do `input-group`.

## Tamanhos

Sem tamanhos próprios: a altura é a do `input-group`.

## Estados

| Estado | Como aparece |
|---|---|
| Vazio | Só o símbolo; o campo em branco é `null` |
| Digitando | Texto livre, sem máscara |
| Confirmado | Ao sair ou com Enter, o valor aparece formatado com as casas da moeda |
| Inválido | Texto que não é valor volta ao último valor válido |

## Conteúdo

- O rótulo diz o que é o valor ("Valor do seguro"), sem a moeda: o símbolo já está no campo.
- Formato e símbolo vêm do idioma ativo; não formate por fora.

## Acessibilidade

- **Teclado:** Enter confirma e formata o texto digitado; Tab sai e também confirma.
- **Leitor de tela:** O símbolo fica no grupo junto do campo; o valor lido é o texto formatado.
- **Foco:** Anel do `input-group` em volta do símbolo e do campo.
- **Cuidados:** Passe `label` ou `aria-label`. Não é `type="number"`: esse tipo não aceita o separador do idioma. Sem máscara durante a digitação, para não brigar com o cursor.

## Tokens usados

Nenhum.

## Faça

- Guarde o número de `onValueChange`, nunca o texto do campo.
- Passe `currency` sempre que a moeda não for real.
- Valide limites (mínimo, máximo) no formulário, pelo `field`.

## NÃO faça

- Escrever "R$" no rótulo ou no `placeholder` → o símbolo já aparece no campo
- Usar `input` com máscara de dinheiro → `currency-input`
- Usar para quantidade sem moeda → `number-input`

## Exemplo mínimo

```tsx
import { CurrencyInput } from "@/components/ui/currency-input"

export function ExemploValor() {
  return <CurrencyInput aria-label="Valor do seguro" onValueChange={console.log} />
}
```
