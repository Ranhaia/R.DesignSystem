import { CodeBlock } from "@/components/ui/code-block"

export default function CodeBlockDemo() {
  return (
    <CodeBlock
      className="w-full max-w-lg"
      language="bash"
      code={"npm install\nnpm run dev"}
    />
  )
}
