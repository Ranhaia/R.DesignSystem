# Área de texto

Componente do PASSI DS 1.1.0 · página "Área de texto" no arquivo Figma.

A área de texto recebe respostas longas, de várias linhas, como comentários, descrições e mensagens. Quando existe um limite, o contador mostra quanto ainda cabe.

## Área de texto

Área de texto · entrada de várias linhas para comentários, descrições e mensagens. Mostre um contador quando houver limite de caracteres.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Sua mensagem |
| Valor | Texto |  | Conte o que você achou do livro |
| Ajuda | Texto |  | Seja breve. Até 280 caracteres. |
| Contador | Texto |  | 0/280 |
| Mostrar contador | Liga/desliga |  | Ligado |
| Mostrar ajuda | Liga/desliga |  | Ligado |
| Estado | Variante | Padrão, Hover, Foco, Preenchido, Erro, Desabilitado | Padrão |

## Como usar

### Estados

Exemplos no Figma: Padrão; Hover; Foco; Preenchido; Erro; Desabilitado.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- O rótulo diz o que escrever: Sua mensagem.
- A ajuda informa o limite: Até 280 caracteres.
- O contador mostra quanto falta, não quanto foi usado, quando o limite estiver perto.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega à área. Enter cria uma linha nova; Tab sai do campo.
- Leitor de tela: O rótulo é o nome. A ajuda e o contador são lidos junto. Quando o limite está perto, anuncie o que falta sem interromper a digitação a cada letra.
- Foco: Borda azul de 2 px.
- Cuidados: Não corte o texto ao passar do limite sem avisar. Deixe a área crescer ou permitir redimensionar.

## Tokens usados

Fundo: cor/fundo/superficie, cor/fundo/desabilitado. Borda: cor/borda/controle, cor/borda/marca, cor/borda/erro. Texto: cor/texto/padrao, cor/texto/terciario, cor/texto/erro. Espaço: espaco/3. Canto: raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Ajuste a altura ao tamanho esperado da resposta.
- Mostre o limite antes de a pessoa passar dele.
- Deixe o campo crescer conforme o texto, quando possível.

## NÃO faça

- Usar para respostas curtas, como nome ou e-mail.
- Cortar o texto sem avisar quando passar do limite.
- Placeholders longos com instruções importantes.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
