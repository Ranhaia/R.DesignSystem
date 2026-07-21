import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Pago",
    totalAmount: "$250.00",
    paymentMethod: "Cartão de crédito",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pendente",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Não pago",
    totalAmount: "$350.00",
    paymentMethod: "Transferência bancária",
  },
  {
    invoice: "INV004",
    paymentStatus: "Pago",
    totalAmount: "$450.00",
    paymentMethod: "Cartão de crédito",
  },
  {
    invoice: "INV005",
    paymentStatus: "Pago",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pendente",
    totalAmount: "$200.00",
    paymentMethod: "Transferência bancária",
  },
  {
    invoice: "INV007",
    paymentStatus: "Não pago",
    totalAmount: "$300.00",
    paymentMethod: "Cartão de crédito",
  },
]

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>Uma lista das suas faturas recentes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Fatura</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Forma de pagamento</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
