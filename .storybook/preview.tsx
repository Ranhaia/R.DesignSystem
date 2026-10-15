import type { Preview } from '@storybook/nextjs-vite'

import '../src/app/globals.css'
import { stylesList } from '../src/lib/styles-registry'
import { TooltipProvider } from '../src/components/ui/tooltip'
import { aplicarContextoNoHtml, contextoDosGlobals, regrasAxe } from '../src/lib/a11y/contexto-story'
import { nomeContexto } from '../src/lib/a11y/css-tokens'
import { medirAlvos, medirFoco } from '../src/lib/a11y/medir-dom'

// Preset e modo são aplicados diretamente no <html>, exatamente como em src/app/layout.tsx,
// para que as stories vejam a mesma cascata de tokens que a tela real (.dark[data-style=...]).
const preview: Preview = {
  globalTypes: {
    style: {
      description: 'Preset de tokens (Foundations)',
      defaultValue: 'default',
      toolbar: {
        title: 'Estilo',
        icon: 'paintbrush',
        items: stylesList.map((s) => ({ value: s.value, title: s.label })),
        dynamicTitle: true,
      },
    },
    modo: {
      description: 'Modo claro ou escuro (classe .dark no <html>)',
      defaultValue: 'claro',
      toolbar: {
        title: 'Modo',
        icon: 'contrast',
        items: [
          { value: 'claro', title: 'Claro' },
          { value: 'escuro', title: 'Escuro' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      aplicarContextoNoHtml(contextoDosGlobals(context.globals))
      return (
        <div className="antialiased font-sans">
          {/* No app o provider vem do SidebarProvider; sem ele toda story com Tooltip quebra. */}
          <TooltipProvider>
            <Story />
          </TooltipProvider>
        </div>
      )
    },
  ],
  beforeEach: (context) => {
    const regras = regrasAxe(contextoDosGlobals(context.globals))
    if (!regras.length) return
    const a11y = (context.parameters.a11y ??= {})
    a11y.config = { ...a11y.config, rules: [...(a11y.config?.rules ?? []), ...regras] }
  },
  afterEach: async ({ parameters, globals, reporting, viewMode }) => {
    if (parameters.a11yMedir === false || viewMode !== 'story') return
    // Portais (Dialog, Popover, Tooltip) renderizam fora do canvas: mede no body inteiro.
    const alvos = medirAlvos(document.body)
    const focos = await medirFoco(document.body)
    const falhou = [...alvos, ...focos].some((m) => m.resultado === 'reprova')
    reporting.addReport({
      type: 'a11y-medidas',
      version: 1,
      // Fase 2: mede e relata. 'warning' até existir a linha de base (Fase 3), que passa a reprovar o que estiver fora dela.
      status: falhou ? 'warning' : 'passed',
      result: { contexto: nomeContexto(contextoDosGlobals(globals)), alvos, focos },
    })
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // Fase 2 da trava (docs/superpowers/specs/2026-10-14-trava-acessibilidade-design.md): o axe mede e relata.
      // Vira 'error' na Fase 3, junto com a linha de base; antes disso, as 60 stories com violação já
      // existente reprovariam. O resultado completo está em docs/a11y/relatorio-componentes.md.
      test: 'todo',
    },
  },
}

export default preview