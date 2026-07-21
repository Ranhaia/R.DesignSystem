import { Hero } from "@/components/portfolio/hero"

// Rota separada da home "Visão geral" (/) — não mexe na vitrine de tokens
// que já existe. É aqui que o site de portfólio vai crescer, seção por
// seção, a partir do Hero.
export default function PortfolioPage() {
  return (
    <div className="-mx-4 -mb-4">
      <Hero />
    </div>
  )
}
