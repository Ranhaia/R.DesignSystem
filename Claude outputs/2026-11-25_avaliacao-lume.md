# Avaliação do Lume (lumeui.dev) para o R.DS — 2026-11-25

Fonte: repositório público `JoniGuerini/lume-design-system` (MIT, v1.14.0), lido por inteiro na estrutura.
O site é SPA por hash: sem JS não entrega conteúdo, então o repo foi a fonte real.

## Fase 1 — O que é
- DS em HTML/CSS/JS nativo, **sem dependências**, + camada React tipada (npm `@joniguerini/lume`).
- 67 componentes, 175 ícones próprios, gráficos em SVG, 12 padrões de tela, temas claro/escuro, pt/en/es.
- Tokens em JSON (`tokens/`: palettes, foundation, typography, semantic, effects) em OKLCH → CSS gerado.

## Fase 2 — Funcionalidades (inventário)
| Área | O que tem |
|---|---|
| Distribuição | npm; CDN versionado `/v/1.14/lume.css`; zip por versão; `versoes/` com cópias congeladas de cada linha |
| CLI | `npx lume init` (copia tudo), `add <comp>` (só o componente + dependências), `list` |
| IA | `llms.txt`; um `.md` por página (gerado do site, `npm run ia`); `LEIA-ME.md` com regras "nunca invente"; `AGENTS.md` pronto para colar em outro projeto; Skill para Claude em zip; tudo em 3 idiomas |
| Doc de componente | Exemplo, Variantes, Tamanhos (com token + px), Estados forçados por `data-state`, Anatomia, Uso, Acessibilidade, "Tokens usados", linha "Em números" (ex.: contraste do primário 7,80:1) |
| Padrões | app shell, login, busca, listagem, configurações, avisos, detalhe, painel, carregamento, estados vazios, conversa, formulários — com exemplo vivo e regras de UX |
| A11y | contraste de todos os pares semânticos medido **no build** (80/80); `test:a11y` sem deps (nome, rótulo, alt, ids, foco, contraste real, hierarquia de títulos) com lista ALLOW justificada; página de Pendências |
| Visual | `test:visual`: foto por seção, 2 temas, estados forçados, data/sorteio fixos, diff pixel a pixel com relatório |
| Figma | plugin que **gera** a biblioteca Figma a partir do código, testado contra mock da API |
| i18n | textos de sistema e formatação de número/data por `setLocale()` |
| Site | busca ⌘K, banner "nova versão", página Novidades |

## Fase 3 — Comparação com o R.DS
Já temos equivalente: tokens só por variável e trava de teste; a11y por Storybook/vitest; doc por componente
(`docs/componentes/<slug>.md` + coleta + histórico); registro atomic; presets de marca (o Lume não tem — vantagem nossa).

Lacunas (o que vale aprender), por ganho/esforço:
1. **`llms.txt` + `AGENTS.md` exportável** — o caso de uso do R.DS é "IA monta tela". Gerar dos `docs/componentes/*.md` que já existem. Esforço baixo.
2. **"Tokens usados" e "Em números" no MD de cada componente** — sai da coleta que já roda. Baixo.
3. **Estado forçado por atributo** (`data-state="hover|focus|pressed"`) — habilita doc e teste visual sem mouse. Médio (toca CVA de vários componentes; pergunta DS × projeto).
4. **Teste de regressão visual** por story, 2 temas × presets. Médio; respeitar trava de 1 Chromium.
5. **Contraste de pares semânticos no build** (`tokens:gerar`) — hoje medimos via stories; medir no gerador acha erro antes. Baixo/médio.
6. **CLI `add <comp>`** para copiar componente + dependências aos projetos (resolve a deriva tipo TreeSelect). Médio.
7. Padrões de tela documentados com regra de UX (login, listagem…) — casa com `/construir-telas`. Médio.
8. Plugin Figma gerado do código, i18n, versões congeladas — alto; só se houver demanda.

## Fase 4 — Revisão (Sol)
- Claims conferidos no repo: README, `llms.txt` (133 linhas), `ia/componentes` (67 arquivos), cabeçalhos de
  `test-a11y.mjs`, `test-visual.mjs`, `npm/bin/lumeui.mjs`. Não rodei os scripts do Lume nem abri o site com JS.
- Licença MIT: pode-se adaptar ideias e código, mantendo o aviso de copyright se copiar código.

---

# Rodada 2 — Alinhamento da base de componentes e idiomas (2026-11-25)

## Cobertura: 67 componentes do Lume × 79 do R.DS
**Temos (42):** botão, botão dividido, chip, menu (dropdown-menu), campo de texto (input/textarea/field), grupo de campos (field),
seleção (select/combobox/multi-select/native-select), checkbox/radio, switch, horário (time-picker), slider, upload (file-uploader),
código de verificação (input-otp), sidebar, navbar (navigation-menu/menubar), abas, controle segmentado, breadcrumb, link, paginação,
stepper, acordeão, barra de rolagem (scroll-area), modal (dialog/alert-dialog), gaveta (sheet/drawer), popover, menu de contexto,
tooltip, alerta, toast (sonner), badge, barra de progresso, spinner, skeleton, estado vazio (empty), card, carrossel,
painéis redimensionáveis, divisor (separator), avatar, tabela, tecla (kbd).

**Parcial (9)** — existe base, falta a peça pronta:
| Lume | No R.DS hoje | Falta |
|---|---|---|
| Campo de senha | input-group | mostrar/esconder pronto |
| Campo de busca | input-group | lupa + limpar + Esc + atalho de foco |
| Campo de tags | multi-select, tag | valores livres digitados |
| Seletor de data | calendar | campo digitável + período |
| Barra de ferramentas | button-group, toggle-group | roving tabindex (um Tab, setas) |
| Árvore | tree-select | árvore solta, fora de select |
| Calendário (agenda) | calendar (só datas) | mês/semana/dia com eventos |
| Tabela de dados | table | busca, filtros, lote, colunas, CSV |
| Painel | card | superfície de tarefa com seções |

**Não temos (16):** ação inline, campo de dinheiro, campo numérico, seletor de cor, avaliação, editor de texto rico,
voltar ao topo, banner de anúncio, central de notificações, progresso circular, visualizador de imagem, lista arrastável,
kanban, linha do tempo, lista de definições, bloco de código.

**Só o R.DS tem:** presets de marca, chart, command, hover-card, icon-button, item, list, message/bubble/attachment (chat),
speed-dial, thumbnail, toggle, aspect-ratio, collapsible, marker, box/text/title.

## Idiomas — aqui estamos desalinhados
| | Lume | R.DS |
|---|---|---|
| Textos de sistema dos componentes | dicionário por idioma, `setLocale()`, segue o navegador | fixos no código |
| Número e data | `Intl` no idioma ativo | só o calendar recebe `locale` (padrão ptBR) |
| Documentação | pt, en e es (gerada) | só pt |

**Bug concreto:** textos fixos misturam inglês e português. Em inglês: `Close` (2×), `Loading` (spinner),
`Previous slide`/`Next slide` (carousel), `More`, `Toggle …`. Em português: `Limpar busca`, `Ir para a próxima página`, `Mais páginas`…
Para quem usa leitor de tela, a mesma tela fala duas línguas.

## Recomendação
1. Corrigir já os textos em inglês (é bug, não decisão).
2. Decidir a arquitetura de idioma (é decisão sua): provider de idioma no DS com dicionário pt/en, ou prop de texto em cada componente.
3. Componentes faltantes: priorizar os de formulário (numérico, dinheiro, senha, busca, data digitável), que aparecem em quase toda tela de teste.
