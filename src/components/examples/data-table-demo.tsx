"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, type ColunaDados } from "@/components/ui/data-table"

type Fatura = { id: string; cliente: string; status: string; metodo: string; valor: number }

const faturas: Fatura[] = [
  { id: "F001", cliente: "Ana Souza", status: "Pago", metodo: "Cartão", valor: 250 },
  { id: "F002", cliente: "Bruno Lima", status: "Pendente", metodo: "Pix", valor: 150 },
  { id: "F003", cliente: "Célia Ramos", status: "Não pago", metodo: "Boleto", valor: 350 },
  { id: "F004", cliente: "Diego Alves", status: "Pago", metodo: "Pix", valor: 450 },
  { id: "F005", cliente: "Elisa Prado", status: "Pago", metodo: "Cartão", valor: 550 },
  { id: "F006", cliente: "Fábio Nunes", status: "Pendente", metodo: "Boleto", valor: 200 },
]

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

const colunas: ColunaDados<Fatura>[] = [
  { chave: "id", titulo: "Fatura", ordenavel: true },
  { chave: "cliente", titulo: "Cliente", ordenavel: true },
  {
    chave: "status",
    titulo: "Status",
    filtravel: true,
    celula: (f) => <Badge variant={f.status === "Pago" ? "default" : "secondary"}>{f.status}</Badge>,
  },
  { chave: "metodo", titulo: "Método", filtravel: true, oculta: true },
  { chave: "valor", titulo: "Valor", ordenavel: true, numerica: true, celula: (f) => moeda.format(f.valor) },
]

export default function DataTableDemo() {
  return (
    <DataTable
      aria-label="Faturas"
      dados={faturas}
      colunas={colunas}
      idDaLinha={(f) => f.id}
      selecionavel
      nomeArquivo="faturas.csv"
      acoesEmLote={(sel) => (
        <Button variant="outline" size="sm" onClick={() => alert(`${sel.length} marcadas como pagas`)}>
          Marcar como pago
        </Button>
      )}
    />
  )
}
