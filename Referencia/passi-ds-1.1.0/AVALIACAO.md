---
referencia: PASSI DS
versao: 1.1.0
licenca: CC BY 4.0 (uso comercial liberado, exige crédito)
credito: "Baseado no PASSI DS, de João Passini (joaopassini.com.br). Licença CC BY 4.0."
pacote: passi-ds-1.1.0/   # pasta original, intocada; não editar
avaliado-em: 2026-10-27
---

# PASSI DS 1.1.0 — avaliação para o R.DS

> Referência, não dependência. Nada daqui é importado em `src/`.
> O que presta é **reescrito** no vocabulário do R.DS (shadcn + tokens
> do `globals.css`) e cita a origem. O cruzamento peça a peça está em
> [MAPA.md](MAPA.md).

## Veredito em uma linha

O valor do PASSI não está no visual nem nos tokens — está no **jeito de
escrever a documentação para a IA consumir**. É isso que vale extrair.

## O que o pacote tem (188 arquivos)

| Pasta | Conteúdo | Valor para o R.DS |
|---|---|---|
| `diretrizes/componentes/` (52 MD) | 1 arquivo curto por componente, seções fixas | ⭐ **Alto** — é o modelo |
| `diretrizes/Guidelines.md` | Porta de entrada + "quando ler cada arquivo" + árvore de decisão | ⭐ **Alto** |
| `fichas/indice.json` → `sinonimos` | `toast → aviso-rapido`, `btn → botao`… | ⭐ **Alto** — roteia pedido vago |
| `diretrizes/conteudo/` (5 MD) | Microtexto, glossário, voz e tom, formatos BR, linguagem inclusiva | ⭐ **Alto** — R.DS não tem |
| `diretrizes/fundamentos/acessibilidade.md` + `ia-no-produto.md` | Regras transversais | ⭐ Alto |
| `diretrizes/decisoes.md` | ADR com "o que o livro diz / decisão / por quê / consequências / alternativa descartada" | Médio — formato bom |
| `diretrizes/padroes/` (20 MD) | Telas compostas, "Feito com" | Médio — R.DS já tem 15 patterns em código |
| `fichas/*.json` (52) | Mesmo conteúdo dos MD, em JSON | Baixo — duplica o MD |
| `fichas/contraste.json` | Pares texto×fundo com razão medida por modo | Médio — ideia, não os valores |
| `scripts/verificar.mjs` | Linter: cor solta, px, var inexistente, componente inexistente | Médio — ideia; R.DS já tem `design-tokens.test.ts` |
| `tokens/`, `css/`, `tailwind/` | Tokens DTCG em português | ✖ Descartar — R.DS tem motor de cor e presets |
| `componentes/passi-componentes.*` | 5 web components `<passi-*>` | ✖ Descartar — R.DS é React/shadcn |
| `llms-full.txt` (325 KB) | Tudo concatenado | ✖ O próprio PASSI manda não ler inteiro |
| `DESIGN.md`, `miscelanea/` | Resumo de marca, bandeiras, molduras | ✖ Fora do escopo |

## As 8 partes boas (o que extrair)

1. **Um MD curto por componente, seções sempre iguais.** O agente sabe
   onde procurar sem ler o arquivo inteiro. Média de 3 KB por arquivo.
2. **Porta de entrada com roteamento.** `Guidelines.md` diz *qual*
   arquivo ler para cada tarefa, e nada mais. Economiza contexto.
3. **Árvore de decisão entre vizinhos.** "Ação → Botão. Navegação →
   Link. 1 de 2–4 opções → Segmentado. Mais de 5 → Seleção." Resolve o
   erro mais comum da IA: escolher o componente errado.
4. **"NÃO faça" sempre com a alternativa.** "Abas para etapas em
   sequência → use Passos." A proibição já devolve o caminho certo.
5. **Acessibilidade em 4 chaves fixas por componente:** Teclado, Leitor
   de tela, Foco, Cuidados. Verificável, não genérica.
