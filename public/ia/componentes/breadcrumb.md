---
slug: breadcrumb
nome: Breadcrumb
camada: molecule
codigo: src/components/ui/breadcrumb.tsx
story: src/components/ui/breadcrumb.stories.tsx
status: piloto
sinonimos: [breadcrumbs, migalhas, migalhas-de-pao, trilha]
vizinhos: [sidebar, navigation-menu, pagination]
referencias: [passi:migalhas-de-pao, shadcn:breadcrumb]
---

# Breadcrumb

Mostra a localização da página atual na hierarquia do site e o caminho percorrido. Permite navegar diretamente para qualquer nível ancestral da estrutura.

## Quando usar

- Estruturas de navegação com três ou mais níveis de profundidade (ex.: Início > Configurações > Notificações).
- Catálogos de produtos ou documentações técnicas organizadas em categorias e subcategorias.
- Aplicações de gestão onde o contexto pai orienta a visualização da tela atual.

## Quando NÃO usar

- Sites rasos ou navegações planas de apenas um ou dois níveis → `navigation-menu`.
- Navegação lateral primária que exibe toda a árvore da aplicação → `sidebar`.
- Paginação sequencial de listas ou tabelas → `pagination`.

## Anatomia

| Parte | O que é |
|---|---|
| `Breadcrumb` | Elemento raiz `<nav>` com `aria-label="breadcrumb"` e `data-slot="breadcrumb"`. |
| `BreadcrumbList` | Lista ordenada `<ol>` com `data-slot="breadcrumb-list"` e quebra flexível de itens. |
| `BreadcrumbItem` | Item individual `<li>` com `data-slot="breadcrumb-item"` que agrupa link e separador. |
| `BreadcrumbLink` | Link navegável para nível anterior com `data-slot="breadcrumb-link"`, suportando `asChild`. |
| `BreadcrumbPage` | Rótulo da página atual com `data-slot="breadcrumb-page"`, marcado com `aria-current="page"`. |
| `BreadcrumbSeparator` | Separador visual decorativo com `data-slot="breadcrumb-separator"` (`chevron_right` por padrão). |
| `BreadcrumbEllipsis` | Indicador de níveis intermediários recolhidos com `data-slot="breadcrumb-ellipsis"`. |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `asChild` (BreadcrumbLink) | `boolean` | `false` | Delega a renderização para o componente filho (como Next.js Link) |
| `children` (BreadcrumbSeparator) | `React.ReactNode` | `<Icon name="chevron_right" />` | Separador personalizado entre os itens |

## Variantes

Não possui variantes no código; o estilo dos itens adapta-se entre link clicável e página atual.

## Tamanhos

Tamanho único com espaçamento responsivo de `gap-1.5` no celular para `gap-2.5` em telas maiores.

## Estados

| Estado | Como aparece |
|---|---|
| Link normal | Texto secundário `text-muted-foreground` sem sublinhado |
| Link hover | Transição suave para a cor do texto principal (`hover:text-foreground`) |
| Link foco | Anel de foco visível no link ativo ou elemento focado |
| Página atual | Texto principal `text-foreground` com `aria-current="page"`, sem interação |
| Separador | Elemento decorativo com `aria-hidden="true"` e opacidade atenuada |

## Conteúdo

- Utilize os mesmos títulos das páginas de destino para manter consistência com a navegação.
- O último item corresponde sempre à página atual e deve estar por extenso sem ser link.
- Em títulos muito longos nos níveis intermediários, abrevie o texto mantendo a clareza.

## Acessibilidade

- **Teclado:** Tab navega sequencialmente apenas pelos links anteriores (`BreadcrumbLink`) e botões de expansão (`BreadcrumbEllipsis`). A página atual não recebe foco por não ser link.
- **Leitor de tela:** O contêiner `<nav>` possui `aria-label="breadcrumb"` e a página atual é identificada via `aria-current="page"` e `aria-disabled="true"`.
- **Foco:** O anel de foco visível destaca o item focado durante a navegação por teclado.
- **Cuidados:** Os separadores possuem `aria-hidden="true"` para não poluir a leitura de tela. Atenção: o elemento `BreadcrumbEllipsis` traz `More` fixo em inglês no `sr-only`, devendo ser sobrescrito para português quando necessário.

## Tokens usados

- **Cor:** `text-foreground` `text-muted-foreground`
- **Tipografia:** `font-normal` `text-sm`
- **Espaço:** `gap-1.5` `gap-2.5` `size-3.5` `size-9`

## Faça

- Posicione a trilha no topo da tela, logo acima do título principal da página.
- Mantenha a correspondência exata entre o rótulo do breadcrumb e o título da tela de destino.
- Use `asChild` em `BreadcrumbLink` para integrar com o roteamento da aplicação (`next/link`).

## NÃO faça

- Tornar o item da página atual um link clicável → utilize sempre `BreadcrumbPage`.
- Usar breadcrumb como único meio de navegação do sistema → combine com `sidebar` ou `navigation-menu`.
- Exibir separadores para leitores de tela → mantenha `aria-hidden="true"` no `BreadcrumbSeparator`.

## Exemplo mínimo

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Início</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/documentos">Documentos</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Relatório Anual</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```
