---
slug: form
nome: Form
camada: organism
codigo: src/components/ui/form.tsx
story: src/components/ui/form.stories.tsx
status: piloto
sinonimos: [formulario, formulário]
vizinhos: [field, input-group, card]
referencias: [shadcn:form]
---

# Form

Estrutura e gerencia formulários com validação integrada ao React Hook Form. Conecta campos, rótulos, mensagens de erro e atributos acessíveis automaticamente.

## Quando usar

- Formulários com validação de esquema (como Zod) e múltiplos campos interativos.
- Telas de cadastro, configuração ou edição de dados que precisam de feedback de erro por campo.
- Composição de controles complexos que necessitam de sincronização de estado e acessibilidade automática.

## Quando NÃO usar

- Agrupar apenas um campo isolado sem validação complexa ou contexto global → `field`.
- Formulário simples de busca com apenas um campo de texto e botão → `input-group`.
- Janelas de confirmação rápida que não coletam múltiplos dados → `alert-dialog`.

## Anatomia

| Parte | O que é |
|---|---|
| `Form` | Provedor de contexto raiz do React Hook Form |
| `FormField` | Controlador de campo que conecta o controle ao estado do formulário |
| `FormItem` | Container que gera identificadores únicos e agrupa os elementos do campo |
| `FormLabel` | Rótulo acessível que indica visualmente o estado de erro |
| `FormControl` | Elemento que injeta atributos ARIA e associa IDs ao controle |
| `FormDescription` | Texto de apoio e instrução auxiliar para o preenchimento |
| `FormMessage` | Exibe a mensagem de validação quando o campo apresenta erro |

## Composição

Usa: [`label`](label.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `name` (FormField) | `string` | — | Nome do campo no formulário e caminho no esquema de validação |
| `control` (FormField) | `Control` | — | Instância de controle retornada por `useForm` |
| `render` (FormField) | `function` | — | Função de renderização que recebe o objeto `field` |

## Variantes

Sem variantes no componente raiz. O layout e o estilo dependem dos componentes de controle agrupados.

## Tamanhos

Sem variação de tamanho. O dimensionamento é definido pelos controles e campos internos.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Campo limpo ou preenchido sem erros, rótulo neutro e descrição com `text-muted-foreground` |
| Inválido | `data-error=true` no FormLabel com `text-destructive`, `aria-invalid=true` no controle e FormMessage visível em `text-destructive` |
| Foco | O anel de foco visível é delegado ao controle interno agrupado no FormControl |

## Conteúdo

- Rótulos devem ser concisos e claros, utilizando substantivos ou pequenas frases sem ponto final.
- Textos de ajuda em FormDescription orientam sobre formatos específicos ou regras de preenchimento.
- Mensagens de erro em FormMessage devem explicar como corrigir a falha de validação de forma direta.

## Acessibilidade

- **Teclado:** Não recebe foco direto na estrutura do formulário; a navegação por Tab segue a ordem sequencial dos campos internos via FormControl.
- **Leitor de tela:** FormControl vincula o controle a FormDescription e FormMessage via `aria-describedby` e marca `aria-invalid="true"` quando houver erro; FormLabel associa-se ao campo via `htmlFor`.
- **Foco:** O foco permanece no controle sob edição; ao submeter com erro, a biblioteca gerencia o redirecionamento para o primeiro campo inválido.
- **Cuidados:** Evite ocultar FormDescription ou FormMessage apenas visualmente; mantenha os IDs estáveis garantidos por FormItem para assegurar compatibilidade com tecnologias assistivas.

## Tokens usados

- **Cor:** `text-destructive` `text-muted-foreground`
- **Tipografia:** `text-sm`
- **Espaço:** `gap-2`

## Faça

- Associe cada controle a um FormField com nome único correspondente ao esquema de validação.
- Forneça instruções em FormDescription para campos com requisitos específicos de formatação.
- Coloque FormMessage logo abaixo de FormControl para manter proximidade entre o erro e o campo.

## NÃO faça

- Usar placeholder como substituto de FormLabel → utilize sempre `FormLabel` visível para manter a acessibilidade.
- Agrupar campo único sem validação no formulário completo → `field`.
- Omitir FormMessage em campos obrigatórios → inclua `FormMessage` para exibir o motivo do erro.

## Exemplo mínimo

```tsx
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function Exemplo() {
  const form = useForm({
    defaultValues: {
      nome: "",
    },
  })

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Seu nome completo" {...field} />
            </FormControl>
            <FormDescription>Nome visível no perfil da conta.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
```
