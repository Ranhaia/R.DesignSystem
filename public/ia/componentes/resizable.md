---
slug: resizable
nome: Resizable
camada: organism
codigo: src/components/ui/resizable.tsx
story: src/components/ui/resizable.stories.tsx
status: piloto
sinonimos: [redimensionavel, painel-redimensionavel, split-pane]
vizinhos: [sheet, separator, sidebar]
referencias: [shadcn:resizable]
---

# Resizable

Divisão de layout em painéis redimensionáveis e acessíveis com suporte a mouse, toque e teclado. Permite ajustar a proporção entre seções contíguas em layouts complexos.

## Quando usar

- Ambientes de trabalho com painéis ajustáveis (ex.: editor de código ao lado de visualizador de prévia).
- Layouts de aplicação com barra lateral colapsável ou redimensionável em relação à área principal.
- Interfaces de análise de dados com divisão flexível entre tabelas e gráficos comparativos.

## Quando NÃO usar

- Painel lateral sobreposto ou deslizante temporário que abre sobre a tela → `sheet`.
- Divisão estática entre seções que não necessita de ajuste de tamanho → `separator`.
- Barra de navegação fixa com largura pré-definida sem necessidade de arraste → `sidebar`.

## Anatomia

| Parte | O que é |
|---|---|
| `ResizablePanelGroup` | Container raiz que define a direção de divisão (horizontal ou vertical) dos painéis |
| `ResizablePanel` | Painel de conteúdo individual com suporte a proporções e limites percentuais |
| `ResizableHandle` | Divisor arrastável e interativo que separa dois painéis adjacentes |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `direction` (ResizablePanelGroup) | `horizontal` · `vertical` | — | Define a orientação de divisão entre os painéis |
| `defaultSize` (ResizablePanel) | `number` | — | Tamanho percentual inicial ocupado pelo painel no grupo |
| `minSize` (ResizablePanel) | `number` | — | Tamanho percentual mínimo permitido ao redimensionar |
| `maxSize` (ResizablePanel) | `number` | — | Tamanho percentual máximo permitido ao redimensionar |
| `withHandle` (ResizableHandle) | `boolean` | `false` | Exibe uma alça visual com ícone de arraste no centro do divisor |

## Variantes

Sem variantes no componente raiz. A orientação (`horizontal` ou `vertical`) é definida pela propriedade `direction` no grupo.

## Tamanhos

Sem tamanhos pré-fixados. Os painéis ocupam 100% da altura e largura do container pai e distribuem proporções percentuais.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Divisor fino em `bg-border` com largura ou altura de 1 px (`w-px` ou `h-px`) |
| Hover | Área interativa invisível de arraste expande 4 px ao redor do divisor |
| Foco | Anel `ring-ring` de 2 px visível na alça com `focus-visible:ring-2` |
| Arrastando | Cursor de redimensionamento ativo ajustando proporções em tempo real |
| Com alça | `withHandle=true` renderiza uma pastilha central de 16x12 px com ícone de indicador de arraste |

## Conteúdo

- Não possui texto próprio. Os textos moram nos painéis e containers agrupados.
- Use `aria-label` ou `aria-valuetext` na alça quando for relevante anunciar a finalidade do divisor.
- Mantenha indicadores de conteúdo legíveis mesmo quando o painel for reduzido ao tamanho mínimo.

## Acessibilidade

- **Teclado:** O divisor (ResizableHandle) recebe foco; setas esquerda/cima diminuem o painel anterior; setas direita/baixo aumentam; Home e End movem para os limites mínimo e máximo.
- **Leitor de tela:** Papel `separator` com atributos `aria-orientation` e `aria-valuenow` atualizados dinamicamente refletindo a proporção percentual atual.
- **Foco:** O foco visual aplica anel `ring-ring` com `focus-visible:ring-2`; o foco permanece na alça durante o ajuste por setas.
- **Cuidados:** Arrastar nunca pode ser o único modo de redimensionamento (WCAG 2.5.7); garanta que a navegação e ajuste via teclado continuem acessíveis e funcionais.

## Tokens usados

- **Cor:** `bg-border`
- **Espaço:** `h-1` `h-4` `h-px` `inset-y-0` `left-0` `left-1` `w-1`
  `w-3` `w-px`
- **Foco:** `ring-ring`

## Faça

- Defina `minSize` nos painéis para evitar que conteúdos essenciais sejam espremidos a zero.
- Use `withHandle` em divisores horizontais para deixar a área de clique evidente para a pessoa usuária.
- Garanta que o container pai possua dimensões definidas de altura e largura.

## NÃO faça

- Usar resizable para criar divisões visuais puramente estáticas sem ajuste → `separator`.
- Utilizar resizable em telas móveis pequenas onde painéis lado a lado quebram a leitura → `tabs`.
- Esconder botões ou ações críticas atrás de painéis colapsáveis sem alternativa de acesso → `sheet`.

## Exemplo mínimo

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md rounded-lg border">
  <ResizablePanel defaultSize={40} minSize={20}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold text-sm">Painel 1</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60} minSize={30}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold text-sm">Painel 2</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
```
