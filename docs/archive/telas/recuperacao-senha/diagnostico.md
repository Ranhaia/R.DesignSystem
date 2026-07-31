# Diagnóstico final — `recuperacao-senha`

- **Slug:** `recuperacao-senha` (3ª de 5 rotas do fluxo 5A — `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 5)
- **Arquivos revisados:** `.build/telas/recuperacao-senha.md` (spec), `.build/telas/acessibilidade-recuperacao-senha.md` (auditoria), `src/app/templates/recuperacao-senha/page.tsx` (código), `src/lib/templates-registry.ts` (registro).
- **Confrontado com:** `src/lib/components-registry.ts`, telas vizinhas (`login-simples`, `login-erro-validacao`).
- **Não editei nada em `src/`.** Este diagnóstico é só para o Rafael aprovar ou pedir retrabalho.

---

## Veredito

**PRONTA.**

A tela cumpre a spec, passa nos 6 requisitos de acessibilidade acionáveis (itens 1–6), usa só peças reais do catálogo, não tem cor/espaçamento hardcoded fora de token, está corretamente registrada e referencia corretamente as telas vizinhas do fluxo. Não há bloqueantes.

As pendências que sobram são: (a) o gap sistêmico do `CardTitle` não-heading (item 7 — já registrado no catálogo, agravado aqui pelo título dinâmico, mas mitigado pelo foco programático), (b) 3 observações de baixo risco herdadas das telas irmãs, (c) 1 observação nova de baixo risco (perda de foco ao desabilitar o botão "Reenviar") e (d) 1 decisão de produto já sinalizada na spec. Nenhuma delas impede seguir para a próxima tela do fluxo.

---

## 1. Consistência com o design system — OK

| Verificação | Resultado |
|---|---|
| Só componentes reais do catálogo | **OK** — os 7 componentes importados (Alert, Badge, Button, Card, Field, Input, Spinner) constam em `components-registry.ts`. Nenhum componente novo criado, nenhum Pattern instanciado diretamente. |
| Cores/espaçamentos por token | **OK** — só tokens/escala Tailwind: `bg-muted/30`, `bg-primary/10`, `text-primary`, `text-muted-foreground` e o `text-destructive` herdado de `Field`/`FieldError`. Nenhum hex/RGB/`text-[`/`bg-[` no arquivo. |
| Valor arbitrário `min-h-[640px]` | **OK, por spec** — único valor arbitrário; dimensão da moldura da tela simulada, prevista na seção "Layout da página", não cor nem quebra de token de tema. Idêntico ao usado nas telas irmãs. |
| `templates-registry.ts` atualizado | **OK** — `recuperacao-senha` está em `templatesList` (linha 18) e **não** aparece mais em `inProgressTemplates`. Movimentação concluída como a spec exigia. |
| Padrão de moldura "Template — …" | **OK** — `<h1>` + parágrafo `text-muted-foreground` + container `w-full rounded-lg border`, igual às telas irmãs / `dashboard-financeiro`. |
| Reuso das telas irmãs | **OK** — mesmo Card `max-w-sm` centralizado, mesmo Badge "Ambiente de demonstração", mesmo padrão de `aria-live` e foco programático; ícone `KeyRoundIcon`/`MailCheckIcon` diferencia visualmente "recuperar" de "entrar" como a spec pediu. |

---

## 2. Acessibilidade — sem bloqueantes

A auditoria (`.build/telas/acessibilidade-recuperacao-senha.md`) aprovou os 6 requisitos acionáveis da spec (itens 1–6). Revisando a severidade de cada item não-"Passa":

| Item da auditoria | Severidade | Justificativa |
|---|---|---|
| **7 — `CardTitle` renderiza `<div>`, não heading semântico** | **Ajuste menor / sistêmico** — não bloqueante | Impacto reconhecidamente maior aqui do que nas irmãs porque o título troca dinamicamente ("Esqueceu sua senha?" → "Verifique seu e-mail") sem ser heading real. **Mas** a mitigação certa está implementada: foco programático no `AlertTitle` (item 2) é a fonte confiável de anúncio da mudança de estado. É comportamento de todo uso de `Card` no projeto; corrigir só aqui geraria inconsistência com o catálogo. |
| **d — `autoFocus` no e-mail pula o cabeçalho de documentação** | **Ajuste menor** — não bloqueante | Não dispara mudança de contexto (não viola WCAG); é fidelidade ao comportamento real da tela. Mesma tensão herdada do padrão de catálogo, já aceita em `login-simples`. |
| **e — ícones decorativos sem `aria-hidden`** (`KeyRoundIcon`, `MailCheckIcon`, `CheckCircle2Icon`, `RotateCcwIcon`) | **Ajuste menor** — não bloqueante | Ícones puramente decorativos; SVG lucide sem `role`/`title` já é ignorado pela maioria dos leitores de tela. Boa prática marcar `aria-hidden`; lacuna de convenção do catálogo, não regressão desta tela. |
| **f — `role="group"` implícito em cada `Field`** | **Ajuste menor** — não bloqueante | Verbosidade extra possível em alguns leitores de tela; grupo sem nome raramente é verbalizado. Herdado de `field.tsx`, replicado fielmente. |
| **g — botão "Reenviar" perde foco ao ser desabilitado durante o clique** (novo) | **Ajuste menor** — não bloqueante | Comportamento nativo do HTML (elemento focado que vira `disabled` joga foco para `<body>`), sistêmico em todo botão com `disabled` ligado a loading síncrono — mesmo padrão do "Entrar"/"Enviar" já aceito. A região `aria-live` "Reenviando..." ainda anuncia a mudança; só a posição do foco fica em `<body>` durante o `setTimeout` de 1200ms. |

**Nenhum bloqueante.** Nenhum item impede o uso real com teclado ou leitor de tela. Os pontos mais delicados desta tela — que a auditoria confirmou resolvidos — são:
- **foco programático na transição para confirmação** (`confirmacaoRef` + `tabIndex={-1}` + `useEffect([enviado])`): como o formulário inteiro é desmontado ao trocar `enviado`, sem esse foco o leitor de tela ficaria "preso" no botão removido. Implementado e sem `aria-live` duplicado ao redor do `Alert` (que já tem `role="alert"` nativo), exatamente como a spec pediu;
- **cooldown do "Reenviar" no nome acessível do botão** ("Reenviar em 00:30") + região `aria-live` anunciando a reativação quando `cooldown === 0`, com a checagem correta de não anunciar prematuramente ao entrar no estado de confirmação;
- **`Spinner` com `aria-hidden="true"`** nos dois botões, eliminando anúncio duplicado com as regiões `aria-live` dedicadas.

---

## 3. Referência na navegação do fluxo — CONFIRMADA

Ordem do fluxo 5A (spec + plano):
`login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`

Ponto importante da spec: esta é a ordem de **construção**, não o caminho linear do usuário. `recuperacao-senha` é destino do link "Esqueci minha senha", não continuação de um login bem-sucedido — e não autentica ninguém.

- **Telas que chegam aqui (de):** `login-simples` (`page.tsx:142`) e `login-erro-validacao` (`page.tsx:266`) — ambas com `<Link href="/templates/recuperacao-senha">` já implementado. Como a spec previu, nenhuma alteração nas telas irmãs foi necessária. **Correto.**
- **Único caminho de volta (para):** "Voltar para login" → `<Link href="/templates/login-simples">`, renderizado como `<a href>` real via `Button asChild`, presente e na mesma posição relativa nos **dois** estados do Card (formulário e confirmação). Volta ao início do fluxo, **não** para `selecao-perfil-corretora` — coerente com "esta tela não autentica ninguém". **Correto.**
- **Sem navegação de rota nos estados de sucesso/erro:** envio válido, envio inválido e reenvio permanecem em `/templates/recuperacao-senha`, só trocando o conteúdo do Card — como a tabela de navegação da spec define. **Correto.**

---

## 4. Decisão de produto pendente (já sinalizada na spec — não é retrabalho)

Levar para o Rafael decidir, mas **não bloqueia** a aprovação desta tela nem a próxima do fluxo:

1. **"Sem estado de e-mail não encontrado"** — a tela sempre segue para a confirmação quando o formato do e-mail é válido, por boa prática de recuperação de senha (evitar enumeração de contas), **não** por instrução explícita do plano. Se o Rafael preferir um caminho didático que mostre esse erro (ambiente fictício, sem risco real), é um estado a mais reaproveitando o `Alert variant="destructive"` de `login-erro-validacao`.

Registrados só como contexto (fora de escopo das 5 telas, sem ação nesta): ausência de uma 6ª rota "definir nova senha" (o clique no link do e-mail é tratado como fora do app) e a duração de 30s do cooldown (valor arbitrário de demonstração, ajustável sem impacto em outras telas).

---

## Recomendação

**Aprovar como pronta e seguir para a próxima tela do fluxo (`selecao-perfil-corretora`).**

A decisão nº 1 acima (mostrar ou não o erro de "e-mail não encontrado") pode ser respondida depois — não trava o avanço, porque não afeta `selecao-perfil-corretora`. As observações de acessibilidade (itens 7, d, e, f, g) são candidatas a um passe único de melhoria **no catálogo inteiro** (Card semântico, `aria-hidden` em ícones decorativos, foco em botões que viram `disabled`), não correções pontuais nesta tela.
