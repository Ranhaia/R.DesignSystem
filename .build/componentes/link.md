# Spec — Link (Atom)

Status: especificação apenas — este arquivo documenta a pesquisa; o código
real vive em `src/components/ui/link.tsx` (ver relatório da sessão).
Parente mais próximo (definido no prompt desta tarefa, Fase 6.1 do
`PLANO-LOOP-80-20-TEMPLATES.md`): **Button, variant `"link"`**
(`src/components/ui/button.tsx`).

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/link` — README publicado**
   `https://unpkg.com/@nimbus-ds/link/README.md`
   → existe e foi lido com sucesso (via WebFetch, resumo abaixo é fiel ao
   conteúdo retornado). Descreve: Link habilita navegação entre páginas
   internas ou externas; composto por texto e ícones opcionais; três
   variantes (`primary`, `neutral`, `danger`); guidelines de texto (usar
   linguagem coloquial, endereçada direto ao usuário), guideline de ícone
   em link externo ("external links should include an icon to indicate
   navigation away from the current context" — icone opcional antes/depois
   do texto, omitir dentro de parágrafos corridos); casos de uso
   recomendados (navegação interna, navegação externa, ações menores);
   componente relacionado: Button (mais destaque visual pra ações
   importantes).
2. **`@nimbus-ds/link` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/link/dist/index.d.ts`
   → existe e foi lido com sucesso. API real: `LinkProperties`
   (`appearance: "primary" | "danger" | "neutral"`, `textDecoration: "none"
   | "underline" | "line-through"`, `fontSize`, `lineHeight`),
   `LinkBaseProps` (`LinkProperties` + atributos nativos do elemento HTML),
   `LinkProps` (tipo completo). Componente é **polimórfico** via prop `as`
   (`"a" | "button"`), com `Link.Skeleton` como subcomponente estático
   (`SkeletonProperties`: width/height/borderRadius).
3. `src/components/ui/button.tsx` (`buttonVariants`, variant `"link"`,
   escala de `size`) — fonte de padrão de código exigida pelo prompt desta
   tarefa: reaproveitar exatamente essas classes, não duplicar string.
4. `src/components/ui/chip.tsx` + `chip.stories.tsx` +
   `src/components/examples/chip-demo.tsx` — referência mais recente de
   convenção de código do catálogo (`data-slot`, `cva`/reuso de variants,
   `asChild` via `Slot.Root`, padrão `Componente.Skeleton` via
   `Object.assign`).
5. `src/components/ui/breadcrumb.tsx` (`BreadcrumbLink`) +
   `src/components/examples/breadcrumb-link.tsx` — precedente interno já
   validado de um átomo/molécula deste catálogo que renderiza `<a>` puro
   por padrão e delega a composição com `next/link` pro chamador via
   `asChild` (`<BreadcrumbLink asChild><Link href="/">Início</Link></BreadcrumbLink>`).
   Usado para decidir que `Link` (este componente) não deveria tentar
   detectar sozinho quando renderizar `next/link` internamente.
6. `src/components/examples/item-link.tsx` — precedente interno já
   validado do padrão "link externo": `<a href="#" target="_blank"
   rel="noopener noreferrer">` + `<Icon name="open_in_new" size={1} />`.
   Usado para decidir a implementação da prop `external`.
7. Grep em `src/components/ui/*.tsx` e `src/components/examples/*.tsx`
   por `name="..."` — confirmou `open_in_new` e `arrow_outward` já em uso
   real no projeto como ícones de "sair"/"link externo"
   (`item-link.tsx` usa `open_in_new` num contexto de link; `button-size.tsx`
   e `app/page.tsx` usam `arrow_outward` em botões variant `"link"`).
   Escolhido `open_in_new` por ser o nome semanticamente mais específico
   pra "abre em nova aba/fora do contexto atual" e por já estar em uso
   exatamente sobre um elemento `<a>`.
8. `src/lib/component-docs.ts` (interface `ComponentDoc`, entrada `chip`)
   e os 5 arquivos de registro (`atomic-registry.ts`,
   `components-registry.ts`, `composition-registry.ts`,
   `examples-mapping.ts`, `examples/registry.tsx`) — formato exato de
   saída exigido, não editados diretamente (ver regra da tarefa).

**Não encontrado / não assumido:** comportamento de teclado específico
além do nativo de `<a>` (não há nada a customizar — um link nativo já é
focável via `Tab` e ativável via `Enter`, sem handler customizado
necessário). Prop `as="button"` do Nimbus (polimorfismo pra renderizar
como `<button>`) não foi replicada — foge do escopo desta tarefa, que
pede um elemento `<a>` (ou `Slot` via `asChild`), não um botão disfarçado
de link.

---

## Descrição

*(localizado do README oficial do `@nimbus-ds/link`, fonte 1 acima)*

O Link é um componente que possibilita a navegação entre páginas internas
ou externas. É composto por texto e, opcionalmente, ícones.

## Quando utilizar

*(localizado do README oficial, fonte 1 acima)*

- Para navegar entre seções de um app ou site.
- Para direcionar o usuário a páginas ou aplicações externas — nesse
  caso, inclua um ícone indicando a saída do contexto atual.
- Para executar ações de menor destaque (quando o peso visual de um
  Button seria maior que o necessário).
- O texto do link deve descrever claramente a ação, usando linguagem
  coloquial e endereçada diretamente ao usuário.
- Ícones podem aparecer antes ou depois do texto para reforçar a
  mensagem — exceção: omitir ícone quando o link aparece dentro de um
  parágrafo corrido, para não quebrar o fluxo de leitura.

---

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | `<a>` (ou o elemento filho, via `asChild`) com `data-slot="link"` e `data-size`. Reaproveita exatamente as classes de `buttonVariants({ variant: "link", size })` — mesma cor (`--primary`), mesmo `underline-offset-4 hover:underline`. |
| Label | Texto do link — via `children` (obrigatório, mesmo raciocínio de nome acessível já aplicado a Button/Chip: um link sem texto não tem nome acessível). |
| Ícone de saída (opcional) | Só aparece quando `external=true`. `<Icon name="open_in_new" />` renderizado depois do texto — decisão de posição (depois, não antes) segue o exemplo mais próximo já existente no catálogo (`item-link.tsx`). |
| Skeleton (Link.Skeleton) | Placeholder de carregamento com o mesmo formato do link real por tamanho, mesmo mecanismo de `Button.Skeleton`/`Chip.Skeleton`. |

---

## Composição

Export único: **`Link`** (mesmo padrão de `Chip`/`Badge` — sem
subcomponentes JSX compostos; ícone e comportamento de "externo" são
props, não filhos). `Link.Skeleton` existe como propriedade estática
(`Object.assign`) mas não entra em `composition-registry.ts` — mesmo
tratamento que `Button.Skeleton`/`Chip.Skeleton` já recebem hoje.

Entrada esperada em `composition-registry.ts`:
```ts
"link": ["Link"],
```

---

## Variantes

**Nenhuma variante de cor/aparência.** Decisão explícita da tarefa (não
é uma lacuna de pesquisa): o Nimbus real tem 3 variantes de aparência
(`primary`/`neutral`/`danger`, fonte 2), mas o prompt desta tarefa pediu
explicitamente que `Link` reproduza **a mesma aparência visual da
variant `"link"` do Button já existente neste catálogo** (uma cor só,
`text-primary`) — não uma paleta nova. Registrado aqui como divergência
consciente da fonte real, não como decisão provisória a revisar: é
instrução direta de escopo desta tarefa.

---

## Tamanhos

Herdados 1:1 da escala de `size` do Button (`button.tsx`), restritos aos
tamanhos "de texto" — `default`, `xs`, `sm`, `lg`. Os tamanhos
`icon`/`icon-xs`/`icon-sm`/`icon-lg` do Button não entram: são pensados
pra um alvo quadrado ícone-only, e `Link` sempre carrega texto
(`children` obrigatório), nunca é ícone-only (nem o Nimbus real nem o
Button deste catálogo cobrem um "link ícone-only").

---

## Estados

| Estado | Descrição |
|---|---|
| Default | Estado de repouso — herdado 1:1 da variant `"link"` do Button. |
| Hover | `hover:underline` — herdado 1:1 da variant `"link"` do Button. |
| Focus | `focus-visible:ring` — herdado da classe base de `buttonVariants` (comum a todas as variantes, não específica de `"link"`). |
| Externo | Quando `external=true`: `target="_blank"` + `rel="noopener noreferrer"` + ícone de saída depois do texto. |
| Aria-disabled | Suportado via `aria-disabled` nativo repassado por `...props` (herda `aria-disabled:pointer-events-none aria-disabled:opacity-50` da classe base de `buttonVariants`, comum a todas as variantes) — `<a>` não tem atributo `disabled` HTML nativo, então não existe estado "disabled" (só `aria-disabled`), diferente do Button. |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | `React.ReactNode` | — (obrigatório) | Texto do link. |
| `href` | `string` | — | Herdado de `React.ComponentProps<"a">` (nativo). |
| `size` | `"default" \| "xs" \| "sm" \| "lg"` | `"default"` | Reaproveita a escala de tamanho do Button (subconjunto sem os tamanhos `icon-*`). |
| `external` | `boolean` | `false` | **Decisão provisória** (ver "Modo autônomo" abaixo) — força `target="_blank"` + `rel="noopener noreferrer"` + ícone `open_in_new` depois do texto. |
| `asChild` | `boolean` | `false` | Renderiza as props no elemento filho (via Radix `Slot.Root`) em vez de `<a>` — mesmo mecanismo de `Chip`/`Button`. Uso pretendido: compor com `next/link` (`<Link asChild><NextLink href="/rota">Texto</NextLink></Link>`), mesmo padrão já validado em `BreadcrumbLink`. |
| `target`, `rel` | `string` | — | Nativos de `<a>`; ignorados (sobrescritos) quando `external=true`. |
| `...props` | `React.ComponentProps<"a">` | — | Demais atributos nativos do elemento raiz. |

---

## Acessibilidade mínima exigida

- **Nome acessível**: `children` é texto visível dentro do elemento raiz
  — nenhum `aria-label` adicional necessário no uso comum.
- **Alcançável via `Tab`**: de graça, `<a href="...">` é nativamente
  focável.
- **Ativável via `Enter`**: comportamento nativo de `<a>`, sem handler
  customizado.
- **Foco visível**: herdado do `focus-visible:ring` já presente na
  classe base de `buttonVariants` — nenhum CSS de foco novo escrito.
- **Link externo**: `rel="noopener noreferrer"` sempre presente junto
  com `target="_blank"` quando `external=true` (mitiga
  `window.opener` / reverse tabnabbing) — mesmo par já usado em
  `item-link.tsx`.
- **Ícone de saída não decorativo-only**: `Icon` sem `aria-label` fica
  `aria-hidden="true"` automaticamente (comportamento padrão de
  `icon.tsx`), o que é correto aqui porque o destino externo já está
  identificável pelo texto do link + o `href` real — o ícone é reforço
  visual, não a única pista.

---

## Código de exemplo

```tsx
import { Link } from "@/components/ui/link"

// Link simples
<Link href="/relatorios">Ver relatórios</Link>

// Tamanhos
<Link href="#" size="sm">Link pequeno</Link>
<Link href="#" size="lg">Link grande</Link>

// Link externo (ícone + target/rel automáticos)
<Link href="https://ui.shadcn.com" external>
  Documentação do shadcn/ui
</Link>

// Composição com next/link (navegação interna client-side)
import NextLink from "next/link"
<Link asChild>
  <NextLink href="/dashboard">Ir para o dashboard</NextLink>
</Link>

// Placeholder de carregamento
<Link.Skeleton size="sm" />
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado, mesmo tendo
achado o README real — a tarefa pediu placeholder sem exceção pra esses
dois campos.)

---

## Modo autônomo — decisões tomadas sem Rafael por perto

| Decisão | Alternativa considerada | Como reverter |
|---|---|---|
| `Link` não tem prop `variant` (só a aparência única da variant `"link"` do Button) | Replicar as 3 variantes reais do Nimbus (`primary`/`neutral`/`danger`) | Instrução direta da tarefa, não uma lacuna — só reverter se Rafael pedir explicitamente. Adicionar `variant` com `cva` sobre `buttonVariants({variant:"link"})` como base, em `link.tsx`. |
| Prop `external` (boolean) formalizando `target="_blank"` + `rel="noopener noreferrer"` + ícone `open_in_new` | Deixar o consumidor montar isso manualmente toda vez (como `item-link.tsx` faz hoje, sem prop dedicada) | Remover a prop `external` de `link.tsx` (todo o bloco fica isolado nas ~6 linhas finais do componente); demos/stories que a usam precisariam de ajuste manual. |
| `Link` não detecta sozinho `href` interno pra decidir renderizar `next/link` internamente — sempre `<a>` puro (ou `asChild`) | Lógica interna tipo `href.startsWith("/") ? <NextLink> : <a>` | Segue precedente direto (`BreadcrumbLink`). Reverter exigiria adicionar branching de `href` dentro de `link.tsx` — mudança isolada num arquivo só. |
| `Link.Skeleton` incluído (não pedido explicitamente na tarefa, mas é o padrão já estabelecido pra todo átomo com escala de tamanho — Button, Chip) | Não incluir Skeleton, já que a tarefa não pediu | Remover o bloco `LinkSkeleton`/`skeletonSizeClasses` e voltar `export { Link }` sem `Object.assign`; nenhuma outra parte do arquivo depende disso. |
| Ícone de saída usa `open_in_new` (não `arrow_outward`, que também está confirmado em uso) | `arrow_outward` (já usado em `Button variant="link"` no app/page.tsx) | Trocar o nome do ícone na única linha onde `Icon name="open_in_new"` aparece em `link.tsx`. |
