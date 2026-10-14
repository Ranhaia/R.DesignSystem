import { razao } from "../a11y/contraste"
import { cor, paraOklch, tomDe } from "./espaco"

export const TOKENS_COR = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--destructive-foreground",
  "--border",
  "--input",
  "--ring",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
  "--sidebar",
  "--sidebar-foreground",
  "--sidebar-primary",
  "--sidebar-primary-foreground",
  "--sidebar-accent",
  "--sidebar-accent-foreground",
  "--sidebar-border",
  "--sidebar-ring",
  "--ai-surface",
  "--ai-surface-highlight",
  "--ai-interactive",
  "--ai-interactive-hover",
  "--ai-interactive-pressed",
  "--ai-text-low",
  "--ai-text-high",
] as const

export type Token = (typeof TOKENS_COR)[number]

export type TemaGerado = {
  claro: Record<Token, string> & Record<string, string>
  escuro: Record<Token, string> & Record<string, string>
}

export function gerarTema(fonte: string): TemaGerado {
  const fUpper = fonte.toUpperCase()
  const { H: H0, C: C0 } = paraOklch(fUpper)

  // Seção 3: Paletas a partir da fonte
  const isAcromatico = C0 < 0.01
  const hPrimaria = H0
  const cPrimaria = isAcromatico ? C0 : Math.max(C0, 0.06)

  const hSecundaria = H0
  const cSecundaria = C0 * 0.35

  const hTerciaria = (H0 + 60) % 360
  const cTerciaria = C0 * 0.6

  const hNeutra = H0
  const cNeutra = 0.004

  const hNeutraVar = H0
  const cNeutraVar = 0.01

  const hErro = 25
  const cErro = 0.19

  const hIA = 285
  const cIA = 0.16

  // Helper de paleta
  const pPrimaria = (t: number) => cor(hPrimaria, cPrimaria, t)
  const pSecundaria = (t: number) => cor(hSecundaria, cSecundaria, t)
  const pTerciaria = (t: number) => cor(hTerciaria, cTerciaria, t)
  const pNeutra = (t: number) => cor(hNeutra, cNeutra, t)
  const pNeutraVar = (t: number) => cor(hNeutraVar, cNeutraVar, t)
  const pErro = (t: number) => cor(hErro, cErro, t)
  const pIA = (t: number) => cor(hIA, cIA, t)

  // --- TEMA CLARO ---
  const claro = {} as Record<Token, string>

  claro["--background"] = pNeutra(96)
  claro["--foreground"] = pNeutra(10)
  claro["--card"] = pNeutra(100)
  claro["--card-foreground"] = pNeutra(10)
  claro["--popover"] = pNeutra(100)
  claro["--popover-foreground"] = pNeutra(10)

  claro["--muted"] = pNeutra(94)
  claro["--muted-foreground"] = pNeutraVar(30)

  // Seção 5: Primary e Primary-foreground no claro
  // "--primary no claro é a própria cor-fonte quando ela serve: 3:1 contra --background
  // e algum texto (tom 100 ou tom 10 da primária) com 4,5:1 sobre ela.
  // Senão, --primary vira o tom 40 da primária (o padrão do M3).
  // --primary-foreground no claro é o tom 100 se der 4,5:1 sobre --primary; senão, o tom 10."
  const t100Primaria = pPrimaria(100)
  const t10Primaria = pPrimaria(10)

  let primClaro = fUpper
  let primFgClaro: string

  const passaFonteBg = razao(fUpper, claro["--background"]) >= 3
  const t100Passa = razao(t100Primaria, fUpper) >= 4.5
  const t10Passa = razao(t10Primaria, fUpper) >= 4.5

  if (passaFonteBg && (t100Passa || t10Passa)) {
    primClaro = fUpper
    primFgClaro = t100Passa ? t100Primaria : t10Primaria
  } else {
    primClaro = pPrimaria(40)
    // Se primClaro é tom 40, testamos tom 100 ou 10
    if (razao(t100Primaria, primClaro) >= 4.5) {
      primFgClaro = t100Primaria
    } else {
      primFgClaro = t10Primaria
    }
  }

  claro["--primary"] = primClaro
  claro["--primary-foreground"] = primFgClaro

  claro["--secondary"] = pSecundaria(90)
  claro["--secondary-foreground"] = pSecundaria(10)

  claro["--accent"] = pTerciaria(90)
  claro["--accent-foreground"] = pTerciaria(10)

  claro["--destructive"] = pErro(40)
  claro["--destructive-foreground"] = pErro(100)

  claro["--border"] = pNeutraVar(80)
  claro["--input"] = pNeutraVar(50)
  claro["--ring"] = pPrimaria(40)

  claro["--chart-1"] = pTerciaria(40)
  claro["--chart-2"] = pPrimaria(50)
  claro["--chart-3"] = pSecundaria(60)
  claro["--chart-4"] = pTerciaria(70)
  claro["--chart-5"] = pPrimaria(30)

  claro["--sidebar"] = pNeutra(98)
  claro["--sidebar-foreground"] = pNeutra(10)
  claro["--sidebar-primary"] = claro["--primary"]
  claro["--sidebar-primary-foreground"] = claro["--primary-foreground"]
  claro["--sidebar-accent"] = pSecundaria(90)
  claro["--sidebar-accent-foreground"] = pSecundaria(10)
  claro["--sidebar-border"] = pNeutraVar(80)
  claro["--sidebar-ring"] = pPrimaria(40)

  claro["--ai-surface"] = pIA(98)
  claro["--ai-surface-highlight"] = pIA(95)
  claro["--ai-interactive"] = pIA(90)
  claro["--ai-interactive-hover"] = pIA(80)
  claro["--ai-interactive-pressed"] = pIA(30)
  claro["--ai-text-low"] = pIA(30)
  claro["--ai-text-high"] = pIA(10)

  // --- TEMA ESCURO ---
  const escuro = {} as Record<Token, string>

  escuro["--background"] = pNeutra(6)
  escuro["--foreground"] = pNeutra(90)
  escuro["--card"] = pNeutra(12)
  escuro["--card-foreground"] = pNeutra(90)
  escuro["--popover"] = pNeutra(12)
  escuro["--popover-foreground"] = pNeutra(90)

  escuro["--muted"] = pNeutra(17)
  escuro["--muted-foreground"] = pNeutraVar(80)

  escuro["--primary"] = pPrimaria(80)
  escuro["--primary-foreground"] = pPrimaria(20)

  escuro["--secondary"] = pSecundaria(30)
  escuro["--secondary-foreground"] = pSecundaria(90)

  escuro["--accent"] = pTerciaria(30)
  escuro["--accent-foreground"] = pTerciaria(90)

  escuro["--destructive"] = pErro(80)
  escuro["--destructive-foreground"] = pErro(20)

  escuro["--border"] = pNeutraVar(30)
  escuro["--input"] = pNeutraVar(60)
  escuro["--ring"] = pPrimaria(80)

  escuro["--chart-1"] = pTerciaria(80)
  escuro["--chart-2"] = pPrimaria(70)
  escuro["--chart-3"] = pSecundaria(60)
  escuro["--chart-4"] = pTerciaria(50)
  escuro["--chart-5"] = pPrimaria(90)

  escuro["--sidebar"] = pNeutra(10)
  escuro["--sidebar-foreground"] = pNeutra(90)
  escuro["--sidebar-primary"] = escuro["--primary"]
  escuro["--sidebar-primary-foreground"] = escuro["--primary-foreground"]
  escuro["--sidebar-accent"] = pSecundaria(30)
  escuro["--sidebar-accent-foreground"] = pSecundaria(90)
  escuro["--sidebar-border"] = pNeutraVar(30)
  escuro["--sidebar-ring"] = pPrimaria(80)

  escuro["--ai-surface"] = pIA(10)
  escuro["--ai-surface-highlight"] = pIA(15)
  escuro["--ai-interactive"] = pIA(25)
  escuro["--ai-interactive-hover"] = pIA(35)
  escuro["--ai-interactive-pressed"] = pIA(80)
  escuro["--ai-text-low"] = pIA(80)
  escuro["--ai-text-high"] = pIA(95)

  return { claro, escuro }
}
