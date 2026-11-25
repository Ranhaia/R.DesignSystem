---
slug: textarea
nome: Textarea
camada: atom
codigo: src/components/ui/textarea.tsx
story: src/components/ui/textarea.stories.tsx
status: piloto
sinonimos: [area-de-texto, área-de-texto, campo-multilinha]
vizinhos: [input, field]
referencias: [passi:area-de-texto, shadcn:textarea]
---

# Textarea

Campo de entrada para textos longos de múltiplas linhas. Expande verticalmente conforme o conteúdo digitado graças ao dimensionamento automático.

## Quando usar

- Coleta de textos com parágrafos, comentários longos, observações ou descrições detalhadas.
- Formulários onde a resposta esperada pode ultrapassar uma única linha de digitação.

## Quando NÃO usar

- Respostas curtas de uma única linha como nome, e-mail ou telefone → `input`.
- Campo complexo com mensagens de erro estruturadas e texto de ajuda → `field`.

## Anatomia

| Parte | O que é |
|---|---|
| `Textarea` | Elemento `<textarea>` com dimensionamento automático (`field-sizing-content`) e altura mínima de 64 px |
| Rótulo (opcional) | Componente `Label` embutido, estático ou com animação flutuante (`animatedLabel`) |

## Composição

Usa: [`label`](label.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `label` | `React.ReactNode` | — | Rótulo textual vinculado ao campo via ID gerado |
| `animatedLabel` | `boolean` | `false` | Ativa a transição suave de rótulo flutuante no foco |
| `placeholder` | `string` | — | Texto de exemplo exibido enquanto o campo estiver vazio |
| `disabled` | `boolean` | `false` | Desabilita a digitação e aplica opacidade reduzida |
| `aria-invalid` | `boolean` | — | Destaca a borda e anel em tons de erro (`border-destructive`) |

## Variantes

Nenhuma variante pré-definida. A estilização visual segue o contorno padrão de campos do sistema.

## Tamanhos

Altura mínima de 64 px (`min-h-16`) com crescimento dinâmico via utilitário `field-sizing-content`.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Borda sutil em `border-input` com fundo transparente |
| Foco | Borda em `border-ring` com anel visível de 3 px em `ring-ring` |
| Erro | Borda vermelha `border-destructive` e anel de erro (`aria-invalid:ring-destructive`) |
| Desabilitado | Cursor não permitido e opacidade em 50% (`disabled:opacity-50`) |

## Conteúdo

- Rótulos claros e objetivos posicionados acima do campo: "Comentários adicionais", "Descrição da vaga".
- Não use o placeholder como substituto para o rótulo principal.

## Acessibilidade

- **Teclado:** Tab move o foco para o campo. Enter cria quebra de linha normal. Tab sai do campo para o próximo elemento.
- **Leitor de tela:** Quando fornecida a prop `label`, o campo é vinculado automaticamente pelo atributo `id` e anunciado com seu nome.
- **Foco:** Anel de foco nítido de 3 px em `focus-visible:ring-ring`.
- **Cuidados:** Evite instruções críticas apenas no placeholder, pois ele desaparece ao digitar. Sempre passe `label` ou `aria-label`.

## Tokens usados

- **Cor:** `border-destructive` `border-input` `border-ring`
  `text-foreground` `text-muted-foreground`
- **Tipografia:** `text-base` `text-sm`
- **Espaço:** `gap-1.5` `left-0` `left-3` `min-h-16` `mt-5` `px-3`
  `py-2` `top-0` `top-3`
- **Raio:** `rounded-md`
- **Sombra:** `shadow-xs`
- **Movimento:** `duration-motion-fast`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Forneça sempre um rótulo compreensível usando a prop `label` ou `aria-label`.
- Use a prop `animatedLabel` quando desejar economizar espaço vertical inicial.
- Indique erros de validação aplicando o atributo `aria-invalid`.

## NÃO faça

- Usar para respostas de uma única linha → `input`.
- Colocar instruções cruciais apenas no placeholder → use rótulo ou descrição em `field`.
- Bloquear a expansão natural do texto sem aviso ao usuário → ajuste a altura mínima.

## Exemplo mínimo

```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea
  label="Observações"
  placeholder="Digite seus comentários sobre o projeto..."
/>
```
