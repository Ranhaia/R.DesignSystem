---
slug: button-group
nome: Button Group
camada: molecule
codigo: src/components/ui/button-group.tsx
story: src/components/ui/button-group.stories.tsx
status: piloto
sinonimos: [grupo-de-botoes, grupo-de-botões]
vizinhos: [button, toggle-group, split-button]
referencias: [passi:grupo-de-botoes, shadcn:button-group]
---

# Button Group

Agrupa visualmente botões e controles relacionados com cantos e bordas combinados. Mantém alinhamento consistente entre ações complementares, como confirmação e cancelamento ou botões com seletor.

## Quando usar

- Conjuntos de ações complementares no rodapé de janelas e formulários (ex.: Cancelar e Salvar).
- Combinações de botão com menu suspenso ou campo de texto integrado na mesma linha.
- Barras de ação compactas onde botões adjacentes compartilham bordas para economizar espaço.

## Quando NÃO usar

- Botão isolado com ação única sem dependência de outros controles → `button`.
- Seleção de opções mutuamente exclusivas com estado ativo ou pressionado → `toggle-group`.
- Botão principal com variação imediata em menu dividido integrado → `split-button`.

## Anatomia

| Parte | O que é |
|---|---|
| `ButtonGroup` | Contêiner raiz com `data-slot="button-group"` e `role="group"`, ajusta cantos e bordas dos filhos para fusão visual. |
| `ButtonGroupText` | Rótulo estático não clicável com `data-slot="button-group-text"` para prefixos ou complementos visuais. |
| `ButtonGroupSeparator` | Separador visual fino com `data-slot="button-group-separator"` baseado no componente Separator. |

## Composição

Usa: [`separator`](separator.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `orientation` | `horizontal` · `vertical` | `horizontal` | Direção do agrupamento dos botões (linha ou coluna) |
| `asChild` (ButtonGroupText) | `boolean` | `false` | Delega a renderização para o elemento filho |
| `orientation` (ButtonGroupSeparator) | `horizontal` · `vertical` | `vertical` | Orientação do separador interno entre os controles |

## Variantes

Não possui variantes próprias; o estilo dos botões contidos é definido pelas variantes individuais do componente Button.

## Tamanhos

Tamanho único determinado pelas dimensões dos botões e controles inseridos no contêiner.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Filhos intermediários perdem arredondamentos internos e bordas redundantes |
| Horizontal | Borda esquerda dos filhos subsequentes é removida para encaixe contínuo |
| Vertical | Borda superior dos filhos subsequentes é removida para empilhamento contínuo |
| Foco | O botão focado eleva seu nível de sobreposição (`z-10`) para exibir o anel de foco completo |

## Conteúdo

- Cada botão deve ter um texto que descreva claramente sua respectiva ação (ex.: "Salvar alterações", "Cancelar").
- Mantenha no máximo três ações agrupadas para não sobrecarregar a decisão visual.
- Em pares de formulário, posicione a ação secundária antes e a principal em destaque.

## Acessibilidade

- **Teclado:** Tab navega sequencialmente entre os botões na ordem visual. O anel de foco visível ganha `relative z-10` para não ser cortado pelos botões vizinhos.
- **Leitor de tela:** O contêiner possui `role="group"`. Se o grupo representar uma barra temática de ações, passe `aria-label` descritivo no contêiner.
- **Foco:** A ordem de navegação acompanha estritamente a sequência visual dos botões, da esquerda para a direita no horizontal ou de cima para baixo no vertical.
- **Cuidados:** Evite posicionar dois botões com variante `default` lado a lado no mesmo grupo; diferencie a ação primária da secundária.

## Tokens usados

- **Cor:** `bg-input` `bg-muted`
- **Tipografia:** `font-medium` `text-sm`
- **Espaço:** `gap-2` `px-4` `size-4`
- **Raio:** `rounded-md` `rounded-r-md`
- **Sombra:** `shadow-xs`

## Faça

- Posicione a ação principal à direita no layout horizontal para seguir o fluxo de leitura padrão.
- Use `ButtonGroupSeparator` quando desejar reforçar a divisão entre botões de mesma superfície.
- Limite o grupo a até três botões em ações de formulário ou use menu suspenso para opções extras.

## NÃO faça

- Dois botões primários com variante `default` no mesmo grupo → mantenha apenas um primário e use `outline` no secundário.
- Mais de dez ações em barra sem menu colapsado → utilize `dropdown-menu` para agrupar opções excedentes.
- Inverter a ordem visual dos botões em relação à árvore do DOM → mantenha a ordem do HTML idêntica à ordem visual.

## Exemplo mínimo

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

<ButtonGroup>
  <Button variant="outline">Cancelar</Button>
  <Button>Salvar alterações</Button>
</ButtonGroup>
```
