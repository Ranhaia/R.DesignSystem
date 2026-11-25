# Spec — Rating

Status: construído em 2026-11-26. Camada: atom (importa só `icon`).

## Objetivo

Estrelas para dar uma nota ou mostrar a média de notas.

## Modos

- **Dar nota** (padrão): um `radiogroup` com um `<input type="radio">` nativo
  por opção, escondido visualmente sobre a estrela. Setas trocam a nota (é o
  grupo de radios do navegador), o valor vai no formulário pelo `name`, e
  `required` e `disabled` são os do próprio input. Cada radio tem o nome
  "3 de 5 estrelas". Passar o mouse prevê a nota; sair volta à escolhida.
- **Meia estrela** (`allowHalf`): duas opções por estrela (metade esquerda e
  direita), "2,5 de 5 estrelas".
- **Só leitura** (`readOnly`): mostra a média como imagem (`role="img"`) com o
  nome "3,5 de 5 estrelas" (com o `aria-label` de quem usa na frente: "Nota do produto: 3,5 de 5 estrelas"); meia estrela desenhada quando a média passa de
  meio ponto.

## Decisão

Radios nativos em vez do `radio-group` (Radix): o navegador já dá o teclado,
o envio no formulário e a validação, e a estrela não cabe no visual do
`radio-group`. Conferido na skill de boas práticas web (`forms`).

## Limites

- Sem `name`, os radios usam um nome gerado (o navegador só agrupa as setas
  com nome), que também vai no envio do formulário. Em formulário, passe `name`.
- Clicar de novo na nota escolhida não a apaga.

## Cor

Estrela cheia em `warning-600`; vazia em `muted-foreground`.

## Textos

`rating.valor` no dicionário central; o número sai no formato do idioma.
