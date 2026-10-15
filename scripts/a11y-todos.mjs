// Roda os 10 contextos do Storybook em lotes de LOTE contextos, um processo vitest por lote.
// Um vitest só fecha os Chromium no fim da execução inteira, então lote em processo separado é o
// que garante que os navegadores do lote anterior morreram antes de abrir os próximos.
import { spawnSync } from "node:child_process"
import { mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { runnerImport } from "vite"
import { LOTE, pegarTrava } from "./a11y-trava.mjs"

try {
  pegarTrava()
} catch (e) {
  console.error(e.message)
  process.exit(1)
}
process.on("SIGINT", () => process.exit(130))

const { module: ctx } = await runnerImport("./src/lib/a11y/contexto-story.ts")
const { module: tokens } = await runnerImport("./src/lib/a11y/css-tokens.ts")
const nomes = tokens.CONTEXTOS.map(ctx.nomeProjeto)

const parcial = mkdtempSync(join(tmpdir(), "a11y-parcial-"))
const env = { ...process.env, A11Y_DONO: String(process.pid), A11Y_PARCIAL: parcial }
let pior = 0
for (let i = 0; i < nomes.length; i += LOTE) {
  const lote = nomes.slice(i, i + LOTE)
  console.log(`\n[a11y] lote ${i / LOTE + 1}: ${lote.join(", ")}`)
  const args = ["vitest", "run", ...lote.flatMap((n) => ["--project", n])]
  const r = spawnSync("npx", args, { stdio: "inherit", shell: true, env })
  pior = Math.max(pior, r.status ?? 1)
}
rmSync(parcial, { recursive: true, force: true })
process.exit(pior)
