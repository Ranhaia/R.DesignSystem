# Dica flutuante

Componente do PASSI DS 1.1.0 · página "Dica flutuante" no arquivo Figma.

A dica flutuante é um balão pequeno que explica um elemento quando a pessoa passa o mouse ou navega com o teclado. Ela é essencial para botões que têm só ícone.

## Dica flutuante

Dica flutuante · texto curto que aparece ao passar o mouse ou focar um elemento, explicando o que ele faz. A posição indica de que lado o balão fica em relação ao elemento.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Copiar link do capítulo |
| Posição | Variante | Cima, Baixo, Esquerda, Direita | Cima |

## Como usar

### Posições

A seta aponta para o elemento. Escolha o lado com mais espaço livre.

Exemplos no Figma: Cima; Baixo; Esquerda; Direita.

### Em uso

A dica aparece sobre um botão de ícone.

### Modo escuro

No escuro a dica fica clara, mantendo o contraste.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Até uma linha. Diga o que o elemento faz, com verbo: Copiar link do capítulo.
- Não repita o texto que já está visível.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Aparece quando o elemento recebe foco e some com Esc, sem mover o foco.
- Leitor de tela: O texto da dica fica ligado ao elemento no código (aria-describedby) e é lido junto com ele.
- Foco: O foco fica sempre no elemento, nunca na dica.
- Cuidados: A pessoa consegue passar o mouse sobre a dica sem ela sumir (WCAG 1.4.13). Só texto curto: nada de links ou botões dentro.

## Tokens usados

Balão e seta: cor/fundo/invertido. Texto: cor/texto/invertido. Canto: raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use até uma linha de texto.
- Mostre também quando o elemento recebe foco pelo teclado.
- Use em todo botão que tem só ícone.

## NÃO faça

- Colocar informação essencial só na dica.
- Links ou botões dentro da dica. Para isso use Popover.
- Repetir o mesmo texto que já está visível.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
