---
slug: progress
nome: Progress
camada: atom
codigo: src/components/ui/progress.tsx
story: src/components/ui/progress.stories.tsx
status: piloto
sinonimos: [barra-de-progresso, progress-bar]
vizinhos: [spinner, skeleton, stepper]
referencias: [passi:barra-de-progresso, shadcn:progress]
---

# Progress

Barra indicadora que exibe visualmente o avanço de uma tarefa com duração determinada. Comunica a porcentagem concluída em uploads, downloads ou etapas de processamento.

## Quando usar

- Tarefas com duração mensurável que levam mais de 2 segundos, como envio de arquivos ou importação de dados.
- Indicador de preenchimento ou progresso quantificável em questionários e perfis.

## Quando NÃO usar

- Espera sem duração estimada ou com tempo indeterminado → `spinner`.
- Conteúdo em carregamento cujo layout e formato final já são conhecidos → `skeleton`.
- Sequência de etapas com interação e navegação do usuário → `stepper`.

## Anatomia

| Parte | O que é |
|---|---|
| `Progress` | Raiz (Radix Progress) que atua como trilho com fundo atenuado bg-primary/20 e cantos arredondados rounded-full |
| Indicador | Barra interna preenchida com bg-primary cujo deslocamento horizontal representa a porcentagem concluída |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` (Progress) | `number` | `0` | Porcentagem concluída da tarefa, variando de 0 a 100 |
| `max` (Progress) | `number` | `100` | Valor máximo de referência do progresso |
| `getValueLabel` (Progress) | `(value: number, max: number) => string` | — | Função que formata o texto acessível do valor |

## Variantes

Nenhuma. Barra linear com trilho translúcido bg-primary/20 e indicador bg-primary.

## Tamanhos

Altura fixa de 8 px (h-2) com largura que preenche 100% do container pai (w-full).

## Estados

| Estado | Como aparece |
|---|---|
| Em andamento | Indicador preenchido proporcionalmente com transição suave via transition-all |
| 0% | Indicador totalmente recuado para a esquerda |
| Concluído (100%) | Indicador cobre todo o comprimento do trilho |

## Conteúdo

- Apresente um rótulo textual acima ou ao lado descrevendo a ação: "Enviando arquivo...".
- Exiba a contagem numérica ou porcentagem quando a precisão for útil: "45% concluído" ou "3 de 5 arquivos".
- No término, confirme o sucesso com texto explícito: "Envio concluído".

## Acessibilidade

- **Teclado:** Não recebe foco. Componente puramente informativo.
- **Leitor de tela:** Papel progressbar com aria-valuenow refletindo o valor atual, aria-valuemin="0" e aria-valuemax="100". Passe aria-label ou aria-labelledby identificando a tarefa.
- **Foco:** Nenhum. O foco deve permanecer na ação que disparou a tarefa ou no container principal.
- **Cuidados:** Não anuncie cada porcentagem intermediária para evitar poluir o leitor de tela; anuncie apenas marcos relevantes ou a conclusão da tarefa. Sempre forneça um nome acessível via aria-label ou texto associado.

## Tokens usados

- **Cor:** `bg-primary`
- **Espaço:** `h-2`
- **Raio:** `rounded-full`

## Faça

- Associe um rótulo visível ou aria-label informando qual processo está em andamento.
- Mostre a porcentagem numérica ou os dados transferidos junto da barra quando relevante.
- Confirme visualmente e por texto quando a tarefa atingir 100%.

## NÃO faça

- Usar para esperas em que o tempo ou tamanho não é conhecido → utilize `spinner`.
- Fazer a barra retroceder durante o carregamento normal → mantenha o progresso crescente ou use `spinner`.
- Ocultar a barra abruptamente sem confirmar o resultado → mostre estado de sucesso antes de fechar.

## Exemplo mínimo

```tsx
import { Progress } from "@/components/ui/progress"

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Enviando arquivo</span>
    <span>60%</span>
  </div>
  <Progress value={60} aria-label="Progresso do envio do arquivo" />
</div>
```
