import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { PasswordInput } from "@/components/ui/password-input"
import PasswordInputDemo from "@/components/examples/password-input-demo"
import PasswordInputCadastro from "@/components/examples/password-input-cadastro"

const meta: Meta<typeof PasswordInput> = {
  title: "Molecules/Password Input",
  component: PasswordInput,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {
  render: () => <PasswordInputDemo />,
}

export const Cadastro: Story = {
  render: () => <PasswordInputCadastro />,
}
