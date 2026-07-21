import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Informações do produto</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Nosso produto principal combina tecnologia de ponta com design
            elegante. Construído com materiais premium, oferece desempenho e
            confiabilidade incomparáveis.
          </p>
          <p>
            Os principais recursos incluem capacidade de processamento
            avançada e uma interface intuitiva projetada tanto para
            iniciantes quanto para especialistas.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Detalhes de envio</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Oferecemos envio para todo o mundo através de parceiros de
            transporte confiáveis. A entrega padrão leva de 3 a 5 dias úteis,
            enquanto o envio expresso garante a entrega em 1 a 2 dias úteis.
          </p>
          <p>
            Todos os pedidos são cuidadosamente embalados e totalmente
            segurados. Acompanhe sua remessa em tempo real através do nosso
            portal de rastreamento dedicado.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Política de devolução</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Garantimos nossos produtos com uma política de devolução
            abrangente de 30 dias. Se você não estiver totalmente satisfeito,
            basta devolver o item em sua condição original.
          </p>
          <p>
            Nosso processo de devolução sem complicações inclui frete de
            devolução gratuito e reembolso total processado em até 48 horas
            após o recebimento do item devolvido.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
