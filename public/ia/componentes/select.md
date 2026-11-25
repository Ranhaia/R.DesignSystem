---
slug: select
nome: Select
camada: atom
codigo: src/components/ui/select.tsx
story: src/components/ui/select.stories.tsx
status: piloto
sinonimos: [selecao, seleção, lista-suspensa]
vizinhos: [native-select, combobox, radio-group, dropdown-menu]
referencias: [passi:selecao, shadcn:select]
---

# Select

Menu suspenso customizado acionado por botão para seleção de uma opção em uma lista. Suporta itens estruturados com ícones, grupos de opções e rótulo integrado ou animado.

## Quando usar

- Seleção única entre 5 e 15 opções em formulários desktop e interfaces ricas.
- Itens que necessitam de formatação rica, como ícones, descrições secundárias ou separadores temáticos.

## Quando NÃO usar

- Até 4 ou 5 opções que podem permanecer visíveis diretamente na tela → `radio-group`.
- Listas muito extensas (acima de 15 itens) que exigem campo de busca ou filtro por digitação → `combobox`.
- Preferência pelo comportamento e rolagem nativos do dispositivo móvel sem customização → `native-select`.

## Anatomia

| Parte | O que é |
|---|---|
| `Select` | Raiz (Radix Select) que gerencia o valor selecionado e o estado aberto ou fechado |
| `SelectTrigger` | Botão que exibe o valor atual e abre o menu suspenso ao ser acionado |
| `SelectValue` | Espaço interno que renderiza o valor da opção selecionada ou o texto de placeholder |
| `SelectContent` | Painel flutuante renderizado em portal com rolagem e opções disponíveis |
| `SelectItem` | Opção individual com destaque de foco e ícone de seleção (check) |
| `SelectGroup` | Agrupador semântico de opções relacionadas |
| `SelectLabel` | Rótulo descritivo para um grupo de opções dentro do menu |
| `SelectSeparator` | Linha divisória fina para separar grupos ou seções no menu |
| `SelectScrollUpButton` | Botão indicador de rolagem para cima quando a lista excede a altura máxima |
| `SelectScrollDownButton` | Botão indicador de rolagem para baixo quando há itens adicionais ocultos |

## Composição

Usa: [`icon`](icon.md) · [`label`](label.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` (SelectTrigger) | `sm` · `default` | `default` | Altura do gatilho: default com 36 px (h-9) e sm com 32 px (h-8) |
| `label` (SelectTrigger) | `React.ReactNode` | — | Rótulo exibido acima ou animado sobre o gatilho |
| `animatedLabel` (SelectTrigger) | `boolean` | `false` | Ativa animação flutuante do rótulo no foco ou preenchimento |
| `position` (SelectContent) | `item-aligned` · `popper` | `item-aligned` | Posicionamento alinhado ao item ativo ou ancorado como popover |
| `align` (SelectContent) | `start` · `center` · `end` | `center` | Alinhamento horizontal do painel em relação ao gatilho |
| `value` · `defaultValue` (Select) | `string` | — | Valor controlado ou inicial da opção selecionada |
| `onValueChange` (Select) | `(value: string) => void` | — | Callback disparado quando o valor selecionado muda |
| `disabled` (Select, SelectItem) | `boolean` | `false` | Desativa a interação do componente ou da opção |

## Variantes

Nenhuma. O gatilho adota borda border-input e o menu suspenso utiliza superfície bg-popover com sombra shadow-md.

## Tamanhos

Dois tamanhos controlados pela prop size no SelectTrigger: default com 36 px de altura (h-9) e sm com 32 px (h-8).

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Gatilho com borda border-input e texto placeholder atenuado |
| Foco no gatilho | Anel de 3 px em ring-ring e borda border-ring no SelectTrigger |
| Aberto | Menu flutuante exibido com animação de fade e zoom |
| Item em foco | Fundo bg-accent e texto text-accent-foreground no SelectItem navegado |
| Inválido | Borda destacada em border-destructive e anel sutil em ring-destructive/20 |
| Desabilitado | Opacidade reduzida em 50% com cursor not-allowed no gatilho |

## Conteúdo

- Placeholder conciso no gatilho quando nenhuma opção estiver selecionada: "Selecione um plano".
- Rótulos de itens curtos e objetivos em ordem alfabética ou hierárquica.
- Use SelectGroup e SelectLabel para categorizar opções em listas com mais de 7 itens.

## Acessibilidade

- **Teclado:** Espaço, Enter ou Setas Acima/Abaixo abrem o menu a partir do SelectTrigger focado. As setas navegam entre os itens. Enter ou Espaço selecionam a opção focada e fecham o menu. Esc fecha sem alterar e devolve o foco ao gatilho.
- **Leitor de tela:** Papel combobox no gatilho com aria-expanded e aria-haspopup="listbox". O painel atua com papel listbox e os itens com papel option, anunciando o estado selecionado via aria-selected.
- **Foco:** Anel visível de 3 px em ring-ring no gatilho. Ao abrir o menu, o foco se move para o item selecionado ou o primeiro item. Ao fechar, retorna para o SelectTrigger.
- **Cuidados:** Sempre associe um rótulo textual via prop label ou aria-label no SelectTrigger. Para listas longas acima de 15 opções que necessitam de digitação e busca, prefira o componente combobox.

## Tokens usados

- **Cor:** `bg-accent` `bg-border` `bg-input` `bg-popover`
  `border-destructive` `border-input` `border-ring`
  `text-accent-foreground` `text-foreground` `text-muted-foreground`
  `text-popover-foreground`
- **Tipografia:** `text-sm` `text-xs`
- **Espaço:** `gap-1.5` `gap-2` `h-8` `h-9` `h-px` `left-0` `left-3`
  `min-w-32` `mt-5` `mx-1` `my-1` `p-1` `pl-2` `pr-8` `px-2` `px-3`
  `py-1` `py-1.5` `py-2` `right-2` `size-3.5` `size-4` `top-0` `top-1`
- **Raio:** `rounded-md` `rounded-sm`
- **Sombra:** `shadow-md` `shadow-xs`
- **Movimento:** `duration-motion-fast`
- **Foco:** `outline-ring` `ring-destructive` `ring-ring`

## Faça

- Mantenha um texto de placeholder claro como "Selecione uma opção".
- Agrupe itens semelhantes utilizando SelectGroup e SelectLabel.
- Use em formulários desktop onde formatações visuais enriquecidas agregam valor.

## NÃO faça

- Usar para 2 a 4 opções simples que cabem visíveis → prefira `radio-group` ou `segmented-control`.
- Listas muito extensas com mais de 15 itens sem busca → utilize `combobox`.
- Usar para lista de ações ou comandos que executam funções → utilize `dropdown-menu`.

## Exemplo mínimo

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select defaultValue="mensal">
  <SelectTrigger className="w-48" aria-label="Frequência de pagamento">
    <SelectValue placeholder="Selecione" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="mensal">Mensal</SelectItem>
    <SelectItem value="anual">Anual</SelectItem>
  </SelectContent>
</Select>
```
