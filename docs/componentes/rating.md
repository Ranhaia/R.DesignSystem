---
slug: rating
nome: Rating
camada: atom
codigo: src/components/ui/rating.tsx
story: src/components/ui/rating.stories.tsx
status: piloto
sinonimos: [avaliacao, avaliação, nota, estrelas, classificacao, star-rating, stars, review]
vizinhos: [radio-group, slider]
referencias: [spec:rating]
---

# Rating

Estrelas para dar uma nota ou mostrar a média. Para dar nota, é um grupo de radios nativos (setas trocam, o valor vai no formulário); só leitura, é uma imagem com a nota por extenso.

## Quando usar

- Pedir uma nota rápida: entrega, atendimento, produto.
- Mostrar a média de avaliações ao lado do número de avaliações.

## Quando NÃO usar

- Escolha entre opções com nome (Ruim, Bom, Ótimo) → `radio-group`.
- Valor contínuo num intervalo → `slider`.

## Anatomia

| Parte | O que é |
|---|---|
| `Estrela` | Uma estrela desenhada (cheia, meia ou vazia); interna, sem export. |
| `Rating` | O grupo de estrelas: radios para dar nota ou imagem só leitura. |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `aria-label` / `aria-labelledby` | `string` | — | Pergunta que a nota responde; obrigatório para dar nota. |
| `preenchimento` (Estrela) | `Preenchimento` | — | Como a estrela é desenhada; calculado pelo `Rating`. |
| `size` | `sm` · `default` · `lg` | `default` | Tamanho de cada estrela. |
| `value` | `number` | — | Nota atual, controlada. |
| `defaultValue` | `number` | `0` | Nota inicial, sem controle. |
| `onValueChange` | `(valor: number) => void` | — | Chamado ao escolher uma nota. |
| `max` | `number` | `5` | Total de estrelas. |
| `allowHalf` | `boolean` | `false` | Permite escolher meia estrela. |
| `readOnly` | `boolean` | `false` | Só mostra a nota (média), com meia estrela quando cabe. |
| `disabled` | `boolean` | — | Desabilita todos os radios. |
| `required` | `boolean` | — | Nota obrigatória na validação do formulário. |
| `name` | `string` | — | Nome do campo enviado no formulário. |

## Variantes

Sem variantes de visual. O modo vem de `readOnly`: dar nota (padrão) ou mostrar a média.

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `sm` | 16 px | Média ao lado de texto, em listas e cards. |
| `default` | 24 px | Dar nota num formulário. |
| `lg` | 32 px | Nota como pergunta principal da tela, no toque. |

## Estados

| Estado | Como aparece |
|---|---|
| Vazio | Estrelas em contorno. |
| Escolhido | Estrelas até a nota cheias (e meia, com `allowHalf`). |
| Hover | Prevê a nota sob o cursor; ao sair volta à escolhida. |
| Foco | Anel na estrela da opção focada. |
| Desabilitado | Cursor bloqueado; os radios ficam fora do teclado. |

## Conteúdo

- Pergunta visível acima, ligada por `aria-labelledby`.
- Média só leitura sempre com o número e o total de avaliações ao lado.

## Acessibilidade

- **Teclado:** Tab entra no grupo; setas trocam a nota (radios nativos).
- **Leitor de tela:** grupo de opções com a pergunta como nome; cada opção é "3 de 5 estrelas". Só leitura: imagem "3,5 de 5 estrelas".
- **Foco:** anel em volta da estrela focada.
- **Cuidados:** estrelas vazias em `muted-foreground` para o contorno ter contraste; a cor nunca é a única pista (o nome traz o número).

## Tokens usados

- **Cor:** `text-muted-foreground` `text-warning-600`
- **Espaço:** `end-0` `gap-0.5` `inset-0` `inset-x-0` `inset-y-0`
  `size-4` `size-6` `size-8` `start-0` `w-1`
- **Raio:** `rounded-sm`
- **Foco:** `ring-ring`

## Faça

- Dar nome ao grupo com a pergunta.
- Mostrar a quantidade de avaliações junto da média.
- Usar `allowHalf` só quando a média precisa de precisão.

## NÃO faça

- Usar estrelas para opções com nome → `radio-group`.
- Mostrar média sem o número ao lado → texto "4,5 (128)" junto.
- Usar `readOnly` para nota que a pessoa ainda vai dar → modo padrão.

## Exemplo mínimo

```tsx
import { Rating } from "@/components/ui/rating"

<Rating aria-label="Nota da entrega" name="nota" />
```
