// Trava global dos testes de navegador: cada Chromium headless come ~830 MB, e execuções empilhadas
// (10 navegadores + uma 2ª execução) esgotaram os 16 GB da máquina em 15/10/2026.
// O arquivo fica no temp do usuário para valer entre todos os worktrees do repo.
import { readFileSync, unlinkSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

export const MAX_NAVEGADORES = 4
// Contextos por lote no test:a11y:todos. Medido em 15/10/2026: 1 contexto sozinho leva ~35 s; 4 em paralelo
// passaram de 35 min sem terminar (e 2–3 por vez dão timeouts). Um por vez é o mais rápido e o mais leve.
export const LOTE = 1
export const ARQUIVO_TRAVA = join(tmpdir(), "shadcn-local-a11y-vitest.lock")

function vivo(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch (e) {
    return e.code === "EPERM"
  }
}

function dono() {
  try {
    return Number(readFileSync(ARQUIVO_TRAVA, "utf8"))
  } catch {
    return 0
  }
}

// Pega a trava para este processo ou lança erro se outra execução viva já a tem.
// Processos filhos do runner (A11Y_DONO = PID do dono) passam direto.
export function pegarTrava() {
  const atual = dono()
  if (atual && String(atual) === process.env.A11Y_DONO) return
  if (atual && atual !== process.pid && vivo(atual)) {
    throw new Error(
      `[a11y] trava ocupada: já há testes de navegador rodando (PID ${atual}). ` +
        `Espere terminar; rodar junto empilha Chromium e esgota a RAM.`
    )
  }
  if (atual) unlinkSync(ARQUIVO_TRAVA) // trava velha de processo morto
  writeFileSync(ARQUIVO_TRAVA, String(process.pid), { flag: "wx" })
  process.on("exit", () => {
    if (dono() === process.pid) unlinkSync(ARQUIVO_TRAVA)
  })
}
