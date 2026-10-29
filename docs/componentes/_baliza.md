# Baliza: como escrever o MD de um componente

Régua tirada da leitura completa dos 109 MDs do PASSI DS 1.1.0, feita em
2026-10-28 em 4 frentes, com as afirmações principais conferidas nos
arquivos. É **baliza, não cópia**: o PASSI mostra aonde chegar, e o texto
final fala do componente do R.DS.

- Quem aplica: `.claude/skills/componente-rds/SKILL.md`.
- Quem cobra: `src/lib/memoria-componentes.test.ts`.
- As seções e os campos moram em `_modelo.md`; as regras gerais e a meta
  de acessibilidade, no `README.md`. Aqui fica só **como escrever**.

## O que o R.DS adota, adapta ou recusa do PASSI

| No PASSI | No R.DS | Por quê |
|---|---|---|
| Um MD por peça com as mesmas seções (52 de 52), cerca de 3,3 KB | **Adota.** Seções do `_modelo.md`, até 8 KB contando as tabelas geradas | O agente sabe onde procurar |
| Acessibilidade em 4 chaves (52 de 52) | **Adota**, e a trava cobra | É verificável |
| Meta "WCAG 2.2 AA e ABNT NBR 17225" repetida em cada arquivo | **Adapta:** a meta mora uma vez, no README. O MD cita o critério WCAG quando ele decide o comportamento | Uma informação, um lugar |
| "Regras gerais": 5 itens idênticos em 52 arquivos | **Adapta:** moram uma vez, no README | Repetir gasta contexto e diverge |
| Só parte dos "NÃO faça" aponta a alternativa | **Mais estrito:** todo item de "Quando NÃO usar" e de "NÃO faça" termina com `→` | A IA nunca fica sem saída |
| A escolha entre vizinhos fica espalhada (introdução, Como usar, NÃO faça) | **Adapta:** vira a seção "Quando NÃO usar", logo depois de "Quando usar" | A IA descarta a peça antes de ler o resto |
| Tabela de propriedades do Figma | **Recusa:** Anatomia, Props, Variantes e Tamanhos saem do `.tsx` | O código é a fonte |
| Tokens com barra, em português (`cor/fundo/marca`) | **Recusa:** tokens reais do R.DS, lidos do código | Tokens em inglês, como no shadcn |
| Sem frontmatter (os sinônimos ficam num índice à parte) | **Recusa:** frontmatter com camada, sinônimos, vizinhos e referências | Roteamento sem ler o corpo |
| Sem código | **Recusa:** "Exemplo mínimo" em TSX | Pronto para usar |
| "Feito com" só nos padrões | **Adota no componente**, como "Composição" (gerada dos imports) | Mostra de que peças ele depende |
| Nenhum fluxo para criar um componente | **O R.DS cria o seu:** a skill `componente-rds` | É a lacuna do PASSI |
| Checklist depois de implementar: claro, escuro, teclado, movimento reduzido | **Adota**, no passo 6 da skill | |

## Seção por seção

**G** = gerada por `npm run docs:registrar`. **A** = escrita pelo auditor.

Os números de itens de Quando usar, Quando NÃO usar, Faça e NÃO faça seguem o molde curto da página de componente
(`H-doc-pagina-condensada`), mais estrito que o do PASSI. A trava é `LIMITES_ITENS` em
`src/lib/memoria-componentes.test.ts`.

