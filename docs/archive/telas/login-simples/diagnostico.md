# Diagnóstico final — `login-simples`

- **Slug:** `login-simples` (1ª de 5 rotas do fluxo 5A — `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 5)
- **Arquivos revisados:** `.build/telas/login-simples.md` (spec), `.build/telas/acessibilidade-login-simples.md` (auditoria), `src/app/templates/login-simples/page.tsx` (código), `src/lib/templates-registry.ts` (registro).
- **Confrontado com:** `src/lib/components-registry.ts`, `PLANO-LOOP-80-20-TEMPLATES.md` (ordem do fluxo 5A).
- **Não editei nada em `src/`.** Este diagnóstico é só para o Rafael aprovar ou pedir retrabalho.

---

## Veredito

**PRONTA.**

A tela cumpre a spec, passa em todos os 8 requisitos de acessibilidade específicos, usa só peças reais do catálogo, não tem cor/espaçamento hardcoded fora de token, está corretamente registrada e referencia corretamente as telas vizinhas do fluxo. `npx tsc --noEmit` rodou limpo. Não há bloqueantes.

As pendências que sobram são: (a) 3 observações de baixo risco herdadas do catálogo (não introduzidas por esta tela) e (b) 2 decisões de produto que já estavam sinalizadas na spec para o Rafael — nenhuma delas impede seguir para a próxima tela do fluxo.

---

## 1. Consistência com o design system — OK

| Verificação | Resultado |
|---|---|
| Só componentes reais do catálogo | **OK** — os 9 componentes importados (Badge, Button, Card, Checkbox, Field, Input, InputGroup, Label, Spinner) constam em `components-registry.ts`. Nenhum componente novo criado. |
| Cores/espaçamentos por token | **OK** — só tokens/escala Tailwind: `bg-muted/30`, `bg-primary/10`, `text-primary`, `text-muted-foreground`, `gap-*`, `size-*`, `max-w-sm`, `p-6`. Nenhum hex/RGB hardcoded. |
| Valor arbitrário `min-h-[640px]` | **OK, por spec** — é o único valor arbitrário; é dimensão de moldura da tela simulada, explicitamente prevista na spec (seção "Layout da página"), não uma cor nem quebra de token de tema. |
| `templates-registry.ts` atualizado | **OK** — `login-simples` está em `templatesList` (rota funcional) e **não** aparece mais em `inProgressTemplates`. Movimentação concluída como a spec exigia. |
| Padrão de moldura "Template — …" | **OK** — `<h1>` + parágrafo `text-muted-foreground` + container `w-full rounded-lg border`, igual ao `dashboard-financeiro` de referência. |

---

## 2. Acessibilidade — sem bloqueantes

A auditoria (`.build/telas/acessibilidade-login-simples.md`) aprovou os 8 requisitos da spec. Revisando a severidade de cada item não-"Passa":

| Item da auditoria | Severidade | Justificativa |
|---|---|---|
| **7 — `CardTitle` renderiza `<div>`, não heading semântico** | **Ajuste menor / sistêmico** — não bloqueante | "Entrar" não é anunciado como título de seção, mas a página tem `<h1>` real ("Template — Login simples") como âncora de navegação. É comportamento de **todo** uso de `Card` no projeto (inclusive `dashboard-financeiro`); corrigir só aqui geraria inconsistência com o catálogo. Decisão de catálogo, não desta tela. |
| **a — `autoFocus` no e-mail pula o cabeçalho de documentação** | **Ajuste menor** — não bloqueante | Não dispara mudança de contexto (não viola WCAG); é fidelidade ao comportamento real da tela de login. Tensão "fidelidade x leiturabilidade da página de docs", herdada do padrão de catálogo. |
| **b — `ShieldCheckIcon` decorativo sem `aria-hidden`** | **Ajuste menor** — não bloqueante | Ícone puramente decorativo; SVG lucide sem `role`/`title` já é ignorado pela maioria dos leitores de tela modernos. Boa prática marcar `aria-hidden`, mas é lacuna de convenção do catálogo (mesmo padrão no `dashboard-financeiro`), não regressão desta tela. |
| **c — `role="group"` implícito em cada `Field`/`InputGroup`** | **Ajuste menor** — não bloqueante | Verbosidade extra possível em alguns leitores de tela; grupos sem nome raramente são verbalizados. Herdado de `field.tsx`/`input-group.tsx`, replicado fielmente. Não impede o uso. |

**Nenhum bloqueante.** Nenhum item impede o uso real com teclado ou leitor de tela. Os dois pontos mais delicados apontados de antemão foram resolvidos corretamente no código:
- botão de mostrar/ocultar senha não rouba foco do campo (`InputGroupAddon` só refoca o input quando o clique não é num `<button>`);
- `Spinner` do botão de envio recebe `aria-hidden="true"` explícito, eliminando anúncio duplicado com a região `aria-live="polite"` dedicada.

---

## 3. Referência na navegação do fluxo — CONFIRMADA

Ordem do fluxo 5A (spec + plano, linhas 1258-1260 do `PLANO-LOOP-80-20-TEMPLATES.md`):
`login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`

- **Tela anterior (de):** nenhuma — `login-simples` é a **entrada** do fluxo (quem chega vem de fora do escopo da Fase 5). Correto não haver link "de".
- **Sucesso do login (para):** `handleSubmit` → `router.push("/templates/selecao-perfil-corretora")` — aponta para o próximo passo real do caminho feliz. **Correto.**
- **"Esqueci minha senha" (para):** `<Link href="/templates/recuperacao-senha">` — vizinha fora do caminho principal, renderizada como `<a href>` real via `Button asChild`. **Correto.**
- **Rotas de destino ainda em `inProgressTemplates`** (`recuperacao-senha`, `selecao-perfil-corretora`): esperado nesta etapa do pipeline — os links já apontam para os slugs definitivos e passarão a resolver quando essas telas forem construídas. Não é erro.

Observação: a tela **não** implementa navegação para `login-erro-validacao` — coerente com a spec, que trata erro de credenciais/validação como responsabilidade daquela rota separada (mesmo componente em outro estado), fora do caminho feliz desta tela.

---

## 4. Decisões de produto pendentes (já sinalizadas na spec — não são retrabalho)

Levar para o Rafael decidir, mas **não bloqueiam** a aprovação desta tela nem a próxima do fluxo:

1. **Rota separada por estado x toggle na mesma rota** — a spec assumiu, por analogia com o padrão do projeto, que "credenciais inválidas" vira a rota separada `login-erro-validacao` em vez de um estado alternável em `login-simples`. Confirmar se é isso mesmo antes de construir `login-erro-validacao`.
2. **Erro de sistema (servidor/timeout) não modelado** — nenhuma das 5 telas do fluxo cobre erro de infraestrutura, só erro de validação. Se importar para o case público, é 6ª tela ou estado extra — fora do escopo atual.

---

## Recomendação

**Aprovar como pronta e seguir para a próxima tela do fluxo (`login-erro-validacao`).**

Antes de construir a próxima, vale o Rafael responder a decisão nº 1 acima (rota separada x toggle de estado), porque ela define diretamente o formato de `login-erro-validacao`. As observações de acessibilidade (itens 7, a, b, c) são candidatas a um passe único de melhoria **no catálogo inteiro** (Card semântico, `aria-hidden` em ícones decorativos), não correções pontuais nesta tela.
