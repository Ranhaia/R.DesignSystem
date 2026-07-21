// Registro-piloto de documentação estilo atomic design (Descrição, Quando
// utilizar, Anatomia, Variantes, Estados, Tamanhos, Boas práticas, Evite,
// Código, Propriedades). Só "button" está preenchido por enquanto — é o
// piloto para validar o template antes de replicar para os outros
// componentes. Slugs sem entrada aqui continuam com a página no formato
// antigo (Composição + Exemplos), sem quebrar nada.
//
// Texto narrativo (description, whenToUse, doGuidelines, dontGuidelines)
// fica como placeholder "[a preencher]" — combinado com o Rafael para não
// inventar conteúdo. Anatomia, Variantes, Estados, Tamanhos e Propriedades
// são derivados do código real do componente (src/components/ui/button.tsx).

export interface ComponentDocOption {
  name: string
  value: string
  description: string
}

export interface ComponentDocProp {
  name: string
  type: string
  default?: string
  description: string
}

export interface ComponentDoc {
  description: string
  whenToUse: string
  anatomy: { part: string; description: string }[]
  variants: ComponentDocOption[]
  states: { name: string; description: string }[]
  sizes: ComponentDocOption[]
  doGuidelines: string[]
  dontGuidelines: string[]
  code: string
  props: ComponentDocProp[]
}

export const componentDocs: Record<string, ComponentDoc> = {
  button: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      {
        part: "Elemento raiz",
        description:
          'Um <button> (ou o elemento filho, via asChild) com data-slot="button" e data-variant/data-size.',
      },
      {
        part: "Ícone (opcional)",
        description:
          "SVG antes e/ou depois do label. O tamanho é herdado automaticamente pelo seletor [&_svg].",
      },
      {
        part: "Label",
        description: "Texto do botão — pode ser omitido em botões só-ícone (size=\"icon\").",
      },
    ],
    variants: [
      { name: "Primary", value: "default", description: "Ação principal da tela. Usa --primary." },
      { name: "Secondary", value: "secondary", description: "Ação secundária, menor ênfase." },
      { name: "Outline", value: "outline", description: "Contorno com fundo neutro, para ações alternativas." },
      { name: "Ghost", value: "ghost", description: "Sem fundo nem borda até o hover." },
      { name: "Destructive", value: "destructive", description: "Ações irreversíveis ou de risco (excluir, remover)." },
      { name: "Link", value: "link", description: "Aparência de link de texto, sem fundo." },
    ],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Hover", description: "Cursor sobre o botão — muda fundo/opacidade conforme a variante." },
      { name: "Active", description: "Durante o clique/pressionamento." },
      { name: "Focus", description: "Navegação por teclado — anel de foco (focus-visible:ring)." },
      { name: "Disabled", description: 'prop "disabled" — opacidade reduzida, pointer-events desativado.' },
      { name: "Loading", description: 'Padrão de composição (ver exemplo "loading"): <Spinner /> + disabled.' },
    ],
    sizes: [
      { name: "xs", value: "xs", description: "h-6 — toolbars densas." },
      { name: "sm", value: "sm", description: "h-8." },
      { name: "md (default)", value: "default", description: "h-9 — tamanho padrão." },
      { name: "lg", value: "lg", description: "h-10." },
      { name: "icon", value: "icon", description: 'size-9, quadrado, sem label — use com aria-label.' },
      { name: "icon-xs", value: "icon-xs", description: "size-6, quadrado — use com aria-label." },
      { name: "icon-sm", value: "icon-sm", description: "size-8, quadrado — use com aria-label." },
      { name: "icon-lg", value: "icon-lg", description: "size-10, quadrado — use com aria-label." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Button } from "@/components/ui/button"

<Button variant="outline" size="sm">
  Button
</Button>`,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        default: '"default"',
        description: "Estilo visual do botão.",
      },
      {
        name: "size",
        type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
        default: '"default"',
        description: "Dimensão do botão.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description: "Renderiza as props no elemento filho (via Radix Slot) em vez de <button>.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Desativa interação e reduz opacidade.",
      },
      {
        name: "...props",
        type: 'React.ComponentProps<"button">',
        description: "Todos os atributos nativos de <button> (onClick, type, form, etc.).",
      },
    ],
  },

  avatar: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Root", description: 'AvatarPrimitive.Root — data-slot="avatar", data-size.' },
      { part: "Image", description: "Foto do usuário. Some automaticamente se falhar ao carregar." },
      { part: "Fallback", description: "Iniciais ou ícone exibido enquanto a imagem carrega ou se falhar." },
      { part: "Badge (opcional)", description: "Indicador pequeno no canto (ex: status online) — AvatarBadge." },
      { part: "Group (opcional)", description: "AvatarGroup empilha vários avatares com sobreposição; AvatarGroupCount mostra o excedente (+N)." },
    ],
    variants: [],
    states: [
      { name: "Fallback", description: "Exibido enquanto a imagem carrega ou se a URL falhar." },
      { name: "Imagem carregada", description: "AvatarImage substitui o Fallback quando o load termina." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "size-6." },
      { name: "default", value: "default", description: "size-8." },
      { name: "lg", value: "lg", description: "size-10." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.png" alt="Rafael" />
  <AvatarFallback>RA</AvatarFallback>
</Avatar>`,
    props: [
      { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Dimensão do avatar." },
      { name: "...props", type: "React.ComponentProps<typeof AvatarPrimitive.Root>", description: "Props nativas do Radix Avatar." },
    ],
  },

  badge: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'Um <span> (ou o filho, via asChild) com data-slot="badge" e data-variant.' },
    ],
    variants: [
      { name: "Default", value: "default", description: "Usa --primary." },
      { name: "Secondary", value: "secondary", description: "Menor ênfase." },
      { name: "Destructive", value: "destructive", description: "Estados de erro/risco." },
      { name: "Outline", value: "outline", description: "Contorno, fundo neutro." },
      { name: "Ghost", value: "ghost", description: "Sem fundo até o hover (só faz sentido com asChild em link/botão)." },
      { name: "Link", value: "link", description: "Aparência de link de texto." },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Badge } from "@/components/ui/badge"

<Badge variant="secondary">Badge</Badge>`,
    props: [
      { name: "variant", type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"', default: '"default"', description: "Estilo visual do badge." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho (ex: <a>) em vez de <span>." },
      { name: "...props", type: 'React.ComponentProps<"span">', description: "Atributos nativos de <span>." },
    ],
  },

  checkbox: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Root", description: 'CheckboxPrimitive.Root — data-slot="checkbox", data-state.' },
      { part: "Indicator", description: "Ícone de check, visível só quando marcado (data-state=checked)." },
    ],
    variants: [],
    states: [
      { name: "Unchecked", description: "Estado de repouso." },
      { name: "Checked", description: "data-state=checked — fundo e borda em --primary." },
      { name: "Indeterminate", description: 'checked="indeterminate" — usado em seleção parcial de grupo.' },
      { name: "Focus", description: "Navegação por teclado — focus-visible:ring." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Aceito os termos</Label>
</div>`,
    props: [
      { name: "checked", type: "boolean | \"indeterminate\"", description: "Estado controlado." },
      { name: "onCheckedChange", type: "(checked: boolean | \"indeterminate\") => void", description: "Callback de mudança." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa interação." },
      { name: "...props", type: "React.ComponentProps<typeof CheckboxPrimitive.Root>", description: "Demais props do Radix Checkbox." },
    ],
  },

  input: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'Um <input> nativo com data-slot="input". Ícone/addon acoplado é composição via InputGroup (Molecule), não parte do Atom.' },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Focus", description: "focus-visible:border-ring + ring." },
      { name: "Disabled", description: "opacidade reduzida, cursor not-allowed." },
      { name: "Aria-invalid", description: "Borda e ring em --destructive quando aria-invalid=true." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Input } from "@/components/ui/input"

