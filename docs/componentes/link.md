---
slug: link
nome: Link
camada: atom
codigo: src/components/ui/link.tsx
story: src/components/ui/link.stories.tsx
status: piloto
sinonimos: [anchor, a, hiperlink]
vizinhos: [button, navigation-menu, breadcrumb]
referencias: [passi:link, shadcn:link, spec:link]
---

# Link

Permite navegar entre páginas, seções internas ou sites externos. Reaproveita o estilo visual de link do botão e dá suporte a indicador de saída externa e carregamento esqueleto.

## Quando usar

- Navegar entre diferentes páginas ou rotas da aplicação em links isolados ou corridos.
- Conectar o usuário a sites ou serviços externos abrindo em nova aba com a prop external.
- Ações secundárias de navegação em rodapés, termos de serviço ou textos explicativos.

## Quando NÃO usar

- Ação que altera dados, envia formulário ou abre janelas modais → `button`
- Menus complexos de navegação hierárquica com múltiplos níveis → `navigation-menu`
- Trilha de localização indicando o caminho atual da página → `breadcrumb`

## Anatomia

| Parte | O que é |
|---|---|
| `Link` | Elemento <a> (ou elemento filho via asChild) com classes da variante link do Button |
| Ícone de saída (opcional) | Ícone open_in_new renderizado automaticamente à direita quando external=true |
| `LinkSkeleton` | Placeholder de carregamento (Link.Skeleton) com a mesma escala de altura e largura |

## Composição

Usa: [`icon`](icon.md) · [`skeleton`](skeleton.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` | `LinkSize` | `default` | Escala de tamanho e altura herdada do botão (default, xs, sm, lg) |
| `asChild` | `boolean` | `false` | Delega a renderização para o elemento filho como next/link |
| `external` | `boolean` | `false` | Força target="_blank", rel="noopener noreferrer" e ícone de saída |
| `href` | `string` | — | Endereço de destino da navegação |
| `size` (LinkSkeleton) | `LinkSize` | `default` | Tamanho do placeholder esqueleto correspondente |

## Variantes

Nenhuma variante própria. O componente utiliza visualmente a variante link do Button, com sublinhado em hover.

## Tamanhos

Escala com quatro tamanhos: xs (24 px), sm (32 px), default (36 px) e lg (40 px), compatíveis com os botões.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Texto na cor primária com sublinhado deslocado |
| Hover | Sublinhado destacado via hover:underline |
| Foco | Anel visível via focus-visible:ring |
| Externo | Exibe o ícone open_in_new e abre em nova aba |
| Desabilitado | Suportado via aria-disabled com opacidade reduzida |

## Conteúdo

- O texto deve indicar com clareza o destino ou objetivo: "Ver relatórios", "Documentação da API".
- Evite expressões genéricas e isoladas como "clique aqui" ou "saiba mais".
- Para destinos externos, a indicação de nova aba é reforçada pelo ícone visual.

## Acessibilidade

- **Teclado:** Focável através da tecla Tab; a tecla Enter ativa a navegação para o destino informado no href.
- **Leitor de tela:** Anunciado com papel link e o texto do children como nome acessível; com external, deve-se avisar abertura em nova aba.
- **Foco:** Destacado por anel de foco visível via classes focus-visible herdadas do botão.
- **Cuidados:** Links externos devem incluir aviso de abertura em nova aba no texto ou acessibilidade; nunca use link para ações destrutivas.

## Tokens usados

- **Espaço:** `h-10` `h-6` `h-8` `h-9` `w-14` `w-16` `w-20` `w-24`
- **Raio:** `rounded-md`

## Faça

- Escreva textos descritivos que deixem o destino evidente antes do clique.
- Use a prop external ao apontar para URLs de terceiros fora da aplicação.
- Componha com next/link através de asChild para manter o roteamento client-side.

## NÃO faça

- Usar link para disparar mutações de dados ou ações de formulário → `button`
- Montar navegação em migalhas de pão com links manuais soltos → `breadcrumb`
- Substituir barras ou menus de navegação estruturados por links avulsos → `navigation-menu`

## Exemplo mínimo

```tsx
import { Link } from "@/components/ui/link"

<Link href="/relatorios">Ver relatórios da equipe</Link>
<Link href="https://example.com" external>
  Documentação externa
</Link>
<Link.Skeleton size="sm" />
```
