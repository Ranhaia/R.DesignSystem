# Componentes em código

PASSI DS 1.1.0 · piloto. 5 componentes do Figma como web components: Botão, Link, Campo de texto, Checkbox, Alerta. Funcionam em HTML puro e dentro de React, Next, Vue ou Svelte.

## Como usar

```html
<link rel="stylesheet" href="css/passi.css">
<link rel="stylesheet" href="componentes/passi-componentes.css">
<script src="componentes/passi-componentes.js" defer></script>

<passi-campo-de-texto rotulo="E-mail" tipo="email" nome="email" obrigatorio></passi-campo-de-texto>
<passi-botao tipo-html="submit">Entrar</passi-botao>
```

- Por dentro, cada componente desenha o elemento nativo (button, a, input). Teclado, leitor de tela e formulários funcionam como o navegador já faz.
- Atributos em português, sem acento: `tipo="primario"`, `tamanho="g"`. Liga/desliga é a presença do atributo: `desabilitado` liga; para desligar, tire o atributo.
- Hover, pressionado e foco vêm do navegador. Não há atributo de estado.
- Ícones: os 201 do Figma já vêm dentro do arquivo. Use os nomes de [diretrizes/fundamentos/icones.md](../diretrizes/fundamentos/icones.md).
- Veja todos funcionando em [exemplos/componentes.html](../exemplos/componentes.html).
- Os dados de cada componente (propriedades, estados, acessibilidade, regras) estão em [fichas/](../fichas/indice.json).

## Conferir o código

```sh
node scripts/verificar.mjs minha-pagina.html
```

O verificador aponta cores soltas, px em texto e espaço, variáveis que não existem, pares de texto e fundo fora da tabela de contraste, componentes que não existem no PASSI e atributos ou textos que fogem das diretrizes. Use `--json` para ler a saída num programa.

## Botão · `<passi-botao>`

Dispara uma ação. Use um único Primário por tela para a ação principal. Secundário para ações fortes que não são a principal, Contorno e Fantasma para ações de apoio, Perigo para ações destrutivas (excluir, cancelar assinatura). Tamanhos: P 32 px, M 40 px, G 48 px.

Conteúdo: Texto do botão. Começa com verbo e diz o que acontece. Obrigatório.

| Atributo | Tipo | Valores | Padrão | No Figma |
|---|---|---|---|---|
| `tipo` | Lista | `primario`, `secundario`, `contorno`, `fantasma`, `perigo` | `primario` | Tipo |
| `tamanho` | Lista | `p`, `m`, `g` | `m` | Tamanho |
| `icone-esquerda` | Nome de ícone | Nome de um dos 201 ícones. Reforça a ação. |  | Ícone à esquerda + Trocar ícone esquerdo |
| `icone-direita` | Nome de ícone | Nome de um dos 201 ícones. Indica avanço ou abertura. |  | Ícone à direita + Trocar ícone direito |
| `desabilitado` | Liga/desliga (presença do atributo) | Explique perto do botão por que ele está indisponível. |  | Estado = Desabilitado |
| `tipo-html` | Lista | `button`, `submit`, `reset` | `button` | só no código |

Estados: Hover, Pressionado e Foco vêm do navegador (:hover, :active, :focus-visible). Desabilitado vem do atributo desabilitado.

Regras completas: [diretrizes/componentes/botao.md](../diretrizes/componentes/botao.md).

## Link · `<passi-link>`

Leva a outra página, seção ou site. No meio de textos é sempre sublinhado, para não depender só da cor. Marca para links de destaque, Neutro para links dentro de textos longos. Ligue Abre outro site para mostrar o ícone de abrir fora.

Conteúdo: Texto do link. Diz o destino. Obrigatório.

| Atributo | Tipo | Valores | Padrão | No Figma |
|---|---|---|---|---|
| `href` (obrigatório) | Texto | Endereço de destino. Link leva a outro lugar; para executar uma ação, use Botão. |  | só no código |
| `tipo` | Lista | `marca`, `neutro` | `marca` | Tipo |
| `tamanho` | Lista | `m`, `p` | `m` | Tamanho |
| `seta` | Liga/desliga (presença do atributo) | Seta à direita: avança para outra etapa ou página. |  | Mostrar seta |
| `nova-aba` | Liga/desliga (presença do atributo) | Abre outro site em outra aba. O componente põe o ícone link-externo e avisa o leitor de tela com “(abre em outra aba)”. |  | Abre outro site |
| `desabilitado` | Liga/desliga (presença do atributo) |  |  | Estado = Desabilitado |

Estados: Hover, Pressionado e Foco vêm do navegador. Desabilitado vem do atributo desabilitado.

Regras completas: [diretrizes/componentes/link.md](../diretrizes/componentes/link.md).

## Campo de texto · `<passi-campo-de-texto>`

Entrada de uma linha. Sempre com rótulo visível acima do campo. A mensagem de ajuda vira mensagem de erro quando a validação falha. Ícone à direita serve para ações do campo, como mostrar ou esconder a senha. Tamanhos: M 40 px (padrão) e G 48 px (celular e formulários de destaque).

