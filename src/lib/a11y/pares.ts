import type { Uso } from "./perfil"

export type Par = { grupo: string; frente: string; fundo: string; uso: Uso; wcag: string; duvida?: string }

const p = (grupo: string, uso: Uso, wcag: string, pares: [string, string][], duvida?: string): Par[] =>
  pares.map(([frente, fundo]) => ({ grupo, frente, fundo, uso, wcag, duvida }))

const BORDA =
  "Com rótulo visível, a borda pode não ser o único limite do campo (SC 1.4.11). Reprovação vira dúvida no A11Y-DECISIONS.md."

// Controle desabilitado é isento de contraste pela WCAG e por isso não aparece aqui.
export const PARES: Par[] = [
  ...p("Texto base", "texto", "1.4.3", [["--foreground", "--background"], ["--card-foreground", "--card"], ["--popover-foreground", "--popover"]]),
  ...p("Texto em ação", "texto", "1.4.3", [["--primary-foreground", "--primary"], ["--secondary-foreground", "--secondary"], ["--accent-foreground", "--accent"], ["--destructive-foreground", "--destructive"]]),
  ...p("Texto de apoio", "texto", "1.4.3", [["--muted-foreground", "--background"], ["--muted-foreground", "--muted"], ["--muted-foreground", "--card"]]),
  ...p("Menu lateral", "texto", "1.4.3", [["--sidebar-foreground", "--sidebar"], ["--sidebar-primary-foreground", "--sidebar-primary"], ["--sidebar-accent-foreground", "--sidebar-accent"]]),
  ...p("IA", "texto", "1.4.3", [["--ai-text-high", "--ai-surface"], ["--ai-text-low", "--ai-surface"]]),
  ...p("Limite de controle", "ui", "1.4.11", [["--input", "--background"], ["--border", "--background"]], BORDA),
  ...p("Foco", "ui", "1.4.11 / 2.4.7", [["--ring", "--background"], ["--ring", "--card"], ["--sidebar-ring", "--sidebar"]]),
  ...p("Ação contra a página", "ui", "1.4.11", [["--primary", "--background"], ["--destructive", "--background"]]),
]
