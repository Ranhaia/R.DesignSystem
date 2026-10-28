# Explicação da IA

Componente do PASSI DS 1.1.0 · página "Explicação da IA" no arquivo Figma.

A explicação abre quando a pessoa clica no rótulo de IA. Em poucas linhas, ela diz de onde veio o conteúdo, quais fontes a IA usou e o que ela pode errar. Explicar sob demanda gera confiança sem poluir a tela.

## Explicação da IA

Explicação da IA · painel que abre a partir do Rótulo de IA e responde “por que estou vendo isto”: de onde veio o conteúdo, quais fontes a IA usou e quais são os limites. Primeira camada de explicação, curta. Para detalhes, leve a uma página.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Título | Texto |  | Por que estou vendo isto |
| Texto | Texto |  | Este resumo foi criado por IA a partir do capítulo 3 do livro. Ele pode deixar de fora detalhes importantes. |
| Mostrar fontes | Liga/desliga |  | Ligado |
| Mostrar limitação | Liga/desliga |  | Ligado |
| Mostrar saiba mais | Liga/desliga |  | Ligado |

## Como usar

### Em uso

O painel abre colado ao rótulo, como um Popover. Fecha com Esc, com o x ou ao clicar fora.

### Variações

Sem fontes, quando a IA não consultou documentos. A limitação fica sempre que houver risco de erro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Uma ou duas frases sobre de onde veio o conteúdo.
- Diga a limitação sem pedir desculpas: A IA pode errar. Confira o original.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Abre com Enter ou Espaço no Rótulo de IA. Tab percorre os links. Esc fecha.
- Leitor de tela: Papel dialog não modal, com o título como nome. O rótulo anuncia que abre um painel e se ele está aberto.
- Foco: Ao abrir, o foco vai para o título do painel. Ao fechar, volta para o Rótulo de IA.
- Cuidados: Não esconda aqui informação obrigatória para a decisão: o essencial fica visível na tela.

## Tokens usados

Painel: cor/fundo/superficie, cor/borda/padrao, Sombra/Média, raio/grande. Limitação: cor/fundo/sutil e cor/texto/secundario. Rótulo: Rótulo de IA. Links: Link Marca e Neutro.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Diga em uma ou duas frases de onde veio o conteúdo.
- Mostre as fontes quando a IA consultou documentos.
- Inclua a limitação sempre que a IA puder errar.

## NÃO faça

- Textos longos e técnicos sobre o modelo de IA.
- Prometer precisão que a IA não tem.
- Abrir a explicação sozinha, sem a pessoa pedir.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
