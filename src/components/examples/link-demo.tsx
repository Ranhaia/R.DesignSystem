"use client"

import { Link } from "@/components/ui/link"

export default function LinkDemo() {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <Link href="#">Link padrão</Link>
      <Link href="#" size="sm">
        Link pequeno
      </Link>
      <Link href="#" size="lg">
        Link grande
      </Link>
      <Link href="https://ui.shadcn.com" external>
        Link externo
      </Link>
    </div>
  )
}
