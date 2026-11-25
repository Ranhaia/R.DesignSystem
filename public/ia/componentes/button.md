---
slug: button
nome: Button
camada: atom
codigo: src/components/ui/button.tsx
story: src/components/ui/button.stories.tsx
status: estavel
sinonimos: [botao, botão, btn, cta, botao-primario]
vizinhos: [link, icon-button, split-button, button-group]
referencias: [passi:botao, shadcn:button, nimbus:button]
---

# Button

Dispara uma ação. O texto diz exatamente o que vai acontecer: "Salvar
alterações", não "OK".

## Quando usar

- Confirmar, enviar, criar, excluir: ações que mudam algo.
- Abrir uma janela ou painel desta mesma tela.

## Quando NÃO usar

- Leva para outra página ou site → `link` (ou `<Button asChild><Link/></Button>` só se o visual de botão for exigido).
- Só ícone, sem texto → `icon-button`.
- Ação principal com variações (salvar / salvar como) → `split-button`.

## Anatomia

| Parte | O que é |
|---|---|
| `Button` | Raiz: `<button>` com `data-slot="button"`, `data-variant` e `data-size`. Com `asChild`, as props vão para o filho (Radix Slot). |
| Ícone (opcional) | SVG antes ou depois do texto. Tamanho herdado (`size-4`, `size-3` no `xs`). |
| Texto | Via `label` ou `children`. O tipo exige `children`, `icon` ou `label` — nunca botão vazio. |
| `Button.Skeleton` | Placeholder com a mesma altura e canto do tamanho escolhido. |

## Composição

Usa: [`skeleton`](skeleton.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `destructive` · `outline` · `secondary` · `ghost` · `link` · `ai-primary` · `ai-secondary` | `default` | Hierarquia visual |
| `size` | `xs` · `sm` · `default` · `md` · `lg` · `xl` · `icon-xs` · `icon-sm` · `icon` · `icon-md` · `icon-lg` · `icon-xl` | `default` | Altura. `default` = `md`; `icon` = `icon-md` |
| `fullWidth` | `boolean` | `false` | Ocupa 100% da largura |
| `asChild` | `boolean` | `false` | Renderiza no elemento filho |
| `icon` · `label` | `React.ReactNode` | — | Conteúdo explícito (alternativa a `children`) |
| `disabled` | `boolean` | `false` | Desabilita e tira do foco |
| `aria-disabled` | `boolean` | — | Mesmo visual de desabilitado, mas continua focável e anunciado |
| `...props` | `ComponentProps<"button">` | — | `onClick`, `type`, `form`… |
| `children` | `React.ReactNode` | — | Conteúdo livre; obrigatório com `asChild` |
| `size` (ButtonSkeleton) | `xs` · `sm` · `default` · `md` · `lg` · `xl` · `icon-xs` · `icon-sm` · `icon` · `icon-md` · `icon-lg` · `icon-xl` | `default` | Mesma altura do botão que ele substitui |
| `fullWidth` (ButtonSkeleton) | `boolean` | `false` | Ocupa 100% da largura, como o botão |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Ação principal. **Uma por contexto.** |
| `destructive` | Ação que não se desfaz (excluir) |
| `outline` | Ação alternativa; fundo transparente, herda o do container |
| `secondary` | Ação forte que não é a principal |
| `ghost` | Ação discreta, sem superfície até o hover |
| `link` | Ação com cara de texto |
| `ai-primary` | Ação principal que dispara IA |
| `ai-secondary` | Ação secundária que dispara IA |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `xs` | 24 px | Barras de ferramenta densas |
| `sm` | 32 px | Tabelas, filtros |
| `default` | 40 px | Padrão; mínimo no celular |
| `md` | 40 px, igual a `default` | Padrão; mínimo no celular |
| `lg` | 48 px | Chamada principal, telas de celular |
| `xl` | 56 px | Destaque de página |
| `icon-xs` | 24 px | Só ícone — exige `aria-label` |
| `icon-sm` | 32 px | Só ícone — exige `aria-label` |
| `icon` | 40 px | Só ícone, tamanho padrão — exige `aria-label` |
| `icon-md` | 40 px, igual a `icon` | Só ícone — exige `aria-label` |
| `icon-lg` | 48 px | Só ícone — exige `aria-label` |
| `icon-xl` | 56 px | Só ícone — exige `aria-label` |

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Variantes com superfície têm `shadow-sm` |
| Hover | Fundo um tom abaixo; sombra diminui e desce 1 px |
| Pressionado | `active:scale-(--scale-pressed)` |
| Foco | Anel de 3 px em `ring` (`focus-visible`) |
| Desabilitado | `opacity-50`, sem sombra, sem clique (`disabled` ou `aria-disabled`) |
| Carregando | Composição: `<Spinner />` + `aria-disabled`. Não é prop |

## Conteúdo

- Verbo + objeto, até 3 palavras: Salvar alterações, Criar conta.
- Use o mesmo verbo do título da janela ou da página.
- Sem ponto final e sem exclamação.

## Acessibilidade

- **Teclado:** Tab chega ao botão; Enter ou Espaço executam.
- **Leitor de tela:** papel `button`; o nome é o texto. Só ícone → `aria-label` obrigatório.
- **Foco:** depois da ação, o foco fica no botão — salvo se abrir janela ou trocar de tela.
- **Cuidados:** durante carregamento use `aria-disabled` (não `disabled`): `disabled` joga o foco para o `<body>`. Mantenha o texto ou anuncie "Salvando".

## Tokens usados

- **Cor:** `--ai-gradient-hover` `--ai-gradient-rest` `bg-accent`
  `bg-ai-surface` `bg-ai-surface-highlight` `bg-destructive` `bg-input`
  `bg-primary` `bg-secondary` `border-ai-interactive`
  `border-ai-interactive-hover` `border-destructive` `border-input`
  `border-ring` `text-accent-foreground` `text-ai-text-high`
  `text-primary` `text-primary-foreground` `text-secondary-foreground`
- **Tipografia:** `font-medium` `text-base` `text-sm` `text-xs`
- **Espaço:** `gap-1` `gap-1.5` `gap-2` `h-10` `h-12` `h-14` `h-6` `h-8`
  `px-1.5` `px-2` `px-2.5` `px-3` `px-4` `px-5` `px-6` `px-8` `py-2`
  `size-10` `size-12` `size-14` `size-3` `size-4` `size-6` `size-8`
  `w-16` `w-20` `w-24` `w-28` `w-32`
- **Raio:** `rounded-md`
- **Sombra:** `shadow-sm` `shadow-xs`
- **Movimento:** `--scale-pressed` `duration-motion-fast` `ease-spring`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Comece o texto com verbo: Salvar, Enviar, Criar conta.
- Deixe a ação principal à direita em janelas e formulários.
- Explique perto do botão por que ele está desabilitado.

## NÃO faça

- Texto vago ("OK", "Clique aqui", "Sim") → diga a ação: "Excluir capítulo".
- Dois `default` lado a lado → um vira `outline` ou `secondary`.
- `destructive` em ação que se desfaz → `default` ou `outline`.

## Exemplo mínimo

```tsx
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

<Button>Salvar alterações</Button>
<Button variant="outline" size="sm">Cancelar</Button>
<Button size="icon" aria-label="Fechar" icon={<Icon name="close" />} />
<Button.Skeleton size="sm" />
```
