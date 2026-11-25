# Spec — Number Input

Status: construído em 2026-11-25. Camada: organism (importa `input-group`, que já é molécula, além de `icon`).

## Objetivo

Campo para quantidade e outros números, com botões − e + nas pontas, montado
sobre o `input-group`.

## Comportamento

- `min`, `max` e `step` (padrão 1). − e + somam ou subtraem o `step`, sem
  passar dos limites; o botão do limite fica desligado. Sem valor, o primeiro
  passo vai para o `min` (ou para ±`step`).
- Teclado: ↑ e ↓ dão um passo. A digitação é livre; ao sair do campo ou com
  Enter, o texto é lido no formato do idioma e preso aos limites. Texto que
  não é número volta ao último valor válido; campo apagado fica vazio
  (`null`). O milhar só vale em grupos de 3 dígitos: "1.5" em pt-BR é
  inválido, nunca 15.
- O passo soma o `step` ao valor atual; não se alinha a uma grade a partir do
  `min` (diferente do `type="number"` nativo).
- Se o `value` mudar por fora enquanto há texto digitado, o texto cai e vale o
  novo `value`. Com `readOnly`, botões e setas param.
- O número aparece formatado no idioma ativo (`Intl.NumberFormat` com
  `useIdioma()`): `1.234,5` em pt-BR, `1,234.5` em en.
- `onValueChange(numero | null)` entrega o número, nunca o texto.
- É `type="text"` com `inputMode="decimal"` e `role="spinbutton"` (com
  `aria-valuenow`, `aria-valuemin`, `aria-valuemax`): `type="number"` não
  aceita o separador do idioma e muda o valor com a rolagem do mouse.
- Os botões ficam fora da ordem de Tab (as setas fazem o mesmo) e clicar
  neles não tira o foco do campo. O leitor de tela ouve o valor formatado
  (`aria-valuetext`).

## Textos

Do dicionário central: `numberInput.diminuir` e `numberInput.aumentar`.
