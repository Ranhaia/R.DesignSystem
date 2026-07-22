// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { InputOTP } from "@/components/ui/input-otp"
import InputOtpDemo from "@/components/examples/input-otp-demo"
import InputOtpControlled from "@/components/examples/input-otp-controlled"
import InputOtpPattern from "@/components/examples/input-otp-pattern"
import InputOtpSeparator from "@/components/examples/input-otp-separator"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof InputOTP> = {
  title: "Atoms/Input Otp",
  component: InputOTP,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof InputOTP>

export const Default: Story = {
  render: () => <InputOtpDemo />,
}

export const Controlled: Story = {
  render: () => <InputOtpControlled />,
}

export const Pattern: Story = {
  render: () => <InputOtpPattern />,
}

export const WithSeparator: Story = {
  render: () => <InputOtpSeparator />,
}
