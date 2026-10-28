// Verificador do PASSI DS: lê arquivos HTML, CSS, JSX/TSX, Vue ou Svelte e aponta o que foge do sistema.
// Uso: node scripts/verificar.mjs <arquivo ou pasta> [...]   (opções: --json, --sem-notas)
// Confere: cores soltas, px e valores soltos em texto e espaço, variáveis que não existem, pares de texto e fundo
// fora da tabela de contraste, componentes que não existem no PASSI, atributos e textos dos componentes.
// Os dados vêm de fichas/ (geradas por scripts/gerar.mjs) e de css/passi.css. Sem dependências: só Node 18 ou mais novo.
// Para ignorar uma linha de propósito, escreva passi-ignorar num comentário nela. Para desligar regras no arquivo
// inteiro (por exemplo numa vitrine de componentes), escreva num comentário: passi-ignorar-regras: botao-um-primario, alerta-varios

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lerJSON = (f) => JSON.parse(fs.readFileSync(path.join(RAIZ, f), "utf8"));

/* ---------- Dados do sistema ---------- */

const INDICE = lerJSON("fichas/indice.json");
const CONTRASTE = lerJSON("fichas/contraste.json");
const FICHAS = Object.fromEntries(INDICE.componentes.map((c) => [c.slug, lerJSON(c.ficha)]));
const COM_CODIGO = Object.fromEntries(Object.values(FICHAS).filter((f) => f.codigo).map((f) => [f.codigo.elemento, f]));
const ICONES = new Set(INDICE.icones);

