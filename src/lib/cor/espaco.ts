// Espaço de cor: conversões hex ↔ OKLab / OKLCH ↔ sRGB linear ↔ CIELAB L* (tom).
// Matrizes OKLab de Björn Ottosson (CSS Color 4).

export type Rgba = { r: number; g: number; b: number; a: number }

export const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
export const gama = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)
export const clamp = (v: number) => Math.min(1, Math.max(0, v))

export function oklabParaLinear(L: number, a: number, b: number): [number, number, number] {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

export function linearParaOklab(r: number, g: number, b: number): [number, number, number] {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

export function paraHex(c: Rgba): string {
  const h = (v: number) => Math.round(clamp(v) * 255).toString(16).padStart(2, "0")
  return `#${h(c.r)}${h(c.g)}${h(c.b)}`.toUpperCase()
}

// Luminância relativa CIE Y (para sRGB padrão D65)
export const luminanciaY = (rLin: number, gLin: number, bLin: number) =>
  0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin

// Y (0 a 1) para L* do CIELAB (0 a 100)
export function yParaLStar(y: number): number {
  if (y <= 0) return 0
  if (y >= 1) return 100
  return y > 216 / 24389 ? 116 * Math.cbrt(y) - 16 : (24389 / 27) * y
}

// L* do CIELAB (0 a 100) para Y (0 a 1)
export function lStarParaY(lStar: number): number {
  if (lStar <= 0) return 0
  if (lStar >= 100) return 1
  return lStar > 8 ? ((lStar + 16) / 116) ** 3 : (lStar * 27) / 24389
}

export function parseHex(hexStr: string): Rgba {
  const v = hexStr.trim()
  const m = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i)
  if (!m) throw new Error(`hex inválido: ${hexStr}`)
  let h = m[1]
  if (h.length === 3) h = [...h].map((c) => c + c).join("")
  const p = (i: number) => parseInt(h.slice(i, i + 2), 16) / 255
  return { r: p(0), g: p(2), b: p(4), a: h.length === 8 ? p(6) : 1 }
}

export function tomDe(hex: string): number {
  const c = parseHex(hex)
  const y = luminanciaY(lin(c.r), lin(c.g), lin(c.b))
  return yParaLStar(y)
}

export function paraOklch(hex: string): { L: number; C: number; H: number } {
  const c = parseHex(hex)
  const [L, a, b] = linearParaOklab(lin(c.r), lin(c.g), lin(c.b))
  const C = Math.hypot(a, b)
  let H = (Math.atan2(b, a) * 180) / Math.PI
  if (H < 0) H += 360
  return { L, C, H }
}

export function deOklch(L: number, C: number, H: number): string {
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)
  const [r, g, bb] = oklabParaLinear(L, a, b)
  return paraHex({ r: gama(clamp(r)), g: gama(clamp(g)), b: gama(clamp(bb)), a: 1 })
}

// cor(matiz, croma, tom): acha o L do OKLCH que dá aquele L* (CIELAB) com a matiz e croma pedidos;
// se sair do gamut sRGB, reduz o croma até caber.
export function cor(matiz: number, croma: number, tom: number): string {
  if (tom <= 0) return "#000000"
  if (tom >= 100) return "#FFFFFF"

  const targetY = lStarParaY(tom)
  const hRad = (matiz * Math.PI) / 180
  const cosH = Math.cos(hRad)
  const sinH = Math.sin(hRad)

  // Função para testar gamut sRGB dado L e c
  const noGamut = (L: number, c: number) => {
    const [r, g, b] = oklabParaLinear(L, c * cosH, c * sinH)
    return r >= -1e-4 && r <= 1 + 1e-4 && g >= -1e-4 && g <= 1 + 1e-4 && b >= -1e-4 && b <= 1 + 1e-4
  }

  // Y(L, c) é estritamente crescente com respeito a L
  const getY = (L: number, c: number) => {
    const [r, g, b] = oklabParaLinear(L, c * cosH, c * sinH)
    return luminanciaY(r, g, b)
  }

  // Primeiro encontramos L para o croma inicial via busca binária
  let lo = 0, hi = 1
  for (let i = 0; i < 35; i++) {
    const mid = (lo + hi) / 2
    if (getY(mid, croma) < targetY) lo = mid
    else hi = mid
  }
  let bestL = (lo + hi) / 2
  let currentC = croma

  // Se (bestL, croma) estiver fora do gamut, reduzimos croma mantendo o tom (reajustando L e c)
  if (!noGamut(bestL, currentC)) {
    let cLo = 0, cHi = currentC
    for (let j = 0; j < 30; j++) {
      const midC = (cLo + cHi) / 2
      // acha L para midC
      let lLo = 0, lHi = 1
      for (let i = 0; i < 30; i++) {
        const midL = (lLo + lHi) / 2
        if (getY(midL, midC) < targetY) lLo = midL
        else lHi = midL
      }
      const testL = (lLo + lHi) / 2
      if (noGamut(testL, midC)) {
        cLo = midC
        bestL = testL
      } else {
        cHi = midC
      }
    }
    currentC = cLo
  }

  return deOklch(bestL, currentC, matiz)
}