6. **Sinônimos.** Mapa `nome que a pessoa usa → slug`. O agente traduz
   "toast", "snackbar", "modal" para o componente real do catálogo.
7. **Conteúdo (microtexto) por componente + glossário global.**
   "Botão: verbo + objeto, até 3 palavras. Entrar, não Login."
8. **Tokens usados, listados por componente.** O agente não precisa
   abrir o `.tsx` para saber quais tokens a peça consome.

## Pontos de atrito com o R.DS (decidir antes de extrair)

| # | Atrito | PASSI diz | R.DS hoje |
|---|---|---|---|
| A1 | Fonte única | MD é a fonte; JSON é derivado | `src/lib/component-docs.ts` (197 KB de TS) já guarda descrição, anatomia, variantes, props de 59 componentes; 15 têm `spec.md` em `docs/archive/componentes/` |
| A2 | Texto narrativo | Descrição, Faça, NÃO faça escritos | Decisão 3 do `E-documentacao-ds`: narrativa é do Rafael, IA não inventa |
| A3 | Cor de IA | "NÃO use violeta ou gradiente como decoração"; IA só com rótulo/ícone | `Button` tem `ai-primary` com gradiente azul/violeta/rosa (tokens Nimbus) |
| A4 | Idioma do nome | Tokens e slugs em português | Slugs e tokens em inglês (shadcn) — **manter** |

A4 já está resolvido por coerência: o R.DS segue shadcn. Sinônimos em
português cobrem a busca ("abas" → `tabs`).

## Estrutura proposta para o R.DS

```
docs/
  componentes/
    README.md          ← porta de entrada: árvore de decisão + 1 linha por componente
    _modelo.md         ← o template abaixo
    <slug>.md          ← 1 por componente de src/components/ui/ (79)
  conteudo/
    microtexto.md      ← adaptado do PASSI (com crédito)
    glossario.md
  sinonimos.json       ← termo → slug (alimenta busca e agente)
llms.txt               ← índice curto na raiz, aponta para docs/componentes/README.md
```

### Modelo de MD por componente

```markdown
---
slug: tabs
nome: Tabs
camada: molecule                     # vem do atomic-registry.ts
codigo: src/components/ui/tabs.tsx
story: src/components/ui/tabs.stories.tsx
status: estavel                      # estavel | piloto | descontinuado
sinonimos: [abas, tab, tablist]
vizinhos: [segmented-control, stepper, navigation-menu]
referencias: [passi:abas, shadcn:tabs]
---

# Tabs

Uma frase: o que é e o que resolve.

## Quando usar
## Quando NÃO usar
- Etapas em sequência → `stepper`.
- Filtrar a visão de uma área → `segmented-control`.

## Anatomia            (derivado do código)
## Props               (derivado do código)
## Variantes · Tamanhos · Estados
Estados obrigatórios em clicável: padrão, hover, pressionado, foco, desabilitado.

## Conteúdo            (regras de microtexto da peça)
## Acessibilidade
- Teclado:
- Leitor de tela:
- Foco:
- Cuidados:

## Tokens usados
## Faça
## NÃO faça            (cada item termina com → alternativa)
## Exemplo mínimo      (tsx, só o necessário)
```

Regra de tamanho: **até ~4 KB por arquivo**. Passou disso, o
componente provavelmente são dois.

## Ordem sugerida de extração

1. Porta de entrada (`docs/componentes/README.md`) com a árvore de
   decisão adaptada ao catálogo do R.DS — maior ganho por linha escrita.
2. `sinonimos.json`.
3. MDs dos componentes com equivalente ✅ no [MAPA.md](MAPA.md),
   começando pelos mais usados nas telas (button, input, select,
   dialog, tabs, card…).
4. `conteudo/microtexto.md` e `glossario.md`.
5. Lacunas ⛔ (peças que o PASSI tem e o R.DS não) viram candidatas a
   História própria — principalmente o kit de IA (rótulo, explicação,
   plano de ação, campo sugerido).
