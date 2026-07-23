// Configuração de contexto pra campos de formulário recorrentes (nome e
// telefone) — pedido do Rafael em 2026-07-23 pra não repetir regex ad hoc
// por tela (era o caso de TELEFONE_REGEX em onboarding.tsx, cada tela com
// sua própria versão frouxa). Única fonte: qualquer tela com campo de
// nome/telefone importa daqui, não escreve regex nova.
//
// Cobre 3 "contextos":
// - Nome (ex: "Nome de exibição") — não exige espaço, aceita 1 palavra só.
// - Nome completo — exige pelo menos 2 palavras (padrão "xxx x" pedido:
//   uma palavra, espaço, mais alguma coisa depois).
// - Telefone — máscara fixa (xx) xxxxx-xxxx (DDD + celular de 9 dígitos,
//   convenção pedida pelo Rafael) e teto de caracteres (não aceita
//   entrada infinita).

// Letras com acento (À-ÖØ-öø-ÿ cobre o range latino usado em português),
// apóstrofo e hífen — cobre nomes reais tipo "D'Angelo", "Ana-Paula",
// "José", sem exigir sanitização prévia do valor digitado.
const PALAVRA_NOME = "[A-Za-zÀ-ÖØ-öø-ÿ'-]+"

// "Nome" — 1 palavra basta, espaço é opcional (não é exigido nem proibido).
export const NOME_REGEX = new RegExp(`^${PALAVRA_NOME}(?:\\s${PALAVRA_NOME})*$`)

// "Nome completo" — mesma base de NOME_REGEX, mas com "+" em vez de "*"
// depois do grupo: exige pelo menos 1 palavra extra depois da primeira,
// ou seja, pelo menos 1 espaço com conteúdo real dos dois lados.
export const NOME_COMPLETO_REGEX = new RegExp(
  `^${PALAVRA_NOME}(?:\\s${PALAVRA_NOME})+$`
)

// Máscara de telefone (xx) xxxxx-xxxx — formata progressivamente conforme
// o usuário digita, sempre a partir dos dígitos "crus" (ignora qualquer
// caractere não numérico já presente, então funciona tanto colando um
// número pré-formatado quanto digitando dígito por dígito). Limitado a 11
// dígitos (2 do DDD + 9 do celular) — dígitos extras são descartados, não
// empurram o formato pra frente.
export function formatarTelefone(valorBruto: string): string {
  const digitos = valorBruto.replace(/\D/g, "").slice(0, 11)

  if (digitos.length === 0) return ""
  if (digitos.length <= 2) return `(${digitos}`
  if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
}

// Tamanho de "(11) 91234-5678" — teto pra passar como `maxLength` do
// <Input>, defesa redundante além da própria formatarTelefone já cortar
// em 11 dígitos (não deixa o campo aceitar entrada infinita mesmo se
// algum dia o onChange não rodar por algum motivo).
export const TELEFONE_MASCARA_MAX_LENGTH = 15

// Valida o valor JÁ formatado (depois de passar por formatarTelefone) —
// confirma que o resultado bate exatamente com o formato (xx) xxxxx-xxxx
// completo, não uma máscara parcial (usuário parou de digitar no meio).
export const TELEFONE_REGEX = /^\(\d{2}\)\s\d{5}-\d{4}$/
