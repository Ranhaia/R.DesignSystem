# Campo com sugestões

Componente do PASSI DS 1.1.0 · página "Campo com sugestões" no arquivo Figma.

O campo com sugestões junta um campo de texto com uma lista. A pessoa começa a digitar e o sistema mostra só as opções que combinam, destacando o trecho digitado. É ideal para listas longas, como cidades ou temas.

## Campo com sugestões

Campo com sugestões · campo onde a pessoa digita e escolhe entre opções filtradas, com o trecho digitado em negrito. Aceita uma ou várias escolhas (como etiquetas) e oferece criar uma opção nova quando nada é encontrado.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Estado | Variante | Vazio, Digitando, Várias escolhas, Sem resultados | Vazio |

## Como usar

### Estados

Exemplos no Figma: Vazio; Digitando; Várias escolhas; Sem resultados.

### Componentes usados

Etiqueta (escolhas múltiplas) e ícones. Campo com as mesmas cores do Campo de texto; lista com cor/fundo/superficie, Sombra/Média e raio/grande.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Sem resultados, diga isso e ofereça saída: Nenhuma cidade com esse nome. Confira a grafia.
- Opção de criar novo diz o que será criado: Criar o tema Governança.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: A pessoa digita; seta para baixo entra na lista; setas percorrem; Enter escolhe; Esc fecha e mantém o texto.
- Leitor de tela: Papel combobox com lista listbox. Anuncie quantas sugestões apareceram, por exemplo 5 resultados, e a sugestão ativa.
- Foco: O foco fica no campo enquanto as setas destacam as sugestões. Ao escolher, o foco continua no campo.
- Cuidados: O trecho destacado em negrito não é a única pista: a lista também anuncia a quantidade. Sem resultados, diga isso em texto.

## Faça

- Comece a sugerir a partir da primeira ou segunda letra.
- Destaque em negrito o trecho que combina com o que foi digitado.
- Permita navegar pelas opções com as setas do teclado.
- Ofereça criar uma opção nova quando fizer sentido.

## NÃO faça

- Usar para listas curtas, com menos de 7 opções. Prefira Seleção ou Rádio.
- Apagar o que a pessoa digitou ao abrir a lista.
- Aceitar textos que não estão na lista sem avisar.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
