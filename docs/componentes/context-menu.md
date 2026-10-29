---
slug: context-menu
nome: Context Menu
camada: organism
codigo: src/components/ui/context-menu.tsx
story: src/components/ui/context-menu.stories.tsx
status: piloto
sinonimos: [menu-de-contexto, clique-direito]
vizinhos: [dropdown-menu, menubar]
referencias: [passi:menu, shadcn:context-menu]
---

# Context Menu

Menu contextual flutuante acionado pelo clique com o botão direito do mouse ou toque longo. Agrupa ações específicas aplicadas ao elemento apontado.

## Quando usar

- Oferecer atalhos e ações secundárias sobre itens de tabelas, arquivos, cards ou áreas de trabalho.
- Disponibilizar operações complementares (como copiar, duplicar ou inspecionar) sem ocupar espaço fixo na tela.
- Prover comandos contextuais de edição para usuários avançados em ferramentas e painéis de criação.

## Quando NÃO usar

- Único meio de acesso a ações primárias ou críticas de uma tela → `button`.
- Menu de ações visível disparado por clique com o botão esquerdo em um gatilho → `dropdown-menu`.
- Navegação permanente entre páginas ou seções do sistema → `navigation-menu`.

## Anatomia

| Parte | O que é |
|---|---|
| `ContextMenu` | Raiz (Radix), gerencia o ciclo de abertura e fechamento do menu |
| `ContextMenuTrigger` | Área alvo que intercepta o clique com botão direito ou toque longo |
| `ContextMenuGroup` | Agrupador estrutural de itens relacionados no menu |
| `ContextMenuPortal` | Portal que renderiza o menu flutuante fora do fluxo DOM local |
| `ContextMenuSub` | Contêiner raiz para submenu aninhado |
| `ContextMenuRadioGroup` | Agrupador para seleção exclusiva entre múltiplos itens de opção |
| `ContextMenuSubTrigger` | Item que abre um submenu ao passar o mouse ou pressionar seta |
| `ContextMenuSubContent` | Painel flutuante do submenu posicionado ao lado do gatilho |
| `ContextMenuContent` | Painel flutuante posicionado no ponto do ponteiro com elevação e borda |
| `ContextMenuItem` | Item interativo de ação com suporte a variante padrão ou destrutiva |
| `ContextMenuCheckboxItem` | Item de alternância com indicador de caixa de seleção |
| `ContextMenuRadioItem` | Item de opção exclusiva com indicador circular preenchido |
| `ContextMenuLabel` | Cabeçalho de texto descritivo para rotular um grupo |
| `ContextMenuSeparator` | Divisor horizontal sutil entre seções ou grupos de ações |
| `ContextMenuShortcut` | Texto de atalho de teclado alinhado à direita do item |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `disabled` (ContextMenuItem) | `boolean` | `false` | Desabilita a interação com o item de menu |
| `inset` (ContextMenuSubTrigger) | `boolean` | — | Adiciona recuo à esquerda de 32 px para alinhar com itens que contêm ícone |
| `inset` (ContextMenuItem) | `boolean` | — | Adiciona recuo à esquerda de 32 px para alinhar com itens que contêm ícone |
| `variant` (ContextMenuItem) | `default` · `destructive` | `default` | Define o estilo visual padrão ou perigo para ações irreversíveis |
| `inset` (ContextMenuLabel) | `boolean` | — | Adiciona recuo à esquerda de 32 px para alinhar o rótulo com itens que contêm ícone |

## Variantes

Não possui variantes no componente raiz; itens aceitam a prop `variant="destructive"` em `ContextMenuItem` para ações irreversíveis (o padrão é `default`).

## Tamanhos

Tamanho único. Largura mínima de 128 px (`min-w-32`), ajustando-se ao comprimento do rótulo e atalho com altura dinâmica respeitando o viewport.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Fundo em `bg-popover` com texto `text-popover-foreground` e cantos arredondados |
| Foco | Fundo em `bg-accent` com texto `text-accent-foreground` e anel de foco |
| Destrutivo em foco | Fundo avermelhado em `bg-destructive/10` com texto em `text-destructive` |
| Marcado | Indicador visual de check ou círculo exibido na margem esquerda |
| Desabilitado | Opacidade reduzida em 50% sem resposta a hover ou eventos de ponteiro |

## Conteúdo

- Cada item deve iniciar com verbo de ação no infinitivo: "Copiar link", "Duplicar linha".
- Ações destrutivas devem nomear com precisão o que será excluído: "Excluir pasta".
- Indique atalhos no formato padrão do sistema operacional: "⌘C" no Mac ou "Ctrl+C" no Windows.
- Rótulos de grupo devem ser curtos e em estilo de título: "Organizar por", "Ações rápidas".

## Acessibilidade

- **Teclado:** Shift+F10 ou tecla Menu abre o menu contextual no elemento com foco. Setas Cima e Baixo navegam pelos itens. Seta Direita entra em submenus e Seta Esquerda ou Esc fecham o submenu ou menu. Enter executa a opção selecionada.
- **Leitor de tela:** Papel `menu` no painel e `menuitem`, `menuitemcheckbox` ou `menuitemradio` nos itens. O estado marcado é comunicado via `aria-checked`. Submenus expõem `aria-haspopup="menu"` e `aria-expanded`.
- **Foco:** Ao abrir, o foco move-se automaticamente para o primeiro item habilitado. Ao fechar com Esc ou ao acionar um comando, o foco retorna para o elemento gatilho original.
- **Cuidados:** Nunca coloque ações exclusivas no menu de contexto (critério WCAG 2.1.1). Pessoas em dispositivos de toque ou navegando exclusivamente por teclado dependem de caminhos alternativos visíveis na interface.

## Tokens usados

- **Cor:** `bg-accent` `bg-border` `bg-destructive` `bg-popover`
  `text-accent-foreground` `text-destructive` `text-foreground`
  `text-muted-foreground` `text-popover-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs` `tracking-widest`
- **Espaço:** `gap-2` `h-px` `left-2` `min-w-32` `mx-1` `my-1` `p-1`
  `pl-8` `pr-2` `px-2` `py-1.5` `size-3.5` `size-4`
- **Raio:** `rounded-md` `rounded-sm`
- **Sombra:** `shadow-lg` `shadow-md`
- **Foco:** `outline-ring`

## Faça

- Agrupe ações similares com `ContextMenuGroup` e separe por `ContextMenuSeparator`.
- Posicione itens com variante destrutiva no final do menu, isolados por um divisor.
- Forneça sempre um botão ou controle visível equivalente na tela para a mesma ação.

## NÃO faça

- Ocultar no menu de contexto a única forma de realizar uma tarefa crítica → `button`.
- Aninhar submenus com mais de dois níveis de profundidade → divida as opções com `dialog`.
- Criar menus extensos com mais de dez opções sem agrupamento temático → `command`.

## Exemplo mínimo

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-md border border-dashed text-sm">
    Clique com o botão direito aqui
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copiar</ContextMenuItem>
    <ContextMenuItem>Duplicar</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```
