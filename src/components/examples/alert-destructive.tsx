import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Sua sessão expirou. Faça login novamente.
      </AlertDescription>
    </Alert>
  )
}
