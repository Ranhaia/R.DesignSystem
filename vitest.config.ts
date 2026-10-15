import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

import { CONTEXTOS } from './src/lib/a11y/css-tokens';
import { nomeProjeto } from './src/lib/a11y/contexto-story';
import ReporterComponentes from './src/lib/a11y/reporter-componentes';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  // node_modules aqui é junction pra fora do repo (C:/node_modules_store);
  // sem isso o Vite recusa servir o setup-file do addon-vitest no browser.
  server: { fs: { allow: [dirname, fs.realpathSync(path.join(dirname, 'node_modules'))] } },
  test: {
    reporters: ['default', new ReporterComponentes()],
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
        },
      },
      ...CONTEXTOS.map((c, i) => ({
        extends: true as const,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            initialGlobals: { style: c.preset, modo: c.modo },
          }),
        ],
        test: {
          name: nomeProjeto(c),
          // 10 Chromium juntos estouram o tempo dos testes (670 timeouts em 12 núcleos): 2 contextos por vez, grupos em sequência.
          sequence: { groupOrder: Math.floor(i / 2) },
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' as const }],
          },
        },
      })),
    ],
  },
});
