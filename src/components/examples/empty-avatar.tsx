import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function EmptyAvatar() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-12">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="grayscale"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>Usuário offline</EmptyTitle>
        <EmptyDescription>
          Este usuário está offline no momento. Você pode deixar uma mensagem
          para avisá-lo ou tentar novamente mais tarde.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Deixar mensagem</Button>
      </EmptyContent>
    </Empty>
  )
}
