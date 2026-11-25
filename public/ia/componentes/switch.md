---
slug: switch
nome: Switch
camada: atom
codigo: src/components/ui/switch.tsx
story: src/components/ui/switch.stories.tsx
status: piloto
sinonimos: [interruptor, liga-desliga, chave]
vizinhos: [checkbox, toggle]
referencias: [passi:interruptor, shadcn:switch]
---

# Switch

Controle deslizante binário para ativar ou desativar uma preferência. A alteração tem efeito imediato e dispensa botão de confirmação.

## Quando usar

- Ativar ou desativar recursos em telas de configurações e preferências com aplicação imediata.
- Alternar um estado binário independente que não faça parte de um formulário com envio em lote.

## Quando NÃO usar

- A escolha depende de um botão de salvar ou enviar formulário → `checkbox`.
- A escolha é entre duas opções com rótulos textuais próprios → `toggle`.

## Anatomia

| Parte | O que é |
|---|---|
| `Switch` | Trilho (`SwitchPrimitive.Root`) que encapsula o botão deslizante (`SwitchPrimitive.Thumb`) |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `checked` · `defaultChecked` | `boolean` | — | Estado ativado ou desativado, controlado ou inicial |
| `onCheckedChange` | `(checked: boolean) => void` | — | Função disparada ao alternar o estado |
| `disabled` | `boolean` | `false` | Desabilita a interação e reduz a opacidade |
| `size` | `sm` · `default` | `default` | Dimensão do trilho e do botão deslizante |

## Variantes

Nenhuma variante pré-definida. A aparência muda conforme o estado ativado ou desativado.

## Tamanhos

Dois tamanhos controlados pela prop size: default (18×32 px, padrão para páginas e preferências) e sm (14×24 px, para espaços compactos).

## Estados

| Estado | Como aparece |
|---|---|
| Desativado | Trilho com fundo `bg-input` e botão deslizante alinhado à esquerda |
| Ativado | Trilho com fundo `bg-primary` e botão deslocado à direita (`translate-x`) |
| Pressionado | Escala reduzida via `--scale-pressed` e botão contraído |
| Foco | Anel de foco visível com 3 px em `ring-ring` |
| Desabilitado | Opacidade reduzida em 50% (`disabled:opacity-50`) e cursor não permitido |

## Conteúdo

- Use rótulo claro e constante que descreva a funcionalidade: "Notificações por e-mail", "Modo escuro".
- Não mude o texto do rótulo entre "Ativado" e "Desativado"; a posição do controle já indica o estado.

## Acessibilidade

- **Teclado:** Tab chega ao controle. Espaço ou Enter alterna entre ativado e desativado.
- **Leitor de tela:** Papel `role="switch"` (Radix). Anuncia o estado `aria-checked` ("ligado" ou "desligado") e o nome acessível fornecido.
- **Foco:** Anel de 3 px visível em volta do trilho (`focus-visible:ring-ring`).
- **Cuidados:** Associe sempre a um `<Label>` com `htmlFor` ou passe `aria-label` quando não houver texto visível.

## Tokens usados

- **Cor:** `bg-background` `bg-foreground` `bg-input` `bg-primary`
  `bg-primary-foreground` `border-ring`
- **Espaço:** `h-3.5` `size-3` `size-4` `w-6` `w-8`
- **Raio:** `rounded-full`
- **Sombra:** `shadow-xs`
- **Movimento:** `--scale-pressed` `duration-motion-base`
  `duration-motion-fast` `ease-spring`
- **Foco:** `ring-ring`

## Faça

- Use para preferências cujo efeito ocorra imediatamente após o acionamento.
- Mantenha o rótulo invariável, independentemente de o estado estar ligado ou desligado.
- Associe o controle a um rótulo textual usando `<Label htmlFor="...">`.

## NÃO faça

- Usar em formulários que exigem confirmação posterior com botão salvar → `checkbox`.
- Alterar o texto do rótulo conforme o estado ligado ou desligado → mantenha o rótulo fixo.
- Deixar o controle sem rótulo visível ou sem `aria-label` → passe nome acessível.

## Exemplo mínimo

```tsx
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

<div className="flex items-center gap-2">
  <Switch id="notificacoes" defaultChecked />
  <Label htmlFor="notificacoes">Notificações por e-mail</Label>
</div>
```
