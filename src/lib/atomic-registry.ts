export type AtomicCategory = "atom" | "molecule" | "organism"

// Label e rota de índice por categoria — únicas (antes duplicadas como
// consts locais em nav-components.tsx). Movidas pra cá 2026-07-22 pra
// resolver o breadcrumb de /components/[slug] linkando pra um
// "Componentes" que não existe como página: agora o breadcrumb usa esses
// mesmos mapas pra saber que categoria (Atoms/Molecules/Organisms) e pra
// que rota de índice cada componente pertence, em vez de um bucket fixo
// que nunca teve página própria.
export const categoryLabels: Record<AtomicCategory, string> = {
  atom: "Atoms",
  molecule: "Molecules",
  organism: "Organisms",
}

export const categoryHref: Record<AtomicCategory, string> = {
  atom: "/atoms",
  molecule: "/molecules",
  organism: "/organisms",
}

// Fonte da verdade da categorização Atomic Design dos componentes já
// existentes em src/components/ui/. Aprovada por Rafael na Fase 0 do
// plans/current/loop-80-20-templates.md (2026-07-20). Qualquer mudança de
// categoria deve ser feita só aqui — o resto do projeto (nav, páginas de
// índice) consome este mapa, nunca lista hardcoded em outro lugar.
export const atomicRegistry: Record<string, AtomicCategory> = {
  // Atoms
  avatar: "atom",
  badge: "atom",
  box: "atom",
  button: "atom",
  checkbox: "atom",
  chip: "atom",
  "file-uploader": "atom",
  icon: "atom",
  "icon-button": "atom",
  input: "atom",
  "input-otp": "atom",
  kbd: "atom",
  label: "atom",
  link: "atom",
  progress: "atom",
  "radio-group": "atom",
  separator: "atom",
  skeleton: "atom",
  slider: "atom",
  spinner: "atom",
  switch: "atom",
  tag: "atom",
  text: "atom",
  textarea: "atom",
  thumbnail: "atom",
  title: "atom",
  toggle: "atom",
  tooltip: "atom",
  "aspect-ratio": "atom",
  "native-select": "atom",
  select: "atom",
  popover: "atom",
  item: "atom",
  marker: "atom",
  "multi-select": "atom",
  "tree-select": "atom",

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
  "segmented-control": "molecule",
  "split-button": "molecule",
  attachment: "molecule",
  "speed-dial": "molecule",

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
  stepper: "organism",
  table: "organism",
  tabs: "organism",
  "time-picker": "organism",
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
// Fase 4 (ver Fase 5 do plans/current/loop-80-20-templates.md).
export interface InProgressEntry {
  name: string
  category: AtomicCategory
}

// Vazia desde 2026-07-30 — os 15 componentes que estavam aqui (Fase 6.1 do
// plans/current/loop-80-20-templates.md) foram todos implementados e movidos pra
// atomicRegistry acima. Mantida como array tipado (não removida) porque
// nav-components.tsx e as páginas de índice (/atoms, /molecules, /organisms)
// ainda consomem essa lista pra renderizar cards "Em construção" — component
// futuro que entrar nesse fluxo volta a usar esta lista.
export const inProgressEntries: InProgressEntry[] = []
