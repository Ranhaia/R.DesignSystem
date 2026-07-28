import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

export default function ButtonRounded() {
  return (
    <div className="flex flex-col gap-8">
      <Button variant="outline" size="icon" className="rounded-full">
        <Icon name="arrow_upward" />
      </Button>
    </div>
  )
}
