# Input ganha `endIcon`/`endAction` (ícone no final do campo)

Data: 2026-08-03
Status: aprovada (Rafael, uso real no Fluxo_001 — olho de mostrar senha)

## Contexto

Padrão comum em outros DS (referência usada: [Nimbus/Nuvemshop, Input
#example-icon-end](https://nimbus.nuvemshop.com.br/documentation/atomic-components/input#example-icon-end)):
um ícone posicionado no final do campo, em dois modos — só ilustrativo
(ex.: lupa de busca) ou com ação clicável (ex.: mostrar/ocultar senha).

O projeto já tinha `InputGroup`/`InputGroupAddon`/`InputGroupButton`
(`input-group.tsx`), mas essa composição assume um container próprio com
borda (o `InputGroup`, não o `Input`) e não foi desenhada para convivar
com `animatedLabel` (o wrapper `relative mt-5` que a label flutuante usa
fica em conflito com o layout do `InputGroup`). Por isso a decisão foi
estender o próprio `Input`, seguindo o mesmo precedente já aberto em
`excecao-atoms-label-embutida.md`, e não forçar essa composição.

## Decisão

`Input` ganha duas props novas, mutuamente exclusivas:

- `endIcon?: MaterialSymbol` — decorativo, sem interação, `aria-hidden`.
- `endAction?: { icon: MaterialSymbol; onClick; "aria-label" }` —
  interativo, renderiza um `<button>` que ocupa um box fixo de 36×36
  (`size-9`, mesma altura do input), não um alvo pequeno dentro dele.

Ícone sempre 24px (`size={1.5}` no `Icon`) nos dois modos — tamanho fixo
do padrão, não configurável por instância.

Substitui a extensão local `endSlot` (genérica, `ReactNode` livre) que
existia só no Fluxo_001 — o `endSlot` permitia qualquer tamanho de ícone,
o que gerou o bug de origem desta decisão (ícone de 12-16px dentro de um
box de 24px, "muito pequeno" segundo Rafael).

## Consequências

- `input.tsx` importa `Icon` e o tipo `MaterialSymbol` — mesma natureza de
  exceção já aberta para `Label`.
- Quando `endIcon`/`endAction` está ausente, o comportamento é idêntico ao
  anterior (a exceção só se ativa sob uso explícito).
- Convive com `animatedLabel` porque o box é posicionado com `top-0` +
  `size-9` (não `top-1/2` + `translate`, que dependeria da altura do
  wrapper, variável com `mt-5` no modo animado).
- Fluxo_001 (projeto consumidor, cópia de arquivo direta — sem
  registry.json ainda) precisa da mesma atualização manual em sua cópia
  local de `input.tsx`, e `password-input.tsx` passa a usar `endAction`
  em vez do `endSlot` descontinuado.
