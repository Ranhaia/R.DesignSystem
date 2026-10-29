---
slug: message
nome: Message
camada: molecule
codigo: src/components/ui/message.tsx
story: src/components/ui/message.stories.tsx
status: piloto
sinonimos: [mensagem-da-conversa, mensagem-de-chat, chat]
vizinhos: [marker, bubble, avatar]
referencias: [passi:mensagem-da-conversa, shadcn:message]
---

# Message

Estrutura cada turno de fala em interfaces conversacionais ou fluxos de chat. Organiza avatar, cabeçalho, corpo da mensagem e rodapé de ações conforme o emissor.

## Quando usar

- Histórico de mensagens em chats de atendimento ou conversas com assistentes virtuais.
- Exibição alternada de falas do usuário à direita (end) e respostas do sistema à esquerda (start).
- Blocos de diálogo que combinam texto, metadados de envio e ações como copiar ou avaliar.

## Quando NÃO usar

- Marcador de status, evento de sistema ou divisor temporal na linha do tempo → `marker`.
- Notificação flutuante ou aviso temporário disparado pela aplicação → `sonner`.
- Alerta fixo de erro ou contexto dentro da página ou formulário → `alert`.

## Anatomia

| Parte | O que é |
|---|---|
| `MessageGroup` | Container vertical que agrupa uma sequência contínua de mensagens com espaçamento padronizado |
| `Message` | Raiz de um turno de mensagem com suporte a alinhamento à esquerda (start) ou à direita (end) |
| `MessageAvatar` | Slot reservado para avatar do emissor, alinhado na base do conteúdo da mensagem |
| `MessageContent` | Bloco vertical central que empilha cabeçalho, corpo do texto e rodapé |
| `MessageHeader` | Linha superior de metadados contendo nome do autor e horário de envio |
| `MessageFooter` | Linha inferior para ações contextuais como copiar, reagir ou avaliar |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `align` | `start` · `end` | `start` | Alinhamento da mensagem e inversão da ordem visual para o usuário |

## Variantes

Sem variantes no código: a diferenciação visual entre emissor e destinatário é controlada pela prop align (start para o assistente e end para o usuário).

## Tamanhos

Sem variação de tamanho: o container expande conforme o fluxo e o texto, mantendo tipografia e espaçamento consistentes.

## Estados

Só leitura: não recebe foco diretamente.

## Conteúdo

- Identifique claramente o autor no cabeçalho com nome ou função: Você, Assistente.
- Acompanhe o horário ou carimbo de data em formato reduzido: 10:32, Ontem.
- Mantenha tom neutro e objetivo nas respostas do sistema, evitando fingir sentimentos humanos.
- Botões de ação no rodapé devem ter rótulos ou nomes acessíveis explícitos: Copiar resposta, Tentar novamente.

## Acessibilidade

- **Teclado:** O container da mensagem não recebe foco por ser estrutural. Ações interativas em botões ou links internos recebem Tab normalmente.
- **Leitor de tela:** Utilize lista semântica (ul e li) ao agrupar mensagens. Cada mensagem deve anunciar o autor e a mensagem completa após o término da geração.
- **Foco:** Ao enviar ou receber mensagens, mantenha o foco no campo de entrada principal da conversa, sem deslocar o cursor para a nova mensagem.
- **Cuidados:** Respostas geradas por IA não devem ser anunciadas palavra por palavra pelo leitor de tela para evitar poluição sonora (WCAG 4.1.3).

## Tokens usados

- **Cor:** `bg-muted` `text-muted-foreground`
- **Tipografia:** `font-medium` `text-sm` `text-xs`
- **Espaço:** `gap-2` `gap-2.5` `min-w-0` `min-w-8` `px-0` `px-3`
- **Raio:** `rounded-full`

## Faça

- Utilize align="start" para mensagens recebidas e align="end" para falas do próprio usuário.
- Inclua MessageAvatar e MessageHeader para que a autoria fique evidente sem ambiguidade.
- Ofereça ações úteis em MessageFooter, como copiar resposta ou solicitar regeneração.

## NÃO faça

- Mensagem de status temporário ou alerta do sistema solto na conversa → `marker`.
- Notificação rápida com desaparecimento automático após ação → `sonner`.
- Fingir que respostas de inteligência artificial são emitidas por pessoas reais → identifique o assistente no `MessageHeader`.

## Exemplo mínimo

```tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message"

<Message align="start">
  <MessageAvatar>
    <Avatar>
      <AvatarFallback>IA</AvatarFallback>
    </Avatar>
  </MessageAvatar>
  <MessageContent>
    <MessageHeader>Assistente · 10:32</MessageHeader>
    <p className="rounded-xl bg-muted px-3 py-2 text-sm">
      Os tokens foram aplicados com sucesso.
    </p>
  </MessageContent>
</Message>
```
