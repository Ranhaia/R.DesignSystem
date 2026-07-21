export interface StyleEntry {
  value: string
  label: string
  /** cor usada só para o "swatch" (bolinha) no seletor, não é um token real */
  swatch: string
  /** o que muda nesse estilo além da cor — mostrado como legenda no seletor */
  description: string
}

// Lista de presets de estilo. Cada um é uma identidade completa: cor,
// fonte principal (--font-sans) e secundária (--font-heading), radius e
// elevação (--shadow-*). "default" não sobrescreve nada (usa os tokens
// base de :root/.dark). Os demais aplicam data-style="<value>" no <html>
// e sobrescrevem o pacote inteiro — ver globals.css.
export const stylesList: StyleEntry[] = [
  {
    value: "default",
    label: "Padrão",
    swatch: "oklch(0.205 0 0)",
    description: "Inter, cantos médios, sombra sutil",
  },
  {
    value: "editorial",
    label: "Editorial",
    swatch: "oklch(0.4 0.13 41)",
    description: "Serifada (Lora), cantos retos, quase sem sombra",
  },
  {
    value: "tech",
    label: "Tech",
    swatch: "oklch(0.488 0.243 264.376)",
    description: "Título em mono, quinas 90°, sombra dura",
  },
  {
    value: "soft",
    label: "Suave",
    swatch: "oklch(0.65 0.19 15)",
    description: "Poppins, cantos bem arredondados, sombra difusa",
  },
  {
    value: "midnight",
    label: "Midnight",
    swatch: "oklch(0.16 0.015 280)",
    description: "Sempre escuro, Manrope, sombra com glow",
  },
]
