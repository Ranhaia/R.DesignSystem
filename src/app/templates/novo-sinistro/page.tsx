"use client"

import * as React from "react"
import Link from "next/link"

import { formatarDataCompleta } from "@/lib/date-formatters"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Attachment,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useFluxoLogin } from "@/components/templates/fluxo-login-context"

// Template "Novo sinistro" — Fase 5B do PLANO-LOOP-80-20-TEMPLATES.md, 2ª
// das 3 telas de seguros (apolices-ativas → novo-sinistro → painel-corretor).
// Moldura de portal idêntica a apolices-ativas (mesma Sidebar mockada, item
// ativo trocado para "Sinistros"). O formulário reaproveita o MECANISMO de 3
// Patterns já catalogados, não cópia: multi-step-form.tsx (Progress +
// aria-live + foco programático no heading, já reaplicado em onboarding),
// upload.tsx (ciclo de vida idle/uploading/processing/error/done da etapa 2)
// e confirmation-dialog.tsx (AlertDialog como gate antes do envio final da
// etapa 3, não uma 4ª etapa do wizard). Nenhuma peça nova.
//
// PROVISÓRIO (ver .build/telas/novo-sinistro.md, "Lacunas" item 1): esta
// tela não recebe a apólice de origem de apolices-ativas — "Apólice
// relacionada" sempre começa vazia, mesma decisão já tomada na fronteira
// anterior do fluxo.

type CenarioEnvio = "sucesso" | "falha"

type UploadState = "idle" | "uploading" | "processing" | "error" | "done"
type UploadItem = { id: string; nome: string; state: UploadState }

const NOMES_ETAPAS = [
  "Dados do sinistro",
  "Anexar documentos",
  "Revisão e confirmação",
] as const

const APOLICES = [
  { value: "AP-1042", label: "AP-1042 — Carla Souza — Auto" },
  { value: "AP-1098", label: "AP-1098 — Marina Prado — Residencial" },
  { value: "AP-1157", label: "AP-1157 — João Batista — Vida" },
  { value: "AP-1244", label: "AP-1244 — Eduardo Lima — Saúde" },
  { value: "AP-1289", label: "AP-1289 — Beatriz Nunes — Residencial" },
] as const

const TIPOS_SINISTRO = [
  { value: "colisao", label: "Colisão/acidente" },
  { value: "roubo", label: "Roubo ou furto" },
  { value: "incendio", label: "Incêndio" },
  { value: "terceiros", label: "Danos a terceiros" },
  { value: "outro", label: "Outro" },
] as const

const APOLICES_LABEL: Record<string, string> = Object.fromEntries(
  APOLICES.map((apolice) => [apolice.value, apolice.label])
)
const TIPOS_LABEL: Record<string, string> = Object.fromEntries(
  TIPOS_SINISTRO.map((tipo) => [tipo.value, tipo.label])
)

function gerarProtocolo(): string {
  const numero = Math.floor(1000 + Math.random() * 9000)
  return `SIN-2026-${numero}`
}

