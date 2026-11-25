---
slug: pagination
nome: Pagination
camada: molecule
codigo: src/components/ui/pagination.tsx
story: src/components/ui/pagination.stories.tsx
status: piloto
sinonimos: [paginacao, paginação]
vizinhos: [carousel, tabs, list]
referencias: [passi:paginacao, shadcn:pagination]
---

# Pagination

Divide listas e conjuntos volumosos de dados em páginas sequenciais numeradas. Facilita o salto direto entre blocos de conteúdo e o controle de avanço e retrocesso.

## Quando usar

- Tabelas de dados e catálogos com dezenas ou centenas de registros distribuídos em blocos.
- Resultados de busca onde a posição relativa e o volume total auxiliam na navegação.
- Páginas de listagem longa onde carregar todos os itens de uma vez degradaria a performance.

## Quando NÃO usar

- Galeria ou apresentação sequencial com menos de 5 telas ou imagens → `carousel`.
- Abas para alternar visões ou seções paralelas do mesmo documento → `tabs`.
- Lista curta com menos de 20 itens onde tudo cabe na mesma tela → `list`.

## Anatomia

| Parte | O que é |
|---|---|
| `Pagination` | Elemento nav raiz com papel de navegação e rótulo acessível |
| `PaginationContent` | Lista ul flexível que agrupa os itens e controles de paginação |
| `PaginationItem` | Item individual li da lista de navegação |
| `PaginationLink` | Âncora a estilizada como botão que recebe o número da página e o estado ativo |
| `PaginationPrevious` | Botão com ícone de seta para voltar à página anterior |
| `PaginationNext` | Botão com ícone de seta para avançar à próxima página |
| `PaginationEllipsis` | Indicador visual de intervalo contendo reticências para páginas ocultas |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `isActive` (PaginationLink) | `boolean` | — | Indica se o link corresponde à página exibida atualmente |
| `size` (PaginationLink) | — | `icon` | Escala de dimensão herdada das opções de botão |

## Variantes

Sem variantes no container: os links alternam visualmente entre contorno (variant="outline") quando ativos e estilo fantasma (variant="ghost") quando inativos.

## Tamanhos

Sem variação de tamanho: os botões numéricos utilizam dimensão quadrada de 36 px (size-9) e os links de navegação mantêm altura uniforme com padding horizontal.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Link inativo com fundo transparente hover:bg-accent e texto padrão |
| Ativo | Página atual ganha borda e fundo com aria-current="page" e variante outline |
| Hover | Fundo com superfície suave e contraste elevado |
| Foco | Anel de foco visível em ring preservado no link pelo buttonVariants |
| Desabilitado | Sem suporte nativo a disabled na âncora; remova o link ou omita o href |

## Conteúdo

- Os botões Anterior e Próxima devem conter texto explícito acompanhado do ícone direcional: Anterior, Próxima.
- O indicador de quebra de sequência deve expressar reticências acompanhado de texto auxiliar para leitores de tela: Mais páginas.
- Links numéricos exibem apenas algarismos inteiros sequenciais: 1, 2, 3.

## Acessibilidade

- **Teclado:** O componente é estruturado como nav role="navigation" contendo uma lista ul. A tecla Tab percorre os links sequencialmente.
- **Leitor de tela:** A raiz expõe aria-label="paginação". O link ativo recebe aria-current="page". Os botões Anterior e Próxima possuem aria-label descritivo.
- **Foco:** Cada link focado exibe o anel de foco visível. Após a troca de página, é recomendável reposicionar o foco programático no início da listagem.
- **Cuidados:** No PaginationEllipsis, o atributo aria-hidden na tag span oculta todo o elemento para leitores de tela; garanta que a navegação por páginas extremas permaneça acessível (WCAG 1.3.1).

## Tokens usados

- **Espaço:** `gap-1` `pl-2.5` `pr-2.5` `px-2.5` `size-9`

## Faça

- Mantenha visíveis a primeira página, a última e as páginas adjacentes à página selecionada.
- Marque sempre o link da página atual com a propriedade isActive para fornecer aria-current="page".
- Posicione a paginação de forma consistente abaixo da tabela ou lista de dados.

## NÃO faça

- Renderizar todos os números de páginas em listas muito extensas → use `PaginationEllipsis` para contrair o intervalo.
- Dividir em páginas coleções curtas com menos de 20 registros → mantenha tudo em uma lista única com `list`.
- Utilizar paginação numérica para alternar seções temáticas de um documento → use `tabs`.

## Exemplo mínimo

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```
