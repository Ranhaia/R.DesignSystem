"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

interface DocLivePreviewProps {
  code?: string
  // false: o filho cuida da própria área de preview (Playground, com os controles ao lado).
  centralizar?: boolean
  children: React.ReactNode
}

export function DocLivePreview({ code, centralizar = true, children }: DocLivePreviewProps) {
  return (
    <div className="rounded-lg border bg-card">
      {centralizar ? (
        <div className="flex min-h-32 items-center justify-center p-6">
          <div className="w-full flex items-center justify-center">{children}</div>
        </div>
      ) : (
        <div className="p-6">{children}</div>
      )}
      {code && (
        <Collapsible className="border-t">
          <div className="flex justify-end p-2">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <Icon name="code" size={0.875} />
                Ver código
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <pre className="overflow-x-auto border-t bg-muted/40 p-4 font-mono text-xs">
              <code>{code}</code>
            </pre>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  )
}
