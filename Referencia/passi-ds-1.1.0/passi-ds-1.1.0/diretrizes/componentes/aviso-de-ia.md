# Aviso de IA

Componente do PASSI DS 1.1.0 · página "Aviso de IA" no arquivo Figma.

Avisos curtos que dizem a verdade sobre a IA: quando a pessoa está falando com uma, o que ela não sabe, o que foi gerado por ela e como chegar a uma pessoa. Transparência simples, sem letras miúdas.

## Aviso de IA

Aviso de IA · mensagens curtas de transparência. Conversa com IA: avisa no início de uma conversa que a pessoa fala com uma IA (exigido pela lei europeia de IA desde agosto de 2026). Limitação: o que a IA não sabe ou não vê. Conteúdo gerado: linha discreta abaixo de textos ou imagens feitos com IA. Falar com uma pessoa: saída sempre disponível para atendimento humano.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Conversa com IA, Limitação, Conteúdo gerado, Falar com uma pessoa | Conversa com IA |

## Como usar

### Tipos

Conversa com IA no começo de toda conversa. Limitação perto do campo de pedido. Conteúdo gerado abaixo do que foi feito com IA. Falar com uma pessoa sempre ao alcance.

Exemplos no Figma: Conversa com IA; Limitação; Conteúdo gerado; Falar com uma pessoa.

### Texto padrão em português

Use estas frases como ponto de partida. Elas são curtas, diretas e não fingem que a IA é uma pessoa.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Frases curtas e diretas, sem letras miúdas: Você está conversando com uma IA.
- Diga o limite em termos concretos: Ela não vê os seus dados nem a internet.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Só o botão de Falar com uma pessoa recebe Tab.
- Leitor de tela: O aviso de conversa é lido no começo da conversa, antes da primeira resposta. Os outros são lidos na ordem normal da página. O ícone é decorativo: a mensagem está no texto.
- Foco: Os avisos não roubam o foco.
- Cuidados: O aviso não pode sumir sozinho nem ficar escondido em letra miúda.

## Tokens usados

Conversa com IA: cor/fundo/ia-sutil com ícone brilho em cor/texto/ia. Limitação e Falar com uma pessoa: cor/fundo/sutil e cor/texto/secundario. Conteúdo gerado: Legenda em cor/texto/secundario. Canto: raio/grande.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Avise logo no começo que a pessoa está falando com uma IA.
- Diga o que a IA não sabe ou não vê.
- Ofereça sempre um caminho para falar com uma pessoa.

## NÃO faça

- Esconder o aviso em termos de uso.
- Usar o aviso como desculpa para respostas ruins.
- Dar nome e foto de gente à IA.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
