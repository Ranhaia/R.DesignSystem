import { execFileSync } from "node:child_process"
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import {
  comandoAgy,
  criarWorktree,
  dataLocal,
  lerHistorias,
  limparWorktree,
  montarBrief,
  ondas,
} from "../../scripts/paralelo.mjs"

const git = (cwd: string, ...args: string[]) =>
  execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()

function historia(slug: string, fm: Record<string, string | string[]>, plano = "Faça X.") {
  const padrao = { status: "aguardando", sinal: "🟢 Pronto para desenvolver", dono: "", ...fm }
  const linhas = Object.entries(padrao).flatMap(([k, v]) =>
    Array.isArray(v) ? [`${k}:`, ...v.map((b) => `  - "[[${b}]]"`)] : [`${k}: ${v}`]
  )
  return `---\ntipo: historia\n${linhas.join("\n")}\ntarefas: 0/2\n---\n\n# Título ${slug}\n\n## Plano\n\n${plano}\n\n## Pré-requisitos\n\nNenhum.\n\n## Tarefas\n\n- [ ] Primeira\n- [ ] Segunda\n\n## Contribuições\n`
}

function quadro(h: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), "paralelo-quadro-"))
  for (const [slug, texto] of Object.entries(h)) writeFileSync(join(dir, `H-${slug}.md`), texto)
  return dir
}

describe("lerHistorias", () => {
  it("lê estado, bloqueadores, tarefas e plano do frontmatter e do corpo", () => {
    const dir = quadro({ a: historia("a", { "bloqueada-por": ["H-b", "H-c"] }, "Plano do A.") })
    const [h] = lerHistorias(dir)
    expect(h).toMatchObject({
      slug: "a",
      titulo: "Título a",
      status: "aguardando",
      dono: "",
      bloqueadaPor: ["b", "c"],
      plano: "Plano do A.",
      tarefas: ["Primeira", "Segunda"],
    })
    expect(h.sinal).toContain("🟢")
  })
})

describe("ondas", () => {
  const dir = quadro({
    nav: historia("nav", {}),
    valida: historia("valida", {}),
    base: historia("base", { "bloqueada-por": ["H-nav"] }),
    replica: historia("replica", { "bloqueada-por": ["H-valida", "H-narrativo"] }),
    narrativo: historia("narrativo", { sinal: "🟡 Aguardando definição" }),
    pronta: historia("pronta", { status: "entregue" }),
    filha: historia("filha", { "bloqueada-por": ["H-pronta"] }),
    ocupada: historia("ocupada", { dono: "claude" }),
  })
  const hs = lerHistorias(dir)

  it("separa em ondas: quem não tem bloqueador pendente roda junto, o resto espera a onda anterior", () => {
    const r = ondas(hs, ["nav", "valida", "base"])
    expect(r.ondas).toEqual([["nav", "valida"], ["base"]])
    expect(r.fora).toEqual([])
  })

  it("bloqueador já entregue não atrasa a onda", () => {
    expect(ondas(hs, ["filha"]).ondas).toEqual([["filha"]])
  })

  it("deixa fora, com motivo, o que não pode entrar", () => {
    const r = ondas(hs, ["valida", "replica", "narrativo", "pronta", "ocupada", "fantasma"])
    expect(r.ondas).toEqual([["valida"]])
    const motivo = Object.fromEntries(r.fora.map((f: { slug: string; motivo: string }) => [f.slug, f.motivo]))
    expect(motivo.replica).toMatch(/narrativo/)
    expect(motivo.narrativo).toMatch(/Aguardando definição/)
    expect(motivo.pronta).toMatch(/entregue/)
    expect(motivo.ocupada).toMatch(/claude/)
    expect(motivo.fantasma).toMatch(/não existe/)
  })
})

describe("montarBrief e comandoAgy", () => {
  const h = {
    slug: "nav",
    titulo: "Navegação no padrão DS",
    plano: "Reorganizar a sidebar.",
    tarefas: ["Sidebar", "Rotas-índice"],
  }
  const brief = montarBrief(h, { branch: "feat/nav", worktree: "C:/dev/R.DS/.worktrees/nav" })

  it("leva objetivo, plano, tarefas e as regras que protegem a máquina e o quadro", () => {
    expect(brief).toContain("Navegação no padrão DS")
    expect(brief).toContain("Reorganizar a sidebar.")
    expect(brief).toContain("- [ ] Sidebar")
    expect(brief).toContain("feat/nav")
    expect(brief).toMatch(/test:a11y/) // proibido rodar
    expect(brief).toMatch(/push|merge/i) // proibido
    expect(brief).toMatch(/Decisão/) // regra 3 do protocolo
    expect(brief).toMatch(/H-nav\.md/) // só edita a própria História
  })

  it("monta o comando do AGY rodando dentro do worktree", () => {
    const c = comandoAgy({ worktree: "/w/nav", brief: "/w/nav.brief.md", companion: "/c/agy-companion.mjs" })
    expect(c).toContain("/c/agy-companion.mjs")
    expect(c).toContain("implement")
    expect(c).toContain("--prompt-file")
    expect(c).toContain("/w/nav.brief.md")
    expect(c.startsWith('cd "/w/nav"')).toBe(true)
  })
})

