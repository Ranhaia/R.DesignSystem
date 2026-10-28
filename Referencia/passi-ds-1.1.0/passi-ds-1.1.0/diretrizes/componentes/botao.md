# Botão

Componente do PASSI DS 1.1.0 · página "Botão" no arquivo Figma.

Botões disparam ações. O texto diz exatamente o que vai acontecer: “Salvar alterações”, e não “OK”. Use um único botão Primário por tela, para a ação mais importante.

## Botão

Botão · dispara uma ação. Use um único Primário por tela para a ação principal. Secundário para ações fortes que não são a principal, Contorno e Fantasma para ações de apoio, Perigo para ações destrutivas (excluir, cancelar assinatura). Tamanhos: P 32 px, M 40 px, G 48 px.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Botão |
| Ícone à esquerda | Liga/desliga |  | Desligado |
| Ícone à direita | Liga/desliga |  | Desligado |
| Trocar ícone esquerdo | Troca de ícone ou componente |  |  |
| Trocar ícone direito | Troca de ícone ou componente |  |  |
| Tipo | Variante | Primário, Secundário, Contorno, Fantasma, Perigo | Primário |
| Tamanho | Variante | P, M, G | M |
| Estado | Variante | Padrão, Hover, Pressionado, Foco, Desabilitado | Padrão |

## Como usar

### Tipos

A hierarquia visual ajuda a pessoa a saber o que fazer primeiro.

Exemplos no Figma: Primário: Ação principal; Secundário: Ação forte de apoio; Contorno: Ação alternativa; Fantasma: Ação discreta; Perigo: Ação destrutiva.

### Tamanhos

P (32 px) para tabelas e barras de ferramentas, M (40 px) como padrão, G (48 px) para chamadas principais e telas de celular.

Exemplos no Figma: P · 32 px; M · 40 px; G · 48 px.

### Estados

Todo botão precisa mostrar quando está sob o cursor, quando é pressionado, quando recebe foco pelo teclado e quando não está disponível.

Exemplos no Figma: Padrão; Hover; Pressionado; Foco; Desabilitado.

### Com ícones

Ícone à esquerda reforça a ação. Ícone à direita indica avanço ou abertura. Ligue e troque os ícones pelas propriedades do componente.

Exemplos no Figma: Ícone à esquerda; Ícone à direita; Ícone trocado: baixar.

### Modo escuro

Todas as cores vêm das variáveis da coleção “Cor”. Troque o modo da moldura para Escuro e o componente se adapta sozinho.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Verbo e objeto, até 3 palavras: Salvar alterações, Criar conta.
- Use o mesmo verbo do título da janela ou da página.
- Sem ponto final e sem exclamação.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega ao botão. Enter ou Espaço executam a ação.
- Leitor de tela: Papel button. O nome é o texto do botão. Botão desabilitado é anunciado como indisponível; se a pessoa precisa saber por quê, explique perto dele.
- Foco: Anel de foco de 2 px. Depois da ação, o foco fica no botão, a não ser que a ação abra uma janela ou leve para outra tela.
- Cuidados: Texto que diz a ação, nunca só OK. Durante um carregamento, mantenha o texto ou anuncie Salvando para quem usa leitor de tela.

## Tokens usados

Fundo: cor/fundo/marca, cor/fundo/invertido, cor/fundo/erro e seus estados hover e pressionado (ex.: cor/fundo/marca-hover e cor/fundo/marca-pressionado). Contorno: cor/fundo/sutil e cor/fundo/sutil-hover. Fantasma: cor/fundo/fantasma-hover e cor/fundo/fantasma-pressionado. Texto: cor/texto/sobre-marca, cor/texto/padrao. Borda: cor/borda/forte, cor/borda/foco. Espaço: espaco/2 a espaco/5. Canto: raio/pilula.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Comece o texto com um verbo: “Salvar”, “Enviar”, “Criar conta”.
- Use um único botão Primário por tela.
- Deixe a ação principal à direita em janelas e formulários.
- Mantenha a área de toque com pelo menos 40 px de altura no celular.

## NÃO faça

- Textos vagos como “OK”, “Clique aqui” ou “Sim”.
- Dois botões Primários lado a lado.
- Desabilitar um botão sem explicar o motivo.
- Usar o tipo Perigo para ações que podem ser desfeitas.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