export default function NovoSinistroTemplate() {
  const { selecao } = useFluxoLogin()
  const [cenario, setCenario] = React.useState<CenarioEnvio>("sucesso")

  const [step, setStep] = React.useState(0)

  // Etapa 1 — dados do sinistro
  const [apolice, setApolice] = React.useState("")
  const [tipo, setTipo] = React.useState("")
  const [data, setData] = React.useState<Date>()
  const [descricao, setDescricao] = React.useState("")
  const [erroApolice, setErroApolice] = React.useState<string | null>(null)
  const [erroTipo, setErroTipo] = React.useState<string | null>(null)
  const [erroData, setErroData] = React.useState<string | null>(null)
  const [erroDescricao, setErroDescricao] = React.useState<string | null>(
    null
  )

  // Etapa 2 — anexar documentos (mesmo mecanismo do Pattern upload.tsx)
  const [items, setItems] = React.useState<UploadItem[]>([])
  const [dragging, setDragging] = React.useState(false)
  const [erroAnexos, setErroAnexos] = React.useState<string | null>(null)

  // Etapa 3 — revisão e confirmação
  const [declaracao, setDeclaracao] = React.useState(false)
  const [erroDeclaracao, setErroDeclaracao] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  const [enviando, setEnviando] = React.useState(false)
  const [erroSistema, setErroSistema] = React.useState(false)
  const [concluido, setConcluido] = React.useState(false)
  const [protocolo, setProtocolo] = React.useState("")

  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const apoliceRef = React.useRef<HTMLButtonElement>(null)
  const tipoRef = React.useRef<HTMLButtonElement>(null)
  const dataRef = React.useRef<HTMLButtonElement>(null)
  const descricaoRef = React.useRef<HTMLTextAreaElement>(null)
  const dropzoneRef = React.useRef<HTMLDivElement>(null)
  const uploadInputRef = React.useRef<HTMLInputElement>(null)
  const declaracaoRef = React.useRef<HTMLButtonElement>(null)
  const erroSistemaRef = React.useRef<HTMLDivElement>(null)
  const tituloSucessoRef = React.useRef<HTMLHeadingElement>(null)

  // Foco no heading da etapa a cada troca de step (mesmo mecanismo de
  // onboarding/multi-step-form.tsx) — exceto no mount inicial, pra não
  // competir com o autoFocus do primeiro campo da etapa 1.
  const primeiraRenderizacao = React.useRef(true)
  React.useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  // Foco no primeiro campo inválido da etapa 1, ordem visual: Apólice →
  // Tipo → Data → Descrição — mesmo padrão de onboarding.
  React.useEffect(() => {
    if (erroApolice) {
      apoliceRef.current?.focus()
    } else if (erroTipo) {
      tipoRef.current?.focus()
    } else if (erroData) {
      dataRef.current?.focus()
    } else if (erroDescricao) {
      descricaoRef.current?.focus()
    }
  }, [erroApolice, erroTipo, erroData, erroDescricao])

  // Foco na própria dropzone quando a etapa 2 falha (nenhum anexo concluído).
  React.useEffect(() => {
    if (erroAnexos) {
      dropzoneRef.current?.focus()
    }
  }, [erroAnexos])

  // Foco no Checkbox de declaração quando a etapa 3 falha.
  React.useEffect(() => {
    if (erroDeclaracao) {
      declaracaoRef.current?.focus()
    }
  }, [erroDeclaracao])

  // Foco no título do Alert de erro de sistema.
  React.useEffect(() => {
    if (erroSistema) {
      erroSistemaRef.current?.focus()
    }
  }, [erroSistema])

  // Foco no título da tela de sucesso — troca de conteúdo relevante sem
  // navegação de URL, mesmo mecanismo do tituloSucessoRef de onboarding.
  React.useEffect(() => {
    if (concluido) {
      tituloSucessoRef.current?.focus()
    }
  }, [concluido])

  function addFiles(files: FileList | null) {
    if (!files) return
    const novosItens = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      nome: file.name,
      state: "uploading" as UploadState,
    }))
    setItems((prev) => [...prev, ...novosItens])
    if (erroAnexos) setErroAnexos(null)

    novosItens.forEach((item) => {
      window.setTimeout(() => {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, state: "processing" } : i
          )
        )
      }, 800)
      window.setTimeout(() => {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, state: i.nome.endsWith(".exe") ? "error" : "done" }
              : i
          )
        )
      }, 1800)
    })
  }

  function removerAnexo(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function handleVoltar() {
    if (enviando) return
    setStep((atual) => Math.max(0, atual - 1))
  }

  function enviar() {
    if (enviando) return
    setErroSistema(false)
    setEnviando(true)

    window.setTimeout(() => {
      if (cenario === "falha") {
        setEnviando(false)
        setErroSistema(true)
        return
      }

      setEnviando(false)
      setProtocolo(gerarProtocolo())
      setConcluido(true)
    }, 1200)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (enviando) return

    if (step === 0) {
      const apoliceVazia = !apolice
      const tipoVazio = !tipo
      const dataVazia = !data
      const descricaoVazia = !descricao.trim()

      if (apoliceVazia || tipoVazio || dataVazia || descricaoVazia) {
        setErroApolice(apoliceVazia ? "Selecione a apólice relacionada." : null)
        setErroTipo(tipoVazio ? "Selecione o tipo de sinistro." : null)
        setErroData(dataVazia ? "Selecione a data do ocorrido." : null)
        setErroDescricao(
          descricaoVazia ? "Descreva o que aconteceu." : null
        )
        return
      }

      setErroApolice(null)
      setErroTipo(null)
      setErroData(null)
      setErroDescricao(null)
      setStep(1)
      return
    }

    if (step === 1) {
      const algumConcluido = items.some((item) => item.state === "done")
      if (!algumConcluido) {
        setErroAnexos(
          "Nenhum documento anexado ainda. Anexe pelo menos um arquivo para continuar."
        )
        return
      }
      setErroAnexos(null)
      setStep(2)
      return
    }

    // Etapa 3 — "Enviar sinistro" só abre o gate de confirmação.
    if (!declaracao) {
      setErroDeclaracao(true)
      return
    }
    setErroDeclaracao(false)
    setConfirmOpen(true)
  }

  const anexosConcluidos = items.filter((item) => item.state === "done")

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Template — Novo sinistro
        </h1>
        <p className="text-muted-foreground text-sm">
          Composição de Organisms/Molecules/Atoms já existentes no catálogo —
          nenhuma peça nova foi criada. 2ª das 3 telas de seguros (Fase 5B),
          cobrindo um fluxo multi-etapa com upload e confirmação. Reaproveita
          o mecanismo dos Patterns &ldquo;Multi-step form&rdquo;,
          &ldquo;Upload&rdquo; e &ldquo;Confirmation dialog&rdquo;.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Label htmlFor="cenario-envio" className="text-sm">
            Cenário de envio (demonstração)
          </Label>
          <Select
            value={cenario}
            onValueChange={(valor) => setCenario(valor as CenarioEnvio)}
          >
            <SelectTrigger id="cenario-envio" size="sm" className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sucesso">Sucesso</SelectItem>
              <SelectItem value="falha">Falha ao protocolar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full rounded-lg border">
        <SidebarProvider className="min-h-[720px]">
          <Sidebar collapsible="none" className="hidden h-full md:flex">
            <SidebarHeader className="p-3 text-sm font-medium">
              {selecao?.corretora ?? "Portal do corretor"}
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Portal do corretor</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/templates/painel-corretor">
                        <Icon name="dashboard" />
                        <span>Painel</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/templates/apolices-ativas">
                        <Icon name="verified_user" />
                        <span>Apólices</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive aria-current="page">
                      <Icon name="checklist" />
                      <span>Sinistros</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <div className="min-w-0 flex-1 p-4 md:p-6">
            <Card>
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
                <div className="flex items-center gap-3">
                  {concluido && (
                    <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full">
                      <Icon name="check_circle" size={1.25} />
                    </div>
                  )}
                  <div>
                    <CardTitle asChild>
                      {concluido ? (
                        <h2 ref={tituloSucessoRef} tabIndex={-1}>
                          Sinistro protocolado com sucesso
                        </h2>
                      ) : (
                        <h2>Registrar novo sinistro</h2>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {concluido
                        ? `Protocolo ${protocolo}`
                        : `Etapa ${step + 1} de 3: ${NOMES_ETAPAS[step]}`}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">Ambiente de demonstração</Badge>
              </CardHeader>

              {concluido ? (
                <>
                  <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <Button variant="outline" asChild>
                      <Link href="/templates/apolices-ativas">
                        Voltar para Apólices
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/templates/painel-corretor">
                        Ir para o Painel do corretor
                        <Icon name="arrow_forward" />
                      </Link>
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="contents">
                  <CardContent className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Progress value={((step + 1) / 3) * 100} />
                      <p
                        aria-live="polite"
                        className="text-muted-foreground text-xs"
                      >
                        Etapa {step + 1} de 3: {NOMES_ETAPAS[step]}
                      </p>
                    </div>

                    <h3
                      ref={headingRef}
                      tabIndex={-1}
                      className="font-heading text-base font-semibold outline-none"
                    >
                      {NOMES_ETAPAS[step]}
                    </h3>

                    {step === 0 && (
                      <div className="flex flex-col gap-4">
                        <Field data-invalid={!!erroApolice}>
                          <FieldLabel htmlFor="apolice-relacionada">
                            Apólice relacionada
                          </FieldLabel>
                          <Select
                            value={apolice}
                            onValueChange={(valor) => {
                              setApolice(valor)
                              if (erroApolice) setErroApolice(null)
                            }}
                            disabled={enviando}
                          >
                            <SelectTrigger
                              id="apolice-relacionada"
                              ref={apoliceRef}
                              autoFocus
                              className="w-full"
                              aria-invalid={!!erroApolice}
                              aria-describedby={
                                erroApolice ? "apolice-relacionada-erro" : undefined
                              }
                            >
                              <SelectValue placeholder="Selecione a apólice" />
                            </SelectTrigger>
                            <SelectContent>
                              {APOLICES.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {erroApolice && (
                            <FieldError id="apolice-relacionada-erro">
                              {erroApolice}
                            </FieldError>
                          )}
                        </Field>

                        <FieldSet>
                          <FieldLabel>Tipo de sinistro</FieldLabel>
                          <RadioGroup
                            value={tipo}
                            onValueChange={(valor) => {
                              setTipo(valor)
                              if (erroTipo) setErroTipo(null)
                            }}
                            aria-invalid={!!erroTipo}
                            aria-describedby={
                              erroTipo ? "tipo-sinistro-erro" : undefined
                            }
                          >
                            {TIPOS_SINISTRO.map((item, index) => (
                              <Field key={item.value} orientation="horizontal">
                                <RadioGroupItem
                                  value={item.value}
                                  id={`tipo-${item.value}`}
                                  ref={index === 0 ? tipoRef : undefined}
                                  disabled={enviando}
                                />
                                <FieldLabel
                                  htmlFor={`tipo-${item.value}`}
                                  className="font-normal"
                                >
                                  {item.label}
                                </FieldLabel>
                              </Field>
                            ))}
                          </RadioGroup>
                          {erroTipo && (
                            <FieldError id="tipo-sinistro-erro">
                              {erroTipo}
                            </FieldError>
                          )}
                        </FieldSet>

                        <Field data-invalid={!!erroData}>
                          <FieldLabel htmlFor="data-ocorrido">
                            Data do ocorrido
                          </FieldLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                id="data-ocorrido"
                                ref={dataRef}
                                variant="outline"
                                disabled={enviando}
                                aria-invalid={!!erroData}
                                aria-describedby={
                                  erroData ? "data-ocorrido-erro" : undefined
                                }
                                className={cn(
                                  "w-full justify-start text-left font-normal sm:w-[280px]",
                                  !data && "text-muted-foreground"
                                )}
                              >
                                <Icon name="calendar_today" className="shrink-0" />
                                <span className="truncate">
                                  {data
                                    ? formatarDataCompleta(data)
                                    : "Escolha uma data"}
                                </span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={data}
                                onSelect={(valor) => {
                                  setData(valor)
                                  if (erroData) setErroData(null)
                                }}
                                disabled={{ after: new Date() }}
                              />
                            </PopoverContent>
                          </Popover>
                          {erroData && (
                            <FieldError id="data-ocorrido-erro">
                              {erroData}
                            </FieldError>
                          )}
                        </Field>

                        <Field data-invalid={!!erroDescricao}>
                          <FieldLabel htmlFor="descricao-ocorrido">
                            Descrição do ocorrido
                          </FieldLabel>
                          <Textarea
                            id="descricao-ocorrido"
                            ref={descricaoRef}
                            rows={4}
                            disabled={enviando}
                            value={descricao}
                            onChange={(event) => {
                              setDescricao(event.target.value)
                              if (erroDescricao) setErroDescricao(null)
                            }}
                            aria-invalid={!!erroDescricao}
                            aria-describedby={
                              erroDescricao ? "descricao-ocorrido-erro" : undefined
                            }
                          />
                          {erroDescricao && (
                            <FieldError id="descricao-ocorrido-erro">
                              {erroDescricao}
                            </FieldError>
                          )}
                        </Field>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="flex flex-col gap-3">
                        <div
                          ref={dropzoneRef}
                          role="button"
                          tabIndex={0}
                          onClick={() => uploadInputRef.current?.click()}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault()
                              uploadInputRef.current?.click()
                            }
                          }}
                          onDragOver={(event) => {
                            event.preventDefault()
                            setDragging(true)
                          }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={(event) => {
                            event.preventDefault()
                            setDragging(false)
                            addFiles(event.dataTransfer.files)
                          }}
                          aria-describedby={
                            erroAnexos ? "anexos-erro" : undefined
                          }
                          className={cn(
                            "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 text-center text-sm text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                            dragging && "border-primary bg-primary/5"
                          )}
                        >
                          <Icon name="cloud_upload" className="text-foreground" />
                          <p>Arraste arquivos aqui ou clique para selecionar</p>
                          <p className="text-xs">
                            Documentos sugeridos: boletim de ocorrência, fotos
                            do ocorrido, nota fiscal
                          </p>
                          <input
                            ref={uploadInputRef}
                            type="file"
                            multiple
                            className="sr-only"
                            disabled={enviando}
                            onChange={(event) => addFiles(event.target.files)}
                          />
                        </div>
                        {erroAnexos && (
                          <FieldError id="anexos-erro" role="alert">
                            {erroAnexos}
                          </FieldError>
                        )}

                        {items.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {items.map((item) => (
                              <Attachment
                                key={item.id}
                                state={item.state}
                                size="sm"
                              >
                                <AttachmentMedia>
                                  <Icon name="draft" size={1} />
                                </AttachmentMedia>
                                <AttachmentContent>
                                  <AttachmentTitle>
                                    {item.nome}
                                  </AttachmentTitle>
                                  <AttachmentDescription>
                                    {item.state === "uploading" &&
                                      "Enviando..."}
                                    {item.state === "processing" &&
                                      "Processando..."}
                                    {item.state === "error" &&
                                      "Falha no upload"}
                                    {item.state === "done" && "Concluído"}
                                  </AttachmentDescription>
                                </AttachmentContent>
                                <AttachmentActions>
                                  <Button
                                    size="icon-xs"
                                    variant="ghost"
                                    type="button"
                                    aria-label={`Remover ${item.nome}`}
                                    onClick={() => removerAnexo(item.id)}
                                  >
                                    <Icon name="delete" />
                                  </Button>
                                </AttachmentActions>
                              </Attachment>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {step === 2 &&
                      (erroSistema ? (
                        <div className="flex flex-col gap-4">
                          <Alert variant="destructive">
                            <Icon name="error" />
                            <AlertTitle ref={erroSistemaRef} tabIndex={-1}>
                              Não foi possível protocolar o sinistro
                            </AlertTitle>
                            <AlertDescription>
                              Verifique sua conexão e tente novamente.
                            </AlertDescription>
                          </Alert>

                          <Button
                            type="button"
                            variant="outline"
                            fullWidth
                            onClick={enviar}
                          >
                            <Icon name="restart_alt" />
                            Tentar novamente
                          </Button>
                        </div>
                      ) : (
                        <fieldset
                          disabled={enviando}
                          className="flex flex-col gap-4 border-0 p-0 disabled:opacity-60"
                        >
                          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                            <dt className="text-muted-foreground">
                              Apólice relacionada
                            </dt>
                            <dd>{APOLICES_LABEL[apolice] ?? "—"}</dd>
                            <dt className="text-muted-foreground">
                              Tipo de sinistro
                            </dt>
                            <dd>{TIPOS_LABEL[tipo] ?? "—"}</dd>
                            <dt className="text-muted-foreground">
                              Data do ocorrido
                            </dt>
                            <dd>
                              {data ? formatarDataCompleta(data) : "—"}
                            </dd>
                            <dt className="text-muted-foreground sm:col-span-2">
                              Descrição do ocorrido
                            </dt>
                            <dd className="sm:col-span-2">
                              {descricao || "—"}
                            </dd>
                          </dl>

                          {anexosConcluidos.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                              {anexosConcluidos.map((item) => (
                                <Attachment
                                  key={item.id}
                                  state={item.state}
                                  size="sm"
                                >
                                  <AttachmentMedia>
                                    <Icon name="draft" size={1} />
                                  </AttachmentMedia>
                                  <AttachmentContent>
                                    <AttachmentTitle>
                                      {item.nome}
                                    </AttachmentTitle>
                                    <AttachmentDescription>
                                      Concluído
                                    </AttachmentDescription>
                                  </AttachmentContent>
                                </Attachment>
                              ))}
                            </div>
                          )}

                          <Field data-invalid={erroDeclaracao}>
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id="declaracao"
                                ref={declaracaoRef}
                                checked={declaracao}
                                onCheckedChange={(checked) => {
                                  setDeclaracao(checked === true)
                                  if (erroDeclaracao) setErroDeclaracao(false)
                                }}
                                aria-invalid={erroDeclaracao}
                                aria-describedby={
                                  erroDeclaracao
                                    ? "declaracao-erro"
                                    : undefined
                                }
                              />
                              <Label htmlFor="declaracao">
                                Declaro que as informações fornecidas são
                                verdadeiras
                              </Label>
                            </div>
                            {erroDeclaracao && (
                              <FieldError id="declaracao-erro">
                                Marque a declaração para continuar.
                              </FieldError>
                            )}
                          </Field>

                          <p aria-live="polite" className="sr-only">
                            {enviando ? "Protocolando..." : ""}
                          </p>
                        </fieldset>
                      ))}
                  </CardContent>

                  {!erroSistema && (
                    <CardFooter className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        aria-disabled={step === 0 || enviando}
                        onClick={handleVoltar}
                      >
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        aria-disabled={enviando}
                        aria-busy={enviando}
                      >
                        {enviando ? (
                          <>
                            <Spinner aria-hidden="true" />
                            Protocolando...
                          </>
                        ) : step === 2 ? (
                          "Enviar sinistro"
                        ) : (
                          "Avançar"
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </form>
              )}
            </Card>
          </div>
        </SidebarProvider>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar abertura do sinistro?</AlertDialogTitle>
            <AlertDialogDescription>
              Depois de enviado, o sinistro entra em análise e não pode ser
              editado por aqui. Confira os dados na etapa de revisão antes de
              confirmar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Revisar novamente</AlertDialogCancel>
            <AlertDialogAction onClick={enviar}>
              Confirmar envio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
