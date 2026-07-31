import { List, ListItem } from "@/components/ui/list"
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item"

export default function ListDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      {/* variant="none" (padrão): container agrupando Item — sem marcador,
          espaçamento consistente entre linhas */}
      <List>
        <ListItem>
          <Item variant="outline" size="sm">
            <ItemContent>
              <ItemTitle>Passo 1</ItemTitle>
              <ItemDescription>Confirme seus dados pessoais.</ItemDescription>
            </ItemContent>
          </Item>
        </ListItem>
        <ListItem>
          <Item variant="outline" size="sm">
            <ItemContent>
              <ItemTitle>Passo 2</ItemTitle>
              <ItemDescription>Revise a cobertura escolhida.</ItemDescription>
            </ItemContent>
          </Item>
        </ListItem>
        <ListItem>
          <Item variant="outline" size="sm">
            <ItemContent>
              <ItemTitle>Passo 3</ItemTitle>
              <ItemDescription>Confirme o pagamento.</ItemDescription>
            </ItemContent>
          </Item>
        </ListItem>
      </List>

      {/* variant="marker" com as="ul": marcador de bullet nativo, texto
          simples */}
      <List variant="marker">
        <ListItem>Documento de identidade com foto</ListItem>
        <ListItem>Comprovante de residência atualizado</ListItem>
        <ListItem>Comprovante de renda</ListItem>
      </List>

      {/* variant="marker" com as="ol": marcador numerado nativo */}
      <List as="ol" variant="marker">
        <ListItem>Preencha o formulário de solicitação.</ListItem>
        <ListItem>Envie os documentos exigidos.</ListItem>
        <ListItem>Aguarde a análise da seguradora.</ListItem>
      </List>
    </div>
  )
}
