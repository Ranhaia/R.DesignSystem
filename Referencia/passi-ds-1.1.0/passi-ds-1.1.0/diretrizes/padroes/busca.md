# Busca

Padrão do PASSI DS 1.1.0 · página "Busca" no arquivo Figma.

A busca ajuda a pessoa a encontrar conteúdo sem navegar pelo menu. Ela sugere resultados enquanto a pessoa digita e, na paleta de comandos, também executa ações pelo teclado.

## Busca

Busca · barra com atalho ⌘K, sugestões enquanto a pessoa digita, paleta de comandos para ações rápidas e estado sem resultados. Usa Tecla, Botão e ícones.

- Variantes · Tipo: Barra, Com sugestões, Paleta de comandos, Sem resultados

## Como usar

### Tipos

## Feito com

Tecla (atalhos), Botão (sem resultados) e ícones. Painel com cor/fundo/superficie, Sombra/Média e raio/grande.

## Faça

- Mostre sugestões a partir da segunda ou terceira letra.
- Destaque o primeiro resultado para abrir com Enter.
- Guarde as buscas recentes da pessoa.
- Explique o que fazer quando não houver resultados.

## NÃO faça

- Exigir que a pessoa acerte a palavra exata.
- Esconder a busca atrás de um ícone em sites com muito conteúdo.
- Mostrar “Nenhum resultado” sem nenhuma alternativa.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
