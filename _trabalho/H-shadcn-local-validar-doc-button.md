---
tipo: historia
projeto: 🎨 P-DS-SHADCN
epico: E-shadcn-local-documentacao-ds
status: aguardando
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-08-23
ciclo:
estimativa: 1
perfil: front
dono:
tarefas: 0/4
criado: 2026-08-23
fechado:
motivo-descarte:
origem:
---

# Validar a página de documentação do Button

O código do piloto foi escrito mas **nunca teve o build verificado**. O
sandbox reiniciou no meio e o `tsc` estourou o timeout — não há
confirmação de que compila.

## Plano

Rodar direto na máquina, que é mais rápido que o sandbox:

```bash
npx tsc --noEmit
```

Depois abrir `/components/button` e conferir visualmente.

Pontos que o plano antigo marcou como suspeitos:

- **Seção Variantes** — os 6 botões renderizam? O valor foi passado como
  `v.value as never` para caber na prop tipada `variant`. Funciona em
  runtime; conferir se o TS reclama.
- **Playground** — troca de variant e size, toggles de disabled e
  loading.
- **Tabela de Propriedades** — renderiza sem quebrar layout.

Esta História desbloqueia todo o resto do Épico: enquanto não se sabe se
compila, não faz sentido replicar o template para 59 componentes.

## Pré-requisitos

Nenhum.

## Tarefas

- [ ] Rodar `npx tsc --noEmit` e registrar o resultado
- [ ] Corrigir os erros que aparecerem
- [ ] Conferir `/components/button` visualmente nos 3 pontos suspeitos
- [ ] Registrar o que quebrou, se quebrou

## Contribuições

## Histórico