<Input type="email" placeholder="voce@email.com" />`,
    props: [
      { name: "type", type: "string", default: '"text"', description: "Tipo nativo do input (email, password, number...)." },
      { name: "...props", type: 'React.ComponentProps<"input">', description: "Todos os atributos nativos de <input>." },
    ],
  },

  "input-otp": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "InputOTP", description: 'Root — envolve o input real (invisível) que captura o valor completo.' },
      { part: "InputOTPGroup", description: "Agrupa visualmente um bloco de slots." },
      { part: "InputOTPSlot", description: "Uma casa/dígito — requer prop index." },
      { part: "InputOTPSeparator", description: "Traço decorativo entre grupos de slots (ex: 000 - 000)." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Slot vazio, sem foco." },
      { name: "Ativo", description: "data-active=true — cursor falso animado, ring visível." },
      { name: "Disabled", description: "has-disabled:opacity-50 no container." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
</InputOTP>`,
    props: [
      { name: "maxLength", type: "number", description: "Quantidade de dígitos/slots." },
      { name: "value / onChange", type: "string / (value: string) => void", description: "Valor controlado do código completo." },
      { name: "index", type: "number", description: "(InputOTPSlot) posição do slot — obrigatório." },
    ],
  },

  kbd: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'Um <kbd> com data-slot="kbd".' },
      { part: "KbdGroup", description: "Agrupa duas ou mais teclas de um atalho (ex: Ctrl + K)." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
    props: [
      { name: "...props", type: 'React.ComponentProps<"kbd">', description: "Atributos nativos de <kbd>." },
    ],
  },

  label: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'LabelPrimitive.Root, renderiza <label> com data-slot="label".' },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Disabled", description: "Herdado via group-data-[disabled=true] ou peer-disabled quando associado a um controle desativado." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Label } from "@/components/ui/label"

