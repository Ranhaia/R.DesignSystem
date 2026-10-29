---
slug: alert
nome: Alert
camada: molecule
codigo: src/components/ui/alert.tsx
story: src/components/ui/alert.stories.tsx
status: piloto
sinonimos: [alerta, callout, banner, aviso, notice, mensagem-na-pagina]
vizinhos: [sonner, alert-dialog, dialog]
referencias: [passi:alerta, shadcn:alert]
---

# Alert

Exibe uma mensagem contextual fixa na página para informar, orientar ou alertar a pessoa. Permanece visível junto ao conteúdo relevante até ser resolvida ou dispensada.

## Quando usar

- Avisos persistentes que exigem atenção antes de prosseguir no formulário ou fluxo.
- Mensagens de erro de validação geral ou falhas de comunicação com o servidor na página.
- Informações contextuais permanentes sobre limites da conta ou status do sistema.

## Quando NÃO usar

- Notificação rápida que confirma uma ação e pode sumir sozinha → `sonner`.
- Erro crítico ou confirmação que bloqueia o fluxo e exige decisão imediata → `alert-dialog`.
- Diálogo com formulário extenso ou conteúdo interativo em janela sobreposta → `dialog`.

## Anatomia

| Parte | O que é |
|---|---|
| `Alert` | Contêiner raiz com `data-slot="alert"` e `role="alert"`, layout em grade para acomodar ícone e texto. |
| `AlertTitle` | Título do alerta com `data-slot="alert-title"`, tipografia em destaque (`font-medium`). |
| `AlertDescription` | Descrição detalhada com `data-slot="alert-description"`, texto secundário com entrelinha relaxada. |
| Ícone (opcional) | SVG inserido diretamente como primeiro filho de `Alert`, alinhado à primeira linha do texto. |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `destructive` | `default` | Define o tom visual e a gravidade da mensagem |
| `...props` | `ComponentProps<"div">` | — | Atributos padrão de contêiner HTML |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Mensagens informativas, avisos gerais ou confirmações contextuais |
| `destructive` | Erros, falhas de sistema ou avisos de bloqueio que impedem a conclusão da tarefa |

## Tamanhos

Tamanho único, adaptável ao conteúdo e à largura do contêiner onde for inserido.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Borda sutil e fundo no tom da variante escolhida (`default` ou `destructive`) |
| Com ícone | Alinha o ícone automaticamente ao topo com espaçamento lateral dedicado |
| Só leitura | Não é um elemento interativo e não recebe foco de teclado por padrão |

## Conteúdo

- O título deve resumir o ocorrido em poucas palavras: "Falha na sincronização".
- A descrição deve orientar o próximo passo concreto: "Verifique sua conexão e tente novamente.".
- Evite termos excessivamente técnicos ou códigos de erro brutos na mensagem para a pessoa usuária.

## Acessibilidade

- **Teclado:** Não recebe foco diretamente. Links ou botões de ação colocados dentro do alerta recebem foco via Tab normalmente.
- **Leitor de tela:** Possui `role="alert"`, sendo anunciado imediatamente pelas tecnologias assistivas quando inserido dinamicamente no DOM.
- **Foco:** Não desloca o foco da pessoa ao ser exibido, exceto se configurado como resumo de erros ao submeter formulário.
- **Cuidados:** A cor não deve ser o único meio de transmitir gravidade; utilize sempre um ícone correspondente e título descritivo (critério WCAG 1.4.1).

## Tokens usados

- **Cor:** `bg-card` `text-card-foreground` `text-destructive`
  `text-muted-foreground`
- **Tipografia:** `font-medium` `leading-relaxed` `text-sm`
  `tracking-tight`
- **Espaço:** `gap-1` `gap-x-3` `gap-y-0.5` `min-h-4` `px-4` `py-3`
  `size-4`
- **Raio:** `rounded-lg`

## Faça

- Combine ícone e texto descritivo para que o significado não dependa apenas da cor.
- Posicione o alerta próximo ao conteúdo ou campo que gerou a mensagem.
- Indique uma ação clara para a pessoa resolver a pendência apontada.

## NÃO faça

- Acumular múltiplos alertas empilhados na mesma página → condense em um único resumo ou use `sonner`.
- Usar variante `destructive` para avisos que não bloqueiam nem causam perda → use variante `default`.
- Exibir códigos de erro opacos sem explicação em linguagem comum → traduza a mensagem com a orientação do que fazer.

## Exemplo mínimo

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icon } from "@/components/ui/icon"

<Alert>
  <Icon name="info" />
  <AlertTitle>Atualização disponível</AlertTitle>
  <AlertDescription>
    Uma nova versão do sistema está pronta para instalação.
  </AlertDescription>
</Alert>
```
