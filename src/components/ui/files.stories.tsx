import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Files, Folder, FolderTrigger, FolderContent, File } from "@/components/ui/files"

const meta: Meta<typeof Files> = {
  title: "Molecules/Files",
  component: Files,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Files>

export const Default: Story = {
  render: () => (
    <div className="w-80 rounded-xl border border-border bg-card p-3 shadow-xs">
      <Files label="Explorer do projeto">
        <Folder value="src" defaultOpen>
          <FolderTrigger>src</FolderTrigger>
          <FolderContent>
            <Folder value="components" defaultOpen>
              <FolderTrigger>components</FolderTrigger>
              <FolderContent>
                <Folder value="ui">
                  <FolderTrigger>ui</FolderTrigger>
                  <FolderContent>
                    <File value="button.tsx">button.tsx</File>
                    <File value="files.tsx" active>files.tsx</File>
                    <File value="speed-dial.tsx">speed-dial.tsx</File>
                  </FolderContent>
                </Folder>
              </FolderContent>
            </Folder>
            <Folder value="lib">
              <FolderTrigger>lib</FolderTrigger>
              <FolderContent>
                <File value="utils.ts">utils.ts</File>
              </FolderContent>
            </Folder>
            <File value="globals.css">globals.css</File>
          </FolderContent>
        </Folder>
        <File value="package.json">package.json</File>
        <File value="README.md">README.md</File>
      </Files>
    </div>
  ),
}
