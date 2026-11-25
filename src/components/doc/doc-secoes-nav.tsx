import { TocScrollSpy, tocLinkClass } from "@/components/doc/toc-scroll-spy"
import type { SecaoItem } from "@/lib/doc-abas"

// Barra de âncoras da página, grudada no topo ao rolar; a seção na tela ganha aria-current (scroll-spy).
export function DocSecoesNav({ secoes }: { secoes: SecaoItem[] }) {
  if (secoes.length === 0) return null
  return (
    <nav
      aria-label="Nesta página"
      className="sticky top-16 z-10 -mx-1 overflow-x-auto border-b bg-background/90 px-1 backdrop-blur"
    >
      <TocScrollSpy />
      <ul className="flex w-max min-w-full gap-5 text-sm text-muted-foreground">
        {secoes.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={`block py-3 ${tocLinkClass}`}>
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
