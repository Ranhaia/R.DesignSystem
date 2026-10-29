---
slug: item
nome: Item
camada: atom
codigo: src/components/ui/item.tsx
story: src/components/ui/item.stories.tsx
status: piloto
sinonimos: [item-de-lista, list-item, linha]
vizinhos: [list, card, button]
referencias: [passi:item-de-lista, shadcn:item]
---

# Item

Linha estruturada para exibir informações com mídia, texto e ações em listas e coleções. Organiza metadados, títulos e controles com espaçamento consistente.

## Quando usar

- Montar linhas de listagem para contatos, arquivos, notificações ou configurações.
- Exibir registros com mídia à esquerda (ícone, avatar ou miniatura) e ações à direita.
- Agrupar itens com divisores verticais ou contorno através de ItemGroup e ItemSeparator.

## Quando NÃO usar

- Bloco de conteúdo independente e destacado com elevação própria → `card`
- Lista de texto corrido ou parágrafos sem mídia ou ações → `list`
- Botão isolado de navegação ou ação simples → `button`

## Anatomia

| Parte | O que é |
|---|---|
| `ItemGroup` | Container vertical flexível para agrupar múltiplos itens |
| `ItemSeparator` | Divisor horizontal sutil entre itens consecutivos |
| `Item` | Linha principal flexível com suporte a link ou elemento filho |
| `ItemMedia` | Container de mídia alinhado ao início para ícones ou imagens |
| `ItemContent` | Área central flexível que empilha título e descrição |
| `ItemTitle` | Título com tipografia média e alinhamento compacto |
| `ItemDescription` | Texto descritivo com truncamento automático em duas linhas |
| `ItemActions` | Bloco horizontal alinhado ao final para botões e controles |
| `ItemHeader` | Linha superior opcional para cabeçalho interno da linha |
| `ItemFooter` | Linha inferior opcional para rodapé interno da linha |

## Composição

Usa: [`separator`](separator.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `outline` · `muted` | `default` | Estilo de superfície e borda do item |
| `size` | `default` · `sm` | `default` | Espaçamento interno e distância entre elementos |
| `asChild` | `boolean` | `false` | Renderiza no elemento filho como link de navegação |
| `variant` (ItemMedia) | `default` · `icon` · `image` | `default` | Dimensões e acabamento da mídia à esquerda |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Superfície transparente, ideal para listas densas e contínuas |
| `outline` | Borda delimitadora visível para separar linhas individuais |
| `muted` | Superfície com fundo sutil para destacar itens secundários |
| `icon` | Caixa de 32×32 px com borda para ícones de sistema |
| `image` | Caixa de 40×40 px com corte arredondado para fotos e miniaturas |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `default` | — | Espaçamento padrão de 16 px com padding p-4 e gap-4 para listas gerais |
| `sm` | — | Espaçamento compacto com padding px-4 py-3 e gap-2.5 para painéis densos |

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Fundo transparente ou de acordo com a variante escolhida |
| Hover | Fundo sutil hover:bg-accent/50 quando configurado como link interativo |
| Foco | Anel de 3 px em ring-ring com border-ring via focus-visible |

## Conteúdo

- Título curto e direto identificando a entidade ou assunto principal.
- Descrição complementar resumida com no máximo duas linhas de texto.
- Ações com rótulos descritivos ou botões de ícone com rótulo acessível.

## Acessibilidade

- **Teclado:** Quando usado como link com asChild, Tab navega para a linha; controles em ItemActions recebem foco subsequente.
- **Leitor de tela:** Itens dentro de listas anunciam posição ordinal e total; o título provê o rótulo principal da linha.
- **Foco:** Anel visível de 3 px contorna o item interativo ou botões de ação internos individualmente.
- **Cuidados:** A mídia inicial deve ter aria-hidden quando for decorativa; não coloque múltiplos links aninhados na mesma linha.

## Tokens usados

- **Cor:** `bg-accent` `bg-muted` `border-border` `border-ring`
  `text-muted-foreground` `text-primary`
- **Tipografia:** `font-medium` `font-normal` `leading-normal`
  `leading-snug` `text-sm`
- **Espaço:** `gap-1` `gap-2` `gap-2.5` `gap-4` `my-0` `p-4` `px-4`
  `py-3` `size-10` `size-4` `size-8`
- **Raio:** `rounded-md` `rounded-sm`
- **Foco:** `ring-ring`

## Faça

- Mantenha a mesma composição de mídia e texto em todos os itens da mesma lista.
- Utilize ItemSeparator ou a variante outline para delimitar linhas quando não houver divisores externos.
- Use asChild para compor com links de navegação mantendo semântica adequada.

## NÃO faça

- Usar item como cartão de destaque com sombra e margens amplas → `card`
- Misturar itens com alturas e alinhamentos divergentes na mesma listagem → `list`
- Colocar botões de ação sem nome acessível em ItemActions → `icon-button`

## Exemplo mínimo

```tsx
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

<Item variant="outline">
  <ItemMedia variant="icon">
    <Icon name="folder" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Documentos</ItemTitle>
    <ItemDescription>Arquivos e relatórios compartilhados da equipe.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="ghost" size="sm">Abrir</Button>
  </ItemActions>
</Item>
```
