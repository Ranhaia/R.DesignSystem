# Diagnóstico final — `novo-sinistro`

Revisão de fechamento da 2ª das 3 telas da Fase 5B. Fontes cruzadas:
`.build/telas/novo-sinistro.md` (spec), `.build/telas/acessibilidade-novo-sinistro.md`
(auditoria a11y), `.build/telas/mobile-novo-sinistro.md` (verificação mobile),
`src/app/templates/novo-sinistro/page.tsx` (código final) e os registries do
catálogo. Revisão de leitura apenas — nada em `src/` foi alterado.

---

## Veredito: **pronta com ajustes menores**

Nenhum bloqueante encontrado — nem de acessibilidade, nem de mobile. A tela
pode seguir para `painel-corretor` sem retrabalho prévio.

Os 4 achados da auditoria de a11y são reais, mas nenhum impede operar a tela
por teclado ou por leitor de tela; 2 deles são gaps sistêmicos do catálogo
(herdados de `field-radio.tsx` e `upload.tsx`), não bugs desta tela. O
relatório mobile não mediu overflow horizontal em nenhum estado testado — a
ressalva dele é sobre a largura de viewport que a ferramenta conseguiu
sustentar, não sobre um defeito observado, e a leitura de código fecha essa
lacuna (ver "Mobile" abaixo).

---

## Bloqueantes

**Nenhum.**

Critério aplicado (a11y e mobile no mesmo balde, sem hierarquia entre eles):
bloqueante = impede uso real com leitor de tela/teclado, ou overflow
horizontal medido. Nada nos dois relatórios se enquadra:

| Achado | Origem | Por que NÃO é bloqueante |
|---|---|---|
| A — `RadioGroup` "Tipo de sinistro" sem nome de grupo acessível | a11y (herdado de `field-radio.tsx`) | Cada opção tem `Label` associado por `htmlFor`/`id` e a navegação por seta é nativa do Radix — o campo é 100% operável. Falta o *nome do grupo* ("Tipo de sinistro") no modo de foco. Perde contexto, não perde a função. Ver "Ajustes menores" item 1 — é o achado que eu corrigiria primeiro. |
| B — `<input type="file">` `sr-only` na ordem de tab | a11y (idêntico ao Pattern `upload.tsx`) | Gera 2 paradas de Tab consecutivas para o que visualmente é 1 controle, e a 2ª tem nome genérico. É redundância confusa, não perda de função: as duas paradas abrem o seletor de arquivos. Nada fica inalcançável. |
| C — `aria-describedby` do erro de tipo no container do grupo, não no item focado | a11y | Mitigado na prática: `FieldError` (`field.tsx:225-234`) tem `role="alert"` nativo e é inserido no DOM só quando a validação falha — leitor de tela anuncia a mensagem na aparição, independente da associação. O que se perde é a re-leitura do erro ao voltar o foco ao campo depois. Gap real, impacto parcial. |
| D — texto "Documentos sugeridos…" dentro do `div[role="button"]` da dropzone | a11y | Nome acessível verboso não é falha de WCAG por si só. É divergência da própria spec (linha 129: o texto deveria ficar **abaixo** da dropzone) e piora a experiência por repetição, mas não bloqueia. |
| Mobile — 390px exatos não confirmados nesta sessão | mobile | **Não houve overflow medido em nenhum estado.** Ausência de medição em 390px não é o mesmo que overflow medido. Fechei a lacuna por código — ver abaixo. |

### Por que a ressalva do relatório mobile não vira bloqueio

O relatório mediu `scrollWidth ≤ innerWidth` em todos os 8 estados testados
(574–623px), você confirmou ~600px manualmente 3 vezes de forma
independente, e o único intervalo não coberto (390–574px) foi verificado por
código. Os 4 candidatos reais a overflow nessa faixa foram checados um a um:

1. Trigger do date picker (`page.tsx:576`): `w-full … sm:w-[280px]` — largura
   fixa só a partir de 640px. Abaixo disso é largura total. Sem risco.
