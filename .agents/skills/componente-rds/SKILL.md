---
name: componente-rds
description: Use ao criar, mudar ou documentar um componente de src/components/ui/ do R.DS — componente novo, variante ou prop nova, mudança de estrutura, ou passar um componente existente pelo ciclo de memória (docs/componentes/<slug>.md). Garante que a peça encaixe na base, só use token, gere todos os artefatos e declare todas as partes.
---

# Componente do R.DS

Esta skill só ordena os passos. As regras moram em outros lugares e não se
repetem aqui:

- `CLAUDE.md` da raiz: só token, raio concêntrico, tabela "Mudou X → atualize Y".
- `docs/componentes/_baliza.md`: como escrever cada seção do MD (a régua tirada do PASSI).
- `docs/componentes/_modelo.md`: as seções e campos que todo MD tem.
- `src/lib/memoria-componentes.test.ts`: a trava que reprova o que faltar.

## Qual caminho

| Situação | Passos |
|---|---|
| Componente novo | 1 → 6 |
| Componente existente mudou de estrutura (`cva`, props, partes, classes) | 3 → 6, com `--motivo` |

## 1. Provar que a peça ainda não existe (só componente novo)

1. Ler a árvore de decisão em `docs/componentes/README.md` e procurar o nome pedido em `docs/sinonimos.json`.
2. Ler o MD dos vizinhos prováveis. Se uma variante, uma prop ou uma composição de peças existentes resolve, **parar** e propor isso ao Rafael.
3. Perguntar ao Rafael, numa mensagem só, o modo (Direto ou Loop) e onde a peça nasce (Design System, só no projeto ou nos dois), conforme as regras globais.
4. Definir a camada pelo critério de `src/lib/atomic-registry.ts`: ela sai do que o componente importa do DS.

## 2. Construir (só componente novo)

1. `src/components/ui/<slug>.tsx` só com token (a trava é `design-tokens.test.ts`). Se tiver arredondado dentro de arredondado, incluir a peça em `radius-concentric.stories.tsx`.
2. Criar os artefatos fixos da linha "Componente novo" da tabela "Mudou X → atualize Y" do `CLAUDE.md`.
3. Acrescentar a chave do slug em `docs/sinonimos.json`, com os nomes que alguém usaria para pedir a peça.

## 3. Registrar

```bash
npm run docs:registrar -- <slug> --motivo "por quê"
```

O comando faz cinco coisas:
- cria o MD a partir do `_modelo.md`, se ele não existir;
- põe as seções na ordem do modelo;
- reescreve as seções geradas (Anatomia, Composição, Props, Variantes, Tamanhos e Tokens usados);
- guarda a coleta;
- acrescenta o que mudou ao histórico.

À mão, só a coluna de descrição das tabelas e as linhas que o código não vê. **Nunca** edite `docs/componentes/coleta/`, `historico/` nem `src/lib/component-docs.ts`.

## 4. Declarar a intenção

Todo `[a preencher]` vira texto, seguindo `_baliza.md`. As fontes, nesta ordem:

1. **O código e a story**: o que a peça faz de verdade. Nunca descreva o que o `.tsx` não faz.
2. **O PASSI**: ache o arquivo em `Referencia/passi-ds-1.1.0/MAPA.md` e leia `Referencia/passi-ds-1.1.0/passi-ds-1.1.0/diretrizes/componentes/<arquivo>.md` inteiro. **Adapte, não copie**: ele é baliza, e o texto final fala do componente do R.DS. Cite em `referencias` como `passi:<arquivo>`.
3. **O spec antigo**, se houver: `docs/archive/componentes/<slug>/spec.md`.
4. **O texto antigo** da entrada `<slug>` no `component-docs.ts`. Leia a versão do git (`git show HEAD:src/lib/component-docs.ts`): no momento em que o MD nasce, o registro regenera o arquivo de trabalho e a entrada antiga sai dele.

No frontmatter, preencha `vizinhos` (ao menos um slug existente, os que costumam ser confundidos com este) e `referencias` (ao menos uma). Se você precisou completar algo que a coleta deveria ter lido, anote em `docs/componentes/historico/_lacunas.md`.

## 5. Encaixar na porta de entrada

1. `docs/componentes/README.md`: acrescente a linha em "Componentes documentados". Se a peça muda uma escolha entre vizinhos, ajuste a árvore de decisão. A trava reprova componente sem MD ou sem essa linha.

## 6. Provar

1. `npm run test:unit` e `npm run docs:check` verdes. O CI repete os dois em todo PR (`.github/workflows/trava.yml`).
2. Abra `/components/<slug>` e confira as seções Variantes e Tamanhos.
3. Diga ao Rafael o que foi adaptado do PASSI e o que fica para a revisão dele.

## Nunca

- Inventar valor de token, cor, medida, estado ou comportamento.
- Afrouxar a trava para passar: teste vermelho se corrige na causa.
- Pular o passo 1 porque "é só um componente pequeno".
