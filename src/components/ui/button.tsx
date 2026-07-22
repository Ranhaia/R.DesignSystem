import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-xs hover:translate-y-px disabled:translate-y-0 disabled:shadow-none",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        // Ação de IA com hierarquia (equivalente ao appearance="ai-primary" da
        // Nimbus). Gradiente e cores vêm de tokens reais da Nimbus, definidos
        // em globals.css (--ai-gradient-rest/hover) — ver comentário lá pra
        // fonte exata. Reaproveita o disabled:opacity-50 já global do Button
        // em vez do 3º gradiente (mais claro) que a Nimbus usa pra disabled,
        // pra manter o mesmo comportamento de "desabilitado" em toda a família
        // de variantes deste projeto.
        "ai-primary":
          "text-white shadow-sm [background-image:var(--ai-gradient-rest)] hover:[background-image:var(--ai-gradient-hover)] hover:shadow-xs",
        // Ação de IA complementar (appearance="ai-secondary" da Nimbus).
        "ai-secondary":
          "border border-ai-interactive bg-ai-surface text-ai-text-high shadow-xs hover:bg-ai-surface-highlight hover:border-ai-interactive-hover",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Conteúdo do botão: dois jeitos de preencher.
// 1) `children` livre — cobre asChild (ex: <Button asChild><Link/></Button>),
//    ButtonGroup, Spinner + texto condicional e qualquer composição mais
//    complexa já usada no projeto. Continua funcionando exatamente como
//    antes, sem quebrar nada.
// 2) `icon`/`label` explícitos — pensado pra uso direto (não-asChild). O
//    tipo exige pelo menos um dos três (children/icon/label): nunca dá pra
//    montar um Button sem nenhum dos três (o que resultaria num botão sem
//    nome acessível pra leitor de tela).
//
// 2026-07-22: os outros dois campos de cada variante do union eram `never`
// (mutuamente exclusivos) até essa mesma tarde — trocado pra `React.ReactNode`
// opcional depois de quebrar o build umas 4 vezes seguidas. Motivo: todo
// componente que EMBRULHA Button e repassa filhos/ícone via
// `{...props}` (em vez de children literal entre `<Button>...</Button>`) —
// SidebarTrigger, CarouselPrevious/Next, InputGroupButton, AttachmentAction —
// faz o `children` (ou `icon`/`label`) do chamador externo chegar ao Button
// interno tipado como parte de um objeto genérico, não mais discriminado
// exatamente numa das 3 variantes. Contra um campo `never`, isso sempre dava
// erro de tipo (mesmo com conteúdo real em runtime), forçando eu corrigir
// componente por componente a cada novo caso encontrado. Com os campos como
// opcionais normais, a união continua exigindo pelo menos um dos três
// presentes (um Button 100% vazio ainda é rejeitado), mas sobrevive a esse
// tipo de repasse via spread sem precisar de tratamento especial em cada
// wrapper.
type ButtonContent =
  | { children: React.ReactNode; icon?: React.ReactNode; label?: React.ReactNode }
  | { children?: React.ReactNode; icon: React.ReactNode; label?: React.ReactNode }
  | { children?: React.ReactNode; icon?: React.ReactNode; label: React.ReactNode }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  // fullWidth: equivalente ao prop `fullWidth` da Nimbus (default false lá e
  // aqui). Faz o botão ocupar 100% da largura do container — útil em
  // formulários mobile e folhas/modais de largura total.
  fullWidth = false,
  children,
  icon,
  label,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    fullWidth?: boolean
  } & ButtonContent) {
  const Comp = asChild ? Slot.Root : "button"
  const content = children ?? (
    <>
      {icon}
      {label}
    </>
  )

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full"
      )}
      {...props}
    >
      {content}
    </Comp>
  )
}

// Button.Skeleton: placeholder de carregamento com o mesmo formato do
// Button real (altura por size + cantos), pra evitar layout shift. A Nimbus
// usa um tamanho fixo (width 4.75rem, height 2rem) porque o Button dela não
// tem escala de size própria; aqui, como já temos xs/sm/default/lg, faz mais
// sentido ser size-aware — mantém a decisão "aditiva" de reaproveitar nossa
// própria escala em vez de copiar o valor fixo da Nimbus. Larguras abaixo
// são uma estimativa nossa (não um token Nimbus) pra cobrir o caso comum de
// um botão de texto curto; ajuste via className quando o botão real for
// mais largo.
const skeletonSizeClasses: Record<
  NonNullable<VariantProps<typeof buttonVariants>["size"]>,
  string
> = {
  default: "h-9 w-24 rounded-md",
  xs: "h-6 w-16 rounded-md",
  sm: "h-8 w-20 rounded-md",
  lg: "h-10 w-28 rounded-md",
  icon: "size-9 rounded-md",
  "icon-xs": "size-6 rounded-md",
  "icon-sm": "size-8 rounded-md",
  "icon-lg": "size-10 rounded-md",
}

function ButtonSkeleton({
  className,
  size = "default",
  fullWidth = false,
  ...props
}: React.ComponentProps<"div"> & {
  size?: VariantProps<typeof buttonVariants>["size"]
  fullWidth?: boolean
}) {
  return (
    <Skeleton
      data-slot="button-skeleton"
      className={cn(
        skeletonSizeClasses[size ?? "default"],
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  )
}

// Object.assign (em vez de `Button.Skeleton = ButtonSkeleton`) porque
// `function Button(...)` não tem essa propriedade no seu tipo inferido — TS
// reclamaria na atribuição direta. Object.assign devolve a interseção dos
// dois tipos, então `<Button.Skeleton />` funciona sem cast/any.
const ButtonWithSkeleton = Object.assign(Button, { Skeleton: ButtonSkeleton })

export { ButtonWithSkeleton as Button, buttonVariants }
