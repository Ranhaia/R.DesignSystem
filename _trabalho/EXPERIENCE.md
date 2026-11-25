---
tipo: memoria
projeto: 🎨 P-DS-SHADCN
atualizado: 2026-11-09
---

# Memória Operacional — R.DS (`EXPERIENCE.md`)

> Lições táticas, travas de runtime e descobertas operacionais deste repositório (Padrão Harness²). Leia antes de iniciar uma História em `C:\dev\R.DS`. Aprendizados conceituais amplos sobem para `C:\base-conhecimento\Rafanhaia\wiki\concepts\`.

---

### [H-memoria-componentes-spike] Escritor Único e Coleta AST para Documentação de Componentes
- **Gatilho (Cue):** Quando criar um componente novo em `src/components/ui/` ou alterar `cva`, props, anatomia ou tokens de um componente existente.
- **Lição (Lesson):** Nunca editar manualmente as tabelas estruturais em `docs/componentes/<slug>.md`, `docs/componentes/coleta/` ou `docs/componentes/historico/`. Executar `npm run docs:registrar -- <slug> --motivo "..."`, que extrai via AST do TypeScript (`scripts/coletar-componente.mjs`) e preserva as descrições de intenção do auditor humano.
- **Evidência (Evidence):** Testado e comprovado na entrega da história [[H-memoria-componentes-spike]] com `src/lib/memoria-componentes.test.ts` (1143 testes verdes). Valida na prática o conceito [[Memoria Persistente de Design System]] da Wiki.
- **Confiança:** Alta

### [feat/a11y-trava] Trava de Concorrência de Chromium nos Testes de Acessibilidade
- **Gatilho (Cue):** Ao rodar testes de navegador/Storybook (`vitest` browser mode / a11y) no R.DS, especialmente com múltiplos agentes ou worktrees ativos.
- **Lição (Lesson):** Cada instância headless do Chromium consome ~830 MB de RAM; execuções simultâneas esgotam os 16 GB da máquina. Rodar todos os contextos exclusivamente via `npm run test:a11y:todos` (respeitando `scripts/a11y-trava.mjs`). Se a trava recusar, aguardar a execução em andamento terminar sem contornar o lock.
- **Evidência (Evidence):** Incidente de exaustão de RAM em 15/10/2026 resolvido e travado por `scripts/a11y-trava.mjs` e `scripts/verificar-a11y-todos.mjs`.
- **Confiança:** Alta

### [Tailwind-v4-Motion] Ponte `@utility` para Tokens de Duração no Tailwind v4
- **Gatilho (Cue):** Ao criar tokens semânticos de duração de movimento (ex: `--motion-duration-*`) no `globals.css` para uso como classe utilitária no Tailwind v4.
- **Lição (Lesson):** Famílias sem namespace nativo de tema no Tailwind v4 (como duração) não geram classes apenas com `@theme inline`. É obrigatório declarar uma ponte `@utility duration-motion-*` no `globals.css`. O teste `src/lib/design-tokens.test.ts` reprova durações nomeadas sem `@utility` ou valores fixos em colchetes (`w-[72px]`).
- **Evidência (Evidence):** Testado e garantido pela trava estática `src/lib/design-tokens.test.ts`.
- **Confiança:** Alta
