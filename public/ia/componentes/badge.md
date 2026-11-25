---
slug: badge
nome: Badge
camada: atom
codigo: src/components/ui/badge.tsx
story: src/components/ui/badge.stories.tsx
status: piloto
sinonimos: [selo, status, rotulo-de-status]
vizinhos: [chip, tag, button]
referencias: [passi:selo, shadcn:badge]
---

# Badge

Rótulo compacto para destacar status, contagem ou metadado associado a um item. Componente puramente informativo, projetado para leitura e não para interação direta.

## Quando usar

- Indicar o status de um registro ou processo (ex.: Ativo, Concluído, Em análise).
- Exibir contagens numéricas compactas ou notificações não lidas em tabelas e listas.
- Destacar uma categoria ou atributo estático junto a um cabeçalho ou card.

## Quando NÃO usar

- Filtro clicável que alterna a visão de uma listagem → `chip`.
- Etiqueta removível com botão de fechar para filtros aplicados → `tag`.
- Elemento interativo que dispara uma ação ao receber clique → `button`.

## Anatomia

| Parte | O que é |
|---|---|
| `Badge` | Container span com data-slot="badge" e data-variant em formato de pílula |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `secondary` · `destructive` · `outline` · `ghost` · `link` | `default` | Estilo visual e nível de destaque do selo |
| `asChild` | `boolean` | `false` | Renderiza as propriedades no elemento filho via Radix Slot |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Destaque principal ou estado prioritário da interface |
| `secondary` | Informação secundária de menor ênfase visual |
| `destructive` | Estado de erro, cancelamento, bloqueio ou alerta crítico |
| `outline` | Informação neutra com borda sutil e fundo transparente |
| `ghost` | Estilo sem preenchimento para uso composicional via asChild |
| `link` | Aparência de hiperlink para associação sutil de navegação |

## Tamanhos

Tamanho único com altura mínima de 24 px (min-h-6), padding horizontal px-2 e texto em text-xs.

## Estados

Só leitura: não recebe foco.

## Conteúdo

- Uma ou duas palavras no máximo, preferencialmente substantivos ou adjetivos que indiquem estado.
- Use texto em maiúsculas e minúsculas naturais (ex.: Publicado, Rascunho), nunca tudo em caixa alta.
- Para contadores numéricos, use números puros ou formato abreviado (ex.: +99).

## Acessibilidade

- **Teclado:** Não recebe foco por padrão. Quando usado como link interativo com asChild, entra na ordem de tabulação e responde a Enter ou Espaço.
- **Leitor de tela:** Lido como texto em linha comum. Em contadores puramente numéricos, forneça contexto adicional com aria-label (ex.: 5 notificações pendentes).
- **Foco:** Não retém foco na visualização padrão.
- **Cuidados:** Nunca transmita um estado apenas pela cor da variante; o texto precisa explicitar o significado (WCAG 1.4.1).

## Tokens usados

- **Cor:** `bg-accent` `bg-destructive` `bg-primary` `bg-secondary`
  `border-border` `border-destructive` `border-ring`
  `text-accent-foreground` `text-foreground` `text-primary`
  `text-primary-foreground` `text-secondary-foreground`
- **Tipografia:** `font-medium` `leading-none` `text-xs`
- **Espaço:** `gap-1` `min-h-6` `px-2` `py-0.5` `size-3`
- **Raio:** `rounded-full`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Mantenha o texto do selo curto, usando uma ou duas palavras que definam o estado claramente.
- Garanta que a mesma cor represente sempre o mesmo status em toda a aplicação.
- Use ícones pequenos de 12 px (size-3) antes do texto apenas como reforço de significado.

## NÃO faça

- Usar Badge como filtro clicável ou botão de ação direta → `chip`.
- Usar Badge para tags removíveis com botão de fechar → `tag`.
- Depender exclusivamente da cor para comunicar sucesso ou erro → use texto explícito ou ícone acessível.

## Exemplo mínimo

```tsx
import { Badge } from "@/components/ui/badge"

<div className="flex items-center gap-2">
  <Badge>Novo</Badge>
  <Badge variant="secondary">Rascunho</Badge>
  <Badge variant="destructive">Cancelado</Badge>
</div>
```
