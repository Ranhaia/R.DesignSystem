# Alerta

Componente do PASSI DS 1.1.0 · página "Alerta" no arquivo Figma.

O alerta é uma mensagem que fica na página, perto do conteúdo a que se refere. Ele informa, confirma, avisa ou explica um erro, e diz o que fazer em seguida.

## Alerta

Alerta · mensagem fixa dentro da página, ligada a um contexto. Diferente do Aviso rápido, que aparece e some. Use Informação, Sucesso, Atenção ou Erro conforme a gravidade.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Título | Texto |  | Nova versão do arquivo disponível |
| Descrição | Texto |  | Baixe a versão 1.1 para ter os componentes de gráficos. |
| Ação | Texto |  | Baixar agora |
| Mostrar descrição | Liga/desliga |  | Ligado |
| Mostrar ação | Liga/desliga |  | Ligado |
| Pode fechar | Liga/desliga |  | Ligado |
| Tipo | Variante | Informação, Sucesso, Atenção, Erro | Informação |

## Como usar

### Tipos

Cor, ícone e texto juntos indicam a gravidade, para que ninguém dependa só da cor.

### Versão curta

Só o título, para mensagens simples.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Título diz o que aconteceu; descrição diz o que fazer.
- A ação é um verbo: Baixar agora, Tentar de novo.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: A ação e o botão de fechar recebem Tab.
- Leitor de tela: Alertas que aparecem depois de uma ação usam uma região que anuncia sozinha (status para sucesso e informação, alert para erro). Alertas que já estão na página são lidos na ordem normal.
- Foco: Não roube o foco. A exceção é o resumo de erros de um formulário, que recebe o foco ao enviar.
- Cuidados: Tipo sempre com ícone e título, nunca só pela cor. O botão de fechar tem o nome Fechar alerta.

## Tokens usados

Fundo: cor/fundo/marca-sutil, sucesso-sutil, alerta-sutil, erro-sutil. Borda (40%): cor/borda/marca, sucesso, alerta, erro. Ícone e ação: cor/texto/marca, sucesso, alerta, erro. Canto: raio/grande.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Diga o que aconteceu e o que fazer agora.
- Coloque o alerta perto do conteúdo a que ele se refere.
- Use o tipo certo para a gravidade.

## NÃO faça

- Mostrar vários alertas ao mesmo tempo.
- Mensagens técnicas, como códigos de erro sem explicação.
- Usar Erro para avisos que não impedem nada.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
