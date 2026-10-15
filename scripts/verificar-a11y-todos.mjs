// Checker do test:a11y:todos: nunca mais de LOTE Chromium ao mesmo tempo, sem execução simultânea, relatório completo.
// Uso: node scripts/verificar-a11y-todos.mjs   (demora alguns minutos; sai com 0 só se tudo passar)
import { execFileSync, spawn } from "node:child_process"
import { existsSync, statSync, writeFileSync } from "node:fs"
import { LOTE, ARQUIVO_TRAVA } from "./a11y-trava.mjs"

const falhas = []
const ok = (cond, msg) => (cond ? console.log(`  ok   ${msg}`) : (falhas.push(msg), console.log(`  FALHA ${msg}`)))

// Navegador = processo chrome-headless-shell sem --type= (os filhos de renderer/gpu têm --type).
// Filho que está morrendo aparece por um instante com CommandLine vazia: não é navegador, ignora.
// Devolve uma linha por navegador (hora de criação + processo pai) para saber quem abriu cada um.
function listarNavegadores() {
  const out = execFileSync("powershell", ["-NoProfile", "-Command",
    "Get-CimInstance Win32_Process -Filter \"Name='chrome-headless-shell.exe'\" | ? { $_.CommandLine -and $_.CommandLine -notmatch '--type=' } | % { " +
      "$p = Get-CimInstance Win32_Process -Filter \"ProcessId=$($_.ParentProcessId)\"; " +
      "\"$($_.CreationDate.ToString('HH:mm:ss')) pai=$($_.ParentProcessId) $(\"$($p.CommandLine)\".Substring(0, [Math]::Min(140, \"$($p.CommandLine)\".Length)))\" }"],
    { encoding: "utf8" })
  return out.split(/\r?\n/).filter(Boolean)
}
const navegadores = () => listarNavegadores().length

function rodar(cmd, args) {
  const p = spawn(cmd, args, { shell: true, env: process.env })
  let saida = ""
  p.stdout.on("data", (d) => (saida += d))
  p.stderr.on("data", (d) => (saida += d))
  return new Promise((res) => p.on("close", (code) => res({ code, saida })))
}

ok(navegadores() === 0, "nenhum Chromium aberto antes de começar")
if (falhas.length) process.exit(1)

// Trava velha (PID morto) não pode bloquear.
writeFileSync(ARQUIVO_TRAVA, "999999")

const relatorio = "docs/a11y/relatorio-componentes.md"
const inicio = Date.now()
let pico = 0
let noPico = []
const amostrador = setInterval(() => {
  const l = listarNavegadores()
  if (l.length > pico) (pico = l.length), (noPico = l)
}, 1500)

const principal = rodar("npm", ["run", "test:a11y:todos"])

await new Promise((r) => setTimeout(r, 20000))
const segunda = await rodar("npm", ["run", "test:a11y:todos"])
ok(segunda.code !== 0 && /trava/i.test(segunda.saida), "2ª execução do test:a11y:todos é recusada")
const direta = await rodar("npx", ["vitest", "run", "--project", "storybook"])
ok(direta.code !== 0 && /trava/i.test(direta.saida), "vitest direto durante a execução é recusado")

const r = await principal
clearInterval(amostrador)
pico = Math.max(pico, navegadores())
const timeouts = (r.saida.match(/timed out/gi) ?? []).length

console.log(`\n  pico de Chromium simultâneos: ${pico} | exit: ${r.code} | timeouts: ${timeouts} | ${Math.round((Date.now() - inicio) / 1000)}s`)
ok(pico > 0 && pico <= LOTE, `pico de Chromium <= ${LOTE}`)
if (pico > LOTE) console.log(`  navegadores no pico:\n    ${noPico.join("\n    ")}`)
ok(timeouts === 0, "nenhum teste estourou o tempo")
ok(existsSync(relatorio) && statSync(relatorio).mtimeMs > inicio, "relatório dos 10 contextos gravado")
ok(navegadores() === 0, "nenhum Chromium sobrou aberto no fim")
ok(!existsSync(ARQUIVO_TRAVA), "trava liberada no fim")

// Sem trava: vitest direto pedindo os 10 contextos é recusado (empilharia 10 navegadores).
const todosDireto = await rodar("npx", ["vitest", "run", "--project", '"storybook*"'])
ok(todosDireto.code !== 0 && /test:a11y:todos/.test(todosDireto.saida), "vitest direto com os 10 contextos é recusado")
ok(navegadores() === 0, "recusa não abriu Chromium")

if (falhas.length) {
  console.log(`\n${falhas.length} falha(s). Saída do test:a11y:todos (final):\n${r.saida.slice(-3000)}`)
  process.exit(1)
}
console.log("\nTudo certo.")
