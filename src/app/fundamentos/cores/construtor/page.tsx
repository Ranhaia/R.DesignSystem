"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  checagensContraste,
  corDaUrl,
  fidelidade,
  sugestao,
  trechoPreset,
  urlDaCor,
  variaveisDoTema,
  type Modo,
} from "@/lib/cor/construtor"
import { checarDaltonismo, type Visao } from "@/lib/cor/daltonismo"
import { gerarTema } from "@/lib/cor/gerar"
import { cn } from "@/lib/utils"

const NOME_VISAO: Record<Visao, string> = {
  normal: "visão típica",
  protanopia: "protanopia",
  deuteranopia: "deuteranopia",
  tritanopia: "tritanopia",
}

const decimal = (n: number) => n.toLocaleString("pt-BR", { maximumFractionDigits: 2 })

function PainelExemplo({
  modo,
  style,
}: {
  modo: Modo
  style: React.CSSProperties
}) {
  return (
    // shortcut: com o site inteiro no modo escuro, o painel claro herda as classes dark: dos componentes, porque a variante é &:is(.dark *) (src/app/globals.css). Trocar por uma prévia isolada em iframe quando o construtor for promovido a ferramenta completa de edição.
    <div
      style={style}
      className={cn(
        "flex flex-col gap-6 rounded-xl border bg-background text-foreground p-6 shadow-sm",
        modo === "escuro" && "dark"
      )}
    >
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="font-heading text-base font-semibold">
          {modo === "claro" ? "Painel Claro" : "Painel Escuro"}
        </h3>
        <Badge variant={modo === "claro" ? "outline" : "secondary"}>
          {modo === "claro" ? "Modo claro" : "Modo escuro"}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Painel do cliente</CardTitle>
          <CardDescription>Resumo dos serviços e faturamento da conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Os indicadores da conta foram atualizados de acordo com as diretrizes do Design System.
          </p>
        </CardContent>
      </Card>

      <Input
        id={`preview-campo-${modo}`}
        label="Nome do projeto"
        placeholder="Ex.: Protótipo de validação"
        defaultValue="Portal do Cliente"
      />

      <Alert>
        <AlertTitle>Ambiente de homologação</AlertTitle>
        <AlertDescription>
          Este protótipo reflete a identidade visual selecionada para o cliente.
        </AlertDescription>
      </Alert>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="default">Ativo</Badge>
        <Badge variant="secondary">Homologação</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default">Salvar alterações</Button>
        <Button variant="destructive">Excluir projeto</Button>
        <Button variant="outline">Cancelar</Button>
      </div>
    </div>
  )
}

