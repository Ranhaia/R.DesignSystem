export type AtomicCategory = "atom" | "molecule" | "organism"

// Fonte da verdade da categorização Atomic Design dos componentes já
// existentes em src/components/ui/. Aprovada por Rafael na Fase 0 do
// PLANO-LOOP-80-20-TEMPLATES.md (2026-07-20). Qualquer mudança de
// categoria deve ser feita só aqui — o resto do projeto (nav, páginas de
// índice) consome este mapa, nunca lista hardcoded em outro lugar.
export const atomicRegistry: Record<string, AtomicCategory> = {
  // Atoms
  avatar: "atom",
  badge: "atom",
  button: "atom",
  checkbox: "atom",
  input: "atom",
  "input-otp": "atom",
  kbd: "atom",
  label: "atom",
  progress: "atom",
  "radio-group": "atom",
  separator: "atom",
  skeleton: "atom",
  slider: "atom",
  spinner: "atom",
  switch: "atom",
  textarea: "atom",
  toggle: "atom",
  tooltip: "atom",
  "aspect-ratio": "atom",
  "native-select": "atom",
  select: "atom",
  popover: "atom",
  item: "atom",
  marker: "atom",

  // Molecules
  alert: "molecule",
  // Sonner substituiu o Toast antigo do shadcn/ui — é uma composição de
  // ícone + texto + ação (igual em complexidade ao Alert, que também é
  // molecule), só que renderizada via portal/toast() em vez de inline.
  // Continua sendo um átomo visual de verdade (aparece na tela pro
  // usuário), diferente do Direction (que não renderiza nada, só
  // contexto de direção de texto) — por isso Direction fica como
  // utilitário e Sonner não.
  sonner: "molecule",
  breadcrumb: "molecule",
  "button-group": "molecule",
  collapsible: "molecule",
  combobox: "molecule",
  empty: "molecule",
  field: "molecule",
  "hover-card": "molecule",
  "input-group": "molecule",
  pagination: "molecule",
  "toggle-group": "molecule",
  "scroll-area": "molecule",
  attachment: "molecule",

  // Organisms
  accordion: "organism",
  "alert-dialog": "organism",
  calendar: "organism",
  card: "organism",
  carousel: "organism",
  chart: "organism",
  command: "organism",
  "context-menu": "organism",
  dialog: "organism",
  "dropdown-menu": "organism",
  drawer: "organism",
  form: "organism",
  menubar: "organism",
  message: "organism",
  bubble: "organism",
  "navigation-menu": "organism",
  resizable: "organism",
  sheet: "organism",
  sidebar: "organism",
  table: "organism",
  tabs: "organism",
}

// Utilitários/infraestrutura — não entram no catálogo visual (Atoms/
// Molecules/Organisms), mas continuam com página própria em /components.
// Sonner saiu de aqui em 2026-07-21 (ver atomicRegistry acima): ele
// renderiza UI real pro usuário, não é só infraestrutura como Direction.
export const utilitySlugs = ["direction"]

export function getAtomicCategory(slug: string): AtomicCategory | null {
  return atomicRegistry[slug] ?? null
}

// Atoms "em construção" — já existem no Nimbus (outro produto de Rafael),
// ainda não implementados neste projeto. Aparecem nas páginas de índice
// como card desabilitado com badge "Em construção". Fora de escopo da
// Fase 4 (ver Fase 5 do PLANO-LOOP-80-20-TEMPLATES.md).
export interface InProgressEntry {
  name: string
  category: AtomicCategory
}

export const inProgressEntries: InProgressEntry[] = [
  { name: "Chip", category: "atom" },
  { name: "Tag", category: "atom" },
  { name: "File Uploader", category: "atom" },
  { name: "Icon Button", category: "atom" },
  { name: "Link", category: "atom" },
  { name: "List", category: "atom" },
  { name: "Text", category: "atom" },
  { name: "Box", category: "atom" },

  // Achados na auditoria contra a Nimbus em 2026-07-21 (ver
  // PLANO-LOOP-80-20-TEMPLATES.md) — os 4 primeiros eram "Atomic" lá,
  // categoria "atom" direto. Os 4 últimos eram "Composite" (equivalente
  // a Molecules/Organisms); categorizados aqui pelo mesmo raciocínio já
  // usado no resto do atomicRegistry (comparando com o "parente" mais
  // próximo em complexidade que já temos): SegmentedControl e
  // SplitButton são composições simples de poucos atoms, como
  // ToggleGroup e ButtonGroup (molecule); Stepper e TimePicker têm
  // lógica própria mais complexa, como Accordion e Calendar (organism).
  { name: "Icon", category: "atom" },
  { name: "MultiSelect", category: "atom" },
  { name: "Thumbnail", category: "atom" },
  { name: "Title", category: "atom" },
  { name: "SegmentedControl", category: "molecule" },
  { name: "SplitButton", category: "molecule" },
  { name: "Stepper", category: "organism" },
  { name: "TimePicker", category: "organism" },
]
