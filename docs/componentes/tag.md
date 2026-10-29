---
slug: tag
nome: Tag
camada: atom
codigo: src/components/ui/tag.tsx
story: src/components/ui/tag.stories.tsx
status: piloto
sinonimos: [marcador, tag-removivel]
vizinhos: [badge, chip]
referencias: [passi:etiqueta, spec:tag]
---

# Tag

Rótulo estático para categorização, metadados e indicação de status. Organiza informações sem disparar ações nem remover filtros.

## Quando usar

- Categorizar itens de catálogo ou artigos com palavras-chave estáticas.
- Indicar status textual ou características secundárias que não possuem interação.

## Quando NÃO usar

- Filtro interativo ou tag com botão de remover → `chip`.
- Notificação pontual de contagem numérica ou badge sobreposto → `badge`.

## Anatomia

| Parte | O que é |
|---|---|
| `Tag` | Elemento `<span>` (ou elemento filho com `asChild`) com estilo de etiqueta estática |
| `Tag.Skeleton` | Placeholder retangular (`TagSkeleton`) com 24 px de altura (`h-6`) para estados de carregamento |

## Composição

Usa: [`skeleton`](skeleton.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `primary` · `success` · `warning` · `danger` · `ai-generated` | `default` | Tom semântico da etiqueta |
| `highlight` | `true` · `false` | `false` | Inverte as cores de fundo e texto para criar maior contraste |
| `asChild` | `boolean` | `false` | Delega a renderização para o elemento filho via Radix Slot |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Rótulo neutro para categorias gerais sem conotação de alerta |
| `primary` | Destaque com a cor principal de marca do tema ativo |
| `success` | Estados concluídos, aprovados ou confirmações positivas |
| `warning` | Avisos preventivos, pendências ou itens sob atenção |
| `danger` | Erros, falhas, bloqueios ou situações críticas |
| `ai-generated` | Conteúdo, sugestão ou metadado gerado por inteligência artificial |

## Tamanhos

Um só: altura mínima de 24 px (`min-h-6`), texto pequeno (`text-xs`) e cantos suavizados (`rounded-sm`).

## Estados

Só leitura: não recebe foco nem possui interações de clique.

## Conteúdo

- Rótulos curtos de uma ou duas palavras: "Tecnologia", "Em análise".
- Evite frases completas ou pontuação final dentro da etiqueta.

## Acessibilidade

- **Teclado:** Não recebe foco por se tratar de um elemento estático de leitura.
- **Leitor de tela:** Anuncia o texto contido no `children`. Quando usada como indicação de estado, adicione contexto textual sem depender apenas da cor.
- **Foco:** Não retém foco de navegação.
- **Cuidados:** A cor da variante nunca deve ser a única portadora de significado; garanta que o texto explique claramente o estado ou categoria.

## Tokens usados

- **Cor:** `bg-accent` `bg-ai-interactive` `bg-ai-surface`
  `bg-danger-100` `bg-danger-900` `bg-muted` `bg-muted-foreground`
  `bg-primary` `bg-success-100` `bg-success-900` `bg-warning-100`
  `bg-warning-900` `border-ai-interactive` `border-border`
  `border-danger-300` `border-primary` `border-success-300`
  `border-warning-300` `text-ai-surface` `text-ai-text-high`
  `text-danger-100` `text-danger-900` `text-muted`
  `text-muted-foreground` `text-primary` `text-primary-foreground`
  `text-success-100` `text-success-900` `text-warning-100`
  `text-warning-900`
- **Tipografia:** `font-medium` `leading-none` `text-xs`
- **Espaço:** `gap-1` `h-6` `min-h-6` `px-1.5` `size-3` `w-20`
- **Raio:** `rounded-sm`

## Faça

- Use para metadados e rótulos estáticos que não disparam ações.
- Combine variantes semânticas de forma consistente em todo o produto.
- Prefira textos concisos com uma ou duas palavras.

## NÃO faça

- Usar para filtros interativos com remoção → `chip`.
- Usar para contadores numéricos flutuantes → `badge`.
- Depender somente da cor para comunicar sucesso ou falha → inclua texto claro.

## Exemplo mínimo

```tsx
import { Tag } from "@/components/ui/tag"

<div className="flex items-center gap-2">
  <Tag>Design</Tag>
  <Tag variant="success">Aprovado</Tag>
  <Tag variant="ai-generated">IA</Tag>
</div>
```
