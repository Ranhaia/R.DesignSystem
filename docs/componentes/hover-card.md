---
slug: hover-card
nome: Hover Card
camada: molecule
codigo: src/components/ui/hover-card.tsx
story: src/components/ui/hover-card.stories.tsx
status: piloto
sinonimos: [cartao-flutuante, preview-no-hover]
vizinhos: [card, popover, tooltip]
referencias: [shadcn:hover-card]
---

# Hover Card

Exibe uma prévia flutuante de informações enriquecidas ao passar o mouse ou focar um link. Permite consultar contexto adicional sem navegar até outra página.

## Quando usar

- Exibir prévias visuais ricas de perfis de usuário ao passar o mouse sobre @menções ou avatares ("Biografia, seguidores, status").
- Mostrar resumo de repositórios, artigos ou links externos antes da navegação efetiva.
- Pré-visualizar detalhes de produtos ou metadados rápidos em tabelas e painéis densos.

## Quando NÃO usar

- Apenas texto curto de ajuda ou descrição de botão/ícone sem formatação rica → `tooltip`
- Conteúdo interativo com formulários, botões ou ações que exigem clique para abrir → `popover`
- Janela que interrompe o fluxo para tomada de decisão ou preenchimento de dados → `dialog`

## Anatomia

| Parte | O que é |
|---|---|
| `HoverCard` | Elemento raiz que gerencia temporizadores de abertura e fechamento (Radix HoverCard) |
| `HoverCardTrigger` | Elemento gatilho (link ou botão) que dispara o painel no hover ou foco |
| `HoverCardContent` | Painel flutuante renderizado em portal com largura fixa de 256 px (`w-64`) |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `align` (HoverCardContent) | `start` · `center` · `end` | `center` | Alinhamento horizontal do painel em relação ao elemento gatilho |
| `sideOffset` (HoverCardContent) | `number` | `4` | Distância em pixels entre o painel flutuante e o gatilho |
| `openDelay` · `closeDelay` (HoverCard) | `number` | `700` / `300` | Tempo de espera em milissegundos antes de abrir ou fechar o painel (Radix) |
| `asChild` (HoverCardTrigger) | `boolean` | `false` | Renderiza no elemento filho via Radix Slot (ex.: com link ou botão) |

## Variantes

Nenhuma variante no código. O estilo padrão utiliza superfície de popover com borda e sombra média.

## Tamanhos

Largura padrão de 256 px (`w-64`) com altura dinâmica e preenchimento interno de 16 px (`p-4`).

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | Painel oculto com transição de saída fade e zoom (`zoom-out-95`) |
| Aberto | `data-state=open` com animação de entrada fade e zoom (`zoom-in-95`) após o atraso de hover |
| Foco | O gatilho exibe o anel de foco usual; o painel flutuante abre automaticamente no foco do gatilho |

## Conteúdo

- Título ou nome principal em destaque tipográfico: "Rafael Nhaia".
- Resumo de apoio com até três linhas de texto: "Product Designer e Engenheiro de Design.".
- Metadados secundários com ícones discretos: "Entrou em outubro de 2024".

## Acessibilidade

- **Teclado:** O foco abre o painel ao navegar com Tab até o gatilho. O foco permanece no gatilho e não entra no painel flutuante. Pressionar Escape fecha o painel.
- **Leitor de tela:** Como o painel abre no hover e foco sem prender o cursor, evite colocar informações cruciais exclusivas nele; leitores de tela navegam pelo link gatilho.
- **Foco:** O foco permanece no gatilho durante toda a exibição; fechar via Escape devolve o estado em repouso.
- **Cuidados:** O conteúdo flutuante permanece visível enquanto o ponteiro estiver sobre ele e fecha com Escape (WCAG 1.4.13); em dispositivos com toque, forneça navegação direta ou use `popover` com clique.

## Tokens usados

- **Cor:** `bg-popover` `text-popover-foreground`
- **Espaço:** `p-4` `w-64`
- **Raio:** `rounded-md`
- **Sombra:** `shadow-md`

## Faça

- Use `asChild` em `HoverCardTrigger` envolvendo um link semântico (`a` ou `Link`).
- Mantenha o conteúdo estritamente informativo, evitando formulários ou ações complexas dentro do painel.
- Garanta que a mesma informação esteja acessível na página de destino do link para usuários em telas de toque.

## NÃO faça

- Inserir formulários ou múltiplos botões interativos dentro do painel flutuante → utilize `popover`
- Utilizar HoverCard apenas para exibir rótulo de acessibilidade em ícone → use `tooltip`
- Depender exclusivamente do hover para exibir informações vitais ao fluxo da página → exiba em `card`

## Exemplo mínimo

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/perfil" className="text-sm font-medium underline">
      @rafaelnhaia
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="space-y-1">
    <h4 className="text-sm font-semibold">Rafael Nhaia</h4>
    <p className="text-xs text-muted-foreground">
      Product Designer focado em Design Systems acessíveis.
    </p>
  </HoverCardContent>
</HoverCard>
```
