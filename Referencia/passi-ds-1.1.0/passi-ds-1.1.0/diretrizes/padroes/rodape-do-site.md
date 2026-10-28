# Rodapé do site

Padrão do PASSI DS 1.1.0 · página "Rodapé do site" no arquivo Figma.

O rodapé fecha todas as páginas. Ele organiza os links secundários por assunto, oferece a inscrição na newsletter e traz as informações legais, como direitos e privacidade.

## Rodapé do site

Rodapé do site · fecha todas as páginas com a marca, links organizados por assunto, inscrição na newsletter e informações legais. O tipo Completo usa o modo escuro por padrão.

- Variantes · Tipo: Completo, Simples, Celular

## Como usar

### Completo

Marca e newsletter à esquerda, links em colunas à direita e linha final com direitos e documentos legais.

### Simples

Uma linha só, para páginas internas, áreas logadas ou landing pages curtas.

### Celular

As colunas viram blocos empilhados.

## Feito com

Campo de texto e Botão (newsletter). Textos com estilos Sobretítulo, Corpo/Pequeno e Legenda. O tipo Completo e o Celular usam o modo Escuro da coleção Cor.

## Faça

- Agrupe links por assunto, com títulos curtos.
- Repita os caminhos mais importantes, como contato.
- Mantenha os links legais sempre presentes.

## NÃO faça

- Colocar no rodapé a única forma de chegar a uma página importante.
- Listas com dezenas de links sem organização.
- Rodapé diferente em cada página.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
