# Passos

Componente do PASSI DS 1.1.0 · página "Passos" no arquivo Figma.

Os passos mostram em que etapa de um processo a pessoa está, quantas já foram e quantas faltam. Ajudam em cadastros, compras e configurações longas.

## Passo

Passo · uma etapa dentro de Passos.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Título | Texto |  | Dados pessoais |
| Estado | Variante | Concluído, Atual, Próximo | Concluído |

## Passos

Passos · mostra o andamento de um processo dividido em etapas, como um cadastro ou uma compra. Use de 3 a 5 etapas.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Orientação | Variante | Horizontal, Vertical | Horizontal |

## Como usar

### Orientações

Horizontal no computador; vertical no celular ou quando os títulos são longos.

Exemplos no Figma: Horizontal; Vertical.

### Estados do passo

Exemplos no Figma: Concluído; Atual; Próximo.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Títulos curtos que dizem o que acontece na etapa: Dados pessoais.
- Mostre o total desde o início: Etapa 2 de 4.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Passos concluídos que deixam voltar são links ou botões e recebem Tab. Os próximos não recebem foco.
- Leitor de tela: Uma lista ordenada. O passo atual é marcado como atual, e cada passo anuncia seu estado em texto: concluído, atual ou próximo.
- Foco: Ao avançar de etapa, leve o foco para o título da etapa nova.
- Cuidados: Não peça de novo o que a pessoa já informou numa etapa anterior (WCAG 3.3.7).

## Tokens usados

Concluído: cor/fundo/marca. Atual: borda cor/borda/marca e texto cor/texto/marca. Próximo: cor/borda/forte e cor/texto/secundario. Conector: cor/fundo/marca ou cor/borda/padrao.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use títulos curtos que digam o que acontece em cada etapa.
- Deixe a pessoa voltar para etapas concluídas.
- Mostre o total de etapas desde o início.

## NÃO faça

- Mais de 5 etapas. Agrupe ou simplifique o processo.
- Usar passos para navegação livre. Para isso use Abas.
- Pular etapas sem avisar.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
