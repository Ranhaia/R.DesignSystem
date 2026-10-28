// Daltonismo: simula como a cor aparece para quem tem protanopia, deuteranopia
// ou tritanopia e mede se os pares que só a cor separa continuam diferentes.
// Matrizes de Machado, Oliveira e Fernandes (2009), severidade máxima, aplicadas
// em sRGB linear. Diferença = distância em OKLab × 100. Mínimos tirados da
// baliza do AIPIM (tools/build_tokens.py): 8 entre cores de um par, 20 para o
// link se destacar do texto só pela cor (no R.DS o sublinhado só aparece no hover).

import { clamp, gama, lin, linearParaOklab, parseHex, paraHex } from "./espaco"
import type { Token } from "./gerar"

export const VISOES = ["normal", "protanopia", "deuteranopia", "tritanopia"] as const
export type Visao = (typeof VISOES)[number]

const MATRIZES: Record<Exclude<Visao, "normal">, number[][]> = {
  protanopia: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deuteranopia: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
  tritanopia: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.3039]],
}

const linear = (hex: string): [number, number, number] => {
  const c = parseHex(hex)
  return [lin(c.r), lin(c.g), lin(c.b)]
}

export function simular(hex: string, visao: Visao): string {
  if (visao === "normal") return paraHex(parseHex(hex))
  const v = linear(hex)
  const [r, g, b] = MATRIZES[visao].map((linha) => clamp(linha[0] * v[0] + linha[1] * v[1] + linha[2] * v[2]))
  return paraHex({ r: gama(r), g: gama(g), b: gama(b), a: 1 })
}

export function diferenca(a: string, b: string): number {
  const [la, aa, ba] = linearParaOklab(...linear(a))
  const [lb, ab, bb] = linearParaOklab(...linear(b))
  return 100 * Math.hypot(la - lb, aa - ab, ba - bb)
}

export type ParDaltonismo = { grupo: string; a: Token; b: Token; minimo: number }

const graficos = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"] as const

export const PARES_DALTONISMO: ParDaltonismo[] = [
  { grupo: "Erro × ação", a: "--destructive", b: "--primary", minimo: 8 },
  ...graficos.flatMap((a, i) => graficos.slice(i + 1).map((b) => ({ grupo: "Gráfico", a, b, minimo: 8 }))),
  { grupo: "Link × texto", a: "--primary", b: "--foreground", minimo: 20 },
]

export type FalhaDaltonismo = ParDaltonismo & { modo: "claro" | "escuro"; visao: Visao; valor: number }

export function checarDaltonismo(tema: { claro: Record<Token, string>; escuro: Record<Token, string> }): FalhaDaltonismo[] {
  const falhas: FalhaDaltonismo[] = []
  for (const modo of ["claro", "escuro"] as const)
    for (const par of PARES_DALTONISMO)
      for (const visao of VISOES) {
        const valor = diferenca(simular(tema[modo][par.a], visao), simular(tema[modo][par.b], visao))
        if (valor < par.minimo) falhas.push({ ...par, modo, visao, valor })
      }
  return falhas
}
