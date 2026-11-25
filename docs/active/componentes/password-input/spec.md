# Spec — Password Input

Status: construído em 2026-11-25. Camada: molecule (importa `input`, `progress`, `icon`).

## Objetivo

Aplicação do `input` para senha. Não é um campo novo: é o `input` com o botão
de mostrar e ocultar (o `endAction` que o próprio `input` já oferece) e, no
cadastro, o avaliador de força.

## Modos

- `variant="default"` (entrar): só preencher. `autoComplete="current-password"`.
- `variant="new"` (cadastro): soma a barra de força (`progress`), o nível
  (Fraca, Média, Forte) e a lista de requisitos, ligados ao campo por
  `aria-describedby`. `autoComplete="new-password"`.

## Força

Um ponto por requisito, de 0 a 4: pelo menos 8 caracteres; maiúsculas e
minúsculas; um número; um símbolo. Nível: até 1 ponto é Fraca, 2 ou 3 é
Média, 4 é Forte. Abaixo de 8 caracteres é sempre Fraca. Letra acentuada conta
como letra (maiúscula ou minúscula), nunca como símbolo. Campo vazio não mostra nível.

## Textos

Todos do dicionário central (`password.*` em `src/lib/idioma/dicionario.ts`).
