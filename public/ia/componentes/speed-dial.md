---
slug: speed-dial
nome: Speed Dial
camada: molecule
codigo: src/components/ui/speed-dial.tsx
story: src/components/ui/speed-dial.stories.tsx
status: piloto
sinonimos: [botao-flutuante, fab]
vizinhos: [button, icon-button, dropdown-menu, split-button]
referencias: [spec:speed-dial]
---

# Speed Dial

Botão de ação flutuante que se expande em uma sequência de ações secundárias relacionadas.
Permite acessar comandos rápidos sem ocupar espaço permanente na tela.

## Quando usar

- Ações secundárias frequentes em telas operacionais ou móveis, como Compartilhar, Copiar e Imprimir.
- Comandos contextuais rápidos agrupados em um único ponto de contato flutuante.
- Interface onde o espaço visual precisa ficar livre até a pessoa solicitar as opções.

## Quando NÃO usar

- Apenas uma ação principal direta sem variações secundárias → `button` ou `icon-button`.
- Ação principal acompanhada de menu de opções acoplado em linha → `split-button`.
- Lista extensa de opções ou comandos hierárquicos em menus estruturados → `dropdown-menu`.

## Anatomia

| Parte | O que é |
|---|---|
| `SpeedDial` | Contêiner raiz com controle de abertura, clique fora e navegação por teclado |
| Gatilho principal | Botão flutuante com ícone que rotaciona em 45 graus quando aberto |
| Menu flutuante | Lista de botões de ação com animação escalonada na direção configurada |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `actionButtons` | `SpeedDialAction[]` | — | Lista de ações secundárias com ícone, rótulo e manipulador |
| `direction` | `up` · `down` · `left` · `right` | `up` | Direção para onde as ações secundárias se expandem |
| `triggerLabel` | `string` | `Ações rápidas` | Rótulo acessível anunciado para o botão gatilho |
| `defaultOpen` | `boolean` | `false` | Estado inicial de abertura quando não controlado |
| `open` · `onOpenChange` | `boolean` · `(open: boolean) => void` | — | Estado controlado de abertura do menu |

## Variantes

Não tem variantes no código; a direção de expansão é definida pela prop `direction` (`up`, `down`, `left`, `right`).

## Tamanhos

Gatilho principal com 44 px (`size-11`) e botões de ação secundária com 40 px (`size-10`).

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | Gatilho em `bg-primary`, `text-primary-foreground` e ícone com rotação zero |
| Aberto | Ícone do gatilho rotaciona 45 graus e botões secundários surgem com atraso escalonado |
| Hover | Gatilho muda para `bg-primary/90`; botões de ação ganham `bg-accent` e `text-accent-foreground` |
| Pressionado | Aplica redução de escala com `active:scale-(--scale-pressed)` |
| Foco | Anel visível com `focus-visible:ring-2 focus-visible:ring-ring` |
| Desabilitado | Botão de ação com `disabled:opacity-50` e sem resposta a cliques |

## Conteúdo

- Rótulo descritivo obrigatório em cada ação de `actionButtons`: "Compartilhar", "Imprimir".
- Comece os rótulos de ações sempre com verbos de ação no infinitivo.
- Mantenha `triggerLabel` claro e em português: "Ações rápidas" ou "Novo registro".

## Acessibilidade

- **Teclado:** Tab foca o gatilho principal. Espaço ou Enter abre o menu. Setas direcionais navegam entre as ações filhas no eixo da expansão. Escape fecha o menu e devolve o foco ao botão principal.
- **Leitor de tela:** Gatilho possui `aria-haspopup="menu"`, `aria-expanded` e `aria-label` configurado por `triggerLabel`. O contêiner de opções possui `role="menu"` e cada item possui `role="menuitem"` com texto em `.sr-only`.
- **Foco:** Ao fechar via teclado (Escape) ou ao disparar uma ação, o foco retorna imediatamente ao gatilho principal.
- **Cuidados:** Forneça sempre ícones com significados reconhecíveis e garanta rótulos textuais claros em todas as ações secundárias (WCAG 1.3.1, 4.1.2).

## Tokens usados

- **Cor:** `bg-accent` `bg-background` `bg-primary` `border-border`
  `text-accent-foreground` `text-foreground` `text-primary-foreground`
- **Espaço:** `gap-2` `left-1` `mb-3` `ml-3` `mr-3` `mt-3` `size-10`
  `size-11` `size-4` `size-5` `top-1`
- **Raio:** `rounded-lg` `rounded-xl`
- **Sombra:** `shadow-md` `shadow-sm`
- **Movimento:** `--motion-duration-base` `--motion-ease-spring`
  `--scale-pressed` `duration-motion-base` `duration-motion-fast`
  `ease-spring`
- **Foco:** `ring-offset-background` `ring-ring`

## Faça

- Limite a quantidade de ações secundárias entre 3 e 5 itens para facilitar o alcance.
- Defina rótulos textuais claros e acionáveis para todas as opções secundárias.
- Posicione o gatilho em canto livre da tela sem sobrepor áreas essenciais de leitura.

## NÃO faça

- Usar como substituto para uma barra de ferramentas com muitas opções fixas → `toggle-group`.
- Utilizar para acionar apenas um comando isolado sem ações filhas → `button` ou `icon-button`.
- Agrupar ações hierárquicas densas ou aninhadas em botão flutuante → `dropdown-menu`.

## Exemplo mínimo

```tsx
import { SpeedDial } from "@/components/ui/speed-dial"
import { Icon } from "@/components/ui/icon"

<SpeedDial
  direction="up"
  triggerLabel="Ações rápidas"
  actionButtons={[
    {
      key: "compartilhar",
      label: "Compartilhar",
      icon: <Icon name="share" size={1} className="size-4" />,
      action: () => {},
    },
    {
      key: "imprimir",
      label: "Imprimir",
      icon: <Icon name="print" size={1} className="size-4" />,
      action: () => {},
    },
  ]}
/>
```
