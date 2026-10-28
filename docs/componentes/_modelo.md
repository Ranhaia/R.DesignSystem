---
slug: exemplo                       # igual ao nome do arquivo em src/components/ui/
nome: Exemplo
camada: atom                        # primitive | atom | molecule | organism — de src/lib/atomic-registry.ts
codigo: src/components/ui/exemplo.tsx
story: src/components/ui/exemplo.stories.tsx
status: piloto                      # piloto até a revisão do Rafael; depois estavel | descontinuado
sinonimos: []                       # igual à chave do slug em docs/sinonimos.json
vizinhos: []                        # slugs que costumam ser confundidos com este (ao menos 1)
referencias: []                     # ex.: passi:abas, shadcn:tabs, spec:tabs (ao menos 1)
---

<!--
Modelo do MD de componente do R.DS. Não copie à mão: `npm run docs:registrar -- <slug>`
cria o MD a partir daqui, põe as seções na ordem e preenche as geradas.
- Seções sempre nesta ordem e com estes nomes. O agente procura pelo título.
- Geradas do .tsx: Anatomia, Composição, Props, Variantes, Tamanhos e Tokens usados.
  À mão, só a coluna de descrição e as linhas que o código não vê.
- Como escrever cada seção: _baliza.md. A trava reprova `[a preencher]` restante.
-->

# Exemplo

[a preencher: 1 ou 2 frases — o que é e o que resolve]

## Quando usar

- [a preencher]

## Quando NÃO usar

- [a preencher: situação → `outro-slug`]

## Anatomia

| Parte | O que é |
|---|---|

## Composição

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| [a preencher: props herdadas que importam, ou apague a linha] | | | |

## Variantes

| Valor | Quando usar |
|---|---|
| [a preencher: sem variante no código, troque a tabela por uma frase] | |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| [a preencher: sem tamanho no código, troque a tabela por uma frase] | | |

## Estados

| Estado | Como aparece |
|---|---|
| [a preencher] | |

## Conteúdo

- [a preencher]

## Acessibilidade

- **Teclado:** [a preencher]
- **Leitor de tela:** [a preencher]
- **Foco:** [a preencher]
- **Cuidados:** [a preencher]

## Tokens usados

## Faça

- [a preencher]

## NÃO faça

- [a preencher: erro → alternativa]

## Exemplo mínimo

```tsx
[a preencher]
```
