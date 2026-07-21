/** Deriva um título legível a partir do nome do arquivo de exemplo. */
export function exampleTitle(slug: string, exampleName: string): string {
  let rest = exampleName.startsWith(slug + "-")
    ? exampleName.slice(slug.length + 1)
    : exampleName
  if (!rest || rest === "demo") return "Básico"
  return rest
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}
