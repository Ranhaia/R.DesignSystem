import { Icon } from "@/components/ui/icon"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <Icon name="error" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Sua sessão expirou. Faça login novamente.
      </AlertDescription>
    </Alert>
  )
}
