# Auditoria de acessibilidade — `login-erro-validacao`

- **Escopo auditado:** `src/app/templates/login-erro-validacao/page.tsx` (código estático, sem execução da app).
- **Confrontado com:** seção "Requisitos de acessibilidade específicos desta tela" de `.build/telas/login-erro-validacao.md` (itens 1–6) + o que ela herda de `login-simples.md`.
- **Nota de processo:** esta auditoria foi feita fora do pipeline `/construir-telas` normal (etapas 3/4 não rodaram na hora certa — gap identificado depois, ver `.build/telas/PENDENCIAS.md` item 1) — auditando o código já com os 2 fixes do passe sistêmico do catálogo aplicados (heading semântico do `CardTitle`, `aria-disabled` no botão "Entrar").
- **Não editado por esta auditoria:** os 2 fixes citados acima já estavam feitos antes desta auditoria rodar; nenhuma outra alteração foi feita em `src/` como parte deste documento.

## Resumo

| # | Item | Resultado |
|---|---|---|
| 1 | Banner de credenciais incorretas: `role="alert"` nativo + foco programático, sem `aria-live` duplicado | **Passa** |
| 2 | Campos com erro: `aria-invalid` + `aria-describedby` apontando pro `FieldError` | **Passa** |
| 3 | Não sobrepor erro de campo com erro de credenciais no mesmo envio | **Passa** |
| 4 | Foco no primeiro campo inválido (e-mail antes de senha) | **Passa** |
| 5 | Campo de senha limpo no estado 3 sem perder o foco pro banner | **Passa** |
| 6 | Requisitos herdados de `login-simples` (autocomplete, checkbox, link, ordem de tab) | **Passa** |
| — | `CardTitle` não é heading semântico | **Corrigido** (`asChild` + `<h2>`, passe sistêmico 2026-07-23) |
| — | Botão "Entrar" perde foco ao virar `disabled` durante o carregamento | **Corrigido** (`aria-disabled` + guarda em `handleSubmit`, mesmo passe) |
| — | Ícones decorativos (`ShieldCheckIcon`, `CircleAlertIcon`, `EyeIcon`/`EyeOffIcon`) sem `aria-hidden` explícito | **Observação (não bloqueante, gap sistêmico do catálogo — ver PENDENCIAS.md item 4)** |
| — | `role="group"` implícito em `Field`/`InputGroup` | **Observação (padrão herdado do catálogo, não bloqueante)** |

Nenhuma falha real (bloqueante) encontrada. Os 6 requisitos específicos da spec estão implementados corretamente, e os 2 gaps sistêmicos que afetavam a tela (heading do Card, foco no botão desabilitado) já foram corrigidos junto com as telas irmãs no mesmo passe. Restam só as observações de baixo risco já registradas para o catálogo inteiro.

---

## 1. Banner de credenciais incorretas — PASSA

```tsx
{erroCredenciais && (
  <Alert variant="destructive">
    <CircleAlertIcon />
    <AlertTitle ref={bannerRef} tabIndex={-1}>
      E-mail ou senha incorretos
    </AlertTitle>
    <AlertDescription>
      Confira os dados e tente novamente.
    </AlertDescription>
  </Alert>
)}
```
(`login-erro-validacao/page.tsx:195-204`)

- `Alert` já embute `role="alert"` (`alert.tsx`) — anuncia sozinho ao entrar no DOM, sem precisar de `aria-live` adicional em volta (item 1 da spec pede exatamente isso: não duplicar).
- Foco programático confirmado no `useEffect` dedicado (`page.tsx:87-91`): `if (erroCredenciais) bannerRef.current?.focus()`. `tabIndex={-1}` no `AlertTitle` torna o elemento focável via script sem entrar na ordem de Tab normal — padrão correto pra "mover o foco pra um anúncio", já usado em `recuperacao-senha`/`selecao-perfil-corretora`.

## 2. Campos com erro inline — PASSA

```tsx
<Input
  id="email"
  aria-invalid={!!erroEmail}
  aria-describedby={erroEmail ? "email-erro" : undefined}
  ...
/>
{erroEmail && <FieldError id="email-erro">{erroEmail}</FieldError>}
```
(`page.tsx:207-223`, mesma estrutura pro campo de senha em `page.tsx:225-255`)

