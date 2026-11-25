---
tipo: epico
projeto: 🎨 P-DS-SHADCN
status: progresso
criado: 2026-11-25
decisoes:
---

# Alinhamento ao Lume

Referência: Lume Design System (`JoniGuerini/lume-design-system`, MIT). Avaliação em
`Claude outputs/2026-11-25_avaliacao-lume.md`.

Objetivo: o R.DS cobrir os componentes do Lume que faltam ou estão parciais, e falar
português e inglês por um dicionário central. Sempre na estrutura do R.DS (cva, partes,
story, MD, registros) e montando os novos com os átomos e moléculas que já existem.

## Decisões do Rafael (2026-11-25)

1. Idioma por **dicionário central**, não por prop de texto em cada componente.
2. Idiomas: **pt e en** apenas.
3. Trazer os componentes do Lume para o R.DS mantendo a nossa estrutura e reaproveitando átomos.
4. Execução em Loop (teste antes, ciclo fechado).

## Histórias

1. [[H-dicionario-idioma]] — vem primeiro: as outras usam o dicionário.
2. [[H-lume-formulario]]
3. [[H-lume-feedback-navegacao]]
4. [[H-lume-conteudo]]
5. [[H-lume-complexos]]
