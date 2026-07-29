# Verificação mobile — novo-sinistro

Rota: `/templates/novo-sinistro`
Servidor: `npm run dev` já rodando em `localhost:3001` (reaproveitado desta
sessão, respondeu 200 antes de qualquer nova inicialização — não foi preciso
subir servidor novo nem limpar `.next`).

## Veredito: **passa com ressalva**

Nenhum overflow horizontal foi medido em nenhum dos 3 passos do wizard, no
diálogo de confirmação nem no estado de erro de sistema. A ressalva é sobre
a largura de viewport efetivamente testada — ver "Limitação de ambiente"
abaixo, que também explica por que o veredito não é um "passa" sem
qualificação apesar de nenhum problema ter sido encontrado.

## Limitação de ambiente (importante, leia antes do resto)

O `resize_window` para 390×844 **não convergiu para 390 nesta sessão** —
cada tentativa de redimensionar a janela do Chrome ficou presa numa largura
maior (`window.innerWidth` observado: 607, 574, 588, 1309, 1612 em
tentativas sucessivas, mesmo pedindo 390, 320 e 250). Não é uma limitação
permanente da ferramenta: `.build/telas/RETROATIVO-MOBILE.md` (2026-07-28,
mesma data, sessão anterior) registra que o mesmo `resize_window` chegou em
exatos 390×844 e confirmou `scrollWidth`/`innerWidth` nessa largura para as
7 telas da Fase 5. Nesta sessão o comportamento foi instável — meça de novo
com a ferramenta antes de assumir que é preciso investigar o app.

Dado isso, a tela foi testada na menor largura que a ferramenta conseguiu
sustentar de fato nesta sessão (~574–623px, variando por tentativa), não em
390px exatos. Ainda assim:

- 574–623px já está abaixo do breakpoint `md` (768px) do Tailwind, que é o
  breakpoint que controla o único padrão de risco conhecido nesta tela (ver
  abaixo) — então o comportamento observado nesse intervalo é representativo
  do que aconteceria em 390px **para esse padrão específico**.
- Para os demais elementos, complementei a medição com leitura de código
  (`src/app/templates/novo-sinistro/page.tsx`) para confirmar que as classes
  usadas são mobile-first (começam em 1 coluna / largura total e só crescem
  em `sm:`/`md:`), então não há motivo estrutural para overflow aparecer
  especificamente entre 390 e 574px.
- Recomendo ao `telas-revisor`/Rafael repetir a medição em exatos 390px
  quando o `resize_window` voltar a se comportar normalmente (é reproduzível
  segundo o histórico), como confirmação final antes de fechar a tela
  como "passa" sem ressalva.

## Métrica de overflow medida

Medido via `document.documentElement.scrollWidth > window.innerWidth` em
cada passo, na largura efetiva do teste (574–607px conforme a tentativa):

| Estado | innerWidth | scrollWidth | overflow |
|---|---|---|---|
| Etapa 1 — Dados do sinistro | 607 | 592 | false |
| Etapa 1 — Select "Apólice relacionada" aberto | 607 | 592 | false |
| Etapa 1 — Popover de data aberto | 607 | 592 | false |
| Etapa 2 — Anexar documentos (vazio) | 607 | 592 | false |
| Etapa 2 — com anexo concluído | 607 | 592 | false |
| Etapa 3 — Revisão e confirmação | 607 | 592 | false |
| Etapa 3 — AlertDialog "Confirmar abertura do sinistro?" | 574 | — (verificado por screenshot) | sem overflow visível |
| Etapa 3 — Alert de erro de sistema ("Não foi possível protocolar") | 574 | 559 | false |

Nenhum estado mediu `scrollWidth > innerWidth`.

## Screenshots capturados (não salvos em disco, descritos abaixo)

1. **Etapa 1, formulário vazio** (607×693): Select "Apólice relacionada",
   RadioGroup "Tipo de sinistro" com 5 opções, campo de data, textarea de
   descrição — tudo em coluna única, largura total, sem sidebar mockada
   visível (corretamente escondida abaixo de `md`).
