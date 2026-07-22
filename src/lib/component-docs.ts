// Registro de documentação estilo atomic design (Descrição, Quando
// utilizar, Anatomia, Variantes, Estados, Tamanhos, Boas práticas, Evite,
// Código, Propriedades). "button" foi o piloto que validou o template;
// desde 2026-07-21 os outros 58 componentes (todos os que têm entrada
// aqui) já têm description/whenToUse reais, sourced de ui.shadcn.com e
// traduzidos (ver PLANO-LOOP-80-20-TEMPLATES.md). Slugs sem entrada aqui
// continuam com a página no formato antigo (Composição + Exemplos), sem
// quebrar nada.
//
// doGuidelines/dontGuidelines continuam como placeholder "[a preencher]"
// em todos os 59 componentes — combinado com o Rafael para não inventar
// conteúdo, e a doc oficial do shadcn/ui não publica orientação de
// faça/não faça por componente. Anatomia, Variantes, Estados, Tamanhos e
// Propriedades são derivados do código real de cada componente.

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
    description: "Exibe um botão ou um componente com aparência de botão.",
    whenToUse: "Use para ações que o usuário aciona diretamente, como confirmar, enviar ou navegar.",
    anatomy: [
      {
        part: "Elemento raiz",
        description:
          'Um <button> (ou o elemento filho, via asChild) com data-slot="button" e data-variant/data-size.',
      },
      {
        part: "Ícone (opcional)",
        description:
          "SVG antes e/ou depois do label. O tamanho é herdado automaticamente pelo seletor [&_svg]. Pode vir via prop `icon` ou dentro de `children`.",
      },
      {
        part: "Label",
        description:
          'Texto do botão — via prop `label` ou dentro de `children`. O tipo exige pelo menos ícone OU label (nunca os dois ausentes ao mesmo tempo, pra nunca existir um botão sem nome acessível). Botões ícone-only (`icon` sem `label`) ainda precisam de `aria-label`.',
      },
      {
        part: "Skeleton (Button.Skeleton)",
        description:
          "Placeholder de carregamento com o mesmo formato do botão real (altura por size), pra evitar layout shift. Aceita as props size e fullWidth.",
      },
    ],
    variants: [
      { name: "Primary", value: "default", description: "Ação principal da tela. Usa --primary." },
      { name: "Secondary", value: "secondary", description: "Ação secundária, menor ênfase." },
      { name: "Outline", value: "outline", description: "Contorno com fundo neutro, para ações alternativas." },
      { name: "Ghost", value: "ghost", description: "Sem fundo nem borda até o hover." },
      { name: "Destructive", value: "destructive", description: "Ações irreversíveis ou de risco (excluir, remover)." },
      { name: "Link", value: "link", description: "Aparência de link de texto, sem fundo." },
      { name: "AI Primary", value: "ai-primary", description: "Ação de IA com hierarquia principal (ex: disparar uma geração). Gradiente de 3 cores (azul/violeta/rosa), tokens reais da Nimbus Design System." },
      { name: "AI Secondary", value: "ai-secondary", description: "Ação de IA complementar — fundo e borda suaves em tom violeta claro, mesmos tokens de IA da Nimbus." },
    ],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Hover", description: "Cursor sobre o botão — muda fundo/opacidade conforme a variante. No variant default, a elevação (shadow) diminui e o botão desloca 1px pra baixo, simulando uma \"descida\" como feedback físico da interação." },
      { name: "Active", description: "Durante o clique/pressionamento." },
      { name: "Focus", description: "Navegação por teclado — anel de foco (focus-visible:ring)." },
      { name: "Disabled", description: 'prop "disabled" — opacidade reduzida, pointer-events desativado. No variant default, a elevação (shadow) some completamente, reforçando visualmente que não está mais interativo.' },
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
</Button>

// Ação de IA (tokens Nimbus) + largura total
<Button variant="ai-primary" fullWidth>
  Gerar com IA
</Button>

