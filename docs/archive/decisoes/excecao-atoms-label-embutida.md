# Exceção arquitetural: Input/SelectTrigger/NativeSelect deixam de ser Atoms "burros"

Data: 2026-07-31
Status: superada em 2026-10-19 por `criterio-camadas.md` (Label virou primitivo; não há mais exceção)

## Contexto

Convenção estabelecida em `plans/current/loop-80-20-templates.md` (Fase 0):
`input`, `select`, `native-select` são **Atoms**; `label` é **Atom**
separado; `field` é a **Molecule** que os compõe. Um Atom não deveria
conhecer outro Atom.

## Decisão

Com a entrega de motion design (label flutuante, ver
`docs/superpowers/specs/2026-07-31-motion-label-flutuante-design.md`),
`Input`, `SelectTrigger` e `NativeSelect` passam a **importar e renderizar
`Label` internamente** quando a prop `label` é usada — API de conveniência
(`<Input label="Nome" />`) em vez de composição (`<Field><FieldLabel/><Input/></Field>`).

Isso foi decidido conscientemente pela ergonomia de API: o pedido de
origem era "o Input resolver isso sozinho", não uma composição de dois
componentes.

## Consequências

- `input.tsx`, `select.tsx` (`SelectTrigger`) e `native-select.tsx` agora
  importam `@/components/ui/label` — quebra pontual da separação
  atom/molecule, só para esses três arquivos.
- `field.tsx`/`FieldLabel` não foram alterados e continuam sendo a forma
  recomendada de composição explícita quando não se quer a label
  embutida.
- Quando `label` está ausente, os três componentes continuam idênticos ao
  comportamento anterior — a exceção só se ativa sob uso explícito da
  prop nova.
- `Textarea` também ganhou as props `label`/`animatedLabel` pela mesma
  razão, mas `textarea` já não tinha nenhuma restrição de "Atom burro"
  documentada além da genérica — citado aqui por completude.
