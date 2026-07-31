import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Link } from "@/components/ui/link"
import LinkDemo from "@/components/examples/link-demo"

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg"],
    },
  },
  args: {
    children: "Saiba mais",
    href: "#",
    size: "default",
    external: false,
  },
}

export default meta

type Story = StoryObj<typeof Link>

export const Default: Story = {}

export const Small: Story = { args: { size: "sm" } }

export const Large: Story = { args: { size: "lg" } }

export const External: Story = {
  args: { external: true, href: "https://ui.shadcn.com" },
}

export const Skeleton: Story = {
  render: () => <Link.Skeleton />,
}

export const Examples: Story = {
  render: () => <LinkDemo />,
}
