// Gerado a partir de dados já verificados no projeto: categoria em
// atomic-registry.ts, export real do componente (grep no source),
// demo real em src/components/examples (exampleRegistry) — nenhum
// conteúdo/prop foi inventado.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Carousel } from "@/components/ui/carousel"
import CarouselDemo from "@/components/examples/carousel-demo"
import CarouselApi from "@/components/examples/carousel-api"
import CarouselOrientation from "@/components/examples/carousel-orientation"
import CarouselPlugin from "@/components/examples/carousel-plugin"
import CarouselSize from "@/components/examples/carousel-size"
import CarouselSpacing from "@/components/examples/carousel-spacing"

// Sem variant/size controlável (ver TAXONOMIA/component-docs.ts) — a story
// existe pra ter o componente navegável no catálogo do Storybook, com
// addon-a11y auditando o exemplo real (não um placeholder).
const meta: Meta<typeof Carousel> = {
  title: "Organisms/Carousel",
  component: Carousel,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  render: () => <CarouselDemo />,
}

export const Api: Story = {
  render: () => <CarouselApi />,
}

export const Orientation: Story = {
  render: () => <CarouselOrientation />,
}

export const Plugin: Story = {
  render: () => <CarouselPlugin />,
}

export const Size: Story = {
  render: () => <CarouselSize />,
}

export const Spacing: Story = {
  render: () => <CarouselSpacing />,
}
