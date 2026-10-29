---
slug: navigation-menu
nome: Navigation Menu
camada: organism
codigo: src/components/ui/navigation-menu.tsx
story: src/components/ui/navigation-menu.stories.tsx
status: piloto
sinonimos: [menu-de-navegacao, mega-menu, navegacao, navbar]
vizinhos: [menubar, dropdown-menu, sidebar]
referencias: [shadcn:navigation-menu]
---

# Navigation Menu

Menu estruturado para navegação principal em websites e portais. Oferece suporte a links diretos, painéis suspensos ricos e transição animada entre seções.

## Quando usar

- Cabeçalhos de sites e portais com navegação hierárquica e múltiplos níveis de conteúdo.
- Menus que combinam links simples e painéis suspensos ricos (mega menus com colunas, imagens e descrições).
- Navegação desktop primária que exige transições fluidas e posicionamento ancorado sob a barra de cabeçalho.

## Quando NÃO usar

- Barra de menus persistente de comandos para aplicações desktop densas → `menubar`.
- Menu suspenso de ações ou comandos disparado por um botão de ação → `dropdown-menu`.
- Navegação lateral expansível para aplicações com dashboards complexos → `sidebar`.

## Anatomia

| Parte | O que é |
|---|---|
| `NavigationMenu` | Container raiz que agrupa os itens de navegação e pode gerenciar o viewport compartilhado |
| `NavigationMenuList` | Lista horizontal não ordenada que contém os itens de navegação de primeiro nível |
| `NavigationMenuItem` | Cada item individual de navegação na lista |
| `NavigationMenuTrigger` | Botão gatilho que expande o painel de conteúdo e rotaciona o ícone de seta |
| `NavigationMenuContent` | Painel flutuante com suporte a animação de entrada e transição direcional |
| `NavigationMenuViewport` | Janela compartilhada onde os painéis de conteúdo são renderizados com transição de tamanho |
| `NavigationMenuLink` | Link navegável para páginas ou seções, com suporte a estado ativo |
| `NavigationMenuIndicator` | Indicador triangular que aponta para o item atualmente ativo na barra |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `viewport` | `boolean` | `true` | Habilita o viewport compartilhado para renderizar os painéis suspensos |
| `asChild` (NavigationMenuLink) | `boolean` | `false` | Permite compor com links do Next.js delegando as propriedades |
| `active` (NavigationMenuLink) | `boolean` | `false` | Marca visualmente o link como página ou seção atualmente ativa |

## Variantes

Sem variantes no componente raiz. Os estilos de gatilhos e links adaptam-se aos estados de foco, hover e página ativa.

## Tamanhos

Um só. Os gatilhos possuem altura fixa de 36 px (`h-9`) e os painéis ajustam largura e altura dinamicamente conforme o conteúdo interno via viewport.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Gatilhos em `bg-background` neutro com texto em `text-sm font-medium` |
| Hover | `hover:bg-accent hover:text-accent-foreground` nos gatilhos e links navegáveis |
| Foco | Anel `ring-ring` de 3 px visível via teclado (`focus-visible:ring-[3px]`) |
| Aberto | `data-state=open` no gatilho gira o chevron em 180° e exibe o painel correspondente |
| Ativo | `data-active=true` no NavigationMenuLink aplica destaque com `bg-accent/50 text-accent-foreground` |
| Desabilitado | `disabled` reduz opacidade para 50% e remove eventos de ponteiro |

## Conteúdo

- Rótulos de gatilho e links devem usar substantivos ou termos curtos e objetivos (ex.: "Produtos", "Recursos", "Preços", "Documentação").
- Em painéis ricos, organize os links com títulos claros e descrições curtas de apoio em uma ou duas linhas.
- Mantenha a nomenclatura consistente com a arquitetura de informação do site.

## Acessibilidade

- **Teclado:** Tab e Shift+Tab navegam entre os itens principais; setas direcionais percorrem itens dentro de um menu aberto; Enter ou Espaço abre ou aciona o link; Esc fecha o painel.
- **Leitor de tela:** Raiz identificada com papel `navigation`; gatilhos utilizam `aria-expanded` e `aria-haspopup="menu"`; links mantêm semântica navegável nativa.
- **Foco:** O foco é gerenciado pelo Radix Navigation Menu; ao fechar o submenu via Esc, o foco retorna ao gatilho correspondente sem perder a posição na página.
- **Cuidados:** Ao compor NavigationMenuLink com o `Link` do Next.js, utilize sempre a propriedade `asChild` para preservar a marcação acessível e os handlers de teclado.

## Tokens usados

- **Cor:** `bg-accent` `bg-background` `bg-border` `bg-popover`
  `text-accent-foreground` `text-muted-foreground`
  `text-popover-foreground`
- **Tipografia:** `font-medium` `text-sm`
- **Espaço:** `gap-1` `h-1.5` `h-2` `h-9` `left-0` `ml-1` `mt-1.5` `p-2`
  `pr-2.5` `px-4` `py-2` `size-4` `top-0` `top-0.25` `w-2`
- **Raio:** `rounded-md` `rounded-sm` `rounded-tl-sm`
- **Sombra:** `shadow-md`
- **Movimento:** `duration-motion-base`
- **Foco:** `ring-ring`

## Faça

- Utilize `asChild` ao integrar NavigationMenuLink com bibliotecas de roteamento como o Next.js Link.
- Agrupe links relacionados em colunas com títulos claros dentro de NavigationMenuContent.
- Destaque a página atual através da propriedade `active` no NavigationMenuLink correspondente.

## NÃO faça

- Usar navigation-menu para disparar ações de edição ou mutações de dados → `button`.
- Implementar menus de contexto rápidos de comandos locais → `dropdown-menu`.
- Substituir trilhas de localização hierárquica por navegação de menu → `breadcrumb`.

## Exemplo mínimo

```tsx
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[400px] gap-3 p-4">
          <NavigationMenuLink asChild>
            <Link href="/produtos/design-system" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
              <div className="text-sm font-medium leading-none">Design System</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Componentes e tokens para interfaces consistentes.</p>
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/documentacao">Documentação</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```
