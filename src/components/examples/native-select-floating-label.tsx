import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectFloatingLabel() {
  return (
    <NativeSelect label="País" animatedLabel defaultValue="" className="w-56">
      <NativeSelectOption value="">Selecione</NativeSelectOption>
      <NativeSelectOption value="br">Brasil</NativeSelectOption>
      <NativeSelectOption value="pt">Portugal</NativeSelectOption>
    </NativeSelect>
  )
}
