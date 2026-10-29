---
slug: direction
nome: Direction
camada: primitive
codigo: src/components/ui/direction.tsx
story:
status: piloto
sinonimos: [direcao, direção, rtl, ltr, texto-bidirecional]
vizinhos: [tabs, slider]
referencias: [shadcn:direction]
---

# Direction

Diz aos componentes qual é o sentido de leitura (da esquerda para a direita ou o contrário). É base que os outros consomem: não renderiza nada.

## Quando usar

- A tela ou um trecho dela é lido da direita para a esquerda (hebraico, árabe).
- Um componente do R.DS precisa seguir o sentido de leitura, como as setas do teclado em abas e controles deslizantes.
- Um código seu precisa saber o sentido atual, com `useDirection`.

## Quando NÃO usar

- A tela toda é da esquerda para a direita, que é o padrão → não use nada.
- Inverter só um elemento solto → atributo `dir` no próprio elemento.
- Espelhar ícones ou margens com CSS → classes `rtl:` do Tailwind.

## Anatomia

| Parte | O que é |
|---|---|
| `DirectionProvider` | Entrega o sentido de leitura (`direction`, ou `dir`) para tudo que está dentro dele. Não cria elemento no HTML |
| `useDirection` | Hook que devolve o sentido atual para quem está dentro do provider |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `direction` | `React.ComponentProps<typeof Direction.DirectionProvider>["dir"]` | — | Sentido de leitura: `ltr` ou `rtl` |
| `dir` | `ltr` · `rtl` | — | Mesmo efeito de `direction`; se vierem os dois, vale `direction` |
| `children` | `React.ReactNode` | — | O que recebe o sentido |

## Variantes

Nenhuma. O componente só repassa o sentido de leitura.

## Tamanhos

Nenhum. Não renderiza nada.

## Estados

Só leitura: não recebe foco.

## Conteúdo

- Não tem texto próprio.
- O texto dentro dele segue o idioma da tela: se o provider é `rtl`, escreva o conteúdo no idioma que se lê assim.

## Acessibilidade

- **Teclado:** Não recebe foco. Os componentes do R.DS feitos sobre o Radix, como `tabs` e `slider`, leem o contexto para que as setas sigam o sentido de leitura.
- **Leitor de tela:** Não anuncia nada. O provider não aplica o atributo `dir` no HTML: ponha `dir` no container (e `lang` na tela) para o leitor de tela usar a voz certa.
- **Foco:** Não recebe nem move o foco.
- **Cuidados:** O provider e o atributo `dir` não se sincronizam sozinhos: passe o mesmo valor aos dois, senão o texto e as setas do teclado vão para lados diferentes (WCAG 1.3.2).

## Tokens usados

Nenhum.

## Faça

- Ponha o provider uma vez, no topo do trecho que muda de sentido.
- Passe o mesmo valor ao `DirectionProvider` e ao atributo `dir` do container.
- Leia o sentido com `useDirection` em vez de comparar o idioma na mão.

## NÃO faça

- Usar o provider para mudar o visual de um elemento → classes `rtl:` do Tailwind.
- Aninhar vários providers com valores diferentes sem necessidade → um só, no ponto onde o sentido muda.
- Esperar que o provider espelhe o layout sozinho → espelhe ícones e espaços com `rtl:` ou com `dir` no container.

## Exemplo mínimo

```tsx
import { DirectionProvider } from "@/components/ui/direction"

<DirectionProvider direction="rtl">
  <div dir="rtl">…</div>
</DirectionProvider>
```
