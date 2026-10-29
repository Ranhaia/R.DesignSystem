// Execução em paralelo: um worktree por História, o AGY executa em cada um, o orquestrador (Claude Opus)
// despacha, revisa o diff e integra. Fluxo e regras em docs/active/decisoes/paralelo-agy-worktree.md.
//   node scripts/paralelo.mjs plano <slug...>      ondas (quem roda junto, quem espera, quem não entra)
//   node scripts/paralelo.mjs criar <slug...>      worktree + brief + comando do AGY, só da 1ª onda
//   node scripts/paralelo.mjs despachar <slug>     reimprime o comando do AGY
//   node scripts/paralelo.mjs status               worktrees, commits à frente, trava de navegador
//   node scripts/paralelo.mjs limpar <slug>        move para C:\dev\_pode-apagar (nada se apaga)
import { execFileSync } from "node:child_process"
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs"
import { homedir } from "node:os"
import { basename, join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { ARQUIVO_TRAVA } from "./a11y-trava.mjs"

const PODE_APAGAR = "C:/dev/_pode-apagar"
const g = (cwd, ...args) =>
  execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
const barra = (p) => p.replace(/\\/g, "/")
// Data local, não UTC: em UTC-3 o dia UTC já virava às 21h e as pastas de descarte saíam com a data do dia seguinte.
export const dataLocal = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

function secao(corpo, nome) {
  const m = corpo.match(new RegExp(`^## ${nome}[^\\n]*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "m"))
  return m ? m[1].trim() : ""
}

export function lerHistorias(dir) {
  return readdirSync(dir)
    .filter((f) => /^H-.+\.md$/.test(f))
    .map((f) => {
      const texto = readFileSync(join(dir, f), "utf8").replace(/\r\n/g, "\n")
      const [, cabeca, corpo] = texto.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? []
      const fm = {}
      const listas = {}
      let chave
      for (const linha of (cabeca ?? "").split("\n")) {
        const kv = linha.match(/^([\w-]+):\s*(.*)$/)
        if (kv) {
          chave = kv[1]
          fm[chave] = kv[2].trim()
        }
        const item = linha.match(/^\s+-\s+"?\[\[H-([^\]|]+)\]\]/)
        if (item && chave) (listas[chave] ??= []).push(item[1])
      }
      return {
        slug: f.slice(2, -3),
        titulo: corpo?.match(/^# (.+)$/m)?.[1] ?? f,
        status: fm.status ?? "",
        sinal: fm.sinal ?? "",
        dono: fm.dono ?? "",
        bloqueadaPor: listas["bloqueada-por"] ?? [],
        plano: secao(corpo ?? "", "Plano"),
        tarefas: [...secao(corpo ?? "", "Tarefas").matchAll(/^- \[ \] (.+)$/gm)].map((m) => m[1]),
      }
    })
}

// Onda 0 roda junto; cada onda seguinte espera a anterior ser integrada (protocolo: sequência = bloqueada-por).
export function ondas(historias, slugs) {
  const por = new Map(historias.map((h) => [h.slug, h]))
  const fora = []
  const candidatos = new Set()
  for (const s of slugs) {
    const h = por.get(s)
    const motivo = !h
      ? "não existe em _trabalho/"
      : ["entregue", "descartado"].includes(h.status)
        ? `já está ${h.status}`
        : h.sinal.includes("🟡")
          ? h.sinal
          : h.dono
            ? `dono: ${h.dono}`
            : ""
    if (motivo) fora.push({ slug: s, motivo })
    else candidatos.add(s)
  }
  const memo = new Map()
  const nivel = (s, pilha) => {
    if (memo.has(s)) return memo.get(s)
    let r = { n: 0 }
    if (pilha.includes(s)) r = { motivo: `ciclo de bloqueios em ${s}` }
    else
      for (const b of por.get(s).bloqueadaPor) {
        const hb = por.get(b)
        if (hb?.status === "entregue") continue
        const rb = candidatos.has(b) ? nivel(b, [...pilha, s]) : { motivo: true }
        if (rb.motivo) {
          r = { motivo: `bloqueada por ${b} (${hb ? `${hb.status}, ${hb.sinal}` : "não existe"})` }
          break
        }
        r.n = Math.max(r.n, rb.n + 1)
      }
    memo.set(s, r)
    return r
  }
  const lista = []
  for (const s of candidatos) {
    const r = nivel(s, [])
    if (r.motivo) fora.push({ slug: s, motivo: r.motivo })
    else (lista[r.n] ??= []).push(s)
  }
  return { ondas: lista.filter(Boolean), fora }
}

export function montarBrief(h, { branch, worktree }) {
  return `# Missão: ${h.titulo}

Você é o AGY (implementer) num worktree isolado do R.DS (Next.js + shadcn/ui + Tailwind v4). O orquestrador
(Claude Opus) revisa o diff e integra; outras Histórias rodam em paralelo em outros worktrees.

- Worktree: ${barra(worktree)}
- Branch: ${branch} (criada do origin/main; commite aqui)
- História: _trabalho/H-${h.slug}.md

## Plano

${h.plano}

## Tarefas

${h.tarefas.map((t) => `- [ ] ${t}`).join("\n")}

## Regras

1. Leia \`CLAUDE.md\` e \`AGENTS.md\` do worktree antes de editar. Valem "Só token, num lugar só" (nada de px/rem
   fixo) e a tabela "Mudou X → atualize Y", no mesmo commit.
2. Edite só o que esta História pede. No quadro, só \`_trabalho/H-${h.slug}.md\`: marque a tarefa e acrescente uma
   linha em \`## Contribuições\` por tarefa concluída, com o comando rodado e o resultado.
3. Não decida escopo, texto visível, fluxo nem nome de interface. Bateu numa decisão: pare essa tarefa, ponha
   \`sinal: 🟡 Aguardando definição\` e um pré-requisito \`Decisão\` com opções A/B e recomendação
   (formato em C:\\dev\\_protocolo\\PROTOCOLO.md), e siga para outra tarefa.
4. Antes de entregar, rode \`npx tsc --noEmit\` e \`npm run test:unit\`. NUNCA rode \`test:a11y\`, \`test:a11y:todos\`,
   Storybook test nem vitest de navegador: cada Chromium come ~830 MB e a máquina roda uma execução por vez.
   Quem roda é o orquestrador. Não suba servidor dev.
5. Commite no branch, em português, um commit por tarefa. Não faça push, merge nem rebase, e não toque fora do
   worktree. Não rode npm install/uninstall: o node_modules é compartilhado com os outros worktrees; se faltar
   dependência, registre como Decisão.
6. Leitura de código não é prova. Se só deu para conferir lendo, escreva isso com essas palavras.

## Entrega

Resumo do diff, comandos rodados com o resultado, escolhas relevantes que você fez, pendências e o que não verificou.
`
}

export function comandoAgy({ worktree, brief, companion }) {
  return `cd "${barra(worktree)}" && node "${barra(companion)}" implement --prompt-file "${barra(brief)}"`
}

export function criarWorktree({ repo, slug, base = "origin/main" }) {
  const caminho = join(repo, ".worktrees", slug)
  const branch = `feat/${slug}`
  if (existsSync(caminho)) throw new Error(`worktree ${slug} já existe em ${caminho}`)
  g(repo, "fetch", "origin", "--quiet") // o main local costuma estar atrás: nasce sempre do origin
  g(repo, "worktree", "add", "--no-track", caminho, "-b", branch, base)
  const nm = join(repo, "node_modules")
  if (existsSync(nm)) symlinkSync(realpathSync(nm), join(caminho, "node_modules"), "junction")
  if (existsSync(join(repo, ".env.local"))) copyFileSync(join(repo, ".env.local"), join(caminho, ".env.local"))
  return { caminho, branch }
}

// shortcut: PR por squash que apagou a branch remota é recusado (não dá para provar que o conteúdo está no origin);
// dar push de novo da branch ou mover à mão, quando isso virar rotina.
export function limparWorktree({ repo, slug, podeApagar = PODE_APAGAR, projeto = "R.DS", hoje = dataLocal() }) {
  const caminho = join(repo, ".worktrees", slug)
  const branch = `feat/${slug}`
  if (!existsSync(caminho)) throw new Error(`worktree ${slug} não existe`)
  if (g(caminho, "status", "--porcelain")) throw new Error(`${slug} tem mudança não commitada; commite ou descarte antes`)
  g(repo, "fetch", "origin", "--quiet")
  if (g(caminho, "rev-list", "--count", "origin/main..HEAD") !== "0") {
    try {
      g(caminho, "merge-base", "--is-ancestor", "HEAD", `origin/${branch}`)
    } catch {
      throw new Error(`${slug} tem commits que não estão no origin; dê push antes de limpar`)
    }
  }
  const nm = join(caminho, "node_modules")
  if (existsSync(nm) && lstatSync(nm).isSymbolicLink()) unlinkSync(nm) // solta a junction sem tocar no depósito
  const destino = join(podeApagar, `${hoje}_${projeto}_worktree-${slug}`)
  if (existsSync(destino)) throw new Error(`${destino} já existe`)
  mkdirSync(podeApagar, { recursive: true })
  renameSync(caminho, destino)
  g(repo, "worktree", "prune")
  const indice = join(podeApagar, "INDICE.md")
  const velho = existsSync(indice) ? readFileSync(indice, "utf8") : ""
  const linha = `| ${hoje} | ${basename(destino)} | ${barra(caminho)} | worktree da branch ${branch} (${projeto}) | trabalho já está no Git: sem commits novos ou branch no origin |\n`
  writeFileSync(indice, velho + (velho && !velho.endsWith("\n") ? "\n" : "") + linha)
  return { destino, branch }
}

function achaCompanion() {
  const base = join(homedir(), ".claude", "plugins", "cache", "agy-staff", "agy")
  const versao = readdirSync(base).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).at(-1)
  return join(base, versao, "companion", "agy-companion.mjs")
}

function status(repo) {
  for (const l of g(repo, "worktree", "list", "--porcelain").split("\n\n")) {
    const caminho = l.match(/^worktree (.+)$/m)?.[1]
    if (!caminho || !barra(caminho).includes("/.worktrees/")) continue
    const sujo = g(caminho, "status", "--porcelain").split("\n").filter(Boolean).length
    const aFrente = g(caminho, "rev-list", "--count", "origin/main..HEAD")
    console.log(`${basename(caminho)}  ${l.match(/^branch refs\/heads\/(.+)$/m)?.[1]}  ${aFrente} commit(s) à frente, ${sujo} arquivo(s) sujo(s)`)
  }
  const trava = existsSync(ARQUIVO_TRAVA) ? `ocupada (PID ${readFileSync(ARQUIVO_TRAVA, "utf8")})` : "livre"
  console.log(`trava de testes de navegador: ${trava}`)
}

function cli([cmd, ...slugs]) {
  const repo = resolve(g(process.cwd(), "rev-parse", "--path-format=absolute", "--git-common-dir"), "..")
  const historias = () => lerHistorias(join(repo, "_trabalho"))
  if (cmd === "status") return status(repo)
  if (cmd === "limpar") return console.log(limparWorktree({ repo, slug: slugs[0] }))
  if (cmd === "despachar") {
    const brief = join(repo, ".worktrees", `${slugs[0]}.brief.md`)
    return console.log(comandoAgy({ worktree: join(repo, ".worktrees", slugs[0]), brief, companion: achaCompanion() }))
  }
  if (cmd !== "plano" && cmd !== "criar") throw new Error("uso: paralelo.mjs plano|criar|despachar|status|limpar [slug...]")
  const hs = historias()
  const r = ondas(hs, slugs)
  r.ondas.forEach((o, i) => console.log(`onda ${i + 1}${i ? " (espera a anterior ser integrada)" : ""}: ${o.join(", ")}`))
  r.fora.forEach((f) => console.log(`fora: ${f.slug} — ${f.motivo}`))
  if (cmd === "plano" || !r.ondas.length) return
  for (const slug of r.ondas[0]) {
    const { caminho, branch } = criarWorktree({ repo, slug })
    const brief = join(repo, ".worktrees", `${slug}.brief.md`)
    writeFileSync(brief, montarBrief(hs.find((h) => h.slug === slug), { branch, worktree: caminho }))
    console.log(`\n${slug}: ${barra(caminho)}\n${comandoAgy({ worktree: caminho, brief, companion: achaCompanion() })}`)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) cli(process.argv.slice(2))
