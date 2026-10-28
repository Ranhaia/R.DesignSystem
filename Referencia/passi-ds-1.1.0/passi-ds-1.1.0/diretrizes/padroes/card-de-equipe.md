# Card de equipe

Padrão do PASSI DS 1.1.0 · página "Card de equipe" no arquivo Figma.

Cards para apresentar pessoas, como o time que mantém o design system. Mostram foto, nome, cargo e formas de contato.

## Card de equipe

Card de equipe · apresenta pessoas: Vertical (com bio), Foto grande (páginas de equipe) e Horizontal (listas e diretórios). Troque o preenchimento da foto. Links genéricos: site e e-mail.

- Variantes · Tipo: Vertical, Foto grande, Horizontal

## Como usar

### Tipos

### Grade de equipe

Quatro colunas no computador, duas no tablet e uma no celular.

### Diretório

O tipo Horizontal em lista.

## Feito com

Botão de ícone (site e e-mail), Selo (disponibilidade) e fotos de exemplo em gradiente da marca.

## Faça

- Use fotos com o mesmo enquadramento e fundo parecido.
- Escreva o cargo como a pessoa se apresenta.
- Ofereça um jeito de contato que a pessoa realmente use.

## NÃO faça

- Ícones de redes sociais que a pessoa não usa.
- Bios longas no card. Leve para a página da pessoa.
- Logos de marcas redesenhados à mão. Use os arquivos oficiais de cada rede.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
