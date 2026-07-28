// Eixo "opsz" (optical size) do Material Symbols só aceita 20-48. O prop
// `size` do <Icon> é em rem (1rem = 16px); convertendo pra "px equivalente"
// e saturando na faixa do eixo, ícones grandes ganham traços mais grossos
// automaticamente sem o consumidor do <Icon> precisar pensar nisso.
export function computeOpticalSize(sizeRem: number): number {
  return Math.min(48, Math.max(20, sizeRem * 16))
}
