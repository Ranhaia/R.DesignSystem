"use client"

import * as React from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

// Pattern: Success Feedback — confirmação PERSISTENTE na própria tela
// (Alert), diferente do Toast Strategy (notificação passageira). Usada
// quando o usuário precisa de uma referência visual permanente de que a
// ação deu certo (ex: formulário salvo), não só um aviso que desaparece.
export function SuccessFeedbackPattern() {
  const [saved, setSaved] = React.useState(false)

  return (
    <div className="space-y-3">
      {saved && (
        <Alert>
          <Icon name="check_circle" />
          <AlertTitle>Alterações salvas</AlertTitle>
          <AlertDescription>
            Os dados da apólice foram atualizados com sucesso.
          </AlertDescription>
        </Alert>
      )}
      <Button onClick={() => setSaved(true)} disabled={saved}>
        Salvar alterações
      </Button>
    </div>
  )
}
