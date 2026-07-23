"use client"

import * as React from "react"

// Context de persistência entre as telas do fluxo de login (Fase 5A) e,
// a partir daqui, as telas de seguros da Fase 5B — decisão ratificada
// por Rafael em 2026-07-23 (ver .build/telas/PENDENCIAS.md, item 2.1).
// Antes, cada tela usava só estado local — nada sobrevivia à navegação
// entre rotas. Escolha de Context (em vez de query param/sessionStorage):
// guarda em memória durante a navegação client-side entre as telas do
// fluxo, sem poluir a URL; a troca é que perde o valor se a página for
// recarregada no meio do fluxo — aceitável aqui porque é só personalização
// de exibição, não dado crítico (nada se perde de fato: apolices-ativas/
// painel-corretor teriam sua própria busca real num backend de verdade).
//
// Montado em src/app/templates/layout.tsx, então persiste entre
// selecao-perfil-corretora → onboarding → (5B: apolices-ativas,
// novo-sinistro, painel-corretor) sem remontar — layout compartilhado do
// App Router. Providencia no nível de /templates inteiro (não só do
// fluxo de login) porque dashboard-financeiro e as telas de 5B também
// vivem em /templates/* e podem precisar ler o mesmo valor depois.
export interface SelecaoVinculo {
  perfil: string
  corretora: string
}

interface FluxoLoginContextValue {
  selecao: SelecaoVinculo | null
  setSelecao: (selecao: SelecaoVinculo) => void
  limparSelecao: () => void
}

const FluxoLoginContext = React.createContext<FluxoLoginContextValue | null>(
  null
)

export function FluxoLoginProvider({ children }: { children: React.ReactNode }) {
  const [selecao, setSelecaoState] = React.useState<SelecaoVinculo | null>(
    null
  )

  const value = React.useMemo<FluxoLoginContextValue>(
    () => ({
      selecao,
      setSelecao: setSelecaoState,
      limparSelecao: () => setSelecaoState(null),
    }),
    [selecao]
  )

  return (
    <FluxoLoginContext.Provider value={value}>
      {children}
    </FluxoLoginContext.Provider>
  )
}

// `selecao` é `null` sempre que a tela é aberta sem passar por
// selecao-perfil-corretora antes (acesso direto à URL, dashboard-
// financeiro, ou futuras telas de 5B testadas isoladamente) — é um
// estado válido, não um erro; cada tela que consome o hook decide como
// lidar com a ausência (mostrar genérico, esconder a personalização
// etc.). O que de fato lança erro é usar o hook fora do Provider (bug de
// código, não estado de dado) — ver mensagem abaixo.
export function useFluxoLogin() {
  const context = React.useContext(FluxoLoginContext)
  if (!context) {
    throw new Error(
      "useFluxoLogin precisa estar dentro de <FluxoLoginProvider> (ver src/app/templates/layout.tsx)"
    )
  }
  return context
}
