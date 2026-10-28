# MAPA — PASSI DS 1.1.0 × R.DS

Cruzamento peça a peça. Use para saber **de qual arquivo do PASSI tirar o
quê** ao escrever o MD de um componente do R.DS.

- Caminho PASSI: `passi-ds-1.1.0/diretrizes/<pasta>/<arquivo>.md`
- Caminho R.DS: `src/components/ui/<slug>.tsx`

Legenda: ✅ equivalente · 🟡 parcial (cobre parte, ou outro recorte) ·
⛔ lacuna (PASSI tem, R.DS não).

Coluna **Extrair**: seções do arquivo PASSI que valem a releitura —
`QN` Quando não usar · `A11y` Acessibilidade · `Ct` Conteúdo ·
`F/N` Faça e NÃO faça · `Est` estados.

## Componentes (52)

| PASSI | R.DS | | Extrair | Observação |
|---|---|---|---|---|
| abas | `tabs` | ✅ | QN, A11y, F/N | Pílula descontinuada no PASSI → segmented-control |
| acordeao | `accordion` | ✅ | A11y, Ct, F/N | |
| alerta | `alert` | ✅ | A11y, Ct, F/N | Árvore: fica na página × aviso rápido × modal |
| area-de-destaque | — | ⛔ | todas | Callout editorial (dica, exemplo, resumo) |
| area-de-texto | `textarea` | ✅ | A11y, Ct | |
| atalho-de-teclado | `kbd` | ✅ | A11y | |
| avatar | `avatar` | ✅ | A11y, Ct | |
| aviso-de-ia | — | ⛔ | todas | Kit IA |
| aviso-rapido | `sonner` | ✅ | QN, A11y, Ct | Sinônimos: toast, snackbar |
| barra-de-ferramentas | `toggle-group` · `button-group` | 🟡 | A11y (role=toolbar, setas) | |
| barra-de-progresso | `progress` | ✅ | A11y, Ct | |
| botao-de-icone | `icon-button` | ✅ | A11y, F/N | aria-label + tooltip obrigatórios |
| botao-em-bloco | — | 🟡 | todas | Escolha em cartão grande; hoje se monta com radio-group + card |
| botao | `button` | ✅ | QN, Ct, F/N, Est | "1 primário por tela"; ver atrito A3 (ai-primary) |
| campo-com-sugestoes | `combobox` | ✅ | A11y, QN | |
| campo-de-pedido | `input-group` · `message` | 🟡 | todas | Prompt de IA |
| campo-de-texto | `input` · `field` · `label` | ✅ | A11y, Ct, F/N | Erro ligado por aria-describedby; colar e autofill |
| campo-sugerido-por-ia | — | ⛔ | todas | Kit IA |
| card | `card` | ✅ | QN, F/N | Superfície = cor + borda, não sombra |
| carregando | `spinner` · `skeleton` | ✅ | QN, A11y, Ct | Quando usar qual |
| checkbox | `checkbox` | ✅ | QN, A11y, Ct | Checkbox × switch |
| codigo-de-verificacao | `input-otp` | ✅ | A11y, Ct | Colar código inteiro |
| controle-deslizante | `slider` | ✅ | A11y | Arrastar nunca é o único jeito |
| controle-segmentado | `segmented-control` | ✅ | QN, A11y | |
| dica-flutuante | `tooltip` | ✅ | QN, A11y, Ct | |
| divisor | `separator` | ✅ | F/N | |
| envio-de-arquivo | `file-uploader` | ✅ | A11y, Ct | |
| etiqueta | `chip` · `tag` | ✅ | QN | Etiqueta = clicável; selo = só leitura |
| explicacao-da-ia | — | ⛔ | todas | Kit IA (abre a partir do rótulo) |
| grupo-de-botoes | `button-group` | ✅ | F/N | Ordem cancelar/confirmar |
| indicador-de-pagina | `carousel` | 🟡 | A11y | Só os pontos |
| indice-alfabetico | — | ⛔ | todas | Baixa prioridade |
| interruptor | `switch` | ✅ | QN, A11y, Ct | Vale na hora, sem "Salvar" |
| item-de-lista | `item` · `list` | ✅ | A11y | |
| janela-modal | `dialog` · `alert-dialog` | ✅ | QN, A11y, Ct | Confirmação: pergunta + consequência + verbo |
| link | `link` | ✅ | A11y, Ct, F/N | Sublinhado no texto; externo avisa "(abre em outra aba)" |
| lista-em-arvore | `tree-select` | 🟡 | A11y (role=tree) | |
| mensagem-da-conversa | `message` · `bubble` | ✅ | A11y, Ct | Anunciar resposta inteira, não palavra a palavra |
| menu | `dropdown-menu` · `context-menu` | ✅ | A11y, F/N | |
| migalhas-de-pao | `breadcrumb` | ✅ | A11y, F/N | |
| paginacao | `pagination` | ✅ | A11y, Ct | |
| passos | `stepper` | ✅ | QN, A11y | |
| plano-de-acao | — | ⛔ | todas | Kit IA: confirmar antes de agir |
| popover | `popover` | ✅ | QN, A11y | Popover × tooltip × modal |
| proporcao-de-imagem | `aspect-ratio` | ✅ | — | |
| radio | `radio-group` | ✅ | QN, A11y | |
| rotulo-de-ia | — | ⛔ | todas | Kit IA |
| rotulo-informativo | `label` + `tooltip` | 🟡 | A11y | |
| selecao | `select` · `native-select` | ✅ | QN, A11y | Mais de 5 opções |
| seletor-de-cor | — | ⛔ | todas | Baixa prioridade |
| selo | `badge` | ✅ | QN, Ct | Cor nunca é o único sinal |
| sobreposicao | (interno de `dialog`/`sheet`) | 🟡 | A11y | |

**Resumo:** 37 ✅ · 7 🟡 · 8 ⛔ (6 deles são o kit de IA ou peças
editoriais).

## Componentes do R.DS sem par no PASSI

Escrever do zero, sem referência PASSI:
`box`, `collapsible`, `command`, `hover-card`,
`menubar`, `navigation-menu`, `resizable`, `scroll-area`,
`files`, `marker`, `multi-select`, `speed-dial`, `split-button`, `text`,
`title`, `thumbnail`, `time-picker`, `toggle`, `direction`, `form`,
`icon`, `attachment`.

Têm par como **padrão** (não componente) no PASSI:

| R.DS | PASSI padrão |
|---|---|
| `calendar` | padroes/calendario |
| `chart` | padroes/graficos |
| `table` | padroes/tabela-de-dados |
| `sidebar` | padroes/menu-lateral |
| `drawer` · `sheet` | padroes/janela-de-acoes |
| `empty` | conteudo/microtexto (tela vazia) |

## Transversais (valem para todos os MDs)

| PASSI | Uso no R.DS |
|---|---|
| diretrizes/Guidelines.md | Modelo da porta de entrada `docs/componentes/README.md` |
| fichas/indice.json → `sinonimos` | Base do `docs/sinonimos.json` (trocar slugs para os do R.DS) |
| fichas/indice.json → `glossario` | Base do `docs/conteudo/glossario.md` |
| conteudo/microtexto.md | Adaptar quase inteiro |
| conteudo/formatos-brasileiros.md | Adaptar inteiro (Intl pt-BR, CPF, CEP) |
| fundamentos/acessibilidade.md | Conferir contra `docs/a11y/` — não duplicar |
| fundamentos/ia-no-produto.md | Ler antes de decidir o atrito A3 |
| decisoes.md | Formato de ADR para `docs/active/decisoes/` |
