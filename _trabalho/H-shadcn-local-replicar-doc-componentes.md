---
tipo: historia
projeto: P-DS-SHADCN
epico: E-shadcn-local-documentacao-ds
status: aguardando
sinal: 🟢 Pronto para desenvolver
sinal-desde: 2026-08-23
ciclo:
estimativa: 5
perfil: front
dono:
tarefas: 0/3
bloqueada-por:
  - "[[H-shadcn-local-validar-doc-button]]"
  - "[[H-shadcn-local-conteudo-narrativo-button]]"
criado: 2026-08-23
fechado:
motivo-descarte:
origem:
---

# Replicar o template de documentação para os demais componentes

Estender `componentDocs` para além da chave `"button"`. São ~59
componentes.

## Plano

Só faz sentido depois que o Button estiver validado **e** com conteúdo
real — é a página do Button pronta que prova se o template presta.

As partes estruturais (Anatomia, Variantes, Estados, Tamanhos,
Propriedades) saem do código e podem ser derivadas por agente. As
narrativas (Descrição, Quando utilizar, Boas práticas, Evite) entram como
`"[a preencher]"` — decisão 3 do Épico, o Rafael escreve depois, um a um
ou em lote.

**Esta História é grande demais para um ciclo — 5 dias estimados.**
Candidata natural a fatiamento no primeiro fechamento: entregar um lote
de componentes, fechar, e abrir História nova com o resto. Deixar isso
explícito agora evita que ela arraste por três ciclos até alguém
perceber.

## Pré-requisitos

Nenhum além dos bloqueadores.

## Tarefas

- [ ] Definir a ordem dos componentes (mais usados primeiro)
- [ ] Derivar do código as partes estruturais
- [ ] Deixar as narrativas como placeholder

## Contribuições

## Histórico
