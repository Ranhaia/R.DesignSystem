import { Link } from "@/components/ui/link"

export default function LinkAcaoInline() {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <p>
        Nenhum contato de emergência cadastrado.{" "}
        <Link href="#" action="add">Adicionar contato</Link>
      </p>
      <p>
        3 faturas em aberto. <Link href="#" action="next">Ver faturas</Link>
      </p>
    </div>
  )
}
