# Acessibilidade

Fundamento do PASSI DS 1.1.0 · página "Acessibilidade" no arquivo Figma. Vale para tudo o que for feito com o sistema.

O que o PASSI DS faz para que mais pessoas consigam usar o que você criar, e o que ainda depende de quem desenha e de quem programa. A meta é a WCAG 2.2 nível AA, a mesma base da norma brasileira ABNT NBR 17225.

## Meta de conformidade

No Brasil, a acessibilidade digital é lei. O PASSI DS ajuda a cumprir essa lei no design, mas a conformidade de um site ou aplicativo depende de como ele é escrito, programado e testado.

- Lei Brasileira de Inclusão, artigo 63: sites de empresas com sede ou representação no Brasil, e de órgãos do governo, precisam ser acessíveis.
- ABNT NBR 17225 (março de 2025): a norma técnica brasileira que diz como cumprir a lei em sites. O nível de conformidade regular equivale à WCAG 2.2 níveis A e AA.
- Meta do PASSI DS: WCAG 2.2 AA.

O PASSI DS cuida de contraste, anel de foco, tamanho de alvo e da descrição de teclado, leitor de tela e foco de cada componente. Depende de quem usa: texto alternativo, ordem de leitura e de foco de cada tela, testes com teclado e leitor de tela, e código que siga estas orientações.

## Contraste

Texto precisa de 4,5:1, ou 3:1 a partir de 24 px (19 px em negrito). Bordas de campo, ícones, anel de foco e partes de gráfico precisam de 3:1. Texto desabilitado e linhas decorativas não precisam atingir o mínimo. Valores calculados a partir das variáveis do arquivo. A coluna APCA mostra a segunda régua (Lc): ajuda a escolher entre pares que já passam. Alvos: Lc 75 para texto corrido, Lc 60 para textos curtos e Lc 45 para títulos grandes. Quem decide é a WCAG.

Mínimo: texto 4,5:1; bordas de campo, foco, controles e gráficos 3:1. Nos modos de alto contraste, a meta é 7:1 para texto e 4,5:1 para o resto.

A WCAG decide o que passa porque é o que a lei e a ABNT NBR 17225 cobram. Por que a tabela tem duas réguas: [decisoes.md](../decisoes.md) (D7).

