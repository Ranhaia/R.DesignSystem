# Especificação de tela — Onboarding

- **Slug:** `onboarding` (`src/lib/templates-registry.ts`, hoje em `inProgressTemplates`; mover para `templatesList` só depois de construída)
- **Rota:** `src/app/templates/onboarding/page.tsx`
- **Fluxo:** Fase 5A — Fluxo de login (`PLANO-LOOP-80-20-TEMPLATES.md`, seção "Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público")
- **Posição no fluxo:** 5ª e última rota — `login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`
- **Referência de estilo/estrutura:** `src/app/templates/dashboard-financeiro/page.tsx` (título "Template — …" + parágrafo de contexto no topo, container `w-full rounded-lg border`) e, mais diretamente, `src/app/templates/login-simples/page.tsx` / `login-erro-validacao/page.tsx` / `recuperacao-senha/page.tsx` / `selecao-perfil-corretora/page.tsx` — mesmo Card centralizado num painel `bg-muted/30 min-h-[640px]`, mesmo Badge "Ambiente de demonstração", mesmo padrão de foco programático/`aria-live`.
- **Reaproveita o Pattern `multi-step-form.tsx`** (`src/components/patterns/multi-step-form.tsx`, catalogado em `src/lib/patterns-registry.ts`), conforme já previsto no plano (linha "5A — Fluxo de login... onboarding (reaproveita `multi-step-form`)"): não é uma cópia do componente do Pattern, é o mesmo **mecanismo** (Progress + região `aria-live` "Etapa X de Y" + foco programático no heading de cada etapa via `ref`/`tabIndex={-1}`/`.focus()` + `Field`/`Input`/`Select` por etapa + navegação Voltar/Avançar) reaplicado com conteúdo do domínio de onboarding de corretor, dentro do mesmo invólucro visual (`Card`) das 4 telas irmãs — igual ao que `dashboard-financeiro` já fez com Atoms/Molecules confirmados: reaproveitar, não recriar.
- **Depende da especificação e do diagnóstico da tela anterior:** `.build/telas/selecao-perfil-corretora.md` e `.build/telas/diagnostico-selecao-perfil-corretora.md` — as seções 4 e 5 do diagnóstico levantam duas decisões em aberto que afetam diretamente esta spec; resolvidas aqui em Modo autônomo (ver "Lacunas" no fim deste documento — ambas marcadas como **provisórias**, para o Rafael ratificar ou reverter).

## Onde esta tela se encaixa

Última tela do fluxo 5A. Confirmado no código-fonte: `selecao-perfil-corretora/page.tsx` (linha 177) já faz `router.push("/templates/onboarding")` no ramo de sucesso do `handleContinuar` — nenhuma alteração necessária na tela anterior, esta tela só precisa existir na rota certa para o link parar de ser "morto" (mesma situação que a própria `selecao-perfil-corretora` estava até ser construída).

Depois desta tela, o fluxo 5A termina — não existe 6ª rota na Fase 5A. O CTA final desta tela ("Ir para o Painel do corretor") aponta para `painel-corretor`, uma das 3 telas de seguros da Fase 5B (`src/lib/templates-registry.ts`, ainda em `inProgressTemplates`). Isso é intencional e coerente com o domínio (portal de corretor de seguros) — ver "Navegação" e "Lacunas".

## Objetivo da tela

Depois de autenticado e com o vínculo perfil+corretora já escolhido, guiar o usuário por uma configuração inicial rápida (completar dados profissionais, definir preferências de notificação, confirmar aceite dos termos) antes de liberar o acesso ao portal — sem repetir nada que as telas anteriores já resolveram (autenticação e escolha de vínculo).

## Estados que esta tela precisa cobrir

