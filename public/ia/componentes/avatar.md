---
slug: avatar
nome: Avatar
camada: atom
codigo: src/components/ui/avatar.tsx
story: src/components/ui/avatar.stories.tsx
status: piloto
sinonimos: [foto-de-perfil, imagem-de-perfil]
vizinhos: [badge, thumbnail, icon]
referencias: [passi:avatar, shadcn:avatar]
---

# Avatar

Representa visualmente uma pessoa, conta ou organização. Exibe a foto do usuário com fallback automático para iniciais ou ícone quando a imagem não carregar.

## Quando usar

- Identificar a conta do usuário logado na barra de navegação ou cabeçalho.
- Representar autores de mensagens, comentários ou atividades em fluxos colaborativos.
- Exibir participantes de equipes ou projetos agrupados com contagem excedente.

## Quando NÃO usar

- Selo numérico ou indicador textual de status sem pessoa ou foto → `badge`.
- Miniatura retangular de arquivo, mídia ou anexo → `thumbnail`.
- Símbolo gráfico genérico sem relação com perfil ou identidade de conta → `icon`.

## Anatomia

| Parte | O que é |
|---|---|
| `Avatar` | Container circular raiz com data-slot="avatar" e data-size |
| `AvatarImage` | Elemento de imagem que oculta automaticamente se falhar ao carregar |
| `AvatarFallback` | Alternativa com fundo muted exibida durante o carregamento ou após falha |
| `AvatarBadge` | Indicador pontual posicionado no canto inferior direito para status ou selo |
| `AvatarGroup` | Container flexível que agrupa avatares com sobreposição negativa |
| `AvatarGroupCount` | Círculo indicador com contador numérico para membros excedentes |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` (Avatar) | `default` · `sm` · `lg` | `default` | Dimensão do círculo do avatar |

## Variantes

Nenhuma variante de estilo. A forma é circular e o tamanho é definido pela prop size.

## Tamanhos

Três opções controladas pela prop size: sm (24 px, para listas densas e tabelas), default (32 px, para comentários e navegação) e lg (40 px, para perfis e cabeçalhos).

## Estados

| Estado | Como aparece |
|---|---|
| Fallback | Fundo muted com texto de iniciais ou ícone centralizado enquanto a imagem carrega ou se houver erro |
| Imagem carregada | Imagem cobre o círculo proporcionalmente e sobrepõe o fallback |

## Conteúdo

- Iniciais com até duas letras em maiúsculas (primeira letra do nome e do sobrenome).
- O texto alternativo no atributo alt da imagem deve ser o nome da pessoa ou organização.
- No grupo de avatares com contagem (+3), o número indica exatamente a quantidade restante de participantes.

## Acessibilidade

- **Teclado:** Não recebe foco diretamente. Quando usado como gatilho de menu ou perfil, envolva em botão ou link interativo.
- **Leitor de tela:** Imagens de avatar devem conter o nome do usuário no atributo alt. Quando acompanhado pelo nome por extenso visível, marque como decorativo passando alt vazio.
- **Foco:** Não retém foco por si só. Quando envolvido por link ou botão, exibe o anel de foco do elemento pai.
- **Cuidados:** Ao usar AvatarBadge para indicar status (como online/offline), garanta que a informação não dependa unicamente da cor, fornecendo texto acessível associado ou aria-label (WCAG 1.4.1).

## Tokens usados

- **Cor:** `bg-muted` `bg-primary` `text-muted-foreground`
  `text-primary-foreground`
- **Tipografia:** `text-sm` `text-xs`
- **Espaço:** `bottom-0` `right-0` `size-10` `size-2` `size-2.5`
  `size-3` `size-4` `size-5` `size-6` `size-8` `space-x-2`
- **Raio:** `rounded-full`
- **Foco:** `ring-background`

## Faça

- Use iniciais com duas letras maiúsculas quando a foto não estiver disponível.
- Mantenha o mesmo tamanho de avatar em todos os itens de uma lista ou tabela.
- Exiba o nome completo do usuário próximo ao avatar ou em uma dica flutuante.

## NÃO faça

- Usar imagens de baixa resolução ou rostos cortados → imagem nítida com enquadramento centralizado.
- Agrupar mais de 5 rostos visíveis no mesmo grupo → limite a 4 avatares e use `AvatarGroupCount` para o excedente.
- Usar cores aleatórias de fundo sem garantir contraste suficiente → use o fallback padrão em `bg-muted`.

## Exemplo mínimo

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/foto-perfil.jpg" alt="Rafael Anhaia" />
  <AvatarFallback>RA</AvatarFallback>
</Avatar>
```
