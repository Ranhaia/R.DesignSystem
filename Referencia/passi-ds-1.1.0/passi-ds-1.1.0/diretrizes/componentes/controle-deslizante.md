# Controle deslizante

Componente do PASSI DS 1.1.0 · página "Controle deslizante" no arquivo Figma.

O controle deslizante escolhe um valor aproximado dentro de um limite, arrastando um pegador. A versão de intervalo escolhe uma faixa, com valor mínimo e máximo.

## Controle deslizante

Controle deslizante · escolhe um valor ou uma faixa dentro de um limite, arrastando o pegador. Mostre sempre o valor atual em texto.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Páginas por dia |
| Valor | Texto |  | 24 |
| Mostrar limites | Liga/desliga |  | Ligado |
| Tipo | Variante | Simples, Intervalo | Simples |
| Estado | Variante | Padrão, Foco, Desabilitado | Padrão |

## Como usar

### Tipos e estados

O valor atual aparece em azul no canto direito. No foco, o pegador ativo ganha um anel.

Exemplos no Figma: Padrão; Foco; Desabilitado.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Mostre o valor com a unidade: 24 páginas por dia.
- Os limites usam o mesmo formato do valor.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega ao pegador. Setas mudam um passo; Page Up e Page Down mudam passos maiores; Home e End vão ao mínimo e ao máximo.
- Leitor de tela: Papel slider. O rótulo é o nome e o valor atual é lido, com a unidade, por exemplo 24 páginas por dia.
- Foco: Anel de foco de 2 px em volta do pegador. No tipo intervalo, cada pegador recebe foco separado.
- Cuidados: Arrastar nunca pode ser o único jeito (WCAG 2.5.7): aceite setas do teclado e clique no trilho, e ofereça um campo numérico quando o valor exato importa.

## Tokens usados

Base: cor/fundo/sutil-hover. Preenchimento: cor/fundo/marca. Pegador: neutro/0 com borda cor/fundo/marca. Texto: cor/texto/padrao, cor/texto/marca, cor/texto/terciario.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use quando um valor aproximado é suficiente, como volume ou faixa de preço.
- Mostre o valor atual e os limites.
- Ofereça um campo de texto ao lado quando o valor exato importar.

## NÃO faça

- Usar para valores exatos, como CPF ou quantidade de parcelas.
- Faixas muito grandes, em que cada pixel vale muito.
- Esconder o valor escolhido.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
