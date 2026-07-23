Construa a tela "$ARGUMENTS" do fluxo da Fase 5 (ver PLANO-LOOP-80-20-TEMPLATES.md, seção "Fase 5 — Jornadas de telas"). Se nenhum slug foi passado em $ARGUMENTS, use o primeiro item de `inProgressTemplates` em `src/lib/templates-registry.ts` (segue a ordem: 5A fluxo de login primeiro, 5B telas de seguro depois).

Rode nesta ordem, um estágio por vez:

1. Delegue ao subagente telas-planejador. Espere `.build/telas/<slug>.md`.
2. Delegue ao telas-construtor com esse spec. Espere a rota implementada em `src/app/templates/<slug>/page.tsx` e `templates-registry.ts` atualizado.
3. Delegue ao telas-acessibilidade. Espere `.build/telas/acessibilidade-<slug>.md`.
4. Delegue ao telas-revisor. Mostre `.build/telas/diagnostico-<slug>.md`.

Pare aí. Não construa a próxima tela do fluxo nem faça commit — o veredito do diagnóstico e a decisão de seguir (ou pedir retrabalho) são do Rafael. Se o diagnóstico apontar bloqueante, diga isso claramente antes de qualquer outra coisa.
