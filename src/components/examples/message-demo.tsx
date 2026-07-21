import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message"

export default function MessageDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Message align="start">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Marina · 10:32</MessageHeader>
          <p className="rounded-xl bg-muted px-3 py-2 text-sm">
            Testei os 5 estilos no seu portal, ficaram bem diferentes entre si.
          </p>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <MessageHeader>Você · 10:33</MessageHeader>
          <p className="rounded-xl bg-primary px-3 py-2 text-sm text-primary-foreground">
            Esse é o objetivo — trocar o token, não o componente.
          </p>
        </MessageContent>
      </Message>
    </div>
  )
}