1. **Etapa 1 de 3 — Dados profissionais, vazio/inicial** — campos "Nome de exibição" e "Telefone" vazios, "Cargo/função" sem seleção; `Progress` em ~33%; foco movido para o heading da etapa ao entrar (mesmo mecanismo do `multi-step-form.tsx`).
2. **Preenchendo (qualquer etapa)** — usuário digitando/selecionando normalmente; nenhum estado visual especial além do foco padrão dos Atoms.
3. **Erro de validação — Etapa 1** — ao clicar "Avançar" com "Nome de exibição" vazio e/ou "Telefone" vazio ou em formato inválido: mensagem inline abaixo de cada campo, foco no primeiro campo inválido. "Cargo/função" é opcional, sem validação.
4. **Etapa 2 de 3 — Preferências de notificação** — três `Switch` (e-mail, push, SMS), todos com estado binário válido em qualquer combinação (nenhuma validação possível nesta etapa); "Notificações por e-mail" vem ligado por padrão (mesmo canal já usado no login), os outros dois desligados.
5. **Etapa 3 de 3 — Revisão e confirmação** — resumo somente leitura dos dados da etapa 1 + preferências da etapa 2, mais um `Checkbox` obrigatório "Li e aceito os Termos de Uso e a Política de Privacidade".
6. **Erro de validação — Etapa 3** — clicar "Concluir" sem marcar o `Checkbox` de termos: mensagem inline abaixo do campo, foco movido para o `Checkbox`.
7. **Enviando (concluindo o onboarding)** — depois de "Concluir" com termos aceitos: campos/switches/checkbox desabilitados, botão mostra Spinner + "Concluindo...", região `aria-live` anuncia a mudança — mesmo padrão de todas as telas irmãs.
8. **Erro de sistema ao concluir** — o envio final (backend fictício) falha: `Alert` destrutivo substitui o resumo da etapa 3, com botão "Tentar novamente" que reenvia (volta ao estado 7). Sem campo de formulário natural para disparar esse desfecho (diferente da validação de campo) — ver "Composição, Estado 8" e "Lacunas" para o gatilho de demonstração.
9. **Sucesso** — envio concluído: todo o conteúdo do `Card` troca (sem navegar de rota, mesmo mecanismo do estado "enviado" de `recuperacao-senha`) para uma tela de boas-vindas com CTA "Ir para o Painel do corretor", que aí sim navega para fora desta rota.

Fora de escopo, registrar como responsabilidade de fora destas 5 telas:
- Pré-carregar dados profissionais já existentes de um cadastro anterior (esta spec assume campos sempre vazios ao entrar — não há estado de "carregando dados prévios" nem seu possível erro).
- Persistir o que foi escolhido em `selecao-perfil-corretora` (perfil/corretora) até esta tela → ver "Lacunas", decisão provisória tomada.
- Opção de "pular" a configuração inicial → não incluída, ver "Lacunas".

## Composição — só peças reais do catálogo

Nenhum componente novo. Tudo abaixo já existe em `src/components/ui/` (Atoms/Molecules/Organisms confirmados em `src/lib/atomic-registry.ts`) ou é o mecanismo do Pattern `multi-step-form.tsx` (`src/lib/patterns-registry.ts`) reaplicado dentro do invólucro `Card` já usado pelas 4 telas irmãs.

### Layout da página (moldura, mesmo padrão das telas irmãs)

- `<h1>` "Template — Onboarding" + parágrafo `text-muted-foreground` de contexto.
- Container `w-full rounded-lg border` com `div` interno `bg-muted/30 flex min-h-[640px] items-center justify-center p-6` — mesma moldura das 4 telas anteriores.
- Card `max-w-lg` (mais largo que o `max-w-sm` das telas de login puras, pela mesma razão que `selecao-perfil-corretora` usou `max-w-md`: conteúdo de formulário multi-etapa com `Switch`+descrição, não só campos de 1 coluna estreita).

### Painel — Organism `card.tsx`

- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
  - `CardHeader`: `Badge variant="outline"` "Ambiente de demonstração" (igual às telas irmãs) + círculo de ícone decorativo (`bg-primary/10 text-primary`) com `RocketIcon` (lucide-react, confirmado em `lucide-react.d.ts` — ícone diferente de `ShieldCheckIcon`/`KeyRoundIcon`/`MailCheckIcon`/`UserCogIcon` já usados nas telas irmãs, reforça "início de jornada" em vez de autenticação/escolha).
  - `CardTitle` "Vamos configurar sua conta" + `CardDescription` "Só mais alguns passos antes de acessar o portal".

### Progresso e cabeçalho de etapa (mecanismo do Pattern `multi-step-form.tsx`)

- Atom `progress.tsx` (`Progress value={((step + 1) / 3) * 100}`) — usa `Progress.Root` do Radix por baixo, que já expõe `role="progressbar"`/`aria-valuenow`/`aria-valuemax` nativamente (confirmado no código-fonte).
- Região auxiliar (mesma do Pattern): `<p aria-live="polite" className="text-muted-foreground text-xs">Etapa {step + 1} de 3: {nomeDaEtapa}</p>`.
- Heading da etapa: `<h3 ref={headingRef} tabIndex={-1}>{nomeDaEtapa}</h3>`, com `React.useEffect` que chama `.focus()` a cada mudança de `step` — idêntico ao `headingRef` do `multi-step-form.tsx`.
- Nomes das 3 etapas: "Dados profissionais", "Preferências de notificação", "Revisão e confirmação".

