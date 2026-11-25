---
slug: sidebar
nome: Sidebar
camada: organism
codigo: src/components/ui/sidebar.tsx
story: src/components/ui/sidebar.stories.tsx
status: piloto
sinonimos: [menu-lateral, barra-lateral, side-nav]
vizinhos: [navigation-menu, sheet, breadcrumb]
referencias: [passi:menu-lateral, shadcn:sidebar]
---

# Sidebar

Barra de navegação lateral para organizar a hierarquia e as seções de um produto. Suporta agrupamento, submenus, estado recolhido em ícones e adaptação mobile em folha deslizante.

## Quando usar

- Navegação persistente em sistemas web, dashboards e painéis administrativos.
- Estruturação de muitas seções divididas por módulos, categorias ou projetos.
- Telas que precisam maximizar a área útil alternando entre expandido e recolhido em ícones.

## Quando NÃO usar

- Navegação horizontal no cabeçalho com poucas seções → `navigation-menu`.
- Painel temporário para tarefas contextuais ou filtros rápidos → `sheet`.
- Trilha sequencial de localização em páginas profundas → `breadcrumb`.

## Anatomia

| Parte | O que é |
|---|---|
| `SidebarProvider` | Provedor raiz com contexto, atalho e persistência em cookie |
| `Sidebar` · `SidebarInset` | Estrutura da barra e container do conteúdo principal |
| `SidebarTrigger` · `SidebarRail` | Botão e trilho interativo para alternar a barra |
| `SidebarHeader` · `SidebarFooter` | Áreas fixas no topo (marca) e base (perfil) |
| `SidebarContent` · `SidebarSeparator` | Área de rolagem interna e linha divisória |
| `SidebarGroup` · `SidebarGroupContent` | Agrupamento semântico e container dos itens |
| `SidebarGroupLabel` · `SidebarGroupAction` | Rótulo do grupo e botão de ação rápida |
| `SidebarMenu` · `SidebarMenuItem` | Lista de navegação e item individual |
| `SidebarMenuButton` · `SidebarMenuAction` | Botão interativo de menu e ação contextual |
| `SidebarMenuBadge` · `SidebarMenuSkeleton` | Indicador de contagem e placeholder de carga |
| `SidebarMenuSub` · `SidebarMenuSubItem` · `SidebarMenuSubButton` | Subnível de menu, item e botão indentado |
| `SidebarInput` | Campo de busca estilizado para a barra lateral |

## Composição

