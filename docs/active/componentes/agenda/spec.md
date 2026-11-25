# Spec — Agenda

Status: construído em 2026-11-25. Camada: organism (importa `calendar`,
`button`, `segmented-control`, `icon`).

## Objetivo

Mostrar compromissos no tempo. O `calendar` escolhe uma data; a `agenda`
mostra o que acontece em cada data.

## Vistas

- **Mês**: monta sobre o `calendar`. Cada dia mostra até 2 eventos e "+N
  mais". A grade, o foco e o teclado são os do `calendar` (setas, PageUp e
  PageDown trocam de mês, Home e End vão ao início e ao fim da semana). Enter
  ou clique abre o dia. O nome de cada dia diz quantos eventos ele tem.
- **Semana**: 7 colunas, de domingo a sábado. O cabeçalho de cada dia abre a
  vista dia; os eventos são botões.
- **Dia**: lista dos eventos do dia, dia inteiro primeiro e depois por hora.
  Sem eventos, diz "Nenhum evento".

Evento que dura vários dias aparece em todos eles; fora do dia de início ele
mostra "Dia inteiro" no lugar da hora. Quem termina à 00:00 em ponto não ocupa
o dia seguinte. Evento sem `fim` (ou com `fim` antes do início) vale só no dia
do início. Trocar de mês pelo teclado mantém o dia do mês.

## Barra

Hoje, período anterior, próximo período, o título do período (anunciado ao
mudar) e o seletor de vista (`segmented-control`).

## Limites

Só não controlada: data e vista começam por `dataInicial` e `visaoInicial`.
Semana e dia são listas, sem grade de horas.

## Textos

Do dicionário central (`agenda.*`). Datas e horas pelo `Intl` no idioma
ativo. Títulos dos eventos são texto de produto.
