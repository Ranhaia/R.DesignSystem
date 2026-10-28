# Envio de arquivo

Componente do PASSI DS 1.1.0 · página "Envio de arquivo" no arquivo Figma.

O envio de arquivo deixa a pessoa arrastar um arquivo para a área marcada ou clicar para escolher no computador. Depois, mostra o progresso e o resultado de cada envio.

## Envio de arquivo

Envio de arquivo · área para arrastar ou escolher arquivos, com a lista de envios logo abaixo. Informe formatos e tamanho máximo antes do envio.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Estado | Variante | Padrão, Arrastando, Enviando, Concluído, Erro | Padrão |

## Como usar

### Estados

Arrastando destaca a área em azul. Enviando, concluído e erro mostram o arquivo logo abaixo.

Exemplos no Figma: Padrão; Arrastando; Enviando; Concluído; Erro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Diga os formatos e o tamanho máximo antes do envio: PDF ou DOCX, até 10 MB.
- No erro, diga o motivo e o que fazer: Arquivo maior que 10 MB. Escolha um menor.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega ao botão Escolher arquivo. Enter abre a janela do sistema. Arrastar é só um atalho.
- Leitor de tela: A área de arrastar não é um controle; o botão dentro dela é. Anuncie o início, o progresso e o resultado de cada envio sem mover o foco.
- Foco: Anel de foco no botão. Depois do envio, o foco fica onde estava.
- Cuidados: Diga os formatos e o tamanho máximo antes do envio. Mensagens de erro dizem o que fazer, por exemplo Escolha um arquivo menor que 10 MB.

## Tokens usados

Área: cor/fundo/superficie, cor/fundo/marca-sutil (arrastando), borda tracejada cor/borda/forte ou cor/borda/marca. Arquivo: cor/fundo/superficie, cor/borda/padrao, cor/fundo/marca (progresso). Canto: raio/grande e raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Diga os formatos e o tamanho máximo antes do envio.
- Mostre o progresso de cada arquivo.
- Explique o erro e ofereça tentar de novo.

## NÃO faça

- Recusar o arquivo sem dizer o motivo.
- Esconder a opção de clicar para escolher. Nem todo mundo consegue arrastar.
- Apagar os arquivos já enviados quando um deles falha.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
