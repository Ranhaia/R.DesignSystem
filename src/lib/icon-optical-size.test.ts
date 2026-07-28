import { describe, expect, it } from "vitest"

import { computeOpticalSize } from "./icon-optical-size"

describe("computeOpticalSize", () => {
  it("converte rem para px (1rem = 16px) quando dentro da faixa 20-48", () => {
    expect(computeOpticalSize(1.5)).toBe(24)
  })

  it("satura em 20 (mínimo do eixo opsz) para tamanhos pequenos", () => {
    expect(computeOpticalSize(1)).toBe(20)
  })

  it("satura em 48 (máximo do eixo opsz) para tamanhos grandes", () => {
    expect(computeOpticalSize(4)).toBe(48)
  })

  it("não satura em valores dentro da faixa", () => {
    expect(computeOpticalSize(2)).toBe(32)
  })
})
