export interface StyleEntry {
  value: string
  label: string
  /** cor usada só para o "swatch" (bolinha) no seletor, não é um token real */
  swatch: string
  /** o que muda nesse estilo além da cor — mostrado como legenda no seletor */
  description: string
  /**
   * Modo em que esse estilo nasce/faz mais sentido por padrão — não bloqueia
   * o outro modo (todo estilo tem bloco claro E escuro completos em
   * globals.css, ver [data-style="x"] vs .dark[data-style="x"]), é só a
   * metadata de qual é o "principal". Adicionado em 2026-07-22 pra resolver
   * a divergência entre "qual estilo é claro/escuro" ficar implícita só na
   * presença da classe .dark — o midnight, por exemplo, é o único cujo modo
   * nativo é "dark" (por isso o resto do app assume claro quando você troca
   * de estilo sem tocar no toggle de tema, exceto pro midnight).
   */
  nativeMode: "light" | "dark"
}

// Lista de presets de estilo. Cada um é uma identidade completa: cor,
// fonte principal (--font-sans) e secundária (--font-heading), radius e
// elevação (--shadow-*). "default" não sobrescreve nada (usa os tokens
// base de :root/.dark). Os demais aplicam data-style="<value>" no <html>
// e sobrescrevem o pacote inteiro — ver globals.css. Todos os 5 têm bloco
// claro ([data-style="x"]) e escuro (.dark[data-style="x"]) completos;
// nativeMode só indica qual dos dois é o "padrão" desse estilo.
export const stylesList: StyleEntry[] = [
  {
    value: "default",
    label: "Padrão",
    swatch: "#171717",
    description: "Inter, cantos médios, sombra sutil",
    nativeMode: "light",
  },
  {
    value: "editorial",
    label: "Editorial",
    swatch: "#7E2600",
    description: "Serifada (Lora), cantos retos, quase sem sombra",
    nativeMode: "light",
  },
  {
    value: "tech",
    label: "Tech",
    swatch: "#1447E6",
    description: "Título em mono, quinas 90°, sombra dura, borda 2px",
    nativeMode: "light",
  },
  {
    value: "soft",
    label: "Suave",
    // 2026-07-22: acompanha a correção de --soft-action em globals.css
    // (era oklch(0.65 0.19 15) / #EB5169, reprovava AA texto normal contra
    // --primary-foreground; virou #E31A39, mesmo H/S, só mais escuro).
    swatch: "#E31A39",
    description: "Poppins, cantos bem arredondados, sombra difusa",
    nativeMode: "light",
  },
  {
    value: "midnight",
    label: "Midnight",
    swatch: "#0C0D14",
    description: "Violeta, Manrope, sombra com glow — nativamente escuro, mas também tem versão clara",
    nativeMode: "dark",
  },
]
