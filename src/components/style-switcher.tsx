"use client"

import * as React from "react"
import { Check, PuzzleIcon } from "lucide-react"

import { stylesList } from "@/lib/styles-registry"
import { RDsLogo, RLogo } from "@/components/r-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const STORAGE_KEY = "style-preset"

export function StyleSwitcher() {
  const { isMobile } = useSidebar()
  const [active, setActive] = React.useState(stylesList[0])

  // Sincroniza com o que o script inline (ver layout.tsx) já aplicou no
  // <html> antes da hidratação, para não haver flash de estilo errado.
  React.useEffect(() => {
    const current = document.documentElement.dataset.style ?? "default"
    const match = stylesList.find((s) => s.value === current)
    if (match) setActive(match)
  }, [])

  function selectStyle(style: (typeof stylesList)[number]) {
    setActive(style)
    document.documentElement.dataset.style = style.value
    // Sincroniza a classe "dark" com o modo nativo do estilo escolhido —
    // mesma lógica do script inline em layout.tsx (que cobre o primeiro
    // carregamento). Sem isso, trocar para "Midnight" em runtime não
    // aplicaria o modo escuro que é a identidade nativa dele.
    document.documentElement.classList.toggle("dark", style.nativeMode === "dark")
    window.localStorage.setItem(STORAGE_KEY, style.value)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* 2026-07-22: split pedido pelo Rafael — antes era um botão só
            (ícone + "Estilo" + nome + chevron) que abria o dropdown. Agora
            são 2 elementos separados:
            1) a logo — wordmark completo "R.ds" (RDsLogo) quando o menu
               está expandido, só o "R" (RLogo) quando recolhido — o "R"
               sempre com a cor de destaque do preset ativo
               (text-sidebar-primary já é o token que varia por preset,
               sem cor nova); o ".ds" fica neutro (--sidebar-foreground);
            2) o gatilho de verdade pra abrir o dropdown, ícone de "peça
               de quebra-cabeça" (PuzzleIcon, pedido explícito do Rafael).
               Esse ícone era da categoria "Outros" na nav de componentes
               (nav-components.tsx), removida nesta mesma mudança — ficou
               livre e foi reaproveitado aqui em vez de escolher um novo.
               Tooltip "Trocar tema" já que agora não tem mais texto ao
               lado do ícone.
            justify-between empurra o gatilho pra borda direita quando
            expandido; group-data-[collapsible=icon]:flex-col deixa o "R"
            sozinho em cima e o gatilho embaixo quando recolhido.
            2026-07-22: pl-1 no container só afeta o lado esquerdo (o "R.ds"
            estava colado na borda do SidebarHeader) — como é padding e não
            margin no filho, o gatilho à direita (medido a partir da borda
            direita do padding-box) não se move. No recolhido, gap-1 pra
            gap-3: Rafael achou o "R" muito próximo do botão de troca de
            tema quando o menu fecha. */}
        <div className="flex items-center justify-between gap-2 pl-1 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-3 group-data-[collapsible=icon]:pl-0">
          <div
            className="flex h-8 items-center text-sidebar-primary group-data-[collapsible=icon]:hidden"
            aria-hidden="true"
          >
            <RDsLogo className="h-8 w-auto" />
          </div>
          <div
            className="hidden size-8 shrink-0 items-center justify-center text-sidebar-primary group-data-[collapsible=icon]:flex"
            aria-hidden="true"
          >
            <RLogo className="size-8" />
          </div>
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="default"
                    className="size-8 shrink-0 justify-center p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    aria-label="Trocar tema"
                  >
                    <PuzzleIcon className="size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? "bottom" : "right"}>
                Trocar tema
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Tokens de tema
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {stylesList.map((style) => (
                <DropdownMenuItem
                  key={style.value}
                  onClick={() => selectStyle(style)}
                  className="items-start gap-2 p-2"
                >
                  <div
                    className="mt-0.5 size-3.5 shrink-0 rounded-full border"
                    style={{ backgroundColor: style.swatch }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{style.label}</span>
                      {style.value === active.value && (
                        <Check className="ml-auto size-4 shrink-0" />
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs text-wrap">
                      {style.description}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
