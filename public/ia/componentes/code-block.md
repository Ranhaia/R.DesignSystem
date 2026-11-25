---
slug: code-block
nome: Code Block
camada: organism
codigo: src/components/ui/code-block.tsx
story: src/components/ui/code-block.stories.tsx
status: piloto
sinonimos: [bloco-de-codigo, codigo, code, snippet, trecho-de-codigo, copiar-codigo, pre]
vizinhos: [kbd, textarea]
referencias: [spec:code-block]
---

# Code Block

Trecho de código para ler e copiar. Cabeçalho com título e linguagem opcionais e um botão que copia o código inteiro, com aviso de copiado para quem vê e para o leitor de tela.

## Quando usar

- Comando ou trecho que a pessoa vai colar em outro lugar: instalação, configuração, chave de exemplo.
- Documentação e telas de integração.

## Quando NÃO usar

- Tecla ou atalho no meio do texto → `kbd`.
- Código que a pessoa edita → `textarea`.

## Anatomia

| Parte | O que é |
|---|---|
| `CodeBlock` | O bloco inteiro: cabeçalho (título, linguagem, botão de copiar com o aviso) e o código em `pre`/`code`. |

## Composição

Usa: [`icon`](icon.md) · [`icon-button`](icon-button.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `code` | `string` | — | O código exibido e copiado, como texto puro. |
| `language` | `string` | — | Linguagem (ex.: `tsx`, `bash`), mostrada no cabeçalho. |
| `title` | `string` | — | Nome do trecho; entra também no nome do botão de copiar. |

## Variantes

Sem variantes.

## Tamanhos

Sem tamanhos: o texto é `text-sm` em fonte mono e a largura vem de quem usa.

## Estados

| Estado | Como aparece |
|---|---|
| Repouso | Ícone de copiar. |
| Copiado | Ícone de check e balão "Copiado" por 2 s. |
| Falha | Ícone de erro e balão "Não foi possível copiar" por 2 s. |

## Conteúdo

- Código pronto para colar: sem `$` de prompt nem saída misturada.
- Título curto: nome do arquivo ou do passo.

## Acessibilidade

- **Teclado:** Tab chega ao botão e depois ao código, que rola com as setas.
- **Leitor de tela:** o botão tem nome ("Copiar código", com o título quando há) e o resultado é anunciado pela região `role="status"`.
- **Foco:** anel no botão e anel interno no código; o botão nunca é desabilitado, então o foco não se perde.
- **Cuidados:** a cópia precisa de HTTPS ou localhost; fora disso cai no estado de falha, que também é avisado.

## Tokens usados

- **Cor:** `bg-foreground` `bg-muted` `text-background`
  `text-foreground` `text-muted-foreground`
- **Tipografia:** `font-medium` `leading-relaxed` `text-sm` `text-xs`
- **Espaço:** `gap-2` `me-1` `min-w-0` `p-1` `p-4` `ps-3` `px-2` `py-1`
- **Raio:** `rounded-inner` `rounded-md` `rounded-outer-lg`
- **Movimento:** `duration-motion-fast`
- **Foco:** `ring-ring`

## Faça

- Dar título quando há mais de um bloco na tela, para os botões terem nomes diferentes.
- Informar a linguagem.
- Separar comandos em blocos diferentes quando a pessoa roda um de cada vez.

## NÃO faça

- Pôr código no meio de uma frase → `kbd` ou `code` inline.
- Usar para texto editável → `textarea`.
- Esconder o botão de copiar no hover → deixar sempre visível.

## Exemplo mínimo

```tsx
import { CodeBlock } from "@/components/ui/code-block"

<CodeBlock language="bash" code="npm install" />
```