### Etapa 1 — Dados profissionais

- Molecule `field.tsx` (`Field`, `FieldLabel`) + Atom `input.tsx` (`Input`) — "Nome de exibição" (obrigatório, `autoFocus` na entrada da etapa 1).
- Molecule `field.tsx` + Atom `select.tsx` (`Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`) — "Cargo/função" (opcional, sem validação): "Corretor", "Gestor", "Analista" — mesmo vocabulário de perfil já usado em `selecao-perfil-corretora` (sem repetir os mesmos valores por dado real, só a mesma taxonomia de domínio).
- Molecule `field.tsx` + Atom `input.tsx` (`Input type="tel"`) — "Telefone" (obrigatório, validação de formato simples via regex, mesmo espírito do `EMAIL_REGEX` já usado nas telas irmãs).
- Erro de validação (estado 3): `Field data-invalid` + Molecule `field.tsx` (`FieldError`, `role="alert"` embutido) abaixo de cada campo inválido, `aria-invalid`/`aria-describedby` no `Input`, foco programático no primeiro campo inválido (nome antes de telefone, ordem visual) — mesmo padrão de `login-erro-validacao`.

### Etapa 2 — Preferências de notificação

Composição validada por um exemplo já existente no catálogo (`src/components/examples/field-switch.tsx`) — não inventada para esta tela:

```
<Field orientation="horizontal">
  <FieldContent>
    <FieldLabel htmlFor="notif-email">Notificações por e-mail</FieldLabel>
    <FieldDescription>Receba avisos de apólices e sinistros no seu e-mail corporativo.</FieldDescription>
  </FieldContent>
  <Switch id="notif-email" checked={notifEmail} onCheckedChange={setNotifEmail} />
</Field>
```

Repetido para "Notificações push" (`notif-push`) e "Alertas por SMS" (`notif-sms`) — Molecule `field.tsx` (`Field`, `FieldContent`, `FieldLabel`, `FieldDescription`) + Atom `switch.tsx` (`Switch`). Sem estado de erro (qualquer combinação é válida).

### Etapa 3 — Revisão e confirmação

- `<dl>` resumindo os dados capturados (mesmo padrão do `multi-step-form.tsx`, `<dt>`/`<dd>` em grid): Nome de exibição, Cargo/função, Telefone, e as 3 preferências de notificação (texto "Ativado"/"Desativado" por canal, não só um ícone — ver "Requisitos de acessibilidade").
- Atom `checkbox.tsx` (`Checkbox`) + Atom `label.tsx` (`Label htmlFor`) — "Li e aceito os Termos de Uso e a Política de Privacidade" (obrigatório). Sem link para uma tela de Termos/Privacidade real (não existe na Fase 5) — texto estático, mesmo princípio já usado no `CardFooter` de `login-simples` para não prometer navegação inexistente.
- Erro de validação (estado 6): Molecule `field.tsx` (`FieldError`) abaixo do `Checkbox`, foco programático nele ao falhar.

### Estado 7 — Enviando (concluindo)

- Atom `button.tsx` ("Concluir" na etapa 3, "Avançar" nas etapas 1-2 — mesma troca de rótulo do `multi-step-form.tsx`): `disabled`, conteúdo troca para Atom `spinner.tsx` (`Spinner aria-hidden="true"`) + "Concluindo...", região `aria-live="polite"` `sr-only` — mesmo padrão das 4 telas irmãs.
- Todos os campos/`Switch`/`Checkbox` da etapa atual desabilitados durante o envio.

### Estado 8 — Erro de sistema ao concluir

Não existe campo de formulário natural para simular esse desfecho (diferente da validação de campo) — mesma situação identificada em `selecao-perfil-corretora` (busca de vínculos). Decisão provisória tomada aqui (ver "Lacunas", item 2): reaplicar o `Select` "Cenário de conclusão (demonstração)" fora do `Card`, mesma posição/padrão já usado em `selecao-perfil-corretora` (entre o parágrafo de contexto e a moldura da tela simulada):

```
<Label htmlFor="cenario-conclusao">Cenário de conclusão (demonstração)</Label>
<Select value={cenario} onValueChange={setCenario}>
  <SelectTrigger id="cenario-conclusao" size="sm" className="w-56"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="sucesso">Sucesso</SelectItem>
    <SelectItem value="falha">Falha ao salvar</SelectItem>
  </SelectContent>
</Select>
```

