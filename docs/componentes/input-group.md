---
slug: input-group
nome: Input Group
camada: molecule
codigo: src/components/ui/input-group.tsx
story: src/components/ui/input-group.stories.tsx
status: piloto
sinonimos: [campo-com-icone, campo-com-botao, campo-de-pedido, prompt]
vizinhos: [input, textarea, field]
referencias: [passi:campo-de-pedido, shadcn:input-group]
---

# Input Group

Agrupa um campo de entrada com elementos auxiliares como ícones, botões, atalhos ou textos em uma única borda unificada. Resolve a integração visual de ações diretas no campo, como busca, limpar ou envio.

## Quando usar

- Campo de busca ou filtro com botão de limpar ou ícone de lupa integrado.
- Campo de valor monetário ou unidade com prefixo ou sufixo fixo (ex.: R$, kg).
- Campo de prompt ou mensagem expansível combinando área de texto e botão de ação.

## Quando NÃO usar

- Entrada textual isolada sem complementos visuais na mesma borda → `input`.
- Bloco de texto longo sem botões ou ícones internos acoplados → `textarea`.
- Formulário completo com rótulo, descrição e mensagem de erro externa → `field`.

## Anatomia

| Parte | O que é |
|---|---|
| `InputGroup` | Container flexível que unifica a borda, sombra e estado de foco dos elementos filhos |
| `InputGroupAddon` | Área de encaixe para complementos posicionados no início, fim ou acima e abaixo do controle |
| `InputGroupButton` | Botão interno dimensionado e estilizado para encaixar sem quebrar a borda do grupo |
| `InputGroupText` | Rótulo textual estático ou ícone decorativo posicionado como complemento |
| `InputGroupInput` | Campo de entrada de linha única com bordas e anéis de foco zerados |
| `InputGroupTextarea` | Campo multilinhas sem redimensionamento manual e com fundo transparente |

## Composição

Usa: [`button`](button.md) · [`input`](input.md) · [`textarea`](textarea.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `align` (InputGroupAddon) | `inline-start` · `inline-end` · `block-start` · `block-end` | `inline-start` | Posição do complemento em relação ao controle de entrada |
| `size` (InputGroupButton) | `xs` · `sm` · `icon-xs` · `icon-sm` | `xs` | Altura e proporção do botão integrado |
| `type` (InputGroupButton) | — | `button` | Tipo de acionamento do botão nativo |
| `variant` (InputGroupButton) | — | `ghost` | Estilo visual herdado do botão |

## Variantes

Sem variantes no container: a aparência de borda e sombra segue o padrão de entrada do sistema, e a organização dos complementos é definida pela prop align do InputGroupAddon.

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `xs` | 24 px | Ação textual compacta em campos de altura reduzida |
| `sm` | 32 px | Ação textual padrão acoplada ao campo |
| `icon-xs` | 24 px | Botão de ícone compacto para campos densos |
| `icon-sm` | 32 px | Botão de ícone padrão para ações como limpar ou alternar senha |

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Borda neutra `border-input` com elevação sutil `shadow-xs` |
| Foco | O container ganha anel `ring-[3px] ring-ring` e `border-ring` ao focar o controle interno |
| Inválido | Borda de perigo `border-destructive` e anel suave quando o controle tem `aria-invalid="true"` |
| Desabilitado | Controle interno desabilitado reduz opacidade e bloqueia eventos |

## Conteúdo

- Em complementos com texto estático (`InputGroupText`), use abreviações ou símbolos curtos: R$, kg, @.
- Botões integrados de ícone devem obrigatoriamente possuir `aria-label`: Limpar busca, Ver senha.
- Mantenha textos de atalhos e prefixos concisos para não reduzir a área útil de digitação.

## Acessibilidade

- **Teclado:** O container possui papel semântico `group`. A tecla Tab move o foco ordenadamente entre o controle de entrada e os botões interativos.
- **Leitor de tela:** Como `InputGroupInput` e `InputGroupTextarea` não renderizam rótulo visível próprio, forneça `aria-label` no controle ou envolva em `field`.
- **Foco:** O anel de foco visível é aplicado ao container raiz quando qualquer controle interno recebe foco (`focus-visible`).
- **Cuidados:** Ao usar botões só de ícone no addon, passe `aria-label` explícito (WCAG 4.1.2) e garanta que addons puramente informativos tenham clique direcionado ao campo de texto.

## Tokens usados

- **Cor:** `border-destructive` `border-input` `border-ring`
  `text-muted-foreground`
- **Tipografia:** `font-medium` `text-sm`
- **Espaço:** `gap-1` `gap-1.5` `gap-2` `h-6` `h-8` `h-9` `min-w-0`
  `p-0` `pb-2.5` `pb-3` `pl-2` `pl-3` `pr-2` `pr-3` `pt-2.5` `pt-3`
  `px-2` `px-2.5` `px-3` `py-1.5` `py-3` `size-3.5` `size-4` `size-6`
  `size-8`
- **Raio:** `rounded-inner` `rounded-md` `rounded-outer-md`
- **Sombra:** `shadow-xs`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Forneça `aria-label` acessível no controle de entrada ou conecte a um `label` externo.
- Utilize `InputGroupAddon` com alinhamento `inline-end` para ações contextuais como limpar busca ou copiar código.
- Mantenha complementos textuais curtos para preservar a visibilidade do texto digitado.

## NÃO faça

- Campo isolado sem elementos visuais ou botões anexos → `input`.
- Múltiplos botões densos ocupando toda a largura do grupo → `button-group` externo.
- Botão de ícone integrado sem nome acessível → passe `aria-label` no botão.

## Exemplo mínimo

```tsx
import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

<InputGroup>
  <InputGroupInput placeholder="Buscar conteúdo..." aria-label="Buscar" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" aria-label="Executar busca">
      <Icon name="search" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```
