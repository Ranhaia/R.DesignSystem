# Tokens de cor

Use sempre os tokens com função (`--cor-*`). Os primitivos ficam por baixo e não entram nos componentes.

## Como escolher

- Fundo de página: `--cor-fundo-pagina`. Cartões e painéis: `--cor-fundo-superficie`. Áreas de apoio: `--cor-fundo-sutil`.
- Texto principal: `--cor-texto-padrao`. Apoio: `--cor-texto-secundario`. Links e destaques: `--cor-texto-marca`.
- Ação principal: fundo `--cor-fundo-marca` com texto `--cor-texto-sobre-marca`.
- Texto sobre fotos, vídeos e gradientes: `--cor-texto-sobre-imagem` (branco em todos os modos). Não use `--cor-texto-sobre-marca` fora das cores de marca, sucesso e erro: no alto contraste escuro ele fica preto.
- Estados: sucesso, alerta e erro têm fundo forte, fundo sutil, texto e borda próprios. Use sempre com ícone ou texto.
- Gráficos: `--cor-dados-1` a `--cor-dados-5` e `--cor-dados-grade`.
- Inteligência artificial: `--cor-texto-ia`, `--cor-fundo-ia-sutil` e `--cor-borda-ia`, só para identificar o que a IA fez, sempre com o ícone brilho ou a palavra IA (veja fundamentos/ia-no-produto.md).

## Estados

Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado. Fundos fortes têm as versões `-hover` e `-pressionado` (marca, erro e invertido); itens neutros usam `--cor-fundo-sutil` no hover e `--cor-fundo-sutil-hover` pressionados; botões sem fundo usam `--cor-fundo-fantasma-hover` e `--cor-fundo-fantasma-pressionado`; links usam `--cor-texto-marca-hover` e `--cor-texto-marca-pressionado`.

## Tabela

Os modos de alto contraste deixam todo texto com pelo menos 7:1 (veja fundamentos/acessibilidade.md).

