# Spec — Files Animado (Radix UI / Motion)

Status: Proposta técnica para atualização futura.  
Referência externa: [Animate UI — Files Primitive (Radix)](https://animate-ui.com/docs/primitives/radix/files)

---

## 1. Visão Geral e Objetivo

O componente `Files` é uma estrutura de navegação hierárquica (file-tree / explorer) que exibe pastas e arquivos de forma expansível, com animações suaves e expressivas (spring motion) ao abrir/fechar diretórios ou selecionar itens.

O objetivo no nosso Design System é fornecer um componente nativo, acessível, adaptável a temas e em total conformidade com os tokens semânticos do projeto.

---

## 2. Anatomia Proposta

O componente segue a filosofia composicional do Radix UI e Animate UI:

- `Files`: Container raiz com contexto e estado de seleção/árvore (`role="tree"`).
- `Folder`: Wrapper de cada diretório, mantendo estado de aberto/fechado (`role="treeitem"`).
- `FolderTrigger`: Botão/gatilho interativo para expandir/recolher a pasta com chevron animado.
- `FolderContent`: Conteúdo colapsável animado que agrupa os nós filhos (subpastas e arquivos).
- `File`: Item final de arquivo, com suporte a ícones, tags de extensão e ação de clique/seleção.
- `FileIcon`: Utilitário para renderizar ícone correspondente à extensão ou tipo de arquivo.

---

## 3. Estratégias de Animação (Decisão Técnica)

Existem duas abordagens para incorporar este comportamento no DS:

### Opção A: Motion (`motion` para React 19) — *Recomendada pelo Animate UI*
- **Instalação:** `npm install motion`
- **Vantagens:** Animação com física real de mola (*spring*), altura automática com layout shifts perfeitos (`motion.div layout`), transições em cascata (*stagger*) e suporte a saída de nós (`AnimatePresence`).
- **Atenção:** Adiciona runtime JavaScript de animação.

### Opção B: CSS Transitions Nativas do DS (Zero dependências extras)
- **Implementação:** Usa `@radix-ui/react-collapsible` (já presente via pacote `radix-ui`) combinado com transições CSS utilizando os tokens de `--duration-motion-*` de `src/app/globals.css` e truque de grid (`grid-template-rows: 0fr -> 1fr`) ou `interpolate-size: allow-keywords`.
- **Vantagens:** Zero novas dependências, leve, cumpre 90% do efeito visual.
- **Limitações:** Menor controle sobre física dinâmica de *spring*.

---

## 4. Integração com o Design System

Seguindo as regras de `CLAUDE.md`:
1. **Tokens Semânticos:** Nunca usar cores fixas (ex: `text-blue-500` hardcoded). Usar `text-foreground`, `text-muted-foreground`, `bg-accent/50`, `hover:bg-accent`, `border-border`.
2. **Acessibilidade:**
   - Atributos ARIA adequados para árvore de arquivos (`aria-expanded`, `role="tree"`, `role="treeitem"`).
   - Suporte completo a navegação por teclado (Setas Cima/Baixo, Direita para abrir, Esquerda para fechar, Enter/Espaço para selecionar).
   - Respeito estrito a `@media (prefers-reduced-motion: reduce)` anulando a mola/duração caso o usuário solicite.
3. **Padrão de Código:** Arquivo em `src/components/ui/files.tsx`, usando `cn()`, `data-slot` e tipagem TypeScript estrita.

---

## 5. Exemplo de Utilização Proposto

```tsx
import { Files, Folder, FolderTrigger, FolderContent, File } from "@/components/ui/files"
import { IconFolder, IconFolderOpen, IconFileText, IconCode } from "@tabler/icons-react"

export function FileTreeDemo() {
  return (
    <Files className="w-80 rounded-md border border-border p-2 bg-card">
      <Folder value="src">
        <FolderTrigger>
          <IconFolder className="size-4 text-muted-foreground" />
          <span>src</span>
        </FolderTrigger>
        <FolderContent>
          <Folder value="components">
            <FolderTrigger>
              <IconFolder className="size-4 text-muted-foreground" />
              <span>components</span>
            </FolderTrigger>
            <FolderContent>
              <File value="button.tsx">
                <IconCode className="size-4 text-muted-foreground" />
                <span>button.tsx</span>
              </File>
            </FolderContent>
          </Folder>
          <File value="index.ts">
            <IconFileText className="size-4 text-muted-foreground" />
            <span>index.ts</span>
          </File>
        </FolderContent>
      </Folder>
    </Files>
  )
}
```
