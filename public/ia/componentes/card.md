---
slug: card
nome: Card
camada: molecule
codigo: src/components/ui/card.tsx
story: src/components/ui/card.stories.tsx
status: piloto
sinonimos: [cartao, cartão, painel]
vizinhos: [box, item, list]
referencias: [passi:card, shadcn:card]
---

# Card

Agrupa informações e ações sobre o mesmo assunto em uma superfície delimitada. Funciona como unidade visual para organizar painéis, resumos e blocos de conteúdo.

## Quando usar

- Agrupar informações relacionadas a uma entidade única: perfil de usuário, resumo de pedido ou produto.
- Exibir métricas e indicadores em painéis de controle e dashboards com título e valor em evidência.
- Estruturar formulários ou seções configuráveis com cabeçalho, corpo e rodapé de ações.

## Quando NÃO usar

- Lista de itens repetidos sem container destacado → `item`
- Bloco estrutural genérico sem borda ou elevação de cartão → `box`
- Ação única direta sem corpo de conteúdo → `button`

## Anatomia

| Parte | O que é |
|---|---|
| `Card` | Elemento raiz com borda, cantos arredondados, fundo de cartão e sombra leve |
| `CardHeader` | Cabeçalho em grid que organiza título, descrição e ações de topo |
| `CardTitle` | Título do cartão com tipografia em destaque; use `asChild` para nível semântico real |
| `CardDescription` | Texto de apoio em cor atenuada abaixo do título |
| `CardAction` | Ação opcional posicionada no canto superior direito do cabeçalho |
| `CardContent` | Corpo principal para acomodar o conteúdo livre do cartão |
| `CardFooter` | Rodapé flexível para ações finais ou metadados complementares |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `asChild` (CardTitle) | `boolean` | `false` | Renderiza o elemento filho via Radix Slot, permitindo usar tags semânticas como `h2` ou `h3` |

## Variantes

Nenhuma variante no código. O estilo padrão usa borda suave, fundo neutro e sombra leve.

## Tamanhos

Sem variação de tamanho. As dimensões acompanham o container e o espaçamento interno é fixado por tokens.

## Estados

Só leitura: não recebe foco. Elementos interativos internos mantêm seus próprios estados de foco e hover.

## Conteúdo

- Título curto e objetivo com até duas linhas, sem ponto final: "Resumo financeiro".
- Descrição com uma ou duas frases explicando o contexto: "Valores consolidados até o último dia útil.".
- Ação no rodapé ou no topo com verbo no infinitivo indicando o destino: "Ver detalhes".

## Acessibilidade

- **Teclado:** Não recebe foco diretamente. O foco navega naturalmente por Tab entre os controles internos.
- **Leitor de tela:** Use `asChild` em CardTitle para indicar o nível de heading (`h2` ou `h3`) adequado à página.
- **Foco:** Nenhum no elemento raiz. Botões e links internos recebem seu anel de foco individual.
- **Cuidados:** Não transforme o cartão inteiro em um único link longo com múltiplos blocos de texto; torne apenas o título ou uma ação específica clicável para manter o nome acessível compreensível (WCAG 1.3.1 e 2.4.6).

## Tokens usados

- **Cor:** `bg-card` `text-card-foreground` `text-muted-foreground`
- **Tipografia:** `font-heading` `font-semibold` `leading-none`
  `text-sm`
- **Espaço:** `gap-2` `gap-6` `pb-6` `pt-6` `px-6` `py-6`
- **Raio:** `rounded-xl`
- **Sombra:** `shadow-sm`

## Faça

- Use `asChild` em `CardTitle` para escolher a tag de cabeçalho (`h2`, `h3`) coerente com a estrutura da página.
- Mantenha uma ação principal clara por cartão, posicionada no rodapé ou no topo.
- Preserve alturas alinhadas entre cartões vizinhos dispostos na mesma linha de uma grade.

## NÃO faça

- Envolver o cartão inteiro em uma tag de link → torne clicável apenas o título via `asChild` ou adicione um `button`
- Cartões aninhados dentro de outros cartões sem hierarquia → use seções simples com `separator`
- Inserir textos longos e exaustivos no corpo do cartão → mostre um resumo curto e leve os detalhes para `sheet`

## Exemplo mínimo

```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle asChild>
      <h2>Assinatura Pro</h2>
    </CardTitle>
    <CardDescription>Plano anual com renovação automática.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="sm">Editar</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-sm">Acesso a todos os componentes e suporte prioritário.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Gerenciar plano</Button>
  </CardFooter>
</Card>
```
