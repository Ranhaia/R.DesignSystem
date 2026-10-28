# Interruptor

Componente do PASSI DS 1.1.0 · página "Interruptor" no arquivo Figma.

O interruptor liga e desliga uma configuração. A mudança acontece na hora, como um interruptor de luz, sem precisar confirmar.

## Interruptor

Interruptor · liga ou desliga uma configuração com efeito imediato, sem precisar de botão “Salvar”. Trilho de 40×24 px.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Modo escuro |
| Descrição | Texto |  | Muda as cores na hora. |
| Mostrar descrição | Liga/desliga |  | Desligado |
| Ligado | Variante | Não, Sim | Não |
| Estado | Variante | Padrão, Hover, Pressionado, Foco, Desabilitado | Padrão |

## Como usar

### Estados

Exemplos no Figma: Desligado · Padrão; Desligado · Hover; Desligado · Pressionado; Desligado · Foco; Desligado · Desabilitado; Ligado · Padrão; Ligado · Hover; Ligado · Pressionado; Ligado · Foco; Ligado · Desabilitado.

### Em uso

Lista de preferências. Cada linha tem rótulo e descrição curta.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- O rótulo é o nome da configuração: Modo escuro.
- Não troque o rótulo conforme o estado; o interruptor já mostra ligado ou desligado.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega ao interruptor. Espaço liga e desliga.
- Leitor de tela: Papel switch. O nome é o rótulo. Anuncia ligado ou desligado.
- Foco: Anel de foco de 2 px em volta do trilho.
- Cuidados: A mudança vale na hora. Se precisar de confirmação ou de um botão Salvar, use Checkbox. Ligado e desligado se diferenciam também pela posição do botão deslizante, não só pela cor.

## Tokens usados

Trilho: cor/fundo/marca, cor/fundo/marca-hover, cor/fundo/marca-pressionado, cor/fundo/controle-desligado, cor/fundo/desabilitado. Desligado no hover: cor/texto/terciario; pressionado: cor/texto/secundario. Botão deslizante: cor/texto/sobre-marca. Canto: raio/pilula.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use para configurações que valem na hora.
- Escreva o rótulo como o nome da configuração: “Modo escuro”.
- Mantenha o rótulo igual nos dois estados.

## NÃO faça

- Usar em formulários que só valem depois de “Enviar”. Use Checkbox.
- Rótulos que mudam conforme o estado, como “Ligado” e “Desligado”.
- Esconder consequências importantes de desligar algo.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
