"use client"

import * as React from "react"

import { NotificationCenter, type Notification } from "@/components/ui/notification-center"

const iniciais: Notification[] = [
  { id: "1", title: "Relatório mensal pronto", description: "Clique para baixar.", time: "há 5 min" },
  { id: "2", title: "Ana comentou na sua tarefa", description: "“Pode revisar até sexta?”", time: "há 1 h" },
  { id: "3", title: "Backup concluído", time: "ontem", read: true },
]

export default function NotificationCenterDemo() {
  const [itens, setItens] = React.useState(iniciais)
  return (
    <NotificationCenter
      notifications={itens}
      onSelect={(id) => setItens((xs) => xs.map((x) => (x.id === id ? { ...x, read: true } : x)))}
      onMarkAllRead={() => setItens((xs) => xs.map((x) => ({ ...x, read: true })))}
    />
  )
}
