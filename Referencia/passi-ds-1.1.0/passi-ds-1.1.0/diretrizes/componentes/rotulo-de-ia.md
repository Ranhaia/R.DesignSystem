# Rótulo de IA

Componente do PASSI DS 1.1.0 · página "Rótulo de IA" no arquivo Figma.

O rótulo de IA avisa que um conteúdo, uma sugestão ou uma resposta veio de inteligência artificial. Ao ser clicado, abre a explicação: de onde veio, quais fontes usou e quais são os limites. Ele identifica, não enfeita.

## Rótulo de IA

Rótulo de IA · marca o que foi feito ou sugerido por inteligência artificial e abre a Explicação da IA ao ser clicado. Só identifica: não é decoração. Padrão (IA) ao lado de títulos e blocos; Compacto (só o brilho) em campos e espaços pequenos, sempre com nome acessível; Com texto onde a mensagem precisa ser explícita.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Tipo | Variante | Padrão, Compacto, Com texto | Padrão |
| Estado | Variante | Padrão, Hover, Pressionado, Foco | Padrão |

## Como usar

### Tipos e estados

Padrão ao lado de títulos e blocos. Compacto dentro de campos e onde o espaço é curto. Com texto quando a mensagem precisa ser dita por extenso.

Exemplos no Figma: Padrão · Padrão; Padrão · Hover; Padrão · Pressionado; Padrão · Foco; Compacto · Padrão; Compacto · Hover; Compacto · Pressionado; Compacto · Foco; Com texto · Padrão; Com texto · Hover; Com texto · Pressionado; Com texto · Foco.

### Em uso

O rótulo fica ao lado do que a IA fez, e só ali. O resto da tela continua nas cores normais.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Use IA, sem pontos e em maiúsculas.
- No tipo Com texto, diga o que a IA fez: Gerado por IA, Resumo da IA.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: É um botão: Tab chega ao rótulo e Enter ou Espaço abrem a Explicação da IA.
- Leitor de tela: Papel button com nome completo, por exemplo Conteúdo gerado por IA, ver explicação. No tipo Compacto, o nome em texto é obrigatório, porque não há palavra visível.
- Foco: Anel de foco de 2 px. Ao abrir a explicação, o foco vai para ela; ao fechar, volta para o rótulo.
- Cuidados: A cor não é o único sinal: o rótulo sempre tem o brilho e, nos tipos Padrão e Com texto, a palavra IA.

## Tokens usados

Fundo: cor/fundo/ia-sutil. Borda: cor/borda/ia (1,5 px no hover e 2 px pressionado). Texto e ícone: cor/texto/ia. Ícone: brilho. Canto: raio/pilula. Foco: cor/borda/foco.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Coloque o rótulo ao lado de cada conteúdo feito ou sugerido pela IA.
- Deixe o rótulo abrir a explicação: de onde veio e quais os limites.
- Use o tipo Com texto quando a lei ou o contexto pedirem aviso explícito.

## NÃO faça

- Usar a cor ou o brilho da IA como enfeite em botões, fundos ou telas inteiras.
- Rotular algo que a IA não fez, só para parecer moderno.
- Esconder o rótulo depois que a pessoa aceita a sugestão.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
