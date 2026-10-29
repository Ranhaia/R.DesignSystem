---
slug: segmented-control
nome: SegmentedControl
camada: molecule
codigo: src/components/ui/segmented-control.tsx
story: src/components/ui/segmented-control.stories.tsx
status: piloto
sinonimos: [controle-segmentado, segmentado, alternador]
vizinhos: [tabs, toggle-group, select, radio-group]
referencias: [passi:controle-segmentado, spec:segmented-control]
---

# SegmentedControl

Alterna entre opções mutuamente excludentes em formato de pílula contínua com seleção estritamente única. Oferece troca imediata de modo ou visualização na mesma tela sem acoplamento a painéis de conteúdo.

## Quando usar

- Alternar modos de visualização rápida do mesmo conjunto de dados (ex.: Lista e Grade).
- Seleção de granularidade temporal em relatórios e gráficos (ex.: Dia, Semana, Mês).
- Escolha entre 2 a 4 alternativas fixas e visíveis que aplicam o efeito imediatamente.

## Quando NÃO usar

- Cada opção controla a troca de um painel de conteúdo longo e estruturado → `tabs`.
- Seleção múltipla simultânea ou botões com contorno individual → `toggle-group`.
- Mais de 4 opções em lista longa com limitação de espaço horizontal → `select`.

## Anatomia

| Parte | O que é |
|---|---|
| `SegmentedControl` | Container raiz baseado em ToggleGroupPrimitive com seleção única fixada e trilho em bg-muted |
| `SegmentedControlItem` | Opção individual com indicador ativo de fundo bg-background e elevação shadow-sm |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` (SegmentedControl) | `sm` · `default` · `lg` | `default` | Dimensão compartilhada com todos os itens do grupo via contexto |
| `size` (SegmentedControlItem) | `sm` · `default` · `lg` | `default` | Altura do segmento quando sobrescreve o tamanho do container |
| `value` · `defaultValue` (SegmentedControl) | `string` | — | Valor da opção selecionada de forma controlada ou não-controlada |
| `onValueChange` (SegmentedControl) | `(value: string) => void` | — | Callback disparado imediatamente ao selecionar uma nova opção |

## Variantes

Sem variantes no código: a apresentação segue o formato de pílula contínua em trilho neutro, destacando o segmento selecionado com fundo de superfície e sombra.

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `sm` | 28 px | Barras de ferramentas densas e cabeçalhos compactos |
| `default` | 32 px | Padrão para alternar visões ou filtros em páginas e painéis |
| `lg` | 36 px | Destaque em telas móveis e áreas com maior área de toque |

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Item inativo com texto `text-muted-foreground` e fundo transparente no trilho |
| Hover | Texto com realce `hover:text-foreground` |
| Pressionado | Escala física reduzida via `active:scale-(--scale-pressed)` com transição suave |
| Foco | Anel visível com `focus-visible:ring-[3px] focus-visible:ring-ring` e `z-10` |
| Selecionado | Fundo `bg-background`, texto `text-foreground` e elevação `shadow-sm` com `data-state="on"` |
| Desabilitado | Opacidade reduzida com `opacity-50` e cursor bloqueado por item ou no grupo |

## Conteúdo

- Use rótulos curtos de uma ou duas palavras por segmento: Dia, Semana, Mês.
- Mantenha padrão gramatical e tamanho semelhante entre todas as opções do mesmo grupo: Lista, Grade.
- Sem ponto final em rótulos de segmento.

## Acessibilidade

- **Teclado:** Comportamento nativo de radiogroup: Tab entra no grupo focando o segmento ativo; as setas direcionais navegam e alternam a seleção entre os itens.
- **Leitor de tela:** A raiz expõe papel radiogroup e exige aria-label descritivo. Cada item renderiza papel radio com aria-checked="true" no item selecionado.
- **Foco:** O anel de 3 px em ring utiliza focus-visible:z-10 para que a borda de foco não seja cortada pelos segmentos adjacentes.
- **Cuidados:** Limite o controle a no máximo 4 opções para não comprometer a legibilidade em telas compactas (WCAG 1.4.10) e sempre forneça aria-label no container para contexto.

## Tokens usados

- **Cor:** `bg-background` `bg-muted` `bg-secondary` `border-input`
  `border-ring` `text-foreground` `text-muted-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs`
- **Espaço:** `gap-1.5` `h-7` `h-8` `h-9` `p-0.75` `px-3` `size-4`
- **Raio:** `radius-inset-0.75` `rounded-inner` `rounded-outer-lg`
- **Sombra:** `shadow-sm`
- **Movimento:** `--scale-pressed` `duration-motion-fast` `ease-spring`
- **Foco:** `ring-ring`

## Faça

- Forneça aria-label descritivo no SegmentedControl indicando o propósito da escolha.
- Mantenha de 2 a 4 opções mutuamente excludentes com comprimentos visuais equilibrados.
- Aplique a alteração do estado na interface de forma imediata após a seleção.

## NÃO faça

- Usar para alternar painéis complexos de conteúdo com páginas independentes → `tabs`.
- Agrupar mais de 4 opções extensas que não cabem confortavelmente em linha → `select`.
- Permitir seleção múltipla ou desmarcar todas as opções → `toggle-group`.

## Exemplo mínimo

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control"

<SegmentedControl aria-label="Período" defaultValue="semana">
  <SegmentedControlItem value="dia">Dia</SegmentedControlItem>
  <SegmentedControlItem value="semana">Semana</SegmentedControlItem>
  <SegmentedControlItem value="mes">Mês</SegmentedControlItem>
</SegmentedControl>
```
