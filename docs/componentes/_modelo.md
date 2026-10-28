---
slug: exemplo                       # igual ao nome do arquivo em src/components/ui/
nome: Exemplo
camada: atom                        # atom | molecule | organism — copie de src/lib/atomic-registry.ts
codigo: src/components/ui/exemplo.tsx
story: src/components/ui/exemplo.stories.tsx
status: estavel                     # estavel | piloto | descontinuado
sinonimos: []                       # nomes que alguém pode usar para pedir esta peça
vizinhos: []                        # slugs que costumam ser confundidos com este
referencias: []                     # ex.: passi:abas, shadcn:tabs, nimbus:segmented-control
---

<!--
Modelo do MD de componente do R.DS. Regras:
- Seções sempre nesta ordem e com estes nomes. O agente procura pelo título.
- Até ~4 KB. Passou disso, provavelmente são dois componentes.
- Anatomia, Props, Variantes, Tamanhos e Tokens usados são escritos por
  `npm run docs:registrar -- <slug>`, lendo o .tsx. À mão, só a coluna de
  descrição e as linhas que o código não vê (parte visual, prop herdada do
  Radix). O registro preserva essas; `npm run docs:check` reprova o resto.
- Estados também descrevem o código: nunca algo que o .tsx não faz.
- Todo item de "NÃO faça" e de "Quando NÃO usar" termina com a alternativa.
- Texto adaptado de referência leva a origem em `referencias`.
- Apague este comentário no arquivo real.
-->

# Exemplo

Uma frase: o que é e o que resolve.

## Quando usar

- 

## Quando NÃO usar

- Situação → `outro-slug`.

## Anatomia

| Parte | O que é |
|---|---|
| `Exemplo` | |

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| | | | |

## Variantes

| Valor | Quando usar |
|---|---|
| | |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| | | |

## Estados

Clicável tem cinco: padrão, hover, pressionado, foco, desabilitado.

| Estado | Como aparece |
|---|---|
| | |

## Conteúdo

Regras de texto desta peça. Gerais em `docs/conteudo/` (quando existir).

- 

## Acessibilidade

- **Teclado:** 
- **Leitor de tela:** 
- **Foco:** 
- **Cuidados:** 

## Tokens usados

Classes e variáveis que a peça consome (de `globals.css` / `tokens-cor.css`).

## Faça

- 

## NÃO faça

- Erro → alternativa.

## Exemplo mínimo

```tsx
```
