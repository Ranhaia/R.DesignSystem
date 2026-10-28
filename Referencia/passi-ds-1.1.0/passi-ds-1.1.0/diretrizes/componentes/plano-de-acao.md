# Plano de ação

Componente do PASSI DS 1.1.0 · página "Plano de ação" no arquivo Figma.

Quando a IA vai agir por você, como mover arquivos ou enviar algo, ela primeiro mostra o plano. A pessoa confirma, ajusta ou cancela. Durante a execução dá para parar, e no fim dá para desfazer. Quem decide é sempre a pessoa.

## Plano de ação

Plano de ação · antes de um agente de IA mudar algo, ele mostra o plano em passos e espera a confirmação da pessoa. Aguardando confirmação: Cancelar, Ajustar plano ou Confirmar e executar. Executando: progresso passo a passo e botão Parar. Concluído: resultado e Desfazer.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Estado | Variante | Aguardando confirmação, Executando, Concluído | Aguardando confirmação |

## Como usar

### Estados

Aguardando confirmação, Executando e Concluído. Cada passo diz se apenas lê ou se muda alguma coisa.

Exemplos no Figma: Plano proposto; Aguardando confirmação; Executando; Concluído.

### Modo escuro

Exemplos no Figma: Plano proposto.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Cada passo começa com verbo e diz se só lê ou se muda algo.
- O botão de confirmar diz o que vai acontecer: Confirmar e executar.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab percorre os botões. Confirmar e executar nunca é ativado sozinho, nem por Enter no meio de outro campo.
- Leitor de tela: O plano é uma lista ordenada. Cada passo anuncia o estado em texto: feito, em andamento ou ainda não feito. O progresso é anunciado de forma discreta a cada passo concluído.
- Foco: Ao aparecer, o foco vai para o título do plano. Ao concluir, vai para a mensagem de resultado.
- Cuidados: O botão Parar fica ao alcance do teclado durante toda a execução. Passos que mudam algo dizem isso em texto.

## Tokens usados

Painel: cor/fundo/superficie, cor/borda/padrao, raio/grande. Rótulo de IA no cabeçalho. Passos: cor/borda/controle (a fazer), Carregando (em andamento), cor/fundo/sucesso com ícone check (feito). Botões: Botão P.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Diga em cada passo se ele só lê ou se muda alguma coisa.
- Peça confirmação antes de qualquer mudança que afete outras pessoas ou dinheiro.
- Ofereça parar durante a execução e desfazer no fim.

## NÃO faça

- Executar sem mostrar o plano antes.
- Deixar o botão de confirmar pré-selecionado ou automático.
- Esconder um passo que muda dados.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
