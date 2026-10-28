# Divisor

Componente do PASSI DS 1.1.0 · página "Divisor" no arquivo Figma.

O divisor é uma linha fina que separa grupos de conteúdo. Use com moderação: espaço em branco costuma separar melhor do que linhas.

## Divisor

Divisor · linha fina que separa grupos de conteúdo. Estique até a largura (ou altura) desejada.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | ou |
| Tipo | Variante | Horizontal, Com texto, Vertical | Horizontal |

## Como usar

### Tipos

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- O divisor com texto usa uma ou duas palavras em minúsculas: ou.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Não recebe foco.
- Leitor de tela: Linha decorativa fica escondida do leitor. Quando separa seções de verdade, use títulos, não só a linha. O divisor com texto lê o texto.
- Foco: Nenhum.
- Cuidados: A linha não precisa de contraste mínimo porque é decorativa. Nenhuma informação pode depender só dela.

## Tokens usados

Linha: cor/borda/padrao, 1 px. Texto: cor/texto/terciario.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Separe grupos diferentes de conteúdo.
- Use o divisor com texto entre opções de login, como “ou continue com”.

## NÃO faça

- Colocar linha entre todos os itens de uma lista curta.
- Usar divisores grossos ou coloridos.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
