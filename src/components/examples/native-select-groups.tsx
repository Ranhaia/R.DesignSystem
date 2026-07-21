import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectGroups() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Selecionar departamento</NativeSelectOption>
      <NativeSelectOptGroup label="Engenharia">
        <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
        <NativeSelectOption value="backend">Backend</NativeSelectOption>
        <NativeSelectOption value="devops">DevOps</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vendas">
        <NativeSelectOption value="sales-rep">Representante de vendas</NativeSelectOption>
        <NativeSelectOption value="account-manager">
          Gerente de contas
        </NativeSelectOption>
        <NativeSelectOption value="sales-director">
          Diretor de vendas
        </NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Operações">
        <NativeSelectOption value="support">
          Suporte ao cliente
        </NativeSelectOption>
        <NativeSelectOption value="product-manager">
          Gerente de produto
        </NativeSelectOption>
        <NativeSelectOption value="ops-manager">
          Gerente de operações
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
