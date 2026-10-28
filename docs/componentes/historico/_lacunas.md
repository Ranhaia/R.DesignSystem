# Lacunas da coleta

O que o auditor precisou completar à mão porque `scripts/coletar-componente.mjs`
não leu do código. A cada 3 ou 4 componentes registrados, revisar esta lista
e ensinar a coleta (princípio "a auditoria ensina a coleta", do Rayner Lemos).
Só acrescenta.

Formato: `- AAAA-MM-DD · <slug> · <o que faltou> · <ideia para a coleta>`

- 2026-10-28 · button · Partes visuais (ícone, texto) não são funções e não aparecem na Anatomia · nenhuma: é intenção, fica com o auditor
- 2026-10-28 · tabs, dialog · Props herdadas do Radix (`value`, `open`, `onOpenChange`…) não estão no arquivo · ler os tipos do Radix pelo compilador do TypeScript, se fizer falta
- 2026-10-28 · button · `icon` (alias de `icon-md`) não casou com a linha antiga `icon-*` · nenhuma: o padrão `icon-*` exige o hífen; caso único