| Texto ou elemento | Fundo | Claro | Escuro | Alto contraste claro | Alto contraste escuro | APCA claro / escuro |
|---|---|---|---|---|---|---|
| `texto/padrao` | `fundo/pagina` | 18,9:1 | 18,9:1 | 19,7:1 | 19,7:1 | Lc 102 / Lc 104 |
| `texto/padrao` | `fundo/sutil` | 17,7:1 | 14,4:1 | 17,7:1 | 18,1:1 | Lc 98 / Lc 101 |
| `texto/secundario` | `fundo/pagina` | 10,5:1 | 13,5:1 | 15,1:1 | 16,1:1 | Lc 92 / Lc 81 |
| `texto/secundario` | `fundo/sutil` | 9,9:1 | 10,3:1 | 13,6:1 | 14,7:1 | Lc 88 / Lc 78 |
| `texto/terciario` | `fundo/superficie` | 5,3:1 | 5,5:1 | 7,8:1 | 9,9:1 | Lc 76 / Lc 41 |
| `texto/terciario` | `fundo/sutil` | 4,7:1 | 4,6:1 | 7,0:1 | 9,0:1 | Lc 69 / Lc 38 |
| `texto/marca` | `fundo/superficie` | 6,7:1 | 7,4:1 | 12,0:1 | 8,1:1 | Lc 82 / Lc 53 |
| `texto/marca` | `fundo/marca-sutil` | 5,9:1 | 7,5:1 | 10,7:1 | 7,5:1 | Lc 73 / Lc 53 |
| `texto/sucesso` | `fundo/sucesso-sutil` | 4,9:1 | 7,2:1 | 11,8:1 | 7,2:1 | Lc 70 / Lc 64 |
| `texto/alerta` | `fundo/alerta-sutil` | 5,7:1 | 8,1:1 | 11,2:1 | 8,1:1 | Lc 75 / Lc 74 |
| `texto/alerta` | `fundo/sutil` | 5,4:1 | 10,3:1 | 10,7:1 | 12,3:1 | Lc 72 / Lc 78 |
| `texto/erro` | `fundo/erro-sutil` | 6,6:1 | 6,4:1 | 13,5:1 | 11,0:1 | Lc 75 / Lc 51 |
| `texto/sobre-marca` | `fundo/marca` | 6,7:1 | 6,7:1 | 12,0:1 | 8,1:1 | Lc 87 / Lc 87 |
| `texto/sobre-marca` | `fundo/marca-hover` | 9,7:1 | 9,7:1 | 14,2:1 | 11,9:1 | Lc 95 / Lc 95 |
| `texto/sobre-marca` | `fundo/marca-pressionado` | 12,0:1 | 12,0:1 | 16,0:1 | 15,5:1 | Lc 100 / Lc 100 |
| `texto/sobre-marca` | `fundo/sucesso` | 5,4:1 | 5,4:1 | 13,0:1 | 11,0:1 | Lc 81 / Lc 81 |
| `texto/sobre-marca` | `fundo/erro` | 4,8:1 | 4,8:1 | 7,5:1 | 8,2:1 | Lc 77 / Lc 77 |
| `texto/sobre-marca` | `fundo/erro-hover` | 7,5:1 | 7,5:1 | 15,5:1 | 14,1:1 | Lc 89 / Lc 89 |
| `texto/sobre-marca` | `fundo/erro-pressionado` | 15,5:1 | 15,5:1 | 15,5:1 | 17,3:1 | Lc 104 / Lc 104 |
| `texto/invertido` | `fundo/invertido` | 18,9:1 | 18,9:1 | 19,7:1 | 19,7:1 | Lc 104 / Lc 102 |
| `texto/invertido` | `fundo/invertido-hover` | 14,4:1 | 13,5:1 | 15,1:1 | 13,5:1 | Lc 101 / Lc 81 |
| `texto/invertido` | `fundo/invertido-pressionado` | 10,5:1 | 9,9:1 | 11,0:1 | 9,9:1 | Lc 95 / Lc 65 |
| `texto/marca-hover` | `fundo/superficie` | 9,7:1 | 10,9:1 | 14,2:1 | 11,9:1 | Lc 91 / Lc 73 |
| `texto/marca-pressionado` | `fundo/superficie` | 12,0:1 | 14,2:1 | 16,0:1 | 15,5:1 | Lc 96 / Lc 89 |
| `texto/padrao` | `fundo/sutil-hover` | 16,1:1 | 10,5:1 | 16,1:1 | 15,1:1 | Lc 92 / Lc 95 |
| `texto/padrao` | `fundo/fantasma-hover` | 16,0:1 | 14,1:1 | 15,2:1 | 13,4:1 | Lc 91 / Lc 101 |
| `texto/padrao` | `fundo/fantasma-pressionado` | 14,5:1 | 8,8:1 | 8,4:1 | 9,2:1 | Lc 85 / Lc 92 |
| `texto/padrao` | `fundo/selecao` | 11,9:1 | 13,6:1 | 11,9:1 | 14,2:1 | Lc 74 / Lc 100 |
| `texto/padrao` | `fundo/marca-texto` | 16,8:1 | 11,4:1 | 16,8:1 | 11,9:1 | Lc 95 / Lc 97 |
| `texto/ia` | `fundo/superficie` | 8,5:1 | 7,8:1 | 8,5:1 | 8,5:1 | Lc 88 / Lc 55 |
| `texto/ia` | `fundo/ia-sutil` | 7,6:1 | 7,7:1 | 7,6:1 | 7,7:1 | Lc 80 / Lc 55 |
| `borda/ia` | `fundo/superficie` | 5,2:1 | 7,8:1 | 8,5:1 | 8,5:1 | Lc 75 / Lc 55 |
| `borda/controle` | `fundo/superficie` | 3,2:1 | 3,3:1 | 11,0:1 | 9,9:1 | Lc 59 / Lc 24 |
| `borda/controle` | `fundo/pagina` | 3,1:1 | 3,7:1 | 11,0:1 | 9,9:1 | Lc 56 / Lc 25 |
| `borda/foco` | `fundo/pagina` | 6,4:1 | 4,9:1 | 12,0:1 | 8,1:1 | Lc 78 / Lc 34 |
| `borda/marca` | `fundo/superficie` | 6,7:1 | 4,5:1 | 12,0:1 | 8,1:1 | Lc 82 / Lc 33 |
| `borda/erro` | `fundo/superficie` | 4,8:1 | 7,5:1 | 7,5:1 | 8,2:1 | Lc 71 / Lc 53 |
| `fundo/controle-desligado` | `fundo/superficie` | 3,2:1 | 3,3:1 | 7,8:1 | 6,0:1 | Lc 59 / Lc 24 |
| `dados/1` | `fundo/superficie` | 6,7:1 | 4,5:1 | 12,0:1 | 8,1:1 | Lc 82 / Lc 33 |
| `dados/2` | `fundo/superficie` | 2,4:1 (use com rótulo) | 7,4:1 | 6,7:1 | 15,5:1 | Lc 47 / Lc 53 |
| `dados/3` | `fundo/superficie` | 1,8:1 (use com rótulo) | 9,9:1 | 6,0:1 | 13,5:1 | Lc 33 / Lc 67 |
| `dados/4` | `fundo/superficie` | 3,2:1 | 10,1:1 | 5,4:1 | 11,0:1 | Lc 59 / Lc 68 |
| `dados/5` | `fundo/superficie` | 3,2:1 | 3,3:1 | 7,8:1 | 9,9:1 | Lc 59 / Lc 24 |

