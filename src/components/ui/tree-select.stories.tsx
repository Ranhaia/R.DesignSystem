import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { TreeSelect } from "@/components/ui/tree-select"
import TreeSelectDemo from "@/components/examples/tree-select-demo"
import TreeSelectMultiple from "@/components/examples/tree-select-multiple"
import TreeSelectCheckable from "@/components/examples/tree-select-checkable"
import TreeSelectCheckableParent from "@/components/examples/tree-select-checkable-parent"

const meta: Meta<typeof TreeSelect> = {
  title: "Atoms/TreeSelect",
  component: TreeSelect,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof TreeSelect>

export const Single: Story = { render: () => <TreeSelectDemo /> }
export const Multiple: Story = { render: () => <TreeSelectMultiple /> }
// Busca filtra a árvore mantendo os pais; rodapé marca todas as folhas
// habilitadas (6 — "Viagem" está desabilitada) e limpa.
export const Checkable: Story = {
  render: () => <TreeSelectCheckable />,
  play: async () => {
    const body = within(document.body)
    await userEvent.click(body.getByRole("combobox", { name: "Ramos de seguro" }))
    const search = await body.findByRole("textbox", { name: "Buscar na lista" })
    await userEvent.type(search, "saú")
    await waitFor(() =>
      // textContent inclui o nome dos ícones (ligaduras do Material Symbols)
      expect(body.getAllByRole("treeitem").map((n) => n.textContent)).toEqual([
        expect.stringContaining("Pessoas"),
        expect.stringContaining("Saúde"),
      ])
    )
    await userEvent.click(body.getByRole("button", { name: "Limpar busca" }))
    await userEvent.click(body.getByRole("button", { name: "Todos" }))
    await expect(await body.findByText("6 selecionados")).toBeInTheDocument()
    await userEvent.click(body.getByRole("button", { name: "Limpar" }))
    await expect(await body.findByText("Nenhum item selecionado")).toBeInTheDocument()
  },
}
export const CheckableShowParent: Story = {
  render: () => <TreeSelectCheckableParent />,
}
