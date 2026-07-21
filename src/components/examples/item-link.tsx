import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item asChild>
        <a href="#">
          <ItemContent>
            <ItemTitle>Visite nossa documentação</ItemTitle>
            <ItemDescription>
              Saiba como começar a usar nossos componentes.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
      <Item variant="outline" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <ItemContent>
            <ItemTitle>Recurso externo</ItemTitle>
            <ItemDescription>
              Abre em uma nova aba com atributos de segurança.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ExternalLinkIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
