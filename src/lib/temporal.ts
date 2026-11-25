"use client"

import * as React from "react"
import type { Temporal } from "temporal-polyfill"

// Temporal nativo quando o navegador tem; senão o temporal-polyfill, carregado
// sob demanda (import dinâmico) para não pesar onde ele não faz falta.
// Decisão de 2026-11-25 (datas de calendário em Temporal.PlainDate).

export type TemporalApi = typeof Temporal

let carregado: TemporalApi | undefined = (globalThis as { Temporal?: TemporalApi }).Temporal

/** Promessa do Temporal (nativo ou polyfill). */
async function carregarTemporal(): Promise<TemporalApi> {
  carregado ??= (await import("temporal-polyfill")).Temporal
  return carregado
}

/** O Temporal pronto para uso; `undefined` só enquanto o polyfill carrega. */
function useTemporal() {
  const [api, setApi] = React.useState(carregado)
  React.useEffect(() => {
    if (!api) carregarTemporal().then(setApi)
  }, [api])
  return api
}

export { carregarTemporal, useTemporal }
