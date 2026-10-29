---
slug: box
nome: Box
camada: primitive
codigo: src/components/ui/box.tsx
story: src/components/ui/box.stories.tsx
status: piloto
sinonimos: [container, caixa, bloco]
vizinhos: [card, separator, item]
referencias: [spec:box]
---

# Box

Container flexível e sem estilo próprio para agrupar e organizar elementos no layout. O visual, espaçamento e alinhamento vêm das classes utilitárias do Tailwind.

## Quando usar

- Agrupar e espaçar elementos lado a lado ou em coluna num layout simples.
- Criar containers genéricos com fundo, borda ou espaçamento customizados via classes do Tailwind.
- Renderizar tags HTML semânticas como section ou article com polimorfismo via asChild.

## Quando NÃO usar

- Agrupar informações com superfície, borda e cabeçalho padronizados → card.
- Dividir seções apenas com uma linha fina visual → separator.
- Organizar itens estruturados dentro de uma lista interativa → item.

## Anatomia

| Parte | O que é |
|---|---|
| `Box` | Elemento raiz (div ou o elemento filho via asChild) com data-slot="box" |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `asChild` | `boolean` | `false` | Renderiza as propriedades no elemento filho via Radix Slot em vez de criar uma div |

## Variantes

Nenhuma. O estilo e a disposição visual vêm de className.

## Tamanhos

Nenhum. A largura e a altura acompanham o conteúdo ou as classes do container.

## Estados

Só leitura: não recebe foco.

## Conteúdo

- Não tem texto próprio.
- O texto e a hierarquia tipográfica são definidos pelos elementos filhos ou pelo componente text.

## Acessibilidade

- **Teclado:** Não recebe foco diretamente.
- **Leitor de tela:** É um container neutro sem papel semântico padrão (div). Quando usado como marco estrutural, combine asChild com uma tag semântica ou adicione role e aria-label.
- **Foco:** Não retém nem altera o fluxo de foco. O foco passa normalmente para os elementos filhos focáveis.
- **Cuidados:** Não substitua marcos semânticos da página (main, nav, aside) por simples div sem a devida identificação estrutural (WCAG 1.3.1).

## Tokens usados

Nenhum.

## Faça

- Use utilitários do Tailwind para controlar padding, gap e alinhamento do container.
- Use asChild quando precisar que o container seja uma tag semântica como section ou header.
- Combine com tokens de cor e borda para manter a consistência do sistema.

## NÃO faça

- Usar Box quando um container semântico com padrão visual próprio já existe → card.
- Criar divisões estruturais usando estilos arbitrários em vez de tokens do sistema → use classes utilitárias baseadas em tokens.
- Deixar de fornecer rotulagem acessível ao transformar Box em um marco de navegação → forneça aria-label ou aria-labelledby.

## Exemplo mínimo

```tsx
import { Box } from "@/components/ui/box"

<Box className="flex items-center justify-between gap-4 rounded-md border p-4">
  <span>Status do sistema</span>
  <span className="text-sm text-muted-foreground">Operacional</span>
</Box>
```
