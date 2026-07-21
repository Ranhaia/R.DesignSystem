import { CircleCheckIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export default function MarkerDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Marker>
        <MarkerIcon>
          <CircleCheckIcon />
        </MarkerIcon>
        <MarkerContent>Tokens de cor aplicados</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>ou</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerContent>Item com linha inferior</MarkerContent>
      </Marker>
    </div>
  )
}