describe("dataLocal", () => {
  it("usa os campos locais da data, com zero à esquerda", () => {
    expect(dataLocal(new Date(2026, 9, 28, 22, 19))).toBe("2026-10-28")
    expect(dataLocal(new Date(2026, 0, 5, 0, 5))).toBe("2026-01-05")
  })
})

describe("criarWorktree e limparWorktree (repositório de verdade, em pasta temporária)", () => {
  function montar() {
    const raiz = mkdtempSync(join(tmpdir(), "paralelo-git-"))
    const origem = join(raiz, "origem.git")
    const repo = join(raiz, "repo")
    const outro = join(raiz, "outro")
    const podeApagar = join(raiz, "pode-apagar")
    git(raiz, "init", "--bare", "-b", "main", origem)
    git(raiz, "clone", origem, repo)
    for (const r of [repo]) {
      git(r, "config", "user.email", "t@t")
      git(r, "config", "user.name", "t")
    }
    writeFileSync(join(repo, "a.txt"), "1")
    writeFileSync(join(repo, ".gitignore"), "/.worktrees/\nnode_modules\n.env.local\n")
    git(repo, "add", "-A")
    git(repo, "commit", "-m", "inicio")
    git(repo, "push", "-u", "origin", "main")
    // node_modules do repo é junction para um depósito fora dele, como no R.DS
    const deposito = join(raiz, "deposito")
    mkdirSync(deposito)
    writeFileSync(join(deposito, "pacote.txt"), "ok")
    symlinkSync(deposito, join(repo, "node_modules"), "junction")
    writeFileSync(join(repo, ".env.local"), "SEGREDO=1")
    // outro clone avança o origin: o main local fica para trás
    git(raiz, "clone", origem, outro)
    git(outro, "config", "user.email", "t@t")
    git(outro, "config", "user.name", "t")
    writeFileSync(join(outro, "novo.txt"), "do origin")
    git(outro, "add", "-A")
    git(outro, "commit", "-m", "avanca")
    git(outro, "push")
    return { raiz, repo, deposito, podeApagar }
  }

  it("cria o worktree a partir do origin/main (não do main local), liga node_modules e copia o .env.local", () => {
    const { repo, deposito } = montar()
    const { caminho, branch } = criarWorktree({ repo, slug: "nav" })
    expect(branch).toBe("feat/nav")
    expect(caminho.replace(/\\/g, "/")).toMatch(/\.worktrees\/nav$/)
    expect(readFileSync(join(caminho, "novo.txt"), "utf8")).toBe("do origin")
    expect(lstatSync(join(caminho, "node_modules")).isSymbolicLink()).toBe(true)
    expect(readFileSync(join(caminho, "node_modules", "pacote.txt"), "utf8")).toBe("ok")
    expect(readFileSync(join(caminho, ".env.local"), "utf8")).toBe("SEGREDO=1")
    expect(existsSync(deposito)).toBe(true)
    expect(git(repo, "status", "--short")).toBe("") // .worktrees e .env.local não sujam o repo
  })

  it("recusa criar duas vezes o mesmo worktree", () => {
    const { repo } = montar()
    criarWorktree({ repo, slug: "nav" })
    expect(() => criarWorktree({ repo, slug: "nav" })).toThrow(/já existe/)
  })

  it("limpar move para a pasta de descarte, registra no índice, preserva node_modules e poda o worktree", () => {
    const { repo, deposito, podeApagar } = montar()
    const { caminho } = criarWorktree({ repo, slug: "nav" })
    const r = limparWorktree({ repo, slug: "nav", podeApagar, projeto: "R.DS", hoje: "2026-10-28" })
    expect(existsSync(caminho)).toBe(false)
    expect(existsSync(r.destino)).toBe(true)
    expect(r.destino.replace(/\\/g, "/")).toMatch(/2026-10-28_R\.DS_worktree-nav$/)
    expect(existsSync(join(deposito, "pacote.txt"))).toBe(true) // o depósito real sobreviveu
    expect(existsSync(join(r.destino, "node_modules"))).toBe(false) // junction soltou antes de mover
    expect(git(repo, "worktree", "list")).not.toMatch(/\.worktrees/)
    const indice = readFileSync(join(podeApagar, "INDICE.md"), "utf8")
    expect(indice).toMatch(/2026-10-28/)
    expect(indice).toMatch(/worktree-nav/)
  })

  it("limpar recusa worktree com mudança não commitada ou commit que não está no origin", () => {
    const { repo, podeApagar } = montar()
    const { caminho } = criarWorktree({ repo, slug: "nav" })
    writeFileSync(join(caminho, "suja.txt"), "x")
    expect(() => limparWorktree({ repo, slug: "nav", podeApagar })).toThrow(/não commitad/)
    git(caminho, "config", "user.email", "t@t")
    git(caminho, "config", "user.name", "t")
    git(caminho, "add", "-A")
    git(caminho, "commit", "-m", "trabalho")
    expect(() => limparWorktree({ repo, slug: "nav", podeApagar })).toThrow(/origin/)
    git(caminho, "push", "-u", "origin", "feat/nav")
    expect(() => limparWorktree({ repo, slug: "nav", podeApagar, hoje: "2026-10-28" })).not.toThrow()
  })
})
