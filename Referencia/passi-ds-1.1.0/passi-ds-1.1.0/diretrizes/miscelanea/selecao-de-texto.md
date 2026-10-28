# Seleção de texto

Miscelânea do PASSI DS 1.1.0 · página "Seleção de texto" no arquivo Figma.

Como o texto aparece quando a pessoa seleciona, busca ou digita: cor de seleção, marca-texto de busca e cursor. Duas variáveis novas garantem leitura no claro e no escuro.

## Cursor de texto

Cursor de texto · traço de 2 px na cor da marca. Em protótipos, alterne Visível e Oculto a cada 500 ms para piscar.

- Variantes · Estado: Visível, Oculto

## Seleção de texto

Seleção de texto · como o texto selecionado aparece. No computador, só o fundo fundo/selecao; no celular, com alças e menu de contexto.

- Variantes · Plataforma: Computador, Celular

## Como usar

### Cores

Duas variáveis de fundo. O texto por cima continua em texto/padrao nos dois modos.

### Seleção

No computador, só o fundo muda. No celular, aparecem as alças para ajustar o trecho e o menu com as ações.

### Em uso

Campo de busca com cursor e resultados com o termo marcado.

## Faça

- Use fundo/selecao e fundo/marca-texto, que já funcionam no claro e no escuro
- Mantenha o texto selecionado na cor normal de leitura
- Marque todas as ocorrências do termo buscado, não só a primeira

## NÃO faça

- Mudar a cor da letra ao selecionar
- Usar a cor da marca pura como fundo de seleção (o texto some)
- Esconder o cursor em campos com foco

