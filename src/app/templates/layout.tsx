import { FluxoLoginProvider } from "@/components/templates/fluxo-login-context"

// Layout compartilhado de /templates/* — só existe pra ancorar o
// FluxoLoginProvider (ver fluxo-login-context.tsx) num nível que
// sobrevive à navegação client-side entre as rotas do fluxo de login e,
// a partir da Fase 5B, as telas de seguros. Sem lógica de UI própria: o
// header/sidebar de cada template continua vindo do AppShell (layout
// raiz), este arquivo não renderiza chrome nenhum.
export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <FluxoLoginProvider>{children}</FluxoLoginProvider>
}
