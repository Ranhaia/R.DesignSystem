# Pendências consolidadas — Fase 5A (fluxo de login) + Fase 5B (seguros)

Lista única juntando o que ficou espalhado nos diagnósticos individuais
(`.build/telas/diagnostico-*.md`). Atualizado em 2026-07-23 depois do
Rafael decidir os itens 1–3 e eu fechar o que dependia só de código.
Atualizado novamente em 2026-07-29: Fase 5B fechou com `painel-corretor`
(3ª e última tela de seguros); item 4 revisado e a duplicação de
`aria-live` corrigida nas 2 telas afetadas.

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
  **Resolvido**: `asChild` em `card.tsx`/`empty.tsx`, aplicado nas 9
  telas de Template (`h2` pro título de seção, `h3` pro `Empty` aninhado).
- ~~Botão perde foco ao virar `disabled` durante loading síncrono.~~
  **Resolvido**: `aria-disabled` + guarda no handler, em `button.tsx` +
  todas as telas que tinham o padrão.
- ~~Ícones decorativos (lucide) sem `aria-hidden="true"` explícito.~~
  **Resolvido**: a migração pra Material Symbols (`@/components/ui/icon`)
  terminou — nenhuma das 9 rotas de Template importa mais `lucide-react`,
  e o Atom `Icon` aplica `aria-hidden="true"` automaticamente quando não
  recebe prop de acessibilidade (`icon.tsx`). Confirmado por leitura de
  código no diagnóstico de `painel-corretor` (2026-07-29); a entrada
  anterior deste item citava "~40+ ocorrências em 7 arquivos" como ainda
  vivas — estava desatualizada.
- ~~Duplicação de anúncio `aria-live` nos estados "carregando"/"erro" de
  `apolices-ativas` e `painel-corretor`.~~ **Resolvido em 2026-07-29**:
  removido o `<p aria-live>` efêmero do bloco de skeleton (a
  `CardDescription aria-live="polite"` já é persistente e cobre
  carregando→carregado nas duas direções); no estado de erro a
  `CardDescription` passou a usar texto curto ("Erro ao carregar"),
  deixando o `Alert` (`role="alert"`) como única fonte da frase completa.
  Achado original em `acessibilidade-apolices-ativas.md` e
  `acessibilidade-painel-corretor.md`; havia sido listado como "ajuste
  menor recomendado" no diagnóstico de `apolices-ativas` e ficado pendente
  até se repetir em `painel-corretor`.
- **Ainda aberto, deliberadamente não tocado**: `role="group"` implícito
  em cada `Field`/`InputGroup` sem nome — verbosidade extra possível em
  alguns leitores de tela. Baixo risco, mesmo critério dos itens acima.

## 5. Gaps de registro — RESOLVIDOS (2026-07-29, Rafael decidiu os dois)

- ~~`Icon` não está listado em `src/lib/components-registry.ts` (só em
  `atomic-registry.ts`).~~ **Resolvido**: entrada `{ slug: "icon", name:
  "Icon" }` adicionada em ordem alfabética (entre `hover-card` e
  `input`).
- ~~Os 3 `aria-label` padrão em inglês de `ui/pagination.tsx`
  (`Pagination`/`PaginationPrevious`/`PaginationNext`) continuam
  sobrescritos localmente em PT-BR em vez de corrigidos na origem.~~
  **Resolvido**: defaults trocados direto no componente
  (`aria-label="paginação"`, `"Ir para a página anterior"`, `"Ir para a
  próxima página"`, texto visível `Anterior`/`Próxima`, e `sr-only`
  `"Mais páginas"` no Ellipsis). Removida a sobrescrita redundante em
  `painel-corretor/page.tsx` (o `aria-label="Paginação de sinistros"` no
  `<Pagination>` raiz continua — é customização legítima de contexto,
  não duplicação do default).

## 6. Gap de processo — aberto

- Estágio mobile do pipeline não foi executado para `painel-corretor`
  (não existe `.build/telas/mobile-painel-corretor.md`). Fechado por
  leitura de código no diagnóstico (sem caminho estrutural pra overflow
  em 390px) — recomenda-se rodar a medição de rotina numa próxima sessão,
  não bloqueia a tela.

Fonte de cada item resolvido: ver Log do `PLANO-LOOP-80-20-TEMPLATES.md`,
entrada "2026-07-23 — Fase 5A construída (pipeline autônomo) + fechamento
de pendências", e `.build/telas/diagnostico-painel-corretor.md`
(2026-07-29) pra tudo que fechou a Fase 5B.