| Token (Figma) | CSS | Claro | Escuro | Alto contraste claro | Alto contraste escuro |
|---|---|---|---|---|---|
| fundo/pagina | `--cor-fundo-pagina` | neutro/25 #fafaf7 | neutro/950 #0a0a0a | neutro/0 #ffffff | neutro/950 #0a0a0a |
| fundo/superficie | `--cor-fundo-superficie` | neutro/0 #ffffff | neutro/900 #161615 | neutro/0 #ffffff | neutro/950 #0a0a0a |
| fundo/sutil | `--cor-fundo-sutil` | neutro/50 #f3f3ee | neutro/800 #262625 | neutro/50 #f3f3ee | neutro/900 #161615 |
| fundo/sutil-hover | `--cor-fundo-sutil-hover` | neutro/100 #e8e8e3 | neutro/700 #3c3c3a | neutro/100 #e8e8e3 | neutro/800 #262625 |
| fundo/invertido | `--cor-fundo-invertido` | neutro/950 #0a0a0a | neutro/25 #fafaf7 | neutro/950 #0a0a0a | neutro/0 #ffffff |
| fundo/marca | `--cor-fundo-marca` | azul/500 #2544ec | azul/500 #2544ec | azul/700 #172694 | azul/300 #8fa1f7 |
| fundo/marca-hover | `--cor-fundo-marca-hover` | azul/600 #1b2fb8 | azul/600 #1b2fb8 | azul/800 #141f72 | azul/200 #bcc7fb |
| fundo/marca-sutil | `--cor-fundo-marca-sutil` | azul/50 #eef1fe | azul/950 #0b1036 | azul/50 #eef1fe | azul/950 #0b1036 |
| fundo/sucesso | `--cor-fundo-sucesso` | verde/700 #0f7a36 | verde/700 #0f7a36 | verde/900 #08391a | verde/300 #7fd3a0 |
| fundo/sucesso-sutil | `--cor-fundo-sucesso-sutil` | verde/50 #e9f8ef | verde/900 #08391a | verde/50 #e9f8ef | verde/900 #08391a |
| fundo/alerta | `--cor-fundo-alerta` | ambar/500 #ffb020 | ambar/500 #ffb020 | ambar/500 #ffb020 | ambar/500 #ffb020 |
| fundo/alerta-sutil | `--cor-fundo-alerta-sutil` | ambar/50 #fff7e6 | ambar/900 #4d3100 | ambar/50 #fff7e6 | ambar/900 #4d3100 |
| fundo/erro | `--cor-fundo-erro` | vermelho/500 #dc2626 | vermelho/500 #dc2626 | vermelho/700 #a51c1c | vermelho/300 #f08a8a |
| fundo/erro-hover | `--cor-fundo-erro-hover` | vermelho/700 #a51c1c | vermelho/700 #a51c1c | vermelho/900 #4a0d0d | vermelho/100 #fad0d0 |
| fundo/erro-sutil | `--cor-fundo-erro-sutil` | vermelho/50 #fdecec | vermelho/900 #4a0d0d | vermelho/50 #fdecec | vermelho/900 #4a0d0d |
| fundo/desabilitado | `--cor-fundo-desabilitado` | neutro/100 #e8e8e3 | neutro/800 #262625 | neutro/100 #e8e8e3 | neutro/800 #262625 |
| fundo/sobreposicao | `--cor-fundo-sobreposicao` | transparente/preto-60 #0a0a0a 60% | transparente/preto-60 #0a0a0a 60% | transparente/preto-75 #0a0a0a 75% | transparente/preto-75 #0a0a0a 75% |
| fundo/fantasma-hover | `--cor-fundo-fantasma-hover` | transparente/preto-8 #0a0a0a 8% | transparente/branco-12 #ffffff 12% | transparente/preto-12 #0a0a0a 12% | transparente/branco-15 #ffffff 15% |
| texto/padrao | `--cor-texto-padrao` | neutro/950 #0a0a0a | neutro/25 #fafaf7 | neutro/950 #0a0a0a | neutro/0 #ffffff |
| texto/secundario | `--cor-texto-secundario` | neutro/700 #3c3c3a | neutro/200 #d6d6d0 | neutro/800 #262625 | neutro/100 #e8e8e3 |
| texto/terciario | `--cor-texto-terciario` | neutro/500 #6b6b6b | neutro/400 #8f8f8a | neutro/600 #525250 | neutro/300 #b8b8b2 |
| texto/invertido | `--cor-texto-invertido` | neutro/25 #fafaf7 | neutro/950 #0a0a0a | neutro/0 #ffffff | neutro/950 #0a0a0a |
| texto/marca | `--cor-texto-marca` | azul/500 #2544ec | azul/300 #8fa1f7 | azul/700 #172694 | azul/300 #8fa1f7 |
| texto/sobre-marca | `--cor-texto-sobre-marca` | neutro/0 #ffffff | neutro/0 #ffffff | neutro/0 #ffffff | neutro/950 #0a0a0a |
| texto/sucesso | `--cor-texto-sucesso` | verde/700 #0f7a36 | verde/300 #7fd3a0 | verde/900 #08391a | verde/300 #7fd3a0 |
| texto/alerta | `--cor-texto-alerta` | ambar/800 #8a5700 | ambar/300 #ffcf66 | ambar/900 #4d3100 | ambar/300 #ffcf66 |
| texto/erro | `--cor-texto-erro` | vermelho/700 #a51c1c | vermelho/300 #f08a8a | vermelho/900 #4a0d0d | vermelho/100 #fad0d0 |
| texto/desabilitado | `--cor-texto-desabilitado` | neutro/300 #b8b8b2 | neutro/600 #525250 | neutro/500 #6b6b6b | neutro/500 #6b6b6b |
| borda/padrao | `--cor-borda-padrao` | neutro/100 #e8e8e3 | neutro/800 #262625 | neutro/400 #8f8f8a | neutro/600 #525250 |
| borda/forte | `--cor-borda-forte` | neutro/300 #b8b8b2 | neutro/600 #525250 | neutro/600 #525250 | neutro/400 #8f8f8a |
| borda/marca | `--cor-borda-marca` | azul/500 #2544ec | azul/400 #5b74f2 | azul/700 #172694 | azul/300 #8fa1f7 |
| borda/foco | `--cor-borda-foco` | azul/500 #2544ec | azul/400 #5b74f2 | azul/700 #172694 | azul/300 #8fa1f7 |
| borda/sucesso | `--cor-borda-sucesso` | verde/500 #16a34a | verde/500 #16a34a | verde/700 #0f7a36 | verde/300 #7fd3a0 |
| borda/alerta | `--cor-borda-alerta` | ambar/500 #ffb020 | ambar/500 #ffb020 | ambar/800 #8a5700 | ambar/300 #ffcf66 |
| borda/erro | `--cor-borda-erro` | vermelho/500 #dc2626 | vermelho/300 #f08a8a | vermelho/700 #a51c1c | vermelho/300 #f08a8a |
| fundo/invertido-hover | `--cor-fundo-invertido-hover` | neutro/800 #262625 | neutro/200 #d6d6d0 | neutro/800 #262625 | neutro/200 #d6d6d0 |
| fundo/controle-desligado | `--cor-fundo-controle-desligado` | neutro/400 #8f8f8a | neutro/500 #6b6b6b | neutro/600 #525250 | neutro/400 #8f8f8a |
| dados/1 | `--cor-dados-1` | azul/500 #2544ec | azul/400 #5b74f2 | azul/700 #172694 | azul/300 #8fa1f7 |
| dados/2 | `--cor-dados-2` | azul/300 #8fa1f7 | azul/300 #8fa1f7 | azul/500 #2544ec | azul/100 #dde3fd |
| dados/3 | `--cor-dados-3` | ambar/500 #ffb020 | ambar/500 #ffb020 | ambar/800 #8a5700 | ambar/300 #ffcf66 |
| dados/4 | `--cor-dados-4` | verde/500 #16a34a | verde/300 #7fd3a0 | verde/700 #0f7a36 | verde/300 #7fd3a0 |
| dados/5 | `--cor-dados-5` | neutro/400 #8f8f8a | neutro/500 #6b6b6b | neutro/600 #525250 | neutro/300 #b8b8b2 |
| dados/grade | `--cor-dados-grade` | neutro/100 #e8e8e3 | neutro/800 #262625 | neutro/300 #b8b8b2 | neutro/700 #3c3c3a |
| fundo/selecao | `--cor-fundo-selecao` | azul/200 #bcc7fb | azul/800 #141f72 | azul/200 #bcc7fb | azul/800 #141f72 |
| fundo/marca-texto | `--cor-fundo-marca-texto` | ambar/100 #ffebbf | ambar/900 #4d3100 | ambar/100 #ffebbf | ambar/900 #4d3100 |
| borda/controle | `--cor-borda-controle` | neutro/400 #8f8f8a | neutro/500 #6b6b6b | neutro/700 #3c3c3a | neutro/300 #b8b8b2 |
| texto/sobre-imagem | `--cor-texto-sobre-imagem` | neutro/0 #ffffff | neutro/0 #ffffff | neutro/0 #ffffff | neutro/0 #ffffff |
| texto/ia | `--cor-texto-ia` | violeta/700 #4b2fbf | violeta/300 #ad9ff5 | violeta/700 #4b2fbf | violeta/300 #ad9ff5 |
| fundo/ia-sutil | `--cor-fundo-ia-sutil` | violeta/50 #f3f1fe | violeta/950 #170e3d | violeta/50 #f3f1fe | violeta/950 #170e3d |
| borda/ia | `--cor-borda-ia` | violeta/500 #6e52e6 | violeta/300 #ad9ff5 | violeta/700 #4b2fbf | violeta/300 #ad9ff5 |
| fundo/marca-pressionado | `--cor-fundo-marca-pressionado` | azul/700 #172694 | azul/700 #172694 | azul/900 #111a57 | azul/100 #dde3fd |
| fundo/erro-pressionado | `--cor-fundo-erro-pressionado` | vermelho/900 #4a0d0d | vermelho/900 #4a0d0d | vermelho/900 #4a0d0d | vermelho/50 #fdecec |
| fundo/fantasma-pressionado | `--cor-fundo-fantasma-pressionado` | transparente/preto-12 #0a0a0a 12% | transparente/branco-25 #ffffff 25% | transparente/preto-35 #0a0a0a 35% | transparente/branco-25 #ffffff 25% |
| fundo/invertido-pressionado | `--cor-fundo-invertido-pressionado` | neutro/700 #3c3c3a | neutro/300 #b8b8b2 | neutro/700 #3c3c3a | neutro/300 #b8b8b2 |
| texto/marca-hover | `--cor-texto-marca-hover` | azul/600 #1b2fb8 | azul/200 #bcc7fb | azul/800 #141f72 | azul/200 #bcc7fb |
| texto/marca-pressionado | `--cor-texto-marca-pressionado` | azul/700 #172694 | azul/100 #dde3fd | azul/900 #111a57 | azul/100 #dde3fd |

