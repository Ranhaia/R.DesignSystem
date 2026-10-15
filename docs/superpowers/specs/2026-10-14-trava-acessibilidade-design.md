# Trava de acessibilidade do Design System: desenho

**Data:** 2026-10-14
**Status:** aguardando revisão
**Referência normativa:** [A11Y.md](https://github.com/fecarrico/A11Y.md) (código) e [DA11Y.md](https://github.com/fecarrico/DA11Y.md) (design), fixados no commit `57564be` do A11Y.md, que é o que o DA11Y.md 0.1.0 usa.

## 1. Objetivo

O DS passa a estar sempre de acordo com a WCAG 2.2 AA. A acessibilidade vira **teste que reprova**, como a trava de tokens (`design-tokens.test.ts`), em vez de um estudo que envelhece. A mesma conta de contraste que trava o DS aparece **na tela**, quando alguém personaliza uma cor, e impede salvar o que não passa.

### Decisões tomadas

| Tema | Decisão |
|---|---|
| Perfil | **Standard (AA)**: texto 4.5:1, interface 3:1, alvo mínimo 24×24 (44×44 é Regra da Casa), fonte mínima 12px |
| O que já reprova hoje | **Linha de base**: falhas atuais registradas com dono e prazo; a trava reprova só o novo ou o pior; a base só diminui |
| Temas cobertos | **Todos os presets em todos os modos** (10 contextos) |
| Escopo | **Só código** nesta rodada; Figma (anotações do DA11Y) fica para a próxima |
| Abordagem | **Duas camadas**: tokens (unitário) + componentes renderizados (stories) |
| Cor personalizada que reprova | **Não pode ser salva**; a tela explica o motivo e sugere a cor mais próxima que passa |
| `SeletorDeCor` | **Nos dois**: nasce no DS a partir da versão do Central ESG, e a cópia do Central ESG é atualizada |

### Fora do escopo

Lado Figma; correção das falhas da linha de base (cada correção é trabalho separado, priorizado pela severidade); checagem dos temas de tenant da Trama (usa o mesmo `contraste.ts` quando a Trama ganhar personalização); tradução de textos fixos do DS em inglês.

## 2. Núcleo de cálculo: `src/lib/a11y/contraste.ts`

Uma única implementação, usada pelos testes e pela interface.

- `parseCor(valor: string): Rgb | null`: aceita hex (3/6 dígitos), `oklch()`, `rgb()`. Retorna `null` para o que não entende.
- `luminancia(rgb): number`: OKLCH → OKLab → sRGB linear (matrizes de Björn Ottosson / CSS Color 4) → clamp ao gamut → `0.2126R + 0.7152G + 0.0722B`.
- `razao(a: string, b: string): number`: `(L1+0.05)/(L2+0.05)`, **truncada** em duas casas (nunca arredondada).
- `PISOS = { texto: 4.5, ui: 3 }` (perfil AA, de `src/lib/a11y/perfil.ts`).
- `corProximaQuePassa(cor, fundo, piso): string | null`: varia só o L do OKLCH (matiz e croma mantidos; croma reduzido apenas se sair do gamut sRGB), busca binária para os dois lados (mais claro e mais escuro), devolve a que passa com a menor diferença de L, em hex. `null` só se nenhum L passa.

**Autoverificação** (`contraste.test.ts`): preto/branco = 21; pares conhecidos do estudo de 2026-07-22 (`docs/active/revisao-ds/acessibilidade.md`) batem; truncamento (4.499 → 4.49, reprova); `corProximaQuePassa` sempre devolve cor que passa, mantém a matiz (Δh < 1°) e não existe L mais próximo que também passe (checado por varredura fina).

## 3. Camada 1: tokens

`src/lib/a11y/tokens.test.ts` lê `src/app/globals.css`, monta os **10 contextos** (`:root`, `.dark`, `[data-style=editorial|tech|soft|midnight]` e `.dark[data-style=…]`; preset herda do `:root` o que não redefine), resolve as cadeias de `var()` e calcula cada par de `src/lib/a11y/pares.ts`.

Token que não resolve → **reprova** (nunca pula em silêncio).

| Grupo | Pares (frente / fundo) | Piso |
|---|---|---|
| Texto base | `foreground`/`background`, `card-foreground`/`card`, `popover-foreground`/`popover` | 4.5 (1.4.3) |
| Texto em ação | `primary-foreground`/`primary`, `secondary-foreground`/`secondary`, `accent-foreground`/`accent`, `destructive-foreground`/`destructive` | 4.5 |
| Texto de apoio | `muted-foreground`/`background`, `muted-foreground`/`muted`, `muted-foreground`/`card` | 4.5 |
| Menu lateral | `sidebar-foreground`/`sidebar`, `sidebar-primary-foreground`/`sidebar-primary`, `sidebar-accent-foreground`/`sidebar-accent` | 4.5 |
| IA | `ai-text-high`/`ai-surface`, `ai-text-low`/`ai-surface` | 4.5 |
| Limite de controle | `input`/`background`, `border`/`background` | 3 (1.4.11) — **reprovação vira dúvida no `A11Y-DECISIONS.md`**, não falha, porque com rótulo visível a borda pode não ser o único limite |
| Foco | `ring`/`background`, `ring`/`card`, `sidebar-ring`/`sidebar` | 3 (1.4.11, 2.4.7) |
| Ação contra a página | `primary`/`background`, `destructive`/`background` | 3 |

Controle desabilitado é isento (WCAG) e isso fica escrito no relatório.

Saída: `docs/a11y/contraste-tokens.md`, tabela gerada a cada execução (substitui o estudo manual de julho).

## 4. Camada 2: componentes (stories)

- **Modo escuro no Storybook**: global `modo` (claro/escuro) aplica `.dark`, ao lado do `style` que já existe.
- **Matriz**: o projeto `storybook` do Vitest vira 10 instâncias (preset × modo). Scripts: `test:a11y` (só `default` claro, dia a dia) e `test:a11y:todos` (os 10; antes de commit e no CI).
- **axe** (`@storybook/addon-a11y`): `parameters.a11y.test` de `'todo'` para `'error'`. A regra `color-contrast` fica **ligada só no `default` claro** (pega combinação errada de tokens dentro do componente; as falhas do próprio token já estão na camada 1).
- **Medições próprias** num hook global depois de cada story, no DOM real:
  - **Alvo (2.5.8)**: interativos visíveis (`button`, `a[href]`, `input`, `select`, `textarea`, `[role=button|link|checkbox|radio|switch|tab|menuitem|option]`) medem ≥ 24×24, ou cumprem a exceção de espaçamento (círculo de 24px centrado não toca outro alvo nem o círculo dele). Link em texto corrido é isento. < 44×44 entra no relatório como Regra da Casa (🟡), sem reprovar.
  - **Foco (2.4.7 + protocolo)**: foco por `Tab` em cada interativo; contorno real (`outline` ou anel em `box-shadow`) com ≥ 2px e ≥ 3:1 contra o fundo calculado atrás. Foco só por preenchimento reprova.
- Saída: `docs/a11y/relatorio-componentes.md` (por componente: passou / reprovou / na base; por severidade).

## 5. Linha de base, exceções e decisões

| Arquivo | Autor | Conteúdo |
|---|---|---|
| `src/lib/a11y/linha-de-base.json` | comando `npm run a11y:base` | falhas aceitas, com id estável (`token:<contexto>:<par>` / `story:<id>:<contexto>:<regra>:<seletor>`) e a **medida** |
| `docs/a11y/EXCEPTIONS.md` | pessoa (template do A11Y.md) | uma entrada por falha WCAG da base: critério, severidade, dono, aprovador, prazo, motivo |
| `docs/a11y/A11Y-DECISIONS.md` | pessoa ou agente (template do A11Y.md) | Regra da Casa flexibilizada e dúvidas de leitura de critério; decisão do agente é registrada como do agente |

Regras da trava:
1. Falha fora da base → reprova, dizendo origem, medida, piso e severidade.
2. Falha que piorou em relação à medida da base → reprova.
3. Falha corrigida que segue na base → reprova (`npm run a11y:base -- --remover-corrigidas`).
4. Entrada da base sem linha no `EXCEPTIONS.md` → reprova.
5. Prazo vencido → **avisa**, não reprova.

`a11y:base` só acrescenta entradas com `--aceitar`, e o resumo mostra quantas entraram. **Agente nunca roda `--aceitar` sem autorização expressa.** Na primeira geração, as entradas ficam com `prazo: a definir` (aceito só nessa leva, marcada com a data); dono e prazo são definidos pelo Rafael.

## 6. Contrato de acessibilidade por componente

Em `src/lib/component-docs.ts`, bloco `a11y` por componente:

```ts
a11y: {
  apelidos: string[],
  papel: string,
  anatomia: string[],        // ordem de leitura
  teclado: string[],
  requisitos: { nome: string; categoria: "Contraste" | "Teclado" | "Semântica" | "Conteúdo"; wcag: string; requisito: string; estados: string[] }[],
}
```

- O resultado medido não é escrito à mão: a doc do componente mostra o da última execução.
- Teste: componente interativo em `src/components/ui/` sem `papel`, `anatomia` e ao menos um requisito reprova (os atuais entram na linha de base).
- Gera `docs/a11y/apelidos.json` (componente → apelidos → papel → estados obrigatórios), para agentes acharem o componente existente e, na próxima rodada, para as guidelines da biblioteca do Figma.

## 7. Contraste na personalização (em tela)

**`SeletorDeCor` no DS**, a partir da versão do Central ESG (referência de comportamento), com props novas:

```ts
contraste?: { contra: string; uso: "texto" | "ui"; descricao: string }[]
// ex.: [{ contra: "#FFFFFF", uso: "texto", descricao: "o texto do botão" },
//       { contra: "var(--background)", uso: "ui", descricao: "o fundo da página" }]
```

- Ao escolher (paleta ou hexadecimal), cada par é medido com `contraste.ts`. Se algum reprova:
  - **Aplicar fica desabilitado** e a cor **não é entregue** a `onValor`. Na paleta, cores que reprovam aparecem marcadas e não são selecionáveis (`aria-disabled`, com o motivo no nome acessível).
  - **Aviso** no próprio seletor, com `aria-live="polite"`, em linguagem simples: o que reprovou, contra o quê, a medida, o piso, o critério e o porquê (ex.: *"Esta cor não pode ser usada como cor principal. O texto do botão fica com contraste de 2,8:1 sobre ela, e o mínimo para leitura é 4,5:1 (WCAG 1.4.3). Pessoas com baixa visão ou com a tela sob sol não conseguiriam ler."*).
  - **Sugestão**: amostra da `corProximaQuePassa` com a medida e o botão **Usar esta cor**. Se mais de um par reprova, a sugestão precisa passar em todos (busca sobre o pior par e reconfere os demais).
- `var(--token)` em `contra` é resolvido pelo valor computado no elemento.
- Textos do aviso vêm de props com padrão neutro em português (texto de produto não entra no DS).
- Story + doc + contrato `a11y` próprio; entra nas duas camadas da trava.

**Central ESG**: a cópia passa a ser a do DS; a tela de edição da entidade passa `contraste` com o texto do botão e o fundo; o aviso solto (*"A cor principal é clara demais para texto branco."*) e o piso 3:1 de `contrasteLegivel` saem, e `corDoCtaForeground` passa a usar `contraste.ts`. Cores já salvas que reprovam: a tela mostra o aviso ao abrir e exige troca antes de salvar qualquer outra alteração da cor.

## 8. Regra para agentes

Seção no `AGENTS.md` do DS:
- criar ou alterar componente segue o A11Y.md (link fixado em `57564be`);
- antes de concluir, `npm run test:a11y:todos`;
- nunca `a11y:base -- --aceitar` sem autorização expressa;
- defeito de componente se corrige no DS, nunca na cópia de um projeto.

## 9. Testes (resumo)

`contraste.test.ts` (autoverificação e cor próxima), `tokens.test.ts` (10 contextos), matriz de stories (axe + alvo + foco), base (regras 1–5), contrato por componente, `seletor-de-cor` (não entrega cor que reprova; aviso anunciado; "Usar esta cor" entrega cor que passa), e no Central ESG o e2e da edição de entidade com uma cor que reprova.

## 10. Fases

1. Núcleo `contraste.ts` + camada de tokens + relatório de tokens.
2. Camada de componentes (modo escuro, matriz, axe `error`, alvo, foco) + relatório.
3. Linha de base, `EXCEPTIONS.md`, `A11Y-DECISIONS.md`, primeira geração (revisão do Rafael para dono e prazo).
4. Contrato por componente + `apelidos.json` + `AGENTS.md`.
5. `SeletorDeCor` no DS com aviso e sugestão.
6. Cópia no Central ESG + tela de edição de entidade.
