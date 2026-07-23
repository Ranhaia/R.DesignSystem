Construa a tela "$ARGUMENTS" do fluxo da Fase 5 (ver PLANO-LOOP-80-20-TEMPLATES.md, seção "Fase 5 — Jornadas de telas"). Se nenhum slug foi passado em $ARGUMENTS, use o primeiro item de `inProgressTemplates` em `src/lib/templates-registry.ts` (segue a ordem: 5A fluxo de login primeiro, 5B telas de seguro depois).

Rode os 4 estágios abaixo em sequência, direto, sem parar entre eles e sem perguntar nada ao Rafael no meio do caminho — ele não está acompanhando ao vivo. Só pare (e só então mostre algo) depois do estágio 4.

1. Delegue ao subagente telas-planejador. Espere `.build/telas/<slug>.md`.
2. Delegue ao telas-construtor com esse spec. Espere a rota implementada em `src/app/templates/<slug>/page.tsx` e `templates-registry.ts` atualizado.
3. Delegue ao telas-acessibilidade. Espere `.build/telas/acessibilidade-<slug>.md`.
4. Delegue ao telas-revisor. Mostre `.build/telas/diagnostico-<slug>.md`.

Agora pare. Não construa a próxima tela do fluxo nem faça commit — o veredito do diagnóstico e a decisão de seguir (ou pedir retrabalho) são do Rafael, quando ele voltar a olhar. Se o diagnóstico apontar bloqueante, deixe isso registrado com destaque no próprio arquivo de diagnóstico.