## Para que serve cada cor

O papel, o par e o contraste medido de cada token. É a mesma descrição que aparece no Figma e no `$description` dos arquivos de tokens.

- `--cor-fundo-pagina`: Fundo da página, atrás de tudo. Texto por cima: texto/padrao. Contraste: 18,9:1 ou mais no claro e no escuro, 19,7:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 102 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-superficie`: Cards, painéis, campos e janelas sobre a página. A borda cor/borda/padrao separa a superfície da página; a sombra fica só para o que flutua. Texto por cima: texto/padrao. Contraste: 17,3:1 ou mais no claro e no escuro, 19,7:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 103 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-sutil`: Áreas de apoio e hover de itens neutros, como itens de menu e o botão Contorno. Texto por cima: texto/padrao. Contraste: 14,4:1 ou mais no claro e no escuro, 17,7:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 98 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-sutil-hover`: Hover sobre fundo/sutil e estado pressionado de itens neutros. Texto por cima: texto/padrao. Contraste: 10,5:1 ou mais no claro e no escuro, 15,1:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 92 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-invertido`: Bloco de contraste invertido: escuro no claro e claro no escuro, como o botão Secundário. Texto por cima: texto/invertido. Contraste: 18,9:1 ou mais no claro e no escuro, 19,7:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 102 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-marca`: Ação principal: botão Primário, checkbox e rádio marcados, interruptor ligado. Texto por cima: texto/sobre-marca. Contraste: 6,7:1 ou mais no claro e no escuro, 8,1:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 87 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-marca-hover`: Hover da ação principal. Texto por cima: texto/sobre-marca. Contraste: 9,7:1 ou mais no claro e no escuro, 11,9:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 95 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-marca-sutil`: Destaque leve da marca: item selecionado, etiqueta ativa, checkbox desmarcado pressionado. Texto por cima: texto/marca. Contraste: 5,9:1 ou mais no claro e no escuro, 7,5:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 53 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-sucesso`: Fundo forte de sucesso. Sempre com ícone ou texto. Texto por cima: texto/sobre-marca. Contraste: 5,4:1 ou mais no claro e no escuro, 11,0:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 81 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-sucesso-sutil`: Fundo de alertas e selos de sucesso. Texto por cima: texto/sucesso. Contraste: 4,9:1 ou mais no claro e no escuro, 7,2:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 64 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-alerta`: Fundo forte de alerta, em áreas pequenas como selos e pontos de status. Sempre com ícone ou texto.
- `--cor-fundo-alerta-sutil`: Fundo de alertas e selos de atenção. Texto por cima: texto/alerta. Contraste: 5,7:1 ou mais no claro e no escuro, 8,1:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 74 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-erro`: Fundo forte de erro: botão Perigo e contadores de erro. Texto por cima: texto/sobre-marca. Contraste: 4,8:1 ou mais no claro e no escuro, 7,5:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 77 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-erro-hover`: Hover de fundo/erro. Texto por cima: texto/sobre-marca. Contraste: 7,5:1 ou mais no claro e no escuro, 14,1:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 89 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-erro-sutil`: Fundo de alertas e mensagens de erro. Texto por cima: texto/erro. Contraste: 6,4:1 ou mais no claro e no escuro, 11,0:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 51 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-desabilitado`: Fundo de itens desabilitados. Isento de contraste pela WCAG; explique perto do item por que ele não está disponível.
- `--cor-fundo-sobreposicao`: Camada escura e translúcida atrás de janelas modais.
- `--cor-fundo-fantasma-hover`: Hover translúcido de botões e itens sem fundo (botão Fantasma, segmento). Texto por cima: texto/padrao. Contraste: 14,1:1 ou mais no claro e no escuro, 13,4:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 91 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-padrao`: Texto principal. Medido sobre fundo/pagina. Contraste: 18,9:1 ou mais no claro e no escuro, 19,7:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 102 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-secundario`: Texto de apoio: descrições, ajudas e legendas. Medido sobre fundo/pagina. Contraste: 10,5:1 ou mais no claro e no escuro, 15,1:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 81 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-terciario`: Texto de menor destaque: datas, contadores e textos de exemplo dentro de campos. Medido sobre fundo/superficie. Contraste: 5,3:1 ou mais no claro e no escuro, 7,8:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 41 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-invertido`: Texto sobre fundo/invertido e seus estados. Medido sobre fundo/invertido. Contraste: 18,9:1 ou mais no claro e no escuro, 19,7:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 102 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-marca`: Links e destaques da marca. Medido sobre fundo/superficie. Contraste: 6,7:1 ou mais no claro e no escuro, 8,1:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 53 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-sobre-marca`: Texto e ícone sobre fundo/marca, fundo/sucesso e fundo/erro, com seus estados. Não use sobre fotos: para isso existe texto/sobre-imagem. Medido sobre fundo/marca. Contraste: 6,7:1 ou mais no claro e no escuro, 8,1:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 87 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-sucesso`: Texto de sucesso. Sempre com ícone. Medido sobre fundo/sucesso-sutil. Contraste: 4,9:1 ou mais no claro e no escuro, 7,2:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 64 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-alerta`: Texto de atenção. Sempre com ícone. Medido sobre fundo/alerta-sutil. Contraste: 5,7:1 ou mais no claro e no escuro, 8,1:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 74 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-erro`: Texto de erro: diz o que houve e como resolver. Sempre com ícone. Medido sobre fundo/erro-sutil. Contraste: 6,4:1 ou mais no claro e no escuro, 11,0:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 51 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-desabilitado`: Texto de itens desabilitados. Isento de contraste pela WCAG.
- `--cor-borda-padrao`: Linhas decorativas: divisores e bordas de cards. Isenta de contraste.
- `--cor-borda-forte`: Bordas de botão Contorno e etiquetas, e hover de bordas. Decorativa: o texto identifica o item.
- `--cor-borda-marca`: Borda de itens selecionados e de controles no hover. Medido sobre fundo/superficie. Contraste: 4,5:1 ou mais no claro e no escuro, 8,1:1 ou mais no alto contraste (mínimo 3:1 e, no alto contraste, 4,5:1). APCA: Lc 33 ou mais no claro e no escuro.
- `--cor-borda-foco`: Anel de foco pelo teclado: 2 px, afastado 2 px do componente. Medido sobre fundo/pagina. Contraste: 4,9:1 ou mais no claro e no escuro, 8,1:1 ou mais no alto contraste (mínimo 3:1 e, no alto contraste, 4,5:1). APCA: Lc 34 ou mais no claro e no escuro.
- `--cor-borda-sucesso`: Borda de campos e alertas de sucesso. Sempre com ícone ou texto.
- `--cor-borda-alerta`: Borda de alertas de atenção. Sempre com ícone e texto.
- `--cor-borda-erro`: Borda de campos com erro. Sempre com mensagem de erro. Medido sobre fundo/superficie. Contraste: 4,8:1 ou mais no claro e no escuro, 7,5:1 ou mais no alto contraste (mínimo 3:1 e, no alto contraste, 4,5:1). APCA: Lc 53 ou mais no claro e no escuro.
- `--cor-fundo-invertido-hover`: Hover de fundo/invertido. Texto por cima: texto/invertido. Contraste: 13,5:1 ou mais no claro e no escuro, 13,5:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 81 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-controle-desligado`: Trilho do interruptor desligado. Medido sobre fundo/superficie. Contraste: 3,2:1 ou mais no claro e no escuro, 6,0:1 ou mais no alto contraste (mínimo 3:1 e, no alto contraste, 4,5:1). APCA: Lc 24 ou mais no claro e no escuro.
- `--cor-dados-1`: Série 1 dos gráficos. Sempre com rótulo ou legenda. Medido sobre fundo/superficie. Contraste: 4,5:1 ou mais no claro e no escuro, 8,1:1 ou mais no alto contraste. APCA: Lc 33 ou mais no claro e no escuro.
- `--cor-dados-2`: Série 2 dos gráficos. Sempre com rótulo ou legenda. Medido sobre fundo/superficie. Contraste: 2,4:1 ou mais no claro e no escuro, 6,7:1 ou mais no alto contraste. APCA: Lc 47 ou mais no claro e no escuro.
- `--cor-dados-3`: Série 3 dos gráficos. Sempre com rótulo ou legenda. Medido sobre fundo/superficie. Contraste: 1,8:1 ou mais no claro e no escuro, 6,0:1 ou mais no alto contraste. APCA: Lc 33 ou mais no claro e no escuro.
- `--cor-dados-4`: Série 4 dos gráficos. Sempre com rótulo ou legenda. Medido sobre fundo/superficie. Contraste: 3,2:1 ou mais no claro e no escuro, 5,4:1 ou mais no alto contraste. APCA: Lc 59 ou mais no claro e no escuro.
- `--cor-dados-5`: Série 5 dos gráficos. Sempre com rótulo ou legenda. Medido sobre fundo/superficie. Contraste: 3,2:1 ou mais no claro e no escuro, 7,8:1 ou mais no alto contraste. APCA: Lc 24 ou mais no claro e no escuro.
- `--cor-dados-grade`: Linhas de grade dos gráficos. Decorativa.
- `--cor-fundo-selecao`: Fundo do texto que a pessoa seleciona. Texto por cima: texto/padrao. Contraste: 11,9:1 ou mais no claro e no escuro, 11,9:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 74 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-marca-texto`: Marca-texto dos resultados de busca. Texto por cima: texto/padrao. Contraste: 11,4:1 ou mais no claro e no escuro, 11,9:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 95 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-borda-controle`: Borda de campos, checkbox e rádio. Medido sobre fundo/superficie. Contraste: 3,2:1 ou mais no claro e no escuro, 9,9:1 ou mais no alto contraste (mínimo 3:1 e, no alto contraste, 4,5:1). APCA: Lc 24 ou mais no claro e no escuro.
- `--cor-texto-sobre-imagem`: Texto sobre fotos, vídeos e gradientes escuros. Branco em todos os modos.
- `--cor-texto-ia`: Texto e ícone do rótulo de IA. Só para identificar o que veio da IA. Medido sobre fundo/ia-sutil. Contraste: 7,6:1 ou mais no claro e no escuro, 7,6:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 55 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-ia-sutil`: Fundo do rótulo de IA e de áreas pequenas geradas por IA. Nunca em telas inteiras. Texto por cima: texto/ia. Contraste: 7,6:1 ou mais no claro e no escuro, 7,6:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 55 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-borda-ia`: Borda de campos e blocos preenchidos pela IA. Medido sobre fundo/superficie. Contraste: 5,2:1 ou mais no claro e no escuro, 8,5:1 ou mais no alto contraste (mínimo 3:1 e, no alto contraste, 4,5:1). APCA: Lc 55 ou mais no claro e no escuro.
- `--cor-fundo-marca-pressionado`: Ação principal pressionada. Texto por cima: texto/sobre-marca. Contraste: 12,0:1 ou mais no claro e no escuro, 15,5:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 100 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-erro-pressionado`: Estado pressionado de fundo/erro. Texto por cima: texto/sobre-marca. Contraste: 15,5:1 ou mais no claro e no escuro, 15,5:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 104 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-fantasma-pressionado`: Estado pressionado translúcido de botões e itens sem fundo. Texto por cima: texto/padrao. Contraste: 8,8:1 ou mais no claro e no escuro, 8,4:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 85 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-fundo-invertido-pressionado`: Estado pressionado de fundo/invertido. Texto por cima: texto/invertido. Contraste: 9,9:1 ou mais no claro e no escuro, 9,9:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 65 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-marca-hover`: Link no hover. Medido sobre fundo/superficie. Contraste: 9,7:1 ou mais no claro e no escuro, 11,9:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 73 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.
- `--cor-texto-marca-pressionado`: Link pressionado. Medido sobre fundo/superficie. Contraste: 12,0:1 ou mais no claro e no escuro, 15,5:1 ou mais no alto contraste (mínimo 4,5:1 e, no alto contraste, 7:1). APCA: Lc 89 ou mais no claro e no escuro. Alvo APCA: Lc 75 em texto corrido, Lc 60 em textos curtos.

## Primitivos

`--azul-50` #eef1fe · `--azul-100` #dde3fd · `--azul-200` #bcc7fb · `--azul-300` #8fa1f7 · `--azul-400` #5b74f2 · `--azul-500` #2544ec · `--azul-600` #1b2fb8 · `--azul-700` #172694 · `--azul-800` #141f72 · `--azul-900` #111a57 · `--azul-950` #0b1036 · `--neutro-0` #ffffff · `--neutro-25` #fafaf7 · `--neutro-50` #f3f3ee · `--neutro-100` #e8e8e3 · `--neutro-200` #d6d6d0 · `--neutro-300` #b8b8b2 · `--neutro-400` #8f8f8a · `--neutro-500` #6b6b6b · `--neutro-600` #525250 · `--neutro-700` #3c3c3a · `--neutro-800` #262625 · `--neutro-900` #161615 · `--neutro-950` #0a0a0a · `--ambar-50` #fff7e6 · `--ambar-100` #ffebbf · `--ambar-300` #ffcf66 · `--ambar-500` #ffb020 · `--ambar-700` #a86a00 · `--ambar-900` #4d3100 · `--verde-50` #e9f8ef · `--verde-100` #c9eed7 · `--verde-300` #7fd3a0 · `--verde-500` #16a34a · `--verde-700` #0f7a36 · `--verde-900` #08391a · `--vermelho-50` #fdecec · `--vermelho-100` #fad0d0 · `--vermelho-300` #f08a8a · `--vermelho-500` #dc2626 · `--vermelho-700` #a51c1c · `--vermelho-900` #4a0d0d · `--ambar-800` #8a5700 · `--violeta-50` #f3f1fe · `--violeta-100` #e4defd · `--violeta-300` #ad9ff5 · `--violeta-500` #6e52e6 · `--violeta-700` #4b2fbf · `--violeta-900` #28196b · `--violeta-950` #170e3d · `--transparente-preto-8` rgb(10 10 10 / 7.8%) · `--transparente-preto-12` rgb(10 10 10 / 12%) · `--transparente-preto-35` rgb(10 10 10 / 35%) · `--transparente-preto-45` rgb(10 10 10 / 45%) · `--transparente-preto-60` rgb(10 10 10 / 60%) · `--transparente-preto-75` rgb(10 10 10 / 75%) · `--transparente-branco-12` rgb(255 255 255 / 12.2%) · `--transparente-branco-15` rgb(255 255 255 / 15%) · `--transparente-branco-25` rgb(255 255 255 / 25%) · `--transparente-branco-40` rgb(255 255 255 / 40%) · `--transparente-branco-55` rgb(255 255 255 / 55%) · `--transparente-branco-60` rgb(255 255 255 / 60%) · `--transparente-branco-70` rgb(255 255 255 / 70%) · `--transparente-branco-85` rgb(255 255 255 / 85%)
