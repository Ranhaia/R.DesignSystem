---
slug: kbd
nome: Kbd
camada: atom
codigo: src/components/ui/kbd.tsx
story: src/components/ui/kbd.stories.tsx
status: piloto
sinonimos: [atalho, atalho-de-teclado, tecla]
vizinhos: [button, tooltip, badge]
referencias: [passi:atalho-de-teclado, shadcn:kbd]
---

# Kbd

Indica teclas ou combinações de atalhos de teclado em formato visual compacto. Usado em menus, tooltips, campos de busca e documentação técnica.

## Quando usar

- Mostrar atalhos de teclado para ações rápidas em menus suspensos e paletas de comando.
- Indicar teclas de atalho dentro de dicas flutuantes (tooltip) acopladas a botões.
- Exibir teclas em tutoriais, mensagens de ajuda e documentação de navegação.

## Quando NÃO usar

- Elemento interativo ou botão clicável que dispara a ação ao clique → `button`
- Etiqueta de status, categoria ou contagem sem relação com teclado → `badge`
- Rótulo de campo de formulário ou título de seção → `label`

## Anatomia

| Parte | O que é |
|---|---|
| `Kbd` | Elemento nativo `<kbd>` inline estilizado como tecla física compacta |
| `KbdGroup` | Container `<kbd>` flexível para agrupar duas ou mais teclas de um atalho composto |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Letra, símbolo ou nome da tecla a exibir |

## Variantes

Nenhuma. O estilo adapta-se automaticamente quando renderizado dentro de tooltips.

## Tamanhos

Altura fixa de 20 px (`h-5`) com largura mínima de 20 px (`min-w-5`) e tipografia de 12 px (`text-xs`).

## Estados

Só leitura: não recebe foco nem responde a cliques diretos.

## Conteúdo

- Letras maiúsculas para teclas alfanuméricas simples: K, P, Enter.
- Nomes de teclas modificadoras de acordo com o sistema operacional: ⌘ e Option no Mac, Ctrl e Alt no Windows.
- Para combinações compostas com KbdGroup, inclua apenas as teclas sem sinais de mais soltos.

## Acessibilidade

- **Teclado:** Não recebe foco: é um elemento visual informativo de atalho.
- **Leitor de tela:** Leitores anunciam o texto da tecla; para combinações com símbolos como ⌘, forneça texto descritivo no elemento pai.
- **Foco:** Nenhum: o foco do usuário permanece no componente interativo ao qual o atalho se refere.
- **Cuidados:** Atalhos de teclado compostos por tecla única alfanumérica exigem mecanismo para desativação ou remapeamento conforme WCAG 2.1.4.

## Tokens usados

- **Cor:** `bg-background` `bg-muted` `text-background`
  `text-muted-foreground`
- **Tipografia:** `font-medium` `font-sans` `text-xs`
- **Espaço:** `gap-1` `h-5` `min-w-5` `px-1` `size-3`
- **Raio:** `rounded-sm`

## Faça

- Mostre a combinação de teclas adaptada à plataforma do usuário (⌘ no Mac e Ctrl no Windows).
- Utilize KbdGroup para agrupar teclas que devem ser pressionadas em conjunto.
- Reserve o uso de Kbd para atalhos reais implementados e funcionais na interface.

## NÃO faça

- Usar Kbd como botão clicável que dispara ação ao clique → `button`
- Usar Kbd para exibir contagens, categorias ou status do sistema → `badge`
- Depender exclusivamente do atalho de teclado sem oferecer controle visual na interface → `tooltip`

## Exemplo mínimo

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

<Kbd>Esc</Kbd>

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>
```
