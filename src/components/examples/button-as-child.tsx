import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Entrar</Link>
    </Button>
  )
}
