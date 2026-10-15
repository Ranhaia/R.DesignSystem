# AGENTS.md — shadcn-local

## Regras de trabalho

O trabalho deste repo é rastreado em `_trabalho/`, uma nota por Épico e
por História.

**Leia `C:\dev\_protocolo\PROTOCOLO.md` antes de tocar em qualquer nota
de `_trabalho/`.** É a fonte única das regras. Este arquivo não as
repete.

Resumo do que você precisa saber para não errar:

- Você só executa Histórias que o Rafael soltou — `status: progresso`.
  **Nunca** mova uma História de `aguardando` por conta própria.
- Só edite História com `dono` vazio ou com o seu nome.
- Se bater numa decisão que o plano não previu, **não decida**: marque
  `sinal: 🟡 Aguardando definição`, acrescente o pré-requisito do tipo
  `Decisão` e vá para outra História.
- Ao terminar uma passada: atualize `tarefas`, acrescente linha em
  `## Contribuições`, esvazie `dono`.

## Testes de navegador

Uma execução de testes de navegador por vez na máquina (RAM). Todos os
contextos do Storybook só via `npm run test:a11y:todos`. Se a trava
recusar, espere a outra execução terminar; não contorne. Os limites ficam
em `scripts/a11y-trava.mjs`; detalhes em `CLAUDE.md`.

## Sobre o projeto

Ver `CLAUDE.md` para contexto técnico do Design System.
