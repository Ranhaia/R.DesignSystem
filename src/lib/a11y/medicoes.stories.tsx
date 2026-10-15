import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { contextoDosGlobals, regrasAxe } from './contexto-story'
import { medirAlvos, medirFoco } from './medir-dom'

const meta: Meta = {
  title: 'Testes/A11y medições',
  parameters: { a11yMedir: false }, // fixtures das próprias medições não entram no relatório
  // Fundo branco fixo: o resultado esperado de cada fixture não pode depender do preset/modo do projeto (no escuro, contorno preto reprovaria).
  decorators: [(Story) => <div style={{ background: '#fff', padding: '0.5rem' }}><Story /></div>],
}
export default meta

export const Contexto: StoryObj = {
  render: () => <p>contexto</p>,
  play: async ({ globals, parameters }) => {
    const c = contextoDosGlobals(globals)
    const html = document.documentElement
    await expect(html.dataset.style).toBe(c.preset)
    await expect(html.classList.contains('dark')).toBe(c.modo === 'escuro')
    for (const r of regrasAxe(c)) await expect(parameters.a11y?.config?.rules).toContainEqual(r)
  },
}

const box = (w: number, h: number) => ({ width: `${w / 16}rem`, height: `${h / 16}rem` })

export const AlvoGrandePassa: StoryObj = {
  render: () => <button style={box(24, 24)} aria-label="ok" />,
  play: async () => {
    const [m] = medirAlvos()
    await expect(m.resultado).toBe('passa')
    await expect(m.casa).toBe(true)
  },
}

export const AlvoPequenoIsoladoUsaEspacamento: StoryObj = {
  render: () => <button style={box(16, 16)} aria-label="ok" />,
  play: async () => await expect(medirAlvos()[0].resultado).toBe('espacamento'),
}

export const AlvosPequenosColadosReprovam: StoryObj = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <button style={box(16, 16)} aria-label="a" />
      <button style={box(16, 16)} aria-label="b" />
    </div>
  ),
  play: async () => await expect(medirAlvos().map((m) => m.resultado)).toEqual(['reprova', 'reprova']),
}

export const DesabilitadoELinkEmTextoSaoIsentos: StoryObj = {
  render: () => (
    <div>
      <button disabled style={box(10, 10)} aria-label="x" />
      <p>leia <a href="#a">aqui</a> o resto</p>
    </div>
  ),
  play: async () => await expect(medirAlvos().map((m) => m.resultado)).toEqual(['isento', 'isento']),
}

export const FocoComContornoPassa: StoryObj = {
  render: () => <button className="focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-black bg-white p-2">a</button>,
  play: async () => {
    const [f] = await medirFoco()
    await expect(f.resultado).toBe('passa')
    await expect(f.largura).toBeGreaterThanOrEqual(2)
  },
}

export const FocoComAnelPassa: StoryObj = {
  render: () => <button className="outline-none focus-visible:ring-[3px] focus-visible:ring-black bg-white p-2">a</button>,
  play: async () => await expect((await medirFoco())[0].resultado).toBe('passa'),
}

export const FocoSoPorPreenchimentoReprova: StoryObj = {
  render: () => <button className="outline-none focus-visible:bg-black focus-visible:text-white p-2">a</button>,
  play: async () => await expect((await medirFoco())[0].resultado).toBe('reprova'),
}

export const FocoFinoReprova: StoryObj = {
  render: () => <button className="focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-black p-2">a</button>,
  play: async () => await expect((await medirFoco())[0].resultado).toBe('reprova'),
}

export const FocoClaroDemaisReprova: StoryObj = {
  render: () => <div style={{ background: '#fff', padding: '0.5rem' }}><button className="focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[#ddd] p-2">a</button></div>,
  play: async () => await expect((await medirFoco())[0].resultado).toBe('reprova'),
}
export const FocoNoConteinerPassa: StoryObj = {
  // padrão do input-group: o anel fica no contêiner via has-[…:focus-visible]
  render: () => (
    <div className="bg-white p-2 transition-[box-shadow] has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-black">
      <input aria-label="busca" className="outline-none" />
    </div>
  ),
  play: async () => {
    const [f] = await medirFoco()
    await expect(f.resultado).toBe('passa')
    await expect(f.motivo).toBeUndefined()
  },
}

export const FocoEmElementoOcultoMedeIndicadorAtivo: StoryObj = {
  // padrão do input-otp: input invisível delega o foco para o slot com data-active="true"
  render: () => (
    <div style={{ position: 'relative' }}>
      <input
        aria-label="código"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 1,
          color: 'transparent',
          background: 'transparent',
        }}
      />
      <div
        data-active="true"
        className="outline-none ring-[3px] ring-black"
        style={{ width: '2rem', height: '2rem' }}
      >
        1
      </div>
    </div>
  ),
  play: async () => {
    const [f] = await medirFoco()
    await expect(f.resultado).toBe('passa')
    await expect(f.largura).toBeGreaterThanOrEqual(2)
  },
}

