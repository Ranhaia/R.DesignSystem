import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Thumbnail } from "@/components/ui/thumbnail"
import ThumbnailDemo from "@/components/examples/thumbnail-demo"

const meta: Meta<typeof Thumbnail> = {
  title: "Atoms/Thumbnail",
  component: Thumbnail,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    aspectRatio: {
      control: "select",
      options: ["1/1", "4/3", "3/4", "16/9", "9/16", "2/1", "1/2"],
    },
  },
  args: {
    src: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80",
    alt: "Foto de Drew Beamer",
    size: "default",
    aspectRatio: "1/1",
  },
}

export default meta

type Story = StoryObj<typeof Thumbnail>

export const Default: Story = {}

export const Small: Story = { args: { size: "sm" } }

export const Large: Story = { args: { size: "lg" } }

export const WideAspectRatio: Story = {
  args: { aspectRatio: "16/9", size: "lg" },
}

export const Fallback: Story = {
  args: { src: "", alt: "Anexo sem preview disponível" },
}

export const Skeleton: Story = {
  render: () => <Thumbnail.Skeleton size="lg" aspectRatio="16/9" />,
}

export const Examples: Story = {
  render: () => <ThumbnailDemo />,
}