<Label htmlFor="email">E-mail</Label>`,
    props: [
      { name: "htmlFor", type: "string", description: "Associa o label ao id do controle." },
      { name: "...props", type: "React.ComponentProps<typeof LabelPrimitive.Root>", description: "Demais props do Radix Label." },
    ],
  },

  progress: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Root", description: 'ProgressPrimitive.Root — trilho de fundo (bg-primary/20).' },
      { part: "Indicator", description: "Barra preenchida — translateX calculado a partir de value." },
    ],
    variants: [],
    states: [
      { name: "0%", description: "Indicator totalmente deslocado (invisível)." },
      { name: "Em progresso", description: "0 < value < 100." },
      { name: "Completo", description: "value = 100." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Progress } from "@/components/ui/progress"

<Progress value={66} />`,
    props: [
      { name: "value", type: "number", description: "Progresso de 0 a 100." },
      { name: "...props", type: "React.ComponentProps<typeof ProgressPrimitive.Root>", description: "Demais props do Radix Progress." },
    ],
  },

  "radio-group": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "RadioGroup", description: "Root — grid que agrupa os itens, controla qual valor está selecionado." },
      { part: "RadioGroupItem", description: "Cada opção — requer prop value." },
      { part: "Indicator", description: "Círculo preenchido (fill-primary), visível só no item selecionado." },
    ],
    variants: [],
    states: [
      { name: "Unchecked", description: "Estado de repouso do item." },
      { name: "Checked", description: "Indicator visível, borda em --primary." },
      { name: "Focus", description: "focus-visible:ring no item focado." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup defaultValue="mensal">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="mensal" id="mensal" />
    <Label htmlFor="mensal">Mensal</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="anual" id="anual" />
    <Label htmlFor="anual">Anual</Label>
  </div>
</RadioGroup>`,
    props: [
      { name: "value / defaultValue", type: "string", description: "Valor selecionado (controlado ou inicial)." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback de mudança de seleção." },
      { name: "value", type: "string", description: "(RadioGroupItem) valor da opção — obrigatório." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o grupo ou o item." },
    ],
  },

  separator: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'SeparatorPrimitive.Root — linha de 1px (bg-border), horizontal ou vertical.' },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" className="h-4" />`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção da linha." },
      { name: "decorative", type: "boolean", default: "true", description: "Marca o elemento como puramente visual pra leitores de tela (role=none)." },
    ],
  },

  skeleton: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'Um <div> com animate-pulse — o tamanho/forma vem 100% da className (h-4 w-32, rounded-full, etc.).' },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-4 w-32" />`,
    props: [
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Atributos nativos de <div> — a forma é controlada via className." },
    ],
  },

  slider: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Root", description: "SliderPrimitive.Root — calcula _values a partir de value/defaultValue." },
      { part: "Track", description: "Trilho de fundo (bg-muted)." },
      { part: "Range", description: "Trecho preenchido entre min e o(s) valor(es) (bg-primary)." },
      { part: "Thumb", description: "Um por valor — suporta múltiplos thumbs (range de dois valores)." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Hover/Drag", description: "hover:ring-4 no thumb durante interação." },
      { name: "Focus", description: "focus-visible:ring-4 — navegação por teclado (setas)." },
      { name: "Disabled", description: "data-[disabled]:opacity-50." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />`,
    props: [
      { name: "value / defaultValue", type: "number[]", description: "Um valor = thumb único; dois valores = range." },
      { name: "min / max / step", type: "number", default: "0 / 100 / —", description: "Limites e granularidade." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção do slider." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa interação." },
    ],
  },

  spinner: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'Ícone Loader2 girando (animate-spin), role="status" e aria-label="Loading" pra leitor de tela.' },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Spinner } from "@/components/ui/spinner"

<Spinner className="size-5" />`,
    props: [
      { name: "...props", type: 'React.ComponentProps<"svg">', description: "Tamanho e cor via className (size-4, text-primary, etc.)." },
    ],
  },

  switch: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Root", description: 'SwitchPrimitive.Root — trilho (data-state=checked altera a cor de fundo).' },
      { part: "Thumb", description: "Bolinha que deslinza — translateX conforme o estado." },
    ],
    variants: [],
    states: [
      { name: "Unchecked", description: "Trilho em --input." },
      { name: "Checked", description: "Trilho em --primary, thumb deslocado." },
      { name: "Focus", description: "focus-visible:ring." },
      { name: "Disabled", description: "opacidade reduzida." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "h-3.5 w-6." },
      { name: "default", value: "default", description: "h-[1.15rem] w-8." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Switch id="notificacoes" defaultChecked />
  <Label htmlFor="notificacoes">Notificações</Label>
</div>`,
    props: [
      { name: "checked / defaultChecked", type: "boolean", description: "Estado controlado ou inicial." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback de mudança." },
      { name: "size", type: '"sm" | "default"', default: '"default"', description: "Dimensão do switch." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa interação." },
    ],
  },

  textarea: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'Um <textarea> com field-sizing-content — cresce com o conteúdo até o min-h-16.' },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Focus", description: "focus-visible:border-ring + ring." },
      { name: "Disabled", description: "cursor not-allowed, opacidade reduzida." },
      { name: "Aria-invalid", description: "Borda e ring em --destructive." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Escreva uma mensagem..." />`,
    props: [
      { name: "...props", type: 'React.ComponentProps<"textarea">', description: "Todos os atributos nativos de <textarea>." },
    ],
  },

  toggle: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'TogglePrimitive.Root — data-state="on"/"off".' },
    ],
    variants: [
      { name: "Default", value: "default", description: "Fundo transparente até ativar." },
      { name: "Outline", value: "outline", description: "Contorno visível mesmo desativado." },
    ],
    states: [
      { name: "Off", description: "data-state=off — estado de repouso." },
      { name: "On", description: "data-state=on — bg-accent." },
      { name: "Focus", description: "focus-visible:ring." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "h-8 min-w-8." },
      { name: "default", value: "default", description: "h-9 min-w-9." },
      { name: "lg", value: "lg", description: "h-10 min-w-10." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Negrito">
  Negrito
</Toggle>`,
    props: [
      { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Estilo visual." },
      { name: "size", type: '"default" | "sm" | "lg"', default: '"default"', description: "Dimensão." },
      { name: "pressed / defaultPressed", type: "boolean", description: "Estado controlado ou inicial." },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Callback de mudança." },
    ],
  },

  tooltip: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "TooltipProvider", description: "Contexto global — já registrado no shell do app (delayDuration=0)." },
      { part: "Tooltip", description: "Root — controla aberto/fechado." },
      { part: "TooltipTrigger", description: "Elemento que dispara o tooltip no hover/foco." },
      { part: "TooltipContent", description: "Balão de conteúdo, com seta (Arrow) apontando pro trigger." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Hover ou foco no trigger — anima fade + zoom." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>Conteúdo do tooltip</TooltipContent>
</Tooltip>`,
    props: [
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "(TooltipContent) lado preferido de exibição." },
      { name: "sideOffset", type: "number", default: "0", description: "Distância do trigger." },
      { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alinhamento em relação ao trigger." },
    ],
  },

  "aspect-ratio": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Elemento raiz", description: 'AspectRatioPrimitive.Root — wrapper que reserva o espaço proporcional pro conteúdo filho (ex: uma imagem).' },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { AspectRatio } from "@/components/ui/aspect-ratio"

<AspectRatio ratio={16 / 9}>
  <img src="/foto.jpg" alt="" className="size-full rounded-md object-cover" />
</AspectRatio>`,
    props: [
      { name: "ratio", type: "number", default: "1", description: "Proporção largura/altura (ex: 16 / 9)." },
    ],
  },

  "native-select": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Wrapper", description: "div relativo que posiciona o ícone sobre o <select>." },
      { part: "Elemento raiz", description: 'Um <select> nativo do navegador — data-slot="native-select".' },
      { part: "Ícone", description: "Chevron decorativo (aria-hidden), não captura clique." },
      { part: "NativeSelectOption / OptGroup", description: "<option>/<optgroup> estilizados pra contraste em qualquer tema do SO." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Focus", description: "focus-visible:ring." },
      { name: "Disabled", description: "cursor not-allowed." },
      { name: "Aria-invalid", description: "Borda e ring em --destructive." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "h-8." },
      { name: "default", value: "default", description: "h-9." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

<NativeSelect defaultValue="br">
  <NativeSelectOption value="br">Brasil</NativeSelectOption>
  <NativeSelectOption value="pt">Portugal</NativeSelectOption>
</NativeSelect>`,
    props: [
      { name: "size", type: '"sm" | "default"', default: '"default"', description: "Dimensão do select." },
      { name: "...props", type: 'React.ComponentProps<"select">', description: "Todos os atributos nativos de <select>." },
    ],
  },

  select: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Select", description: "Root — controla valor selecionado e abertura." },
      { part: "SelectTrigger", description: "Botão que abre o menu — inclui ícone de chevron." },
      { part: "SelectValue", description: "Mostra o valor selecionado ou o placeholder." },
      { part: "SelectContent", description: "Menu flutuante (portal) com as opções." },
      { part: "SelectItem", description: "Cada opção — mostra ícone de check quando selecionada." },
      { part: "SelectGroup / SelectLabel / SelectSeparator", description: "Agrupam e rotulam opções relacionadas." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão do menu." },
      { name: "Open", description: "Menu visível, anima fade + zoom." },
      { name: "Item em foco", description: "focus:bg-accent no item navegado." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "h-8 (SelectTrigger)." },
      { name: "default", value: "default", description: "h-9 (SelectTrigger)." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select defaultValue="mensal">
  <SelectTrigger className="w-40">
    <SelectValue placeholder="Selecione" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="mensal">Mensal</SelectItem>
    <SelectItem value="anual">Anual</SelectItem>
  </SelectContent>
</Select>`,
    props: [
      { name: "value / defaultValue", type: "string", description: "(Select) valor selecionado." },
      { name: "onValueChange", type: "(value: string) => void", description: "(Select) callback de mudança." },
      { name: "size", type: '"sm" | "default"', default: '"default"', description: "(SelectTrigger) dimensão." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o select ou um item." },
    ],
  },

  popover: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Popover", description: "Root — controla abertura." },
      { part: "PopoverTrigger", description: "Elemento que abre o popover ao clicar." },
      { part: "PopoverContent", description: "Painel flutuante (portal), largura fixa w-72 por padrão." },
      { part: "PopoverAnchor (opcional)", description: "Ponto de ancoragem alternativo ao trigger." },
      { part: "PopoverHeader / Title / Description (opcional)", description: "Composição de conteúdo estruturado dentro do painel." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Anima fade + zoom conforme o lado de abertura." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </PopoverTrigger>
  <PopoverContent>Conteúdo do popover.</PopoverContent>
</Popover>`,
    props: [
      { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "(PopoverContent) alinhamento." },
      { name: "sideOffset", type: "number", default: "4", description: "(PopoverContent) distância do trigger." },
    ],
  },

  item: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Item", description: "Elemento raiz — linha de uma lista (data-variant, data-size)." },
      { part: "ItemMedia (opcional)", description: "Ícone ou imagem à esquerda." },
      { part: "ItemContent", description: "Envolve título e descrição." },
      { part: "ItemTitle / ItemDescription", description: "Texto principal e secundário do item." },
      { part: "ItemActions (opcional)", description: "Botões/controles à direita." },
      { part: "ItemHeader / ItemFooter (opcional)", description: "Linhas extras de cabeçalho/rodapé dentro do item." },
      { part: "ItemGroup / ItemSeparator", description: "Agrupam vários Items numa lista (role=list)." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Fundo transparente." },
      { name: "Outline", value: "outline", description: "Borda visível." },
      { name: "Muted", value: "muted", description: "Fundo levemente destacado (bg-muted/50)." },
    ],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Hover", description: "Quando renderizado como link (a) — hover:bg-accent/50." },
      { name: "Focus", description: "focus-visible:ring." },
    ],
    sizes: [
      { name: "default", value: "default", description: "gap-4 p-4." },
      { name: "sm", value: "sm", description: "gap-2.5 px-4 py-3." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { UserIcon } from "lucide-react"

<Item variant="outline">
  <ItemMedia variant="icon">
    <UserIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Rafael Anhaia</ItemTitle>
  </ItemContent>
</Item>`,
    props: [
      { name: "variant", type: '"default" | "outline" | "muted"', default: '"default"', description: "Estilo visual da linha." },
      { name: "size", type: '"default" | "sm"', default: '"default"', description: "Densidade (padding/gap)." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho (ex: <a>)." },
    ],
  },

  marker: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Marker", description: "Elemento raiz — linha de texto com ícone (data-variant)." },
      { part: "MarkerIcon", description: "Ícone à esquerda, aria-hidden (decorativo)." },
      { part: "MarkerContent", description: "Texto/conteúdo da marca." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Sem decoração extra." },
      { name: "Separator", value: "separator", description: "Linhas antes/depois do conteúdo (estilo divisor com texto)." },
      { name: "Border", value: "border", description: "Borda inferior — separa seções." },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { CheckIcon } from "lucide-react"

<Marker>
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
  <MarkerContent>Etapa concluída</MarkerContent>
</Marker>`,
    props: [
      { name: "variant", type: '"default" | "separator" | "border"', default: '"default"', description: "Estilo visual da marca." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho." },
    ],
  },

  alert: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Alert", description: 'Elemento raiz — <div role="alert"> em grid (ícone opcional na 1ª coluna).' },
      { part: "AlertTitle", description: "Linha de título, uma linha só (line-clamp-1)." },
      { part: "AlertDescription", description: "Corpo do texto, pode ter múltiplos parágrafos." },
    ],
    variants: [
      { name: "Default", value: "default", description: "bg-card, texto neutro." },
      { name: "Destructive", value: "destructive", description: "Texto em --destructive — erros e avisos críticos." },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

<Alert variant="destructive">
  <AlertCircleIcon />
  <AlertTitle>Erro ao salvar</AlertTitle>
  <AlertDescription>
    Verifique os campos e tente novamente.
  </AlertDescription>
</Alert>`,
    props: [
      { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Estilo visual do alerta." },
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Atributos nativos de <div>." },
    ],
  },

  breadcrumb: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Breadcrumb", description: 'Elemento raiz — <nav aria-label="breadcrumb">.' },
      { part: "BreadcrumbList", description: "<ol> que envolve os itens." },
      { part: "BreadcrumbItem", description: "<li> — um nível da trilha." },
      { part: "BreadcrumbLink", description: "Item navegável (<a> ou filho via asChild)." },
      { part: "BreadcrumbPage", description: "Item atual, não navegável — aria-current=\"page\"." },
      { part: "BreadcrumbSeparator", description: "Ícone entre itens (ChevronRight por padrão), aria-hidden." },
      { part: "BreadcrumbEllipsis", description: "Colapsa níveis intermediários numa trilha longa." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Início</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Componentes</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    props: [
      { name: "asChild", type: "boolean", default: "false", description: "(BreadcrumbLink) renderiza no elemento filho." },
    ],
  },

  "button-group": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "ButtonGroup", description: 'Elemento raiz — role="group", junta os botões visualmente (bordas coladas).' },
      { part: "ButtonGroupText", description: "Rótulo não clicável dentro do grupo (ex: prefixo)." },
      { part: "ButtonGroupSeparator", description: "Divisor entre sub-grupos de botões." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

<ButtonGroup>
  <Button variant="outline">Arquivar</Button>
  <Button variant="outline">Denunciar</Button>
</ButtonGroup>`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção do agrupamento." },
    ],
  },

  collapsible: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Collapsible", description: "Root — controla o estado aberto/fechado." },
      { part: "CollapsibleTrigger", description: "Elemento que alterna abrir/fechar." },
      { part: "CollapsibleContent", description: "Conteúdo escondido quando fechado." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "data-state=closed — conteúdo escondido." },
      { name: "Open", description: "data-state=open — conteúdo visível." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Ver mais</CollapsibleTrigger>
  <CollapsibleContent>
    Conteúdo escondido por padrão.
  </CollapsibleContent>
</Collapsible>`,
    props: [
      { name: "open / defaultOpen", type: "boolean", description: "Estado controlado ou inicial." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback de mudança." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o trigger." },
    ],
  },

  combobox: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Combobox", description: "Root (base-ui) — controla valor, itens filtrados e abertura." },
      { part: "ComboboxInput", description: "Campo de busca — já vem com InputGroup, trigger e clear embutidos." },
      { part: "ComboboxContent", description: "Painel flutuante (portal) com a lista." },
      { part: "ComboboxList / ComboboxItem", description: "Lista de opções e cada item, com indicador de check." },
      { part: "ComboboxGroup / ComboboxLabel", description: "Agrupam e rotulam opções relacionadas." },
      { part: "ComboboxEmpty", description: "Mensagem exibida quando a busca não encontra nada." },
      { part: "ComboboxChips / ComboboxChip", description: "Modo multi-seleção — cada valor escolhido vira um chip removível." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Painel de opções visível." },
      { name: "Item em destaque", description: "data-highlighted — navegação por teclado." },
      { name: "Vazio", description: "ComboboxEmpty visível quando a busca não retorna itens." },
      { name: "Disabled", description: "Campo e trigger desativados." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

<Combobox items={["Auto", "Residencial", "Vida"]}>
  <ComboboxInput placeholder="Buscar ramo..." />
  <ComboboxContent>
    <ComboboxList>
      {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
    props: [
      { name: "items", type: "T[]", description: "Lista de opções disponíveis." },
      { name: "value / onValueChange", type: "T | T[]", description: "Valor selecionado (único ou múltiplo)." },
      { name: "multiple", type: "boolean", default: "false", description: "Ativa seleção múltipla com chips." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o combobox." },
    ],
  },

  empty: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Empty", description: "Elemento raiz — borda tracejada, conteúdo centralizado." },
      { part: "EmptyHeader", description: "Envolve ícone, título e descrição." },
      { part: "EmptyMedia", description: 'Ícone — variantes "default" (sem fundo) e "icon" (fundo circular/quadrado).' },
      { part: "EmptyTitle / EmptyDescription", description: "Texto principal e secundário do estado vazio." },
      { part: "EmptyContent", description: "Ação disponível (ex: botão) abaixo do texto." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { InboxIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <InboxIcon />
    </EmptyMedia>
    <EmptyTitle>Nenhum resultado</EmptyTitle>
    <EmptyDescription>
      Ajuste os filtros e tente de novo.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline">Limpar filtros</Button>
  </EmptyContent>
</Empty>`,
    props: [
      { name: "variant", type: '"default" | "icon"', default: '"default"', description: "(EmptyMedia) estilo do ícone." },
    ],
  },

  field: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "FieldSet / FieldLegend", description: "Agrupam vários Fields relacionados, com título (legend)." },
      { part: "FieldGroup", description: "Espaçamento vertical entre Fields." },
      { part: "Field", description: 'Elemento raiz de um campo — role="group", orientação vertical/horizontal/responsive.' },
      { part: "FieldLabel", description: "Label do campo (usa o Atom Label internamente)." },
      { part: "FieldContent", description: "Envolve o controle e a descrição." },
      { part: "FieldDescription", description: "Texto de ajuda abaixo do controle." },
      { part: "FieldSeparator", description: "Divisor entre Fields, com texto central opcional (ex: \"ou\")." },
      { part: "FieldError", description: 'Mensagem de erro — role="alert", aceita lista de erros (react-hook-form).' },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Invalid", description: "data-invalid=true — texto em --destructive." },
      { name: "Disabled", description: "group-data-[disabled=true] — opacidade reduzida no label." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field>
  <FieldLabel htmlFor="nome">Nome</FieldLabel>
  <Input id="nome" />
  <FieldDescription>Como aparece no seu perfil.</FieldDescription>
</Field>`,
    props: [
      { name: "orientation", type: '"vertical" | "horizontal" | "responsive"', default: '"vertical"', description: "Direção do layout do campo." },
      { name: "errors", type: "Array<{ message?: string }>", description: "(FieldError) lista de erros — mescla mensagens duplicadas." },
    ],
  },

  "hover-card": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "HoverCard", description: "Root — controla abertura no hover/foco." },
      { part: "HoverCardTrigger", description: "Elemento que dispara o card ao passar o mouse." },
      { part: "HoverCardContent", description: "Painel flutuante (portal), w-64 por padrão." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Hover ou foco no trigger — anima fade + zoom." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger>@rafael</HoverCardTrigger>
  <HoverCardContent>Product Designer Sênior.</HoverCardContent>
</HoverCard>`,
    props: [
      { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "(HoverCardContent) alinhamento." },
      { name: "sideOffset", type: "number", default: "4", description: "(HoverCardContent) distância do trigger." },
    ],
  },

  "input-group": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "InputGroup", description: "Elemento raiz — borda única compartilhada entre input e addons." },
      { part: "InputGroupAddon", description: "Ícone, texto ou botão fixado numa borda (align: inline-start/inline-end/block-start/block-end)." },
      { part: "InputGroupButton", description: "Botão compacto dentro do grupo (ex: limpar, enviar)." },
      { part: "InputGroupText", description: "Texto estático dentro do grupo." },
      { part: "InputGroupInput / InputGroupTextarea", description: "O controle real — Input ou Textarea sem borda própria." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Focus", description: "Borda do grupo inteiro reage ao foco do controle interno." },
      { name: "Aria-invalid", description: "Borda e ring em --destructive." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"

<InputGroup>
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="Buscar..." />
</InputGroup>`,
    props: [
      { name: "align", type: '"inline-start" | "inline-end" | "block-start" | "block-end"', default: '"inline-start"', description: "(InputGroupAddon) posição do addon." },
      { name: "size", type: '"xs" | "sm" | "icon-xs" | "icon-sm"', default: '"xs"', description: "(InputGroupButton) dimensão." },
    ],
  },

  pagination: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Pagination", description: '<nav aria-label="pagination"> — elemento raiz.' },
      { part: "PaginationContent", description: "<ul> que envolve os itens." },
      { part: "PaginationItem", description: "<li> — um item da paginação." },
      { part: "PaginationLink", description: "Link de página — reaproveita buttonVariants do Button." },
      { part: "PaginationPrevious / PaginationNext", description: "Links de navegação com ícone + label." },
      { part: "PaginationEllipsis", description: "Indica páginas ocultas (\"...\")." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Link normal — variant ghost." },
      { name: "Active", description: 'isActive=true — variant outline, aria-current="page".' },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    props: [
      { name: "isActive", type: "boolean", default: "false", description: "(PaginationLink) marca a página atual." },
      { name: "size", type: 'Button["size"]', default: '"icon"', description: "(PaginationLink) dimensão herdada do Button." },
    ],
  },

  "toggle-group": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "ToggleGroup", description: "Root — define variant/size/spacing compartilhados via contexto." },
      { part: "ToggleGroupItem", description: "Cada opção — herda variant/size do grupo se não especificar o próprio." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Fundo transparente até ativar." },
      { name: "Outline", value: "outline", description: "Contorno visível no grupo inteiro." },
    ],
    states: [
      { name: "Off", description: "Item não selecionado." },
      { name: "On", description: "data-state=on — bg-accent." },
      { name: "Focus", description: "focus-visible:ring, com z-index elevado pra não cortar o anel." },
      { name: "Disabled", description: "opacidade reduzida." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "h-8 min-w-8." },
      { name: "default", value: "default", description: "h-9 min-w-9." },
      { name: "lg", value: "lg", description: "h-10 min-w-10." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">Esquerda</ToggleGroupItem>
  <ToggleGroupItem value="center">Centro</ToggleGroupItem>
  <ToggleGroupItem value="right">Direita</ToggleGroupItem>
</ToggleGroup>`,
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Seleção única ou múltipla — obrigatório (do Radix)." },
      { name: "value / onValueChange", type: "string | string[]", description: "Valor(es) selecionado(s)." },
      { name: "variant / size", type: '"default" | "outline" / "default" | "sm" | "lg"', description: "Aplicados a todos os itens via contexto." },
      { name: "spacing", type: "number", default: "0", description: "Espaço entre itens — 0 mantém bordas coladas." },
    ],
  },

  "scroll-area": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "ScrollArea", description: "Root — define a altura/largura visível (via className)." },
      { part: "Viewport (interno)", description: "Área que realmente rola — renderizada automaticamente ao redor dos children." },
      { part: "ScrollBar", description: "Barra de rolagem customizada (thumb arredondado), vertical ou horizontal." },
      { part: "Corner (interno)", description: "Canto exibido quando as duas barras (v e h) aparecem juntas." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-48 w-64 rounded-md border p-4">
  Conteúdo longo que rola dentro de uma altura fixa.
</ScrollArea>`,
    props: [
      { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "(ScrollBar) direção da barra customizada." },
    ],
  },

  attachment: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Attachment", description: "Elemento raiz — data-state, data-size, data-orientation." },
      { part: "AttachmentGroup", description: "Agrupa vários attachments (ex: lista de arquivos anexados)." },
      { part: "AttachmentMedia", description: "Ícone ou thumbnail representando o tipo de arquivo." },
      { part: "AttachmentContent", description: "Envolve título e descrição." },
      { part: "AttachmentTitle / AttachmentDescription", description: "Nome do arquivo e metadado (tamanho, erro, etc.)." },
      { part: "AttachmentActions / AttachmentAction", description: "Botões de ação (ex: remover)." },
    ],
    variants: [],
    states: [
      { name: "idle", description: "Borda tracejada — aguardando arquivo." },
      { name: "uploading / processing", description: "Em andamento." },
      { name: "error", description: "Borda em --destructive." },
      { name: "done", description: "Estado padrão — arquivo pronto." },
    ],
    sizes: [
      { name: "xs", value: "xs", description: "Mais compacto, rounded-lg." },
      { name: "sm", value: "sm", description: "Intermediário." },
      { name: "default", value: "default", description: "Tamanho padrão." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { FileTextIcon, XIcon } from "lucide-react"

<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>contrato.pdf</AttachmentTitle>
    <AttachmentDescription>2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remover">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`,
    props: [
      { name: "state", type: '"idle" | "uploading" | "processing" | "error" | "done"', default: '"done"', description: "Estado do upload/anexo." },
      { name: "size", type: '"default" | "sm" | "xs"', default: '"default"', description: "Dimensão do componente." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção do layout." },
    ],
  },

  accordion: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Accordion", description: 'Root — type="single" (um item aberto por vez) ou "multiple".' },
      { part: "AccordionItem", description: "Cada seção — requer value único, borda inferior separando itens." },
      { part: "AccordionTrigger", description: "Cabeçalho clicável — inclui o chevron que gira 180° ao abrir." },
      { part: "AccordionContent", description: "Conteúdo animado (altura) — escondido quando fechado." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "data-state=closed." },
      { name: "Open", description: "data-state=open — chevron rotacionado." },
      { name: "Focus", description: "focus-visible:ring no trigger." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Pergunta 1</AccordionTrigger>
    <AccordionContent>Resposta 1.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Um item aberto por vez ou vários — obrigatório." },
      { name: "collapsible", type: "boolean", default: "false", description: 'Com type="single", permite fechar o item aberto.' },
      { name: "value / defaultValue", type: "string | string[]", description: "Item(s) aberto(s) — controlado ou inicial." },
    ],
  },

  "alert-dialog": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "AlertDialog", description: "Root — controla abertura. Diferente do Dialog, exige uma ação explícita (não fecha ao clicar fora)." },
      { part: "AlertDialogTrigger", description: "Elemento que abre o diálogo." },
      { part: "AlertDialogContent", description: 'Painel modal (portal + overlay) — data-size "default" ou "sm".' },
      { part: "AlertDialogMedia (opcional)", description: "Ícone de destaque acima do título." },
      { part: "AlertDialogHeader / Title / Description", description: "Título e descrição da confirmação." },
      { part: "AlertDialogFooter", description: "Envolve os botões de ação." },
      { part: "AlertDialogAction / AlertDialogCancel", description: "Botões de confirmar/cancelar — já são um Button por baixo." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Overlay + conteúdo visíveis, anima fade + zoom." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Excluir conta</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
      <AlertDialogDescription>
        Essa ação não pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction>Continuar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    props: [
      { name: "size", type: '"default" | "sm"', default: '"default"', description: "(AlertDialogContent) largura máxima do painel." },
      { name: "variant / size", type: "Button[\"variant\"] / Button[\"size\"]", description: "(Action/Cancel) herdados do Button." },
    ],
  },

  calendar: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Calendar", description: "Wrapper do react-day-picker — reestiliza navegação, dropdowns e dias com os tokens do projeto." },
      { part: "CalendarDayButton", description: "Cada dia — um Button ghost, com data-selected-single/data-range-* pros estados de seleção." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Dia normal do mês." },
      { name: "Hoje", description: "bg-accent — destaque do dia atual." },
      { name: "Selecionado", description: "bg-primary — único, início ou fim de intervalo." },
      { name: "Fora do mês", description: "text-muted-foreground — dias do mês anterior/seguinte." },
      { name: "Disabled", description: "opacidade reduzida, sem seleção." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Calendar } from "@/components/ui/calendar"

<Calendar mode="single" selected={date} onSelect={setDate} />`,
    props: [
      { name: "mode", type: '"single" | "multiple" | "range"', description: "Tipo de seleção (do react-day-picker)." },
      { name: "selected / onSelect", type: "Date | Date[] | DateRange", description: "Valor selecionado — controlado." },
      { name: "captionLayout", type: '"label" | "dropdown"', default: '"label"', description: "Navegação por texto ou dropdowns de mês/ano." },
      { name: "showOutsideDays", type: "boolean", default: "true", description: "Mostra dias do mês anterior/seguinte." },
    ],
  },

  card: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Card", description: "Elemento raiz — borda, fundo bg-card, sombra leve." },
      { part: "CardHeader", description: "Grid que envolve título, descrição e ação (CardAction)." },
      { part: "CardTitle / CardDescription", description: "Título e subtítulo do card." },
      { part: "CardAction (opcional)", description: "Elemento no canto superior direito do header (ex: botão de menu)." },
      { part: "CardContent", description: "Corpo principal do card." },
      { part: "CardFooter", description: "Rodapé — ações ou metadados." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição curta.</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo do card.</CardContent>
</Card>`,
    props: [
      { name: "...props", type: 'React.ComponentProps<"div">', description: "Atributos nativos de <div> em todas as peças." },
    ],
  },

  carousel: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Carousel", description: "Root — inicializa o Embla Carousel e expõe o contexto (api, scrollPrev/Next)." },
      { part: "CarouselContent", description: "Viewport + trilho flex dos slides." },
      { part: "CarouselItem", description: "Cada slide — basis-full por padrão." },
      { part: "CarouselPrevious / CarouselNext", description: "Setas de navegação — são um Button por baixo, desativadas nos extremos." },
    ],
    variants: [],
    states: [
      { name: "Pode avançar/voltar", description: "canScrollNext/canScrollPrev — controla se as setas ficam ativas." },
      { name: "Nos extremos", description: "Seta correspondente desativada (disabled)." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção do carrossel." },
      { name: "opts", type: "EmblaOptionsType", description: "Opções nativas do Embla Carousel." },
      { name: "setApi", type: "(api: CarouselApi) => void", description: "Expõe a API do Embla pro componente pai." },
    ],
  },

  chart: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "ChartContainer", description: "Envolve o gráfico do recharts (ResponsiveContainer) e injeta as cores do config como CSS vars." },
      { part: "ChartStyle (interno)", description: "Gera um <style> com --color-{chave} por série, derivado de config, já com variação light/dark." },
      { part: "ChartTooltip / ChartTooltipContent", description: "Tooltip customizado ao passar o mouse nos pontos/barras." },
      { part: "ChartLegend / ChartLegendContent", description: "Legenda customizada das séries." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Bar, BarChart } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  valor: { label: "Contribuição", color: "#2563eb" },
} satisfies ChartConfig

