import { DirectionProvider } from "@/components/ui/direction"
import { Button } from "@/components/ui/button"

export default function DirectionDemo() {
  return (
    <DirectionProvider dir="rtl">
      <div dir="rtl" className="flex items-center gap-2 rounded-lg border p-4">
        <Button variant="outline">ראשון</Button>
        <Button variant="outline">שני</Button>
        <Button>שלישי</Button>
      </div>
    </DirectionProvider>
  )
}
