import { Files, Folder, FolderTrigger, FolderContent, File } from "@/components/ui/files"

export default function FilesDemo() {
  return (
    <div className="w-80 rounded-xl border border-border bg-card p-3 shadow-xs">
      <Files label="Explorer de código">
        <Folder value="src" defaultOpen>
          <FolderTrigger>src</FolderTrigger>
          <FolderContent>
            <Folder value="components" defaultOpen>
              <FolderTrigger>components</FolderTrigger>
              <FolderContent>
                <Folder value="ui" defaultOpen>
                  <FolderTrigger>ui</FolderTrigger>
                  <FolderContent>
                    <File value="button.tsx">button.tsx</File>
                    <File value="collapsible.tsx">collapsible.tsx</File>
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
  )
}
