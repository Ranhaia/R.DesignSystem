# IA no produto

Fundamento do PASSI DS 1.1.0 · página "IA no produto" no arquivo Figma.

Como mostrar inteligência artificial nas telas sem exagero e sem esconder nada. A IA ganha uma cor própria, discreta, que serve só para identificar o que ela fez. Quanto mais central a IA for na tarefa, mais presença ela tem na tela.

## Identificar, não enfeitar

O violeta da IA é um sinal, não uma decoração. Ele aparece só onde a IA fez ou sugeriu algo, para a pessoa saber o que revisar e em que confiar.

- Marque o que a IA fez: todo conteúdo, sugestão ou resposta da IA leva o Rótulo de IA. O que a pessoa digitou não leva.
- Explique quando pedirem: o rótulo abre a Explicação da IA (de onde veio, fontes e limites). Ela não abre sozinha.
- A pessoa decide: salvar, enviar, pagar ou apagar sempre passa por confirmação da pessoa.

## Expressão proporcional

A presença visual da IA cresce com o papel dela na tarefa. Comece sempre pelo nível mais discreto que resolve.

| Nível | Quando | O que usar |
|---|---|---|
| Discreta | A IA ajuda num detalhe: um resumo, uma sugestão de texto. | Só o Rótulo de IA ao lado do conteúdo. |
| Presente | A IA preenche parte de uma tarefa, como campos de um formulário. | Campo sugerido por IA: rótulo compacto, borda da IA e frase de ajuda. |
| Central | A tarefa é conversar com a IA ou deixar que ela aja. | Padrão Conversa com IA ou Plano de ação. Mesmo aqui, o resto da tela segue neutro. |

## Cores da IA

Três tokens, sempre juntos com o brilho ou a palavra IA. Funcionam no claro, no escuro e no alto contraste.

| Token | CSS | Claro | Escuro | Uso |
|---|---|---|---|---|
| texto/ia | `--cor-texto-ia` | violeta/700 #4b2fbf | violeta/300 #ad9ff5 | Texto e ícone do rótulo, nome do assistente. |
| fundo/ia-sutil | `--cor-fundo-ia-sutil` | violeta/50 #f3f1fe | violeta/950 #170e3d | Fundo do rótulo, do avatar e do aviso de conversa. Nunca em telas inteiras. |
| borda/ia | `--cor-borda-ia` | violeta/500 #6e52e6 | violeta/300 #ad9ff5 | Borda de campos e blocos preenchidos pela IA. |

Contraste: `--cor-texto-ia` passa de 7:1 sobre a superfície e sobre `--cor-fundo-ia-sutil` no claro e no escuro.

## Transparência e lei

Avisar quando a pessoa fala com uma IA e rotular o que foi gerado é boa prática e, em alguns lugares, obrigação.

- União Europeia: desde 2 de agosto de 2026, o artigo 50 da lei europeia de IA exige avisar quando a pessoa conversa com uma IA e rotular certos conteúdos gerados ou alterados por IA. Vale para empresas brasileiras que atendem pessoas na Europa.
- Brasil: o projeto de lei de IA (PL 2338/2023) trata de transparência. Confira a situação atual antes de lançar um produto.
- No PASSI DS: Aviso de IA (Conversa com IA) no começo de toda conversa, Rótulo de IA em todo conteúdo gerado e Aviso de IA (Conteúdo gerado) abaixo de textos e imagens publicados.

## Como escrever

A IA fala de forma clara e honesta, sem fingir ser uma pessoa e sem prometer o que não pode cumprir.

| Escreva assim | Evite |
|---|---|
| Você está conversando com uma IA. | Oi! Eu sou a Ana, sua amiga virtual. |
| Não encontrei isso no livro. | Desculpe, sou só uma IA e não sei de tudo. |
| Resumo gerado por IA a partir do capítulo 2. Confira o original. | Resumo 100% preciso. |
| Não consegui responder agora. Tente de novo em alguns segundos. | Erro 503: falha no modelo. |
| Prefere falar com uma pessoa? Fale com o time. | Não há atendimento humano disponível. |

## Componentes de IA

- [Rótulo de IA](../componentes/rotulo-de-ia.md)
- [Explicação da IA](../componentes/explicacao-da-ia.md)
- [Campo sugerido por IA](../componentes/campo-sugerido-por-ia.md)
- [Campo de pedido](../componentes/campo-de-pedido.md)
- [Mensagem da conversa](../componentes/mensagem-da-conversa.md)
- [Plano de ação](../componentes/plano-de-acao.md)
- [Aviso de IA](../componentes/aviso-de-ia.md)
- Tela pronta: [Conversa com IA](../padroes/conversa-com-ia.md)

## Faça

- Comece pelo nível mais discreto de expressão.
- Mostre fontes e limites sempre que a IA responder ou resumir.
- Peça confirmação antes de qualquer ação da IA que mude algo.
- Teste as telas com IA também no teclado e no leitor de tela.

## NÃO faça

- Usar violeta ou gradientes da IA como decoração.
- Rotular como IA o que não foi feito por IA.
- Dar nome, rosto ou sentimentos humanos à IA.
- Esconder que um conteúdo publicado foi gerado por IA.
