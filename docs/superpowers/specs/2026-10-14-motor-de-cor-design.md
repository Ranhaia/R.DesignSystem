# Motor de cor (lógica M3, sem dependência): desenho

**Data:** 2026-10-14
**Status:** aguardando revisão
**Relaciona:** `2026-10-14-trava-acessibilidade-design.md` (a trava confere tudo o que o motor gera)

## 1. Objetivo

Toda cor do DS nasce de **uma cor-fonte por preset**, por uma lógica única inspirada no Material Design 3: paletas tonais derivadas da fonte e um mapa fixo **papel → tom** para claro e escuro. Fundo, superfícies e texto vêm de uma paleta **neutra** (quase cinza), e a cor da marca aparece nas ações e nos acentos. Cada preset pode **sobrescrever** um papel quando a geração não servir; a sobrescrita é exceção visível e também passa pela trava de acessibilidade.

É o **motor de geração inicial**: escolhe-se uma cor e a estrutura inteira se monta. Ele será reutilizado depois pelo `SeletorDeCor`, pela cor da organização no Central ESG e pelos temas de tenant da Trama.

### Decisões

| Tema | Decisão |
|---|---|
| Dependência | **Nenhuma.** Script interno; não usa `@material/material-color-utilities` |
| Alcance | **Todas as cores** dos 5 presets, claro e escuro, passam pelo motor |
| Variações de cor | Preservadas pela **cor-fonte** de cada preset (a ação de hoje) e, quando preciso, por sobrescritas |
| Neutros | Croma muito baixo (variante "Neutral" do M3): o fundo é sempre quase cinza |

### Fora do escopo

Uso em tela pelos projetos (Trama, Central ESG): vem depois, importando o mesmo `gerar.ts`. Contraste entre séries vizinhas de gráfico.

## 2. Modelo de cor (sem HCT)

O M3 usa o espaço HCT (CAM16). Sem a biblioteca, o motor usa uma aproximação explícita e testada:

- **Tom** = L* do CIELAB (0 a 100), **exatamente** como o tom do HCT (que é definido como L*).
- **Matiz e croma** = H e C do OKLCH (perceptualmente uniformes, já usados no DS).
- `cor(matiz, croma, tom)`: acha o L do OKLCH que dá aquele L*, com a matiz e o croma pedidos; se sair do gamut sRGB, reduz o croma até caber (a matiz e o tom nunca mudam).

O núcleo de conversões (hex ↔ OKLab ↔ sRGB linear ↔ L*) sai de `src/lib/a11y/contraste.ts` para `src/lib/cor/espaco.ts`, usado pelo contraste e pelo motor (uma implementação só).

## 3. Paletas a partir da fonte

Da cor-fonte (hex) tiram-se `H0` e `C0` (OKLCH):

| Paleta | Matiz | Croma (OKLCH) | Uso |
|---|---|---|---|
| primária | H0 | max(C0, 0,06) | ação, anel de foco |
| secundária | H0 | C0 × 0,35 | superfícies de destaque discreto |
| terciária | H0 + 60° | C0 × 0,6 | acento, gráficos |
| neutra | H0 | 0,004 | fundo, superfícies, texto |
| neutra-variante | H0 | 0,010 | texto de apoio, bordas |
| erro | 25° | 0,19 | destrutivo (igual em todos os presets) |
| IA | 285° | 0,16 | família `--ai-*` (igual em todos os presets) |

Fonte acromática (C0 < 0,01, como o preset padrão): primária fica com o croma da própria fonte (monocromático), e as demais paletas seguem as regras acima.

## 4. Mapa papel → tom (a estrutura única)

Tons do M3 (`color_spec_2021`), adaptados à elevação do DS (no claro o card é mais claro que o fundo; no escuro também).

