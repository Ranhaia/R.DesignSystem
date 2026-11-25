---
slug: number-input
nome: Number Input
camada: organism
codigo: src/components/ui/number-input.tsx
story: src/components/ui/number-input.stories.tsx
status: piloto
sinonimos: [numero, número, campo-numerico, quantidade, stepper-numerico, spinbutton, numeric-input]
vizinhos: [input, slider]
referencias: [spec:number-input]
---

# Number Input

Campo para um número exato, com botões − e + nas pontas e setas do teclado. Respeita `min`, `max` e `step` e escreve o número no formato do idioma ativo.

## Quando usar

- Quantidade, número de pessoas, parcelas: valor exato e curto.
- Medida com casas decimais e passo fixo (`step={0.5}`).

## Quando NÃO usar

- Valor aproximado num intervalo → `slider`
- Código, CEP, telefone ou documento (não é quantidade) → `input` com `inputMode="numeric"`

## Anatomia

| Parte | O que é |
|---|---|
| `NumberInput` | Raiz `input-group` com `data-slot="number-input"`; o `className` vai nela. |
| Diminuir | `input-group-button` com ícone `remove`, no início; desligado no `min`. |
| Campo | `input-group-input` com `role="spinbutton"` e `inputMode="decimal"`, texto centralizado. |
| Aumentar | `input-group-button` com ícone `add`, no fim; desligado no `max`. |

## Composição

Usa: [`icon`](icon.md) · [`input-group`](input-group.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `aria-label` | `string` | — | Nome do campo quando não há `label` por fora |
| `value` | `number` · `null` | — | Número controlado; `null` é vazio |
| `defaultValue` | `number` · `null` | — | Número inicial |
| `onValueChange` | `(value: number | null) => void` | — | Recebe o número (ou `null`) ao passo, ao sair do campo ou com Enter |
| `min` | `number` | — | Menor valor aceito |
| `max` | `number` | — | Maior valor aceito |
| `step` | `number` | `1` | Quanto − e + (e ↑ ↓) mudam; as casas do `step` definem o arredondamento |

## Variantes

Sem variantes: o visual é o do `input-group`.

## Tamanhos

Sem tamanhos próprios: a altura é a do `input-group`.

## Estados

| Estado | Como aparece |
|---|---|
| Vazio | Campo em branco; o primeiro passo vai para o `min` |
| No limite | O botão do lado do limite fica desligado |
| Digitando | Texto livre; vira número ao sair do campo ou com Enter. Texto inválido volta ao último valor |
| Desabilitado | `disabled` vale para o campo e os dois botões |

## Conteúdo

- O rótulo diz a unidade quando houver ("Peso em kg").
- O formato (milhar e decimal) vem do idioma ativo; não formate por fora.

## Acessibilidade

- **Teclado:** ↑ e ↓ dão um passo; Enter confirma o texto digitado. Os botões ficam fora do Tab, porque as setas fazem o mesmo.
- **Leitor de tela:** O campo é `spinbutton`, com valor (já formatado, `aria-valuetext`), mínimo e máximo anunciados. Os botões dizem "Diminuir" e "Aumentar".
- **Foco:** Anel do `input-group` em volta de tudo; clicar em − ou + não tira o foco do lugar.
- **Cuidados:** Passe `label` ou `aria-label`. Não é `type="number"`: esse tipo ignora o separador do idioma e muda o valor com a rolagem.

## Tokens usados

Nenhum.

## Faça

- Defina `min` e `max` sempre que o negócio tiver limite.
- Use `step` com as casas que o valor aceita (`0.5`, `0.01`).
- Leia o valor por `onValueChange`, que já entrega número.

## NÃO faça

- Usar para dinheiro → `currency-input`
- Usar para CEP, telefone ou documento → `input` com `inputMode="numeric"`
- Formatar o número à mão no `value` → deixe o componente formatar no idioma

## Exemplo mínimo

```tsx
import { NumberInput } from "@/components/ui/number-input"

export function ExemploQuantidade() {
  return <NumberInput aria-label="Quantidade" defaultValue={1} min={1} max={10} />
}
```
