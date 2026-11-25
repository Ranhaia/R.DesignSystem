# Spec — Date Picker

Status: construído em 2026-11-25. Camada: organism (importa `input-group`, `popover` e `calendar`).

## Objetivo

Campo de data que dá para digitar, com o `calendar` num `popover` ao lado.
Modo data única (padrão) e modo período (`mode="range"`).

## Valor: Temporal.PlainDate

Decisão aprovada pelo Rafael em 2026-11-25, conferida com a orientação de web
moderna (guia `capture-location-agnostic-data`): data de calendário é
`Temporal.PlainDate`, sem fuso e sem hora. Período é `{ from, to }` com
`PlainDate | null` em cada ponta.

- `Temporal` nativo quando o navegador tem; senão o `temporal-polyfill`,
  carregado sob demanda por `import()` (`src/lib/temporal.ts`:
  `carregarTemporal()` e `useTemporal()`). Enquanto o polyfill carrega, o
  campo mostra o valor e o botão do calendário fica desligado.
- Para criar valores no produto: `const T = await carregarTemporal()` e
  `T.PlainDate.from("2026-03-07")`.

## Conversão de e para `Date`

`Date` só existe na fronteira com o `calendar` (react-day-picker):

- `paraDate(plain)` → `new Date(ano, mês - 1, dia)`: meia-noite local. Nunca
  montar a data por string ISO (`"2026-03-07T00:00:00Z"`), que muda o dia
  conforme o fuso.
- `deDate(date, T)` → `T.PlainDate.from({ year: getFullYear(), month:
  getMonth() + 1, day: getDate() })`: lê os campos locais.

## Digitação

- pt-BR: `dd/mm/aaaa`; en: `mm/dd/yyyy`. Barra, ponto ou hífen separam; dia e
  mês com 1 ou 2 dígitos; ano com 4.
- Ao sair do campo ou com Enter, o texto vira data. Data que não existe
  (31/02) ou texto torto volta ao último valor válido; campo apagado fica vazio.
- Período: `início – fim` (o traço comum também vale). Fim antes do início é
  invertido.

## Calendário

Botão no fim do campo abre o `popover` com o `calendar` no mês da data atual.
Data única fecha ao escolher; período mostra dois meses e fica aberto.
`isDateDisabled(plain)` desliga dias no calendário.

## Textos

Dicionário central: `datePicker.abrir` e `datePicker.formato`.
