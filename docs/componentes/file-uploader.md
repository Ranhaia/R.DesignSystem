---
slug: file-uploader
nome: File Uploader
camada: atom
codigo: src/components/ui/file-uploader.tsx
story: src/components/ui/file-uploader.stories.tsx
status: piloto
sinonimos: [envio-de-arquivo, upload, file-upload, dropzone]
vizinhos: [attachment, thumbnail, input]
referencias: [passi:envio-de-arquivo, spec:file-uploader]
---

# File Uploader

Área interativa para envio de arquivos por clique ou arrastar e soltar (drag and drop). Atua como zona de captura acessível associada a um campo de arquivo nativo.

## Quando usar

- Receber anexos de formulários como comprovantes, documentos em PDF ou planilhas.
- Permitir o upload de fotos e imagens com suporte a múltiplos arquivos.
- Fornecer uma área ampla de drop com feedback visual imediato ao arrastar arquivos.

## Quando NÃO usar

- Exibir a lista de arquivos já anexados com progresso e botão de remoção → `attachment`.
- Miniatura visual de imagem enviada com opção de visualização → `thumbnail`.
- Campo simples de texto ou entrada de URL externa → `input`.

## Anatomia

| Parte | O que é |
|---|---|
| `FileUploader` | Elemento raiz label com borda tracejada associado ao input nativo |
| Ícone (interno) | Glifo cloud_upload do componente icon no centro da área |
| Texto (interno) | Rótulo explicativo com instrução de clique ou arrasto |
| Input (interno) | Elemento input type="file" nativo escondido com sr-only |

## Composição

Usa: [`icon`](icon.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `label` | `string` | `Arraste um arquivo ou clique para selecionar` | Texto visível de instrução dentro da zona de captura |
| `multiple` | `boolean` | `false` | Permite selecionar múltiplos arquivos simultaneamente |
| `disabled` | `boolean` | `false` | Desabilita a área e bloqueia eventos de clique e arrasto |
| `accept` (FileUploader) | `string` | — | Extensões ou tipos MIME aceitos (ex.: image/* ou .pdf) |
| `maxSize` (FileUploader) | `number` | — | Limite máximo em bytes aceito por arquivo |
| `onFilesSelected` (FileUploader) | `(files: File[]) => void` | — | Callback chamado com os arquivos válidos selecionados |
| `onFilesRejected` (FileUploader) | `(files: File[]) => void` | — | Callback chamado quando arquivos excedem maxSize |

## Variantes

Nenhuma variante de estilo. A aparência utiliza borda tracejada border-dashed com destaque em border-primary ao arrastar.

## Tamanhos

Tamanho único flexível. A largura preenche o container pai e o espaçamento interno é fixado em p-8 com cantos rounded-xl.

## Estados

| Estado | Como aparece |
|---|---|
| Padrão | Borda tracejada border-input com texto muted e cursor de ponteiro |
| Arrastando | Borda border-primary e fundo sutil bg-primary/5 com data-dragging |
| Foco | Anel de foco externo de 3 px em ring-ring acionado via has-[:focus-visible] |
| Desabilitado | Opacidade reduzida em 50% com cursor-not-allowed e ponteiro desativado |

## Conteúdo

- Indique explicitamente na instrução os formatos suportados e limites de tamanho (ex.: PDF até 10 MB).
- Mantenha o texto da ação claro e direto, informando que é possível tanto clicar quanto arrastar.
- Em caso de arquivo rejeitado por tamanho, mostre uma mensagem de erro explicando o motivo e como corrigir.

## Acessibilidade

- **Teclado:** Foco navega com Tab até o input nativo associado. Teclas Enter e Espaço abrem a janela de seleção de arquivos do sistema operacional. O arrastar e soltar funciona como atalho complementar, nunca exclusivo (WCAG 2.5.7).
- **Leitor de tela:** O label anuncia a instrução ao receber foco. O input anuncia tipo de controle e formatos aceitos quando informados via accept.
- **Foco:** O anel de foco de 3 px (ring-ring) é projetado no container raiz através do seletor has-[:focus-visible] quando o input interno recebe foco.
- **Cuidados:** Nunca remova a opção de clique, pois usuários que navegam por teclado ou com dificuldades motoras não utilizam arrastar e soltar (WCAG 2.5.7).

## Tokens usados

- **Cor:** `bg-primary` `border-input` `border-primary` `border-ring`
  `text-foreground` `text-muted-foreground`
- **Tipografia:** `text-sm`
- **Espaço:** `gap-2` `p-8`
- **Raio:** `rounded-xl`
- **Foco:** `ring-ring`

## Faça

- Informe com clareza os formatos aceitos e o tamanho máximo permitido antes do envio.
- Conecte o callback onFilesSelected para receber os arquivos e exibir o progresso com o componente attachment.
- Disponibilize sempre o clique para abrir o explorador de arquivos, sem depender apenas do arrasto.

## NÃO faça

- Rejeitar arquivos grandes sem fornecer mensagem clara ao usuário → use onFilesRejected com instrução amigável.
- Usar a zona de captura para listar arquivos já enviados → liste os itens enviados com `attachment`.
- Exibir área de captura com texto em língua estrangeira → forneça a prop label em português.

## Exemplo mínimo

```tsx
import { FileUploader } from "@/components/ui/file-uploader"

<FileUploader
  accept="image/*,.pdf"
  maxSize={10 * 1024 * 1024}
  label="Arraste seus documentos ou clique para selecionar"
  onFilesSelected={(files) => console.log(files)}
/>
```