// Variáveis definidas no passi.css e o valor dos primitivos (para sugerir a cor com função certa)
const CSS_PASSI = fs.readFileSync(path.join(RAIZ, "css/passi.css"), "utf8");
const VARIAVEIS = new Set([...CSS_PASSI.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
const PRIMITIVOS = Object.fromEntries([...CSS_PASSI.matchAll(/(--(?:azul|neutro|ambar|verde|vermelho|violeta|transparente)-[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim().toLowerCase()]));
const ESPACOS = Object.fromEntries([...CSS_PASSI.matchAll(/(--espaco-[\d-]+):\s*([^;]+);\s*\/\*\s*(\d+) px/g)].map((m) => [Number(m[3]), m[1]]));
const RAIOS = Object.fromEntries([...CSS_PASSI.matchAll(/(--raio-[\w-]+):\s*(\d+)px/g)].map((m) => [Number(m[2]), m[1]]));
const ESTILOS_TEXTO = [...CSS_PASSI.matchAll(/--(texto-[\w-]+): \d+ ([\d.]+)rem\/[\d.]+ var/g)].map((m) => ({ classe: m[1], px: Math.round(Number(m[2]) * 16) }));
const PREFIXOS_PASSI = /^--(cor|espaco|raio|borda|texto|fonte|sombra|desfoque|duracao|curva|gradiente|grade|conteudo|azul|neutro|ambar|verde|vermelho|violeta|transparente)-/;

/* ---------- Utilidades ---------- */

const distancia = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
const parecido = (nome, lista, max = 3) => {
  let melhor = null, menor = Infinity;
  for (const x of lista) { const d = distancia(nome, x); if (d < menor) { menor = d; melhor = x; } }
  return menor <= max ? melhor : null;
};
const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const normalizar = (s) => semAcento(String(s).toLowerCase()).replace(/\s+/g, " ").trim();
const virgula = (n) => (Math.floor(n * 10) / 10).toFixed(1).replace(".", ",");
const kebab = (s) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

// Contraste WCAG, misturando cores translúcidas com o fundo da página (igual ao gerar.mjs)
const rgb = (h) => { const x = h.replace("#", ""); const n = (i) => parseInt(x.slice(i, i + 2), 16) / 255; return { r: n(0), g: n(2), b: n(4), a: x.length > 6 ? n(6) : 1 }; };
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
const sobre = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
const razao = (frente, fundo, modo) => {
  let b = rgb(CONTRASTE.cores[fundo][modo]);
  if (b.a < 1) b = sobre(b, rgb(CONTRASTE.cores["--cor-fundo-pagina"][modo]));
  const f = sobre(rgb(CONTRASTE.cores[frente][modo]), b);
  const [x, y] = [lum(f), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// Sugestão de cor com função para um código de cor, conforme a propriedade (texto, fundo ou borda)
const familiaDaPropriedade = (prop) => (/^(background|fill)/.test(prop) ? "fundo" : /^(border|outline|stroke)/.test(prop) ? "borda" : "texto");
const sugerirCor = (valor, prop) => {
  const v = valor.toLowerCase();
  const familia = familiaDaPropriedade(prop);
  const iguais = Object.entries(CONTRASTE.cores).filter(([, m]) => m.claro === v).map(([n]) => n);
  const daFamilia = iguais.filter((n) => n.startsWith(`--cor-${familia}-`));
  const lista = daFamilia.length ? daFamilia : iguais;
  if (lista.length) return `Use ${lista.slice(0, 2).map((n) => `var(${n})`).join(" ou ")}`;
  return familia === "fundo" ? "Use uma cor de fundo com função, como var(--cor-fundo-superficie)" : familia === "borda" ? "Use uma cor de borda com função, como var(--cor-borda-padrao)" : "Use uma cor de texto com função, como var(--cor-texto-padrao)";
};
const sugerirEspaco = (px) => (ESPACOS[px] ? `Use var(${ESPACOS[px]})` : `Use o valor mais próximo da escala: var(${ESPACOS[Object.keys(ESPACOS).map(Number).sort((a, b) => Math.abs(a - px) - Math.abs(b - px))[0]]})`);
const sugerirTexto = (px) => {
  const iguais = ESTILOS_TEXTO.filter((e) => e.px === px).map((e) => `.${e.classe}`);
  return iguais.length ? `Use uma classe de texto, como ${iguais.slice(0, 3).join(", ")}` : "Use uma classe de texto do PASSI (.texto-*), que já traz tamanho e entrelinha em rem";
};

const CORES_COM_NOME = new Set("white black red blue green gray grey yellow orange purple pink silver navy teal maroon olive lime aqua fuchsia brown cyan magenta gold indigo violet beige tan coral crimson salmon khaki lavender turquoise darkgray lightgray darkblue lightblue darkred darkgreen whitesmoke gainsboro".split(" "));
const PROPS_COR = /^(color|background|background-color|border|border-(top|right|bottom|left)(-color)?|border-color|outline|outline-color|fill|stroke|box-shadow|text-shadow|text-decoration(-color)?|caret-color|accent-color|column-rule(-color)?)$/;
const PROPS_ESPACO = /^(padding|margin)(-(top|right|bottom|left|inline|block)(-(start|end))?)?$|^(gap|row-gap|column-gap)$/;
const PROPS_TEXTO = /^(font-size|line-height|letter-spacing)$/;
const VALOR_LIVRE = /^(0|auto|inherit|initial|unset|revert|normal|none)$/;

/* ---------- Coleta de achados ---------- */

const NIVEIS = { erro: 0, aviso: 1, nota: 2 };

function verificarArquivo(arquivo) {
  const texto = fs.readFileSync(arquivo, "utf8");
  const ext = path.extname(arquivo).toLowerCase();
  const inicioLinhas = [0];
  for (let i = 0; i < texto.length; i++) if (texto[i] === "\n") inicioLinhas.push(i + 1);
  const posicao = (i) => {
    let lo = 0, hi = inicioLinhas.length - 1;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (inicioLinhas[m] <= i) lo = m; else hi = m - 1; }
    return { linha: lo + 1, coluna: i - inicioLinhas[lo] + 1 };
  };
  const linhaDe = (n) => texto.slice(inicioLinhas[n - 1], inicioLinhas[n] ?? texto.length);
  const achados = [];
  const regrasDesligadas = new Set((texto.match(/passi-ignorar-regras:\s*([\w\s,-]+)/) || [, ""])[1].split(/[\s,]+/).filter(Boolean));
  const achar = (i, nivel, regra, mensagem) => {
    const p = posicao(i);
    if (regrasDesligadas.has(regra) || /passi-ignorar(?!-regras)/.test(linhaDe(p.linha))) return;
    achados.push({ arquivo, ...p, nivel, regra, mensagem });
  };

  const ehMarcacao = [".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte", ".astro", ".js", ".ts"].includes(ext);
  const ehCSS = [".css", ".scss", ".less", ".pcss"].includes(ext);
  const ehJS = [".jsx", ".tsx", ".js", ".ts"].includes(ext);
  const definidasAqui = new Set([...texto.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));

  /* Declarações de estilo: blocos CSS, atributos style="" e objetos style={{ }} do React */
  const blocos = []; // { seletor, decls: [{prop, valor, i}] }

  const lerCSS = (css, base, seletorExterno = "") => {
    const limpo = css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
    const pilha = [];
    let inicio = 0, atual = { seletor: seletorExterno, decls: [] };
    const fecharDecls = (fim) => {
      const trecho = limpo.slice(inicio, fim);
      let deslocamento = 0;
      for (const parte of trecho.split(";")) {
        const m = parte.match(/^(\s*)([-\w]+)\s*:\s*([\s\S]+?)\s*$/);
        if (m && !/^\s*@/.test(parte)) atual.decls.push({ prop: m[2].toLowerCase(), valor: m[3].replace(/\s*!important$/, ""), i: base + inicio + deslocamento + m[1].length });
        deslocamento += parte.length + 1;
      }
    };
    for (let i = 0; i < limpo.length; i++) {
      const c = limpo[i];
      if (c === "{") {
        const seletor = limpo.slice(inicio, i).split(/[;}]/).pop().trim();
        // Texto antes do seletor ainda pode ter declarações (CSS aninhado)
        const antes = limpo.slice(inicio, i);
        const corte = antes.lastIndexOf(";");
        if (corte >= 0) fecharDecls(inicio + corte);
        pilha.push(atual);
        if (atual.decls.length) blocos.push(atual);
        atual = { seletor: seletor.startsWith("@") ? atual.seletor : seletor, decls: [] };
        inicio = i + 1;
      } else if (c === "}") {
        fecharDecls(i);
        blocos.push(atual);
        atual = pilha.pop() || { seletor: seletorExterno, decls: [] };
        atual = { ...atual, decls: [] };
        inicio = i + 1;
      }
    }
    fecharDecls(limpo.length);
    if (atual.decls.length) blocos.push(atual);
  };

  if (ehCSS) {
    if (/css\/passi\.css$/.test(arquivo.replace(/\\/g, "/"))) return { achados: [], ignorado: "é o próprio arquivo de tokens" };
    lerCSS(texto, 0);
  }
  if (ehMarcacao) {
    for (const m of texto.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) lerCSS(m[1], m.index + m[0].indexOf(m[1]));
    for (const m of texto.matchAll(/\sstyle\s*=\s*(["'])([\s\S]*?)\1/gi)) lerCSS(m[2], m.index + m[0].indexOf(m[2]), "style=\"\"");
    // React: style={{ fontSize: 14, padding: '8px 12px' }}
    for (const m of texto.matchAll(/style\s*=\s*\{\{([\s\S]*?)\}\}/g)) {
      const bloco = { seletor: "style={{}}", decls: [] };
      for (const d of m[1].matchAll(/([A-Za-z]+)\s*:\s*('[^']*'|"[^"]*"|`[^`]*`|-?[\d.]+)/g)) {
        const prop = kebab(d[1]);
        let valor = d[2].replace(/^['"`]|['"`]$/g, "");
        if (/^-?[\d.]+$/.test(d[2]) && Number(d[2]) !== 0 && !/^(line-height|font-weight|opacity|z-index|flex|flex-grow|flex-shrink|order)$/.test(prop)) valor = `${d[2]}px`;
        bloco.decls.push({ prop, valor, i: m.index + m[0].indexOf(d[0]) });
      }
      blocos.push(bloco);
    }
    // CSS dentro de template strings (styled-components, css``)
    if (ehJS) for (const m of texto.matchAll(/(?:styled[.\w()'"]*|css|createGlobalStyle|keyframes)\s*`([\s\S]*?)`/g)) lerCSS(m[1], m.index + m[0].indexOf(m[1]));
  }

  // O próprio arquivo de estilos dos componentes pode mexer nas partes internas; os outros não
  const ehDoComponente = /componentes\/passi-componentes\.(css|js)$/.test(arquivo.replace(/\\/g, "/"));
  // Classes postas nos próprios componentes (<passi-botao class="largura-total">): ".largura-total > button" também entra nele
  const classesNosComponentes = new Set([...texto.matchAll(/<passi-[\w-]+[^>]*?\sclass(?:Name)?\s*=\s*["']([^"']+)["']/g)].flatMap((m) => m[1].split(/\s+/)));
  const internasVistas = new Set();
  const internoUmaVez = (chave) => (internasVistas.has(chave) ? false : (internasVistas.add(chave), true));
  const entraNoComponente = (sel) =>
    /passi-[\w-]+\s*>|passi-[\w-]+\s+(button|a|input|label)\b/.test(sel) ||
    [...classesNosComponentes].some((c) => new RegExp(`\\.${c.replace(/[-]/g, "\\-")}\\s*(>\\s*)?(button|a|input|label|svg)\\b`).test(sel));
  const avisoInterno = "As partes internas dos componentes (o elemento nativo e as classes passi-*__*) não são API pública e podem mudar. Use os atributos documentados em componentes/README.md; se faltar uma opção, peça ao time do design system.";

  /* Regras de valor em cada declaração */
  for (const b of blocos) {
    if (!ehDoComponente && b.decls.length) {
      const interna = (b.seletor.match(/\.(passi-[\w-]+__[\w-]+)/) || [])[1];
      if (interna ? internoUmaVez(interna) : entraNoComponente(b.seletor))
        achar(b.decls[0].i, "aviso", "partes-internas", `O seletor "${b.seletor}" mexe dentro de um componente. ${avisoInterno}`);
    }
    for (const d of b.decls) {
      const { prop, valor, i } = d;
      const ehVariavelPropria = prop.startsWith("--");

      // Cor solta
      for (const h of valor.matchAll(/#[0-9a-fA-F]{3,8}\b/g))
        achar(i, "erro", "cor-solta", `Cor solta ${h[0]} em "${prop}". ${sugerirCor(h[0].length === 4 ? "#" + [...h[0].slice(1)].map((x) => x + x).join("") : h[0], prop)}.`);
      for (const f of valor.matchAll(/\b(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/gi))
        if (!/color-mix/i.test(valor.slice(Math.max(0, f.index - 6), f.index + 6))) achar(i, "erro", "cor-solta", `Cor solta ${f[1]}(...) em "${prop}". Use uma cor com função (var(--cor-...)) do passi.css.`);
      if (PROPS_COR.test(prop)) for (const w of valor.toLowerCase().split(/[\s,()]+/)) if (CORES_COM_NOME.has(w)) achar(i, "erro", "cor-solta", `Cor solta "${w}" em "${prop}". ${sugerirCor("", prop)}.`);

      // Variáveis: primitivos e nomes que não existem
      for (const v of valor.matchAll(/var\(\s*(--[\w-]+)/g)) {
        const nome = v[1];
        if (PRIMITIVOS[nome] !== undefined && !ehVariavelPropria) {
          const alvo = Object.entries(CONTRASTE.cores).filter(([, m]) => m.claro === PRIMITIVOS[nome]).map(([n]) => n).filter((n) => n.startsWith(`--cor-${familiaDaPropriedade(prop)}-`));
          achar(i, "erro", "cor-primitiva", `${nome} é um primitivo e não entra em componentes. ${alvo.length ? `Use ${alvo.slice(0, 2).map((n) => `var(${n})`).join(" ou ")}` : "Use uma cor com função (--cor-fundo-*, --cor-texto-*, --cor-borda-*)"}.`);
        } else if (PREFIXOS_PASSI.test(nome) && !VARIAVEIS.has(nome) && !definidasAqui.has(nome)) {
          const fator = nome.match(/^--espaco-([\d.]+)$/);
          const s = fator ? `var(${ESPACOS[Object.keys(ESPACOS).map(Number).sort((a, b) => Math.abs(a - Number(fator[1]) * 4) - Math.abs(b - Number(fator[1]) * 4))[0]]})`.slice(4, -1)
            : parecido(nome, VARIAVEIS, 3) || (/^--cor-/.test(nome) && /prim|brand|marca|main|acent|accent/.test(nome) ? "--cor-fundo-marca (fundo) ou --cor-texto-marca (texto)" : null);
          achar(i, "erro", "variavel-inexistente", `A variável ${nome} não existe no passi.css.${s ? ` Você quis dizer ${s}?` : ""}`);
        }
      }

      if (ehVariavelPropria) continue;
      const semVar = valor.replace(/var\([^)]*\)/g, "").replace(/calc\([^)]*\)/g, "");

      // px e valores soltos em texto e espaço
      if (PROPS_ESPACO.test(prop)) {
        const px = [...semVar.matchAll(/(-?[\d.]+)px\b/g)].map((m) => Math.abs(Number(m[1]))).filter((n) => n !== 0);
        if (px.length) achar(i, "erro", "px-em-espaco", `px em "${prop}: ${valor}". Espaço é em rem, pela escala. ${sugerirEspaco(px[0])}.`);
        else if (/(-?[\d.]+)(rem|em)\b/.test(semVar)) { const n = Math.round(Number(semVar.match(/([\d.]+)(rem|em)/)[1]) * 16); achar(i, "erro", "espaco-solto", `Espaço solto em "${prop}: ${valor}". ${sugerirEspaco(n)}.`); }
      }
      if (prop === "font-size") {
        const px = semVar.match(/([\d.]+)px\b/);
        if (px) achar(i, "erro", "px-em-texto", `px no tamanho do texto (${valor}). ${sugerirTexto(Number(px[1]))}.`);
        else if (/[\d.]+(rem|em|pt|vw|%)/.test(semVar)) achar(i, "erro", "texto-solto", `Tamanho de texto solto (${valor}). ${sugerirTexto(Math.round(Number(semVar.match(/([\d.]+)/)[1]) * 16))}.`);
      }
      if (prop === "line-height" || prop === "letter-spacing") {
        if (/[\d.]+px\b/.test(semVar)) achar(i, "erro", "px-em-texto", `px em "${prop}: ${valor}". Use as classes .texto-* (ou font: var(--texto-...)), que já trazem entrelinha e espaço entre letras em rem.`);
      }
      if (prop === "font" && !/^var\(--texto-/.test(valor.trim()) && !VALOR_LIVRE.test(valor.trim()) && valor.trim() !== "inherit")
        achar(i, "erro", /px\b/.test(semVar) ? "px-em-texto" : "texto-solto", `Estilo de texto solto (font: ${valor}). Use font: var(--texto-...) ou uma classe .texto-*.`);
      if (prop === "font-family" && !/var\(--fonte-/.test(valor) && !VALOR_LIVRE.test(valor.trim()) && valor.trim() !== "inherit")
        achar(i, "aviso", "familia-solta", `Família de fonte escrita à mão (${valor}). Use var(--fonte-titulos), var(--fonte-textos) ou var(--fonte-codigo), ou uma classe .texto-*.`);
      if (/^border(-(top|bottom)-(left|right))?-radius$/.test(prop)) {
        const px = semVar.match(/([\d.]+)(px|rem|em)\b/);
        if (px && Number(px[1]) !== 0) { const n = px[2] === "px" ? Number(px[1]) : Number(px[1]) * 16; achar(i, "erro", "raio-solto", `Canto solto (${valor}). Cantos só de --raio-*${RAIOS[n] !== undefined ? `: use var(${RAIOS[n]})` : ": pequeno 4, médio 8, grande 12, extra 20 ou pílula"}.`); }
      }
      if (/^(transition|transition-duration|animation|animation-duration)$/.test(prop) && /\b[\d.]+m?s\b/.test(semVar))
        achar(i, "aviso", "duracao-solta", `Duração solta em "${prop}". Use var(--duracao-...) e var(--curva-...), para respeitar o movimento reduzido.`);
      if (/^outline(-style|-width)?$/.test(prop) && /^(none|0(px)?)$/.test(valor.trim()) && /:focus/.test(b.seletor))
        achar(i, "erro", "foco-removido", `O contorno de foco foi removido em "${b.seletor}". Mantenha o anel de foco do passi.css ou ponha outro indicador visível no lugar.`);
    }

    // Par de texto e fundo no mesmo bloco
    const cor = b.decls.filter((d) => d.prop === "color").pop();
    const fundo = b.decls.filter((d) => d.prop === "background" || d.prop === "background-color").pop();
    const vCor = cor && cor.valor.match(/^var\(\s*(--cor-[\w-]+)\s*\)$/);
    const vFundo = fundo && fundo.valor.match(/^var\(\s*(--cor-[\w-]+)\s*\)$/);
    if (vCor && vFundo) verificarPar(vCor[1], vFundo[1], cor.i);
  }

  function verificarPar(frente, fundo, i) {
    if (!CONTRASTE.cores[frente] || !CONTRASTE.cores[fundo] || CONTRASTE.isentos.includes(frente)) return;
    const tipo = frente.startsWith("--cor-texto-") ? "t" : "e";
    const lim = CONTRASTE.limites[tipo];
    const naTabela = CONTRASTE.pares.some((p) => p.frente === frente && p.fundo === fundo);
    const medidas = CONTRASTE.modos.map((m) => ({ m, r: razao(frente, fundo, m), alvo: m.startsWith("alto") ? lim.altoContraste : lim.normal }));
    const falhas = medidas.filter((x) => x.r < x.alvo);
    const nomeModo = { claro: "claro", escuro: "escuro", "alto-contraste-claro": "alto contraste claro", "alto-contraste-escuro": "alto contraste escuro" };
    if (falhas.length)
      achar(i, "erro", "contraste", `${frente} sobre ${fundo} não tem contraste suficiente: ${falhas.map((x) => `${virgula(x.r)}:1 no ${nomeModo[x.m]} (mínimo ${virgula(x.alvo)}:1)`).join(", ")}. Use um par da tabela de contraste (diretrizes/fundamentos/acessibilidade.md).`);
    else if (!naTabela)
      achar(i, "nota", "contraste-fora-da-tabela", `${frente} sobre ${fundo} não está na tabela de contraste, mas passa: no mínimo ${virgula(Math.min(...medidas.map((x) => x.r)))}:1.`);
  }

  /* Marcação: componentes, atributos, textos e elementos nativos */
  if (ehMarcacao) {
    const marcacao = texto.replace(/<style[\s\S]*?<\/style>/gi, (m) => " ".repeat(m.length)).replace(/<script(?![^>]*type=["']?module)[^>]*>[\s\S]*?<\/script>/gi, (m) => (ehJS ? m : " ".repeat(m.length))).replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
    const tags = [...marcacao.matchAll(/<([a-zA-Z][\w.-]*)((?:\s+(?:[^\s=>{}"'/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|\{(?:[^{}]|\{[^{}]*\})*\}|[^\s>]+))?))*)\s*(\/?)>/g)];
    const lerAtributos = (s) => {
      const a = {};
      for (const m of s.matchAll(/([^\s=>{}"'/]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|\{((?:[^{}]|\{[^{}]*\})*)\}|([^\s>]+)))?/g))
        a[m[1]] = m[2] === undefined ? true : m[3] ?? m[4] ?? m[6] ?? { expressao: m[5] };
      return a;
    };
    const conteudoDe = (tag, fim) => {
      const fecha = marcacao.indexOf(`</${tag}>`, fim);
      if (fecha < 0) return null;
      return marcacao.slice(fim, fecha).replace(/<[^>]*>/g, " ").replace(/\{[^{}]*\}/g, " ").replace(/\s+/g, " ").trim();
    };
    const contagem = {};
    if (!ehDoComponente)
      for (const m of texto.matchAll(/["'.\s](passi-[a-z-]+__[a-z-]+)/g))
        if (!/<style/i.test(texto.slice(Math.max(0, texto.lastIndexOf("<style", m.index)), m.index)) || texto.lastIndexOf("</style>", m.index) > texto.lastIndexOf("<style", m.index))
          if (internoUmaVez(m[1])) achar(m.index, "aviso", "partes-internas", `Usa a classe interna ${m[1]}. ${avisoInterno}`);

    for (const t of tags) {
      const tag = t[1], attrs = lerAtributos(t[2] || ""), i = t.index, fimTag = t.index + t[0].length;
      const tagMin = tag.toLowerCase();

      // Elementos nativos que já têm componente no PASSI
      if (tagMin === "button" && !/^passi-/.test(tag)) achar(i, "aviso", "use-componente", `<button> solto. Use <passi-botao>, que já traz os cinco estados, o foco e as cores do PASSI.`);
      if (tagMin === "input") {
        const tipo = String(attrs.type || "text").toLowerCase();
        if (tipo === "checkbox") achar(i, "aviso", "use-componente", `<input type="checkbox"> solto. Use <passi-checkbox>.`);
        else if (["text", "email", "password", "tel", "search", "url", "number"].includes(tipo)) achar(i, "aviso", "use-componente", `<input type="${tipo}"> solto. Use <passi-campo-de-texto>, que já liga rótulo, ajuda e erro ao campo.`);
      }
      if (tagMin === "a" && attrs.href !== undefined) achar(i, "aviso", "use-componente", `<a> solto. Use <passi-link>, que já vem sublinhado e com os estados do PASSI.`);

      if (!/^passi-/i.test(tag)) continue;
      const slug = tagMin.slice(6);
      const ficha = COM_CODIGO[tagMin];
      if (!ficha) {
        if (FICHAS[slug]) achar(i, "erro", "componente-sem-codigo", `<${tagMin}>: o componente ${FICHAS[slug].nome} existe no PASSI DS, mas ainda não tem versão em código. Por enquanto, monte com HTML seguindo ${FICHAS[slug].diretrizes}.`);
        else {
          const destino = INDICE.sinonimos[slug] || parecido(slug, Object.keys(FICHAS), 3);
          const nome = destino && FICHAS[destino];
          achar(i, "erro", "componente-inexistente", `<${tagMin}> não existe no PASSI DS.${nome ? ` O mais próximo é ${nome.nome}${nome.codigo ? `: use <${nome.codigo.elemento}>` : ` (${nome.diretrizes}), que ainda não tem código`}.` : ` Componentes em código: ${Object.keys(COM_CODIGO).map((e) => `<${e}>`).join(", ")}.`}`);
        }
        continue;
      }

      const cod = ficha.codigo;
      const porNome = Object.fromEntries(cod.atributos.map((a) => [a.nome, a]));
      const GLOBAIS = /^(id|class|classname|style|slot|hidden|title|lang|dir|tabindex|role|key|ref|data-.*|aria-.*|on[a-z]+|on[A-Z]\w*|v-.*|:.*|@.*|x-.*|bind:.*|form)$/;
      const INGLES = { variant: "tipo", kind: "tipo", appearance: "tipo", size: "tamanho", label: "rotulo", disabled: "desabilitado", placeholder: "exemplo", value: "valor", name: "nome", required: "obrigatorio", optional: "opcional", checked: "marcado", indeterminate: "indeterminado", error: "erro", invalid: "erro", helper: "ajuda", hint: "ajuda", help: "ajuda", "helper-text": "ajuda", description: "descricao", success: "sucesso", icon: "icone-esquerda", "icon-left": "icone-esquerda", "icon-right": "icone-direita", "left-icon": "icone-esquerda", "right-icon": "icone-direita", target: "nova-aba", external: "nova-aba", dismissible: "pode-fechar", closable: "pode-fechar", "action-label": "acao", action: "acao", heading: "titulo", type: tagMin === "passi-botao" ? "tipo-html" : "tipo" };

      for (const [nomeAttr, valor] of Object.entries(attrs)) {
        const n = nomeAttr.toLowerCase();
        const def = porNome[n];
        if (!def) {
          if (n === "title" && porNome.titulo) { achar(i, "aviso", "atributo-desconhecido", `<${tagMin}> usa title. O título do alerta vai em titulo="...".`); continue; }
          if (GLOBAIS.test(nomeAttr)) continue;
          const certo = INGLES[n] && porNome[INGLES[n]] ? INGLES[n] : parecido(n, Object.keys(porNome), 3);
          achar(i, "erro", "atributo-desconhecido", `<${tagMin}> não tem o atributo "${nomeAttr}".${certo ? ` Use "${certo}".` : ` Atributos: ${Object.keys(porNome).join(", ")}.`}`);
          continue;
        }
        if (typeof valor === "object") continue; // expressão do framework: não dá para saber o valor
        if (def.tipo === "lista") {
          const v = normalizar(valor === true ? "" : valor).replace(/\s+/g, "-");
          if (!Object.keys(def.opcoes).includes(String(valor))) {
            const certo = Object.keys(def.opcoes).find((o) => o === v || normalizar(def.opcoes[o]) === normalizar(valor));
            achar(i, "erro", "valor-invalido", `${tagMin}: ${n}="${valor === true ? "" : valor}" não existe.${certo ? ` Use ${n}="${certo}".` : ` Opções: ${Object.keys(def.opcoes).join(", ")}.`}`);
          }
        }
        if (def.tipo === "icone" && !ICONES.has(String(valor))) {
          const s = INDICE.sinonimosIcones[String(valor).toLowerCase()] || parecido(String(valor), ICONES, 2);
          achar(i, "erro", "icone-inexistente", `O ícone "${valor}" não existe no PASSI DS.${s ? ` Você quis dizer "${s}"?` : " Use um dos 201 nomes de diretrizes/fundamentos/icones.md."}`);
        }
        if (def.tipo === "booleano" && /^(false|nao|não|0)$/i.test(String(valor)))
          achar(i, "aviso", "booleano-falso", `${n}="${valor}" ainda liga o atributo. Para desligar, tire o atributo.`);
      }

      const conteudo = t[3] === "/" ? "" : conteudoDe(tag, fimTag) ?? "";
      for (const def of cod.atributos.filter((a) => a.obrigatorio)) {
        const temNoConteudo = tagMin === "passi-checkbox" && def.nome === "rotulo" && conteudo;
        if (attrs[def.nome] === undefined && !temNoConteudo) achar(i, "erro", "atributo-obrigatorio", `<${tagMin}> precisa de ${def.nome}="..."${def.descricao ? `: ${def.descricao}` : "."}`);
      }
      if (cod.conteudo?.obrigatorio && !conteudo) achar(i, "erro", "conteudo-obrigatorio", `<${tagMin}> sem texto. ${cod.conteudo.descricao}`);

      // Regras de texto da ficha (seções Conteúdo e NÃO faça do componente)
      for (const r of cod.regras) {
        if (r.tipo === "maximo-por-arquivo") {
          const padrao = r.alvo ? porNome[r.alvo]?.padrao : null;
          const v = r.alvo ? (attrs[r.alvo] ?? padrao) : true;
          // Elementos escondidos (hidden) não contam: só um aparece de cada vez
          if (attrs.hidden === undefined && (!r.alvo || r.valores.includes(v))) {
            contagem[r.id] = (contagem[r.id] || 0) + 1;
            if (contagem[r.id] === r.maximo + 1) achar(i, r.nivel, r.id, r.mensagem);
          }
          continue;
        }
        const alvo = r.alvo === "conteudo" ? conteudo : attrs[r.alvo];
        if (typeof alvo !== "string" || !alvo) continue;
        const a = normalizar(alvo);
        const vals = r.valores.map(normalizar);
        const bate =
          (r.tipo === "texto-proibido" && vals.includes(a.replace(/[.!:]+$/, ""))) ||
          (r.tipo === "contem" && r.valores.some((x) => alvo.includes(x))) ||
          (r.tipo === "termina-com" && r.valores.some((x) => alvo.trim().endsWith(x) && !alvo.trim().endsWith("..."))) ||
          (r.tipo === "comeca-com" && vals.some((x) => a.startsWith(x))) ||
          (r.tipo === "igual-a-atributo" && r.valores.some((x) => typeof attrs[x] === "string" && normalizar(attrs[x]) === a)) ||
          (r.tipo === "regex" && r.valores.some((x) => new RegExp(x, "i").test(alvo))) ||
          (r.tipo === "href-de-acao" && r.valores.some((x) => alvo.trim() === x || alvo.trim().startsWith(x) && x.endsWith(":")));
        if (bate) achar(i, r.nivel, r.id, `${r.mensagem} (${tagMin}: "${alvo}")`);
      }
    }

    // Pares de texto e fundo nas classes do tema Tailwind do PASSI (text-texto-* com bg-fundo-*)
    for (const m of marcacao.matchAll(/\bclass(?:Name)?\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g)) {
      const classes = (m[1] ?? m[2] ?? m[3]).split(/\s+/);
      const i = m.index;
      const t = classes.find((c) => /^text-(texto|fundo|borda)-/.test(c));
      const f = classes.find((c) => /^bg-(fundo|texto)-/.test(c));
      if (t && f) verificarPar(`--cor-${t.slice(5)}`, `--cor-${f.slice(3)}`, i);
      for (const c of classes) {
        const arb = c.match(/^([\w-]+?)-\[([^\]]+)\]$/);
        if (arb) {
          if (/#[0-9a-f]{3,8}|rgba?\(|hsla?\(/i.test(arb[2])) achar(i, "erro", "cor-solta", `Cor solta na classe ${c}. Use as cores do tema PASSI, como bg-fundo-marca ou text-texto-padrao.`);
          else if (/px$/.test(arb[2])) achar(i, "erro", /^(text|leading|tracking)$/.test(arb[1]) ? "px-em-texto" : "px-em-espaco", `px na classe ${c}. Use a escala do PASSI (p-4 = 1 rem) ou as classes .texto-*.`);
        }
        const paleta = c.match(/^(?:[a-z]+:)*(bg|text|border|ring|outline|fill|stroke|from|via|to|divide|decoration|placeholder|accent|caret)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)(-\d{2,3})?(\/\d+)?$/);
        if (paleta) achar(i, "erro", "cor-solta", `A classe ${c} usa a paleta padrão do Tailwind, não a do PASSI. Use as cores com função, como bg-fundo-superficie ou text-texto-padrao.`);
        const esp = c.match(/^(?:[a-z]+:)*-?(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y)-([\d.]+)$/);
        if (esp && !ESPACOS[Number(esp[2]) * 4]) achar(i, "erro", "espaco-solto", `A classe ${c} está fora da escala de espaço do PASSI. Use ${Object.keys(ESPACOS).map((n) => Number(n) / 4).filter((n) => n > 0).join(", ")}.`);
        if (/^(?:[a-z]+:)*text-(xs|sm|base|lg|xl|\dxl)$/.test(c)) achar(i, "aviso", "texto-solto", `A classe ${c} é do Tailwind. Use as classes de texto do PASSI (.texto-*).`);
        if (/^(?:[a-z]+:)*rounded(-(sm|md|lg|xl|\dxl|full|none))?$/.test(c)) achar(i, "aviso", "raio-solto", `A classe ${c} é do Tailwind. Use rounded-pequeno, rounded-medio, rounded-grande, rounded-extra ou rounded-pilula.`);
      }
    }

    // Textos visíveis: glossário e linguagem inclusiva
    const visivel = marcacao.replace(/<(script|code|pre)\b[\s\S]*?<\/\1>/gi, (m) => " ".repeat(m.length));
    const trechos = [...visivel.matchAll(/>([^<>{}]+)</g)].map((m) => ({ txt: m[1], i: m.index + 1 }))
      .concat([...visivel.matchAll(/\s(?:rotulo|titulo|ajuda|erro|acao|descricao|exemplo|aria-label|placeholder|alt|title)\s*=\s*"([^"]+)"/g)].map((m) => ({ txt: m[1], i: m.index })));
    for (const { txt, i } of trechos) {
      for (const g of INDICE.glossario) {
        if (/^Quando/.test(g.observacao)) continue; // depende do contexto (Excluir x Remover)
        for (const ev of g.evite) {
          const re = new RegExp(`(^|[^\\p{L}-])${ev.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}-])`, "iu");
          if (re.test(txt)) achar(i, "aviso", "glossario", `"${ev}" está na lista do glossário para evitar. Use "${g.use}"${g.observacao ? ` (${g.observacao.replace(/\.$/, "")})` : ""}.`);
        }
      }
      if (/\b\p{L}+\((a|as|o|os)\)/u.test(txt) || /\b(todes|elu|delu)\b/i.test(txt) || /\b\p{L}+[oa]\/[oa]\b/u.test(txt))
        achar(i, "aviso", "linguagem-inclusiva", `Linguagem inclusiva fora da norma em "${txt.trim().slice(0, 60)}". Prefira formas neutras, como "Boas-vindas" ou "quem se inscreveu" (diretrizes/conteudo/linguagem-inclusiva.md).`);
    }
  }

  return { achados };
}

/* ---------- Linha de comando ---------- */

const args = process.argv.slice(2);
const opcoes = new Set(args.filter((a) => a.startsWith("--")));
const alvos = args.filter((a) => !a.startsWith("--"));
if (!alvos.length) {
  console.log("Uso: node scripts/verificar.mjs <arquivo ou pasta> [...] [--json] [--sem-notas]");
  process.exit(2);
}
const EXTENSOES = /\.(html?|css|scss|less|pcss|jsx|tsx|js|ts|vue|svelte|astro)$/i;
const arquivos = [];
const juntar = (p) => {
  if (!fs.existsSync(p)) { console.error(`Não encontrei ${p}.`); process.exitCode = 2; return; }
  if (fs.statSync(p).isDirectory()) {
    for (const f of fs.readdirSync(p)) if (!/^(node_modules|\.git|\.next|dist|build)$/.test(f)) juntar(path.join(p, f));
  } else if (EXTENSOES.test(p)) arquivos.push(p);
};
alvos.forEach(juntar);

let todos = [];
const ignorados = [];
for (const f of arquivos) {
  const r = verificarArquivo(f);
  if (r.ignorado) ignorados.push(`${f} (${r.ignorado})`);
  todos.push(...r.achados);
}
if (opcoes.has("--sem-notas")) todos = todos.filter((a) => a.nivel !== "nota");
todos.sort((a, b) => a.arquivo.localeCompare(b.arquivo) || a.linha - b.linha || a.coluna - b.coluna || NIVEIS[a.nivel] - NIVEIS[b.nivel]);

const conta = (n) => todos.filter((a) => a.nivel === n).length;
if (opcoes.has("--json")) {
  console.log(JSON.stringify({ arquivos: arquivos.length, erros: conta("erro"), avisos: conta("aviso"), notas: conta("nota"), achados: todos }, null, 2));
} else {
  const cor = process.stdout.isTTY ? { erro: "\x1b[31m", aviso: "\x1b[33m", nota: "\x1b[36m", fim: "\x1b[0m", fraco: "\x1b[2m" } : { erro: "", aviso: "", nota: "", fim: "", fraco: "" };
  console.log("PASSI DS · verificador\n");
  let atual = null;
  for (const a of todos) {
    if (a.arquivo !== atual) { atual = a.arquivo; console.log(path.relative(process.cwd(), a.arquivo)); }
    console.log(`  ${cor.fraco}${`${a.linha}:${a.coluna}`.padEnd(8)}${cor.fim}${cor[a.nivel]}${a.nivel.padEnd(6)}${cor.fim}${a.mensagem} ${cor.fraco}[${a.regra}]${cor.fim}`);
  }
  if (todos.length) console.log("");
  for (const g of ignorados) console.log(`Ignorado: ${g}`);
  const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
  console.log(`Resumo: ${plural(arquivos.length, "arquivo", "arquivos")}, ${plural(conta("erro"), "erro", "erros")}, ${plural(conta("aviso"), "aviso", "avisos")}, ${plural(conta("nota"), "nota", "notas")}.`);
  if (!conta("erro")) console.log("Nenhum erro: o código segue as regras que o verificador confere.");
}
process.exitCode = conta("erro") ? 1 : process.exitCode || 0;
