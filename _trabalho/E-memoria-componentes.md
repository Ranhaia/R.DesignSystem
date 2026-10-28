---
tipo: epico
projeto: 🎨 P-DS-SHADCN
status: progresso
criado: 2026-10-28
---

# Memória de componentes (PASSI + Rayner)

Cada componente do R.DS ganha uma memória legível por máquina: o que ele
é hoje (descritivo vivo), o que mudou e por quê (histórico), com a parte
estrutural lida do código, sem ninguém transcrever.

- **Formato** vem do PASSI DS: um MD curto por componente, seções fixas,
  porta de entrada que só roteia, sinônimos. Avaliação em
  `Referencia/passi-ds-1.1.0/AVALIACAO.md`; origem em
  [[H-referencia-passi-ds]].
- **Ciclo** vem do Rayner Lemos (TIM DS Brain): coleta da fonte, humano
  audita, vivo × histórico separados, escritor único, artefatos fixos.
  Nota no vault: `wiki/concepts/Memoria Persistente de Design System.md`.

Continua o [[E-documentacao-ds]]: a página `/components/<slug>` segue
lendo `src/lib/component-docs.ts`, agora gerado a partir dos MDs.

## Decisões já tomadas — não reabrir

1. **O MD é a fonte única** da documentação; `component-docs.ts` é
   gerado e um teste reprova divergência. (Rafael, 2026-10-27)
2. **Texto narrativo pode ser adaptado do PASSI**, e o Rafael revisa
   depois. Substitui a decisão 3 do [[E-documentacao-ds]]. (Rafael,
   2026-10-27)
3. **A parte estrutural sai do código**: variantes, tamanhos, props,
   anatomia e tokens são lidos do `.tsx` por script. O humano só escreve
   intenção. (Rafael, 2026-10-28)
4. **Histórico num arquivo por componente**, só acrescenta:
   `docs/componentes/historico/<slug>.md`. (Rafael, 2026-10-28)
5. **Paridade com as cópias nos projetos** (`central-esg` etc.) **fora
   do escopo** deste Épico. (Rafael, 2026-10-28)
6. **Spike em worktree, em Loop Engineering** (verificador antes do
   código). (Rafael, 2026-10-28)

## Como o ciclo do Rayner fica no R.DS

| Rayner | R.DS |
|---|---|
| Fonte legível (Figma) | O `.tsx` (`cva`, tipos, `data-slot`, classes) |
| Coleta, ninguém transcreve | `scripts/coletar-componente.mjs` |
| Humano audita | Seções de intenção do MD + coluna de descrição das tabelas geradas |
| Descritivo vivo | `docs/componentes/<slug>.md` |
| Histórico só acrescenta | `docs/componentes/historico/<slug>.md` |
| Escritor único | `npm run docs:registrar` — único que grava as seções geradas, a coleta e o histórico |
| Main × Branch | A coleta guardada (`docs/componentes/coleta/<slug>.json`) é a da main; registrar na branch gera o diff |
| Auditoria ensina a coleta | `docs/componentes/historico/_lacunas.md` |
| Artefatos fixos | Teste que cobra MD, story, exemplo e registros de cada componente |

## Histórias

- [[H-memoria-componentes-spike]] — fases 0 a 3, piloto com button, tabs e dialog
- [[H-memoria-replicar-lotes]] — fase 4, os demais componentes em lotes
- [[H-conteudo-transversal]] — fase 5, `docs/conteudo/`

## Ideias para avaliar depois (do AIPIM, de Talis Galhardi)

Lidas em `github.com/talis-galhardi/aipim` em 2026-10-28. Não entram no
spike; cada uma vira História só se o Rafael quiser.

- Conferir números da prosa contra o código ("79 componentes").
- Lint de escrita (travessão, clichê, exclamação) como script, não só skill.
- Checagens além do axe: zoom e fonte raiz em 200%, reflow em 320 px,
  espaçamento de texto (WCAG 1.4.12). A fonte em 200% testa a regra do rem.
- Registro de divergências aceitas, para a auditoria não acusar de novo.
