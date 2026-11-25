---
name: skill-router
description: >
  Classifica solicitações do usuário, consulta o catálogo compartilhado (core/skill-registry.json)
  e orquestra a seleção e execução de competências locais sem inchar o contexto do agente.
---

# Skill Router

## Objetivo
Selecionar, combinar e orquestrar estritamente as competências necessárias para a demanda atual, seguindo a matriz de risco e a precedência do projeto.

## Protocolo de Roteamento
1. **Compreender o resultado final solicitado.**
2. **Consultar `core/skill-registry.json`** para mapear triggers, dependências e exclusões.
3. **Avaliar Nível de Risco (Nível 1 - Autônomo, Nível 2 - Planejado, Nível 3 - Controlado).**
4. **Para Tarefas Simples (Nível 1):** Realizar *Bypass* imediato para a skill única, sem turnos intermediários de planejamento.
5. **Para Múltiplas Skills (Nível 2):** Apresentar plano claro ao Rafael com as fases de execução e aguardar autorização.
6. **Carregar apenas os arquivos `SKILL.md` necessários** no escopo do projeto ativo.
7. **Validar a entrega** e descarregar contexto.

## Regras Canônicas
- Nunca instalar ou carregar skills globalmente no sistema operacional.
- Preferir o menor conjunto viável de instruções.
- A regra do repositório (`PROTOCOLO.md` / `CLAUDE.md`) sempre vence qualquer skill.

## Regra comum: interface segue o R.DS
Vale para todo agente, em qualquer projeto de `C:\dev`.
- Antes de criar ou mudar tela, componente ou estilo, leia `C:\dev\R.DS\public\llms.txt`, o arquivo de cada componente usado em `C:\dev\R.DS\public\ia\componentes\` e as regras em `C:\dev\R.DS\public\ia\AGENTS.md`.
- As instruções moram só no R.DS: o projeto não guarda cópia do índice, das regras nem dos MDs.
- Use só o que o índice lista. Faltou algo: avise o Rafael e pergunte se nasce no DS, só no projeto ou nos dois.
- O índice sai de `npm run docs:llms` no R.DS; nunca editar `public/llms.txt` nem `public/ia/` à mão.

## Regra comum: decisão de web passa pela modern-web-guidance
Antes de decidir arquitetura de interface ou acrescentar dependência num projeto web (biblioteca de arrastar, editor, datas, validação…), consulte a skill `modern-web-guidance` para o tema e prefira o recurso nativo que ela indicar. Ao levar a decisão ao Rafael, cite o que a skill orientou.
