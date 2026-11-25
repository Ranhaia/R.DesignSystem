---
slug: aspect-ratio
nome: Aspect Ratio
camada: atom
codigo: src/components/ui/aspect-ratio.tsx
story: src/components/ui/aspect-ratio.stories.tsx
status: piloto
sinonimos: [proporcao, proporção, proporcao-de-imagem, ratio]
vizinhos: [avatar, thumbnail, card]
referencias: [passi:proporcao-de-imagem, shadcn:aspect-ratio]
---

# Aspect Ratio

Mantém a proporção exata entre largura e altura de imagens, vídeos e embeds. Evita que o layout mude de tamanho enquanto o conteúdo carrega.

## Quando usar

- Manter proporções fixas como 16:9 ou 4:3 em vídeos, mapas ou embeds responsivos.
- Padronizar imagens em grades e listas de cards para evitar alturas desalinhadas.
- Reservar o espaço exato de mídia antes do carregamento para prevenir saltos de layout (CLS).

## Quando NÃO usar

- Foto de perfil ou identificação de usuário → `avatar`.
- Miniatura de anexo ou arquivo com ações de visualização → `thumbnail`.
- Container de conteúdo textual que cresce livremente com o texto → `card`.

## Anatomia

| Parte | O que é |
|---|---|
| `AspectRatio` | Container com data-slot="aspect-ratio" que reserva a proporção calculada |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `ratio` (AspectRatio) | `number` | `1` | Proporção entre largura e altura (ex.: 16 / 9) |
| `asChild` (AspectRatio) | `boolean` | `false` | Repassa propriedades e comportamento para o elemento filho |

## Variantes

Nenhuma. A proporção é definida numericamente pela prop ratio.

## Tamanhos

Não tem tamanho fixo. O container acompanha a largura do pai e calcula a altura proporcionalmente.

## Estados

Só leitura: não recebe foco.

## Conteúdo

- Não tem texto próprio.
- O conteúdo interno (imagem ou vídeo) deve conter texto alternativo acessível quando não for decorativo.
- Mantenha legendas e títulos fora do container do AspectRatio, em texto real na estrutura da página.

## Acessibilidade

- **Teclado:** Não recebe foco nem responde a eventos de teclado.
- **Leitor de tela:** Não possui semântica própria. Imagens filhas precisam de atributo alt descritivo ou alt vazio caso sejam decorativas; vídeos precisam de título ou legenda.
- **Foco:** Nenhum. O elemento não é interativo e não altera a ordem natural de tabulação.
- **Cuidados:** Ao aplicar proporções com corte visual (object-cover), garanta que informações visuais cruciais ou rostos não fiquem cortados fora da área visível (WCAG 1.1.1).

## Tokens usados

Nenhum.

## Faça

- Use proporções padronizadas como 16 / 9 para vídeos e 1 para imagens quadradas.
- Combine com object-cover no elemento filho para preencher a área proporcional sem distorção.
- Defina a largura no elemento pai para que o container calcule a altura correspondente.

## NÃO faça

- Esticar ou achatar imagens para caber no container → utilize object-cover ou object-contain.
- Misturar proporções variadas na mesma grade de cards → proporção uniforme em toda a listagem.
- Inserir cards de texto com altura dinâmica dentro da proporção fixa → `card`.

## Exemplo mínimo

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"

<div className="w-full max-w-sm">
  <AspectRatio ratio={16 / 9}>
    <img
      src="/foto.jpg"
      alt="Paisagem ao pôr do sol"
      className="size-full rounded-md object-cover"
    />
  </AspectRatio>
</div>
```
