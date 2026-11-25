import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SearchInput } from "@/components/ui/search-input"
import SearchInputDemo from "@/components/examples/search-input-demo"
import SearchInputAtalho from "@/components/examples/search-input-atalho"

const meta: Meta<typeof SearchInput> = {
  title: "Organisms/Search Input",
  component: SearchInput,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: () => <SearchInputDemo />,
}

export const Atalho: Story = {
  render: () => <SearchInputAtalho />,
}
