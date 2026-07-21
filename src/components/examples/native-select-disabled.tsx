import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectDisabled() {
  return (
    <NativeSelect disabled>
      <NativeSelectOption value="">Selecionar prioridade</NativeSelectOption>
      <NativeSelectOption value="low">Baixa</NativeSelectOption>
      <NativeSelectOption value="medium">Média</NativeSelectOption>
      <NativeSelectOption value="high">Alta</NativeSelectOption>
      <NativeSelectOption value="critical">Crítica</NativeSelectOption>
    </NativeSelect>
  )
}
