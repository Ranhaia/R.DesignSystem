// Contraste WCAG 2.x calculado sobre os valores dos tokens. Usado pela trava (testes) e pela tela (SeletorDeCor):
// os dois nunca discordam porque é a mesma função. Matrizes OKLab de Björn Ottosson (CSS Color 4).

import {
  clamp,
  gama,
  lin,
  linearParaOklab,
  luminanciaY,
  oklabParaLinear,
  paraHex,
  type Rgba,
} from "../cor/espaco"

export type { Rgba }
export { paraHex }

const num = (t: string, escalaPct: number) => (t.endsWith("%") ? (parseFloat(t) / 100) * escalaPct : parseFloat(t))

export function parseCor(valor: string): Rgba | null {
  const v = valor.trim()
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)
  if (hex) {
    let h = hex[1]
    if (h.length === 3) h = [...h].map((c) => c + c).join("")
    const p = (i: number) => parseInt(h.slice(i, i + 2), 16) / 255
    return { r: p(0), g: p(2), b: p(4), a: h.length === 8 ? p(6) : 1 }
  }
  const ok = v.match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+)(?:deg)?\s*(?:\/\s*([\d.]+%?))?\s*\)$/i)
  if (ok) {
    const L = num(ok[1], 1)
    const C = num(ok[2], 0.4)
    const H = (parseFloat(ok[3]) * Math.PI) / 180
    const [r, g, b] = oklabParaLinear(L, C * Math.cos(H), C * Math.sin(H))
    // Fora do gamut sRGB é cortado, como o navegador faz ao pintar num monitor sRGB.
    return { r: clamp(gama(clamp(r))), g: clamp(gama(clamp(g))), b: clamp(gama(clamp(b))), a: ok[4] ? clamp(num(ok[4], 1)) : 1 }
  }
  return null
}

export function compor(frente: Rgba, fundo: Rgba): Rgba {
  const mix = (f: number, b: number) => f * frente.a + b * (1 - frente.a)
  return { r: mix(frente.r, fundo.r), g: mix(frente.g, fundo.g), b: mix(frente.b, fundo.b), a: 1 }
}

export const luminancia = (c: Rgba) => luminanciaY(lin(c.r), lin(c.g), lin(c.b))

export function razao(frente: string, fundo: string): number {
  const f = parseCor(frente), b = parseCor(fundo)
  if (!f) throw new Error(`cor não entendida: ${frente}`)
  if (!b) throw new Error(`cor não entendida: ${fundo}`)
  if (b.a < 1) throw new Error(`o fundo precisa ser opaco: ${fundo}`)
  const [l1, l2] = [luminancia(compor(f, b)), luminancia(b)].sort((x, y) => y - x)
  // Folga de 1e-9 só para erro de ponto flutuante (4.5 calculado como 4.4999999); fora isso, trunca.
  return Math.floor(((l1 + 0.05) / (l2 + 0.05)) * 100 + 1e-9) / 100
}

// A cor com outra luminosidade OKLCH, mesma matiz; reduz o croma só se sair do gamut sRGB.
export function comLuminosidade(cor: string, L: number): string | null {
  const c = parseCor(cor)
  if (!c) return null
  const [, a, b] = linearParaOklab(lin(c.r), lin(c.g), lin(c.b))
  const dentro = (k: number) => oklabParaLinear(L, a * k, b * k).every((v) => v >= -1e-4 && v <= 1 + 1e-4)
  let k = 1
  if (!dentro(1)) {
    let lo = 0, hi = 1
    for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; if (dentro(mid)) lo = mid; else hi = mid }
    k = lo
  }
  const [r, g, bb] = oklabParaLinear(L, a * k, b * k)
  return paraHex({ r: gama(clamp(r)), g: gama(clamp(g)), b: gama(clamp(bb)), a: 1 })
}

export function corProximaQuePassa(cor: string, fundo: string, piso: number): string | null {
  const c = parseCor(cor)
  if (!c) return null
  if (razao(paraHex(c), fundo) >= piso) return paraHex(c)
  const [L0] = linearParaOklab(lin(c.r), lin(c.g), lin(c.b))
  const passa = (L: number) => { const t = comLuminosidade(cor, L); return t !== null && razao(t, fundo) >= piso }
  // Para cada lado, busca binária do ponto em que começa a passar (o contraste cresce ao se afastar do fundo).
  const buscar = (extremo: number) => {
    if (!passa(extremo)) return null
    let longe = extremo, perto = L0
    for (let i = 0; i < 40; i++) { const mid = (longe + perto) / 2; if (passa(mid)) longe = mid; else perto = mid }
    return longe
  }
  const opcoes = [buscar(0), buscar(1)].filter((L): L is number => L !== null)
  if (!opcoes.length) return null
  const L = opcoes.reduce((m, x) => (Math.abs(x - L0) < Math.abs(m - L0) ? x : m))
  return comLuminosidade(cor, L)
}
