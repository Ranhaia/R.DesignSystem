---
slug: split-button
nome: Split Button
camada: organism
codigo: src/components/ui/split-button.tsx
story: src/components/ui/split-button.stories.tsx
status: piloto
sinonimos: [botao-dividido, botão-dividido]
vizinhos: [button, button-group, dropdown-menu]
referencias: [spec:split-button]
---

# Split Button

Combina uma ação principal direta com um menu suspenso de ações secundárias relacionadas. Permite executar o comando mais frequente com um clique e acessar variações pelo gatilho lateral.

## Quando usar

- Ação primária frequente que possui alternativas correlatas (ex.: "Salvar" como principal e "Salvar como rascunho" no menu).
- Envio ou publicação de dados com opções adicionais de agendamento ou exportação.
- Otimização de espaço na interface unificando comandos relacionados em uma peça única.

## Quando NÃO usar

- Ações independentes sem relação hierárquica clara de prioridade → `button-group`.
- Ação simples e isolada sem variações → `button`.
- Apenas uma lista de comandos sem nenhuma ação direta primária → `dropdown-menu`.

## Anatomia

| Parte | O que é |
|---|---|
| `SplitButton` | Raiz que agrupa o botão de ação principal e o gatilho com menu suspenso |
| Botão principal (interno) | Botão que executa a ação prioritária imediata via clique |
| Gatilho do menu (interno) | Botão compacto só com ícone que abre o menu suspenso |
| Menu suspenso (interno) | Painel flutuante que renderiza as ações secundárias |

## Composição

Usa: [`button`](button.md) · [`button-group`](button-group.md) · [`dropdown-menu`](dropdown-menu.md) · [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `label` | `React.ReactNode` | — | Rótulo de texto da ação principal |
| `icon` | `React.ReactNode` | — | Ícone opcional no botão principal |
| `onClick` | `() => void` | — | Callback de clique da ação principal |
| `variant` | `default` · `secondary` · `outline` · `ghost` · `destructive` · `link` | `default` | Estilo visual aplicado a ambas as peças |
| `size` | `default` · `sm` · `lg` | `default` | Tamanho do botão principal |
| `disabled` | `boolean` | `false` | Desativa o botão principal e o gatilho |
| `triggerLabel` | `string` | `Mais ações` | Nome acessível do gatilho do menu |
| `align` | `start` · `center` · `end` | `end` | Alinhamento do menu suspenso |

## Variantes

Nenhuma variante própria. Herda as variantes de `button`: `default`, `secondary`, `outline`, `ghost`, `destructive` e `link`.

## Tamanhos

Nenhum tamanho próprio. Oferece `default`, `sm` e `lg`, derivados da escala de `button`.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Botão principal e gatilho unidos com cantos externos arredondados |
| Hover | Destaque individual sobre o botão principal ou sobre o gatilho |
| Pressionado | Feedback tátil no botão acionado |
| Foco | Anel de foco visível na peça que está com foco no teclado |
| Desabilitado | Ambos os botões com opacidade reduzida e cliques bloqueados |

## Conteúdo

- Rótulo do botão principal inicia com verbo no infinitivo ou imperativo: "Salvar", "Publicar" ou "Enviar".
- Itens do menu secundário detalham as variações: "Salvar como rascunho", "Salvar e fechar".
- Prop `triggerLabel` deve ser descritiva para tecnologias assistivas: "Mais opções de salvamento".
- Sem ponto final em rótulos e itens de menu.

## Acessibilidade

- **Teclado:** O botão principal e o gatilho recebem foco sequencial via Tab. Enter ou Espaço acionam o botão principal ou abrem o menu no gatilho. As setas Cima/Baixo navegam pelos itens do menu e Esc o fecha.
- **Leitor de tela:** Dois botões distintos dentro de um grupo. O botão principal anuncia o texto de `label`; o gatilho anuncia `triggerLabel` com estado expandido/recolhido gerenciado pelo Radix.
- **Foco:** O foco do teclado pousa independentemente na ação principal ou no gatilho. Ao fechar o menu com Esc, o foco retorna ao gatilho.
- **Cuidados:** O gatilho do menu é só ícone e exige nome acessível claro. Forneça sempre `triggerLabel` contextualizado (ex.: "Mais opções de envio") para evitar rótulos genéricos.

## Tokens usados

Nenhum.

## Faça

- Use para ações que possuem uma escolha padrão predominante acompanhada de alternativas.
- Forneça um `triggerLabel` contextual que explique quais opções adicionais o menu oferece.
- Mantenha a mesma variante visual entre a ação primária e as opções secundárias.

## NÃO faça

- Opções com pesos iguais sem uma preferencial → `button-group`.
- Lista longa de opções sem ação padrão direta → `dropdown-menu`.
- Omitir o `triggerLabel` deixando o gatilho com rótulo genérico → passe `triggerLabel` contextualizado em `split-button`.

## Exemplo mínimo

```tsx
import { SplitButton } from "@/components/ui/split-button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"

<SplitButton
  label="Salvar"
  onClick={() => {}}
  triggerLabel="Mais opções de salvamento"
>
  <DropdownMenuItem onClick={() => {}}>
    <Icon name="draft" />
    <span>Salvar como rascunho</span>
  </DropdownMenuItem>
  <DropdownMenuItem onClick={() => {}}>
    <Icon name="logout" />
    <span>Salvar e sair</span>
  </DropdownMenuItem>
</SplitButton>
```