// Placeholder de carregamento
<Button.Skeleton size="sm" />`,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "ai-primary" | "ai-secondary"',
        default: '"default"',
        description: "Estilo visual do botão. ai-primary/ai-secondary seguem os tokens de IA da Nimbus Design System (ver globals.css).",
      },
      {
        name: "size",
        type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
        default: '"default"',
        description: "Dimensão do botão.",
      },
      {
        name: "fullWidth",
        type: "boolean",
        default: "false",
        description: "Faz o botão ocupar 100% da largura do container (w-full). Mesmo nome e default da prop equivalente na Nimbus.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description: "Renderiza as props no elemento filho (via Radix Slot) em vez de <button>.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        description: 'Ícone do botão. Exige pelo menos `icon` ou `label` (nunca os dois ausentes) — mutuamente exclusivo com `children`.',
      },
      {
        name: "label",
        type: "React.ReactNode",
        description: 'Texto do botão. Exige pelo menos `icon` ou `label` (nunca os dois ausentes) — mutuamente exclusivo com `children`.',
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "Composição livre (usada com asChild, ButtonGroup, ou conteúdo condicional como Spinner + texto) — mutuamente exclusivo com icon/label.",
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
    description: "Um elemento de imagem com um fallback para representar o usuário.",
    whenToUse: "Use para representar visualmente uma pessoa ou conta, com uma alternativa (iniciais/ícone) para quando a imagem não carregar.",
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
    description: "Exibe um selo (badge) ou um componente com aparência de selo.",
    whenToUse: "Use para destacar um status, contagem ou rótulo curto associado a um item.",
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
    description: "Um controle que permite ao usuário alternar entre marcado e desmarcado.",
    whenToUse: "Use quando o usuário precisar marcar ou desmarcar uma opção, sozinha ou em um grupo de seleção múltipla.",
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
    description: "Um componente de campo de texto para formulários e entrada de dados do usuário, com estilo e recursos de acessibilidade já incorporados.",
    whenToUse: "Use para capturar texto, números ou outros dados digitados pelo usuário em um formulário.",
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
    description: "Componente acessível de senha de uso único (OTP), com suporte a copiar e colar.",
    whenToUse: "Use para capturar códigos de verificação enviados por SMS ou e-mail, com um campo por dígito.",
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
    description: "Usado para exibir uma entrada de teclado do usuário em formato textual.",
    whenToUse: "Use para indicar teclas ou atalhos de teclado dentro de textos, tooltips ou menus.",
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
    description: "Renderiza um rótulo acessível associado a controles de formulário.",
    whenToUse: "Use para nomear um campo ou controle, associando-o via htmlFor para leitores de tela.",
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
    description: "Exibe um indicador que mostra o progresso de conclusão de uma tarefa, geralmente representado como uma barra de progresso.",
    whenToUse: "Use para comunicar o andamento de um processo com duração determinada, como upload, carregamento ou etapas.",
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
    description: "Um conjunto de botões marcáveis — conhecidos como radio buttons — no qual no máximo um pode estar marcado por vez.",
    whenToUse: "Use quando o usuário precisar escolher exatamente uma opção entre um conjunto pequeno e visível de alternativas.",
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
    description: "Separa conteúdo visualmente ou semanticamente.",
    whenToUse: "Use para dividir seções ou agrupamentos de conteúdo relacionados.",
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
    description: "Use para mostrar um espaço reservado (placeholder) enquanto o conteúdo está carregando.",
    whenToUse: "Use enquanto os dados reais ainda não chegaram, para indicar onde o conteúdo vai aparecer.",
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
    description: "Um controle de entrada em que o usuário seleciona um valor dentro de um intervalo definido.",
    whenToUse: "Use quando o usuário precisar ajustar um valor numérico dentro de um intervalo, de forma visual e contínua.",
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
    description: "Um indicador que pode ser usado para mostrar um estado de carregamento.",
    whenToUse: "Use para sinalizar que uma ação está em andamento e o resultado ainda não está disponível.",
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
    description: "Um controle que permite ao usuário alternar entre ativado e desativado.",
    whenToUse: "Use para ativar ou desativar uma configuração imediatamente, sem precisar de um botão de confirmação separado.",
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
    description: "Exibe uma área de texto (textarea) de formulário ou um componente com aparência de textarea.",
    whenToUse: "Use para capturar textos mais longos, como comentários, descrições ou mensagens.",
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
    description: "Um botão de dois estados, que pode estar ativado ou desativado.",
    whenToUse: "Use para uma ação isolada com estado binário, como favoritar ou negrito/itálico numa toolbar, sem formar um grupo.",
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
    description: "Um popup que exibe informações relacionadas a um elemento quando ele recebe foco de teclado ou o mouse passa sobre ele.",
    whenToUse: "Use para complementar um elemento com uma explicação curta, sem ocupar espaço permanente na tela.",
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
    description: "Exibe conteúdo dentro de uma proporção desejada.",
    whenToUse: "Use para manter a proporção de imagens, vídeos ou embeds ao redimensionar o layout.",
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
    description: "Um elemento <select> nativo do HTML, estilizado e integrado de forma consistente ao design system.",
    whenToUse: "Use quando quiser o comportamento nativo do navegador para seleção (melhor em mobile e acessibilidade) em vez do Select customizado.",
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
    description: "Exibe uma lista de opções para o usuário escolher, acionada por um botão.",
    whenToUse: "Use para seleção única entre várias opções, quando quiser um menu customizado (com ícones, grupos etc.) em vez do select nativo.",
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
    description: "Exibe conteúdo rico em um portal, acionado por um botão.",
    whenToUse: "Use para mostrar conteúdo adicional (formulário curto, opções, detalhes) ancorado a um elemento, sem sair da tela atual.",
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
    description: "Um componente versátil para exibir conteúdo com mídia, título, descrição e ações.",
    whenToUse: "Use como linha de lista genérica — contatos, arquivos, notificações — combinando ícone ou imagem, texto e ações.",
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
    description: "Exibe um status em linha, uma nota do sistema, uma linha com borda ou um separador rotulado dentro de uma conversa.",
    whenToUse: "Use em interfaces de conversa (chat) para marcar eventos do sistema, status ou separadores entre mensagens.",
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
    description: "Exibe um destaque para chamar a atenção do usuário.",
    whenToUse: "Use para comunicar uma informação importante, confirmação ou erro relacionado ao contexto atual da tela.",
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
    description: "Exibe o caminho até o recurso atual usando uma hierarquia de links.",
    whenToUse: "Use para mostrar a localização da página atual dentro da estrutura de navegação do produto.",
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
    description: "Um contêiner que agrupa botões relacionados com um estilo visual consistente.",
    whenToUse: "Use para agrupar botões que executam ações relacionadas, mantendo bordas coladas e alinhamento consistente.",
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
    description: "Um componente interativo que expande ou recolhe um painel.",
    whenToUse: "Use para esconder ou mostrar um bloco de conteúdo opcional sob demanda, sem a formalidade de um Accordion.",
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
    description: "Campo de entrada com autocompletar e uma lista de sugestões.",
    whenToUse: "Use quando o usuário precisar buscar e selecionar uma opção entre muitas, digitando para filtrar a lista.",
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
    description: "Use o componente Empty para exibir um estado vazio.",
    whenToUse: "Use quando uma lista, busca ou seção não tiver conteúdo para mostrar, orientando o próximo passo do usuário.",
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
    description: "Combine labels, controles e textos de ajuda para compor campos de formulário acessíveis e agrupamentos de campos.",
    whenToUse: "Use para estruturar qualquer campo de formulário, garantindo que label, texto de ajuda e mensagem de erro fiquem conectados corretamente para acessibilidade.",
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
    description: "Para usuários com visão, permite pré-visualizar conteúdo disponível atrás de um link.",
    whenToUse: "Use para mostrar uma pré-visualização de informação (perfil, card) ao passar o mouse sobre um link ou elemento, sem navegar até ele.",
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
    description: "Adicione complementos, botões e conteúdo auxiliar a campos de entrada.",
    whenToUse: "Use quando um Input ou Textarea precisar de um ícone, prefixo, sufixo, botão ou texto de apoio acoplado.",
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
    description: "Paginação com navegação entre páginas e links de próxima/anterior.",
    whenToUse: "Use para dividir uma lista longa de resultados em páginas navegáveis.",
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
    description: "Um conjunto de botões de dois estados que podem ser ativados ou desativados.",
    whenToUse: "Use para um grupo de opções que alternam estado (ativo/inativo), com seleção única ou múltipla, como alinhamento de texto ou filtros.",
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
    description: "Amplia a funcionalidade nativa de rolagem para permitir um estilo customizado e consistente entre navegadores.",
    whenToUse: "Use quando precisar de uma área de rolagem com barra estilizada, dentro de um espaço de altura ou largura fixa.",
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
    description: "Exibe um anexo de arquivo ou imagem com mídia, metadados, estado de upload e ações.",
    whenToUse: "Use para listar arquivos anexados em um formulário, composer de chat ou upload, mostrando nome, tamanho e status.",
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
    description: "Um conjunto de cabeçalhos interativos empilhados verticalmente, cada um revelando uma seção de conteúdo.",
    whenToUse: "Use para organizar conteúdo extenso em seções que podem ser expandidas uma a uma, como perguntas frequentes.",
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
    description: "Um diálogo modal que interrompe o usuário com um conteúdo importante e espera uma resposta.",
    whenToUse: "Use para confirmar ações irreversíveis ou críticas, como excluir ou cancelar, exigindo uma escolha explícita antes de continuar.",
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
    description: "Um componente de calendário que permite ao usuário selecionar uma data ou um intervalo de datas.",
    whenToUse: "Use quando o usuário precisar escolher uma ou mais datas visualmente, como agendamento de vistoria ou vigência de apólice.",
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
    description: "Exibe um cartão com cabeçalho, conteúdo e rodapé.",
    whenToUse: "Use para agrupar informações relacionadas em um bloco visualmente delimitado, com título, corpo e ações opcionais.",
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
    description: "Um carrossel com movimento e suporte a swipe, construído com a biblioteca Embla.",
    whenToUse: "Use para exibir uma sequência de itens (imagens, cards) navegável horizontalmente, um ou poucos por vez.",
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
    description: "Gráficos com boa aparência visual, construídos com Recharts, prontos para copiar e colar no app.",
    whenToUse: "Use para visualizar dados numéricos ao longo do tempo ou por categoria — barras, linhas, pizza — com tooltip e legenda integrados.",
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
    description: "Menu de comandos para busca e ações rápidas.",
    whenToUse: "Use para uma paleta de comandos (estilo atalho ⌘K) que permite buscar e executar ações rapidamente pelo teclado.",
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
    description: "Exibe um menu de ações acionado pelo clique com o botão direito do mouse.",
    whenToUse: "Use para oferecer ações contextuais a um item específico, sem ocupar espaço fixo na tela.",
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
    description: "Uma janela sobreposta à janela principal ou a outro diálogo, tornando o conteúdo abaixo inerte.",
    whenToUse: "Use para tarefas focadas que precisam da atenção total do usuário antes de voltar ao fluxo principal, como editar ou confirmar dados.",
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
    description: "Exibe um menu para o usuário — como um conjunto de ações ou funções — acionado por um botão.",
    whenToUse: "Use para agrupar ações relacionadas a um elemento, como o menu de opções de uma linha de tabela, atrás de um botão gatilho.",
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
    description: "Um componente de painel deslizante (drawer) para React.",
    whenToUse: "Use para exibir conteúdo complementar em um painel que desliza de uma borda da tela, especialmente em mobile.",
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
    description: "Construa formulários com React e shadcn/ui.",
    whenToUse: "Use para compor formulários completos, conectando os campos (Field) a uma biblioteca de validação como o React Hook Form.",
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
    description: "Um menu visualmente persistente, comum em aplicações desktop, que dá acesso rápido a um conjunto consistente de comandos.",
    whenToUse: "Use em interfaces densas, estilo aplicativo desktop, quando quiser uma barra de menus sempre visível, como Arquivo, Editar e Exibir.",
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
    description: "Exibe uma mensagem em uma conversa, com avatar, cabeçalho, rodapé e alinhamento opcionais.",
    whenToUse: "Use para estruturar cada linha de uma conversa (chat, atendimento, assistente de IA), cuidando de avatar, alinhamento e metadados.",
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
    description: "Exibe conteúdo de conversa em um balão de mensagem. Suporta variantes visuais, alinhamento, agrupamento, reações e conteúdo recolhível.",
    whenToUse: "Use como a superfície visível de uma mensagem de chat — o balão de texto — dentro do componente Message.",
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
    description: "Uma coleção de links para navegar em um site.",
    whenToUse: "Use para a navegação principal do produto, com suporte a submenus e painéis de conteúdo maiores que um dropdown simples.",
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
    description: "Grupos de painéis redimensionáveis e acessíveis, com suporte a teclado.",
    whenToUse: "Use quando o usuário precisar ajustar manualmente o tamanho de painéis lado a lado, como em um editor de código ou um layout com sidebar.",
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
    description: "Estende o componente Dialog para exibir conteúdo que complementa o conteúdo principal da tela.",
    whenToUse: "Use para painéis laterais (ou de qualquer borda) que complementam a tela atual, como filtros avançados ou detalhes de um item.",
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
    description: "Um componente de barra lateral (sidebar) componível, tematizável e customizável.",
    whenToUse: "Use como a navegação lateral principal do produto, com suporte a estado colapsado, ícones e submenus.",
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
    description: "Um componente de tabela responsivo.",
    whenToUse: "Use para exibir dados tabulares — linhas e colunas — como listas de apólices, sinistros ou transações.",
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
    description: "Um conjunto de seções de conteúdo em camadas — conhecidas como painéis de aba — exibidas uma por vez.",
    whenToUse: "Use para alternar entre visões relacionadas do mesmo contexto, sem navegar para outra página.",
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

  sonner: {
    description: "Um componente de notificação toast opinativo para React.",
    whenToUse: "Use para dar feedback rápido e não bloqueante sobre o resultado de uma ação (sucesso, erro, carregamento), sem interromper o fluxo do usuário.",
    anatomy: [
      { part: "Toaster", description: "Montado uma vez na raiz do app — é o container que renderiza as notificações disparadas em qualquer lugar." },
      { part: "toast()", description: "Função (não é um componente React) que dispara a notificação — toast(\"mensagem\") ou toast.success/error/warning/info/promise." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Notificação neutra." },
      { name: "Success", value: "success", description: "Confirmação de uma ação concluída." },
      { name: "Info", value: "info", description: "Informação neutra adicional." },
      { name: "Warning", value: "warning", description: "Alerta que não bloqueia o fluxo." },
      { name: "Error", value: "error", description: "Falha em uma ação." },
      { name: "Promise", value: "promise", description: "Acompanha o ciclo de uma Promise — loading, depois success ou error." },
    ],
    states: [
      { name: "Entrando", description: "Anima deslizando para a posição configurada (padrão: canto inferior direito)." },
      { name: "Visível", description: "Permanece na tela até o tempo definido ou o fechamento manual." },
      { name: "Saindo", description: "Anima ao fechar automaticamente ou por interação do usuário." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// <Toaster /> é montado uma vez na raiz do app (ver app-shell.tsx)
<Button onClick={() => toast.success("Apólice atualizada com sucesso.")}>
  Salvar
</Button>`,
    props: [
      { name: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: "(Toaster) posição das notificações na tela." },
      { name: "richColors", type: "boolean", default: "false", description: "(Toaster) usa cores mais vivas por tipo de toast." },
    ],
  },
}
