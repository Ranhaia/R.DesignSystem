# Diagnóstico priorizado — revisão final da auditoria

Data: 2026-07-22
Base: `.review/auditoria.md` (factual), `.review/comparativo.md` (vs. M3/Radix/Polaris/Carbon/Nimbus), `.review/acessibilidade.md` (contraste WCAG calculado).
Natureza: este documento **aponta problema e impacto**, não prescreve solução técnica nem escreve código. Nada aqui deve ser implementado sem o Rafael aprovar item a item.

Regra de peso aplicada: falha de contraste AA pesa mais que divergência de nomenclatura com outro design system (impacto direto em usuário real). Por isso todo o bloco de acessibilidade está no topo.

---

## Prioridade ALTA — corrigir

Todos os itens desta seção falham **AA texto normal E AA texto grande** (ou seja, o texto fica ilegível mesmo em tamanho grande, não há caso de uso que salve). Fonte: `acessibilidade.md`, seção 6.1.

### A1. `--destructive-foreground` / `--destructive` falha em todo modo dark + midnight/light
- **Dado:** 2.77:1 em default/dark, editorial/dark, tech/dark, soft/dark e midnight/light — 5 das 81 combinações, sempre o mesmo par de valores (`oklch(0.704 0.191 22.216)` de fundo, `oklch(0.985 0 0)` quase-branco de texto). Falha AA normal (4.5) e AA grande (3.0). Fonte: `acessibilidade.md` 1.2, 2.2, 3.2, 4.2, 5.1 e 6.1.
- **Por que é problema real:** `destructive` é a cor de erro/perigo/exclusão. Num produto do mercado segurador, é onde aparecem mensagens de erro de formulário, confirmações de exclusão, avisos críticos. Texto de erro ilegível é o pior lugar para perder contraste. Não é decisão de estética — é o mesmo par de cor herdado do `.dark` base se propagando por 4 presets + midnight sem ninguém ter revisado o contraste dele.
- **Causa apontada (não a solução):** nenhum dos 4 presets redefine `--destructive-foreground` no dark; midnight/light reaproveita o `--destructive` do `.dark` base (documentado na `auditoria.md` 3.4). Um único par mal contrastado contamina 5 telas.
- **Impacto:** alto e transversal (atinge todos os temas em dark). Classificação: **(a) problema real que vale corrigir.**

### A2. `--primary-foreground` / `--primary` falha em midnight/light
- **Dado:** 2.56:1 — a pior razão de todas as 81. Falha AA normal e AA grande. Texto quase-branco sobre roxo de luminância média (`oklch(0.72 0.19 292.5)`). Fonte: `acessibilidade.md` 5.1 e 6.1.
- **Por que é problema real:** `primary` é a cor do botão/ação principal (CTA). Em midnight, o texto do botão primário não atinge contraste mínimo nem em tamanho grande. É a ação mais importante da tela ficando difícil de ler.
- **Impacto:** alto dentro do preset midnight (é o preset "sempre escuro", então isso não é um estado de borda — é o estado padrão dele). Classificação: **(a) problema real que vale corrigir.**

---

## Prioridade MÉDIA — corrigir, mas cabe grande/uso pontual

Os itens abaixo **falham AA texto normal mas passam AA texto grande (3:1)**. Ou seja: só são um problema onde o token é usado em texto pequeno/corrido. Onde for título/texto grande, tecnicamente passa. Fonte: `acessibilidade.md` 6.1.

### M1. `--primary-foreground` / `--primary` em soft/light
- **Dado:** 3.42:1. Falha AA normal, passa AA grande. Fonte: `acessibilidade.md` 4.1 e 6.1.
- **Por que média e não alta:** mesmo token crítico do A2 (ação principal), mas aqui passa em texto grande. Botão primário costuma ter label curto e às vezes peso maior — pode cair na faixa "grande". Ainda assim, se o label do botão for texto normal, falha. Vale corrigir. Classificação: **(a) problema real, prioridade média.**