2. `AlertDialogContent` (`alert-dialog.tsx:65`): `w-full max-w-[calc(100%-2rem)]`
   com `sm:max-w-lg` — em 390px vira 358px. Sem risco. (Era o único estado do
   relatório verificado só por screenshot, sem número; resolvido por código.)
3. `Attachment` (`attachment.tsx:19`): `min-w-40` = 160px, com título
   `truncate` — cabe folgado na largura útil de 390px. Sem risco.
4. Linha do `Select` "Cenário de envio" (`page.tsx:359-367`): a única sem
   `flex-wrap` e com `w-56` fixo. O `Label` não tem `whitespace-nowrap` (quebra
   em 2 linhas antes de empurrar) e o `SelectTrigger` é item flexível
   encolhível — largura mínima da linha ≈ 290px contra ~358px úteis em 390px.
   Sem risco, com folga.

Conclusão: não há caminho estrutural para overflow entre 390 e 574px.
Recomendo repetir a medição em 390×844 exatos na próxima sessão em que o
`resize_window` estiver estável — como confirmação de rotina, **não** como
condição para liberar a tela.

---

## Ajustes menores (recomendados, nenhum bloqueia o próximo passo)

Em ordem de custo/benefício:

1. **Trocar `FieldLabel` por `FieldLegend` no `FieldSet` de "Tipo de sinistro"**
   (`page.tsx:523`). `FieldLegend` já existe (`field.tsx:24-42`, renderiza
   `<legend>` nativo) — troca de uma linha que resolve o achado A e, de quebra,
   melhora o C: dentro de um `<fieldset>`, a `<legend>` é anunciada junto com
   cada opção. **Se houver teste moderado com usuário de leitor de tela antes
   da próxima tela, faça esse ajuste antes** — é barato demais para deixar
   passar.
2. **Mover o `<p>` "Documentos sugeridos…" para fora do `div[role="button"]`**
   (`page.tsx:668-671`), como irmão logo abaixo. Resolve o achado D e alinha o
   código à letra da spec.
3. **`tabIndex={-1}` no `<input type="file">`** (`page.tsx:672-679`) — resolve o
   achado B. **Corrigir na fonte** (`src/components/patterns/upload.tsx:83-89`)
   em vez de só aqui: beneficia toda tela futura que reaproveitar o Pattern.
4. **Backlog transversal do catálogo** (nada a fazer nesta tela): os achados A e
   B nasceram em `field-radio.tsx` e `upload.tsx`. Vale uma passada nos dois
   arquivos-fonte antes de a Fase 5 fechar, senão as próximas telas herdam os
   mesmos gaps.
5. **Padrão "Cenário de demonstração"** (`div` sem `flex-wrap` + `Select w-56`):
   idêntico em `apolices-ativas`, `onboarding` e `selecao-perfil-corretora`.
   Não é problema desta tela e não causa overflow (item 4 da seção anterior) —
   se for mexer, mexa nas 4 de uma vez.

### Divergência de spec que eu recomendo resolver a favor do código