Usa: [`button`](button.md) · [`icon`](icon.md) · [`input`](input.md) · [`separator`](separator.md) · [`sheet`](sheet.md) · [`skeleton`](skeleton.md) · [`tooltip`](tooltip.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `defaultOpen` (SidebarProvider) | `boolean` | `true` | Estado inicial aberto da barra |
| `open` (SidebarProvider) | `boolean` | — | Estado aberto em modo controlado |
| `onOpenChange` (SidebarProvider) | `(open: boolean) => void` | — | Callback de mudança de abertura |
| `side` | `left` · `right` | `left` | Lado no desktop |
| `mobileSide` | `left` · `right` | — | Lado da folha no celular |
| `variant` | `sidebar` · `floating` · `inset` | `sidebar` | Estilo visual da barra |
| `collapsible` | `offcanvas` · `icon` · `none` | `offcanvas` | Modo de colapso |
| `asChild` (SidebarGroupLabel) | `boolean` | `false` | Renderiza elemento filho |
| `asChild` (SidebarGroupAction) | `boolean` | `false` | Renderiza elemento filho |
| `asChild` (SidebarMenuButton) | `boolean` | `false` | Renderiza como Link |
| `isActive` (SidebarMenuButton) | `boolean` | `false` | Marca rota atual ativa |
| `tooltip` (SidebarMenuButton) | `string` · `React.ComponentProps<typeof TooltipContent>` | — | Dica na barra recolhida |
| `variant` (SidebarMenuButton) | `default` · `outline` | `default` | Variante do botão |
| `size` (SidebarMenuButton) | `default` · `sm` · `lg` | `default` | Altura do botão |
| `asChild` (SidebarMenuAction) | `boolean` | `false` | Renderiza elemento filho |
| `showOnHover` (SidebarMenuAction) | `boolean` | `false` | Mostra apenas no hover |
| `showIcon` (SidebarMenuSkeleton) | `boolean` | `false` | Mostra ícone no placeholder |
| `asChild` (SidebarMenuSubButton) | `boolean` | `false` | Renderiza elemento filho |
| `size` (SidebarMenuSubButton) | `sm` · `md` | `md` | Tamanho do sub-botão |
| `isActive` (SidebarMenuSubButton) | `boolean` | `false` | Marca subitem ativo |
| `mobileTitle` | `string` | `Barra lateral` | Nome da folha no celular (leitor de tela) |
| `mobileDescription` | `string` | `Exibe a barra lateral no celular.` | Descrição da folha (leitor de tela) |
| `label` (SidebarTrigger) | `string` | `Alternar barra lateral` | Texto do gatilho (leitor de tela) |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Botão padrão de navegação com destaque no hover |
| `outline` | Botão com borda e fundo, para seletores de conta |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `default` | 32 px | Altura padrão para itens principais |
| `sm` | 28 px | Para listas secundárias densas |
| `lg` | 48 px | Para cabeçalhos com avatar de equipe |

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Texto `text-sidebar-foreground` sobre fundo `bg-sidebar` |
| Hover | Fundo `hover:bg-sidebar-accent` e texto em destaque |
| Pressionado | Fundo `active:bg-sidebar-accent` com feedback |
| Foco | Anel `focus-visible:ring-2 focus-visible:ring-sidebar-ring` |
| Ativo | Rota ativa com `data-[active=true]:bg-sidebar-accent` |
| Desabilitado | Opacidade com `disabled:opacity-50` e sem clique |

## Conteúdo

- Rótulos curtos em maiúsculas: "Painel", "Relatórios" ou "Configurações".
- Títulos de grupos em caixa alta ou subtítulo curto: "Geral", "Projetos".
- Sem ponto final em rótulos e itens de navegação.

## Acessibilidade

- **Teclado:** Tab e Shift+Tab navegam entre os itens. Ctrl+B (ou Cmd+B) alterna o estado aberto/recolhido. Esc fecha a folha no celular.
- **Leitor de tela:** Itens usam papéis semânticos de botão ou link. Quando recolhida em ícones, os botões exibem tooltip acessível.
- **Foco:** Anel de foco visível em cada item navegável. Na versão móvel, o foco fica contido no painel deslizante.
- **Cuidados:** `SidebarTrigger` e `SidebarRail` anunciam "Alternar barra lateral"; a folha do celular, "Barra lateral". Troque com `label`, `mobileTitle` e `mobileDescription`.

## Tokens usados

- **Cor:** `--sidebar-accent` `--sidebar-border` `bg-background`
  `bg-sidebar` `bg-sidebar-accent` `bg-sidebar-border`
  `border-sidebar-border` `text-sidebar-accent-foreground`
  `text-sidebar-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs`
- **Espaço:** `gap-1` `gap-2` `h-12` `h-4` `h-5` `h-7` `h-8` `inset-2`
  `inset-y-0` `left-0` `left-1` `left-2` `m-2` `min-h-0` `min-w-0`
  `min-w-5` `ml-0` `ml-2` `mt-8` `mx-2` `mx-3.5` `p-0` `p-2` `pr-8`
  `px-1` `px-2` `px-2.5` `py-0.5` `right-0` `right-1` `right-2`
  `right-3` `right-4` `size-4` `size-7` `top-1` `top-1.5` `top-2.5`
  `top-3.5` `w-0` `w-0.5` `w-4` `w-5`
- **Raio:** `rounded-lg` `rounded-md` `rounded-xl`
- **Sombra:** `shadow-sm`
- **Movimento:** `duration-motion-base`
- **Foco:** `ring-sidebar-ring`

## Faça

- Use `SidebarProvider` na raiz para gerenciar estado e cookie.
- Passe a prop `tooltip` em `SidebarMenuButton` para a barra recolhida.
- Agrupe itens tematicamente com `SidebarGroup` e use rótulos descritivos.

## NÃO faça

- Barra lateral para tarefas temporárias ou modais → `sheet`.
- Ocultar rótulos sem fornecer ícone claro no modo recolhido → `sidebar`.
- Omitir gatilho visível de alternância em telas intermediárias → `sidebar`.

## Exemplo mínimo

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Início" isActive>
                <span>Início</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarTrigger />
</SidebarProvider>
```