Controla só o desfecho do envio final da etapa 3 (não interfere na validação de campo nem na navegação entre etapas 1-2). Se `cenario === "falha"`: Molecule `alert.tsx` (`Alert variant="destructive"`, `AlertTitle`, `AlertDescription`) substitui o resumo (`<dl>`) da etapa 3, mesmo padrão de foco já usado em `login-erro-validacao`/`recuperacao-senha`/`selecao-perfil-corretora` (`ref` + `tabIndex={-1}` + `.focus()` no `AlertTitle`):

```
<Alert variant="destructive">
  <CircleAlertIcon />
  <AlertTitle ref={erroRef} tabIndex={-1}>Não foi possível concluir sua configuração</AlertTitle>
  <AlertDescription>Verifique sua conexão e tente novamente.</AlertDescription>
</Alert>
```

Atom `button.tsx` (`Button variant="outline"`, `RotateCcwIcon`) "Tentar novamente" — reenvia (volta ao estado 7).

### Estado 9 — Sucesso (tela de boas-vindas)

Todo o `CardHeader`/`CardContent`/`CardFooter` trocam de conteúdo (mesmo mecanismo condicional `enviado ? ... : ...` já usado em `recuperacao-senha/page.tsx`), sem navegar de rota:

- Círculo de ícone decorativo com `PartyPopperIcon` (lucide-react, confirmado).
- `CardTitle` "Tudo pronto!" + `CardDescription` "Sua conta está configurada. Você já pode acessar o portal." — `CardTitle` recebe `ref`/`tabIndex={-1}` e foco programático ao entrar neste estado (mesmo mecanismo do `confirmacaoRef` em `recuperacao-senha`, necessário porque é uma troca de conteúdo relevante sem troca de URL).
- Personalização: "Bem-vindo(a), {nomeExibicao}!" usando o valor capturado na Etapa 1 desta própria tela (dado local, capturado aqui — diferente da lacuna de persistência entre telas, ver "Lacunas" item 1).
- Atom `button.tsx` (`Button type="button" fullWidth`, `ArrowRightIcon`) "Ir para o Painel do corretor" — navega para `/templates/painel-corretor`.

### Ações de navegação entre etapas (`CardFooter`, presente nas etapas 1-3, ausente na tela de boas-vindas)

- Atom `button.tsx` (`Button variant="outline"`) "Voltar" — `disabled` na etapa 1 (`step === 0`), mesmo comportamento do `multi-step-form.tsx`.
- Atom `button.tsx` (`Button type="submit"`) "Avançar" (etapas 1-2) / "Concluir" (etapa 3) — mesma troca condicional de rótulo do Pattern original.
- Layout `flex justify-between`, mesma disposição do Pattern (Voltar à esquerda, Avançar/Concluir à direita).

## Navegação

| Ação/link | Destino | Observação |
|---|---|---|
| Chegada nesta tela (perfil/corretora confirmados) | — | Já cablada: `selecao-perfil-corretora` navega para `/templates/onboarding` desde que foi construída — nada a alterar nela. |
| Botão "Voltar" (etapas 2-3) | Permanece em `/templates/onboarding` | Só muda a etapa exibida, sem navegação de rota. Desabilitado na etapa 1. |
| Botão "Avançar" (etapas 1-2, válido) | Permanece em `/templates/onboarding` | Avança para a próxima etapa. |
| Botão "Avançar" (etapa 1, inválido) | Permanece em `/templates/onboarding` | Exibe erro de validação de campo (estado 3), sem avançar. |
| Botão "Concluir" (etapa 3, termos aceitos, cenário = sucesso) | Permanece em `/templates/onboarding` | Envia, mostra estado de carregando, depois troca para a tela de boas-vindas (sem navegação de URL). |
| Botão "Concluir" (etapa 3, termos não aceitos) | Permanece em `/templates/onboarding` | Exibe erro de validação (estado 6), sem enviar. |
| Botão "Concluir" (etapa 3, termos aceitos, cenário = falha ao salvar) | Permanece em `/templates/onboarding` | Exibe erro de sistema (estado 8), sem trocar para a tela de boas-vindas. |
| Botão "Tentar novamente" (erro ao concluir) | Permanece em `/templates/onboarding` | Reenvia (volta ao estado de carregando). |
| Botão "Ir para o Painel do corretor" (tela de boas-vindas) | `/templates/painel-corretor` | Fim do fluxo 5A. Rota ainda não construída (Fase 5B, `inProgressTemplates`) — mesma situação que `onboarding` estava até esta spec, e que `selecao-perfil-corretora` também esteve antes dela. |
| Nenhum link de saída para telas anteriores do fluxo (login/recuperação/seleção) | — | Decisão desta spec: uma vez autenticado e com perfil/corretora já confirmados, não faz sentido oferecer "voltar para login" nesta última etapa — diferente das 4 telas anteriores, que sempre tinham uma saída lateral (Esqueci minha senha / Voltar para login / Usar outra conta). |

