"use client"

import * as React from "react"

import { dicionario, formatar, IDIOMA_PADRAO, type ChaveTexto, type Idioma } from "./dicionario"

export { dicionario, IDIOMAS, IDIOMA_PADRAO, type ChaveTexto, type Idioma } from "./dicionario"

const IdiomaContext = React.createContext<Idioma>(IDIOMA_PADRAO)

/** Define o idioma dos textos de sistema de todos os componentes abaixo. Sem provider, vale pt-BR. */
function IdiomaProvider({ idioma = IDIOMA_PADRAO, children }: { idioma?: Idioma; children: React.ReactNode }) {
  return <IdiomaContext.Provider value={idioma}>{children}</IdiomaContext.Provider>
}

const useIdioma = () => React.useContext(IdiomaContext)

/** `const t = useTexto(); t("comum.fechar")` — texto de sistema no idioma ativo. */
function useTexto() {
  const idioma = useIdioma()
  return React.useCallback(
    (chave: ChaveTexto, vars?: Record<string, string | number>) => formatar(dicionario[idioma][chave], vars),
    [idioma]
  )
}

export { IdiomaProvider, useIdioma, useTexto }