| Token | Paleta | Claro | Escuro |
|---|---|---|---|
| `--background` | neutra | 96 | 6 |
| `--foreground` | neutra | 10 | 90 |
| `--card`, `--popover` | neutra | 100 | 12 |
| `--card-foreground`, `--popover-foreground` | neutra | 10 | 90 |
| `--muted` | neutra | 94 | 17 |
| `--muted-foreground` | neutra-variante | 30 | 80 |
| `--primary` | primária | **fonte** (ver 5) | 80 |
| `--primary-foreground` | primária | 100 ou 10 (ver 5) | 20 |
| `--secondary` | secundária | 90 | 30 |
| `--secondary-foreground` | secundária | 10 | 90 |
| `--accent` | terciária | 90 | 30 |
| `--accent-foreground` | terciária | 10 | 90 |
| `--destructive` | erro | 40 | 80 |
| `--destructive-foreground` | erro | 100 | 20 |
| `--border` | neutra-variante | 80 | 30 |
| `--input` | neutra-variante | 50 | 60 |
| `--ring` | primária | 40 | 80 |
| `--chart-1…5` | terciária, primária, secundária… | 40, 50, 60, 70, 30 | 80, 70, 60, 50, 90 |
| `--sidebar` | neutra | 98 | 10 |
| `--sidebar-foreground` | neutra | 10 | 90 |
| `--sidebar-primary` / `-foreground` | primária | igual a `--primary` / `-foreground` | igual |
| `--sidebar-accent` / `-foreground` | secundária | 90 / 10 | 30 / 90 |
| `--sidebar-border` | neutra-variante | 80 | 30 |
| `--sidebar-ring` | primária | 40 | 80 |
| `--ai-surface` / `-highlight` / `-interactive` / `-hover` / `-pressed` | IA | 98 / 95 / 90 / 80 / 30 | 10 / 15 / 25 / 35 / 80 |
| `--ai-text-high` / `-low` | IA | 10 / 30 | 95 / 80 |

`--input` no tom 50/60 é o "outline" do M3: dá 3:1 contra o fundo e resolve as dúvidas de borda de campo. `--border` (80/30) é a linha decorativa, isenta de 3:1 porque não é o único limite de um controle.

Os gradientes `--ai-gradient-*` continuam escritos à mão (não são cor única).

## 5. Fidelidade à marca

`--primary` no claro é **a própria cor-fonte**, para cada preset manter a sua cor. `--primary-foreground` no claro é o tom 100 (branco da paleta) se ele der 4,5:1 sobre a fonte; senão, o tom 10. Se nenhum dos dois passar, o script falha e pede outra fonte ou uma sobrescrita.

## 6. Presets e sobrescritas

```ts
// src/lib/cor/presets.ts
export const PRESETS = {
  default:   { fonte: "#171717", nativo: "claro" },
  editorial: { fonte: "#7E2600", nativo: "claro" },
  tech:      { fonte: "#1447E6", nativo: "claro" },
  soft:      { fonte: "#E31A39", nativo: "claro" },
  midnight:  { fonte: "<ação atual do midnight>", nativo: "escuro" },
}
// Sobrescrita: { claro?: Partial<Record<Token, string>>, escuro?: Partial<Record<Token, string>>, motivo: string }
```

- Começa **sem sobrescritas**. Depois da revisão visual, o Rafael aponta o que precisa voltar ao valor antigo; cada sobrescrita leva `motivo`.
- O relatório (`docs/a11y/tema-gerado.md`) lista por preset e modo: token, valor, origem (`gerado` ou `sobrescrito`) e contraste dos pares.

## 7. Saída no CSS

- `scripts/gerar-tokens.ts` (Node 24 roda TypeScript direto) gera `src/app/tokens-cor.css`, importado pelo `globals.css` logo depois do bloco de tokens.
- Cada contexto recebe **todos** os tokens de cor, em blocos completos: `:root`, `.dark`, `[data-style="x"]`, `.dark[data-style="x"]`. Assim o vazamento do claro para o escuro, achado na Fase 1 da trava, deixa de existir por construção.
- As declarações de cor saem dos blocos escritos à mão do `globals.css` (fontes, raios, motion e tokens que não são cor ficam lá).
- Cabeçalho do arquivo gerado: "Gerado por scripts/gerar-tokens.ts. Não editar."

## 8. Testes

- `espaco.test.ts`: ida e volta hex ↔ OKLCH ↔ L* (erro < 0,5 de tom); `cor(h, c, t)` sempre devolve o tom pedido (±0,5) e cor dentro do gamut.
- `gerar.test.ts`: para as 5 fontes **e para 60 fontes aleatórias com semente fixa** (todas as matizes, croma baixo e alto, claras e escuras), todos os pares de `src/lib/a11y/pares.ts` passam o piso AA nos dois modos, e o croma de `--background`, `--card`, `--muted` e `--foreground` é ≤ 0,012. É a prova de robustez: qualquer cor escolhida gera um tema acessível.
- `sincronia.test.ts`: o `tokens-cor.css` commitado é idêntico ao que o motor gera hoje a partir de `presets.ts` (ninguém edita cor direto no CSS).
- A trava existente (`tokens.test.ts`) passa a medir o CSS gerado; as falhas de anel de foco e de borda de campo somem por construção.
- E2E do switch de modo (já existente) continua verde.

## 9. Revisão visual

Antes do commit final, capturas dos 5 presets × 2 modos na página `/estilo` para o Rafael aprovar e, se for o caso, apontar sobrescritas.
