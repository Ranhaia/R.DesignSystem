---
slug: multi-select
nome: MultiSelect
camada: organism
codigo: src/components/ui/multi-select.tsx
story: src/components/ui/multi-select.stories.tsx
status: piloto
sinonimos: [selecao-multipla, seleção-múltipla, multiselect]
vizinhos: [combobox, select, checkbox]
referencias: [spec:multi-select, shadcn:multi-select]
---

# MultiSelect

Campo de seleção múltipla com autocompletar que exibe cada escolha como um chip removível no próprio container.

## Quando usar

- Selecionar múltiplas opções de uma lista pré-definida com visualização e remoção imediata via chips.
- Filtros avançados com busca textual onde cada critério selecionado precisa ser removido de forma independente.
- Formulários com listas longas de opções que demandam filtragem rápida por digitação.

## Quando NÃO usar

- Selecionar apenas uma opção em lista longa com autocompletar → `combobox`.
- Seleção única entre 5 ou mais opções sem necessidade de busca → `select`.
- Poucas opções independentes que cabem visíveis diretamente na tela → `checkbox`.

## Anatomia

| Parte | O que é |
|---|---|
| `MultiSelect` | Campo completo de seleção múltipla com suporte a busca e chips |
| `MultiSelectSkeleton` | Placeholder animado de carregamento enquanto as opções são carregadas |

## Composição

Usa: [`skeleton`](skeleton.md) · [`combobox`](combobox.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `options` | `MultiSelectOption[]` | — | Lista de opções disponíveis com valor e rótulo |
| `value` | `string[]` | — | Valores atualmente selecionados em array controlado |
| `onValueChange` | `function` | — | Disparado ao adicionar ou remover seleções |
| `placeholder` | `string` | `Selecione...` | Texto de apoio exibido quando não há chips selecionados |
| `emptyText` | `string` | `Nenhum resultado encontrado.` | Mensagem apresentada quando a busca não encontra correspondências |
| `disabled` | `boolean` | `false` | Desativa interação com o campo de busca e os chips |
| `aria-label` | `string` | — | Nome acessível para leitores de tela quando não houver rótulo visível |

## Variantes

Sem variantes no componente raiz. Comporta-se de forma consistente com chips compactos e painel suspenso.

## Tamanhos

Um só. O container possui largura mínima de 224 px (`min-w-56`) e altura base ajustável ao empilhar chips; o skeleton tem altura fixa de 36 px (`h-9`).

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Campo com borda neutra exibindo o placeholder ou os chips selecionados |
| Foco | Anel de foco visível ao redor do container enquanto o cursor de busca estiver ativo |
| Aberto | Painel suspenso visível ancorado ao container com lista de itens filtrados |
| Desabilitado | Container opaco com `disabled` desativando cliques, busca e remoção de chips |
| Vazio | Mensagem de `emptyText` exibida no painel quando nenhum item corresponde à busca |

## Conteúdo

- Rótulos das opções devem ser concisos, substantivos e sem ponto final.
- O placeholder orienta a ação esperada quando nenhum valor foi escolhido (ex.: "Selecione as modalidades...").
- Defina mensagens de `emptyText` claras e instrutivas para orientar nova digitação.

## Acessibilidade

- **Teclado:** Digitação filtra opções; setas cima e baixo percorrem a lista; Enter seleciona ou desmarca o item em destaque; Backspace com campo vazio remove o último chip selecionado.
- **Leitor de tela:** Baseado no Combobox do Base UI com suporte a seleção múltipla; chips anunciam seus rótulos com botão de remoção; passe `aria-label` caso não haja rótulo visível.
- **Foco:** O foco permanece no campo de texto de busca; abrir e fechar a lista não perde o controle do cursor de digitação.
- **Cuidados:** Passe sempre `aria-label` ou associe um `<label>` via `id` para garantir que tecnologias assistivas anunciem o propósito do campo de seleção.

## Tokens usados

- **Espaço:** `h-9` `min-w-56` `w-56`
- **Raio:** `rounded-md`

## Faça

- Passe sempre `aria-label` quando utilizar o MultiSelect sem um Label visível associado.
- Mantenha o estado `value` controlado sincronizado com as opções em `onValueChange`.
- Forneça textos informativos em `emptyText` para guiar a pessoa quando a busca não retornar itens.

## NÃO faça

- Usar multi-select para escolher apenas um valor exclusivo → `combobox`.
- Usar multi-select para poucas opções binárias que cabem na tela → `checkbox`.
- Utilizar placeholder como único substituto de rótulo acessível → passe `aria-label` ou use `label`.

## Exemplo mínimo

```tsx
import * as React from "react"
import { MultiSelect } from "@/components/ui/multi-select"

function Exemplo() {
  const [valores, setValores] = React.useState<string[]>(["auto", "vida"])

  const opcoes = [
    { value: "auto", label: "Automóvel" },
    { value: "residencial", label: "Residencial" },
    { value: "vida", label: "Vida" },
  ]

  return (
    <MultiSelect
      options={opcoes}
      value={valores}
      onValueChange={setValores}
      placeholder="Selecione as modalidades..."
      aria-label="Modalidades de seguro"
    />
  )
}
```
