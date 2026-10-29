---
slug: scroll-area
nome: Scroll Area
camada: molecule
codigo: src/components/ui/scroll-area.tsx
story: src/components/ui/scroll-area.stories.tsx
status: piloto
sinonimos: [area-de-rolagem, rolagem, scroll]
vizinhos: [box, list, resizable]
referencias: [shadcn:scroll-area]
---

# Scroll Area

Fornece uma área de rolagem com barras customizadas e comportamento consistente entre diferentes navegadores e sistemas operacionais. Resolve a contenção de conteúdos extensos dentro de dimensões fixas sem depender de barras nativas discrepantes.

## Quando usar

- Painéis laterais, menus de navegação ou caixas de diálogo com listas longas de opções.
- Áreas com altura ou largura fixa onde o conteúdo excede o espaço disponível.
- Tabelas largas ou visualizações horizontais que necessitam de rolagem lateral suave e estilizada.

## Quando NÃO usar

- Rolagem principal da página inteira do navegador → use o fluxo nativo em `box`.
- Conteúdo pequeno que cabe integralmente na tela sem transbordar → `box`.
- Divisão de espaço interativa onde o usuário precisa redimensionar as seções vizinhas → `resizable`.

## Anatomia

| Parte | O que é |
|---|---|
| `ScrollArea` | Container raiz relativo que encapsula a área visível e o viewport rolável |
| Viewport | Elemento interno focável com tabIndex=0 que acomoda os elementos filhos roláveis |
| `ScrollBar` | Trilho da barra de rolagem customizada posicionado de forma vertical ou horizontal |
| Polegar | Marcador deslizante arredondado que indica o deslocamento e a proporção |
| Canto | Elemento decorativo posicionado na interseção quando ambas as barras estão ativas |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `orientation` (ScrollBar) | `vertical` · `horizontal` | `vertical` | Direção do trilho e da barra de rolagem customizada |

## Variantes

Sem variantes no código: a orientação da barra de rolagem é controlada pela prop orientation (vertical ou horizontal) no ScrollBar.

## Tamanhos

Sem variação de tamanho no componente: as dimensões de largura e altura da área de rolagem são definidas livremente por classes utilitárias no elemento raiz.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Barra de rolagem discreta com trilho transparente e marcador em `bg-border` |
| Foco | O viewport exibe anel de foco visível `ring-[3px] ring-ring` ao receber foco por teclado |
| Rolagem | Marcador se desloca suavemente acompanhando o toque, roda do mouse ou arrasto |

## Conteúdo

- Não possui texto próprio; o conteúdo rolável interno pode conter qualquer composição de componentes ou tipografia.
- Para melhorar a experiência com leitor de tela, passe aria-label descritivo no container: Lista de notificações, Histórico de compras.
- Garanta que itens internos mantenham espaçamento interno adequado para não colar no marcador de rolagem.

## Acessibilidade

- **Teclado:** O viewport interno possui tabIndex=0. Ao receber foco, pode ser rolado diretamente pelas setas direcionais, Page Up, Page Down, Home e End.
- **Leitor de tela:** O viewport expõe papel de região rolável com nome acessível configurado via aria-label (padrão "Conteúdo rolável").
- **Foco:** O anel de foco ring-[3px] ring-ring é exibido em torno de todo o viewport no estado focus-visible.
- **Cuidados:** Evite aninhar áreas de rolagem dentro de outras áreas de rolagem sem limites claros para não prender o foco e a rolagem do usuário (WCAG 2.1.2).

## Tokens usados

- **Cor:** `bg-border`
- **Espaço:** `h-2.5` `p-px` `w-2.5`
- **Raio:** `rounded-full`
- **Foco:** `ring-ring`

## Faça

- Defina sempre uma altura ou largura máxima finita no container via classes utilitárias.
- Forneça um aria-label significativo para descrever o bloco rolável em navegadores e leitores de tela.
- Utilize ScrollBar com orientação horizontal quando tabelas ou blocos largos excederem o viewport.

## NÃO faça

- Utilizar área de rolagem para conteúdo que não ultrapassa o limite da janela → `box`.
- Deixar a área rolável sem altura definida resultando em expansão infinita → passe classe de altura fixa como `h-64`.
- Permitir que o usuário precise redimensionar manualmente os painéis usando apenas rolagem → `resizable`.

## Exemplo mínimo

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-48 w-64 rounded-md border p-4" aria-label="Notificações">
  <div className="space-y-4">
    <p className="text-sm">Notificação 1: Arquivo sincronizado com sucesso.</p>
    <p className="text-sm">Notificação 2: Novo comentário recebido.</p>
    <p className="text-sm">Notificação 3: Atualização de segurança disponível.</p>
    <p className="text-sm">Notificação 4: Backup diário concluído.</p>
  </div>
</ScrollArea>
```
