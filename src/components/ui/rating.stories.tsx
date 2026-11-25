import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Rating } from "@/components/ui/rating"
import RatingDemo from "@/components/examples/rating-demo"
import RatingMedia from "@/components/examples/rating-media"

const meta: Meta<typeof Rating> = {
  title: "Atoms/Rating",
  component: Rating,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Rating>

export const Default: Story = {
  render: () => <RatingDemo />,
}

export const Media: Story = {
  render: () => <RatingMedia />,
}
