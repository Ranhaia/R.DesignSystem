// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Calendar } from "@/components/ui/calendar"
import CalendarDemo from "@/components/examples/calendar-demo"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Calendar> = {
  title: "Organisms/Calendar",
  component: Calendar,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => <CalendarDemo />,
}
