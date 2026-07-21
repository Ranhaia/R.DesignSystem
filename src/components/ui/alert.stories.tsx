import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CheckCircle2Icon, ServerCrashIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const meta: Meta<typeof Alert> = {
  title: "Molecules/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Alert {...args}>
      <CheckCircle2Icon />
      <AlertTitle>Alterações salvas</AlertTitle>
      <AlertDescription>
        Os dados da apólice foram atualizados com sucesso.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args}>
      <ServerCrashIcon />
      <AlertTitle>Não foi possível carregar o sinistro</AlertTitle>
      <AlertDescription>Verifique sua conexão e tente novamente.</AlertDescription>
    </Alert>
  ),
}
