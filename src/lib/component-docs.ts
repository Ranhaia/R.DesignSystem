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
    doGuidelines: ["Passe um aria-label descrevendo a operação em andamento quando \"Carregando\" for vago demais.", "Use dentro de botões ou cartões para sinalizar processamento localizado.", "Prefira cores com contraste suficiente com o fundo sobre o qual o indicador gira."],
    dontGuidelines: ["Deixar o rótulo padrão numa tela com vários spinners ao mesmo tempo → passe aria-label que diferencie cada um (\"Carregando comentários\").", "Usar para tarefas com percentual conhecido de conclusão → progress.", "Usar em páginas inteiras cujo esqueleto estrutural é conhecido → skeleton."],
    code: `import { Spinner } from "@/components/ui/spinner"

<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Spinner aria-label="Carregando dados..." />
  <span>Carregando...</span>
</div>`,
    props: [
      { name: "className", type: "string", default: "—", description: "Classes utilitárias para ajustar tamanho (ex.: size-5) ou cor (ex.: text-primary)" },
      { name: "aria-label", type: "string", default: "\"Carregando\"", description: "Nome acessível anunciado a tecnologias assistivas" },
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
      cautions: "O padrão é aria-label=\"Carregando\", genérico. Quando houver contexto, passe um aria-label que diga o que está em andamento (\"Salvando perfil\"). Se um texto visível ao lado já anuncia o estado, esconda o spinner com aria-hidden=\"true\" para não falar duas vezes.",
    },
    tokens: [
      { contexto: "Espaço", itens: ["size-4"] },
    ],
  },
  stepper: {
    description: "Indicador de progresso sequencial que guia o usuário através de um processo dividido em etapas. Mostra quais passos já foram concluídos, qual está em andamento e quais ainda faltam.",
    whenToUse: "Fluxos lineares divididos em passos sequenciais (ex.: checkout, cadastro em etapas, wizards de configuração). Formulários extensos com dependência lógica entre as fases de preenchimento. Processos de onboarding com progresso claro de 3 a 5 etapas.",
    anatomy: [
      { part: "Stepper", description: "Raiz em lista ordenada que controla o índice da etapa e gera os conectores" },
      { part: "StepperItem", description: "Item de lista que representa uma etapa individual e provê o contexto" },
      { part: "StepperTrigger", description: "Gatilho interativo ou visual que agrupa indicador e título" },
      { part: "StepperIndicator", description: "Círculo que exibe o número da etapa ou ícone de check quando concluída" },
      { part: "StepperTitle", description: "Rótulo textual com o nome da etapa" },
    ],
    variants: [],
    states: [
      { name: "Concluído", description: "Círculo preenchido bg-primary text-primary-foreground com ícone de check e conector colorido" },
      { name: "Atual", description: "Círculo com borda border-primary text-primary e atributo aria-current=\"step\"" },
      { name: "Próximo", description: "Círculo neutro border-border text-muted-foreground com número da etapa" },
      { name: "Foco", description: "Anel focus-visible:ring-ring visível no gatilho interativo" },
    ],
    sizes: [],
    doGuidelines: ["Use de 3 a 5 etapas com títulos claros e objetivos.", "Permita que o usuário volte para etapas já concluídas para revisar informações.", "Use a orientação vertical em telas compactas ou quando os títulos forem longos."],
    dontGuidelines: ["Mais de 5 etapas consecutivas no fluxo → use tabs para agrupar seções.", "Usar stepper para navegação livre e não ordenada → use tabs.", "Pular etapas sem validação ou aviso explícito → stepper."],
    code: `import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

<Stepper value={1} orientation="horizontal">
  <StepperItem>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Dados pessoais</StepperTitle>
    </StepperTrigger>
  </StepperItem>
  <StepperItem>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Endereço</StepperTitle>
    </StepperTrigger>
  </StepperItem>
  <StepperItem>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Confirmação</StepperTitle>
    </StepperTrigger>
  </StepperItem>
</Stepper>`,
    props: [
      { name: "value", type: "number", default: "—", description: "Índice 0-based da etapa atual em andamento" },
      { name: "onValueChange", type: "(step: number) => void", default: "—", description: "Callback de clique que torna os gatilhos botões interativos" },
      { name: "orientation", type: "horizontal · vertical", default: "horizontal", description: "Direção do layout dos passos" },
      { name: "children", type: "React.ReactNode", default: "—", description: "Lista de elementos StepperItem que compõem o fluxo" },
    ],
    meta: {
      nome: "Stepper",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/stepper.tsx",
      story: "src/components/ui/stepper.stories.tsx",
      vizinhos: ["tabs", "progress", "pagination"],
    },
    whenToUseItems: ["Fluxos lineares divididos em passos sequenciais (ex.: checkout, cadastro em etapas, wizards de configuração).", "Formulários extensos com dependência lógica entre as fases de preenchimento.", "Processos de onboarding com progresso claro de 3 a 5 etapas."],
    whenNotToUse: ["Navegação livre entre seções sem ordem obrigatória → tabs.", "Barra contínua de carregamento ou progresso percentual sem etapas discretas → progress.", "Paginação numérica de tabelas ou listagens de dados → pagination."],
    content: ["Títulos curtos no imperativo ou substantivo indicando a fase: \"Dados pessoais\", \"Endereço\", \"Confirmação\".", "Mantenha entre 3 e 5 etapas para evitar fadiga cognitiva.", "Opcionalmente exiba a contagem explícita na tela: \"Etapa 2 de 4\".", "Sem ponto final nos títulos das etapas."],
    accessibility: {
      keyboard: "Quando onValueChange é fornecido, cada StepperTrigger vira um <button> navegável por Tab e acionável por Enter ou Espaço. Sem callback, renderiza como <div> sem foco.",
      screenReader: "Estruturado em <ol> com itens <li>. A etapa ativa recebe aria-current=\"step\". O ícone de check da etapa concluída possui aria-hidden=\"true\".",
      focus: "Anel de foco com 3 px em focus-visible. Ao avançar de etapa programaticamente, recomenda-se deslocar o foco para o título da nova etapa.",
      cautions: "Não peça novamente informações já preenchidas em etapas anteriores (WCAG 3.3.7). Garanta que etapas concluídas permitam retorno se o usuário precisar corrigir dados.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-background", "bg-border", "bg-primary", "border-border", "border-primary", "border-ring", "text-muted-foreground", "text-primary", "text-primary-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1.5", "gap-2", "gap-3", "h-6", "h-px", "ml-4", "mt-4", "size-8", "w-px"] },
      { contexto: "Raio", itens: ["rounded-full", "rounded-md"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  "split-button": {
    description: "Combina uma ação principal direta com um menu suspenso de ações secundárias relacionadas. Permite executar o comando mais frequente com um clique e acessar variações pelo gatilho lateral.",
    whenToUse: "Ação primária frequente que possui alternativas correlatas (ex.: \"Salvar\" como principal e \"Salvar como rascunho\" no menu). Envio ou publicação de dados com opções adicionais de agendamento ou exportação. Otimização de espaço na interface unificando comandos relacionados em uma peça única.",
    anatomy: [
      { part: "SplitButton", description: "Raiz que agrupa o botão de ação principal e o gatilho com menu suspenso" },
      { part: "Botão principal (interno)", description: "Botão que executa a ação prioritária imediata via clique" },
      { part: "Gatilho do menu (interno)", description: "Botão compacto só com ícone que abre o menu suspenso" },
      { part: "Menu suspenso (interno)", description: "Painel flutuante que renderiza as ações secundárias" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Botão principal e gatilho unidos com cantos externos arredondados" },
      { name: "Hover", description: "Destaque individual sobre o botão principal ou sobre o gatilho" },
      { name: "Pressionado", description: "Feedback tátil no botão acionado" },
      { name: "Foco", description: "Anel de foco visível na peça que está com foco no teclado" },
      { name: "Desabilitado", description: "Ambos os botões com opacidade reduzida e cliques bloqueados" },
    ],
    sizes: [],
    doGuidelines: ["Use para ações que possuem uma escolha padrão predominante acompanhada de alternativas.", "Forneça um triggerLabel contextual que explique quais opções adicionais o menu oferece.", "Mantenha a mesma variante visual entre a ação primária e as opções secundárias."],
    dontGuidelines: ["Opções com pesos iguais sem uma preferencial → button-group.", "Lista longa de opções sem ação padrão direta → dropdown-menu.", "Omitir o triggerLabel deixando o gatilho com rótulo genérico → passe triggerLabel contextualizado em split-button."],
    code: `import { SplitButton } from "@/components/ui/split-button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

<SplitButton
  label="Salvar"
  onClick={() => {}}
  triggerLabel="Mais opções de salvamento"
>
  <DropdownMenuItem onClick={() => {}}>
    <Icon name="draft" />
    <span>Salvar como rascunho</span>
  </DropdownMenuItem>
  <DropdownMenuItem onClick={() => {}}>
    <Icon name="logout" />
    <span>Salvar e sair</span>
  </DropdownMenuItem>
</SplitButton>`,
    props: [
      { name: "label", type: "React.ReactNode", default: "—", description: "Rótulo de texto da ação principal" },
      { name: "icon", type: "React.ReactNode", default: "—", description: "Ícone opcional no botão principal" },
      { name: "onClick", type: "() => void", default: "—", description: "Callback de clique da ação principal" },
      { name: "variant", type: "default · secondary · outline · ghost · destructive · link", default: "default", description: "Estilo visual aplicado a ambas as peças" },
      { name: "size", type: "default · sm · lg", default: "default", description: "Tamanho do botão principal" },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o botão principal e o gatilho" },
      { name: "triggerLabel", type: "string", default: "Mais ações", description: "Nome acessível do gatilho do menu" },
      { name: "align", type: "start · center · end", default: "end", description: "Alinhamento do menu suspenso" },
    ],
    meta: {
      nome: "Split Button",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/split-button.tsx",
      story: "src/components/ui/split-button.stories.tsx",
      vizinhos: ["button", "button-group", "dropdown-menu"],
    },
    whenToUseItems: ["Ação primária frequente que possui alternativas correlatas (ex.: \"Salvar\" como principal e \"Salvar como rascunho\" no menu).", "Envio ou publicação de dados com opções adicionais de agendamento ou exportação.", "Otimização de espaço na interface unificando comandos relacionados em uma peça única."],
    whenNotToUse: ["Ações independentes sem relação hierárquica clara de prioridade → button-group.", "Ação simples e isolada sem variações → button.", "Apenas uma lista de comandos sem nenhuma ação direta primária → dropdown-menu."],
    content: ["Rótulo do botão principal inicia com verbo no infinitivo ou imperativo: \"Salvar\", \"Publicar\" ou \"Enviar\".", "Itens do menu secundário detalham as variações: \"Salvar como rascunho\", \"Salvar e fechar\".", "Prop triggerLabel deve ser descritiva para tecnologias assistivas: \"Mais opções de salvamento\".", "Sem ponto final em rótulos e itens de menu."],
    accessibility: {
      keyboard: "O botão principal e o gatilho recebem foco sequencial via Tab. Enter ou Espaço acionam o botão principal ou abrem o menu no gatilho. As setas Cima/Baixo navegam pelos itens do menu e Esc o fecha.",
      screenReader: "Dois botões distintos dentro de um grupo. O botão principal anuncia o texto de label; o gatilho anuncia triggerLabel com estado expandido/recolhido gerenciado pelo Radix.",
      focus: "O foco do teclado pousa independentemente na ação principal ou no gatilho. Ao fechar o menu com Esc, o foco retorna ao gatilho.",
      cautions: "O gatilho do menu é só ícone e exige nome acessível claro. Forneça sempre triggerLabel contextualizado (ex.: \"Mais opções de envio\") para evitar rótulos genéricos.",
    },
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
    description: "Campo com painel suspenso para seleção de horário (hora e minuto). Suporta formato de 24 horas ou 12 horas com AM/PM e intervalos customizáveis de minutos.",
    whenToUse: "Definição de horários de agendamentos, reuniões, eventos ou alarmes. Campos de formulário que exigem precisão de hora e minuto sem ambiguidade. Configuração de janelas de atendimento ou horários de funcionamento.",
    anatomy: [
      { part: "TimePicker", description: "Composição que agrupa botão disparador com ícone e painel suspenso com seletores" },
      { part: "Botão disparador (interno)", description: "Botão que exibe o ícone e o horário selecionado" },
      { part: "Painel flutuante (interno)", description: "Container que alinha os seletores de hora, minuto e período" },
      { part: "Seletor de Hora (interno)", description: "Menu de seleção de horas de 00 a 23 ou 1 a 12" },
      { part: "Seletor de Minuto (interno)", description: "Menu de seleção de minutos em intervalos do minuteStep" },
      { part: "Seletor de Período (interno)", description: "Menu condicional AM/PM exibido no formato 12h" },
    ],
    variants: [],
    states: [
      { name: "Vazio", description: "Disparador exibe o texto de placeholder com cor text-muted-foreground" },
      { name: "Preenchido", description: "Disparador exibe o horário formatado (ex.: \"14:30\" ou \"02:30 PM\")" },
      { name: "Aberto", description: "Painel flutuante aberto exibindo os seletores de hora e minuto" },
      { name: "Desabilitado", description: "Disparador com opacidade reduzida e interação bloqueada" },
    ],
    sizes: [],
    doGuidelines: ["Use format=\"24h\" como padrão para o contexto brasileiro.", "Defina minuteStep adequado à tolerância do agendamento (ex.: 15 ou 30 minutos).", "Mantenha value sempre no formato canônico 24h no estado do formulário."],
    dontGuidelines: ["Usar para seleção de datas completas → calendar.", "Valores livres que aceitam segundos ou texto arbitrário → input.", "Omitir o rótulo descritivo externo associado ao campo → use field."],
    code: `import { TimePicker } from "@/components/ui/time-picker"

<TimePicker
  value="14:30"
  onValueChange={() => {}}
  placeholder="Selecione um horário"
/>`,
    props: [
      { name: "value", type: "string", default: "—", description: "Horário controlado no formato \"HH:mm\" em 24h" },
      { name: "onValueChange", type: "(value: string) => void", default: "—", description: "Callback chamado ao alterar hora ou minuto" },
      { name: "format", type: "24h · 12h", default: "24h", description: "Formato visual de exibição e seleção" },
      { name: "minuteStep", type: "number", default: "5", description: "Intervalo em minutos entre as opções" },
      { name: "placeholder", type: "string", default: "Selecione um horário", description: "Texto exibido no gatilho quando vazio" },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa o disparador e os seletores internos" },
      { name: "contentClassName", type: "string", default: "—", description: "Classes adicionais do painel flutuante" },
    ],
    meta: {
      nome: "TimePicker",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/time-picker.tsx",
      story: "src/components/ui/time-picker.stories.tsx",
      vizinhos: ["calendar", "popover", "select"],
    },
    whenToUseItems: ["Definição de horários de agendamentos, reuniões, eventos ou alarmes.", "Campos de formulário que exigem precisão de hora e minuto sem ambiguidade.", "Configuração de janelas de atendimento ou horários de funcionamento."],
    whenNotToUse: ["Seleção de dia, mês ou ano em datas completas → calendar.", "Escolha de uma opção textual simples pré-definida → select.", "Painel flutuante genérico para qualquer outro tipo de conteúdo → popover."],
    content: ["Texto de placeholder claro: \"Selecione um horário\" ou \"Horário de início\".", "O valor armazenado em value deve estar sempre em formato 24h (\"HH:mm\").", "No formato 12h, os períodos são grafados em caixa alta: \"AM\" e \"PM\".", "Sem ponto final em rótulos ou valores selecionados."],
    accessibility: {
      keyboard: "O botão disparador abre o painel com Enter ou Espaço. Dentro do painel, cada Select navega por Tab e as setas Cima/Baixo percorrem os números. Esc fecha o menu ou o popover.",
      screenReader: "O disparador anuncia o horário ou placeholder. Cada campo de seleção possui aria-label próprio (\"Hora\", \"Minuto\", \"Período\").",
      focus: "Ao fechar o painel por Esc ou clique fora, o foco retorna automaticamente para o botão disparador.",
      cautions: "O painel não fecha sozinho a cada seleção de hora ou minuto para permitir a configuração completa. Forneça rótulo de campo via field para associar o disparador.",
    },
    tokens: [
      { contexto: "Cor", itens: ["text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-normal", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-2", "p-3", "w-17", "w-18", "w-40"] },
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
    description: "Campo de seleção em árvore que permite escolher itens estruturados em hierarquia dentro de um painel flutuante. Suporta seleção única, múltipla independente ou em cascata com caixas de marcação.",
    whenToUse: "Estruturas hierárquicas onde as opções possuem relação pai e filho, como categorias, departamentos ou ramos de seguro. Seleção com marcação em cascata (checkable), onde marcar uma categoria pai marca automaticamente todas as suas subcategorias. Filtro de opções multinível que necessita de busca integrada e contador de itens selecionados.",
    anatomy: [
      { part: "TreeSelect", description: "Componente principal que engloba o campo gatilho e o painel flutuante com a árvore de nós" },
      { part: "TreeSelectSkeleton", description: "Placeholder de carregamento que simula as dimensões e o formato do campo" },
      { part: "Gatilho", description: "Botão com papel combobox que exibe o placeholder, o valor único ou as tags dos itens marcados" },
      { part: "Painel", description: "Área flutuante PopoverContent contendo a busca, a árvore de opções e o rodapé de ações" },
    ],
    variants: [],
    states: [
      { name: "Vazio", description: "Gatilho exibe o texto de placeholder com text-muted-foreground" },
      { name: "Selecionado", description: "Gatilho exibe o rótulo do item ou chips compactos com botão de remoção" },
      { name: "Aberto", description: "Painel flutuante exibe a árvore de nós com foco virtual via aria-activedescendant" },
      { name: "Indeterminado", description: "Caixa de marcação exibe traço horizontal quando o nó pai possui apenas parte dos filhos selecionados" },
      { name: "Nó desabilitado", description: "Opacidade reduzida em 50% e nó bloqueado para seleção ou cascata" },
      { name: "Desabilitado", description: "Campo inteiro inativo com opacity-50 e sem abertura do painel" },
    ],
    sizes: [],
    doGuidelines: ["Limite a profundidade da árvore a no máximo 3 níveis para evitar sobrecarga cognitiva.", "Use checkable quando marcar uma categoria pai deva abranger todos os seus itens filhos.", "Ative showSearch para auxiliar a localização rápida em árvores com muitas opções."],
    dontGuidelines: ["Usar árvore para listas de opções simples e sem nenhuma hierarquia → select ou list.", "Empregar para seleção múltipla plana sem relação entre categorias → multi-select.", "Forçar navegação em árvore dentro de formulários densos sem fornecer busca → ative showSearch."],
    code: `import * as React from "react"
import { TreeSelect } from "@/components/ui/tree-select"

const categorias = [
  {
    value: "seguros",
    label: "Seguros",
    children: [
      { value: "auto", label: "Automóvel" },
      { value: "vida", label: "Vida" },
    ],
  },
]

export function ExemploTreeSelect() {
  const [selecao, setSelecao] = React.useState<string[]>(["auto"])

  return (
    <TreeSelect
      checkable
      treeData={categorias}
      value={selecao}
      onValueChange={setSelecao}
      aria-label="Ramos de seguro"
    />
  )
}`,
    props: [
      { name: "treeData", type: "TreeSelectNode[]", default: "—", description: "Estrutura hierárquica de nós com label, value e children" },
      { name: "value", type: "string | null · string[]", default: "—", description: "Valor ou lista de valores selecionados" },
      { name: "onValueChange", type: "(value: any) => void", default: "—", description: "Função disparada ao alterar a seleção" },
      { name: "checkable", type: "boolean", default: "false", description: "Habilita caixas de marcação com cascata entre pais e filhos" },
      { name: "multiple", type: "boolean", default: "false", description: "Permite selecionar múltiplos nós de forma independente" },
      { name: "showCheckedStrategy", type: "child · parent · all", default: "child", description: "Define se exibe no campo apenas as folhas, os pais ou ambos" },
      { name: "defaultExpandAll", type: "boolean", default: "false", description: "Inicia o componente com todos os ramos expandidos" },
      { name: "showSearch", type: "boolean", default: "true", description: "Exibe campo de busca rápida no topo do painel" },
      { name: "allowClear", type: "boolean", default: "false", description: "Exibe botão para limpar toda a seleção atual" },
      { name: "maxTagCount", type: "number", default: "—", description: "Limite máximo de tags visíveis antes de agrupar em contador" },
    ],
    meta: {
      nome: "TreeSelect",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/tree-select.tsx",
      story: "src/components/ui/tree-select.stories.tsx",
      vizinhos: ["select", "multi-select", "combobox", "list"],
    },
    whenToUseItems: ["Estruturas hierárquicas onde as opções possuem relação pai e filho, como categorias, departamentos ou ramos de seguro.", "Seleção com marcação em cascata (checkable), onde marcar uma categoria pai marca automaticamente todas as suas subcategorias.", "Filtro de opções multinível que necessita de busca integrada e contador de itens selecionados."],
    whenNotToUse: ["Lista plana e simples de opções com seleção única → select.", "Lista plana com seleção de múltiplos valores sem hierarquia → multi-select.", "Lista de opções planas muito longa com busca e digitação direta no campo → combobox."],
    content: ["Rótulos dos nós curtos e objetivos que caibam em uma linha: \"Patrimonial\", \"Residencial\".", "Mantenha hierarquia visual clara limitada a no máximo 3 níveis de profundidade.", "Use placeholders explicativos no campo e na busca: \"Selecione o ramo...\", \"Buscar opções...\"."],
    accessibility: {
      keyboard: "Tab foca o gatilho; Espaço ou Enter abre o painel. Dentro da árvore, setas Cima e Baixo navegam entre os nós visíveis. Seta Direita expande o nó pai e Seta Esquerda recolhe. Espaço marca/desmarca o item. Escape fecha o painel e devolve o foco ao gatilho.",
      screenReader: "Gatilho possui role=\"combobox\" com aria-expanded e aria-haspopup=\"tree\". A lista possui role=\"tree\" e os nós possuem role=\"treeitem\", aria-level indicando profundidade e aria-selected ou aria-checked para status.",
      focus: "O foco visual permanece no contêiner da árvore e se move virtualmente entre nós usando aria-activedescendant. Ao fechar, o foco retorna ao gatilho.",
      cautions: "Passe sempre aria-label quando não houver label visível associado ao campo (WCAG 4.1.2). Mantenha contraste adequado nos ícones de expansão e nas caixas de marcação indeterminadas.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-input", "bg-muted", "border-border", "border-input", "border-ring", "text-accent-foreground", "text-foreground", "text-muted-foreground", "text-primary"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-0.5", "gap-1", "gap-1.5", "gap-2", "h-5.5", "h-9", "max-h-72", "max-w-115", "max-w-32.5", "min-h-9", "min-w-0", "min-w-75", "p-0", "p-1", "pl-1.5", "pr-0.5", "pr-2", "px-1.5", "px-2.5", "px-3", "py-1", "py-1.5", "py-2", "py-4", "size-4", "size-5", "w-64"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm"] },
      { contexto: "Sombra", itens: ["shadow-md", "shadow-xs"] },
      { contexto: "Movimento", itens: ["duration-motion-base", "duration-motion-fast"] },
      { contexto: "Foco", itens: ["outline-ring", "ring-ring"] },
    ],
  },
  "multi-select": {
    description: "Campo de seleção múltipla com autocompletar que exibe cada escolha como um chip removível no próprio container.",
    whenToUse: "Selecionar múltiplas opções de uma lista pré-definida com visualização e remoção imediata via chips. Filtros avançados com busca textual onde cada critério selecionado precisa ser removido de forma independente. Formulários com listas longas de opções que demandam filtragem rápida por digitação.",
    anatomy: [
      { part: "MultiSelect", description: "Campo completo de seleção múltipla com suporte a busca e chips" },
      { part: "MultiSelectSkeleton", description: "Placeholder animado de carregamento enquanto as opções são carregadas" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Campo com borda neutra exibindo o placeholder ou os chips selecionados" },
      { name: "Foco", description: "Anel de foco visível ao redor do container enquanto o cursor de busca estiver ativo" },
      { name: "Aberto", description: "Painel suspenso visível ancorado ao container com lista de itens filtrados" },
      { name: "Desabilitado", description: "Container opaco com disabled desativando cliques, busca e remoção de chips" },
      { name: "Vazio", description: "Mensagem de emptyText exibida no painel quando nenhum item corresponde à busca" },
    ],
    sizes: [],
    doGuidelines: ["Passe sempre aria-label quando utilizar o MultiSelect sem um Label visível associado.", "Mantenha o estado value controlado sincronizado com as opções em onValueChange.", "Forneça textos informativos em emptyText para guiar a pessoa quando a busca não retornar itens."],
    dontGuidelines: ["Usar multi-select para escolher apenas um valor exclusivo → combobox.", "Usar multi-select para poucas opções binárias que cabem na tela → checkbox.", "Utilizar placeholder como único substituto de rótulo acessível → passe aria-label ou use label."],
    code: `import * as React from "react"
import { MultiSelect } from "@/components/ui/multi-select"

function Exemplo() {
  const [valores, setValores] = React.useState<string[]>(["auto", "vida"])

  const opcoes = [
    { value: "auto", label: "Automóvel" },
    { value: "residencial", label: "Residencial" },
    { value: "vida", label: "Vida" },
  ]

  return (
    <MultiSelect
      options={opcoes}
      value={valores}
      onValueChange={setValores}
      placeholder="Selecione as modalidades..."
      aria-label="Modalidades de seguro"
    />
  )
}`,
    props: [
      { name: "options", type: "MultiSelectOption[]", default: "—", description: "Lista de opções disponíveis com valor e rótulo" },
      { name: "value", type: "string[]", default: "—", description: "Valores atualmente selecionados em array controlado" },
      { name: "onValueChange", type: "function", default: "—", description: "Disparado ao adicionar ou remover seleções" },
      { name: "placeholder", type: "string", default: "Selecione...", description: "Texto de apoio exibido quando não há chips selecionados" },
      { name: "emptyText", type: "string", default: "Nenhum resultado encontrado.", description: "Mensagem apresentada quando a busca não encontra correspondências" },
      { name: "disabled", type: "boolean", default: "false", description: "Desativa interação com o campo de busca e os chips" },
      { name: "aria-label", type: "string", default: "—", description: "Nome acessível para leitores de tela quando não houver rótulo visível" },
    ],
    meta: {
      nome: "MultiSelect",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/multi-select.tsx",
      story: "src/components/ui/multi-select.stories.tsx",
      vizinhos: ["combobox", "select", "checkbox"],
    },
    whenToUseItems: ["Selecionar múltiplas opções de uma lista pré-definida com visualização e remoção imediata via chips.", "Filtros avançados com busca textual onde cada critério selecionado precisa ser removido de forma independente.", "Formulários com listas longas de opções que demandam filtragem rápida por digitação."],
    whenNotToUse: ["Selecionar apenas uma opção em lista longa com autocompletar → combobox.", "Seleção única entre 5 ou mais opções sem necessidade de busca → select.", "Poucas opções independentes que cabem visíveis diretamente na tela → checkbox."],
    content: ["Rótulos das opções devem ser concisos, substantivos e sem ponto final.", "O placeholder orienta a ação esperada quando nenhum valor foi escolhido (ex.: \"Selecione as modalidades...\").", "Defina mensagens de emptyText claras e instrutivas para orientar nova digitação."],
    accessibility: {
      keyboard: "Digitação filtra opções; setas cima e baixo percorrem a lista; Enter seleciona ou desmarca o item em destaque; Backspace com campo vazio remove o último chip selecionado.",
      screenReader: "Baseado no Combobox do Base UI com suporte a seleção múltipla; chips anunciam seus rótulos com botão de remoção; passe aria-label caso não haja rótulo visível.",
      focus: "O foco permanece no campo de texto de busca; abrir e fechar a lista não perde o controle do cursor de digitação.",
      cautions: "Passe sempre aria-label ou associe um <label> via id para garantir que tecnologias assistivas anunciem o propósito do campo de seleção.",
    },
    tokens: [
      { contexto: "Espaço", itens: ["h-9", "min-w-56", "w-56"] },
      { contexto: "Raio", itens: ["rounded-md"] },
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
      { part: "Breadcrumb", description: "Elemento raiz <nav> com aria-label=\"Trilha de navegação\" e data-slot=\"breadcrumb\"." },
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
      screenReader: "O contêiner <nav> possui aria-label=\"Trilha de navegação\" (passe aria-label para outro nome) e a página atual é identificada via aria-current=\"page\" e aria-disabled=\"true\".",
      focus: "O anel de foco visível destaca o item focado durante a navegação por teclado.",
      cautions: "Os separadores possuem aria-hidden=\"true\" para não poluir a leitura de tela. O BreadcrumbEllipsis traz o texto sr-only \"Mais níveis\", mas o próprio elemento é aria-hidden=\"true\": o leitor de tela não o lê. Quando as reticências abrem um menu, dê o nome ao gatilho (aria-label=\"Abrir menu\", como nos exemplos).",
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
    description: "Combina um campo de entrada de texto com menu suspenso de sugestões filtradas sob demanda, suportando seleção única ou múltipla por chips.",
    whenToUse: "Seleção em listas longas com mais de 15 opções que necessitam de filtro por digitação (países, cidades, cargos). Seleção múltipla de itens exibidos como etiquetas removíveis com campo de busca integrado.",
    anatomy: [
      { part: "ComboboxValue", description: "Exibe o valor textual da opção selecionada" },
      { part: "ComboboxTrigger", description: "Botão com ícone de seta para abrir e fechar a lista flutuante" },
      { part: "ComboboxClear", description: "Botão interno para limpar o valor selecionado" },
      { part: "ComboboxInput", description: "Campo de busca baseado em InputGroup com gatilho e botão de limpar embutidos" },
      { part: "ComboboxContent", description: "Painel flutuante em portal com posicionamento e animação de entrada" },
      { part: "ComboboxList", description: "Container com rolagem vertical para as opções" },
      { part: "ComboboxItem", description: "Item individual selecionável com indicador de marcação" },
      { part: "ComboboxGroup", description: "Agrupador visual de itens relacionados" },
      { part: "ComboboxLabel", description: "Rótulo descritivo do grupo de opções" },
      { part: "ComboboxCollection", description: "Provedor de dados para coleções dinâmicas de itens" },
      { part: "ComboboxEmpty", description: "Mensagem apresentada quando a busca não retorna resultados" },
      { part: "ComboboxSeparator", description: "Linha divisória horizontal entre grupos" },
      { part: "ComboboxChips", description: "Container flexível para modo de seleção múltipla com chips" },
      { part: "ComboboxChip", description: "Etiqueta individual de seleção com botão de remoção" },
      { part: "ComboboxChipsInput", description: "Campo de entrada de texto dentro do container de chips" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Campo de entrada com borda border-input e ícone de seta" },
      { name: "Foco / Aberto", description: "Anel de foco ring-[3px] ring-ring e painel flutuante bg-popover visível com sombra shadow-md" },
      { name: "Item em destaque", description: "Fundo bg-accent e texto text-accent-foreground navegável por setas" },
      { name: "Selecionado", description: "Ícone de marcação (check) visível à direita do item" },
      { name: "Vazio", description: "Mensagem do ComboboxEmpty centralizada quando a busca não encontra opções" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% e eventos de ponteiro desativados" },
    ],
    sizes: [],
    doGuidelines: ["Comece a filtrar as opções a partir do primeiro caractere digitado.", "Ofereça mensagem amigável no ComboboxEmpty orientando a conferir a grafia quando nada for encontrado.", "Permita limpar a busca rapidamente usando showClear ou tecla Escape."],
    dontGuidelines: ["Listas curtas com menos de 7 opções → select.", "Limpar o texto que a pessoa digitou acidentalmente ao fechar o painel → preserve o estado até a escolha.", "Omitir o botão de remoção nos chips em modo múltiplo → use showRemove={true}."],
    code: `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const cidades = ["Belo Horizonte", "Curitiba", "Porto Alegre", "São Paulo"]

export function ExemploCombobox() {
  return (
    <Combobox items={cidades}>
      <ComboboxInput placeholder="Buscar cidade..." />
      <ComboboxContent>
        <ComboboxEmpty>Nenhuma cidade encontrada.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`,
    props: [
      { name: "items (Combobox)", type: "T[]", default: "—", description: "Lista de itens e valores disponíveis para seleção" },
      { name: "value · onValueChange (Combobox)", type: "T · T[]", default: "—", description: "Valor selecionado no modo controlado" },
      { name: "multiple (Combobox)", type: "boolean", default: "false", description: "Habilita seleção múltipla em conjunto com ComboboxChips" },
      { name: "showTrigger (ComboboxInput)", type: "boolean", default: "true", description: "Exibe o botão com ícone de seta na extremidade direita do campo" },
      { name: "showClear (ComboboxInput)", type: "boolean", default: "false", description: "Exibe o botão de limpar quando há valor preenchido" },
      { name: "disabled (ComboboxInput)", type: "boolean", default: "false", description: "Desativa o campo de entrada e os botões anexados" },
      { name: "side (ComboboxContent)", type: "top · right · bottom · left", default: "bottom", description: "Lado preferencial de abertura do painel flutuante" },
      { name: "sideOffset (ComboboxContent)", type: "number", default: "6", description: "Distância em pixels entre o campo e o painel flutuante" },
      { name: "align (ComboboxContent)", type: "start · center · end", default: "start", description: "Alinhamento do painel em relação ao campo" },
      { name: "alignOffset (ComboboxContent)", type: "number", default: "0", description: "Deslocamento em pixels no alinhamento" },
      { name: "showRemove (ComboboxChip)", type: "boolean", default: "true", description: "Exibe o botão com ícone de fechar para remover o chip" },
    ],
    meta: {
      nome: "Combobox",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/combobox.tsx",
      story: "src/components/ui/combobox.stories.tsx",
      vizinhos: ["select", "multi-select", "command"],
    },
    whenToUseItems: ["Seleção em listas longas com mais de 15 opções que necessitam de filtro por digitação (países, cidades, cargos).", "Seleção múltipla de itens exibidos como etiquetas removíveis com campo de busca integrado."],
    whenNotToUse: ["Poucas opções fixas de 2 a 4 alternativas visíveis diretamente na tela → radio-group.", "Listas curtas de 5 a 15 opções que não necessitam de busca por digitação → select.", "Busca global ou paleta rápida de comandos e atalhos de teclado da aplicação → command."],
    content: ["Rótulo ou placeholder indicando a ação: \"Buscar cidade...\" ou \"Selecione um tema...\".", "Mensagem de estado vazio clara orientando a pessoa: \"Nenhum resultado encontrado para a busca.\".", "Chips no modo múltiplo mostram o nome da opção com botão de remoção rotulado como \"Remover\"."],
    accessibility: {
      keyboard: "Digitação filtra a lista; ArrowDown e ArrowUp percorrem os itens sugeridos. Enter confirma a seleção; Esc fecha o painel mantendo o foco no campo. No modo múltiplo com campo vazio, Backspace remove o último chip selecionado.",
      screenReader: "O campo possui papel combobox com aria-expanded e aria-haspopup=\"listbox\". O painel atua como listbox e cada sugestão como option com aria-selected. Anúncios de itens filtrados são comunicados ao leitor.",
      focus: "O foco permanece no campo de texto (ComboboxInput ou ComboboxChipsInput) durante a navegação pelas sugestões destacadas via aria-activedescendant.",
      cautions: "Forneça sempre rótulo acessível associado via label ou aria-label no campo (WCAG 1.3.1 e 4.1.2). Não oculte o estado vazio sem oferecer feedback textual claro quando nenhum item corresponder ao filtro.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-border", "bg-input", "bg-muted", "bg-popover", "border-destructive", "border-input", "border-ring", "text-accent-foreground", "text-foreground", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-1.5", "gap-2", "h-8", "h-px", "m-1", "max-h-96", "mb-0", "min-h-9", "min-w-16", "ml-1", "mx-1", "my-1", "p-0", "p-1", "pl-2", "pr-0", "pr-8", "px-1.5", "px-2", "px-2.5", "px-3", "py-1.5", "py-2", "right-2", "size-4", "size-5"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm"] },
      { contexto: "Sombra", itens: ["shadow-md", "shadow-xs"] },
      { contexto: "Foco", itens: ["ring-destructive", "ring-foreground", "ring-ring"] },
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
    description: "Agrupa botões de alternância de dois estados para seleção única ou múltipla. Ideal para barras de ferramentas, formatação e filtros visuais compactos.",
    whenToUse: "Conjuntos de opções de estilo ou formatação (como negrito, itálico e sublinhado) com seleção múltipla. Seleção exclusiva de alinhamento ou visualização (como esquerda, centro e direita) em barras de ferramentas. Filtros rápidos em linha onde o estado ativo de cada botão precisa ficar evidente.",
    anatomy: [
      { part: "ToggleGroup", description: "Contêiner raiz que gerencia o tipo de seleção e compartilha variantes, tamanhos e espaçamento via contexto" },
      { part: "ToggleGroupItem", description: "Cada botão individual do grupo que herda o estilo ou define suas próprias propriedades" },
    ],
    variants: [],
    states: [
      { name: "Desativado (off)", description: "Fundo transparente ou contorno padrão com texto font-normal e icon-fill em zero" },
      { name: "Ativado (on)", description: "Fundo bg-accent, texto text-accent-foreground, font-bold e icon-fill preenchido" },
      { name: "Hover", description: "Fundo hover:bg-muted ou hover:bg-accent conforme a variante" },
      { name: "Foco", description: "Anel visível com elevação de z-index para não cortar a borda" },
      { name: "Desabilitado", description: "Opacidade reduzida e cursor bloqueado" },
    ],
    sizes: [],
    doGuidelines: ["Use type=\"single\" para escolhas exclusivas e type=\"multiple\" para formatações independentes.", "Adicione aria-label descritivo em todos os itens compostos apenas por ícones.", "Mantenha espaçamento zero (spacing={0}) para formar barras de ferramentas visualmente coesas."],
    dontGuidelines: ["Usar para alternar páginas inteiras ou painéis de conteúdo extenso → tabs.", "Agrupar ações de envio ou disparo de formulário que não retêm estado → button-group.", "Utilizar botões de alternância sem nenhum rótulo textual ou acessível → icon-button."],
    code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single" defaultValue="centro">
  <ToggleGroupItem value="esquerda" aria-label="Alinhar à esquerda">
    Esquerda
  </ToggleGroupItem>
  <ToggleGroupItem value="centro" aria-label="Alinhar ao centro">
    Centro
  </ToggleGroupItem>
  <ToggleGroupItem value="direita" aria-label="Alinhar à direita">
    Direita
  </ToggleGroupItem>
</ToggleGroup>`,
    props: [
      { name: "type (ToggleGroup)", type: "single · multiple", default: "—", description: "Define se a seleção é exclusiva ou permite múltiplas opções" },
      { name: "value · defaultValue (ToggleGroup)", type: "string · string[]", default: "—", description: "Valor selecionado, controlado ou inicial" },
      { name: "onValueChange (ToggleGroup)", type: "(value: any) => void", default: "—", description: "Notifica alteração na seleção dos itens" },
      { name: "variant (ToggleGroup, Item)", type: "default · outline", default: "default", description: "Estilo visual dos botões, compartilhado via contexto" },
      { name: "size (ToggleGroup, Item)", type: "sm · default · lg", default: "default", description: "Dimensão vertical e espaçamento horizontal dos botões" },
      { name: "spacing (ToggleGroup)", type: "number", default: "0", description: "Distância entre os botões; valor zero mantém bordas acopladas" },
      { name: "value (ToggleGroupItem)", type: "string", default: "—", description: "Identificador obrigatório do item" },
      { name: "disabled (ToggleGroup, Item)", type: "boolean", default: "false", description: "Desabilita o grupo inteiro ou um item específico" },
    ],
    meta: {
      nome: "Toggle Group",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/toggle-group.tsx",
      story: "src/components/ui/toggle-group.stories.tsx",
      vizinhos: ["toggle", "button-group", "segmented-control", "radio-group"],
    },
    whenToUseItems: ["Conjuntos de opções de estilo ou formatação (como negrito, itálico e sublinhado) com seleção múltipla.", "Seleção exclusiva de alinhamento ou visualização (como esquerda, centro e direita) em barras de ferramentas.", "Filtros rápidos em linha onde o estado ativo de cada botão precisa ficar evidente."],
    whenNotToUse: ["Alternar a exibição de seções ou abas com painel de conteúdo associado → tabs.", "Seleção exclusiva de poucas opções de tela com animação de trilho deslizante → segmented-control.", "Ações simples de disparo único que não guardam estado ativado → button-group."],
    content: ["Use ícones reconhecíveis com rótulo descritivo acessível via aria-label ou tooltip.", "Para textos nos itens, limite a uma única palavra: \"Centro\", \"Esquerda\", \"Direita\".", "Agrupe no máximo de 3 a 7 opções relacionadas em um mesmo conjunto."],
    accessibility: {
      keyboard: "Em grupos com type=\"single\" atua como rádio, navegando com setas direcionais. Em type=\"multiple\" o Tab percorre os itens e Espaço/Enter alterna o estado de cada botão.",
      screenReader: "Utiliza papel toolbar ou group (Radix). Botões possuem aria-pressed para anunciar estado ativado/desativado ou aria-checked para seleção exclusiva.",
      focus: "Itens recebem focus-visible:ring-ring com z-10 para manter o anel de foco destacado sobre as bordas adjacentes.",
      cautions: "Forneça sempre aria-label para cada ToggleGroupItem que contenha apenas ícone (WCAG 4.1.2). Não exceda 10 itens na mesma barra sem agrupar opções secundárias.",
    },
    tokens: [
      { contexto: "Espaço", itens: ["min-w-0", "px-3"] },
      { contexto: "Raio", itens: ["rounded-l-md", "rounded-md", "rounded-r-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
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
    description: "Interrompe o fluxo da tela com um aviso crítico e exige resposta explícita antes de continuar. Diferente do diálogo comum, não fecha ao clicar fora.",
    whenToUse: "Confirmar ações destrutivas ou irreversíveis, como excluir uma conta ou descartar alterações não salvas. Decisões críticas de sistema que impedem a continuidade do fluxo sem uma escolha explícita da pessoa.",
    anatomy: [
      { part: "AlertDialog", description: "Raiz (Radix). Controla o estado de abertura" },
      { part: "AlertDialogTrigger", description: "Elemento que abre o diálogo" },
      { part: "AlertDialogPortal", description: "Portal para renderizar o diálogo no fim do DOM" },
      { part: "AlertDialogOverlay", description: "Fundo escurecido que bloqueia cliques na página" },
      { part: "AlertDialogContent", description: "Painel centralizado do alerta; aceita size (default ou sm)" },
      { part: "AlertDialogHeader", description: "Cabeçalho que organiza título, descrição e mídia visual" },
      { part: "AlertDialogFooter", description: "Rodapé com as ações de cancelamento e confirmação" },
      { part: "AlertDialogTitle", description: "Título do alerta (nome acessível obrigatório)" },
      { part: "AlertDialogDescription", description: "Texto explicativo com a consequência da ação" },
      { part: "AlertDialogMedia", description: "Container opcional para ícone de destaque acima do título" },
      { part: "AlertDialogAction", description: "Botão de ação principal (baseado em Button) que confirma e fecha" },
      { part: "AlertDialogCancel", description: "Botão secundário (baseado em Button) que cancela e fecha" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "Nada é renderizado na tela" },
      { name: "Aberto", description: "Fundo escurecido fixo (bg-black/50) e painel bg-popover com sombra shadow-lg, animando entrada com fade e zoom 95%" },
    ],
    sizes: [],
    doGuidelines: ["Use para decisões críticas que não podem ser desfeitas.", "Posicione o botão de cancelar antes da ação destrutiva para evitar cliques acidentais.", "Deixe claro na descrição o impacto exato da confirmação."],
    dontGuidelines: ["Diálogo de alerta sobre outro alerta → concentre a decisão em uma única janela ou fluxo sequencial.", "Mensagens puramente informativas sem necessidade de decisão → sonner.", "Formulários com campos de preenchimento → dialog."],
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
      <AlertDialogTitle>Excluir conta permanentemente?</AlertDialogTitle>
      <AlertDialogDescription>
        Essa ação não pode ser desfeita. Todos os dados serão apagados.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Excluir conta</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    props: [
      { name: "open · defaultOpen · onOpenChange (AlertDialog)", type: "boolean · boolean · (open: boolean) => void", default: "—", description: "Controle de abertura herdado do Radix" },
      { name: "size (AlertDialogContent)", type: "default · sm", default: "default", description: "Largura máxima do painel: default (até max-w-lg) ou sm (max-w-xs)" },
      { name: "variant (AlertDialogAction)", type: "ButtonProps[\"variant\"]", default: "default", description: "Estilo visual do botão de confirmação, como destructive para exclusões" },
      { name: "size (AlertDialogAction)", type: "ButtonProps[\"size\"]", default: "default", description: "Tamanho do botão de ação" },
      { name: "variant (AlertDialogCancel)", type: "ButtonProps[\"variant\"]", default: "outline", description: "Estilo visual do botão de cancelamento" },
      { name: "size (AlertDialogCancel)", type: "ButtonProps[\"size\"]", default: "default", description: "Tamanho do botão de cancelamento" },
    ],
    meta: {
      nome: "Alert Dialog",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/alert-dialog.tsx",
      story: "src/components/ui/alert-dialog.stories.tsx",
      vizinhos: ["dialog", "sonner"],
    },
    whenToUseItems: ["Confirmar ações destrutivas ou irreversíveis, como excluir uma conta ou descartar alterações não salvas.", "Decisões críticas de sistema que impedem a continuidade do fluxo sem uma escolha explícita da pessoa."],
    whenNotToUse: ["Tarefas curtas ou formulários que não envolvem risco crítico → dialog.", "Confirmações simples ou notificações que podem sumir sozinhas sem resposta → sonner.", "Mensagens contextuais fixas na página sem bloqueio modal → alert."],
    content: ["Título direto como pergunta ou afirmação curta: \"Excluir conta?\".", "A descrição detalha a consequência imediata e se a ação pode ser desfeita: \"Essa ação é irreversível e removerá todos os dados.\".", "O botão de confirmação usa o verbo da ação correspondente: \"Excluir conta\", nunca \"OK\" ou \"Sim\"."],
    accessibility: {
      keyboard: "Tab e Shift+Tab navegam entre os botões de ação e ficam presos na janela. Esc fecha acionando o cancelamento. Clicar fora não fecha a janela.",
      screenReader: "Papel alertdialog modal. O AlertDialogTitle vira o nome acessível e o AlertDialogDescription é associado via aria-describedby. O resto da página recebe aria-hidden=\"true\".",
      focus: "Ao abrir, o foco é transferido para o primeiro elemento focável (em ações destrutivas, posicione no AlertDialogCancel). Ao fechar, retorna para o gatilho.",
      cautions: "Ações destrutivas não devem receber foco inicial no botão perigoso (WCAG 3.3.4). O título é mandatório para conformidade de nome acessível.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-muted", "bg-popover", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-semibold", "text-lg", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1.5", "gap-2", "gap-4", "gap-x-6", "inset-0", "max-w-lg", "max-w-xs", "mb-2", "p-6", "size-16", "size-8"] },
      { contexto: "Raio", itens: ["rounded-lg", "rounded-md"] },
      { contexto: "Sombra", itens: ["shadow-lg"] },
      { contexto: "Movimento", itens: ["duration-motion-base"] },
    ],
  },
  calendar: {
    description: "Exibe uma grade mensal interativa para seleção visual de uma data ou período. Já vem configurado com localização pt-BR por padrão.",
    whenToUse: "Seleção de data pontual próxima em formulários (agendamento de consulta, entrega ou reunião). Seleção de intervalo de datas com início e fim (reserva de período, vigência ou filtro de relatórios).",
    anatomy: [
      { part: "Calendar", description: "Container principal que encapsula o DayPicker e define navegação, cabeçalho e grade" },
      { part: "CalendarDayButton", description: "Botão do dia baseado em Button ghost com atributos de estado e seleção" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Célula com número do dia em texto normal e fundo transparente" },
      { name: "Hoje", description: "Célula com fundo bg-accent e texto text-accent-foreground" },
      { name: "Selecionado", description: "Célula com fundo bg-primary e texto contrastante text-primary-foreground" },
      { name: "Intervalo (meio)", description: "Célula com cantos retos e fundo suave bg-accent" },
      { name: "Fora do mês", description: "Número atenuado em text-muted-foreground" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% sem resposta a cliques" },
    ],
    sizes: [],
    doGuidelines: ["Destaque visualmente a data atual para orientar a pessoa no tempo.", "Configure captionLayout=\"dropdown\" quando a pessoa precisar navegar por muitos meses ou anos.", "Combine com popover e input para criar seletores de data compactos em formulários."],
    dontGuidelines: ["Forçar navegação mês a mês para datas distantes como nascimento → input.", "Usar calendário quando o objetivo é apenas selecionar horário → time-picker.", "Esconder dias fora do mês se isso quebrar a estrutura da grade semanal → configure showOutsideDays={true}."],
    code: `import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function ExemploCalendario() {
  const [data, setData] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={data}
      onSelect={setData}
    />
  )
}`,
    props: [
      { name: "mode (Calendar)", type: "\"single\" · \"multiple\" · \"range\"", default: "\"single\"", description: "Modo de seleção de datas do DayPicker" },
      { name: "selected · onSelect (Calendar)", type: "Date · Date[] · DateRange", default: "—", description: "Valor selecionado e callback de alteração" },
      { name: "buttonVariant", type: "React.ComponentProps<typeof Button>[\"variant\"]", default: "ghost", description: "Variante visual dos botões de navegação de mês" },
      { name: "showOutsideDays", type: "boolean", default: "true", description: "Exibe os dias do mês anterior e posterior na grade" },
      { name: "captionLayout", type: "\"label\" · \"dropdown\"", default: "label", description: "Estilo do cabeçalho: texto estático ou menus suspensos de mês e ano" },
      { name: "locale", type: "Locale", default: "ptBR", description: "Localização do calendário (date-fns); padrão fixado em português do Brasil" },
    ],
    meta: {
      nome: "Calendar",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/calendar.tsx",
      story: "src/components/ui/calendar.stories.tsx",
      vizinhos: ["popover", "input"],
    },
    whenToUseItems: ["Seleção de data pontual próxima em formulários (agendamento de consulta, entrega ou reunião).", "Seleção de intervalo de datas com início e fim (reserva de período, vigência ou filtro de relatórios)."],
    whenNotToUse: ["Datas de nascimento ou datas muito distantes no passado → input.", "Seleção de horários, horas e minutos → time-picker.", "Escolha entre opções fixas relativas como últimos sete dias → segmented-control."],
    content: ["Rótulos dos dias da semana iniciam em domingo (\"dom\", \"seg\", \"ter\") conforme a convenção brasileira.", "Meses abreviados em 3 letras no seletor suspenso (\"jan\", \"fev\", \"mar\").", "Ao exibir a data escolhida em campo de apoio, use formato \"DD/MM/AAAA\"."],
    accessibility: {
      keyboard: "Setas direcionais navegam entre os dias da grade. PageUp e PageDown alternam os meses; Shift+PageUp e Shift+PageDown alternam os anos. Enter ou Espaço seleciona o dia em foco.",
      screenReader: "Tabela com papel grid. Dias anunciados com data completa e estado selecionado via aria-selected=\"true\". Botões de avançar e voltar possuem nomes acessíveis internacionalizados pelo ptBR.",
      focus: "O foco visual destaca o dia ativo com anel de foco ring-[3px] ring-ring e borda border-ring.",
      cautions: "Não use calendário como meio único para datas distantes ou cadastrais (WCAG 2.1.1); permita sempre digitação manual direta em campo de texto.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-background", "bg-popover", "bg-primary", "border-input", "border-ring", "text-accent-foreground", "text-muted-foreground", "text-primary-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "font-normal", "leading-none", "text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-1.5", "gap-4", "h-8", "inset-0", "inset-x-0", "mt-2", "p-0", "p-3", "pl-2", "pr-1", "size-3.5", "top-0"] },
      { contexto: "Raio", itens: ["rounded-l-md", "rounded-md", "rounded-r-md"] },
      { contexto: "Sombra", itens: ["shadow-xs"] },
      { contexto: "Foco", itens: ["ring-ring"] },
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
    description: "Exibe uma sequência de itens e painéis navegáveis horizontalmente ou verticalmente, com suporte a gestos de toque baseado em Embla Carousel.",
    whenToUse: "Apresentação de galerias visuais de cartões ou imagens em espaço horizontal restrito. Introduções graduais e telas sequenciais curtas (onboarding ou destaques promocionais).",
    anatomy: [
      { part: "Carousel", description: "Raiz com contexto Embla, captura de teclado e marcação de região acessível" },
      { part: "CarouselContent", description: "Viewport de corte e trilho flexível que agrupa os slides" },
      { part: "CarouselItem", description: "Item individual (slide) com base flexível configurável" },
      { part: "CarouselPrevious", description: "Botão circular com ícone de seta para voltar ao slide anterior" },
      { part: "CarouselNext", description: "Botão circular com ícone de seta para avançar ao próximo slide" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Slides visíveis no trilho com botões de navegação ativos" },
      { name: "Extremidade inicial", description: "Botão CarouselPrevious desabilitado com opacidade reduzida" },
      { name: "Extremidade final", description: "Botão CarouselNext desabilitado com opacidade reduzida" },
    ],
    sizes: [],
    doGuidelines: ["Mantenha controles de navegação visíveis e acessíveis por toque e teclado.", "Limite a quantidade de itens em sequências curtas de até 5 slides.", "Ajuste a proporção dos slides com classes utilitárias para exibir múltiplos cartões por tela."],
    dontGuidelines: ["Carrossel automático sem botão de pausa → prejudica leitura e acessibilidade motora.", "Usar para conteúdos extensos ou paginação de registros → pagination.", "Esconder informações críticas exclusivamente atrás de slides não visíveis → card."],
    code: `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    <CarouselItem>
      <div className="p-4 text-center font-medium">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-4 text-center font-medium">Slide 2</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    props: [
      { name: "opts", type: "CarouselOptions", default: "—", description: "Opções de configuração do Embla Carousel (loop, alinhamento, arrasto)" },
      { name: "plugins", type: "CarouselPlugin", default: "—", description: "Plugins adicionais do Embla como Autoplay ou WheelGestures" },
      { name: "orientation", type: "horizontal · vertical", default: "horizontal", description: "Eixo de transição dos slides (horizontal ou vertical)" },
      { name: "setApi", type: "(api: CarouselApi) => void", default: "—", description: "Callback que expõe a instância do Embla Carousel para controle externo" },
      { name: "variant (CarouselPrevious)", type: "ButtonProps[\"variant\"]", default: "outline", description: "Estilo visual do botão anterior herdado de Button" },
      { name: "size (CarouselPrevious)", type: "ButtonProps[\"size\"]", default: "icon", description: "Tamanho do botão anterior" },
      { name: "variant (CarouselNext)", type: "ButtonProps[\"variant\"]", default: "outline", description: "Estilo visual do botão próximo herdado de Button" },
      { name: "size (CarouselNext)", type: "ButtonProps[\"size\"]", default: "icon", description: "Tamanho do botão próximo" },
      { name: "label (CarouselPrevious)", type: "string", default: "Slide anterior", description: "Texto que o leitor de tela anuncia no botão (não aparece na tela)" },
      { name: "label (CarouselNext)", type: "string", default: "Próximo slide", description: "Texto que o leitor de tela anuncia no botão (não aparece na tela)" },
    ],
    meta: {
      nome: "Carousel",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/carousel.tsx",
      story: "src/components/ui/carousel.stories.tsx",
      vizinhos: ["pagination", "tabs"],
    },
    whenToUseItems: ["Apresentação de galerias visuais de cartões ou imagens em espaço horizontal restrito.", "Introduções graduais e telas sequenciais curtas (onboarding ou destaques promocionais)."],
    whenNotToUse: ["Sequências longas com mais de cinco páginas de conteúdo denso → pagination.", "Conteúdos que a pessoa precisa comparar ou visualizar todos juntos na mesma tela → card.", "Navegação entre seções distintas da mesma página com painéis fixos → tabs."],
    content: ["Títulos nos cartões internos curtos e claros.", "Mantenha de 3 a 5 itens para evitar cansaço na rolagem.", "Indique visualmente a posição relativa dos slides quando relevante (\"1 de 4\")."],
    accessibility: {
      keyboard: "Foco no container permite avançar e voltar usando ArrowLeft e ArrowRight. Tab alcança os botões de controle anterior e próximo.",
      screenReader: "Container com role=\"region\" e aria-roledescription=\"carrossel\". Cada slide possui role=\"group\" e aria-roledescription=\"slide\".",
      focus: "O foco permanece nos botões de navegação ao clicar ou navega pelos links e elementos interativos dentro do slide ativo.",
      cautions: "Os botões anunciam \"Slide anterior\" e \"Próximo slide\". Para um texto mais específico (\"Foto anterior\"), passe label em CarouselPrevious e CarouselNext.",
    },
    tokens: [
      { contexto: "Espaço", itens: ["bottom-12", "left-1", "left-12", "min-w-0", "ml-4", "mt-4", "pl-4", "pt-4", "right-12", "size-8", "top-1", "top-12"] },
      { contexto: "Raio", itens: ["rounded-full"] },
    ],
  },
  chart: {
    description: "Container e utilitários para renderização de gráficos baseados em Recharts, com suporte a variáveis de cor e tooltips temáticos.",
    whenToUse: "Visualização de tendências e séries temporais em painéis e dashboards (gráficos de linha e área). Comparação de métricas entre categorias ou períodos definidos (gráficos de barras e colunas).",
    anatomy: [
      { part: "ChartContainer", description: "Container responsivo que injeta o contexto de configuração e variáveis CSS de cores" },
      { part: "ChartStyle", description: "Elemento interno que gera folha de estilos dinâmica para temas claro e escuro" },
      { part: "ChartTooltipContent", description: "Conteúdo flutuante formatado para exibir valores e séries sob o cursor" },
      { part: "ChartLegendContent", description: "Legenda configurável com marcadores de cor e rótulos das séries" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Gráfico renderizado com eixos, grades e séries preenchidas nas cores do config" },
      { name: "Hover / Interação", description: "Destaque do elemento apontado com tooltip bg-popover e linha ou cursor de apoio" },
      { name: "Foco visível", description: "Superfície do gráfico com contorno outline-ring ao navegar via teclado" },
    ],
    sizes: [],
    doGuidelines: ["Forneça sempre uma alternativa em tabela ou resumo acessível para dados críticos.", "Inicie eixos quantitativos em zero para não distorcer proporções visuais.", "Utilize a paleta semântica do ChartConfig para garantir contraste adequado em temas claro e escuro."],
    dontGuidelines: ["Gráficos de pizza ou rosca com mais de cinco fatias → agrupe as menores em outros ou use gráfico de barras.", "Confiar exclusivamente na cor para distinguir séries próximas → combine marcadores de linha ou rótulos.", "Substituir tabelas completas de consulta por gráficos complexos → table."],
    code: `import { Bar, BarChart } from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  vendas: {
    label: "Vendas",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const dados = [
  { mes: "Jan", vendas: 186 },
  { mes: "Fev", vendas: 305 },
]

export function ExemploGrafico() {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <BarChart data={dados}>
        <Bar dataKey="vendas" fill="var(--color-vendas)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`,
    props: [
      { name: "config", type: "ChartConfig", default: "—", description: "Dicionário de séries associando rótulos, ícones e cores para temas claro e escuro" },
      { name: "children", type: "React.ComponentProps< typeof RechartsPrimitive.ResponsiveContainer >[\"children\"]", default: "—", description: "Componente gráfico do Recharts (BarChart, LineChart, AreaChart, PieChart)" },
      { name: "initialDimension", type: "{ width: number height: number }", default: "INITIAL_DIMENSION", description: "Dimensões iniciais para renderização do contêiner responsivo" },
      { name: "id (ChartStyle)", type: "string", default: "—", description: "Identificador único do gráfico para escopo das variáveis CSS de cor" },
      { name: "config (ChartStyle)", type: "ChartConfig", default: "—", description: "Configuração de cores utilizada para gerar as classes e variáveis" },
      { name: "hideLabel (ChartTooltipContent)", type: "boolean", default: "false", description: "Oculta o rótulo principal do eixo ou categoria no tooltip" },
      { name: "hideIndicator (ChartTooltipContent)", type: "boolean", default: "false", description: "Oculta a miniatura indicadora de cor ao lado do valor" },
      { name: "indicator (ChartTooltipContent)", type: "line · dot · dashed", default: "dot", description: "Formato visual do indicador de cor (dot, line ou dashed)" },
      { name: "nameKey (ChartTooltipContent)", type: "string", default: "—", description: "Chave do item utilizada para buscar o nome da série" },
      { name: "labelKey (ChartTooltipContent)", type: "string", default: "—", description: "Chave do item utilizada para buscar o rótulo" },
      { name: "hideIcon (ChartLegendContent)", type: "boolean", default: "false", description: "Oculta ícones customizados na legenda" },
      { name: "nameKey (ChartLegendContent)", type: "string", default: "—", description: "Chave da série utilizada na legenda" },
      { name: "verticalAlign (ChartLegendContent)", type: "top · bottom", default: "bottom", description: "Alinhamento vertical da legenda em relação ao gráfico" },
    ],
    meta: {
      nome: "Chart",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/chart.tsx",
      story: "src/components/ui/chart.stories.tsx",
      vizinhos: ["table", "card"],
    },
    whenToUseItems: ["Visualização de tendências e séries temporais em painéis e dashboards (gráficos de linha e área).", "Comparação de métricas entre categorias ou períodos definidos (gráficos de barras e colunas)."],
    whenNotToUse: ["Dados tabulares detalhados que exigem ordenação, paginação ou consulta valor a valor → table.", "Métrica isolada ou KPI único com valor em destaque → card.", "Indicadores simples de preenchimento ou progresso percentual → progress."],
    content: ["Título do gráfico ou do cartão deve descrever a pergunta que os dados respondem: \"Evolução de acessos mensais\".", "Legendas e rótulos de eixos concisos, sem abreviações ambíguas.", "Formate números grandes no tooltip com separadores de milhar (\"1.250\" ou \"R$ 45.000\")."],
    accessibility: {
      keyboard: "A superfície do gráfico recebe foco com contorno outline-ring e anel visível.",
      screenReader: "Gráficos puramente SVG não comunicam todos os pontos de dados diretamente; forneça sempre uma tabela equivalente ou resumo textual descritivo via aria-describedby ou texto de apoio.",
      focus: "O foco permanece na área do container ou navega entre controles de filtragem externos.",
      cautions: "A cor nunca deve ser o único sinal para diferenciar séries concorrentes (WCAG 1.4.1); utilize padrões de preenchimento, ícones ou legendas textuais próximas, e forneça alternativa em tabela para conformidade com WCAG 1.1.1.",
    },
    tokens: [
      { contexto: "Cor", itens: ["--color-border", "bg-popover", "border-border", "fill-muted", "fill-muted-foreground", "stroke-border", "text-foreground", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "leading-none", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1.5", "gap-2", "gap-4", "h-2", "h-2.5", "h-3", "min-w-32", "my-0.5", "pb-3", "pt-3", "px-2.5", "py-1.5", "w-0", "w-1", "w-2", "w-2.5", "w-3"] },
      { contexto: "Raio", itens: ["rounded-lg"] },
      { contexto: "Sombra", itens: ["shadow-xl"] },
      { contexto: "Foco", itens: ["outline-ring"] },
    ],
  },
  command: {
    description: "Menu de comandos e busca rápida para filtrar ações e recursos pelo teclado. Funciona inline na página ou dentro de uma janela modal para paleta de comandos.",
    whenToUse: "Paleta de comandos global para executar ações frequentes e navegar rápido pela aplicação. Busca com filtro instantâneo por recursos, configurações ou atalhos em interfaces densas. Menu de ações rápidas acionado pelo teclado para pessoas com uso intensivo do sistema.",
    anatomy: [
      { part: "Command", description: "Raiz (cmdk), contêiner principal com lista filtrável por texto" },
      { part: "CommandDialog", description: "Variante em janela modal sobreposta (Dialog), ativada por atalho ou gatilho" },
      { part: "CommandInput", description: "Campo de busca por texto com ícone de lupa e foco gerenciado" },
      { part: "CommandList", description: "Lista com rolagem vertical que abriga grupos, itens e estado vazio" },
      { part: "CommandEmpty", description: "Mensagem informativa exibida quando nenhum comando corresponde à busca" },
      { part: "CommandGroup", description: "Agrupador temático de comandos com cabeçalho de seção" },
      { part: "CommandSeparator", description: "Divisor visual entre grupos de comandos" },
      { part: "CommandItem", description: "Item interativo de ação ou navegação, selecionável por teclado ou clique" },
      { part: "CommandShortcut", description: "Rótulo de atalho de teclado alinhado à direita do item" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Fundo em bg-popover com texto text-popover-foreground" },
      { name: "Item selecionado", description: "Fundo em bg-accent com texto text-accent-foreground via data-[selected=true]" },
      { name: "Desabilitado", description: "Opacidade reduzida com data-[disabled=true]:opacity-50 e sem eventos de ponteiro" },
      { name: "Vazio", description: "Mensagem de CommandEmpty centralizada com py-6 text-sm" },
      { name: "Foco no campo", description: "Borda e anel de 3 px em border-ring ring-ring no contêiner do input" },
    ],
    sizes: [],
    doGuidelines: ["Forneça atalho global de teclado para abrir o CommandDialog de qualquer ponto da tela.", "Agrupe comandos afins com CommandGroup e nomeie cada grupo com um cabeçalho objetivo.", "Inclua sempre uma mensagem útil em CommandEmpty orientando o que fazer quando nada for encontrado."],
    dontGuidelines: ["Substituir a navegação principal da aplicação por uma paleta de comandos → sidebar.", "Deixar o título padrão numa paleta com propósito específico → passe title e description que digam o que ela faz.", "Lista longa sem divisão por grupos ou atalhos visíveis → divida comandos com CommandGroup e indique CommandShortcut."],
    code: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Digite um comando ou busque..." />
  <CommandList>
    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
    <CommandGroup heading="Ações">
      <CommandItem>Novo arquivo</CommandItem>
      <CommandItem>Abrir projeto</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    props: [
      { name: "value · onValueChange (Command)", type: "string", default: "—", description: "Valor controlado do item selecionado na lista" },
      { name: "title (CommandDialog)", type: "string", default: "Paleta de comandos", description: "Título acessível da janela modal para leitor de tela (sr-only)" },
      { name: "description (CommandDialog)", type: "string", default: "Busque um comando para executar.", description: "Descrição acessível da janela modal para leitor de tela (sr-only)" },
      { name: "className (CommandDialog)", type: "string", default: "—", description: "Classes adicionais aplicadas ao contêiner DialogContent" },
      { name: "showCloseButton (CommandDialog)", type: "boolean", default: "true", description: "Exibe o botão de fechar no canto superior da janela modal" },
      { name: "shouldFilter (CommandDialog)", type: "boolean", default: "—", description: "Desativa a filtragem interna do cmdk para usar busca e ordenação customizadas" },
    ],
    meta: {
      nome: "Command",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/command.tsx",
      story: "src/components/ui/command.stories.tsx",
      vizinhos: ["combobox", "dialog", "dropdown-menu"],
    },
    whenToUseItems: ["Paleta de comandos global para executar ações frequentes e navegar rápido pela aplicação.", "Busca com filtro instantâneo por recursos, configurações ou atalhos em interfaces densas.", "Menu de ações rápidas acionado pelo teclado para pessoas com uso intensivo do sistema."],
    whenNotToUse: ["Navegação principal do sistema ou estrutura hierárquica de páginas → sidebar.", "Seleção de uma opção única para preenchimento de campo em formulário comum → combobox.", "Menu curto de ações locais associado a um botão específico na interface → dropdown-menu."],
    content: ["O texto de orientação no campo de busca deve ser direto: \"Digite um comando ou busque...\".", "Itens de ação devem começar com verbo no infinitivo ou substantivo claro: \"Novo arquivo\", \"Configurações\".", "A mensagem de busca vazia deve informar com clareza: \"Nenhum resultado encontrado.\".", "Atalhos de teclado devem seguir a convenção da plataforma: \"⌘K\" ou \"Ctrl+K\"."],
    accessibility: {
      keyboard: "Setas Cima e Baixo navegam entre os itens da lista. Enter executa a ação do item selecionado. Esc fecha o CommandDialog e devolve o foco ao elemento acionador. Digitação no CommandInput filtra os itens em tempo real.",
      screenReader: "Papel combobox no input gerenciando a lista de resultados com aria-expanded e aria-controls. CommandDialog possui DialogTitle e DialogDescription ocultos visualmente (sr-only) para identificação acessível.",
      focus: "Ao abrir o CommandDialog, o foco vai automaticamente para o campo de busca (CommandInput). Ao fechar, o foco retorna ao botão ou elemento que abriu a paleta.",
      cautions: "CommandDialog se chama \"Paleta de comandos\" e se descreve como \"Busque um comando para executar.\" para o leitor de tela. Passe title e description quando a paleta tiver um propósito mais específico (\"Ir para uma página\").",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-border", "bg-popover", "border-ring", "text-accent-foreground", "text-foreground", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs", "tracking-widest"] },
      { contexto: "Espaço", itens: ["gap-2", "h-10", "h-12", "h-5", "h-9", "h-px", "max-h-75", "mx-1", "p-0", "p-1", "pt-0", "px-2", "px-3", "py-1.5", "py-3", "py-6", "size-4", "w-5"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  "context-menu": {
    description: "Menu contextual flutuante acionado pelo clique com o botão direito do mouse ou toque longo. Agrupa ações específicas aplicadas ao elemento apontado.",
    whenToUse: "Oferecer atalhos e ações secundárias sobre itens de tabelas, arquivos, cards ou áreas de trabalho. Disponibilizar operações complementares (como copiar, duplicar ou inspecionar) sem ocupar espaço fixo na tela. Prover comandos contextuais de edição para usuários avançados em ferramentas e painéis de criação.",
    anatomy: [
      { part: "ContextMenu", description: "Raiz (Radix), gerencia o ciclo de abertura e fechamento do menu" },
      { part: "ContextMenuTrigger", description: "Área alvo que intercepta o clique com botão direito ou toque longo" },
      { part: "ContextMenuGroup", description: "Agrupador estrutural de itens relacionados no menu" },
      { part: "ContextMenuPortal", description: "Portal que renderiza o menu flutuante fora do fluxo DOM local" },
      { part: "ContextMenuSub", description: "Contêiner raiz para submenu aninhado" },
      { part: "ContextMenuRadioGroup", description: "Agrupador para seleção exclusiva entre múltiplos itens de opção" },
      { part: "ContextMenuSubTrigger", description: "Item que abre um submenu ao passar o mouse ou pressionar seta" },
      { part: "ContextMenuSubContent", description: "Painel flutuante do submenu posicionado ao lado do gatilho" },
      { part: "ContextMenuContent", description: "Painel flutuante posicionado no ponto do ponteiro com elevação e borda" },
      { part: "ContextMenuItem", description: "Item interativo de ação com suporte a variante padrão ou destrutiva" },
      { part: "ContextMenuCheckboxItem", description: "Item de alternância com indicador de caixa de seleção" },
      { part: "ContextMenuRadioItem", description: "Item de opção exclusiva com indicador circular preenchido" },
      { part: "ContextMenuLabel", description: "Cabeçalho de texto descritivo para rotular um grupo" },
      { part: "ContextMenuSeparator", description: "Divisor horizontal sutil entre seções ou grupos de ações" },
      { part: "ContextMenuShortcut", description: "Texto de atalho de teclado alinhado à direita do item" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Fundo em bg-popover com texto text-popover-foreground e cantos arredondados" },
      { name: "Foco", description: "Fundo em bg-accent com texto text-accent-foreground e anel de foco" },
      { name: "Destrutivo em foco", description: "Fundo avermelhado em bg-destructive/10 com texto em text-destructive" },
      { name: "Marcado", description: "Indicador visual de check ou círculo exibido na margem esquerda" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% sem resposta a hover ou eventos de ponteiro" },
    ],
    sizes: [],
    doGuidelines: ["Agrupe ações similares com ContextMenuGroup e separe por ContextMenuSeparator.", "Posicione itens com variante destrutiva no final do menu, isolados por um divisor.", "Forneça sempre um botão ou controle visível equivalente na tela para a mesma ação."],
    dontGuidelines: ["Ocultar no menu de contexto a única forma de realizar uma tarefa crítica → button.", "Aninhar submenus com mais de dois níveis de profundidade → divida as opções com dialog.", "Criar menus extensos com mais de dez opções sem agrupamento temático → command."],
    code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger className="flex h-32 items-center justify-center rounded-md border border-dashed text-sm">
    Clique com o botão direito aqui
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copiar</ContextMenuItem>
    <ContextMenuItem>Duplicar</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">Excluir</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    props: [
      { name: "disabled (ContextMenuItem)", type: "boolean", default: "false", description: "Desabilita a interação com o item de menu" },
      { name: "inset (ContextMenuSubTrigger)", type: "boolean", default: "—", description: "Adiciona recuo à esquerda de 32 px para alinhar com itens que contêm ícone" },
      { name: "inset (ContextMenuItem)", type: "boolean", default: "—", description: "Adiciona recuo à esquerda de 32 px para alinhar com itens que contêm ícone" },
      { name: "variant (ContextMenuItem)", type: "default · destructive", default: "default", description: "Define o estilo visual padrão ou perigo para ações irreversíveis" },
      { name: "inset (ContextMenuLabel)", type: "boolean", default: "—", description: "Adiciona recuo à esquerda de 32 px para alinhar o rótulo com itens que contêm ícone" },
    ],
    meta: {
      nome: "Context Menu",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/context-menu.tsx",
      story: "src/components/ui/context-menu.stories.tsx",
      vizinhos: ["dropdown-menu", "menubar"],
    },
    whenToUseItems: ["Oferecer atalhos e ações secundárias sobre itens de tabelas, arquivos, cards ou áreas de trabalho.", "Disponibilizar operações complementares (como copiar, duplicar ou inspecionar) sem ocupar espaço fixo na tela.", "Prover comandos contextuais de edição para usuários avançados em ferramentas e painéis de criação."],
    whenNotToUse: ["Único meio de acesso a ações primárias ou críticas de uma tela → button.", "Menu de ações visível disparado por clique com o botão esquerdo em um gatilho → dropdown-menu.", "Navegação permanente entre páginas ou seções do sistema → navigation-menu."],
    content: ["Cada item deve iniciar com verbo de ação no infinitivo: \"Copiar link\", \"Duplicar linha\".", "Ações destrutivas devem nomear com precisão o que será excluído: \"Excluir pasta\".", "Indique atalhos no formato padrão do sistema operacional: \"⌘C\" no Mac ou \"Ctrl+C\" no Windows.", "Rótulos de grupo devem ser curtos e em estilo de título: \"Organizar por\", \"Ações rápidas\"."],
    accessibility: {
      keyboard: "Shift+F10 ou tecla Menu abre o menu contextual no elemento com foco. Setas Cima e Baixo navegam pelos itens. Seta Direita entra em submenus e Seta Esquerda ou Esc fecham o submenu ou menu. Enter executa a opção selecionada.",
      screenReader: "Papel menu no painel e menuitem, menuitemcheckbox ou menuitemradio nos itens. O estado marcado é comunicado via aria-checked. Submenus expõem aria-haspopup=\"menu\" e aria-expanded.",
      focus: "Ao abrir, o foco move-se automaticamente para o primeiro item habilitado. Ao fechar com Esc ou ao acionar um comando, o foco retorna para o elemento gatilho original.",
      cautions: "Nunca coloque ações exclusivas no menu de contexto (critério WCAG 2.1.1). Pessoas em dispositivos de toque ou navegando exclusivamente por teclado dependem de caminhos alternativos visíveis na interface.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-border", "bg-destructive", "bg-popover", "text-accent-foreground", "text-destructive", "text-foreground", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs", "tracking-widest"] },
      { contexto: "Espaço", itens: ["gap-2", "h-px", "left-2", "min-w-32", "mx-1", "my-1", "p-1", "pl-8", "pr-2", "px-2", "py-1.5", "size-3.5", "size-4"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm"] },
      { contexto: "Sombra", itens: ["shadow-lg", "shadow-md"] },
      { contexto: "Foco", itens: ["outline-ring"] },
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
      { name: "closeLabel (DialogContent)", type: "string", default: "Fechar", description: "Texto que o leitor de tela anuncia no \"X\"" },
      { name: "closeLabel (DialogFooter)", type: "string", default: "Fechar", description: "Texto do botão de fechar do rodapé (com showCloseButton)" },
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
      cautions: "o \"X\" anuncia \"Fechar\" e o botão do DialogFooter (showCloseButton) também diz \"Fechar\". Para outro texto, passe closeLabel (ex.: closeLabel=\"Dispensar\"); se o rodapé precisa de uma ação com verbo próprio (\"Cancelar\"), use um DialogClose com esse texto em vez de showCloseButton.",
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
    description: "Menu suspenso ancorado a um botão acionador que exibe uma lista de ações ou opções. Fecha ao selecionar um item ou ao clicar fora do painel.",
    whenToUse: "Menu de mais opções (como ícone kebab ou reticências) em linhas de tabela, cabeçalhos ou cards. Agrupamento de ações secundárias de usuário (como perfil, configurações, alternância de tema e logout). Lista de comandos ou ações rápidas associada a um gatilho visível sem poluir a interface.",
    anatomy: [
      { part: "DropdownMenu", description: "Raiz (Radix), gerencia o ciclo aberto/fechado do menu" },
      { part: "DropdownMenuPortal", description: "Portal que renderiza o painel flutuante fora do fluxo DOM local" },
      { part: "DropdownMenuTrigger", description: "Elemento acionador visível (botão ou ícone) com asChild" },
      { part: "DropdownMenuContent", description: "Painel flutuante ancorado ao gatilho com elevação, sombra e borda" },
      { part: "DropdownMenuGroup", description: "Agrupador estrutural de itens afins dentro do menu" },
      { part: "DropdownMenuItem", description: "Item interativo de ação com suporte a variante padrão ou destrutiva" },
      { part: "DropdownMenuCheckboxItem", description: "Item com estado alternável e indicador de caixa de seleção" },
      { part: "DropdownMenuRadioGroup", description: "Agrupador para seleção exclusiva entre múltiplos itens de opção" },
      { part: "DropdownMenuRadioItem", description: "Item de opção exclusiva com indicador circular preenchido" },
      { part: "DropdownMenuLabel", description: "Rótulo informativo ou cabeçalho descritivo de um grupo" },
      { part: "DropdownMenuSeparator", description: "Divisor visual horizontal entre grupos ou seções" },
      { part: "DropdownMenuShortcut", description: "Texto de atalho de teclado alinhado à direita do item" },
      { part: "DropdownMenuSub", description: "Contêiner raiz para submenu aninhado" },
      { part: "DropdownMenuSubTrigger", description: "Item que abre um submenu ao passar o mouse ou focar" },
      { part: "DropdownMenuSubContent", description: "Painel flutuante do submenu ancorado ao lado do submenu trigger" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Fundo em bg-popover com texto text-popover-foreground e cantos arredondados" },
      { name: "Foco", description: "Fundo em bg-accent com texto text-accent-foreground e anel de foco" },
      { name: "Destrutivo em foco", description: "Fundo avermelhado em bg-destructive/10 com texto em text-destructive" },
      { name: "Marcado", description: "Ícone indicador de seleção exibido à esquerda do item" },
      { name: "Desabilitado", description: "Opacidade reduzida em 50% sem resposta a eventos de ponteiro" },
    ],
    sizes: [],
    doGuidelines: ["Comece cada opção com um verbo no infinitivo claro e específico.", "Agrupe ações correlatas e posicione ações destrutivas por último, separadas por divisor.", "Utilize atalhos de teclado para comunicar comandos úteis já configurados no sistema."],
    dontGuidelines: ["Usar dropdown-menu para selecionar valor em formulário que salva estado → select.", "Lista com mais de dez opções sem agrupamento nem divisores visíveis → organize com command.", "Submenus aninhados em mais de dois níveis que dificultam o uso no mouse → dialog."],
    code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Mais opções</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Editar perfil</DropdownMenuItem>
    <DropdownMenuItem>Duplicar</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    props: [
      { name: "open · onOpenChange (DropdownMenu)", type: "boolean · function", default: "—", description: "Controle de abertura do menu (Radix)" },
      { name: "sideOffset (DropdownMenuContent)", type: "number", default: "4", description: "Distância em pixels entre o painel flutuante e o elemento gatilho" },
      { name: "inset (DropdownMenuItem)", type: "boolean", default: "—", description: "Adiciona recuo à esquerda de 32 px para alinhar com itens com ícone" },
      { name: "variant (DropdownMenuItem)", type: "default · destructive", default: "default", description: "Define o estilo visual padrão ou perigo para ações irreversíveis" },
      { name: "inset (DropdownMenuLabel)", type: "boolean", default: "—", description: "Adiciona recuo à esquerda de 32 px para alinhar o rótulo com itens com ícone" },
      { name: "inset (DropdownMenuSubTrigger)", type: "boolean", default: "—", description: "Adiciona recuo à esquerda de 32 px para alinhar com itens com ícone" },
    ],
    meta: {
      nome: "Dropdown Menu",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/dropdown-menu.tsx",
      story: "src/components/ui/dropdown-menu.stories.tsx",
      vizinhos: ["context-menu", "select", "popover"],
    },
    whenToUseItems: ["Menu de mais opções (como ícone kebab ou reticências) em linhas de tabela, cabeçalhos ou cards.", "Agrupamento de ações secundárias de usuário (como perfil, configurações, alternância de tema e logout).", "Lista de comandos ou ações rápidas associada a um gatilho visível sem poluir a interface."],
    whenNotToUse: ["Seleção de um valor para preenchimento de campo em formulário → select.", "Navegação permanente entre páginas ou seções estruturais do produto → navigation-menu.", "Menu contextual disparado pelo clique com o botão direito sobre um elemento → context-menu."],
    content: ["Cada item deve iniciar com verbo de ação no infinitivo: \"Editar perfil\", \"Duplicar projeto\".", "Ações destrutivas devem nomear com precisão o elemento afetado: \"Excluir conta\".", "Indique atalhos no padrão da plataforma: \"⌘E\" no Mac ou \"Ctrl+E\" no Windows.", "Agrupe ações afins com rótulos concisos: \"Ações\", \"Conta\", \"Preferências\"."],
    accessibility: {
      keyboard: "Enter, Espaço ou Seta Baixo no gatilho abrem o menu e focam o primeiro item. Setas Cima e Baixo navegam pelos itens. Seta Direita entra em submenus e Seta Esquerda ou Esc fecham o submenu ou menu. Enter seleciona o item.",
      screenReader: "Gatilho anuncia papel button com aria-haspopup=\"menu\" e aria-expanded. Painel com papel menu e itens com papéis menuitem, menuitemcheckbox ou menuitemradio. Itens marcados expõem aria-checked.",
      focus: "Ao abrir, o foco vai para o primeiro item habilitado. Ao fechar com Esc ou seleção, o foco retorna imediatamente ao gatilho acionador.",
      cautions: "Ações destrutivas como Excluir devem declarar o perigo no próprio texto (critério WCAG 1.4.1), e não depender apenas da cor vermelha. Menus são para ações; para navegar entre páginas, use links.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-border", "bg-destructive", "bg-popover", "text-accent-foreground", "text-destructive", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs", "tracking-widest"] },
      { contexto: "Espaço", itens: ["gap-2", "h-px", "left-2", "min-w-32", "mx-1", "my-1", "p-1", "pl-8", "pr-2", "px-2", "py-1.5", "size-3.5", "size-4"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm"] },
      { contexto: "Sombra", itens: ["shadow-lg", "shadow-md"] },
      { contexto: "Foco", itens: ["outline-ring"] },
    ],
  },
  drawer: {
    description: "Painel deslizante que emerge das bordas da tela sobre uma camada escurecida, ideal para dispositivos móveis. Permite arrastar para fechar ou tocar fora para dispensar.",
    whenToUse: "Ações contextuais ou folhas de opções no celular acessíveis confortavelmente com o polegar. Formulários rápidos ou filtros secundários que complementam o fluxo da tela sem perder o contexto. Menus de compartilhamento ou confirmações intermediárias em telas pequenas.",
    anatomy: [
      { part: "Drawer", description: "Raiz (Vaul), gerencia o ciclo aberto/fechado e a física de arrastar" },
      { part: "DrawerTrigger", description: "Elemento gatilho que abre o painel ao ser acionado" },
      { part: "DrawerPortal", description: "Portal que posiciona o drawer no topo da hierarquia visual" },
      { part: "DrawerOverlay", description: "Camada de fundo semitransparente que escurece o restante da página" },
      { part: "DrawerContent", description: "Painel deslizante com borda e alça visual no topo para direção inferior" },
      { part: "DrawerHeader", description: "Área superior para agrupamento de título e descrição" },
      { part: "DrawerTitle", description: "Título principal da folha, usado como nome acessível" },
      { part: "DrawerDescription", description: "Texto de apoio e contexto associado ao painel" },
      { part: "DrawerFooter", description: "Rodapé para agrupamento de botões de ação e cancelamento" },
      { part: "DrawerClose", description: "Gatilho interno para fechamento da folha" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "Elementos de painel e sobreposição desmontados ou invisíveis" },
      { name: "Aberto", description: "Sobreposição com fade e painel bg-popover com alça em bg-muted" },
      { name: "Arrastando", description: "Posição acompanha o deslocamento do ponteiro ou polegar" },
      { name: "Foco", description: "Anel de foco preservado nos elementos interativos internos" },
    ],
    sizes: [],
    doGuidelines: ["Inclua um botão de fechamento ou cancelamento claro dentro do rodapé da folha.", "Use títulos descritivos para informar sobre qual item a pessoa está agindo.", "Priorize o uso da direção inferior no celular para alcance do polegar."],
    dontGuidelines: ["Usar folha de ações em desktop para formulários densos que cabem melhor em janelas → dialog.", "Depender unicamente do gesto de arrastar para fechar o painel → forneça botão DrawerClose ou Cancelar.", "Empilhar múltiplos drawers uns sobre os outros na tela → navegue entre passos no mesmo contêiner com stepper."],
    code: `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Abrir opções</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Opções do arquivo</DrawerTitle>
      <DrawerDescription>Selecione uma ação para continuar.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Salvar alterações</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    props: [
      { name: "open · onOpenChange (Drawer)", type: "boolean · function", default: "—", description: "Controle de abertura e fechamento do painel" },
      { name: "direction (Drawer)", type: "\"top\" \\ | \"bottom\" \\ | \"left\" \\ | \"right\"", default: "\"bottom\"", description: "Direção da borda de onde o painel desliza" },
      { name: "shouldScaleBackground (Drawer)", type: "boolean", default: "true", description: "Aplica efeito de recuo e escala suave ao fundo da aplicação" },
    ],
    meta: {
      nome: "Drawer",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/drawer.tsx",
      story: "src/components/ui/drawer.stories.tsx",
      vizinhos: ["dialog", "sheet", "popover"],
    },
    whenToUseItems: ["Ações contextuais ou folhas de opções no celular acessíveis confortavelmente com o polegar.", "Formulários rápidos ou filtros secundários que complementam o fluxo da tela sem perder o contexto.", "Menus de compartilhamento ou confirmações intermediárias em telas pequenas."],
    whenNotToUse: ["Janela centralizada modal com foco obrigatório em telas grandes → dialog.", "Painel lateral complexo com formulário longo em desktop → sheet.", "Confirmações simples ou avisos rápidos que não exigem resposta → sonner."],
    content: ["O título deve indicar a tarefa ou o item em foco: \"Filtrar resultados\" ou \"Opções da conta\".", "A descrição deve resumir o impacto da ação em uma frase curta.", "O botão de confirmação deve repetir o verbo de ação e o de cancelar deve ser evidente: \"Aplicar filtros\" e \"Cancelar\"."],
    accessibility: {
      keyboard: "Tab e Shift+Tab navegam entre os controles focáveis no interior do painel. Esc fecha o drawer imediatamente.",
      screenReader: "Papel dialog modal. DrawerTitle fornece o nome acessível e DrawerDescription a descrição. O restante da interface externa recebe aria-hidden=\"true\".",
      focus: "Ao abrir, o foco é transferido para o primeiro elemento interagível dentro de DrawerContent. Ao fechar, o foco é restaurado para o DrawerTrigger.",
      cautions: "A interação de arrastar nunca deve ser o único meio de fechar o painel (critério WCAG 2.5.7). Forneça sempre um botão de fechar (DrawerClose) ou botão Cancelar explícito.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-muted", "bg-popover", "text-foreground", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-semibold", "text-sm"] },
      { contexto: "Espaço", itens: ["bottom-0", "gap-0.5", "gap-1.5", "gap-2", "h-2", "inset-0", "inset-x-0", "inset-y-0", "left-0", "max-w-sm", "mb-24", "mt-24", "mt-4", "p-4", "right-0", "top-0", "w-25", "w-3"] },
      { contexto: "Raio", itens: ["rounded-b-lg", "rounded-full", "rounded-t-lg"] },
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
    description: "Estrutura e gerencia formulários com validação integrada ao React Hook Form. Conecta campos, rótulos, mensagens de erro e atributos acessíveis automaticamente.",
    whenToUse: "Formulários com validação de esquema (como Zod) e múltiplos campos interativos. Telas de cadastro, configuração ou edição de dados que precisam de feedback de erro por campo. Composição de controles complexos que necessitam de sincronização de estado e acessibilidade automática.",
    anatomy: [
      { part: "Form", description: "Provedor de contexto raiz do React Hook Form" },
      { part: "FormField", description: "Controlador de campo que conecta o controle ao estado do formulário" },
      { part: "FormItem", description: "Container que gera identificadores únicos e agrupa os elementos do campo" },
      { part: "FormLabel", description: "Rótulo acessível que indica visualmente o estado de erro" },
      { part: "FormControl", description: "Elemento que injeta atributos ARIA e associa IDs ao controle" },
      { part: "FormDescription", description: "Texto de apoio e instrução auxiliar para o preenchimento" },
      { part: "FormMessage", description: "Exibe a mensagem de validação quando o campo apresenta erro" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Campo limpo ou preenchido sem erros, rótulo neutro e descrição com text-muted-foreground" },
      { name: "Inválido", description: "data-error=true no FormLabel com text-destructive, aria-invalid=true no controle e FormMessage visível em text-destructive" },
      { name: "Foco", description: "O anel de foco visível é delegado ao controle interno agrupado no FormControl" },
    ],
    sizes: [],
    doGuidelines: ["Associe cada controle a um FormField com nome único correspondente ao esquema de validação.", "Forneça instruções em FormDescription para campos com requisitos específicos de formatação.", "Coloque FormMessage logo abaixo de FormControl para manter proximidade entre o erro e o campo."],
    dontGuidelines: ["Usar placeholder como substituto de FormLabel → utilize sempre FormLabel visível para manter a acessibilidade.", "Agrupar campo único sem validação no formulário completo → field.", "Omitir FormMessage em campos obrigatórios → inclua FormMessage para exibir o motivo do erro."],
    code: `import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function Exemplo() {
  const form = useForm({
    defaultValues: {
      nome: "",
    },
  })

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Seu nome completo" {...field} />
            </FormControl>
            <FormDescription>Nome visível no perfil da conta.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}`,
    props: [
      { name: "name (FormField)", type: "string", default: "—", description: "Nome do campo no formulário e caminho no esquema de validação" },
      { name: "control (FormField)", type: "Control", default: "—", description: "Instância de controle retornada por useForm" },
      { name: "render (FormField)", type: "function", default: "—", description: "Função de renderização que recebe o objeto field" },
    ],
    meta: {
      nome: "Form",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/form.tsx",
      story: "src/components/ui/form.stories.tsx",
      vizinhos: ["field", "input-group", "card"],
    },
    whenToUseItems: ["Formulários com validação de esquema (como Zod) e múltiplos campos interativos.", "Telas de cadastro, configuração ou edição de dados que precisam de feedback de erro por campo.", "Composição de controles complexos que necessitam de sincronização de estado e acessibilidade automática."],
    whenNotToUse: ["Agrupar apenas um campo isolado sem validação complexa ou contexto global → field.", "Formulário simples de busca com apenas um campo de texto e botão → input-group.", "Janelas de confirmação rápida que não coletam múltiplos dados → alert-dialog."],
    content: ["Rótulos devem ser concisos e claros, utilizando substantivos ou pequenas frases sem ponto final.", "Textos de ajuda em FormDescription orientam sobre formatos específicos ou regras de preenchimento.", "Mensagens de erro em FormMessage devem explicar como corrigir a falha de validação de forma direta."],
    accessibility: {
      keyboard: "Não recebe foco direto na estrutura do formulário; a navegação por Tab segue a ordem sequencial dos campos internos via FormControl.",
      screenReader: "FormControl vincula o controle a FormDescription e FormMessage via aria-describedby e marca aria-invalid=\"true\" quando houver erro; FormLabel associa-se ao campo via htmlFor.",
      focus: "O foco permanece no controle sob edição; ao submeter com erro, a biblioteca gerencia o redirecionamento para o primeiro campo inválido.",
      cautions: "Evite ocultar FormDescription ou FormMessage apenas visualmente; mantenha os IDs estáveis garantidos por FormItem para assegurar compatibilidade com tecnologias assistivas.",
    },
    tokens: [
      { contexto: "Cor", itens: ["text-destructive", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["text-sm"] },
      { contexto: "Espaço", itens: ["gap-2"] },
    ],
  },
  menubar: {
    description: "Barra horizontal persistente de menus inspirada em aplicações desktop. Oferece acesso consistente e agrupado a comandos globais por categorias e atalhos.",
    whenToUse: "Barras de menus horizontais no topo de aplicativos densos com múltiplos comandos categorizados (ex.: Arquivo, Editar, Exibir). Interfaces ricas em ferramentas desktop que agrupam atalhos de teclado e submenus aninhados. Editores ou ambientes de trabalho complexos que exigem acesso consistente e persistente a comandos globais.",
    anatomy: [
      { part: "Menubar", description: "Barra horizontal raiz que envolve e ancora todos os menus" },
      { part: "MenubarMenu", description: "Cada menu de topo individual agrupado na barra" },
      { part: "MenubarGroup", description: "Container estrutural interno para agrupar itens logicamente" },
      { part: "MenubarPortal", description: "Portal que renderiza os painéis flutuantes fora da hierarquia DOM principal" },
      { part: "MenubarRadioGroup", description: "Agrupamento para opções de seleção única e exclusiva" },
      { part: "MenubarTrigger", description: "Botão gatilho no topo que expande o painel de opções" },
      { part: "MenubarContent", description: "Painel suspenso flutuante com a lista de ações do menu" },
      { part: "MenubarItem", description: "Item de comando interativo para disparar uma ação" },
      { part: "MenubarCheckboxItem", description: "Item de alternância com indicador visual de marcação de seleção" },
      { part: "MenubarRadioItem", description: "Opção exclusiva de rádio com indicador circular de item ativo" },
      { part: "MenubarLabel", description: "Título textual estático para rotular um conjunto de comandos" },
      { part: "MenubarSeparator", description: "Divisor horizontal fino entre grupos de ações" },
      { part: "MenubarShortcut", description: "Texto auxiliar alinhado à direita para exibir atalhos de teclado" },
      { part: "MenubarSub", description: "Raiz de um submenu aninhado de segundo nível" },
      { part: "MenubarSubTrigger", description: "Gatilho que expande o submenu suspenso lateralmente" },
      { part: "MenubarSubContent", description: "Painel flutuante que contém os comandos do submenu" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Barra com fundo bg-background e borda suave; gatilhos e itens em estado de repouso" },
      { name: "Foco", description: "Anel outline-ring de 2 px no gatilho ou item ativo via teclado" },
      { name: "Aberto", description: "data-state=open aplica bg-accent text-accent-foreground no gatilho e exibe o painel animado" },
      { name: "Destrutivo", description: "data-variant=destructive aplica texto e ícone em text-destructive com fundo de destaque no hover" },
      { name: "Desabilitado", description: "data-disabled reduz a opacidade para 50% e desativa cliques e foco" },
    ],
    sizes: [],
    doGuidelines: ["Organize comandos em categorias lógicas e previsíveis para a pessoa usuária.", "Utilize MenubarSeparator para agrupar ações relacionadas e evitar listas contínuas excessivas.", "Indique atalhos de teclado reais e ativos através do componente MenubarShortcut."],
    dontGuidelines: ["Usar menubar para navegação estrutural entre páginas web → navigation-menu.", "Disparar menu único sem categorias agrupadas → dropdown-menu.", "Incluir formulários complexos dentro dos painéis suspensos → dialog."],
    code: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Novo documento <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Abrir... <MenubarShortcut>⌘O</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem variant="destructive">Fechar</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Editar</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    props: [
      { name: "align (MenubarContent)", type: "—", default: "start", description: "Alinhamento horizontal do painel em relação ao gatilho" },
      { name: "alignOffset (MenubarContent)", type: "—", default: "-4", description: "Deslocamento em pixels no eixo de alinhamento" },
      { name: "sideOffset (MenubarContent)", type: "—", default: "8", description: "Distância em pixels entre o painel e o gatilho" },
      { name: "inset (MenubarItem)", type: "boolean", default: "—", description: "Aplica recuo à esquerda para alinhar com itens marcáveis" },
      { name: "variant (MenubarItem)", type: "default · destructive", default: "default", description: "Estilo visual da ação, destacando comandos destrutivos" },
      { name: "inset (MenubarLabel)", type: "boolean", default: "—", description: "Aplica recuo à esquerda no rótulo para alinhamento uniforme" },
      { name: "inset (MenubarSubTrigger)", type: "boolean", default: "—", description: "Aplica recuo à esquerda no gatilho do submenu" },
    ],
    meta: {
      nome: "Menubar",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/menubar.tsx",
      story: "src/components/ui/menubar.stories.tsx",
      vizinhos: ["dropdown-menu", "navigation-menu", "toggle-group"],
    },
    whenToUseItems: ["Barras de menus horizontais no topo de aplicativos densos com múltiplos comandos categorizados (ex.: Arquivo, Editar, Exibir).", "Interfaces ricas em ferramentas desktop que agrupam atalhos de teclado e submenus aninhados.", "Editores ou ambientes de trabalho complexos que exigem acesso consistente e persistente a comandos globais."],
    whenNotToUse: ["Menu único de ações disparado por um botão isolado → dropdown-menu.", "Navegação primária entre páginas e seções do site → navigation-menu.", "Barra de ferramentas para alternância e formatação rápida → toggle-group."],
    content: ["Gatilhos de topo devem usar substantivos curtos no singular (ex.: \"Arquivo\", \"Editar\", \"Exibir\", \"Ajuda\").", "Itens de ação devem iniciar por verbos no infinitivo (ex.: \"Salvar\", \"Imprimir\", \"Desfazer\").", "Evite pontos finais em rótulos, itens e atalhos de teclado."],
    accessibility: {
      keyboard: "Setas direcionais esquerda e direita navegam entre os menus de topo; setas cima e baixo percorrem os itens do painel; Enter ou Espaço aciona; Esc fecha o menu aberto.",
      screenReader: "Papel menubar na raiz, menuitem nos itens, menuitemcheckbox e menuitemradio nos itens marcáveis; aria-haspopup=\"menu\" e aria-expanded indicam menus suspensos.",
      focus: "O foco é gerenciado pelo Radix; ao abrir um menu, o foco move-se para o primeiro item disponível; ao fechar com Esc, retorna ao gatilho correspondente.",
      cautions: "Atalhos exibidos via MenubarShortcut são apenas indicativos visuais; assegure que os manipuladores globais de teclado estejam registrados na aplicação.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-background", "bg-border", "bg-destructive", "bg-popover", "text-accent-foreground", "text-destructive", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs", "tracking-widest"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-2", "h-9", "h-px", "left-2", "min-w-32", "min-w-48", "mx-1", "my-1", "p-1", "pl-8", "pr-2", "px-2", "py-1", "py-1.5", "size-3.5", "size-4"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm"] },
      { contexto: "Sombra", itens: ["shadow-lg", "shadow-md", "shadow-xs"] },
      { contexto: "Foco", itens: ["outline-ring"] },
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
    description: "Menu estruturado para navegação principal em websites e portais. Oferece suporte a links diretos, painéis suspensos ricos e transição animada entre seções.",
    whenToUse: "Cabeçalhos de sites e portais com navegação hierárquica e múltiplos níveis de conteúdo. Menus que combinam links simples e painéis suspensos ricos (mega menus com colunas, imagens e descrições). Navegação desktop primária que exige transições fluidas e posicionamento ancorado sob a barra de cabeçalho.",
    anatomy: [
      { part: "NavigationMenu", description: "Container raiz que agrupa os itens de navegação e pode gerenciar o viewport compartilhado" },
      { part: "NavigationMenuList", description: "Lista horizontal não ordenada que contém os itens de navegação de primeiro nível" },
      { part: "NavigationMenuItem", description: "Cada item individual de navegação na lista" },
      { part: "NavigationMenuTrigger", description: "Botão gatilho que expande o painel de conteúdo e rotaciona o ícone de seta" },
      { part: "NavigationMenuContent", description: "Painel flutuante com suporte a animação de entrada e transição direcional" },
      { part: "NavigationMenuViewport", description: "Janela compartilhada onde os painéis de conteúdo são renderizados com transição de tamanho" },
      { part: "NavigationMenuLink", description: "Link navegável para páginas ou seções, com suporte a estado ativo" },
      { part: "NavigationMenuIndicator", description: "Indicador triangular que aponta para o item atualmente ativo na barra" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Gatilhos em bg-background neutro com texto em text-sm font-medium" },
      { name: "Hover", description: "hover:bg-accent hover:text-accent-foreground nos gatilhos e links navegáveis" },
      { name: "Foco", description: "Anel ring-ring de 3 px visível via teclado (focus-visible:ring-[3px])" },
      { name: "Aberto", description: "data-state=open no gatilho gira o chevron em 180° e exibe o painel correspondente" },
      { name: "Ativo", description: "data-active=true no NavigationMenuLink aplica destaque com bg-accent/50 text-accent-foreground" },
      { name: "Desabilitado", description: "disabled reduz opacidade para 50% e remove eventos de ponteiro" },
    ],
    sizes: [],
    doGuidelines: ["Utilize asChild ao integrar NavigationMenuLink com bibliotecas de roteamento como o Next.js Link.", "Agrupe links relacionados em colunas com títulos claros dentro de NavigationMenuContent.", "Destaque a página atual através da propriedade active no NavigationMenuLink correspondente."],
    dontGuidelines: ["Usar navigation-menu para disparar ações de edição ou mutações de dados → button.", "Implementar menus de contexto rápidos de comandos locais → dropdown-menu.", "Substituir trilhas de localização hierárquica por navegação de menu → breadcrumb."],
    code: `import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[400px] gap-3 p-4">
          <NavigationMenuLink asChild>
            <Link href="/produtos/design-system" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
              <div className="text-sm font-medium leading-none">Design System</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Componentes e tokens para interfaces consistentes.</p>
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/documentacao">Documentação</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    props: [
      { name: "viewport", type: "boolean", default: "true", description: "Habilita o viewport compartilhado para renderizar os painéis suspensos" },
      { name: "asChild (NavigationMenuLink)", type: "boolean", default: "false", description: "Permite compor com links do Next.js delegando as propriedades" },
      { name: "active (NavigationMenuLink)", type: "boolean", default: "false", description: "Marca visualmente o link como página ou seção atualmente ativa" },
    ],
    meta: {
      nome: "Navigation Menu",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/navigation-menu.tsx",
      story: "src/components/ui/navigation-menu.stories.tsx",
      vizinhos: ["menubar", "dropdown-menu", "sidebar"],
    },
    whenToUseItems: ["Cabeçalhos de sites e portais com navegação hierárquica e múltiplos níveis de conteúdo.", "Menus que combinam links simples e painéis suspensos ricos (mega menus com colunas, imagens e descrições).", "Navegação desktop primária que exige transições fluidas e posicionamento ancorado sob a barra de cabeçalho."],
    whenNotToUse: ["Barra de menus persistente de comandos para aplicações desktop densas → menubar.", "Menu suspenso de ações ou comandos disparado por um botão de ação → dropdown-menu.", "Navegação lateral expansível para aplicações com dashboards complexos → sidebar."],
    content: ["Rótulos de gatilho e links devem usar substantivos ou termos curtos e objetivos (ex.: \"Produtos\", \"Recursos\", \"Preços\", \"Documentação\").", "Em painéis ricos, organize os links com títulos claros e descrições curtas de apoio em uma ou duas linhas.", "Mantenha a nomenclatura consistente com a arquitetura de informação do site."],
    accessibility: {
      keyboard: "Tab e Shift+Tab navegam entre os itens principais; setas direcionais percorrem itens dentro de um menu aberto; Enter ou Espaço abre ou aciona o link; Esc fecha o painel.",
      screenReader: "Raiz identificada com papel navigation; gatilhos utilizam aria-expanded e aria-haspopup=\"menu\"; links mantêm semântica navegável nativa.",
      focus: "O foco é gerenciado pelo Radix Navigation Menu; ao fechar o submenu via Esc, o foco retorna ao gatilho correspondente sem perder a posição na página.",
      cautions: "Ao compor NavigationMenuLink com o Link do Next.js, utilize sempre a propriedade asChild para preservar a marcação acessível e os handlers de teclado.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-background", "bg-border", "bg-popover", "text-accent-foreground", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-1", "h-1.5", "h-2", "h-9", "left-0", "ml-1", "mt-1.5", "p-2", "pr-2.5", "px-4", "py-2", "size-4", "top-0", "top-0.25", "w-2"] },
      { contexto: "Raio", itens: ["rounded-md", "rounded-sm", "rounded-tl-sm"] },
      { contexto: "Sombra", itens: ["shadow-md"] },
      { contexto: "Movimento", itens: ["duration-motion-base"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  resizable: {
    description: "Divisão de layout em painéis redimensionáveis e acessíveis com suporte a mouse, toque e teclado. Permite ajustar a proporção entre seções contíguas em layouts complexos.",
    whenToUse: "Ambientes de trabalho com painéis ajustáveis (ex.: editor de código ao lado de visualizador de prévia). Layouts de aplicação com barra lateral colapsável ou redimensionável em relação à área principal. Interfaces de análise de dados com divisão flexível entre tabelas e gráficos comparativos.",
    anatomy: [
      { part: "ResizablePanelGroup", description: "Container raiz que define a direção de divisão (horizontal ou vertical) dos painéis" },
      { part: "ResizablePanel", description: "Painel de conteúdo individual com suporte a proporções e limites percentuais" },
      { part: "ResizableHandle", description: "Divisor arrastável e interativo que separa dois painéis adjacentes" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Divisor fino em bg-border com largura ou altura de 1 px (w-px ou h-px)" },
      { name: "Hover", description: "Área interativa invisível de arraste expande 4 px ao redor do divisor" },
      { name: "Foco", description: "Anel ring-ring de 2 px visível na alça com focus-visible:ring-2" },
      { name: "Arrastando", description: "Cursor de redimensionamento ativo ajustando proporções em tempo real" },
      { name: "Com alça", description: "withHandle=true renderiza uma pastilha central de 16x12 px com ícone de indicador de arraste" },
    ],
    sizes: [],
    doGuidelines: ["Defina minSize nos painéis para evitar que conteúdos essenciais sejam espremidos a zero.", "Use withHandle em divisores horizontais para deixar a área de clique evidente para a pessoa usuária.", "Garanta que o container pai possua dimensões definidas de altura e largura."],
    dontGuidelines: ["Usar resizable para criar divisões visuais puramente estáticas sem ajuste → separator.", "Utilizar resizable em telas móveis pequenas onde painéis lado a lado quebram a leitura → tabs.", "Esconder botões ou ações críticas atrás de painéis colapsáveis sem alternativa de acesso → sheet."],
    code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md rounded-lg border">
  <ResizablePanel defaultSize={40} minSize={20}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold text-sm">Painel 1</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={60} minSize={30}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold text-sm">Painel 2</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    props: [
      { name: "direction (ResizablePanelGroup)", type: "horizontal · vertical", default: "—", description: "Define a orientação de divisão entre os painéis" },
      { name: "defaultSize (ResizablePanel)", type: "number", default: "—", description: "Tamanho percentual inicial ocupado pelo painel no grupo" },
      { name: "minSize (ResizablePanel)", type: "number", default: "—", description: "Tamanho percentual mínimo permitido ao redimensionar" },
      { name: "maxSize (ResizablePanel)", type: "number", default: "—", description: "Tamanho percentual máximo permitido ao redimensionar" },
      { name: "withHandle (ResizableHandle)", type: "boolean", default: "false", description: "Exibe uma alça visual com ícone de arraste no centro do divisor" },
    ],
    meta: {
      nome: "Resizable",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/resizable.tsx",
      story: "src/components/ui/resizable.stories.tsx",
      vizinhos: ["sheet", "separator", "sidebar"],
    },
    whenToUseItems: ["Ambientes de trabalho com painéis ajustáveis (ex.: editor de código ao lado de visualizador de prévia).", "Layouts de aplicação com barra lateral colapsável ou redimensionável em relação à área principal.", "Interfaces de análise de dados com divisão flexível entre tabelas e gráficos comparativos."],
    whenNotToUse: ["Painel lateral sobreposto ou deslizante temporário que abre sobre a tela → sheet.", "Divisão estática entre seções que não necessita de ajuste de tamanho → separator.", "Barra de navegação fixa com largura pré-definida sem necessidade de arraste → sidebar."],
    content: ["Não possui texto próprio. Os textos moram nos painéis e containers agrupados.", "Use aria-label ou aria-valuetext na alça quando for relevante anunciar a finalidade do divisor.", "Mantenha indicadores de conteúdo legíveis mesmo quando o painel for reduzido ao tamanho mínimo."],
    accessibility: {
      keyboard: "O divisor (ResizableHandle) recebe foco; setas esquerda/cima diminuem o painel anterior; setas direita/baixo aumentam; Home e End movem para os limites mínimo e máximo.",
      screenReader: "Papel separator com atributos aria-orientation e aria-valuenow atualizados dinamicamente refletindo a proporção percentual atual.",
      focus: "O foco visual aplica anel ring-ring com focus-visible:ring-2; o foco permanece na alça durante o ajuste por setas.",
      cautions: "Arrastar nunca pode ser o único modo de redimensionamento (WCAG 2.5.7); garanta que a navegação e ajuste via teclado continuem acessíveis e funcionais.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-border"] },
      { contexto: "Espaço", itens: ["h-1", "h-4", "h-px", "inset-y-0", "left-0", "left-1", "w-1", "w-3", "w-px"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  sheet: {
    description: "Painel sobreposto que desliza a partir de uma das bordas da tela. Permite exibir formulários longos, detalhes de itens ou configurações sem perder o contexto da página.",
    whenToUse: "Formulário extenso ou edição com muitos campos que poluiriam um modal centralizado. Painel complementar com detalhes aprofundados, histórico ou filtros avançados de uma listagem. Menus e navegação contextual que demandam área vertical ampla na tela.",
    anatomy: [
      { part: "Sheet", description: "Raiz baseada no Dialog da Radix. Controla o estado de abertura" },
      { part: "SheetTrigger", description: "Elemento gatilho que abre o painel ao ser acionado" },
      { part: "SheetClose", description: "Elemento que fecha o painel ao receber clique" },
      { part: "SheetPortal", description: "Portal que renderiza o painel no final do documento DOM" },
      { part: "SheetOverlay", description: "Fundo semitransparente escuro que cobre o restante da tela" },
      { part: "SheetContent", description: "Container principal que desliza da borda configurada" },
      { part: "SheetHeader", description: "Cabeçalho interno para agrupar título e descrição" },
      { part: "SheetFooter", description: "Rodapé alinhado na base para organizar os botões de ação" },
      { part: "SheetTitle", description: "Título obrigatório que define o nome acessível da janela" },
      { part: "SheetDescription", description: "Descrição complementar vinculada por acessibilidade" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "Painel oculto e desmontado do DOM" },
      { name: "Aberto", description: "Sobreposição escura bg-black/50 e painel com shadow-lg que desliza da borda com transição suave" },
    ],
    sizes: [],
    doGuidelines: ["Forneça um título claro em SheetTitle para identificar o propósito do painel.", "Posicione as ações principais e de cancelamento no SheetFooter.", "Utilize closeLabel para ajustar o texto anunciado no botão de fechar, ou showCloseButton={false} com um SheetClose quando precisar de um botão próprio."],
    dontGuidelines: ["Informações rápidas ou confirmações pontuais → dialog.", "Notificações de status sem formulário → sonner.", "Deixar o painel sem SheetTitle acessível → sheet."],
    code: `import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Filtros avançados</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filtros avançados</SheetTitle>
      <SheetDescription>Refine a listagem de registros por data e status.</SheetDescription>
    </SheetHeader>
    <div className="flex-1 p-4">
      {/* campos de filtro */}
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Cancelar</Button>
      </SheetClose>
      <Button>Aplicar filtros</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>`,
    props: [
      { name: "open · defaultOpen · onOpenChange (Sheet)", type: "boolean · (open: boolean) => void", default: "—", description: "Controle de abertura e fechamento herdado da Radix" },
      { name: "side (SheetContent)", type: "top · right · bottom · left", default: "right", description: "Borda da tela de onde o painel desliza" },
      { name: "showCloseButton (SheetContent)", type: "boolean", default: "true", description: "Exibe o botão com ícone de fechar no canto superior" },
      { name: "closeLabel (SheetContent)", type: "string", default: "Fechar", description: "Texto que o leitor de tela anuncia no botão de fechar" },
    ],
    meta: {
      nome: "Sheet",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/sheet.tsx",
      story: "src/components/ui/sheet.stories.tsx",
      vizinhos: ["dialog", "drawer", "popover"],
    },
    whenToUseItems: ["Formulário extenso ou edição com muitos campos que poluiriam um modal centralizado.", "Painel complementar com detalhes aprofundados, histórico ou filtros avançados de uma listagem.", "Menus e navegação contextual que demandam área vertical ampla na tela."],
    whenNotToUse: ["Tarefa curta e focada com poucos campos → dialog.", "Confirmação simples ou aviso rápido sem formulário → sonner.", "Ações rápidas acionadas pelo polegar no celular → drawer."],
    content: ["Título conciso no imperativo ou substantivo indicando a tarefa: \"Filtrar resultados\" ou \"Editar perfil\".", "A descrição orienta o propósito das opções contidas no painel.", "O botão de confirmação no rodapé repete o verbo principal: \"Aplicar filtros\", não \"OK\".", "Sem ponto final em títulos e rótulos de botões."],
    accessibility: {
      keyboard: "Tab e Shift+Tab navegam entre os elementos interativos presos no painel. Esc fecha o painel.",
      screenReader: "Papel dialog modal. SheetTitle fornece o nome acessível obrigatório e SheetDescription descreve o conteúdo via aria-describedby.",
      focus: "Ao abrir, o foco vai para o primeiro elemento focável dentro do painel. Ao fechar, o foco retorna ao SheetTrigger acionador.",
      cautions: "O botão interno de fechar anuncia \"Fechar\" no leitor de tela. Para outro texto, passe closeLabel em SheetContent; para uma ação com verbo próprio (\"Cancelar\"), use showCloseButton={false} e um SheetClose com esse texto.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-popover", "bg-secondary", "text-foreground", "text-muted-foreground", "text-popover-foreground"] },
      { contexto: "Tipografia", itens: ["font-semibold", "text-sm"] },
      { contexto: "Espaço", itens: ["bottom-0", "gap-1.5", "gap-2", "gap-4", "inset-0", "inset-x-0", "inset-y-0", "left-0", "max-w-sm", "p-4", "right-0", "right-4", "top-0", "top-4", "w-3"] },
      { contexto: "Sombra", itens: ["shadow-lg"] },
      { contexto: "Foco", itens: ["ring-offset-background", "ring-ring"] },
    ],
  },
  sidebar: {
    description: "Barra de navegação lateral para organizar a hierarquia e as seções de um produto. Suporta agrupamento, submenus, estado recolhido em ícones e adaptação mobile em folha deslizante.",
    whenToUse: "Navegação persistente em sistemas web, dashboards e painéis administrativos. Estruturação de muitas seções divididas por módulos, categorias ou projetos. Telas que precisam maximizar a área útil alternando entre expandido e recolhido em ícones.",
    anatomy: [
      { part: "SidebarProvider", description: "Provedor raiz com contexto, atalho e persistência em cookie" },
      { part: "Sidebar · SidebarInset", description: "Estrutura da barra e container do conteúdo principal" },
      { part: "SidebarTrigger · SidebarRail", description: "Botão e trilho interativo para alternar a barra" },
      { part: "SidebarHeader · SidebarFooter", description: "Áreas fixas no topo (marca) e base (perfil)" },
      { part: "SidebarContent · SidebarSeparator", description: "Área de rolagem interna e linha divisória" },
      { part: "SidebarGroup · SidebarGroupContent", description: "Agrupamento semântico e container dos itens" },
      { part: "SidebarGroupLabel · SidebarGroupAction", description: "Rótulo do grupo e botão de ação rápida" },
      { part: "SidebarMenu · SidebarMenuItem", description: "Lista de navegação e item individual" },
      { part: "SidebarMenuButton · SidebarMenuAction", description: "Botão interativo de menu e ação contextual" },
      { part: "SidebarMenuBadge · SidebarMenuSkeleton", description: "Indicador de contagem e placeholder de carga" },
      { part: "SidebarMenuSub · SidebarMenuSubItem · SidebarMenuSubButton", description: "Subnível de menu, item e botão indentado" },
      { part: "SidebarInput", description: "Campo de busca estilizado para a barra lateral" },
    ],
    variants: [
      { name: "Default", value: "default", description: "Botão padrão de navegação com destaque no hover" },
      { name: "Outline", value: "outline", description: "Botão com borda e fundo, para seletores de conta" },
    ],
    states: [
      { name: "Padrão", description: "Texto text-sidebar-foreground sobre fundo bg-sidebar" },
      { name: "Hover", description: "Fundo hover:bg-sidebar-accent e texto em destaque" },
      { name: "Pressionado", description: "Fundo active:bg-sidebar-accent com feedback" },
      { name: "Foco", description: "Anel focus-visible:ring-2 focus-visible:ring-sidebar-ring" },
      { name: "Ativo", description: "Rota ativa com data-[active=true]:bg-sidebar-accent" },
      { name: "Desabilitado", description: "Opacidade com disabled:opacity-50 e sem clique" },
    ],
    sizes: [
      { name: "default", value: "default", description: "32 px — Altura padrão para itens principais" },
      { name: "sm", value: "sm", description: "28 px — Para listas secundárias densas" },
      { name: "lg", value: "lg", description: "48 px — Para cabeçalhos com avatar de equipe" },
    ],
    doGuidelines: ["Use SidebarProvider na raiz para gerenciar estado e cookie.", "Passe a prop tooltip em SidebarMenuButton para a barra recolhida.", "Agrupe itens tematicamente com SidebarGroup e use rótulos descritivos."],
    dontGuidelines: ["Barra lateral para tarefas temporárias ou modais → sheet.", "Ocultar rótulos sem fornecer ícone claro no modo recolhido → sidebar.", "Omitir gatilho visível de alternância em telas intermediárias → sidebar."],
    code: `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Início" isActive>
                <span>Início</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarTrigger />
</SidebarProvider>`,
    props: [
      { name: "defaultOpen (SidebarProvider)", type: "boolean", default: "true", description: "Estado inicial aberto da barra" },
      { name: "open (SidebarProvider)", type: "boolean", default: "—", description: "Estado aberto em modo controlado" },
      { name: "onOpenChange (SidebarProvider)", type: "(open: boolean) => void", default: "—", description: "Callback de mudança de abertura" },
      { name: "side", type: "left · right", default: "left", description: "Lado no desktop" },
      { name: "mobileSide", type: "left · right", default: "—", description: "Lado da folha no celular" },
      { name: "variant", type: "sidebar · floating · inset", default: "sidebar", description: "Estilo visual da barra" },
      { name: "collapsible", type: "offcanvas · icon · none", default: "offcanvas", description: "Modo de colapso" },
      { name: "asChild (SidebarGroupLabel)", type: "boolean", default: "false", description: "Renderiza elemento filho" },
      { name: "asChild (SidebarGroupAction)", type: "boolean", default: "false", description: "Renderiza elemento filho" },
      { name: "asChild (SidebarMenuButton)", type: "boolean", default: "false", description: "Renderiza como Link" },
      { name: "isActive (SidebarMenuButton)", type: "boolean", default: "false", description: "Marca rota atual ativa" },
      { name: "tooltip (SidebarMenuButton)", type: "string · React.ComponentProps<typeof TooltipContent>", default: "—", description: "Dica na barra recolhida" },
      { name: "variant (SidebarMenuButton)", type: "default · outline", default: "default", description: "Variante do botão" },
      { name: "size (SidebarMenuButton)", type: "default · sm · lg", default: "default", description: "Altura do botão" },
      { name: "asChild (SidebarMenuAction)", type: "boolean", default: "false", description: "Renderiza elemento filho" },
      { name: "showOnHover (SidebarMenuAction)", type: "boolean", default: "false", description: "Mostra apenas no hover" },
      { name: "showIcon (SidebarMenuSkeleton)", type: "boolean", default: "false", description: "Mostra ícone no placeholder" },
      { name: "asChild (SidebarMenuSubButton)", type: "boolean", default: "false", description: "Renderiza elemento filho" },
      { name: "size (SidebarMenuSubButton)", type: "sm · md", default: "md", description: "Tamanho do sub-botão" },
      { name: "isActive (SidebarMenuSubButton)", type: "boolean", default: "false", description: "Marca subitem ativo" },
      { name: "mobileTitle", type: "string", default: "Barra lateral", description: "Nome da folha no celular (leitor de tela)" },
      { name: "mobileDescription", type: "string", default: "Exibe a barra lateral no celular.", description: "Descrição da folha (leitor de tela)" },
      { name: "label (SidebarTrigger)", type: "string", default: "Alternar barra lateral", description: "Texto do gatilho (leitor de tela)" },
    ],
    meta: {
      nome: "Sidebar",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/sidebar.tsx",
      story: "src/components/ui/sidebar.stories.tsx",
      vizinhos: ["navigation-menu", "sheet", "breadcrumb"],
    },
    whenToUseItems: ["Navegação persistente em sistemas web, dashboards e painéis administrativos.", "Estruturação de muitas seções divididas por módulos, categorias ou projetos.", "Telas que precisam maximizar a área útil alternando entre expandido e recolhido em ícones."],
    whenNotToUse: ["Navegação horizontal no cabeçalho com poucas seções → navigation-menu.", "Painel temporário para tarefas contextuais ou filtros rápidos → sheet.", "Trilha sequencial de localização em páginas profundas → breadcrumb."],
    content: ["Rótulos curtos em maiúsculas: \"Painel\", \"Relatórios\" ou \"Configurações\".", "Títulos de grupos em caixa alta ou subtítulo curto: \"Geral\", \"Projetos\".", "Sem ponto final em rótulos e itens de navegação."],
    accessibility: {
      keyboard: "Tab e Shift+Tab navegam entre os itens. Ctrl+B (ou Cmd+B) alterna o estado aberto/recolhido. Esc fecha a folha no celular.",
      screenReader: "Itens usam papéis semânticos de botão ou link. Quando recolhida em ícones, os botões exibem tooltip acessível.",
      focus: "Anel de foco visível em cada item navegável. Na versão móvel, o foco fica contido no painel deslizante.",
      cautions: "SidebarTrigger e SidebarRail anunciam \"Alternar barra lateral\"; a folha do celular, \"Barra lateral\". Troque com label, mobileTitle e mobileDescription.",
    },
    tokens: [
      { contexto: "Cor", itens: ["--sidebar-accent", "--sidebar-border", "bg-background", "bg-sidebar", "bg-sidebar-accent", "bg-sidebar-border", "border-sidebar-border", "text-sidebar-accent-foreground", "text-sidebar-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm", "text-xs"] },
      { contexto: "Espaço", itens: ["gap-1", "gap-2", "h-12", "h-4", "h-5", "h-7", "h-8", "inset-2", "inset-y-0", "left-0", "left-1", "left-2", "m-2", "min-h-0", "min-w-0", "min-w-5", "ml-0", "ml-2", "mt-8", "mx-2", "mx-3.5", "p-0", "p-2", "pr-8", "px-1", "px-2", "px-2.5", "py-0.5", "right-0", "right-1", "right-2", "right-3", "right-4", "size-4", "size-7", "top-1", "top-1.5", "top-2.5", "top-3.5", "w-0", "w-0.5", "w-4", "w-5"] },
      { contexto: "Raio", itens: ["rounded-lg", "rounded-md", "rounded-xl"] },
      { contexto: "Sombra", itens: ["shadow-sm"] },
      { contexto: "Movimento", itens: ["duration-motion-base"] },
      { contexto: "Foco", itens: ["ring-sidebar-ring"] },
    ],
  },
  table: {
    description: "Organiza informações em linhas e colunas para visualização, comparação e consulta estruturada. Conta com contêiner responsivo com rolagem horizontal automática.",
    whenToUse: "Listas densas de dados estruturados para comparação entre atributos: faturas, apólices ou transações. Exibição de registros tabulares com necessidade de cabeçalho descritivo e rodapé de totais. Conjunto de dados homogêneos que se beneficiam de ordenação por coluna e paginação.",
    anatomy: [
      { part: "Table", description: "Contêiner raiz com overflow horizontal que envolve o elemento table" },
      { part: "TableHeader", description: "Seção thead com borda inferior para os títulos das colunas" },
      { part: "TableBody", description: "Seção tbody que agrupa as linhas de dados" },
      { part: "TableFooter", description: "Seção tfoot com fundo bg-muted/50 para totais ou somatórios" },
      { part: "TableRow", description: "Linha tr com transição de cor no hover e estado selecionado" },
      { part: "TableHead", description: "Célula de cabeçalho th com altura de 40 px e alinhamento à esquerda" },
      { part: "TableCell", description: "Célula de dados td com espaçamento interno e suporte a checkbox" },
      { part: "TableCaption", description: "Legenda descritiva caption posicionada abaixo da tabela" },
    ],
    variants: [],
    states: [
      { name: "Padrão", description: "Linhas com borda inferior sutil e fundo transparente" },
      { name: "Hover", description: "Linha ganha fundo hover:bg-muted/50" },
      { name: "Selecionada", description: "Linha com data-[state=selected]:bg-muted" },
      { name: "Expandida", description: "Linha com has-aria-expanded:bg-muted/50" },
    ],
    sizes: [],
    doGuidelines: ["Alinhe textos à esquerda e números ou valores à direita.", "Use TableCaption para fornecer contexto claro sobre os dados.", "Mantenha os títulos das colunas concisos e descritivos."],
    dontGuidelines: ["Usar tabela para construir grades e layouts gerais de página → box.", "Exibir listas de texto simples com apenas uma coluna em formato tabular → list ou item.", "Forçar muitas colunas comprimidas em telas móveis estreitas → card."],
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
      <TableHead>Fatura</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Valor</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV-001</TableCell>
      <TableCell>Pago</TableCell>
      <TableCell className="text-right">R$ 250,00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    props: [
      { name: "children (Table)", type: "React.ReactNode", default: "—", description: "Conteúdo estruturado da tabela com cabeçalho, corpo e rodapé" },
      { name: "className (Table)", type: "string", default: "—", description: "Classes CSS adicionais aplicadas ao elemento table interno" },
      { name: "colSpan · rowSpan (Cell, Head)", type: "number", default: "—", description: "Mescla horizontal ou vertical de células nativas" },
    ],
    meta: {
      nome: "Table",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/table.tsx",
      story: "src/components/ui/table.stories.tsx",
      vizinhos: ["list", "item", "card"],
    },
    whenToUseItems: ["Listas densas de dados estruturados para comparação entre atributos: faturas, apólices ou transações.", "Exibição de registros tabulares com necessidade de cabeçalho descritivo e rodapé de totais.", "Conjunto de dados homogêneos que se beneficiam de ordenação por coluna e paginação."],
    whenNotToUse: ["Layout de página ou organização visual de blocos sem relação tabular → box.", "Lista simples de itens sem comparação direta entre colunas → list ou item.", "Visualização de itens ricos em telas pequenas de celular → card."],
    content: ["Cabeçalhos de coluna curtos e claros com substantivos no singular: \"Fatura\", \"Valor\", \"Status\".", "Alinhe textos à esquerda e valores numéricos ou monetários à direita.", "Use TableCaption para descrever resumidamente o conjunto de dados exibido."],
    accessibility: {
      keyboard: "Células não recebem foco por padrão. Controles interativos dentro das células (como botões, links e checkboxes) seguem a ordem natural do Tab. O contêiner permite navegação horizontal por setas quando há estouro de largura.",
      screenReader: "Utiliza tags HTML semânticas nativas (table, thead, tbody, tfoot, tr, th, td). Leitores de tela associam automaticamente cabeçalhos th às células td. TableCaption fornece o resumo auditivo inicial.",
      focus: "O foco recai exclusivamente sobre elementos interativos internos. Células que possuem checkbox ajustam espaçamento automaticamente para manter alvo adequado.",
      cautions: "Utilize cabeçalhos TableHead em todas as colunas para garantir leitura contextual (WCAG 1.3.1). Nunca monte tabelas sem cabeçalho semântico ou use tabelas apenas para fins de diagramação visual.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-muted", "text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "text-sm"] },
      { contexto: "Espaço", itens: ["h-10", "mt-4", "p-2", "pr-0", "px-2"] },
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
    description: "Confirma uma ação ou exibe um aviso rápido sem interromper a pessoa. Permanece na tela por alguns segundos e desaparece sozinho.",
    whenToUse: "Confirmação de ação concluída ou reversível, como \"Link copiado\" ou \"Mensagem enviada\". Notificação temporária que acompanha o progresso de uma operação assíncrona até o desfecho. Aviso rápido do sistema que não bloqueia o fluxo nem exige intervenção imediata.",
    anatomy: [
      { part: "Toaster", description: "Container montado na raiz da aplicação que gerencia a área e o empilhamento das notificações" },
    ],
    variants: [],
    states: [
      { name: "Entrada", description: "Surge com deslizamento e transição de opacidade na posição configurada" },
      { name: "Visível", description: "Cartão com fundo var(--popover), texto var(--popover-foreground) e borda var(--border)" },
      { name: "Hover", description: "Pausa a contagem regressiva enquanto o cursor estiver sobre a notificação" },
      { name: "Foco", description: "Botões de ação ou de fechar recebem anel de foco visível" },
      { name: "Saída", description: "Desliza para fora da tela e reduz a opacidade ao expirar o tempo" },
    ],
    sizes: [],
    doGuidelines: ["Mantenha a mensagem concisa em até uma linha.", "Ofereça ação \"Desfazer\" para operações destrutivas ou acidentais.", "Reserve o aviso rápido para confirmações pontuais e não impeditivas."],
    dontGuidelines: ["Exibir erros graves que exigem confirmação em aviso temporário → alert-dialog.", "Usar para instruções fixas de formulário ou alertas persistentes de página → alert.", "Colocar textos longos com múltiplos parágrafos dentro da notificação → dialog."],
    code: `import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

// Montado na raiz da aplicação
<Toaster />

// Acionado em eventos ou respostas
toast("Link copiado com sucesso")`,
    props: [
      { name: "position (Toaster)", type: "top-left · top-center · top-right · bottom-left · bottom-center · bottom-right", default: "bottom-right", description: "Posição onde as notificações são exibidas na janela" },
      { name: "richColors (Toaster)", type: "boolean", default: "false", description: "Aplica cores temáticas e contrastantes por tipo de notificação" },
      { name: "duration (Toaster)", type: "number", default: "4000", description: "Tempo padrão de permanência em milissegundos antes de desaparecer" },
      { name: "closeButton (Toaster)", type: "boolean", default: "false", description: "Exibe botão explícito para fechar cada notificação" },
    ],
    meta: {
      nome: "Sonner",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/sonner.tsx",
      story: "src/components/ui/sonner.stories.tsx",
      vizinhos: ["alert", "alert-dialog", "dialog"],
    },
    whenToUseItems: ["Confirmação de ação concluída ou reversível, como \"Link copiado\" ou \"Mensagem enviada\".", "Notificação temporária que acompanha o progresso de uma operação assíncrona até o desfecho.", "Aviso rápido do sistema que não bloqueia o fluxo nem exige intervenção imediata."],
    whenNotToUse: ["Erro impeditivo ou decisão crítica que exige resposta obrigatória da pessoa → alert-dialog.", "Mensagem persistente que precisa permanecer visível junto ao contexto do conteúdo → alert.", "Formulário ou fluxo de múltiplas etapas com entrada de dados → dialog."],
    content: ["Mensagens curtas e diretas em uma linha: \"Link copiado\", \"Arquivo salvo\".", "Verbo no particípio ou passado para confirmar ações já concluídas.", "Ofereça ação rotulada como \"Desfazer\" quando a operação puder ser revertida."],
    accessibility: {
      keyboard: "Notificações não capturam foco automaticamente. Quando há ação interativa, ela fica acessível por navegação de teclado antes de o aviso expirar.",
      screenReader: "Renderizado em região viva com aria-live=\"polite\" ou role=\"status\", informando a mensagem sem interromper a leitura atual.",
      focus: "Não move o foco ao surgir para evitar perda de contexto. Foco retorna ao fluxo normal após o encerramento.",
      cautions: "Garanta tempo de exibição de pelo menos 4 a 6 segundos e pausa ao passar o mouse ou receber foco (WCAG 2.2.1). Nunca confie apenas em avisos rápidos para alertas críticos (WCAG 2.4.11).",
    },
    tokens: [
      { contexto: "Cor", itens: ["--border", "--popover", "--popover-foreground"] },
      { contexto: "Raio", itens: ["--radius"] },
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
    description: "Árvore hierárquica de navegação por pastas e arquivos com expansão e recolhimento animados. Apresenta a estrutura de diretórios e permite selecionar itens.",
    whenToUse: "Navegação por estrutura de pastas, arquivos ou diretórios de projetos em editores e ferramentas de código. Gerenciadores de documentos com hierarquia de múltiplos níveis com subpastas. Painéis de exploração de anexos ou recursos organizados em categorias aninhadas.",
    anatomy: [
      { part: "Files", description: "Contêiner raiz com papel de árvore e acessibilidade via prop label" },
      { part: "Folder", description: "Diretório expansível baseado em Collapsible que controla o estado aberto ou fechado" },
      { part: "FolderTrigger", description: "Botão interativo com ícone de seta giratória e ícone de pasta aberta ou fechada" },
      { part: "FolderContent", description: "Contêiner recolhível com papel de grupo e linha guia vertical de indentação à esquerda" },
      { part: "File", description: "Item folha com papel de item de árvore e indicador de arquivo ativo" },
    ],
    variants: [],
    states: [
      { name: "Pasta fechada", description: "Seta apontando para a direita com ícone de pasta fechada" },
      { name: "Pasta aberta", description: "Seta girada em 90 graus com ícone de pasta aberta e conteúdo visível" },
      { name: "Arquivo ativo", description: "Fundo de destaque em bg-accent com texto em text-accent-foreground font-medium" },
      { name: "Hover", description: "Fundo suave em hover:bg-accent/70 no gatilho e hover:bg-accent/60 no arquivo" },
      { name: "Foco", description: "Anel de foco em ring-ring com outline-none e recuo visual" },
    ],
    sizes: [],
    doGuidelines: ["Use defaultOpen nas pastas principais para expor os arquivos mais relevantes logo no carregamento.", "Mantenha active no arquivo atualmente aberto ou selecionado pelo usuário.", "Personalize a prop label de Files quando houver mais de uma árvore na mesma página."],
    dontGuidelines: ["Usar estrutura de pastas para seleção de valores em formulários sem relação com arquivos → tree-select.", "Aninhar pastas em mais de quatro níveis sem permitir busca ou atalhos diretos → command.", "Exibir lista simples de arquivos sem diretórios ou hierarquia aninhada → list."],
    code: `import {
  File,
  Files,
  Folder,
  FolderContent,
  FolderTrigger,
} from "@/components/ui/files"

<Files label="Arquivos do projeto">
  <Folder value="src" defaultOpen>
    <FolderTrigger>src</FolderTrigger>
    <FolderContent>
      <File value="index.ts" active />
      <File value="styles.css" />
    </FolderContent>
  </Folder>
</Files>`,
    props: [
      { name: "value (Folder, File)", type: "string", default: "—", description: "Identificador exclusivo do nó da árvore" },
      { name: "icon (FolderTrigger, File)", type: "React.ReactNode", default: "—", description: "Ícone customizado que substitui a pasta ou arquivo padrão" },
      { name: "label (Files)", type: "string", default: "Navegador de arquivos", description: "Nome acessível da árvore informado via aria-label" },
      { name: "defaultOpen (Folder)", type: "boolean", default: "false", description: "Define se a pasta inicia aberta por padrão" },
      { name: "active (File)", type: "boolean", default: "false", description: "Destaca visualmente o arquivo selecionado com fundo e peso de fonte" },
    ],
    meta: {
      nome: "Files",
      camada: "organism",
      status: "piloto",
      codigo: "src/components/ui/files.tsx",
      story: "src/components/ui/files.stories.tsx",
      vizinhos: ["tree-select", "list", "collapsible"],
    },
    whenToUseItems: ["Navegação por estrutura de pastas, arquivos ou diretórios de projetos em editores e ferramentas de código.", "Gerenciadores de documentos com hierarquia de múltiplos níveis com subpastas.", "Painéis de exploração de anexos ou recursos organizados em categorias aninhadas."],
    whenNotToUse: ["Seleção de uma opção em lista hierárquica dentro de um formulário → tree-select.", "Lista simples e plana de itens ou arquivos sem níveis de aninhamento → list.", "Seção única expansível de conteúdo sem múltiplos arquivos ou diretórios → collapsible."],
    content: ["Nomes de arquivos e pastas devem ser objetivos e refletir os nomes reais ou extensões: \"index.ts\", \"components\".", "Quando o arquivo não contiver filhos, a prop value é usada como o texto visível padrão.", "Ícones específicos por tipo de arquivo auxiliam na identificação rápida de formatos conhecidos."],
    accessibility: {
      keyboard: "Tab e Shift+Tab navegam entre os itens interativos da árvore. Enter ou Espaço no gatilho da pasta alternam entre aberto e fechado. No arquivo, Enter ou clique selecionam o item.",
      screenReader: "Raiz com papel tree e aria-label descritivo. Pastas utilizam Collapsible com aria-expanded para comunicar se a pasta está aberta ou fechada. Cada subnível de nós filhos fica dentro de um role=\"group\". Arquivos possuem role=\"treeitem\".",
      focus: "O anel de foco visível destaca a pasta (FolderTrigger) ou o arquivo (File) ativo durante a navegação.",
      cautions: "A prop label na raiz Files fornece o nome acessível essencial para tecnologias assistivas. Forneça sempre um rótulo significativo ao contexto em que a árvore está inserida.",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "border-border", "text-accent-foreground", "text-foreground", "text-muted-foreground"] },
      { contexto: "Tipografia", itens: ["font-medium", "font-sans", "text-sm"] },
      { contexto: "Espaço", itens: ["gap-0.5", "gap-1.5", "gap-2", "pl-1.5", "pl-4", "pr-1", "px-2", "py-0.5", "py-1", "py-1.5", "size-4"] },
      { contexto: "Raio", itens: ["rounded-md"] },
      { contexto: "Movimento", itens: ["duration-motion-base", "duration-motion-fast", "ease-spring"] },
      { contexto: "Foco", itens: ["ring-ring"] },
    ],
  },
  "speed-dial": {
    description: "Botão de ação flutuante que se expande em uma sequência de ações secundárias relacionadas. Permite acessar comandos rápidos sem ocupar espaço permanente na tela.",
    whenToUse: "Ações secundárias frequentes em telas operacionais ou móveis, como Compartilhar, Copiar e Imprimir. Comandos contextuais rápidos agrupados em um único ponto de contato flutuante. Interface onde o espaço visual precisa ficar livre até a pessoa solicitar as opções.",
    anatomy: [
      { part: "SpeedDial", description: "Contêiner raiz com controle de abertura, clique fora e navegação por teclado" },
      { part: "Gatilho principal", description: "Botão flutuante com ícone que rotaciona em 45 graus quando aberto" },
      { part: "Menu flutuante", description: "Lista de botões de ação com animação escalonada na direção configurada" },
    ],
    variants: [],
    states: [
      { name: "Fechado", description: "Gatilho em bg-primary, text-primary-foreground e ícone com rotação zero" },
      { name: "Aberto", description: "Ícone do gatilho rotaciona 45 graus e botões secundários surgem com atraso escalonado" },
      { name: "Hover", description: "Gatilho muda para bg-primary/90; botões de ação ganham bg-accent e text-accent-foreground" },
      { name: "Pressionado", description: "Aplica redução de escala com active:scale-(--scale-pressed)" },
      { name: "Foco", description: "Anel visível com focus-visible:ring-2 focus-visible:ring-ring" },
      { name: "Desabilitado", description: "Botão de ação com disabled:opacity-50 e sem resposta a cliques" },
    ],
    sizes: [],
    doGuidelines: ["Limite a quantidade de ações secundárias entre 3 e 5 itens para facilitar o alcance.", "Defina rótulos textuais claros e acionáveis para todas as opções secundárias.", "Posicione o gatilho em canto livre da tela sem sobrepor áreas essenciais de leitura."],
    dontGuidelines: ["Usar como substituto para uma barra de ferramentas com muitas opções fixas → toggle-group.", "Utilizar para acionar apenas um comando isolado sem ações filhas → button ou icon-button.", "Agrupar ações hierárquicas densas ou aninhadas em botão flutuante → dropdown-menu."],
    code: `import { SpeedDial } from "@/components/ui/speed-dial"
import { Icon } from "@/components/ui/icon"

<SpeedDial
  direction="up"
  triggerLabel="Ações rápidas"
  actionButtons={[
    {
      key: "compartilhar",
      label: "Compartilhar",
      icon: <Icon name="share" size={1} className="size-4" />,
      action: () => {},
    },
    {
      key: "imprimir",
      label: "Imprimir",
      icon: <Icon name="print" size={1} className="size-4" />,
      action: () => {},
    },
  ]}
/>`,
    props: [
      { name: "actionButtons", type: "SpeedDialAction[]", default: "—", description: "Lista de ações secundárias com ícone, rótulo e manipulador" },
      { name: "direction", type: "up · down · left · right", default: "up", description: "Direção para onde as ações secundárias se expandem" },
      { name: "triggerLabel", type: "string", default: "Ações rápidas", description: "Rótulo acessível anunciado para o botão gatilho" },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Estado inicial de abertura quando não controlado" },
      { name: "open · onOpenChange", type: "boolean · (open: boolean) => void", default: "—", description: "Estado controlado de abertura do menu" },
    ],
    meta: {
      nome: "Speed Dial",
      camada: "molecule",
      status: "piloto",
      codigo: "src/components/ui/speed-dial.tsx",
      story: "src/components/ui/speed-dial.stories.tsx",
      vizinhos: ["button", "icon-button", "dropdown-menu", "split-button"],
    },
    whenToUseItems: ["Ações secundárias frequentes em telas operacionais ou móveis, como Compartilhar, Copiar e Imprimir.", "Comandos contextuais rápidos agrupados em um único ponto de contato flutuante.", "Interface onde o espaço visual precisa ficar livre até a pessoa solicitar as opções."],
    whenNotToUse: ["Apenas uma ação principal direta sem variações secundárias → button ou icon-button.", "Ação principal acompanhada de menu de opções acoplado em linha → split-button.", "Lista extensa de opções ou comandos hierárquicos em menus estruturados → dropdown-menu."],
    content: ["Rótulo descritivo obrigatório em cada ação de actionButtons: \"Compartilhar\", \"Imprimir\".", "Comece os rótulos de ações sempre com verbos de ação no infinitivo.", "Mantenha triggerLabel claro e em português: \"Ações rápidas\" ou \"Novo registro\"."],
    accessibility: {
      keyboard: "Tab foca o gatilho principal. Espaço ou Enter abre o menu. Setas direcionais navegam entre as ações filhas no eixo da expansão. Escape fecha o menu e devolve o foco ao botão principal.",
      screenReader: "Gatilho possui aria-haspopup=\"menu\", aria-expanded e aria-label configurado por triggerLabel. O contêiner de opções possui role=\"menu\" e cada item possui role=\"menuitem\" com texto em .sr-only.",
      focus: "Ao fechar via teclado (Escape) ou ao disparar uma ação, o foco retorna imediatamente ao gatilho principal.",
      cautions: "Forneça sempre ícones com significados reconhecíveis e garanta rótulos textuais claros em todas as ações secundárias (WCAG 1.3.1, 4.1.2).",
    },
    tokens: [
      { contexto: "Cor", itens: ["bg-accent", "bg-background", "bg-primary", "border-border", "text-accent-foreground", "text-foreground", "text-primary-foreground"] },
      { contexto: "Espaço", itens: ["gap-2", "left-1", "mb-3", "ml-3", "mr-3", "mt-3", "size-10", "size-11", "size-4", "size-5", "top-1"] },
      { contexto: "Raio", itens: ["rounded-lg", "rounded-xl"] },
      { contexto: "Sombra", itens: ["shadow-md", "shadow-sm"] },
      { contexto: "Movimento", itens: ["--motion-duration-base", "--motion-ease-spring", "--scale-pressed", "duration-motion-base", "duration-motion-fast", "ease-spring"] },
      { contexto: "Foco", itens: ["ring-offset-background", "ring-ring"] },
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
