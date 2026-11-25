# Spec — Color Picker

Status: construído em 2026-11-25. Camada: molecule (importa `button`,
`input`, `popover`, `slider`).

## Objetivo

Escolher uma cor: livre (área de saturação e brilho + matiz), digitada em
hexadecimal ou tirada de uma paleta. A cor escolhida é dado do produto, não
token: o componente só devolve o hex.

## Partes

- `ColorPicker`: botão (amostra + hex) que abre o painel num `popover`.
- `ColorPickerPanel`: o painel solto, para usar inline.
- Área: `role="slider"` com `aria-valuetext` ("Saturação 80%, brilho 60%").
  Ponteiro (mouse, toque, caneta) e setas: ←→ saturação, ↑↓ brilho, Shift
  anda 10.
- Matiz: o `slider` do DS, de 0 a 360.
- Hexadecimal: o `input`; aceita com ou sem `#`, curto (`#abc`) ou longo.
  Confirma no Enter ou ao sair; inválido fica marcado e não muda a cor.
- Paleta (opcional): botões com `aria-pressed` na cor atual.

## Estado

HSV interno: a matiz não se perde quando a cor fica cinza. Controlado
(`value` + `onValueChange`) ou não (`defaultValue`). Saída sempre `#rrggbb`
minúsculo.

## Textos

Do dicionário central (`colorPicker.*`).