### M2. `--muted-foreground` / `--muted` em default/light
- **Dado:** 4.34:1 — falha AA normal por pouco (limiar 4.5), passa AA grande. É a combinação mais próxima do limiar entre as 81. Nos outros 8 temas/modos essa mesma combinação passa (4.57 a 5.83). Fonte: `acessibilidade.md` 1.1, 6.1.
- **Por que média:** `muted-foreground` é texto secundário/auxiliar (legendas, placeholders, texto de apoio) — normalmente texto pequeno, onde o AA normal importa. A falha é só no tema default/light e por margem pequena. Corrigir aqui alinharia o default com o resto dos temas, que já passam. Classificação: **(a) problema real, prioridade média** (impacto menor: texto secundário, margem pequena, um único tema).

---

## Prioridade BAIXA — nice-to-have / decisão de escopo, não bug

Divergências de nomenclatura/cobertura vindas do `comparativo.md`. Nenhuma é falha funcional; são escolhas de escopo. O comparativo explicitamente **não recomenda lado** — então aqui vale como "considerar", não "corrigir".

### B1. Sem tokens de escala tipográfica (tamanho/peso/line-height/letter-spacing)
- **Dado:** o projeto só tem `--font-sans`/`--font-heading`. Radix, Polaris e Nimbus (lidos direto) publicam escalas numeradas de tamanho, peso e line-height como token de 1ª classe; M3 aparenta o mesmo (via busca). Fonte: `comparativo.md` 2.1.
- **Leitura:** é a divergência mais substantiva com as referências, mas o projeto usa a escala tipográfica padrão do Tailwind v4 (funciona, só não está tokenizada). Vira relevante se/quando houver intenção de padronizar tipografia por preset. Classificação: **(c) nice-to-have** — decisão de escopo para o Rafael, não defeito.

### B2. Sem tokens de escala de espaçamento
- **Dado:** usa a escala default do Tailwind v4, sem sobrescrita. Os 4 sistemas lidos direto (Radix/Polaris/Nimbus/Carbon) publicam escala de spacing tokenizada. Fonte: `comparativo.md` 2.2.
- **Leitura:** Tailwind já entrega uma escala de spacing consistente pronta; não tokenizar não gera inconsistência visual. Classificação: **(c) nice-to-have**, prioridade menor que B1.

### B3. Taxonomia de cor mista no `globals.css`
- **Dado:** o bloco `--ai-*` usa a convenção de sufixo de função da Nimbus (`-surface`, `-interactive-hover`, `-text-low`...), enquanto o resto da paleta usa o par shadcn `role`/`role-foreground`. Dois sistemas de nomenclatura no mesmo arquivo. Fonte: `comparativo.md` 1; `auditoria.md` 1.7.
- **Leitura:** é **intencional e documentado** — os `--ai-*` foram copiados 1:1 da doc da Nimbus de propósito (inclusive mantidos em hex, não OKLCH, para não introduzir arredondamento). Ver "não tocar" abaixo. Classificação: **(b) diferença intencional** — só listada aqui para registrar que foi avaliada e é consciente, não um deslize.

### B4. Componentes "essenciais" das referências ausentes (Link, Text, Heading, Callout, Chip, etc.)
- **Dado:** Radix/Polaris tratam Link/Text/Heading como componentes de 1ª classe; não estão entre os 59 categorizados. Mas `Link`, `Text`/`Title`, `Chip` já estão na própria lista "em construção" do projeto. Fonte: `comparativo.md` 4.3; `auditoria.md` 2.5.
- **Leitura:** já é lacuna conhecida e catalogada pelo projeto. Não é surpresa nem regressão. Classificação: **(c) nice-to-have** — backlog já existente, prioridade de produto, não de auditoria.

### B5. Border-width como token único vs. escala
- **Dado:** um `--border-width` global por preset (só tech usa 2px); Polaris e Nimbus publicam escala numerada de espessura. Fonte: `comparativo.md` 3; `auditoria.md` 1.4.
- **Leitura:** o token único é o que permite trocar a espessura do projeto inteiro por preset com uma variável — é um recurso, não uma falta. Classificação: **(b) diferença intencional / (c) nice-to-have** se um dia precisar de espessuras variadas por componente.

