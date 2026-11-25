---
slug: chip
nome: Chip
camada: molecule
codigo: src/components/ui/chip.tsx
story: src/components/ui/chip.stories.tsx
status: piloto
sinonimos: [etiqueta, filtro, pill]
vizinhos: [badge, tag]
referencias: [passi:etiqueta, spec:chip]
---

# Chip

Sinaliza um critério ou atributo ativo aplicado a uma busca ou filtragem de lista. Permite ao usuário visualizar e remover regras ativas.

## Quando usar

- Exibir filtros de busca ativos que podem ser desfeitos individualmente pelo usuário ("Categoria: Roupas, Preço até R$ 100").
- Indicar atributos aplicados a uma listagem dinâmica com opção de remoção imediata.
- Sinalizar critérios sugeridos automaticamente por inteligência artificial via variante `ai-generated`.

## Quando NÃO usar

- Exibir rótulo de status só de leitura sem ação de remoção → `badge`
- Categorização de conteúdo fixa e estática sem interatividade de filtro → `tag`
- Disparar uma ação comum do sistema em vez de representar um critério → `button`

## Anatomia

| Parte | O que é |
|---|---|
| `Chip` | Elemento raiz em span que encapsula o rótulo, ícone e botão de remoção |
| `ChipSkeleton` | Placeholder animado que preserva o espaço visual durante o carregamento |

## Composição

Usa: [`button`](button.md) · [`icon`](icon.md) · [`skeleton`](skeleton.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `ai-generated` | `default` | Estilo visual do chip, indicando padrão neutro ou sugestão gerada por IA |
| `asChild` | `boolean` | `false` | Renderiza no elemento filho via Radix Slot em vez de span |
| `icon` | `React.ReactNode` | — | Ícone ilustrativo exibido antes do rótulo |
| `removable` | `boolean` | `false` | Exibe o botão de fechar e remoção à direita |
| `onRemove` | `() => void` | — | Função disparada ao acionar o botão de remoção |
| `removeLabel` | `string` | `Remover` | Texto de acessibilidade (aria-label) do botão de remover |
| `disabled` | `boolean` | `false` | Desativa interações e reduz a opacidade do componente |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Critérios e filtros ativos comuns aplicados manualmente pelo usuário |
| `ai-generated` | Critérios ou atributos sugeridos automaticamente por inteligência artificial |

## Tamanhos

Tamanho único com altura mínima de 24 px (`min-h-6`), garantindo área acessível para o botão de remoção.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Fundo neutro `bg-muted` e texto `text-foreground` (ou superfície de IA em `ai-generated`) |
| Hover | Aplicado ao botão de remover quando presente, herdando o hover da variante ghost |
| Foco | Anel de foco exibido exclusivamente no botão de remoção ao navegar via Tab |
| Desabilitado | Opacidade reduzida a 50% e interações desativadas (`opacity-50 pointer-events-none`) |

## Conteúdo

- Texto curto e conciso de até três palavras sem verbo: "Categoria: Roupas".
- Mantenha o mesmo termo utilizado no seletor ou filtro de origem.
- Em chips removíveis, forneça `removeLabel` claro para leitor de tela: "Remover filtro Categoria".

## Acessibilidade

- **Teclado:** O corpo do chip não recebe foco por padrão. Quando `removable` estiver ativo, o botão de fechar recebe Tab e aciona `onRemove` com Enter ou Espaço.
- **Leitor de tela:** Renderizado em tag semântica de texto. O botão de remoção anuncia o texto acessível configurado em `removeLabel` (padrão "Remover").
- **Foco:** O anel de foco aparece exclusivamente ao redor do botão de remoção ao navegar pelo teclado.
- **Cuidados:** O botão interno de remoção cumpre a área mínima acessível de 24 px; garanta que `removeLabel` descreva qual filtro está sendo removido quando houver múltiplos chips na tela (WCAG 2.5.8 e 4.1.2).

## Tokens usados

- **Cor:** `bg-ai-surface` `bg-muted` `border-ai-interactive`
  `text-ai-text-high` `text-foreground`
- **Tipografia:** `font-medium` `leading-none` `text-xs`
- **Espaço:** `gap-1` `h-6` `min-h-6` `pr-0.5` `px-1.5` `size-3` `w-20`
- **Raio:** `rounded-sm`

## Faça

- Utilize `removeLabel` descritivo quando houver múltiplos filtros na tela ("Remover filtro Roupas").
- Agrupe chips em containers flexíveis com espaçamento consistente (`gap-1.5` ou `gap-2`).
- Use `variant="ai-generated"` para diferenciar atributos sugeridos automaticamente de escolhas manuais.

## NÃO faça

- Usar chip interativo para indicar status estático sem remoção → `badge`
- Utilizar verbos de ação no texto principal do chip → use substantivos e reserve ações para `button`
- Esquecer de definir `onRemove` quando `removable` for verdadeiro → passe a função de callback ou deixe `removable={false}`

## Exemplo mínimo

```tsx
import { Chip } from "@/components/ui/chip"
import { Icon } from "@/components/ui/icon"

<div className="flex flex-wrap gap-2">
  <Chip>Categoria: Roupas</Chip>
  <Chip
    icon={<Icon name="sell" />}
    removable
    removeLabel="Remover filtro Promoção"
    onRemove={() => {}}
  >
    Promoção
  </Chip>
  <Chip variant="ai-generated" removable onRemove={() => {}}>
    Sugestão automática
  </Chip>
</div>
```
