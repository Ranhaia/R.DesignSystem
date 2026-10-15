import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

import { CONTEXTOS } from './src/lib/a11y/css-tokens';
import { ehPadrao, nomeProjeto } from './src/lib/a11y/contexto-story';
import ReporterComponentes from './src/lib/a11y/reporter-componentes';

import { MAX_NAVEGADORES, pegarTrava } from './scripts/a11y-trava.mjs';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Vitest só fecha os Chromium no fim da execução: pedir os 10 contextos de uma vez empilha 10 navegadores
// (~8 GB). Na CLI, recusa mais de MAX_NAVEGADORES e pega a trava global contra execuções simultâneas.
// shortcut: só entende `--project nome` com `*`, sem negação (`!`); ampliar se alguém passar a usar.
if (/vitest/.test(process.argv[1] ?? '')) {
  const args = process.argv.slice(2);
  const filtros = args.flatMap((a, i) =>
    a === '--project' ? [args[i + 1]] : a.startsWith('--project=') ? [a.slice(10)] : []
  );
  const casa = (nome: string) =>
    !filtros.length ||
    filtros.some((f) => new RegExp(`^${f.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`).test(nome));
  const navegadores = CONTEXTOS.map(nomeProjeto).filter(casa).length;
  if (navegadores > MAX_NAVEGADORES) {
    throw new Error(
      `[a11y] ${navegadores} contextos pedidos de uma vez abririam ${navegadores} Chromium juntos. ` +
        `Use \`npm run test:a11y:todos\`, que roda um contexto por vez.`
    );
  }
  if (navegadores) pegarTrava();
}

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
      ...CONTEXTOS.map((c) => ({
        extends: true as const,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            initialGlobals: { style: c.preset, modo: c.modo },
            // stories que já percorrem os presets por conta própria (ex.: raio concêntrico) rodam uma vez só
            tags: ehPadrao(c) ? undefined : { include: ['test'], exclude: ['so-contexto-padrao'] },
          }),
        ],
        test: {
          name: nomeProjeto(c),
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
