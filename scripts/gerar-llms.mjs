#!/usr/bin/env node
/**
 * Gera o índice para IA (llms.txt) a partir de docs/componentes/*.md.
 *
 *   npm run docs:llms            grava public/llms.txt, public/ia/AGENTS.md e public/ia/componentes/*.md
 *
 * A fonte continua sendo docs/componentes/; public/ é cópia gerada (não editar).
 * A trava é src/lib/llms.test.ts.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const CAMADAS = [
  ["primitive", "Primitivos"],
  ["atom", "Atoms"],
  ["molecule", "Molecules"],
  ["organism", "Organisms"],
]

const AGENTS = `# Interface com o R.DS

Este projeto usa o R.DS (Next.js + shadcn/ui + Tailwind v4). Antes de criar ou mudar uma tela,
leia o índice em /llms.txt e, para cada componente usado, o arquivo dele em /ia/componentes/.

Regras que valem sempre:

- Use só componentes que estão no índice. Não invente componente, variante, tamanho nem prop.
- Cor, espaço, raio, texto e tempo só por token (escala do Tailwind ou var(--token)); nunca valor fixo em px, rem ou cor solta.
- Siga as seções "Quando usar", "Quando NÃO usar" e "Acessibilidade" de cada componente: são regras.
- Idioma: os componentes falam pt-BR por padrão; para inglês, envolva o app em <IdiomaProvider idioma="en"> (src/lib/idioma). Nunca escreva texto de sistema (aria-label, "Fechar", "Carregando") por fora.
- Elemento arredondado dentro de outro não repete o raio de fora (rounded-outer + rounded-inner).
- Se o índice não cobre o caso, avise a pessoa e diga qual foi a escolha mais próxima.

As instruções moram só no R.DS: o projeto não guarda cópia deste arquivo nem do índice.
Leia sempre daqui (C:\\dev\\R.DS\\public\\llms.txt, ou /llms.txt no site do DS), para valer a versão atual.
`

function lerDoc(texto) {
  const fm = texto.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ""
  const campo = (k) => fm.match(new RegExp(`^${k}:\\s*(\\S+)`, "m"))?.[1] ?? ""
  // descrição = primeiro parágrafo depois do título
  const corpo = texto.slice(texto.indexOf("\n# ")).split("\n").slice(2).join("\n")
  const descricao = corpo.trim().split(/\n\s*\n/)[0].replace(/\s+/g, " ").trim()
  return { slug: campo("slug"), nome: texto.match(/^# (.+)$/m)?.[1].trim() ?? "", camada: campo("camada"), descricao }
}

/** Devolve { caminhoRelativoAPublic: conteúdo } sem gravar nada. */
export function gerarLlms(root) {
  const dir = join(root, "docs/componentes")
  const arquivos = {}
  const docs = readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
    .sort()
    .map((f) => {
      const texto = readFileSync(join(dir, f), "utf8").replace(/\r\n/g, "\n")
      const slug = f.replace(/\.md$/, "")
      arquivos[`ia/componentes/${slug}.md`] = texto
      return { ...lerDoc(texto), slug }
    })

  const linhas = [
    "# R.DS",
    "",
    "> Design System operacional em Next.js + shadcn/ui + Tailwind v4, em atomic design, para montar telas funcionais por IA. Só token, nada fixo.",
    "",
    "Comece pelas [regras para IA](/ia/AGENTS.md). Cada componente tem um arquivo Markdown abaixo; use só o que está listado.",
    "",
  ]
  for (const [camada, titulo] of CAMADAS) {
    const grupo = docs.filter((d) => d.camada === camada)
    if (!grupo.length) continue
    linhas.push(`## ${titulo}`, "")
    for (const d of grupo) linhas.push(`- [${d.nome}](/ia/componentes/${d.slug}.md): ${d.descricao}`)
    linhas.push("")
  }
  const semCamada = docs.filter((d) => !CAMADAS.some(([c]) => c === d.camada))
  if (semCamada.length) throw new Error(`camada desconhecida em: ${semCamada.map((d) => d.slug).join(", ")}`)

  arquivos["llms.txt"] = linhas.join("\n")
  arquivos["ia/AGENTS.md"] = AGENTS
  return arquivos
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
  const arquivos = gerarLlms(root)
  for (const [rel, conteudo] of Object.entries(arquivos)) {
    const p = join(root, "public", rel)
    mkdirSync(dirname(p), { recursive: true })
    writeFileSync(p, conteudo)
  }
  console.log(`llms.txt: ${Object.keys(arquivos).length} arquivos em public/`)
}
