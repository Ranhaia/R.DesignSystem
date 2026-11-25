# AGENTS.md — R.DS

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

## Skills (gerenciadas pelo Hub, não edite aqui)

`.claude/skills/` e `.agents/skills/` são **cópias geradas** a partir do Hub
`C:\dev\_ferramentas\shared-skill-router\skills\`. A lista do que entra está
em `.skills.json`. Regra completa: seção 4 do `PROTOCOLO.md`.

- **Mudar uma skill** (inclusive `componente-rds`): edite no Hub e rode
  `node C:\dev\_ferramentas\shared-skill-router\scripts\sync-skills.mjs C:\dev\R.DS`.
  Edição feita direto aqui é apagada no próximo sync.
- **Skill nova ou instalador pronto** (`npx ... install`, `npx skills add`):
  nunca rode no repo. Baixe num diretório temporário, copie para o Hub,
  registre com `add-skill.mjs`, acrescente o id em `.skills.json` e sincronize.
- **Nada solto nas pastas de skill:** o sync apaga tudo que não estiver no
  `.skills.json`, inclusive arquivos que não são skill.
- **`.skills.json` em UTF-8 sem BOM.** No PowerShell 5.1, `Set-Content` grava
  com BOM e o sync recusa o arquivo.

## Componentes

Criar, mudar ou documentar um componente de `src/components/ui/` segue
`.claude/skills/componente-rds/SKILL.md`: provar que a peça ainda não
existe, registrar (`npm run docs:registrar`), declarar todas as partes do
MD e deixar a trava verde. Vale para qualquer agente, não só o Claude.

## Testes de navegador

Uma execução de testes de navegador por vez na máquina (RAM). Todos os
contextos do Storybook só via `npm run test:a11y:todos`. Se a trava
recusar, espere a outra execução terminar; não contorne. Os limites ficam
em `scripts/a11y-trava.mjs`; detalhes em `CLAUDE.md`.

## Sobre o projeto

Ver `CLAUDE.md` para contexto técnico do Design System.
