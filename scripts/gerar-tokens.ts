import { register } from "node:module"

const hook = `
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if (err.code === "ERR_MODULE_NOT_FOUND") {
      for (const ext of [".ts", ".tsx", ".js"]) {
        try {
          return await nextResolve(specifier + ext, context);
        } catch {}
      }
    }
    throw err;
  }
}
`

register("data:text/javascript," + encodeURIComponent(hook))

async function principal() {
  const { writeFileSync } = await import("node:fs")
  const { resolve } = await import("node:path")
  const { gerarCss } = await import("../src/lib/cor/css")

  const destino = resolve(process.cwd(), "src/app/tokens-cor.css")
  const css = gerarCss()
  writeFileSync(destino, css, "utf8")
  console.log(`tokens-cor.css gerado em ${destino}`)
}

principal().catch((err) => {
  console.error(err)
  process.exit(1)
})