- `aria-invalid` e `aria-describedby` presentes e condicionados corretamente nos dois campos (e-mail e senha).
- `aria-describedby` só aponta pro `id` do erro quando o erro existe (`undefined` caso contrário) — evita referência a um elemento que não está no DOM.
- `FieldError` (`field.tsx`) já tem `role="alert"` embutido, então cada mensagem se anuncia sozinha ao aparecer — item 2 da spec integralmente atendido.

## 3. Erro de campo não se sobrepõe ao erro de credenciais — PASSA

```tsx
if (proximoErroEmail || proximoErroSenha) {
  setErroCredenciais(false)
  setErroEmail(proximoErroEmail)
  setErroSenha(proximoErroSenha)
  return
}
```
(`page.tsx:127-132`)

- Ao detectar erro de campo (client-side), `erroCredenciais` é explicitamente zerado antes do `return` — o banner de "credenciais incorretas" nunca aparece junto com `aria-invalid` nos campos. Confirma o item 3 da spec: os dois tipos de erro são mutuamente exclusivos na UI, sem redundância que confundiria qual é a causa real.
- No caminho inverso (estado 3, credenciais incorretas), `setErroEmail(null)`/`setErroSenha(null)` já foram chamados antes (`page.tsx:135-136`) — os campos nunca ficam marcados como inválidos individualmente ao mesmo tempo que o banner aparece.

## 4. Foco no primeiro campo inválido — PASSA

```tsx
React.useEffect(() => {
  if (erroEmail) {
    emailRef.current?.focus()
  } else if (erroSenha) {
    senhaRef.current?.focus()
  }
}, [erroEmail, erroSenha])
```
(`page.tsx:75-81`)

- Ordem e-mail → senha respeitada via `if`/`else if` (e-mail sempre ganha prioridade quando os dois estão inválidos, mesma ordem visual do formulário).
- Efeito depende só de `[erroEmail, erroSenha]` — dispara apenas quando um erro passa a existir, não a cada re-render, evitando roubar foco durante a digitação normal (item já confirmado como requisito na spec de `login-simples`, herdado aqui).

## 5. Campo de senha limpo sem perder o foco pro lugar errado — PASSA

```tsx
setCarregando(false)
setSenha("")
setErroCredenciais(true)
```
(`page.tsx:150-152`, dentro do `window.setTimeout` do `handleSubmit`)

- `setSenha("")` roda **antes** de `setErroCredenciais(true)` no mesmo batch de atualização — o `useEffect` que foca o banner (seção 1) só dispara depois que ambos os estados já foram commitados, então o `.focus()` do banner acontece com o campo de senha já vazio. Não existe uma janela em que o foco vá pro campo de senha recém-limpo antes do banner — confirma a preocupação específica do item 5 da spec.

## 6. Requisitos herdados de `login-simples` — PASSA

- `autoComplete="username"`/`autoComplete="current-password"` presentes nos dois campos (`page.tsx:214`, `233`).
- Checkbox "Manter-me conectado" com `Label htmlFor="manter-conectado"` associado (`page.tsx:259-267`).
- "Esqueci minha senha" via `Button variant="link" asChild` envolvendo `<Link>` real do Next — é um `<a href>` de verdade, não `onClick` em elemento não-interativo (`page.tsx:270-274`).
- Ordem de tab visual (e-mail → olho → senha → checkbox → "Esqueci minha senha" → "Entrar") preservada — nenhum `tabIndex` positivo artificial usado em nenhum ponto da tela.

## Observações de baixo risco (não bloqueantes, escopo sistêmico do catálogo)

- Ícones decorativos (`ShieldCheckIcon` no `CardHeader`, `CircleAlertIcon` no banner, `EyeIcon`/`EyeOffIcon` no toggle de senha) sem `aria-hidden="true"` explícito. Inofensivo na prática — leitores de tela já ignoram SVG do lucide sem `role`/`title` — mas é boa prática marcar. Mesmo padrão nas 4 telas irmãs; candidato a passe único no catálogo (ver `.build/telas/PENDENCIAS.md`, item 4), não conserto isolado nesta tela.
- `role="group"` implícito de cada `Field`/`InputGroup` sem nome — verbosidade extra possível em alguns leitores de tela, herdado de `field.tsx`/`input-group.tsx`. Mesma observação já registrada nas telas irmãs.
