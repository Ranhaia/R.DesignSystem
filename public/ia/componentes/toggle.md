---
slug: toggle
nome: Toggle
camada: atom
codigo: src/components/ui/toggle.tsx
story: src/components/ui/toggle.stories.tsx
status: piloto
sinonimos: [botao-alternavel, toggle-button]
vizinhos: [toggle-group, button, switch]
referencias: [shadcn:toggle]
---

# Toggle

Botão de dois estados que alterna entre ativado e desativado. Preserva a escolha visualmente para formatações ou marcações independentes.

## Quando usar

- Alternar formatação de texto isolada, como negrito, itálico ou sublinhado.
- Ações independentes de dois estados, como favoritar ou fixar um item sem formar um grupo.

## Quando NÃO usar

- Conjunto de opções em barra de ferramentas com seleção única ou múltipla → `toggle-group`.
- Alternar uma configuração de sistema ou conta que tenha efeito imediato → `switch`.
- Disparar uma ação que não mantém estado persistente na tela → `button`.

## Anatomia

| Parte | O que é |
|---|---|
| `Toggle` | Botão binário de dois estados (`TogglePrimitive.Root`) com suporte a ícone e texto |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `outline` | `default` | Estilo visual do botão |
| `size` | `default` · `sm` · `lg` | `default` | Altura e espaçamento interno |
| `pressed` · `defaultPressed` | `boolean` | — | Estado ativo do controle, controlado ou inicial |
| `onPressedChange` | `(pressed: boolean) => void` | — | Função disparada ao alternar o estado |
| `disabled` | `boolean` | `false` | Desabilita a interação com o botão |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Fundo transparente em repouso; ideal para barras de ferramentas ou áreas limpas |
| `outline` | Borda delimitadora visível mesmo quando desativado; bom para controles isolados |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `default` | 36 px | Altura padrão (`h-9`) para a maioria das barras de ferramentas e ações |
| `sm` | 32 px | Altura compacta (`h-8`) para barras densas ou painéis laterais estreitos |
| `lg` | 40 px | Altura maior (`h-10`) para telas de toque ou botões com maior área de clique |

## Estados

| Estado | Como aparece |
|---|---|
| Desativado | Fundo transparente e texto ou ícone com peso normal (`font-normal`) |
| Ativado | Fundo destacado `bg-accent`, texto em negrito (`font-bold`) e ícone preenchido |
| Hover | Fundo suave `hover:bg-muted` |
| Foco | Borda `border-ring` com anel visível de 3 px em `ring-ring` |
| Desabilitado | Opacidade reduzida em 50% (`disabled:opacity-50`) e sem interação |

## Conteúdo

- Use rótulo curto ou ícone autoexplicativo: "Negrito", "Itálico", "Favorito".
- Quando usar apenas ícone, é obrigatório passar `aria-label` descritivo.

## Acessibilidade

- **Teclado:** Tab move o foco para o botão. Espaço ou Enter alterna entre os estados ativado e desativado.
- **Leitor de tela:** Papel `role="button"` com `aria-pressed="true"` ou `aria-pressed="false"`. Anuncia o rótulo do botão ou `aria-label`.
- **Foco:** Anel visível de 3 px em `focus-visible:ring-ring`.
- **Cuidados:** Ao usar apenas ícone como filho, passe sempre `aria-label` para garantir que tecnologias assistivas compreendam a ação.

## Tokens usados

- **Cor:** `bg-accent` `bg-muted` `border-destructive` `border-input`
  `border-ring` `text-accent-foreground` `text-muted-foreground`
- **Tipografia:** `font-bold` `font-normal` `text-sm`
- **Espaço:** `gap-2` `h-10` `h-8` `h-9` `min-w-10` `min-w-8` `min-w-9`
  `px-1.5` `px-2` `px-2.5` `size-4`
- **Raio:** `rounded-md`
- **Sombra:** `shadow-xs`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Passe `aria-label` sempre que o conteúdo for apenas um ícone.
- Use variantes transparentes (`default`) dentro de barras de ferramentas compartilhadas.
- Combine com ícones sem preenchimento fixo para permitir a troca automática de estilo.

## NÃO faça

- Agrupar múltiplos botões de seleção sem um container apropriado → `toggle-group`.
- Usar para ativar ou desativar configurações de conta com efeito imediato → `switch`.
- Usar para ações de disparo único que não guardam estado → `button`.

## Exemplo mínimo

```tsx
import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Alternar negrito">
  Negrito
</Toggle>
```
