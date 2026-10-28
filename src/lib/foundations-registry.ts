// Registro dos Foundations do Design System (plans/current/design-system-piloto.md
// e _trabalho/H-navegacao-design-system.md) — mapa de 9 bases definido no Épico:
// Colors · Typography · Spacing · Grid · Radius · Elevation · Motion · Icons · Accessibility.
// Fonte única consumida pela navegação lateral (nav-foundations.tsx) e pela
// página-índice (/fundamentos).

import type { MaterialSymbol } from "material-symbols"

export interface FoundationEntry {
  slug: string
  name: string
  href: string
  icon: MaterialSymbol
  description: string
}

export const foundationsList: FoundationEntry[] = [
  {
    slug: "cores",
    name: "Colors",
    href: "/fundamentos/cores",
    icon: "palette",
    description: "Cores e tokens semânticos nos 5 presets do Design System.",
  },
  {
    slug: "tipografia",
    name: "Typography",
    href: "/fundamentos/tipografia",
    icon: "match_case",
    description: "Escala tipográfica, pesos, line-height e famílias de fonte.",
  },
  {
    slug: "espacamento",
    name: "Spacing",
    href: "/fundamentos/espacamento",
    icon: "space_bar",
    description: "Escala de espaçamento baseada em múltiplos de 4.",
  },
  {
    slug: "grid",
    name: "Grid",
    href: "/fundamentos/grid",
    icon: "grid_view",
    description: "Sistema de grid, alinhamento e estrutura de layout.",
  },
  {
    slug: "bordas",
    name: "Radius",
    href: "/fundamentos/bordas",
    icon: "rounded_corner",
    description: "Tokens de raio de curvatura e raio concêntrico.",
  },
  {
    slug: "elevacao",
    name: "Elevation",
    href: "/fundamentos/elevacao",
    icon: "layers",
    description: "Níveis de sombra, elevação e profundidade visual.",
  },
  {
    slug: "motion",
    name: "Motion",
    href: "/fundamentos/motion",
    icon: "motion_mode",
    description: "Durações, curvas de transição e respeito a reduced motion.",
  },
  {
    slug: "icones",
    name: "Icons",
    href: "/fundamentos/icones",
    icon: "sentiment_satisfied",
    description: "Sistema de ícones Material Symbols e padronização ótica.",
  },
  {
    slug: "acessibilidade",
    name: "Accessibility",
    href: "/fundamentos/acessibilidade",
    icon: "accessibility_new",
    description: "Diretrizes WCAG 2.2 AA, contraste e navegação por teclado.",
  },
]
