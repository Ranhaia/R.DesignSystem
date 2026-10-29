import * as React from "react"

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Chip } from "@/components/ui/chip"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"
import { Item } from "@/components/ui/item"
import { List, ListItem } from "@/components/ui/list"
import { Link } from "@/components/ui/link"
import { Marker } from "@/components/ui/marker"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SplitButton } from "@/components/ui/split-button"
import { Switch } from "@/components/ui/switch"
import { Tag } from "@/components/ui/tag"
import { Text } from "@/components/ui/text"
import { Thumbnail } from "@/components/ui/thumbnail"
import { Title } from "@/components/ui/title"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Playground genérico: pega o padrão validado no ButtonPlayground (variante
// + tamanho + estados via Select/Switch, live preview ao lado) e aplica só
// aos componentes que TÊM variante e/ou tamanho reais (ver component-docs.ts)
// — nada de forçar um controle que o componente não suporta. Button continua
// com o ButtonPlayground dedicado (tem "loading", que é específico dele).

type PlaygroundState = {
  variant: string
  size: string
  disabled: boolean
  checked: boolean
}

type PlaygroundCtx = PlaygroundState & {
  setChecked: (value: boolean) => void
}

export interface GenericPlaygroundConfig {
  render: (ctx: PlaygroundCtx) => React.ReactNode
  variants?: string[]
  variantLabel?: string
  sizes?: string[]
  sizeLabel?: string
  disabled?: boolean
  checked?: { label: string }
}

export const genericPlaygroundRegistry: Record<string, GenericPlaygroundConfig> = {
  avatar: {
    sizes: ["sm", "default", "lg"],
    render: ({ size }) => (
      <Avatar size={size as never}>
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>
    ),
  },
  badge: {
    variants: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    render: ({ variant }) => <Badge variant={variant as never}>Badge</Badge>,
  },
  chip: {
    variants: ["default", "ai-generated"],
    disabled: true,
    checked: { label: "Removível" },
    render: ({ variant, disabled, checked }) => (
      <Chip
        variant={variant as never}
        removable={checked}
        disabled={disabled}
        onRemove={() => {}}
      >
        Chip de exemplo
      </Chip>
    ),
  },
  tag: {
    variants: ["default", "primary", "success", "warning", "danger", "ai-generated"],
    checked: { label: "Highlight" },
    render: ({ variant, checked }) => (
      <Tag variant={variant as never} highlight={checked}>
        Tag de exemplo
      </Tag>
    ),
  },
  text: {
    variants: ["regular", "medium", "bold"],
    variantLabel: "Peso",
    sizes: ["caption", "base", "highlight"],
    checked: { label: "Muted" },
    render: ({ variant, size, checked }) => (
      <Text weight={variant as never} size={size as never} muted={checked}>
        Texto de exemplo
      </Text>
    ),
  },
  thumbnail: {
    sizes: ["sm", "default", "lg"],
    render: ({ size }) => (
      <Thumbnail
        size={size as never}
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&dpr=2&q=80"
        alt="Foto de Drew Beamer"
      />
    ),
  },
  title: {
    sizes: ["h1", "h2", "h3", "h4", "h5", "h6"],
    sizeLabel: "Tamanho (visual)",
    render: ({ size }) => (
      <Title as="h2" size={size as never}>
        Título de exemplo
      </Title>
    ),
  },
  "icon-button": {
    variants: ["default", "secondary", "outline", "ghost", "destructive", "link", "ai-primary", "ai-secondary"],
    sizes: ["icon", "icon-xs", "icon-sm", "icon-lg"],
    disabled: true,
    render: ({ variant, size, disabled }) => (
      <IconButton
        variant={variant as never}
        size={size as never}
        disabled={disabled}
        icon={<Icon name="favorite" />}
        aria-label="Favoritar"
      />
    ),
  },
  list: {
    variants: ["none", "marker"],
    render: ({ variant }) => (
      <List variant={variant as never} className="w-48">
        <ListItem>Primeiro item</ListItem>
        <ListItem>Segundo item</ListItem>
        <ListItem>Terceiro item</ListItem>
      </List>
    ),
  },
  "split-button": {
    variants: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    sizes: ["sm", "default", "lg"],
    disabled: true,
    render: ({ variant, size, disabled }) => (
      <SplitButton
        variant={variant as never}
        size={size as never}
        disabled={disabled}
        label="Salvar"
      >
        <DropdownMenuItem onClick={() => {}}>
          <Icon name="draft" />
          Salvar como rascunho
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <Icon name="logout" />
          Salvar e sair
        </DropdownMenuItem>
      </SplitButton>
    ),
  },
  switch: {
    sizes: ["sm", "default"],
    disabled: true,
    checked: { label: "Marcado" },
    render: ({ size, disabled, checked, setChecked }) => (
      <Switch
        size={size as never}
        disabled={disabled}
        checked={checked}
        onCheckedChange={setChecked}
      />
    ),
  },
  toggle: {
    variants: ["default", "outline"],
    sizes: ["sm", "default", "lg"],
    disabled: true,
    checked: { label: "Pressionado" },
    render: ({ variant, size, disabled, checked, setChecked }) => (
      <Toggle
        variant={variant as never}
        size={size as never}
        disabled={disabled}
        pressed={checked}
        onPressedChange={setChecked}
      >
        Aa
      </Toggle>
    ),
  },
  "native-select": {
    sizes: ["sm", "default"],
    disabled: true,
    render: ({ size, disabled }) => (
      <NativeSelect size={size as never} disabled={disabled} className="w-auto">
        <NativeSelectOption>Opção 1</NativeSelectOption>
        <NativeSelectOption>Opção 2</NativeSelectOption>
      </NativeSelect>
    ),
  },
  select: {
    sizes: ["sm", "default"],
    disabled: true,
    render: ({ size, disabled }) => (
      <Select disabled={disabled}>
        <SelectTrigger size={size as never} className="w-auto">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Opção 1</SelectItem>
          <SelectItem value="b">Opção 2</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  item: {
    variants: ["default", "outline", "muted"],
    sizes: ["default", "sm"],
    render: ({ variant, size }) => (
      <Item variant={variant as never} size={size as never} className="text-sm">
        Item de exemplo
      </Item>
    ),
  },
  link: {
    sizes: ["xs", "sm", "default", "lg"],
    render: ({ size }) => (
      <Link href="#" size={size as never}>
        Link de exemplo
      </Link>
    ),
  },
  marker: {
    variants: ["default", "separator", "border"],
    render: ({ variant }) => (
      <Marker variant={variant as never} className="w-48">
        Marcador
      </Marker>
    ),
  },
  alert: {
    variants: ["default", "destructive"],
    render: ({ variant }) => (
      <Alert variant={variant as never} className="w-auto">
        <AlertTitle>Aviso de exemplo</AlertTitle>
      </Alert>
    ),
  },
  "segmented-control": {
    sizes: ["sm", "default", "lg"],
    disabled: true,
    checked: { label: 'Item "B" selecionado' },
    render: ({ size, disabled, checked, setChecked }) => (
      <SegmentedControl
        aria-label="Exemplo"
        size={size as never}
        disabled={disabled}
        value={checked ? "b" : "a"}
        onValueChange={(value) => setChecked(value === "b")}
      >
        <SegmentedControlItem value="a">A</SegmentedControlItem>
        <SegmentedControlItem value="b">B</SegmentedControlItem>
      </SegmentedControl>
    ),
  },
  "toggle-group": {
    variants: ["default", "outline"],
    sizes: ["sm", "default", "lg"],
    disabled: true,
    checked: { label: "Item marcado" },
    render: ({ variant, size, disabled, checked, setChecked }) => (
      <ToggleGroup
        type="single"
        variant={variant as never}
        size={size as never}
        disabled={disabled}
        value={checked ? "a" : undefined}
        onValueChange={(value) => setChecked(value === "a")}
      >
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>
    ),
  },
  attachment: {
    variants: ["idle", "uploading", "processing", "error", "done"],
    variantLabel: "Estado",
    sizes: ["xs", "sm", "default"],
    render: ({ variant, size }) => (
      <Attachment state={variant as never} size={size as never} className="max-w-56">
        <AttachmentMedia>
          <Icon name="draft" size={1} />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>arquivo.pdf</AttachmentTitle>
          <AttachmentDescription>
            {variant === "error" ? "Falha no upload" : "2,4 MB"}
          </AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    ),
  },
  bubble: {
    variants: [
      "default",
      "secondary",
      "muted",
      "tinted",
      "outline",
      "ghost",
      "destructive",
    ],
    render: ({ variant }) => (
      <Bubble variant={variant as never} className="max-w-none">
        <BubbleContent>Mensagem de exemplo</BubbleContent>
      </Bubble>
    ),
  },
}
