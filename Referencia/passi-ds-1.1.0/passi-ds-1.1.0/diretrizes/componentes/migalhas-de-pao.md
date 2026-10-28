# Migalhas de pão

Componente do PASSI DS 1.1.0 · página "Migalhas de pão" no arquivo Figma.

As migalhas de pão mostram onde a pessoa está dentro do site e o caminho até ali. Cada nível anterior é um link para voltar.

## Migalhas de pão

Migalhas de pão · mostram o caminho até a página atual e permitem voltar a qualquer nível. Os links não têm sublinhado (ele aparece no hover). Em caminhos longos, os níveis do meio ficam no “…”, que abre uma lista. O último item é a página atual e não é clicável.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Página atual | Texto |  | Capítulo 7 |
| Mostrar ícone de início | Liga/desliga |  | Ligado |
| Níveis | Variante | 2, 3, 4, Recolhido, Recolhido aberto | 2 |

## Como usar

### Níveis

Quando o caminho é longo, os níveis do meio ficam recolhidos em “…”. Ao clicar no “…”, abre uma lista com os níveis escondidos. Os links não têm sublinhado: a posição no caminho já mostra que dá para clicar. O sublinhado aparece no hover.

Exemplos no Figma: 2 níveis; 3 níveis; 4 níveis; Recolhido; Recolhido, com o “…” aberto.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Use os mesmos nomes dos títulos das páginas.
- A página atual aparece por extenso; os níveis anteriores podem ser abreviados.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab passa por cada link do caminho e pelo “…”. Enter abre a lista dos níveis escondidos e Esc fecha. A página atual não é link.
- Leitor de tela: Fica dentro de uma navegação com o nome Você está aqui. O “…” é um botão com o nome Mostrar caminho completo. A página atual é marcada como atual no código (aria-current).
- Foco: Borda de foco em cada link.
- Cuidados: Os separadores são decorativos e ficam escondidos do leitor de tela.

## Tokens usados

Links: cor/texto/secundario, sem sublinhado; no hover, ganham sublinhado. Página atual: cor/texto/padrao. Separador: cor/texto/terciario. Lista do “…”: Item de menu sobre cor/fundo/superficie, com borda cor/borda/padrao e Sombra/Média. Espaço: espaco/2.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Coloque no topo da página, acima do título.
- Use os mesmos nomes dos títulos das páginas.
- Recolha os níveis do meio em telas pequenas.

## NÃO faça

- Usar em sites com só um ou dois níveis.
- Deixar a página atual clicável.
- Substituir o menu principal pelas migalhas.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
