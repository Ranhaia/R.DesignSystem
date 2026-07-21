import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

export default function ItemVariant() {
  return (
    <div className="flex flex-col gap-6">
      <Item>
        <ItemContent>
          <ItemTitle>Variante padrão</ItemTitle>
          <ItemDescription>
            Estilo padrão com fundo e bordas sutis.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Abrir
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Variante com contorno</ItemTitle>
          <ItemDescription>
            Estilo com contorno, bordas nítidas e fundo transparente.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Abrir
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Variante discreta</ItemTitle>
          <ItemDescription>
            Aparência discreta com cores suaves para conteúdo secundário.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Abrir
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
