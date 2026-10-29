---
slug: radio-group
nome: Radio Group
camada: atom
codigo: src/components/ui/radio-group.tsx
story: src/components/ui/radio-group.stories.tsx
status: piloto
sinonimos: [radio, rádio, radio-button, opcao-unica]
vizinhos: [checkbox, select, segmented-control]
referencias: [passi:radio, shadcn:radio-group]
---

# Radio Group

Conjunto de botões de opção exclusivos em que a pessoa seleciona exatamente uma alternativa. Ao marcar uma opção nova, a escolha anterior é desmarcada automaticamente.

## Quando usar

- Escolha única entre 2 e 6 opções que devem permanecer visíveis ao mesmo tempo para facilitar a comparação rápida.
- Opções mutuamente exclusivas em formulários ou configurações, como tipo de entrega ou forma de pagamento.

## Quando NÃO usar

- Mais de 6 opções disponíveis em lista longa → `select`.
- Escolha independente de marcar ou desmarcar um único item isolado → `checkbox`.
- Alternar entre visões ou filtros compactos sem cara de formulário → `segmented-control`.

## Anatomia

| Parte | O que é |
|---|---|
| `RadioGroup` | Raiz (Radix RadioGroup) que define o contexto do grupo com espaçamento vertical gap-3 |
| `RadioGroupItem` | Botão circular individual com borda border-input e dimensão controlada por --form-control-size |
| Indicador | Círculo preenchido interno (Icon) centralizado com metade do diâmetro do botão externo |
| Rótulo (opcional) | Texto de apoio associado ao item via Label externo com htmlFor |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` · `defaultValue` (RadioGroup) | `string` | — | Valor da opção selecionada no grupo, controlado ou inicial |
| `onValueChange` (RadioGroup) | `(value: string) => void` | — | Callback disparado quando a seleção muda |
| `disabled` (RadioGroup, RadioGroupItem) | `boolean` | `false` | Desativa a interação no grupo inteiro ou no item individual |
| `value` (RadioGroupItem) | `string` | — | Identificador único da opção no item |
| `required` (RadioGroup) | `boolean` | `false` | Exige a seleção de uma opção no envio do formulário |

## Variantes

Nenhuma. O botão circular adota borda border-input quando desmarcado e ponto preenchido text-primary quando selecionado.

## Tamanhos

Dimensão circular responsiva controlada pela variável CSS --form-control-size (padrão 16 px, size-4).

## Estados

| Estado | Como aparece |
|---|---|
| Desmarcado | Borda circular border-input com fundo transparente e sombra shadow-xs |
| Marcado | Círculo interno centralizado text-primary preenchido |
| Foco | Anel de 3 px em ring-ring com borda border-ring no botão focado |
| Inválido | Borda destacada em border-destructive e anel sutil em ring-destructive/20 |
| Desabilitado | Opacidade reduzida em 50% com cursor not-allowed e clique bloqueado |

## Conteúdo

- Apresente um título claro para o grupo com a pergunta ou critério: "Forma de pagamento".
- Mantenha opções curtas e com estrutura gramatical paralela: "Boleto bancário", "Cartão de crédito".
- Evite opções com significados redundantes ou que se sobreponham.

## Acessibilidade

- **Teclado:** Tab entra no grupo focando na opção marcada ou na primeira disponível. As setas Direita/Abaixo e Esquerda/Acima alternam entre as opções e já as selecionam. Tab sai do grupo para o próximo controle.
- **Leitor de tela:** Papel radiogroup para o container e radio para cada item. Anuncia o nome do grupo, o texto do rótulo, o estado marcado/desmarcado e a posição (ex.: 1 de 3).
- **Foco:** Anel visível de 3 px em ring-ring ao navegar por teclado. O foco se desloca junto com a seleção ao usar as setas direcionais.
- **Cuidados:** Sempre associe um Label com htmlFor correspondente ao id de cada RadioGroupItem para permitir a marcação ao clicar no texto. Não utilize rádio isolado para ações binárias; utilize checkbox.

## Tokens usados

- **Cor:** `border-destructive` `border-input` `border-ring`
  `text-primary`
- **Espaço:** `--form-control-size` `gap-3` `left-1` `top-1`
- **Raio:** `rounded-full`
- **Sombra:** `shadow-xs`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Mantenha entre 2 e 6 opções para preservar a legibilidade da tela.
- Deixe uma opção padrão selecionada sempre que houver uma recomendação clara.
- Associe o rótulo clicável via Label para aumentar a área de toque.

## NÃO faça

- Mais de 6 opções em coluna ocupando muito espaço vertical → use `select`.
- Uma única opção isolada de sim ou não → substitua por `checkbox` ou `switch`.
- Permitir múltipla seleção no mesmo conjunto → use um grupo de `checkbox`.

## Exemplo mínimo

```tsx
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="padrao">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="padrao" id="r1" />
    <Label htmlFor="r1">Padrão</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="expresso" id="r2" />
    <Label htmlFor="r2">Expresso</Label>
  </div>
</RadioGroup>
```
