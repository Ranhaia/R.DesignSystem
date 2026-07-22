// Registro dos Templates (Fase 4/5 do PLANO-LOOP-80-20-TEMPLATES.md) — mesmo
// padrão de atomic-registry.ts / patterns-registry.ts: fonte única de
// verdade, consumida pela nav (nav-templates.tsx) e pela página-índice
// (/templates). Templates são jornadas reais em Next.js (não Storybook),
// porque precisam de navegação de verdade pro teste ponta a ponta com
// leitor de tela.

export interface TemplateEntry {
  slug: string
  name: string
}

// Templates com rota funcional em src/app/templates/.
export const templatesList: TemplateEntry[] = [
  { slug: "dashboard-financeiro", name: "Dashboard financeiro" },
]

// Templates planejados (Fase 5, ver PLANO-LOOP-80-20-TEMPLATES.md) — ainda
// sem rota própria. Aparecem na página-índice como card desabilitado com
// badge "Em construção", mesmo padrão do atomic-registry.
export const inProgressTemplates: TemplateEntry[] = [
  // 5A — Fluxo de login (5 rotas)
  { slug: "login-simples", name: "Login simples" },
  { slug: "login-erro-validacao", name: "Login — erro de validação" },
  { slug: "recuperacao-senha", name: "Recuperação de senha" },
  { slug: "selecao-perfil-corretora", name: "Seleção de perfil/corretora" },
  { slug: "onboarding", name: "Onboarding" },

  // 5B — 3 telas de seguros
  { slug: "apolices-ativas", name: "Apólices ativas" },
  { slug: "novo-sinistro", name: "Novo sinistro" },
  { slug: "painel-corretor", name: "Painel do corretor" },
]
