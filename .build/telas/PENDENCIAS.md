# Pendências consolidadas — Fase 5A (fluxo de login) + apolices-ativas (5B)

Lista única juntando o que ficou espalhado nos diagnósticos individuais
(`.build/telas/diagnostico-*.md`). Atualizado em 2026-07-23 depois do
Rafael decidir os itens 1–3 e eu fechar o que dependia só de código.

## 1. Gap de processo — RESOLVIDO

~~`login-erro-validacao` não passou pelas etapas 3 e 4 do pipeline.~~
Fechado manualmente: `.build/telas/acessibilidade-login-erro-
validacao.md` e `diagnostico-login-erro-validacao.md`, veredito PRONTA.

## 2. Decisões PROVISÓRIAS — RATIFICADAS pelo Rafael (2026-07-23)

1. **Persistência de dados entre telas: Context React.** Implementado —
   `src/components/templates/fluxo-login-context.tsx`, montado em
   `src/app/templates/layout.tsx`. `selecao-perfil-corretora` grava,
   `onboarding` e `apolices-ativas` já leem. Detalhe completo no Log do
   `PLANO-LOOP-80-20-TEMPLATES.md`, entrada 2026-07-23.
2. **Convenção do `Select` "Cenário (demonstração)": ratificada como
   padrão oficial** do catálogo pra telas cujos estados dependem de
   backend fictício. `telas-planejador` deve prever esse gatilho já na
   spec das 2 telas restantes de 5B (`novo-sinistro`, `painel-corretor`).

## 3. Decisão de produto — RESOLVIDA

`recuperacao-senha` mantém sucesso genérico ao "e-mail não encontrado"
(nenhuma mudança de código — já era o comportamento implementado).

## 4. Notas de acessibilidade sistêmicas — parcialmente resolvidas

- ~~`CardTitle`/`EmptyTitle` renderizam `<div>`, não heading semântico.~~
  **Resolvido**: `asChild` em `card.tsx`/`empty.tsx`, aplicado nas 7
  telas de Template (`h2` pro título de seção, `h3` pro `Empty` aninhado).
- ~~Botão perde foco ao virar `disabled` durante loading síncrono.~~
  **Resolvido**: `aria-disabled` + guarda no handler, em `button.tsx` +
  todas as telas que tinham o padrão.
- **Ainda aberto, deliberadamente não tocado** (baixo risco, ~40+
  ocorrências em 7 arquivos): ícones decorativos (lucide) sem
  `aria-hidden="true"` explícito. Inofensivo na prática — leitores de
  tela já ignoram SVG sem `role`/`title` — mas não é boa prática
  documentada. Candidato a um passe único futuro, se o Rafael quiser.
- **Ainda aberto, deliberadamente não tocado**: `role="group"` implícito
  em cada `Field`/`InputGroup` sem nome — verbosidade extra possível em
  alguns leitores de tela. Mesmo critério do item acima.

Fonte de cada item resolvido: ver Log do `PLANO-LOOP-80-20-TEMPLATES.md`,
entrada "2026-07-23 — Fase 5A construída (pipeline autônomo) + fechamento
de pendências".