---

## O que está bem resolvido — NÃO TOCAR

Proteção explícita para decisões intencionais não serem revertidas por engano numa próxima rodada.

1. **Escala de raio "estilo Nimbus" como múltiplos relativos de `--radius`.** Diferente da Nimbus, que usa valores absolutos, aqui os passos são relativos a `--radius` de propósito: trocar `--radius` no preset escala as duas famílias de raio juntas. É um comportamento de escalonamento que a própria Nimbus não tem — é vantagem do projeto, não erro de cópia. Fonte: `auditoria.md` 1.3; `comparativo.md` 2.3. **Não converter para valores absolutos.**

2. **Tokens `--ai-*` em hex e com nomenclatura Nimbus.** Copiados 1:1 da doc oficial da Nimbus, mantidos em hex para não introduzir arredondamento sobre valores que não são originais do projeto, sem bloco dark porque a Nimbus documenta que são idênticos em light/dark. A "taxonomia mista" (B3) é consequência consciente disso. Fonte: `auditoria.md` 1.7. **Não "padronizar" para OKLCH nem renomear para o padrão role/foreground.**

3. **`--destructive` sobrescrito no midnight/light.** A auditoria registra que isso foi adicionado de propósito porque o vermelho de `:root` não tinha contraste suficiente sobre o fundo escuro do midnight. A correção do A1 deve mexer no par de cor do destructive, **sem remover a intenção** de o midnight ter seu próprio destructive. Fonte: `auditoria.md` 3.4. (Nota: o valor atual ainda falha — ver A1 — mas a decisão de sobrescrever ali é correta; o que falha é o valor, não a estrutura.)

4. **Abordagem CSS-first do Tailwind v4 (sem `tailwind.config`).** Tudo em `globals.css` via `@theme inline`. É a arquitetura correta para Tailwind v4, não uma omissão. Fonte: `auditoria.md` 1, 4. **Não recriar um `tailwind.config`.**

5. **Presets como "pacotes de tokens" hard-coded (vs. modelo paramétrico do Radix).** O comparativo aponta que Radix deriva escalas de poucas props; o projeto reescreve tokens por preset. Isso é uma escolha de arquitetura viável e dá controle total por preset — não é bug. Fonte: `comparativo.md` 5. **Não é para reescrever como sistema gerador só porque o Radix faz diferente.**

6. **`doGuidelines`/`dontGuidelines` como placeholder nos 59 componentes.** Decisão registrada: a doc do shadcn/ui não publica faça/não-faça por componente e inventar violaria a regra de não criar texto narrativo. Fonte: `auditoria.md` 2.6. **Placeholder aqui é conformidade com a regra, não trabalho pela metade.**

7. **`sonner` classificado como molecule.** Migração de utilitário → molecule feita e justificada (renderiza UI real via portal). Fonte: `auditoria.md` 2.2. **Não reverter.**

---

## Resumo executivo (uma olhada)

| Item | O quê | Onde | Ação |
|---|---|---|---|
| A1 | destructive text 2.77:1 (falha AA normal+grande) | todo dark + midnight/light | ALTA — corrigir |
| A2 | primary text 2.56:1 (falha AA normal+grande) | midnight/light | ALTA — corrigir |
| M1 | primary text 3.42:1 (falha normal, passa grande) | soft/light | MÉDIA |
| M2 | muted text 4.34:1 (falha normal por pouco) | default/light | MÉDIA |
| B1 | sem tokens de tipografia | comparativo | BAIXA — decisão de escopo |
| B2 | sem tokens de spacing | comparativo | BAIXA — decisão de escopo |
| B3–B5 | taxonomia mista / componentes ausentes / border-width único | comparativo | BAIXA — já intencional ou já no backlog |

Total de falhas AA normal: 8 combinações em 81 (`acessibilidade.md` 6). Elas se resumem a **3 tokens** (destructive, primary, muted) — concentrado, não espalhado. Resolver o destructive dark (A1) sozinho elimina 5 das 8 falhas.
