# Spec — Code Block

Status: construído em 2026-11-25. Camada: organism (importa `icon-button`, molécula).

## Objetivo

Mostrar um trecho de código para ler e copiar. Cabeçalho com título e
linguagem opcionais e o botão de copiar (`icon-button`); o código em
`<pre><code>`, rolável na horizontal e alcançável pelo teclado (`tabIndex=0`).

## Copiar

- `navigator.clipboard.writeText(code)`. Sem fallback com `execCommand`: a
  página do DS roda em HTTPS ou localhost.
- Retorno nos dois casos: ícone troca (copiar → check, ou erro) e a mensagem
  ("Copiado" / "Não foi possível copiar") aparece num balão `role="status"`
  fora do botão (filho de botão não é anunciado). Some em 2 s; clique
  repetido reinicia o tempo. O botão nunca é desabilitado.
- Mensagem repetida ganha um espaço rígido no fim, para o VoiceOver anunciar
  de novo.
- O nome do botão inclui o título, quando há: "Copiar código: salvar.tsx".

## Raio

O botão está a 1 unidade + a borda da quina: `rounded-outer-lg` com
`--radius-inset` e o botão `rounded-inner`. Entrou no
`radius-concentric.stories.tsx`.

## Fora do escopo

Realce de sintaxe (cor por token) e números de linha: não pedidos.

## Textos

`codeBlock.*` no dicionário central.
