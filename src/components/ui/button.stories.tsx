import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Download, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import ButtonAsChild from "@/components/examples/button-as-child"
import ButtonLoading from "@/components/examples/button-loading"
import ButtonRounded from "@/components/examples/button-rounded"
import ButtonSize from "@/components/examples/button-size"
import ButtonDemo from "@/components/examples/button-demo"

// Piloto de story pro modelo híbrido (catálogo no Storybook, Jornadas no
// Next.js). argTypes usa as mesmas opções reais já verificadas contra
// button.tsx em src/lib/component-docs.ts — não deixamos só na inferência
// automática do docgen pra garantir que bate 1:1 com o componente de
// verdade.
const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    // Prop estrutural (troca <button> por <Slot.Root> via radix-ui pra
    // composição com asChild, ex: <Button asChild><Link/></Button>) — não é
    // um valor pra ficar trocando ao vivo no controle, então tirei da
    // tabela/controles pra não poluir. O docgen do Storybook pega ela
    // automaticamente mesmo sem estar aqui; isso só escapa da UI.
    asChild: {
      table: { disable: true },
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Destructive: Story = { args: { variant: "destructive" } }

export const Link: Story = { args: { variant: "link" } }

export const Disabled: Story = { args: { disabled: true } }

// A partir daqui, a API icon/label (alternativa a children — ver
// button.tsx: nunca dá pra combinar os dois grupos, e o grupo icon/label
// exige pelo menos um dos dois preenchido).
export const IconAndLabel: Story = {
  args: {
    children: undefined,
    icon: <Download />,
    label: "Baixar",
  },
}

export const LabelOnly: Story = {
  args: {
    children: undefined,
    label: "Confirmar",
  },
}

export const IconOnly: Story = {
  args: {
    children: undefined,
    size: "icon",
    icon: <Trash2 />,
    label: undefined,
    "aria-label": "Excluir",
  },
}

// Elevation: no default, hover "desce" o botão (sombra reduz + translateY),
// e o estado disabled remove a sombra e volta a posição neutra.
export const ElevationFeedback: Story = {
  args: {
    children: "Passe o mouse para ver o feedback",
  },
  parameters: {
    docs: {
      description: {
        story:
          "O variant `default` tem uma sombra base que diminui e desloca o botão para baixo no hover, simulando uma \"descida\" física. No disabled, a sombra é removida e a posição volta ao neutro.",
      },
    },
  },
}

export const AsChild: Story = {
  render: () => <ButtonAsChild />,
}

export const Loading: Story = {
  render: () => <ButtonLoading />,
}

export const Rounded: Story = {
  render: () => <ButtonRounded />,
}

export const SizeShowcase: Story = {
  render: () => <ButtonSize />,
}

export const Examples: Story = {
  render: () => <ButtonDemo />,
}
