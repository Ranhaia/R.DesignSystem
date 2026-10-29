---
slug: menubar
nome: Menubar
camada: organism
codigo: src/components/ui/menubar.tsx
story: src/components/ui/menubar.stories.tsx
status: piloto
sinonimos: [barra-de-menu, barra-de-menus]
vizinhos: [dropdown-menu, navigation-menu, toggle-group]
referencias: [shadcn:menubar]
---

# Menubar

Barra horizontal persistente de menus inspirada em aplicações desktop. Oferece acesso consistente e agrupado a comandos globais por categorias e atalhos.

## Quando usar

- Barras de menus horizontais no topo de aplicativos densos com múltiplos comandos categorizados (ex.: Arquivo, Editar, Exibir).
- Interfaces ricas em ferramentas desktop que agrupam atalhos de teclado e submenus aninhados.
- Editores ou ambientes de trabalho complexos que exigem acesso consistente e persistente a comandos globais.

## Quando NÃO usar

- Menu único de ações disparado por um botão isolado → `dropdown-menu`.
- Navegação primária entre páginas e seções do site → `navigation-menu`.
- Barra de ferramentas para alternância e formatação rápida → `toggle-group`.

## Anatomia

| Parte | O que é |
|---|---|
| `Menubar` | Barra horizontal raiz que envolve e ancora todos os menus |
| `MenubarMenu` | Cada menu de topo individual agrupado na barra |
| `MenubarGroup` | Container estrutural interno para agrupar itens logicamente |
| `MenubarPortal` | Portal que renderiza os painéis flutuantes fora da hierarquia DOM principal |
| `MenubarRadioGroup` | Agrupamento para opções de seleção única e exclusiva |
| `MenubarTrigger` | Botão gatilho no topo que expande o painel de opções |
| `MenubarContent` | Painel suspenso flutuante com a lista de ações do menu |
| `MenubarItem` | Item de comando interativo para disparar uma ação |
| `MenubarCheckboxItem` | Item de alternância com indicador visual de marcação de seleção |
| `MenubarRadioItem` | Opção exclusiva de rádio com indicador circular de item ativo |
| `MenubarLabel` | Título textual estático para rotular um conjunto de comandos |
| `MenubarSeparator` | Divisor horizontal fino entre grupos de ações |
| `MenubarShortcut` | Texto auxiliar alinhado à direita para exibir atalhos de teclado |
| `MenubarSub` | Raiz de um submenu aninhado de segundo nível |
| `MenubarSubTrigger` | Gatilho que expande o submenu suspenso lateralmente |
| `MenubarSubContent` | Painel flutuante que contém os comandos do submenu |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `align` (MenubarContent) | — | `start` | Alinhamento horizontal do painel em relação ao gatilho |
| `alignOffset` (MenubarContent) | — | `-4` | Deslocamento em pixels no eixo de alinhamento |
| `sideOffset` (MenubarContent) | — | `8` | Distância em pixels entre o painel e o gatilho |
| `inset` (MenubarItem) | `boolean` | — | Aplica recuo à esquerda para alinhar com itens marcáveis |
| `variant` (MenubarItem) | `default` · `destructive` | `default` | Estilo visual da ação, destacando comandos destrutivos |
| `inset` (MenubarLabel) | `boolean` | — | Aplica recuo à esquerda no rótulo para alinhamento uniforme |
| `inset` (MenubarSubTrigger) | `boolean` | — | Aplica recuo à esquerda no gatilho do submenu |

## Variantes

Sem variantes no componente raiz. Os itens de ação em `MenubarItem` suportam a variante `destructive` para comandos de exclusão ou ações críticas.

## Tamanhos

Um só. A barra possui altura fixa de 36 px (`h-9`) e os painéis suspensos utilizam largura mínima de 192 px (`min-w-48`).

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Barra com fundo `bg-background` e borda suave; gatilhos e itens em estado de repouso |
| Foco | Anel `outline-ring` de 2 px no gatilho ou item ativo via teclado |
| Aberto | `data-state=open` aplica `bg-accent text-accent-foreground` no gatilho e exibe o painel animado |
| Destrutivo | `data-variant=destructive` aplica texto e ícone em `text-destructive` com fundo de destaque no hover |
| Desabilitado | `data-disabled` reduz a opacidade para 50% e desativa cliques e foco |

## Conteúdo

- Gatilhos de topo devem usar substantivos curtos no singular (ex.: "Arquivo", "Editar", "Exibir", "Ajuda").
- Itens de ação devem iniciar por verbos no infinitivo (ex.: "Salvar", "Imprimir", "Desfazer").
- Evite pontos finais em rótulos, itens e atalhos de teclado.

## Acessibilidade

- **Teclado:** Setas direcionais esquerda e direita navegam entre os menus de topo; setas cima e baixo percorrem os itens do painel; Enter ou Espaço aciona; Esc fecha o menu aberto.
- **Leitor de tela:** Papel `menubar` na raiz, `menuitem` nos itens, `menuitemcheckbox` e `menuitemradio` nos itens marcáveis; `aria-haspopup="menu"` e `aria-expanded` indicam menus suspensos.
- **Foco:** O foco é gerenciado pelo Radix; ao abrir um menu, o foco move-se para o primeiro item disponível; ao fechar com Esc, retorna ao gatilho correspondente.
- **Cuidados:** Atalhos exibidos via MenubarShortcut são apenas indicativos visuais; assegure que os manipuladores globais de teclado estejam registrados na aplicação.

## Tokens usados

- **Cor:** `bg-accent` `bg-background` `bg-border` `bg-destructive`
  `bg-popover` `text-accent-foreground` `text-destructive`
  `text-muted-foreground` `text-popover-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs` `tracking-widest`
- **Espaço:** `gap-1` `gap-2` `h-9` `h-px` `left-2` `min-w-32`
  `min-w-48` `mx-1` `my-1` `p-1` `pl-8` `pr-2` `px-2` `py-1` `py-1.5`
  `size-3.5` `size-4`
- **Raio:** `rounded-md` `rounded-sm`
- **Sombra:** `shadow-lg` `shadow-md` `shadow-xs`
- **Foco:** `outline-ring`

## Faça

- Organize comandos em categorias lógicas e previsíveis para a pessoa usuária.
- Utilize MenubarSeparator para agrupar ações relacionadas e evitar listas contínuas excessivas.
- Indique atalhos de teclado reais e ativos através do componente MenubarShortcut.

## NÃO faça

- Usar menubar para navegação estrutural entre páginas web → `navigation-menu`.
- Disparar menu único sem categorias agrupadas → `dropdown-menu`.
- Incluir formulários complexos dentro dos painéis suspensos → `dialog`.

## Exemplo mínimo

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Novo documento <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Abrir... <MenubarShortcut>⌘O</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem variant="destructive">Fechar</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Editar</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```
