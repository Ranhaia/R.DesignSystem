// Medições no DOM real que o axe não faz: tamanho de alvo (WCAG 2.5.8, perfil AA) e foco visível (2.4.7 + protocolo A11Y.md).
// Roda no navegador (afterEach do preview do Storybook). Não reprova nada sozinha: devolve medidas.
import { userEvent } from "storybook/test"
import { compor, paraHex, razao, type Rgba } from "./contraste"
import { PISOS } from "./perfil"

export const SELETOR_INTERATIVO =
  'button, a[href], input:not([type="hidden"]), select, textarea, [role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="switch"], [role="tab"], [role="menuitem"], [role="option"]'
export const ALVO_MIN = 24
export const ALVO_CASA = 44
const FOCO_MIN = 2
const EPS = 0.01 // subpixel: 23.995 conta como 24

export type MedidaAlvo = { elemento: string; largura: number; altura: number; resultado: "passa" | "espacamento" | "isento" | "reprova"; motivo?: string; casa: boolean }
export type MedidaFoco = { elemento: string; largura: number; cor: string | null; fundo: string; razao: number | null; resultado: "passa" | "reprova"; motivo?: string }

const r1 = (n: number) => Math.round(n * 10) / 10

export function descrever(el: Element): string {
  const tag = el.tagName.toLowerCase()
  const slot = el.getAttribute("data-slot")
  const role = el.getAttribute("role")
  const nome = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 30)
  return `${tag}${slot ? `[data-slot=${slot}]` : ""}${role ? `[role=${role}]` : ""}${nome ? ` "${nome}"` : ""}`
}

function visivel(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  const cs = getComputedStyle(el)
  return r.width > 1 && r.height > 1 && cs.visibility !== "hidden" && cs.opacity !== "0" && !el.closest("[inert]")
}

function isencao(el: HTMLElement): string | null {
  if (el.matches(':disabled, [aria-disabled="true"]')) return "desabilitado"
  if (el.tagName === "A" && [...(el.parentElement?.childNodes ?? [])].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent!.trim()))
    return "link em texto corrido"
  return null
}

const centro = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
const pequeno = (r: DOMRect) => r.width < ALVO_MIN - EPS || r.height < ALVO_MIN - EPS
function distPontoRet(p: { x: number; y: number }, r: DOMRect) {
  const dx = Math.max(r.left - p.x, 0, p.x - r.right)
  const dy = Math.max(r.top - p.y, 0, p.y - r.bottom)
  return Math.hypot(dx, dy)
}

export function medirAlvos(raiz: ParentNode = document.body): MedidaAlvo[] {
  const els = [...raiz.querySelectorAll<HTMLElement>(SELETOR_INTERATIVO)].filter(visivel)
  const rects = els.map((e) => e.getBoundingClientRect())
  return els.map((el, i) => {
    const r = rects[i]
    const base = { elemento: descrever(el), largura: r1(r.width), altura: r1(r.height), casa: r.width < ALVO_CASA - EPS || r.height < ALVO_CASA - EPS }
    const isento = isencao(el)
    if (isento) return { ...base, resultado: "isento" as const, motivo: isento }
    if (!pequeno(r)) return { ...base, resultado: "passa" as const }
    const c = centro(r)
    const colide = els.some((outro, j) => {
      if (j === i || el.contains(outro) || outro.contains(el)) return false
      return distPontoRet(c, rects[j]) < ALVO_MIN / 2 || (pequeno(rects[j]) && Math.hypot(c.x - centro(rects[j]).x, c.y - centro(rects[j]).y) < ALVO_MIN)
    })
    return colide
      ? { ...base, resultado: "reprova" as const, motivo: "menor que 24×24 e sem espaçamento de 24px" }
      : { ...base, resultado: "espacamento" as const }
  })
}

// O navegador converte qualquer cor CSS (oklch, oklab, color-mix…) para sRGB ao pintar: lemos o pixel.
let ctx: CanvasRenderingContext2D | null = null
export function rgbaDoNavegador(cor: string): Rgba {
  ctx ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", { willReadFrequently: true })!
  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = "#000"
  ctx.fillStyle = cor
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  return { r: r / 255, g: g / 255, b: b / 255, a: a / 255 }
}

