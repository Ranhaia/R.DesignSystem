---
slug: toggle-group
nome: Toggle Group
camada: molecule
codigo: src/components/ui/toggle-group.tsx
story: src/components/ui/toggle-group.stories.tsx
status: piloto
sinonimos: [grupo-alternavel, barra-de-ferramentas, toolbar]
vizinhos: [toggle, button-group, segmented-control, radio-group]
referencias: [passi:barra-de-ferramentas, shadcn:toggle-group]
---

# Toggle Group

Agrupa botões de alternância de dois estados para seleção única ou múltipla.
Ideal para barras de ferramentas, formatação e filtros visuais compactos.

## Quando usar

- Conjuntos de opções de estilo ou formatação (como negrito, itálico e sublinhado) com seleção múltipla.
- Seleção exclusiva de alinhamento ou visualização (como esquerda, centro e direita) em barras de ferramentas.
- Filtros rápidos em linha onde o estado ativo de cada botão precisa ficar evidente.

## Quando NÃO usar

- Alternar a exibição de seções ou abas com painel de conteúdo associado → `tabs`.
- Seleção exclusiva de poucas opções de tela com animação de trilho deslizante → `segmented-control`.
- Ações simples de disparo único que não guardam estado ativado → `button-group`.

## Anatomia

| Parte | O que é |
|---|---|
| `ToggleGroup` | Contêiner raiz que gerencia o tipo de seleção e compartilha variantes, tamanhos e espaçamento via contexto |
| `ToggleGroupItem` | Cada botão individual do grupo que herda o estilo ou define suas próprias propriedades |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `type` (ToggleGroup) | `single` · `multiple` | — | Define se a seleção é exclusiva ou permite múltiplas opções |
| `value` · `defaultValue` (ToggleGroup) | `string` · `string[]` | — | Valor selecionado, controlado ou inicial |
| `onValueChange` (ToggleGroup) | `(value: any) => void` | — | Notifica alteração na seleção dos itens |
| `variant` (ToggleGroup, Item) | `default` · `outline` | `default` | Estilo visual dos botões, compartilhado via contexto |
| `size` (ToggleGroup, Item) | `sm` · `default` · `lg` | `default` | Dimensão vertical e espaçamento horizontal dos botões |
| `spacing` (ToggleGroup) | `number` | `0` | Distância entre os botões; valor zero mantém bordas acopladas |
| `value` (ToggleGroupItem) | `string` | — | Identificador obrigatório do item |
| `disabled` (ToggleGroup, Item) | `boolean` | `false` | Desabilita o grupo inteiro ou um item específico |

## Variantes

Não tem variantes próprias declaradas no código; os estilos visual default e outline são herdados de toggleVariants e propagados aos botões via contexto.

## Tamanhos

Não tem tamanhos próprios declarados no código; as opções sm (32 px), default (36 px) e lg (40 px) são herdadas de toggleVariants e aplicadas aos botões do grupo.

## Estados

| Estado | Como aparece |
|---|---|
| Desativado (off) | Fundo transparente ou contorno padrão com texto font-normal e icon-fill em zero |
| Ativado (on) | Fundo bg-accent, texto text-accent-foreground, font-bold e icon-fill preenchido |
| Hover | Fundo hover:bg-muted ou hover:bg-accent conforme a variante |
| Foco | Anel visível com elevação de z-index para não cortar a borda |
| Desabilitado | Opacidade reduzida e cursor bloqueado |

## Conteúdo

- Use ícones reconhecíveis com rótulo descritivo acessível via `aria-label` ou `tooltip`.
- Para textos nos itens, limite a uma única palavra: "Centro", "Esquerda", "Direita".
- Agrupe no máximo de 3 a 7 opções relacionadas em um mesmo conjunto.

## Acessibilidade

- **Teclado:** Em grupos com `type="single"` atua como rádio, navegando com setas direcionais. Em `type="multiple"` o Tab percorre os itens e Espaço/Enter alterna o estado de cada botão.
- **Leitor de tela:** Utiliza papel `toolbar` ou `group` (Radix). Botões possuem `aria-pressed` para anunciar estado ativado/desativado ou `aria-checked` para seleção exclusiva.
- **Foco:** Itens recebem `focus-visible:ring-ring` com `z-10` para manter o anel de foco destacado sobre as bordas adjacentes.
- **Cuidados:** Forneça sempre `aria-label` para cada `ToggleGroupItem` que contenha apenas ícone (WCAG 4.1.2). Não exceda 10 itens na mesma barra sem agrupar opções secundárias.

## Tokens usados

- **Espaço:** `min-w-0` `px-3`
- **Raio:** `rounded-l-md` `rounded-md` `rounded-r-md`
- **Sombra:** `shadow-xs`

## Faça

- Use `type="single"` para escolhas exclusivas e `type="multiple"` para formatações independentes.
- Adicione `aria-label` descritivo em todos os itens compostos apenas por ícones.
- Mantenha espaçamento zero (`spacing={0}`) para formar barras de ferramentas visualmente coesas.

## NÃO faça

- Usar para alternar páginas inteiras ou painéis de conteúdo extenso → `tabs`.
- Agrupar ações de envio ou disparo de formulário que não retêm estado → `button-group`.
- Utilizar botões de alternância sem nenhum rótulo textual ou acessível → `icon-button`.

## Exemplo mínimo

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single" defaultValue="centro">
  <ToggleGroupItem value="esquerda" aria-label="Alinhar à esquerda">
    Esquerda
  </ToggleGroupItem>
  <ToggleGroupItem value="centro" aria-label="Alinhar ao centro">
    Centro
  </ToggleGroupItem>
  <ToggleGroupItem value="direita" aria-label="Alinhar à direita">
    Direita
  </ToggleGroupItem>
</ToggleGroup>
```
