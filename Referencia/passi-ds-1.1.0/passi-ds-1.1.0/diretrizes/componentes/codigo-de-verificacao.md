# Código de verificação

Componente do PASSI DS 1.1.0 · página "Código de verificação" no arquivo Figma.

O código de verificação recebe números enviados por e-mail ou SMS, uma casa por dígito. O cursor avança sozinho e a pessoa pode colar o código inteiro.

## Dígito

Dígito · uma casa do Código de verificação. Use o componente completo.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Número | Texto |  | 4 |
| Estado | Variante | Vazio, Foco, Preenchido, Erro | Vazio |

## Código de verificação

Código de verificação · 4, 6 (padrão) ou 8 casas para códigos de confirmação enviados por e-mail ou SMS. O número de casas é igual ao do código enviado. Ao colar o código, preencha todas as casas de uma vez.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Código enviado por e-mail |
| Dígitos | Variante | 6, 4, 8 | 6 |
| Estado | Variante | Vazio, Digitando, Completo, Erro | Vazio |

## Como usar

### Estados

Exemplos no Figma: Vazio; Digitando; Completo; Erro.

### Quantidade de dígitos

O padrão tem 6 casas, o tamanho mais comum nos códigos enviados por e-mail e SMS. Use 4 para códigos curtos e 8 quando o serviço pedir mais segurança. O número de casas é sempre igual ao do código enviado.

Exemplos no Figma: 4 dígitos; 6 dígitos (padrão); 8 dígitos.

### Dígito

Cada casa é um componente próprio, com quatro estados.

Exemplos no Figma: Vazio; Foco; Preenchido; Erro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Diga para onde o código foi enviado: Enviamos um código para ana@empresa.com.br.
- No erro, diga o que fazer: Código errado. Confira os números ou peça outro.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Ao digitar, o cursor avança sozinho. Backspace volta para a casa anterior. Colar o código inteiro preenche todas as casas.
- Leitor de tela: Para o leitor de tela, prefira um único campo com o rótulo Código de verificação, mesmo que a tela mostre uma casa por dígito. Anuncie quando o código expirar.
- Foco: Borda azul na casa ativa.
- Cuidados: Aceite colar e o preenchimento automático do celular (WCAG 3.3.8). Não apague o que foi digitado em caso de erro. Dê tempo suficiente e um jeito de pedir um código novo.

## Tokens usados

Casa: cor/fundo/superficie, cor/borda/controle, cor/borda/marca (foco), cor/borda/erro. Número: Título/2 em cor/texto/padrao. Espaço: espaco/2. Canto: raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Aceite colar o código inteiro de uma vez.
- Mostre para onde o código foi enviado.
- Ofereça reenviar o código depois de alguns segundos.

## NÃO faça

- Apagar tudo quando a pessoa erra um dígito.
- Esconder os números digitados.
- Pedir códigos com mais de 8 dígitos ou mudar a quantidade de casas no meio do fluxo.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
