---
slug: time-picker
nome: TimePicker
camada: organism
codigo: src/components/ui/time-picker.tsx
story: src/components/ui/time-picker.stories.tsx
status: piloto
sinonimos: [seletor-de-hora, hora, horario]
vizinhos: [calendar, popover, select]
referencias: [spec:time-picker]
---

# TimePicker

Campo com painel suspenso para seleção de horário (hora e minuto). Suporta formato de 24 horas ou 12 horas com AM/PM e intervalos customizáveis de minutos.

## Quando usar

- Definição de horários de agendamentos, reuniões, eventos ou alarmes.
- Campos de formulário que exigem precisão de hora e minuto sem ambiguidade.
- Configuração de janelas de atendimento ou horários de funcionamento.

## Quando NÃO usar

- Seleção de dia, mês ou ano em datas completas → `calendar`.
- Escolha de uma opção textual simples pré-definida → `select`.
- Painel flutuante genérico para qualquer outro tipo de conteúdo → `popover`.

## Anatomia

| Parte | O que é |
|---|---|
| `TimePicker` | Composição que agrupa botão disparador com ícone e painel suspenso com seletores |
| Botão disparador (interno) | Botão que exibe o ícone e o horário selecionado |
| Painel flutuante (interno) | Container que alinha os seletores de hora, minuto e período |
| Seletor de Hora (interno) | Menu de seleção de horas de 00 a 23 ou 1 a 12 |
| Seletor de Minuto (interno) | Menu de seleção de minutos em intervalos do minuteStep |
| Seletor de Período (interno) | Menu condicional AM/PM exibido no formato 12h |

## Composição

Usa: [`button`](button.md) · [`icon`](icon.md) · [`popover`](popover.md) · [`select`](select.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` | `string` | — | Horário controlado no formato "HH:mm" em 24h |
| `onValueChange` | `(value: string) => void` | — | Callback chamado ao alterar hora ou minuto |
| `format` | `24h` · `12h` | `24h` | Formato visual de exibição e seleção |
| `minuteStep` | `number` | `5` | Intervalo em minutos entre as opções |
| `placeholder` | `string` | `Selecione um horário` | Texto exibido no gatilho quando vazio |
| `disabled` | `boolean` | `false` | Desativa o disparador e os seletores internos |
| `contentClassName` | `string` | — | Classes adicionais do painel flutuante |

## Variantes

Nenhuma variante própria. O disparador utiliza variante `outline` de `button`.

## Tamanhos

Um só. O disparador tem largura fixa `w-40` e altura padrão de botão.

## Estados

| Estado | Como aparece |
|---|---|
| Vazio | Disparador exibe o texto de placeholder com cor `text-muted-foreground` |
| Preenchido | Disparador exibe o horário formatado (ex.: "14:30" ou "02:30 PM") |
| Aberto | Painel flutuante aberto exibindo os seletores de hora e minuto |
| Desabilitado | Disparador com opacidade reduzida e interação bloqueada |

## Conteúdo

- Texto de placeholder claro: "Selecione um horário" ou "Horário de início".
- O valor armazenado em `value` deve estar sempre em formato 24h ("HH:mm").
- No formato 12h, os períodos são grafados em caixa alta: "AM" e "PM".
- Sem ponto final em rótulos ou valores selecionados.

## Acessibilidade

- **Teclado:** O botão disparador abre o painel com Enter ou Espaço. Dentro do painel, cada `Select` navega por Tab e as setas Cima/Baixo percorrem os números. Esc fecha o menu ou o popover.
- **Leitor de tela:** O disparador anuncia o horário ou placeholder. Cada campo de seleção possui `aria-label` próprio ("Hora", "Minuto", "Período").
- **Foco:** Ao fechar o painel por Esc ou clique fora, o foco retorna automaticamente para o botão disparador.
- **Cuidados:** O painel não fecha sozinho a cada seleção de hora ou minuto para permitir a configuração completa. Forneça rótulo de campo via `field` para associar o disparador.

## Tokens usados

- **Cor:** `text-muted-foreground`
- **Tipografia:** `font-normal` `text-xs`
- **Espaço:** `gap-1` `gap-2` `p-3` `w-17` `w-18` `w-40`

## Faça

- Use `format="24h"` como padrão para o contexto brasileiro.
- Defina `minuteStep` adequado à tolerância do agendamento (ex.: 15 ou 30 minutos).
- Mantenha `value` sempre no formato canônico 24h no estado do formulário.

## NÃO faça

- Usar para seleção de datas completas → `calendar`.
- Valores livres que aceitam segundos ou texto arbitrário → `input`.
- Omitir o rótulo descritivo externo associado ao campo → use `field`.

## Exemplo mínimo

```tsx
import { TimePicker } from "@/components/ui/time-picker"

<TimePicker
  value="14:30"
  onValueChange={() => {}}
  placeholder="Selecione um horário"
/>
```
