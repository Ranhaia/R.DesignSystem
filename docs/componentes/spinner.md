---
slug: spinner
nome: Spinner
camada: atom
codigo: src/components/ui/spinner.tsx
story: src/components/ui/spinner.stories.tsx
status: piloto
sinonimos: [carregando, loader, loading]
vizinhos: [skeleton, progress]
referencias: [passi:carregando]
---

# Spinner

Indicador giratório para esperas de tempo indeterminado. Mostra que o sistema está ocupado processando uma ação.

## Quando usar

- Esperas curtas sem tempo estimado de término, como envio de formulário ou consulta rápida.
- Dentro de botões, itens de lista ou campos de entrada para indicar processamento local.

## Quando NÃO usar

- O layout do conteúdo final já é conhecido → `skeleton`.
- O progresso ou percentual de conclusão pode ser medido numericamente → `progress`.

## Anatomia

| Parte | O que é |
|---|---|
| `Spinner` | Ícone `progress_activity` em rotação contínua (`animate-spin`) com `role="status"` |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `className` | `string` | — | Classes utilitárias para ajustar tamanho (ex.: `size-5`) ou cor (ex.: `text-primary`) |
| `aria-label` | `string` | `"Loading"` | Nome acessível anunciado a tecnologias assistivas |
| `...props` | `Omit<ComponentProps<"svg">, "name" \ | "fill">` | — | Demais propriedades SVG nativas repassadas ao elemento |

## Variantes

Nenhuma variante pré-definida. A cor é controlada por classes utilitárias no `className` (ex.: `text-muted-foreground`, `text-primary`).

## Tamanhos

Um só: 16 px (`size-4`). Outros tamanhos devem ser aplicados via classes utilitárias no `className` (ex.: `size-5`, `size-6`).

## Estados

| Estado | Como aparece |
|---|---|
| Em rotação | Animação contínua de rotação (`animate-spin`) em torno do eixo central |

## Conteúdo

- Não tem texto próprio embutido.
- Quando acompanhado de rótulo textual, use verbo no gerúndio com reticências: "Carregando...", "Salvando...".

## Acessibilidade

- **Teclado:** Não recebe foco.
- **Leitor de tela:** Possui papel `role="status"` e anuncia a propriedade `aria-label` quando inserido no DOM.
- **Foco:** Não retém nem altera o foco do teclado; mantenha o foco no elemento acionador ou na área ativa.
- **Cuidados:** O componente vem com `aria-label="Loading"` em inglês no código. Forneça sempre `aria-label` em português ("Carregando...") contextualizando a ação em andamento.

## Tokens usados

- **Espaço:** `size-4`

## Faça

- Passe um `aria-label` em português descrevendo a operação em andamento.
- Use dentro de botões ou cartões para sinalizar processamento localizado.
- Prefira cores com contraste suficiente com o fundo sobre o qual o indicador gira.

## NÃO faça

- Manter o rótulo padrão em inglês → passe `aria-label` descritivo em português.
- Usar para tarefas com percentual conhecido de conclusão → `progress`.
- Usar em páginas inteiras cujo esqueleto estrutural é conhecido → `skeleton`.

## Exemplo mínimo

```tsx
import { Spinner } from "@/components/ui/spinner"

<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Spinner aria-label="Carregando dados..." />
  <span>Carregando...</span>
</div>
```
