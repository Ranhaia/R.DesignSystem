# Auditoria mobile retroativa das 7 telas da Fase 5 — 2026-07-28

Não gerado pelo agente `telas-mobile` (ele só existe a partir de hoje, ver
`.claude/agents/telas-mobile.md`) — feito diretamente nesta sessão, rodando
`npm run dev` local e o Chrome de verdade, em resposta ao Rafael reportar que
telas construídas estavam falhando no mobile.

## Causa raiz encontrada

Nenhum dos 4 estágios do pipeline `/construir-telas` (planejador, construtor,
acessibilidade, revisor) roda a aplicação ou olha pra tela — todos trabalham
só por leitura estática de código. `telas-acessibilidade` até declara isso
explicitamente ("Só audita código estático — não roda a aplicação"). Por
causa disso, um bug real de overflow horizontal no mobile passou pelas 4
etapas sem ser pego em nenhuma delas.

## Achado concreto

`dashboard-financeiro` e `apolices-ativas` reaproveitam o componente real
`<Sidebar collapsible="none">` pra simular um "portal" dentro de um Card
(navegação mockada, não é a navegação real do app — essa é a `AppShell`).
`collapsible="none"` desliga todo comportamento responsivo do componente:
ele sempre ocupa `--sidebar-width` (256px) fixos, em qualquer largura de
tela. Nos dois arquivos a `<Sidebar>` tinha só `className="h-full"` — sem
nenhum ajuste pra mobile, então em qualquer viewport abaixo de ~640px o
conteúdo ao lado (`min-w-0 flex-1`) ficava espremido demais e a PÁGINA
INTEIRA ganhava scroll horizontal (confirmado via medição, não só visual:
`document.documentElement.scrollWidth > window.innerWidth`).

As outras 5 telas (todo o fluxo de login — `login-simples`,
`login-erro-validacao`, `recuperacao-senha`, `selecao-perfil-corretora`,
`onboarding`) não usam esse padrão de sidebar mockada e passaram sem
overflow, sem alteração.

## Correção aplicada

`src/app/templates/dashboard-financeiro/page.tsx` e
`src/app/templates/apolices-ativas/page.tsx`: `<Sidebar collapsible="none"
className="h-full">` → `<Sidebar collapsible="none" className="hidden h-full
md:flex">`. A sidebar mockada some abaixo de `md` (768px) — sem perda de
navegação real, porque a navegação de verdade no mobile já é o hambúrguer da
`AppShell`, que continua funcionando normalmente. Confirmado via
`document.documentElement.scrollWidth` que as 7 telas ficam sem overflow em
390×844 depois da correção; visual conferido por screenshot nas 3 telas mais
prováveis de quebrar (`dashboard-financeiro`, `apolices-ativas`,
`login-simples`).

## Achado secundário, não é bug — não mexido

`apolices-ativas` tem uma tabela larga (6 colunas) que, no mobile, aciona o
scroll horizontal *contido* do próprio componente `Table` (`overflow-x-auto`
já embutido em `ui/table.tsx`). Isso é o padrão aceito do shadcn/ui pra
tabela em tela estreita — diferente do bug acima, não vaza pra página
inteira. Não é prioridade agora; se o Rafael quiser um layout alternativo em
cards empilhados pra tabela no mobile, é uma decisão de design nova, não uma
correção deste achado.

## Prevenção — pipeline atualizado

- Novo agente `telas-mobile` (`.claude/agents/telas-mobile.md`): roda a app
  de verdade + Chrome, mede overflow em 390px, screenshot, aponta causa raiz
  no código. Roda em paralelo ao `telas-acessibilidade`, depois do
  `telas-construtor`.
- `telas-planejador` agora exige seção "Requisitos de responsividade" na
  spec de toda tela nova.
- `telas-construtor` agora tem a regra fixa `hidden md:flex` documentada
  pra qualquer sidebar mockada nova.
- `telas-revisor` agora consolida `mobile-<slug>.md` junto de
  `acessibilidade-<slug>.md` — overflow horizontal medido é sempre
  bloqueante, mesmo critério que bloqueante de acessibilidade.
- `/construir-telas` orquestra os 5 estágios agora (era 4).

Válido a partir de agora pras 2 telas restantes de 5B (`novo-sinistro`,
`painel-corretor`) e qualquer tela futura.
