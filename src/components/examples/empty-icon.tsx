import {
  IconBookmark,
  IconHeart,
  IconInbox,
  IconStar,
} from "@tabler/icons-react"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export default function EmptyIcon() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconInbox />
          </EmptyMedia>
          <EmptyTitle>Sem mensagens</EmptyTitle>
          <EmptyDescription>
            Sua caixa de entrada está vazia. Novas mensagens vão aparecer aqui.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconStar />
          </EmptyMedia>
          <EmptyTitle>Sem favoritos</EmptyTitle>
          <EmptyDescription>
            Itens que você marcar como favoritos vão aparecer aqui.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconHeart />
          </EmptyMedia>
          <EmptyTitle>Nenhuma curtida ainda</EmptyTitle>
          <EmptyDescription>
            Conteúdo que você curtir vai ficar salvo aqui para acesso fácil.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconBookmark />
          </EmptyMedia>
          <EmptyTitle>Sem itens salvos</EmptyTitle>
          <EmptyDescription>
            Salve conteúdo interessante marcando-o como favorito.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
