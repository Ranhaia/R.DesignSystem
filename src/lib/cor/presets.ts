import type { Token } from "./gerar"

export type PresetConfig = {
  fonte: string
  nativo: "claro" | "escuro"
}

export type Sobrescrita = {
  claro?: Partial<Record<Token, string>>
  escuro?: Partial<Record<Token, string>>
  motivo: string
}

export const PRESETS: Record<"default" | "editorial" | "tech" | "soft" | "midnight" | "clay", PresetConfig> = {
  default: { fonte: "#171717", nativo: "claro" },
  editorial: { fonte: "#7E2600", nativo: "claro" },
  tech: { fonte: "#1447E6", nativo: "claro" },
  soft: { fonte: "#E31A39", nativo: "claro" },
  midnight: { fonte: "#6D37D2", nativo: "escuro" },
  clay: { fonte: "#2F6FED", nativo: "claro" },
}

export const SOBRESCRITAS: Partial<Record<keyof typeof PRESETS, Sobrescrita>> = {
  clay: {
    claro: {
      "--background": "#DEE6EF",
      "--chart-1": "#894581",
      "--chart-2": "#5468EE",
      "--chart-3": "#8485B5",
      "--accent": "#FDD5B7",
      "--accent-foreground": "#361900",
    },
    escuro: {
      "--chart-1": "#FA9DC6",
      "--chart-3": "#978FC0",
      "--chart-5": "#CEDCF8",
      "--accent": "#5D3917",
      "--accent-foreground": "#F9DFCB",
    },
    motivo:
      "Fundo claro #DEE6EF: pedido do Rafael (2026-11-09), levemente mais azul que o #F2F4F6 do motor. " +
      "Gráficos: com a cor-fonte #2F6FED, 5 pares de --chart-* se confundiam em protanopia/deuteranopia/tritanopia " +
      "(diferença < 8 no OKLab). Cada cor mudou o mínimo em luminosidade/matiz até todos os pares passarem; a marca não mudou. " +
      "Accent pêssego (escolhido pelo Rafael, 2026-11-09): quente, contrasta com o azul e vem da paleta do Clay; texto sobre ele ≈11,9:1 no claro e ≈8:1 no escuro.",
  },
}
