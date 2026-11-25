---
tipo: historia
codigo: 05K
projeto: 🎨 P-DS-SHADCN
epico: E-alinhamento-lume
status: progresso
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-11-25
ciclo:
estimativa: 5
perfil: front
dono: claude
tarefas: 3/6
aceite: 0/2
bloqueada-por:
criado: 2026-11-25
fechado:
motivo-descarte:
origem:
manual_order:
---

# Lume: componentes complexos

## Plano

Depois de H-dicionario-idioma. Tabela de dados (sobre table), agenda mês/semana/dia (sobre calendar), lista arrastável, kanban (sobre lista arrastável + card), editor de texto rico, seletor de cor. Cada um pode exigir dependência nova: registrar como Decisão antes de instalar.

## Pré-requisitos
- [x] **Decisão** — Lista arrastável, kanban e editor de texto rico: instalar biblioteca nova ou fazer sem dependência?
      A) Zero dependência: arrastar com eventos de ponteiro e teclado próprios; editor com contentEditable + execCommand (API obsoleta, mas suportada em todos os navegadores; HTML gerado varia entre navegadores)
      B) Arrastar sem dependência (ponteiro + teclado próprios) e editor com Tiptap (@tiptap/react + @tiptap/starter-kit + @tiptap/extension-link, ~3 pacotes)
      Recomendo B porque Arrastar acessível é pouco código e não precisa de lib; editor rico sem lib fica frágil (execCommand obsoleto, saída inconsistente). Tiptap é headless, então o visual segue só token. · pedido por: claude · 2026-11-25
      **Resolvida: B**, aprovado pelo Rafael em 2026-11-25, conferido com modern-web-guidance (guias drag-and-drop e toolbar: arrastar nativo com ponteiro e teclado; nenhum recurso nativo substitui o editor).

## Critérios de aceite

- [ ] Os seis aparecem no catálogo com página, story e exemplos
- [ ] Arrastar funciona também pelo teclado

## Tarefas

- [x] Tabela de dados
- [x] Agenda
- [ ] Lista arrastável
- [ ] Kanban
- [ ] Editor de texto rico
- [x] Seletor de cor

## Definition of Done

- [ ] Rodou o que entregou: comando e resultado estão na Contribuição de cada tarefa
- [ ] Nenhuma Contribuição alega validação só por inspeção do código; toda prova é de execução
- [ ] Alteração feita fora do versionamento (painel, dashboard, variável de ambiente) virou migration ou arquivo de config no repo

## Contribuições
- 2026-11-25 · claude · PR #48: tsc limpo, test:unit e docs:check verdes, página /components/data-table conferida no navegador, revisão independente corrigida
- 2026-11-25 · claude · PR agenda: tsc limpo, test:unit e docs:check verdes, navegador conferido, revisão corrigida
- 2026-11-25 · claude · PR color-picker: tsc limpo, test:unit e docs:check verdes, navegador conferido, revisão corrigida

## Histórico

- 2026-11-25 · claude · História criada.
- 2026-11-25 · claude · Pegou a História por ordem do Rafael.
- 2026-11-25 · claude · Decisão resolvida: B, aprovado pelo Rafael em 2026-11-25, conferido com modern-web-guidance.