| Atributo | Tipo | Valores | Padrão | No Figma |
|---|---|---|---|---|
| `rotulo` (obrigatório) | Texto | Sempre visível, acima do campo. Curto e sem dois-pontos. |  | Rótulo |
| `ajuda` | Texto | O que saber antes de digitar. |  | Ajuda + Mostrar ajuda |
| `erro` | Texto | Mensagem que diz como resolver. Ocupa o lugar da ajuda. |  | Estado = Erro |
| `sucesso` | Texto |  |  | Estado = Sucesso |
| `valor` | Texto |  |  | Valor (Estado = Preenchido) |
| `exemplo` | Texto | Um exemplo real. Nunca substitui o rótulo. |  | Valor (texto de exemplo) |
| `tamanho` | Lista | `m`, `g` | `m` | Tamanho |
| `tipo` | Lista | `texto`, `email`, `senha`, `telefone`, `numero`, `busca`, `url` | `texto` | Ícone à direita + Trocar ícone direito (olho, no tipo senha) |
| `icone-esquerda` | Nome de ícone | Indica o tipo de dado, como busca ou e-mail. |  | Ícone à esquerda + Trocar ícone esquerdo |
| `nome` | Texto | Nome do dado no formulário (name). |  | só no código |
| `autocomplete` | Texto | Preenchimento automático do navegador, como email ou current-password. |  | só no código |
| `obrigatorio` | Liga/desliga (presença do atributo) |  |  | só no código |
| `opcional` | Liga/desliga (presença do atributo) | Mostra (opcional) no rótulo. Marque o que é opcional, não o que é obrigatório. |  | só no código |
| `desabilitado` | Liga/desliga (presença do atributo) |  |  | Estado = Desabilitado |

Eventos: `input e change`: Os eventos nativos do campo chegam ao componente. O valor está em .value.

Estados: Hover e Foco vêm do navegador. Preenchido vem do valor digitado. Erro e Sucesso vêm dos atributos erro e sucesso. Desabilitado vem do atributo desabilitado.

Regras completas: [diretrizes/componentes/campo-de-texto.md](../diretrizes/componentes/campo-de-texto.md).

## Checkbox · `<passi-checkbox>`

Permite marcar uma ou várias opções independentes. Use Indeterminado no item “selecionar todos” quando só parte da lista está marcada. A caixa tem 20 px; toda a linha (caixa + texto) deve ser clicável.

Conteúdo: Rótulo do checkbox, se precisar de link dentro dele. Senão, use o atributo rotulo.

| Atributo | Tipo | Valores | Padrão | No Figma |
|---|---|---|---|---|
| `rotulo` (obrigatório) | Texto | Afirmação positiva. Pode vir no conteúdo em vez do atributo. |  | Rótulo |
| `descricao` | Texto |  |  | Descrição + Mostrar descrição |
| `marcado` | Liga/desliga (presença do atributo) |  |  | Marcação = Marcado |
| `indeterminado` | Liga/desliga (presença do atributo) | Para o item selecionar todos quando só parte da lista está marcada. |  | Marcação = Indeterminado |
| `erro` | Texto | Mensagem quando o item é obrigatório e não foi marcado. |  | Estado = Erro |
| `nome` | Texto |  |  | só no código |
| `valor` | Texto |  |  | só no código |
| `obrigatorio` | Liga/desliga (presença do atributo) |  |  | só no código |
| `desabilitado` | Liga/desliga (presença do atributo) |  |  | Estado = Desabilitado |

Eventos: `change`: O evento nativo chega ao componente. A marcação está em .checked.

Estados: Hover, Pressionado e Foco vêm do navegador, na linha inteira. Erro vem do atributo erro. Desabilitado vem do atributo desabilitado.

Regras completas: [diretrizes/componentes/checkbox.md](../diretrizes/componentes/checkbox.md).

## Alerta · `<passi-alerta>`

Mensagem fixa dentro da página, ligada a um contexto. Diferente do Aviso rápido, que aparece e some. Use Informação, Sucesso, Atenção ou Erro conforme a gravidade.

Conteúdo: Descrição: o que fazer agora.

| Atributo | Tipo | Valores | Padrão | No Figma |
|---|---|---|---|---|
| `tipo` | Lista | `informacao`, `sucesso`, `atencao`, `erro` | `informacao` | Tipo |
| `titulo` (obrigatório) | Texto | O que aconteceu. |  | Título |
| `acao` | Texto | Verbo, como Tentar de novo. Dispara o evento passi-acao. |  | Ação + Mostrar ação |
| `acao-href` | Texto | Se a ação leva a outra página, o endereço dela. |  | só no código |
| `pode-fechar` | Liga/desliga (presença do atributo) | Mostra o botão Fechar alerta. No Figma vem ligado; no código, ligue quando fizer sentido. |  | Pode fechar |
| `anunciar` | Liga/desliga (presença do atributo) | Para alertas que aparecem depois de uma ação: o leitor de tela anuncia sozinho (status, ou alert no tipo erro). |  | só no código |

Eventos: `passi-acao`: A pessoa clicou na ação (quando não há acao-href). `passi-fechar`: A pessoa fechou o alerta. Pode ser cancelado com preventDefault(); senão o alerta some e o foco vai para o próximo item clicável.

Estados: O alerta não é clicável. A ação e o fechar têm os cinco estados.

Regras completas: [diretrizes/componentes/alerta.md](../diretrizes/componentes/alerta.md).
