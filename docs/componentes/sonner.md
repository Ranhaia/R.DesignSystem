---
slug: sonner
nome: Sonner
camada: molecule
codigo: src/components/ui/sonner.tsx
story: src/components/ui/sonner.stories.tsx
status: piloto
sinonimos: [toast, snackbar, aviso-rapido, aviso-rápido, notificacao, notificação]
vizinhos: [alert, alert-dialog, dialog]
referencias: [passi:aviso-rapido, shadcn:sonner]
---

# Sonner

Confirma uma ação ou exibe um aviso rápido sem interromper a pessoa.
Permanece na tela por alguns segundos e desaparece sozinho.

## Quando usar

- Confirmação de ação concluída ou reversível, como "Link copiado" ou "Mensagem enviada".
- Notificação temporária que acompanha o progresso de uma operação assíncrona até o desfecho.
- Aviso rápido do sistema que não bloqueia o fluxo nem exige intervenção imediata.

## Quando NÃO usar

- Erro impeditivo ou decisão crítica que exige resposta obrigatória da pessoa → `alert-dialog`.
- Mensagem persistente que precisa permanecer visível junto ao contexto do conteúdo → `alert`.
- Formulário ou fluxo de múltiplas etapas com entrada de dados → `dialog`.

## Anatomia

| Parte | O que é |
|---|---|
| `Toaster` | Container montado na raiz da aplicação que gerencia a área e o empilhamento das notificações |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `position` (Toaster) | `top-left` · `top-center` · `top-right` · `bottom-left` · `bottom-center` · `bottom-right` | `bottom-right` | Posição onde as notificações são exibidas na janela |
| `richColors` (Toaster) | `boolean` | `false` | Aplica cores temáticas e contrastantes por tipo de notificação |
| `duration` (Toaster) | `number` | `4000` | Tempo padrão de permanência em milissegundos antes de desaparecer |
| `closeButton` (Toaster) | `boolean` | `false` | Exibe botão explícito para fechar cada notificação |

## Variantes

Sem variantes no componente `Toaster`; os tipos de notificação são acionados via chamada de função `toast()`.

## Tamanhos

Tamanho único gerenciado pela biblioteca com largura adaptável ao conteúdo da mensagem.

## Estados

| Estado | Como aparece |
|---|---|
| Entrada | Surge com deslizamento e transição de opacidade na posição configurada |
| Visível | Cartão com fundo `var(--popover)`, texto `var(--popover-foreground)` e borda `var(--border)` |
| Hover | Pausa a contagem regressiva enquanto o cursor estiver sobre a notificação |
| Foco | Botões de ação ou de fechar recebem anel de foco visível |
| Saída | Desliza para fora da tela e reduz a opacidade ao expirar o tempo |

## Conteúdo

- Mensagens curtas e diretas em uma linha: "Link copiado", "Arquivo salvo".
- Verbo no particípio ou passado para confirmar ações já concluídas.
- Ofereça ação rotulada como "Desfazer" quando a operação puder ser revertida.

## Acessibilidade

- **Teclado:** Notificações não capturam foco automaticamente. Quando há ação interativa, ela fica acessível por navegação de teclado antes de o aviso expirar.
- **Leitor de tela:** Renderizado em região viva com `aria-live="polite"` ou `role="status"`, informando a mensagem sem interromper a leitura atual.
- **Foco:** Não move o foco ao surgir para evitar perda de contexto. Foco retorna ao fluxo normal após o encerramento.
- **Cuidados:** Garanta tempo de exibição de pelo menos 4 a 6 segundos e pausa ao passar o mouse ou receber foco (WCAG 2.2.1). Nunca confie apenas em avisos rápidos para alertas críticos (WCAG 2.4.11).

## Tokens usados

- **Cor:** `--border` `--popover` `--popover-foreground`
- **Raio:** `--radius`

## Faça

- Mantenha a mensagem concisa em até uma linha.
- Ofereça ação "Desfazer" para operações destrutivas ou acidentais.
- Reserve o aviso rápido para confirmações pontuais e não impeditivas.

## NÃO faça

- Exibir erros graves que exigem confirmação em aviso temporário → `alert-dialog`.
- Usar para instruções fixas de formulário ou alertas persistentes de página → `alert`.
- Colocar textos longos com múltiplos parágrafos dentro da notificação → `dialog`.

## Exemplo mínimo

```tsx
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

// Montado na raiz da aplicação
<Toaster />

// Acionado em eventos ou respostas
toast("Link copiado com sucesso")
```
