---
slug: input-otp
nome: Input Otp
camada: atom
codigo: src/components/ui/input-otp.tsx
story: src/components/ui/input-otp.stories.tsx
status: piloto
sinonimos: [otp, codigo-de-verificacao, código-de-verificação, pin, 2fa]
vizinhos: [input, field, kbd]
referencias: [passi:codigo-de-verificacao, shadcn:input-otp]
---

# Input Otp

Campo especializado para captura de códigos de verificação pontuais (OTP/2FA). Distribui os caracteres em casas individuais com avanço automático e suporte a colar o código completo.

## Quando usar

- Capturar códigos de autenticação em duas etapas (2FA) e confirmações de segurança.
- Receber senhas descartáveis (OTP) enviadas por e-mail ou SMS com 4, 6 ou 8 dígitos.
- Permitir entrada rápida onde o usuário digita dígito a dígito ou cola o código de uma vez.

## Quando NÃO usar

- Senhas regulares, e-mails ou textos livres de linha única → `input`.
- Código longo com mais de 8 caracteres alfanuméricos contínuos → `input`.
- Seleção de data, hora ou chave numérica com formatação complexa → `field`.

## Anatomia

| Parte | O que é |
|---|---|
| `InputOTP` | Container raiz que envolve o input invisível capturando o valor completo |
| `InputOTPGroup` | Agrupador flexível que alinha e estiliza visualmente um conjunto de slots |
| `InputOTPSlot` | Célula individual para um único caractere com cursor piscante falso |
| `InputOTPSeparator` | Divisor visual intermediário com ícone de traço entre blocos de dígitos |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `containerClassName` | `string` | — | Classe CSS aplicada ao container externo |
| `aria-label` | `string` | `Código de verificação` | Rótulo acessível anunciado para o controle |
| `index` (InputOTPSlot) | `number` | — | Posição sequencial da célula, de 0 a maxLength - 1 |
| `maxLength` (InputOTP) | `number` | — | Quantidade total de caracteres aceitos pelo controle |
| `value` · `defaultValue` (InputOTP) | `string` | — | Valor controlado ou inicial do código completo |
| `onChange` (InputOTP) | `(value: string) => void` | — | Callback chamado a cada alteração no código |
| `disabled` (InputOTP) | `boolean` | `false` | Desabilita o campo e bloqueia digitação |

## Variantes

Nenhuma variante de estilo. As células utilizam bordas e anel de foco do tema.

## Tamanhos

Tamanho único das células com altura e largura de 36 px (h-9 w-9) e texto em text-sm.

## Estados

| Estado | Como aparece |
|---|---|
| Vazio | Borda border-input com fundo padrão sem indicador ativo |
| Ativo | Anel de foco externo de 3 px em ring-ring com cursor falso piscante |
| Preenchido | Exibe o caractere digitado centralizado na célula |
| Desabilitado | Container com opacidade reduzida em 50% e cursor-not-allowed |
| Inválido | Borda em border-destructive e anel sutil em ring-destructive/20 |

## Conteúdo

- Informe com clareza para onde o código foi enviado (ex.: Enviamos um código para seu e-mail).
- Em caso de código inválido ou expirado, informe o erro sem apagar imediatamente os dígitos inseridos.
- Ofereça opção visível para solicitar um novo código após um intervalo de tempo razoável.

## Acessibilidade

- **Teclado:** Ao digitar um dígito, o foco avança automaticamente para a próxima casa. Backspace apaga o caractere e retorna para a casa anterior. Permite colar o código completo de uma vez (Ctrl+V / Cmd+V).
- **Leitor de tela:** Renderiza um input único com aria-label="Código de verificação" para evitar leituras fragmentadas casa a casa. Suporta preenchimento automático de SMS no celular com autocomplete="one-time-code".
- **Foco:** Destaca a célula ativa com borda e anel de 3 px (ring-ring). O foco do navegador permanece no input raiz enquanto a interface projeta o indicador na célula correspondente.
- **Cuidados:** Garanta compatibilidade com cópia e cola e preenchimento automático de senhas (WCAG 3.3.8). Não bloqueie a colagem do código nem apague tudo após o primeiro erro de digitação.

## Tokens usados

- **Cor:** `bg-foreground` `border-destructive` `border-input`
  `border-ring`
- **Tipografia:** `text-sm`
- **Espaço:** `gap-2` `h-4` `h-9` `inset-0` `w-9` `w-px`
- **Raio:** `rounded-l-md` `rounded-r-md`
- **Sombra:** `shadow-xs`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Permita que o usuário cole o código completo recebido por e-mail ou SMS de uma só vez.
- Separe blocos de dígitos com InputOTPSeparator para facilitar a leitura visual de códigos de 6 ou mais dígitos.
- Adicione autocomplete="one-time-code" para habilitar a sugestão automática de código no teclado do celular.

## NÃO faça

- Usar InputOTP para códigos longos com mais de 8 dígitos → use o componente `input` padrão.
- Limpar todos os campos quando o usuário erra um único caractere → mantenha o valor e sinalize o erro.
- Desabilitar a função de colar do sistema operacional → permita colar livremente (WCAG 3.3.8).

## Exemplo mínimo

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```
