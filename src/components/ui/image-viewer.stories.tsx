import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ImageViewer } from "@/components/ui/image-viewer"
import ImageViewerDemo from "@/components/examples/image-viewer-demo"

const meta: Meta<typeof ImageViewer> = {
  title: "Organisms/Image Viewer",
  component: ImageViewer,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof ImageViewer>

export const Default: Story = {
  render: () => <ImageViewerDemo />,
}
