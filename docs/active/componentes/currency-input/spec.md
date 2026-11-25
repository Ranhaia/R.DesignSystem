# Spec — Currency Input

Status: construído em 2026-11-25. Camada: organism (importa `input-group`, que já é molécula).

## Objetivo

Campo para valor em dinheiro, montado sobre o `input-group`, com o símbolo da
moeda num addon no início.

## Comportamento

- `currency` (ISO 4217, padrão `BRL`). O símbolo sai do `Intl` no idioma
  ativo (`R$`, `$`, `€`).
- Digitação livre. Ao sair do campo ou com Enter, o texto é lido no formato
  do idioma (com ou sem símbolo), arredondado nas casas da moeda e mostrado
  formatado (`1.500,00` em pt-BR, `1,500.00` em en; `JPY` sem casas).
- O milhar só vale em grupos de 3 dígitos ("1.5" em pt-BR é inválido). Texto
  inválido volta ao último valor válido; campo apagado fica vazio (`null`).
- `onValueChange(numero | null)` entrega o número, só quando ele muda.
- Se o `value` mudar por fora enquanto há texto digitado, vale o novo `value`.
- `type="text"` com `inputMode="decimal"`: `type="number"` não aceita o
  separador do idioma.

## Textos

Sem texto de sistema: o símbolo vem do `Intl`. O nome do campo é do produto
(`label` ou `aria-label`).
