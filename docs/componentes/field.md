---
slug: field
nome: Field
camada: molecule
codigo: src/components/ui/field.tsx
story: src/components/ui/field.stories.tsx
status: piloto
sinonimos: [campo-de-formulario, form-field, grupo-de-campo]
vizinhos: [form, input, label]
referencias: [passi:campo-de-texto, shadcn:field]
---

# Field

Estrutura controles de formulário combinando rótulo, descrição, erros e agrupamentos acessíveis. Garante a conexão semântica correta entre as partes do campo.

## Quando usar

- Estruturar qualquer entrada de formulário (`input`, `select`, `textarea`, `switch`) associando rótulo, ajuda e erro.
- Criar grupos lógicos de campos relacionados com `FieldSet`, `FieldLegend` e `FieldGroup`.
- Montar cartões de seleção interativos (choice cards) para conjuntos de `checkbox` ou `radio-group`.

## Quando NÃO usar

- Rótulo de texto simples e isolado sem controle associado → `label`
- Apenas o elemento de digitação de texto puro sem estrutura de apoio → `input`
- Gerenciamento completo de submissão, estado e validação de schema → `form`

## Anatomia

| Parte | O que é |
|---|---|
| `FieldSet` | Elemento semântico `<fieldset>` que agrupa campos correlatos |
| `FieldLegend` | Legenda acessível `<legend>` do agrupamento com variantes legend ou label |
| `FieldGroup` | Container com container query para espaçamento vertical entre campos |
| `Field` | Container raiz de um campo com `role="group"` e controle de orientação |
| `FieldContent` | Envoltório flexível para o controle de entrada e sua descrição |
| `FieldLabel` | Rótulo do campo construído sobre o atom `Label`, com suporte a estado desabilitado |
| `FieldTitle` | Título estrutural em destaque para layouts horizontais ou cartões de escolha |
| `FieldDescription` | Texto de apoio e ajuda com cor suave exibido abaixo do controle |
| `FieldSeparator` | Divisor horizontal com suporte a texto centralizado (ex.: "ou") |
| `FieldError` | Mensagem de erro acessível com `role="alert"` e cor de destruição |

## Composição

Usa: [`label`](label.md) · [`separator`](separator.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` (FieldLegend) | `legend` · `label` | `legend` | Estilo tipográfico da legenda: texto de seção (`legend`) ou tamanho de rótulo (`label`) |
| `orientation` | `vertical` · `horizontal` · `responsive` | `vertical` | Direção do layout: vertical, horizontal alinhado ou responsivo por container query |
| `children` (FieldSeparator) | `React.ReactNode` | — | Conteúdo textual opcional exibido no centro do divisor (ex.: "ou") |
| `errors` (FieldError) | `Array<{ message?: string } | undefined>` | — | Lista de erros do formulário (compatível com react-hook-form); agrupa mensagens duplicadas |

## Variantes

Sem variantes no componente raiz. As orientações de layout (`vertical`, `horizontal`, `responsive`) organizam rótulo, controle e descrições conforme o contexto.

## Tamanhos

Sem variação de tamanho. O espaçamento é orquestrado pelas classes de layout de cada parte.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Disposição neutra com rótulo em `text-foreground` e descrição em `text-muted-foreground` |
| Inválido | `data-invalid=true` no Field aplica cor `text-destructive` aos textos e exibe `FieldError` |
| Desabilitado | `group-data-[disabled=true]/field` reduz a opacidade do rótulo e controles para 50% |
| Selecionado | Em cartões de escolha, ganha borda destacada e preenchimento sutil em `bg-primary/5` |

## Conteúdo

- Rótulo substantivo claro, direto e sem dois-pontos: "Nome completo".
- Texto de ajuda orientando formato ou restrição antes do preenchimento: "Digite seu e-mail corporativo.".
- Mensagem de erro indicando o que ocorreu e como corrigir: "Informe um e-mail válido.".

## Acessibilidade

- **Teclado:** O container não retém foco; a tecla Tab navega linearmente entre os controles interativos internos.
- **Leitor de tela:** `Field` declara `role="group"`; `FieldError` expõe `role="alert"` para anúncio imediato de erros; associe `id` e `htmlFor` entre `FieldLabel` e o controle.
- **Foco:** Segue o fluxo natural para o controle interno (`Input`, `Select`, `Checkbox`); em formulários com erro, posicione o foco no primeiro campo inválido.
- **Cuidados:** Conecte sempre `FieldDescription` e `FieldError` ao controle via `aria-describedby`, e marque `aria-invalid="true"` no controle quando houver erro (WCAG 1.3.1, 3.3.1 e 3.3.2).

## Tokens usados

- **Cor:** `bg-background` `bg-primary` `border-primary`
  `text-destructive` `text-muted-foreground` `text-primary`
- **Tipografia:** `font-medium` `font-normal` `leading-normal`
  `leading-snug` `text-base` `text-sm`
- **Espaço:** `gap-1` `gap-1.5` `gap-2` `gap-3` `gap-4` `gap-6` `gap-7`
  `h-5` `inset-0` `mb-2` `mb-3` `ml-4` `mt-0` `mt-1` `mt-1.5` `mt-px`
  `my-2` `p-4` `px-2` `top-1`
- **Raio:** `rounded-md`

## Faça

- Associe o `htmlFor` do `FieldLabel` ao `id` do controle para garantir foco e nome acessível.
- Conecte `aria-describedby` do controle aos identificadores de `FieldDescription` e `FieldError`.
- Utilize `orientation="responsive"` em formulários que precisam alternar entre empilhado e horizontal conforme largura.

## NÃO faça

- Usar placeholder como substituto do `FieldLabel` → mantenha o `FieldLabel` sempre visível
- Exibir mensagem de erro genérica sem instrução de correção → escreva instruções claras em `FieldError`
- Utilizar apenas a cor vermelha para indicar campo inválido → adicione mensagem em `FieldError` e ícone no controle

## Exemplo mínimo

```tsx
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field>
  <FieldLabel htmlFor="email">E-mail</FieldLabel>
  <Input id="email" type="email" placeholder="nome@empresa.com.br" />
  <FieldDescription>Utilize seu endereço institucional.</FieldDescription>
  <FieldError>Insira um e-mail válido.</FieldError>
</Field>
```