export function fundoAtras(el: Element): Rgba {
  const camadas: Rgba[] = []
  for (let n = el.parentElement; n; n = n.parentElement) {
    const c = rgbaDoNavegador(getComputedStyle(n).backgroundColor)
    if (c.a > 0) camadas.push(c)
    if (c.a >= 1) break
  }
  return camadas.reduceRight<Rgba>((fundo, c) => compor(c, fundo), { r: 1, g: 1, b: 1, a: 1 })
}

function dividirSombras(v: string): string[] {
  const partes: string[] = []
  let nivel = 0, atual = ""
  for (const ch of v) {
    if (ch === "(") nivel++
    if (ch === ")") nivel--
    if (ch === "," && nivel === 0) { partes.push(atual); atual = "" } else atual += ch
  }
  return [...partes, atual].map((s) => s.trim()).filter((s) => s && s !== "none")
}

// Anéis (offset 0, blur 0, espalhamento > 0). A primeira sombra fica por cima: a largura visível de cada uma é o que sobra além das de cima.
export function aneis(boxShadow: string): { largura: number; cor: string }[] {
  let cobertura = 0
  const out: { largura: number; cor: string }[] = []
  for (const s of dividirSombras(boxShadow)) {
    if (/\binset\b/.test(s)) continue
    const cor = s.match(/(?:rgba?|oklch|oklab|lab|lch|hsla?|color)\([^)]*\)|#[0-9a-f]{3,8}\b/i)?.[0]
    const [x = 0, y = 0, blur = 0, esp = 0] = s.replace(cor ?? "", "").match(/-?[\d.]+px/g)?.map(parseFloat) ?? []
    if (!cor || x || y || blur || esp <= 0) continue
    const largura = esp - cobertura
    cobertura = Math.max(cobertura, esp)
    if (largura > 0) out.push({ largura, cor })
  }
  return out
}

const hex = (c: Rgba) => paraHex(c)

export function medirFocoDe(el: HTMLElement): MedidaFoco {
  const cs = getComputedStyle(el)
  const fundo = fundoAtras(el)
  const contornos = [...aneis(cs.boxShadow)]
  const lo = parseFloat(cs.outlineWidth)
  if (cs.outlineStyle !== "none" && lo > 0) contornos.unshift({ largura: lo, cor: cs.outlineColor })
  const elemento = descrever(el)
  if (!contornos.length) return { elemento, largura: 0, cor: null, fundo: hex(fundo), razao: null, resultado: "reprova", motivo: "foco só por preenchimento ou invisível" }
  const medidos = contornos.map((c) => {
    const cor = compor(rgbaDoNavegador(c.cor), fundo)
    return { largura: r1(c.largura), cor: hex(cor), razao: razao(hex(cor), hex(fundo)) }
  })
  const melhor = medidos.find((m) => m.largura >= FOCO_MIN - EPS && m.razao >= PISOS.ui) ?? medidos.sort((a, b) => b.razao - a.razao)[0]
  const passa = melhor.largura >= FOCO_MIN - EPS && melhor.razao >= PISOS.ui
  return {
    elemento, ...melhor, fundo: hex(fundo),
    resultado: passa ? "passa" : "reprova",
    motivo: passa ? undefined : melhor.largura < FOCO_MIN - EPS ? `contorno de ${melhor.largura}px (mínimo 2px)` : `contraste ${melhor.razao}:1 (mínimo 3:1)`,
  }
}

export async function medirFoco(raiz: ParentNode = document.body, limite = 50): Promise<MedidaFoco[]> {
  ;(document.activeElement as HTMLElement | null)?.blur?.()
  const vistos = new Set<Element>()
  const out: MedidaFoco[] = []
  for (let i = 0; i < limite; i++) {
    await userEvent.tab()
    const el = document.activeElement as HTMLElement | null
    if (!el || el === document.body || vistos.has(el)) break
    vistos.add(el)
    if (!raiz.contains(el)) continue
    await Promise.all(el.getAnimations().map((a) => a.finished.catch(() => undefined)))
    out.push(medirFocoDe(el))
  }
  ;(document.activeElement as HTMLElement | null)?.blur?.()
  return out
}
