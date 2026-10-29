---
slug: marker
nome: Marker
camada: atom
codigo: src/components/ui/marker.tsx
story: src/components/ui/marker.stories.tsx
status: piloto
sinonimos: [marcador-de-conversa, divisor-de-chat, evento-de-chat, nota-de-sistema]
vizinhos: [separator, badge, tag]
referencias: [shadcn:marker]
---

# Marker

Exibe status em linha, notas de sistema ou divisores rotulados em conversas e fluxos. Destaca eventos intermediários com ícone opcional e linhas delimitadoras.

## Quando usar

- Marcar eventos de sistema e status temporais em interfaces de chat e mensagens.
- Inserir divisores contextuais com texto centralizado ("ou", "ontem") via variante separator.
- Delimitar seções de notas com linha de borda inferior discreta via variante border.

## Quando NÃO usar

- Linha divisória simples sem texto ou ícone associado → `separator`
- Rótulo compacto de status só de leitura em cards ou tabelas → `badge`
- Etiqueta interativa com suporte a seleção ou remoção → `tag`

## Anatomia

| Parte | O que é |
|---|---|
| `Marker` | Container raiz flexível com data-slot="marker" e suporte a asChild |
| `MarkerIcon` | Container de ícone de 16×16 px com aria-hidden para apoio visual |
| `MarkerContent` | Conteúdo textual com suporte a links sublinhados e alinhamento flexível |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `variant` | `default` · `separator` · `border` | `default` | Estilo visual: padrão simples, divisor com linhas laterais ou borda inferior |
| `asChild` | `boolean` | `false` | Delega a renderização para o elemento filho |

## Variantes

| Valor | Quando usar |
|---|---|
| `default` | Linha informativa simples com ícone e texto para notas de sistema |
| `separator` | Divisor centralizado com linhas de 1 px à esquerda e à direita |
| `border` | Linha delimitadora com borda inferior sutil para fechar blocos de mensagens |

## Tamanhos

Tamanho único com altura mínima de 16 px (`min-h-4`), tipografia de 14 px (`text-sm`) e ícone de 16×16 px.

## Estados

Só leitura: não recebe foco por teclado nem possui estados interativos nativos.

## Conteúdo

- Textos curtos e diretos em tom neutro: "Tokens aplicados", "Ontem às 14:30".
- Em divisores de contexto (variante separator), use conjunções curtas: "ou", "hoje".
- Links inseridos em MarkerContent devem possuir destino claro e texto autoexplicativo.

## Acessibilidade

- **Teclado:** Não recebe foco: o componente possui finalidade informativa e estrutural.
- **Leitor de tela:** MarkerIcon possui aria-hidden por padrão; o texto em MarkerContent é anunciado como texto de suporte.
- **Foco:** Nenhum no container; links ou botões internos recebem foco por Tab na ordem natural.
- **Cuidados:** A cor e as linhas do divisor são decorativas; nunca transmita informações críticas exclusivamente por símbolos sem texto.

## Tokens usados

- **Cor:** `bg-border` `border-border` `text-foreground`
  `text-muted-foreground`
- **Tipografia:** `text-sm`
- **Espaço:** `gap-2` `h-px` `min-h-4` `min-w-0` `ml-1` `mr-1` `pb-2`
  `size-4`

## Faça

- Utilize MarkerIcon com aria-hidden sempre que incluir glifos ou ícones ilustrativos.
- Use a variante separator para criar divisores com texto legível entre mensagens.
- Mantenha textos de sistema concisos e objetivos para não sobrecarregar o fluxo de leitura.

## NÃO faça

- Usar Marker para criar divisões estruturais sem qualquer conteúdo textual → `separator`
- Exibir contadores ou selos de status destacados em cabeçalhos → `badge`
- Usar Marker como botão interativo ou filtro clicável → `tag`

## Exemplo mínimo

```tsx
import { Icon } from "@/components/ui/icon"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

<Marker>
  <MarkerIcon>
    <Icon name="check_circle" />
  </MarkerIcon>
  <MarkerContent>Etapa concluída</MarkerContent>
</Marker>

<Marker variant="separator">
  <MarkerContent>ou</MarkerContent>
</Marker>
```
