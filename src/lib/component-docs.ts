// Arquivo gerado a partir de docs/componentes/*.md pelo comando `npm run docs:gerar`.
// Para editar a documentação de um componente, altere o arquivo correspondente em
// docs/componentes/<slug>.md.
//
// Teste de sincronia em src/lib/component-docs.sincronia.test.ts reprova se este arquivo
// divergir dos MDs fonte.

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
  meta?: {
    nome: string
    camada: string
    status: string
    codigo: string
    story: string
    vizinhos: string[]
  }
  whenToUseItems?: string[]
  whenNotToUse?: string[]
  content?: string[]
  accessibility?: {
    keyboard: string
    screenReader: string
    focus: string
    cautions: string
  }
  tokens?: { contexto: string; itens: string[] }[]
}

export const componentDocs: Record<string, ComponentDoc> = {
  button: {
    description: "Dispara uma ação. O texto diz exatamente o que vai acontecer: \"Salvar alterações\", não \"OK\".",
    whenToUse: "Confirmar, enviar, criar, excluir: ações que mudam algo. Abrir uma janela ou painel desta mesma tela.",
    anatomy: [
      { part: "Button", description: "Raiz: <button> com data-slot=\"button\", data-variant e data-size. Com asChild, as props vão para o filho (Radix Slot)." },
      { part: "Ícone (opcional)", description: "SVG antes ou depois do texto. Tamanho herdado (size-4, size-3 no xs)." },
      { part: "Texto", description: "Via label ou children. O tipo exige children, icon ou label — nunca botão vazio." },
      { part: "Button.Skeleton", description: "Placeholder com a mesma altura e canto do tamanho escolhido." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Ação principal. Uma por contexto." },
      { name: "Destructive", value: "destructive", description: "Ação que não se desfaz (excluir)" },
      { name: "Outline", value: "outline", description: "Ação alternativa; fundo transparente, herda o do container" },
      { name: "Secondary", value: "secondary", description: "Ação forte que não é a principal" },
      { name: "Ghost", value: "ghost", description: "Ação discreta, sem superfície até o hover" },
      { name: "Link", value: "link", description: "Ação com cara de texto" },
      { name: "Ai-primary", value: "ai-primary", description: "Ação principal que dispara IA" },
      { name: "Ai-secondary", value: "ai-secondary", description: "Ação secundária que dispara IA" },
    ],
    states: [
      { name: "Padrão", description: "Variantes com superfície têm shadow-sm" },
      { name: "Hover", description: "Fundo um tom abaixo; sombra diminui e desce 1 px" },
      { name: "Pressionado", description: "active:scale-(--scale-pressed)" },
      { name: "Foco", description: "Anel de 3 px em ring (focus-visible)" },
      { name: "Desabilitado", description: "opacity-50, sem sombra, sem clique (disabled ou aria-disabled)" },
      { name: "Carregando", description: "Composição: <Spinner /> + aria-disabled. Não é prop" },
    ],
    sizes: [
      { name: "xs", value: "xs", description: "24 px — Barras de ferramenta densas" },
      { name: "sm", value: "sm", description: "32 px — Tabelas, filtros" },
      { name: "default", value: "default", description: "40 px — Padrão; mínimo no celular" },
      { name: "md", value: "md", description: "40 px, igual a default — Padrão; mínimo no celular" },
      { name: "lg", value: "lg", description: "48 px — Chamada principal, telas de celular" },
      { name: "xl", value: "xl", description: "56 px — Destaque de página" },
      { name: "icon-xs", value: "icon-xs", description: "24 px — Só ícone — exige aria-label" },
      { name: "icon-sm", value: "icon-sm", description: "32 px — Só ícone — exige aria-label" },
      { name: "icon", value: "icon", description: "40 px — Só ícone, tamanho padrão — exige aria-label" },
      { name: "icon-md", value: "icon-md", description: "40 px, igual a icon — Só ícone — exige aria-label" },
      { name: "icon-lg", value: "icon-lg", description: "48 px — Só ícone — exige aria-label" },
      { name: "icon-xl", value: "icon-xl", description: "56 px — Só ícone — exige aria-label" },
    ],
    doGuidelines: ["Comece o texto com verbo: Salvar, Enviar, Criar conta.", "Deixe a ação principal à direita em janelas e formulários.", "Explique perto do botão por que ele está desabilitado."],
    dontGuidelines: ["Texto vago (\"OK\", \"Clique aqui\", \"Sim\") → diga a ação: \"Excluir capítulo\".", "Dois default lado a lado → um vira outline ou secondary.", "destructive em ação que se desfaz → default ou outline."],
    code: `import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

<Button>Salvar alterações</Button>
<Button variant="outline" size="sm">Cancelar</Button>
<Button size="icon" aria-label="Fechar" icon={<Icon name="close" />} />
<Button.Skeleton size="sm" />`,
    props: [
      { name: "variant", type: "default · destructive · outline · secondary · ghost · link · ai-primary · ai-secondary", default: "default", description: "Hierarquia visual" },
      { name: "size", type: "xs · sm · default · md · lg · xl · icon-xs · icon-sm · icon · icon-md · icon-lg · icon-xl", default: "default", description: "Altura. default = md; icon = icon-md" },
      { name: "fullWidth", type: "boolean", default: "false", description: "Ocupa 100% da largura" },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho" },
      { name: "icon · label", type: "React.ReactNode", default: "—", description: "Conteúdo explícito (alternativa a children)" },
      { name: "disabled", type: "boolean", default: "false", description: "Desabilita e tira do foco" },
      { name: "aria-disabled", type: "boolean", default: "—", description: "Mesmo visual de desabilitado, mas continua focável e anunciado" },
      { name: "...props", type: "ComponentProps<\"button\">", default: "—", description: "onClick, type, form…" },
      { name: "children", type: "React.ReactNode", default: "—", description: "Conteúdo livre; obrigatório com asChild" },
      { name: "size (ButtonSkeleton)", type: "xs · sm · default · md · lg · xl · icon-xs · icon-sm · icon · icon-md · icon-lg · icon-xl", default: "default", description: "Mesma altura do botão que ele substitui" },
      { name: "fullWidth (ButtonSkeleton)", type: "boolean", default: "false", description: "Ocupa 100% da largura, como o botão" },
    ],
    meta: {
      nome: "Button",
      camada: "atom",
      status: "estavel",
      codigo: "src/components/ui/button.tsx",
      story: "src/components/ui/button.stories.tsx",
      vizinhos: ["link", "icon-button", "split-button", "button-group"],
    },
    whenToUseItems: ["Confirmar, enviar, criar, excluir: ações que mudam algo.", "Abrir uma janela ou painel desta mesma tela."],
    whenNotToUse: ["Leva para outra página ou site → link (ou <Button asChild><Link/></Button> só se o visual de botão for exigido).", "Só ícone, sem texto → icon-button.", "Ação principal com variações (salvar / salvar como) → split-button."],
    content: ["Verbo + objeto, até 3 palavras: Salvar alterações, Criar conta.", "Use o mesmo verbo do título da janela ou da página.", "Sem ponto final e sem exclamação."],
    accessibility: {
      keyboard: "Tab chega ao botão; Enter ou Espaço executam.",
      screenReader: "papel button; o nome é o texto. Só ícone → aria-label obrigatório.",
      focus: "depois da ação, o foco fica no botão — salvo se abrir janela ou trocar de tela.",
      cautions: "durante carregamento use aria-disabled (não disabled): disabled joga o foco para o <body>. Mantenha o texto ou anuncie \"Salvando\".",
    },
    tokens: [
      { contexto: "Cor", itens: ["--ai-gradient-hover", "--ai-gradient-rest", "bg-accent", "bg-ai-surface", "bg-ai-surface-highlight", "bg-destructive", "bg-input", "bg-primary", "bg-secondary", "border-ai-interactive", "border-ai-interactive-hover", "border-destructive", "border-input", "border-ring", "text-accent-foreground", "text-ai-text-high", "text-primary", "text-primary-foreground", "text-secondary-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-base", "text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-1.5", "gap-2", "h-10", "h-12", "h-14", "h-6", "h-8", "px-1.5", "px-2", "px-2.5", "px-3", "px-4", "px-5", "px-6", "px-8", "py-2", "size-10", "size-12", "size-14", "size-3", "size-4", "size-6", "size-8", "w-16", "w-20", "w-24", "w-28", "w-32"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Sombra", itens: ["shadow-sm", "shadow-xs"] },
      { contexto: "Movimento", itens: ["--scale-pressed", "duration-motion-fast", "ease-spring"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
    ],
  },
  avatar: {
    description: "Um elemento de imagem com um fallback para representar o usuário.",
    whenToUse: "Use para representar visualmente uma pessoa ou conta, com uma alternativa (iniciais/ícone) para quando a imagem não carregar.",
    anatomy: [
      { part: "Root", description: "AvatarPrimitive.Root — data-slot=\"avatar\", data-size." },
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
    doGuidelines: ["Use para representar visualmente o usuário em perfis, listas e comentários. Ofereça fallback com iniciais quando não houver imagem."],
    dontGuidelines: ["Não use avatar como elemento decorativo sem função de identificação."],
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/avatar.png" alt="Rafael" />
  <AvatarFallback>RA</AvatarFallback>
</Avatar>`,
    props: [
      { name: "size", type: "\"default\" | \"sm\" | \"lg\"", default: "\"default\"", description: "Dimensão do avatar." },
      { name: "...props", type: "React.ComponentProps<typeof AvatarPrimitive.Root>", description: "Props nativas do Radix Avatar." },
    ],
  },
  badge: {
    description: "Exibe um selo (badge) ou um componente com aparência de selo.",
    whenToUse: "Use para destacar um status, contagem ou rótulo curto associado a um item.",
    anatomy: [
      { part: "Elemento raiz", description: "Um <span> (ou o filho, via asChild) com data-slot=\"badge\" e data-variant." },
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
    doGuidelines: ["Use para comunicar quantidade de itens pendentes ou estado de um elemento. Mantenha o contador breve (ex: +99)."],
    dontGuidelines: ["Não use badge para categorizar ou rotular — use Tag. Não use para mensagens acionáveis — use Toast."],
    code: `import { Badge } from "@/components/ui/badge"

<Badge variant="secondary">Badge</Badge>`,
    props: [
      { name: "variant", type: "\"default\" | \"secondary\" | \"destructive\" | \"outline\" | \"ghost\" | \"link\"", default: "\"default\"", description: "Estilo visual do badge." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho (ex: <a>) em vez de <span>." },
      { name: "...props", type: "React.ComponentProps<\"span\">", description: "Atributos nativos de <span>." },
    ],
  },
  box: {
    description: "Container flexível e sem estilo próprio para agrupar e organizar elementos no layout. O visual, espaçamento e alinhamento vêm das classes utilitárias do Tailwind.",
    whenToUse: "Agrupar e espaçar elementos lado a lado ou em coluna num layout simples. Criar containers genéricos com fundo, borda ou espaçamento customizados via classes do Tailwind. Renderizar tags HTML semânticas como section ou article com polimorfismo via asChild.",
    anatomy: [
      { part: "Box", description: "Elemento raiz (div ou o elemento filho via asChild) com data-slot=\"box\"" },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use utilitários do Tailwind para controlar padding, gap e alinhamento do container.", "Use asChild quando precisar que o container seja uma tag semântica como section ou header.", "Combine com tokens de cor e borda para manter a consistência do sistema."],
    dontGuidelines: ["Usar Box quando um container semântico com padrão visual próprio já existe → card.", "Criar divisões estruturais usando estilos arbitrários em vez de tokens do sistema → use classes utilitárias baseadas em tokens.", "Deixar de fornecer rotulagem acessível ao transformar Box em um marco de navegação → forneça aria-label ou aria-labelledby."],
    code: `import { Box } from "@/components/ui/box"

<Box className="flex items-center justify-between gap-4 rounded-md border p-4">
  <span>Status do sistema</span>
  <span className="text-sm text-muted-foreground">Operacional</span>
</Box>`,
    props: [
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza as propriedades no elemento filho via Radix Slot em vez de criar uma div" },
    ],
    meta: {
      nome: "Box",
      camada: "primitive",
      status: "piloto",
      codigo: "src/components/ui/box.tsx",
      story: "src/components/ui/box.stories.tsx",
      vizinhos: ["card", "separator", "item"],
    },
    whenToUseItems: ["Agrupar e espaçar elementos lado a lado ou em coluna num layout simples.", "Criar containers genéricos com fundo, borda ou espaçamento customizados via classes do Tailwind.", "Renderizar tags HTML semânticas como section ou article com polimorfismo via asChild."],
    whenNotToUse: ["Agrupar informações com superfície, borda e cabeçalho padronizados → card.", "Dividir seções apenas com uma linha fina visual → separator.", "Organizar itens estruturados dentro de uma lista interativa → item."],
    content: ["Não tem texto próprio.", "O texto e a hierarquia tipográfica são definidos pelos elementos filhos ou pelo componente text."],
    accessibility: {
      keyboard: "Não recebe foco diretamente.",
      screenReader: "É um container neutro sem papel semântico padrão (div). Quando usado como marco estrutural, combine asChild com uma tag semântica ou adicione role e aria-label.",
      focus: "Não retém nem altera o fluxo de foco. O foco passa normalmente para os elementos filhos focáveis.",
      cautions: "Não substitua marcos semânticos da página (main, nav, aside) por simples div sem a devida identificação estrutural (WCAG 1.3.1).",
    },
  },
  checkbox: {
    description: "Um controle que permite ao usuário alternar entre marcado e desmarcado.",
    whenToUse: "Use quando o usuário precisar marcar ou desmarcar uma opção, sozinha ou em um grupo de seleção múltipla.",
    anatomy: [
      { part: "Root", description: "CheckboxPrimitive.Root — data-slot=\"checkbox\", data-state." },
      { part: "Indicator", description: "Ícone de check, visível só quando marcado (data-state=checked)." },
      { part: "Tamanho", description: "Controlado por --form-control-size (globals.css), não por classe fixa. O mesmo token também escala RadioGroupItem — trocar essa variável por preset ajusta os dois componentes juntos." },
    ],
    variants: [],
    states: [
      { name: "Unchecked", description: "Estado de repouso." },
      { name: "Checked", description: "data-state=checked — fundo e borda em --primary." },
      { name: "Indeterminate", description: "checked=\"indeterminate\" — usado em seleção parcial de grupo." },
      { name: "Focus", description: "Navegação por teclado — focus-visible:ring." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["Use quando uma ou várias opções podem ser selecionadas simultaneamente. Redija o label em positivo."],
    dontGuidelines: ["Não use checkbox para opções mutuamente excludentes — use Radio. Não use para ações com efeito imediato — use Toggle."],
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
  chip: {
    description: "Sinaliza um critério ou atributo relacionado a uma busca ou filtro de uma lista de informações.",
    whenToUse: "Use para representar um filtro ou critério ativo aplicado a uma lista (ex: um filtro de busca que o usuário pode remover). Não confunda com componentes vizinhos: use Tag para categorizar informação de forma estática (não removível); use Badge para reportar contagem de itens pendentes/status. Chip é especificamente para critério de filtro/busca ativo, tipicamente removível.",
    anatomy: [
      { part: "Elemento raiz", description: "Um <span> (ou o filho, via asChild) com data-slot=\"chip\" e data-variant. Não é ele mesmo um <button> — a interatividade fica isolada no botão de remover." },
      { part: "Ícone (opcional)", description: "Nó antes do label, via prop `icon`. Deve ter relação direta com o critério representado. Tamanho herdado via [&>svg]:size-3, mesmo mecanismo do Badge." },
      { part: "Label", description: "Texto do chip — via `children`. Sem verbo (é rótulo, não ação)." },
      { part: "Botão de remover (opcional)", description: "Só existe quando removable=true. Renderizado como <Button variant=\"ghost\" size=\"icon-xs\"> contendo <Icon name=\"close\" />, com aria-label próprio (prop removeLabel)." },
      { part: "Skeleton (Chip.Skeleton)", description: "Placeholder de carregamento com o mesmo formato do chip real, pra evitar layout shift." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Aparência neutra padrão — fundo --muted, texto --foreground." },
      { name: "AI Generated", value: "ai-generated", description: "Sinaliza que o valor do chip foi gerado por IA. Usa os tokens --ai-surface/--ai-interactive/--ai-text-high já wireados neste projeto pra família \"ai-*\" do Button." },
    ],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Hover", description: "Só o botão de remover reage a hover (herda o hover do Button variant=\"ghost\") — o corpo do chip não é interativo por padrão." },
      { name: "Focus", description: "Aplica-se somente ao botão de remover, quando presente — anel de foco herdado do Button. O corpo do chip não recebe foco." },
      { name: "Disabled", description: "prop disabled — desativa o botão de remover e reduz a opacidade do chip inteiro." },
      { name: "Removível (remoção)", description: "Quando removable=true: botão de \"x\" alcançável via Tab, ativável via Enter ou Space (comportamento nativo de <button>)." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Chip } from "@/components/ui/chip"
import { Icon } from "@/components/ui/icon"

// Chip simples, não removível (ex.: rótulo de critério fixo)
<Chip>Categoria: Roupas</Chip>

// Chip removível (ex.: filtro ativo de busca)
<Chip removable onRemove={() => removerFiltro("categoria")}>
  Categoria: Roupas
</Chip>

// Chip com ícone + removível
<Chip icon={<Icon name="sell" />} removable onRemove={handleRemove}>
  Promoção
</Chip>

// Chip indicando valor gerado por IA
<Chip variant="ai-generated" removable onRemove={handleRemove}>
  Sugestão gerada por IA
</Chip>

// Placeholder de carregamento
<Chip.Skeleton />`,
    props: [
      { name: "children", type: "React.ReactNode", description: "Texto do chip (obrigatório)." },
      { name: "icon", type: "React.ReactNode", description: "Ícone opcional antes do label. Deve estar relacionado ao critério representado." },
      { name: "removable", type: "boolean", default: "false", description: "Mostra o botão de remover (o \"x\")." },
      { name: "onRemove", type: "() => void", description: "Callback disparado ao clicar/ativar o botão de remover." },
      { name: "variant", type: "\"default\" | \"ai-generated\"", default: "\"default\"", description: "Estilo visual do chip." },
      { name: "removeLabel", type: "string", default: "\"Remover\"", description: "Texto usado como aria-label do botão de remover." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza as props no elemento filho (via Radix Slot) em vez de <span>." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o botão de remover e reduz a opacidade do chip." },
      { name: "...props", type: "React.ComponentProps<\"span\">", description: "Demais atributos nativos do elemento raiz." },
    ],
  },
  "icon-button": {
    description: "Um botão cujo único conteúdo é um ícone, sem texto visível.",
    whenToUse: "Use quando há limitação de espaço ou quando uma ação pode ser perfeitamente representada por um ícone só. Pode ser combinado com Tooltip para mostrar uma descrição breve da ação. Se não for possível resumir a ação num ícone, considere Button com label em vez de Icon Button.",
    anatomy: [
      { part: "Elemento raiz", description: "O próprio Button interno com data-slot=\"icon-button\" (sobrescreve o data-slot=\"button\" do Button interno) e data-variant/data-size preservados." },
      { part: "Ícone", description: "Nó via prop `icon`, sempre obrigatório — único conteúdo do botão." },
      { part: "Nome acessível", description: "`aria-label`, obrigatório via tipo (não opcional) — impossível montar um <IconButton /> sem ele, o TypeScript barra antes do runtime." },
      { part: "Skeleton (IconButton.Skeleton)", description: "Reaproveita Button.Skeleton, restrito às 4 escalas quadradas (icon/icon-xs/icon-sm/icon-lg)." },
    ],
    variants: [
      { name: "Primary", value: "default", description: "Ação principal ícone-only. Usa --primary." },
      { name: "Secondary", value: "secondary", description: "Ação secundária, menor ênfase." },
      { name: "Outline", value: "outline", description: "Contorno com fundo neutro." },
      { name: "Ghost", value: "ghost", description: "Sem fundo nem borda até o hover — uso mais comum em toolbars e ações inline." },
      { name: "Destructive", value: "destructive", description: "Ações irreversíveis (excluir, remover)." },
      { name: "Link", value: "link", description: "Aparência de link, sem fundo." },
      { name: "AI Primary", value: "ai-primary", description: "Ação de IA com hierarquia principal. Gradiente de tokens reais da Nimbus Design System." },
      { name: "AI Secondary", value: "ai-secondary", description: "Ação de IA complementar — mesmos tokens de IA da Nimbus." },
    ],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Hover", description: "Muda fundo/opacidade conforme a variante; no variant default, a elevação (shadow) diminui e o botão desce 1px, mesmo feedback físico do Button." },
      { name: "Active", description: "Durante o clique/pressionamento." },
      { name: "Focus", description: "Navegação por teclado — anel de foco (focus-visible:ring), herdado do Button." },
      { name: "Disabled", description: "prop \"disabled\" — opacidade reduzida, pointer-events desativado." },
    ],
    sizes: [
      { name: "icon (default)", value: "icon", description: "size-9 (36px) — tamanho padrão." },
      { name: "icon-xs", value: "icon-xs", description: "size-6 (24px)." },
      { name: "icon-sm", value: "icon-sm", description: "size-8 (32px)." },
      { name: "icon-lg", value: "icon-lg", description: "size-10 (40px)." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { IconButton } from "@/components/ui/icon-button"
import { Icon } from "@/components/ui/icon"

// Icon Button padrão
<IconButton icon={<Icon name="favorite" />} aria-label="Favoritar" />

// Variante ghost (uso mais comum em toolbars/ações inline)
<IconButton
  variant="ghost"
  size="icon-sm"
  icon={<Icon name="more_horiz" />}
  aria-label="Mais opções"
/>

// Ação destrutiva
<IconButton
  variant="destructive"
  icon={<Icon name="delete" />}
  aria-label="Excluir"
/>

// Placeholder de carregamento
<IconButton.Skeleton size="icon" />`,
    props: [
      { name: "icon", type: "React.ReactNode", description: "Ícone exibido — único conteúdo do botão, sempre obrigatório." },
      { name: "aria-label", type: "string", description: "Nome acessível. Obrigatório via tipo — não opcional como no Button." },
      { name: "variant", type: "\"default\" | \"destructive\" | \"outline\" | \"secondary\" | \"ghost\" | \"link\" | \"ai-primary\" | \"ai-secondary\"", default: "\"default\"", description: "Estilo visual, idêntico ao variant do Button — nenhuma variante nova." },
      { name: "size", type: "\"icon\" | \"icon-xs\" | \"icon-sm\" | \"icon-lg\"", default: "\"icon\"", description: "Dimensão — restrito às 4 escalas quadradas do Button." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza as props no elemento filho (via Radix Slot, herdado do Button) em vez de <button>." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa interação e reduz opacidade." },
      { name: "...props", type: "Omit<React.ComponentProps<typeof Button>, \"icon\" | \"label\" | \"children\" | \"size\" | \"aria-label\">", description: "Demais atributos nativos de <button> e props do Button (fullWidth, onClick, type, etc.)." },
    ],
  },
  input: {
    description: "Um componente de campo de texto para formulários e entrada de dados do usuário, com estilo e recursos de acessibilidade já incorporados.",
    whenToUse: "Use para capturar texto, números ou outros dados digitados pelo usuário em um formulário.",
    anatomy: [
      { part: "Elemento raiz", description: "Um <input> nativo com data-slot=\"input\". Ícone/addon acoplado é composição via InputGroup (Molecule), não parte do Atom." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Focus", description: "focus-visible:border-ring + ring." },
      { name: "Disabled", description: "opacidade reduzida, cursor not-allowed." },
      { name: "Aria-invalid", description: "Borda e ring em --destructive quando aria-invalid=true." },
    ],
    sizes: [],
    doGuidelines: ["Acompanhe sempre com Label visível. Use placeholder como exemplo, não como instrução."],
    dontGuidelines: ["Não use input para textos longos — use Textarea. Não substitua Label por placeholder."],
    code: `import { Input } from "@/components/ui/input"

<Input type="email" placeholder="voce@email.com" />`,
    props: [
      { name: "type", type: "string", default: "\"text\"", description: "Tipo nativo do input (email, password, number...)." },
      { name: "label", type: "React.ReactNode", description: "Rótulo renderizado internamente via Label. Ausente = comportamento idêntico ao anterior, sem wrapper." },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Com label presente, ativa o padrão de label flutuante (motion) em vez da label fixa acima do campo." },
      { name: "...props", type: "React.ComponentProps<\"input\">", description: "Todos os atributos nativos de <input>." },
    ],
  },
  "input-otp": {
    description: "Componente acessível de senha de uso único (OTP), com suporte a copiar e colar.",
    whenToUse: "Use para capturar códigos de verificação enviados por SMS ou e-mail, com um campo por dígito.",
    anatomy: [
      { part: "InputOTP", description: "Root — envolve o input real (invisível) que captura o valor completo." },
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
    doGuidelines: ["Use para códigos de verificação ou autenticação em duas etapas. Avance o foco automaticamente."],
    dontGuidelines: ["Não use para senhas ou dados que o usuário precisa revisar antes de enviar."],
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
      { part: "Elemento raiz", description: "Um <kbd> com data-slot=\"kbd\"." },
      { part: "KbdGroup", description: "Agrupa duas ou mais teclas de um atalho (ex: Ctrl + K)." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use para mostrar atalhos de teclado em menus, tooltips e documentação."],
    dontGuidelines: ["Não use kbd para comandos que não têm atalho real implementado."],
    code: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
    props: [
      { name: "...props", type: "React.ComponentProps<\"kbd\">", description: "Atributos nativos de <kbd>." },
    ],
  },
  label: {
    description: "Rótulo acessível associado a controles de formulário. Identifica a finalidade do campo e amplia a área de clique para focar ou alternar o controle.",
    whenToUse: "Nomear campos de formulário como inputs, textareas, checkboxes e switches. Fornecer um rótulo clicável que transfere o foco diretamente para o controle associado. Apresentar o título identificador de opções em grupos de escolha.",
    anatomy: [
      { part: "Label", description: "Elemento raiz com data-slot=\"label\", tipografia text-sm font-medium e tratamento de estado desabilitado" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Texto em font-medium text-sm, selecionável sem foco próprio" },
      { name: "Desabilitado", description: "Opacidade reduzida e cursor não permitido quando o controle associado está inativo" },
    ],
    sizes: [],
    doGuidelines: ["Vincule sempre a propriedade htmlFor ao id do controle correspondente.", "Mantenha o rótulo sempre visível acima ou ao lado do campo que identifica.", "Use texto conciso que descreva com clareza o dado solicitado."],
    dontGuidelines: ["Usar texto de placeholder como substituto do rótulo visível → mantenha o Label acima do campo.", "Usar Label para parágrafos explicativos longos ou textos soltos → text.", "Agrupar campo, mensagem de ajuda e erro manualmente com Label solto → field."],
    code: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="grid gap-2">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" placeholder="nome@exemplo.com" />
</div>`,
    props: [
      { name: "htmlFor", type: "string", default: "—", description: "Identificador do elemento de formulário associado a este rótulo" },
    ],
    meta: {
      nome: "Label",
      camada: "primitive",
      status: "piloto",
      codigo: "src/components/ui/label.tsx",
      story: "src/components/ui/label.stories.tsx",
      vizinhos: ["field", "text", "tooltip"],
    },
    whenToUseItems: ["Nomear campos de formulário como inputs, textareas, checkboxes e switches.", "Fornecer um rótulo clicável que transfere o foco diretamente para o controle associado.", "Apresentar o título identificador de opções em grupos de escolha."],
    whenNotToUse: ["Compor campo com rótulo, descrição de ajuda e mensagem de erro estruturados → field.", "Exibir texto informativo que não está associado a nenhum controle de formulário → text.", "Explicar um conceito complexo ou termo técnico em uma dica suspensa → tooltip."],
    content: ["Rótulo curto e direto, sem ponto final e sem dois-pontos: \"Nome completo\", \"E-mail\".", "Indique termos opcionais com a palavra \"(opcional)\" por extenso quando a maioria dos campos for obrigatória.", "Nunca use o texto de exemplo (placeholder) em substituição ao rótulo visível."],
    accessibility: {
      keyboard: "Não recebe foco pelo Tab. Clicar no rótulo transfere o foco automaticamente para o controle referenciado por htmlFor.",
      screenReader: "Anunciado como nome acessível do controle ao qual está associado via htmlFor ou quando envolve o elemento de entrada.",
      focus: "Não retém foco próprio. Ao receber clique, encaminha o foco para o controle interativo associado.",
      cautions: "Sempre associe o rótulo ao campo correspondente através de htmlFor casando com o id do elemento, garantindo conformidade com a WCAG 1.3.1 e 3.3.2.",
    },
    tokens: [
      { contexto: "Tipografia", itens: ["font-medium", "leading-none", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-2"] },
    ],
  },
  progress: {
    description: "Exibe um indicador que mostra o progresso de conclusão de uma tarefa, geralmente representado como uma barra de progresso.",
    whenToUse: "Use para comunicar o andamento de um processo com duração determinada, como upload, carregamento ou etapas.",
    anatomy: [
      { part: "Root", description: "ProgressPrimitive.Root — trilho de fundo (bg-primary/20)." },
      { part: "Indicator", description: "Barra preenchida — translateX calculado a partir de value." },
    ],
    variants: [],
    states: [
      { name: "0%", description: "Indicator totalmente deslocado (invisível)." },
      { name: "Em progresso", description: "0 < value < 100." },
      { name: "Completo", description: "value = 100." },
    ],
    sizes: [],
    doGuidelines: ["Use para operações com duração previsível (upload, salvamento). Mostre a porcentagem quando disponível."],
    dontGuidelines: ["Não use para operações instantâneas (<1s). Não use se não puder estimar o progresso — use Spinner."],
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
      { part: "Indicator", description: "Ícone circle preenchido (Icon com prop fill, cor text-primary), visível só no item selecionado." },
      { part: "Tamanho", description: "Controlado por --form-control-size (globals.css), não por classe fixa. O mesmo token também escala Checkbox — trocar essa variável por preset ajusta os dois componentes juntos." },
    ],
    variants: [],
    states: [
      { name: "Unchecked", description: "Estado de repouso do item." },
      { name: "Checked", description: "Indicator visível, borda em --primary." },
      { name: "Focus", description: "focus-visible:ring no item focado." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [],
    doGuidelines: ["Use para selecionar uma única opção entre várias mutuamente excludentes."],
    dontGuidelines: ["Não use radio para selecionar múltiplas opções — use Checkbox. Não use para ativar/desativar — use Toggle."],
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
    description: "Linha fina que separa grupos de conteúdo dentro do mesmo container. Use com moderação: espaço costuma separar melhor do que linha.",
    whenToUse: "Separar grupos dentro do mesmo container: blocos de um card, grupos de um painel. Separar itens lado a lado numa barra de texto: Blog | Documentação | Código-fonte.",
    anatomy: [
      { part: "Separator", description: "Linha de 1 px em bg-border (Radix Separator). Na horizontal ocupa a largura; na vertical, a altura do pai" },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Separe grupos de conteúdo diferentes dentro do mesmo container.", "Na vertical, dê altura ao pai (ex.: flex h-5), porque a linha ocupa h-full.", "Use decorative={false} só quando a divisão precisa ser anunciada ao leitor de tela."],
    dontGuidelines: ["Linha entre todos os itens de uma lista curta → espaço no container (gap-*).", "Separator para criar margem → espaçamento do container (my-*, gap-*).", "Linha grossa ou colorida para chamar atenção → bg-border de 1 px; para destacar, um título ou card."],
    code: `import { Separator } from "@/components/ui/separator"

<Separator className="my-4" />

<div className="flex h-5 items-center gap-4 text-sm">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Documentação</span>
</div>`,
    props: [
      { name: "orientation", type: "horizontal · vertical", default: "horizontal", description: "Direção da linha" },
      { name: "decorative", type: "boolean", default: "true", description: "true esconde do leitor de tela (role=\"none\"). false anuncia como separador (role=\"separator\")" },
    ],
    meta: {
      nome: "Separator",
      camada: "primitive",
      status: "piloto",
      codigo: "src/components/ui/separator.tsx",
      story: "src/components/ui/separator.stories.tsx",
      vizinhos: ["field", "button-group", "dropdown-menu"],
    },
    whenToUseItems: ["Separar grupos dentro do mesmo container: blocos de um card, grupos de um painel.", "Separar itens lado a lado numa barra de texto: Blog | Documentação | Código-fonte."],
    whenNotToUse: ["Separar os itens de uma lista curta → espaço no container (gap-*, space-y-*).", "Separador dentro de menu, grupo de botões ou formulário, inclusive linha com texto (\"ou continue com\") → o da própria peça: DropdownMenuSeparator (dropdown-menu), ButtonGroupSeparator (button-group), FieldSeparator (field, que aceita texto).", "Marcar o começo de uma seção da página → um título (title) acima dela."],
    content: ["Não tem texto próprio. Para linha com texto, use FieldSeparator com uma ou duas palavras em minúsculas: \"ou\"."],
    accessibility: {
      keyboard: "Não recebe foco.",
      screenReader: "Com decorative (padrão), fica fora da árvore de acessibilidade. Com decorative={false}, é anunciado como separador.",
      focus: "Nenhum.",
      cautions: "A linha decorativa não precisa de contraste mínimo, mas nenhuma informação pode depender só dela. Seção de verdade se marca com título, não com a linha.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-border"] },
      { contexto: "Espaço", itens: ["h-px", "w-px"] },
    ],
  },
  skeleton: {
    description: "Placeholder com animação de pulso que antecipa o formato do conteúdo durante o carregamento. Reduz a percepção de espera simulando a estrutura visual da tela.",
    whenToUse: "Indicar carregamento assíncrono de dados quando a estrutura final do layout já é conhecida (cards, listas, textos). Preservar o espaço ocupado por imagens, títulos e blocos para evitar saltos de layout (CLS). Compor telas de carregamento estruturadas combinando formas retangulares, circulares e linhas de texto.",
    anatomy: [
      { part: "Skeleton", description: "Elemento raiz com data-slot=\"skeleton\", animação de pulso suave e fundo bg-accent" },
    ],
    variants: [],
    states: [
      { name: "Carregando", description: "Pulso contínuo com animate-pulse sobre fundo bg-accent com cantos rounded-md" },
    ],
    sizes: [],
    doGuidelines: ["Reproduza a geometria e a proporção do componente real que será exibido.", "Use rounded-full para avatares e rounded-md com alturas consistentes para blocos de texto.", "Agrupe múltiplos skeletons na mesma disposição do layout final com classes de grid ou flex."],
    dontGuidelines: ["Usar skeleton quando o tempo de resposta é quase instantâneo → renderize o conteúdo diretamente sem piscar.", "Usar skeleton quando a estrutura final do conteúdo for totalmente imprevisível → spinner.", "Manter o skeleton ativo indefinidamente quando a requisição falhar → exiba mensagem de erro com alert."],
    code: `import { Skeleton } from "@/components/ui/skeleton"

<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
</div>`,
    props: [
      { name: "className", type: "string", default: "—", description: "Classes do Tailwind para definir altura, largura e raio compatíveis com o conteúdo final" },
    ],
    meta: {
      nome: "Skeleton",
      camada: "primitive",
      status: "piloto",
      codigo: "src/components/ui/skeleton.tsx",
      story: "src/components/ui/skeleton.stories.tsx",
      vizinhos: ["spinner", "progress", "card"],
    },
    whenToUseItems: ["Indicar carregamento assíncrono de dados quando a estrutura final do layout já é conhecida (cards, listas, textos).", "Preservar o espaço ocupado por imagens, títulos e blocos para evitar saltos de layout (CLS).", "Compor telas de carregamento estruturadas combinando formas retangulares, circulares e linhas de texto."],
    whenNotToUse: ["Espera sem formato previsível ou quando a duração é indeterminada e rápida → spinner.", "Processo com porcentagem, etapas ou progresso numérico mensurável → progress.", "Estado de tela sem nenhum dado para exibir após o carregamento → empty."],
    content: ["Não tem texto próprio nem exibe caracteres legíveis.", "O tamanho e a proporção devem mimetizar a extensão média do texto ou imagem que substituirá.", "Em parágrafos simulados, a última linha deve ter largura menor para sugerir uma quebra de linha natural."],
    accessibility: {
      keyboard: "Não recebe foco. Fica fora da ordem de tabulação.",
      screenReader: "Não define papel nem aria-hidden: quem usa passa aria-hidden=\"true\" em cada placeholder e marca a área mãe com aria-busy=\"true\" (ou uma região viva discreta).",
      focus: "Não move nem retém o foco. O foco do usuário é mantido onde estava até que o conteúdo real termine de ser montado.",
      cautions: "A animação de pulso deve respeitar a preferência de movimento reduzido (prefers-reduced-motion), e a substituição do skeleton não pode causar saltos de layout (WCAG 2.3.3).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent"] },
      { contexto: "Raio", itens: ["rounded-md"] },
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
    doGuidelines: ["Use para selecionar um valor ou intervalo dentro de um range contínuo. Mostre o valor atual."],
    dontGuidelines: ["Não use slider para valores discretos com poucas opções — use Select ou Radio."],
    code: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[50]} max={100} step={1} />`,
    props: [
      { name: "value / defaultValue", type: "number[]", description: "Um valor = thumb único; dois valores = range." },
      { name: "min / max / step", type: "number", default: "0 / 100 / —", description: "Limites e granularidade." },
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"", description: "Direção do slider." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa interação." },
    ],
  },
  spinner: {
    description: "Um indicador que pode ser usado para mostrar um estado de carregamento.",
    whenToUse: "Use para sinalizar que uma ação está em andamento e o resultado ainda não está disponível.",
    anatomy: [
      { part: "Elemento raiz", description: "Ícone Loader2 girando (animate-spin), role=\"status\" e aria-label=\"Loading\" pra leitor de tela." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use para operações curtas ou quando o progresso não pode ser medido."],
    dontGuidelines: ["Não use spinner para operações previsíveis — use Progress. Não use sem texto de contexto."],
    code: `import { Spinner } from "@/components/ui/spinner"

<Spinner className="size-5" />`,
    props: [
      { name: "...props", type: "React.ComponentProps<\"svg\">", description: "Tamanho e cor via className (size-4, text-primary, etc.)." },
    ],
  },
  stepper: {
    description: "Indicador de progresso que guia o usuário através de um processo dividido em múltiplas etapas, mostrando quais já foram concluídas, qual está em andamento e quais ainda faltam.",
    whenToUse: "Use em formulários e assistentes (wizards) com múltiplas etapas, fluxos de onboarding, ou processos complexos divididos em etapas (ex.: checkout, configuração de conta).",
    anatomy: [
      { part: "Stepper (root)", description: "<ol data-slot=\"stepper\"> — controla `value` (índice 0-based da etapa atual) e `orientation`. Injeta o estado (completed/current/upcoming) de cada StepperItem filho via Context, pela posição do filho na lista de children — numeração automática, o chamador nunca passa um índice à mão. Também gera o conector entre etapas automaticamente (não é subcomponente exportado)." },
      { part: "StepperItem", description: "<li data-slot=\"stepper-item\" data-state> — uma etapa. Não recebe índice explícito; lê o próprio estado do Context injetado pelo Stepper pai." },
      { part: "StepperTrigger", description: "Elemento clicável (<button>) ou não (<div>) — decide sozinho com base em onValueChange estar presente no Stepper pai. Agrupa StepperIndicator + StepperTitle. Carrega aria-current=\"step\" na etapa atual." },
      { part: "StepperIndicator", description: "Círculo numerado — contorno neutro se upcoming, contorno --primary se current, preenchido --primary com ícone de check se completed." },
      { part: "StepperTitle", description: "Label textual da etapa." },
      { part: "Conector (interno)", description: "<li aria-hidden=\"true\" data-slot=\"stepper-separator\"> gerado pelo Stepper entre cada par de StepperItem — linha horizontal ou vertical, colorida em --primary quando a etapa anterior está completed." },
    ],
    variants: [],
    states: [
      { name: "Upcoming", description: "Etapa ainda não alcançada — indicador com contorno neutro (--border), número visível, título em --muted-foreground." },
      { name: "Current", description: "Etapa ativa — indicador com contorno --primary, aria-current=\"step\" no trigger." },
      { name: "Completed", description: "Etapa já concluída — indicador preenchido --primary com ícone de check (aria-hidden), conector adjacente também em --primary." },
      { name: "Clicável (opcional)", description: "Só quando Stepper recebe onValueChange — o trigger vira <button> real: focável via Tab, ativável via Enter/Space (comportamento nativo), com focus-visible:ring herdado do padrão do catálogo (mesmas classes de AccordionTrigger)." },
      { name: "Somente-leitura", description: "Sem onValueChange — trigger vira <div> não-interativo (não focável, sem cursor de ponteiro). Uso típico: mostrar progresso sem permitir navegação livre entre etapas." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const steps = ["Dados pessoais", "Endereço", "Confirmação"]

function Exemplo() {
  const [currentStep, setCurrentStep] = React.useState(0)

  return (
    <Stepper value={currentStep} onValueChange={setCurrentStep}>
      {steps.map((label) => (
        <StepperItem key={label}>
          <StepperTrigger>
            <StepperIndicator />
            <StepperTitle>{label}</StepperTitle>
          </StepperTrigger>
        </StepperItem>
      ))}
    </Stepper>
  )
}

// Orientação vertical
<Stepper value={1} orientation="vertical">...</Stepper>

// Somente-leitura (sem onValueChange — trigger não é clicável)
<Stepper value={0}>...</Stepper>`,
    props: [
      { name: "value", type: "number", description: "(Stepper) Índice (0-based) da etapa atual. Sempre controlado — sem modo não-controlado/defaultValue." },
      { name: "onValueChange", type: "(step: number) => void", description: "(Stepper) Callback disparado ao clicar numa etapa. Presença desta prop decide se StepperTrigger renderiza <button> (clicável) ou <div> (somente-leitura)." },
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"", description: "(Stepper) Direção do layout." },
      { name: "children", type: "React.ReactNode", description: "(StepperIndicator) Conteúdo do círculo quando a etapa não está completed. Default: número da etapa (step + 1). Ignorado quando completed (sempre mostra o ícone de check)." },
      { name: "...props", type: "React.ComponentProps<\"ol\"> | React.ComponentProps<\"li\"> | React.ComponentProps<\"button\"> | React.ComponentProps<\"span\">", description: "Demais atributos nativos do elemento raiz de cada subcomponente." },
    ],
  },
  "split-button": {
    description: "Combina um botão de ação primária com um menu suspenso de ações secundárias relacionadas, permitindo que o usuário acesse rapidamente a opção mais usada, com a opção de escolher outras ações relacionadas através de um menu.",
    whenToUse: "Use quando existe uma ação principal clara e mais frequente, mas também existem uma ou mais ações secundárias relacionadas que fazem sentido no mesmo lugar (ex: \"Salvar\" como principal, com \"Salvar como rascunho\"/\"Salvar e sair\" como secundárias). Não é substituto de um DropdownMenu genérico: o botão principal precisa executar uma ação por si só, sem abrir o menu. Se todas as opções tiverem peso igual (nenhuma é \"a ação mais comum\"), prefira um DropdownMenu simples ou um ButtonGroup com botões separados.",
    anatomy: [
      { part: "Elemento raiz", description: "ButtonGroup (já existente no catálogo) com data-slot=\"split-button\" sobrescrevendo o data-slot=\"button-group\" padrão — visual \"colado\" herdado de graça do ButtonGroup." },
      { part: "Botão de ação principal", description: "Button com label/icon/onClick repassados diretamente. Sempre a primeira peça do grupo." },
      { part: "Trigger do menu (ícone-only)", description: "Button size=\"icon\"/\"icon-sm\"/\"icon-lg\" dentro de DropdownMenuTrigger asChild, contendo <Icon name=\"keyboard_arrow_down\" />. Precisa de aria-label próprio (prop triggerLabel) por ser ícone-only." },
      { part: "Menu suspenso", description: "DropdownMenu + DropdownMenuContent (já existentes) — abre a partir do trigger, alinhamento controlável via prop align (default \"end\")." },
      { part: "Itens do menu", description: "Composição via children — DropdownMenuItem/DropdownMenuSeparator/DropdownMenuLabel etc., os mesmos subcomponentes já exportados por dropdown-menu.tsx." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Ação principal com maior ênfase visual (bg-primary)." },
      { name: "Secondary", value: "secondary", description: "Ênfase intermediária." },
      { name: "Outline", value: "outline", description: "Borda, sem preenchimento sólido." },
      { name: "Ghost", value: "ghost", description: "Sem superfície própria — sem borda, o efeito \"colado\" do ButtonGroup fica menos perceptível (mesma limitação inerente ao Button)." },
      { name: "Destructive", value: "destructive", description: "Ação principal destrutiva." },
      { name: "Link", value: "link", description: "Texto puro — mesma nota de \"ghost\" acima sobre o efeito \"colado\"." },
    ],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Hover", description: "Herdado do Button — cada botão (principal e trigger) reage independentemente." },
      { name: "Focus", description: "Herdado do Button (focus-visible:ring) — o [&>*]:focus-visible:z-10 do ButtonGroup garante que o anel de foco não fica cortado pelo botão vizinho colado." },
      { name: "Disabled", description: "prop disabled na raiz — desativa o botão principal e o trigger do menu juntos." },
      { name: "Menu aberto/fechado", description: "Controlado internamente pelo DropdownMenu/Radix — sem prop de controle externo." },
    ],
    sizes: [
      { name: "Small", value: "sm", description: "Botão principal size sm; trigger deriva icon-sm." },
      { name: "Default", value: "default", description: "Botão principal size default; trigger deriva icon." },
      { name: "Large", value: "lg", description: "Botão principal size lg; trigger deriva icon-lg." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { SplitButton } from "@/components/ui/split-button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

<SplitButton label="Salvar" onClick={handleSave}>
  <DropdownMenuItem onClick={handleSaveAsDraft}>
    <Icon name="draft" />
    Salvar como rascunho
  </DropdownMenuItem>
  <DropdownMenuItem onClick={handleSaveAndExit}>
    <Icon name="logout" />
    Salvar e sair
  </DropdownMenuItem>
</SplitButton>`,
    props: [
      { name: "label", type: "React.ReactNode", description: "Texto da ação principal — nome acessível do botão principal (obrigatório)." },
      { name: "icon", type: "React.ReactNode", description: "Ícone opcional antes do label, na ação principal." },
      { name: "onClick", type: "() => void", description: "Handler da ação principal." },
      { name: "variant", type: "\"default\" | \"secondary\" | \"outline\" | \"ghost\" | \"destructive\" | \"link\"", default: "\"default\"", description: "Estilo visual — aplicado ao botão principal e ao trigger do menu." },
      { name: "size", type: "\"default\" | \"sm\" | \"lg\"", default: "\"default\"", description: "Tamanho do botão principal; o trigger deriva o size ícone-only correspondente." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa toda a composição (botão principal + trigger do menu)." },
      { name: "triggerLabel", type: "string", default: "\"Mais ações\"", description: "aria-label do botão-trigger do menu (ícone-only)." },
      { name: "align", type: "\"start\" | \"center\" | \"end\"", default: "\"end\"", description: "Alinhamento do menu suspenso em relação ao trigger." },
      { name: "children", type: "React.ReactNode", description: "Itens do menu, compostos via DropdownMenuItem/DropdownMenuSeparator/etc (obrigatório)." },
      { name: "className", type: "string", description: "Aplicado ao ButtonGroup raiz." },
      { name: "...props", type: "Omit<React.ComponentProps<typeof ButtonGroup>, \"children\" | \"orientation\">", description: "Demais atributos nativos repassados ao ButtonGroup raiz." },
    ],
  },
  switch: {
    description: "Um controle que permite ao usuário alternar entre ativado e desativado.",
    whenToUse: "Use para ativar ou desativar uma configuração imediatamente, sem precisar de um botão de confirmação separado.",
    anatomy: [
      { part: "Root", description: "SwitchPrimitive.Root — trilho (data-state=checked altera a cor de fundo)." },
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
    doGuidelines: ["Use para ativar/desativar uma configuração com efeito imediato, sem confirmação."],
    dontGuidelines: ["Não use switch para ações que exigem salvamento — use Button. Não use para selecionar itens — use Checkbox."],
    code: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Switch id="notificacoes" defaultChecked />
  <Label htmlFor="notificacoes">Notificações</Label>
</div>`,
    props: [
      { name: "checked / defaultChecked", type: "boolean", description: "Estado controlado ou inicial." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback de mudança." },
      { name: "size", type: "\"sm\" | \"default\"", default: "\"default\"", description: "Dimensão do switch." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa interação." },
    ],
  },
  tag: {
    description: "Categoriza informação, organiza ou indica o status de elementos usando palavras-chave, ícones ou cores.",
    whenToUse: "Use para categorizar informação de forma estática — rótulo fixo, não removível (ex.: categoria de um item, status de um registro). Não confunda com componentes vizinhos: use Chip para representar um critério de filtro/busca ativo, tipicamente removível; use Badge para reportar contagem de itens pendentes/status pontual. Tag é especificamente para categorização estática, sem botão de remover, sem interatividade própria.",
    anatomy: [
      { part: "Elemento raiz", description: "Um <span> (ou o filho, via asChild) com data-slot=\"tag\" e data-variant. Não é interativo por padrão — sem foco, sem onClick próprio." },
      { part: "Conteúdo (ícone opcional + label)", description: "Via children — não existe prop icon dedicada. Ícone, quando usado, é composto livremente junto do texto (ex.: <Tag><Icon name=\"sell\" />Promoção</Tag>). Tamanho de ícone herdado via [&>svg]:size-3." },
      { part: "Skeleton (Tag.Skeleton)", description: "Placeholder de carregamento com o mesmo formato do tag real, pra evitar layout shift." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Fundo --muted, borda --border, texto --muted-foreground — aparência neutra padrão. Sem escala de 10 passos própria (só existe pra info/success/warning/danger), por isso reaproveita os tokens semânticos neutros já existentes em vez de uma escala nova." },
      { name: "Primary", value: "primary", description: "Fundo --accent, borda --primary/20 (opacidade baixa, sutil), texto --primary — cor de marca do preset ativo. --primary não tem variação clara/escura própria (é um valor único por preset), por isso o fundo usa --accent (o tom \"claro\" de destaque que cada preset já define) em vez de uma escala nova." },
      { name: "Success", value: "success", description: "Fundo --color-success-100, borda --color-success-300, texto --color-success-900 — três passos da mesma escala de 10, sinaliza status positivo (ex.: aprovado)." },
      { name: "Warning", value: "warning", description: "Fundo --color-warning-100, borda --color-warning-300, texto --color-warning-900 — sinaliza status de atenção (ex.: pendente)." },
      { name: "Danger", value: "danger", description: "Fundo --color-danger-100, borda --color-danger-300, texto --color-danger-900 — sinaliza status negativo (ex.: recusado)." },
      { name: "AI Generated", value: "ai-generated", description: "Fundo --ai-surface, borda --ai-interactive, texto --ai-text-high — sinaliza que o valor do tag foi gerado por IA. Mesmos tokens que o Chip variant ai-generated já usa. Foi a referência original desse padrão (fundo claro + borda + texto), replicado agora pras demais variantes." },
    ],
    states: [
      { name: "Default", description: "Estado de repouso — único estado real do componente. Tag não recebe foco e não tem hover/disabled próprios." },
      { name: "Highlight", description: "Prop highlight=true inverte fundo⇄texto de QUALQUER variant de cor (ex.: danger normal = fundo claro/texto escuro; danger highlight = fundo escuro/texto claro) e remove a borda — a própria superfície escura da escala já faz o destaque, sem precisar de contorno. Combinável com qualquer variant, não é uma variante fixa separada." },
      { name: "Composição via asChild", description: "Quando usado com asChild para tornar o Tag clicável, hover/focus/disabled passam a ser responsabilidade do elemento filho." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Tag } from "@/components/ui/tag"
import { Icon } from "@/components/ui/icon"

// Tag simples (categorização estática)
<Tag>Categoria: Roupas</Tag>

// Variantes de status — fundo claro + borda + texto, mesma paleta de tom
<Tag variant="primary">Novidade</Tag>
<Tag variant="success">Aprovado</Tag>
<Tag variant="warning">Pendente</Tag>
<Tag variant="danger">Recusado</Tag>

// highlight inverte fundo⇄texto e remove a borda — funciona com
// qualquer variant, não é uma variante fixa
<Tag variant="danger" highlight>Em destaque</Tag>

// Tag com ícone composto via children (sem prop icon dedicada)
<Tag variant="ai-generated">
  <Icon name="sell" />
  Sugestão gerada por IA
</Tag>

// Placeholder de carregamento
<Tag.Skeleton />`,
    props: [
      { name: "children", type: "React.ReactNode", description: "Conteúdo do tag — texto e, opcionalmente, um ícone composto junto (obrigatório)." },
      { name: "variant", type: "\"default\" | \"primary\" | \"success\" | \"warning\" | \"danger\" | \"ai-generated\"", default: "\"default\"", description: "Aparência visual do tag — sempre fundo claro + borda + texto, na mesma paleta de tom." },
      { name: "highlight", type: "boolean", default: "false", description: "Inverte fundo⇄texto do variant ativo e remove a borda, pra destacar o tag sem trocar de variant." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza as props no elemento filho (via Radix Slot) em vez de <span>." },
      { name: "...props", type: "React.ComponentProps<\"span\">", description: "Demais atributos nativos do elemento raiz." },
    ],
  },
  text: {
    description: "Formata blocos de texto e parágrafos com escala tipográfica e peso definidos. Garante a semântica correta com a tag HTML adequada.",
    whenToUse: "Parágrafos de texto corrido ou blocos de descrição em páginas, cards e diálogos. Trechos de texto dentro de outros blocos que precisam de formatação visual diferenciada. Legendas, notas de rodapé ou metadados auxiliares usando tamanho reduzido.",
    anatomy: [
      { part: "Text", description: "Elemento textual raiz que aplica as variantes de tamanho, peso e cor atenuada" },
    ],
    variants: [],
    states: [],
    sizes: [
      { name: "caption", value: "caption", description: "— — Texto auxiliar, legendas e notas de apoio" },
      { name: "base", value: "base", description: "— — Corpo de texto padrão para leitura" },
      { name: "highlight", value: "highlight", description: "— — Destaque visual ou parágrafos introdutórios" },
    ],
    doGuidelines: ["Defina o elemento HTML adequado via prop as para preservar a semântica.", "Mantenha o tamanho base como padrão para parágrafos e corpo de texto.", "Aplique muted apenas em textos que possuem papel secundário ou auxiliar."],
    dontGuidelines: ["Text como parágrafo longo em negrito constante → weight regular com ênfase pontual", "Text com tamanho caption para corpo principal de leitura → size base", "Estilização de cor arbitrária fora do sistema de tokens → prop muted ou token semântico"],
    code: `import { Text } from "@/components/ui/text"

<Text>
  Texto de corpo padrão para leitura e formatação de blocos de conteúdo.
</Text>`,
    props: [
      { name: "size", type: "caption · base · highlight", default: "base", description: "Tamanho do texto na escala tipográfica" },
      { name: "weight", type: "regular · medium · bold", default: "regular", description: "Peso da fonte aplicado" },
      { name: "muted", type: "true · false", default: "false", description: "Aplica cor atenuada para texto secundário" },
      { name: "as", type: "TextElement", default: "p", description: "Tag HTML real renderizada" },
    ],
    meta: {
      nome: "Text",
      camada: "primitive",
      status: "piloto",
      codigo: "src/components/ui/text.tsx",
      story: "src/components/ui/text.stories.tsx",
      vizinhos: ["title", "label", "link"],
    },
    whenToUseItems: ["Parágrafos de texto corrido ou blocos de descrição em páginas, cards e diálogos.", "Trechos de texto dentro de outros blocos que precisam de formatação visual diferenciada.", "Legendas, notas de rodapé ou metadados auxiliares usando tamanho reduzido."],
    whenNotToUse: ["Títulos e subtítulos estruturais de páginas ou seções → title", "Rótulo descritivo conectado a um controle de formulário → label", "Elemento textual interativo que dispara ação ou navegação → link"],
    content: ["Inicie frases completas em maiúscula e finalize com pontuação: \"As configurações foram atualizadas.\"", "Mantenha legendas e textos auxiliares concisos: \"Formatos aceitos: PDF e PNG.\"", "Use a variante muted para informações secundárias ou complementares."],
    accessibility: {
      keyboard: "Não recebe foco.",
      screenReader: "Anunciado como texto estático conforme a semântica da tag informada na prop as.",
      focus: "Não retém nem recebe foco.",
      cautions: "Use as=\"p\" para blocos e as=\"span\" para trechos em linha; nunca use para substituir títulos estruturais (critério WCAG 1.3.1).",
    },
    tokens: [
      { contexto: "Cor", itens: ["text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-bold", "font-medium", "font-normal", "text-base", "text-sm", "text-xs"] },
    ],
  },
  textarea: {
    description: "Exibe uma área de texto (textarea) de formulário ou um componente com aparência de textarea.",
    whenToUse: "Use para capturar textos mais longos, como comentários, descrições ou mensagens.",
    anatomy: [
      { part: "Elemento raiz", description: "Um <textarea> com field-sizing-content — cresce com o conteúdo até o min-h-16." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Focus", description: "focus-visible:border-ring + ring." },
      { name: "Disabled", description: "cursor not-allowed, opacidade reduzida." },
      { name: "Aria-invalid", description: "Borda e ring em --destructive." },
    ],
    sizes: [],
    doGuidelines: ["Use para entrada de texto com múltiplas linhas. Defina altura mínima adequada ao conteúdo."],
    dontGuidelines: ["Não use textarea para textos curtos de uma linha — use Input."],
    code: `import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Escreva uma mensagem..." />`,
    props: [
      { name: "label", type: "React.ReactNode", description: "Rótulo renderizado internamente via Label. Ausente = comportamento idêntico ao anterior, sem wrapper." },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Com label presente, ativa o padrão de label flutuante (motion) em vez da label fixa acima do campo." },
      { name: "...props", type: "React.ComponentProps<\"textarea\">", description: "Todos os atributos nativos de <textarea>." },
    ],
  },
  thumbnail: {
    description: "O Thumbnail serve para exibir miniaturas de imagem, com um container de cantos arredondados para apresentar conteúdo visual.",
    whenToUse: "Use para visualização de imagem de produto, exibição em galeria de imagens ou apresentação de foto em detalhe de pedido/anexo. Sem dimensões fixas — altura e largura são customizáveis, sempre respeitando a proporção escolhida para não distorcer a imagem.",
    anatomy: [
      { part: "Elemento raiz", description: "Um <div> com data-slot=\"thumbnail\" e data-size, controla o tamanho (largura) via cva." },
      { part: "Wrapper de proporção", description: "AspectRatio (Radix, mesmo componente de aspect-ratio.tsx) — mantém a proporção (ratio numérico) sem distorcer a imagem." },
      { part: "Imagem", description: "Um <img> nativo com data-slot=\"thumbnail-image\", object-cover, tratamento de erro via onError." },
      { part: "Fallback", description: "Mostrado quando src está vazio/ausente ou a imagem falha ao carregar. <div role=\"img\" aria-label={alt}>, sem ícone — só a cor de fundo do token --muted." },
      { part: "Conteúdo sobreposto (opcional)", description: "children — nó sobreposto à imagem (ex.: badge de status), via composição." },
      { part: "Skeleton (Thumbnail.Skeleton)", description: "Placeholder de carregamento com o mesmo tamanho e proporção do thumbnail real, evita layout shift." },
    ],
    variants: [],
    states: [
      { name: "Default (carregado)", description: "Imagem exibida via <img>, preenchendo o container mantendo a proporção (object-cover)." },
      { name: "Fallback", description: "Ativado quando src está vazio/ausente OU a imagem falha ao carregar (onError). Mostra só a cor de fundo --muted, sem ícone, mantendo role=\"img\" + aria-label={alt}." },
      { name: "Loading (placeholder)", description: "Thumbnail.Skeleton — mesmo tamanho/proporção do estado carregado, evita layout shift." },
    ],
    sizes: [
      { name: "Small", value: "sm", description: "Largura w-16 (4rem / 64px)." },
      { name: "Default", value: "default", description: "Largura w-24 (6rem / 96px)." },
      { name: "Large", value: "lg", description: "Largura w-40 (10rem / 160px)." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Thumbnail } from "@/components/ui/thumbnail"

// Miniatura padrão (1:1, tamanho default)
<Thumbnail src="/produto.jpg" alt="Camiseta azul, vista frontal" />

// Tamanho pequeno, proporção widescreen
<Thumbnail
  src="/capa-video.jpg"
  alt="Capa do vídeo de instalação"
  size="sm"
  aspectRatio="16/9"
/>

// Sem src (ou falha ao carregar) — cai no fallback automaticamente
<Thumbnail src="" alt="Anexo sem preview disponível" size="lg" />

// Placeholder de carregamento
<Thumbnail.Skeleton size="lg" aspectRatio="16/9" />`,
    props: [
      { name: "src", type: "string", description: "Origem da imagem. Vazio/ausente aciona o fallback direto." },
      { name: "alt", type: "string", description: "Nome acessível da imagem (obrigatório). Usado também como aria-label do fallback." },
      { name: "size", type: "\"sm\" | \"default\" | \"lg\"", default: "\"default\"", description: "Largura do thumbnail." },
      { name: "aspectRatio", type: "\"1/1\" | \"4/3\" | \"3/4\" | \"16/9\" | \"9/16\" | \"2/1\" | \"1/2\"", default: "\"1/1\"", description: "Proporção largura/altura." },
      { name: "children", type: "React.ReactNode", description: "Conteúdo sobreposto à imagem (ex.: badge)." },
      { name: "...props", type: "Omit<React.ComponentProps<\"img\">, \"className\" | \"alt\">", description: "Demais atributos nativos de <img> (loading, decoding, crossOrigin, onError...)." },
    ],
  },
  "time-picker": {
    description: "Permite que o usuário selecione um horário (hora e minuto), com suporte a formato 24h ou 12h com AM/PM.",
    whenToUse: "Use quando o usuário precisar informar um horário específico (ex: horário de um agendamento, de uma notificação, de um evento). Para datas, use Calendar/DatePicker — TimePicker cobre só a parte de hora:minuto.",
    anatomy: [
      { part: "Trigger", description: "Um <Button variant=\"outline\"> com <Icon name=\"calendar_today\" /> e o horário formatado (ou o placeholder em text-muted-foreground quando vazio), dentro de um PopoverTrigger asChild." },
      { part: "PopoverContent", description: "Linha com 2 ou 3 Selects (Hora, Minuto e, quando format=\"12h\", Período), cada um com um rótulo de texto pequeno acima." },
      { part: "Select Hora", description: "Lista \"00\"–\"23\" (format 24h) ou \"1\"–\"12\" (format 12h), sempre exibida com 2 dígitos." },
      { part: "Select Minuto", description: "Lista de 0 a <60 em incrementos de minuteStep (default 5)." },
      { part: "Select Período", description: "Só existe quando format=\"12h\" — AM ou PM." },
    ],
    variants: [],
    states: [
      { name: "Vazio", description: "value ausente/inválido — trigger mostra placeholder, Selects mostram \"--\"." },
      { name: "Preenchido", description: "value válido — trigger mostra o horário formatado conforme format." },
      { name: "Aberto", description: "Popover aberto — não fecha sozinho ao escolher hora/minuto (escolha composta em 2-3 passos), só fecha por Escape/clique fora/novo clique no trigger." },
      { name: "Disabled", description: "prop disabled — desativa o trigger (não abre o Popover) e os Selects internos." },
      { name: "Foco", description: "Retorna ao trigger ao fechar o Popover — comportamento nativo do Radix Popover." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import * as React from "react"
import { TimePicker } from "@/components/ui/time-picker"

function Exemplo() {
  const [time, setTime] = React.useState<string | undefined>("14:30")

  return <TimePicker value={time} onValueChange={setTime} />
}

// Formato 12h com AM/PM
<TimePicker value={time} onValueChange={setTime} format="12h" />

// Minutos de 15 em 15
<TimePicker value={time} onValueChange={setTime} minuteStep={15} />

// Desabilitado
<TimePicker value="09:00" disabled />`,
    props: [
      { name: "value", type: "string", description: "Horário controlado, sempre em \"HH:mm\" 24h (ex.: \"14:30\"), independente do format de exibição." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback disparado ao escolher hora/minuto/período, com o value já recomposto em \"HH:mm\" 24h." },
      { name: "format", type: "\"24h\" | \"12h\"", default: "\"24h\"", description: "Formato de exibição/seleção — o value armazenado continua sempre 24h em qualquer um dos dois." },
      { name: "minuteStep", type: "number", default: "5", description: "Intervalo entre minutos selecionáveis (1–60)." },
      { name: "placeholder", type: "string", default: "\"Selecione um horário\"", description: "Texto do trigger quando value está vazio." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o trigger e os Selects internos." },
      { name: "className", type: "string", description: "Classes aplicadas ao Button de trigger." },
      { name: "contentClassName", type: "string", description: "Classes aplicadas ao PopoverContent." },
      { name: "...props", type: "React.ComponentProps<\"button\">", description: "Demais atributos nativos repassados ao Button de trigger (exceto value/onChange/children)." },
    ],
  },
  title: {
    description: "Aplica hierarquia visual e semântica a cabeçalhos e títulos de páginas ou seções. Permite desacoplar a tag HTML semântica da escala visual aplicada.",
    whenToUse: "Títulos de páginas ou telas principais usando h1 semântico. Cabeçalhos de seções, blocos de conteúdo e grupos em páginas ou painéis. Títulos de caixas de diálogo, cards ou painéis laterais que precisam de destaque visual específico.",
    anatomy: [
      { part: "Title", description: "Elemento raiz h1 a h6 que renderiza o título com a escala visual escolhida" },
    ],
    variants: [],
    states: [],
    sizes: [
      { name: "h1", value: "h1", description: "— — Título principal da página ou tela" },
      { name: "h2", value: "h2", description: "— — Seções principais dentro de uma página" },
      { name: "h3", value: "h3", description: "— — Subseções e blocos de conteúdo agrupados" },
      { name: "h4", value: "h4", description: "— — Cabeçalhos de cards e painéis médios" },
      { name: "h5", value: "h5", description: "— — Títulos de pequenos grupos ou listas" },
      { name: "h6", value: "h6", description: "— — Menor nível de cabeçalho para agrupamentos pontuais" },
    ],
    doGuidelines: ["Use a prop as para estruturar a árvore semântica do documento em ordem lógica.", "Mantenha apenas um título h1 por página para clareza em leitores de tela e SEO.", "Ajuste a prop size quando um cabeçalho secundário demandar peso visual diferente do padrão."],
    dontGuidelines: ["Pular níveis na hierarquia semântica (como h1 direto para h4) → ordenação sequencial de as", "Usar Title para parágrafos corridos em busca de destaque visual → text com weight bold", "Criar títulos em caixa alta integral por meio de digitação manual → estilo visual controlado"],
    code: `import { Title } from "@/components/ui/title"

<Title as="h1">Painel principal</Title>
<Title as="h2" size="h3">Visão geral</Title>`,
    props: [
      { name: "size", type: "h1 · h2 · h3 · h4 · h5 · h6", default: "h2", description: "Escala visual aplicada ao título" },
      { name: "as", type: "TitleElement", default: "h2", description: "Tag HTML semântica renderizada no documento" },
    ],
    meta: {
      nome: "Title",
      camada: "primitive",
      status: "piloto",
      codigo: "src/components/ui/title.tsx",
      story: "src/components/ui/title.stories.tsx",
      vizinhos: ["text", "label", "separator"],
    },
    whenToUseItems: ["Títulos de páginas ou telas principais usando h1 semântico.", "Cabeçalhos de seções, blocos de conteúdo e grupos em páginas ou painéis.", "Títulos de caixas de diálogo, cards ou painéis laterais que precisam de destaque visual específico."],
    whenNotToUse: ["Corpo de texto, parágrafos explicativos ou descrições longas → text", "Rótulo descritivo conectado a um controle de formulário → label", "Linha divisória visual sem texto de cabeçalho → separator"],
    content: ["Títulos devem ser curtos, objetivos e começar com letra maiúscula: \"Dados cadastrais\"", "Não utilize ponto final em títulos ou subtítulos.", "Mantenha consistência gramatical entre títulos do mesmo nível hierárquico na tela."],
    accessibility: {
      keyboard: "Não recebe foco.",
      screenReader: "Anunciado com o nível de cabeçalho semântico definido pela prop as.",
      focus: "Não retém nem recebe foco.",
      cautions: "Mantenha a ordem hierárquica semântica sem pular níveis no documento (h1 antes de h2, h2 antes de h3), mesmo se divergir a escala visual com a prop size (critério WCAG 1.3.1 e 2.4.6).",
    },
    tokens: [
      { contexto: "Cor", itens: ["text-foreground"] },
      { contexto: "Tipografia", itens: ["font-bold", "font-heading", "font-semibold", "text-2xl", "text-3xl", "text-4xl", "text-base", "text-lg", "text-xl", "tracking-tight"] },
    ],
  },
  toggle: {
    description: "Um botão de dois estados, que pode estar ativado ou desativado.",
    whenToUse: "Use para uma ação isolada com estado binário, como favoritar ou negrito/itálico numa toolbar, sem formar um grupo.",
    anatomy: [
      { part: "Elemento raiz", description: "TogglePrimitive.Root — data-state=\"on\"/\"off\"." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Fundo transparente até ativar." },
      { name: "Outline", value: "outline", description: "Contorno visível mesmo desativado." },
    ],
    states: [
      { name: "Off", description: "data-state=off — estado de repouso, font-normal (400) e --icon-fill:0 fixado (ícone em contorno, independente do preset ativo)." },
      { name: "On", description: "data-state=on — bg-accent, font-bold (700) e --icon-fill:1 fixado (ícone preenchido). Contorno↔preenchido é característica do Toggle, não do preset — os dois estados sobrescrevem --icon-fill explicitamente, então o comportamento é igual em todos os presets, mesmo nos que definem --icon-fill:1 como padrão global (ex.: preset soft). Funciona automaticamente em qualquer <Icon> passado como children, desde que ele não receba a prop fill fixa (aí ela sempre vence a CSS var)." },
      { name: "Focus", description: "focus-visible:ring." },
      { name: "Disabled", description: "opacidade reduzida, sem interação." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "h-8 min-w-8." },
      { name: "default", value: "default", description: "h-9 min-w-9." },
      { name: "lg", value: "lg", description: "h-10 min-w-10." },
    ],
    doGuidelines: ["Use para alternar entre dois estados com efeito imediato."],
    dontGuidelines: ["Não use toggle para formulários que exigem salvamento explícito."],
    code: `import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Negrito">
  Negrito
</Toggle>`,
    props: [
      { name: "variant", type: "\"default\" | \"outline\"", default: "\"default\"", description: "Estilo visual." },
      { name: "size", type: "\"default\" | \"sm\" | \"lg\"", default: "\"default\"", description: "Dimensão." },
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
    doGuidelines: ["Use para revelar informação adicional breve ao passar o mouse ou receber foco."],
    dontGuidelines: ["Não use tooltip para informação crítica ou essencial — deve estar visível sempre. Não use para ações interativas."],
    code: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>Conteúdo do tooltip</TooltipContent>
</Tooltip>`,
    props: [
      { name: "side", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", default: "\"top\"", description: "(TooltipContent) lado preferido de exibição." },
      { name: "sideOffset", type: "number", default: "0", description: "Distância do trigger." },
      { name: "align", type: "\"start\" | \"center\" | \"end\"", default: "\"center\"", description: "Alinhamento em relação ao trigger." },
    ],
  },
  "aspect-ratio": {
    description: "Exibe conteúdo dentro de uma proporção desejada.",
    whenToUse: "Use para manter a proporção de imagens, vídeos ou embeds ao redimensionar o layout.",
    anatomy: [
      { part: "Elemento raiz", description: "AspectRatioPrimitive.Root — wrapper que reserva o espaço proporcional pro conteúdo filho (ex: uma imagem)." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use para manter proporção consistente em imagens, vídeos e embeds."],
    dontGuidelines: ["Não use aspect-ratio para conteúdo que precisa se adaptar livremente ao container."],
    code: `import { AspectRatio } from "@/components/ui/aspect-ratio"

<AspectRatio ratio={16 / 9}>
  <img src="/foto.jpg" alt="" className="size-full rounded-md object-cover" />
</AspectRatio>`,
    props: [
      { name: "ratio", type: "number", default: "1", description: "Proporção largura/altura (ex: 16 / 9)." },
    ],
  },
  "tree-select": {
    description: "Campo de seleção em árvore: escolhe valores de uma lista hierárquica dentro de um painel flutuante. Tem três variações: single (um valor), multiple (vários valores, nó a nó) e checkable (vários valores com caixa de marcação e cascata pai/filhos).",
    whenToUse: "Use quando as opções têm hierarquia (grupo > item) e o usuário precisa escolher entre elas. Prefira checkable quando marcar um grupo deve marcar tudo dentro dele; multiple quando cada nó é independente; single para um valor só. Para listas planas, use Select (um valor) ou MultiSelect (vários).",
    anatomy: [
      { part: "TreeSelect", description: "Elemento único — API monolítica. Compõe Popover + Checkbox; não usa Select/Combobox porque nenhum modela hierarquia." },
      { part: "Campo", description: "Gatilho com role=combobox. Em single mostra o rótulo escolhido; em multiple/checkable mostra tags removíveis." },
      { part: "Árvore", description: "role=tree dentro do painel. Cada nó é um treeitem com seta de expandir/recolher e, em checkable, uma caixa de marcação." },
      { part: "Busca", description: "Campo no topo do painel que filtra a árvore (showSearch, ligado por padrão)." },
      { part: "Rodapé", description: "Só checkable: contador de marcados e ações Todos / Limpar." },
      { part: "TreeSelect.Skeleton", description: "Placeholder de carregamento." },
    ],
    variants: [
      { name: "single", value: "single", description: "Um valor. Clicar num nó escolhe e fecha o painel; pais também são escolhíveis." },
      { name: "multiple", value: "multiple", description: "Vários valores sem relação pai/filho; o painel fica aberto." },
      { name: "checkable", value: "checkable", description: "Caixa de marcação com cascata: marcar o pai marca os filhos; marcar todos os filhos marca o pai; parcial = indeterminado." },
    ],
    states: [
      { name: "Vazio", description: "Mostra o placeholder." },
      { name: "Com seleção", description: "Rótulo (single) ou tags removíveis (multiple/checkable)." },
      { name: "Aberto", description: "Painel com a árvore; nós expandem/recolhem por clique ou setas ←/→." },
      { name: "Indeterminado", description: "Só em checkable: pai com parte dos filhos marcados." },
      { name: "Nó desabilitado", description: "Não pode ser escolhido e não entra na cascata do pai." },
      { name: "Disabled", description: "Campo inteiro desativado." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import * as React from "react"
import { TreeSelect } from "@/components/ui/tree-select"

const ramos = [
  { value: "patrimonial", label: "Patrimonial", children: [
    { value: "auto", label: "Auto" },
    { value: "residencial", label: "Residencial" },
  ] },
  { value: "pet", label: "Pet" },
]

function Exemplo() {
  const [value, setValue] = React.useState<string[]>(["auto"])

  return (
    <TreeSelect
      checkable
      treeData={ramos}
      value={value}
      onValueChange={setValue}
      showCheckedStrategy="parent"
      defaultExpandAll
      aria-label="Ramos de seguro"
    />
  )
}`,
    props: [
      { name: "treeData", type: "{ label: string; value: string; children?: …[]; disabled?: boolean; exclusive?: boolean; closeOnClick?: boolean }[]", description: "Árvore de opções (obrigatório). Só checkable: exclusive faz o nó ser marcado sozinho (desmarca os demais e é desmarcado quando outro nó é marcado); closeOnClick fecha o painel ao clicar no nó." },
      { name: "value", type: "string | null | string[]", description: "Controlado. single: string | null; multiple/checkable: string[]. Em checkable aceita folhas e/ou pais." },
      { name: "onValueChange", type: "(value) => void", description: "Em checkable devolve sempre as folhas marcadas." },
      { name: "multiple", type: "boolean", default: "false", description: "Vários valores, nó a nó." },
      { name: "checkable", type: "boolean", default: "false", description: "Caixas de marcação com cascata pai/filhos (implica multiple)." },
      { name: "showCheckedStrategy", type: "\"child\" | \"parent\" | \"all\"", default: "\"child\"", description: "Só checkable. Como as marcações aparecem no campo." },
      { name: "defaultExpandAll", type: "boolean", default: "false", description: "Abre com todos os nós expandidos." },
      { name: "defaultExpandedValues", type: "string[]", description: "Nós expandidos no primeiro render." },
      { name: "placeholder", type: "string", default: "\"Selecione...\"", description: "Texto com o campo vazio." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o campo." },
      { name: "aria-label", type: "string", description: "Nome acessível do campo e da árvore." },
      { name: "showSearch", type: "boolean", default: "true", description: "Campo de busca no topo do painel." },
      { name: "allowClear", type: "boolean", default: "false", description: "Botão de limpar a seleção (X) no campo." },
      { name: "maxTagCount", type: "number", description: "Multiple/checkable: máximo de tags visíveis no campo; o resto vira +N." },
      { name: "emptyText", type: "string", default: "\"Nenhum resultado encontrado.\"", description: "Texto quando a busca não encontra nós." },
      { name: "dropdownClassName", type: "string", description: "Classes extras para o painel flutuante." },
      { name: "searchPlaceholder", type: "string", default: "\"Buscar...\"", description: "Texto do campo de busca. Use para o vocabulário do produto." },
      { name: "selectAllLabel", type: "string", default: "\"Todos\"", description: "Só checkable: rótulo da ação que marca todas as folhas." },
      { name: "selectedCountText", type: "(count: number) => string", default: "\"Nenhum item selecionado\" / \"N selecionado(s)\"", description: "Só checkable: frase do contador no rodapé." },
    ],
  },
  "multi-select": {
    description: "Campo de seleção múltipla: permite escolher mais de uma opção de uma lista, exibindo cada escolha como um chip removível dentro do próprio campo.",
    whenToUse: "Use quando o usuário precisar escolher mais de uma opção de uma lista de opções pré-definidas, com as seleções visíveis e removíveis individualmente sem reabrir a lista completa. Não confunda com componentes vizinhos: use Select quando só uma opção pode ser escolhida por vez; use Combobox em modo single para buscar-e-escolher um único valor com autocompletar.",
    anatomy: [
      { part: "MultiSelect", description: "Elemento único — API monolítica (como o @nimbus-ds/multi-select real), sem subcomponentes de composição livre. Internamente compõe Combobox (multiple) + ComboboxChips + ComboboxChip + ComboboxChipsInput + ComboboxContent + ComboboxList + ComboboxItem + ComboboxEmpty de combobox.tsx." },
      { part: "Campo de chips + busca", description: "ComboboxChips — <div> com borda e anel de foco, contém um chip por valor selecionado e o campo de texto de busca. Ancorado via useComboboxAnchor para o painel abrir relativo a este container." },
      { part: "Chip de seleção", description: "ComboboxChip, um por valor selecionado, com botão de remover próprio — clique ou Backspace (campo vazio) remove a última seleção." },
      { part: "Campo de busca", description: "ComboboxChipsInput — filtra as opções por texto (compara contra o label, via itemToStringLabel). Mostra placeholder só quando não há seleção." },
      { part: "Painel de opções", description: "ComboboxContent > ComboboxList > ComboboxItem — lista flutuante das opções que batem com o filtro, com indicador de check quando selecionada." },
      { part: "Estado vazio", description: "ComboboxEmpty — mensagem exibida quando a busca não encontra nenhuma opção (prop emptyText)." },
      { part: "MultiSelect.Skeleton", description: "Placeholder de carregamento, mesmo mecanismo de Chip.Skeleton/Button.Skeleton." },
    ],
    variants: [],
    states: [
      { name: "Vazio (sem seleção)", description: "Mostra o placeholder." },
      { name: "Com seleções", description: "Cada valor selecionado aparece como chip; placeholder some." },
      { name: "Aberto", description: "Painel de opções visível, ancorado no campo de chips." },
      { name: "Item em destaque", description: "Navegação por teclado dentro do painel (herdado do Combobox)." },
      { name: "Busca sem resultado", description: "ComboboxEmpty visível com o texto de emptyText." },
      { name: "Disabled", description: "Campo, chips e busca desativados (prop disabled)." },
      { name: "Removendo um chip", description: "Clique no botão \"x\" do chip ou Backspace com o campo de busca vazio remove a última seleção — comportamento nativo do ComboboxChips." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import * as React from "react"
import { MultiSelect } from "@/components/ui/multi-select"

const ramos = [
  { value: "auto", label: "Auto" },
  { value: "residencial", label: "Residencial" },
  { value: "vida", label: "Vida" },
]

function Exemplo() {
  const [value, setValue] = React.useState<string[]>(["auto", "vida"])

  return (
    <MultiSelect
      options={ramos}
      value={value}
      onValueChange={setValue}
      placeholder="Selecione os ramos..."
      aria-label="Ramos de seguro"
    />
  )
}

// Placeholder de carregamento
<MultiSelect.Skeleton />`,
    props: [
      { name: "options", type: "{ label: string; value: string }[]", description: "Lista de opções disponíveis (obrigatório)." },
      { name: "value", type: "string[]", description: "Valores selecionados atualmente — sempre controlado (obrigatório)." },
      { name: "onValueChange", type: "(value: string[]) => void", description: "Disparado quando a seleção muda (clique num item, remoção de chip ou Backspace)." },
      { name: "placeholder", type: "string", default: "\"Selecione...\"", description: "Texto do campo de busca quando não há seleção." },
      { name: "emptyText", type: "string", default: "\"Nenhum resultado encontrado.\"", description: "Texto exibido quando a busca não encontra nenhuma opção." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa campo, chips e busca." },
      { name: "className", type: "string", description: "Aplicada ao container de chips (ComboboxChips)." },
      { name: "id", type: "string", description: "Repassado à raiz do Combobox (uso em formulários)." },
      { name: "name", type: "string", description: "Repassado à raiz do Combobox (uso em formulários)." },
      { name: "aria-label", type: "string", description: "Nome acessível do campo de busca. Sem ele, cai no placeholder como fallback — prefira passar explicitamente." },
    ],
  },
  "native-select": {
    description: "Um elemento <select> nativo do HTML, estilizado e integrado de forma consistente ao design system.",
    whenToUse: "Use quando quiser o comportamento nativo do navegador para seleção (melhor em mobile e acessibilidade) em vez do Select customizado.",
    anatomy: [
      { part: "Wrapper", description: "div relativo que posiciona o ícone sobre o <select>." },
      { part: "Elemento raiz", description: "Um <select> nativo do navegador — data-slot=\"native-select\"." },
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
    doGuidelines: ["Use para selecionar uma opção em formulários simples com poucas opções."],
    dontGuidelines: ["Não use native-select para opções que precisam de busca ou filtro — use Select."],
    code: `import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

<NativeSelect defaultValue="br">
  <NativeSelectOption value="br">Brasil</NativeSelectOption>
  <NativeSelectOption value="pt">Portugal</NativeSelectOption>
</NativeSelect>`,
    props: [
      { name: "size", type: "\"sm\" | \"default\"", default: "\"default\"", description: "Dimensão do select." },
      { name: "label", type: "React.ReactNode", description: "Rótulo renderizado internamente via Label. Ausente = comportamento idêntico ao anterior, sem wrapper." },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Com label presente, ativa o padrão de label flutuante (motion). O gatilho de \"tem valor\" é estado React, não CSS puro — ver decisão provisória se precisar revisar." },
      { name: "...props", type: "React.ComponentProps<\"select\">", description: "Todos os atributos nativos de <select>." },
    ],
  },
  "segmented-control": {
    description: "Um grupo de opções mutuamente excludentes em formato de pílula, com seleção sempre única.",
    whenToUse: "Use para alternar entre um pequeno número de visões/modos mutuamente excludentes do mesmo conteúdo (ex.: \"Dia / Semana / Mês\"), quando o item ativo precisa de destaque visual mais evidente do que o ToggleGroup padrão oferece. Não confunda com componentes vizinhos: use ToggleGroup quando precisar de seleção múltipla ou visual de botões com borda; use Tabs quando as opções também controlam a troca de um painel de conteúdo — SegmentedControl não tem painel associado, é só o seletor.",
    anatomy: [
      { part: "SegmentedControl", description: "Root — ToggleGroupPrimitive.Root da Radix com type=\"single\" fixado internamente (não é uma prop exposta). Define size compartilhado via contexto e o fundo bg-muted + p-[3px] do \"trilho\" da pílula." },
      { part: "SegmentedControlItem", description: "Cada opção — ToggleGroupPrimitive.Item. Herda size do grupo se não especificar o próprio. Fica com data-state=\"on\" (fundo bg-background + sombra) quando selecionado." },
    ],
    variants: [],
    states: [
      { name: "Off", description: "Item não selecionado — texto text-muted-foreground, sem fundo." },
      { name: "On (selecionado)", description: "data-state=\"on\" — fundo bg-background, texto text-foreground, shadow-sm. Sempre exatamente um item selecionado por grupo." },
      { name: "Hover", description: "Item não selecionado ganha hover:text-foreground." },
      { name: "Focus", description: "focus-visible:ring com z-10, pra não ser cortado pelo item vizinho." },
      { name: "Disabled", description: "opacidade reduzida e pointer-events desativados — por item ou pelo grupo inteiro." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "Item com h-7, texto text-xs." },
      { name: "default", value: "default", description: "Item com h-8." },
      { name: "lg", value: "lg", description: "Item com h-9." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"

<SegmentedControl aria-label="Período" defaultValue="semana">
  <SegmentedControlItem value="dia">Dia</SegmentedControlItem>
  <SegmentedControlItem value="semana">Semana</SegmentedControlItem>
  <SegmentedControlItem value="mes">Mês</SegmentedControlItem>
</SegmentedControl>`,
    props: [
      { name: "value / onValueChange", type: "string / (value: string) => void", description: "Valor selecionado (controlado). Sempre string — nunca array, porque type é fixado em \"single\"." },
      { name: "defaultValue", type: "string", description: "Valor inicial (não controlado)." },
      { name: "size", type: "\"sm\" | \"default\" | \"lg\"", default: "\"default\"", description: "Aplicado a todos os itens via contexto, salvo item que sobrescreva o próprio size." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o grupo inteiro (repassado a cada item)." },
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"", description: "Direção de navegação por teclado (herdado da Radix)." },
      { name: "...props", type: "Omit<ToggleGroupPrimitive.ToggleGroupSingleProps, \"type\">", description: "Demais props nativas do ToggleGroup.Root da Radix, exceto \"type\" (fixado internamente)." },
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
    doGuidelines: ["Use para selecionar uma opção em listas com busca ou muitas opções."],
    dontGuidelines: ["Não use select para 3 opções ou menos — use Radio Group."],
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
      { name: "size", type: "\"sm\" | \"default\"", default: "\"default\"", description: "(SelectTrigger) dimensão." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o select ou um item." },
      { name: "label", type: "React.ReactNode", description: "(SelectTrigger) Rótulo renderizado internamente via Label. Ausente = comportamento idêntico ao anterior, sem wrapper." },
      { name: "animatedLabel", type: "boolean", default: "false", description: "(SelectTrigger) Com label presente, ativa o padrão de label flutuante (motion)." },
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
    doGuidelines: ["Use para mostrar ações secundárias ou informações complementares ancoradas a um elemento."],
    dontGuidelines: ["Não use popover para texto de ajuda breve — use Tooltip. Não use para formulários extensos — use Dialog."],
    code: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </PopoverTrigger>
  <PopoverContent>Conteúdo do popover.</PopoverContent>
</Popover>`,
    props: [
      { name: "align", type: "\"start\" | \"center\" | \"end\"", default: "\"center\"", description: "(PopoverContent) alinhamento." },
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
    doGuidelines: ["Use como container flexível para itens de lista com layout consistente."],
    dontGuidelines: ["Não use item para substituir componentes com semântica própria como Card."],
    code: `import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Icon } from "@/components/ui/icon"

<Item variant="outline">
  <ItemMedia variant="icon">
    <Icon name="person" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Rafael Anhaia</ItemTitle>
  </ItemContent>
</Item>`,
    props: [
      { name: "variant", type: "\"default\" | \"outline\" | \"muted\"", default: "\"default\"", description: "Estilo visual da linha." },
      { name: "size", type: "\"default\" | \"sm\"", default: "\"default\"", description: "Densidade (padding/gap)." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho (ex: <a>)." },
    ],
  },
  link: {
    description: "O Link é um componente que possibilita a navegação entre páginas internas ou externas. É composto por texto e, opcionalmente, ícones.",
    whenToUse: "Use para navegar entre seções de um app ou site, para direcionar o usuário a páginas ou aplicações externas (nesse caso, inclua um ícone indicando a saída do contexto atual), ou para executar ações de menor destaque. O texto deve descrever claramente a ação, em linguagem coloquial e endereçada diretamente ao usuário. Ícones podem aparecer antes ou depois do texto — omita quando o link aparece dentro de um parágrafo corrido.",
    anatomy: [
      { part: "Elemento raiz", description: "Um <a> (ou o elemento filho, via asChild) com data-slot=\"link\" e data-size. Reaproveita exatamente as classes de buttonVariants({ variant: \"link\", size }) — mesma cor (--primary), mesmo underline-offset-4 hover:underline." },
      { part: "Label", description: "Texto do link — via `children` (obrigatório, é o nome acessível do link)." },
      { part: "Ícone de saída (opcional)", description: "Só aparece quando `external=true`. <Icon name=\"open_in_new\" /> renderizado depois do texto." },
      { part: "Skeleton (Link.Skeleton)", description: "Placeholder de carregamento com o mesmo formato do link real por tamanho, pra evitar layout shift." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso — herdado 1:1 da variant \"link\" do Button." },
      { name: "Hover", description: "hover:underline — herdado 1:1 da variant \"link\" do Button." },
      { name: "Focus", description: "Navegação por teclado — anel de foco (focus-visible:ring), herdado da classe base de buttonVariants." },
      { name: "Externo", description: "Quando external=true: target=\"_blank\" + rel=\"noopener noreferrer\" + ícone de saída depois do texto." },
      { name: "Aria-disabled", description: "Suportado via aria-disabled nativo (repassado por ...props) — <a> não tem atributo disabled HTML, então não existe estado \"disabled\", só aria-disabled." },
    ],
    sizes: [
      { name: "xs", value: "xs", description: "h-6 — herdado da escala do Button." },
      { name: "sm", value: "sm", description: "h-8." },
      { name: "md (default)", value: "default", description: "h-9 — tamanho padrão." },
      { name: "lg", value: "lg", description: "h-10." },
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Link } from "@/components/ui/link"

// Link simples
<Link href="/relatorios">Ver relatórios</Link>

// Tamanhos
<Link href="#" size="sm">Link pequeno</Link>
<Link href="#" size="lg">Link grande</Link>

// Link externo (ícone + target/rel automáticos)
<Link href="https://ui.shadcn.com" external>
  Documentação do shadcn/ui
</Link>

// Composição com next/link (navegação interna client-side)
import NextLink from "next/link"
<Link asChild>
  <NextLink href="/dashboard">Ir para o dashboard</NextLink>
</Link>

// Placeholder de carregamento
<Link.Skeleton size="sm" />`,
    props: [
      { name: "children", type: "React.ReactNode", description: "Texto do link (obrigatório)." },
      { name: "href", type: "string", description: "Herdado de React.ComponentProps<\"a\"> (nativo)." },
      { name: "size", type: "\"default\" | \"xs\" | \"sm\" | \"lg\"", default: "\"default\"", description: "Reaproveita a escala de tamanho do Button (subconjunto sem os tamanhos icon-*)." },
      { name: "external", type: "boolean", default: "false", description: "Força target=\"_blank\" + rel=\"noopener noreferrer\" + ícone open_in_new depois do texto." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza as props no elemento filho (via Radix Slot) em vez de <a>. Uso pretendido: compor com next/link." },
      { name: "...props", type: "React.ComponentProps<\"a\">", description: "Demais atributos nativos do elemento raiz (target, rel, etc., sobrescritos quando external=true)." },
    ],
  },
  list: {
    description: "Organiza informações em formato de texto numa lista.",
    whenToUse: "Use para organizar informações textuais verticalmente, quando fizer sentido apresentá-las como uma sequência numerada ou com marcadores. Use as=\"ol\" para sequências onde a ordem importa (passo a passo, instruções); use as=\"ul\" (default) quando a ordem não é relevante.",
    anatomy: [
      { part: "List (elemento raiz)", description: "Um <ul> ou <ol> (controlado pela prop as, default \"ul\") com data-slot=\"list\", data-as e data-variant. Container que define o espaçamento vertical entre itens." },
      { part: "ListItem", description: "Um <li> com data-slot=\"list-item\". Cada linha da lista — pode conter texto simples ou qualquer composição (ex.: Item/ItemContent)." },
    ],
    variants: [
      { name: "Sem marcador", value: "none", description: "list-none — nenhum bullet/numerador visível. Uso mais comum neste catálogo: agrupar ListItem (com Item/ItemContent dentro, ou texto livre) numa lista vertical de layout." },
      { name: "Com marcador", value: "marker", description: "Bullet nativo (as=\"ul\") ou numerador nativo (as=\"ol\"), com a cor do marcador em --muted-foreground." },
    ],
    states: [
      { name: "Default", description: "Estado de repouso — variant=\"none\", as=\"ul\"." },
      { name: "Com marcador", description: "variant=\"marker\" — bullet ou numerador nativo, conforme as." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { List, ListItem } from "@/components/ui/list"
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item"

// Lista sem marcador, agrupando Item — uso mais comum neste catálogo
<List>
  <ListItem>
    <Item variant="outline" size="sm">
      <ItemContent>
        <ItemTitle>Passo 1</ItemTitle>
        <ItemDescription>Confirme seus dados pessoais.</ItemDescription>
      </ItemContent>
    </Item>
  </ListItem>
</List>

// Lista com marcador (bullet), texto simples
<List variant="marker">
  <ListItem>Documento de identidade com foto</ListItem>
  <ListItem>Comprovante de residência atualizado</ListItem>
</List>

// Lista ordenada (numerada) — ordem importa
<List as="ol" variant="marker">
  <ListItem>Preencha o formulário de solicitação.</ListItem>
  <ListItem>Envie os documentos exigidos.</ListItem>
</List>`,
    props: [
      { name: "as", type: "\"ul\" | \"ol\"", default: "\"ul\"", description: "Elemento HTML renderizado." },
      { name: "variant", type: "\"none\" | \"marker\"", default: "\"none\"", description: "Controla a visibilidade do marcador nativo. Decisão provisória, diverge do Nimbus (que não tem essa prop)." },
      { name: "children", type: "React.ReactNode", description: "Os ListItem (ou qualquer conteúdo)." },
      { name: "...props", type: "React.ComponentPropsWithoutRef<\"ul\">", description: "Demais atributos nativos do elemento raiz (compatível também com <ol>)." },
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
    doGuidelines: ["Use para destacar visualmente um elemento ou região específica."],
    dontGuidelines: ["Não use marker como único indicador de estado — combine com texto ou ícone."],
    code: `import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Icon } from "@/components/ui/icon"

<Marker>
  <MarkerIcon>
    <Icon name="check" />
  </MarkerIcon>
  <MarkerContent>Etapa concluída</MarkerContent>
</Marker>`,
    props: [
      { name: "variant", type: "\"default\" | \"separator\" | \"border\"", default: "\"default\"", description: "Estilo visual da marca." },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho." },
    ],
  },
  alert: {
    description: "Exibe um destaque para chamar a atenção do usuário.",
    whenToUse: "Use para comunicar uma informação importante, confirmação ou erro relacionado ao contexto atual da tela.",
    anatomy: [
      { part: "Alert", description: "Elemento raiz — <div role=\"alert\"> em grid (ícone opcional na 1ª coluna)." },
      { part: "AlertTitle", description: "Linha de título, uma linha só (line-clamp-1)." },
      { part: "AlertDescription", description: "Corpo do texto, pode ter múltiplos parágrafos." },
    ],
    variants: [
      { name: "Default", value: "default", description: "bg-card, texto neutro." },
      { name: "Destructive", value: "destructive", description: "Texto em --destructive — erros e avisos críticos." },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["Use para comunicar informações importantes sobre o estado do sistema. Use a aparência adequada (success, warning, danger, info)."],
    dontGuidelines: ["Não use alert para notificações temporárias — use Sonner/Toast. Não use alert para mensagens de confirmação de ação."],
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icon } from "@/components/ui/icon"

<Alert variant="destructive">
  <Icon name="error" />
  <AlertTitle>Erro ao salvar</AlertTitle>
  <AlertDescription>
    Verifique os campos e tente novamente.
  </AlertDescription>
</Alert>`,
    props: [
      { name: "variant", type: "\"default\" | \"destructive\"", default: "\"default\"", description: "Estilo visual do alerta." },
      { name: "...props", type: "React.ComponentProps<\"div\">", description: "Atributos nativos de <div>." },
    ],
  },
  breadcrumb: {
    description: "Exibe o caminho até o recurso atual usando uma hierarquia de links.",
    whenToUse: "Use para mostrar a localização da página atual dentro da estrutura de navegação do produto.",
    anatomy: [
      { part: "Breadcrumb", description: "Elemento raiz — <nav aria-label=\"breadcrumb\">." },
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
    doGuidelines: ["Use para mostrar a hierarquia de navegação e permitir voltar a páginas anteriores."],
    dontGuidelines: ["Não use breadcrumb em fluxos de uma única página. Não use como substituto para navegação principal."],
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
      { part: "ButtonGroup", description: "Elemento raiz — role=\"group\", junta os botões visualmente (bordas coladas)." },
      { part: "ButtonGroupText", description: "Rótulo não clicável dentro do grupo (ex: prefixo)." },
      { part: "ButtonGroupSeparator", description: "Divisor entre sub-grupos de botões." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use para agrupar botões com ação relacionada, como filtros ou visualizações."],
    dontGuidelines: ["Não use button-group para ações primárias e secundárias conflitantes."],
    code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

<ButtonGroup>
  <Button variant="outline">Arquivar</Button>
  <Button variant="outline">Denunciar</Button>
</ButtonGroup>`,
    props: [
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"", description: "Direção do agrupamento." },
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
    doGuidelines: ["Use para ocultar conteúdo complementar que não é necessário à primeira vista."],
    dontGuidelines: ["Não use collapsible para conteúdo crítico que o usuário precisa ver sempre."],
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
    doGuidelines: ["Use para combinar input de texto livre com seleção de opções pré-definidas."],
    dontGuidelines: ["Não use combobox para listas pequenas e fixas — use Select."],
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
      { part: "EmptyMedia", description: "Ícone — variantes \"default\" (sem fundo) e \"icon\" (fundo circular/quadrado)." },
      { part: "EmptyTitle / EmptyDescription", description: "Texto principal e secundário do estado vazio." },
      { part: "EmptyContent", description: "Ação disponível (ex: botão) abaixo do texto." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use para indicar que uma lista ou área não tem conteúdo. Ofereça ação para criar o primeiro item."],
    dontGuidelines: ["Não deixe a área vazia sem orientação do que fazer a seguir."],
    code: `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon name="inbox" />
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
      { name: "variant", type: "\"default\" | \"icon\"", default: "\"default\"", description: "(EmptyMedia) estilo do ícone." },
    ],
  },
  field: {
    description: "Combine labels, controles e textos de ajuda para compor campos de formulário acessíveis e agrupamentos de campos.",
    whenToUse: "Use para estruturar qualquer campo de formulário, garantindo que label, texto de ajuda e mensagem de erro fiquem conectados corretamente para acessibilidade.",
    anatomy: [
      { part: "FieldSet / FieldLegend", description: "Agrupam vários Fields relacionados, com título (legend)." },
      { part: "FieldGroup", description: "Espaçamento vertical entre Fields." },
      { part: "Field", description: "Elemento raiz de um campo — role=\"group\", orientação vertical/horizontal/responsive." },
      { part: "FieldLabel", description: "Label do campo (usa o Atom Label internamente)." },
      { part: "FieldContent", description: "Envolve o controle e a descrição." },
      { part: "FieldDescription", description: "Texto de ajuda abaixo do controle." },
      { part: "FieldSeparator", description: "Divisor entre Fields, com texto central opcional (ex: \"ou\")." },
      { part: "FieldError", description: "Mensagem de erro — role=\"alert\", aceita lista de erros (react-hook-form)." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso." },
      { name: "Invalid", description: "data-invalid=true — texto em --destructive." },
      { name: "Disabled", description: "group-data-[disabled=true] — opacidade reduzida no label." },
    ],
    sizes: [],
    doGuidelines: ["Use para agrupar label + input + mensagens de ajuda/erro em formulários."],
    dontGuidelines: ["Não use field para elementos que não são campos de formulário."],
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
      { name: "orientation", type: "\"vertical\" | \"horizontal\" | \"responsive\"", default: "\"vertical\"", description: "Direção do layout do campo." },
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
    doGuidelines: ["Use para mostrar preview ou informação adicional ao passar o mouse sobre um elemento."],
    dontGuidelines: ["Não use hover-card para ações interativas — use Popover. Não use em mobile sem alternativa de toque."],
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
      { name: "align", type: "\"start\" | \"center\" | \"end\"", default: "\"center\"", description: "(HoverCardContent) alinhamento." },
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
    doGuidelines: ["Use para agrupar input com elementos adjacentes como botões ou ícones."],
    dontGuidelines: ["Não use input-group para campos que não têm relação direta entre si."],
    code: `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Icon } from "@/components/ui/icon"

<InputGroup>
  <InputGroupAddon>
    <Icon name="search" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Buscar..." />
</InputGroup>`,
    props: [
      { name: "align", type: "\"inline-start\" | \"inline-end\" | \"block-start\" | \"block-end\"", default: "\"inline-start\"", description: "(InputGroupAddon) posição do addon." },
      { name: "size", type: "\"xs\" | \"sm\" | \"icon-xs\" | \"icon-sm\"", default: "\"xs\"", description: "(InputGroupButton) dimensão." },
    ],
  },
  pagination: {
    description: "Paginação com navegação entre páginas e links de próxima/anterior.",
    whenToUse: "Use para dividir uma lista longa de resultados em páginas navegáveis.",
    anatomy: [
      { part: "Pagination", description: "<nav aria-label=\"pagination\"> — elemento raiz." },
      { part: "PaginationContent", description: "<ul> que envolve os itens." },
      { part: "PaginationItem", description: "<li> — um item da paginação." },
      { part: "PaginationLink", description: "Link de página — reaproveita buttonVariants do Button." },
      { part: "PaginationPrevious / PaginationNext", description: "Links de navegação com ícone + label." },
      { part: "PaginationEllipsis", description: "Indica páginas ocultas (\"...\")." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Link normal — variant ghost." },
      { name: "Active", description: "isActive=true — variant outline, aria-current=\"page\"." },
    ],
    sizes: [],
    doGuidelines: ["Use para navegar entre páginas de uma lista ou tabela com muitos itens. Mostre o total de páginas."],
    dontGuidelines: ["Não use pagination para menos de 10 itens — use scroll. Não use sem indicar a página atual."],
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
      { name: "size", type: "Button[\"size\"]", default: "\"icon\"", description: "(PaginationLink) dimensão herdada do Button." },
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
      { name: "Off", description: "Item não selecionado — font-normal (400) e --icon-fill:0 fixado, independente do preset ativo." },
      { name: "On", description: "data-state=on — bg-accent, font-bold (700) e --icon-fill:1 fixado no item selecionado (herdado de toggleVariants, mesmo mecanismo do Toggle isolado — os dois estados sobrescrevem --icon-fill, então o comportamento é igual em qualquer preset)." },
      { name: "Focus", description: "focus-visible:ring, com z-index elevado pra não cortar o anel." },
      { name: "Disabled", description: "opacidade reduzida." },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "h-8 min-w-8." },
      { name: "default", value: "default", description: "h-9 min-w-9." },
      { name: "lg", value: "lg", description: "h-10 min-w-10." },
    ],
    doGuidelines: ["Use para agrupar opções mutuamente excludentes em formato de botões."],
    dontGuidelines: ["Não use toggle-group para ações que não são de seleção."],
    code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">Esquerda</ToggleGroupItem>
  <ToggleGroupItem value="center">Centro</ToggleGroupItem>
  <ToggleGroupItem value="right">Direita</ToggleGroupItem>
</ToggleGroup>`,
    props: [
      { name: "type", type: "\"single\" | \"multiple\"", description: "Seleção única ou múltipla — obrigatório (do Radix)." },
      { name: "value / onValueChange", type: "string | string[]", description: "Valor(es) selecionado(s)." },
      { name: "variant / size", type: "\"default\" | \"outline\" / \"default\" | \"sm\" | \"lg\"", description: "Aplicados a todos os itens via contexto." },
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
    doGuidelines: ["Use para áreas com conteúdo rolável customizado, mantendo consistência visual."],
    dontGuidelines: ["Não use scroll-area para conteúdo que cabe inteiro na tela."],
    code: `import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-48 w-64 rounded-md border p-4">
  Conteúdo longo que rola dentro de uma altura fixa.
</ScrollArea>`,
    props: [
      { name: "orientation", type: "\"vertical\" | \"horizontal\"", default: "\"vertical\"", description: "(ScrollBar) direção da barra customizada." },
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
    doGuidelines: ["Use para exibir arquivos anexados com opção de download ou preview."],
    dontGuidelines: ["Não use attachment para upload de novos arquivos — use File Uploader."],
    code: `import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Icon } from "@/components/ui/icon"

<Attachment>
  <AttachmentMedia>
    <Icon name="description" />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>contrato.pdf</AttachmentTitle>
    <AttachmentDescription>2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remover">
      <Icon name="close" />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>`,
    props: [
      { name: "state", type: "\"idle\" | \"uploading\" | \"processing\" | \"error\" | \"done\"", default: "\"done\"", description: "Estado do upload/anexo." },
      { name: "size", type: "\"default\" | \"sm\" | \"xs\"", default: "\"default\"", description: "Dimensão do componente." },
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"", description: "Direção do layout." },
    ],
  },
  accordion: {
    description: "Um conjunto de cabeçalhos interativos empilhados verticalmente, cada um revelando uma seção de conteúdo.",
    whenToUse: "Use para organizar conteúdo extenso em seções que podem ser expandidas uma a uma, como perguntas frequentes.",
    anatomy: [
      { part: "Accordion", description: "Root — type=\"single\" (um item aberto por vez) ou \"multiple\"." },
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
    doGuidelines: ["Use para organizar conteúdo em seções expansíveis, economizando espaço vertical."],
    dontGuidelines: ["Não use accordion para conteúdo que o usuário precisa comparar entre seções."],
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
      { name: "type", type: "\"single\" | \"multiple\"", description: "Um item aberto por vez ou vários — obrigatório." },
      { name: "collapsible", type: "boolean", default: "false", description: "Com type=\"single\", permite fechar o item aberto." },
      { name: "value / defaultValue", type: "string | string[]", description: "Item(s) aberto(s) — controlado ou inicial." },
    ],
  },
  "alert-dialog": {
    description: "Um diálogo modal que interrompe o usuário com um conteúdo importante e espera uma resposta.",
    whenToUse: "Use para confirmar ações irreversíveis ou críticas, como excluir ou cancelar, exigindo uma escolha explícita antes de continuar.",
    anatomy: [
      { part: "AlertDialog", description: "Root — controla abertura. Diferente do Dialog, exige uma ação explícita (não fecha ao clicar fora)." },
      { part: "AlertDialogTrigger", description: "Elemento que abre o diálogo." },
      { part: "AlertDialogContent", description: "Painel modal (portal + overlay) — data-size \"default\" ou \"sm\"." },
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
    doGuidelines: ["Use para confirmar ações destrutivas ou importantes que exigem atenção."],
    dontGuidelines: ["Não use alert-dialog para notificações simples — use Alert ou Sonner."],
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
      { name: "size", type: "\"default\" | \"sm\"", default: "\"default\"", description: "(AlertDialogContent) largura máxima do painel." },
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
    doGuidelines: ["Use para seleção de datas em formulários e filtros. Destaque a data atual."],
    dontGuidelines: ["Não use calendar para seleção de horários específicos — use DatePicker com time."],
    code: `import { Calendar } from "@/components/ui/calendar"

<Calendar mode="single" selected={date} onSelect={setDate} />`,
    props: [
      { name: "mode", type: "\"single\" | \"multiple\" | \"range\"", description: "Tipo de seleção (do react-day-picker)." },
      { name: "selected / onSelect", type: "Date | Date[] | DateRange", description: "Valor selecionado — controlado." },
      { name: "captionLayout", type: "\"label\" | \"dropdown\"", default: "\"label\"", description: "Navegação por texto ou dropdowns de mês/ano." },
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
    doGuidelines: ["Use para agrupar informações relacionadas em um container visual distinto."],
    dontGuidelines: ["Não use card para ações únicas como botões — use Button."],
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
      { name: "...props", type: "React.ComponentProps<\"div\">", description: "Atributos nativos de <div> em todas as peças." },
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
    doGuidelines: ["Use para exibir múltiplos itens em um espaço limitado, com navegação."],
    dontGuidelines: ["Não use carousel para conteúdo que o usuário precisa ver todo de uma vez."],
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
      { name: "orientation", type: "\"horizontal\" | \"vertical\"", default: "\"horizontal\"", description: "Direção do carrossel." },
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
    doGuidelines: ["Use para visualizar dados numéricos e tendências. Escolha o tipo de gráfico adequado ao dado."],
    dontGuidelines: ["Não use chart para dados que seriam mais claros como tabela simples."],
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
    doGuidelines: ["Use para comandos rápidos e busca por ações dentro da aplicação (palette)."],
    dontGuidelines: ["Não use command como substituto para navegação principal."],
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
      { part: "ContextMenuItem", description: "Item de ação — variantes \"default\" e \"destructive\"." },
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
    doGuidelines: ["Use para ações contextuais ao clicar com botão direito em um elemento."],
    dontGuidelines: ["Não use context-menu como único meio de acesso a ações importantes."],
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
      { name: "variant", type: "\"default\" | \"destructive\"", default: "\"default\"", description: "(ContextMenuItem) estilo do item." },
    ],
  },
  dialog: {
    description: "Janela por cima da tela para uma tarefa curta e focada — editar, preencher, escolher. O resto da página fica inerte e escurecido.",
    whenToUse: "Tarefa curta que precisa de atenção total antes de voltar ao fluxo. Formulário de poucos campos ligado ao que está na tela.",
    anatomy: [
      { part: "Dialog", description: "Raiz (Radix). Controla aberto/fechado" },
      { part: "DialogTrigger", description: "Elemento que abre (use asChild com Button)" },
      { part: "DialogContent", description: "Painel centralizado, em portal, com sobreposição e o \"X\" de fechar" },
      { part: "DialogHeader · DialogTitle · DialogDescription", description: "Título (nome acessível) e descrição (ligada)" },
      { part: "DialogFooter", description: "Ações. Empilha no celular, à direita no desktop" },
      { part: "DialogClose", description: "Fecha ao acionar (use asChild)" },
      { part: "DialogOverlay · DialogPortal", description: "Internos; já usados pelo DialogContent" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "Nada renderizado" },
      { name: "Aberto", description: "Sobreposição + painel bg-popover com shadow-lg; entra com fade + zoom 95%" },
    ],
    sizes: [],
    doGuidelines: ["Feche com Esc, com o \"X\" e com \"Cancelar\".", "Ação principal à direita no DialogFooter.", "Abra só quando a pessoa pedir."],
    dontGuidelines: ["Dialog sobre dialog → feche o primeiro, ou use um passo dentro do mesmo.", "Mensagem que poderia sumir sozinha → sonner.", "Formulário longo → página própria ou sheet."],
    code: `import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Editar perfil</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogDescription>As mudanças aparecem para toda a equipe.</DialogDescription>
    </DialogHeader>
    {/* campos */}
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
      <Button>Salvar perfil</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    props: [
      { name: "open · defaultOpen · onOpenChange (Dialog)", type: "—", default: "—", description: "Controle de abertura (Radix)" },
      { name: "showCloseButton (DialogContent)", type: "boolean", default: "true", description: "Mostra o \"X\" no canto" },
      { name: "showCloseButton (DialogFooter)", type: "boolean", default: "false", description: "Acrescenta um botão outline de fechar" },
      { name: "onEscapeKeyDown · onPointerDownOutside (Content)", type: "evento", default: "—", description: "Impedir fechar por Esc ou clique fora" },
    ],
    meta: {
      nome: "Dialog",
      camada: "organism",
      status: "estavel",
      codigo: "src/components/ui/dialog.tsx",
      story: "src/components/ui/dialog.stories.tsx",
      vizinhos: ["alert-dialog", "sheet", "drawer", "popover", "sonner"],
    },
    whenToUseItems: ["Tarefa curta que precisa de atenção total antes de voltar ao fluxo.", "Formulário de poucos campos ligado ao que está na tela."],
    whenNotToUse: ["Confirmar ação destrutiva (\"Excluir capítulo?\") → alert-dialog.", "Confirmação que não pede resposta (\"Link copiado\") → sonner.", "Conteúdo longo ou formulário extenso → uma página, ou sheet; no celular, ações sobre um item → drawer."],
    content: ["Título como ação ou pergunta: \"Editar perfil\".", "A descrição diz o que acontece ao confirmar.", "O botão principal repete o verbo do título: \"Salvar perfil\", não \"OK\"."],
    accessibility: {
      keyboard: "Tab e Shift+Tab ficam presos na janela. Esc fecha.",
      screenReader: "papel dialog modal; DialogTitle vira o nome e DialogDescription a descrição. O resto da página fica inacessível enquanto aberto. Título é obrigatório — sem ele, a Radix avisa no console.",
      focus: "ao abrir, vai para o primeiro elemento focável. Ao fechar, volta para o gatilho.",
      cautions: "o \"X\" anuncia \"Close\" e o botão do DialogFooter diz \"Close\", em inglês. Em tela em português, passe showCloseButton={false} no footer e use um DialogClose com texto em português.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-popover", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-semibold", "leading-none", "text-lg", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-2", "gap-4", "inset-0", "max-w-lg", "p-6", "right-4", "size-4", "top-4"] },
      { contexto: "Raio", itens: ["rounded-lg"] },
      { contexto: "Sombra", itens: ["shadow-lg"] },
      { contexto: "Movimento", itens: ["duration-motion-base"] },
      { contexto: "Foco", itens: ["ring-offset-background", "ring-ring"] },
    ],
  },
  "dropdown-menu": {
    description: "Exibe um menu para o usuário — como um conjunto de ações ou funções — acionado por um botão.",
    whenToUse: "Use para agrupar ações relacionadas a um elemento, como o menu de opções de uma linha de tabela, atrás de um botão gatilho.",
    anatomy: [
      { part: "DropdownMenu", description: "Root — controla abertura." },
      { part: "DropdownMenuTrigger", description: "Elemento que abre o menu ao clicar." },
      { part: "DropdownMenuContent", description: "Painel flutuante (portal), ancorado no trigger." },
      { part: "DropdownMenuItem", description: "Item de ação — variantes \"default\" e \"destructive\"." },
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
    doGuidelines: ["Use para listar ações ou opções em um menu suspenso."],
    dontGuidelines: ["Não use dropdown-menu para navegação principal — use Navigation Menu."],
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
      { name: "variant", type: "\"default\" | \"destructive\"", default: "\"default\"", description: "(DropdownMenuItem) estilo do item." },
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
    doGuidelines: ["Use para painéis laterais com conteúdo complementar ou formulários."],
    dontGuidelines: ["Não use drawer para conteúdo crítico que precisa ser visto sempre."],
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
      { name: "direction", type: "\"top\" | \"bottom\" | \"left\" | \"right\"", default: "\"bottom\"", description: "Lado de onde o drawer desliza (do vaul)." },
    ],
  },
  "file-uploader": {
    description: "Componente para receber arquivos por upload — uma caixa com um ícone e um rótulo opcional.",
    whenToUse: "Use para capturar arquivos enviados pelo usuário: comprovantes/recibos, imagens (ex.: fotos de sinistro), planilhas ou outros documentos anexados a um formulário.",
    anatomy: [
      { part: "Elemento raiz", description: "Um <label> com data-slot=\"file-uploader\", data-dragging e data-disabled. Recebe os handlers de drag-and-drop (onDragOver/onDragLeave/onDrop) como reforço visual — arrastar não é a única forma de anexar." },
      { part: "Ícone", description: "Icon name=\"cloud_upload\" — mesmo ícone já confirmado em uso real no Pattern Upload (src/components/patterns/upload.tsx) e em src/app/templates/novo-sinistro/page.tsx." },
      { part: "Texto", description: "Rótulo visível explicando a ação (prop label, default \"Arraste um arquivo ou clique para selecionar\")." },
      { part: "Input nativo", description: "<input type=\"file\"> real, associado ao label via htmlFor/id, visualmente escondido com sr-only (nunca display:none) mas focável e navegável por teclado — herda toda a acessibilidade nativa do elemento." },
    ],
    variants: [],
    states: [
      { name: "Default", description: "Estado de repouso, borda tracejada." },
      { name: "Dragging", description: "data-dragging verdadeiro enquanto um arquivo é arrastado sobre a zona — borda e fundo usam --primary." },
      { name: "Focus", description: "O <input> real recebe foco de teclado (Tab); o anel de foco (mesma régua do Input) é aplicado ao <label> via has-[:focus-visible]." },
      { name: "Disabled", description: "prop disabled — desativa o <input> nativamente, remove do fluxo de clique/drag e reduz a opacidade." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { FileUploader } from "@/components/ui/file-uploader"

// Uso simples, um arquivo
<FileUploader onFilesSelected={(files) => console.log(files)} />

// Múltiplos arquivos, tipo restrito
<FileUploader
  multiple
  accept="image/*"
  label="Arraste uma imagem ou clique para selecionar"
  onFilesSelected={(files) => console.log(files)}
/>

// Com limite de tamanho
<FileUploader
  maxSize={5 * 1024 * 1024}
  onFilesSelected={(files) => console.log("aceitos", files)}
  onFilesRejected={(files) => console.log("rejeitados (muito grandes)", files)}
/>`,
    props: [
      { name: "label", type: "string", default: "\"Arraste um arquivo ou clique para selecionar\"", description: "Texto visível dentro da zona de drop, explicando a ação." },
      { name: "accept", type: "string", description: "Repassado direto ao <input type=\"file\"> nativo (tipos de arquivo aceitos)." },
      { name: "multiple", type: "boolean", default: "false", description: "Repassado direto ao <input> nativo — permite selecionar mais de um arquivo." },
      { name: "maxSize", type: "number", description: "Tamanho máximo aceito por arquivo, em bytes. Sem limite quando ausente." },
      { name: "onFilesSelected", type: "(files: File[]) => void", description: "Chamado com os arquivos aceitos (dentro do limite de maxSize, quando informado)." },
      { name: "onFilesRejected", type: "(files: File[]) => void", description: "Chamado com os arquivos que excederam maxSize. Só dispara quando maxSize é informado." },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o <input> nativamente e bloqueia clique/drag." },
      { name: "id", type: "string", default: "auto-gerado via React.useId()", description: "Associa <label htmlFor> ao <input id>." },
      { name: "...props", type: "React.ComponentProps<\"input\">", description: "Demais atributos nativos repassados ao <input type=\"file\"> (ex.: name, required, capture, aria-describedby)." },
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
    doGuidelines: ["Use para agrupar campos de formulário com validação e submissão."],
    dontGuidelines: ["Não use form para elementos que não enviam dados."],
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
      { part: "MenubarItem", description: "Item de ação — variantes \"default\" e \"destructive\"." },
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
    doGuidelines: ["Use para menus de aplicação no topo, com múltiplas categorias e submenus."],
    dontGuidelines: ["Não use menubar para ações simples — use Dropdown Menu."],
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
      { name: "variant", type: "\"default\" | \"destructive\"", default: "\"default\"", description: "(MenubarItem) estilo do item." },
    ],
  },
  message: {
    description: "Exibe uma mensagem em uma conversa, com avatar, cabeçalho, rodapé e alinhamento opcionais.",
    whenToUse: "Use para estruturar cada linha de uma conversa (chat, atendimento, assistente de IA), cuidando de avatar, alinhamento e metadados.",
    anatomy: [
      { part: "MessageGroup", description: "Agrupa várias mensagens em sequência (ex: histórico de chat)." },
      { part: "Message", description: "Elemento raiz de uma mensagem — align \"start\" (recebida) ou \"end\" (enviada), inverte a direção do flex." },
      { part: "MessageAvatar", description: "Avatar do autor — alinhado à base da mensagem." },
      { part: "MessageContent", description: "Envolve o corpo da mensagem e o header/footer." },
      { part: "MessageHeader / MessageFooter", description: "Metadado (nome, hora) acima ou abaixo do conteúdo." },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use para exibir mensagens em um chat ou timeline de conversa."],
    dontGuidelines: ["Não use message para notificações do sistema — use Sonner."],
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
      { name: "align", type: "\"start\" | \"end\"", default: "\"start\"", description: "Lado da mensagem — recebida ou enviada." },
    ],
  },
  bubble: {
    description: "Exibe conteúdo de conversa em um balão de mensagem. Suporta variantes visuais, alinhamento, agrupamento, reações e conteúdo recolhível.",
    whenToUse: "Use como a superfície visível de uma mensagem de chat — o balão de texto — dentro do componente Message.",
    anatomy: [
      { part: "BubbleGroup", description: "Agrupa várias bolhas em sequência." },
      { part: "Bubble", description: "Elemento raiz — variant de cor + align \"start\"/\"end\"." },
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
    doGuidelines: ["Use para representar mensagens individuais em interfaces de chat."],
    dontGuidelines: ["Não use bubble para conteúdo que não é parte de uma conversa."],
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
      { name: "variant", type: "\"default\" | \"secondary\" | \"muted\" | \"tinted\" | \"outline\" | \"ghost\" | \"destructive\"", default: "\"default\"", description: "Cor/estilo da bolha." },
      { name: "align", type: "\"start\" | \"end\"", default: "\"start\"", description: "Lado da bolha — recebida ou enviada." },
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
    doGuidelines: ["Use para navegação principal do site ou aplicação, com suporte a submenus."],
    dontGuidelines: ["Não use navigation-menu para ações — use Dropdown Menu."],
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
    doGuidelines: ["Use para painéis redimensionáveis que o usuário pode ajustar."],
    dontGuidelines: ["Não use resizable em layouts fixos ou com largura determinada."],
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
      { name: "direction", type: "\"horizontal\" | \"vertical\"", description: "(ResizablePanelGroup) direção da divisão — obrigatório." },
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
    doGuidelines: ["Use para painéis laterais que deslizam sobre o conteúdo principal."],
    dontGuidelines: ["Não use sheet para conteúdo que precisa de interação com a página atrás."],
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
      { name: "side", type: "\"top\" | \"right\" | \"bottom\" | \"left\"", default: "\"right\"", description: "(SheetContent) lado de onde o painel desliza." },
      { name: "showCloseButton", type: "boolean", default: "true", description: "(SheetContent) mostra o X no canto superior direito." },
    ],
  },
  sidebar: {
    description: "Um componente de barra lateral (sidebar) componível, tematizável e customizável.",
    whenToUse: "Use como a navegação lateral principal do produto, com suporte a estado colapsado, ícones e submenus.",
    anatomy: [
      { part: "SidebarProvider", description: "Contexto raiz — estado aberto/colapsado, persistido em cookie, TooltipProvider embutido." },
      { part: "Sidebar", description: "Elemento raiz — collapsible \"offcanvas\" (mobile), \"icon\" (encolhe pra ícones) ou \"none\"." },
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
      { name: "Collapsed (ícone)", description: "collapsible=\"icon\" — só ícones, labels em tooltip." },
      { name: "Mobile", description: "Renderiza como Sheet (painel deslizante) abaixo do breakpoint md." },
    ],
    sizes: [],
    doGuidelines: ["Use para navegação persistente em aplicações com muitas seções."],
    dontGuidelines: ["Não use sidebar para ações temporárias — use Sheet ou Drawer."],
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
      { name: "collapsible", type: "\"offcanvas\" | \"icon\" | \"none\"", default: "\"offcanvas\"", description: "(Sidebar) comportamento ao recolher." },
      { name: "side", type: "\"left\" | \"right\"", default: "\"left\"", description: "(Sidebar) lado da tela." },
      { name: "mobileSide", type: "\"left\" | \"right\"", default: "mesmo valor de \"side\"", description: "(Sidebar) lado da tela na gaveta mobile." },
      { name: "variant", type: "\"sidebar\" | \"floating\" | \"inset\"", default: "\"sidebar\"", description: "(Sidebar) estilo visual do contêiner." },
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
    doGuidelines: ["Use para exibir dados tabulares com colunas e linhas. Suporte ordenação quando relevante."],
    dontGuidelines: ["Não use table para layouts de página — use CSS Grid ou Box."],
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
      { name: "...props", type: "React.ComponentProps<\"table\">", description: "Atributos nativos de <table> e das demais peças." },
    ],
  },
  tabs: {
    description: "Divide um conteúdo em partes e mostra uma de cada vez, sem sair da página. A aba ativa fica destacada para a pessoa saber onde está.",
    whenToUse: "Visões relacionadas do mesmo contexto: Detalhes, Histórico, Arquivos. Conteúdo que a pessoa consulta uma parte por vez.",
    anatomy: [
      { part: "Tabs", description: "Raiz (Radix). Define orientation e a aba ativa" },
      { part: "TabsList", description: "Envolve os gatilhos. Define a variant" },
      { part: "TabsTrigger", description: "Cada aba. data-state=\"active\" quando selecionada" },
      { part: "TabsContent", description: "Painel de cada aba. Só o ativo aparece" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Trilho bg-muted, aba ativa com fundo e shadow-sm. Áreas compactas, dentro de card" },
      { name: "Line", value: "line", description: "Sem fundo; aba ativa ganha linha de 2 px. Topo de página ou seção" },
    ],
    states: [
      { name: "Padrão", description: "Texto text-muted-foreground" },
      { name: "Hover", description: "Texto vira text-foreground" },
      { name: "Pressionado", description: "active:scale-(--scale-pressed)" },
      { name: "Ativa", description: "Fundo bg-background (default) ou linha de 2 px (line)" },
      { name: "Foco", description: "Anel de 3 px em ring" },
      { name: "Desabilitada", description: "opacity-50, sem clique" },
    ],
    sizes: [],
    doGuidelines: ["Nomes curtos, de uma ou duas palavras.", "Ordem das abas fixa.", "Primeira aba aberta por padrão."],
    dontGuidelines: ["Mais de 6 abas lado a lado → agrupe, ou use select para escolher a seção.", "Abas para etapas em sequência → stepper.", "Abas que levam a outras páginas → navigation-menu."],
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="detalhes">
  <TabsList variant="line">
    <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
    <TabsTrigger value="historico">Histórico</TabsTrigger>
  </TabsList>
  <TabsContent value="detalhes">…</TabsContent>
  <TabsContent value="historico">…</TabsContent>
</Tabs>`,
    props: [
      { name: "value · defaultValue (Tabs)", type: "string", default: "—", description: "Aba ativa, controlada ou inicial" },
      { name: "onValueChange (Tabs)", type: "(v: string) => void", default: "—", description: "Troca de aba" },
      { name: "orientation (Tabs)", type: "horizontal · vertical", default: "horizontal", description: "Direção do layout e das setas" },
      { name: "variant (TabsList)", type: "default · line", default: "default", description: "Estilo da lista" },
      { name: "value (Trigger, Content)", type: "string", default: "—", description: "Liga a aba ao painel. Obrigatório" },
      { name: "disabled (Trigger)", type: "boolean", default: "false", description: "Desabilita uma aba" },
    ],
    meta: {
      nome: "Tabs",
      camada: "molecule",
      status: "estavel",
      codigo: "src/components/ui/tabs.tsx",
      story: "src/components/ui/tabs.stories.tsx",
      vizinhos: ["segmented-control", "stepper", "navigation-menu", "accordion"],
    },
    whenToUseItems: ["Visões relacionadas do mesmo contexto: Detalhes, Histórico, Arquivos.", "Conteúdo que a pessoa consulta uma parte por vez."],
    whenNotToUse: ["Etapas em sequência → stepper.", "Filtrar ou alternar a visão de uma área, sem painel próprio → segmented-control.", "Ir para outra página → navigation-menu ou link."],
    content: ["Uma ou duas palavras por aba: Detalhes, Histórico.", "Substantivos, não verbos."],
    accessibility: {
      keyboard: "Tab entra na lista e para na aba ativa. Setas trocam de aba (↑↓ na vertical). Tab de novo leva ao painel.",
      screenReader: "papéis tablist, tab e tabpanel (Radix). Anuncia a aba, se está selecionada e a posição (\"2 de 4\").",
      focus: "anel na aba. Na line, a ativa se diferencia também pela linha, não só pela cor.",
      cautions: "abas trocam conteúdo na mesma página. Para levar a outra página, use navegação.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-background", "bg-foreground", "bg-muted", "bg-secondary", "border-input", "border-ring", "text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm"] },
      { contexto: "Espaço", itens: ["bottom-1.25", "gap-1", "gap-1.5", "gap-2", "h-0.5", "h-9", "inset-x-0", "inset-y-0", "p-0.75", "px-2", "py-1", "right-1", "size-4", "w-0.5"] },
      { contexto: "Raio", itens: ["radius-inset-0.75", "rounded-inner", "rounded-outer-lg"] },
      { contexto: "Sombra", itens: ["shadow-sm"] },
      { contexto: "Movimento", itens: ["--scale-pressed", "duration-motion-base", "duration-motion-fast", "ease-spring"] },
      { contexto: "Foco", itens: ["outline-ring", "ring-ring"] },
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
    doGuidelines: ["Use para notificações temporárias que desaparecem automaticamente. Mantenha a mensagem concisa."],
    dontGuidelines: ["Não use sonner para mensagens críticas que exigem ação do usuário. Não use para erros de formulário — use Field."],
    code: `import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// <Toaster /> é montado uma vez na raiz do app (ver app-shell.tsx)
<Button onClick={() => toast.success("Apólice atualizada com sucesso.")}>
  Salvar
</Button>`,
    props: [
      { name: "position", type: "\"top-left\" | \"top-center\" | \"top-right\" | \"bottom-left\" | \"bottom-center\" | \"bottom-right\"", default: "\"bottom-right\"", description: "(Toaster) posição das notificações na tela." },
      { name: "richColors", type: "boolean", default: "false", description: "(Toaster) usa cores mais vivas por tipo de toast." },
    ],
  },
  icon: {
    description: "Renderiza um glifo do Material Symbols com controle de eixos variáveis e suporte a cor do tema. Usado para apoiar ações, estados e navegação.",
    whenToUse: "Ilustrar ações e comandos dentro de botões, menus e barras de ferramentas. Reforçar o significado visual de alertas, badges e itens de listas informativas. Indicar estados do sistema como sucesso, erro ou aviso ao lado de texto explicativo.",
    anatomy: [
      { part: "Icon", description: "Elemento raiz SVG com data-slot=\"icon\" que gerencia acessibilidade e dimensões" },
      { part: "Glifo", description: "Elemento de texto interno que renderiza a ligadura do Material Symbols" },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Acompanhe o ícone de texto explicativo sempre que o significado não for universal.", "Use aria-hidden=\"true\" para ícones puramente decorativos ao lado de rótulos de texto.", "Defina tamanhos proporcionais à escala tipográfica do elemento pai ou contexto visual."],
    dontGuidelines: ["Usar ícone isolado sem rótulo textual em um botão interativo → icon-button com aria-label.", "Usar cor ou ícone como único indicador de status crítico ou erro → combine com mensagem textual clara.", "Utilizar ícone estático para indicar espera ou carregamento em andamento → spinner."],
    code: `import { Icon } from "@/components/ui/icon"

<Icon name="check_circle" className="size-5 text-primary" />`,
    props: [
      { name: "name", type: "MaterialSymbol", default: "—", description: "Nome do símbolo no catálogo do Google Material Symbols" },
      { name: "size", type: "number", default: "—", description: "Tamanho do ícone em rem. Quando omitido, herda a dimensão do elemento pai" },
      { name: "fill", type: "boolean", default: "—", description: "Ativa o preenchimento do glifo quando verdadeiro, ou contorno quando falso" },
      { name: "rounded", type: "boolean", default: "—", description: "Alterna entre as famílias Material Symbols Rounded e Sharp" },
      { name: "weight", type: "number", default: "—", description: "Espessura do traço do símbolo (eixo wght da fonte variável)" },
      { name: "grade", type: "number", default: "—", description: "Ajuste fino de ênfase visual do glifo (eixo GRAD)" },
      { name: "opticalSize", type: "number", default: "—", description: "Tamanho óptico (eixo opsz), calculado automaticamente quando size é informado" },
    ],
    meta: {
      nome: "Icon",
      camada: "primitive",
      status: "piloto",
      codigo: "src/components/ui/icon.tsx",
      story: "src/components/ui/icon.stories.tsx",
      vizinhos: ["icon-button", "button", "spinner"],
    },
    whenToUseItems: ["Ilustrar ações e comandos dentro de botões, menus e barras de ferramentas.", "Reforçar o significado visual de alertas, badges e itens de listas informativas.", "Indicar estados do sistema como sucesso, erro ou aviso ao lado de texto explicativo."],
    whenNotToUse: ["Ação interativa que contém apenas o ícone, sem texto → icon-button.", "Disparar uma ação com texto e ícone de suporte → button.", "Indicar espera ou carregamento contínuo sem direção definida → spinner."],
    content: ["Não tem texto legível próprio; renderiza um símbolo visual.", "Deve sempre acompanhar texto de apoio ou receber rótulo acessível quando utilizado em elementos interativos.", "Mantenha o mesmo estilo e família de ícones em todo o fluxo da interface."],
    accessibility: {
      keyboard: "Não recebe foco diretamente. Quando inserido dentro de um controle interativo, o foco é tratado pelo componente pai.",
      screenReader: "Recebe aria-hidden=\"true\" por padrão para ser ignorado como elemento decorativo. Se atributos como aria-label, aria-labelledby ou role forem fornecidos, eles são preservados no SVG.",
      focus: "Não recebe nem retém foco.",
      cautions: "Nunca transmita uma informação crítica apenas pela presença do ícone sem alternativa em texto visível ou audível (WCAG 1.1.1 e 1.4.1).",
    },
    tokens: [
      { contexto: "Ícone", itens: ["--font-material-rounded", "--font-material-sharp", "--icon-fill", "--icon-font-family", "--icon-grade", "--icon-optical-size", "--icon-weight"] },
    ],
  },
  files: {
    description: "Árvore de pastas e arquivos (file tree / explorer) que expande e recolhe diretórios com animação.",
    whenToUse: "Use para navegar por uma estrutura hierárquica de pastas e arquivos, em que o usuário abre e fecha diretórios e seleciona um item.",
    anatomy: [
      { part: "Files", description: "Contêiner raiz com role=\"tree\" e aria-label (prop `label`)." },
      { part: "Folder", description: "Diretório, construído sobre Collapsible; guarda o estado aberto/fechado." },
      { part: "FolderTrigger", description: "Botão que abre/fecha a pasta, com chevron que gira e ícone de pasta que alterna entre fechada e aberta (ou `icon` customizado)." },
      { part: "FolderContent", description: "Conteúdo recolhível com os filhos (subpastas e arquivos), dentro de um role=\"group\" com guia vertical à esquerda." },
      { part: "File", description: "Item final com role=\"treeitem\", focável, com ícone (padrão \"description\" ou `icon`) e nome." },
    ],
    variants: [],
    states: [
      { name: "Pasta fechada / aberta", description: "Controlado pelo Collapsible (`defaultOpen`, `open`, `onOpenChange` em Folder)." },
      { name: "Arquivo ativo", description: "prop `active` em File: fundo de destaque e texto em peso médio." },
      { name: "Hover e foco", description: "Fundo de destaque no hover; anel de foco na navegação por teclado." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { Files, Folder, FolderTrigger, FolderContent, File } from "@/components/ui/files"

<Files label="Arquivos do projeto">
  <Folder value="src" defaultOpen>
    <FolderTrigger>src</FolderTrigger>
    <FolderContent>
      <File value="index.ts" active />
    </FolderContent>
  </Folder>
</Files>`,
    props: [
      { name: "label (Files)", type: "string", default: "\"Navegador de arquivos\"", description: "Nome acessível da árvore (aria-label)." },
      { name: "value (Folder, File)", type: "string", description: "Identificador do nó. Em File, vira o texto exibido quando não há children." },
      { name: "defaultOpen (Folder)", type: "boolean", default: "false", description: "Pasta começa aberta." },
      { name: "icon (FolderTrigger, File)", type: "React.ReactNode", description: "Substitui o ícone padrão de pasta ou de arquivo." },
      { name: "active (File)", type: "boolean", default: "false", description: "Marca o arquivo selecionado." },
    ],
  },
  "speed-dial": {
    description: "Botão de ação flutuante (FAB) que, ao ser acionado, se expande em uma sequência de ações secundárias relacionadas.",
    whenToUse: "Use quando várias ações secundárias relacionadas precisam ficar a um toque, sem ocupar espaço na tela até serem pedidas. Abre por clique/toque, não por hover, então funciona em mobile.",
    anatomy: [
      { part: "Raiz", description: "Contêiner com data-slot=\"speed-dial\" e data-state (open/closed); fecha ao clicar fora." },
      { part: "Botão principal", description: "FAB que abre e fecha o menu; nome acessível vem de `triggerLabel`." },
      { part: "Ações", description: "Lista de botões (`actionButtons`) que surgem em sequência escalonada na direção escolhida." },
    ],
    variants: [
      { name: "Para cima", value: "up", description: "Ações acima do botão (padrão)." },
      { name: "Para baixo", value: "down", description: "Ações abaixo do botão." },
      { name: "Para a esquerda", value: "left", description: "Ações à esquerda do botão." },
      { name: "Para a direita", value: "right", description: "Ações à direita do botão." },
    ],
    states: [
      { name: "Fechado / aberto", description: "Controlado (`open` + `onOpenChange`) ou não controlado (`defaultOpen`)." },
      { name: "Ação desabilitada", description: "`disabled` em um item de `actionButtons`." },
      { name: "Teclado", description: "Escape fecha e devolve o foco ao botão principal; setas percorrem as ações no eixo da direção." },
    ],
    sizes: [],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `import { SpeedDial } from "@/components/ui/speed-dial"
import { Icon } from "@/components/ui/icon"

<SpeedDial
  direction="up"
  triggerLabel="Ações rápidas"
  actionButtons={[
    { key: "share", label: "Compartilhar", icon: <Icon name="share" />, action: () => {} },
    { key: "print", label: "Imprimir", icon: <Icon name="print" />, action: () => {} },
  ]}
/>`,
    props: [
      { name: "actionButtons", type: "{ key, label, icon, action, disabled? }[]", description: "Ações secundárias exibidas ao abrir." },
      { name: "direction", type: "\"up\" | \"down\" | \"left\" | \"right\"", default: "\"up\"", description: "Para onde as ações se expandem." },
      { name: "triggerLabel", type: "string", default: "\"Ações rápidas\"", description: "Nome acessível do botão principal." },
      { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / (open: boolean) => void", description: "Estado controlado ou não controlado." },
    ],
  },
  direction: {
    description: "Diz aos componentes qual é o sentido de leitura (da esquerda para a direita ou o contrário). É base que os outros consomem: não renderiza nada.",
    whenToUse: "A tela ou um trecho dela é lido da direita para a esquerda (hebraico, árabe). Um componente do R.DS precisa seguir o sentido de leitura, como as setas do teclado em abas e controles deslizantes. Um código seu precisa saber o sentido atual, com useDirection.",
    anatomy: [
      { part: "DirectionProvider", description: "Entrega o sentido de leitura (direction, ou dir) para tudo que está dentro dele. Não cria elemento no HTML" },
      { part: "useDirection", description: "Hook que devolve o sentido atual para quem está dentro do provider" },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Ponha o provider uma vez, no topo do trecho que muda de sentido.", "Passe o mesmo valor ao DirectionProvider e ao atributo dir do container.", "Leia o sentido com useDirection em vez de comparar o idioma na mão."],
    dontGuidelines: ["Usar o provider para mudar o visual de um elemento → classes rtl: do Tailwind.", "Aninhar vários providers com valores diferentes sem necessidade → um só, no ponto onde o sentido muda.", "Esperar que o provider espelhe o layout sozinho → espelhe ícones e espaços com rtl: ou com dir no container."],
    code: `import { DirectionProvider } from "@/components/ui/direction"

<DirectionProvider direction="rtl">
  <div dir="rtl">…</div>
</DirectionProvider>`,
    props: [
      { name: "direction", type: "React.ComponentProps<typeof Direction.DirectionProvider>[\"dir\"]", default: "—", description: "Sentido de leitura: ltr ou rtl" },
      { name: "dir", type: "ltr · rtl", default: "—", description: "Mesmo efeito de direction; se vierem os dois, vale direction" },
      { name: "children", type: "React.ReactNode", default: "—", description: "O que recebe o sentido" },
    ],
    meta: {
      nome: "Direction",
      camada: "primitive",
      status: "piloto",
      codigo: "src/components/ui/direction.tsx",
      story: "",
      vizinhos: ["tabs", "slider"],
    },
    whenToUseItems: ["A tela ou um trecho dela é lido da direita para a esquerda (hebraico, árabe).", "Um componente do R.DS precisa seguir o sentido de leitura, como as setas do teclado em abas e controles deslizantes.", "Um código seu precisa saber o sentido atual, com useDirection."],
    whenNotToUse: ["A tela toda é da esquerda para a direita, que é o padrão → não use nada.", "Inverter só um elemento solto → atributo dir no próprio elemento.", "Espelhar ícones ou margens com CSS → classes rtl: do Tailwind."],
    content: ["Não tem texto próprio.", "O texto dentro dele segue o idioma da tela: se o provider é rtl, escreva o conteúdo no idioma que se lê assim."],
    accessibility: {
      keyboard: "Não recebe foco. Os componentes do R.DS feitos sobre o Radix, como tabs e slider, leem o contexto para que as setas sigam o sentido de leitura.",
      screenReader: "Não anuncia nada. O provider não aplica o atributo dir no HTML: ponha dir no container (e lang na tela) para o leitor de tela usar a voz certa.",
      focus: "Não recebe nem move o foco.",
      cautions: "O provider e o atributo dir não se sincronizam sozinhos: passe o mesmo valor aos dois, senão o texto e as setas do teclado vão para lados diferentes (WCAG 1.3.2).",
    },
  },
}
