---
slug: icon-button
nome: Icon Button
camada: molecule
codigo: src/components/ui/icon-button.tsx
story: src/components/ui/icon-button.stories.tsx
status: piloto
sinonimos: [botao-de-icone, botão-de-ícone]
vizinhos: [button, toggle, tooltip]
referencias: [passi:botao-de-icone, shadcn:button, spec:icon-button]
---

# Icon Button

Dispara uma ação representada exclusivamente por um ícone visual, sem rótulo textual visível. O nome acessível é obrigatório via tipagem estática para navegação acessível.

## Quando usar

- Ações frequentes em barras de ferramentas ou cabeçalhos densos com espaço reduzido.
- Ações universais baseadas em ícones amplamente reconhecidos, como fechar, buscar, favoritar ou editar.
- Ações secundárias em linhas de tabela ou cartões, sempre acompanhadas de dica flutuante.

## Quando NÃO usar

- Ação complexa que necessita de rótulo em texto para evitar ambiguidade → `button`.
- Ação de ligar ou desligar um estado independente em vez de disparar comando → `toggle`.
- Destino que redireciona o usuário para outra rota ou página externa → `link`.

## Anatomia

| Parte | O que é |
|---|---|
| `IconButton` | Raiz: elemento `<button>` com `data-slot="icon-button"` que encapsula Button e restringe as escalas quadradas. |
| Ícone | Elemento gráfico obrigatório informado via prop `icon`, único conteúdo visual renderizado. |
| `IconButtonSkeleton` | Placeholder de carregamento que reaproveita a geometria quadrada do botão. |

## Composição

Usa: [`button`](button.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `icon` | `React.ReactNode` | — | Ícone exibido como único conteúdo do botão |
| `size` | `IconButtonSize` | `icon` | Dimensão quadrada restrita às escalas de ícone do Button |
| `aria-label` | `string` | — | Nome acessível obrigatório via tipo para leitores de tela |
| `variant` | — | `default` | Variante visual herdada das variantes do Button |
| `size` (IconButtonSkeleton) | `IconButtonSize` | `icon` | Dimensão quadrada do placeholder de carregamento |

## Variantes

Sem variantes próprias no código: reaproveita as variantes visuais de Button (`default`, `secondary`, `outline`, `ghost`, `destructive`, `link`, `ai-primary`, `ai-secondary`).

## Tamanhos

Restrito às 6 escalas quadradas do Button: `icon-xs` (24 px), `icon-sm` (32 px), `icon` e `icon-md` (40 px), `icon-lg` (48 px) e `icon-xl` (56 px).

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Superfície da variante escolhida; variantes com elevação usam `shadow-sm` |
| Hover | Fundo um tom abaixo; na variante `default` a elevação desce 1 px |
| Pressionado | Escala reduzida via `active:scale-(--scale-pressed)` |
| Foco | Anel de foco de 3 px em `ring` via `focus-visible` |
| Desabilitado | Opacidade reduzida com `opacity-50`, sem sombra e sem clique |
| Carregando | Composição com `IconButton.Skeleton` na mesma escala quadrada |

## Conteúdo

- Não possui texto visível próprio; exige `aria-label` com verbo no imperativo ou infinitivo: Fechar, Excluir item.
- O texto do `aria-label` deve coincidir exatamente com a dica flutuante associada: Copiar link.
- Sem ponto final e sem exclamação no nome acessível.

## Acessibilidade

- **Teclado:** Tab move o foco para o botão; Enter ou Espaço acionam a ação.
- **Leitor de tela:** Papel `button`. Como não há texto visível, o leitor anuncia o valor obrigatório passado em `aria-label`.
- **Foco:** Anel de 3 px visível no teclado (`focus-visible`). Após a execução, o foco permanece no próprio botão se a tela continuar a mesma.
- **Cuidados:** Nunca renderize ícone interativo sem nome acessível claro (WCAG 4.1.2) e garanta alvo de toque mínimo de 24 px (WCAG 2.5.8), usando `tooltip` para usuários visuais.

## Tokens usados

Nenhum.

## Faça

- Passe um `aria-label` descritivo e objetivo informando a ação direta: Favoritar, Fechar janela.
- Combine o botão com `tooltip` para garantir compreensão rápida por usuários que usam mouse ou toque.
- Utilize símbolos e glifos universalmente consagrados para evitar confusão no uso diário.

## NÃO faça

- Ícone isolado para ação rara ou ambígua → `button` com texto.
- Botão de ícone sem nome acessível ou com descrição vazia → passe `aria-label` obrigatório.
- Ação destrutiva sem confirmação ou sem destaque de perigo → `button` destrutivo ou `alert-dialog`.

## Exemplo mínimo

```tsx
import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"

<IconButton icon={<Icon name="favorite" />} aria-label="Favoritar" />
<IconButton variant="ghost" size="icon-sm" icon={<Icon name="close" />} aria-label="Fechar" />
<IconButton.Skeleton size="icon" />
```
