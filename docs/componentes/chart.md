---
slug: chart
nome: Chart
camada: organism
codigo: src/components/ui/chart.tsx
story: src/components/ui/chart.stories.tsx
status: piloto
sinonimos: [grafico, gráfico, graficos]
vizinhos: [table, card]
referencias: [passi:padroes/graficos, shadcn:chart]
---

# Chart

Container e utilitários para renderização de gráficos baseados em Recharts, com suporte a variáveis de cor e tooltips temáticos.

## Quando usar

- Visualização de tendências e séries temporais em painéis e dashboards (gráficos de linha e área).
- Comparação de métricas entre categorias ou períodos definidos (gráficos de barras e colunas).

## Quando NÃO usar

- Dados tabulares detalhados que exigem ordenação, paginação ou consulta valor a valor → `table`.
- Métrica isolada ou KPI único com valor em destaque → `card`.
- Indicadores simples de preenchimento ou progresso percentual → `progress`.

## Anatomia

| Parte | O que é |
|---|---|
| `ChartContainer` | Container responsivo que injeta o contexto de configuração e variáveis CSS de cores |
| `ChartStyle` | Elemento interno que gera folha de estilos dinâmica para temas claro e escuro |
| `ChartTooltipContent` | Conteúdo flutuante formatado para exibir valores e séries sob o cursor |
| `ChartLegendContent` | Legenda configurável com marcadores de cor e rótulos das séries |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `config` | `ChartConfig` | — | Dicionário de séries associando rótulos, ícones e cores para temas claro e escuro |
| `children` | `React.ComponentProps< typeof RechartsPrimitive.ResponsiveContainer >["children"]` | — | Componente gráfico do Recharts (BarChart, LineChart, AreaChart, PieChart) |
| `initialDimension` | `{ width: number height: number }` | `INITIAL_DIMENSION` | Dimensões iniciais para renderização do contêiner responsivo |
| `id` (ChartStyle) | `string` | — | Identificador único do gráfico para escopo das variáveis CSS de cor |
| `config` (ChartStyle) | `ChartConfig` | — | Configuração de cores utilizada para gerar as classes e variáveis |
| `hideLabel` (ChartTooltipContent) | `boolean` | `false` | Oculta o rótulo principal do eixo ou categoria no tooltip |
| `hideIndicator` (ChartTooltipContent) | `boolean` | `false` | Oculta a miniatura indicadora de cor ao lado do valor |
| `indicator` (ChartTooltipContent) | `line` · `dot` · `dashed` | `dot` | Formato visual do indicador de cor (`dot`, `line` ou `dashed`) |
| `nameKey` (ChartTooltipContent) | `string` | — | Chave do item utilizada para buscar o nome da série |
| `labelKey` (ChartTooltipContent) | `string` | — | Chave do item utilizada para buscar o rótulo |
| `hideIcon` (ChartLegendContent) | `boolean` | `false` | Oculta ícones customizados na legenda |
| `nameKey` (ChartLegendContent) | `string` | — | Chave da série utilizada na legenda |
| `verticalAlign` (ChartLegendContent) | `top` · `bottom` | `bottom` | Alinhamento vertical da legenda em relação ao gráfico |

## Variantes

Nenhuma no container raiz. Os tipos de gráfico (barras, linhas, pizza, radar) são determinados pelos componentes do Recharts passados em `children`.

## Tamanhos

Responsivo por padrão (`aspect-video`), ocupando a largura total do container e adaptando a altura proporcionalmente.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Gráfico renderizado com eixos, grades e séries preenchidas nas cores do config |
| Hover / Interação | Destaque do elemento apontado com tooltip `bg-popover` e linha ou cursor de apoio |
| Foco visível | Superfície do gráfico com contorno `outline-ring` ao navegar via teclado |

## Conteúdo

- Título do gráfico ou do cartão deve descrever a pergunta que os dados respondem: "Evolução de acessos mensais".
- Legendas e rótulos de eixos concisos, sem abreviações ambíguas.
- Formate números grandes no tooltip com separadores de milhar ("1.250" ou "R$ 45.000").

## Acessibilidade

- **Teclado:** A superfície do gráfico recebe foco com contorno `outline-ring` e anel visível.
- **Leitor de tela:** Gráficos puramente SVG não comunicam todos os pontos de dados diretamente; forneça sempre uma tabela equivalente ou resumo textual descritivo via `aria-describedby` ou texto de apoio.
- **Foco:** O foco permanece na área do container ou navega entre controles de filtragem externos.
- **Cuidados:** A cor nunca deve ser o único sinal para diferenciar séries concorrentes (WCAG 1.4.1); utilize padrões de preenchimento, ícones ou legendas textuais próximas, e forneça alternativa em tabela para conformidade com WCAG 1.1.1.

## Tokens usados

- **Cor:** `--color-border` `bg-popover` `border-border` `fill-muted`
  `fill-muted-foreground` `stroke-border` `text-foreground`
  `text-muted-foreground` `text-popover-foreground`
- **Tipografia:** `font-medium` `leading-none` `text-xs`
- **Espaço:** `gap-1.5` `gap-2` `gap-4` `h-2` `h-2.5` `h-3` `min-w-32`
  `my-0.5` `pb-3` `pt-3` `px-2.5` `py-1.5` `w-0` `w-1` `w-2` `w-2.5`
  `w-3`
- **Raio:** `rounded-lg`
- **Sombra:** `shadow-xl`
- **Foco:** `outline-ring`

## Faça

- Forneça sempre uma alternativa em tabela ou resumo acessível para dados críticos.
- Inicie eixos quantitativos em zero para não distorcer proporções visuais.
- Utilize a paleta semântica do `ChartConfig` para garantir contraste adequado em temas claro e escuro.

## NÃO faça

- Gráficos de pizza ou rosca com mais de cinco fatias → agrupe as menores em outros ou use gráfico de barras.
- Confiar exclusivamente na cor para distinguir séries próximas → combine marcadores de linha ou rótulos.
- Substituir tabelas completas de consulta por gráficos complexos → `table`.

## Exemplo mínimo

```tsx
import { Bar, BarChart } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  vendas: {
    label: "Vendas",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const dados = [
  { mes: "Jan", vendas: 186 },
  { mes: "Fev", vendas: 305 },
]

export function ExemploGrafico() {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <BarChart data={dados}>
        <Bar dataKey="vendas" fill="var(--color-vendas)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```
