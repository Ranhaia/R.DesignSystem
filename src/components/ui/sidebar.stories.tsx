import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Icon } from "@/components/ui/icon"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import SidebarDemo from "@/components/examples/sidebar-demo"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Sidebar> = {
  title: "Organisms/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: () => <SidebarDemo />,
}

export const MobilePelaDireita: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <SidebarProvider>
      <Sidebar side="left" mobileSide="right">
        <SidebarHeader className="p-3 text-sm font-medium">
          Meu projeto
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon name="home" />
                  <span>Início</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="p-4">
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: /alternar barra lateral/i })
    await userEvent.click(trigger)

    const drawer = await waitFor(
      () => {
        const el = document.querySelector<HTMLElement>('[data-mobile="true"]')
        expect(el).not.toBeNull()
        const rect = el!.getBoundingClientRect()
        expect(Math.round(rect.right)).toBe(window.innerWidth)
        return el!
      },
      { timeout: 3000 }
    )

    const rect = drawer.getBoundingClientRect()
    expect(Math.round(rect.right)).toBe(window.innerWidth)
  },
}
