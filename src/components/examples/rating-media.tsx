import { Rating } from "@/components/ui/rating"

export default function RatingMedia() {
  return (
    <div className="flex items-center gap-2">
      <Rating readOnly value={4.5} size="sm" />
      <span className="text-sm text-muted-foreground">4,5 (128 avaliações)</span>
    </div>
  )
}
