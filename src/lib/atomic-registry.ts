export type AtomicCategory = "primitive" | "atom" | "molecule" | "organism"

// Label e rota de índice por categoria — únicas (antes duplicadas como
// consts locais em nav-components.tsx). Movidas pra cá 2026-07-22 pra
// resolver o breadcrumb de /components/[slug] linkando pra um
// "Componentes" que não existe como página: agora o breadcrumb usa esses
// mesmos mapas pra saber que categoria (Atoms/Molecules/Organisms) e pra
// que rota de índice cada componente pertence, em vez de um bucket fixo
// que nunca teve página própria.
export const categoryLabels: Record<AtomicCategory, string> = {
  primitive: "Primitivos",
  atom: "Atoms",
  molecule: "Molecules",
  organism: "Organisms",
}

export const categoryHref: Record<AtomicCategory, string> = {
  primitive: "/primitivos",
  atom: "/atoms",
  molecule: "/molecules",
  organism: "/organisms",
}

// Critério (aprovado por Rafael em 2026-10-19): a camada mínima de um
// componente sai do que ele importa do DS.
// - Primitivo: fundação sem composição, usada por todo mundo (ícone,
//   rótulo, texto, título, separador, skeleton, box). Não importa nada do DS.
// - Átomo: importa no máximo primitivos.
// - Molécula: combina átomos (e primitivos).
// - Organismo: combina moléculas ou organismos.
// Reusar só estilo (`buttonVariants`) ou tipo não é composição. A regra dá o
// piso; subir de camada sem dependência que justifique é decisão explícita
// (ex.: Accordion é molécula por ser um conjunto de peças). A trava é
// atomic-registry.test.ts.
//
// Fonte da verdade da categorização Atomic Design dos componentes já
// existentes em src/components/ui/. Aprovada por Rafael na Fase 0 do
// plans/current/loop-80-20-templates.md (2026-07-20). Qualquer mudança de
// categoria deve ser feita só aqui — o resto do projeto (nav, páginas de
// índice) consome este mapa, nunca lista hardcoded em outro lugar.
export const atomicRegistry: Record<string, AtomicCategory> = {
  // Primitivos
  icon: "primitive",
  label: "primitive",
  skeleton: "primitive",
  separator: "primitive",
  text: "primitive",
  title: "primitive",
  box: "primitive",
  // Base que os outros consomem; não renderiza nada, só entrega o contexto de
  // direção de texto (Rafael, 2026-10-29: primitivo pode não ter UI).
  direction: "primitive",

  // Atoms
  avatar: "atom",
  badge: "atom",
  button: "atom",
  checkbox: "atom",
  "file-uploader": "atom",
  input: "atom",
  "input-otp": "atom",
  kbd: "atom",
  link: "atom",
  list: "atom",
  progress: "atom",
  "radio-group": "atom",
  slider: "atom",
  spinner: "atom",
  switch: "atom",
  tag: "atom",
  textarea: "atom",
  thumbnail: "atom",
  toggle: "atom",
  tooltip: "atom",
  "aspect-ratio": "atom",
  "native-select": "atom",
  select: "atom",
  popover: "atom",
  item: "atom",
  marker: "atom",

  // Molecules
  accordion: "molecule",
  bubble: "molecule",
  card: "molecule",
  message: "molecule",
  table: "molecule",
  tabs: "molecule",
  chip: "molecule",
  "icon-button": "molecule",
  "tree-select": "molecule",
  alert: "molecule",
  // Sonner substituiu o Toast antigo do shadcn/ui — é uma composição de
  // ícone + texto + ação (igual em complexidade ao Alert, que também é
  // molecule), só que renderizada via portal/toast() em vez de inline.
  // Aparece na tela pro usuário, diferente do Direction (que não renderiza
  // nada e é primitivo).
  sonner: "molecule",
  breadcrumb: "molecule",
  "button-group": "molecule",
  collapsible: "molecule",
  empty: "molecule",
  field: "molecule",
  "hover-card": "molecule",
  "input-group": "molecule",
  pagination: "molecule",
  "toggle-group": "molecule",
  "scroll-area": "molecule",
  "segmented-control": "molecule",
  attachment: "molecule",
  "speed-dial": "molecule",

  // Organisms
  combobox: "organism",
  files: "organism",
  "multi-select": "organism",
  "split-button": "organism",
  "alert-dialog": "organism",
  calendar: "organism",
  carousel: "organism",
  chart: "organism",
  command: "organism",
  "context-menu": "organism",
  dialog: "organism",
  "dropdown-menu": "organism",
  drawer: "organism",
  form: "organism",
  menubar: "organism",
  "navigation-menu": "organism",
  resizable: "organism",
  sheet: "organism",
  sidebar: "organism",
  stepper: "organism",
  "time-picker": "organism",
}

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
