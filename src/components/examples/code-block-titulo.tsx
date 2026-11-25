import { CodeBlock } from "@/components/ui/code-block"

const codigo = `import { Button } from "@/components/ui/button"

export function Salvar() {
  return <Button>Salvar alterações</Button>
}`

export default function CodeBlockTitulo() {
  return (
    <CodeBlock className="w-full max-w-lg" title="salvar.tsx" language="tsx" code={codigo} />
  )
}
