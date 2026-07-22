import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import AccordionDemo from "@/components/examples/accordion-demo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const meta: Meta<typeof Accordion> = {
  title: "Organisms/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
    },
  },
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-96">
      <AccordionItem value="cobertura">
        <AccordionTrigger>O que a cobertura inclui?</AccordionTrigger>
        <AccordionContent>
          Danos materiais, roubo/furto qualificado e assistência 24h.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="prazo">
        <AccordionTrigger>Qual o prazo de análise do sinistro?</AccordionTrigger>
        <AccordionContent>
          Até 30 dias corridos após o envio de todos os documentos.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="cancelamento">
        <AccordionTrigger>Como cancelar a apólice?</AccordionTrigger>
        <AccordionContent>
          Pelo app, em Conta &gt; Apólices &gt; Cancelar, ou pelo suporte.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {}

export const Multiple: Story = {
  args: { type: "multiple" },
}

export const Examples: Story = {
  render: () => <AccordionDemo />,
}
