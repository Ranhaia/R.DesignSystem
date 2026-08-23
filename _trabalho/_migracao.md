---
tipo: migracao
projeto: 🎨 P-DS-SHADCN
data: 2026-08-23
---

# Migração do shadcn-local para o sistema de trabalho

> **Registro congelado.** Escrito uma vez, no dia em que este repositório
> entrou no quadro. Não se atualiza.
>
> Arqueologia deste projeto, não do ciclo — por isso mora aqui e não no
> registro de ciclo, que é global e por caixa de tempo. O ciclo em que
> isso aconteceu foi o `C-2026-S00`.
>
> Procedimento que gerou este arquivo: skill `migrar-trabalho`.

## O que foi encontrado

### O índice mentia

`B01 Projetos/Projetos.md` era uma tabela escrita à mão listando
**2 projetos de 8**. Não havia erro nem aviso — só ausência.

### O "plano ativo" estava concluído

`plans/current/loop-80-20-templates.md`, 536 linhas, apontado pelo
`CLAUDE.md` como *"o plano ativo"* e primeira leitura obrigatória de
qualquer agente. Tinha **31 itens feitos e 0 pendentes**. Estava pronto
havia semanas e continuava em `current/`.

### O trabalho real era invisível

O que de fato faltava fazer não estava em checkbox nenhuma — estava em
**prosa**, dentro da seção "Fase 5" daquele arquivo. Nenhuma varredura,
humana ou automática, encontraria.

O mesmo padrão em `plans/current/design-system-piloto.md`: pausado, com a
pendência real ("o build nunca foi verificado, o `tsc` estourou o
timeout") escrita como parágrafo.

### 171 tarefas falsas

Três planos em `docs/superpowers/plans/` somavam **171 checkboxes
desmarcadas e zero marcadas**. Verificação contra o código provou que os
três foram **executados em julho**:

| Plano | Prova de que rodou |
|---|---|
| Icon system (Material Symbols) | `src/components/ui/icon.tsx`, `icon-button.tsx`, Material Symbols em `layout.tsx` e `globals.css` |
| Reorganização de pastas | todas as pastas que ele criava existem |
| Motion label flutuante | `animatedLabel` em `input.tsx`, 4 componentes de exemplo, 4 tokens `duration-motion` |

Um agente lendo essa pasta veria 171 tarefas abertas e poderia tentar
refazer o que já existia.

### O bloqueio fantasma — o achado mais caro

O plano registrou em **2026-07-22**:

> *"Falta: eu não tenho `gh` CLI autenticado neste ambiente — o Rafael
> precisa criar o repo no GitHub e dar push ele mesmo."*

O repositório `Ranhaia/R.DesignSystem` **existe, com push feito e
upstream configurado**. Foi resolvido em outra frente, e nada coordenou
as duas pontas. O bloqueio ficou registrado como pendente por **32
dias**.

Esse é o custo que o sistema existe para eliminar. Não é a tarefa
esquecida — essa você reencontra. É a **tarefa concluída que ninguém
sabe que concluiu**, porque ela produz trabalho refeito e espera inútil.

### Uma regra que contradizia o método

O `CLAUDE.md` listava como convenção estabelecida o *"modo autônomo:
decisão provisória em vez de travar quando Rafael não está disponível"*.

Revogada. Mas o problema que ela resolvia era legítimo — o agente
interrompia a execução com pergunta técnica que o Rafael não tinha como
avaliar, quando ele queria iterar sobre a entrega. A correção não foi
devolver a decisão ao executor: foi **subir a régua do que pode ser
perguntado** e exigir que toda `Decisão` venha com opções, consequências
e recomendação.

## O que foi absorvido, e para onde

| Origem | Destino |
|---|---|
| `loop-80-20-templates.md`, Fase 5 | `[[E-shadcn-local-case-publico]]` + 4 Histórias |
| `loop-80-20-templates.md`, "Ideias de telas" | `docs/active/especificacoes/ideias-telas-catalogo.md` — referência, **não** backlog |
| `loop-80-20-templates.md`, fases 0–6 concluídas | já resumidas em `plans/done/loop-80-20-log-resumo.md` |
| `design-system-piloto.md` | `[[E-shadcn-local-documentacao-ds]]` + 5 Histórias |
| Regras de agente dos dois planos | `C:\dev\_protocolo\PROTOCOLO.md` |
| Racional dos 3 planos executados | as 2 specs em `docs/superpowers/specs/` e, no caso da reorganização, o próprio `CLAUDE.md` |

**As ~18 "Ideias de telas" não viraram Histórias** de propósito. Virariam
cards zumbis num backlog que ninguém repesca. Três delas já eram trabalho
real e entraram como Histórias; o resto é catálogo de possibilidade.

## O que foi apagado

- `plans/current/loop-80-20-templates.md`
- `plans/current/design-system-piloto.md`
- os 3 planos executados em `docs/superpowers/plans/`

Recuperáveis por `git log` no repo `shadcn-local`. As **specs foram
mantidas**: plano é instrução de execução e vira descartável depois de
executado; spec é o racional e explica o código que ficou.

`plans/current/` ficou **vazio**. Não existe mais nenhum "plano ativo"
concorrendo com `_trabalho/`.

