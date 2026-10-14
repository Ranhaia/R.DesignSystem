// E2E do switch de modo claro/escuro da app do DS.
// Rodar com o dev server no ar: `npx next dev -p 3301` e depois `npm run test:e2e:modo`.
import { after, before, test } from "node:test"
import assert from "node:assert/strict"
import { chromium } from "playwright"

const URL = process.env.E2E_URL ?? "http://localhost:3301/estilo"
const PRESETS = [
  { value: "default", rotulo: "Padrão", nativo: "claro" },
  { value: "editorial", rotulo: "Editorial", nativo: "claro" },
  { value: "tech", rotulo: "Tech", nativo: "claro" },
  { value: "soft", rotulo: "Suave", nativo: "claro" },
  { value: "midnight", rotulo: "Midnight", nativo: "escuro" },
]

let browser, page
before(async () => {
  browser = await chromium.launch()
  page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  page.setDefaultTimeout(8000)
})
after(async () => browser?.close())

async function abrir(preset, modo) {
  await page.goto(URL)
  await page.evaluate(([p, m]) => {
    localStorage.setItem("style-preset", p)
    if (m) localStorage.setItem("tema-modo", m)
    else localStorage.removeItem("tema-modo")
  }, [preset, modo])
  await page.reload()
  await page.getByRole("switch", { name: "Modo escuro" }).waitFor()
}

const escuroNoHtml = () => page.evaluate(() => document.documentElement.classList.contains("dark"))
const marcado = async () => (await page.getByRole("switch", { name: "Modo escuro" }).getAttribute("aria-checked")) === "true"

// Contraste real no DOM: cor do texto do <body> sobre o primeiro fundo opaco atrás dele.
const contrasteDoTexto = () =>
  page.evaluate(() => {
    const rgb = (s) => s.match(/[\d.]+/g).map(Number)
    let el = document.body, fundo = rgb(getComputedStyle(el).backgroundColor)
    while (fundo.length === 4 && fundo[3] === 0 && el.parentElement) { el = el.parentElement; fundo = rgb(getComputedStyle(el).backgroundColor) }
    const texto = rgb(getComputedStyle(document.body).color)
    const lum = ([r, g, b]) => [r, g, b].map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0)
    const [a, b] = [lum(texto), lum(fundo)].sort((x, y) => y - x)
    return Math.floor(((a + 0.05) / (b + 0.05)) * 100) / 100
  })

for (const p of PRESETS) {
  test(`${p.value}: sem preferência segue o modo nativo do preset`, async () => {
    await abrir(p.value, null)
    assert.equal(await escuroNoHtml(), p.nativo === "escuro")
    assert.equal(await marcado(), p.nativo === "escuro")
  })

  test(`${p.value}: o switch alterna, persiste ao recarregar e o texto passa AA nos dois modos`, async () => {
    await abrir(p.value, null)
    const inicial = await escuroNoHtml()
    await page.getByRole("switch", { name: "Modo escuro" }).click()
    assert.equal(await escuroNoHtml(), !inicial)
    assert.equal(await marcado(), !inicial)
    assert.ok((await contrasteDoTexto()) >= 4.5, `contraste do texto em ${p.value}/${inicial ? "claro" : "escuro"}`)
    await page.reload()
    await page.getByRole("switch", { name: "Modo escuro" }).waitFor()
    assert.equal(await escuroNoHtml(), !inicial, "a escolha precisa sobreviver ao recarregar")
    await page.getByRole("switch", { name: "Modo escuro" }).click()
    assert.equal(await escuroNoHtml(), inicial)
    assert.ok((await contrasteDoTexto()) >= 4.5, `contraste do texto em ${p.value}/${inicial ? "escuro" : "claro"}`)
  })
}

test("trocar de preset mantém a escolha manual de modo", async () => {
  await abrir("default", "escuro")
  assert.equal(await escuroNoHtml(), true)
  await page.getByRole("button", { name: "Trocar tema" }).click()
  await page.getByRole("menuitem", { name: /Editorial/ }).click()
  assert.equal(await page.evaluate(() => document.documentElement.dataset.style), "editorial")
  assert.equal(await escuroNoHtml(), true, "o preset não pode desfazer a escolha manual")
  await page.getByRole("button", { name: "Trocar tema" }).click()
  await page.getByRole("menuitem", { name: /Midnight/ }).click()
  await page.getByRole("button", { name: "Trocar tema" }).click()
  await page.getByRole("menuitem", { name: /Padrão/ }).click()
  assert.equal(await escuroNoHtml(), true)
})

// SC 2.5.8: o Switch do DS tem ~32×18, abaixo de 24 na altura (achado do DS, vai para a linha de base da Fase 2).
// Aqui vale a exceção de espaçamento: um círculo de 24px centrado no switch não toca nenhum outro alvo.
test("o switch cumpre o alvo mínimo (24×24 ou exceção de espaçamento)", async () => {
  await abrir("default", null)
  const sw = page.getByRole("switch", { name: "Modo escuro" })
  const c = await sw.boundingBox()
  if (c.width >= 24 && c.height >= 24) return
  const cx = c.x + c.width / 2, cy = c.y + c.height / 2
  const vizinhos = await page.evaluate(() => {
    const sel = 'button, a[href], input, select, textarea, [role=button], [role=link], [role=switch], [role=checkbox], [role=menuitem], [role=tab]'
    return [...document.querySelectorAll(sel)]
      .filter((e) => e.getAttribute("role") !== "switch" || e.getAttribute("aria-label") !== "Modo escuro")
      .map((e) => e.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0)
      .map((r) => ({ x: r.x, y: r.y, w: r.width, h: r.height }))
  })
  for (const r of vizinhos) {
    const dx = Math.max(r.x - cx, 0, cx - (r.x + r.w)), dy = Math.max(r.y - cy, 0, cy - (r.y + r.h))
    if (dx === 0 && dy === 0) continue // é o próprio switch (ou o rótulo que o envolve)
    assert.ok(Math.hypot(dx, dy) >= 12, `outro alvo a ${Math.hypot(dx, dy).toFixed(1)}px do centro do switch`)
  }
})