Isentos: `texto/desabilitado` (itens desabilitados) e as linhas decorativas `borda/padrao` e `borda/forte`. Cada token de cor traz na descrição o seu par e o contraste medido (veja tokens/cores.md). Gráficos usam sempre rótulo ou legenda direta, nunca só a cor.

## Foco pelo teclado

Quem navega pelo teclado precisa ver onde está. Em botões com fundo, checkbox, rádio, interruptor e controle deslizante, o anel de foco tem 2 px na cor borda/foco, separado do componente por 2 px na cor do fundo, então aparece até sobre o azul da marca. Botões sem fundo e links ganham uma borda borda/foco por fora. Campos mostram o foco com a borda azul de 2 px.

No CSS: `:focus-visible { outline: 2px solid var(--cor-borda-foco); outline-offset: 2px; }`. Nunca remova o contorno de foco sem colocar outro no lugar.

## O que a WCAG 2.2 trouxe de novo

| Critério | O que pede | Como fazer no PASSI DS |
|---|---|---|
| 2.4.11 Foco não encoberto (AA) | O item em foco não pode ficar escondido atrás de barras fixas, avisos ou banners. | Deixe espaço para o Cabeçalho do site fixo e para o Aviso rápido; ao receber foco, o item deve rolar para a área visível. |
| 2.5.7 Movimento de arrastar (AA) | Toda ação de arrastar precisa de uma alternativa com clique ou toque simples. | O Controle deslizante aceita setas do teclado e clique no trilho. Listas que se reordenam precisam de botões para subir e descer. |
| 2.5.8 Tamanho do alvo (AA) | Alvos de pelo menos 24 por 24 px, ou com espaço livre em volta. | O menor botão do PASSI tem 32 px. Ícones clicáveis menores, como o fechar da Etiqueta, precisam de área de toque de 24 px. |
| 3.2.6 Ajuda consistente (A) | Ajuda e contato ficam no mesmo lugar em todas as telas. | Use o Cabeçalho e o Rodapé do site sempre na mesma posição, com o contato no mesmo ponto. |
| 3.3.7 Entrada redundante (A) | Não pedir de novo o que a pessoa já informou no mesmo processo. | Nos Passos, traga preenchido o que já foi digitado, como o endereço de entrega na etapa de cobrança. |
| 3.3.8 Autenticação acessível (AA) | Entrar sem teste de memória ou quebra-cabeça. Colar senha e código precisa funcionar. | O Campo de texto de senha e o Código de verificação aceitam colar, e o código aceita o número inteiro de uma vez. |

## Modos de acessibilidade

A coleção Cor tem quatro modos. Os de alto contraste deixam todo texto com pelo menos 7:1 e bordas, foco e gráficos com 4,5:1, para pessoas com baixa visão. A coleção Movimento tem o modo Reduzido, que zera as durações para quem pede menos movimento. No Figma, troque o modo na moldura pelo painel de variáveis. No código, os modos seguem as preferências do sistema da pessoa.

- Alto contraste: `tokens/cor.alto-contraste-claro.tokens.json` e `tokens/cor.alto-contraste-escuro.tokens.json`. No `passi.css`, entram sozinhos com `prefers-contrast: more`, ou à força com `data-tema="alto-contraste-claro"` ou `data-tema="alto-contraste-escuro"` no `<html>`.
- Movimento reduzido: `tokens/movimento.reduzido.tokens.json`. No `passi.css`, entra com `prefers-reduced-motion: reduce`. Troque deslizes e giros por mudanças suaves de opacidade ou por nenhuma animação.

## Em cada componente

Toda página de componente tem a seção "Acessibilidade" com teclado, leitor de tela, foco e cuidados. Siga essa seção ao escrever o código; o que não está escrito, a IA tende a inventar.

## Kit de anotação de acessibilidade

Na página Utilitários do Figma, o componente "Anotação de acessibilidade" marca ordem de foco, títulos, regiões, rótulos, texto alternativo, anúncios do leitor de tela e elementos decorativos. Ao receber uma tela anotada, siga as etiquetas.

## Faça

- Teste cada tela só com o teclado: Tab, Shift+Tab, Enter, Espaço e Esc.
- Dê rótulo visível a todo campo. O texto de exemplo não substitui o rótulo.
- Mostre erro, sucesso e status com cor, ícone e texto juntos.
- Respeite quem pede menos movimento nas configurações do sistema.
- Anote ordem do foco, títulos e textos alternativos com o Kit de anotação da página Utilitários.

## NÃO faça

- Tirar o anel de foco porque ficou feio.
- Texto secundário ou terciário menor que 12 px.
- Avisos que somem sozinhos levando informação importante.
- Gráficos que dependem só da cor para serem entendidos.
