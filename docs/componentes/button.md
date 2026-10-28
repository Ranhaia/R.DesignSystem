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
| Raiz | `<button>` com `data-slot="button"`, `data-variant` e `data-size`. Com `asChild`, as props vão para o filho (Radix Slot). |
| Ícone (opcional) | SVG antes ou depois do texto. Tamanho herdado (`size-4`, `size-3` no `xs`). |
| Texto | Via `label` ou `children`. O tipo exige `children`, `icon` ou `label` — nunca botão vazio. |
| `Button.Skeleton` | Placeholder com a mesma altura e canto do tamanho escolhido. |

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `secondary` · `outline` · `ghost` · `destructive` · `link` · `ai-primary` · `ai-secondary` | `default` | Hierarquia visual |
| `size` | `xs` · `sm` · `md` · `default` · `lg` · `xl` · `icon-xs` · `icon-sm` · `icon` · `icon-md` · `icon-lg` · `icon-xl` | `default` | Altura. `default` = `md`; `icon` = `icon-md` |
| `fullWidth` | `boolean` | `false` | Ocupa 100% da largura |
| `asChild` | `boolean` | `false` | Renderiza no elemento filho |
| `icon` · `label` | `ReactNode` | — | Conteúdo explícito (alternativa a `children`) |
| `disabled` | `boolean` | `false` | Desabilita e tira do foco |
| `aria-disabled` | `boolean` | — | Mesmo visual de desabilitado, mas continua focável e anunciado |
| `...props` | `ComponentProps<"button">` | — | `onClick`, `type`, `form`… |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Ação principal. **Uma por contexto.** |
| `secondary` | Ação forte que não é a principal |
| `outline` | Ação alternativa; fundo transparente, herda o do container |
| `ghost` | Ação discreta, sem superfície até o hover |
| `destructive` | Ação que não se desfaz (excluir) |
| `link` | Ação com cara de texto |
| `ai-primary` · `ai-secondary` | Ação que dispara IA. ⚠️ Em revisão: o PASSI desaconselha gradiente como marca de IA (atrito A3 em `H-referencia-passi-ds`) |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `xs` | 24 px | Barras de ferramenta densas |
| `sm` | 32 px | Tabelas, filtros |
| `md` / `default` | 40 px | Padrão; mínimo no celular |
| `lg` | 48 px | Chamada principal, telas de celular |
| `xl` | 56 px | Destaque de página |
| `icon-*` | 24 a 56 px, quadrado | Só ícone — exige `aria-label` |

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

`bg-primary` `text-primary-foreground` `bg-secondary` `bg-destructive`
`bg-accent` `border-input` `ring` · IA: `--ai-gradient-rest`
`--ai-gradient-hover` `bg-ai-surface` `border-ai-interactive`
`text-ai-text-high` · Movimento: `duration-motion-fast` `ease-spring`
`--scale-pressed` · `shadow-sm` `shadow-xs` `rounded-md`.

## Faça

- Comece o texto com verbo: Salvar, Enviar, Criar conta.
- Deixe a ação principal à direita em janelas e formulários.
- Explique perto do botão por que ele está desabilitado.

## NÃO faça

- Texto vago ("OK", "Clique aqui", "Sim") → diga a ação: "Excluir capítulo".
- Dois `default` lado a lado → um vira `outline` ou `secondary`.
- `destructive` em ação que se desfaz → `default` ou `outline`.
- `<Button onClick={navegar}>` para trocar de página → `link`.

## Exemplo mínimo

```tsx
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

<Button>Salvar alterações</Button>
<Button variant="outline" size="sm">Cancelar</Button>
<Button size="icon" aria-label="Fechar" icon={<Icon name="close" />} />
<Button.Skeleton size="sm" />
```
