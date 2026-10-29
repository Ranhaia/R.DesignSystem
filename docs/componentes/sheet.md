---
slug: sheet
nome: Sheet
camada: organism
codigo: src/components/ui/sheet.tsx
story: src/components/ui/sheet.stories.tsx
status: piloto
sinonimos: [painel-lateral, side-panel, off-canvas]
vizinhos: [dialog, drawer, popover]
referencias: [passi:janela-de-acoes, shadcn:sheet]
---

# Sheet

Painel sobreposto que desliza a partir de uma das bordas da tela. Permite exibir formulários longos, detalhes de itens ou configurações sem perder o contexto da página.

## Quando usar

- Formulário extenso ou edição com muitos campos que poluiriam um modal centralizado.
- Painel complementar com detalhes aprofundados, histórico ou filtros avançados de uma listagem.
- Menus e navegação contextual que demandam área vertical ampla na tela.

## Quando NÃO usar

- Tarefa curta e focada com poucos campos → `dialog`.
- Confirmação simples ou aviso rápido sem formulário → `sonner`.
- Ações rápidas acionadas pelo polegar no celular → `drawer`.

## Anatomia

| Parte | O que é |
|---|---|
| `Sheet` | Raiz baseada no Dialog da Radix. Controla o estado de abertura |
| `SheetTrigger` | Elemento gatilho que abre o painel ao ser acionado |
| `SheetClose` | Elemento que fecha o painel ao receber clique |
| `SheetPortal` | Portal que renderiza o painel no final do documento DOM |
| `SheetOverlay` | Fundo semitransparente escuro que cobre o restante da tela |
| `SheetContent` | Container principal que desliza da borda configurada |
| `SheetHeader` | Cabeçalho interno para agrupar título e descrição |
| `SheetFooter` | Rodapé alinhado na base para organizar os botões de ação |
| `SheetTitle` | Título obrigatório que define o nome acessível da janela |
| `SheetDescription` | Descrição complementar vinculada por acessibilidade |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `open` · `defaultOpen` · `onOpenChange` (Sheet) | `boolean` · `(open: boolean) => void` | — | Controle de abertura e fechamento herdado da Radix |
| `side` (SheetContent) | `top` · `right` · `bottom` · `left` | `right` | Borda da tela de onde o painel desliza |
| `showCloseButton` (SheetContent) | `boolean` | `true` | Exibe o botão com ícone de fechar no canto superior |
| `closeLabel` (SheetContent) | `string` | `Fechar` | Texto que o leitor de tela anuncia no botão de fechar |

## Variantes

Nenhuma. A superfície usa `bg-popover` com borda delimitadora em qualquer direção.

## Tamanhos

Largura padrão de três quartos até `sm:max-w-sm` nas laterais e altura automática no topo ou rodapé.

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | Painel oculto e desmontado do DOM |
| Aberto | Sobreposição escura `bg-black/50` e painel com `shadow-lg` que desliza da borda com transição suave |

## Conteúdo

- Título conciso no imperativo ou substantivo indicando a tarefa: "Filtrar resultados" ou "Editar perfil".
- A descrição orienta o propósito das opções contidas no painel.
- O botão de confirmação no rodapé repete o verbo principal: "Aplicar filtros", não "OK".
- Sem ponto final em títulos e rótulos de botões.

## Acessibilidade

- **Teclado:** Tab e Shift+Tab navegam entre os elementos interativos presos no painel. Esc fecha o painel.
- **Leitor de tela:** Papel `dialog` modal. `SheetTitle` fornece o nome acessível obrigatório e `SheetDescription` descreve o conteúdo via `aria-describedby`.
- **Foco:** Ao abrir, o foco vai para o primeiro elemento focável dentro do painel. Ao fechar, o foco retorna ao `SheetTrigger` acionador.
- **Cuidados:** O botão interno de fechar anuncia "Fechar" no leitor de tela. Para outro texto, passe `closeLabel` em `SheetContent`; para uma ação com verbo próprio ("Cancelar"), use `showCloseButton={false}` e um `SheetClose` com esse texto.

## Tokens usados

- **Cor:** `bg-popover` `bg-secondary` `text-foreground`
  `text-muted-foreground` `text-popover-foreground`
- **Tipografia:** `font-semibold` `text-sm`
- **Espaço:** `bottom-0` `gap-1.5` `gap-2` `gap-4` `inset-0` `inset-x-0`
  `inset-y-0` `left-0` `max-w-sm` `p-4` `right-0` `right-4` `top-0`
  `top-4` `w-3`
- **Sombra:** `shadow-lg`
- **Foco:** `ring-offset-background` `ring-ring`

## Faça

- Forneça um título claro em `SheetTitle` para identificar o propósito do painel.
- Posicione as ações principais e de cancelamento no `SheetFooter`.
- Utilize `closeLabel` para ajustar o texto anunciado no botão de fechar, ou `showCloseButton={false}` com um `SheetClose` quando precisar de um botão próprio.

## NÃO faça

- Informações rápidas ou confirmações pontuais → `dialog`.
- Notificações de status sem formulário → `sonner`.
- Deixar o painel sem `SheetTitle` acessível → `sheet`.

## Exemplo mínimo

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Filtros avançados</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filtros avançados</SheetTitle>
      <SheetDescription>Refine a listagem de registros por data e status.</SheetDescription>
    </SheetHeader>
    <div className="flex-1 p-4">
      {/* campos de filtro */}
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancelar</Button>
      </SheetClose>
      <Button>Aplicar filtros</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```