<ChartContainer config={chartConfig} className="h-64 w-full">
  <BarChart data={data}>
    <Bar dataKey="valor" fill="var(--color-valor)" radius={4} />
  </BarChart>
</ChartContainer>`,
    props: [
      { name: "config", type: "ChartConfig", description: "Mapa série → { label, color } — vira variável CSS --color-{série}." },
    ],
  },

  command: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Command", description: "Root (cmdk) — lista filtrável por texto." },
      { part: "CommandDialog (opcional)", description: "Command dentro de um Dialog — paleta de comandos (⌘K)." },
      { part: "CommandInput", description: "Campo de busca, com ícone de lupa." },
      { part: "CommandList", description: "Lista rolável de resultados." },
      { part: "CommandEmpty", description: "Mensagem exibida quando a busca não encontra nada." },
      { part: "CommandGroup / CommandItem", description: "Agrupa e lista os comandos/opções." },
      { part: "CommandSeparator / CommandShortcut", description: "Divisor entre grupos e atalho de teclado exibido à direita do item." },
    ],
    variants: [],
    states: [
      { name: "Item selecionado", description: "data-selected=true — navegação por teclado." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
      { name: "Vazio", description: "CommandEmpty visível quando a busca não retorna itens." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Buscar comando..." />
  <CommandList>
    <CommandEmpty>Nada encontrado.</CommandEmpty>
    <CommandGroup heading="Sugestões">
      <CommandItem>Novo arquivo</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    props: [
      { name: "title / description", type: "string", description: "(CommandDialog) título/descrição acessíveis (sr-only)." },
      { name: "showCloseButton", type: "boolean", default: "true", description: "(CommandDialog) mostra botão de fechar no Dialog." },
    ],
  },

  "context-menu": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "ContextMenu", description: "Root — controla abertura." },
      { part: "ContextMenuTrigger", description: "Área que abre o menu no clique com o botão direito." },
      { part: "ContextMenuContent", description: "Painel flutuante (portal) posicionado no ponto do clique." },
      { part: "ContextMenuItem", description: 'Item de ação — variantes "default" e "destructive".' },
      { part: "ContextMenuCheckboxItem / RadioGroup / RadioItem", description: "Itens com estado marcável (checkbox/radio)." },
      { part: "ContextMenuLabel / Separator / Shortcut", description: "Rótulo de grupo, divisor e atalho de teclado." },
      { part: "ContextMenuSub / SubTrigger / SubContent", description: "Submenu aninhado." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Menu visível na posição do clique." },
      { name: "Item em foco", description: "focus:bg-accent." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-md border border-dashed text-sm">
    Clique com o botão direito
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copiar</ContextMenuItem>
    <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    props: [
      { name: "inset", type: "boolean", default: "false", description: "(Item/Label/SubTrigger) recuo extra à esquerda." },
      { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "(ContextMenuItem) estilo do item." },
    ],
  },

  dialog: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Dialog", description: "Root — controla abertura." },
      { part: "DialogTrigger", description: "Elemento que abre o modal." },
      { part: "DialogContent", description: "Painel modal (portal + overlay) — já inclui botão de fechar (X)." },
      { part: "DialogHeader / Title / Description", description: "Título e descrição do modal." },
      { part: "DialogFooter", description: "Ações — pode incluir botão de fechar automático (showCloseButton)." },
      { part: "DialogClose", description: "Fecha o modal ao ser acionado — some com asChild em qualquer elemento." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Overlay + conteúdo visíveis, anima fade + zoom." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Editar perfil</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>
        Altere suas informações e salve.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
    props: [
      { name: "showCloseButton", type: "boolean", default: "true", description: "(DialogContent) mostra o X no canto superior direito." },
    ],
  },

  "dropdown-menu": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "DropdownMenu", description: "Root — controla abertura." },
      { part: "DropdownMenuTrigger", description: "Elemento que abre o menu ao clicar." },
      { part: "DropdownMenuContent", description: "Painel flutuante (portal), ancorado no trigger." },
      { part: "DropdownMenuItem", description: 'Item de ação — variantes "default" e "destructive".' },
      { part: "DropdownMenuCheckboxItem / RadioGroup / RadioItem", description: "Itens marcáveis." },
      { part: "DropdownMenuLabel / Separator / Shortcut", description: "Rótulo, divisor e atalho de teclado." },
      { part: "DropdownMenuSub / SubTrigger / SubContent", description: "Submenu aninhado." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Menu visível, ancorado no trigger." },
      { name: "Item em foco", description: "focus:bg-accent." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Abrir menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Perfil</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Sair</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    props: [
      { name: "inset", type: "boolean", default: "false", description: "(Item/Label/SubTrigger) recuo extra à esquerda." },
      { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "(DropdownMenuItem) estilo do item." },
      { name: "sideOffset", type: "number", default: "4", description: "(DropdownMenuContent) distância do trigger." },
    ],
  },

  drawer: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Drawer", description: "Root (vaul) — controla abertura." },
      { part: "DrawerTrigger", description: "Elemento que abre o drawer." },
      { part: "DrawerContent", description: "Painel que deslinza de um lado — inclui alça visual no topo (mobile, direção bottom)." },
      { part: "DrawerHeader / Title / Description", description: "Título e descrição." },
      { part: "DrawerFooter", description: "Ações no rodapé." },
      { part: "DrawerClose", description: "Fecha o drawer ao ser acionado." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Desliza a partir da direção configurada." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filtros</DrawerTitle>
      <DrawerDescription>Ajuste os filtros da busca.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
    props: [
      { name: "direction", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Lado de onde o drawer desliza (do vaul)." },
    ],
  },

  form: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Form", description: "= FormProvider do react-hook-form — dá contexto do formulário pra tudo dentro." },
      { part: "FormField", description: "Controller — associa um campo do form pelo name, expõe {field} pro render prop." },
      { part: "FormItem", description: "Contexto de id — gera ids únicos ligando label/control/description/message." },
      { part: "FormLabel", description: "Usa o Atom Label — fica vermelho automaticamente se o campo tiver erro." },
      { part: "FormControl", description: "Slot que injeta aria-describedby e aria-invalid no controle real (Input, Select...)." },
      { part: "FormDescription", description: "Texto de ajuda, sempre visível." },
      { part: "FormMessage", description: "Mostra a mensagem de erro da validação — não renderiza nada se não houver erro." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Campo sem erro." },
      { name: "Error", description: "Validação falhou — label e mensagem em --destructive, aria-invalid no controle." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

<Form {...form}>
  <FormField
    control={form.control}
    name="nome"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Nome</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormDescription>Como aparece no seu perfil.</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>`,
    props: [
      { name: "name", type: "string", description: "(FormField) caminho do campo no schema — obrigatório." },
      { name: "control", type: "Control", description: "(FormField) vem de useForm() do react-hook-form." },
      { name: "errors", type: "Array<{ message?: string }>", description: "(FormMessage) opcional — normalmente vem do fieldState automaticamente." },
    ],
  },

  menubar: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Menubar", description: "Root — barra horizontal, borda e fundo próprios (estilo desktop app)." },
      { part: "MenubarMenu", description: "Cada menu da barra (ex: Arquivo, Editar)." },
      { part: "MenubarTrigger", description: "Rótulo clicável de cada menu." },
      { part: "MenubarContent", description: "Painel flutuante (portal) com os itens do menu." },
      { part: "MenubarItem", description: 'Item de ação — variantes "default" e "destructive".' },
      { part: "MenubarCheckboxItem / RadioGroup / RadioItem", description: "Itens marcáveis." },
      { part: "MenubarLabel / Separator / Shortcut", description: "Rótulo, divisor e atalho de teclado." },
      { part: "MenubarSub / SubTrigger / SubContent", description: "Submenu aninhado." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão de cada menu." },
      { name: "Open", description: "data-state=open no trigger — bg-accent." },
      { name: "Item em foco", description: "focus:bg-accent." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Novo</MenubarItem>
      <MenubarItem>Abrir</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    props: [
      { name: "inset", type: "boolean", default: "false", description: "(Item/Label/SubTrigger) recuo extra à esquerda." },
      { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "(MenubarItem) estilo do item." },
    ],
  },

  message: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "MessageGroup", description: "Agrupa várias mensagens em sequência (ex: histórico de chat)." },
      { part: "Message", description: 'Elemento raiz de uma mensagem — align "start" (recebida) ou "end" (enviada), inverte a direção do flex.' },
      { part: "MessageAvatar", description: "Avatar do autor — alinhado à base da mensagem." },
      { part: "MessageContent", description: "Envolve o corpo da mensagem e o header/footer." },
      { part: "MessageHeader / MessageFooter", description: "Metadado (nome, hora) acima ou abaixo do conteúdo." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

<Message align="start">
  <MessageAvatar>
    <Avatar>
      <AvatarFallback>MP</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Marina · 10:32</MessageHeader>
    <p className="rounded-xl bg-muted px-3 py-2 text-sm">Oi!</p>
  </MessageContent>
</Message>`,
    props: [
      { name: "align", type: '"start" | "end"', default: '"start"', description: "Lado da mensagem — recebida ou enviada." },
    ],
  },

  bubble: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "BubbleGroup", description: "Agrupa várias bolhas em sequência." },
      { part: "Bubble", description: 'Elemento raiz — variant de cor + align "start"/"end".' },
      { part: "BubbleContent", description: "O balão em si — texto ou ação (button/a), com foco visível." },
      { part: "BubbleReactions (opcional)", description: "Reações flutuantes (ex: emojis) ancoradas num canto da bolha." },
    ],
    variants: [
      { name: "Default", value: "default", description: "bg-primary — mensagem enviada." },
      { name: "Secondary", value: "secondary", description: "bg-secondary." },
      { name: "Muted", value: "muted", description: "bg-muted — mensagem recebida, neutra." },
      { name: "Tinted", value: "tinted", description: "Tom suave derivado de --primary." },
      { name: "Outline", value: "outline", description: "Contorno, fundo neutro." },
      { name: "Ghost", value: "ghost", description: "Sem fundo nem borda." },
      { name: "Destructive", value: "destructive", description: "Tom de erro/alerta." },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

<BubbleGroup>
  <Bubble align="start" variant="muted">
    <BubbleContent>Oi! Como foi o teste?</BubbleContent>
  </Bubble>
  <Bubble align="end" variant="default">
    <BubbleContent>Foi bem, já te mando o print.</BubbleContent>
  </Bubble>
</BubbleGroup>`,
    props: [
      { name: "variant", type: '"default" | "secondary" | "muted" | "tinted" | "outline" | "ghost" | "destructive"', default: '"default"', description: "Cor/estilo da bolha." },
      { name: "align", type: '"start" | "end"', default: '"start"', description: "Lado da bolha — recebida ou enviada." },
    ],
  },

  "navigation-menu": {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "NavigationMenu", description: "Root — pode compartilhar um viewport único entre os itens (viewport=true, padrão) ou cada um ter o seu." },
      { part: "NavigationMenuList", description: "Lista horizontal dos itens de topo." },
      { part: "NavigationMenuItem", description: "Cada item — pode ter um NavigationMenuTrigger + Content (submenu) ou só um Link." },
      { part: "NavigationMenuTrigger", description: "Abre o painel do item — chevron gira ao abrir." },
      { part: "NavigationMenuContent", description: "Painel do submenu." },
      { part: "NavigationMenuLink", description: "Link navegável dentro do painel." },
      { part: "NavigationMenuIndicator", description: "Seta apontando pro item ativo, abaixo da lista." },
      { part: "NavigationMenuViewport", description: "Área compartilhada onde os painéis são renderizados/animados." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão de cada item." },
      { name: "Open", description: "data-state=open — chevron rotacionado, painel visível." },
      { name: "Ativo", description: "data-active=true no Link — página atual." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/produtos/a">Produto A</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    props: [
      { name: "viewport", type: "boolean", default: "true", description: "Usa um viewport compartilhado entre os itens." },
    ],
  },

  resizable: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "ResizablePanelGroup", description: "Root — define a direção (horizontal/vertical) do grupo." },
      { part: "ResizablePanel", description: "Cada painel — aceita defaultSize/minSize/maxSize (percentuais)." },
      { part: "ResizableHandle", description: "Divisor arrastável entre painéis — withHandle mostra uma alça visual (grip)." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal" className="h-48 rounded-md border">
  <ResizablePanel defaultSize={50}>Painel A</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>Painel B</ResizablePanel>
</ResizablePanelGroup>`,
    props: [
      { name: "direction", type: '"horizontal" | "vertical"', description: "(ResizablePanelGroup) direção da divisão — obrigatório." },
      { name: "defaultSize / minSize / maxSize", type: "number", description: "(ResizablePanel) tamanho em percentual do grupo." },
      { name: "withHandle", type: "boolean", default: "false", description: "(ResizableHandle) mostra a alça visual de arraste." },
    ],
  },

  sheet: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Sheet", description: "Root (Radix Dialog por baixo) — controla abertura." },
      { part: "SheetTrigger", description: "Elemento que abre o painel." },
      { part: "SheetContent", description: "Painel que desliza de um lado (side) — inclui botão de fechar." },
      { part: "SheetHeader / Title / Description", description: "Título e descrição." },
      { part: "SheetFooter", description: "Ações no rodapé." },
      { part: "SheetClose", description: "Fecha o painel ao ser acionado." },
    ],
    variants: [],
    states: [
      { name: "Closed", description: "Estado padrão." },
      { name: "Open", description: "Desliza a partir do lado configurado." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Editar</SheetTitle>
      <SheetDescription>Faça alterações e salve.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    props: [
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"right"', description: "(SheetContent) lado de onde o painel desliza." },
      { name: "showCloseButton", type: "boolean", default: "true", description: "(SheetContent) mostra o X no canto superior direito." },
    ],
  },

  sidebar: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "SidebarProvider", description: "Contexto raiz — estado aberto/colapsado, persistido em cookie, TooltipProvider embutido." },
      { part: "Sidebar", description: 'Elemento raiz — collapsible "offcanvas" (mobile), "icon" (encolhe pra ícones) ou "none".' },
      { part: "SidebarHeader / SidebarFooter", description: "Áreas fixas no topo/base (ex: logo, usuário)." },
      { part: "SidebarContent", description: "Área rolável com os grupos de navegação." },
      { part: "SidebarGroup / SidebarGroupLabel", description: "Agrupa itens relacionados, com rótulo — some no modo ícone." },
      { part: "SidebarMenu / SidebarMenuItem / SidebarMenuButton", description: "Lista de navegação — o botão mostra tooltip automático quando a sidebar está recolhida." },
      { part: "SidebarMenuAction / SidebarMenuBadge", description: "Ação extra (ex: menu de opções) e contador/badge num item." },
      { part: "SidebarMenuSub / SidebarMenuSubItem / SidebarMenuSubButton", description: "Sub-nível de navegação, recuado." },
      { part: "SidebarRail", description: "Alça fina na borda pra arrastar/alternar a sidebar." },
      { part: "SidebarTrigger", description: "Botão (geralmente no header do app) que abre/fecha a sidebar." },
      { part: "SidebarInset", description: "Área de conteúdo principal ao lado da sidebar." },
    ],
    variants: [],
    states: [
      { name: "Expanded", description: "Largura total, labels visíveis." },
      { name: "Collapsed (ícone)", description: 'collapsible="icon" — só ícones, labels em tooltip.' },
      { name: "Mobile", description: "Renderiza como Sheet (painel deslizante) abaixo do breakpoint md." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Início">Início</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>`,
    props: [
      { name: "collapsible", type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: "(Sidebar) comportamento ao recolher." },
      { name: "side", type: '"left" | "right"', default: '"left"', description: "(Sidebar) lado da tela." },
      { name: "variant", type: '"sidebar" | "floating" | "inset"', default: '"sidebar"', description: "(Sidebar) estilo visual do contêiner." },
      { name: "tooltip", type: "string", description: "(SidebarMenuButton) texto mostrado quando a sidebar está recolhida." },
    ],
  },

  table: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Table", description: "Wrapper com overflow-x-auto + <table>." },
      { part: "TableHeader / TableBody / TableFooter", description: "<thead>/<tbody>/<tfoot>." },
      { part: "TableRow", description: "<tr> — hover e data-state=selected." },
      { part: "TableHead / TableCell", description: "<th>/<td> — alinhamento e espaçamento padronizados." },
      { part: "TableCaption", description: "<caption> — legenda abaixo da tabela." },
    ],
    variants: [],
    states: [
      { name: "Hover", description: "hover:bg-muted/50 na linha." },
      { name: "Selecionada", description: "data-state=selected — bg-muted." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Apólice AP-001</TableCell>
      <TableCell>Ativa</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    props: [
      { name: "...props", type: 'React.ComponentProps<"table">', description: "Atributos nativos de <table> e das demais peças." },
    ],
  },

  tabs: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    anatomy: [
      { part: "Tabs", description: "Root — orientation horizontal ou vertical." },
      { part: "TabsList", description: 'Envolve os gatilhos — variant "default" (fundo bg-muted) ou "line" (sublinhado, sem fundo).' },
      { part: "TabsTrigger", description: "Cada aba — data-state=active quando selecionada." },
      { part: "TabsContent", description: "Conteúdo de cada aba — só a ativa é exibida." },
    ],
    variants: [],
    states: [
      { name: "Active", description: "data-state=active — fundo/sublinhado conforme a variante da lista." },
      { name: "Focus", description: "focus-visible:ring." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="todos">
  <TabsList>
    <TabsTrigger value="todos">Todos</TabsTrigger>
    <TabsTrigger value="meus">Meus itens</TabsTrigger>
  </TabsList>
  <TabsContent value="todos">Conteúdo de todos.</TabsContent>
  <TabsContent value="meus">Conteúdo filtrado.</TabsContent>
</Tabs>`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "(Tabs) direção do layout." },
      { name: "variant", type: '"default" | "line"', default: '"default"', description: "(TabsList) estilo visual da lista de abas." },
      { name: "value / defaultValue", type: "string", description: "(Tabs) aba ativa — controlada ou inicial." },
    ],
  },
}
