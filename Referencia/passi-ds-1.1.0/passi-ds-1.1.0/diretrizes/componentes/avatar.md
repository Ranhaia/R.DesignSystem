# Avatar

Componente do PASSI DS 1.1.0 · página "Avatar" no arquivo Figma.

O avatar representa uma pessoa. Mostra a foto quando existe, as iniciais como alternativa e um ícone quando não há nenhuma informação. Pode exibir um ponto de status, como “online”.

## Avatar

Avatar · representa uma pessoa ou organização. Use Imagem quando houver foto (troque o preenchimento do círculo), Iniciais como alternativa e Ícone quando não houver nenhuma informação.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Iniciais | Texto |  | JP |
| Mostrar status | Liga/desliga |  | Desligado |
| Tipo | Variante | Iniciais, Ícone, Imagem | Iniciais |
| Tamanho | Variante | P, M, G, XG | P |

## Grupo de avatares

Grupo de avatares · mostra quem participa de algo. Até 4 rostos e um contador com o restante.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Quantidade | Texto |  | +12 |

## Como usar

### Tipos

Exemplos no Figma: Imagem; Iniciais; Ícone.

### Tamanhos

P 24 px (listas densas), M 32 px (comentários), G 40 px (padrão), XG 56 px (perfil).

Exemplos no Figma: P · 24 px; M · 32 px; G · 40 px; XG · 56 px.

### Com status

### Grupo de avatares

Avatares sobrepostos, com o número de pessoas que não aparecem.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- O texto alternativo é o nome da pessoa.
- Iniciais com até duas letras: primeira letra do nome e do sobrenome.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Só recebe foco quando é um link ou botão, por exemplo para abrir o perfil.
- Leitor de tela: A foto tem texto alternativo com o nome da pessoa. Ao lado do nome escrito, a foto é decorativa e fica escondida do leitor. O ponto de status é lido em texto, por exemplo online.
- Foco: Anel de foco quando é clicável.
- Cuidados: No Grupo de avatares, o +3 diz em texto quem são ou quantas pessoas faltam.

## Tokens usados

Iniciais: cor/fundo/marca-sutil e cor/texto/marca. Ícone: cor/fundo/sutil-hover e cor/texto/secundario. Contorno: cor/fundo/superficie. Status: cor/fundo/sucesso.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use iniciais com até duas letras.
- Mantenha o mesmo tamanho dentro de uma lista.
- Mostre o nome completo por perto ou em uma dica flutuante.

## NÃO faça

- Fotos de baixa resolução ou cortadas no rosto.
- Cores aleatórias para iniciais sem garantir contraste.
- Grupos com mais de 5 rostos visíveis.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
