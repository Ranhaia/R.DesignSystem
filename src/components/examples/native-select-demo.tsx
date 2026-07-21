import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Selecionar status</NativeSelectOption>
      <NativeSelectOption value="todo">A fazer</NativeSelectOption>
      <NativeSelectOption value="in-progress">Em andamento</NativeSelectOption>
      <NativeSelectOption value="done">Concluído</NativeSelectOption>
      <NativeSelectOption value="cancelled">Cancelado</NativeSelectOption>
    </NativeSelect>
  )
}
