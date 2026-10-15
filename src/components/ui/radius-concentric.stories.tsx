// Checker do raio concêntrico: em todo container arredondado com um filho
// arredondado dentro, raio interno = raio externo − distância entre os dois
// (nunca negativo). Raio igual nos dois gera curvas não paralelas (ruído).
// Mede a geometria real (getBoundingClientRect + raio computado), não as
// variáveis CSS, em cada preset de estilo.

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { stylesList } from "@/lib/styles-registry"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

// Só no contexto padrão: a story aninha os 5 presets em wrappers, e com outro preset no <html> o aninhado
// herda o que não redefine (ex.: --border-width do tech), coisa que no app, com o preset só no <html>, não acontece.
const meta: Meta = { title: "Testes/Raio concêntrico", tags: ["so-contexto-padrao"] }
export default meta
type Story = StoryObj

const TOLERANCE = 0.5

function Casos() {
  return (
    <div className="flex flex-col gap-6">
      {stylesList.map((s) => (
        <div key={s.value} data-style={s.value} data-preset={s.value} className="flex flex-col items-start gap-3">
          <Tabs defaultValue="a">
            <TabsList data-case="tabs">
              <TabsTrigger value="a" data-child>Conta</TabsTrigger>
              <TabsTrigger value="b">Senha</TabsTrigger>
            </TabsList>
          </Tabs>
          <SegmentedControl defaultValue="a" data-case="segmented" aria-label="Período">
            <SegmentedControlItem value="a" data-child>Dia</SegmentedControlItem>
            <SegmentedControlItem value="b">Semana</SegmentedControlItem>
          </SegmentedControl>
          <InputGroup data-case="input-button" className="w-64">
            <InputGroupInput placeholder="Buscar" aria-label="Buscar" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton data-child>Ir</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup data-case="input-kbd" className="w-64">
            <InputGroupInput placeholder="Comando" aria-label="Comando" />
            <InputGroupAddon align="inline-end">
              <Kbd data-child>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ))}
    </div>
  )
}

const px = (v: string) => parseFloat(v) || 0

export const Concentrico: Story = {
  render: () => <Casos />,
  play: async ({ canvasElement }) => {
    const falhas: string[] = []
    for (const container of canvasElement.querySelectorAll<HTMLElement>("[data-case]")) {
      const child = container.querySelector<HTMLElement>("[data-child]")!
      const preset = container.closest<HTMLElement>("[data-preset]")!.dataset.preset
      const o = container.getBoundingClientRect()
      const c = child.getBoundingClientRect()
      // canto mais próximo: superior direito para addon inline-end, senão superior esquerdo
      const end = container.dataset.case!.startsWith("input")
      const gap = Math.min(c.top - o.top, end ? o.right - c.right : c.left - o.left)
      // raio efetivo: o navegador limita a metade do lado menor (pílula), mas o
      // estilo computado devolve o valor declarado
      const pill = (r: DOMRect) => Math.min(r.width, r.height) / 2
      const outer = Math.min(px(getComputedStyle(container).borderTopRightRadius), pill(o))
      const inner = Math.min(px(getComputedStyle(child)[end ? "borderTopRightRadius" : "borderTopLeftRadius"]), pill(c))
      const expected = Math.min(Math.max(0, outer - gap), pill(c))
      if (Math.abs(inner - expected) > TOLERANCE) {
        falhas.push(`${preset}/${container.dataset.case}: externo ${outer.toFixed(1)} − distância ${gap.toFixed(1)} = ${expected.toFixed(1)}, interno ${inner.toFixed(1)}`)
      }
    }
    await expect(falhas).toEqual([])
  },
}
