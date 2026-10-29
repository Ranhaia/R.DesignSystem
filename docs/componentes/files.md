---
slug: files
nome: Files
camada: organism
codigo: src/components/ui/files.tsx
story: src/components/ui/files.stories.tsx
status: piloto
sinonimos: [arvore-de-arquivos, árvore-de-arquivos, navegador-de-arquivos, file-tree, explorer, pastas]
vizinhos: [tree-select, list, collapsible]
referencias: [spec:files]
---

# Files

Árvore hierárquica de navegação por pastas e arquivos com expansão e recolhimento animados. Apresenta a estrutura de diretórios e permite selecionar itens.

## Quando usar

- Navegação por estrutura de pastas, arquivos ou diretórios de projetos em editores e ferramentas de código.
- Gerenciadores de documentos com hierarquia de múltiplos níveis com subpastas.
- Painéis de exploração de anexos ou recursos organizados em categorias aninhadas.

## Quando NÃO usar

- Seleção de uma opção em lista hierárquica dentro de um formulário → `tree-select`.
- Lista simples e plana de itens ou arquivos sem níveis de aninhamento → `list`.
- Seção única expansível de conteúdo sem múltiplos arquivos ou diretórios → `collapsible`.

## Anatomia

| Parte | O que é |
|---|---|
| `Files` | Contêiner raiz com papel de árvore e acessibilidade via prop label |
| `Folder` | Diretório expansível baseado em Collapsible que controla o estado aberto ou fechado |
| `FolderTrigger` | Botão interativo com ícone de seta giratória e ícone de pasta aberta ou fechada |
| `FolderContent` | Contêiner recolhível com papel de grupo e linha guia vertical de indentação à esquerda |
| `File` | Item folha com papel de item de árvore e indicador de arquivo ativo |

## Composição

Usa: [`icon`](icon.md) · [`collapsible`](collapsible.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `value` (Folder, File) | `string` | — | Identificador exclusivo do nó da árvore |
| `icon` (FolderTrigger, File) | `React.ReactNode` | — | Ícone customizado que substitui a pasta ou arquivo padrão |
| `label` (Files) | `string` | `Navegador de arquivos` | Nome acessível da árvore informado via aria-label |
| `defaultOpen` (Folder) | `boolean` | `false` | Define se a pasta inicia aberta por padrão |
| `active` (File) | `boolean` | `false` | Destaca visualmente o arquivo selecionado com fundo e peso de fonte |

## Variantes

Não possui variantes de estilo no código; a diferenciação decorre do tipo de nó (pasta ou arquivo) e do estado ativo.

## Tamanhos

Tamanho único. O contêiner ocupa a largura total disponível (`w-full`) com tipografia de 14 px (`text-sm`) e recuos proporcionais a cada nível.

## Estados

| Estado | Como aparece |
|---|---|
| Pasta fechada | Seta apontando para a direita com ícone de pasta fechada |
| Pasta aberta | Seta girada em 90 graus com ícone de pasta aberta e conteúdo visível |
| Arquivo ativo | Fundo de destaque em `bg-accent` com texto em `text-accent-foreground font-medium` |
| Hover | Fundo suave em `hover:bg-accent/70` no gatilho e `hover:bg-accent/60` no arquivo |
| Foco | Anel de foco em `ring-ring` com `outline-none` e recuo visual |

## Conteúdo

- Nomes de arquivos e pastas devem ser objetivos e refletir os nomes reais ou extensões: "index.ts", "components".
- Quando o arquivo não contiver filhos, a prop `value` é usada como o texto visível padrão.
- Ícones específicos por tipo de arquivo auxiliam na identificação rápida de formatos conhecidos.

## Acessibilidade

- **Teclado:** Tab e Shift+Tab navegam entre os itens interativos da árvore. Enter ou Espaço no gatilho da pasta alternam entre aberto e fechado. No arquivo, Enter ou clique selecionam o item.
- **Leitor de tela:** Raiz com papel `tree` e `aria-label` descritivo. Pastas utilizam Collapsible com `aria-expanded` para comunicar se a pasta está aberta ou fechada. Cada subnível de nós filhos fica dentro de um `role="group"`. Arquivos possuem `role="treeitem"`.
- **Foco:** O anel de foco visível destaca a pasta (`FolderTrigger`) ou o arquivo (`File`) ativo durante a navegação.
- **Cuidados:** A prop `label` na raiz `Files` fornece o nome acessível essencial para tecnologias assistivas. Forneça sempre um rótulo significativo ao contexto em que a árvore está inserida.

## Tokens usados

- **Cor:** `bg-accent` `border-border` `text-accent-foreground`
  `text-foreground` `text-muted-foreground`
- **Tipografia:** `font-medium` `font-sans` `text-sm`
- **Espaço:** `gap-0.5` `gap-1.5` `gap-2` `pl-1.5` `pl-4` `pr-1` `px-2`
  `py-0.5` `py-1` `py-1.5` `size-4`
- **Raio:** `rounded-md`
- **Movimento:** `duration-motion-base` `duration-motion-fast`
  `ease-spring`
- **Foco:** `ring-ring`

## Faça

- Use `defaultOpen` nas pastas principais para expor os arquivos mais relevantes logo no carregamento.
- Mantenha `active` no arquivo atualmente aberto ou selecionado pelo usuário.
- Personalize a prop `label` de `Files` quando houver mais de uma árvore na mesma página.

## NÃO faça

- Usar estrutura de pastas para seleção de valores em formulários sem relação com arquivos → `tree-select`.
- Aninhar pastas em mais de quatro níveis sem permitir busca ou atalhos diretos → `command`.
- Exibir lista simples de arquivos sem diretórios ou hierarquia aninhada → `list`.

## Exemplo mínimo

```tsx
import {
  File,
  Files,
  Folder,
  FolderContent,
  FolderTrigger,
} from "@/components/ui/files"

<Files label="Arquivos do projeto">
  <Folder value="src" defaultOpen>
    <FolderTrigger>src</FolderTrigger>
    <FolderContent>
      <File value="index.ts" active />
      <File value="styles.css" />
    </FolderContent>
  </Folder>
</Files>
```
