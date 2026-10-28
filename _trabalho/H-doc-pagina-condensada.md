---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-documentacao-ds
status: progresso
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-10-28
ciclo:
estimativa: 4
perfil: front
dono: antigravity
tarefas: 1/5
bloqueada-por:
criado: 2026-10-28
fechado:
motivo-descarte:
origem:
---

# Página de componente condensada (molde em abas)

A página de um componente (`/components/<slug>`) hoje é um scroll de 13 seções. Passa a seguir o molde da
referência (Aipim, Button): cabeçalho curto, preview vivo no topo e 5 abas. O MD novo (`docs/componentes/*.md`) já
tem o conteúdo; a página ignora Acessibilidade, Tokens usados e "Quando NÃO usar" porque o `ComponentDoc` só tem
10 campos.

## Plano

Molde da página:

```
camada · Título · 1 frase
[ preview vivo (Playground ou 1º exemplo) · Ver código ]
Status · Camada · Relacionados · links de Código e Story
Visão geral | Exemplos | Código | Tokens | Acessibilidade
```

- **Visão geral:** Quando usar (lista), Quando NÃO usar (→ slug), uma tabela só de Variantes e props (tamanhos
  inclusos), Estados, Faça / Não faça (texto com ✓ e ✕), linha "Nesta página".
- **Exemplos:** variantes e tamanhos vivos (hoje na Visão geral), Playground, exemplos recolhidos. A matriz de
  variantes × estados, prometida no plano, fica de fora: exigiria forçar hover e foco por classe em cada componente.
- **Código:** Exemplo mínimo, Anatomia, Composição.
- **Tokens** e **Acessibilidade:** o que o MD já tem.
- Anterior / Próxima no fim, na ordem da camada. Aba na URL, para link direto.
- Componente sem MD novo continua funcionando; aba sem conteúdo some em vez de mostrar `[a preencher]`.

Contrato do dado (Fase 1). Campos novos de `ComponentDoc`, todos **opcionais**, ausentes quando a seção do MD não
existe e nos componentes ainda sem MD. Nomes em inglês, como os atuais:

```ts
meta?: { nome; camada; status; codigo; story; vizinhos: string[] }   // do frontmatter
whenToUseItems?: string[]      // bullets de "Quando usar" (whenToUse continua string)
whenNotToUse?: string[]        // bullets de "Quando NÃO usar", cada um com →
content?: string[]             // bullets de "Conteúdo"
accessibility?: { keyboard; screenReader; focus; cautions }   // de "Acessibilidade"
tokens?: string[]              // de "Tokens usados", sem crase
```

Sequência: Fase 1 sozinha (pequena); Fases 2 e 4 em paralelo depois dela, sem arquivo em comum; Fase 3 depois da 2.
Pausar `H-memoria-replicar-lotes` até a Fase 4, para os MDs dos lotes já nascerem no molde curto.

## Pré-requisitos

- [x] **Decisão** — Variantes, tamanhos e props na Visão geral.
      A) Uma tabela só, com as pré-visualizações vivas na aba Exemplos → página mais curta; deixa de mostrar cada variante na primeira tela.
      B) Manter os cards com preview na Visão geral → mais visual, mais comprido.
      Recomendo A porque é o que condensa. · pedido por: claude · 2026-10-28
      Decidido: **A** · Rafael · 2026-10-28
- [x] **Decisão** — Faça / Não faça.
      A) Texto com ✓ e ✕ vindo do MD, para todos os componentes → vale já.
      B) Pares visuais como o do Aipim → exige uma mini demo por componente.
      Recomendo A, e B só no Button, depois. · pedido por: claude · 2026-10-28
      Decidido: **A** · Rafael · 2026-10-28
- [x] **Decisão** — Faixa de metadados.
      A) Só o que o MD já tem (status, camada, relacionados, links) → sem campo novo no frontmatter.
      B) Acrescentar HTML e WCAG ao frontmatter → preencher cada MD e a trava.
      Recomendo A; o WCAG já aparece em Acessibilidade ▸ Cuidados. · pedido por: claude · 2026-10-28
      Decidido: **A** · Rafael · 2026-10-28

## Tarefas

- [x] Fase 1 — Dado: estender `ComponentDoc`, parser e gerador (teste: `src/lib/component-docs.campos.test.ts`)
- [ ] Fase 2 — Página do Button com as 5 abas
- [ ] Fase 3 — Mesmo molde em dialog, tabs e separator, e componentes sem MD degradando bem
- [ ] Fase 4 — Molde e régua com limite por seção (`docs/componentes/_modelo.md`, `_baliza.md`)
- [ ] Fase 5 — PR, preview na Vercel e revisão do Rafael

## Contribuições

- 2026-10-28 · antigravity · Fase 1 (dado da página condensada): adicionados campos opcionais em `ComponentDoc`, extração de listas, metadados, acessibilidade e tokens em `scripts/parse-component-md.mjs`, formatação em `scripts/gerar-component-docs.mjs` e sincronização de `src/lib/component-docs.ts`. Validações: `npx vitest run --project unit src/lib/component-docs.campos.test.ts` (83 pass), `npm run test:unit` (22 arquivos, 1302 pass), `npx tsc --noEmit` (0 erros), `npm run docs:check` (ok).
- 2026-10-28 · claude (orquestrador) · Fase 1 conferida. O teste do contrato (Checker, escrito antes) foi vermelho com 7 falhas e não foi alterado pelo AGY. Reroda minha: o teste do contrato (83 pass), `npm run test:unit` (22 arquivos, 1302 pass), `npx tsc --noEmit` (0 erros) e `npm run docs:check` (ok). O diff de `src/lib/component-docs.ts` só acrescenta (0 remoções) e só as 4 entradas com MD ganharam campos novos (button, separator, dialog, tabs); as demais não mudaram. Li o parser: funções genéricas, sem valor escrito para passar o teste. O job do AGY acabou com `status ERROR` (chamada de função malformada no final), mas o commit estava completo e a árvore limpa. Não rodei teste de navegador nem servidor dev: a Fase 1 não tem tela.

## Histórico
