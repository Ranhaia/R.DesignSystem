---
slug: label
nome: Label
camada: primitive
codigo: src/components/ui/label.tsx
story: src/components/ui/label.stories.tsx
status: piloto
sinonimos: [rotulo, rótulo, rotulo-de-campo]
vizinhos: [field, text, tooltip]
referencias: [passi:campo-de-texto, shadcn:label]
---

# Label

Rótulo acessível associado a controles de formulário. Identifica a finalidade do campo e amplia a área de clique para focar ou alternar o controle.

## Quando usar

- Nomear campos de formulário como inputs, textareas, checkboxes e switches.
- Fornecer um rótulo clicável que transfere o foco diretamente para o controle associado.
- Apresentar o título identificador de opções em grupos de escolha.

## Quando NÃO usar

- Compor campo com rótulo, descrição de ajuda e mensagem de erro estruturados → `field`.
- Exibir texto informativo que não está associado a nenhum controle de formulário → `text`.
- Explicar um conceito complexo ou termo técnico em uma dica suspensa → `tooltip`.

## Anatomia

| Parte | O que é |
|---|---|
| `Label` | Elemento raiz com data-slot="label", tipografia text-sm font-medium e tratamento de estado desabilitado |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `htmlFor` | `string` | — | Identificador do elemento de formulário associado a este rótulo |

## Variantes

Nenhuma. O estilo segue o padrão tipográfico com text-sm font-medium.

## Tamanhos

Um só: texto em text-sm com entrelinha leading-none.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Texto em font-medium text-sm, selecionável sem foco próprio |
| Desabilitado | Opacidade reduzida e cursor não permitido quando o controle associado está inativo |

## Conteúdo

- Rótulo curto e direto, sem ponto final e sem dois-pontos: "Nome completo", "E-mail".
- Indique termos opcionais com a palavra "(opcional)" por extenso quando a maioria dos campos for obrigatória.
- Nunca use o texto de exemplo (placeholder) em substituição ao rótulo visível.

## Acessibilidade

- **Teclado:** Não recebe foco pelo Tab. Clicar no rótulo transfere o foco automaticamente para o controle referenciado por htmlFor.
- **Leitor de tela:** Anunciado como nome acessível do controle ao qual está associado via htmlFor ou quando envolve o elemento de entrada.
- **Foco:** Não retém foco próprio. Ao receber clique, encaminha o foco para o controle interativo associado.
- **Cuidados:** Sempre associe o rótulo ao campo correspondente através de htmlFor casando com o id do elemento, garantindo conformidade com a WCAG 1.3.1 e 3.3.2.

## Tokens usados

- **Tipografia:** `font-medium` `leading-none` `text-sm`
- **Espaço:** `gap-2`

## Faça

- Vincule sempre a propriedade htmlFor ao id do controle correspondente.
- Mantenha o rótulo sempre visível acima ou ao lado do campo que identifica.
- Use texto conciso que descreva com clareza o dado solicitado.

## NÃO faça

- Usar texto de placeholder como substituto do rótulo visível → mantenha o Label acima do campo.
- Usar Label para parágrafos explicativos longos ou textos soltos → `text`.
- Agrupar campo, mensagem de ajuda e erro manualmente com Label solto → `field`.

## Exemplo mínimo

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" placeholder="nome@exemplo.com" />
</div>
```
