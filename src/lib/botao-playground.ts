export type PosicaoIcone = "esquerda" | "direita"

// O que o Playground do Button desenha dentro do botão, em ordem. "icone" também é o lugar do Spinner no loading.
export function partesDoBotao(opcoes: {
  size: string
  icone: boolean
  posicao: PosicaoIcone
  loading: boolean
}): ("icone" | "rotulo")[] {
  // Tamanhos icon-* são só ícone: sem ele o botão ficaria vazio.
  if (opcoes.size.startsWith("icon")) return ["icone"]
  // Loading sem o ícone ligado põe o spinner antes do rótulo, como o Playground já fazia.
  if (!opcoes.icone) return opcoes.loading ? ["icone", "rotulo"] : ["rotulo"]
  return opcoes.posicao === "direita" ? ["rotulo", "icone"] : ["icone", "rotulo"]
}
