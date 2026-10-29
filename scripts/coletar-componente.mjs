import fs from "node:fs"
import path from "node:path"
import ts from "typescript"
import { ehEscalaTailwind } from "./contexto-token.mjs"

// Coleta da memória de componentes (E-memoria-componentes, modelo do Rayner
// Lemos): lê do .tsx só o que é estrutura — partes, grupos do cva, props
// próprias e tokens (os do CSS e a escala do Tailwind) — para ninguém transcrever à mão. Intenção não sai daqui.

const PONTE_TEMA = {
  color: ["bg", "text", "border", "border-t", "border-b", "border-l", "border-r", "border-x", "border-y", "ring", "ring-offset", "outline", "fill", "stroke", "from", "via", "to", "decoration", "divide", "placeholder", "caret", "accent", "shadow"],
  radius: ["rounded", "rounded-t", "rounded-b", "rounded-l", "rounded-r", "rounded-tl", "rounded-tr", "rounded-bl", "rounded-br"],
  shadow: ["shadow"],
  ease: ["ease"],
  animate: ["animate"],
  font: ["font"],
}

const cacheTokens = new Map()

// Nomes que contam como token: toda variável declarada no CSS do projeto,
// o utilitário que o @theme gera para ela e os @utility próprios (com `*`).
export function tokensDoProjeto(root) {
  if (cacheTokens.has(root)) return cacheTokens.get(root)
  const css = ["src/app/globals.css", "src/app/tokens-cor.css"]
    .map((f) => fs.readFileSync(path.join(root, f), "utf8"))
    .join("\n")
  const conhecidos = new Set()
  for (const [, nome] of css.matchAll(/(--[\w-]+)\s*:/g)) conhecidos.add(nome)
  for (const nome of [...conhecidos]) {
    const m = nome.match(/^--(color|radius|shadow|ease|animate|font)-(.+)$/)
    if (m) for (const p of PONTE_TEMA[m[1]]) conhecidos.add(`${p}-${m[2]}`)
  }
  for (const [, u] of css.matchAll(/^@utility\s+([\w.-]+\*?)/gm)) conhecidos.add(u)
  cacheTokens.set(root, conhecidos)
  return conhecidos
}

// Posição do último `sep` fora de [] e ().
function ultimoForaDeColchete(s, sep) {
  let nivel = 0
  let pos = -1
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (ch === "[" || ch === "(") nivel++
    else if (ch === "]" || ch === ")") nivel--
    else if (ch === sep && nivel === 0) pos = i
  }
  return pos
}

function tokensDaClasse(classe, conhecidos) {
  const achados = []
  for (const [, v] of classe.matchAll(/\((--[\w-]+)\)/g)) if (conhecidos.has(v)) achados.push(v)
  let base = classe.slice(ultimoForaDeColchete(classe, ":") + 1).replace(/^!/, "").replace(/^-/, "")
  const barra = ultimoForaDeColchete(base, "/")
  if (barra > 0) base = base.slice(0, barra)
  if (conhecidos.has(base) || ehEscalaTailwind(base)) achados.push(base)
  else
    for (const u of conhecidos)
      if (u.endsWith("*") && base.startsWith(u.slice(0, -1)) && base.length > u.length - 1) achados.push(base)
  return achados
}

const nomeDe = (n) => (n && (ts.isIdentifier(n) || ts.isStringLiteral(n)) ? n.text : null)

function textoLiteral(n) {
  if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text
  if (ts.isTemplateExpression(n)) return [n.head.text, ...n.templateSpans.map((s) => s.literal.text)].join(" ")
  return ""
}

function lerCva(chamada) {
  const config = chamada.arguments[1]
  const grupos = {}
  const padroes = {}
  if (!config || !ts.isObjectLiteralExpression(config)) return { grupos, padroes }
  for (const prop of config.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isObjectLiteralExpression(prop.initializer)) continue
    if (nomeDe(prop.name) === "variants")
      for (const g of prop.initializer.properties)
        if (ts.isPropertyAssignment(g) && ts.isObjectLiteralExpression(g.initializer))
          grupos[nomeDe(g.name)] = g.initializer.properties
            .filter(ts.isPropertyAssignment)
            .map((v) => ({ valor: nomeDe(v.name), classes: textoLiteral(v.initializer).trim() }))
    if (nomeDe(prop.name) === "defaultVariants")
      for (const d of prop.initializer.properties)
        if (ts.isPropertyAssignment(d)) padroes[nomeDe(d.name)] = textoLiteral(d.initializer) || d.initializer.getText()
  }
  return { grupos, padroes }
}

const lista = (valores) => valores.map((v) => `\`${v}\``).join(" · ")

