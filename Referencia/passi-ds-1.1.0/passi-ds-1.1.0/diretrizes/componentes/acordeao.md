# Acordeão

Componente do PASSI DS 1.1.0 · página "Acordeão" no arquivo Figma.

O acordeão organiza conteúdos em seções que abrem e fecham. A pessoa lê só o que interessa, sem rolar por textos longos. É o formato clássico de perguntas frequentes.

## Acordeão

Acordeão · lista de perguntas ou seções que abrem e fecham. Bom para perguntas frequentes e conteúdos longos que nem todos precisam ler.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Pergunta | Texto |  | Preciso saber programar para ler o livro? |
| Resposta | Texto |  | Não. O livro foi escrito para quem decide e cobra resultados: lideranças de produto, design e negócio. Os exemplos técnicos aparecem só quando ajudam a entender uma decisão. |
| Estado | Variante | Fechado, Aberto | Fechado |
| Interação | Variante | Padrão, Hover, Pressionado, Foco | Padrão |

## Como usar

### Estados

Exemplos no Figma: Fechado · Padrão; Fechado · Hover; Fechado · Pressionado; Fechado · Foco; Aberto · Padrão; Aberto · Hover; Aberto · Pressionado; Aberto · Foco.

### Perguntas frequentes

Vários itens em sequência, com no máximo um aberto por vez.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- A pergunta faz sentido sozinha, sem o texto aberto.
- A resposta começa pela resposta direta e depois explica.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega a cada pergunta. Enter ou Espaço abrem e fecham.
- Leitor de tela: A pergunta é um botão dentro de um título, e anuncia se está expandida ou recolhida. A resposta fica ligada ao botão no código.
- Foco: Borda azul de 2 px por dentro do cabeçalho. Ao abrir, o foco continua na pergunta.
- Cuidados: Não esconda informação obrigatória, como preço ou prazo, dentro de um acordeão fechado.

## Tokens usados

Fundo hover: cor/fundo/sutil. Pressionado: cor/fundo/sutil-hover. Linha: cor/borda/padrao. Foco: cor/borda/foco. Texto: cor/texto/padrao e cor/texto/secundario. Espaço: espaco/4 e espaco/5.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Escreva títulos que façam sentido sozinhos.
- Mantenha aberto, no máximo, um item por vez em listas longas.
- Deixe toda a linha do título clicável.

## NÃO faça

- Esconder informação essencial dentro do acordeão.
- Acordeões dentro de acordeões.
- Títulos genéricos como “Saiba mais”.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
