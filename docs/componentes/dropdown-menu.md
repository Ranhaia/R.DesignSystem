---
slug: dropdown-menu
nome: Dropdown Menu
camada: organism
codigo: src/components/ui/dropdown-menu.tsx
story: src/components/ui/dropdown-menu.stories.tsx
status: piloto
sinonimos: [menu, menu-suspenso, dropdown, kebab, mais-opcoes]
vizinhos: [context-menu, select, popover]
referencias: [passi:menu, shadcn:dropdown-menu]
---

# Dropdown Menu

Menu suspenso ancorado a um botão acionador que exibe uma lista de ações ou opções. Fecha ao selecionar um item ou ao clicar fora do painel.

## Quando usar

- Menu de mais opções (como ícone kebab ou reticências) em linhas de tabela, cabeçalhos ou cards.
- Agrupamento de ações secundárias de usuário (como perfil, configurações, alternância de tema e logout).
- Lista de comandos ou ações rápidas associada a um gatilho visível sem poluir a interface.

## Quando NÃO usar

- Seleção de um valor para preenchimento de campo em formulário → `select`.
- Navegação permanente entre páginas ou seções estruturais do produto → `navigation-menu`.
- Menu contextual disparado pelo clique com o botão direito sobre um elemento → `context-menu`.

## Anatomia

| Parte | O que é |
|---|---|
| `DropdownMenu` | Raiz (Radix), gerencia o ciclo aberto/fechado do menu |
| `DropdownMenuPortal` | Portal que renderiza o painel flutuante fora do fluxo DOM local |
| `DropdownMenuTrigger` | Elemento acionador visível (botão ou ícone) com asChild |
| `DropdownMenuContent` | Painel flutuante ancorado ao gatilho com elevação, sombra e borda |
| `DropdownMenuGroup` | Agrupador estrutural de itens afins dentro do menu |
| `DropdownMenuItem` | Item interativo de ação com suporte a variante padrão ou destrutiva |
| `DropdownMenuCheckboxItem` | Item com estado alternável e indicador de caixa de seleção |
| `DropdownMenuRadioGroup` | Agrupador para seleção exclusiva entre múltiplos itens de opção |
| `DropdownMenuRadioItem` | Item de opção exclusiva com indicador circular preenchido |
| `DropdownMenuLabel` | Rótulo informativo ou cabeçalho descritivo de um grupo |
| `DropdownMenuSeparator` | Divisor visual horizontal entre grupos ou seções |
| `DropdownMenuShortcut` | Texto de atalho de teclado alinhado à direita do item |
| `DropdownMenuSub` | Contêiner raiz para submenu aninhado |
| `DropdownMenuSubTrigger` | Item que abre um submenu ao passar o mouse ou focar |
| `DropdownMenuSubContent` | Painel flutuante do submenu ancorado ao lado do submenu trigger |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `open` · `onOpenChange` (DropdownMenu) | `boolean` · `function` | — | Controle de abertura do menu (Radix) |
| `sideOffset` (DropdownMenuContent) | `number` | `4` | Distância em pixels entre o painel flutuante e o elemento gatilho |
| `inset` (DropdownMenuItem) | `boolean` | — | Adiciona recuo à esquerda de 32 px para alinhar com itens com ícone |
| `variant` (DropdownMenuItem) | `default` · `destructive` | `default` | Define o estilo visual padrão ou perigo para ações irreversíveis |
| `inset` (DropdownMenuLabel) | `boolean` | — | Adiciona recuo à esquerda de 32 px para alinhar o rótulo com itens com ícone |
| `inset` (DropdownMenuSubTrigger) | `boolean` | — | Adiciona recuo à esquerda de 32 px para alinhar com itens com ícone |

## Variantes

Não possui variantes no componente raiz; itens aceitam a prop `variant="destructive"` em `DropdownMenuItem` para ações irreversíveis (o padrão é `default`).

## Tamanhos

Tamanho único. Largura mínima de 128 px (`min-w-32`), ajustando-se automaticamente ao conteúdo do rótulo e atalho com rolagem vertical automática se ultrapassar a altura útil da janela.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Fundo em `bg-popover` com texto `text-popover-foreground` e cantos arredondados |
| Foco | Fundo em `bg-accent` com texto `text-accent-foreground` e anel de foco |
| Destrutivo em foco | Fundo avermelhado em `bg-destructive/10` com texto em `text-destructive` |
| Marcado | Ícone indicador de seleção exibido à esquerda do item |
| Desabilitado | Opacidade reduzida em 50% sem resposta a eventos de ponteiro |

## Conteúdo

- Cada item deve iniciar com verbo de ação no infinitivo: "Editar perfil", "Duplicar projeto".
- Ações destrutivas devem nomear com precisão o elemento afetado: "Excluir conta".
- Indique atalhos no padrão da plataforma: "⌘E" no Mac ou "Ctrl+E" no Windows.
- Agrupe ações afins com rótulos concisos: "Ações", "Conta", "Preferências".

## Acessibilidade

- **Teclado:** Enter, Espaço ou Seta Baixo no gatilho abrem o menu e focam o primeiro item. Setas Cima e Baixo navegam pelos itens. Seta Direita entra em submenus e Seta Esquerda ou Esc fecham o submenu ou menu. Enter seleciona o item.
- **Leitor de tela:** Gatilho anuncia papel `button` com `aria-haspopup="menu"` e `aria-expanded`. Painel com papel `menu` e itens com papéis `menuitem`, `menuitemcheckbox` ou `menuitemradio`. Itens marcados expõem `aria-checked`.
- **Foco:** Ao abrir, o foco vai para o primeiro item habilitado. Ao fechar com Esc ou seleção, o foco retorna imediatamente ao gatilho acionador.
- **Cuidados:** Ações destrutivas como Excluir devem declarar o perigo no próprio texto (critério WCAG 1.4.1), e não depender apenas da cor vermelha. Menus são para ações; para navegar entre páginas, use links.

## Tokens usados

- **Cor:** `bg-accent` `bg-border` `bg-destructive` `bg-popover`
  `text-accent-foreground` `text-destructive` `text-muted-foreground`
  `text-popover-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs` `tracking-widest`
- **Espaço:** `gap-2` `h-px` `left-2` `min-w-32` `mx-1` `my-1` `p-1`
  `pl-8` `pr-2` `px-2` `py-1.5` `size-3.5` `size-4`
- **Raio:** `rounded-md` `rounded-sm`
- **Sombra:** `shadow-lg` `shadow-md`
- **Foco:** `outline-ring`

## Faça

- Comece cada opção com um verbo no infinitivo claro e específico.
- Agrupe ações correlatas e posicione ações destrutivas por último, separadas por divisor.
- Utilize atalhos de teclado para comunicar comandos úteis já configurados no sistema.

## NÃO faça

- Usar dropdown-menu para selecionar valor em formulário que salva estado → `select`.
- Lista com mais de dez opções sem agrupamento nem divisores visíveis → organize com `command`.
- Submenus aninhados em mais de dois níveis que dificultam o uso no mouse → `dialog`.

## Exemplo mínimo

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Mais opções</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Editar perfil</DropdownMenuItem>
    <DropdownMenuItem>Duplicar</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```
