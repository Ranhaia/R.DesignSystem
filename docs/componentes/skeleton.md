---
slug: skeleton
nome: Skeleton
camada: primitive
codigo: src/components/ui/skeleton.tsx
story: src/components/ui/skeleton.stories.tsx
status: piloto
sinonimos: [esqueleto, placeholder-de-carregamento, shimmer]
vizinhos: [spinner, progress, card]
referencias: [passi:carregando, shadcn:skeleton]
---

# Skeleton

Placeholder com animação de pulso que antecipa o formato do conteúdo durante o carregamento. Reduz a percepção de espera simulando a estrutura visual da tela.

## Quando usar

- Indicar carregamento assíncrono de dados quando a estrutura final do layout já é conhecida (cards, listas, textos).
- Preservar o espaço ocupado por imagens, títulos e blocos para evitar saltos de layout (CLS).
- Compor telas de carregamento estruturadas combinando formas retangulares, circulares e linhas de texto.

## Quando NÃO usar

- Espera sem formato previsível ou quando a duração é indeterminada e rápida → `spinner`.
- Processo com porcentagem, etapas ou progresso numérico mensurável → `progress`.
- Estado de tela sem nenhum dado para exibir após o carregamento → `empty`.

## Anatomia

| Parte | O que é |
|---|---|
| `Skeleton` | Elemento raiz com data-slot="skeleton", animação de pulso suave e fundo bg-accent |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `className` | `string` | — | Classes do Tailwind para definir altura, largura e raio compatíveis com o conteúdo final |

## Variantes

Nenhuma. As dimensões e o formato geométrico são definidos por classes utilitárias no container.

## Tamanhos

Nenhum pré-definido. Deve refletir a altura e largura exatas do elemento que está substituindo.

## Estados

| Estado | Como aparece |
|---|---|
| Carregando | Pulso contínuo com animate-pulse sobre fundo bg-accent com cantos rounded-md |

## Conteúdo

- Não tem texto próprio nem exibe caracteres legíveis.
- O tamanho e a proporção devem mimetizar a extensão média do texto ou imagem que substituirá.
- Em parágrafos simulados, a última linha deve ter largura menor para sugerir uma quebra de linha natural.

## Acessibilidade

- **Teclado:** Não recebe foco. Fica fora da ordem de tabulação.
- **Leitor de tela:** Deve ser omitido de anúncios individuais (aria-hidden="true"); a área mãe deve utilizar aria-busy="true" ou uma região viva discreta.
- **Foco:** Não move nem retém o foco. O foco do usuário é mantido onde estava até que o conteúdo real termine de ser montado.
- **Cuidados:** A animação de pulso deve respeitar a preferência de movimento reduzido (prefers-reduced-motion), e a substituição do skeleton não pode causar saltos de layout (WCAG 2.3.3).

## Tokens usados

- **Cor:** `bg-accent`
- **Raio:** `rounded-md`

## Faça

- Reproduza a geometria e a proporção do componente real que será exibido.
- Use rounded-full para avatares e rounded-md com alturas consistentes para blocos de texto.
- Agrupe múltiplos skeletons na mesma disposição do layout final com classes de grid ou flex.

## NÃO faça

- Usar skeleton quando o tempo de resposta é quase instantâneo → renderize o conteúdo diretamente sem piscar.
- Usar skeleton quando a estrutura final do conteúdo for totalmente imprevisível → `spinner`.
- Manter o skeleton ativo indefinidamente quando a requisição falhar → exiba mensagem de erro com `alert`.

## Exemplo mínimo

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
</div>
```
