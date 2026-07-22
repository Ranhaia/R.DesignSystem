// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Breadcrumb } from "@/components/ui/breadcrumb"
import BreadcrumbDemo from "@/components/examples/breadcrumb-demo"
import BreadcrumbDropdown from "@/components/examples/breadcrumb-dropdown"
import BreadcrumbEllipsis from "@/components/examples/breadcrumb-ellipsis"
import BreadcrumbLink from "@/components/examples/breadcrumb-link"
import BreadcrumbResponsive from "@/components/examples/breadcrumb-responsive"
import BreadcrumbSeparator from "@/components/examples/breadcrumb-separator"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Breadcrumb> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  render: () => <BreadcrumbDemo />,
}

export const Dropdown: Story = {
  render: () => <BreadcrumbDropdown />,
}

export const Ellipsis: Story = {
  render: () => <BreadcrumbEllipsis />,
}

export const WithLink: Story = {
  render: () => <BreadcrumbLink />,
}

export const Responsive: Story = {
  render: () => <BreadcrumbResponsive />,
}

export const CustomSeparator: Story = {
  render: () => <BreadcrumbSeparator />,
}
