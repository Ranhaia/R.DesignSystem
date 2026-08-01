import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectFixedLabel() {
  return (
    <NativeSelect label="País" defaultValue="br" className="w-56">
      <NativeSelectOption value="br">Brasil</NativeSelectOption>
      <NativeSelectOption value="pt">Portugal</NativeSelectOption>
    </NativeSelect>
  )
}
