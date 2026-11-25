---
slug: password-input
nome: Password Input
camada: molecule
codigo: src/components/ui/password-input.tsx
story: src/components/ui/password-input.stories.tsx
status: piloto
sinonimos: [senha, password, campo-de-senha, nova-senha, forca-de-senha, password-strength]
vizinhos: [input, input-otp, field]
referencias: [spec:password-input]
---

# Password Input

Campo de senha montado sobre o `input`, com o botão de mostrar e ocultar. No cadastro, mostra a força da senha e os requisitos enquanto a pessoa digita.

## Quando usar

- Entrar numa conta: a pessoa digita uma senha que já tem.
- Criar ou trocar uma senha (`variant="new"`): a pessoa vê se ela é forte o bastante.

## Quando NÃO usar

- Texto comum, e-mail ou busca → `input`
- Código de verificação enviado por SMS ou e-mail → `input-otp`

## Anatomia

| Parte | O que é |
|---|---|
| `PasswordInput` | Raiz `<div>` com `data-slot="password-input"` e `data-variant`; o `className` vai nela. |
| Campo | O `input`, com `type` alternando entre `password` e `text` e o botão de olho no `endAction`. |
| Força (só `new`) | `<div data-slot="password-strength">` com a barra (`progress`) e o nível Fraca, Média ou Forte. |
| Requisito (só `new`) | Cada `<li data-slot="password-requirement" data-ok>`, com ícone que marca quando o requisito é cumprido. |

## Composição

Usa: [`icon`](icon.md) · [`input`](input.md) · [`progress`](progress.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `label` | `ReactNode` | — | Rótulo do campo (do `input`) |
| `autoComplete` | `string` | `current-password` / `new-password` | Sai do `variant`; um valor explícito vence |
| `variant` | `default` · `new` | `default` | `default` para entrar; `new` para cadastro, com força e requisitos |

## Variantes

Sem variantes de visual. O modo vem da prop `variant`: `default` para entrar, `new` para cadastro e troca de senha.

## Tamanhos

Sem tamanhos próprios: a altura é a do `input`.

## Estados

| Estado | Como aparece |
|---|---|
| Oculta | Caracteres mascarados; o botão diz "Mostrar senha" |
| Visível | Texto aberto; o botão diz "Ocultar senha" |
| Força | Barra de 0 a 4 quartos, com o nível escrito ao lado (só `new`) |
| Requisito cumprido | Ícone de marcado e texto na cor principal (só `new`) |
| Desabilitado | Herdado do `input`: campo e botão sem interação |

## Conteúdo

- O rótulo diz o que pedir: "Senha" para entrar, "Crie uma senha" no cadastro.
- Os requisitos e o nível vêm do dicionário de idioma (pt-BR ou en); não escreva por fora.

## Acessibilidade

- **Teclado:** Tab vai do campo para o botão de olho; Enter ou Espaço alterna mostrar e ocultar.
- **Leitor de tela:** O botão anuncia "Mostrar senha" ou "Ocultar senha". No `new`, força e requisitos ficam ligados ao campo por `aria-describedby`, e o nível é anunciado ao mudar (`aria-live`).
- **Foco:** Anel de foco do `input` no campo e no botão.
- **Cuidados:** Passe `label` ou `aria-label` para o campo ter nome. A cor nunca é o único sinal: o requisito cumprido troca o ícone e o leitor de tela ouve "cumprido" ou "pendente" em cada um. A barra informa o valor (`aria-valuenow`).

## Tokens usados

- **Cor:** `text-foreground` `text-muted-foreground`
- **Tipografia:** `text-xs`
- **Espaço:** `gap-1` `gap-1.5` `gap-2` `min-w-12`

## Faça

- Use `variant="new"` em cadastro e troca de senha.
- Deixe o `autoComplete` padrão, para o gerenciador de senhas acertar.
- Mostre os erros do formulário pelo `field`, junto do campo.

## NÃO faça

- Pedir "confirmar senha" num segundo campo → o botão de olho já deixa conferir
- Usar `input type="password"` solto → `password-input`
- Bloquear colar no campo → deixe colar, o gerenciador de senhas precisa

## Exemplo mínimo

```tsx
import { PasswordInput } from "@/components/ui/password-input"

export function ExemploSenha() {
  return <PasswordInput variant="new" label="Crie uma senha" />
}
```