## Requisitos de acessibilidade específicos desta tela

1. **Foco programático no heading de cada etapa** (`h3 ref={headingRef} tabIndex={-1}`) a cada mudança de `step` — mecanismo idêntico ao `multi-step-form.tsx`, indispensável porque a troca de etapa não navega de rota (sem isso, quem usa leitor de tela permanece com foco no botão "Avançar" sem perceber que o conteúdo mudou).
2. **Região `aria-live="polite"` anunciando "Etapa X de 3: {nome}"** a cada transição, complementando o `Progress` visual — mesmo texto do Pattern original, adaptado para 3 etapas nomeadas do domínio de onboarding.
3. **Erro de validação — Etapa 1**: `FieldError` (`role="alert"` nativo) por campo, `aria-invalid`/`aria-describedby` no `Input`, foco programático no primeiro campo inválido (nome antes de telefone) — mesmo padrão já auditado em `login-erro-validacao`.
4. **Cada `Switch` da Etapa 2 precisa de `Label` associado via `htmlFor`/`id`** (`field-switch.tsx` já garante isso pela composição `FieldLabel htmlFor` + `Switch id`) — o texto do canal ("Notificações por e-mail" etc.) não pode ficar solto ao lado do controle sem associação formal, senão o nome acessível do `Switch` fica vazio ou ambíguo para quem usa leitor de tela.
5. **Resumo da Etapa 3 não pode depender só de ícone para indicar ligado/desligado**: cada preferência de notificação no `<dl>` precisa do texto "Ativado"/"Desativado" por extenso (WCAG 1.4.1, mesmo princípio já aplicado ao nome da corretora em `selecao-perfil-corretora` — não usar só cor/ícone como única fonte da informação).
6. **`Checkbox` de aceite dos termos**: `Label` associado via `htmlFor`/`id` (mesma exigência já auditada no "Manter-me conectado" de `login-simples`); erro de validação via `FieldError` (`role="alert"`) com foco programático no próprio `Checkbox` ao falhar — o controle que precisa ser corrigido é a marcação em si, não uma mensagem solta.
7. **Erro de sistema ao concluir (estado 8)**: foco programático no `AlertTitle` ao entrar nesse estado (`ref` + `tabIndex={-1}` + `.focus()`), mesmo mecanismo já auditado em `login-erro-validacao`/`recuperacao-senha`/`selecao-perfil-corretora`.
8. **Transição para a tela de boas-vindas (estado 9) precisa de foco programático no `CardTitle` "Tudo pronto!"** (`ref`/`tabIndex={-1}`/`.focus()`) — é uma troca de conteúdo relevante sem navegação de URL, mesmo mecanismo já auditado no `confirmacaoRef` de `recuperacao-senha`.
9. **`Select` "Cenário de conclusão (demonstração)"**: precisa de `Label htmlFor` associado e entrar corretamente na ordem de tab — mesma exigência já auditada no `Select` "Cenário da busca (demonstração)" de `selecao-perfil-corretora` (auditoria item a daquela tela).
10. **Ordem de foco (tab order) dentro de cada etapa** deve seguir a ordem visual (campos → Voltar → Avançar/Concluir), sem `tabIndex` manual além dos `ref`s de foco programático já listados acima — mesma exigência das 4 telas irmãs.
11. **Gap conhecido do catálogo, não introduzido por esta tela**: `CardTitle` (`card.tsx`) renderiza uma `<div>`, não um heading semântico — já registrado como gap sistêmico em `login-simples.md` e reconfirmado em todas as telas seguintes; aqui o `<h3>` de cada etapa e o `CardTitle` "Tudo pronto!" (que recebe foco programático próprio) mitigam parcialmente, mas não resolvem o gap do `Card` em si.
12. **Botões "Avançar"/"Concluir"/"Voltar"/"Tentar novamente"/"Ir para o Painel do corretor" nunca ficam sem rótulo de texto visível** (nenhum ícone-only) — mesmo princípio de não depender só de ícone para comunicar a ação, já aplicado ao restante do fluxo.

