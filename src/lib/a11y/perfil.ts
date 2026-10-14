// Perfil de conformidade do DS (A11Y.md / DA11Y.md, Seção 0.1). Trocar de perfil é decisão registrada no A11Y-DECISIONS.md.
export const PERFIL = "Standard (AA)"
export const PISOS = { texto: 4.5, ui: 3 } as const
export type Uso = keyof typeof PISOS
