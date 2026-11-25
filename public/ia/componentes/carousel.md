---
slug: carousel
nome: Carousel
camada: organism
codigo: src/components/ui/carousel.tsx
story: src/components/ui/carousel.stories.tsx
status: piloto
sinonimos: [carrossel, slider-de-imagens, galeria]
vizinhos: [pagination, tabs]
referencias: [passi:indicador-de-pagina, shadcn:carousel]
---

# Carousel

Exibe uma sequência de itens e painéis navegáveis horizontalmente ou verticalmente, com suporte a gestos de toque baseado em Embla Carousel.

## Quando usar

- Apresentação de galerias visuais de cartões ou imagens em espaço horizontal restrito.
- Introduções graduais e telas sequenciais curtas (onboarding ou destaques promocionais).

## Quando NÃO usar

- Sequências longas com mais de cinco páginas de conteúdo denso → `pagination`.
- Conteúdos que a pessoa precisa comparar ou visualizar todos juntos na mesma tela → `card`.
- Navegação entre seções distintas da mesma página com painéis fixos → `tabs`.

## Anatomia

| Parte | O que é |
|---|---|
| `Carousel` | Raiz com contexto Embla, captura de teclado e marcação de região acessível |
| `CarouselContent` | Viewport de corte e trilho flexível que agrupa os slides |
| `CarouselItem` | Item individual (slide) com base flexível configurável |
| `CarouselPrevious` | Botão circular com ícone de seta para voltar ao slide anterior |
| `CarouselNext` | Botão circular com ícone de seta para avançar ao próximo slide |

## Composição

Usa: [`button`](button.md) · [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `opts` | `CarouselOptions` | — | Opções de configuração do Embla Carousel (loop, alinhamento, arrasto) |
| `plugins` | `CarouselPlugin` | — | Plugins adicionais do Embla como Autoplay ou WheelGestures |
| `orientation` | `horizontal` · `vertical` | `horizontal` | Eixo de transição dos slides (`horizontal` ou `vertical`) |
| `setApi` | `(api: CarouselApi) => void` | — | Callback que expõe a instância do Embla Carousel para controle externo |
| `variant` (CarouselPrevious) | `ButtonProps["variant"]` | `outline` | Estilo visual do botão anterior herdado de `Button` |
| `size` (CarouselPrevious) | `ButtonProps["size"]` | `icon` | Tamanho do botão anterior |
| `variant` (CarouselNext) | `ButtonProps["variant"]` | `outline` | Estilo visual do botão próximo herdado de `Button` |
| `size` (CarouselNext) | `ButtonProps["size"]` | `icon` | Tamanho do botão próximo |

## Variantes

Nenhuma no componente raiz. A orientação espacial é alternada pela prop `orientation` (`horizontal` ou `vertical`).

## Tamanhos

Sem medidas fixas. Cada `CarouselItem` ocupa 100% da largura por padrão (`basis-full`), ajustável via `className` (`basis-1/2`, `basis-1/3`).

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Slides visíveis no trilho com botões de navegação ativos |
| Extremidade inicial | Botão `CarouselPrevious` desabilitado com opacidade reduzida |
| Extremidade final | Botão `CarouselNext` desabilitado com opacidade reduzida |

## Conteúdo

- Títulos nos cartões internos curtos e claros.
- Mantenha de 3 a 5 itens para evitar cansaço na rolagem.
- Indique visualmente a posição relativa dos slides quando relevante ("1 de 4").

## Acessibilidade

- **Teclado:** Foco no container permite avançar e voltar usando ArrowLeft e ArrowRight. Tab alcança os botões de controle anterior e próximo.
- **Leitor de tela:** Container com `role="region"` e `aria-roledescription="carousel"`. Cada slide possui `role="group"` e `aria-roledescription="slide"`.
- **Foco:** O foco permanece nos botões de navegação ao clicar ou navega pelos links e elementos interativos dentro do slide ativo.
- **Cuidados:** Os botões nativos trazem texto acessível em inglês ("Previous slide" e "Next slide"). Passe botões personalizados ou sobrescreva o texto para leitores de tela em telas em português (WCAG 3.1.2).

## Tokens usados

- **Espaço:** `bottom-12` `left-1` `left-12` `min-w-0` `ml-4` `mt-4`
  `pl-4` `pt-4` `right-12` `size-8` `top-1` `top-12`
- **Raio:** `rounded-full`

## Faça

- Mantenha controles de navegação visíveis e acessíveis por toque e teclado.
- Limite a quantidade de itens em sequências curtas de até 5 slides.
- Ajuste a proporção dos slides com classes utilitárias para exibir múltiplos cartões por tela.

## NÃO faça

- Carrossel automático sem botão de pausa → prejudica leitura e acessibilidade motora.
- Usar para conteúdos extensos ou paginação de registros → `pagination`.
- Esconder informações críticas exclusivamente atrás de slides não visíveis → `card`.

## Exemplo mínimo

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel className="w-full max-w-xs">
  <CarouselContent>
    <CarouselItem>
      <div className="p-4 text-center font-medium">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-4 text-center font-medium">Slide 2</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```
