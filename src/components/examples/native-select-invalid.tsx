import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

export default function NativeSelectInvalid() {
  return (
    <NativeSelect aria-invalid="true">
      <NativeSelectOption value="">Selecionar função</NativeSelectOption>
      <NativeSelectOption value="admin">Administrador</NativeSelectOption>
      <NativeSelectOption value="editor">Editor</NativeSelectOption>
      <NativeSelectOption value="viewer">Visualizador</NativeSelectOption>
      <NativeSelectOption value="guest">Convidado</NativeSelectOption>
    </NativeSelect>
  )
}
