---
slug: tooltip
nome: Tooltip
camada: atom
codigo: src/components/ui/tooltip.tsx
story: src/components/ui/tooltip.stories.tsx
status: piloto
sinonimos: [dica, dica-flutuante, hint]
vizinhos: [popover, hover-card]
referencias: [passi:dica-flutuante, shadcn:tooltip]
---

# Tooltip

Balão flutuante que exibe uma explicação curta quando o usuário passa o mouse ou foca um elemento. Descreve ações sem poluir a interface.

## Quando usar

- Explicar a função de botões compostos exclusivamente por ícones.
- Oferecer contexto complementar breve para elementos compactos ou truncados.

## Quando NÃO usar

- Conteúdo rico com links, botões ou ações clicáveis → `popover`.
- Prévia de perfil ou cartão de conteúdo expandido no hover → `hover-card`.

## Anatomia

| Parte | O que é |
|---|---|
| `TooltipProvider` | Provedor de contexto global que gerencia o atraso de exibição (`delayDuration`) |
| `Tooltip` | Componente raiz que coordena os estados de visibilidade e posicionamento |
| `TooltipTrigger` | Elemento gatilho que recebe hover ou foco para abrir o balão |
| `TooltipContent` | Painel flutuante com seta (`TooltipPrimitive.Arrow`) e texto informativo |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `delayDuration` (TooltipProvider) | `number` | `0` | Tempo de espera em milissegundos antes de abrir o tooltip |
| `sideOffset` (TooltipContent) | `number` | `0` | Distância em pixels entre o gatilho e a borda do balão |
| `side` (TooltipContent) | `top` · `right` · `bottom` · `left` | `top` | Lado preferencial de ancoragem em relação ao gatilho |
| `align` (TooltipContent) | `start` · `center` · `end` | `center` | Alinhamento do balão ao longo do eixo do gatilho |

## Variantes

Nenhuma variante pré-definida. O balão utiliza superfície com fundo `bg-popover` e texto `text-popover-foreground`.

## Tamanhos

Ajustado automaticamente ao conteúdo em linha única, com texto compacto (`text-xs`) e preenchimento interno de 6×12 px (`px-3 py-1.5`).

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | Elemento desmontado ou invisível fora da tela |
| Aberto | Animação de entrada suave com fade e leve zoom (`zoom-in-95`) |

## Conteúdo

- Use frases curtas em uma linha, iniciando com verbo imperativo: "Copiar link", "Editar dados".
- Não repita o mesmo texto que já está visível no próprio elemento gatilho.

## Acessibilidade

- **Teclado:** O balão aparece automaticamente quando o elemento gatilho recebe foco e pode ser dispensado pressionando Esc.
- **Leitor de tela:** Papel `role="tooltip"`. O gatilho é associado dinamicamente via `aria-describedby` ao conteúdo da dica.
- **Foco:** O foco permanece sempre no elemento gatilho e nunca se move para dentro do balão.
- **Cuidados:** Permite manter o ponteiro do mouse sobre o próprio balão sem que ele se feche repentinamente, atendendo ao critério WCAG 1.4.13.

## Tokens usados

- **Cor:** `bg-popover` `fill-popover` `text-popover-foreground`
- **Tipografia:** `text-xs`
- **Espaço:** `px-3` `py-1.5` `size-2.5`
- **Raio:** `rounded-md`
- **Sombra:** `shadow-md`

## Faça

- Use em todos os botões que apresentem apenas ícone sem rótulo visível.
- Mantenha o texto extremamente conciso em até uma linha.
- Permita dispensar o tooltip via tecla Esc sem mover o cursor.

## NÃO faça

- Inserir links, botões ou elementos interativos dentro do balão → `popover`.
- Exibir cartões ricos com fotos de perfil ou mídia no hover → `hover-card`.
- Repetir no balão exatamente o mesmo texto já escrito no gatilho → use apenas para complementar.

## Exemplo mínimo

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button type="button">Salvar</button>
    </TooltipTrigger>
    <TooltipContent>
      Salvar alterações
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```
