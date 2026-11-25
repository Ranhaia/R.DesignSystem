import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BackToTop } from "@/components/ui/back-to-top"

const meta: Meta<typeof BackToTop> = {
  title: "Organisms/Back To Top",
  component: BackToTop,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof BackToTop>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 40 }, (_, i) => (
        <p key={i}>Parágrafo {i + 1}</p>
      ))}
      <BackToTop threshold={200} />
    </div>
  ),
}
