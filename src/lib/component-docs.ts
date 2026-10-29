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
    description: "Representa visualmente uma pessoa, conta ou organização. Exibe a foto do usuário com fallback automático para iniciais ou ícone quando a imagem não carregar.",
    whenToUse: "Identificar a conta do usuário logado na barra de navegação ou cabeçalho. Representar autores de mensagens, comentários ou atividades em fluxos colaborativos. Exibir participantes de equipes ou projetos agrupados com contagem excedente.",
    anatomy: [
      { part: "Avatar", description: "Container circular raiz com data-slot=\"avatar\" e data-size" },
      { part: "AvatarImage", description: "Elemento de imagem que oculta automaticamente se falhar ao carregar" },
      { part: "AvatarFallback", description: "Alternativa com fundo muted exibida durante o carregamento ou após falha" },
      { part: "AvatarBadge", description: "Indicador pontual posicionado no canto inferior direito para status ou selo" },
      { part: "AvatarGroup", description: "Container flexível que agrupa avatares com sobreposição negativa" },
      { part: "AvatarGroupCount", description: "Círculo indicador com contador numérico para membros excedentes" },
    ],
    variants: [],
    states: [
      { name: "Fallback", description: "Fundo muted com texto de iniciais ou ícone centralizado enquanto a imagem carrega ou se houver erro" },
      { name: "Imagem carregada", description: "Imagem cobre o círculo proporcionalmente e sobrepõe o fallback" },
    ],
    sizes: [],
    doGuidelines: ["Use iniciais com duas letras maiúsculas quando a foto não estiver disponível.", "Mantenha o mesmo tamanho de avatar em todos os itens de uma lista ou tabela.", "Exiba o nome completo do usuário próximo ao avatar ou em uma dica flutuante."],
    dontGuidelines: ["Usar imagens de baixa resolução ou rostos cortados → imagem nítida com enquadramento centralizado.", "Agrupar mais de 5 rostos visíveis no mesmo grupo → limite a 4 avatares e use AvatarGroupCount para o excedente.", "Usar cores aleatórias de fundo sem garantir contraste suficiente → use o fallback padrão em bg-muted."],
    code: `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/foto-perfil.jpg" alt="Rafael Anhaia" />
  <AvatarFallback>RA</AvatarFallback>
</Avatar>`,
    props: [
      { name: "size (Avatar)", type: "default · sm · lg", default: "default", description: "Dimensão do círculo do avatar" },
    ],
    meta: {
      nome: "Avatar",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/avatar.tsx",
      story: "src/components/ui/avatar.stories.tsx",
      vizinhos: ["badge", "thumbnail", "icon"],
    },
    whenToUseItems: ["Identificar a conta do usuário logado na barra de navegação ou cabeçalho.", "Representar autores de mensagens, comentários ou atividades em fluxos colaborativos.", "Exibir participantes de equipes ou projetos agrupados com contagem excedente."],
    whenNotToUse: ["Selo numérico ou indicador textual de status sem pessoa ou foto → badge.", "Miniatura retangular de arquivo, mídia ou anexo → thumbnail.", "Símbolo gráfico genérico sem relação com perfil ou identidade de conta → icon."],
    content: ["Iniciais com até duas letras em maiúsculas (primeira letra do nome e do sobrenome).", "O texto alternativo no atributo alt da imagem deve ser o nome da pessoa ou organização.", "No grupo de avatares com contagem (+3), o número indica exatamente a quantidade restante de participantes."],
    accessibility: {
      keyboard: "Não recebe foco diretamente. Quando usado como gatilho de menu ou perfil, envolva em botão ou link interativo.",
      screenReader: "Imagens de avatar devem conter o nome do usuário no atributo alt. Quando acompanhado pelo nome por extenso visível, marque como decorativo passando alt vazio.",
      focus: "Não retém foco por si só. Quando envolvido por link ou botão, exibe o anel de foco do elemento pai.",
      cautions: "Ao usar AvatarBadge para indicar status (como online/offline), garanta que a informação não dependa unicamente da cor, fornecendo texto acessível associado ou aria-label (WCAG 1.4.1).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-muted", "bg-primary", "text-muted-foreground", "text-primary-foreground"] },
      { contexto: "Tipografia", itens: ["text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["bottom-0", "right-0", "size-10", "size-2", "size-2.5", "size-3", "size-4", "size-5", "size-6", "size-8", "space-x-2"] },
      { contexto: "Raio", itens: ["rounded-full"] },
      { contexto: "Foco", itens: ["ring-background"] },
    ],
  },
  badge: {
    description: "Rótulo compacto para destacar status, contagem ou metadado associado a um item. Componente puramente informativo, projetado para leitura e não para interação direta.",
    whenToUse: "Indicar o status de um registro ou processo (ex.: Ativo, Concluído, Em análise). Exibir contagens numéricas compactas ou notificações não lidas em tabelas e listas. Destacar uma categoria ou atributo estático junto a um cabeçalho ou card.",
    anatomy: [
      { part: "Badge", description: "Container span com data-slot=\"badge\" e data-variant em formato de pílula" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Destaque principal ou estado prioritário da interface" },
      { name: "Secondary", value: "secondary", description: "Informação secundária de menor ênfase visual" },
      { name: "Destructive", value: "destructive", description: "Estado de erro, cancelamento, bloqueio ou alerta crítico" },
      { name: "Outline", value: "outline", description: "Informação neutra com borda sutil e fundo transparente" },
      { name: "Ghost", value: "ghost", description: "Estilo sem preenchimento para uso composicional via asChild" },
      { name: "Link", value: "link", description: "Aparência de hiperlink para associação sutil de navegação" },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["Mantenha o texto do selo curto, usando uma ou duas palavras que definam o estado claramente.", "Garanta que a mesma cor represente sempre o mesmo status em toda a aplicação.", "Use ícones pequenos de 12 px (size-3) antes do texto apenas como reforço de significado."],
    dontGuidelines: ["Usar Badge como filtro clicável ou botão de ação direta → chip.", "Usar Badge para tags removíveis com botão de fechar → tag.", "Depender exclusivamente da cor para comunicar sucesso ou erro → use texto explícito ou ícone acessível."],
    code: `import { Badge } from "@/components/ui/badge"

<div className="flex items-center gap-2">
  <Badge>Novo</Badge>
  <Badge variant="secondary">Rascunho</Badge>
  <Badge variant="destructive">Cancelado</Badge>
</div>`,
    props: [
      { name: "variant", type: "default · secondary · destructive · outline · ghost · link", default: "default", description: "Estilo visual e nível de destaque do selo" },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza as propriedades no elemento filho via Radix Slot" },
    ],
    meta: {
      nome: "Badge",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/badge.tsx",
      story: "src/components/ui/badge.stories.tsx",
      vizinhos: ["chip", "tag", "button"],
    },
    whenToUseItems: ["Indicar o status de um registro ou processo (ex.: Ativo, Concluído, Em análise).", "Exibir contagens numéricas compactas ou notificações não lidas em tabelas e listas.", "Destacar uma categoria ou atributo estático junto a um cabeçalho ou card."],
    whenNotToUse: ["Filtro clicável que alterna a visão de uma listagem → chip.", "Etiqueta removível com botão de fechar para filtros aplicados → tag.", "Elemento interativo que dispara uma ação ao receber clique → button."],
    content: ["Uma ou duas palavras no máximo, preferencialmente substantivos ou adjetivos que indiquem estado.", "Use texto em maiúsculas e minúsculas naturais (ex.: Publicado, Rascunho), nunca tudo em caixa alta.", "Para contadores numéricos, use números puros ou formato abreviado (ex.: +99)."],
    accessibility: {
      keyboard: "Não recebe foco por padrão. Quando usado como link interativo com asChild, entra na ordem de tabulação e responde a Enter ou Espaço.",
      screenReader: "Lido como texto em linha comum. Em contadores puramente numéricos, forneça contexto adicional com aria-label (ex.: 5 notificações pendentes).",
      focus: "Não retém foco na visualização padrão.",
      cautions: "Nunca transmita um estado apenas pela cor da variante; o texto precisa explicitar o significado (WCAG 1.4.1).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-destructive", "bg-primary", "bg-secondary", "border-border", "border-destructive", "border-ring", "text-accent-foreground", "text-foreground", "text-primary", "text-primary-foreground", "text-secondary-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "leading-none", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "min-h-6", "px-2", "py-0.5", "size-3"] },
      { contexto: "Raio", itens: ["rounded-full"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
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
    description: "Permite marcar ou desmarcar opções independentes em formulários e listagens. Suporta estados marcado, desmarcado e indeterminado.",
    whenToUse: "Permitir a escolha de múltiplas opções independentes dentro de uma lista. Confirmar aceite de termos, políticas ou condições individuais de um formulário. Controlar seleção total em listas com opção \"selecionar todos\" em estado indeterminado.",
    anatomy: [
      { part: "Checkbox", description: "Caixa de seleção raiz com data-slot=\"checkbox\", data-state e indicador de ícone" },
      { part: "Ícone (interno)", description: "Glifo check ou remove renderizado dentro de CheckboxPrimitive.Indicator" },
    ],
    variants: [],
    states: [
      { name: "Desmarcado", description: "Borda border-input com fundo transparente e sombra shadow-xs" },
      { name: "Marcado", description: "Fundo e borda bg-primary com ícone de check em text-primary-foreground" },
      { name: "Indeterminado", description: "Fundo e borda bg-primary com ícone de traço horizontal em text-primary-foreground" },
      { name: "Foco", description: "Anel de foco externo de 3 px em ring-ring com border-ring" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% com cursor-not-allowed e sem resposta a eventos" },
      { name: "Inválido", description: "Borda em border-destructive e anel sutil em ring-destructive/20" },
    ],
    sizes: [],
    doGuidelines: ["Associe sempre a caixa de seleção a um rótulo textual legível com componente label ou id correspondente.", "Torne a linha inteira clicável (caixa + rótulo) para facilitar a interação e aumentar a área de toque.", "Use o estado indeterminado no item pai quando apenas parte dos itens filhos estiver selecionada."],
    dontGuidelines: ["Usar Checkbox para escolhas mutuamente exclusivas onde apenas uma opção é permitida → radio-group.", "Acionar salvamentos ou alterações imediatas na aplicação sem confirmação → switch.", "Escrever rótulos negativos que invertem o sentido da marcação → afirmativa positiva clara."],
    code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="termos" />
  <Label htmlFor="termos">Aceito os termos de uso e condições</Label>
</div>`,
    props: [
      { name: "checked (Checkbox)", type: "boolean · indeterminate", default: "false", description: "Estado atual de marcação do checkbox" },
      { name: "defaultChecked (Checkbox)", type: "boolean · indeterminate", default: "false", description: "Estado inicial de marcação quando não controlado" },
      { name: "onCheckedChange (Checkbox)", type: "(checked: boolean) => void", default: "—", description: "Callback disparado ao alterar o estado de marcação" },
      { name: "disabled (Checkbox)", type: "boolean", default: "false", description: "Desabilita interações de clique e teclado" },
      { name: "required (Checkbox)", type: "boolean", default: "false", description: "Indica que o preenchimento é obrigatório no formulário" },
    ],
    meta: {
      nome: "Checkbox",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/checkbox.tsx",
      story: "src/components/ui/checkbox.stories.tsx",
      vizinhos: ["switch", "radio-group", "field"],
    },
    whenToUseItems: ["Permitir a escolha de múltiplas opções independentes dentro de uma lista.", "Confirmar aceite de termos, políticas ou condições individuais de um formulário.", "Controlar seleção total em listas com opção \"selecionar todos\" em estado indeterminado."],
    whenNotToUse: ["Escolha exclusiva de uma única opção entre várias alternativas → radio-group.", "Alternância instantânea de configuração que entra em vigor sem botão de salvar → switch.", "Mais de 6 opções exclusivas num espaço compacto → select."],
    content: ["O rótulo associado deve ser uma afirmação clara e positiva (ex.: Quero receber atualizações).", "Evite negações duplas ou frases confusas no rótulo (ex.: Não desejo cancelar minha inscrição).", "Associe sempre um componente label ou field com htmlFor correspondente ao id do Checkbox."],
    accessibility: {
      keyboard: "Navega com Tab para alcançar o elemento. Tecla Espaço alterna entre marcado e desmarcado.",
      screenReader: "Anuncia papel role=\"checkbox\", nome acessível via label associado e estado atual (marcado, desmarcado ou misto/indeterminado).",
      focus: "Exibe anel visível de 3 px (ring-ring) com foco pelo teclado. Ao clicar no rótulo de texto, o foco é transferido para a caixa de marcação.",
      cautions: "A área de clique deve cobrir tanto a caixa quanto o texto do rótulo para atender à meta de alvo de toque de 24 px (WCAG 2.5.8). Em grupos de opções relacionadas, agrupe com fieldset ou componente field.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-primary", "border-destructive", "border-input", "border-primary", "border-ring", "text-primary-foreground"] },
      { contexto: "Espaço", itens: ["--form-control-size"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
    ],
  },
  chip: {
    description: "Sinaliza um critério ou atributo ativo aplicado a uma busca ou filtragem de lista. Permite ao usuário visualizar e remover regras ativas.",
    whenToUse: "Exibir filtros de busca ativos que podem ser desfeitos individualmente pelo usuário (\"Categoria: Roupas, Preço até R$ 100\"). Indicar atributos aplicados a uma listagem dinâmica com opção de remoção imediata. Sinalizar critérios sugeridos automaticamente por inteligência artificial via variante ai-generated.",
    anatomy: [
      { part: "Chip", description: "Elemento raiz em span que encapsula o rótulo, ícone e botão de remoção" },
      { part: "ChipSkeleton", description: "Placeholder animado que preserva o espaço visual durante o carregamento" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Critérios e filtros ativos comuns aplicados manualmente pelo usuário" },
      { name: "Ai-generated", value: "ai-generated", description: "Critérios ou atributos sugeridos automaticamente por inteligência artificial" },
    ],
    states: [
      { name: "Padrão", description: "Fundo neutro bg-muted e texto text-foreground (ou superfície de IA em ai-generated)" },
      { name: "Hover", description: "Aplicado ao botão de remover quando presente, herdando o hover da variante ghost" },
      { name: "Foco", description: "Anel de foco exibido exclusivamente no botão de remoção ao navegar via Tab" },
      { name: "Desabilitado", description: "Opacidade reduzida a 50% e interações desativadas (opacity-50 pointer-events-none)" },
    ],
    sizes: [],
    doGuidelines: ["Utilize removeLabel descritivo quando houver múltiplos filtros na tela (\"Remover filtro Roupas\").", "Agrupe chips em containers flexíveis com espaçamento consistente (gap-1.5 ou gap-2).", "Use variant=\"ai-generated\" para diferenciar atributos sugeridos automaticamente de escolhas manuais."],
    dontGuidelines: ["Usar chip interativo para indicar status estático sem remoção → badge", "Utilizar verbos de ação no texto principal do chip → use substantivos e reserve ações para button", "Esquecer de definir onRemove quando removable for verdadeiro → passe a função de callback ou deixe removable={false}"],
    code: `import { Chip } from "@/components/ui/chip"
import { Icon } from "@/components/ui/icon"

<div className="flex flex-wrap gap-2">
  <Chip>Categoria: Roupas</Chip>
  <Chip
    icon={<Icon name="sell" />}
    removable
    removeLabel="Remover filtro Promoção"
    onRemove={() => {}}
  >
    Promoção
  </Chip>
  <Chip variant="ai-generated" removable onRemove={() => {}}>
    Sugestão automática
  </Chip>
</div>`,
    props: [
      { name: "variant", type: "default · ai-generated", default: "default", description: "Estilo visual do chip, indicando padrão neutro ou sugestão gerada por IA" },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho via Radix Slot em vez de span" },
      { name: "icon", type: "React.ReactNode", default: "—", description: "Ícone ilustrativo exibido antes do rótulo" },
      { name: "removable", type: "boolean", default: "false", description: "Exibe o botão de fechar e remoção à direita" },
      { name: "onRemove", type: "() => void", default: "—", description: "Função disparada ao acionar o botão de remoção" },
      { name: "removeLabel", type: "string", default: "Remover", description: "Texto de acessibilidade (aria-label) do botão de remover" },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa interações e reduz a opacidade do componente" },
    ],
    meta: {
      nome: "Chip",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/chip.tsx",
      story: "src/components/ui/chip.stories.tsx",
      vizinhos: ["badge", "tag"],
    },
    whenToUseItems: ["Exibir filtros de busca ativos que podem ser desfeitos individualmente pelo usuário (\"Categoria: Roupas, Preço até R$ 100\").", "Indicar atributos aplicados a uma listagem dinâmica com opção de remoção imediata.", "Sinalizar critérios sugeridos automaticamente por inteligência artificial via variante ai-generated."],
    whenNotToUse: ["Exibir rótulo de status só de leitura sem ação de remoção → badge", "Categorização de conteúdo fixa e estática sem interatividade de filtro → tag", "Disparar uma ação comum do sistema em vez de representar um critério → button"],
    content: ["Texto curto e conciso de até três palavras sem verbo: \"Categoria: Roupas\".", "Mantenha o mesmo termo utilizado no seletor ou filtro de origem.", "Em chips removíveis, forneça removeLabel claro para leitor de tela: \"Remover filtro Categoria\"."],
    accessibility: {
      keyboard: "O corpo do chip não recebe foco por padrão. Quando removable estiver ativo, o botão de fechar recebe Tab e aciona onRemove com Enter ou Espaço.",
      screenReader: "Renderizado em tag semântica de texto. O botão de remoção anuncia o texto acessível configurado em removeLabel (padrão \"Remover\").",
      focus: "O anel de foco aparece exclusivamente ao redor do botão de remoção ao navegar pelo teclado.",
      cautions: "O botão interno de remoção cumpre a área mínima acessível de 24 px; garanta que removeLabel descreva qual filtro está sendo removido quando houver múltiplos chips na tela (WCAG 2.5.8 e 4.1.2).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-ai-surface", "bg-muted", "border-ai-interactive", "text-ai-text-high", "text-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "leading-none", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "h-6", "min-h-6", "pr-0.5", "px-1.5", "size-3", "w-20"] },
      { contexto: "Raio", itens: ["rounded-sm"] },
    ],
  },
  "icon-button": {
    description: "Dispara uma ação representada exclusivamente por um ícone visual, sem rótulo textual visível. O nome acessível é obrigatório via tipagem estática para navegação acessível.",
    whenToUse: "Ações frequentes em barras de ferramentas ou cabeçalhos densos com espaço reduzido. Ações universais baseadas em ícones amplamente reconhecidos, como fechar, buscar, favoritar ou editar. Ações secundárias em linhas de tabela ou cartões, sempre acompanhadas de dica flutuante.",
    anatomy: [
      { part: "IconButton", description: "Raiz: elemento <button> com data-slot=\"icon-button\" que encapsula Button e restringe as escalas quadradas." },
      { part: "Ícone", description: "Elemento gráfico obrigatório informado via prop icon, único conteúdo visual renderizado." },
      { part: "IconButtonSkeleton", description: "Placeholder de carregamento que reaproveita a geometria quadrada do botão." },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Superfície da variante escolhida; variantes com elevação usam shadow-sm" },
      { name: "Hover", description: "Fundo um tom abaixo; na variante default a elevação desce 1 px" },
      { name: "Pressionado", description: "Escala reduzida via active:scale-(--scale-pressed)" },
      { name: "Foco", description: "Anel de foco de 3 px em ring via focus-visible" },
      { name: "Desabilitado", description: "Opacidade reduzida com opacity-50, sem sombra e sem clique" },
      { name: "Carregando", description: "Composição com IconButton.Skeleton na mesma escala quadrada" },
    ],
    sizes: [],
    doGuidelines: ["Passe um aria-label descritivo e objetivo informando a ação direta: Favoritar, Fechar janela.", "Combine o botão com tooltip para garantir compreensão rápida por usuários que usam mouse ou toque.", "Utilize símbolos e glifos universalmente consagrados para evitar confusão no uso diário."],
    dontGuidelines: ["Ícone isolado para ação rara ou ambígua → button com texto.", "Botão de ícone sem nome acessível ou com descrição vazia → passe aria-label obrigatório.", "Ação destrutiva sem confirmação ou sem destaque de perigo → button destrutivo ou alert-dialog."],
    code: `import { Icon } from "@/components/ui/icon"
import { IconButton } from "@/components/ui/icon-button"

<IconButton icon={<Icon name="favorite" />} aria-label="Favoritar" />
<IconButton variant="ghost" size="icon-sm" icon={<Icon name="close" />} aria-label="Fechar" />
<IconButton.Skeleton size="icon" />`,
    props: [
      { name: "icon", type: "React.ReactNode", default: "—", description: "Ícone exibido como único conteúdo do botão" },
      { name: "size", type: "IconButtonSize", default: "icon", description: "Dimensão quadrada restrita às escalas de ícone do Button" },
      { name: "aria-label", type: "string", default: "—", description: "Nome acessível obrigatório via tipo para leitores de tela" },
      { name: "variant", type: "—", default: "default", description: "Variante visual herdada das variantes do Button" },
      { name: "size (IconButtonSkeleton)", type: "IconButtonSize", default: "icon", description: "Dimensão quadrada do placeholder de carregamento" },
    ],
    meta: {
      nome: "Icon Button",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/icon-button.tsx",
      story: "src/components/ui/icon-button.stories.tsx",
      vizinhos: ["button", "toggle", "tooltip"],
    },
    whenToUseItems: ["Ações frequentes em barras de ferramentas ou cabeçalhos densos com espaço reduzido.", "Ações universais baseadas em ícones amplamente reconhecidos, como fechar, buscar, favoritar ou editar.", "Ações secundárias em linhas de tabela ou cartões, sempre acompanhadas de dica flutuante."],
    whenNotToUse: ["Ação complexa que necessita de rótulo em texto para evitar ambiguidade → button.", "Ação de ligar ou desligar um estado independente em vez de disparar comando → toggle.", "Destino que redireciona o usuário para outra rota ou página externa → link."],
    content: ["Não possui texto visível próprio; exige aria-label com verbo no imperativo ou infinitivo: Fechar, Excluir item.", "O texto do aria-label deve coincidir exatamente com a dica flutuante associada: Copiar link.", "Sem ponto final e sem exclamação no nome acessível."],
    accessibility: {
      keyboard: "Tab move o foco para o botão; Enter ou Espaço acionam a ação.",
      screenReader: "Papel button. Como não há texto visível, o leitor anuncia o valor obrigatório passado em aria-label.",
      focus: "Anel de 3 px visível no teclado (focus-visible). Após a execução, o foco permanece no próprio botão se a tela continuar a mesma.",
      cautions: "Nunca renderize ícone interativo sem nome acessível claro (WCAG 4.1.2) e garanta alvo de toque mínimo de 24 px (WCAG 2.5.8), usando tooltip para usuários visuais.",
    },
  },
  input: {
    description: "Campo de entrada para capturar textos ou valores de linha única. Dá suporte a rótulo embutido ou flutuante e ação interativa no final.",
    whenToUse: "Capturar informações curtas de uma linha em formulários: nome, e-mail, senha, telefone. Entradas de busca ou filtros simples em cabeçalhos e barras de ferramentas. Campos com ação acoplada ao final: alternar exibição de senha ou limpar texto.",
    anatomy: [
      { part: "Input", description: "Elemento nativo <input> de linha única com data-slot=\"input\" e suporte a wrapper relativo com rótulo" },
      { part: "endIcon (opcional)", description: "Ícone ilustrativo de 24 px à direita com aria-hidden" },
      { part: "endAction (opcional)", description: "Botão interativo de 36×36 px à direita com aria-label para ações rápidas no campo" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Borda border-input com fundo transparente e sombra shadow-xs" },
      { name: "Foco", description: "Anel de 3 px em ring-ring e borda border-ring via focus-visible" },
      { name: "Inválido", description: "Borda border-destructive e anel suave em tom destrutivo com aria-invalid" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50%, cursor não permitido e eventos bloqueados" },
    ],
    sizes: [],
    doGuidelines: ["Associe sempre um rótulo visível ao campo usando a prop label ou o componente Label.", "Forneça o type nativo adequado (email, tel, number) para acionar o teclado correto no celular.", "Indique erro associando aria-invalid ao campo e exibindo uma mensagem textual explicativa."],
    dontGuidelines: ["Usar o placeholder como substituto do rótulo → label", "Esconder mensagens de validação e ajuda → field", "Campo de digitação única para código de autenticação ou PIN → input-otp"],
    code: `import { Input } from "@/components/ui/input"

<Input label="E-mail" type="email" placeholder="nome@exemplo.com" />
<Input
  label="Senha"
  type="password"
  endAction={{
    icon: "visibility",
    onClick: () => {},
    "aria-label": "Mostrar senha",
  }}
/>`,
    props: [
      { name: "label", type: "React.ReactNode", default: "—", description: "Rótulo exibido acima do campo ou com animação flutuante" },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Anima o rótulo para fora do campo no foco ou preenchimento" },
      { name: "endIcon", type: "MaterialSymbol", default: "—", description: "Ícone ilustrativo à direita com aria-hidden" },
      { name: "endAction", type: "never", default: "—", description: "Ação interativa no canto direito com ícone, clique e aria-label" },
      { name: "type", type: "string", default: "\"text\"", description: "Tipo nativo do input (email, password, number, file)" },
      { name: "disabled", type: "boolean", default: "false", description: "Desabilita o campo e bloqueia interação" },
      { name: "aria-invalid", type: "boolean", default: "—", description: "Borda e anel de foco em tom destrutivo quando inválido" },
    ],
    meta: {
      nome: "Input",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/input.tsx",
      story: "src/components/ui/input.stories.tsx",
      vizinhos: ["textarea", "field", "input-otp", "combobox"],
    },
    whenToUseItems: ["Capturar informações curtas de uma linha em formulários: nome, e-mail, senha, telefone.", "Entradas de busca ou filtros simples em cabeçalhos e barras de ferramentas.", "Campos com ação acoplada ao final: alternar exibição de senha ou limpar texto."],
    whenNotToUse: ["Texto longo com mais de uma linha ou parágrafos → textarea", "Código de verificação com dígitos isolados ou token SMS → input-otp", "Campo que precisa de mensagem de ajuda, erro e descrição estruturadas → field"],
    content: ["Rótulo curto e claro indicando o dado esperado: E-mail, Senha de acesso.", "Placeholder como exemplo real de preenchimento (\"nome@empresa.com\"), nunca como instrução única.", "Sem dois-pontos ao final do rótulo e sem ponto final em placeholders curtos."],
    accessibility: {
      keyboard: "Tab move o foco para o campo; a digitação edita o texto; atalhos nativos de navegação e colagem funcionam livremente.",
      screenReader: "Papel textbox (ou correspondente ao type); o nome acessível vem do rótulo associado via htmlFor ou de aria-label.",
      focus: "O anel visível de 3 px destaca o campo ativo; com endAction, o botão recebe foco por Tab logo após o input.",
      cautions: "Nunca substitua o rótulo pelo placeholder; ao usar endAction, forneça sempre um aria-label descritivo na ação.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-primary", "border-destructive", "border-input", "border-ring", "text-accent-foreground", "text-foreground", "text-muted-foreground", "text-primary-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-base", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1.5", "h-7", "h-9", "left-0", "left-3", "min-w-0", "mt-5", "pr-9", "px-3", "py-1", "right-0", "size-9", "top-0", "top-1"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-r-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Movimento", itens: ["duration-motion-fast"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
    ],
  },
  "input-otp": {
    description: "Campo especializado para captura de códigos de verificação pontuais (OTP/2FA). Distribui os caracteres em casas individuais com avanço automático e suporte a colar o código completo.",
    whenToUse: "Capturar códigos de autenticação em duas etapas (2FA) e confirmações de segurança. Receber senhas descartáveis (OTP) enviadas por e-mail ou SMS com 4, 6 ou 8 dígitos. Permitir entrada rápida onde o usuário digita dígito a dígito ou cola o código de uma vez.",
    anatomy: [
      { part: "InputOTP", description: "Container raiz que envolve o input invisível capturando o valor completo" },
      { part: "InputOTPGroup", description: "Agrupador flexível que alinha e estiliza visualmente um conjunto de slots" },
      { part: "InputOTPSlot", description: "Célula individual para um único caractere com cursor piscante falso" },
      { part: "InputOTPSeparator", description: "Divisor visual intermediário com ícone de traço entre blocos de dígitos" },
    ],
    variants: [],
    states: [
      { name: "Vazio", description: "Borda border-input com fundo padrão sem indicador ativo" },
      { name: "Ativo", description: "Anel de foco externo de 3 px em ring-ring com cursor falso piscante" },
      { name: "Preenchido", description: "Exibe o caractere digitado centralizado na célula" },
      { name: "Desabilitado", description: "Container com opacidade reduzida em 50% e cursor-not-allowed" },
      { name: "Inválido", description: "Borda em border-destructive e anel sutil em ring-destructive/20" },
    ],
    sizes: [],
    doGuidelines: ["Permita que o usuário cole o código completo recebido por e-mail ou SMS de uma só vez.", "Separe blocos de dígitos com InputOTPSeparator para facilitar a leitura visual de códigos de 6 ou mais dígitos.", "Adicione autocomplete=\"one-time-code\" para habilitar a sugestão automática de código no teclado do celular."],
    dontGuidelines: ["Usar InputOTP para códigos longos com mais de 8 dígitos → use o componente input padrão.", "Limpar todos os campos quando o usuário erra um único caractere → mantenha o valor e sinalize o erro.", "Desabilitar a função de colar do sistema operacional → permita colar livremente (WCAG 3.3.8)."],
    code: `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    props: [
      { name: "containerClassName", type: "string", default: "—", description: "Classe CSS aplicada ao container externo" },
      { name: "aria-label", type: "string", default: "Código de verificação", description: "Rótulo acessível anunciado para o controle" },
      { name: "index (InputOTPSlot)", type: "number", default: "—", description: "Posição sequencial da célula, de 0 a maxLength - 1" },
      { name: "maxLength (InputOTP)", type: "number", default: "—", description: "Quantidade total de caracteres aceitos pelo controle" },
      { name: "value · defaultValue (InputOTP)", type: "string", default: "—", description: "Valor controlado ou inicial do código completo" },
      { name: "onChange (InputOTP)", type: "(value: string) => void", default: "—", description: "Callback chamado a cada alteração no código" },
      { name: "disabled (InputOTP)", type: "boolean", default: "false", description: "Desabilita o campo e bloqueia digitação" },
    ],
    meta: {
      nome: "Input Otp",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/input-otp.tsx",
      story: "src/components/ui/input-otp.stories.tsx",
      vizinhos: ["input", "field", "kbd"],
    },
    whenToUseItems: ["Capturar códigos de autenticação em duas etapas (2FA) e confirmações de segurança.", "Receber senhas descartáveis (OTP) enviadas por e-mail ou SMS com 4, 6 ou 8 dígitos.", "Permitir entrada rápida onde o usuário digita dígito a dígito ou cola o código de uma vez."],
    whenNotToUse: ["Senhas regulares, e-mails ou textos livres de linha única → input.", "Código longo com mais de 8 caracteres alfanuméricos contínuos → input.", "Seleção de data, hora ou chave numérica com formatação complexa → field."],
    content: ["Informe com clareza para onde o código foi enviado (ex.: Enviamos um código para seu e-mail).", "Em caso de código inválido ou expirado, informe o erro sem apagar imediatamente os dígitos inseridos.", "Ofereça opção visível para solicitar um novo código após um intervalo de tempo razoável."],
    accessibility: {
      keyboard: "Ao digitar um dígito, o foco avança automaticamente para a próxima casa. Backspace apaga o caractere e retorna para a casa anterior. Permite colar o código completo de uma vez (Ctrl+V / Cmd+V).",
      screenReader: "Renderiza um input único com aria-label=\"Código de verificação\" para evitar leituras fragmentadas casa a casa. Suporta preenchimento automático de SMS no celular com autocomplete=\"one-time-code\".",
      focus: "Destaca a célula ativa com borda e anel de 3 px (ring-ring). O foco do navegador permanece no input raiz enquanto a interface projeta o indicador na célula correspondente.",
      cautions: "Garanta compatibilidade com cópia e cola e preenchimento automático de senhas (WCAG 3.3.8). Não bloqueie a colagem do código nem apague tudo após o primeiro erro de digitação.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-foreground", "border-destructive", "border-input", "border-ring"] },
      { contexto: "Tipografia", itens: ["text-sm"] },
      { contexto: "Espaço", itens: ["gap-2", "h-4", "h-9", "inset-0", "w-9", "w-px"] },
      { contexto: "Raio", itens: ["rounded-l-md", "rounded-r-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
    ],
  },
  kbd: {
    description: "Indica teclas ou combinações de atalhos de teclado em formato visual compacto. Usado em menus, tooltips, campos de busca e documentação técnica.",
    whenToUse: "Mostrar atalhos de teclado para ações rápidas em menus suspensos e paletas de comando. Indicar teclas de atalho dentro de dicas flutuantes (tooltip) acopladas a botões. Exibir teclas em tutoriais, mensagens de ajuda e documentação de navegação.",
    anatomy: [
      { part: "Kbd", description: "Elemento nativo <kbd> inline estilizado como tecla física compacta" },
      { part: "KbdGroup", description: "Container <kbd> flexível para agrupar duas ou mais teclas de um atalho composto" },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Mostre a combinação de teclas adaptada à plataforma do usuário (⌘ no Mac e Ctrl no Windows).", "Utilize KbdGroup para agrupar teclas que devem ser pressionadas em conjunto.", "Reserve o uso de Kbd para atalhos reais implementados e funcionais na interface."],
    dontGuidelines: ["Usar Kbd como botão clicável que dispara ação ao clique → button", "Usar Kbd para exibir contagens, categorias ou status do sistema → badge", "Depender exclusivamente do atalho de teclado sem oferecer controle visual na interface → tooltip"],
    code: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

<Kbd>Esc</Kbd>

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
    props: [
      { name: "children", type: "React.ReactNode", default: "—", description: "Letra, símbolo ou nome da tecla a exibir" },
    ],
    meta: {
      nome: "Kbd",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/kbd.tsx",
      story: "src/components/ui/kbd.stories.tsx",
      vizinhos: ["button", "tooltip", "badge"],
    },
    whenToUseItems: ["Mostrar atalhos de teclado para ações rápidas em menus suspensos e paletas de comando.", "Indicar teclas de atalho dentro de dicas flutuantes (tooltip) acopladas a botões.", "Exibir teclas em tutoriais, mensagens de ajuda e documentação de navegação."],
    whenNotToUse: ["Elemento interativo ou botão clicável que dispara a ação ao clique → button", "Etiqueta de status, categoria ou contagem sem relação com teclado → badge", "Rótulo de campo de formulário ou título de seção → label"],
    content: ["Letras maiúsculas para teclas alfanuméricas simples: K, P, Enter.", "Nomes de teclas modificadoras de acordo com o sistema operacional: ⌘ e Option no Mac, Ctrl e Alt no Windows.", "Para combinações compostas com KbdGroup, inclua apenas as teclas sem sinais de mais soltos."],
    accessibility: {
      keyboard: "Não recebe foco: é um elemento visual informativo de atalho.",
      screenReader: "Leitores anunciam o texto da tecla; para combinações com símbolos como ⌘, forneça texto descritivo no elemento pai.",
      focus: "Nenhum: o foco do usuário permanece no componente interativo ao qual o atalho se refere.",
      cautions: "Atalhos de teclado compostos por tecla única alfanumérica exigem mecanismo para desativação ou remapeamento conforme WCAG 2.1.4.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-background", "bg-muted", "text-background", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "font-sans", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "h-5", "min-w-5", "px-1", "size-3"] },
      { contexto: "Raio", itens: ["rounded-sm"] },
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
    description: "Barra indicadora que exibe visualmente o avanço de uma tarefa com duração determinada. Comunica a porcentagem concluída em uploads, downloads ou etapas de processamento.",
    whenToUse: "Tarefas com duração mensurável que levam mais de 2 segundos, como envio de arquivos ou importação de dados. Indicador de preenchimento ou progresso quantificável em questionários e perfis.",
    anatomy: [
      { part: "Progress", description: "Raiz (Radix Progress) que atua como trilho com fundo atenuado bg-primary/20 e cantos arredondados rounded-full" },
      { part: "Indicador", description: "Barra interna preenchida com bg-primary cujo deslocamento horizontal representa a porcentagem concluída" },
    ],
    variants: [],
    states: [
      { name: "Em andamento", description: "Indicador preenchido proporcionalmente com transição suave via transition-all" },
      { name: "0%", description: "Indicador totalmente recuado para a esquerda" },
      { name: "Concluído (100%)", description: "Indicador cobre todo o comprimento do trilho" },
    ],
    sizes: [],
    doGuidelines: ["Associe um rótulo visível ou aria-label informando qual processo está em andamento.", "Mostre a porcentagem numérica ou os dados transferidos junto da barra quando relevante.", "Confirme visualmente e por texto quando a tarefa atingir 100%."],
    dontGuidelines: ["Usar para esperas em que o tempo ou tamanho não é conhecido → utilize spinner.", "Fazer a barra retroceder durante o carregamento normal → mantenha o progresso crescente ou use spinner.", "Ocultar a barra abruptamente sem confirmar o resultado → mostre estado de sucesso antes de fechar."],
    code: `import { Progress } from "@/components/ui/progress"

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Enviando arquivo</span>
    <span>60%</span>
  </div>
  <Progress value={60} aria-label="Progresso do envio do arquivo" />
</div>`,
    props: [
      { name: "value (Progress)", type: "number", default: "0", description: "Porcentagem concluída da tarefa, variando de 0 a 100" },
      { name: "max (Progress)", type: "number", default: "100", description: "Valor máximo de referência do progresso" },
      { name: "getValueLabel (Progress)", type: "(value: number, max: number) => string", default: "—", description: "Função que formata o texto acessível do valor" },
    ],
    meta: {
      nome: "Progress",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/progress.tsx",
      story: "src/components/ui/progress.stories.tsx",
      vizinhos: ["spinner", "skeleton", "stepper"],
    },
    whenToUseItems: ["Tarefas com duração mensurável que levam mais de 2 segundos, como envio de arquivos ou importação de dados.", "Indicador de preenchimento ou progresso quantificável em questionários e perfis."],
    whenNotToUse: ["Espera sem duração estimada ou com tempo indeterminado → spinner.", "Conteúdo em carregamento cujo layout e formato final já são conhecidos → skeleton.", "Sequência de etapas com interação e navegação do usuário → stepper."],
    content: ["Apresente um rótulo textual acima ou ao lado descrevendo a ação: \"Enviando arquivo...\".", "Exiba a contagem numérica ou porcentagem quando a precisão for útil: \"45% concluído\" ou \"3 de 5 arquivos\".", "No término, confirme o sucesso com texto explícito: \"Envio concluído\"."],
    accessibility: {
      keyboard: "Não recebe foco. Componente puramente informativo.",
      screenReader: "Papel progressbar com aria-valuenow refletindo o valor atual, aria-valuemin=\"0\" e aria-valuemax=\"100\". Passe aria-label ou aria-labelledby identificando a tarefa.",
      focus: "Nenhum. O foco deve permanecer na ação que disparou a tarefa ou no container principal.",
      cautions: "Não anuncie cada porcentagem intermediária para evitar poluir o leitor de tela; anuncie apenas marcos relevantes ou a conclusão da tarefa. Sempre forneça um nome acessível via aria-label ou texto associado.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-primary"] },
      { contexto: "Espaço", itens: ["h-2"] },
      { contexto: "Raio", itens: ["rounded-full"] },
    ],
  },
  "radio-group": {
    description: "Conjunto de botões de opção exclusivos em que a pessoa seleciona exatamente uma alternativa. Ao marcar uma opção nova, a escolha anterior é desmarcada automaticamente.",
    whenToUse: "Escolha única entre 2 e 6 opções que devem permanecer visíveis ao mesmo tempo para facilitar a comparação rápida. Opções mutuamente exclusivas em formulários ou configurações, como tipo de entrega ou forma de pagamento.",
    anatomy: [
      { part: "RadioGroup", description: "Raiz (Radix RadioGroup) que define o contexto do grupo com espaçamento vertical gap-3" },
      { part: "RadioGroupItem", description: "Botão circular individual com borda border-input e dimensão controlada por --form-control-size" },
      { part: "Indicador", description: "Círculo preenchido interno (Icon) centralizado com metade do diâmetro do botão externo" },
      { part: "Rótulo (opcional)", description: "Texto de apoio associado ao item via Label externo com htmlFor" },
    ],
    variants: [],
    states: [
      { name: "Desmarcado", description: "Borda circular border-input com fundo transparente e sombra shadow-xs" },
      { name: "Marcado", description: "Círculo interno centralizado text-primary preenchido" },
      { name: "Foco", description: "Anel de 3 px em ring-ring com borda border-ring no botão focado" },
      { name: "Inválido", description: "Borda destacada em border-destructive e anel sutil em ring-destructive/20" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% com cursor not-allowed e clique bloqueado" },
    ],
    sizes: [],
    doGuidelines: ["Mantenha entre 2 e 6 opções para preservar a legibilidade da tela.", "Deixe uma opção padrão selecionada sempre que houver uma recomendação clara.", "Associe o rótulo clicável via Label para aumentar a área de toque."],
    dontGuidelines: ["Mais de 6 opções em coluna ocupando muito espaço vertical → use select.", "Uma única opção isolada de sim ou não → substitua por checkbox ou switch.", "Permitir múltipla seleção no mesmo conjunto → use um grupo de checkbox."],
    code: `import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="padrao">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="padrao" id="r1" />
    <Label htmlFor="r1">Padrão</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="expresso" id="r2" />
    <Label htmlFor="r2">Expresso</Label>
  </div>
</RadioGroup>`,
    props: [
      { name: "value · defaultValue (RadioGroup)", type: "string", default: "—", description: "Valor da opção selecionada no grupo, controlado ou inicial" },
      { name: "onValueChange (RadioGroup)", type: "(value: string) => void", default: "—", description: "Callback disparado quando a seleção muda" },
      { name: "disabled (RadioGroup, RadioGroupItem)", type: "boolean", default: "false", description: "Desativa a interação no grupo inteiro ou no item individual" },
      { name: "value (RadioGroupItem)", type: "string", default: "—", description: "Identificador único da opção no item" },
      { name: "required (RadioGroup)", type: "boolean", default: "false", description: "Exige a seleção de uma opção no envio do formulário" },
    ],
    meta: {
      nome: "Radio Group",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/radio-group.tsx",
      story: "src/components/ui/radio-group.stories.tsx",
      vizinhos: ["checkbox", "select", "segmented-control"],
    },
    whenToUseItems: ["Escolha única entre 2 e 6 opções que devem permanecer visíveis ao mesmo tempo para facilitar a comparação rápida.", "Opções mutuamente exclusivas em formulários ou configurações, como tipo de entrega ou forma de pagamento."],
    whenNotToUse: ["Mais de 6 opções disponíveis em lista longa → select.", "Escolha independente de marcar ou desmarcar um único item isolado → checkbox.", "Alternar entre visões ou filtros compactos sem cara de formulário → segmented-control."],
    content: ["Apresente um título claro para o grupo com a pergunta ou critério: \"Forma de pagamento\".", "Mantenha opções curtas e com estrutura gramatical paralela: \"Boleto bancário\", \"Cartão de crédito\".", "Evite opções com significados redundantes ou que se sobreponham."],
    accessibility: {
      keyboard: "Tab entra no grupo focando na opção marcada ou na primeira disponível. As setas Direita/Abaixo e Esquerda/Acima alternam entre as opções e já as selecionam. Tab sai do grupo para o próximo controle.",
      screenReader: "Papel radiogroup para o container e radio para cada item. Anuncia o nome do grupo, o texto do rótulo, o estado marcado/desmarcado e a posição (ex.: 1 de 3).",
      focus: "Anel visível de 3 px em ring-ring ao navegar por teclado. O foco se desloca junto com a seleção ao usar as setas direcionais.",
      cautions: "Sempre associe um Label com htmlFor correspondente ao id de cada RadioGroupItem para permitir a marcação ao clicar no texto. Não utilize rádio isolado para ações binárias; utilize checkbox.",
    },
    tokens: [
      { contexto: "Cor", itens: ["border-destructive", "border-input", "border-ring", "text-primary"] },
      { contexto: "Espaço", itens: ["--form-control-size", "gap-3", "left-1", "top-1"] },
      { contexto: "Raio", itens: ["rounded-full"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
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
    description: "Controle deslizante que permite selecionar um valor ou intervalo contínuo arrastando um ou mais marcadores sobre um trilho. Ideal para ajustes visuais e valores aproximados.",
    whenToUse: "Ajuste de parâmetros contínuos ou intuitivos, como volume, brilho, zoom ou opacidade. Seleção de faixas de valores com pegador duplo (mínimo e máximo), como filtros de preço.",
    anatomy: [
      { part: "Slider", description: "Raiz (Radix Slider) que envolve o trilho e os pegadores com suporte a orientação horizontal ou vertical" },
      { part: "Trilho", description: "Barra de fundo arredondada com bg-muted que define o caminho da seleção" },
      { part: "Faixa", description: "Trecho preenchido no trilho em bg-primary entre o valor mínimo e o pegador atual" },
      { part: "Pegador", description: "Botão circular (Thumb) com borda border-primary, fundo branco e anel de foco ring-ring" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Trilho em bg-muted com pegador branco e borda border-primary" },
      { name: "Hover no pegador", description: "Anel sutil de 4 px em ring-ring em volta do pegador" },
      { name: "Foco no pegador", description: "Anel visível de 4 px em ring-ring acionado por teclado" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% e eventos de ponteiro bloqueados" },
    ],
    sizes: [],
    doGuidelines: ["Exiba sempre o valor numérico atual em texto para confirmação do usuário.", "Ofereça um campo de entrada de texto complementar quando o valor exato for relevante.", "Configure o incremento da prop step de acordo com a granularidade real da informação."],
    dontGuidelines: ["Usar para dados que exigem precisão absoluta como documentos ou parcelas → use input.", "Escolha simples entre até 5 opções pré-definidas → use radio-group ou select.", "Ocultar o valor numérico selecionado pelo controle → mostre o texto associado junto ao slider."],
    code: `import { Slider } from "@/components/ui/slider"

<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Volume</span>
    <span>50%</span>
  </div>
  <Slider defaultValue={[50]} max={100} step={1} aria-label="Volume" />
</div>`,
    props: [
      { name: "min", type: "number", default: "0", description: "Limite inferior da faixa de seleção" },
      { name: "max", type: "number", default: "100", description: "Limite superior da faixa de seleção" },
      { name: "step (Slider)", type: "number", default: "1", description: "Intervalo numérico de incremento entre os passos" },
      { name: "value · defaultValue (Slider)", type: "number[]", default: "[min, max]", description: "Array com o valor atual (um valor para pegador único, dois para intervalo)" },
      { name: "orientation (Slider)", type: "horizontal · vertical", default: "horizontal", description: "Direção do trilho do slider" },
      { name: "disabled (Slider)", type: "boolean", default: "false", description: "Desativa a interação e reduz a opacidade para 50%" },
    ],
    meta: {
      nome: "Slider",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/slider.tsx",
      story: "src/components/ui/slider.stories.tsx",
      vizinhos: ["input", "select", "progress"],
    },
    whenToUseItems: ["Ajuste de parâmetros contínuos ou intuitivos, como volume, brilho, zoom ou opacidade.", "Seleção de faixas de valores com pegador duplo (mínimo e máximo), como filtros de preço."],
    whenNotToUse: ["Valores numéricos precisos ou dados estruturados (ex.: CPF, idade ou parcelas) → input.", "Escolha discreta entre poucas opções fixas pré-definidas → select.", "Exibição de progresso apenas para leitura, sem interação direta → progress."],
    content: ["Apresente um rótulo visível indicando a métrica controlada: \"Volume\", \"Faixa de preço\".", "Exiba o valor atual formatado em texto ao lado do controle: \"R$ 150,00\", \"75%\".", "Indique os valores mínimo e máximo nos extremos do trilho quando o contexto exigir clareza."],
    accessibility: {
      keyboard: "Tab chega a cada pegador. Setas Direita/Acima aumentam um passo; Setas Esquerda/Abaixo diminuem um passo. Page Up e Page Down realizam saltos maiores. Home vai ao valor mínimo e End ao valor máximo.",
      screenReader: "Papel slider com aria-valuenow refletindo o valor atual, aria-valuemin e aria-valuemax. Cada pegador recebe aria-label descritivo automático (\"Valor mínimo\", \"Valor máximo\" ou rótulo informado).",
      focus: "Anel visível de 4 px em ring-ring em volta do pegador focado. Em sliders de intervalo, cada pegador recebe foco individual sequencial via Tab.",
      cautions: "Arrastar nunca pode ser o único modo de interação (WCAG 2.5.7); sempre garanta suporte a teclado e ofereça um campo input numérico ao lado quando a precisão exata for necessária.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-muted", "bg-primary", "border-primary"] },
      { contexto: "Espaço", itens: ["h-1.5", "min-h-44", "size-4", "w-1.5"] },
      { contexto: "Raio", itens: ["rounded-full"] },
      { contexto: "Sombra", itens: ["shadow-sm"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  spinner: {
    description: "Indicador giratório para esperas de tempo indeterminado. Mostra que o sistema está ocupado processando uma ação.",
    whenToUse: "Esperas curtas sem tempo estimado de término, como envio de formulário ou consulta rápida. Dentro de botões, itens de lista ou campos de entrada para indicar processamento local.",
    anatomy: [
      { part: "Spinner", description: "Ícone progress_activity em rotação contínua (animate-spin) com role=\"status\"" },
    ],
    variants: [],
    states: [
      { name: "Em rotação", description: "Animação contínua de rotação (animate-spin) em torno do eixo central" },
    ],
    sizes: [],
    doGuidelines: ["Passe um aria-label em português descrevendo a operação em andamento.", "Use dentro de botões ou cartões para sinalizar processamento localizado.", "Prefira cores com contraste suficiente com o fundo sobre o qual o indicador gira."],
    dontGuidelines: ["Manter o rótulo padrão em inglês → passe aria-label descritivo em português.", "Usar para tarefas com percentual conhecido de conclusão → progress.", "Usar em páginas inteiras cujo esqueleto estrutural é conhecido → skeleton."],
    code: `import { Spinner } from "@/components/ui/spinner"

<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Spinner aria-label="Carregando dados..." />
  <span>Carregando...</span>
</div>`,
    props: [
      { name: "className", type: "string", default: "—", description: "Classes utilitárias para ajustar tamanho (ex.: size-5) ou cor (ex.: text-primary)" },
      { name: "aria-label", type: "string", default: "\"Loading\"", description: "Nome acessível anunciado a tecnologias assistivas" },
      { name: "...props", type: "Omit<ComponentProps<\"svg\">, \"name\" \\ | \"fill\">", default: "—", description: "Demais propriedades SVG nativas repassadas ao elemento" },
    ],
    meta: {
      nome: "Spinner",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/spinner.tsx",
      story: "src/components/ui/spinner.stories.tsx",
      vizinhos: ["skeleton", "progress"],
    },
    whenToUseItems: ["Esperas curtas sem tempo estimado de término, como envio de formulário ou consulta rápida.", "Dentro de botões, itens de lista ou campos de entrada para indicar processamento local."],
    whenNotToUse: ["O layout do conteúdo final já é conhecido → skeleton.", "O progresso ou percentual de conclusão pode ser medido numericamente → progress."],
    content: ["Não tem texto próprio embutido.", "Quando acompanhado de rótulo textual, use verbo no gerúndio com reticências: \"Carregando...\", \"Salvando...\"."],
    accessibility: {
      keyboard: "Não recebe foco.",
      screenReader: "Possui papel role=\"status\" e anuncia a propriedade aria-label quando inserido no DOM.",
      focus: "Não retém nem altera o foco do teclado; mantenha o foco no elemento acionador ou na área ativa.",
      cautions: "O componente vem com aria-label=\"Loading\" em inglês no código. Forneça sempre aria-label em português (\"Carregando...\") contextualizando a ação em andamento.",
    },
    tokens: [
      { contexto: "Espaço", itens: ["size-4"] },
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
    description: "Controle deslizante binário para ativar ou desativar uma preferência. A alteração tem efeito imediato e dispensa botão de confirmação.",
    whenToUse: "Ativar ou desativar recursos em telas de configurações e preferências com aplicação imediata. Alternar um estado binário independente que não faça parte de um formulário com envio em lote.",
    anatomy: [
      { part: "Switch", description: "Trilho (SwitchPrimitive.Root) que encapsula o botão deslizante (SwitchPrimitive.Thumb)" },
    ],
    variants: [],
    states: [
      { name: "Desativado", description: "Trilho com fundo bg-input e botão deslizante alinhado à esquerda" },
      { name: "Ativado", description: "Trilho com fundo bg-primary e botão deslocado à direita (translate-x)" },
      { name: "Pressionado", description: "Escala reduzida via --scale-pressed e botão contraído" },
      { name: "Foco", description: "Anel de foco visível com 3 px em ring-ring" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% (disabled:opacity-50) e cursor não permitido" },
    ],
    sizes: [],
    doGuidelines: ["Use para preferências cujo efeito ocorra imediatamente após o acionamento.", "Mantenha o rótulo invariável, independentemente de o estado estar ligado ou desligado.", "Associe o controle a um rótulo textual usando <Label htmlFor=\"...\">."],
    dontGuidelines: ["Usar em formulários que exigem confirmação posterior com botão salvar → checkbox.", "Alterar o texto do rótulo conforme o estado ligado ou desligado → mantenha o rótulo fixo.", "Deixar o controle sem rótulo visível ou sem aria-label → passe nome acessível."],
    code: `import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

<div className="flex items-center gap-2">
  <Switch id="notificacoes" defaultChecked />
  <Label htmlFor="notificacoes">Notificações por e-mail</Label>
</div>`,
    props: [
      { name: "checked · defaultChecked", type: "boolean", default: "—", description: "Estado ativado ou desativado, controlado ou inicial" },
      { name: "onCheckedChange", type: "(checked: boolean) => void", default: "—", description: "Função disparada ao alternar o estado" },
      { name: "disabled", type: "boolean", default: "false", description: "Desabilita a interação e reduz a opacidade" },
      { name: "size", type: "sm · default", default: "default", description: "Dimensão do trilho e do botão deslizante" },
    ],
    meta: {
      nome: "Switch",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/switch.tsx",
      story: "src/components/ui/switch.stories.tsx",
      vizinhos: ["checkbox", "toggle"],
    },
    whenToUseItems: ["Ativar ou desativar recursos em telas de configurações e preferências com aplicação imediata.", "Alternar um estado binário independente que não faça parte de um formulário com envio em lote."],
    whenNotToUse: ["A escolha depende de um botão de salvar ou enviar formulário → checkbox.", "A escolha é entre duas opções com rótulos textuais próprios → toggle."],
    content: ["Use rótulo claro e constante que descreva a funcionalidade: \"Notificações por e-mail\", \"Modo escuro\".", "Não mude o texto do rótulo entre \"Ativado\" e \"Desativado\"; a posição do controle já indica o estado."],
    accessibility: {
      keyboard: "Tab chega ao controle. Espaço ou Enter alterna entre ativado e desativado.",
      screenReader: "Papel role=\"switch\" (Radix). Anuncia o estado aria-checked (\"ligado\" ou \"desligado\") e o nome acessível fornecido.",
      focus: "Anel de 3 px visível em volta do trilho (focus-visible:ring-ring).",
      cautions: "Associe sempre a um <Label> com htmlFor ou passe aria-label quando não houver texto visível.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-background", "bg-foreground", "bg-input", "bg-primary", "bg-primary-foreground", "border-ring"] },
      { contexto: "Espaço", itens: ["h-3.5", "size-3", "size-4", "w-6", "w-8"] },
      { contexto: "Raio", itens: ["rounded-full"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Movimento", itens: ["--scale-pressed", "duration-motion-base", "duration-motion-fast", "ease-spring"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  tag: {
    description: "Rótulo estático para categorização, metadados e indicação de status. Organiza informações sem disparar ações nem remover filtros.",
    whenToUse: "Categorizar itens de catálogo ou artigos com palavras-chave estáticas. Indicar status textual ou características secundárias que não possuem interação.",
    anatomy: [
      { part: "Tag", description: "Elemento <span> (ou elemento filho com asChild) com estilo de etiqueta estática" },
      { part: "Tag.Skeleton", description: "Placeholder retangular (TagSkeleton) com 24 px de altura (h-6) para estados de carregamento" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Rótulo neutro para categorias gerais sem conotação de alerta" },
      { name: "Primary", value: "primary", description: "Destaque com a cor principal de marca do tema ativo" },
      { name: "Success", value: "success", description: "Estados concluídos, aprovados ou confirmações positivas" },
      { name: "Warning", value: "warning", description: "Avisos preventivos, pendências ou itens sob atenção" },
      { name: "Danger", value: "danger", description: "Erros, falhas, bloqueios ou situações críticas" },
      { name: "Ai-generated", value: "ai-generated", description: "Conteúdo, sugestão ou metadado gerado por inteligência artificial" },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["Use para metadados e rótulos estáticos que não disparam ações.", "Combine variantes semânticas de forma consistente em todo o produto.", "Prefira textos concisos com uma ou duas palavras."],
    dontGuidelines: ["Usar para filtros interativos com remoção → chip.", "Usar para contadores numéricos flutuantes → badge.", "Depender somente da cor para comunicar sucesso ou falha → inclua texto claro."],
    code: `import { Tag } from "@/components/ui/tag"

<div className="flex items-center gap-2">
  <Tag>Design</Tag>
  <Tag variant="success">Aprovado</Tag>
  <Tag variant="ai-generated">IA</Tag>
</div>`,
    props: [
      { name: "variant", type: "default · primary · success · warning · danger · ai-generated", default: "default", description: "Tom semântico da etiqueta" },
      { name: "highlight", type: "true · false", default: "false", description: "Inverte as cores de fundo e texto para criar maior contraste" },
      { name: "asChild", type: "boolean", default: "false", description: "Delega a renderização para o elemento filho via Radix Slot" },
    ],
    meta: {
      nome: "Tag",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/tag.tsx",
      story: "src/components/ui/tag.stories.tsx",
      vizinhos: ["badge", "chip"],
    },
    whenToUseItems: ["Categorizar itens de catálogo ou artigos com palavras-chave estáticas.", "Indicar status textual ou características secundárias que não possuem interação."],
    whenNotToUse: ["Filtro interativo ou tag com botão de remover → chip.", "Notificação pontual de contagem numérica ou badge sobreposto → badge."],
    content: ["Rótulos curtos de uma ou duas palavras: \"Tecnologia\", \"Em análise\".", "Evite frases completas ou pontuação final dentro da etiqueta."],
    accessibility: {
      keyboard: "Não recebe foco por se tratar de um elemento estático de leitura.",
      screenReader: "Anuncia o texto contido no children. Quando usada como indicação de estado, adicione contexto textual sem depender apenas da cor.",
      focus: "Não retém foco de navegação.",
      cautions: "A cor da variante nunca deve ser a única portadora de significado; garanta que o texto explique claramente o estado ou categoria.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-ai-interactive", "bg-ai-surface", "bg-danger-100", "bg-danger-900", "bg-muted", "bg-muted-foreground", "bg-primary", "bg-success-100", "bg-success-900", "bg-warning-100", "bg-warning-900", "border-ai-interactive", "border-border", "border-danger-300", "border-primary", "border-success-300", "border-warning-300", "text-ai-surface", "text-ai-text-high", "text-danger-100", "text-danger-900", "text-muted", "text-muted-foreground", "text-primary", "text-primary-foreground", "text-success-100", "text-success-900", "text-warning-100", "text-warning-900"] },
      { contexto: "Tipografia", itens: ["font-medium", "leading-none", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "h-6", "min-h-6", "px-1.5", "size-3", "w-20"] },
      { contexto: "Raio", itens: ["rounded-sm"] },
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
    description: "Campo de entrada para textos longos de múltiplas linhas. Expande verticalmente conforme o conteúdo digitado graças ao dimensionamento automático.",
    whenToUse: "Coleta de textos com parágrafos, comentários longos, observações ou descrições detalhadas. Formulários onde a resposta esperada pode ultrapassar uma única linha de digitação.",
    anatomy: [
      { part: "Textarea", description: "Elemento <textarea> com dimensionamento automático (field-sizing-content) e altura mínima de 64 px" },
      { part: "Rótulo (opcional)", description: "Componente Label embutido, estático ou com animação flutuante (animatedLabel)" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Borda sutil em border-input com fundo transparente" },
      { name: "Foco", description: "Borda em border-ring com anel visível de 3 px em ring-ring" },
      { name: "Erro", description: "Borda vermelha border-destructive e anel de erro (aria-invalid:ring-destructive)" },
      { name: "Desabilitado", description: "Cursor não permitido e opacidade em 50% (disabled:opacity-50)" },
    ],
    sizes: [],
    doGuidelines: ["Forneça sempre um rótulo compreensível usando a prop label ou aria-label.", "Use a prop animatedLabel quando desejar economizar espaço vertical inicial.", "Indique erros de validação aplicando o atributo aria-invalid."],
    dontGuidelines: ["Usar para respostas de uma única linha → input.", "Colocar instruções cruciais apenas no placeholder → use rótulo ou descrição em field.", "Bloquear a expansão natural do texto sem aviso ao usuário → ajuste a altura mínima."],
    code: `import { Textarea } from "@/components/ui/textarea"

<Textarea
  label="Observações"
  placeholder="Digite seus comentários sobre o projeto..."
/>`,
    props: [
      { name: "label", type: "React.ReactNode", default: "—", description: "Rótulo textual vinculado ao campo via ID gerado" },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Ativa a transição suave de rótulo flutuante no foco" },
      { name: "placeholder", type: "string", default: "—", description: "Texto de exemplo exibido enquanto o campo estiver vazio" },
      { name: "disabled", type: "boolean", default: "false", description: "Desabilita a digitação e aplica opacidade reduzida" },
      { name: "aria-invalid", type: "boolean", default: "—", description: "Destaca a borda e anel em tons de erro (border-destructive)" },
    ],
    meta: {
      nome: "Textarea",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/textarea.tsx",
      story: "src/components/ui/textarea.stories.tsx",
      vizinhos: ["input", "field"],
    },
    whenToUseItems: ["Coleta de textos com parágrafos, comentários longos, observações ou descrições detalhadas.", "Formulários onde a resposta esperada pode ultrapassar uma única linha de digitação."],
    whenNotToUse: ["Respostas curtas de uma única linha como nome, e-mail ou telefone → input.", "Campo complexo com mensagens de erro estruturadas e texto de ajuda → field."],
    content: ["Rótulos claros e objetivos posicionados acima do campo: \"Comentários adicionais\", \"Descrição da vaga\".", "Não use o placeholder como substituto para o rótulo principal."],
    accessibility: {
      keyboard: "Tab move o foco para o campo. Enter cria quebra de linha normal. Tab sai do campo para o próximo elemento.",
      screenReader: "Quando fornecida a prop label, o campo é vinculado automaticamente pelo atributo id e anunciado com seu nome.",
      focus: "Anel de foco nítido de 3 px em focus-visible:ring-ring.",
      cautions: "Evite instruções críticas apenas no placeholder, pois ele desaparece ao digitar. Sempre passe label ou aria-label.",
    },
    tokens: [
      { contexto: "Cor", itens: ["border-destructive", "border-input", "border-ring", "text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["text-base", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1.5", "left-0", "left-3", "min-h-16", "mt-5", "px-3", "py-2", "top-0", "top-3"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Movimento", itens: ["duration-motion-fast"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
    ],
  },
  thumbnail: {
    description: "Miniatura visual de imagem com proporção fixa e cantos arredondados. Oferece fallback integrado para erros de carregamento e preserva o layout.",
    whenToUse: "Apresentação de fotos de produtos em listagens, catálogos e carrinhos de compras. Exibição de prévias em galerias de mídia, comprovantes ou detalhes de pedidos.",
    anatomy: [
      { part: "Thumbnail", description: "Container raiz com proporção fixa (AspectRatio) que renderiza a imagem ou fallback de erro" },
      { part: "Thumbnail.Skeleton", description: "Placeholder de carregamento (ThumbnailSkeleton) que preserva as dimensões e o aspecto" },
    ],
    variants: [],
    states: [
      { name: "Carregada", description: "Imagem exibida cobrindo toda a área proporcional (object-cover)" },
      { name: "Fallback", description: "Superfície neutra em bg-muted com role=\"img\" e aria-label quando a imagem falha ou não possui src" },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "— — Miniatura compacta com largura de 64 px (w-16) para listas densas ou tabelas" },
      { name: "default", value: "default", description: "— — Tamanho intermediário com largura de 96 px (w-24) para visualização de pedidos ou produtos" },
      { name: "lg", value: "lg", description: "— — Destaque com largura de 160 px (w-40) para galerias de fotos ou cartões amplos" },
    ],
    doGuidelines: ["Sempre preencha a propriedade alt com uma descrição objetiva do conteúdo da imagem.", "Escolha a proporção aspectRatio adequada à orientação original da imagem para evitar cortes excessivos.", "Use Thumbnail.Skeleton com a mesma proporção e tamanho enquanto a imagem carrega."],
    dontGuidelines: ["Omitir o texto alternativo descritivo na prop alt → descreva o conteúdo visual da imagem.", "Usar Thumbnail para exibir avatares de pessoas com recorte circular → avatar.", "Usar para containers de proporção livre sem imagem → aspect-ratio."],
    code: `import { Thumbnail } from "@/components/ui/thumbnail"

<Thumbnail
  src="/produtos/relogio.jpg"
  alt="Relógio de pulso clássico com pulseira de couro marrom"
  size="default"
  aspectRatio="1/1"
/>`,
    props: [
      { name: "alt", type: "string", default: "—", description: "Texto alternativo e acessível obrigatório da imagem" },
      { name: "src", type: "string", default: "—", description: "Caminho ou URL da imagem a ser exibida" },
      { name: "size", type: "sm · default · lg", default: "default", description: "Largura da miniatura" },
      { name: "aspectRatio", type: "1/1 · 4/3 · 3/4 · 16/9 · 9/16 · 2/1 · 1/2", default: "1/1", description: "Proporção fixa entre largura e altura" },
      { name: "children", type: "React.ReactNode", default: "—", description: "Conteúdo opcional sobreposto à miniatura, como badges" },
      { name: "size (ThumbnailSkeleton)", type: "sm · default · lg", default: "default", description: "Mesma largura do thumbnail substituído" },
      { name: "aspectRatio (ThumbnailSkeleton)", type: "ThumbnailAspectRatio", default: "1/1", description: "Mesma proporção mantida durante o carregamento" },
    ],
    meta: {
      nome: "Thumbnail",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/thumbnail.tsx",
      story: "src/components/ui/thumbnail.stories.tsx",
      vizinhos: ["avatar", "aspect-ratio"],
    },
    whenToUseItems: ["Apresentação de fotos de produtos em listagens, catálogos e carrinhos de compras.", "Exibição de prévias em galerias de mídia, comprovantes ou detalhes de pedidos."],
    whenNotToUse: ["Exibir foto de perfil ou identificação de usuário em formato circular → avatar.", "Bloquear a proporção de containers de mídia arbitrária sem tratamento de imagem → aspect-ratio."],
    content: ["Passe sempre um texto alternativo significativo e descritivo na prop alt: \"Tênis esportivo azul\", \"Foto de capa do artigo\".", "Evite frases redundantes como \"Foto de\" ou \"Imagem de\" no texto alternativo."],
    accessibility: {
      keyboard: "Não recebe foco direto; quando a miniatura for interativa, envolva-a em um botão ou link.",
      screenReader: "Elemento de imagem anuncia a propriedade alt obrigatória. No fallback de erro, expõe role=\"img\" com o mesmo aria-label.",
      focus: "Não retém foco de navegação por padrão.",
      cautions: "A propriedade alt é obrigatória no componente para atender às diretrizes da WCAG 1.1.1 (conteúdo não textual).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-muted"] },
      { contexto: "Espaço", itens: ["w-16", "w-24", "w-40"] },
      { contexto: "Raio", itens: ["rounded-md"] },
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
    description: "Botão de dois estados que alterna entre ativado e desativado. Preserva a escolha visualmente para formatações ou marcações independentes.",
    whenToUse: "Alternar formatação de texto isolada, como negrito, itálico ou sublinhado. Ações independentes de dois estados, como favoritar ou fixar um item sem formar um grupo.",
    anatomy: [
      { part: "Toggle", description: "Botão binário de dois estados (TogglePrimitive.Root) com suporte a ícone e texto" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Fundo transparente em repouso; ideal para barras de ferramentas ou áreas limpas" },
      { name: "Outline", value: "outline", description: "Borda delimitadora visível mesmo quando desativado; bom para controles isolados" },
    ],
    states: [
      { name: "Desativado", description: "Fundo transparente e texto ou ícone com peso normal (font-normal)" },
      { name: "Ativado", description: "Fundo destacado bg-accent, texto em negrito (font-bold) e ícone preenchido" },
      { name: "Hover", description: "Fundo suave hover:bg-muted" },
      { name: "Foco", description: "Borda border-ring com anel visível de 3 px em ring-ring" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% (disabled:opacity-50) e sem interação" },
    ],
    sizes: [
      { name: "default", value: "default", description: "36 px — Altura padrão (h-9) para a maioria das barras de ferramentas e ações" },
      { name: "sm", value: "sm", description: "32 px — Altura compacta (h-8) para barras densas ou painéis laterais estreitos" },
      { name: "lg", value: "lg", description: "40 px — Altura maior (h-10) para telas de toque ou botões com maior área de clique" },
    ],
    doGuidelines: ["Passe aria-label sempre que o conteúdo for apenas um ícone.", "Use variantes transparentes (default) dentro de barras de ferramentas compartilhadas.", "Combine com ícones sem preenchimento fixo para permitir a troca automática de estilo."],
    dontGuidelines: ["Agrupar múltiplos botões de seleção sem um container apropriado → toggle-group.", "Usar para ativar ou desativar configurações de conta com efeito imediato → switch.", "Usar para ações de disparo único que não guardam estado → button."],
    code: `import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Alternar negrito">
  Negrito
</Toggle>`,
    props: [
      { name: "variant", type: "default · outline", default: "default", description: "Estilo visual do botão" },
      { name: "size", type: "default · sm · lg", default: "default", description: "Altura e espaçamento interno" },
      { name: "pressed · defaultPressed", type: "boolean", default: "—", description: "Estado ativo do controle, controlado ou inicial" },
      { name: "onPressedChange", type: "(pressed: boolean) => void", default: "—", description: "Função disparada ao alternar o estado" },
      { name: "disabled", type: "boolean", default: "false", description: "Desabilita a interação com o botão" },
    ],
    meta: {
      nome: "Toggle",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/toggle.tsx",
      story: "src/components/ui/toggle.stories.tsx",
      vizinhos: ["toggle-group", "button", "switch"],
    },
    whenToUseItems: ["Alternar formatação de texto isolada, como negrito, itálico ou sublinhado.", "Ações independentes de dois estados, como favoritar ou fixar um item sem formar um grupo."],
    whenNotToUse: ["Conjunto de opções em barra de ferramentas com seleção única ou múltipla → toggle-group.", "Alternar uma configuração de sistema ou conta que tenha efeito imediato → switch.", "Disparar uma ação que não mantém estado persistente na tela → button."],
    content: ["Use rótulo curto ou ícone autoexplicativo: \"Negrito\", \"Itálico\", \"Favorito\".", "Quando usar apenas ícone, é obrigatório passar aria-label descritivo."],
    accessibility: {
      keyboard: "Tab move o foco para o botão. Espaço ou Enter alterna entre os estados ativado e desativado.",
      screenReader: "Papel role=\"button\" com aria-pressed=\"true\" ou aria-pressed=\"false\". Anuncia o rótulo do botão ou aria-label.",
      focus: "Anel visível de 3 px em focus-visible:ring-ring.",
      cautions: "Ao usar apenas ícone como filho, passe sempre aria-label para garantir que tecnologias assistivas compreendam a ação.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-muted", "border-destructive", "border-input", "border-ring", "text-accent-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-bold", "font-normal", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-2", "h-10", "h-8", "h-9", "min-w-10", "min-w-8", "min-w-9", "px-1.5", "px-2", "px-2.5", "size-4"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
    ],
  },
  tooltip: {
    description: "Balão flutuante que exibe uma explicação curta quando o usuário passa o mouse ou foca um elemento. Descreve ações sem poluir a interface.",
    whenToUse: "Explicar a função de botões compostos exclusivamente por ícones. Oferecer contexto complementar breve para elementos compactos ou truncados.",
    anatomy: [
      { part: "TooltipProvider", description: "Provedor de contexto global que gerencia o atraso de exibição (delayDuration)" },
      { part: "Tooltip", description: "Componente raiz que coordena os estados de visibilidade e posicionamento" },
      { part: "TooltipTrigger", description: "Elemento gatilho que recebe hover ou foco para abrir o balão" },
      { part: "TooltipContent", description: "Painel flutuante com seta (TooltipPrimitive.Arrow) e texto informativo" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "Elemento desmontado ou invisível fora da tela" },
      { name: "Aberto", description: "Animação de entrada suave com fade e leve zoom (zoom-in-95)" },
    ],
    sizes: [],
    doGuidelines: ["Use em todos os botões que apresentem apenas ícone sem rótulo visível.", "Mantenha o texto extremamente conciso em até uma linha.", "Permita dispensar o tooltip via tecla Esc sem mover o cursor."],
    dontGuidelines: ["Inserir links, botões ou elementos interativos dentro do balão → popover.", "Exibir cartões ricos com fotos de perfil ou mídia no hover → hover-card.", "Repetir no balão exatamente o mesmo texto já escrito no gatilho → use apenas para complementar."],
    code: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button type="button">Salvar</button>
    </TooltipTrigger>
    <TooltipContent>
      Salvar alterações
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    props: [
      { name: "delayDuration (TooltipProvider)", type: "number", default: "0", description: "Tempo de espera em milissegundos antes de abrir o tooltip" },
      { name: "sideOffset (TooltipContent)", type: "number", default: "0", description: "Distância em pixels entre o gatilho e a borda do balão" },
      { name: "side (TooltipContent)", type: "top · right · bottom · left", default: "top", description: "Lado preferencial de ancoragem em relação ao gatilho" },
      { name: "align (TooltipContent)", type: "start · center · end", default: "center", description: "Alinhamento do balão ao longo do eixo do gatilho" },
    ],
    meta: {
      nome: "Tooltip",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/tooltip.tsx",
      story: "src/components/ui/tooltip.stories.tsx",
      vizinhos: ["popover", "hover-card"],
    },
    whenToUseItems: ["Explicar a função de botões compostos exclusivamente por ícones.", "Oferecer contexto complementar breve para elementos compactos ou truncados."],
    whenNotToUse: ["Conteúdo rico com links, botões ou ações clicáveis → popover.", "Prévia de perfil ou cartão de conteúdo expandido no hover → hover-card."],
    content: ["Use frases curtas em uma linha, iniciando com verbo imperativo: \"Copiar link\", \"Editar dados\".", "Não repita o mesmo texto que já está visível no próprio elemento gatilho."],
    accessibility: {
      keyboard: "O balão aparece automaticamente quando o elemento gatilho recebe foco e pode ser dispensado pressionando Esc.",
      screenReader: "Papel role=\"tooltip\". O gatilho é associado dinamicamente via aria-describedby ao conteúdo da dica.",
      focus: "O foco permanece sempre no elemento gatilho e nunca se move para dentro do balão.",
      cautions: "Permite manter o ponteiro do mouse sobre o próprio balão sem que ele se feche repentinamente, atendendo ao critério WCAG 1.4.13.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-popover", "fill-popover", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["text-xs"] },
      { contexto: "Espaço", itens: ["px-3", "py-1.5", "size-2.5"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Sombra", itens: ["shadow-md"] },
    ],
  },
  "aspect-ratio": {
    description: "Mantém a proporção exata entre largura e altura de imagens, vídeos e embeds. Evita que o layout mude de tamanho enquanto o conteúdo carrega.",
    whenToUse: "Manter proporções fixas como 16:9 ou 4:3 em vídeos, mapas ou embeds responsivos. Padronizar imagens em grades e listas de cards para evitar alturas desalinhadas. Reservar o espaço exato de mídia antes do carregamento para prevenir saltos de layout (CLS).",
    anatomy: [
      { part: "AspectRatio", description: "Container com data-slot=\"aspect-ratio\" que reserva a proporção calculada" },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use proporções padronizadas como 16 / 9 para vídeos e 1 para imagens quadradas.", "Combine com object-cover no elemento filho para preencher a área proporcional sem distorção.", "Defina a largura no elemento pai para que o container calcule a altura correspondente."],
    dontGuidelines: ["Esticar ou achatar imagens para caber no container → utilize object-cover ou object-contain.", "Misturar proporções variadas na mesma grade de cards → proporção uniforme em toda a listagem.", "Inserir cards de texto com altura dinâmica dentro da proporção fixa → card."],
    code: `import { AspectRatio } from "@/components/ui/aspect-ratio"

<div className="w-full max-w-sm">
  <AspectRatio ratio={16 / 9}>
    <img
      src="/foto.jpg"
      alt="Paisagem ao pôr do sol"
      className="size-full rounded-md object-cover"
    />
  </AspectRatio>
</div>`,
    props: [
      { name: "ratio (AspectRatio)", type: "number", default: "1", description: "Proporção entre largura e altura (ex.: 16 / 9)" },
      { name: "asChild (AspectRatio)", type: "boolean", default: "false", description: "Repassa propriedades e comportamento para o elemento filho" },
    ],
    meta: {
      nome: "Aspect Ratio",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/aspect-ratio.tsx",
      story: "src/components/ui/aspect-ratio.stories.tsx",
      vizinhos: ["avatar", "thumbnail", "card"],
    },
    whenToUseItems: ["Manter proporções fixas como 16:9 ou 4:3 em vídeos, mapas ou embeds responsivos.", "Padronizar imagens em grades e listas de cards para evitar alturas desalinhadas.", "Reservar o espaço exato de mídia antes do carregamento para prevenir saltos de layout (CLS)."],
    whenNotToUse: ["Foto de perfil ou identificação de usuário → avatar.", "Miniatura de anexo ou arquivo com ações de visualização → thumbnail.", "Container de conteúdo textual que cresce livremente com o texto → card."],
    content: ["Não tem texto próprio.", "O conteúdo interno (imagem ou vídeo) deve conter texto alternativo acessível quando não for decorativo.", "Mantenha legendas e títulos fora do container do AspectRatio, em texto real na estrutura da página."],
    accessibility: {
      keyboard: "Não recebe foco nem responde a eventos de teclado.",
      screenReader: "Não possui semântica própria. Imagens filhas precisam de atributo alt descritivo ou alt vazio caso sejam decorativas; vídeos precisam de título ou legenda.",
      focus: "Nenhum. O elemento não é interativo e não altera a ordem natural de tabulação.",
      cautions: "Ao aplicar proporções com corte visual (object-cover), garanta que informações visuais cruciais ou rostos não fiquem cortados fora da área visível (WCAG 1.1.1).",
    },
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
    description: "Menu suspenso que usa o elemento select nativo do navegador para escolher uma opção em uma lista. Garante a melhor experiência nativa em dispositivos móveis e formulários simples.",
    whenToUse: "Formulários em dispositivos móveis que se beneficiam do seletor nativo do sistema operacional. Seleção única entre mais de 5 opções simples, como estados, países ou anos.",
    anatomy: [
      { part: "NativeSelect", description: "Container relativo com o elemento select nativo, chevron decorativo e suporte a rótulo fixo ou animado" },
      { part: "NativeSelectOption", description: "Opção individual (<option>) com contraste e cores adaptadas ao tema" },
      { part: "NativeSelectOptGroup", description: "Agrupador de opções (<optgroup>) para organizar categorias dentro do menu" },
      { part: "Ícone (opcional)", description: "Seta para baixo decorativa (Icon), posicionada à direita com clique desabilitado" },
      { part: "Rótulo (opcional)", description: "Texto via Label integrado, com opção de transição animada no foco" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Borda border-input, fundo transparente e sombra sutil shadow-xs" },
      { name: "Hover", description: "Fundo suavemente realçado no tema escuro" },
      { name: "Foco", description: "Anel de 3 px em ring-ring e borda border-ring no select" },
      { name: "Inválido", description: "Borda destacada em border-destructive via aria-invalid" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% no wrapper e cursor not-allowed no select" },
    ],
    sizes: [],
    doGuidelines: ["Forneça uma primeira opção vazia ou com instrução clara como \"Selecione uma opção\".", "Agrupe listas longas por categorias usando NativeSelectOptGroup.", "Use em interfaces móveis para aproveitar a rolagem nativa do sistema operacional."],
    dontGuidelines: ["Usar para 2 a 4 opções visíveis → prefira radio-group ou segmented-control.", "Lista que exige busca interna ou digitação livre → combobox.", "Deixar o seletor sem rótulo acessível → passe a prop label ou use aria-label."],
    code: `import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"

<NativeSelect defaultValue="sp" aria-label="Estado">
  <NativeSelectOption value="pr">Paraná</NativeSelectOption>
  <NativeSelectOption value="rj">Rio de Janeiro</NativeSelectOption>
  <NativeSelectOption value="sp">São Paulo</NativeSelectOption>
</NativeSelect>`,
    props: [
      { name: "size", type: "sm · default", default: "default", description: "Altura do seletor: default com 36 px (h-9) e sm com 32 px (h-8)" },
      { name: "label", type: "React.ReactNode", default: "—", description: "Rótulo exibido acima ou animado sobre o seletor" },
      { name: "animatedLabel", type: "boolean", default: "false", description: "Ativa o rótulo com animação flutuante ao focar ou preencher" },
      { name: "value · defaultValue (NativeSelect)", type: "string", default: "—", description: "Valor controlado ou inicial da opção selecionada" },
      { name: "disabled (NativeSelect)", type: "boolean", default: "false", description: "Desativa a interação e reduz a opacidade" },
    ],
    meta: {
      nome: "Native Select",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/native-select.tsx",
      story: "src/components/ui/native-select.stories.tsx",
      vizinhos: ["select", "radio-group", "combobox"],
    },
    whenToUseItems: ["Formulários em dispositivos móveis que se beneficiam do seletor nativo do sistema operacional.", "Seleção única entre mais de 5 opções simples, como estados, países ou anos."],
    whenNotToUse: ["Seleção com busca interna, ícones ou renderização customizada de itens → select.", "Poucas alternativas (até 5 opções) que cabem visíveis diretamente na tela → radio-group.", "Lista muito longa (acima de 15 opções) que exige digitação para filtrar → combobox."],
    content: ["Primeira opção com texto de instrução neutro enquanto nada for escolhido: \"Selecione um estado\".", "Rótulo claro com substantivo indicando o que está sendo escolhido: \"Estado de entrega\".", "Opções concisas em ordem alfabética ou cronológica, sem ponto final."],
    accessibility: {
      keyboard: "Tab move o foco para o campo. Espaço, Enter ou Alt+Seta Abaixo abrem a lista nativa do sistema. Setas navegam entre opções. Enter confirma a escolha e Esc fecha sem alterar.",
      screenReader: "Elemento select nativo anunciado com seu papel, rótulo via label associado ou aria-label e valor selecionado.",
      focus: "Anel visível de 3 px em ring-ring ao receber foco pelo teclado. Ao fechar o menu nativo, o foco permanece no elemento select.",
      cautions: "Sempre associe um rótulo visível via prop label ou passe aria-label quando o campo for exibido sem texto ao lado. Ao usar animatedLabel, passe value ou defaultValue explícitos para o rótulo não sobrepor a primeira opção selecionada pelo navegador.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-input", "bg-primary", "border-destructive", "border-input", "border-ring", "text-foreground", "text-muted-foreground", "text-primary-foreground"] },
      { contexto: "Tipografia", itens: ["text-sm"] },
      { contexto: "Espaço", itens: ["gap-1.5", "h-8", "h-9", "left-0", "left-3", "min-w-0", "mt-5", "pr-9", "px-3", "py-1", "py-2", "right-3.5", "top-0", "top-1"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Movimento", itens: ["duration-motion-fast"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  "segmented-control": {
    description: "Alterna entre opções mutuamente excludentes em formato de pílula contínua com seleção estritamente única. Oferece troca imediata de modo ou visualização na mesma tela sem acoplamento a painéis de conteúdo.",
    whenToUse: "Alternar modos de visualização rápida do mesmo conjunto de dados (ex.: Lista e Grade). Seleção de granularidade temporal em relatórios e gráficos (ex.: Dia, Semana, Mês). Escolha entre 2 a 4 alternativas fixas e visíveis que aplicam o efeito imediatamente.",
    anatomy: [
      { part: "SegmentedControl", description: "Container raiz baseado em ToggleGroupPrimitive com seleção única fixada e trilho em bg-muted" },
      { part: "SegmentedControlItem", description: "Opção individual com indicador ativo de fundo bg-background e elevação shadow-sm" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Item inativo com texto text-muted-foreground e fundo transparente no trilho" },
      { name: "Hover", description: "Texto com realce hover:text-foreground" },
      { name: "Pressionado", description: "Escala física reduzida via active:scale-(--scale-pressed) com transição suave" },
      { name: "Foco", description: "Anel visível com focus-visible:ring-[3px] focus-visible:ring-ring e z-10" },
      { name: "Selecionado", description: "Fundo bg-background, texto text-foreground e elevação shadow-sm com data-state=\"on\"" },
      { name: "Desabilitado", description: "Opacidade reduzida com opacity-50 e cursor bloqueado por item ou no grupo" },
    ],
    sizes: [
      { name: "sm", value: "sm", description: "28 px — Barras de ferramentas densas e cabeçalhos compactos" },
      { name: "default", value: "default", description: "32 px — Padrão para alternar visões ou filtros em páginas e painéis" },
      { name: "lg", value: "lg", description: "36 px — Destaque em telas móveis e áreas com maior área de toque" },
    ],
    doGuidelines: ["Forneça aria-label descritivo no SegmentedControl indicando o propósito da escolha.", "Mantenha de 2 a 4 opções mutuamente excludentes com comprimentos visuais equilibrados.", "Aplique a alteração do estado na interface de forma imediata após a seleção."],
    dontGuidelines: ["Usar para alternar painéis complexos de conteúdo com páginas independentes → tabs.", "Agrupar mais de 4 opções extensas que não cabem confortavelmente em linha → select.", "Permitir seleção múltipla ou desmarcar todas as opções → toggle-group."],
    code: `import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control"

<SegmentedControl aria-label="Período" defaultValue="semana">
  <SegmentedControlItem value="dia">Dia</SegmentedControlItem>
  <SegmentedControlItem value="semana">Semana</SegmentedControlItem>
  <SegmentedControlItem value="mes">Mês</SegmentedControlItem>
</SegmentedControl>`,
    props: [
      { name: "size (SegmentedControl)", type: "sm · default · lg", default: "default", description: "Dimensão compartilhada com todos os itens do grupo via contexto" },
      { name: "size (SegmentedControlItem)", type: "sm · default · lg", default: "default", description: "Altura do segmento quando sobrescreve o tamanho do container" },
      { name: "value · defaultValue (SegmentedControl)", type: "string", default: "—", description: "Valor da opção selecionada de forma controlada ou não-controlada" },
      { name: "onValueChange (SegmentedControl)", type: "(value: string) => void", default: "—", description: "Callback disparado imediatamente ao selecionar uma nova opção" },
    ],
    meta: {
      nome: "SegmentedControl",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/segmented-control.tsx",
      story: "src/components/ui/segmented-control.stories.tsx",
      vizinhos: ["tabs", "toggle-group", "select", "radio-group"],
    },
    whenToUseItems: ["Alternar modos de visualização rápida do mesmo conjunto de dados (ex.: Lista e Grade).", "Seleção de granularidade temporal em relatórios e gráficos (ex.: Dia, Semana, Mês).", "Escolha entre 2 a 4 alternativas fixas e visíveis que aplicam o efeito imediatamente."],
    whenNotToUse: ["Cada opção controla a troca de um painel de conteúdo longo e estruturado → tabs.", "Seleção múltipla simultânea ou botões com contorno individual → toggle-group.", "Mais de 4 opções em lista longa com limitação de espaço horizontal → select."],
    content: ["Use rótulos curtos de uma ou duas palavras por segmento: Dia, Semana, Mês.", "Mantenha padrão gramatical e tamanho semelhante entre todas as opções do mesmo grupo: Lista, Grade.", "Sem ponto final em rótulos de segmento."],
    accessibility: {
      keyboard: "Comportamento nativo de radiogroup: Tab entra no grupo focando o segmento ativo; as setas direcionais navegam e alternam a seleção entre os itens.",
      screenReader: "A raiz expõe papel radiogroup e exige aria-label descritivo. Cada item renderiza papel radio com aria-checked=\"true\" no item selecionado.",
      focus: "O anel de 3 px em ring utiliza focus-visible:z-10 para que a borda de foco não seja cortada pelos segmentos adjacentes.",
      cautions: "Limite o controle a no máximo 4 opções para não comprometer a legibilidade em telas compactas (WCAG 1.4.10) e sempre forneça aria-label no container para contexto.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-background", "bg-muted", "bg-secondary", "border-input", "border-ring", "text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1.5", "h-7", "h-8", "h-9", "p-0.75", "px-3", "size-4"] },
      { contexto: "Raio", itens: ["radius-inset-0.75", "rounded-inner", "rounded-outer-lg"] },
      { contexto: "Sombra", itens: ["shadow-sm"] },
      { contexto: "Movimento", itens: ["--scale-pressed", "duration-motion-fast", "ease-spring"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  select: {
    description: "Menu suspenso customizado acionado por botão para seleção de uma opção em uma lista. Suporta itens estruturados com ícones, grupos de opções e rótulo integrado ou animado.",
    whenToUse: "Seleção única entre 5 e 15 opções em formulários desktop e interfaces ricas. Itens que necessitam de formatação rica, como ícones, descrições secundárias ou separadores temáticos.",
    anatomy: [
      { part: "Select", description: "Raiz (Radix Select) que gerencia o valor selecionado e o estado aberto ou fechado" },
      { part: "SelectTrigger", description: "Botão que exibe o valor atual e abre o menu suspenso ao ser acionado" },
      { part: "SelectValue", description: "Espaço interno que renderiza o valor da opção selecionada ou o texto de placeholder" },
      { part: "SelectContent", description: "Painel flutuante renderizado em portal com rolagem e opções disponíveis" },
      { part: "SelectItem", description: "Opção individual com destaque de foco e ícone de seleção (check)" },
      { part: "SelectGroup", description: "Agrupador semântico de opções relacionadas" },
      { part: "SelectLabel", description: "Rótulo descritivo para um grupo de opções dentro do menu" },
      { part: "SelectSeparator", description: "Linha divisória fina para separar grupos ou seções no menu" },
      { part: "SelectScrollUpButton", description: "Botão indicador de rolagem para cima quando a lista excede a altura máxima" },
      { part: "SelectScrollDownButton", description: "Botão indicador de rolagem para baixo quando há itens adicionais ocultos" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Gatilho com borda border-input e texto placeholder atenuado" },
      { name: "Foco no gatilho", description: "Anel de 3 px em ring-ring e borda border-ring no SelectTrigger" },
      { name: "Aberto", description: "Menu flutuante exibido com animação de fade e zoom" },
      { name: "Item em foco", description: "Fundo bg-accent e texto text-accent-foreground no SelectItem navegado" },
      { name: "Inválido", description: "Borda destacada em border-destructive e anel sutil em ring-destructive/20" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% com cursor not-allowed no gatilho" },
    ],
    sizes: [],
    doGuidelines: ["Mantenha um texto de placeholder claro como \"Selecione uma opção\".", "Agrupe itens semelhantes utilizando SelectGroup e SelectLabel.", "Use em formulários desktop onde formatações visuais enriquecidas agregam valor."],
    dontGuidelines: ["Usar para 2 a 4 opções simples que cabem visíveis → prefira radio-group ou segmented-control.", "Listas muito extensas com mais de 15 itens sem busca → utilize combobox.", "Usar para lista de ações ou comandos que executam funções → utilize dropdown-menu."],
    code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select defaultValue="mensal">
  <SelectTrigger className="w-48" aria-label="Frequência de pagamento">
    <SelectValue placeholder="Selecione" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="mensal">Mensal</SelectItem>
    <SelectItem value="anual">Anual</SelectItem>
  </SelectContent>
</Select>`,
    props: [
      { name: "size (SelectTrigger)", type: "sm · default", default: "default", description: "Altura do gatilho: default com 36 px (h-9) e sm com 32 px (h-8)" },
      { name: "label (SelectTrigger)", type: "React.ReactNode", default: "—", description: "Rótulo exibido acima ou animado sobre o gatilho" },
      { name: "animatedLabel (SelectTrigger)", type: "boolean", default: "false", description: "Ativa animação flutuante do rótulo no foco ou preenchimento" },
      { name: "position (SelectContent)", type: "item-aligned · popper", default: "item-aligned", description: "Posicionamento alinhado ao item ativo ou ancorado como popover" },
      { name: "align (SelectContent)", type: "start · center · end", default: "center", description: "Alinhamento horizontal do painel em relação ao gatilho" },
      { name: "value · defaultValue (Select)", type: "string", default: "—", description: "Valor controlado ou inicial da opção selecionada" },
      { name: "onValueChange (Select)", type: "(value: string) => void", default: "—", description: "Callback disparado quando o valor selecionado muda" },
      { name: "disabled (Select, SelectItem)", type: "boolean", default: "false", description: "Desativa a interação do componente ou da opção" },
    ],
    meta: {
      nome: "Select",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/select.tsx",
      story: "src/components/ui/select.stories.tsx",
      vizinhos: ["native-select", "combobox", "radio-group", "dropdown-menu"],
    },
    whenToUseItems: ["Seleção única entre 5 e 15 opções em formulários desktop e interfaces ricas.", "Itens que necessitam de formatação rica, como ícones, descrições secundárias ou separadores temáticos."],
    whenNotToUse: ["Até 4 ou 5 opções que podem permanecer visíveis diretamente na tela → radio-group.", "Listas muito extensas (acima de 15 itens) que exigem campo de busca ou filtro por digitação → combobox.", "Preferência pelo comportamento e rolagem nativos do dispositivo móvel sem customização → native-select."],
    content: ["Placeholder conciso no gatilho quando nenhuma opção estiver selecionada: \"Selecione um plano\".", "Rótulos de itens curtos e objetivos em ordem alfabética ou hierárquica.", "Use SelectGroup e SelectLabel para categorizar opções em listas com mais de 7 itens."],
    accessibility: {
      keyboard: "Espaço, Enter ou Setas Acima/Abaixo abrem o menu a partir do SelectTrigger focado. As setas navegam entre os itens. Enter ou Espaço selecionam a opção focada e fecham o menu. Esc fecha sem alterar e devolve o foco ao gatilho.",
      screenReader: "Papel combobox no gatilho com aria-expanded e aria-haspopup=\"listbox\". O painel atua com papel listbox e os itens com papel option, anunciando o estado selecionado via aria-selected.",
      focus: "Anel visível de 3 px em ring-ring no gatilho. Ao abrir o menu, o foco se move para o item selecionado ou o primeiro item. Ao fechar, retorna para o SelectTrigger.",
      cautions: "Sempre associe um rótulo textual via prop label ou aria-label no SelectTrigger. Para listas longas acima de 15 opções que necessitam de digitação e busca, prefira o componente combobox.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-border", "bg-input", "bg-popover", "border-destructive", "border-input", "border-ring", "text-accent-foreground", "text-foreground", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1.5", "gap-2", "h-8", "h-9", "h-px", "left-0", "left-3", "min-w-32", "mt-5", "mx-1", "my-1", "p-1", "pl-2", "pr-8", "px-2", "px-3", "py-1", "py-1.5", "py-2", "right-2", "size-3.5", "size-4", "top-0", "top-1"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm"] },
      { contexto: "Sombra", itens: ["shadow-md", "shadow-xs"] },
      { contexto: "Movimento", itens: ["duration-motion-fast"] },
      { contexto: "Foco", itens: ["outline-ring", "ring-destructive", "ring-ring"] },
    ],
  },
  popover: {
    description: "Painel flutuante acionado por clique que exibe conteúdo rico, configurações rápidas ou detalhes adicionais. Mantém a pessoa no contexto da tela sem a interrupção de uma janela modal.",
    whenToUse: "Exibir formulários curtos ou controles interativos ancorados a um botão, como filtros rápidos. Mostrar detalhes complementares ou contexto enriquecido de um item com links ou ações secundárias.",
    anatomy: [
      { part: "Popover", description: "Raiz (Radix Popover) que gerencia o estado aberto ou fechado do painel" },
      { part: "PopoverTrigger", description: "Elemento interativo que abre o painel flutuante ao ser clicado" },
      { part: "PopoverContent", description: "Painel flutuante renderizado em portal com elevação e largura padrão w-72" },
      { part: "PopoverAnchor", description: "Ponto de ancoragem opcional para posicionar o painel separado do botão de disparo" },
      { part: "PopoverHeader", description: "Cabeçalho interno para agrupar título e descrição com espaçamento consistente" },
      { part: "PopoverTitle", description: "Título do painel com tipografia semibold (h2) para identificar o conteúdo" },
      { part: "PopoverDescription", description: "Texto de apoio com cor atenuada para contextualizar a ação" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "Oculto e fora da árvore de renderização visível" },
      { name: "Aberto", description: "Visível com animação de fade e zoom a partir da origem da ancoragem" },
      { name: "Foco no conteúdo", description: "Primeiro elemento interativo do painel recebe o foco inicial" },
    ],
    sizes: [],
    doGuidelines: ["Mantenha o conteúdo enxuto com poucas ações para manter o contexto ágil.", "Forneça um gatilho claro e acessível com Button ou elemento focável.", "Deixe o fechamento automático ao clicar fora ou pressionar a tecla Esc."],
    dontGuidelines: ["Abrir o painel apenas com o cursor do mouse (hover) → use tooltip.", "Formulários complexos ou longos com múltiplos passos dentro do painel → utilize dialog ou sheet.", "Abrir múltiplos popovers simultâneos competindo na mesma tela → feche o anterior antes de abrir outro ou use dropdown-menu."],
    code: `import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Filtros rápidos</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p className="text-sm">Opções de filtragem rápida.</p>
  </PopoverContent>
</Popover>`,
    props: [
      { name: "align (PopoverContent)", type: "start · center · end", default: "center", description: "Alinhamento do painel em relação ao elemento disparador" },
      { name: "sideOffset (PopoverContent)", type: "number", default: "4", description: "Distância em pixels entre o painel flutuante e o disparador" },
      { name: "open · defaultOpen (Popover)", type: "boolean", default: "—", description: "Estado de visibilidade controlado ou inicial do painel" },
      { name: "onOpenChange (Popover)", type: "(open: boolean) => void", default: "—", description: "Callback disparado na abertura ou fechamento" },
    ],
    meta: {
      nome: "Popover",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/popover.tsx",
      story: "src/components/ui/popover.stories.tsx",
      vizinhos: ["tooltip", "dialog", "dropdown-menu"],
    },
    whenToUseItems: ["Exibir formulários curtos ou controles interativos ancorados a um botão, como filtros rápidos.", "Mostrar detalhes complementares ou contexto enriquecido de um item com links ou ações secundárias."],
    whenNotToUse: ["Formulário extenso, fluxo complexo ou decisão crítica que interrompe o usuário → dialog.", "Texto curto e estritamente informativo disparado apenas no hover → tooltip.", "Lista vertical de comandos ou opções de navegação simples → dropdown-menu."],
    content: ["Título curto e direto com até 3 palavras: \"Configurações\", \"Dimensões\".", "Limite o conteúdo a um ou dois campos ou até duas ações secundárias.", "Textos de descrição concisos, sem ponto final em títulos."],
    accessibility: {
      keyboard: "Enter ou Espaço no gatilho abrem o popover. O foco move para o primeiro elemento focável dentro do painel. Tab navega entre os controles internos. Esc fecha o painel e devolve o foco ao gatilho.",
      screenReader: "O gatilho recebe aria-haspopup=\"dialog\" e aria-expanded indicando se o painel está aberto. O painel atua com papel dialog associado ao título.",
      focus: "Ao abrir, o foco é transferido para dentro do painel; ao fechar por Esc, clique fora ou ação, o foco retorna exatamente para o PopoverTrigger.",
      cautions: "Não use popover para decisões críticas ou fluxos que exijam confirmação do usuário; nesses casos utilize dialog com bloqueio de foco. Garanta que o botão disparador possua rótulo acessível quando contiver apenas ícone.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-popover", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1", "p-4", "w-72"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Sombra", itens: ["shadow-md"] },
    ],
  },
  item: {
    description: "Linha estruturada para exibir informações com mídia, texto e ações em listas e coleções. Organiza metadados, títulos e controles com espaçamento consistente.",
    whenToUse: "Montar linhas de listagem para contatos, arquivos, notificações ou configurações. Exibir registros com mídia à esquerda (ícone, avatar ou miniatura) e ações à direita. Agrupar itens com divisores verticais ou contorno através de ItemGroup e ItemSeparator.",
    anatomy: [
      { part: "ItemGroup", description: "Container vertical flexível para agrupar múltiplos itens" },
      { part: "ItemSeparator", description: "Divisor horizontal sutil entre itens consecutivos" },
      { part: "Item", description: "Linha principal flexível com suporte a link ou elemento filho" },
      { part: "ItemMedia", description: "Container de mídia alinhado ao início para ícones ou imagens" },
      { part: "ItemContent", description: "Área central flexível que empilha título e descrição" },
      { part: "ItemTitle", description: "Título com tipografia média e alinhamento compacto" },
      { part: "ItemDescription", description: "Texto descritivo com truncamento automático em duas linhas" },
      { part: "ItemActions", description: "Bloco horizontal alinhado ao final para botões e controles" },
      { part: "ItemHeader", description: "Linha superior opcional para cabeçalho interno da linha" },
      { part: "ItemFooter", description: "Linha inferior opcional para rodapé interno da linha" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Superfície transparente, ideal para listas densas e contínuas" },
      { name: "Outline", value: "outline", description: "Borda delimitadora visível para separar linhas individuais" },
      { name: "Muted", value: "muted", description: "Superfície com fundo sutil para destacar itens secundários" },
      { name: "Icon", value: "icon", description: "Caixa de 32×32 px com borda para ícones de sistema" },
      { name: "Image", value: "image", description: "Caixa de 40×40 px com corte arredondado para fotos e miniaturas" },
    ],
    states: [
      { name: "Padrão", description: "Fundo transparente ou de acordo com a variante escolhida" },
      { name: "Hover", description: "Fundo sutil hover:bg-accent/50 quando configurado como link interativo" },
      { name: "Foco", description: "Anel de 3 px em ring-ring com border-ring via focus-visible" },
    ],
    sizes: [
      { name: "default", value: "default", description: "— — Espaçamento padrão de 16 px com padding p-4 e gap-4 para listas gerais" },
      { name: "sm", value: "sm", description: "— — Espaçamento compacto com padding px-4 py-3 e gap-2.5 para painéis densos" },
    ],
    doGuidelines: ["Mantenha a mesma composição de mídia e texto em todos os itens da mesma lista.", "Utilize ItemSeparator ou a variante outline para delimitar linhas quando não houver divisores externos.", "Use asChild para compor com links de navegação mantendo semântica adequada."],
    dontGuidelines: ["Usar item como cartão de destaque com sombra e margens amplas → card", "Misturar itens com alturas e alinhamentos divergentes na mesma listagem → list", "Colocar botões de ação sem nome acessível em ItemActions → icon-button"],
    code: `import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

<Item variant="outline">
  <ItemMedia variant="icon">
    <Icon name="folder" />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Documentos</ItemTitle>
    <ItemDescription>Arquivos e relatórios compartilhados da equipe.</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="ghost" size="sm">Abrir</Button>
  </ItemActions>
</Item>`,
    props: [
      { name: "variant", type: "default · outline · muted", default: "default", description: "Estilo de superfície e borda do item" },
      { name: "size", type: "default · sm", default: "default", description: "Espaçamento interno e distância entre elementos" },
      { name: "asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho como link de navegação" },
      { name: "variant (ItemMedia)", type: "default · icon · image", default: "default", description: "Dimensões e acabamento da mídia à esquerda" },
    ],
    meta: {
      nome: "Item",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/item.tsx",
      story: "src/components/ui/item.stories.tsx",
      vizinhos: ["list", "card", "button"],
    },
    whenToUseItems: ["Montar linhas de listagem para contatos, arquivos, notificações ou configurações.", "Exibir registros com mídia à esquerda (ícone, avatar ou miniatura) e ações à direita.", "Agrupar itens com divisores verticais ou contorno através de ItemGroup e ItemSeparator."],
    whenNotToUse: ["Bloco de conteúdo independente e destacado com elevação própria → card", "Lista de texto corrido ou parágrafos sem mídia ou ações → list", "Botão isolado de navegação ou ação simples → button"],
    content: ["Título curto e direto identificando a entidade ou assunto principal.", "Descrição complementar resumida com no máximo duas linhas de texto.", "Ações com rótulos descritivos ou botões de ícone com rótulo acessível."],
    accessibility: {
      keyboard: "Quando usado como link com asChild, Tab navega para a linha; controles em ItemActions recebem foco subsequente.",
      screenReader: "Itens dentro de listas anunciam posição ordinal e total; o título provê o rótulo principal da linha.",
      focus: "Anel visível de 3 px contorna o item interativo ou botões de ação internos individualmente.",
      cautions: "A mídia inicial deve ter aria-hidden quando for decorativa; não coloque múltiplos links aninhados na mesma linha.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-muted", "border-border", "border-ring", "text-muted-foreground", "text-primary"] },
      { contexto: "Tipografia", itens: ["font-medium", "font-normal", "leading-normal", "leading-snug", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-2", "gap-2.5", "gap-4", "my-0", "p-4", "px-4", "py-3", "size-10", "size-4", "size-8"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  link: {
    description: "Permite navegar entre páginas, seções internas ou sites externos. Reaproveita o estilo visual de link do botão e dá suporte a indicador de saída externa e carregamento esqueleto.",
    whenToUse: "Navegar entre diferentes páginas ou rotas da aplicação em links isolados ou corridos. Conectar o usuário a sites ou serviços externos abrindo em nova aba com a prop external. Ações secundárias de navegação em rodapés, termos de serviço ou textos explicativos.",
    anatomy: [
      { part: "Link", description: "Elemento <a> (ou elemento filho via asChild) com classes da variante link do Button" },
      { part: "Ícone de saída (opcional)", description: "Ícone open_in_new renderizado automaticamente à direita quando external=true" },
      { part: "LinkSkeleton", description: "Placeholder de carregamento (Link.Skeleton) com a mesma escala de altura e largura" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Texto na cor primária com sublinhado deslocado" },
      { name: "Hover", description: "Sublinhado destacado via hover:underline" },
      { name: "Foco", description: "Anel visível via focus-visible:ring" },
      { name: "Externo", description: "Exibe o ícone open_in_new e abre em nova aba" },
      { name: "Desabilitado", description: "Suportado via aria-disabled com opacidade reduzida" },
    ],
    sizes: [],
    doGuidelines: ["Escreva textos descritivos que deixem o destino evidente antes do clique.", "Use a prop external ao apontar para URLs de terceiros fora da aplicação.", "Componha com next/link através de asChild para manter o roteamento client-side."],
    dontGuidelines: ["Usar link para disparar mutações de dados ou ações de formulário → button", "Montar navegação em migalhas de pão com links manuais soltos → breadcrumb", "Substituir barras ou menus de navegação estruturados por links avulsos → navigation-menu"],
    code: `import { Link } from "@/components/ui/link"

<Link href="/relatorios">Ver relatórios da equipe</Link>
<Link href="https://example.com" external>
  Documentação externa
</Link>
<Link.Skeleton size="sm" />`,
    props: [
      { name: "size", type: "LinkSize", default: "default", description: "Escala de tamanho e altura herdada do botão (default, xs, sm, lg)" },
      { name: "asChild", type: "boolean", default: "false", description: "Delega a renderização para o elemento filho como next/link" },
      { name: "external", type: "boolean", default: "false", description: "Força target=\"_blank\", rel=\"noopener noreferrer\" e ícone de saída" },
      { name: "href", type: "string", default: "—", description: "Endereço de destino da navegação" },
      { name: "size (LinkSkeleton)", type: "LinkSize", default: "default", description: "Tamanho do placeholder esqueleto correspondente" },
    ],
    meta: {
      nome: "Link",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/link.tsx",
      story: "src/components/ui/link.stories.tsx",
      vizinhos: ["button", "navigation-menu", "breadcrumb"],
    },
    whenToUseItems: ["Navegar entre diferentes páginas ou rotas da aplicação em links isolados ou corridos.", "Conectar o usuário a sites ou serviços externos abrindo em nova aba com a prop external.", "Ações secundárias de navegação em rodapés, termos de serviço ou textos explicativos."],
    whenNotToUse: ["Ação que altera dados, envia formulário ou abre janelas modais → button", "Menus complexos de navegação hierárquica com múltiplos níveis → navigation-menu", "Trilha de localização indicando o caminho atual da página → breadcrumb"],
    content: ["O texto deve indicar com clareza o destino ou objetivo: \"Ver relatórios\", \"Documentação da API\".", "Evite expressões genéricas e isoladas como \"clique aqui\" ou \"saiba mais\".", "Para destinos externos, a indicação de nova aba é reforçada pelo ícone visual."],
    accessibility: {
      keyboard: "Focável através da tecla Tab; a tecla Enter ativa a navegação para o destino informado no href.",
      screenReader: "Anunciado com papel link e o texto do children como nome acessível; com external, deve-se avisar abertura em nova aba.",
      focus: "Destacado por anel de foco visível via classes focus-visible herdadas do botão.",
      cautions: "Links externos devem incluir aviso de abertura em nova aba no texto ou acessibilidade; nunca use link para ações destrutivas.",
    },
    tokens: [
      { contexto: "Espaço", itens: ["h-10", "h-6", "h-8", "h-9", "w-14", "w-16", "w-20", "w-24"] },
      { contexto: "Raio", itens: ["rounded-md"] },
    ],
  },
  list: {
    description: "Organiza informações textuais ou blocos de conteúdo verticalmente em lista. Suporta formato ordenado ou não ordenado, com ou sem marcadores visuais.",
    whenToUse: "Apresentar sequências textuais de itens relacionados, como requisitos, recursos ou regras. Estruturar instruções passo a passo numeradas onde a ordem de execução importa (as=\"ol\"). Agrupar verticalmente componentes como Item em uma lista sem marcadores visuais (variant=\"none\").",
    anatomy: [
      { part: "List", description: "Container raiz renderizado como ul ou ol que define o espaçamento vertical entre itens" },
      { part: "ListItem", description: "Elemento li individual para texto corrido ou composição com outros componentes" },
    ],
    variants: [
      { name: "None", value: "none", description: "Lista limpa sem marcador visual, ideal para layout ou composição com itens customizados" },
      { name: "Marker", value: "marker", description: "Exibe marcadores nativos: marcadores circulares no ul ou numeração sequencial no ol" },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["Use as=\"ol\" com variant=\"marker\" quando a ordem for cronológica ou sequencial.", "Agrupe linhas compostas por Item utilizando variant=\"none\" para manter a semântica de lista.", "Mantenha paralelismo gramatical e extensão semelhante entre os itens da mesma lista."],
    dontGuidelines: ["Usar List para exibir dados tabulares comparativos em múltiplas colunas → table", "Montar árvores com múltiplos níveis e expansão hierárquica → tree-select", "Montar linhas de lista densas com avatar e botões acoplados em texto livre → item"],
    code: `import { List, ListItem } from "@/components/ui/list"

<List variant="marker">
  <ListItem>Documento de identidade com foto</ListItem>
  <ListItem>Comprovante de residência atualizado</ListItem>
</List>

<List as="ol" variant="marker">
  <ListItem>Preencha o formulário inicial.</ListItem>
  <ListItem>Envie os documentos solicitados.</ListItem>
</List>`,
    props: [
      { name: "variant", type: "none · marker", default: "none", description: "Controla a visibilidade dos marcadores nativos (bullet ou números)" },
      { name: "as", type: "ListElement", default: "ul", description: "Elemento HTML semântico da lista (ul para não ordenada ou ol para ordenada)" },
    ],
    meta: {
      nome: "List",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/list.tsx",
      story: "src/components/ui/list.stories.tsx",
      vizinhos: ["item", "table", "tree-select"],
    },
    whenToUseItems: ["Apresentar sequências textuais de itens relacionados, como requisitos, recursos ou regras.", "Estruturar instruções passo a passo numeradas onde a ordem de execução importa (as=\"ol\").", "Agrupar verticalmente componentes como Item em uma lista sem marcadores visuais (variant=\"none\")."],
    whenNotToUse: ["Linhas complexas com avatar, metadados e múltiplos botões de ação → item", "Dados tabulares bidimensionais com colunas, ordenação e paginação → table", "Estruturas de pastas ou dados hierárquicos com múltiplos níveis recolhíveis → tree-select"],
    content: ["Mantenha padrão gramatical uniforme entre os itens (todos começando por verbo ou substantivo).", "Frases completas levam ponto final; termos curtos ou palavras isoladas dispensam pontuação.", "Em listas ordenadas com ol, certifique-se de que a sequência numérica representa ordem cronológica ou prioridade."],
    accessibility: {
      keyboard: "Não recebe foco direto; elementos interativos contidos nos itens recebem Tab normalmente.",
      screenReader: "Usa tags semânticas ul, ol e li; anuncia o número total de itens e a posição relativa de cada um.",
      focus: "Nenhum no container da lista; o foco flui sequencialmente pelos elementos focáveis internos.",
      cautions: "Use semântica nativa ol quando a ordem for essencial para compreensão; nunca use caracteres visuais manuais no lugar de marcadores de lista.",
    },
    tokens: [
      { contexto: "Cor", itens: ["text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["leading-normal", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1"] },
    ],
  },
  marker: {
    description: "Exibe status em linha, notas de sistema ou divisores rotulados em conversas e fluxos. Destaca eventos intermediários com ícone opcional e linhas delimitadoras.",
    whenToUse: "Marcar eventos de sistema e status temporais em interfaces de chat e mensagens. Inserir divisores contextuais com texto centralizado (\"ou\", \"ontem\") via variante separator. Delimitar seções de notas com linha de borda inferior discreta via variante border.",
    anatomy: [
      { part: "Marker", description: "Container raiz flexível com data-slot=\"marker\" e suporte a asChild" },
      { part: "MarkerIcon", description: "Container de ícone de 16×16 px com aria-hidden para apoio visual" },
      { part: "MarkerContent", description: "Conteúdo textual com suporte a links sublinhados e alinhamento flexível" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Linha informativa simples com ícone e texto para notas de sistema" },
      { name: "Separator", value: "separator", description: "Divisor centralizado com linhas de 1 px à esquerda e à direita" },
      { name: "Border", value: "border", description: "Linha delimitadora com borda inferior sutil para fechar blocos de mensagens" },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["Utilize MarkerIcon com aria-hidden sempre que incluir glifos ou ícones ilustrativos.", "Use a variante separator para criar divisores com texto legível entre mensagens.", "Mantenha textos de sistema concisos e objetivos para não sobrecarregar o fluxo de leitura."],
    dontGuidelines: ["Usar Marker para criar divisões estruturais sem qualquer conteúdo textual → separator", "Exibir contadores ou selos de status destacados em cabeçalhos → badge", "Usar Marker como botão interativo ou filtro clicável → tag"],
    code: `import { Icon } from "@/components/ui/icon"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

<Marker>
  <MarkerIcon>
    <Icon name="check_circle" />
  </MarkerIcon>
  <MarkerContent>Etapa concluída</MarkerContent>
</Marker>

<Marker variant="separator">
  <MarkerContent>ou</MarkerContent>
</Marker>`,
    props: [
      { name: "variant", type: "default · separator · border", default: "default", description: "Estilo visual: padrão simples, divisor com linhas laterais ou borda inferior" },
      { name: "asChild", type: "boolean", default: "false", description: "Delega a renderização para o elemento filho" },
    ],
    meta: {
      nome: "Marker",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/marker.tsx",
      story: "src/components/ui/marker.stories.tsx",
      vizinhos: ["separator", "badge", "tag"],
    },
    whenToUseItems: ["Marcar eventos de sistema e status temporais em interfaces de chat e mensagens.", "Inserir divisores contextuais com texto centralizado (\"ou\", \"ontem\") via variante separator.", "Delimitar seções de notas com linha de borda inferior discreta via variante border."],
    whenNotToUse: ["Linha divisória simples sem texto ou ícone associado → separator", "Rótulo compacto de status só de leitura em cards ou tabelas → badge", "Etiqueta interativa com suporte a seleção ou remoção → tag"],
    content: ["Textos curtos e diretos em tom neutro: \"Tokens aplicados\", \"Ontem às 14:30\".", "Em divisores de contexto (variante separator), use conjunções curtas: \"ou\", \"hoje\".", "Links inseridos em MarkerContent devem possuir destino claro e texto autoexplicativo."],
    accessibility: {
      keyboard: "Não recebe foco: o componente possui finalidade informativa e estrutural.",
      screenReader: "MarkerIcon possui aria-hidden por padrão; o texto em MarkerContent é anunciado como texto de suporte.",
      focus: "Nenhum no container; links ou botões internos recebem foco por Tab na ordem natural.",
      cautions: "A cor e as linhas do divisor são decorativas; nunca transmita informações críticas exclusivamente por símbolos sem texto.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-border", "border-border", "text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["text-sm"] },
      { contexto: "Espaço", itens: ["gap-2", "h-px", "min-h-4", "min-w-0", "ml-1", "mr-1", "pb-2", "size-4"] },
    ],
  },
  alert: {
    description: "Exibe uma mensagem contextual fixa na página para informar, orientar ou alertar a pessoa. Permanece visível junto ao conteúdo relevante até ser resolvida ou dispensada.",
    whenToUse: "Avisos persistentes que exigem atenção antes de prosseguir no formulário ou fluxo. Mensagens de erro de validação geral ou falhas de comunicação com o servidor na página. Informações contextuais permanentes sobre limites da conta ou status do sistema.",
    anatomy: [
      { part: "Alert", description: "Contêiner raiz com data-slot=\"alert\" e role=\"alert\", layout em grade para acomodar ícone e texto." },
      { part: "AlertTitle", description: "Título do alerta com data-slot=\"alert-title\", tipografia em destaque (font-medium)." },
      { part: "AlertDescription", description: "Descrição detalhada com data-slot=\"alert-description\", texto secundário com entrelinha relaxada." },
      { part: "Ícone (opcional)", description: "SVG inserido diretamente como primeiro filho de Alert, alinhado à primeira linha do texto." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Mensagens informativas, avisos gerais ou confirmações contextuais" },
      { name: "Destructive", value: "destructive", description: "Erros, falhas de sistema ou avisos de bloqueio que impedem a conclusão da tarefa" },
    ],
    states: [
      { name: "Padrão", description: "Borda sutil e fundo no tom da variante escolhida (default ou destructive)" },
      { name: "Com ícone", description: "Alinha o ícone automaticamente ao topo com espaçamento lateral dedicado" },
      { name: "Só leitura", description: "Não é um elemento interativo e não recebe foco de teclado por padrão" },
    ],
    sizes: [],
    doGuidelines: ["Combine ícone e texto descritivo para que o significado não dependa apenas da cor.", "Posicione o alerta próximo ao conteúdo ou campo que gerou a mensagem.", "Indique uma ação clara para a pessoa resolver a pendência apontada."],
    dontGuidelines: ["Acumular múltiplos alertas empilhados na mesma página → condense em um único resumo ou use sonner.", "Usar variante destructive para avisos que não bloqueiam nem causam perda → use variante default.", "Exibir códigos de erro opacos sem explicação em linguagem comum → traduza a mensagem com a orientação do que fazer."],
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icon } from "@/components/ui/icon"

<Alert>
  <Icon name="info" />
  <AlertTitle>Atualização disponível</AlertTitle>
  <AlertDescription>
    Uma nova versão do sistema está pronta para instalação.
  </AlertDescription>
</Alert>`,
    props: [
      { name: "variant", type: "default · destructive", default: "default", description: "Define o tom visual e a gravidade da mensagem" },
      { name: "...props", type: "ComponentProps<\"div\">", default: "—", description: "Atributos padrão de contêiner HTML" },
    ],
    meta: {
      nome: "Alert",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/alert.tsx",
      story: "src/components/ui/alert.stories.tsx",
      vizinhos: ["sonner", "alert-dialog", "dialog"],
    },
    whenToUseItems: ["Avisos persistentes que exigem atenção antes de prosseguir no formulário ou fluxo.", "Mensagens de erro de validação geral ou falhas de comunicação com o servidor na página.", "Informações contextuais permanentes sobre limites da conta ou status do sistema."],
    whenNotToUse: ["Notificação rápida que confirma uma ação e pode sumir sozinha → sonner.", "Erro crítico ou confirmação que bloqueia o fluxo e exige decisão imediata → alert-dialog.", "Diálogo com formulário extenso ou conteúdo interativo em janela sobreposta → dialog."],
    content: ["O título deve resumir o ocorrido em poucas palavras: \"Falha na sincronização\".", "A descrição deve orientar o próximo passo concreto: \"Verifique sua conexão e tente novamente.\".", "Evite termos excessivamente técnicos ou códigos de erro brutos na mensagem para a pessoa usuária."],
    accessibility: {
      keyboard: "Não recebe foco diretamente. Links ou botões de ação colocados dentro do alerta recebem foco via Tab normalmente.",
      screenReader: "Possui role=\"alert\", sendo anunciado imediatamente pelas tecnologias assistivas quando inserido dinamicamente no DOM.",
      focus: "Não desloca o foco da pessoa ao ser exibido, exceto se configurado como resumo de erros ao submeter formulário.",
      cautions: "A cor não deve ser o único meio de transmitir gravidade; utilize sempre um ícone correspondente e título descritivo (critério WCAG 1.4.1).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-card", "text-card-foreground", "text-destructive", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "leading-relaxed", "text-sm", "tracking-tight"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-x-3", "gap-y-0.5", "min-h-4", "px-4", "py-3", "size-4"] },
      { contexto: "Raio", itens: ["rounded-lg"] },
    ],
  },
  breadcrumb: {
    description: "Mostra a localização da página atual na hierarquia do site e o caminho percorrido. Permite navegar diretamente para qualquer nível ancestral da estrutura.",
    whenToUse: "Estruturas de navegação com três ou mais níveis de profundidade (ex.: Início > Configurações > Notificações). Catálogos de produtos ou documentações técnicas organizadas em categorias e subcategorias. Aplicações de gestão onde o contexto pai orienta a visualização da tela atual.",
    anatomy: [
      { part: "Breadcrumb", description: "Elemento raiz <nav> com aria-label=\"breadcrumb\" e data-slot=\"breadcrumb\"." },
      { part: "BreadcrumbList", description: "Lista ordenada <ol> com data-slot=\"breadcrumb-list\" e quebra flexível de itens." },
      { part: "BreadcrumbItem", description: "Item individual <li> com data-slot=\"breadcrumb-item\" que agrupa link e separador." },
      { part: "BreadcrumbLink", description: "Link navegável para nível anterior com data-slot=\"breadcrumb-link\", suportando asChild." },
      { part: "BreadcrumbPage", description: "Rótulo da página atual com data-slot=\"breadcrumb-page\", marcado com aria-current=\"page\"." },
      { part: "BreadcrumbSeparator", description: "Separador visual decorativo com data-slot=\"breadcrumb-separator\" (chevron_right por padrão)." },
      { part: "BreadcrumbEllipsis", description: "Indicador de níveis intermediários recolhidos com data-slot=\"breadcrumb-ellipsis\"." },
    ],
    variants: [],
    states: [
      { name: "Link normal", description: "Texto secundário text-muted-foreground sem sublinhado" },
      { name: "Link hover", description: "Transição suave para a cor do texto principal (hover:text-foreground)" },
      { name: "Link foco", description: "Anel de foco visível no link ativo ou elemento focado" },
      { name: "Página atual", description: "Texto principal text-foreground com aria-current=\"page\", sem interação" },
      { name: "Separador", description: "Elemento decorativo com aria-hidden=\"true\" e opacidade atenuada" },
    ],
    sizes: [],
    doGuidelines: ["Posicione a trilha no topo da tela, logo acima do título principal da página.", "Mantenha a correspondência exata entre o rótulo do breadcrumb e o título da tela de destino.", "Use asChild em BreadcrumbLink para integrar com o roteamento da aplicação (next/link)."],
    dontGuidelines: ["Tornar o item da página atual um link clicável → utilize sempre BreadcrumbPage.", "Usar breadcrumb como único meio de navegação do sistema → combine com sidebar ou navigation-menu.", "Exibir separadores para leitores de tela → mantenha aria-hidden=\"true\" no BreadcrumbSeparator."],
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
      <BreadcrumbLink href="/documentos">Documentos</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Relatório Anual</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    props: [
      { name: "asChild (BreadcrumbLink)", type: "boolean", default: "false", description: "Delega a renderização para o componente filho (como Next.js Link)" },
      { name: "children (BreadcrumbSeparator)", type: "React.ReactNode", default: "<Icon name=\"chevron_right\" />", description: "Separador personalizado entre os itens" },
    ],
    meta: {
      nome: "Breadcrumb",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/breadcrumb.tsx",
      story: "src/components/ui/breadcrumb.stories.tsx",
      vizinhos: ["sidebar", "navigation-menu", "pagination"],
    },
    whenToUseItems: ["Estruturas de navegação com três ou mais níveis de profundidade (ex.: Início > Configurações > Notificações).", "Catálogos de produtos ou documentações técnicas organizadas em categorias e subcategorias.", "Aplicações de gestão onde o contexto pai orienta a visualização da tela atual."],
    whenNotToUse: ["Sites rasos ou navegações planas de apenas um ou dois níveis → navigation-menu.", "Navegação lateral primária que exibe toda a árvore da aplicação → sidebar.", "Paginação sequencial de listas ou tabelas → pagination."],
    content: ["Utilize os mesmos títulos das páginas de destino para manter consistência com a navegação.", "O último item corresponde sempre à página atual e deve estar por extenso sem ser link.", "Em títulos muito longos nos níveis intermediários, abrevie o texto mantendo a clareza."],
    accessibility: {
      keyboard: "Tab navega sequencialmente apenas pelos links anteriores (BreadcrumbLink) e botões de expansão (BreadcrumbEllipsis). A página atual não recebe foco por não ser link.",
      screenReader: "O contêiner <nav> possui aria-label=\"breadcrumb\" e a página atual é identificada via aria-current=\"page\" e aria-disabled=\"true\".",
      focus: "O anel de foco visível destaca o item focado durante a navegação por teclado.",
      cautions: "Os separadores possuem aria-hidden=\"true\" para não poluir a leitura de tela. Atenção: o elemento BreadcrumbEllipsis traz More fixo em inglês no sr-only, devendo ser sobrescrito para português quando necessário.",
    },
    tokens: [
      { contexto: "Cor", itens: ["text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-normal", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1.5", "gap-2.5", "size-3.5", "size-9"] },
    ],
  },
  "button-group": {
    description: "Agrupa visualmente botões e controles relacionados com cantos e bordas combinados. Mantém alinhamento consistente entre ações complementares, como confirmação e cancelamento ou botões com seletor.",
    whenToUse: "Conjuntos de ações complementares no rodapé de janelas e formulários (ex.: Cancelar e Salvar). Combinações de botão com menu suspenso ou campo de texto integrado na mesma linha. Barras de ação compactas onde botões adjacentes compartilham bordas para economizar espaço.",
    anatomy: [
      { part: "ButtonGroup", description: "Contêiner raiz com data-slot=\"button-group\" e role=\"group\", ajusta cantos e bordas dos filhos para fusão visual." },
      { part: "ButtonGroupText", description: "Rótulo estático não clicável com data-slot=\"button-group-text\" para prefixos ou complementos visuais." },
      { part: "ButtonGroupSeparator", description: "Separador visual fino com data-slot=\"button-group-separator\" baseado no componente Separator." },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Filhos intermediários perdem arredondamentos internos e bordas redundantes" },
      { name: "Horizontal", description: "Borda esquerda dos filhos subsequentes é removida para encaixe contínuo" },
      { name: "Vertical", description: "Borda superior dos filhos subsequentes é removida para empilhamento contínuo" },
      { name: "Foco", description: "O botão focado eleva seu nível de sobreposição (z-10) para exibir o anel de foco completo" },
    ],
    sizes: [],
    doGuidelines: ["Posicione a ação principal à direita no layout horizontal para seguir o fluxo de leitura padrão.", "Use ButtonGroupSeparator quando desejar reforçar a divisão entre botões de mesma superfície.", "Limite o grupo a até três botões em ações de formulário ou use menu suspenso para opções extras."],
    dontGuidelines: ["Dois botões primários com variante default no mesmo grupo → mantenha apenas um primário e use outline no secundário.", "Mais de dez ações em barra sem menu colapsado → utilize dropdown-menu para agrupar opções excedentes.", "Inverter a ordem visual dos botões em relação à árvore do DOM → mantenha a ordem do HTML idêntica à ordem visual."],
    code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

<ButtonGroup>
  <Button variant="outline">Cancelar</Button>
  <Button>Salvar alterações</Button>
</ButtonGroup>`,
    props: [
      { name: "orientation", type: "horizontal · vertical", default: "horizontal", description: "Direção do agrupamento dos botões (linha ou coluna)" },
      { name: "asChild (ButtonGroupText)", type: "boolean", default: "false", description: "Delega a renderização para o elemento filho" },
      { name: "orientation (ButtonGroupSeparator)", type: "horizontal · vertical", default: "vertical", description: "Orientação do separador interno entre os controles" },
    ],
    meta: {
      nome: "Button Group",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/button-group.tsx",
      story: "src/components/ui/button-group.stories.tsx",
      vizinhos: ["button", "toggle-group", "split-button"],
    },
    whenToUseItems: ["Conjuntos de ações complementares no rodapé de janelas e formulários (ex.: Cancelar e Salvar).", "Combinações de botão com menu suspenso ou campo de texto integrado na mesma linha.", "Barras de ação compactas onde botões adjacentes compartilham bordas para economizar espaço."],
    whenNotToUse: ["Botão isolado com ação única sem dependência de outros controles → button.", "Seleção de opções mutuamente exclusivas com estado ativo ou pressionado → toggle-group.", "Botão principal com variação imediata em menu dividido integrado → split-button."],
    content: ["Cada botão deve ter um texto que descreva claramente sua respectiva ação (ex.: \"Salvar alterações\", \"Cancelar\").", "Mantenha no máximo três ações agrupadas para não sobrecarregar a decisão visual.", "Em pares de formulário, posicione a ação secundária antes e a principal em destaque."],
    accessibility: {
      keyboard: "Tab navega sequencialmente entre os botões na ordem visual. O anel de foco visível ganha relative z-10 para não ser cortado pelos botões vizinhos.",
      screenReader: "O contêiner possui role=\"group\". Se o grupo representar uma barra temática de ações, passe aria-label descritivo no contêiner.",
      focus: "A ordem de navegação acompanha estritamente a sequência visual dos botões, da esquerda para a direita no horizontal ou de cima para baixo no vertical.",
      cautions: "Evite posicionar dois botões com variante default lado a lado no mesmo grupo; diferencie a ação primária da secundária.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-input", "bg-muted"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-2", "px-4", "size-4"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-r-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
    ],
  },
  collapsible: {
    description: "Alterna a visibilidade de uma seção de conteúdo secundário sob demanda. Mantém a página limpa ao esconder blocos opcionais sem a estrutura de um acordeão.",
    whenToUse: "Esconder detalhes complementares ou avançados que a maioria dos usuários não precisa ver de início (\"Ver mais detalhes técnicos\"). Painéis recolhíveis isolados em barras laterais ou cartões de resumo (\"Lista de participantes\"). Alternar visualização de código, registros brutos ou logs extensos sob demanda.",
    anatomy: [
      { part: "Collapsible", description: "Elemento raiz que gerencia o estado aberto ou fechado (Radix Collapsible)" },
      { part: "CollapsibleTrigger", description: "Gatilho clicável que expande ou recolhe o painel associado" },
      { part: "CollapsibleContent", description: "Container com animação de altura que exibe o conteúdo quando aberto" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "data-state=closed no gatilho e conteúdo, com animação animate-collapsible-up ocultando o bloco" },
      { name: "Aberto", description: "data-state=open com animação animate-collapsible-down exibindo o conteúdo" },
      { name: "Foco", description: "O gatilho recebe o anel de foco padrão do elemento que o compõe (ex.: Button)" },
      { name: "Desabilitado", description: "Gatilho inativo quando disabled for verdadeiro" },
    ],
    sizes: [],
    doGuidelines: ["Use asChild em CollapsibleTrigger para compor com Button acessível.", "Indique visualmente a alternância de estado com ícone direcional que gire conforme abertura.", "Mantenha o conteúdo recolhível compacto para evitar deslocamentos visuais bruscos ao expandir."],
    dontGuidelines: ["Ocultar mensagens de erro críticas ou avisos obrigatórios dentro do painel → mostre sempre visível com alert", "Criar lista com várias seções expansíveis coordenadas manualmente → accordion", "Abrir o conteúdo automaticamente sem interação prévia do usuário → deixe fechado por padrão ou use container fixo em card"],
    code: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" size="sm">
      Mostrar histórico de alterações
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
    Última atualização realizada por Maria em 24 de outubro.
  </CollapsibleContent>
</Collapsible>`,
    props: [
      { name: "open · defaultOpen (Collapsible)", type: "boolean", default: "—", description: "Controla se o painel está aberto em modo controlado ou estado inicial" },
      { name: "onOpenChange (Collapsible)", type: "(open: boolean) => void", default: "—", description: "Callback acionado ao alternar entre aberto e fechado" },
      { name: "disabled (Collapsible)", type: "boolean", default: "false", description: "Desativa o gatilho impedindo abrir ou fechar o conteúdo" },
      { name: "asChild (CollapsibleTrigger)", type: "boolean", default: "false", description: "Renderiza no elemento filho via Radix Slot (ex.: com Button)" },
    ],
    meta: {
      nome: "Collapsible",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/collapsible.tsx",
      story: "src/components/ui/collapsible.stories.tsx",
      vizinhos: ["accordion", "sheet"],
    },
    whenToUseItems: ["Esconder detalhes complementares ou avançados que a maioria dos usuários não precisa ver de início (\"Ver mais detalhes técnicos\").", "Painéis recolhíveis isolados em barras laterais ou cartões de resumo (\"Lista de participantes\").", "Alternar visualização de código, registros brutos ou logs extensos sob demanda."],
    whenNotToUse: ["Múltiplas seções empilhadas que expandem e fecham em lista estruturada → accordion", "Conteúdo extenso que exige fluxo ou formulário dedicado fora do fluxo da página → sheet", "Janela modal focada que bloqueia a interação com o restante da tela → dialog"],
    content: ["O gatilho deve usar rótulo claro que indique a ação de expandir: \"Mostrar detalhes\".", "Alterne o rótulo quando apropriado (\"Mostrar detalhes\" / \"Ocultar detalhes\") ou adicione ícone direcional indicativo.", "Não use exclamação nem pontuação final no texto do gatilho."],
    accessibility: {
      keyboard: "O gatilho recebe Tab e alterna a expansão ao pressionar Enter ou Espaço.",
      screenReader: "O gatilho expõe aria-expanded=\"true|false\" e vincula-se ao conteúdo via aria-controls.",
      focus: "O foco permanece no gatilho ao abrir ou fechar; pressionar Tab após abrir move o foco para o primeiro controle interno do painel.",
      cautions: "Não esconda informações essenciais à conclusão da tarefa principal dentro de uma área recolhida; o usuário não deve ser obrigado a abrir o painel para prosseguir (WCAG 1.3.1 e 4.1.2).",
    },
    tokens: [
      { contexto: "Movimento", itens: ["animate-collapsible-down", "animate-collapsible-up"] },
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
    description: "Comunica um estado vazio em listas, tabelas ou telas sem dados. Orienta a pessoa sobre o que deveria estar ali e oferece o próximo passo.",
    whenToUse: "Primeiro uso de uma funcionalidade antes de qualquer item ser criado (\"Nenhum projeto ainda. Crie o primeiro.\"). Busca ou filtro que não retornou nenhum resultado compatível com os critérios pesquisados. Seções limpas após conclusão de tarefas pendentes (caixa de entrada ou lista de pendências zerada).",
    anatomy: [
      { part: "Empty", description: "Container raiz centralizado com borda tracejada e cantos arredondados" },
      { part: "EmptyHeader", description: "Cabeçalho que agrupa mídia visual, título e texto de apoio" },
      { part: "EmptyMedia", description: "Container de ícone ou ilustração nas variantes default ou icon" },
      { part: "EmptyTitle", description: "Título principal do estado vazio; use asChild para cabeçalho semântico" },
      { part: "EmptyDescription", description: "Descrição explicativa sobre o motivo da ausência de dados" },
      { part: "EmptyContent", description: "Área inferior reservada para botões de ação ou links de recuperação" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Ícone ou mídia sem fundo destacado, mantendo aparência sutil" },
      { name: "Icon", value: "icon", description: "Ícone dentro de container delimitado com fundo neutro atenuado" },
    ],
    states: [],
    sizes: [],
    doGuidelines: ["Ofereça sempre uma ação clara ou rota de saída em EmptyContent para evitar que o usuário fique sem alternativa.", "Use asChild em EmptyTitle para definir o nível semântico do cabeçalho.", "Adapte o texto entre busca sem retorno e primeiro uso (onboarding)."],
    dontGuidelines: ["Deixar a área em branco sem orientação ou mensagem explicativa → declare empty com título e botão de ação", "Usar estado vazio para indicar erro de conexão ou falha crítica → apresente um alert", "Exibir estado vazio enquanto os dados ainda estão carregando → mantenha um skeleton"],
    code: `import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon name="search_off" />
    </EmptyMedia>
    <EmptyTitle asChild>
      <h2>Nenhum resultado encontrado</h2>
    </EmptyTitle>
    <EmptyDescription>
      Revise os termos digitados ou remova os filtros aplicados.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" size="sm">
      Limpar filtros
    </Button>
  </EmptyContent>
</Empty>`,
    props: [
      { name: "variant (EmptyMedia)", type: "default · icon", default: "default", description: "Define se o ícone é exibido sem fundo (default) ou em container delimitado (icon)" },
      { name: "asChild (EmptyTitle)", type: "boolean", default: "false", description: "Renderiza no elemento filho via Radix Slot, permitindo usar tag semântica (h2, h3)" },
    ],
    meta: {
      nome: "Empty",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/empty.tsx",
      story: "src/components/ui/empty.stories.tsx",
      vizinhos: ["skeleton", "spinner", "alert"],
    },
    whenToUseItems: ["Primeiro uso de uma funcionalidade antes de qualquer item ser criado (\"Nenhum projeto ainda. Crie o primeiro.\").", "Busca ou filtro que não retornou nenhum resultado compatível com os critérios pesquisados.", "Seções limpas após conclusão de tarefas pendentes (caixa de entrada ou lista de pendências zerada)."],
    whenNotToUse: ["O conteúdo ainda está sendo carregado da rede → skeleton", "Ocorreu um erro no sistema ou falha na requisição → alert", "Espera sem formato conhecido durante processamento → spinner"],
    content: ["Título positivo e objetivo explicando a situação: \"Nenhum documento encontrado\".", "Descrição orientando o que fazer em seguida: \"Tente ajustar os filtros de busca ou crie um novo arquivo.\".", "O botão de ação deve conter verbo direto: \"Limpar filtros\" ou \"Criar documento\"."],
    accessibility: {
      keyboard: "O container não recebe foco. A navegação por Tab atinge diretamente os botões ou links contidos em EmptyContent.",
      screenReader: "Use asChild em EmptyTitle para atribuir heading semântico (h2, h3) correspondente à seção da página.",
      focus: "Nenhum no container raiz. O foco segue a ordem natural do DOM até as ações de recuperação.",
      cautions: "Nunca mostre apenas um ícone sem título e descrição em texto visível; leitor de tela precisa entender o motivo do estado vazio (WCAG 1.3.1 e 4.1.2).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-muted", "text-foreground", "text-muted-foreground", "text-primary"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-lg", "text-sm", "tracking-tight"] },
      { contexto: "Espaço", itens: ["gap-2", "gap-4", "gap-6", "max-w-sm", "mb-2", "min-w-0", "p-12", "p-6", "size-10", "size-6"] },
      { contexto: "Raio", itens: ["rounded-lg"] },
    ],
  },
  field: {
    description: "Estrutura controles de formulário combinando rótulo, descrição, erros e agrupamentos acessíveis. Garante a conexão semântica correta entre as partes do campo.",
    whenToUse: "Estruturar qualquer entrada de formulário (input, select, textarea, switch) associando rótulo, ajuda e erro. Criar grupos lógicos de campos relacionados com FieldSet, FieldLegend e FieldGroup. Montar cartões de seleção interativos (choice cards) para conjuntos de checkbox ou radio-group.",
    anatomy: [
      { part: "FieldSet", description: "Elemento semântico <fieldset> que agrupa campos correlatos" },
      { part: "FieldLegend", description: "Legenda acessível <legend> do agrupamento com variantes legend ou label" },
      { part: "FieldGroup", description: "Container com container query para espaçamento vertical entre campos" },
      { part: "Field", description: "Container raiz de um campo com role=\"group\" e controle de orientação" },
      { part: "FieldContent", description: "Envoltório flexível para o controle de entrada e sua descrição" },
      { part: "FieldLabel", description: "Rótulo do campo construído sobre o atom Label, com suporte a estado desabilitado" },
      { part: "FieldTitle", description: "Título estrutural em destaque para layouts horizontais ou cartões de escolha" },
      { part: "FieldDescription", description: "Texto de apoio e ajuda com cor suave exibido abaixo do controle" },
      { part: "FieldSeparator", description: "Divisor horizontal com suporte a texto centralizado (ex.: \"ou\")" },
      { part: "FieldError", description: "Mensagem de erro acessível com role=\"alert\" e cor de destruição" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Disposição neutra com rótulo em text-foreground e descrição em text-muted-foreground" },
      { name: "Inválido", description: "data-invalid=true no Field aplica cor text-destructive aos textos e exibe FieldError" },
      { name: "Desabilitado", description: "group-data-[disabled=true]/field reduz a opacidade do rótulo e controles para 50%" },
      { name: "Selecionado", description: "Em cartões de escolha, ganha borda destacada e preenchimento sutil em bg-primary/5" },
    ],
    sizes: [],
    doGuidelines: ["Associe o htmlFor do FieldLabel ao id do controle para garantir foco e nome acessível.", "Conecte aria-describedby do controle aos identificadores de FieldDescription e FieldError.", "Utilize orientation=\"responsive\" em formulários que precisam alternar entre empilhado e horizontal conforme largura."],
    dontGuidelines: ["Usar placeholder como substituto do FieldLabel → mantenha o FieldLabel sempre visível", "Exibir mensagem de erro genérica sem instrução de correção → escreva instruções claras em FieldError", "Utilizar apenas a cor vermelha para indicar campo inválido → adicione mensagem em FieldError e ícone no controle"],
    code: `import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field>
  <FieldLabel htmlFor="email">E-mail</FieldLabel>
  <Input id="email" type="email" placeholder="nome@empresa.com.br" />
  <FieldDescription>Utilize seu endereço institucional.</FieldDescription>
  <FieldError>Insira um e-mail válido.</FieldError>
</Field>`,
    props: [
      { name: "variant (FieldLegend)", type: "legend · label", default: "legend", description: "Estilo tipográfico da legenda: texto de seção (legend) ou tamanho de rótulo (label)" },
      { name: "orientation", type: "vertical · horizontal · responsive", default: "vertical", description: "Direção do layout: vertical, horizontal alinhado ou responsivo por container query" },
      { name: "children (FieldSeparator)", type: "React.ReactNode", default: "—", description: "Conteúdo textual opcional exibido no centro do divisor (ex.: \"ou\")" },
      { name: "errors (FieldError)", type: "Array<{ message?: string } | undefined>", default: "—", description: "Lista de erros do formulário (compatível com react-hook-form); agrupa mensagens duplicadas" },
    ],
    meta: {
      nome: "Field",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/field.tsx",
      story: "src/components/ui/field.stories.tsx",
      vizinhos: ["form", "input", "label"],
    },
    whenToUseItems: ["Estruturar qualquer entrada de formulário (input, select, textarea, switch) associando rótulo, ajuda e erro.", "Criar grupos lógicos de campos relacionados com FieldSet, FieldLegend e FieldGroup.", "Montar cartões de seleção interativos (choice cards) para conjuntos de checkbox ou radio-group."],
    whenNotToUse: ["Rótulo de texto simples e isolado sem controle associado → label", "Apenas o elemento de digitação de texto puro sem estrutura de apoio → input", "Gerenciamento completo de submissão, estado e validação de schema → form"],
    content: ["Rótulo substantivo claro, direto e sem dois-pontos: \"Nome completo\".", "Texto de ajuda orientando formato ou restrição antes do preenchimento: \"Digite seu e-mail corporativo.\".", "Mensagem de erro indicando o que ocorreu e como corrigir: \"Informe um e-mail válido.\"."],
    accessibility: {
      keyboard: "O container não retém foco; a tecla Tab navega linearmente entre os controles interativos internos.",
      screenReader: "Field declara role=\"group\"; FieldError expõe role=\"alert\" para anúncio imediato de erros; associe id e htmlFor entre FieldLabel e o controle.",
      focus: "Segue o fluxo natural para o controle interno (Input, Select, Checkbox); em formulários com erro, posicione o foco no primeiro campo inválido.",
      cautions: "Conecte sempre FieldDescription e FieldError ao controle via aria-describedby, e marque aria-invalid=\"true\" no controle quando houver erro (WCAG 1.3.1, 3.3.1 e 3.3.2).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-background", "bg-primary", "border-primary", "text-destructive", "text-muted-foreground", "text-primary"] },
      { contexto: "Tipografia", itens: ["font-medium", "font-normal", "leading-normal", "leading-snug", "text-base", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-1.5", "gap-2", "gap-3", "gap-4", "gap-6", "gap-7", "h-5", "inset-0", "mb-2", "mb-3", "ml-4", "mt-0", "mt-1", "mt-1.5", "mt-px", "my-2", "p-4", "px-2", "top-1"] },
      { contexto: "Raio", itens: ["rounded-md"] },
    ],
  },
  "hover-card": {
    description: "Exibe uma prévia flutuante de informações enriquecidas ao passar o mouse ou focar um link. Permite consultar contexto adicional sem navegar até outra página.",
    whenToUse: "Exibir prévias visuais ricas de perfis de usuário ao passar o mouse sobre @menções ou avatares (\"Biografia, seguidores, status\"). Mostrar resumo de repositórios, artigos ou links externos antes da navegação efetiva. Pré-visualizar detalhes de produtos ou metadados rápidos em tabelas e painéis densos.",
    anatomy: [
      { part: "HoverCard", description: "Elemento raiz que gerencia temporizadores de abertura e fechamento (Radix HoverCard)" },
      { part: "HoverCardTrigger", description: "Elemento gatilho (link ou botão) que dispara o painel no hover ou foco" },
      { part: "HoverCardContent", description: "Painel flutuante renderizado em portal com largura fixa de 256 px (w-64)" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "Painel oculto com transição de saída fade e zoom (zoom-out-95)" },
      { name: "Aberto", description: "data-state=open com animação de entrada fade e zoom (zoom-in-95) após o atraso de hover" },
      { name: "Foco", description: "O gatilho exibe o anel de foco usual; o painel flutuante abre automaticamente no foco do gatilho" },
    ],
    sizes: [],
    doGuidelines: ["Use asChild em HoverCardTrigger envolvendo um link semântico (a ou Link).", "Mantenha o conteúdo estritamente informativo, evitando formulários ou ações complexas dentro do painel.", "Garanta que a mesma informação esteja acessível na página de destino do link para usuários em telas de toque."],
    dontGuidelines: ["Inserir formulários ou múltiplos botões interativos dentro do painel flutuante → utilize popover", "Utilizar HoverCard apenas para exibir rótulo de acessibilidade em ícone → use tooltip", "Depender exclusivamente do hover para exibir informações vitais ao fluxo da página → exiba em card"],
    code: `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/perfil" className="text-sm font-medium underline">
      @rafaelnhaia
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="space-y-1">
    <h4 className="text-sm font-semibold">Rafael Nhaia</h4>
    <p className="text-xs text-muted-foreground">
      Product Designer focado em Design Systems acessíveis.
    </p>
  </HoverCardContent>
</HoverCard>`,
    props: [
      { name: "align (HoverCardContent)", type: "start · center · end", default: "center", description: "Alinhamento horizontal do painel em relação ao elemento gatilho" },
      { name: "sideOffset (HoverCardContent)", type: "number", default: "4", description: "Distância em pixels entre o painel flutuante e o gatilho" },
      { name: "openDelay · closeDelay (HoverCard)", type: "number", default: "700 / 300", description: "Tempo de espera em milissegundos antes de abrir ou fechar o painel (Radix)" },
      { name: "asChild (HoverCardTrigger)", type: "boolean", default: "false", description: "Renderiza no elemento filho via Radix Slot (ex.: com link ou botão)" },
    ],
    meta: {
      nome: "Hover Card",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/hover-card.tsx",
      story: "src/components/ui/hover-card.stories.tsx",
      vizinhos: ["card", "popover", "tooltip"],
    },
    whenToUseItems: ["Exibir prévias visuais ricas de perfis de usuário ao passar o mouse sobre @menções ou avatares (\"Biografia, seguidores, status\").", "Mostrar resumo de repositórios, artigos ou links externos antes da navegação efetiva.", "Pré-visualizar detalhes de produtos ou metadados rápidos em tabelas e painéis densos."],
    whenNotToUse: ["Apenas texto curto de ajuda ou descrição de botão/ícone sem formatação rica → tooltip", "Conteúdo interativo com formulários, botões ou ações que exigem clique para abrir → popover", "Janela que interrompe o fluxo para tomada de decisão ou preenchimento de dados → dialog"],
    content: ["Título ou nome principal em destaque tipográfico: \"Rafael Nhaia\".", "Resumo de apoio com até três linhas de texto: \"Product Designer e Engenheiro de Design.\".", "Metadados secundários com ícones discretos: \"Entrou em outubro de 2024\"."],
    accessibility: {
      keyboard: "O foco abre o painel ao navegar com Tab até o gatilho. O foco permanece no gatilho e não entra no painel flutuante. Pressionar Escape fecha o painel.",
      screenReader: "Como o painel abre no hover e foco sem prender o cursor, evite colocar informações cruciais exclusivas nele; leitores de tela navegam pelo link gatilho.",
      focus: "O foco permanece no gatilho durante toda a exibição; fechar via Escape devolve o estado em repouso.",
      cautions: "O conteúdo flutuante permanece visível enquanto o ponteiro estiver sobre ele e fecha com Escape (WCAG 1.4.13); em dispositivos com toque, forneça navegação direta ou use popover com clique.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-popover", "text-popover-foreground"] },
      { contexto: "Espaço", itens: ["p-4", "w-64"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Sombra", itens: ["shadow-md"] },
    ],
  },
  "input-group": {
    description: "Agrupa um campo de entrada com elementos auxiliares como ícones, botões, atalhos ou textos em uma única borda unificada. Resolve a integração visual de ações diretas no campo, como busca, limpar ou envio.",
    whenToUse: "Campo de busca ou filtro com botão de limpar ou ícone de lupa integrado. Campo de valor monetário ou unidade com prefixo ou sufixo fixo (ex.: R$, kg). Campo de prompt ou mensagem expansível combinando área de texto e botão de ação.",
    anatomy: [
      { part: "InputGroup", description: "Container flexível que unifica a borda, sombra e estado de foco dos elementos filhos" },
      { part: "InputGroupAddon", description: "Área de encaixe para complementos posicionados no início, fim ou acima e abaixo do controle" },
      { part: "InputGroupButton", description: "Botão interno dimensionado e estilizado para encaixar sem quebrar a borda do grupo" },
      { part: "InputGroupText", description: "Rótulo textual estático ou ícone decorativo posicionado como complemento" },
      { part: "InputGroupInput", description: "Campo de entrada de linha única com bordas e anéis de foco zerados" },
      { part: "InputGroupTextarea", description: "Campo multilinhas sem redimensionamento manual e com fundo transparente" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Borda neutra border-input com elevação sutil shadow-xs" },
      { name: "Foco", description: "O container ganha anel ring-[3px] ring-ring e border-ring ao focar o controle interno" },
      { name: "Inválido", description: "Borda de perigo border-destructive e anel suave quando o controle tem aria-invalid=\"true\"" },
      { name: "Desabilitado", description: "Controle interno desabilitado reduz opacidade e bloqueia eventos" },
    ],
    sizes: [
      { name: "xs", value: "xs", description: "24 px — Ação textual compacta em campos de altura reduzida" },
      { name: "sm", value: "sm", description: "32 px — Ação textual padrão acoplada ao campo" },
      { name: "icon-xs", value: "icon-xs", description: "24 px — Botão de ícone compacto para campos densos" },
      { name: "icon-sm", value: "icon-sm", description: "32 px — Botão de ícone padrão para ações como limpar ou alternar senha" },
    ],
    doGuidelines: ["Forneça aria-label acessível no controle de entrada ou conecte a um label externo.", "Utilize InputGroupAddon com alinhamento inline-end para ações contextuais como limpar busca ou copiar código.", "Mantenha complementos textuais curtos para preservar a visibilidade do texto digitado."],
    dontGuidelines: ["Campo isolado sem elementos visuais ou botões anexos → input.", "Múltiplos botões densos ocupando toda a largura do grupo → button-group externo.", "Botão de ícone integrado sem nome acessível → passe aria-label no botão."],
    code: `import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

<InputGroup>
  <InputGroupInput placeholder="Buscar conteúdo..." aria-label="Buscar" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" aria-label="Executar busca">
      <Icon name="search" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    props: [
      { name: "align (InputGroupAddon)", type: "inline-start · inline-end · block-start · block-end", default: "inline-start", description: "Posição do complemento em relação ao controle de entrada" },
      { name: "size (InputGroupButton)", type: "xs · sm · icon-xs · icon-sm", default: "xs", description: "Altura e proporção do botão integrado" },
      { name: "type (InputGroupButton)", type: "—", default: "button", description: "Tipo de acionamento do botão nativo" },
      { name: "variant (InputGroupButton)", type: "—", default: "ghost", description: "Estilo visual herdado do botão" },
    ],
    meta: {
      nome: "Input Group",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/input-group.tsx",
      story: "src/components/ui/input-group.stories.tsx",
      vizinhos: ["input", "textarea", "field"],
    },
    whenToUseItems: ["Campo de busca ou filtro com botão de limpar ou ícone de lupa integrado.", "Campo de valor monetário ou unidade com prefixo ou sufixo fixo (ex.: R$, kg).", "Campo de prompt ou mensagem expansível combinando área de texto e botão de ação."],
    whenNotToUse: ["Entrada textual isolada sem complementos visuais na mesma borda → input.", "Bloco de texto longo sem botões ou ícones internos acoplados → textarea.", "Formulário completo com rótulo, descrição e mensagem de erro externa → field."],
    content: ["Em complementos com texto estático (InputGroupText), use abreviações ou símbolos curtos: R$, kg, @.", "Botões integrados de ícone devem obrigatoriamente possuir aria-label: Limpar busca, Ver senha.", "Mantenha textos de atalhos e prefixos concisos para não reduzir a área útil de digitação."],
    accessibility: {
      keyboard: "O container possui papel semântico group. A tecla Tab move o foco ordenadamente entre o controle de entrada e os botões interativos.",
      screenReader: "Como InputGroupInput e InputGroupTextarea não renderizam rótulo visível próprio, forneça aria-label no controle ou envolva em field.",
      focus: "O anel de foco visível é aplicado ao container raiz quando qualquer controle interno recebe foco (focus-visible).",
      cautions: "Ao usar botões só de ícone no addon, passe aria-label explícito (WCAG 4.1.2) e garanta que addons puramente informativos tenham clique direcionado ao campo de texto.",
    },
    tokens: [
      { contexto: "Cor", itens: ["border-destructive", "border-input", "border-ring", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-1.5", "gap-2", "h-6", "h-8", "h-9", "min-w-0", "p-0", "pb-2.5", "pb-3", "pl-2", "pl-3", "pr-2", "pr-3", "pt-2.5", "pt-3", "px-2", "px-2.5", "px-3", "py-1.5", "py-3", "size-3.5", "size-4", "size-6", "size-8"] },
      { contexto: "Raio", itens: ["rounded-inner", "rounded-md", "rounded-outer-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-ring"] },
    ],
  },
  pagination: {
    description: "Divide listas e conjuntos volumosos de dados em páginas sequenciais numeradas. Facilita o salto direto entre blocos de conteúdo e o controle de avanço e retrocesso.",
    whenToUse: "Tabelas de dados e catálogos com dezenas ou centenas de registros distribuídos em blocos. Resultados de busca onde a posição relativa e o volume total auxiliam na navegação. Páginas de listagem longa onde carregar todos os itens de uma vez degradaria a performance.",
    anatomy: [
      { part: "Pagination", description: "Elemento nav raiz com papel de navegação e rótulo acessível" },
      { part: "PaginationContent", description: "Lista ul flexível que agrupa os itens e controles de paginação" },
      { part: "PaginationItem", description: "Item individual li da lista de navegação" },
      { part: "PaginationLink", description: "Âncora a estilizada como botão que recebe o número da página e o estado ativo" },
      { part: "PaginationPrevious", description: "Botão com ícone de seta para voltar à página anterior" },
      { part: "PaginationNext", description: "Botão com ícone de seta para avançar à próxima página" },
      { part: "PaginationEllipsis", description: "Indicador visual de intervalo contendo reticências para páginas ocultas" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Link inativo com fundo transparente hover:bg-accent e texto padrão" },
      { name: "Ativo", description: "Página atual ganha borda e fundo com aria-current=\"page\" e variante outline" },
      { name: "Hover", description: "Fundo com superfície suave e contraste elevado" },
      { name: "Foco", description: "Anel de foco visível em ring preservado no link pelo buttonVariants" },
      { name: "Desabilitado", description: "Sem suporte nativo a disabled na âncora; remova o link ou omita o href" },
    ],
    sizes: [],
    doGuidelines: ["Mantenha visíveis a primeira página, a última e as páginas adjacentes à página selecionada.", "Marque sempre o link da página atual com a propriedade isActive para fornecer aria-current=\"page\".", "Posicione a paginação de forma consistente abaixo da tabela ou lista de dados."],
    dontGuidelines: ["Renderizar todos os números de páginas em listas muito extensas → use PaginationEllipsis para contrair o intervalo.", "Dividir em páginas coleções curtas com menos de 20 registros → mantenha tudo em uma lista única com list.", "Utilizar paginação numérica para alternar seções temáticas de um documento → use tabs."],
    code: `import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    props: [
      { name: "isActive (PaginationLink)", type: "boolean", default: "—", description: "Indica se o link corresponde à página exibida atualmente" },
      { name: "size (PaginationLink)", type: "—", default: "icon", description: "Escala de dimensão herdada das opções de botão" },
    ],
    meta: {
      nome: "Pagination",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/pagination.tsx",
      story: "src/components/ui/pagination.stories.tsx",
      vizinhos: ["carousel", "tabs", "list"],
    },
    whenToUseItems: ["Tabelas de dados e catálogos com dezenas ou centenas de registros distribuídos em blocos.", "Resultados de busca onde a posição relativa e o volume total auxiliam na navegação.", "Páginas de listagem longa onde carregar todos os itens de uma vez degradaria a performance."],
    whenNotToUse: ["Galeria ou apresentação sequencial com menos de 5 telas ou imagens → carousel.", "Abas para alternar visões ou seções paralelas do mesmo documento → tabs.", "Lista curta com menos de 20 itens onde tudo cabe na mesma tela → list."],
    content: ["Os botões Anterior e Próxima devem conter texto explícito acompanhado do ícone direcional: Anterior, Próxima.", "O indicador de quebra de sequência deve expressar reticências acompanhado de texto auxiliar para leitores de tela: Mais páginas.", "Links numéricos exibem apenas algarismos inteiros sequenciais: 1, 2, 3."],
    accessibility: {
      keyboard: "O componente é estruturado como nav role=\"navigation\" contendo uma lista ul. A tecla Tab percorre os links sequencialmente.",
      screenReader: "A raiz expõe aria-label=\"paginação\". O link ativo recebe aria-current=\"page\". Os botões Anterior e Próxima possuem aria-label descritivo.",
      focus: "Cada link focado exibe o anel de foco visível. Após a troca de página, é recomendável reposicionar o foco programático no início da listagem.",
      cautions: "No PaginationEllipsis, o atributo aria-hidden na tag span oculta todo o elemento para leitores de tela; garanta que a navegação por páginas extremas permaneça acessível (WCAG 1.3.1).",
    },
    tokens: [
      { contexto: "Espaço", itens: ["gap-1", "pl-2.5", "pr-2.5", "px-2.5", "size-9"] },
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
    description: "Fornece uma área de rolagem com barras customizadas e comportamento consistente entre diferentes navegadores e sistemas operacionais. Resolve a contenção de conteúdos extensos dentro de dimensões fixas sem depender de barras nativas discrepantes.",
    whenToUse: "Painéis laterais, menus de navegação ou caixas de diálogo com listas longas de opções. Áreas com altura ou largura fixa onde o conteúdo excede o espaço disponível. Tabelas largas ou visualizações horizontais que necessitam de rolagem lateral suave e estilizada.",
    anatomy: [
      { part: "ScrollArea", description: "Container raiz relativo que encapsula a área visível e o viewport rolável" },
      { part: "Viewport", description: "Elemento interno focável com tabIndex=0 que acomoda os elementos filhos roláveis" },
      { part: "ScrollBar", description: "Trilho da barra de rolagem customizada posicionado de forma vertical ou horizontal" },
      { part: "Polegar", description: "Marcador deslizante arredondado que indica o deslocamento e a proporção" },
      { part: "Canto", description: "Elemento decorativo posicionado na interseção quando ambas as barras estão ativas" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Barra de rolagem discreta com trilho transparente e marcador em bg-border" },
      { name: "Foco", description: "O viewport exibe anel de foco visível ring-[3px] ring-ring ao receber foco por teclado" },
      { name: "Rolagem", description: "Marcador se desloca suavemente acompanhando o toque, roda do mouse ou arrasto" },
    ],
    sizes: [],
    doGuidelines: ["Defina sempre uma altura ou largura máxima finita no container via classes utilitárias.", "Forneça um aria-label significativo para descrever o bloco rolável em navegadores e leitores de tela.", "Utilize ScrollBar com orientação horizontal quando tabelas ou blocos largos excederem o viewport."],
    dontGuidelines: ["Utilizar área de rolagem para conteúdo que não ultrapassa o limite da janela → box.", "Deixar a área rolável sem altura definida resultando em expansão infinita → passe classe de altura fixa como h-64.", "Permitir que o usuário precise redimensionar manualmente os painéis usando apenas rolagem → resizable."],
    code: `import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-48 w-64 rounded-md border p-4" aria-label="Notificações">
  <div className="space-y-4">
    <p className="text-sm">Notificação 1: Arquivo sincronizado com sucesso.</p>
    <p className="text-sm">Notificação 2: Novo comentário recebido.</p>
    <p className="text-sm">Notificação 3: Atualização de segurança disponível.</p>
    <p className="text-sm">Notificação 4: Backup diário concluído.</p>
  </div>
</ScrollArea>`,
    props: [
      { name: "orientation (ScrollBar)", type: "vertical · horizontal", default: "vertical", description: "Direção do trilho e da barra de rolagem customizada" },
    ],
    meta: {
      nome: "Scroll Area",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/scroll-area.tsx",
      story: "src/components/ui/scroll-area.stories.tsx",
      vizinhos: ["box", "list", "resizable"],
    },
    whenToUseItems: ["Painéis laterais, menus de navegação ou caixas de diálogo com listas longas de opções.", "Áreas com altura ou largura fixa onde o conteúdo excede o espaço disponível.", "Tabelas largas ou visualizações horizontais que necessitam de rolagem lateral suave e estilizada."],
    whenNotToUse: ["Rolagem principal da página inteira do navegador → use o fluxo nativo em box.", "Conteúdo pequeno que cabe integralmente na tela sem transbordar → box.", "Divisão de espaço interativa onde o usuário precisa redimensionar as seções vizinhas → resizable."],
    content: ["Não possui texto próprio; o conteúdo rolável interno pode conter qualquer composição de componentes ou tipografia.", "Para melhorar a experiência com leitor de tela, passe aria-label descritivo no container: Lista de notificações, Histórico de compras.", "Garanta que itens internos mantenham espaçamento interno adequado para não colar no marcador de rolagem."],
    accessibility: {
      keyboard: "O viewport interno possui tabIndex=0. Ao receber foco, pode ser rolado diretamente pelas setas direcionais, Page Up, Page Down, Home e End.",
      screenReader: "O viewport expõe papel de região rolável com nome acessível configurado via aria-label (padrão \"Conteúdo rolável\").",
      focus: "O anel de foco ring-[3px] ring-ring é exibido em torno de todo o viewport no estado focus-visible.",
      cautions: "Evite aninhar áreas de rolagem dentro de outras áreas de rolagem sem limites claros para não prender o foco e a rolagem do usuário (WCAG 2.1.2).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-border"] },
      { contexto: "Espaço", itens: ["h-2.5", "p-px", "w-2.5"] },
      { contexto: "Raio", itens: ["rounded-full"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  attachment: {
    description: "Exibe um anexo de arquivo ou mídia com metadados, miniatura, estado de processamento e ações rápidas. Representa arquivos já selecionados ou enviados em formulários e conversas.",
    whenToUse: "Exibição de arquivos vinculados a uma mensagem de chat ou comentário. Lista de documentos anexados em um formulário de solicitação ou sinistro. Pré-visualização de imagem ou PDF com opção de download e exclusão.",
    anatomy: [
      { part: "Attachment", description: "Raiz com data-slot=\"attachment\", agrupa mídia, conteúdo textual e ações em layout flexível." },
      { part: "AttachmentMedia", description: "Contêiner quadrado com data-slot=\"attachment-media\" para exibir ícone do tipo de arquivo ou imagem de pré-visualização." },
      { part: "AttachmentContent", description: "Área de texto com data-slot=\"attachment-content\" contendo título e descrição do arquivo." },
      { part: "AttachmentTitle", description: "Nome do arquivo com data-slot=\"attachment-title\", exibido em negrito médio com truncamento." },
      { part: "AttachmentDescription", description: "Metadados do anexo com data-slot=\"attachment-description\", como tamanho ou mensagem de erro." },
      { part: "AttachmentActions", description: "Contêiner de botões de ação rápida com data-slot=\"attachment-actions\"." },
      { part: "AttachmentAction", description: "Botão de ação pontual com data-slot=\"attachment-action\", padrão variant=\"ghost\" e tamanho icon-xs." },
      { part: "AttachmentTrigger", description: "Gatilho clicável com data-slot=\"attachment-trigger\", cobrindo o cartão para ações primárias." },
      { part: "AttachmentGroup", description: "Contêiner horizontal com data-slot=\"attachment-group\" para rolar múltiplos anexos com rolagem suave." },
    ],
    variants: [
      { name: "Icon", value: "icon", description: "Documentos em geral como relatórios ou planilhas identificados por ícone" },
      { name: "Image", value: "image", description: "Fotos, ilustrações ou mídias visuais com miniatura recortada" },
    ],
    states: [
      { name: "Padrão (done)", description: "Borda sólida com fundo de cartão e miniatura totalmente opaca" },
      { name: "idle", description: "Borda tracejada (border-dashed), indicando arquivo pronto para upload" },
      { name: "uploading / processing", description: "Efeito shimmer animado no título e opacidade reduzida na miniatura" },
      { name: "error", description: "Borda vermelha com border-destructive/30 e texto de erro em text-destructive" },
      { name: "Foco", description: "Anel sutil com focus-within:ring-1 focus-within:ring-ring quando o gatilho recebe foco" },
    ],
    sizes: [
      { name: "default", value: "default", description: "— — Padrão para formulários e telas principais de detalhes" },
      { name: "sm", value: "sm", description: "— — Caixas de comentários e áreas laterais compactas" },
      { name: "xs", value: "xs", description: "— — Linhas densas em tabelas e campos compactos de mensagens" },
    ],
    doGuidelines: ["Mostre a extensão do arquivo e o tamanho formatado para orientar a pessoa usuária.", "Forneça ações claras como pré-visualizar ou remover quando permitido.", "Agrupe múltiplos anexos utilizando AttachmentGroup para manter rolagem horizontal organizada."],
    dontGuidelines: ["Omitir aria-label nos botões de ação rápida com apenas ícone → passe aria-label explícito em AttachmentAction.", "Usar anexo vertical em espaços horizontais estreitos sem altura suficiente → use orientação horizontal.", "Deixar nomes longos quebrarem o layout → mantenha o truncamento padrão do AttachmentTitle."],
    code: `import {
  Attachment,
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
    <AttachmentTitle>documento.pdf</AttachmentTitle>
    <AttachmentDescription>1,2 MB</AttachmentDescription>
  </AttachmentContent>
</Attachment>`,
    props: [
      { name: "size", type: "default · sm · xs", default: "default", description: "Escala do cartão, ajustando preenchimento, tipografia e tamanho da mídia" },
      { name: "orientation", type: "horizontal · vertical", default: "horizontal", description: "Direção do layout dos elementos internos" },
      { name: "state", type: "idle · uploading · processing · error · done", default: "done", description: "Estado de carregamento ou conclusão do arquivo" },
      { name: "variant (AttachmentMedia)", type: "icon · image", default: "icon", description: "Formato da mídia exibida entre ícone de tipo ou miniatura de imagem" },
      { name: "size (AttachmentAction)", type: "icon-xs · icon-sm · icon", default: "icon-xs", description: "Tamanho do botão de ação herdado de Button" },
      { name: "asChild (AttachmentTrigger)", type: "boolean", default: "false", description: "Delega a renderização para o elemento filho" },
    ],
    meta: {
      nome: "Attachment",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/attachment.tsx",
      story: "src/components/ui/attachment.stories.tsx",
      vizinhos: ["file-uploader", "thumbnail", "card"],
    },
    whenToUseItems: ["Exibição de arquivos vinculados a uma mensagem de chat ou comentário.", "Lista de documentos anexados em um formulário de solicitação ou sinistro.", "Pré-visualização de imagem ou PDF com opção de download e exclusão."],
    whenNotToUse: ["Área interativa para selecionar ou soltar arquivos do dispositivo → file-uploader.", "Apenas miniatura visual ou avatar de mídia sem metadados de arquivo → thumbnail.", "Cartão com conteúdo estruturado amplo e múltiplos blocos de texto → card."],
    content: ["O título deve exibir o nome original do arquivo com extensão: \"relatorio-anual.pdf\".", "A descrição deve informar o tamanho em formato legível (\"2,4 MB\") ou o status (\"Enviando...\").", "Em caso de falha, use uma descrição clara do problema: \"Arquivo excede 10 MB\"."],
    accessibility: {
      keyboard: "Ao usar AttachmentTrigger, o cartão inteiro é focável via Tab e ativado com Enter ou Espaço. As ações em AttachmentActions recebem foco individual na sequência.",
      screenReader: "Informar o nome e tamanho do anexo via rótulo acessível no AttachmentTrigger ou descrição ligada via aria-describedby.",
      focus: "O anel de foco focus-within envolve o cartão quando um elemento interno recebe foco.",
      cautions: "Botões em AttachmentAction que usam apenas ícones devem obrigatoriamente incluir aria-label descritivo (ex.: \"Remover anexo\").",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-card", "bg-destructive", "bg-muted", "border-destructive", "text-card-foreground", "text-destructive", "text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "leading-tight", "text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-1.5", "gap-2", "gap-2.5", "gap-3", "inset-0", "min-w-0", "min-w-40", "mt-0.5", "p-1", "p-1.5", "p-2", "px-1", "px-1.5", "px-2", "px-2.5", "py-1", "py-1.5", "py-2", "right-3", "size-3.5", "size-4", "size-6", "top-3", "w-10", "w-24", "w-30", "w-7", "w-8"] },
      { contexto: "Raio", itens: ["rounded-lg", "rounded-md", "rounded-xl"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  accordion: {
    description: "Organiza o conteúdo em seções empilhadas que expandem e recolhem. Permite explorar tópicos sob demanda sem sobrecarregar a rolagem da página.",
    whenToUse: "Perguntas frequentes (FAQ) onde a pessoa busca apenas respostas pontuais. Listas de seções secundárias ou detalhes adicionais em painéis informativos. Divisão de termos extensos de contrato ou apólice em tópicos temáticos.",
    anatomy: [
      { part: "Accordion", description: "Raiz com data-slot=\"accordion\", controla o estado dos itens únicos ou múltiplos via Radix UI." },
      { part: "AccordionItem", description: "Contêiner de uma seção com data-slot=\"accordion-item\", delimitado por borda inferior." },
      { part: "AccordionTrigger", description: "Cabeçalho e botão clicável com data-slot=\"accordion-trigger\", inclui ícone de seta animado." },
      { part: "AccordionContent", description: "Painel expansível com data-slot=\"accordion-content\", animado na abertura e fechamento." },
      { part: "Ícone (interno)", description: "Ícone de seta (keyboard_arrow_down) que gira 180 graus quando o item está aberto." },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Linha com texto text-sm font-medium e seta apontando para baixo" },
      { name: "Hover", description: "Sublinhado no rótulo (hover:underline)" },
      { name: "Foco", description: "Anel de 3 px em ring-ring com outline-none no cabeçalho" },
      { name: "Aberto", description: "Seta rotacionada em 180 graus e conteúdo visível com animação" },
      { name: "Desabilitado", description: "opacity-50 e sem resposta a eventos de ponteiro (disabled:pointer-events-none)" },
    ],
    sizes: [],
    doGuidelines: ["Redija títulos objetivos que permitam localizar o assunto sem expandir o item.", "Use collapsible quando type=\"single\" para permitir que a pessoa feche a seção aberta.", "Agrupe seções por afinidade temática em uma sequência lógica."],
    dontGuidelines: ["Título genérico como \"Mais informações\" → especifique o tema exato da seção como \"Formas de pagamento\".", "Acordeão aninhado dentro de outro acordeão → reorganize o conteúdo com tabs ou páginas dedicadas.", "Lista com mais de dez seções sem filtro ou busca → divida por categorias ou use tabs."],
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible defaultValue="duvida-1">
  <AccordionItem value="duvida-1">
    <AccordionTrigger>Como alterar a forma de pagamento?</AccordionTrigger>
    <AccordionContent>
      Acesse as configurações da conta e selecione Cobrança para cadastrar um novo cartão.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    props: [
      { name: "type (Accordion)", type: "\"single\" \\ | \"multiple\"", default: "—", description: "Define se permite abrir apenas um item por vez ou múltiplos itens" },
      { name: "collapsible (Accordion)", type: "boolean", default: "false", description: "Em type=\"single\", permite fechar o item aberto ao clicar nele de novo" },
      { name: "value (Accordion)", type: "string \\ | string[]", default: "—", description: "Valor controlado do item ou itens abertos" },
      { name: "defaultValue (Accordion)", type: "string \\ | string[]", default: "—", description: "Valor inicial do item ou itens abertos" },
      { name: "value (AccordionItem)", type: "string", default: "—", description: "Identificador obrigatório e exclusivo da seção" },
      { name: "disabled (AccordionItem)", type: "boolean", default: "false", description: "Desabilita a interação com o item" },
    ],
    meta: {
      nome: "Accordion",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/accordion.tsx",
      story: "src/components/ui/accordion.stories.tsx",
      vizinhos: ["collapsible", "tabs", "sheet"],
    },
    whenToUseItems: ["Perguntas frequentes (FAQ) onde a pessoa busca apenas respostas pontuais.", "Listas de seções secundárias ou detalhes adicionais em painéis informativos.", "Divisão de termos extensos de contrato ou apólice em tópicos temáticos."],
    whenNotToUse: ["Seção única que expande ou recolhe sem lista empilhada → collapsible.", "Alternar entre visões exclusivas ocupando o mesmo espaço sem empilhar → tabs.", "Painel complexo com formulário longo ou fluxo de múltiplos passos → sheet."],
    content: ["Título da seção deve ser autoexplicativo e direto, sem depender da leitura prévia da resposta: \"Como solicitar reembolso?\".", "A resposta deve começar pela informação principal antes de detalhar passos ou regras complementares.", "Evite termos vagos no cabeçalho como \"Saiba mais\" ou \"Detalhes\"; descreva o assunto concreto."],
    accessibility: {
      keyboard: "Tab move o foco entre os cabeçalhos (AccordionTrigger). Enter ou Espaço expandem e recolhem o conteúdo correspondente.",
      screenReader: "Cada cabeçalho possui papel de botão e expõe aria-expanded=\"true\" ou \"false\" e aria-controls apontando para o conteúdo.",
      focus: "O anel de foco visível envolve o AccordionTrigger. Ao expandir ou recolher a seção, o foco permanece no próprio cabeçalho.",
      cautions: "Não esconda informações críticas ou obrigatórias (como prazos legais ou preços finais) dentro de itens recolhidos por padrão.",
    },
    tokens: [
      { contexto: "Cor", itens: ["border-ring", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-4", "pb-4", "pt-0", "py-4"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Movimento", itens: ["animate-accordion-down", "animate-accordion-up", "duration-motion-base", "ease-spring"] },
      { contexto: "Foco", itens: ["ring-ring"] },
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
    description: "Agrupa informações e ações sobre o mesmo assunto em uma superfície delimitada. Funciona como unidade visual para organizar painéis, resumos e blocos de conteúdo.",
    whenToUse: "Agrupar informações relacionadas a uma entidade única: perfil de usuário, resumo de pedido ou produto. Exibir métricas e indicadores em painéis de controle e dashboards com título e valor em evidência. Estruturar formulários ou seções configuráveis com cabeçalho, corpo e rodapé de ações.",
    anatomy: [
      { part: "Card", description: "Elemento raiz com borda, cantos arredondados, fundo de cartão e sombra leve" },
      { part: "CardHeader", description: "Cabeçalho em grid que organiza título, descrição e ações de topo" },
      { part: "CardTitle", description: "Título do cartão com tipografia em destaque; use asChild para nível semântico real" },
      { part: "CardDescription", description: "Texto de apoio em cor atenuada abaixo do título" },
      { part: "CardAction", description: "Ação opcional posicionada no canto superior direito do cabeçalho" },
      { part: "CardContent", description: "Corpo principal para acomodar o conteúdo livre do cartão" },
      { part: "CardFooter", description: "Rodapé flexível para ações finais ou metadados complementares" },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Use asChild em CardTitle para escolher a tag de cabeçalho (h2, h3) coerente com a estrutura da página.", "Mantenha uma ação principal clara por cartão, posicionada no rodapé ou no topo.", "Preserve alturas alinhadas entre cartões vizinhos dispostos na mesma linha de uma grade."],
    dontGuidelines: ["Envolver o cartão inteiro em uma tag de link → torne clicável apenas o título via asChild ou adicione um button", "Cartões aninhados dentro de outros cartões sem hierarquia → use seções simples com separator", "Inserir textos longos e exaustivos no corpo do cartão → mostre um resumo curto e leve os detalhes para sheet"],
    code: `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle asChild>
      <h2>Assinatura Pro</h2>
    </CardTitle>
    <CardDescription>Plano anual com renovação automática.</CardDescription>
    <CardAction>
      <Button variant="ghost" size="sm">Editar</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-sm">Acesso a todos os componentes e suporte prioritário.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Gerenciar plano</Button>
  </CardFooter>
</Card>`,
    props: [
      { name: "asChild (CardTitle)", type: "boolean", default: "false", description: "Renderiza o elemento filho via Radix Slot, permitindo usar tags semânticas como h2 ou h3" },
    ],
    meta: {
      nome: "Card",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/card.tsx",
      story: "src/components/ui/card.stories.tsx",
      vizinhos: ["box", "item", "list"],
    },
    whenToUseItems: ["Agrupar informações relacionadas a uma entidade única: perfil de usuário, resumo de pedido ou produto.", "Exibir métricas e indicadores em painéis de controle e dashboards com título e valor em evidência.", "Estruturar formulários ou seções configuráveis com cabeçalho, corpo e rodapé de ações."],
    whenNotToUse: ["Lista de itens repetidos sem container destacado → item", "Bloco estrutural genérico sem borda ou elevação de cartão → box", "Ação única direta sem corpo de conteúdo → button"],
    content: ["Título curto e objetivo com até duas linhas, sem ponto final: \"Resumo financeiro\".", "Descrição com uma ou duas frases explicando o contexto: \"Valores consolidados até o último dia útil.\".", "Ação no rodapé ou no topo com verbo no infinitivo indicando o destino: \"Ver detalhes\"."],
    accessibility: {
      keyboard: "Não recebe foco diretamente. O foco navega naturalmente por Tab entre os controles internos.",
      screenReader: "Use asChild em CardTitle para indicar o nível de heading (h2 ou h3) adequado à página.",
      focus: "Nenhum no elemento raiz. Botões e links internos recebem seu anel de foco individual.",
      cautions: "Não transforme o cartão inteiro em um único link longo com múltiplos blocos de texto; torne apenas o título ou uma ação específica clicável para manter o nome acessível compreensível (WCAG 1.3.1 e 2.4.6).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-card", "text-card-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-heading", "font-semibold", "leading-none", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-2", "gap-6", "pb-6", "pt-6", "px-6", "py-6"] },
      { contexto: "Raio", itens: ["rounded-xl"] },
      { contexto: "Sombra", itens: ["shadow-sm"] },
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
    description: "Área interativa para envio de arquivos por clique ou arrastar e soltar (drag and drop). Atua como zona de captura acessível associada a um campo de arquivo nativo.",
    whenToUse: "Receber anexos de formulários como comprovantes, documentos em PDF ou planilhas. Permitir o upload de fotos e imagens com suporte a múltiplos arquivos. Fornecer uma área ampla de drop com feedback visual imediato ao arrastar arquivos.",
    anatomy: [
      { part: "FileUploader", description: "Elemento raiz label com borda tracejada associado ao input nativo" },
      { part: "Ícone (interno)", description: "Glifo cloud_upload do componente icon no centro da área" },
      { part: "Texto (interno)", description: "Rótulo explicativo com instrução de clique ou arrasto" },
      { part: "Input (interno)", description: "Elemento input type=\"file\" nativo escondido com sr-only" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Borda tracejada border-input com texto muted e cursor de ponteiro" },
      { name: "Arrastando", description: "Borda border-primary e fundo sutil bg-primary/5 com data-dragging" },
      { name: "Foco", description: "Anel de foco externo de 3 px em ring-ring acionado via has-[:focus-visible]" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% com cursor-not-allowed e ponteiro desativado" },
    ],
    sizes: [],
    doGuidelines: ["Informe com clareza os formatos aceitos e o tamanho máximo permitido antes do envio.", "Conecte o callback onFilesSelected para receber os arquivos e exibir o progresso com o componente attachment.", "Disponibilize sempre o clique para abrir o explorador de arquivos, sem depender apenas do arrasto."],
    dontGuidelines: ["Rejeitar arquivos grandes sem fornecer mensagem clara ao usuário → use onFilesRejected com instrução amigável.", "Usar a zona de captura para listar arquivos já enviados → liste os itens enviados com attachment.", "Exibir área de captura com texto em língua estrangeira → forneça a prop label em português."],
    code: `import { FileUploader } from "@/components/ui/file-uploader"

<FileUploader
  accept="image/*,.pdf"
  maxSize={10 * 1024 * 1024}
  label="Arraste seus documentos ou clique para selecionar"
  onFilesSelected={(files) => console.log(files)}
/>`,
    props: [
      { name: "label", type: "string", default: "Arraste um arquivo ou clique para selecionar", description: "Texto visível de instrução dentro da zona de captura" },
      { name: "multiple", type: "boolean", default: "false", description: "Permite selecionar múltiplos arquivos simultaneamente" },
      { name: "disabled", type: "boolean", default: "false", description: "Desabilita a área e bloqueia eventos de clique e arrasto" },
      { name: "accept (FileUploader)", type: "string", default: "—", description: "Extensões ou tipos MIME aceitos (ex.: image/* ou .pdf)" },
      { name: "maxSize (FileUploader)", type: "number", default: "—", description: "Limite máximo em bytes aceito por arquivo" },
      { name: "onFilesSelected (FileUploader)", type: "(files: File[]) => void", default: "—", description: "Callback chamado com os arquivos válidos selecionados" },
      { name: "onFilesRejected (FileUploader)", type: "(files: File[]) => void", default: "—", description: "Callback chamado quando arquivos excedem maxSize" },
    ],
    meta: {
      nome: "File Uploader",
      camada: "atom",
      status: "piloto",
      codigo: "src/components/ui/file-uploader.tsx",
      story: "src/components/ui/file-uploader.stories.tsx",
      vizinhos: ["attachment", "thumbnail", "input"],
    },
    whenToUseItems: ["Receber anexos de formulários como comprovantes, documentos em PDF ou planilhas.", "Permitir o upload de fotos e imagens com suporte a múltiplos arquivos.", "Fornecer uma área ampla de drop com feedback visual imediato ao arrastar arquivos."],
    whenNotToUse: ["Exibir a lista de arquivos já anexados com progresso e botão de remoção → attachment.", "Miniatura visual de imagem enviada com opção de visualização → thumbnail.", "Campo simples de texto ou entrada de URL externa → input."],
    content: ["Indique explicitamente na instrução os formatos suportados e limites de tamanho (ex.: PDF até 10 MB).", "Mantenha o texto da ação claro e direto, informando que é possível tanto clicar quanto arrastar.", "Em caso de arquivo rejeitado por tamanho, mostre uma mensagem de erro explicando o motivo e como corrigir."],
    accessibility: {
      keyboard: "Foco navega com Tab até o input nativo associado. Teclas Enter e Espaço abrem a janela de seleção de arquivos do sistema operacional. O arrastar e soltar funciona como atalho complementar, nunca exclusivo (WCAG 2.5.7).",
      screenReader: "O label anuncia a instrução ao receber foco. O input anuncia tipo de controle e formatos aceitos quando informados via accept.",
      focus: "O anel de foco de 3 px (ring-ring) é projetado no container raiz através do seletor has-[:focus-visible] quando o input interno recebe foco.",
      cautions: "Nunca remova a opção de clique, pois usuários que navegam por teclado ou com dificuldades motoras não utilizam arrastar e soltar (WCAG 2.5.7).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-primary", "border-input", "border-primary", "border-ring", "text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["text-sm"] },
      { contexto: "Espaço", itens: ["gap-2", "p-8"] },
      { contexto: "Raio", itens: ["rounded-xl"] },
      { contexto: "Foco", itens: ["ring-ring"] },
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
    description: "Estrutura cada turno de fala em interfaces conversacionais ou fluxos de chat. Organiza avatar, cabeçalho, corpo da mensagem e rodapé de ações conforme o emissor.",
    whenToUse: "Histórico de mensagens em chats de atendimento ou conversas com assistentes virtuais. Exibição alternada de falas do usuário à direita (end) e respostas do sistema à esquerda (start). Blocos de diálogo que combinam texto, metadados de envio e ações como copiar ou avaliar.",
    anatomy: [
      { part: "MessageGroup", description: "Container vertical que agrupa uma sequência contínua de mensagens com espaçamento padronizado" },
      { part: "Message", description: "Raiz de um turno de mensagem com suporte a alinhamento à esquerda (start) ou à direita (end)" },
      { part: "MessageAvatar", description: "Slot reservado para avatar do emissor, alinhado na base do conteúdo da mensagem" },
      { part: "MessageContent", description: "Bloco vertical central que empilha cabeçalho, corpo do texto e rodapé" },
      { part: "MessageHeader", description: "Linha superior de metadados contendo nome do autor e horário de envio" },
      { part: "MessageFooter", description: "Linha inferior para ações contextuais como copiar, reagir ou avaliar" },
    ],
    variants: [],
    states: [],
    sizes: [],
    doGuidelines: ["Utilize align=\"start\" para mensagens recebidas e align=\"end\" para falas do próprio usuário.", "Inclua MessageAvatar e MessageHeader para que a autoria fique evidente sem ambiguidade.", "Ofereça ações úteis em MessageFooter, como copiar resposta ou solicitar regeneração."],
    dontGuidelines: ["Mensagem de status temporário ou alerta do sistema solto na conversa → marker.", "Notificação rápida com desaparecimento automático após ação → sonner.", "Fingir que respostas de inteligência artificial são emitidas por pessoas reais → identifique o assistente no MessageHeader."],
    code: `import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message"

<Message align="start">
  <MessageAvatar>
    <Avatar>
      <AvatarFallback>IA</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Assistente · 10:32</MessageHeader>
    <p className="rounded-xl bg-muted px-3 py-2 text-sm">
      Os tokens foram aplicados com sucesso.
    </p>
  </MessageContent>
</Message>`,
    props: [
      { name: "align", type: "start · end", default: "start", description: "Alinhamento da mensagem e inversão da ordem visual para o usuário" },
    ],
    meta: {
      nome: "Message",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/message.tsx",
      story: "src/components/ui/message.stories.tsx",
      vizinhos: ["marker", "bubble", "avatar"],
    },
    whenToUseItems: ["Histórico de mensagens em chats de atendimento ou conversas com assistentes virtuais.", "Exibição alternada de falas do usuário à direita (end) e respostas do sistema à esquerda (start).", "Blocos de diálogo que combinam texto, metadados de envio e ações como copiar ou avaliar."],
    whenNotToUse: ["Marcador de status, evento de sistema ou divisor temporal na linha do tempo → marker.", "Notificação flutuante ou aviso temporário disparado pela aplicação → sonner.", "Alerta fixo de erro ou contexto dentro da página ou formulário → alert."],
    content: ["Identifique claramente o autor no cabeçalho com nome ou função: Você, Assistente.", "Acompanhe o horário ou carimbo de data em formato reduzido: 10:32, Ontem.", "Mantenha tom neutro e objetivo nas respostas do sistema, evitando fingir sentimentos humanos.", "Botões de ação no rodapé devem ter rótulos ou nomes acessíveis explícitos: Copiar resposta, Tentar novamente."],
    accessibility: {
      keyboard: "O container da mensagem não recebe foco por ser estrutural. Ações interativas em botões ou links internos recebem Tab normalmente.",
      screenReader: "Utilize lista semântica (ul e li) ao agrupar mensagens. Cada mensagem deve anunciar o autor e a mensagem completa após o término da geração.",
      focus: "Ao enviar ou receber mensagens, mantenha o foco no campo de entrada principal da conversa, sem deslocar o cursor para a nova mensagem.",
      cautions: "Respostas geradas por IA não devem ser anunciadas palavra por palavra pelo leitor de tela para evitar poluição sonora (WCAG 4.1.3).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-muted", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-2", "gap-2.5", "min-w-0", "min-w-8", "px-0", "px-3"] },
      { contexto: "Raio", itens: ["rounded-full"] },
    ],
  },
  bubble: {
    description: "Exibe o texto ou mídia de uma mensagem em formato de balão de conversa. Oferece variantes de destaque, alinhamento direcional para remetente ou destinatário e suporte a reações.",
    whenToUse: "Interfaces de chat e mensagens bidirecionais entre pessoa e atendente ou assistente virtual. Histórico de comentários em formato de linha do tempo conversacional. Respostas curtas e transcrições de comandos de voz em assistentes interativos.",
    anatomy: [
      { part: "BubbleGroup", description: "Contêiner vertical com data-slot=\"bubble-group\" que empilha mensagens com espaçamento padronizado." },
      { part: "Bubble", description: "Elemento delimitador da fala com data-slot=\"bubble\", controlando variante visual, alinhamento e largura máxima de 80%." },
      { part: "BubbleContent", description: "Superfície do balão com data-slot=\"bubble-content\", cantos arredondados, quebra de linha automática e suporte a asChild." },
      { part: "BubbleReactions", description: "Contêiner flutuante com data-slot=\"bubble-reactions\" para exibir emojis ou contador de reações fixados na borda." },
    ],
    variants: [
      { name: "Default", value: "default", description: "Mensagens enviadas pela própria pessoa usuária com fundo primário em destaque" },
      { name: "Secondary", value: "secondary", description: "Mensagens de interlocutores com superfície secundária sólida" },
      { name: "Muted", value: "muted", description: "Mensagens recebidas do interlocutor ou assistente com tom sutil e neutro" },
      { name: "Tinted", value: "tinted", description: "Respostas com leve tonalidade cromática derivada da cor da marca" },
      { name: "Outline", value: "outline", description: "Mensagens neutras com borda sutil sobre fundo limpo" },
      { name: "Ghost", value: "ghost", description: "Conteúdos transparentes sem superfície de fundo destacados no fluxo" },
      { name: "Destructive", value: "destructive", description: "Notificações de falha de envio ou avisos críticos dentro do chat" },
    ],
    states: [
      { name: "Padrão", description: "Superfície opaca com cantos rounded-xl e texto com entrelinha relaxada" },
      { name: "Alinhado ao fim (end)", description: "Balão alinhado à direita com self-end, indicando envio pela pessoa" },
      { name: "Alinhado ao início (start)", description: "Balão alinhado à esquerda, indicando mensagem recebida" },
      { name: "Interativo (botão/link)", description: "Efeito hover com alteração de luminosidade e anel de foco visível ao receber foco" },
      { name: "Com reações", description: "Contêiner em pílula (rounded-full) suspenso na borda com anel protetor (ring-3 ring-card)" },
    ],
    sizes: [],
    doGuidelines: ["Alinhe mensagens enviadas pela pessoa à direita (align=\"end\") e mensagens recebidas à esquerda (align=\"start\").", "Agrupe balões consecutivos do mesmo interlocutor usando BubbleGroup.", "Respeite a largura máxima de 80% para preservar o formato visual característico de conversa."],
    dontGuidelines: ["Ocupar 100% da largura do contêiner em balões de fala comuns → mantenha o limite padrão de largura ou use variant=\"ghost\".", "Mover o foco do teclado para cada nova mensagem recebida → mantenha o foco no campo de entrada de texto.", "Omitir contraste adequado em mensagens coloridas → use as variantes calibradas do Design System."],
    code: `import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble"

<BubbleGroup>
  <Bubble align="start" variant="muted">
    <BubbleContent>Olá! Como posso ajudar você hoje?</BubbleContent>
  </Bubble>
  <Bubble align="end" variant="default">
    <BubbleContent>Gostaria de verificar o status da minha solicitação.</BubbleContent>
  </Bubble>
</BubbleGroup>`,
    props: [
      { name: "variant", type: "default · secondary · muted · tinted · outline · ghost · destructive", default: "default", description: "Estilo visual e hierarquia de cores da superfície do balão" },
      { name: "align", type: "start · end", default: "start", description: "Alinhamento do balão à esquerda (start) ou à direita (end)" },
      { name: "asChild (BubbleContent)", type: "boolean", default: "false", description: "Delega a renderização para o elemento filho (ex.: botão interativo)" },
      { name: "align (BubbleReactions)", type: "start · end", default: "end", description: "Alinhamento horizontal das reações em relação ao balão" },
      { name: "side (BubbleReactions)", type: "top · bottom", default: "bottom", description: "Posição vertical das reações na borda superior ou inferior" },
    ],
    meta: {
      nome: "Bubble",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/bubble.tsx",
      story: "src/components/ui/bubble.stories.tsx",
      vizinhos: ["message", "card", "alert"],
    },
    whenToUseItems: ["Interfaces de chat e mensagens bidirecionais entre pessoa e atendente ou assistente virtual.", "Histórico de comentários em formato de linha do tempo conversacional.", "Respostas curtas e transcrições de comandos de voz em assistentes interativos."],
    whenNotToUse: ["Estrutura completa de conversa com avatar, metadados e barra de ações integradas → message.", "Cartão genérico para agrupamento de dados fora do fluxo de conversa → card.", "Mensagem fixa na página para avisos de sistema ou validação de tela → alert."],
    content: ["Mantenha mensagens concisas e parágrafos curtos para facilitar a leitura rápida na conversa.", "O balão quebra palavras automaticamente quando necessário (wrap-break-word).", "Em mensagens de erro, inclua instruções objetivas sobre como tentar novamente."],
    accessibility: {
      keyboard: "Se o conteúdo do balão for clicável (via botão ou asChild), Tab alcança o elemento e Enter ou Espaço o ativam. As reações interativas também são alcançadas por Tab.",
      screenReader: "Leitores anunciam o texto da mensagem. Em interfaces de chat com atualização em tempo real, novos balões devem ser expostos via região com aria-live=\"polite\" sem interromper a fala atual.",
      focus: "O foco da pessoa usuária não deve ser movido para o balão quando uma nova mensagem é recebida; ele deve permanecer no campo de digitação.",
      cautions: "Garanta contraste adequado entre o texto e a cor de fundo do balão, em especial na variante default e nas cores escuras de tema.",
    },
    tokens: [
      { contexto: "Cor", itens: ["--foreground", "--muted", "--primary", "--secondary", "bg-background", "bg-destructive", "bg-input", "bg-muted", "bg-primary", "bg-secondary", "border-border", "border-ring", "text-destructive", "text-foreground", "text-primary-foreground", "text-secondary-foreground"] },
      { contexto: "Tipografia", itens: ["leading-relaxed", "text-sm"] },
      { contexto: "Espaço", itens: ["bottom-0", "gap-1", "gap-2", "left-3", "min-w-0", "p-0", "px-1.5", "px-3", "py-0.5", "py-2", "right-3", "top-0"] },
      { contexto: "Raio", itens: ["rounded-full", "rounded-xl"] },
      { contexto: "Foco", itens: ["ring-card", "ring-ring"] },
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