| Seção | Quem | Critério de aceite |
|---|---|---|
| Frontmatter | G + A | Gerados: `slug`, `nome`, `camada`, `codigo`, `story`, `sinonimos` (de `docs/sinonimos.json`). Do auditor: `vizinhos` (ao menos 1, os que a IA confunde com este) e `referencias` (ao menos 1: `passi:<arquivo>`, `shadcn:<slug>`, `spec:<slug>`). `status: piloto` até a revisão do Rafael, depois `estavel` |
| Título e frase | A | 1 ou 2 frases: o que é e o que resolve. Sem "componente que permite". Ex.: "Dispara uma ação. O texto diz exatamente o que vai acontecer." |
| Quando usar | A | De 2 a 3 situações concretas, com um caso real ("Detalhes, Histórico, Arquivos") |
| Quando NÃO usar | A | De 2 a 3 itens, cada um: situação → `slug` que existe. Tire das arestas abaixo. Passou de 3: funda os que apontam para a mesma direção e deixe o resto em `vizinhos`, onde a IA ainda o acha |
| Anatomia | G + A | O código lista as partes. O auditor descreve cada uma e acrescenta as partes visuais que não são funções (ícone, texto) |
| Composição | G | Não se edita |
| Props | G + A | O código preenche as props próprias. O auditor acrescenta as herdadas que importam (do Radix: `value`, `open`…), com a parte entre parênteses: `` `value` (Tabs) `` |
| Variantes e Tamanhos | G + A | O código lista os valores e a medida. A descrição diz **quando usar** cada valor, não como ele é |
| Estados | A | Peça clicável: os 5 estados (padrão, hover, pressionado, foco, desabilitado), mais "carregando" se houver, descritos pelas classes do código. Peça que não recebe foco: "Só leitura: não recebe foco." |
| Conteúdo | A | De 2 a 4 regras de texto **desta peça**, com exemplo literal: classe gramatical (verbo no botão, substantivo na aba), limite (até 3 palavras), pontuação (sem ponto final em rótulo, nunca exclamação). As regras gerais vão morar em `docs/conteudo/`; não repita. Peça sem texto: "Não tem texto próprio", mais onde o texto mora |
| Acessibilidade | A | As 4 chaves, cada uma verificável. **Teclado:** teclas e o que fazem; sem foco, "Não recebe foco". **Leitor de tela:** papel ARIA, de onde vem o nome acessível, o que é anunciado. **Foco:** para onde vai ao abrir, fechar e agir. **Cuidados:** a armadilha conhecida, com o critério WCAG quando houver |
| Tokens usados | G | Não se edita |
| Faça | A | 3 itens no imperativo: o melhor uso |
| NÃO faça | A | 3 itens, cada um no formato "erro → alternativa" (outro slug, outra variante ou o jeito certo). Não repita um item de "Quando NÃO usar" |
| Exemplo mínimo | A | TSX com `import … from "@/components/ui/<slug>"`, só o necessário, com o texto em pt-BR seguindo a seção Conteúdo |

### Critérios WCAG que o PASSI usa em Cuidados

2.1.4 (atalho de uma tecla só) · 2.4.11 (foco não encoberto por toast ou
barra fixa) · 2.5.7 (arrastar nunca é o único jeito) · 1.4.13 (o conteúdo
que aparece no hover continua aberto com o cursor em cima) · 3.3.7 (não
pedir de novo um dado já informado) · 3.3.8 (aceitar colar senha e código).

### Limites de quantidade (baliza do PASSI)

Até 6 abas · de 2 a 4 opções no `segmented-control` · de 2 a 6 opções no
`radio-group` · `select` acima de 5 opções e `combobox` acima de 15 · até
3 botões no `button-group` · até 10 ações numa barra de ferramentas · até
5 avatares visíveis · de 3 a 5 passos no `stepper` · paginação com
primeira, última e vizinhas da página atual.

## Arestas da árvore de decisão

Tiradas do PASSI e já convertidas para os slugs do R.DS. Use para
preencher "Quando NÃO usar", `vizinhos` e a árvore do README.

