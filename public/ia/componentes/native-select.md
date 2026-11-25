---
slug: native-select
nome: Native Select
camada: atom
codigo: src/components/ui/native-select.tsx
story: src/components/ui/native-select.stories.tsx
status: piloto
sinonimos: [select-nativo]
vizinhos: [select, radio-group, combobox]
referencias: [passi:selecao, shadcn:native-select]
---

# Native Select

Menu suspenso que usa o elemento select nativo do navegador para escolher uma opção em uma lista. Garante a melhor experiência nativa em dispositivos móveis e formulários simples.

## Quando usar

- Formulários em dispositivos móveis que se beneficiam do seletor nativo do sistema operacional.
- Seleção única entre mais de 5 opções simples, como estados, países ou anos.

## Quando NÃO usar

- Seleção com busca interna, ícones ou renderização customizada de itens → `select`.
- Poucas alternativas (até 5 opções) que cabem visíveis diretamente na tela → `radio-group`.
- Lista muito longa (acima de 15 opções) que exige digitação para filtrar → `combobox`.

## Anatomia

| Parte | O que é |
|---|---|
| `NativeSelect` | Container relativo com o elemento select nativo, chevron decorativo e suporte a rótulo fixo ou animado |
| `NativeSelectOption` | Opção individual (<option>) com contraste e cores adaptadas ao tema |
| `NativeSelectOptGroup` | Agrupador de opções (<optgroup>) para organizar categorias dentro do menu |
| Ícone (opcional) | Seta para baixo decorativa (Icon), posicionada à direita com clique desabilitado |
| Rótulo (opcional) | Texto via Label integrado, com opção de transição animada no foco |

## Composição

Usa: [`icon`](icon.md) · [`label`](label.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` | `sm` · `default` | `default` | Altura do seletor: default com 36 px (h-9) e sm com 32 px (h-8) |
| `label` | `React.ReactNode` | — | Rótulo exibido acima ou animado sobre o seletor |
| `animatedLabel` | `boolean` | `false` | Ativa o rótulo com animação flutuante ao focar ou preencher |
| `value` · `defaultValue` (NativeSelect) | `string` | — | Valor controlado ou inicial da opção selecionada |
| `disabled` (NativeSelect) | `boolean` | `false` | Desativa a interação e reduz a opacidade |

## Variantes

Nenhuma. O estilo de superfície acompanha os campos de entrada padrão.

## Tamanhos

Dois tamanhos controlados pela prop size: default com 36 px de altura (h-9) e sm com 32 px de altura (h-8) para interfaces mais densas.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Borda border-input, fundo transparente e sombra sutil shadow-xs |
| Hover | Fundo suavemente realçado no tema escuro |
| Foco | Anel de 3 px em ring-ring e borda border-ring no select |
| Inválido | Borda destacada em border-destructive via aria-invalid |
| Desabilitado | Opacidade reduzida em 50% no wrapper e cursor not-allowed no select |

## Conteúdo

- Primeira opção com texto de instrução neutro enquanto nada for escolhido: "Selecione um estado".
- Rótulo claro com substantivo indicando o que está sendo escolhido: "Estado de entrega".
- Opções concisas em ordem alfabética ou cronológica, sem ponto final.

## Acessibilidade

- **Teclado:** Tab move o foco para o campo. Espaço, Enter ou Alt+Seta Abaixo abrem a lista nativa do sistema. Setas navegam entre opções. Enter confirma a escolha e Esc fecha sem alterar.
- **Leitor de tela:** Elemento select nativo anunciado com seu papel, rótulo via label associado ou aria-label e valor selecionado.
- **Foco:** Anel visível de 3 px em ring-ring ao receber foco pelo teclado. Ao fechar o menu nativo, o foco permanece no elemento select.
- **Cuidados:** Sempre associe um rótulo visível via prop label ou passe aria-label quando o campo for exibido sem texto ao lado. Ao usar animatedLabel, passe value ou defaultValue explícitos para o rótulo não sobrepor a primeira opção selecionada pelo navegador.

## Tokens usados

- **Cor:** `bg-input` `bg-primary` `border-destructive` `border-input`
  `border-ring` `text-foreground` `text-muted-foreground`
  `text-primary-foreground`
- **Tipografia:** `text-sm`
- **Espaço:** `gap-1.5` `h-8` `h-9` `left-0` `left-3` `min-w-0` `mt-5`
  `pr-9` `px-3` `py-1` `py-2` `right-3.5` `top-0` `top-1`
- **Raio:** `rounded-md`
- **Sombra:** `shadow-xs`
- **Movimento:** `duration-motion-fast`
- **Foco:** `ring-ring`

## Faça

- Forneça uma primeira opção vazia ou com instrução clara como "Selecione uma opção".
- Agrupe listas longas por categorias usando NativeSelectOptGroup.
- Use em interfaces móveis para aproveitar a rolagem nativa do sistema operacional.

## NÃO faça

- Usar para 2 a 4 opções visíveis → prefira `radio-group` ou `segmented-control`.
- Lista que exige busca interna ou digitação livre → `combobox`.
- Deixar o seletor sem rótulo acessível → passe a prop `label` ou use `aria-label`.

## Exemplo mínimo

```tsx
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

<NativeSelect defaultValue="sp" aria-label="Estado">
  <NativeSelectOption value="pr">Paraná</NativeSelectOption>
  <NativeSelectOption value="rj">Rio de Janeiro</NativeSelectOption>
  <NativeSelectOption value="sp">São Paulo</NativeSelectOption>
</NativeSelect>
```