## Lacunas para o Rafael decidir (não resolvidas aqui)

Duas decisões vieram em aberto do diagnóstico de `selecao-perfil-corretora` (seções 4 e 5). Rafael não estava disponível — decididas aqui em Modo autônomo (`PLANO-LOOP-80-20-TEMPLATES.md`, linhas ~54-70: decisão mais consistente com o que já existe, marcada como provisória, registrada aqui, sem travar a spec). Ambas ficam **provisórias**, revisão pendente:

1. **PROVISÓRIO — Persistência da seleção perfil/corretora entre `selecao-perfil-corretora` e `onboarding`**: decidido **não** introduzir nenhum mecanismo novo (nem query param, nem Context, nem sessão) — esta spec mantém a mesma arquitetura 100% state-local já usada nas 4 telas anteriores do fluxo inteiro (nenhuma delas passa dado adiante entre rotas até hoje). Efeito prático: a tela de boas-vindas final (estado 9) personaliza só com o nome de exibição capturado **na própria etapa 1 desta tela** (dado local, sem depender do que veio antes) — não menciona o perfil/corretora escolhidos na tela anterior, porque essa informação não chega aqui. **Por que decidi assim, não inventando um mecanismo**: escolher entre query param/Context/sessão é decisão de arquitetura de dados que afeta o projeto inteiro (não só estas 2 telas) — não é apropriado para quem só planeja composição de tela resolver sozinho. Se o Rafael quiser personalizar de fato (ex: "Bem-vindo, Corretor da Corretora Alfa Seguros"), a forma mais barata de reverter é a `selecao-perfil-corretora` passar o vínculo escolhido via query string (`?perfil=...&corretora=...`) e esta tela ler via `useSearchParams` — mudança isolada nas 2 telas, sem propagar para as demais.
2. **PROVISÓRIO — Convenção do `Select` de cenário (demonstração) fora do `Card`**: ratificada aqui como padrão aceito (era exatamente a recomendação do diagnóstico da tela anterior, seção 4, item 1: "o Rafael ratifique explicitamente o padrão... como convenção aceita") e já **especificada de antemão** nesta spec (seção 4, item 2 do mesmo diagnóstico: "as próximas specs... já especifiquem o gatilho de demonstração de antemão") — usada aqui só para o único estado de backend fictício sem gatilho natural de formulário (erro de sistema ao concluir, estado 8). Continua sendo, formalmente, uma decisão de engenharia tomada sem o "de acordo" explícito do Rafael — ele ainda precisa confirmar se quer essa convenção formalizada para o catálogo inteiro (por exemplo, documentada em `PLANO-LOOP-80-20-TEMPLATES.md` ou num arquivo de convenções), ou se prefere outra abordagem para as 3 telas de seguros da Fase 5B, que terão bem mais estados de backend fictício do que as telas de login.
3. **Destino final "Painel do corretor" ainda não construído**: o CTA "Ir para o Painel do corretor" (estado 9) aponta para `/templates/painel-corretor`, que só existe como slug em `inProgressTemplates` (Fase 5B) até ser construído — não bloqueia esta tela (mesma situação que `onboarding` viveu antes desta spec), mas o link fica "morto" até lá.
4. **Sem opção de "pular configuração inicial"**: decidido não incluir, para não expandir o escopo desta tela sem pedido explícito (mesmo princípio de "não inflar a tela além do que o objetivo pede" já usado em `selecao-perfil-corretora` para justificar a ausência de campo de busca). Se o produto real permitir concluir o onboarding depois, é uma adição pontual (um link "Concluir depois", mesmo padrão de `Button variant="link"` + `next/link` já usado nas telas irmãs) que o Rafael pode pedir separadamente.
5. **Sem estado de "carregando dados profissionais pré-existentes"**: esta spec assume que a Etapa 1 sempre começa vazia. Se o produto real pré-popular esses campos a partir de um cadastro já existente da corretora (cenário plausível, já que o usuário passou por `selecao-perfil-corretora` antes), seria necessário um estado de carregamento inicial (e seu possível erro) — não coberto aqui, mesmo tipo de lacuna já registrado como "fora de escopo" nas telas irmãs.
6. **Erro de sistema no envio final é modelado só na Etapa 3** (conclusão do onboarding) — mesma lacuna sistêmica já registrada nas 4 telas irmãs: nenhuma tela do fluxo 5A modela falha de rede genérica fora do ponto de submissão principal de cada uma.
