import type { Preview } from '@storybook/nextjs-vite'

import '../src/app/globals.css'
import { stylesList } from '../src/lib/styles-registry'
import { TooltipProvider } from '../src/components/ui/tooltip'
import { aplicarContextoNoHtml, contextoDosGlobals, regrasAxe } from '../src/lib/a11y/contexto-story'

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
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview