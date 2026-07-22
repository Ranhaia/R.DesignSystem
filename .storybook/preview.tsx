import type { Preview } from '@storybook/nextjs-vite'

import '../src/app/globals.css'
import { stylesList } from '../src/lib/styles-registry'

// Acionamento único de "Foundations" no toolbar do Storybook: reaproveita
// os mesmos 5 presets do StyleSwitcher do app (cada preset já é um pacote
// completo — cor, radius, border-width, sombra, fonte — ver globals.css).
// Trocar aqui muda TODOS os tokens de uma vez, em TODAS as stories/
// componentes ao mesmo tempo, porque o decorator abaixo aplica o mesmo
// atributo data-style que o app usa no <html>, e as regras CSS são
// seletores de atributo — funcionam em qualquer elemento ancestral, não só
// no <html>. Nenhum valor foi inventado aqui: são os presets já existentes
// e aprovados no app real.
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
  },
  decorators: [
    (Story, context) => (
      <div
        data-style={context.globals.style ?? 'default'}
        className="antialiased font-sans"
      >
        <Story />
      </div>
    ),
  ],
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
      test: 'todo'
    }
  },
};

export default preview;