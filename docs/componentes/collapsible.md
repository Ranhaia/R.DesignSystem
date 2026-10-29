---
slug: collapsible
nome: Collapsible
camada: molecule
codigo: src/components/ui/collapsible.tsx
story: src/components/ui/collapsible.stories.tsx
status: piloto
sinonimos: [recolhivel, recolhível, mostrar-mais]
vizinhos: [accordion, sheet]
referencias: [shadcn:collapsible]
---

# Collapsible

Alterna a visibilidade de uma seção de conteúdo secundário sob demanda. Mantém a página limpa ao esconder blocos opcionais sem a estrutura de um acordeão.

## Quando usar

- Esconder detalhes complementares ou avançados que a maioria dos usuários não precisa ver de início ("Ver mais detalhes técnicos").
- Painéis recolhíveis isolados em barras laterais ou cartões de resumo ("Lista de participantes").
- Alternar visualização de código, registros brutos ou logs extensos sob demanda.

## Quando NÃO usar

- Múltiplas seções empilhadas que expandem e fecham em lista estruturada → `accordion`
- Conteúdo extenso que exige fluxo ou formulário dedicado fora do fluxo da página → `sheet`
- Janela modal focada que bloqueia a interação com o restante da tela → `dialog`

## Anatomia

| Parte | O que é |
|---|---|
| `Collapsible` | Elemento raiz que gerencia o estado aberto ou fechado (Radix Collapsible) |
| `CollapsibleTrigger` | Gatilho clicável que expande ou recolhe o painel associado |
| `CollapsibleContent` | Container com animação de altura que exibe o conteúdo quando aberto |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `open` · `defaultOpen` (Collapsible) | `boolean` | — | Controla se o painel está aberto em modo controlado ou estado inicial |
| `onOpenChange` (Collapsible) | `(open: boolean) => void` | — | Callback acionado ao alternar entre aberto e fechado |
| `disabled` (Collapsible) | `boolean` | `false` | Desativa o gatilho impedindo abrir ou fechar o conteúdo |
| `asChild` (CollapsibleTrigger) | `boolean` | `false` | Renderiza no elemento filho via Radix Slot (ex.: com `Button`) |

## Variantes

Nenhuma variante no código. O comportamento visual é definido pelo gatilho e pelo conteúdo inserido.

## Tamanhos

Sem variação de tamanho. O container adapta sua altura automaticamente durante a transição.

## Estados

| Estado | Como aparece |
|---|---|
| Fechado | `data-state=closed` no gatilho e conteúdo, com animação `animate-collapsible-up` ocultando o bloco |
| Aberto | `data-state=open` com animação `animate-collapsible-down` exibindo o conteúdo |
| Foco | O gatilho recebe o anel de foco padrão do elemento que o compõe (ex.: `Button`) |
| Desabilitado | Gatilho inativo quando `disabled` for verdadeiro |

## Conteúdo

- O gatilho deve usar rótulo claro que indique a ação de expandir: "Mostrar detalhes".
- Alterne o rótulo quando apropriado ("Mostrar detalhes" / "Ocultar detalhes") ou adicione ícone direcional indicativo.
- Não use exclamação nem pontuação final no texto do gatilho.

## Acessibilidade

- **Teclado:** O gatilho recebe Tab e alterna a expansão ao pressionar Enter ou Espaço.
- **Leitor de tela:** O gatilho expõe `aria-expanded="true|false"` e vincula-se ao conteúdo via `aria-controls`.
- **Foco:** O foco permanece no gatilho ao abrir ou fechar; pressionar Tab após abrir move o foco para o primeiro controle interno do painel.
- **Cuidados:** Não esconda informações essenciais à conclusão da tarefa principal dentro de uma área recolhida; o usuário não deve ser obrigado a abrir o painel para prosseguir (WCAG 1.3.1 e 4.1.2).

## Tokens usados

- **Movimento:** `animate-collapsible-down` `animate-collapsible-up`

## Faça

- Use `asChild` em `CollapsibleTrigger` para compor com `Button` acessível.
- Indique visualmente a alternância de estado com ícone direcional que gire conforme abertura.
- Mantenha o conteúdo recolhível compacto para evitar deslocamentos visuais bruscos ao expandir.

## NÃO faça

- Ocultar mensagens de erro críticas ou avisos obrigatórios dentro do painel → mostre sempre visível com `alert`
- Criar lista com várias seções expansíveis coordenadas manualmente → `accordion`
- Abrir o conteúdo automaticamente sem interação prévia do usuário → deixe fechado por padrão ou use container fixo em `card`

## Exemplo mínimo

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="outline" size="sm">
      Mostrar histórico de alterações
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
    Última atualização realizada por Maria em 24 de outubro.
  </CollapsibleContent>
</Collapsible>
```
