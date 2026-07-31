# Auditoria de acessibilidade — Chip (Atom)

Escopo: auditoria estática de código (sem rodar a aplicação, sem leitor de
tela real). Fontes: `.build/componentes/chip.md` (seção "Acessibilidade
mínima exigida") e `src/components/ui/chip.tsx`, cruzados com
`src/components/ui/button.tsx` e `src/components/ui/icon.tsx`. Nenhum
arquivo em `src/` foi alterado.

Veredito geral: **passa em todos os itens exigidos pela spec.** Um ponto
de atenção não coberto pela spec (não bloqueante) é sinalizado no final.

---

## O que passa

### 1. Texto do chip é conteúdo visível real, não depende só de cor

```tsx
<Comp data-slot="chip" data-variant={variant} className={...} {...props}>
  {icon}
  {children}
  {removable && (...)}
</Comp>
```

`children` é renderizado como texto de verdade dentro do elemento raiz —
é nó de texto real na árvore de acessibilidade, lido por qualquer leitor
de tela independente de contraste/cor. A variante `ai-generated` muda
apenas a superfície (`bg-ai-surface`, borda, `text-ai-text-high`); o
texto continua sendo o mesmo `children`. Nenhuma informação é veiculada
só por cor.

### 2. Botão de remover tem nome acessível real via `removeLabel`

```tsx
{removable && (
  <Button
    variant="ghost"
    size="icon-xs"
    aria-label={removeLabel}
    disabled={disabled}
    onClick={onRemove}
  >
    <Icon name="close" />
  </Button>
)}
```

`removeLabel` (default `"Remover"`) é passado como `aria-label` direto
na chamada do `Button`. Em `button.tsx`, o componente não desestrutura
`aria-label` — ele cai em `...props` e é espalhado no elemento nativo
(`Comp = "button"`), então o atributo chega intacto ao DOM. O botão é
ícone-only (`<Icon name="close" />`, sem texto visível), e é exatamente
esse caso que exige `aria-label` — presente e correto. Não há
dependência de `title` ou texto flutuante.

### 3. Botão de remover é alcançável via `Tab` e ativável via `Enter`/`Space`

Em `button.tsx`:

```tsx
const Comp = asChild ? Slot.Root : "button"
...
<Comp data-slot="button" data-variant={variant} data-size={size} ... />
```

Como o `Chip` não passa `asChild` para o `Button` interno, `Comp` resolve
para `"button"` — um elemento `<button>` nativo real, não uma `<div>`/
`<span>` com `onClick`. Foco via `Tab` e ativação via `Enter`/`Space` são
comportamento nativo do elemento, sem necessidade de handler de teclado
customizado. O anel de foco (`focus-visible:ring-[3px]` em
`buttonVariants`) também é herdado de graça.

### 4. `disabled=true` desabilita o botão de remover de verdade (não só visual)

```tsx
function Chip({ ..., disabled = false, ... }) {
  return (
    <Comp ... className={cn(chipVariants({ variant }), removable && "pr-0.5", disabled && "opacity-50", className)} {...props}>
      ...
      {removable && (
        <Button ... disabled={disabled} onClick={onRemove}>
```

`disabled` é passado como prop nomeada para o `Button`. Em `button.tsx`,
`disabled` não é desestruturado explicitamente — cai em `...props` e é
espalhado no `<button>` nativo (`Comp = "button"`, não `asChild` aqui),
então vira o atributo HTML `disabled` de verdade: o botão sai do fluxo
de tab, não dispara `onClick`/`onKeyDown`, e é anunciado como
"desabilitado" pelo leitor de tela — não é `aria-disabled` (que mantém o
elemento focável), é o `disabled` nativo mesmo, como a spec pede
explicitamente ("diferente do padrão de loading síncrono do Button, que
usa `aria-disabled`"). Confere com o código real: `button.tsx` não força
`aria-disabled` — essa variante de estilo (`aria-disabled:opacity-50`)
só é ativada se o chamador passar `aria-disabled` manualmente, o que o
`Chip` não faz.

O `opacity-50` no elemento raiz (`<span>`) é puramente visual/redundante
com o `disabled:opacity-50` que já vem de `buttonVariants` no próprio
botão — não substitui o `disabled` real, só reforça visualmente. OK.

### 5. Elemento raiz (`<span>`) não é focável nem tem interatividade própria

```tsx
const Comp = asChild ? Slot.Root : "span"
return (
  <Comp data-slot="chip" data-variant={variant} className={...} {...props}>
```

O `Chip` em si não define `tabIndex`, `onClick`, `onKeyDown` nem `role`
de elemento interativo no elemento raiz. Não há "clique só funciona com
mouse" embutido no componente — toda a interatividade fica isolada no
`Button` de remover, que é nativamente acessível por teclado (item 3).
Consistente com o precedente `ComboboxChip` já existente no projeto.

**Nota de atenção (não é falha do componente, é responsabilidade de uso)**:
como a spec já previa, o `Chip` aceita `React.ComponentProps<"span">` e
espalha `{...props}` no elemento raiz — nada impede tecnicamente que um
consumidor futuro passe um `onClick` direto no `<Chip onClick={...}>`,
recriando a armadilha de "clique só com mouse" num elemento não focável.
O componente não faz isso por padrão (passa no requisito), mas não há
uma guarda de tipo que bloqueie esse uso incorreto por quem for consumir
o átomo. Sugestão para o `doGuidelines`/`dontGuidelines` (ainda vazios
na spec): documentar explicitamente "não adicionar `onClick` ao `Chip`
raiz — use `removable`/`onRemove`, ou envolva o `Chip` num elemento
interativo próprio (`button`/`Link`) se precisar de clique no corpo
inteiro".

### 6. Tokens de cor — nenhuma cor fixa fora do sistema

```tsx
variants: {
  variant: {
    default: "bg-muted text-foreground",
    "ai-generated": "border border-ai-interactive bg-ai-surface text-ai-text-high",
  },
}
```

Ambas as variantes usam só tokens semânticos já existentes
(`--muted`/`--foreground`, `--ai-interactive`/`--ai-surface`/
`--ai-text-high`). Nenhum hex/rgb solto encontrado em `chip.tsx`. Cálculo
de contraste real fica fora do escopo desta auditoria (pipeline
`/revisar-ds`), nada a sinalizar aqui além disso.

### 7. Ícone opcional (`icon` prop) não quebra o nome acessível do chip

Em `icon.tsx`:

```tsx
const hasA11yProp =
  "aria-label" in props || "aria-labelledby" in props || "role" in props
...
<svg ... aria-hidden={hasA11yProp ? undefined : "true"} ... />
```

Quando o chamador usa `<Chip icon={<Icon name="local_offer" />}>` sem
passar `aria-label`/`aria-labelledby`/`role` ao `Icon`, o SVG recebe
`aria-hidden="true"` automaticamente — fica fora da árvore de
acessibilidade e não interfere no nome acessível do chip, que continua
vindo só do texto (`children`). O mesmo mecanismo cobre o
`<Icon name="close" />` dentro do botão de remover: como ninguém passa
`aria-label` para esse `Icon` (o `aria-label` vai para o `Button`, não
para o `Icon`), o ícone fica `aria-hidden`, e o nome acessível do botão
vem exclusivamente do `aria-label={removeLabel}` do `Button` — sem
duplicação nem conflito de texto.

---

## Ponto de atenção adicional (fora da lista mínima da spec, não bloqueante)

**Botão de remover sem `type="button"` explícito.** `button.tsx` não
define um `type` padrão para o elemento nativo — se o `Chip` for usado
dentro de um `<form>` (ex.: um chip de filtro dentro de um formulário de
busca), o botão de remover herda o `type="submit"` padrão do HTML e pode
submeter o formulário ao ser ativado via clique/`Enter`/`Space`, além de
(ou em vez de) disparar `onRemove`. Isso não é uma falha de
alcançabilidade/nome acessível (os itens exigidos pela spec continuam
todos corretos), mas é um risco funcional/comportamental real para
usuários de teclado dentro de formulários. Recomendação: adicionar
`type="button"` fixo no botão de remover dentro de `chip.tsx` (mesmo
padrão que primitivas do Base UI/Radix costumam aplicar automaticamente
em componentes equivalentes, como visto indiretamente no
`ComboboxPrimitive.ChipRemove` usado por `ComboboxChip`).

---

## Resumo por item da spec

| Item exigido pela spec | Status |
|---|---|
| Nome acessível do chip via texto visível | Passa |
| `aria-label` próprio no botão de remover | Passa |
| Alcançável via `Tab` | Passa |
| Ativável via `Enter`/`Space` | Passa |
| Foco visível herdado do Button | Passa |
| `disabled` nativo real no botão de remover | Passa |
