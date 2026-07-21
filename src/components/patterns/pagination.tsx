"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const allApolices = Array.from({ length: 23 }, (_, i) => ({
  numero: `AP-${1000 + i}`,
  status: i % 3 === 0 ? "Em análise" : "Ativa",
}))

const pageSize = 5

// Pattern: Pagination — o Molecule "pagination" já é acessível por
// construção (nav com aria-label="pagination", aria-current="page" no link
// ativo via `isActive`). O que este pattern acrescenta é a integração real
// com uma fonte de dados paginada (slice do array conforme a página atual).
export function PaginationPattern() {
  const [page, setPage] = React.useState(1)
  const totalPages = Math.ceil(allApolices.length / pageSize)
  const items = allApolices.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.numero}>
              <TableCell>{item.numero}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.max(1, p - 1))
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault()
                  setPage(p)
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.min(totalPages, p + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
