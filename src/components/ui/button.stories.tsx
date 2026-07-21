import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/button"

// Piloto de story pro modelo híbrido (catálogo no Storybook, Jornadas no
// Next.js). argTypes usa as mesmas opções reais já verificadas contra
// button.tsx em src/lib/component-docs.ts — não deixamos só na inferência
// automática do docgen pra garantir que bate 1:1 com o componente de
// verdade.
const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Destructive: Story = { args: { variant: "destructive" } }

export const Link: Story = { args: { variant: "link" } }

export const Disabled: Story = { args: { disabled: true } }
