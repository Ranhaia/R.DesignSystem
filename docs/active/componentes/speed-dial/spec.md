# Spec — Speed Dial (FAB Actions Animado)

Status: Referência técnica registrada para atualização futura.  
Referência externa: [Animata — Animated Speed Dial (Fabs)](https://animata.design/docs/fabs/speed-dial)  
Categoria funcional: `actions` (Taxonomia) | Complexidade: Molecule / Organism (Atomic Design)

---

## 1. Visão Geral e Objetivo

O **Speed Dial** é um padrão de Floating Action Button (FAB) que, ao ser acionado (clique/toque), se expande em uma sequência de ações secundárias relacionadas.

A implementação do **Animata** destaca-se por:
- **Sem barreira de hover (*no hover gate*):** Funciona por toggle explícito (clique/toque), sendo 100% amigável para dispositivos móveis e touch screens.
- **Animação CSS escalonada (*CSS Stagger*):** Cada botão de ação surge com um leve atraso sequencial (`animation-delay`) combinado a escala (`scale(0.82) -> scale(1)`) e translação suave.
- **Zero runtime de animação externa:** Funciona apenas com CSS Keyframes e classes Tailwind, sem necessidade de pacotes JS pesados.
- **Multidirecional:** Suporta expansão para cima (`up`), baixo (`down`), esquerda (`left`) ou direita (`right`).

---

## 2. Anatomia Proposta

```
SpeedDial (Container / Wrapper com menuId e navegação de teclado)
├── SpeedDialTrigger (Botão FAB principal com ícone de '+' que gira para 'x' ou alterna estado)
└── SpeedDialContent / SpeedDialMenu (Lista flutuante com layout flex direction-aware)
    └── SpeedDialAction (Botões filhos com ícone, label/tooltip acessível e ação onClick)
```

### Propriedades Principais
- `direction`: `"up" | "down" | "left" | "right"` (default: `"up"` para FAB no rodapé ou `"right"` para barras laterais).
- `actionButtons`: lista de `{ icon, label, key, action }`.
- `triggerLabel`: label acessível para leitores de tela (`aria-label`).
- `open` / `onOpenChange`: suporte a estado controlado ou não-controlado.

---

## 3. Acessibilidade (A11y) & Teclado

O componente segue boas práticas de menu expansível:
- `aria-expanded`: reflete se as ações secundárias estão visíveis.
- `aria-haspopup="menu"` no botão gatilho.
- **Navegação por setas direcionais:**
  - `up`: Seta Baixo / Cima navega entre as ações.
  - `down`: Seta Cima / Baixo navega entre as ações.
  - `left` / `right`: Seta Esquerda / Direita navega no eixo horizontal.
- **Tecla `Escape`:** fecha o menu e devolve o foco para o botão principal.
- **`touch-manipulation`:** classe para prevenir atrasos de 300ms em toques no mobile.

---

## 4. Integração com os Tokens Semânticos do DS

Conforme as diretrizes de `CLAUDE.md`:
- **Superfície & Backdrop:** `bg-background/85`, `backdrop-blur-xl`, `border border-border/80`, `shadow-lg`.
- **Interação:** `hover:bg-accent`, `text-foreground`, `focus-visible:ring-ring`.
- **Transição de Motion:** Integrado aos tokens `--motion-duration-fast` (150ms) e `@media (prefers-reduced-motion: reduce)` para anular os deslocamentos de `@keyframes`.

---

## 5. Snippet de Exemplo

```tsx
import { SpeedDial } from "@/components/ui/speed-dial"
import { IconCopy, IconShare, IconPrinter, IconDownload } from "@tabler/icons-react"

export function SpeedDialDemo() {
  return (
    <SpeedDial
      direction="up"
      triggerLabel="Ações rápidas"
      actionButtons={[
        { key: "share", label: "Compartilhar", icon: <IconShare className="size-4" />, action: () => {} },
        { key: "copy", label: "Copiar link", icon: <IconCopy className="size-4" />, action: () => {} },
        { key: "print", label: "Imprimir", icon: <IconPrinter className="size-4" />, action: () => {} },
      ]}
    />
  )
}
```
