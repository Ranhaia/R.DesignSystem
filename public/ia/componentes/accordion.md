---
slug: accordion
nome: Accordion
camada: molecule
codigo: src/components/ui/accordion.tsx
story: src/components/ui/accordion.stories.tsx
status: piloto
sinonimos: [acordeao, acordeão, sanfona, expansivel, expansível]
vizinhos: [collapsible, tabs, sheet]
referencias: [passi:acordeao, shadcn:accordion]
---

# Accordion

Organiza o conteúdo em seções empilhadas que expandem e recolhem. Permite explorar tópicos sob demanda sem sobrecarregar a rolagem da página.

## Quando usar

- Perguntas frequentes (FAQ) onde a pessoa busca apenas respostas pontuais.
- Listas de seções secundárias ou detalhes adicionais em painéis informativos.
- Divisão de termos extensos de contrato ou apólice em tópicos temáticos.

## Quando NÃO usar

- Seção única que expande ou recolhe sem lista empilhada → `collapsible`.
- Alternar entre visões exclusivas ocupando o mesmo espaço sem empilhar → `tabs`.
- Painel complexo com formulário longo ou fluxo de múltiplos passos → `sheet`.

## Anatomia

| Parte | O que é |
|---|---|
| `Accordion` | Raiz com `data-slot="accordion"`, controla o estado dos itens únicos ou múltiplos via Radix UI. |
| `AccordionItem` | Contêiner de uma seção com `data-slot="accordion-item"`, delimitado por borda inferior. |
| `AccordionTrigger` | Cabeçalho e botão clicável com `data-slot="accordion-trigger"`, inclui ícone de seta animado. |
| `AccordionContent` | Painel expansível com `data-slot="accordion-content"`, animado na abertura e fechamento. |
| Ícone (interno) | Ícone de seta (`keyboard_arrow_down`) que gira 180 graus quando o item está aberto. |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `type` (Accordion) | `"single" \ | "multiple"` | — | Define se permite abrir apenas um item por vez ou múltiplos itens |
| `collapsible` (Accordion) | `boolean` | `false` | Em `type="single"`, permite fechar o item aberto ao clicar nele de novo |
| `value` (Accordion) | `string \ | string[]` | — | Valor controlado do item ou itens abertos |
| `defaultValue` (Accordion) | `string \ | string[]` | — | Valor inicial do item ou itens abertos |
| `value` (AccordionItem) | `string` | — | Identificador obrigatório e exclusivo da seção |
| `disabled` (AccordionItem) | `boolean` | `false` | Desabilita a interação com o item |

## Variantes

Não possui variantes visuais no código; a diferenciação decorre do estado aberto ou fechado de cada item.

## Tamanhos

Tamanho único, com espaçamento e tipografia baseados na escala padrão do Design System.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Linha com texto `text-sm font-medium` e seta apontando para baixo |
| Hover | Sublinhado no rótulo (`hover:underline`) |
| Foco | Anel de 3 px em `ring-ring` com `outline-none` no cabeçalho |
| Aberto | Seta rotacionada em 180 graus e conteúdo visível com animação |
| Desabilitado | `opacity-50` e sem resposta a eventos de ponteiro (`disabled:pointer-events-none`) |

## Conteúdo

- Título da seção deve ser autoexplicativo e direto, sem depender da leitura prévia da resposta: "Como solicitar reembolso?".
- A resposta deve começar pela informação principal antes de detalhar passos ou regras complementares.
- Evite termos vagos no cabeçalho como "Saiba mais" ou "Detalhes"; descreva o assunto concreto.

## Acessibilidade

- **Teclado:** Tab move o foco entre os cabeçalhos (`AccordionTrigger`). Enter ou Espaço expandem e recolhem o conteúdo correspondente.
- **Leitor de tela:** Cada cabeçalho possui papel de botão e expõe `aria-expanded="true"` ou `"false"` e `aria-controls` apontando para o conteúdo.
- **Foco:** O anel de foco visível envolve o `AccordionTrigger`. Ao expandir ou recolher a seção, o foco permanece no próprio cabeçalho.
- **Cuidados:** Não esconda informações críticas ou obrigatórias (como prazos legais ou preços finais) dentro de itens recolhidos por padrão.

## Tokens usados

- **Cor:** `border-ring` `text-muted-foreground`
- **Tipografia:** `font-medium` `text-sm`
- **Espaço:** `gap-4` `pb-4` `pt-0` `py-4`
- **Raio:** `rounded-md`
- **Movimento:** `animate-accordion-down` `animate-accordion-up`
  `duration-motion-base` `ease-spring`
- **Foco:** `ring-ring`

## Faça

- Redija títulos objetivos que permitam localizar o assunto sem expandir o item.
- Use `collapsible` quando `type="single"` para permitir que a pessoa feche a seção aberta.
- Agrupe seções por afinidade temática em uma sequência lógica.

## NÃO faça

- Título genérico como "Mais informações" → especifique o tema exato da seção como "Formas de pagamento".
- Acordeão aninhado dentro de outro acordeão → reorganize o conteúdo com `tabs` ou páginas dedicadas.
- Lista com mais de dez seções sem filtro ou busca → divida por categorias ou use `tabs`.

## Exemplo mínimo

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible defaultValue="duvida-1">
  <AccordionItem value="duvida-1">
    <AccordionTrigger>Como alterar a forma de pagamento?</AccordionTrigger>
    <AccordionContent>
      Acesse as configurações da conta e selecione Cobrança para cadastrar um novo cartão.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```