2. **Etapa 1, Select aberto**: dropdown do Radix cabe dentro da largura da
   viewport, opções com texto longo (ex: "AP-1098 — Marina Prado —
   Residencial") não cortam nem forçam scroll lateral.
3. **Etapa 1, Popover de calendário aberto**: grid do `Calendar` cabe
   inteiro dentro da viewport, sem cortar dias da semana.
4. **Etapa 1, formulário preenchido**: data exibida por extenso
   ("terça-feira, 28 de julho de 2026") sem truncar, apesar da classe
   `truncate` no botão do trigger.
5. **Etapa 2, dropzone vazia**: ícone + texto centralizados, sem overflow.
6. **Etapa 2, com anexo concluído**: card do `Attachment` (nome do arquivo +
   estado "Concluído" + botão remover) cabe na largura, sem cortar nome de
   arquivo.
7. **Etapa 3, revisão**: a lista de definição (`dl`) que no desktop usa
   `sm:grid-cols-2` colapsa corretamente para 1 coluna abaixo de `sm`
   (640px) — rótulo em cima, valor embaixo, para cada campo. Sem overflow.
8. **Etapa 3, AlertDialog de confirmação**: título, descrição e os 2 botões
   (`Confirmar envio` / `Revisar novamente`) empilhados verticalmente,
   dentro da largura da tela, sem cortar texto.
9. **Etapa 3, cenário "Falha ao protocolar"**: `Alert` destrutivo com ícone,
   título e descrição + botão "Tentar novamente" full-width — layout limpo,
   sem overflow, sem sobreposição com o restante do card.

Não foi necessário chegar até a tela de sucesso (fora do escopo pedido — só
troquei o cenário de demonstração para "Falha" porque essa é a única
mudança de estado que altera o layout do passo 3, não só o texto).

## Por que não há o bug conhecido de sidebar mockada

Código em `src/app/templates/novo-sinistro/page.tsx`, linha 380:

```tsx
<Sidebar collapsible="none" className="hidden h-full md:flex">
```

Já tem `hidden md:flex` — exatamente a correção documentada em
`RETROATIVO-MOBILE.md` para `apolices-ativas`/`dashboard-financeiro`. Essa
tela foi construída depois dessa correção já ter virado regra fixa no
`telas-construtor`, então nasceu correta nesse ponto. Confirmado
visualmente: abaixo de `md` a sidebar mockada ("Portal do corretor" com
Painel/Apólices/Sinistros) não aparece, e não há espaço fixo de 256px
reservado para ela.

## Outros pontos de código verificados (mobile-first, sem risco)

- Trigger do DatePicker (linha 576): `"w-full justify-start ... sm:w-[280px]"`
  — começa `w-full`, só ganha largura fixa em `sm:` (640px) para cima. Sem
  risco de largura fixa forçando overflow em mobile.
- Grid de revisão (linha 758): `"grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2"`
  — mobile-first, confirmado visualmente colapsando para 1 coluna.
- Rodapé da tela de sucesso (linha 446): `"flex flex-col gap-2 sm:flex-row sm:justify-end"`
  — botões empilham em mobile, não testado visualmente (não cheguei no
  estado de sucesso), mas o padrão de classe é o mesmo já validado em outras
  telas da Fase 5.
- `CardHeader` (linha 417): `"flex flex-row flex-wrap items-center justify-between gap-3"`
  — tem `flex-wrap`, então o badge "Ambiente de demonstração" ao lado do
  título pode quebrar linha em vez de forçar overflow; comportamento
  observado no screenshot (badge fica ao lado do título sem cortar, mas há
  `flex-wrap` como rede de segurança se o título crescer).

## Observação secundária, não bloqueante

O seletor "Cenário de envio (demonstração)" no topo da página (fora da
moldura de portal, é controle de demonstração do catálogo, não faz parte da
tela `novo-sinistro` em si) usa:

```tsx
<div className="mt-4 flex items-center gap-2">
  <Label htmlFor="cenario-envio" className="text-sm">
    Cenário de envio (demonstração)
  </Label>
  <Select ...>
    <SelectTrigger id="cenario-envio" size="sm" className="w-56">
```

Sem `flex-wrap` na div e sem classe responsiva no `Select` (`w-56` fixo =
224px). Em ~574–623px isso coube numa linha só sem quebrar (confirmado por
screenshot). Não consegui confirmar em exatos 390px por causa da limitação
de ambiente acima — pela mecânica do CSS (o `Label` não tem
`whitespace-nowrap`, então o texto pode quebrar em 2 linhas antes de causar
overflow horizontal), o pior cenário esperado é o rótulo quebrar linha, não
vazar da tela. Mesmo assim, como é um padrão repetido em várias telas do
catálogo (não específico de `novo-sinistro`), sugiro ao `telas-revisor`
tratar como item de backlog do padrão "Cenário de demonstração" como um
todo, não como bloqueio desta tela.

## Não foi necessário

- Investigar cache do Turbopack — servidor já respondia 200 antes de
  qualquer ação.
- Testar a tela de sucesso do wizard — não é um estado com layout diferente
  o suficiente do já coberto (mesma estrutura de `CardFooter`, já validada
  em código, e não é uma das telas pedidas para verificação prioritária).
