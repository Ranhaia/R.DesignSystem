import { Title } from "@/components/ui/title"

export default function TitleDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Title as="h1">Título nível 1</Title>
      <Title as="h2">Título nível 2</Title>
      <Title as="h3">Título nível 3</Title>
      <Title as="h4">Título nível 4</Title>
      <Title as="h5">Título nível 5</Title>
      <Title as="h6">Título nível 6</Title>

      {/* Hierarquia semântica e visual divergindo de propósito: um <h3>
          (nível correto na árvore do documento, por exemplo dentro de uma
          seção que já está sob um h2) estilizado visualmente como H1,
          porque essa seção específica precisa de mais destaque na tela. */}
      <Title as="h3" size="h1">
        H3 semântico, estilo visual H1
      </Title>
    </div>
  )
}
