---
slug: checkbox
nome: Checkbox
camada: atom
codigo: src/components/ui/checkbox.tsx
story: src/components/ui/checkbox.stories.tsx
status: piloto
sinonimos: [check-box, caixa-de-selecao, caixa-de-seleção, marcar]
vizinhos: [switch, radio-group, field]
referencias: [passi:checkbox, shadcn:checkbox]
---

# Checkbox

Permite marcar ou desmarcar opções independentes em formulários e listagens. Suporta estados marcado, desmarcado e indeterminado.

## Quando usar

- Permitir a escolha de múltiplas opções independentes dentro de uma lista.
- Confirmar aceite de termos, políticas ou condições individuais de um formulário.
- Controlar seleção total em listas com opção "selecionar todos" em estado indeterminado.

## Quando NÃO usar

- Escolha exclusiva de uma única opção entre várias alternativas → `radio-group`.
- Alternância instantânea de configuração que entra em vigor sem botão de salvar → `switch`.
- Mais de 6 opções exclusivas num espaço compacto → `select`.

## Anatomia

| Parte | O que é |
|---|---|
| `Checkbox` | Caixa de seleção raiz com data-slot="checkbox", data-state e indicador de ícone |
| Ícone (interno) | Glifo check ou remove renderizado dentro de CheckboxPrimitive.Indicator |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `checked` (Checkbox) | `boolean` · `indeterminate` | `false` | Estado atual de marcação do checkbox |
| `defaultChecked` (Checkbox) | `boolean` · `indeterminate` | `false` | Estado inicial de marcação quando não controlado |
| `onCheckedChange` (Checkbox) | `(checked: boolean) => void` | — | Callback disparado ao alterar o estado de marcação |
| `disabled` (Checkbox) | `boolean` | `false` | Desabilita interações de clique e teclado |
| `required` (Checkbox) | `boolean` | `false` | Indica que o preenchimento é obrigatório no formulário |

## Variantes

Nenhuma variante de estilo. A aparência segue a cor primária do tema e os estados de seleção.

## Tamanhos

Tamanho único proporcional regulado pelo token CSS `--form-control-size` (16 px por padrão) com cantos arredondados e sombra sutil.

## Estados

| Estado | Como aparece |
|---|---|
| Desmarcado | Borda border-input com fundo transparente e sombra shadow-xs |
| Marcado | Fundo e borda bg-primary com ícone de check em text-primary-foreground |
| Indeterminado | Fundo e borda bg-primary com ícone de traço horizontal em text-primary-foreground |
| Foco | Anel de foco externo de 3 px em ring-ring com border-ring |
| Desabilitado | Opacidade reduzida em 50% com cursor-not-allowed e sem resposta a eventos |
| Inválido | Borda em border-destructive e anel sutil em ring-destructive/20 |

## Conteúdo

- O rótulo associado deve ser uma afirmação clara e positiva (ex.: Quero receber atualizações).
- Evite negações duplas ou frases confusas no rótulo (ex.: Não desejo cancelar minha inscrição).
- Associe sempre um componente label ou field com htmlFor correspondente ao id do Checkbox.

## Acessibilidade

- **Teclado:** Navega com Tab para alcançar o elemento. Tecla Espaço alterna entre marcado e desmarcado.
- **Leitor de tela:** Anuncia papel role="checkbox", nome acessível via label associado e estado atual (marcado, desmarcado ou misto/indeterminado).
- **Foco:** Exibe anel visível de 3 px (ring-ring) com foco pelo teclado. Ao clicar no rótulo de texto, o foco é transferido para a caixa de marcação.
- **Cuidados:** A área de clique deve cobrir tanto a caixa quanto o texto do rótulo para atender à meta de alvo de toque de 24 px (WCAG 2.5.8). Em grupos de opções relacionadas, agrupe com fieldset ou componente field.

## Tokens usados

- **Cor:** `bg-primary` `border-destructive` `border-input`
  `border-primary` `border-ring` `text-primary-foreground`
- **Espaço:** `--form-control-size`
- **Sombra:** `shadow-xs`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Associe sempre a caixa de seleção a um rótulo textual legível com componente label ou id correspondente.
- Torne a linha inteira clicável (caixa + rótulo) para facilitar a interação e aumentar a área de toque.
- Use o estado indeterminado no item pai quando apenas parte dos itens filhos estiver selecionada.

## NÃO faça

- Usar Checkbox para escolhas mutuamente exclusivas onde apenas uma opção é permitida → `radio-group`.
- Acionar salvamentos ou alterações imediatas na aplicação sem confirmação → `switch`.
- Escrever rótulos negativos que invertem o sentido da marcação → afirmativa positiva clara.

## Exemplo mínimo

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="termos" />
  <Label htmlFor="termos">Aceito os termos de uso e condições</Label>
</div>
```
