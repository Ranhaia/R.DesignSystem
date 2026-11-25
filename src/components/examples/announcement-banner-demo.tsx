"use client"

import { AnnouncementBanner } from "@/components/ui/announcement-banner"
import { Link } from "@/components/ui/link"

export default function AnnouncementBannerDemo() {
  return (
    <div className="w-full">
      <AnnouncementBanner>
        <span>O sistema fica fora do ar no sábado, das 22h às 23h.</span>
        <Link href="#" size="sm">Saiba mais</Link>
      </AnnouncementBanner>
    </div>
  )
}
