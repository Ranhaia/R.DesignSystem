# Rótulo informativo

Componente do PASSI DS 1.1.0 · página "Rótulo informativo" no arquivo Figma.

O rótulo informativo dá nome a um campo ou a um número e oferece uma explicação curta num ícone de ajuda, sem poluir a tela. Também indica se o campo é obrigatório ou opcional.

## Rótulo informativo

Rótulo informativo · nome de um campo ou dado com ícone que abre uma dica curta. Mostra também se o campo é obrigatório (*) ou opcional.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Orçamento anual |
| Tipo | Variante | Com ícone, Obrigatório, Opcional, Com dica aberta | Com ícone |

## Como usar

### Tipos

Exemplos no Figma: Com ícone; Obrigatório; Opcional; Com dica aberta.

### Em uso

Sobre um campo de texto e sobre um número de painel.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- A dica explica em uma ou duas frases como o dado é calculado ou para que serve.
- Escreva opcional por extenso quando a maioria dos campos for obrigatória.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: O ícone de ajuda é um botão e recebe Tab; Enter ou Espaço mostram a explicação.
- Leitor de tela: O rótulo é o nome do campo. Obrigatório e opcional são lidos em texto, não só pelo asterisco. O botão de ajuda tem o nome Mais informações sobre, seguido do rótulo.
- Foco: Anel de foco no ícone de ajuda.
- Cuidados: Informação necessária para preencher o campo fica visível, não escondida na ajuda.

## Tokens usados

Texto: cor/texto/padrao e cor/texto/secundario (opcional). Obrigatório: cor/texto/erro. Ícone: cor/texto/secundario e cor/texto/marca quando ativo. Dica: componente Dica flutuante.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use a dica para explicar termos técnicos ou como um número é calculado.
- Escreva dicas de uma ou duas frases.
- Marque o que é opcional quando a maioria dos campos for obrigatória.

## NÃO faça

- Esconder na dica uma informação necessária para preencher o campo.
- Colocar ícone de ajuda em todos os rótulos.
- Usar só o asterisco vermelho sem explicar o que significa no formulário.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
