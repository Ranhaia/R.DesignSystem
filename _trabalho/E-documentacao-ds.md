---
tipo: epico
projeto: 🎨 P-DS-SHADCN
status: progresso
criado: 2026-08-23
---

# Documentação estilo Design System

Dar a cada componente uma página de documentação no padrão de um Design
System de verdade — referência de estrutura: material3 (`m3.material.io`).

Migrado de `plans/current/design-system-piloto.md` em 2026-08-23, plano
que estava pausado por economia de créditos.

## Decisões já tomadas — não reabrir

1. **Piloto com 1 componente só (Button).** Só depois de validado,
   replicar para os outros ~59.
2. **As novas seções mesclam na mesma página** de cada componente.
   Composição e Exemplos continuam existindo, não são substituídos.
3. **Conteúdo narrativo é do Rafael, não da IA.** Descrição, Quando
   utilizar, Boas práticas e Evite entram como placeholder
   `"[a preencher]"`. Não inventar texto.
4. **Patterns precisam de exemplo funcional de código**, não só
   documentação em texto. Já entregue: os 15 patterns têm componente real
   em `src/components/patterns/`.

## Template da página, pilotado no Button

```
Descrição            → placeholder (Rafael escreve)
Quando utilizar      → placeholder (Rafael escreve)
Anatomia             → real, derivado do código
Composição           → já existia
Variantes            → real, renderizado ao vivo
Estados              → real (Default, Hover, Active, Focus, Disabled, Loading)
Tamanhos             → real, renderizado ao vivo
Exemplos             → já existia
Boas práticas / Evite → placeholder (Rafael escreve)
Código               → snippet de uso real
Playground           → interativo
Propriedades         → tabela real de props
```

## O que já está no código

- `src/lib/component-docs.ts` — `interface ComponentDoc` e
  `componentDocs: Record<string, ComponentDoc>`, **só a chave `"button"`
  preenchida**. Slug sem entrada cai no comportamento antigo sem quebrar.
- `src/components/doc/button-playground.tsx` — playground do Button
  (variante, tamanho, ícone à esquerda ou à direita, disabled, loading),
  no topo da página.
- `src/app/components/[slug]/page.tsx` — renderiza as seções novas
  condicionalmente (`{doc && ...}`), então os outros 59 componentes
  continuam como estavam. TOC lateral atualizado.

Já entregue em julho e fora deste Épico: categorização atomic
(`atomic-registry.ts`), os 15 patterns, e o playground genérico
(`generic-playground.tsx`, cobre 22 componentes com variante/tamanho —
Button mantém o dedicado por causa dos controles "Loading" e "Ícone").
Atenção: o registro dos 22 mora em `generic-playground-registry.tsx`, sem
`"use client"`. Dentro do arquivo cliente ele chegava à página de servidor
como referência opaca (`registro[slug]` dava `undefined`) e o playground
não aparecia em componente nenhum; `doc-playground-registro.test.ts` trava isso.
