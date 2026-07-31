import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FileUploader } from "@/components/ui/file-uploader"
import FileUploaderDemo from "@/components/examples/file-uploader-demo"

const meta: Meta<typeof FileUploader> = {
  title: "Atoms/File Uploader",
  component: FileUploader,
  tags: ["autodocs"],
  args: {
    label: "Arraste um arquivo ou clique para selecionar",
    multiple: false,
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof FileUploader>

export const Default: Story = {}

export const Multiple: Story = {
  args: { multiple: true },
}

export const AcceptImages: Story = {
  args: {
    accept: "image/*",
    label: "Arraste uma imagem ou clique para selecionar",
  },
}

export const WithMaxSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024,
    label: "Arraste um arquivo (máx. 5MB) ou clique para selecionar",
    onFilesRejected: (files) =>
      alert(`Arquivo muito grande: ${files.map((f) => f.name).join(", ")}`),
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Examples: Story = {
  render: () => <FileUploaderDemo />,
}
