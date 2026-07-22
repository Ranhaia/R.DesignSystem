import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FileIcon } from "lucide-react"

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import AttachmentDemo from "@/components/examples/attachment-demo"

type AttachmentArgs = {
  state: "idle" | "uploading" | "processing" | "error" | "done"
  size: "xs" | "sm" | "default"
}

const meta: Meta<AttachmentArgs> = {
  title: "Molecules/Attachment",
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "uploading", "processing", "error", "done"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default"],
    },
  },
  args: {
    state: "idle",
    size: "default",
  },
  render: ({ state, size }) => (
    <Attachment state={state} size={size} className="max-w-56">
      <AttachmentMedia>
        <FileIcon className="size-4" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>arquivo.pdf</AttachmentTitle>
        <AttachmentDescription>
          {state === "error" ? "Falha no upload" : "2,4 MB"}
        </AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  ),
}

export default meta

type Story = StoryObj<AttachmentArgs>

export const Default: Story = {}

export const Uploading: Story = { args: { state: "uploading" } }

export const Processing: Story = { args: { state: "processing" } }

export const Error: Story = { args: { state: "error" } }

export const Done: Story = { args: { state: "done" } }

export const Examples: Story = {
  render: () => <AttachmentDemo />,
}
