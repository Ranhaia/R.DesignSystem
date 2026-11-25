import {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
} from "@/components/ui/description-list"

const dados = [
  ["Nome", "Ana Souza"],
  ["E-mail", "ana@exemplo.com"],
  ["Plano", "Profissional"],
  ["Cliente desde", "março de 2024"],
]

export default function DescriptionListInline() {
  return (
    <DescriptionList layout="inline" className="w-full max-w-md">
      {dados.map(([rotulo, valor]) => (
        <DescriptionItem key={rotulo}>
          <DescriptionTerm>{rotulo}</DescriptionTerm>
          <DescriptionDetails>{valor}</DescriptionDetails>
        </DescriptionItem>
      ))}
    </DescriptionList>
  )
}
