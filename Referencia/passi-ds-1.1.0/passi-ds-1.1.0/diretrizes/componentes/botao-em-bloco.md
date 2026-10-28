# Botão em bloco

Componente do PASSI DS 1.1.0 · página "Botão em bloco" no arquivo Figma.

O botão em bloco transforma uma escolha importante em cartões grandes e fáceis de tocar. Cada opção tem ícone, título e uma frase curta, e só uma fica selecionada por vez.

## Botão em bloco

Botão em bloco · opção grande e clicável, com ícone, título e descrição. Usado para escolhas importantes, como o tipo de conta ou o ponto de partida. Funciona como um rádio visual: só um selecionado por grupo.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Título | Texto |  | Ler o livro |
| Descrição | Texto |  | Comece pelos capítulos, no seu ritmo. |
| Mostrar descrição | Liga/desliga |  | Ligado |
| Mostrar marcação | Liga/desliga |  | Ligado |
| Ícone | Troca de ícone ou componente |  |  |
| Estado | Variante | Padrão, Hover, Pressionado, Selecionado, Foco, Desabilitado | Padrão |

## Como usar

### Estados

Exemplos no Figma: Padrão; Hover; Pressionado; Selecionado; Foco; Desabilitado.

### Em uso

Pergunta com três caminhos. O selecionado mostra a borda azul e a marcação preenchida.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Título curto com a escolha; descrição de uma linha com o que acontece depois.
- Opções paralelas, no mesmo formato.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Funciona como um grupo de rádios: Tab entra no grupo, setas mudam a opção.
- Leitor de tela: Papel radiogroup com nome e cada bloco como radio. O nome é o título; a descrição é lida junto.
- Foco: Borda azul de 2 px no bloco que recebe o teclado.
- Cuidados: O bloco selecionado se diferencia também pela marcação e pela borda, não só pelo fundo azul claro.

## Tokens usados

Fundo: cor/fundo/superficie, cor/fundo/sutil (hover), cor/fundo/sutil-hover (pressionado), cor/fundo/marca-sutil. Borda: cor/borda/padrao, cor/borda/forte (hover), cor/borda/controle (pressionado), cor/borda/marca (2 px quando selecionado). Ícone: cor/texto/marca. Canto: raio/grande.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use de 2 a 4 opções lado a lado.
- Escreva títulos curtos e descrições de uma linha.
- Mostre qual opção está selecionada com mais de um sinal: borda, cor e marcação.

## NÃO faça

- Usar para ações simples. Para isso use Botão.
- Opções com textos muito diferentes de tamanho.
- Mais de uma opção selecionada quando a escolha é única.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
