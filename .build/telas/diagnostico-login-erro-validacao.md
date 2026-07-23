# Diagnóstico final — `login-erro-validacao`

- **Não editei nada em `src/` como parte deste diagnóstico.** Os fixes citados abaixo (heading semântico, `aria-disabled`) já tinham sido aplicados antes, no mesmo passe sistêmico que percorreu as 5 telas irmãs de 5A + `apolices-ativas`.
- **Nota de processo:** esta tela ficou sem as etapas 3/4 do pipeline `/construir-telas` na primeira passada (rota construída e registrada em `templatesList`, mas sem auditoria nem diagnóstico) — gap identificado e fechado agora, fora do fluxo automático do comando.

---

## Veredito

**PRONTA.**

A tela cumpre a especificação (`.build/telas/login-erro-validacao.md`), passa nos 6 requisitos de acessibilidade específicos (ver `.build/telas/acessibilidade-login-erro-validacao.md`), usa só peças reais do catálogo (`Alert`, `Field`/`FieldError`, `Input`/`InputGroup`, `Button`, `Spinner` — nenhum componente novo), não tem cor/espaçamento hardcoded fora de token, e está corretamente registrada em `templatesList`. Não há bloqueante.

## 1. Consistência com o design system — OK

- Componentes usados: `Alert`/`AlertTitle`/`AlertDescription`, `Badge`, `Button`, `Card`/`CardHeader`/`CardContent`/`CardFooter`/`CardTitle`/`CardDescription`, `Checkbox`, `Field`/`FieldError`/`FieldLabel`, `Input`, `InputGroup`/`InputGroupAddon`/`InputGroupButton`/`InputGroupInput`, `Label`, `Spinner` — todos já catalogados, nenhum criado pra esta tela.
- Nenhuma cor/espaçamento fora de token: cores vêm de classes utilitárias (`bg-primary/10`, `text-primary`, `bg-muted`, `text-muted-foreground`) e da variante `destructive` do `Alert`, nenhum hex/oklch literal no JSX.
- `templates-registry.ts`: slug `login-erro-validacao` presente em `templatesList` (não mais em `inProgressTemplates`).

## 2. Acessibilidade — sem bloqueantes

A auditoria (`.build/telas/acessibilidade-login-erro-validacao.md`) aprovou os 6 requisitos específicos da spec. Os 2 gaps sistêmicos que essa tela compartilhava com as irmãs (`CardTitle` não-heading, botão "Entrar" perdendo foco ao ficar `disabled` durante o carregamento) já foram corrigidos no mesmo passe que tocou as outras 4 telas de 5A + `apolices-ativas` — não são mais pendência específica desta tela.

Restam só as 2 observações de baixo risco, sistêmicas do catálogo (ícones decorativos sem `aria-hidden`, `role="group"` implícito) — já registradas em `.build/telas/PENDENCIAS.md`, não bloqueiam esta tela.

## 3. Referência na navegação do fluxo — CONFIRMADA

| Origem | Ação | Destino | Confere? |
|---|---|---|---|
| `login-simples` | Link "Esqueci minha senha" (não é a origem principal, mas ambas as telas coexistem no fluxo) | — | — |
| `login-erro-validacao` | Reenvio com sucesso | `/templates/selecao-perfil-corretora` | Sim (`page.tsx:143`) |
| `login-erro-validacao` | Link "Esqueci minha senha" | `/templates/recuperacao-senha` | Sim (`page.tsx:271`) |
| `login-erro-validacao` | Reenvio ainda inválido | Permanece na mesma rota, só atualiza estado | Sim — nenhum `router.push` nesse ramo |

Todos os destinos batem com a tabela de navegação da spec.

## 4. Decisão de produto já sinalizada na spec (não é retrabalho)

A spec (`.build/telas/login-erro-validacao.md`, seção "Lacunas") registra que tratar "credenciais incorretas" (rejeição do backend) como parte desta tela de "erro de validação" foi uma escolha por analogia, não instrução explícita do plano original. Levar ao Rafael se quiser separar isso numa tela/estado à parte no futuro — não bloqueia a aprovação desta tela como está.

## Recomendação

**Aprovar como pronta.** Isso fecha o gap de QA da Fase 5A — as 5 telas do fluxo de login (`login-simples`, `login-erro-validacao`, `recuperacao-senha`, `selecao-perfil-corretora`, `onboarding`) estão todas com auditoria de acessibilidade e diagnóstico registrados.
