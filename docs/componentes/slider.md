---
slug: slider
nome: Slider
camada: atom
codigo: src/components/ui/slider.tsx
story: src/components/ui/slider.stories.tsx
status: piloto
sinonimos: [controle-deslizante, range, deslizante]
vizinhos: [input, select, progress]
referencias: [passi:controle-deslizante, shadcn:slider]
---

# Slider

Controle deslizante que permite selecionar um valor ou intervalo contínuo arrastando um ou mais marcadores sobre um trilho. Ideal para ajustes visuais e valores aproximados.

## Quando usar

- Ajuste de parâmetros contínuos ou intuitivos, como volume, brilho, zoom ou opacidade.
- Seleção de faixas de valores com pegador duplo (mínimo e máximo), como filtros de preço.

## Quando NÃO usar

- Valores numéricos precisos ou dados estruturados (ex.: CPF, idade ou parcelas) → `input`.
- Escolha discreta entre poucas opções fixas pré-definidas → `select`.
- Exibição de progresso apenas para leitura, sem interação direta → `progress`.

## Anatomia

| Parte | O que é |
|---|---|
| `Slider` | Raiz (Radix Slider) que envolve o trilho e os pegadores com suporte a orientação horizontal ou vertical |
| Trilho | Barra de fundo arredondada com bg-muted que define o caminho da seleção |
| Faixa | Trecho preenchido no trilho em bg-primary entre o valor mínimo e o pegador atual |
| Pegador | Botão circular (Thumb) com borda border-primary, fundo branco e anel de foco ring-ring |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `min` | `number` | `0` | Limite inferior da faixa de seleção |
| `max` | `number` | `100` | Limite superior da faixa de seleção |
| `step` (Slider) | `number` | `1` | Intervalo numérico de incremento entre os passos |
| `value` · `defaultValue` (Slider) | `number[]` | `[min, max]` | Array com o valor atual (um valor para pegador único, dois para intervalo) |
| `orientation` (Slider) | `horizontal` · `vertical` | `horizontal` | Direção do trilho do slider |
| `disabled` (Slider) | `boolean` | `false` | Desativa a interação e reduz a opacidade para 50% |

## Variantes

Nenhuma. O trilho utiliza bg-muted com faixa ativa em bg-primary e pegadores circulares.

## Tamanhos

Trilho horizontal com altura de 6 px (h-1.5) e pegadores de 16 px (size-4). Na vertical, atinge altura mínima de 176 px (min-h-44).

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Trilho em bg-muted com pegador branco e borda border-primary |
| Hover no pegador | Anel sutil de 4 px em ring-ring em volta do pegador |
| Foco no pegador | Anel visível de 4 px em ring-ring acionado por teclado |
| Desabilitado | Opacidade reduzida em 50% e eventos de ponteiro bloqueados |

## Conteúdo

- Apresente um rótulo visível indicando a métrica controlada: "Volume", "Faixa de preço".
- Exiba o valor atual formatado em texto ao lado do controle: "R$ 150,00", "75%".
- Indique os valores mínimo e máximo nos extremos do trilho quando o contexto exigir clareza.

## Acessibilidade

- **Teclado:** Tab chega a cada pegador. Setas Direita/Acima aumentam um passo; Setas Esquerda/Abaixo diminuem um passo. Page Up e Page Down realizam saltos maiores. Home vai ao valor mínimo e End ao valor máximo.
- **Leitor de tela:** Papel slider com aria-valuenow refletindo o valor atual, aria-valuemin e aria-valuemax. Cada pegador recebe aria-label descritivo automático ("Valor mínimo", "Valor máximo" ou rótulo informado).
- **Foco:** Anel visível de 4 px em ring-ring em volta do pegador focado. Em sliders de intervalo, cada pegador recebe foco individual sequencial via Tab.
- **Cuidados:** Arrastar nunca pode ser o único modo de interação (WCAG 2.5.7); sempre garanta suporte a teclado e ofereça um campo input numérico ao lado quando a precisão exata for necessária.

## Tokens usados

- **Cor:** `bg-muted` `bg-primary` `border-primary`
- **Espaço:** `h-1.5` `min-h-44` `size-4` `w-1.5`
- **Raio:** `rounded-full`
- **Sombra:** `shadow-sm`
- **Foco:** `ring-ring`

## Faça

- Exiba sempre o valor numérico atual em texto para confirmação do usuário.
- Ofereça um campo de entrada de texto complementar quando o valor exato for relevante.
- Configure o incremento da prop step de acordo com a granularidade real da informação.

## NÃO faça

- Usar para dados que exigem precisão absoluta como documentos ou parcelas → use `input`.
- Escolha simples entre até 5 opções pré-definidas → use `radio-group` ou `select`.
- Ocultar o valor numérico selecionado pelo controle → mostre o texto associado junto ao slider.

## Exemplo mínimo

```tsx
import { Slider } from "@/components/ui/slider"

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Volume</span>
    <span>50%</span>
  </div>
  <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />
</div>
```
