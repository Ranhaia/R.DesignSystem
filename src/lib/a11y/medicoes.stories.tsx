import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { contextoDosGlobals, regrasAxe } from './contexto-story'

const meta: Meta = {
  title: 'Testes/A11y medições',
  parameters: { a11yMedir: false }, // fixtures das próprias medições não entram no relatório
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
