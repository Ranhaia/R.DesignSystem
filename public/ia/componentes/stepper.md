---
slug: stepper
nome: Stepper
camada: organism
codigo: src/components/ui/stepper.tsx
story: src/components/ui/stepper.stories.tsx
status: piloto
sinonimos: [passos, etapas, steps, wizard]
vizinhos: [tabs, progress, pagination]
referencias: [passi:passos, spec:stepper]
---

# Stepper

Indicador de progresso sequencial que guia o usuário através de um processo dividido em etapas. Mostra quais passos já foram concluídos, qual está em andamento e quais ainda faltam.

## Quando usar

- Fluxos lineares divididos em passos sequenciais (ex.: checkout, cadastro em etapas, wizards de configuração).
- Formulários extensos com dependência lógica entre as fases de preenchimento.
- Processos de onboarding com progresso claro de 3 a 5 etapas.

## Quando NÃO usar

- Navegação livre entre seções sem ordem obrigatória → `tabs`.
- Barra contínua de carregamento ou progresso percentual sem etapas discretas → `progress`.
- Paginação numérica de tabelas ou listagens de dados → `pagination`.

## Anatomia

| Parte | O que é |
|---|---|
| `Stepper` | Raiz em lista ordenada que controla o índice da etapa e gera os conectores |
| `StepperItem` | Item de lista que representa uma etapa individual e provê o contexto |
| `StepperTrigger` | Gatilho interativo ou visual que agrupa indicador e título |
| `StepperIndicator` | Círculo que exibe o número da etapa ou ícone de check quando concluída |
| `StepperTitle` | Rótulo textual com o nome da etapa |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` | `number` | — | Índice 0-based da etapa atual em andamento |
| `onValueChange` | `(step: number) => void` | — | Callback de clique que torna os gatilhos botões interativos |
| `orientation` | `horizontal` · `vertical` | `horizontal` | Direção do layout dos passos |
| `children` | `React.ReactNode` | — | Lista de elementos `StepperItem` que compõem o fluxo |

## Variantes

Nenhuma variante própria. A orientação `horizontal` ou `vertical` define a disposição visual.

## Tamanhos

Um só. O indicador tem diâmetro fixo de 32 px (`size-8`).

## Estados

| Estado | Como aparece |
|---|---|
| Concluído | Círculo preenchido `bg-primary text-primary-foreground` com ícone de check e conector colorido |
| Atual | Círculo com borda `border-primary text-primary` e atributo `aria-current="step"` |
| Próximo | Círculo neutro `border-border text-muted-foreground` com número da etapa |
| Foco | Anel `focus-visible:ring-ring` visível no gatilho interativo |

## Conteúdo

- Títulos curtos no imperativo ou substantivo indicando a fase: "Dados pessoais", "Endereço", "Confirmação".
- Mantenha entre 3 e 5 etapas para evitar fadiga cognitiva.
- Opcionalmente exiba a contagem explícita na tela: "Etapa 2 de 4".
- Sem ponto final nos títulos das etapas.

## Acessibilidade

- **Teclado:** Quando `onValueChange` é fornecido, cada `StepperTrigger` vira um `<button>` navegável por Tab e acionável por Enter ou Espaço. Sem callback, renderiza como `<div>` sem foco.
- **Leitor de tela:** Estruturado em `<ol>` com itens `<li>`. A etapa ativa recebe `aria-current="step"`. O ícone de check da etapa concluída possui `aria-hidden="true"`.
- **Foco:** Anel de foco com 3 px em `focus-visible`. Ao avançar de etapa programaticamente, recomenda-se deslocar o foco para o título da nova etapa.
- **Cuidados:** Não peça novamente informações já preenchidas em etapas anteriores (WCAG 3.3.7). Garanta que etapas concluídas permitam retorno se o usuário precisar corrigir dados.

## Tokens usados

- **Cor:** `bg-background` `bg-border` `bg-primary` `border-border`
  `border-primary` `border-ring` `text-muted-foreground` `text-primary`
  `text-primary-foreground`
- **Tipografia:** `font-medium` `text-sm`
- **Espaço:** `gap-1.5` `gap-2` `gap-3` `h-6` `h-px` `ml-4` `mt-4`
  `size-8` `w-px`
- **Raio:** `rounded-full` `rounded-md`
- **Foco:** `ring-ring`

## Faça

- Use de 3 a 5 etapas com títulos claros e objetivos.
- Permita que o usuário volte para etapas já concluídas para revisar informações.
- Use a orientação vertical em telas compactas ou quando os títulos forem longos.

## NÃO faça

- Mais de 5 etapas consecutivas no fluxo → use `tabs` para agrupar seções.
- Usar stepper para navegação livre e não ordenada → use `tabs`.
- Pular etapas sem validação ou aviso explícito → `stepper`.

## Exemplo mínimo

```tsx
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

<Stepper value={1} orientation="horizontal">
  <StepperItem>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Dados pessoais</StepperTitle>
    </StepperTrigger>
  </StepperItem>
  <StepperItem>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Endereço</StepperTitle>
    </StepperTrigger>
  </StepperItem>
  <StepperItem>
    <StepperTrigger>
      <StepperIndicator />
      <StepperTitle>Confirmação</StepperTitle>
    </StepperTrigger>
  </StepperItem>
</Stepper>
```