export function coletarFonte(slug, source, conhecidos) {
  const sf = ts.createSourceFile(`${slug}.tsx`, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const cvas = {}
  const aliases = {}
  const funcoes = []
  const classes = []

  const visitar = (n) => {
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === "cva") {
      const nome = ts.isVariableDeclaration(n.parent) ? n.parent.name.getText() : `cva${Object.keys(cvas).length}`
      cvas[nome] = lerCva(n)
    }
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) || ts.isTemplateHead(n) || ts.isTemplateMiddle(n) || ts.isTemplateTail(n))
      classes.push(...n.text.split(/\s+/).filter(Boolean))
    ts.forEachChild(n, visitar)
  }
  visitar(sf)

  // Composição: componentes do R.DS importados; import só de estilo (`xxxVariants`) ou de tipo não conta.
  const compoe = []
  for (const st of sf.statements) {
    if (ts.isImportDeclaration(st) && ts.isStringLiteral(st.moduleSpecifier)) {
      const alvo = st.moduleSpecifier.text.match(/^@\/components\/ui\/([\w-]+)$/)?.[1]
      const clausula = st.importClause
      const usados = clausula && !clausula.isTypeOnly
        ? [clausula.name?.text, ...(clausula.namedBindings && ts.isNamedImports(clausula.namedBindings) ? clausula.namedBindings.elements.filter((e) => !e.isTypeOnly).map((e) => e.name.text) : [])]
            .filter((n) => n && !/Variants$/.test(n))
        : []
      if (alvo && alvo !== slug && usados.length && !compoe.includes(alvo)) compoe.push(alvo)
    }
    if (ts.isTypeAliasDeclaration(st)) aliases[st.name.text] = st.type
    if (ts.isFunctionDeclaration(st) && st.name && /^[A-Z]/.test(st.name.text)) funcoes.push({ nome: st.name.text, fn: st })
    if (ts.isVariableStatement(st))
      for (const d of st.declarationList.declarations)
        if (ts.isIdentifier(d.name) && /^[A-Z]/.test(d.name.text) && d.initializer && (ts.isArrowFunction(d.initializer) || ts.isFunctionExpression(d.initializer)))
          funcoes.push({ nome: d.name.text, fn: d.initializer })
  }

  const grupo = (cva, g) => cvas[cva]?.grupos[g]?.map((v) => v.valor)
  const tipoTexto = (t) => {
    if (ts.isIndexedAccessTypeNode(t) && ts.isTypeReferenceNode(t.objectType) && t.objectType.typeName.getText() === "VariantProps") {
      const alvo = t.objectType.typeArguments?.[0]
      const valores = alvo && ts.isTypeQueryNode(alvo) && ts.isLiteralTypeNode(t.indexType) ? grupo(alvo.exprName.getText(), t.indexType.literal.text) : null
      if (valores) return lista(valores)
    }
    if (ts.isUnionTypeNode(t))
      return t.types.map((m) => (ts.isLiteralTypeNode(m) && ts.isStringLiteral(m.literal) ? `\`${m.literal.text}\`` : `\`${m.getText()}\``)).join(" · ")
    return `\`${t.getText().replace(/\s+/g, " ")}\``
  }

  // Props declaradas no próprio arquivo; herdadas (ComponentProps, Radix) ficam com o auditor.
  const propsDoTipo = (t, saida) => {
    if (!t) return
    if (ts.isIntersectionTypeNode(t) || ts.isUnionTypeNode(t)) return t.types.forEach((x) => propsDoTipo(x, saida))
    if (ts.isParenthesizedTypeNode(t)) return propsDoTipo(t.type, saida)
    if (ts.isTypeLiteralNode(t)) {
      for (const m of t.members)
        if (ts.isPropertySignature(m) && m.type && !saida.has(nomeDe(m.name))) saida.set(nomeDe(m.name), { tipo: tipoTexto(m.type) })
      return
    }
    if (ts.isTypeReferenceNode(t)) {
      const nome = t.typeName.getText()
      if (nome === "VariantProps") {
        const alvo = t.typeArguments?.[0]
        const cva = alvo && ts.isTypeQueryNode(alvo) ? cvas[alvo.exprName.getText()] : null
        for (const [g, valores] of Object.entries(cva?.grupos ?? {}))
          if (!saida.has(g)) saida.set(g, { tipo: lista(valores.map((v) => v.valor)), padrao: cva.padroes[g] ?? null })
        return
      }
      if (aliases[nome]) return propsDoTipo(aliases[nome], saida)
      if (["Omit", "Pick", "Partial"].includes(nome)) return propsDoTipo(t.typeArguments?.[0], saida)
    }
  }

  const props = []
  for (const { nome: parte, fn } of funcoes) {
    const param = fn.parameters[0]
    if (!param) continue
    const proprias = new Map()
    propsDoTipo(param.type, proprias)
    const padroes = new Map()
    if (ts.isObjectBindingPattern(param.name))
      for (const el of param.name.elements)
        if (!el.dotDotDotToken && el.initializer)
          padroes.set(nomeDe(el.propertyName ?? el.name), textoLiteral(el.initializer) || el.initializer.getText())
    for (const [nome, info] of proprias)
      props.push({ nome, parte, tipo: info.tipo, padrao: padroes.get(nome) ?? info.padrao ?? null })
    for (const [nome, padrao] of padroes) if (!proprias.has(nome)) props.push({ nome, parte, tipo: null, padrao })
  }

  // shortcut: une o grupo `variant` de todos os cva do arquivo; se um componente tiver dois cva com `variant`, separar por parte.
  const valoresDe = (g) => [...new Set(Object.values(cvas).flatMap((c) => (c.grupos[g] ?? []).map((v) => v.valor)))]
  const tamanhosCva = Object.values(cvas).flatMap((c) => c.grupos.size ?? [])
  const tamanhos = tamanhosCva.map((t, i) => {
    const altura = t.classes.match(/(?:^|\s)(?:h|size)-(\d+(?:\.\d+)?)(?=\s|$)/)
    const igual = tamanhosCva.slice(0, i).find((o) => o.classes === t.classes)
    return { valor: t.valor, px: altura ? Number(altura[1]) * 4 : null, igualA: igual ? igual.valor : null }
  })

  const tokens = [...new Set(classes.flatMap((c) => tokensDaClasse(c, conhecidos)))].sort()

  return { slug, partes: funcoes.map((f) => f.nome), variantes: valoresDe("variant"), tamanhos, props, tokens, compoe }
}

export function coletarComponente(slug, root) {
  const source = fs.readFileSync(path.join(root, "src/components/ui", `${slug}.tsx`), "utf8")
  return coletarFonte(slug, source, tokensDoProjeto(root))
}
