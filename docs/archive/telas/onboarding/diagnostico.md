# Diagnóstico final — `onboarding`

- **Slug:** `onboarding` (5ª e última rota do fluxo 5A — `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 5)
- **Arquivos revisados:** `.build/telas/onboarding.md` (spec), `.build/telas/acessibilidade-onboarding.md` (auditoria), `src/app/templates/onboarding/page.tsx` (código), `src/lib/templates-registry.ts` (registro).
- **Confrontado com:** `src/lib/components-registry.ts`, `src/lib/patterns-registry.ts`, telas vizinhas (`selecao-perfil-corretora` — anterior; `painel-corretor` — próxima, ainda em 5B).
- **Não editei nada em `src/`.** Este diagnóstico é só para o Rafael aprovar ou pedir retrabalho.

---

## Veredito

**PRONTA — encerrando o fluxo 5A, com duas decisões PROVISÓRIAS herdadas para o Rafael ratificar ou reverter antes de entrar na 5B (não são bloqueantes, não são retrabalho).**

A tela cumpre a spec, passa nos 12 requisitos de acessibilidade específicos, usa só peças reais do catálogo, não tem cor/espaçamento hardcoded fora de token, está corretamente registrada e referencia corretamente as telas vizinhas do fluxo. **Não há bloqueantes.**

O ponto de maior atenção não é um defeito da tela e sim uma **decisão de consolidação**: como esta é a última rota de 5A, é o momento certo para o Rafael carimbar (ou reverter) as duas decisões tomadas em **Modo autônomo** que a spec deixou explicitamente marcadas como PROVISÓRIO — persistência entre telas e convenção do `Select` de cenário fora do `Card` — antes das 3 telas de seguros da 5B, que terão bem mais estados de backend fictício. Detalhe na seção 4.

---

## 1. Consistência com o design system — OK

| Verificação | Resultado |
|---|---|
| Só componentes reais do catálogo | **OK** — os 12 componentes importados (Alert, Badge, Button, Card, Checkbox, Field, Input, Label, Progress, Select, Spinner, Switch) constam em `components-registry.ts`. Nenhum componente novo criado. |
| Reuso de Pattern real (não recriação) | **OK** — reaproveita o **mecanismo** do Pattern `multi-step-form` (catalogado em `patterns-registry.ts`, linha 19): Progress + região `aria-live` "Etapa X de Y" + foco programático no heading via `ref`/`tabIndex={-1}`/`.focus()`. Não é cópia do Pattern nem instância direta dele — é o mesmo mecanismo reaplicado com conteúdo de domínio dentro do `Card`, exatamente como a spec e o plano previam ("reaproveita `multi-step-form`"). A Etapa 2 (`Switch` de preferências) segue a composição já validada em `src/components/examples/field-switch.tsx`. |
| Cores/espaçamentos por token | **OK** — a auditoria confirmou: nenhum `#`/`rgb(`/`text-[`/`bg-[` no arquivo. Só tokens/escala Tailwind: `bg-muted/30`, `bg-primary/10`, `text-primary`, `text-muted-foreground` (via `FieldDescription`/`dt`) e `text-destructive` herdado de `Field`/`Alert variant="destructive"`. |
| Valor arbitrário `min-h-[640px]` | **OK, por spec** — único valor arbitrário; dimensão da moldura da tela simulada, idêntica às 4 irmãs. Não é cor nem quebra de token de tema. |
| `templates-registry.ts` atualizado | **OK** — `onboarding` está em `templatesList` (linha 20) e **não** aparece mais em `inProgressTemplates`. Com essa movimentação, `inProgressTemplates` fica só com as 3 telas de 5B (`apolices-ativas`, `novo-sinistro`, `painel-corretor`) — o fluxo 5A está inteiro em `templatesList`. Movimentação concluída como a spec exigia. |
| Padrão de moldura "Template — …" | **OK** — `<h1>` + parágrafo `text-muted-foreground` + container `w-full rounded-lg border`, igual às telas irmãs / `dashboard-financeiro`. |
| Reuso das telas irmãs | **OK** — mesmo painel `bg-muted/30 min-h-[640px]`, mesmo Badge "Ambiente de demonstração", mesmo padrão de `aria-live`/foco programático. Card `max-w-lg` (mais largo que o `max-w-sm` das telas de login e o `max-w-md` de `selecao-perfil-corretora`) é decisão documentada na spec, justificada pelo formulário multi-etapa com `Switch`+descrição. Ícones `RocketIcon`/`PartyPopperIcon` diferenciam "início de jornada"/"conclusão" dos ícones de autenticação/escolha das irmãs, como a spec pediu. |

---

## 2. Acessibilidade — sem bloqueantes

A auditoria (`.build/telas/acessibilidade-onboarding.md`) aprovou os 12 requisitos específicos da spec. Revisando a severidade de cada item não-"Passa limpo":

| Item da auditoria | Severidade | Justificativa |
|---|---|---|
| **1 — tensão `autoFocus` (campo "Nome de exibição") × foco no heading da etapa** | **Passa com ressalva de baixo risco** — não bloqueante | Era o ponto mais delicado da tela — a própria spec pediu os dois comportamentos para o mesmo instante inicial (foco no heading ao entrar na etapa E `autoFocus` no primeiro campo), e só um pode vencer o foco. Resolvido com uma **guarda de primeira renderização** (`primeiraRenderizacao.current`): o `autoFocus` vence só na carga inicial da rota (onde a navegação de URL já dá o contexto de "página nova", mesmo padrão das 4 irmãs); o heading vence em **toda transição real de etapa** (Avançar/Voltar), inclusive ao voltar à Etapa 1 — que é exatamente o caso crítico (troca de conteúdo sem URL nova). A ordem de commit do React (fase síncrona do `autoFocus` sempre antes da fase assíncrona do `useEffect`) torna isso determinístico, não uma corrida de condições. Decisão documentada em comentário no próprio código (`page.tsx:113-130`). Única ressalva: ao voltar para a Etapa 1 o input é focado por uma fração de segundo antes do heading assumir, o que pode gerar um anúncio duplo muito breve em alguns leitores de tela — verbosidade, não falha funcional (o destino final é sempre o heading). |
| **11 — `CardTitle` renderiza `<div>`, não heading semântico** | **Ajuste menor / sistêmico** — não bloqueante | Mesmo gap sistêmico do catálogo já registrado e aceito nas 4 telas irmãs (todo uso de `Card` no projeto). Aqui é **melhor mitigado** que nas irmãs: o `<h3>` de cada etapa é heading real, e o `CardTitle` "Tudo pronto!" recebe foco programático próprio ao entrar no estado de sucesso. Corrigir só aqui geraria inconsistência com o catálogo. A página tem `<h1>` real como âncora. |
| **a — salto de nível de heading `<h1>` → `<h3>`** (sem `<h2>` intermediário) | **Ajuste menor** — não bloqueante, **novo nesta tela** | O `<h3>` é fidelidade ao Pattern `multi-step-form` original (que ali roda isolado numa galeria, sem `<h1>` de página o precedendo). Ao embutir esse `h3` na moldura "Template — …" (que sempre tem seu `<h1>`), o salto aparece pela primeira vez entre as 5 telas de 5A (as anteriores não tinham heading de seção dentro do `Card`). Não impede navegação por headings — o `h3` é encontrado e lido normalmente. Herdado do Pattern reaproveitado, não uma escolha isolada arbitrária. Candidato a refino: rebaixar para `<h2>` no reuso do Pattern dentro de moldura de template. |
| **b — ícones decorativos sem `aria-hidden`** (`RocketIcon`, `PartyPopperIcon`, `CircleAlertIcon`, `RotateCcwIcon`, `ArrowRightIcon`) | **Ajuste menor** — não bloqueante | Mesma lacuna de convenção do catálogo já registrada nas irmãs. SVG lucide sem `role`/`title` já é ignorado pela maioria dos leitores de tela. Exceção correta: o `Spinner` do botão "Concluindo..." recebe `aria-hidden="true"` explícito, evitando anúncio duplicado com a região `aria-live` `sr-only` dedicada. |

**Nenhum bloqueante.** Nenhum item impede o uso real com teclado ou leitor de tela. Os pontos mais delicados desta tela — que a auditoria confirmou resolvidos — são:
- **foco programático no heading a cada troca de etapa** (o caso que a navegação de rota não cobre, porque a etapa muda sem URL nova) coexistindo com o `autoFocus` da Etapa 1 via guarda de primeira renderização;
- **erro de validação da Etapa 1** com `FieldError` (`role="alert"` nativo), `aria-invalid`/`aria-describedby` condicionais e foco no primeiro campo inválido (nome antes de telefone);
- **`Switch` da Etapa 2** com `Label` associado via `htmlFor`/`id` (composição de `field-switch.tsx`), não texto solto;
- **resumo da Etapa 3** com "Ativado"/"Desativado" por extenso, não só ícone/cor (WCAG 1.4.1);
- **foco programático** no `AlertTitle` (erro de sistema, estado 8) e no `CardTitle` "Tudo pronto!" (sucesso, estado 9) — ambas trocas de conteúdo relevantes sem navegação de URL;
- **`CardFooter` (Voltar/Concluir) removido durante o erro de sistema**, deixando só "Tentar novamente" — reduz ambiguidade na ordem de tab.

---

## 3. Referência na navegação do fluxo — CONFIRMADA

Ordem do fluxo 5A (spec + plano):
`login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`

Esta é a **última** rota de 5A — não existe 6ª tela no fluxo de login.

- **Tela que chega aqui (de):** confirmado no código-fonte — `selecao-perfil-corretora` (`page.tsx:177`) já faz `router.push("/templates/onboarding")` no ramo de sucesso do `handleContinuar`, desde que foi construída. Como a spec previu, **nenhuma alteração na tela anterior foi necessária** — `onboarding` só precisava existir na rota certa para o link parar de ser "morto" (a mesma situação em que `selecao-perfil-corretora` esteve até ser construída). **Correto.**
- **Saída final (para):** o CTA "Ir para o Painel do corretor" da tela de boas-vindas (estado 9) é `<Link href="/templates/painel-corretor">` renderizado como `<a href>` real via `Button asChild` (`page.tsx:310-315`). Aponta para uma das 3 telas de 5B, ainda em `inProgressTemplates` — link fica "morto" até a 5B ser construída, **mesma situação** que `onboarding` e `selecao-perfil-corretora` viveram antes de existirem. Não é erro: já aponta para o slug definitivo e passará a resolver quando `painel-corretor` for construída. **Correto e intencional** (portal de corretor de seguros). |
- **Navegação entre etapas (1↔3):** Voltar/Avançar/Concluir só trocam a etapa exibida via estado local, **sem navegação de URL** — como a tabela de navegação da spec define. "Voltar" desabilitado na Etapa 1. **Correto.**
- **Sem link de saída para telas anteriores do fluxo** (login/recuperação/seleção): decisão consciente da spec — uma vez autenticado e com perfil/corretora já confirmados, não faz sentido oferecer "voltar para login" nesta última etapa (diferente das 4 irmãs, que sempre tinham uma saída lateral). **Coerente.**
- **Sem navegação de rota nos estados de erro/sucesso:** validação, erro de sistema, "Tentar novamente" e a troca para a tela de boas-vindas permanecem em `/templates/onboarding`, só trocando o conteúdo do `Card` (mesmo mecanismo `concluido ? ... : ...` do estado "enviado" de `recuperacao-senha`). **Correto.**

---

## 4. Decisões PROVISÓRIAS tomadas em Modo autônomo — para o Rafael consolidar antes da 5B

Estas duas decisões vieram em aberto do diagnóstico de `selecao-perfil-corretora` (seções 4 e 5). O Rafael não estava disponível; foram decididas em Modo autônomo (escolha mais consistente com o que já existe, marcada como PROVISÓRIO, registrada, sem travar a spec). Como esta é a **última tela de 5A**, é o ponto natural para carimbá-las ou revertê-las antes das 3 telas de seguros da 5B.

### Decisão 1 — Persistência da seleção perfil/corretora entre telas: NÃO introduzida (state-local)

- **O que foi decidido:** não introduzir nenhum mecanismo novo (nem query param, nem Context, nem sessão) — mantida a arquitetura 100% state-local que o fluxo inteiro já usa (nenhuma das 5 telas passa dado adiante entre rotas). Efeito prático: a tela de boas-vindas final personaliza só com o **nome de exibição capturado na própria Etapa 1** desta tela (`page.tsx:306`, "Bem-vindo(a), {nomeExibicao}!"), **sem** mencionar o perfil/corretora escolhidos na tela anterior — essa informação não chega aqui.
- **Minha avaliação — razoável e coerente com o precedente:** escolher entre query param/Context/sessão é decisão de **arquitetura de dados que afeta o projeto inteiro**, não só estas 2 telas — não é apropriado que quem planeja composição de tela resolva sozinho. Manter o padrão já estabelecido nas 4 irmãs é a opção conservadora correta. **Não é bloqueante** (a tela funciona e personaliza com dado local).
- **Ponto de atenção para o Rafael:** se quiser personalização real ponta a ponta (ex.: "Bem-vindo, Corretor da Alfa Seguros"), a reversão mais barata é `selecao-perfil-corretora` passar o vínculo via query string (`?perfil=...&corretora=...`) e `onboarding` ler com `useSearchParams` — mudança **isolada nessas 2 telas**, sem propagar para as demais. Vale decidir agora, porque as 3 telas de 5B (painel do corretor, apólices, sinistro) provavelmente vão querer saber "de qual corretora/perfil" o usuário está operando — é o mesmo problema de continuidade de dados, e resolvê-lo já na fronteira 5A→5B evita retrabalho.

### Decisão 2 — Convenção do `Select` "Cenário (demonstração)" fora do `Card`: ratificada e já aplicada

- **O que foi decidido:** o `Select` "Cenário de conclusão (demonstração)" (Sucesso / Falha ao salvar) foi colocado **fora do `Card`** (na moldura de docs, entre o parágrafo de contexto e a tela simulada — `page.tsx:250-266`), controlando só o desfecho do envio final da Etapa 3 (estado 8, erro de sistema). Era exatamente a recomendação do diagnóstico anterior (seção 4: "que o Rafael ratifique o padrão como convenção aceita" + "que as próximas specs já especifiquem o gatilho de antemão") — e foi seguida: a spec **já especificou o gatilho de antemão**, o construtor não precisou improvisar.
- **Minha avaliação — aceitável e bem contido, igual ao precedente:** peça real do catálogo, `Label htmlFor` associado, entra corretamente na ordem de tab, fora da composição do `Card` real, rótulo "(demonstração)" explícito. É a única forma de tornar demonstrável o único estado de backend fictício sem gatilho natural de formulário (o erro de sistema ao concluir). Sem ele, o estado 8 viraria código inalcançável. **Não é bloqueante.**
- **Ponto de atenção para o Rafael:** continua sendo, formalmente, uma decisão de engenharia sem o seu "de acordo" explícito. A 5B terá **bem mais** estados de backend fictício que as telas de login — este é o momento de decidir se essa convenção do `Select` de cenário fica **formalizada para o catálogo inteiro** (documentada no `PLANO-LOOP-80-20-TEMPLATES.md` ou num arquivo de convenções), ou se prefere outra abordagem antes de multiplicá-la por 3 telas mais complexas.

---

## 5. Decisões de produto pendentes (já sinalizadas na spec — não são retrabalho)

Levar para o Rafael, mas **não bloqueiam** a aprovação desta tela nem o avanço para 5B:

1. **Sem pré-carregamento de dados profissionais** — a spec assume a Etapa 1 sempre vazia. Se o produto real pré-popular esses campos a partir de um cadastro existente da corretora (plausível, já que o usuário passou por `selecao-perfil-corretora`), faltaria um estado de carregamento inicial e seu possível erro. Fora de escopo por ora.
2. **Sem opção de "pular configuração inicial"** — decidido não incluir para não inflar a tela. Se o produto permitir concluir o onboarding depois, é uma adição pontual (`Button variant="link"` + `next/link`) que o Rafael pode pedir separadamente.
3. **Erro de sistema modelado só na conclusão (Etapa 3)** — mesma lacuna sistêmica das 4 irmãs: nenhuma tela de 5A modela falha de rede genérica fora do ponto de submissão principal.

---

## Recomendação

**Aprovar como pronta. Isso encerra o fluxo 5A (5/5 telas construídas).**

Antes de partir para a 5B (`apolices-ativas`, `novo-sinistro`, `painel-corretor`), vale o Rafael **consolidar as duas decisões PROVISÓRIAS da seção 4**, porque a 5B vai esbarrar nas duas de novo, em escala maior:
- **Persistência de dados entre telas** (decisão 1) — as telas de seguros provavelmente precisam saber a corretora/perfil ativos; decidir o mecanismo agora, na fronteira 5A→5B, evita retrabalho.
- **Convenção do `Select` de cenário** (decisão 2) — formalizar (ou substituir) antes de multiplicá-la pelas 3 telas de 5B, que terão mais estados de backend fictício.

As observações de acessibilidade (itens 11, a, b) são candidatas a um **passe único de melhoria no catálogo inteiro** (Card/heading semânticos, nível de heading no reuso do `multi-step-form` dentro de moldura de template, `aria-hidden` em ícones decorativos), não correções pontuais nesta tela.
