import { describe, expect, it } from "vitest"

import { cn } from "./utils"

describe("cn com raio concêntrico", () => {
  it("rounded-inner substitui o raio do componente base", () => {
    expect(cn("rounded-md h-6", "rounded-inner")).toBe("h-6 rounded-inner")
  })
  it("rounded-outer-* substitui e é substituído como raio", () => {
    expect(cn("rounded-lg p-1", "rounded-outer-lg")).toBe("p-1 rounded-outer-lg")
    expect(cn("rounded-outer-lg", "rounded-none")).toBe("rounded-none")
  })
})
