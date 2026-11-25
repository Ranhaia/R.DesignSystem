---
slug: color-picker
nome: Color Picker
camada: molecule
codigo: src/components/ui/color-picker.tsx
story: src/components/ui/color-picker.stories.tsx
status: piloto
sinonimos: [seletor-de-cor, cor, color, colorpicker, paleta, hex, hexadecimal]
vizinhos: [input, popover, slider]
referencias: [spec:color-picker]
---

# Color Picker

Escolhe uma cor: livre, na área de saturação e brilho mais a matiz; digitada em hexadecimal; ou tirada de uma paleta. Devolve sempre o hex.

## Quando usar

- A pessoa escolhe uma cor qualquer: tema de marca, etiqueta, destaque.
- A paleta sugere cores, mas a pessoa pode sair dela.

## Quando NÃO usar

- Só algumas cores possíveis, sem cor livre → `toggle-group` com amostras
- Cor que é token do tema → o construtor de tema em Fundamentos

## Anatomia

| Parte | O que é |
|---|---|
| `Painel` | Interno: área, matiz, hex e paleta; não é exportado. |
| `ColorPickerPanel` | O painel solto, para usar inline. Raiz `<div>` com o `className`. |
| `ColorPicker` | Botão `data-slot="color-picker"` (amostra + hex) que abre o painel num `popover`. |
| Área | `data-slot="color-picker-area"`, `role="slider"`: saturação na horizontal, brilho na vertical. |
| Amostra da paleta | `button` `data-slot="color-picker-swatch"` com `aria-pressed`. |

## Composição

Usa: [`button`](button.md) · [`input`](input.md) · [`popover`](popover.md) · [`slider`](slider.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` (Painel) | `string` | — | Cor controlada, em hex (`#abc` ou `#aabbcc`). Use com `onValueChange`. |
| `defaultValue` (Painel) | `string` | — | Cor inicial quando não controlada. Padrão: `#000000`. |
| `onValueChange` (Painel) | `(hex: string) => void` | — | Recebe a cor nova, sempre `#rrggbb` minúsculo. |
| `paleta` (Painel) | `string[]` | — | Cores prontas em hex. Sem ela, não há paleta. |
| `value` (ColorPickerPanel) | `string` | — | Cor controlada, em hex (`#abc` ou `#aabbcc`). Use com `onValueChange`. |
| `defaultValue` (ColorPickerPanel) | `string` | — | Cor inicial quando não controlada. Padrão: `#000000`. |
| `onValueChange` (ColorPickerPanel) | `(hex: string) => void` | — | Recebe a cor nova, sempre `#rrggbb` minúsculo. |
| `paleta` (ColorPickerPanel) | `string[]` | — | Cores prontas em hex. Sem ela, não há paleta. |
| `className` (ColorPickerPanel) | `string` | — | Classes extras na raiz. |
| `value` | `string` | — | Cor controlada, em hex (`#abc` ou `#aabbcc`). Use com `onValueChange`. |
| `defaultValue` | `string` | — | Cor inicial quando não controlada. Padrão: `#000000`. |
| `onValueChange` | `(hex: string) => void` | — | Recebe a cor nova, sempre `#rrggbb` minúsculo. |
| `paleta` | `string[]` | — | Cores prontas em hex. Sem ela, não há paleta. |
| `label` | `string` | — | Nome do campo, dito antes do hex no botão. Padrão: "Cor". |
| `className` | `string` | — | Classes extras na raiz. |
| `disabled` | `boolean` | — | Desliga o botão. |

## Variantes

Sem variante: `ColorPicker` abre num `popover`; `ColorPickerPanel` é o mesmo painel inline.

## Tamanhos

Sem tamanho: o botão usa o tamanho padrão do `button` e o painel tem largura fixa da escala (`w-56`).

## Estados

| Estado | Como aparece |
|---|---|
| Aberto | Painel no `popover`, sob o botão |
| Hex inválido | Campo continua com o texto e marcado como inválido (`aria-invalid`) até ser corrigido; a cor não muda |
| Cor da paleta | A amostra da cor atual ganha anel (`aria-pressed`) |
| Desabilitado | Botão sem interação |

## Conteúdo

- O `label` diz para que serve a cor ("Cor da marca"); o leitor de tela ouve o nome e o hex.
- Textos de sistema (área, matiz, hexadecimal, paleta) vêm do dicionário (pt-BR ou en).

## Acessibilidade

- **Teclado:** Na área, setas mudam saturação (←→) e brilho (↑↓); Shift anda 10. A matiz é o `slider` (setas, Home, End). Enter no hex confirma; Tab percorre as amostras.
- **Leitor de tela:** A área anuncia "Saturação X%, brilho Y%"; o botão diz o nome e a cor atual; cada amostra diz o hex e se é a atual.
- **Foco:** Anel de foco em todas as peças; ao abrir, o foco entra no `popover`.
- **Cuidados:** O hex fica sempre visível: a cor nunca depende só de ver a amostra.

## Tokens usados

- **Espaço:** `gap-1.5` `gap-2` `gap-3` `h-3` `h-36` `inset-0` `size-4`
  `size-5` `size-6` `size-9` `w-56`
- **Raio:** `radius-inset-0` `radius-inset-2.5` `radius-inset-4`
  `rounded-full` `rounded-inner` `rounded-outer-md`
- **Sombra:** `shadow-sm`
- **Foco:** `ring-ring`

## Faça

- Passe `label` com a finalidade da cor.
- Ofereça `paleta` com as cores da marca.
- Confira o contraste da cor escolhida onde ela for usada.

## NÃO faça

- Usar para trocar token do tema → construtor de tema
- Só a amostra, sem o hex → deixe o hex visível
- Paleta com dezenas de cores → poucas, as da marca

## Exemplo mínimo

```tsx
import { ColorPicker } from "@/components/ui/color-picker"

export function ExemploCor() {
  return <ColorPicker label="Cor da etiqueta" defaultValue="#2563eb" paleta={["#2563eb", "#16a34a"]} />
}
```
