import { gerarTema, TOKENS_COR, type Token } from "./gerar"
import { PRESETS, SOBRESCRITAS } from "./presets"

export function gerarCss(): string {
  const linhas: string[] = [
    "/* Gerado por scripts/gerar-tokens.ts. Não editar. */",
    "",
  ]

  const formatarBloco = (seletor: string, tokens: Record<Token, string>) => {
    linhas.push(`${seletor} {`)
    for (const token of TOKENS_COR) {
      linhas.push(`  ${token}: ${tokens[token]};`)
    }
    linhas.push("}")
    linhas.push("")
  }

  // Obter temas gerados para cada preset
  const temas: Record<string, { claro: Record<Token, string>; escuro: Record<Token, string> }> = {}
  for (const [nome, config] of Object.entries(PRESETS)) {
    const tema = gerarTema(config.fonte)
    // Aplicar sobrescritas se existirem
    const sob = SOBRESCRITAS[nome as keyof typeof PRESETS]
    const claro = { ...tema.claro, ...(sob?.claro ?? {}) }
    const escuro = { ...tema.escuro, ...(sob?.escuro ?? {}) }
    temas[nome] = { claro, escuro }
  }

  // 1. :root e .dark usam o preset "default"
  formatarBloco(":root", temas["default"].claro)
  formatarBloco(".dark", temas["default"].escuro)

  // 2. [data-style="x"] e .dark[data-style="x"] para os demais presets: editorial, tech, soft, midnight
  const outrosPresets = ["editorial", "tech", "soft", "midnight"] as const
  for (const preset of outrosPresets) {
    formatarBloco(`[data-style="${preset}"]`, temas[preset].claro)
    formatarBloco(`.dark[data-style="${preset}"]`, temas[preset].escuro)
  }

  return linhas.join("\n").trimEnd() + "\n"
}