A auditoria registrou como achado E o `AlertDialog` ser controlado por estado
(`open={confirmOpen}`) em vez de usar `AlertDialogTrigger asChild`, como a spec
sugeria (linhas 144-147). **O código está certo e a spec está errada**: com
`AlertDialogTrigger`, o clique em "Enviar sinistro" abriria o diálogo *antes* de
validar a declaração, quebrando o estado 8 da própria spec ("não abre o diálogo
enquanto o checkbox não for marcado"). O retorno de foco continua nativo do
`FocusScope` do Radix. Perde-se só o `aria-haspopup`/`aria-expanded` automático
— se quiser recuperar, é adicionar os dois atributos à mão no botão. Sugiro
atualizar a spec, não o código.

---

## Consistência com o design system

Tudo conferido, sem exceção encontrada:

- **Só peças reais do catálogo.** Os 17 componentes importados existem em
  `src/lib/components-registry.ts` (alert, alert-dialog, attachment, badge,
  button, calendar, card, checkbox, field, label, popover, progress,
  radio-group, select, sidebar, spinner, textarea). Nenhum componente
  inventado, nenhum arquivo novo em `src/components/`.
- **Patterns reaplicados como mecanismo, não copiados.** `multi-step-form`,
  `upload` e `confirmation-dialog` — os 3 estão em
  `src/lib/patterns-registry.ts` (linhas 21, 27, 22).
- **Nenhuma cor ou espaçamento fora de token.** Só utilitários semânticos
  (`text-muted-foreground`, `text-destructive`, `bg-primary/10`, `bg-primary/5`,
  `ring-ring/50`). Zero hex, zero `rgb()`, zero arbitrary value de cor. Os
  únicos valores arbitrários são de dimensão e todos justificados:
  `min-h-[720px]` (idêntico a `apolices-ativas:216`) e `sm:w-[280px]`
  (exigido pela spec, item 2 de responsividade).
- **Moldura de portal idêntica a `apolices-ativas`**: mesma `SidebarProvider`
  escopada, mesmos 3 itens, mesmo `min-w-0 flex-1 p-4 md:p-6`, só o item ativo
  trocado.
- **Sidebar mockada nasceu correta**: `className="hidden h-full md:flex"`
  (`page.tsx:380`) — o bug de `RETROATIVO-MOBILE.md` não se repetiu.
- **`templates-registry.ts` atualizado corretamente**: `novo-sinistro` está em
  `templatesList` (linha 22) e **não** aparece mais em `inProgressTemplates`,
  que hoje contém apenas `painel-corretor` (linha 32).

Dois pontos em que o código foi **além** da spec, vale registrar: a restrição
de data não-futura foi implementada de verdade (`disabled={{ after: new Date() }}`,
`page.tsx:596`) em vez de aceita como gap (Lacunas item 6), e a dropzone trata
`event.preventDefault()` no Espaço — correção que o Pattern original
(`upload.tsx:63-64`) ainda não tem.

---

## Navegação do fluxo — confirmação explícita

Conferido no código das telas vizinhas, não só na spec.

**Entrada (de onde se chega aqui) — cabeada e funcional:**

- `apolices-ativas/page.tsx:241` — item "Sinistros" da sidebar mockada →
  `/templates/novo-sinistro`.
- `apolices-ativas/page.tsx:439` — botão "Abrir sinistro" de cada linha da
  tabela → `/templates/novo-sinistro`.

Nenhuma alteração foi necessária em `apolices-ativas`, como a spec previa.

**Saída (para onde se vai daqui):**

| Origem no código | Destino | Situação |
|---|---|---|
| `page.tsx:398` — item "Apólices" da sidebar | `/templates/apolices-ativas` | Rota existe, ida e volta fecham o ciclo. |
| `page.tsx:448` — CTA secundário da tela de sucesso | `/templates/apolices-ativas` | Rota existe. |
| `page.tsx:390` — item "Painel" da sidebar | `/templates/painel-corretor` | Rota **ainda não existe** (3ª tela de 5B). |
| `page.tsx:453` — CTA primário da tela de sucesso | `/templates/painel-corretor` | Rota **ainda não existe**. |

**Item ativo:** `page.tsx:405` — `<SidebarMenuButton isActive aria-current="page">`
em "Sinistros", com o atributo explícito (não confia só no `isActive`, que só
estiliza). Correto.

**Atenção operacional, não bloqueio:** os dois links para `painel-corretor` são
404 até a 3ª tela existir — inclusive o **CTA primário da tela de sucesso**, que
é literalmente a última coisa que o participante vê ao concluir o fluxo. É o
mesmo link intencionalmente morto que `onboarding:350` e `apolices-ativas:227`
já carregam, e `painel-corretor` está corretamente listado em
`inProgressTemplates` (aparece como "Em construção" no índice). Some sozinho
quando a 3ª tela for construída. **Só não rode teste de usabilidade do fluxo
5B completo antes disso** — ou o participante termina a tarefa numa página de
erro.

---

## Recomendação

Seguir para `painel-corretor`. Os 3 ajustes menores (1 a 3) podem entrar junto
com a correção na fonte dos Patterns, numa passada só, antes do fechamento da
Fase 5 — com uma exceção: se houver teste com leitor de tela agendado antes
disso, faça o item 1 (`FieldLegend`) primeiro.
