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

export const PRESETS: Record<"default" | "editorial" | "tech" | "soft" | "midnight", PresetConfig> = {
  default: { fonte: "#171717", nativo: "claro" },
  editorial: { fonte: "#7E2600", nativo: "claro" },
  tech: { fonte: "#1447E6", nativo: "claro" },
  soft: { fonte: "#E31A39", nativo: "claro" },
  midnight: { fonte: "#6D37D2", nativo: "escuro" },
}

export const SOBRESCRITAS: Partial<Record<keyof typeof PRESETS, Sobrescrita>> = {}
