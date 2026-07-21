# Plano — Documentação estilo Design System (atomic design)

> Pausado por decisão do Rafael (economia de créditos). Este arquivo é o ponto de retomada.

## Referência
Inspiração de estrutura: https://m3.material.io/

## Decisões já tomadas (não perguntar de novo)

1. **Escopo desta fase**: piloto com **1 componente só (Button)**. Só depois de validado, replicar para os outros ~59.
2. **Relação com a página atual**: as novas seções **mesclam na mesma página** de cada componente — Composição e Exemplos continuam existindo, não são substituídas.
3. **Conteúdo textual narrativo** (Descrição, Quando utilizar, Boas práticas, Evite): **só placeholder** `"[a preencher]"`. Não inventar texto — Rafael escreve depois.
4. **Patterns** (Empty State, CRUD, Multi-step Form, Toast Strategy etc.): quando chegar a vez, cada pattern deve ter **exemplo funcional de código** (não só documentação em texto) — ainda não iniciado, é fase futura.

## Mapa de IA completo (referência final, ainda não implementada na navegação)

```
Design System
Foundations
├── Colors / Typography / Spacing / Grid / Radius / Elevation / Motion / Icons / Accessibility
Components
├── Atoms: Button, Input, Badge, Avatar, Checkbox, Radio, Switch
├── Molecules: Search Bar, Alert, Card, Empty State, Filters
├── Organisms: Header, Sidebar, Navbar, Hero, Data Table
├── Templates: Dashboard, Landing Page, Auth
Patterns
├── Empty State, Loading, Error State, Skeleton, Success Feedback, Search Experience,
│   CRUD, Multi-step Form, Confirmation Dialog, Delete Flow, Pagination, Infinite Scroll,
│   Filters, Upload, Toast Strategy
```

**Importante**: essa reorganização de navegação/sidebar (Foundations, Atoms/Molecules/Organisms/Templates, Patterns) **ainda não foi feita**. Hoje o sidebar continua com a lista alfabética simples dos 60 componentes shadcn. Isso é trabalho futuro, depois do piloto do Button validado.

## Template de página por componente (o que foi pilotado no Button)

```
Descrição            → placeholder
Quando utilizar      → placeholder
Anatomia             → real, derivado do código (ex: elemento raiz, ícone, label)
Composição           → já existia (peças exportadas de src/components/ui/[slug].tsx)
Variantes            → real, renderizado ao vivo com o componente de verdade
Estados              → real (Default, Hover, Active, Focus, Disabled, Loading)
Tamanhos             → real, renderizado ao vivo
Exemplos             → já existia (demos oficiais shadcn traduzidos)
Boas práticas        → placeholder
Evite                → placeholder
Código               → snippet de uso real
Playground           → interativo (Select de variant/size, Switch de disabled/loading)
Propriedades         → tabela real de props (nome, tipo, default, descrição)
```

## O que já foi implementado (código já existe no projeto)

1. **`src/lib/component-docs.ts`** (novo arquivo)
   - Define `interface ComponentDoc` com os campos: description, whenToUse, anatomy, variants, states, sizes, doGuidelines, dontGuidelines, code, props.
   - `componentDocs: Record<string, ComponentDoc>` — **só a chave `"button"` está preenchida**. Qualquer outro slug sem entrada aqui cai no comportamento antigo (só Composição + Exemplos), sem quebrar nada.
   - Dados do Button já extraídos do código real (`src/components/ui/button.tsx`): 6 variantes (default/secondary/outline/ghost/destructive/link), 5 tamanhos (xs/sm/default/lg/icon), props reais (variant, size, asChild, disabled, ...props).

2. **`src/components/doc/button-playground.tsx`** (novo arquivo)
   - Componente client-side específico do Button (hardcoded, não genérico ainda).
   - Controles: Select de variante, Select de tamanho, Switch de disabled, Switch de loading (usa `<Spinner />` do projeto).
   - **Próxima etapa quando generalizar**: transformar isso num playground genérico dirigido pelos dados de `component-docs.ts`, em vez de um arquivo por componente.

