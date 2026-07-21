import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Sucesso! Suas alterações foram salvas</AlertTitle>
        <AlertDescription>
          Este é um alerta com ícone, título e descrição.
        </AlertDescription>
      </Alert>
      <Alert>
        <PopcornIcon />
        <AlertTitle>
          Este alerta tem um título e um ícone. Sem descrição.
        </AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Não foi possível processar seu pagamento.</AlertTitle>
        <AlertDescription>
          <p>Verifique os dados de cobrança e tente novamente.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Confira os dados do cartão</li>
            <li>Verifique se há saldo suficiente</li>
            <li>Confirme o endereço de cobrança</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}
