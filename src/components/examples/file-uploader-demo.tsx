"use client"

import * as React from "react"

import { FileUploader } from "@/components/ui/file-uploader"

export default function FileUploaderDemo() {
  const [fileNames, setFileNames] = React.useState<string[]>([])

  return (
    <div className="flex w-full flex-col gap-3">
      <FileUploader
        multiple
        onFilesSelected={(files) =>
          setFileNames((prev) => [...prev, ...files.map((file) => file.name)])
        }
      />
      {fileNames.length > 0 && (
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          {fileNames.map((name, index) => (
            <li key={`${name}-${index}`}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