3. **`src/app/components/[slug]/page.tsx`** (editado)
   - Importa `componentDocs` e um `playgroundRegistry` (hoje só `{ button: ButtonPlayground }`).
   - Renderiza as novas seções **condicionalmente** (`{doc && (...)}`), então para os outros 59 componentes a página continua exatamente como estava.
   - Ordem final das seções na página: Descrição → Quando utilizar → Anatomia → Composição → Variantes → Estados → Tamanhos → Exemplos → Boas práticas/Evite → Código → Playground → Propriedades.
   - TOC lateral ("Nesta página") atualizado para incluir os novos anchors quando `doc` existe.

## Pendência técnica (não concluída antes da pausa)

- A verificação de build (`npx tsc --noEmit`) **não terminou de rodar** — o ambiente sandbox reiniciou (`/tmp/shadcn-local` tinha sumido) e o processo de tsc estava demorando mais que o timeout de 45s por chamada. **Não há confirmação de que o código compila sem erros ainda.**
- Recomendo, ao retomar: rodar `npm run dev` (ou `npx tsc --noEmit`) direto na máquina do Rafael, que é mais rápido que o sandbox, e abrir `/components/button` para conferir visualmente.
- Pontos a checar visualmente na página do Button:
  - Seção Variantes renderiza os 6 botões reais corretamente (o valor `v.value as never` foi usado para passar a string dinâmica pra prop tipada `variant` — funciona em runtime, mas vale checar se o TS não reclama disso na IDE).
  - Playground funciona (troca variant/size, liga disabled/loading).
  - Tabela de Propriedades renderiza sem quebrar layout.

## Próximos passos, em ordem, quando retomar

1. Rodar a verificação de build pendente (tsc) e corrigir o que aparecer.
2. Rafael revisa visualmente a página `/components/button` e valida (ou pede ajustes n)o template.
3. Rafael escreve o conteúdo real de Descrição / Quando utilizar / Boas práticas / Evite do Button (os placeholders).
4. Só depois disso: decidir se replica o template pros outros ~59 componentes de uma vez ou aos poucos.
5. Trabalho futuro, ainda não escopado em detalhe:
   - Reorganizar o sidebar/navegação para refletir Foundations / Atoms / Molecules / Organisms / Templates / Patterns.
   - Criar páginas de Foundations (Colors, Typography, Spacing, Grid, Radius, Elevation, Motion, Icons, Accessibility) — hoje esse conteúdo existe espalhado em `/estilo` e nos presets, precisa ser reorganizado/expandido.
   - ~~Categorizar os 60 componentes shadcn existentes dentro de Atoms/Molecules/Organisms/Templates~~ — feito em 2026-07-20 via `src/lib/atomic-registry.ts` (ver `PLANO-LOOP-80-20-TEMPLATES.md`).
   - ~~Construir a seção Patterns do zero (15 padrões listados), cada um com exemplo de código funcional.~~ — feito em 2026-07-21: os 15 patterns têm componente funcional real em `src/components/patterns/*.tsx`, documentação em `src/lib/pattern-docs.ts`, páginas em `/patterns` e `/patterns/[slug]`, e entrada na navegação (`nav-patterns.tsx`). Detalhe completo no Log de `PLANO-LOOP-80-20-TEMPLATES.md`.
   - ~~Generalizar o Playground (hoje só existe pro Button).~~ — feito parcialmente em 2026-07-20/21: genericizado pra todos os componentes com variante/tamanho real (12, via `generic-playground.tsx`); Button mantém o dedicado por ter o controle "Loading" que não existe modelo genérico ainda.

## Contexto do projeto (para retomar sem perder o fio)

- Projeto: Next.js 16 + Tailwind v4 + shadcn/ui, "portal de estilo" local do Rafael.
- Sonner (toasts) foi corrigido nesta mesma sessão — `<Toaster />` estava faltando em `app-shell.tsx`, já resolvido e verificado (`tsc` limpo antes dessa etapa).
- Os 208 exemplos oficiais do shadcn já estão 100% traduzidos pra PT-BR (nomes de componentes e código continuam em inglês).