| Peça | Situação | Use |
|---|---|---|
| `tabs` | Etapas em sequência | `stepper` |
| `tabs` | Alternar a visão de uma área, sem painel próprio | `segmented-control` |
| `tabs` | Levar a outra página | `link` · `navigation-menu` |
| `tabs` | Mais de 6 abas | `select` |
| `segmented-control` | Conteúdo longo por seção | `tabs` |
| `segmented-control` | Mais de 4 opções | `select` |
| `stepper` | Navegação livre, não linear | `tabs` |
| `button` | Leva a outra página | `link` |
| `button` | Só ícone | `icon-button` |
| `icon-button` | Ação rara ou ícone ambíguo | `button` com texto |
| `link` | Ação que muda dado (salvar, criar) | `button` |
| `alert` | Confirmação que pode sumir sozinha | `sonner` |
| `alert` · `sonner` | Erro que interrompe e pede decisão | `alert-dialog` |
| `dialog` | Aviso rápido, sem decisão | `sonner` |
| `dialog` | Formulário longo | página própria · `sheet` |
| `dialog` | Janela sobre janela | `stepper` dentro da mesma janela |
| `popover` | Decisão crítica ou formulário longo | `dialog` |
| `popover` | Abrir no hover | `tooltip` |
| `tooltip` | Conteúdo com link ou botão | `popover` |
| `checkbox` | Uma opção entre várias, exclusiva | `radio-group` |
| `checkbox` | Vale na hora, sem "Salvar" | `switch` |
| `switch` | Só vale depois de enviar o formulário | `checkbox` |
| `radio-group` | Mais de 6 opções | `select` |
| `radio-group` | Uma opção isolada | `checkbox` |
| `select` | De 2 a 4 opções que cabem visíveis | `radio-group` · `segmented-control` |
| `select` | Mais de 15 opções, com digitação | `combobox` |
| `select` | Lista de comandos, não de valores | `dropdown-menu` |
| `combobox` | Menos de 7 opções | `select` · `radio-group` |
| `dropdown-menu` | Navegar entre páginas | `link` · `navigation-menu` |
| `badge` | Precisa de clique ou filtro | `chip` · `tag` |
| `chip` · `tag` | Status só de leitura | `badge` |
| `textarea` | Resposta de uma linha | `input` |
| `input` | Instrução no placeholder | `label` + descrição do `field` |
| `input-otp` | Código com mais de 8 dígitos ou letras | `input` |
| `slider` | Valor exato (CPF, parcelas) | `input` · `select` |
| `spinner` | O layout que vai chegar é conhecido | `skeleton` |
| `progress` | Espera sem medida | `spinner` |
| `separator` | Separar itens de uma lista curta | espaço (`gap-*`) |
| `toggle-group` · `button-group` | Mais de 10 ações numa barra | `dropdown-menu` ("Mais opções") |
| `tree-select` | Lista sem níveis | `list` · `item` |
| `carousel` | Mais de 5 telas | `pagination` |
| `breadcrumb` | Site raso, de 1 ou 2 níveis | `sidebar` · `navigation-menu` |

## Onde o PASSI e o R.DS divergem e quem decide é o Rafael

Não aplique o PASSI nestes pontos até haver decisão (Épico `E-memoria-componentes`):

- **Gradiente de IA** (atrito A3). O PASSI proíbe usar violeta ou gradiente de IA como decoração; o `button` tem `ai-primary` com gradiente.
- **Sombra em superfície parada.** No PASSI, sombra só em elemento flutuante. No R.DS, o `button` tem elevação (`shadow-sm`) e o `card` também usa `shadow-sm`.
- **Tipos de `alert`.** O PASSI tem 4 (informação, sucesso, atenção, erro); o R.DS tem `default` e `destructive`.

O R.DS fica com a regra própria, de propósito, em três pontos:
- **Anel de foco:** 3 px em `ring` (no PASSI, 2 px afastado 2 px).
- **Alvo:** mínimo de 24 px, com 44 px como Regra da Casa em `docs/a11y/`.
- **Raio concêntrico** do `CLAUDE.md`, mais rigoroso que o "quanto maior a peça, maior o canto" do PASSI.

## Crédito

Adaptado do PASSI DS, de João Passini (joaopassini.com.br), licença CC BY 4.0.
Pacote original intocado em `Referencia/passi-ds-1.1.0/`.
