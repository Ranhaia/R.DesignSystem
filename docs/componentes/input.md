---
slug: input
nome: Input
camada: atom
codigo: src/components/ui/input.tsx
story: src/components/ui/input.stories.tsx
status: piloto
sinonimos: [campo, campo-de-texto, text-field, textfield, input-text, senha, password, email]
vizinhos: [textarea, field, input-otp, combobox]
referencias: [passi:campo-de-texto, shadcn:input]
---

# Input

Campo de entrada para capturar textos ou valores de linha única. Dá suporte a rótulo embutido ou flutuante e ação interativa no final.

## Quando usar

- Capturar informações curtas de uma linha em formulários: nome, e-mail, senha, telefone.
- Entradas de busca ou filtros simples em cabeçalhos e barras de ferramentas.
- Campos com ação acoplada ao final: alternar exibição de senha ou limpar texto.

## Quando NÃO usar

- Texto longo com mais de uma linha ou parágrafos → `textarea`
- Código de verificação com dígitos isolados ou token SMS → `input-otp`
- Campo que precisa de mensagem de ajuda, erro e descrição estruturadas → `field`

## Anatomia

| Parte | O que é |
|---|---|
| `Input` | Elemento nativo `<input>` de linha única com data-slot="input" e suporte a wrapper relativo com rótulo |
| `endIcon` (opcional) | Ícone ilustrativo de 24 px à direita com aria-hidden |
| `endAction` (opcional) | Botão interativo de 36×36 px à direita com aria-label para ações rápidas no campo |

## Composição

Usa: [`label`](label.md) · [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `label` | `React.ReactNode` | — | Rótulo exibido acima do campo ou com animação flutuante |
| `animatedLabel` | `boolean` | `false` | Anima o rótulo para fora do campo no foco ou preenchimento |
| `endIcon` | `MaterialSymbol` | — | Ícone ilustrativo à direita com aria-hidden |
| `endAction` | `never` | — | Ação interativa no canto direito com ícone, clique e aria-label |
| `type` | `string` | `"text"` | Tipo nativo do input (email, password, number, file) |
| `disabled` | `boolean` | `false` | Desabilita o campo e bloqueia interação |
| `aria-invalid` | `boolean` | — | Borda e anel de foco em tom destrutivo quando inválido |

## Variantes

Nenhuma. O estilo de superfície, foco e borda adapta-se aos estados e aos elementos finais.

## Tamanhos

Um só: altura de 36 px (`h-9`), com área de clique de 36×36 px para ações interativas ao final.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Borda border-input com fundo transparente e sombra shadow-xs |
| Foco | Anel de 3 px em ring-ring e borda border-ring via focus-visible |
| Inválido | Borda border-destructive e anel suave em tom destrutivo com aria-invalid |
| Desabilitado | Opacidade reduzida em 50%, cursor não permitido e eventos bloqueados |

## Conteúdo

- Rótulo curto e claro indicando o dado esperado: E-mail, Senha de acesso.
- Placeholder como exemplo real de preenchimento ("nome@empresa.com"), nunca como instrução única.
- Sem dois-pontos ao final do rótulo e sem ponto final em placeholders curtos.

## Acessibilidade

- **Teclado:** Tab move o foco para o campo; a digitação edita o texto; atalhos nativos de navegação e colagem funcionam livremente.
- **Leitor de tela:** Papel textbox (ou correspondente ao type); o nome acessível vem do rótulo associado via htmlFor ou de aria-label.
- **Foco:** O anel visível de 3 px destaca o campo ativo; com endAction, o botão recebe foco por Tab logo após o input.
- **Cuidados:** Nunca substitua o rótulo pelo placeholder; ao usar endAction, forneça sempre um aria-label descritivo na ação.

## Tokens usados

- **Cor:** `bg-accent` `bg-primary` `border-destructive` `border-input`
  `border-ring` `text-accent-foreground` `text-foreground`
  `text-muted-foreground` `text-primary-foreground`
- **Tipografia:** `font-medium` `text-base` `text-sm`
- **Espaço:** `gap-1.5` `h-7` `h-9` `left-0` `left-3` `min-w-0` `mt-5`
  `pr-9` `px-3` `py-1` `right-0` `size-9` `top-0` `top-1`
- **Raio:** `rounded-md` `rounded-r-md`
- **Sombra:** `shadow-xs`
- **Movimento:** `duration-motion-fast`
- **Foco:** `ring-destructive` `ring-ring`

## Faça

- Associe sempre um rótulo visível ao campo usando a prop label ou o componente Label.
- Forneça o type nativo adequado (email, tel, number) para acionar o teclado correto no celular.
- Indique erro associando aria-invalid ao campo e exibindo uma mensagem textual explicativa.

## NÃO faça

- Usar o placeholder como substituto do rótulo → `label`
- Esconder mensagens de validação e ajuda → `field`
- Campo de digitação única para código de autenticação ou PIN → `input-otp`

## Exemplo mínimo

```tsx
import { Input } from "@/components/ui/input"

<Input label="E-mail" type="email" placeholder="nome@exemplo.com" />
<Input
  label="Senha"
  type="password"
  endAction={{
    icon: "visibility",
    onClick: () => {},
    "aria-label": "Mostrar senha",
  }}
/>
```
