# Mensagem da conversa

Componente do PASSI DS 1.1.0 · página "Mensagem da conversa" no arquivo Figma.

Cada fala da conversa com a IA. A da pessoa fica num balão à direita. A da IA vem à esquerda, sempre identificada, com as fontes quando houver e com ações para copiar, gerar de novo e avaliar. Quando algo dá errado, a mensagem diz o que fazer.

## Mensagem da conversa

Mensagem da conversa · uma fala dentro da Conversa com IA. Pessoa: balão à direita. IA: à esquerda, com avatar de brilho, nome e Rótulo de IA, e ações de copiar, gerar de novo e avaliar. IA com fontes mostra de onde a resposta veio. IA com erro explica o problema e oferece tentar de novo ou falar com uma pessoa.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Pessoa, IA gerando, IA completa, IA com fontes, IA com erro | Pessoa |

## Como usar

### Tipos

Pessoa, IA gerando, IA completa, IA com fontes e IA com erro.

Exemplos no Figma: Pessoa; IA gerando; IA completa; IA com fontes; IA com erro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- A IA não usa primeira pessoa emotiva nem finge ser humana.
- No erro, diga o que houve e ofereça saída: Tentar de novo ou Falar com uma pessoa.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: As ações de cada resposta (copiar, gerar de novo, avaliar) e os links das fontes recebem Tab.
- Leitor de tela: A conversa é uma lista de mensagens, e cada uma diz quem falou: Você ou Assistente do livro, resposta gerada por IA. A resposta nova é anunciada inteira quando termina, não palavra por palavra. Os botões de ícone têm nome em texto.
- Foco: O foco fica no Campo de pedido. Não mova o foco para a resposta quando ela chegar.
- Cuidados: Escreva sem fingir ser uma pessoa. O erro sempre oferece uma saída: tentar de novo ou falar com alguém. No código, o balão da pessoa tem no máximo 80% da largura e quebra a linha.

## Tokens usados

Pessoa: cor/fundo/sutil, raio/grande. IA: avatar com cor/fundo/ia-sutil, cor/borda/ia e ícone brilho em cor/texto/ia; Rótulo de IA. Fontes: cor/fundo/sutil e cor/texto/marca. Erro: cor/fundo/erro-sutil e cor/texto/erro.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mostre as fontes sempre que a resposta vier de documentos.
- Ofereça copiar, gerar de novo e avaliar em toda resposta.
- No erro, diga o que aconteceu e o que fazer.

## NÃO faça

- Fingir que a IA é uma pessoa, com nome humano ou foto.
- Esconder que a resposta foi gerada por IA.
- Mensagens de erro técnicas, sem saída.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