export default function ConstrutorDeTemaPage() {
  const [cor, setCor] = React.useState<string>("#1447E6")
  const [hexInput, setHexInput] = React.useState<string>("#1447E6")
  const [nativo, setNativo] = React.useState<Modo>("claro")
  const [nomePreset, setNomePreset] = React.useState<string>("cliente")
  // Só desenha depois de ler o link: senão a prévia nasce com a cor padrão e anima até a do link.
  const [pronto, setPronto] = React.useState(false)

  React.useEffect(() => {
    const doLink = corDaUrl(window.location.search)
    if (doLink) {
      setCor(doLink.cor)
      setHexInput(doLink.cor)
      setNativo(doLink.nativo)
    }
    setPronto(true)
  }, [])

  const atualizarUrl = React.useCallback((novaCor: string, novoModo: Modo) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.pathname}${urlDaCor(novaCor, novoModo)}`
      window.history.replaceState(null, "", url)
    }
  }, [])

  function handleHexChange(novoValor: string) {
    setHexInput(novoValor)
    const limpo = novoValor.replace(/^#/, "").trim()
    if (/^[0-9a-fA-F]{6}$/.test(limpo)) {
      const formatado = `#${limpo.toUpperCase()}`
      setCor(formatado)
      atualizarUrl(formatado, nativo)
    }
  }

  function handleHexBlur() {
    const limpo = hexInput.replace(/^#/, "").trim()
    if (!/^[0-9a-fA-F]{6}$/.test(limpo)) {
      setHexInput(cor)
    }
  }

  function handleColorPickerChange(novoValor: string) {
    const formatado = novoValor.toUpperCase()
    setHexInput(formatado)
    setCor(formatado)
    atualizarUrl(formatado, nativo)
  }

  function handleModoChange(novoModo: string) {
    if (novoModo === "claro" || novoModo === "escuro") {
      setNativo(novoModo)
      atualizarUrl(cor, novoModo)
    }
  }

  const tema = React.useMemo(() => gerarTema(cor), [cor])
  const fidelidadePorModo = React.useMemo(() => fidelidade(cor, tema), [cor, tema])
  const checagens = React.useMemo(() => checagensContraste(tema), [tema])
  const reprovadas = checagens.filter((c) => !c.passa).length
  const falhasDaltonismo = React.useMemo(() => checarDaltonismo(tema), [tema])
  const variaveisClaro = React.useMemo(() => variaveisDoTema(tema.claro), [tema])
  const variaveisEscuro = React.useMemo(() => variaveisDoTema(tema.escuro), [tema])

  const falhasAgrupadas = React.useMemo(() => {
    type GrupoFalha = {
      grupo: string
      modo: Modo
      visoes: Set<Visao>
      sugestao: string
    }
    const agrupado: GrupoFalha[] = []
    for (const f of falhasDaltonismo) {
      let g = agrupado.find((item) => item.grupo === f.grupo && item.modo === f.modo)
      if (!g) {
        g = {
          grupo: f.grupo,
          modo: f.modo,
          visoes: new Set(),
          sugestao: sugestao(f.grupo),
        }
        agrupado.push(g)
      }
      g.visoes.add(f.visao)
    }
    return agrupado
  }, [falhasDaltonismo])

  const { trecho, erroTrecho } = React.useMemo(() => {
    try {
      return {
        trecho: trechoPreset(nomePreset.trim(), cor, nativo),
        erroTrecho: null,
      }
    } catch (err) {
      return {
        trecho: "",
        erroTrecho: err instanceof Error ? err.message : "Nome de preset inválido",
      }
    }
  }, [nomePreset, cor, nativo])

  async function copiar(texto: string, ok: string, falha: string) {
    try {
      await navigator.clipboard.writeText(texto)
      toast(ok)
    } catch {
      toast.error(falha)
    }
  }

  const copiarLink = () =>
    copiar(window.location.href, "Link copiado", "Não deu para copiar. Copie o endereço da barra do navegador.")

  const copiarTrecho = () =>
    trecho
      ? copiar(trecho, "Trecho copiado", "Não deu para copiar. Selecione o trecho e copie à mão.")
      : toast.error("Corrija o nome do preset antes de copiar")

  if (!pronto) return null

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Construtor de tema do cliente
          </h2>
          <p className="text-sm text-muted-foreground">
            Digite a cor da marca do cliente e veja os componentes com o tema dele, mais o que passa no contraste e no daltonismo.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/fundamentos/cores">Voltar para cores</Link>
        </Button>
      </div>

      {/* Entrada */}
      <Card>
        <CardHeader>
          <CardTitle>Entrada</CardTitle>
          <CardDescription>
            Defina a cor principal da identidade visual e o modo nativo da marca.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cor-hex">Cor da marca</Label>
              <div className="flex items-center gap-2">
                <input
                  id="cor-seletor"
                  type="color"
                  value={cor}
                  onChange={(e) => handleColorPickerChange(e.target.value)}
                  aria-label="Seletor visual de cor"
                  className="size-9 cursor-pointer rounded-md border border-input bg-transparent p-0.5"
                />
                <Input
                  id="cor-hex"
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  onBlur={handleHexBlur}
                  placeholder="#1447E6"
                  maxLength={7}
                  className="w-32 font-mono uppercase"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label id="modo-nativo-label">Modo nativo</Label>
              <SegmentedControl
                value={nativo}
                onValueChange={handleModoChange}
                aria-labelledby="modo-nativo-label"
              >
                <SegmentedControlItem value="claro">Claro</SegmentedControlItem>
                <SegmentedControlItem value="escuro">Escuro</SegmentedControlItem>
              </SegmentedControl>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prévia com dois painéis lado a lado */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-heading text-lg font-semibold">Prévia</h2>
          <p className="text-sm text-muted-foreground">
            Visualização com os tokens aplicados diretamente em cada modo.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PainelExemplo modo="claro" style={variaveisClaro as React.CSSProperties} />
          <PainelExemplo modo="escuro" style={variaveisEscuro as React.CSSProperties} />
        </div>
      </div>

      {/* Sua cor x cor usada */}
      <Card>
        <CardHeader>
          <CardTitle>Sua cor × cor usada</CardTitle>
          <CardDescription>
            Comparação da cor informada com a cor aplicada no botão principal (--primary) em cada modo.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fidelidadePorModo.map((item) => (
            <div key={item.modo} className="flex flex-col gap-3 rounded-lg border p-4 bg-card">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-semibold capitalize">
                  Modo {item.modo}
                </span>
                <Badge variant={item.igual ? "secondary" : "outline"}>
                  {item.igual ? "Cor preservada" : "Cor adaptada"}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-md border"
                    style={{ backgroundColor: item.sua }}
                    aria-hidden="true"
                  />
                  <div className="text-xs">
                    <p className="font-medium text-muted-foreground">Sua cor</p>
                    <p className="font-mono">{item.sua}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-md border"
                    style={{ backgroundColor: item.usada }}
                    aria-hidden="true"
                  />
                  <div className="text-xs">
                    <p className="font-medium text-muted-foreground">Cor usada</p>
                    <p className="font-mono">{item.usada}</p>
                  </div>
                </div>
              </div>

              {!item.igual ? (
                <p className="text-xs text-muted-foreground">
                  O motor trocou a cor para o texto passar em 4,5:1 e a ação em 3:1.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  A cor informada atende aos requisitos de contraste e foi mantida sem alterações.
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Checagens */}
      <Card>
        <CardHeader>
          <CardTitle>Checagens de acessibilidade</CardTitle>
          <CardDescription>
            Auditoria automatizada de conformidade WCAG AA e percepção sob daltonismo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Contraste */}
          <div className="flex flex-col gap-3 rounded-lg border p-4 bg-card">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-semibold">Contraste WCAG AA</h3>
              <Badge variant={reprovadas === 0 ? "secondary" : "outline"}>
                {reprovadas === 0 ? "Todas passam" : `${reprovadas} reprovam`}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {reprovadas === 0
                ? `As ${checagens.length} checagens de contraste passam nos pisos WCAG AA (texto em 4,5:1 e interface em 3:1).`
                : `${reprovadas} de ${checagens.length} checagens reprovam nos pisos WCAG AA (texto em 4,5:1 e interface em 3:1).`}
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tabela-contraste" className="border-none">
                <AccordionTrigger className="text-xs text-muted-foreground hover:text-foreground py-2">
                  Exibir tabela de checagens ({checagens.length} pares medidos)
                </AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Modo</TableHead>
                        <TableHead>Grupo</TableHead>
                        <TableHead>Frente</TableHead>
                        <TableHead>Fundo</TableHead>
                        <TableHead>Razão</TableHead>
                        <TableHead>Piso</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {checagens.map((c, i) => (
                        <TableRow key={`${c.modo}-${c.frente}-${c.fundo}-${i}`}>
                          <TableCell className="capitalize">{c.modo}</TableCell>
                          <TableCell>{c.grupo}</TableCell>
                          <TableCell className="font-mono text-xs">{c.frente}</TableCell>
                          <TableCell className="font-mono text-xs">{c.fundo}</TableCell>
                          <TableCell className="font-mono text-xs">{decimal(c.razao)}:1</TableCell>
                          <TableCell className="font-mono text-xs">{decimal(c.piso)}:1</TableCell>
                          <TableCell>
                            <Badge variant={c.passa ? "secondary" : "outline"}>
                              {c.passa ? "Passa" : "Reprova"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Daltonismo */}
          <div className="flex flex-col gap-3 rounded-lg border p-4 bg-card">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-semibold">Simulação de daltonismo</h3>
              <Badge variant={falhasAgrupadas.length === 0 ? "secondary" : "outline"}>
                {falhasAgrupadas.length === 0 ? "Sem falhas" : `${falhasAgrupadas.length} grupos com atenção`}
              </Badge>
            </div>

            {falhasAgrupadas.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Sem falhas de daltonismo identificadas para as visões simuladas (protanopia, deuteranopia e tritanopia).
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  Alguns pares dependem principalmente de cor para diferenciação e podem apresentar confusão perceptual:
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {falhasAgrupadas.map((g, idx) => (
                    <div
                      key={`${g.grupo}-${g.modo}-${idx}`}
                      className="flex flex-col gap-2 rounded-md border p-3 bg-muted/30"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{g.grupo}</span>
                        <Badge variant="outline" className="capitalize text-xs">
                          {g.modo}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Visões afetadas:</span>{" "}
                        {Array.from(g.visoes).map((v) => NOME_VISAO[v]).join(", ")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Sugestão:</span> {g.sugestao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Saída */}
      <Card>
        <CardHeader>
          <CardTitle>Saída</CardTitle>
          <CardDescription>
            Compartilhe a prévia por link direto ou exporte a configuração para cadastrar o preset no repositório.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={copiarLink} variant="outline">
              Copiar link
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="max-w-xs">
              <Input
                id="nome-preset"
                label="Nome do preset"
                value={nomePreset}
                onChange={(e) => setNomePreset(e.target.value)}
                placeholder="ex.: acme"
              />
              {erroTrecho && (
                <p className="mt-1 text-xs text-destructive">{erroTrecho}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bloco-codigo-preset">Trecho do preset</Label>
              <pre
                id="bloco-codigo-preset"
                className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs"
              >
                <code>{trecho || "// Digite um nome válido para gerar o trecho"}</code>
              </pre>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={copiarTrecho} disabled={!trecho}>
                Copiar trecho do preset
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Para virar preset fixo, adicione este trecho em src/lib/cor/presets.ts e execute npm run tokens:gerar, declare o bloco [data-style=&quot;...&quot;] em src/app/globals.css e cadastre a entrada em src/lib/styles-registry.ts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
