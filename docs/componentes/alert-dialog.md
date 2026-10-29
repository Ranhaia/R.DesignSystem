---
slug: alert-dialog
nome: Alert Dialog
camada: organism
codigo: src/components/ui/alert-dialog.tsx
story: src/components/ui/alert-dialog.stories.tsx
status: piloto
sinonimos: [confirmacao, confirmação, janela-de-confirmacao, confirm, dialogo-de-alerta]
vizinhos: [dialog, sonner]
referencias: [passi:janela-modal, shadcn:alert-dialog]
---

# Alert Dialog

Interrompe o fluxo da tela com um aviso crítico e exige resposta explícita antes de continuar. Diferente do diálogo comum, não fecha ao clicar fora.

## Quando usar

- Confirmar ações destrutivas ou irreversíveis, como excluir uma conta ou descartar alterações não salvas.
- Decisões críticas de sistema que impedem a continuidade do fluxo sem uma escolha explícita da pessoa.

## Quando NÃO usar

- Tarefas curtas ou formulários que não envolvem risco crítico → `dialog`.
- Confirmações simples ou notificações que podem sumir sozinhas sem resposta → `sonner`.
- Mensagens contextuais fixas na página sem bloqueio modal → `alert`.

## Anatomia

| Parte | O que é |
|---|---|
| `AlertDialog` | Raiz (Radix). Controla o estado de abertura |
| `AlertDialogTrigger` | Elemento que abre o diálogo |
| `AlertDialogPortal` | Portal para renderizar o diálogo no fim do DOM |
| `AlertDialogOverlay` | Fundo escurecido que bloqueia cliques na página |
| `AlertDialogContent` | Painel centralizado do alerta; aceita `size` (`default` ou `sm`) |
| `AlertDialogHeader` | Cabeçalho que organiza título, descrição e mídia visual |
| `AlertDialogFooter` | Rodapé com as ações de cancelamento e confirmação |
| `AlertDialogTitle` | Título do alerta (nome acessível obrigatório) |
| `AlertDialogDescription` | Texto explicativo com a consequência da ação |
| `AlertDialogMedia` | Container opcional para ícone de destaque acima do título |
| `AlertDialogAction` | Botão de ação principal (baseado em `Button`) que confirma e fecha |
| `AlertDialogCancel` | Botão secundário (baseado em `Button`) que cancela e fecha |

## Composição

Usa: [`button`](button.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `open` · `defaultOpen` · `onOpenChange` (AlertDialog) | `boolean` · `boolean` · `(open: boolean) => void` | — | Controle de abertura herdado do Radix |
| `size` (AlertDialogContent) | `default` · `sm` | `default` | Largura máxima do painel: `default` (até `max-w-lg`) ou `sm` (`max-w-xs`) |
| `variant` (AlertDialogAction) | `ButtonProps["variant"]` | `default` | Estilo visual do botão de confirmação, como `destructive` para exclusões |
| `size` (AlertDialogAction) | `ButtonProps["size"]` | `default` | Tamanho do botão de ação |
| `variant` (AlertDialogCancel) | `ButtonProps["variant"]` | `outline` | Estilo visual do botão de cancelamento |
| `size` (AlertDialogCancel) | `ButtonProps["size"]` | `default` | Tamanho do botão de cancelamento |

## Variantes

Nenhuma no componente raiz. Use `variant="destructive"` em `AlertDialogAction` para ações com perda de dados.

## Tamanhos

Dois tamanhos no painel (`AlertDialogContent`): `default` (máximo de 512 px em telas `sm:`) e `sm` (máximo de 320 px).

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | Nada é renderizado na tela |
| Aberto | Fundo escurecido fixo (`bg-black/50`) e painel `bg-popover` com sombra `shadow-lg`, animando entrada com fade e zoom 95% |

## Conteúdo

- Título direto como pergunta ou afirmação curta: "Excluir conta?".
- A descrição detalha a consequência imediata e se a ação pode ser desfeita: "Essa ação é irreversível e removerá todos os dados.".
- O botão de confirmação usa o verbo da ação correspondente: "Excluir conta", nunca "OK" ou "Sim".

## Acessibilidade

- **Teclado:** Tab e Shift+Tab navegam entre os botões de ação e ficam presos na janela. Esc fecha acionando o cancelamento. Clicar fora não fecha a janela.
- **Leitor de tela:** Papel `alertdialog` modal. O `AlertDialogTitle` vira o nome acessível e o `AlertDialogDescription` é associado via `aria-describedby`. O resto da página recebe `aria-hidden="true"`.
- **Foco:** Ao abrir, o foco é transferido para o primeiro elemento focável (em ações destrutivas, posicione no `AlertDialogCancel`). Ao fechar, retorna para o gatilho.
- **Cuidados:** Ações destrutivas não devem receber foco inicial no botão perigoso (WCAG 3.3.4). O título é mandatório para conformidade de nome acessível.

## Tokens usados

- **Cor:** `bg-muted` `bg-popover` `text-muted-foreground`
  `text-popover-foreground`
- **Tipografia:** `font-semibold` `text-lg` `text-sm`
- **Espaço:** `gap-1.5` `gap-2` `gap-4` `gap-x-6` `inset-0` `max-w-lg`
  `max-w-xs` `mb-2` `p-6` `size-16` `size-8`
- **Raio:** `rounded-lg` `rounded-md`
- **Sombra:** `shadow-lg`
- **Movimento:** `duration-motion-base`

## Faça

- Use para decisões críticas que não podem ser desfeitas.
- Posicione o botão de cancelar antes da ação destrutiva para evitar cliques acidentais.
- Deixe claro na descrição o impacto exato da confirmação.

## NÃO faça

- Diálogo de alerta sobre outro alerta → concentre a decisão em uma única janela ou fluxo sequencial.
- Mensagens puramente informativas sem necessidade de decisão → `sonner`.
- Formulários com campos de preenchimento → `dialog`.

## Exemplo mínimo

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Excluir conta</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Excluir conta permanentemente?</AlertDialogTitle>
      <AlertDialogDescription>
        Essa ação não pode ser desfeita. Todos os dados serão apagados.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Excluir conta</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
