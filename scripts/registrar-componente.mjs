import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { coletarComponente } from "./coletar-componente.mjs"
import { agruparTokens } from "./contexto-token.mjs"

// Registro da memória de componentes (E-memoria-componentes): escritor único
// das seções geradas do MD (Anatomia, Props, Variantes, Tamanhos, Tokens
// usados), da coleta guardada e do histórico. A descrição que o auditor
// escreveu nas tabelas é preservada; o resto do MD não é tocado.
//
//   npm run docs:registrar                    registra todos os MDs
//   npm run docs:registrar -- button --motivo "por que mudou"
//   npm run docs:check                        reprova se algo está fora de data

const PREENCHER = "[a preencher]"
const pascal = (slug) => slug.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())
const cod = (v) => `\`${v}\``

function celulas(linha) {
  return linha.split("|").slice(1, -1).map((c) => c.trim())
}

// Chave de uma linha: "`a` · `b` (Parte)" → { nomes: ["a", "b"], parte: "Parte" }.
function chave(celula) {
  let texto = celula.replace(/`/g, "").trim()
  let parte = null
  const q = texto.match(/\s*\(([^)]+)\)\s*$/)
  if (q) {
    parte = q[1].trim()
    texto = texto.slice(0, q.index)
  }
  return { nomes: texto.split(/\s*[·/]\s*/).filter(Boolean), parte }
}

const casa = (padrao, valor) =>
  padrao.endsWith("*") ? valor.startsWith(padrao.slice(0, -1)) : padrao === valor

function trocarSecao(md, titulo, fn) {
  const inicio = md.search(new RegExp(`^## ${titulo}\\n`, "m"))
  if (inicio < 0) return md
  const corpoIni = inicio + `## ${titulo}\n`.length
  const prox = md.slice(corpoIni).search(/^## /m)
  const corpoFim = prox < 0 ? md.length : corpoIni + prox
  const novo = fn(md.slice(corpoIni, corpoFim).replace(/^\n+|\n+$/g, ""))
  if (novo == null) return md
  // Forma fixa (linha em branco antes e depois) para registrar duas vezes dar o mesmo MD.
  return md.slice(0, corpoIni) + `\n${novo}\n` + (prox < 0 ? "" : "\n") + md.slice(corpoFim)
}

// Separa o corpo em texto antes da tabela, tabela e texto depois.
function partirTabela(corpo) {
  const linhas = corpo.split("\n")
  const i = linhas.findIndex((l) => l.trim().startsWith("|"))
  if (i < 0) return null
  let f = i
  while (f < linhas.length && linhas[f].trim().startsWith("|")) f++
  return {
    antes: linhas.slice(0, i),
    cabecalho: linhas.slice(i, i + 2),
    linhas: linhas.slice(i + 2, f).map(celulas),
    depois: linhas.slice(f),
  }
}

function montar(t, linhas) {
  return [...t.antes, ...t.cabecalho, ...linhas.map((c) => `| ${c.join(" | ")} |`), ...t.depois].join("\n")
}

// Tabela que é toda do código (Variantes, Tamanhos): uma linha por valor, na
// ordem do código; a última coluna (descrição) vem da linha antiga que casa.
function tabelaDoCodigo(corpo, valores, cabecalhoPadrao, colunasCodigo) {
  if (valores.length === 0) return null
  const t = partirTabela(corpo) ?? { antes: [], cabecalho: cabecalhoPadrao, linhas: [], depois: [] }
  const descricao = (v) => {
    const exata = t.linhas.find((c) => chave(c[0]).nomes.includes(v))
    const glob = t.linhas.find((c) => chave(c[0]).nomes.some((n) => casa(n, v)))
    const linha = exata ?? glob
    return linha && linha.length > 1 ? linha[linha.length - 1] : PREENCHER
  }
  return montar(t, valores.map((v) => [cod(v), ...colunasCodigo(v), descricao(v)]))
}

// Tabela mista (Props, Anatomia): linhas do auditor ficam; o código atualiza
// as colunas que conhece, tira o que saiu e acrescenta o que falta.
function tabelaMista(corpo, { itens, anteriores, chaveDe, colunas }) {
  const t = partirTabela(corpo)
  if (!t) return null
  const cobertos = new Set()
  const saida = []
  for (const c of t.linhas) {
    const chaves = chaveDe(chave(c[0]))
    const achados = chaves.map((k) => itens.get(k)).filter(Boolean)
    chaves.forEach((k) => itens.has(k) && cobertos.add(k))
    if (achados.length === 0 && chaves.length > 0 && chaves.every((k) => anteriores.has(k))) continue
    saida.push(achados.length === chaves.length && achados.length > 0 ? colunas.atualizar(c, achados) : c)
  }
  for (const [k, item] of itens) if (!cobertos.has(k)) saida.push(colunas.nova(item))
  return montar(t, saida)
}

// Uma linha por contexto, no formato da Acessibilidade ("- **Cor:** `a` `b`"). Linha longa quebra com recuo de 2
// espaços, para continuar sendo um item só da lista.
function linhasDeTokens(tokens, largura = 72) {
  return agruparTokens(tokens)
    .map(({ contexto, itens }) => {
      const linhas = [`- **${contexto}:**`]
      for (const t of itens.map(cod)) {
        const atual = linhas[linhas.length - 1]
        if (atual.length + 1 + t.length > largura) linhas.push(`  ${t}`)
        else linhas[linhas.length - 1] = `${atual} ${t}`
      }
      return linhas.join("\n")
    })
    .join("\n")
}

export function mesclarMd(md, coleta, anterior) {
  const principal = coleta.partes.includes(pascal(coleta.slug)) ? pascal(coleta.slug) : coleta.partes[0]
  const chaveProp = (p) => `${p.nome}@${p.parte}`
  const props = new Map(coleta.props.map((p) => [chaveProp(p), p]))
  const propsAntes = new Set((anterior?.props ?? []).map(chaveProp))
  const igual = (valores) => (valores.every((v) => v === valores[0]) ? valores[0] : undefined)

  let out = md
  out = trocarSecao(out, "Anatomia", (corpo) =>
    tabelaMista(corpo, {
      itens: new Map(coleta.partes.map((p) => [p, p])),
      anteriores: new Set(anterior?.partes ?? []),
      chaveDe: (k) => k.nomes.map((n) => n.replace(/\./g, "")),
      colunas: { atualizar: (c) => c, nova: (p) => [cod(p), PREENCHER] },
    })
  )
  out = trocarSecao(out, "Props", (corpo) =>
    tabelaMista(corpo, {
      itens: props,
      anteriores: propsAntes,
      chaveDe: (k) => k.nomes.map((n) => `${n}@${k.parte ?? principal}`),
      colunas: {
        atualizar: (c, achados) => {
          const tipo = igual(achados.map((p) => p.tipo))
          const padrao = igual(achados.map((p) => p.padrao))
          return [c[0], tipo ?? c[1], padrao != null ? cod(padrao) : c[2], ...c.slice(3)]
        },
        nova: (p) => [p.parte === principal ? cod(p.nome) : `${cod(p.nome)} (${p.parte})`, p.tipo ?? "—", p.padrao != null ? cod(p.padrao) : "—", PREENCHER],
      },
    })
  )
  out = trocarSecao(out, "Variantes", (corpo) =>
    tabelaDoCodigo(corpo, coleta.variantes, ["| Valor | Quando usar |", "|---|---|"], () => [])
  )
  const tamanhos = new Map(coleta.tamanhos.map((t) => [t.valor, t]))
  out = trocarSecao(out, "Tamanhos", (corpo) =>
    tabelaDoCodigo(corpo, [...tamanhos.keys()], ["| Valor | Medida | Quando usar |", "|---|---|---|"], (v) => {
      const t = tamanhos.get(v)
      return [[t.px != null ? `${t.px} px` : "—", t.igualA ? `igual a ${cod(t.igualA)}` : null].filter(Boolean).join(", ")]
    })
  )
  out = trocarSecao(out, "Composição", () =>
    coleta.compoe?.length ? `Usa: ${coleta.compoe.map((s) => `[${cod(s)}](${s}.md)`).join(" · ")}.` : "Não usa outro componente do R.DS."
  )
  out = trocarSecao(out, "Tokens usados", () => (coleta.tokens.length ? linhasDeTokens(coleta.tokens) : "Nenhum."))
  return out
}

const semComentario = (md) => md.replace(/<!--[\s\S]*?-->\n*/g, "")

function partirSecoes(md) {
  const [preambulo, ...resto] = md.split(/^(?=## )/m)
  return { preambulo, secoes: resto.map((texto) => ({ titulo: texto.match(/^## (.+)/)[1].trim(), texto })) }
}

// Põe as seções na ordem do _modelo.md e insere as que faltam com o texto do
// modelo (os `[a preencher]` dele). Seção que o modelo não tem vai para o fim.
export function alinharAoModelo(md, modelo) {
  const m = partirSecoes(semComentario(modelo))
  const a = partirSecoes(md)
  const doMd = new Map(a.secoes.map((s) => [s.titulo, s]))
  const titulos = new Set(m.secoes.map((s) => s.titulo))
  const secoes = [...m.secoes.map((s) => doMd.get(s.titulo) ?? s), ...a.secoes.filter((s) => !titulos.has(s.titulo))]
  return a.preambulo.replace(/\n*$/, "\n\n") + secoes.map((s) => s.texto.replace(/\n*$/, "\n")).join("\n")
}

// MD de componente novo: o modelo com o que o repositório já sabe preenchido.
export function mdNovo(slug, modelo, { nome, camada, sinonimos }) {
  const conhecido = {
    slug,
    nome,
    camada,
    codigo: `src/components/ui/${slug}.tsx`,
    story: `src/components/ui/${slug}.stories.tsx`,
    status: "piloto",
    sinonimos: `[${(sinonimos ?? []).join(", ")}]`,
  }
  return semComentario(modelo)
    .replace(/^---\n([\s\S]*?)\n---/, (_, fm) =>
      `---\n${fm.split("\n").map((l) => {
        const k = l.match(/^([\w-]+):/)?.[1]
        return k && conhecido[k] !== undefined ? `${k}: ${conhecido[k]}` : l.replace(/\s+#.*$/, "")
      }).join("\n")}\n---`
    )
    .replace(/^# .+$/m, `# ${nome}`)
}

function dadosDoRepositorio(root, slug) {
  const ler = (f) => fs.readFileSync(path.join(root, f), "utf8")
  const esc = slug.replace(/-/g, "\\-")
  return {
    nome: ler("src/lib/components-registry.ts").match(new RegExp(`slug: "${esc}", name: "([^"]+)"`))?.[1] ?? pascal(slug),
    camada: ler("src/lib/atomic-registry.ts").match(new RegExp(`^\\s*"?${esc}"?: "(\\w+)"`, "m"))?.[1] ?? "",
    sinonimos: JSON.parse(ler("docs/sinonimos.json"))[slug] ?? [],
  }
}

export function diffColeta(anterior, nova) {
  const n = (lista, um, varios) => `${lista.length} ${lista.length === 1 ? um : varios}`
  if (!anterior)
    return [`Primeiro registro: ${[n(nova.partes, "parte", "partes"), n(nova.variantes, "variante", "variantes"), n(nova.tamanhos, "tamanho", "tamanhos"), n(nova.props, "prop", "props"), n(nova.tokens, "token", "tokens")].join(", ")}.`]
  const linhas = []
  const comparar = (rotulo, a, b, mudancas = []) => {
    const itens = [...b.filter((x) => !a.includes(x)).map((x) => `+ ${cod(x)}`), ...a.filter((x) => !b.includes(x)).map((x) => `− ${cod(x)}`), ...mudancas]
    if (itens.length) linhas.push(`${rotulo}: ${itens.join(" · ")}`)
  }
  comparar("Partes", anterior.partes, nova.partes)
  comparar("Variantes", anterior.variantes, nova.variantes)
  const medida = (t) => `${t.px ?? "—"} px${t.igualA ? ` (= ${t.igualA})` : ""}`
  comparar(
    "Tamanhos",
    anterior.tamanhos.map((t) => t.valor),
    nova.tamanhos.map((t) => t.valor),
    nova.tamanhos.flatMap((t) => {
      const a = anterior.tamanhos.find((x) => x.valor === t.valor)
      return a && medida(a) !== medida(t) ? [`${cod(t.valor)} ${medida(a)} → ${medida(t)}`] : []
    })
  )
  const k = (p) => `${p.nome} (${p.parte})`
  comparar(
    "Props",
    anterior.props.map(k),
    nova.props.map(k),
    nova.props.flatMap((p) => {
      const a = anterior.props.find((x) => k(x) === k(p))
      if (!a) return []
      return [
        a.tipo !== p.tipo ? `${cod(p.nome)} (${p.parte}) tipo: ${a.tipo ?? "—"} → ${p.tipo ?? "—"}` : null,
        a.padrao !== p.padrao ? `${cod(p.nome)} (${p.parte}) padrão: ${cod(a.padrao ?? "—")} → ${cod(p.padrao ?? "—")}` : null,
      ].filter(Boolean)
    })
  )
  comparar("Tokens", anterior.tokens, nova.tokens)
  comparar("Composição", anterior.compoe ?? [], nova.compoe ?? [])
  return linhas
}

const caminhos = (root, slug) => ({
  md: path.join(root, "docs/componentes", `${slug}.md`),
  coleta: path.join(root, "docs/componentes/coleta", `${slug}.json`),
  historico: path.join(root, "docs/componentes/historico", `${slug}.md`),
})

const lerJson = (f) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : null)
const lerMd = (f) => fs.readFileSync(f, "utf8").replace(/\r\n/g, "\n")

export function slugsComMd(root) {
  return fs
    .readdirSync(path.join(root, "docs/componentes"))
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
    .map((f) => f.replace(/\.md$/, ""))
}

export function registrar(slug, { root, data, branch, motivo }) {
  const c = caminhos(root, slug)
  const coleta = coletarComponente(slug, root)
  const anterior = lerJson(c.coleta)
  const linhas = diffColeta(anterior, coleta)
  const modelo = lerMd(path.join(root, "docs/componentes/_modelo.md"))
  const md = fs.existsSync(c.md) ? lerMd(c.md) : ""
  const base = md || mdNovo(slug, modelo, dadosDoRepositorio(root, slug))
  const novoMd = mesclarMd(alinharAoModelo(base, modelo), coleta, anterior ?? coleta)
  if (novoMd !== md) fs.writeFileSync(c.md, novoMd, "utf8")
  // Coleta regravada a cada diferença, inclusive campo novo sem efeito no histórico.
  if (JSON.stringify(anterior) !== JSON.stringify(coleta)) {
    fs.mkdirSync(path.dirname(c.coleta), { recursive: true })
    fs.writeFileSync(c.coleta, JSON.stringify(coleta, null, 2) + "\n", "utf8")
  }
  if (linhas.length) {
    fs.mkdirSync(path.dirname(c.historico), { recursive: true })
    const cabecalho = fs.existsSync(c.historico)
      ? ""
      : `# Histórico — ${slug}\n\nSó acrescenta. Escrito por \`npm run docs:registrar\`; não edite entradas antigas.\n`
    const entrada = [`\n## ${data} · ${branch}\n`, ...linhas.map((l) => `- ${l}`), `- Por quê: ${motivo || "[a preencher pelo auditor]"}`, ""].join("\n")
    fs.appendFileSync(c.historico, cabecalho + entrada, "utf8")
  }
  return { linhas, mdMudou: novoMd !== md }
}

// Lista o que está fora de data; vazio = memória em dia com o código.
export function verificar(root) {
  const problemas = []
  const modelo = lerMd(path.join(root, "docs/componentes/_modelo.md"))
  for (const slug of slugsComMd(root)) {
    const c = caminhos(root, slug)
    const guardada = lerJson(c.coleta)
    if (!guardada) {
      problemas.push(`${slug}: sem registro — rode \`npm run docs:registrar -- ${slug}\``)
      continue
    }
    const coleta = coletarComponente(slug, root)
    if (JSON.stringify(coleta) !== JSON.stringify(guardada))
      problemas.push(`${slug}: o código mudou desde o último registro — rode \`npm run docs:registrar -- ${slug} --motivo "…"\``)
    else if (mesclarMd(alinharAoModelo(lerMd(c.md), modelo), coleta, guardada) !== lerMd(c.md))
      problemas.push(`${slug}: seção gerada editada à mão ou MD fora do _modelo.md — rode \`npm run docs:registrar -- ${slug}\``)
    if (!fs.existsSync(c.historico)) problemas.push(`${slug}: sem histórico em docs/componentes/historico/`)
  }
  return problemas
}

async function principal() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
  const args = process.argv.slice(2)
  if (args.includes("--check")) {
    const problemas = verificar(root)
    for (const p of problemas) console.error(`❌ ${p}`)
    if (problemas.length) process.exit(1)
    console.log("✅ Memória de componentes em dia com o código.")
    return
  }
  const iMotivo = args.indexOf("--motivo")
  const motivo = iMotivo >= 0 ? args[iMotivo + 1] : ""
  const slugs = args.filter((a, i) => !a.startsWith("--") && !(iMotivo >= 0 && i === iMotivo + 1))
  const alvo = slugs.length ? slugs : slugsComMd(root)
  const data = new Date().toLocaleDateString("sv-SE")
  const branch = execSync("git branch --show-current", { cwd: root }).toString().trim() || "sem-branch"
  for (const slug of alvo) {
    const { linhas, mdMudou } = registrar(slug, { root, data, branch, motivo })
    console.log(`${slug}: ${linhas.length ? `${linhas.length} mudança(s) no histórico` : "coleta igual"}${mdMudou ? ", MD atualizado" : ""}`)
  }
  const { gerarComponentDocsTs } = await import("./gerar-component-docs.mjs")
  const { content } = await gerarComponentDocsTs()
  fs.writeFileSync(path.join(root, "src/lib/component-docs.ts"), content, "utf8")
  console.log("component-docs.ts regenerado.")
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  principal().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
