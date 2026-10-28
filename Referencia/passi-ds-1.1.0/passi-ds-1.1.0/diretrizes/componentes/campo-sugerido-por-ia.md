# Campo sugerido por IA

Componente do PASSI DS 1.1.0 · página "Campo sugerido por IA" no arquivo Figma.

Quando a IA preenche um campo por você, o PASSI mostra isso com clareza: rótulo de IA, borda própria e uma frase dizendo de onde veio a sugestão. Se a pessoa mudar o valor, o campo volta ao normal e oferece voltar à sugestão.

## Campo sugerido por IA

Campo sugerido por IA · campo de formulário que chega preenchido por uma sugestão da IA. Mostra o Rótulo de IA compacto e a borda da IA enquanto o valor é o sugerido. Se a pessoa editar, volta ao visual normal e ganha o botão “Voltar à sugestão da IA”. A pessoa sempre confirma antes de salvar.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Cargo |
| Estado | Variante | Sugerido, Foco, Editado | Sugerido |

## Como usar

### Estados

Sugerido mostra a borda da IA. Foco usa a borda azul de sempre. Editado perde a marca da IA e ganha o atalho para desfazer a troca.

Exemplos no Figma: Sugerido; Foco; Editado.

### Em uso

Formulário de perfil em que a IA preencheu dois campos a partir de um currículo. Os campos que a pessoa digitou não têm marca.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- A ajuda diz de onde veio a sugestão: Sugerido pela IA a partir do seu perfil.
- O botão de desfazer diz o valor que volta: Voltar à sugestão da IA: Líder de design.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Funciona como o Campo de texto. O botão Voltar à sugestão da IA recebe Tab e responde a Enter.
- Leitor de tela: O nome do campo é o rótulo. A frase de ajuda, lida junto, diz que o valor foi sugerido pela IA. Ao voltar à sugestão, anuncie a troca de forma discreta.
- Foco: Borda azul de 2 px no foco. Ao voltar à sugestão, o foco volta para o campo.
- Cuidados: A marca da IA nunca é só a cor da borda: há o rótulo com o brilho e a frase de ajuda.

## Tokens usados

Sugerido: cor/borda/ia (1,5 px) e Rótulo de IA compacto. Foco: cor/borda/marca (2 px). Editado: cor/borda/controle. Fundo: cor/fundo/superficie. Botão de voltar: cor/texto/ia com ícone desfazer. Canto: raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Diga de onde veio a sugestão, em uma frase.
- Peça confirmação antes de salvar dados sugeridos.
- Ofereça voltar à sugestão depois que a pessoa editar.

## NÃO faça

- Salvar sugestões da IA sem a pessoa revisar.
- Marcar como IA um campo que a pessoa digitou.
- Sugerir dados sensíveis, como renda ou saúde, sem a pessoa pedir.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
