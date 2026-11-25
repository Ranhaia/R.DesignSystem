---
slug: popover
nome: Popover
camada: atom
codigo: src/components/ui/popover.tsx
story: src/components/ui/popover.stories.tsx
status: piloto
sinonimos: [painel-flutuante]
vizinhos: [tooltip, dialog, dropdown-menu]
referencias: [passi:popover, shadcn:popover]
---

# Popover

Painel flutuante acionado por clique que exibe conteúdo rico, configurações rápidas ou detalhes adicionais. Mantém a pessoa no contexto da tela sem a interrupção de uma janela modal.

## Quando usar

- Exibir formulários curtos ou controles interativos ancorados a um botão, como filtros rápidos.
- Mostrar detalhes complementares ou contexto enriquecido de um item com links ou ações secundárias.

## Quando NÃO usar

- Formulário extenso, fluxo complexo ou decisão crítica que interrompe o usuário → `dialog`.
- Texto curto e estritamente informativo disparado apenas no hover → `tooltip`.
- Lista vertical de comandos ou opções de navegação simples → `dropdown-menu`.

## Anatomia

| Parte | O que é |
|---|---|
| `Popover` | Raiz (Radix Popover) que gerencia o estado aberto ou fechado do painel |
| `PopoverTrigger` | Elemento interativo que abre o painel flutuante ao ser clicado |
| `PopoverContent` | Painel flutuante renderizado em portal com elevação e largura padrão w-72 |
| `PopoverAnchor` | Ponto de ancoragem opcional para posicionar o painel separado do botão de disparo |
| `PopoverHeader` | Cabeçalho interno para agrupar título e descrição com espaçamento consistente |
| `PopoverTitle` | Título do painel com tipografia semibold (h2) para identificar o conteúdo |
| `PopoverDescription` | Texto de apoio com cor atenuada para contextualizar a ação |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `align` (PopoverContent) | `start` · `center` · `end` | `center` | Alinhamento do painel em relação ao elemento disparador |
| `sideOffset` (PopoverContent) | `number` | `4` | Distância em pixels entre o painel flutuante e o disparador |
| `open` · `defaultOpen` (Popover) | `boolean` | — | Estado de visibilidade controlado ou inicial do painel |
| `onOpenChange` (Popover) | `(open: boolean) => void` | — | Callback disparado na abertura ou fechamento |

## Variantes

Nenhuma. A superfície segue o padrão elevado com fundo bg-popover e sombra shadow-md.

## Tamanhos

Largura padrão fixa em 288 px (w-72), com preenchimento interno de 16 px (p-4). A altura se adapta ao conteúdo.

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | Oculto e fora da árvore de renderização visível |
| Aberto | Visível com animação de fade e zoom a partir da origem da ancoragem |
| Foco no conteúdo | Primeiro elemento interativo do painel recebe o foco inicial |

## Conteúdo

- Título curto e direto com até 3 palavras: "Configurações", "Dimensões".
- Limite o conteúdo a um ou dois campos ou até duas ações secundárias.
- Textos de descrição concisos, sem ponto final em títulos.

## Acessibilidade

- **Teclado:** Enter ou Espaço no gatilho abrem o popover. O foco move para o primeiro elemento focável dentro do painel. Tab navega entre os controles internos. Esc fecha o painel e devolve o foco ao gatilho.
- **Leitor de tela:** O gatilho recebe aria-haspopup="dialog" e aria-expanded indicando se o painel está aberto. O painel atua com papel dialog associado ao título.
- **Foco:** Ao abrir, o foco é transferido para dentro do painel; ao fechar por Esc, clique fora ou ação, o foco retorna exatamente para o PopoverTrigger.
- **Cuidados:** Não use popover para decisões críticas ou fluxos que exijam confirmação do usuário; nesses casos utilize dialog com bloqueio de foco. Garanta que o botão disparador possua rótulo acessível quando contiver apenas ícone.

## Tokens usados

- **Cor:** `bg-popover` `text-muted-foreground`
  `text-popover-foreground`
- **Tipografia:** `font-medium` `text-sm`
- **Espaço:** `gap-1` `p-4` `w-72`
- **Raio:** `rounded-md`
- **Sombra:** `shadow-md`

## Faça

- Mantenha o conteúdo enxuto com poucas ações para manter o contexto ágil.
- Forneça um gatilho claro e acessível com Button ou elemento focável.
- Deixe o fechamento automático ao clicar fora ou pressionar a tecla Esc.

## NÃO faça

- Abrir o painel apenas com o cursor do mouse (hover) → use `tooltip`.
- Formulários complexos ou longos com múltiplos passos dentro do painel → utilize `dialog` ou `sheet`.
- Abrir múltiplos popovers simultâneos competindo na mesma tela → feche o anterior antes de abrir outro ou use `dropdown-menu`.

## Exemplo mínimo

```tsx
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Filtros rápidos</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p className="text-sm">Opções de filtragem rápida.</p>
  </PopoverContent>
</Popover>
```
