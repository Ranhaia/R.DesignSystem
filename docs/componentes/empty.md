---
slug: empty
nome: Empty
camada: molecule
codigo: src/components/ui/empty.tsx
story: src/components/ui/empty.stories.tsx
status: piloto
sinonimos: [vazio, tela-vazia, estado-vazio, empty-state]
vizinhos: [skeleton, spinner, alert]
referencias: [passi:microtexto, shadcn:empty]
---

# Empty

Comunica um estado vazio em listas, tabelas ou telas sem dados. Orienta a pessoa sobre o que deveria estar ali e oferece o próximo passo.

## Quando usar

- Primeiro uso de uma funcionalidade antes de qualquer item ser criado ("Nenhum projeto ainda. Crie o primeiro.").
- Busca ou filtro que não retornou nenhum resultado compatível com os critérios pesquisados.
- Seções limpas após conclusão de tarefas pendentes (caixa de entrada ou lista de pendências zerada).

## Quando NÃO usar

- O conteúdo ainda está sendo carregado da rede → `skeleton`
- Ocorreu um erro no sistema ou falha na requisição → `alert`
- Espera sem formato conhecido durante processamento → `spinner`

## Anatomia

| Parte | O que é |
|---|---|
| `Empty` | Container raiz centralizado com borda tracejada e cantos arredondados |
| `EmptyHeader` | Cabeçalho que agrupa mídia visual, título e texto de apoio |
| `EmptyMedia` | Container de ícone ou ilustração nas variantes default ou icon |
| `EmptyTitle` | Título principal do estado vazio; use `asChild` para cabeçalho semântico |
| `EmptyDescription` | Descrição explicativa sobre o motivo da ausência de dados |
| `EmptyContent` | Área inferior reservada para botões de ação ou links de recuperação |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` (EmptyMedia) | `default` · `icon` | `default` | Define se o ícone é exibido sem fundo (`default`) ou em container delimitado (`icon`) |
| `asChild` (EmptyTitle) | `boolean` | `false` | Renderiza no elemento filho via Radix Slot, permitindo usar tag semântica (`h2`, `h3`) |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Ícone ou mídia sem fundo destacado, mantendo aparência sutil |
| `icon` | Ícone dentro de container delimitado com fundo neutro atenuado |

## Tamanhos

Sem variação de tamanho. O container adapta o preenchimento interno conforme o ponto de quebra (`p-6` a `md:p-12`).

## Estados

Só leitura: não recebe foco. Elementos interativos inseridos em `EmptyContent` (como botões de ação) possuem seus próprios estados.

## Conteúdo

- Título positivo e objetivo explicando a situação: "Nenhum documento encontrado".
- Descrição orientando o que fazer em seguida: "Tente ajustar os filtros de busca ou crie um novo arquivo.".
- O botão de ação deve conter verbo direto: "Limpar filtros" ou "Criar documento".

## Acessibilidade

- **Teclado:** O container não recebe foco. A navegação por Tab atinge diretamente os botões ou links contidos em `EmptyContent`.
- **Leitor de tela:** Use `asChild` em `EmptyTitle` para atribuir heading semântico (`h2`, `h3`) correspondente à seção da página.
- **Foco:** Nenhum no container raiz. O foco segue a ordem natural do DOM até as ações de recuperação.
- **Cuidados:** Nunca mostre apenas um ícone sem título e descrição em texto visível; leitor de tela precisa entender o motivo do estado vazio (WCAG 1.3.1 e 4.1.2).

## Tokens usados

- **Cor:** `bg-muted` `text-foreground` `text-muted-foreground`
  `text-primary`
- **Tipografia:** `font-medium` `text-lg` `text-sm` `tracking-tight`
- **Espaço:** `gap-2` `gap-4` `gap-6` `max-w-sm` `mb-2` `min-w-0` `p-12`
  `p-6` `size-10` `size-6`
- **Raio:** `rounded-lg`

## Faça

- Ofereça sempre uma ação clara ou rota de saída em `EmptyContent` para evitar que o usuário fique sem alternativa.
- Use `asChild` em `EmptyTitle` para definir o nível semântico do cabeçalho.
- Adapte o texto entre busca sem retorno e primeiro uso (onboarding).

## NÃO faça

- Deixar a área em branco sem orientação ou mensagem explicativa → declare `empty` com título e botão de ação
- Usar estado vazio para indicar erro de conexão ou falha crítica → apresente um `alert`
- Exibir estado vazio enquanto os dados ainda estão carregando → mantenha um `skeleton`

## Exemplo mínimo

```tsx
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon name="search_off" />
    </EmptyMedia>
    <EmptyTitle asChild>
      <h2>Nenhum resultado encontrado</h2>
    </EmptyTitle>
    <EmptyDescription>
      Revise os termos digitados ou remova os filtros aplicados.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">
      Limpar filtros
    </Button>
  </EmptyContent>
</Empty>
```
