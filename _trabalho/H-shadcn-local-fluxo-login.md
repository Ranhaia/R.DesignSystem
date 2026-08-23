---
tipo: historia
projeto: P-DS-SHADCN
epico: E-shadcn-local-case-publico
status: aguardando
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-08-23
ciclo: C-2026-S01
estimativa: 3
perfil: front
dono:
tarefas: 0/5
criado: 2026-08-23
fechado:
motivo-descarte:
origem:
---

# Fluxo de login (5 rotas)

Cinco rotas novas em `src/app/templates/`. **Nenhum componente novo** —
tudo já existe no catálogo.

## Plano

Seguir o padrão de rota já usado em `src/app/templates/dashboard-financeiro`.
Cada tela é uma rota própria, com navegação real entre elas (necessária
pro teste de leitor de tela ponta a ponta).

Componentes por tela, todos já existentes:

- Login simples — `input` + `label` + `button` + `checkbox` ("lembrar-me")
  + link "esqueci senha"
- Login com erro de validação — `field` em estado de erro, mensagem
  inline (exercita o padrão de erro do Field/Input)
- Recuperação de senha — `input` + `button` + feedback via `sonner`
- Seleção de corretora/perfil — `select` ou `combobox`
- Onboarding em etapas — reaproveita o pattern `multi-step-form`

## Pré-requisitos

Nenhum.

## Tarefas

- [ ] Rota de login simples
- [ ] Rota de login com erro de validação
- [ ] Rota de recuperação de senha
- [ ] Rota de seleção de corretora/perfil
- [ ] Rota de onboarding em etapas

## Contribuições

## Histórico
