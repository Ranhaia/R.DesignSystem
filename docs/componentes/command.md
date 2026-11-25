---
slug: command
nome: Command
camada: organism
codigo: src/components/ui/command.tsx
story: src/components/ui/command.stories.tsx
status: piloto
sinonimos: [paleta-de-comandos, command-palette, cmdk, busca-rapida]
vizinhos: [combobox, dialog, dropdown-menu]
referencias: [shadcn:command]
---

# Command

Menu de comandos e busca rápida para filtrar ações e recursos pelo teclado. Funciona inline na página ou dentro de uma janela modal para paleta de comandos.

## Quando usar

- Paleta de comandos global para executar ações frequentes e navegar rápido pela aplicação.
- Busca com filtro instantâneo por recursos, configurações ou atalhos em interfaces densas.
- Menu de ações rápidas acionado pelo teclado para pessoas com uso intensivo do sistema.

## Quando NÃO usar

- Navegação principal do sistema ou estrutura hierárquica de páginas → `sidebar`.
- Seleção de uma opção única para preenchimento de campo em formulário comum → `combobox`.
- Menu curto de ações locais associado a um botão específico na interface → `dropdown-menu`.

## Anatomia

| Parte | O que é |
|---|---|
| `Command` | Raiz (cmdk), contêiner principal com lista filtrável por texto |
| `CommandDialog` | Variante em janela modal sobreposta (Dialog), ativada por atalho ou gatilho |
| `CommandInput` | Campo de busca por texto com ícone de lupa e foco gerenciado |
| `CommandList` | Lista com rolagem vertical que abriga grupos, itens e estado vazio |
| `CommandEmpty` | Mensagem informativa exibida quando nenhum comando corresponde à busca |
| `CommandGroup` | Agrupador temático de comandos com cabeçalho de seção |
| `CommandSeparator` | Divisor visual entre grupos de comandos |
| `CommandItem` | Item interativo de ação ou navegação, selecionável por teclado ou clique |
| `CommandShortcut` | Rótulo de atalho de teclado alinhado à direita do item |

## Composição

Usa: [`dialog`](dialog.md) · [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` · `onValueChange` (Command) | `string` | — | Valor controlado do item selecionado na lista |
| `title` (CommandDialog) | `string` | `Paleta de comandos` | Título acessível da janela modal para leitor de tela (sr-only) |
| `description` (CommandDialog) | `string` | `Busque um comando para executar.` | Descrição acessível da janela modal para leitor de tela (sr-only) |
| `className` (CommandDialog) | `string` | — | Classes adicionais aplicadas ao contêiner DialogContent |
| `showCloseButton` (CommandDialog) | `boolean` | `true` | Exibe o botão de fechar no canto superior da janela modal |
| `shouldFilter` (CommandDialog) | `boolean` | — | Desativa a filtragem interna do cmdk para usar busca e ordenação customizadas |

## Variantes

Não possui variantes visuais no código; use `Command` para exibição inline na página ou `CommandDialog` para janela modal sobreposta.

## Tamanhos

Tamanho único. A lista rolável tem altura máxima de 300 px (`max-h-75`), adaptando-se à largura do contêiner ou do Dialog.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Fundo em `bg-popover` com texto `text-popover-foreground` |
| Item selecionado | Fundo em `bg-accent` com texto `text-accent-foreground` via `data-[selected=true]` |
| Desabilitado | Opacidade reduzida com `data-[disabled=true]:opacity-50` e sem eventos de ponteiro |
| Vazio | Mensagem de `CommandEmpty` centralizada com `py-6 text-sm` |
| Foco no campo | Borda e anel de 3 px em `border-ring ring-ring` no contêiner do input |

## Conteúdo

- O texto de orientação no campo de busca deve ser direto: "Digite um comando ou busque...".
- Itens de ação devem começar com verbo no infinitivo ou substantivo claro: "Novo arquivo", "Configurações".
- A mensagem de busca vazia deve informar com clareza: "Nenhum resultado encontrado.".
- Atalhos de teclado devem seguir a convenção da plataforma: "⌘K" ou "Ctrl+K".

## Acessibilidade

- **Teclado:** Setas Cima e Baixo navegam entre os itens da lista. Enter executa a ação do item selecionado. Esc fecha o `CommandDialog` e devolve o foco ao elemento acionador. Digitação no `CommandInput` filtra os itens em tempo real.
- **Leitor de tela:** Papel `combobox` no input gerenciando a lista de resultados com `aria-expanded` e `aria-controls`. `CommandDialog` possui `DialogTitle` e `DialogDescription` ocultos visualmente (`sr-only`) para identificação acessível.
- **Foco:** Ao abrir o `CommandDialog`, o foco vai automaticamente para o campo de busca (`CommandInput`). Ao fechar, o foco retorna ao botão ou elemento que abriu a paleta.
- **Cuidados:** `CommandDialog` se chama "Paleta de comandos" e se descreve como "Busque um comando para executar." para o leitor de tela. Passe `title` e `description` quando a paleta tiver um propósito mais específico ("Ir para uma página").

## Tokens usados

- **Cor:** `bg-accent` `bg-border` `bg-popover` `border-ring`
  `text-accent-foreground` `text-foreground` `text-muted-foreground`
  `text-popover-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs` `tracking-widest`
- **Espaço:** `gap-2` `h-10` `h-12` `h-5` `h-9` `h-px` `max-h-75` `mx-1`
  `p-0` `p-1` `pt-0` `px-2` `px-3` `py-1.5` `py-3` `py-6` `size-4` `w-5`
- **Raio:** `rounded-md` `rounded-sm`
- **Foco:** `ring-ring`

## Faça

- Forneça atalho global de teclado para abrir o `CommandDialog` de qualquer ponto da tela.
- Agrupe comandos afins com `CommandGroup` e nomeie cada grupo com um cabeçalho objetivo.
- Inclua sempre uma mensagem útil em `CommandEmpty` orientando o que fazer quando nada for encontrado.

## NÃO faça

- Substituir a navegação principal da aplicação por uma paleta de comandos → `sidebar`.
- Deixar o título padrão numa paleta com propósito específico → passe `title` e `description` que digam o que ela faz.
- Lista longa sem divisão por grupos ou atalhos visíveis → divida comandos com `CommandGroup` e indique `CommandShortcut`.

## Exemplo mínimo

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Digite um comando ou busque..." />
  <CommandList>
    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
    <CommandGroup heading="Ações">
      <CommandItem>Novo arquivo</CommandItem>
      <CommandItem>Abrir projeto</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```
