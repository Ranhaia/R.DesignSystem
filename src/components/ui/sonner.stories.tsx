import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Toaster } from "@/components/ui/sonner"
import SonnerDemo from "@/components/examples/sonner-demo"
import SonnerTypes from "@/components/examples/sonner-types"

// Sonner é montado uma vez na raiz do app (ver <Toaster /> em
// app-shell.tsx) e disparado via toast() de qualquer lugar — aqui, como
// não temos o AppShell, montamos o <Toaster /> junto com o botão de
// exemplo pra a notificação aparecer de verdade dentro da story.
const meta: Meta<typeof Toaster> = {
  title: "Molecules/Sonner",
  component: Toaster,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <>
      <SonnerDemo />
      <Toaster />
    </>
  ),
}

export const Types: Story = {
  render: () => <SonnerTypes />,
}
