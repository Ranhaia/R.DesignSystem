# Proporção de imagem

Componente do PASSI DS 1.1.0 · página "Proporção de imagem" no arquivo Figma.

A proporção define a relação entre largura e altura de uma imagem ou vídeo. Usar sempre as mesmas proporções deixa as grades alinhadas e evita imagens cortadas de jeitos diferentes em cada tela.

## Proporção de imagem

Proporção de imagem · molduras com proporções fixas para imagens e vídeos, garantindo que tudo fique alinhado na grade. Troque o preenchimento pela imagem real.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Proporção | Variante | 1:1, 4:3, 3:2, 16:9, 21:9, 3:4, 9:16 | 1:1 |

## Como usar

### Proporções

### Em uso

Mesma proporção em toda a grade: os cards ficam alinhados mesmo com imagens diferentes.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Todo texto importante fica fora da imagem, em texto de verdade.
- O texto alternativo diz o que a imagem mostra, não como ela é.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Não recebe foco.
- Leitor de tela: A imagem dentro da moldura precisa de texto alternativo que diga o que ela mostra, ou ficar escondida se for decorativa.
- Foco: Nenhum.
- Cuidados: Ao cortar a imagem para caber na proporção, não corte texto ou informação importante. Vídeos precisam de legenda.

## Tokens usados

Canto: raio/grande. Ícone e rótulo de exemplo: cor/texto/marca. O gradiente azul claro marca o espaço da imagem até a troca.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Escolha uma ou duas proporções por tipo de conteúdo e mantenha.
- Use 16:9 para vídeos e 3:4 para capas de livro.
- Recorte a imagem para o assunto principal ficar no centro.

## NÃO faça

- Esticar ou achatar imagens para caber.
- Misturar várias proporções na mesma grade.
- Colocar texto importante dentro da imagem.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
