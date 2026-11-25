---
slug: drawer
nome: Drawer
camada: organism
codigo: src/components/ui/drawer.tsx
story: src/components/ui/drawer.stories.tsx
status: piloto
sinonimos: [gaveta, bottom-sheet, janela-de-acoes, folha-inferior]
vizinhos: [dialog, sheet, popover]
referencias: [passi:janela-de-acoes, shadcn:drawer]
---

# Drawer

Painel deslizante que emerge das bordas da tela sobre uma camada escurecida, ideal para dispositivos móveis. Permite arrastar para fechar ou tocar fora para dispensar.

## Quando usar

- Ações contextuais ou folhas de opções no celular acessíveis confortavelmente com o polegar.
- Formulários rápidos ou filtros secundários que complementam o fluxo da tela sem perder o contexto.
- Menus de compartilhamento ou confirmações intermediárias em telas pequenas.

## Quando NÃO usar

- Janela centralizada modal com foco obrigatório em telas grandes → `dialog`.
- Painel lateral complexo com formulário longo em desktop → `sheet`.
- Confirmações simples ou avisos rápidos que não exigem resposta → `sonner`.

## Anatomia

| Parte | O que é |
|---|---|
| `Drawer` | Raiz (Vaul), gerencia o ciclo aberto/fechado e a física de arrastar |
| `DrawerTrigger` | Elemento gatilho que abre o painel ao ser acionado |
| `DrawerPortal` | Portal que posiciona o drawer no topo da hierarquia visual |
| `DrawerOverlay` | Camada de fundo semitransparente que escurece o restante da página |
| `DrawerContent` | Painel deslizante com borda e alça visual no topo para direção inferior |
| `DrawerHeader` | Área superior para agrupamento de título e descrição |
| `DrawerTitle` | Título principal da folha, usado como nome acessível |
| `DrawerDescription` | Texto de apoio e contexto associado ao painel |
| `DrawerFooter` | Rodapé para agrupamento de botões de ação e cancelamento |
| `DrawerClose` | Gatilho interno para fechamento da folha |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `open` · `onOpenChange` (Drawer) | `boolean` · `function` | — | Controle de abertura e fechamento do painel |
| `direction` (Drawer) | `"top" \ | "bottom" \ | "left" \ | "right"` | `"bottom"` | Direção da borda de onde o painel desliza |
| `shouldScaleBackground` (Drawer) | `boolean` | `true` | Aplica efeito de recuo e escala suave ao fundo da aplicação |

## Variantes

Não possui variantes de estilo no código; a direção de abertura é controlada pela prop `direction` no componente raiz (`bottom`, `top`, `left`, `right`).

## Tamanhos

Tamanho adaptável. No celular na direção inferior ocupa até 80% da altura da tela (`max-h-[80vh]`). Em painéis laterais ocupa 75% da tela com largura máxima de 384 px (`sm:max-w-sm`).

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | Elementos de painel e sobreposição desmontados ou invisíveis |
| Aberto | Sobreposição com fade e painel `bg-popover` com alça em `bg-muted` |
| Arrastando | Posição acompanha o deslocamento do ponteiro ou polegar |
| Foco | Anel de foco preservado nos elementos interativos internos |

## Conteúdo

- O título deve indicar a tarefa ou o item em foco: "Filtrar resultados" ou "Opções da conta".
- A descrição deve resumir o impacto da ação em uma frase curta.
- O botão de confirmação deve repetir o verbo de ação e o de cancelar deve ser evidente: "Aplicar filtros" e "Cancelar".

## Acessibilidade

- **Teclado:** Tab e Shift+Tab navegam entre os controles focáveis no interior do painel. Esc fecha o drawer imediatamente.
- **Leitor de tela:** Papel `dialog` modal. `DrawerTitle` fornece o nome acessível e `DrawerDescription` a descrição. O restante da interface externa recebe `aria-hidden="true"`.
- **Foco:** Ao abrir, o foco é transferido para o primeiro elemento interagível dentro de `DrawerContent`. Ao fechar, o foco é restaurado para o `DrawerTrigger`.
- **Cuidados:** A interação de arrastar nunca deve ser o único meio de fechar o painel (critério WCAG 2.5.7). Forneça sempre um botão de fechar (`DrawerClose`) ou botão Cancelar explícito.

## Tokens usados

- **Cor:** `bg-muted` `bg-popover` `text-foreground`
  `text-muted-foreground` `text-popover-foreground`
- **Tipografia:** `font-semibold` `text-sm`
- **Espaço:** `bottom-0` `gap-0.5` `gap-1.5` `gap-2` `h-2` `inset-0`
  `inset-x-0` `inset-y-0` `left-0` `max-w-sm` `mb-24` `mt-24` `mt-4`
  `p-4` `right-0` `top-0` `w-25` `w-3`
- **Raio:** `rounded-b-lg` `rounded-full` `rounded-t-lg`

## Faça

- Inclua um botão de fechamento ou cancelamento claro dentro do rodapé da folha.
- Use títulos descritivos para informar sobre qual item a pessoa está agindo.
- Priorize o uso da direção inferior no celular para alcance do polegar.

## NÃO faça

- Usar folha de ações em desktop para formulários densos que cabem melhor em janelas → `dialog`.
- Depender unicamente do gesto de arrastar para fechar o painel → forneça botão `DrawerClose` ou Cancelar.
- Empilhar múltiplos drawers uns sobre os outros na tela → navegue entre passos no mesmo contêiner com `stepper`.

## Exemplo mínimo

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Abrir opções</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Opções do arquivo</DrawerTitle>
      <DrawerDescription>Selecione uma ação para continuar.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Salvar alterações</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```
