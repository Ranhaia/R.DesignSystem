---
slug: dialog
nome: Dialog
camada: organism
codigo: src/components/ui/dialog.tsx
story: src/components/ui/dialog.stories.tsx
status: estavel
sinonimos: [modal, janela-modal, janela, dialogo, diálogo]
vizinhos: [alert-dialog, sheet, drawer, popover, sonner]
referencias: [passi:janela-modal, shadcn:dialog]
---

# Dialog

Janela por cima da tela para uma tarefa curta e focada — editar,
preencher, escolher. O resto da página fica inerte e escurecido.

## Quando usar

- Tarefa curta que precisa de atenção total antes de voltar ao fluxo.
- Formulário de poucos campos ligado ao que está na tela.

## Quando NÃO usar

- Confirmar ação destrutiva ("Excluir capítulo?") → `alert-dialog`.
- Confirmação que não pede resposta ("Link copiado") → `sonner`.
- Conteúdo longo ou formulário extenso → uma página, ou `sheet`.
- No celular, ações sobre um item → `drawer`.
- Ação simples que cabe num painel pequeno → `popover`.

## Anatomia

| Parte | O que é |
|---|---|
| `Dialog` | Raiz (Radix). Controla aberto/fechado |
| `DialogTrigger` | Elemento que abre (use `asChild` com `Button`) |
| `DialogContent` | Painel centralizado, em portal, com sobreposição e o "X" de fechar |
| `DialogHeader` · `DialogTitle` · `DialogDescription` | Título (nome acessível) e descrição (ligada) |
| `DialogFooter` | Ações. Empilha no celular, à direita no desktop |
| `DialogClose` | Fecha ao acionar (use `asChild`) |
| `DialogOverlay` · `DialogPortal` | Internos; já usados pelo `DialogContent` |

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `open` · `defaultOpen` · `onOpenChange` (Dialog) | — | — | Controle de abertura (Radix) |
| `showCloseButton` (DialogContent) | `boolean` | `true` | Mostra o "X" no canto |
| `showCloseButton` (DialogFooter) | `boolean` | `false` | Acrescenta um botão `outline` de fechar |
| `onEscapeKeyDown` · `onPointerDownOutside` (Content) | evento | — | Impedir fechar por Esc ou clique fora |

## Variantes

Nenhuma. Largura máxima `sm:max-w-lg` (512 px); ajuste por `className`.

## Tamanhos

Um só. No celular ocupa a largura menos 32 px de margem.

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | Nada renderizado |
| Aberto | Sobreposição + painel `bg-popover` com `shadow-lg`; entra com fade + zoom 95% |

## Conteúdo

- Título como ação ou pergunta: "Editar perfil".
- A descrição diz o que acontece ao confirmar.
- O botão principal repete o verbo do título: "Salvar perfil", não "OK".

## Acessibilidade

- **Teclado:** Tab e Shift+Tab ficam presos na janela. Esc fecha.
- **Leitor de tela:** papel `dialog` modal; `DialogTitle` vira o nome e `DialogDescription` a descrição. O resto da página fica inacessível enquanto aberto. **Título é obrigatório** — sem ele, a Radix avisa no console.
- **Foco:** ao abrir, vai para o primeiro elemento focável. Ao fechar, volta para o gatilho.
- **Cuidados:** ⚠️ o "X" anuncia "Close" e o botão do `DialogFooter` diz "Close" — em inglês. Até corrigir, passe `showCloseButton={false}` no footer e use um `DialogClose` com texto em português.

## Tokens usados

`bg-accent` `bg-popover` `duration-motion-base` `ring-offset-background`
`ring-ring` `rounded-lg` `shadow-lg` `text-muted-foreground`
`text-popover-foreground`

## Faça

- Feche com Esc, com o "X" e com "Cancelar".
- Ação principal à direita no `DialogFooter`.
- Abra só quando a pessoa pedir.

## NÃO faça

- Dialog sobre dialog → feche o primeiro, ou use um passo dentro do mesmo.
- Mensagem que poderia sumir sozinha → `sonner`.
- Formulário longo → página própria ou `sheet`.

## Exemplo mínimo

```tsx
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Editar perfil</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>As mudanças aparecem para toda a equipe.</DialogDescription>
    </DialogHeader>
    {/* campos */}
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
      <Button>Salvar perfil</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
