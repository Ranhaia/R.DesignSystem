# Regras para ferramentas de IA que escrevem código com o PASSI DS

Este arquivo vale para qualquer assistente de código (Claude Code, Cursor, Copilot, v0 e similares). Copie para a raiz do seu projeto com o nome que a sua ferramenta lê (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules/passi.md` ou `.github/copilot-instructions.md`) e ajuste os caminhos.

## Fonte da verdade

1. Os valores estão em `css/passi.css` (variáveis CSS) e em `tokens/` (formato W3C DTCG 2025.10).
2. As regras de cada peça estão em `diretrizes/`. Comece por `diretrizes/Guidelines.md`. O porquê de cada escolha está em `diretrizes/decisoes.md`.
3. O desenho original está no arquivo Figma do PASSI DS (https://www.figma.com/community/file/1694426075578751653/passi-ds-design-system-aberto-em-portugues). Se o Figma e este pacote discordarem, o Figma vence: avise a pessoa.

## Onde o PASSI funciona melhor

- O PASSI DS é feito e testado para a web (HTML, CSS e web components). É aí que ele funciona melhor.
- Em apps nativos, rem e px não existem. Use os mesmos tokens por equivalência: 1 rem = 16 pt no iOS (texto com Dynamic Type) e 16 dp no Android (texto em sp). Nomes, cores e regras de uso não mudam. Monte com os componentes nativos da plataforma, seguindo `diretrizes/componentes/`. Veja a decisão D10 em `diretrizes/decisoes.md`.

## Antes de escrever código

- Leia `diretrizes/Guidelines.md` e, para cada componente que for usar, o arquivo dele em `diretrizes/componentes/`.
- Para uma tela inteira, procure primeiro um padrão em `diretrizes/padroes/`.
- Não leia `llms-full.txt` inteiro se um arquivo específico resolver.

## Regras obrigatórias

- **NÃO** escreva códigos de cor (`#2544ec`, `rgb(...)`), tamanhos de fonte ou espaços soltos. Use sempre `var(--...)` do `passi.css` ou as classes do tema Tailwind.
- **NÃO** use primitivos (`--azul-500`, `--neutro-950`) em componentes. Use as cores com função: `--cor-fundo-*`, `--cor-texto-*`, `--cor-borda-*`, `--cor-dados-*`.
- Espaços só da escala `--espaco-*` (múltiplos de 4; o número é o fator: `--espaco-4` = 1 rem = 16 px). Cantos só de `--raio-*`. Bordas de `--borda-fina` ou `--borda-grossa`.
- Texto e espaço em rem (as variáveis já vêm assim). **NÃO** escreva px em tamanho de fonte, entrelinha ou espaço; px só em bordas, cantos e sombras.
- Texto com as classes `.texto-*` (ex.: `texto-titulo-1`, `texto-corpo-medio`). Títulos em Archivo, textos em Inter, código em IBM Plex Mono.
- Camadas: página (`--cor-fundo-pagina`), superfície (`--cor-fundo-superficie` com borda `--cor-borda-padrao`), flutuante (superfície com `--sombra-media`) e sobreposição (`--cor-fundo-sobreposicao` atrás de uma janela com `--sombra-grande`). Quem cria a superfície é a cor e a borda, não a sombra: sombras (`--sombra-*`) só em elementos que flutuam, como menus, popovers, janelas e avisos.
- Bordas por dentro: use `box-sizing: border-box` em tudo que tem borda (os componentes em código já usam). Assim a borda não muda a altura: um botão de 40 px continua com 40 px. O foco é `outline`, desenhado por fora, e também não muda o tamanho.
- Links no meio de textos são sempre sublinhados. Em navegação, como migalhas de pão e menus, ficam sem sublinhado, que aparece no hover. Link para outro site usa o ícone `link-externo` e avisa "(abre em outra aba)" para o leitor de tela.
- Animação com `--duracao-*` e `--curva-*`. Não remova a regra de movimento reduzido do `passi.css`.
- Modos de cor: não crie cores novas para o escuro nem para o alto contraste. Os tokens já trocam sozinhos pela preferência do sistema (`prefers-color-scheme`, `prefers-contrast: more`) ou com `data-tema="escuro"`, `"alto-contraste-claro"` ou `"alto-contraste-escuro"` no `<html>`.

## Acessibilidade (não negociável)

- Meta: WCAG 2.2 AA, base da norma brasileira ABNT NBR 17225. Detalhes em `diretrizes/fundamentos/acessibilidade.md`.
- Cada componente tem a seção "Acessibilidade" no seu arquivo em `diretrizes/componentes/`: siga o teclado, o papel e o nome para o leitor de tela e o caminho do foco descritos ali. Não invente outro comportamento.
- Use só pares de texto e fundo da tabela de contraste. Todos passam de 4,5:1 no claro e no escuro, e de 7:1 no alto contraste. A descrição de cada token de cor (`$description` em `tokens/`) diz o par certo e o contraste medido.
- Todo elemento clicável tem cinco estados: padrão, hover, pressionado, foco e desabilitado. Use os tokens `-hover` e `-pressionado` de cada cor (ex.: `--cor-fundo-marca-hover`, `--cor-fundo-marca-pressionado`).
- Foco visível em tudo o que é clicável (o `passi.css` já define `:focus-visible` com anel de 2 px). Não remova o contorno.
- Alvos de toque de pelo menos 24 px, e 40 px no celular. Arrastar nunca é o único jeito de fazer uma ação.
- A cor nunca é o único sinal: erro, sucesso e status sempre com ícone, forma ou texto.
- Botão só com ícone precisa de nome acessível (`aria-label`) e dica flutuante.
- Campos sempre com `<label>` visível. Mensagens de erro dizem como resolver e ficam ligadas ao campo (`aria-describedby`).
- Campos de senha e de código aceitam colar e preenchimento automático.

## Inteligência artificial no produto

- Tudo o que a IA fizer ou sugerir leva o Rótulo de IA, que abre a Explicação da IA. Regras em `diretrizes/fundamentos/ia-no-produto.md`.
- Use `--cor-texto-ia`, `--cor-fundo-ia-sutil` e `--cor-borda-ia` só para identificar a IA, sempre com o ícone brilho ou a palavra IA. **NÃO** use violeta ou gradientes como decoração.
- Conversa com IA: comece com o Aviso de IA (Conversa com IA), cite fontes, ofereça parar, gerar de novo, avaliar e falar com uma pessoa. Anuncie a resposta inteira ao terminar, nunca palavra por palavra.
- Antes de a IA mudar algo (salvar, enviar, pagar, apagar), mostre o Plano de ação e espere a confirmação da pessoa.
- **NÃO** dê nome, rosto ou sentimentos humanos à IA.

## Textos da interface

- Português do Brasil, frases curtas e diretas. Voz clara, direta, próxima e honesta: `diretrizes/conteudo/voz-e-tom.md`.
- Siga os padrões de `diretrizes/conteudo/microtexto.md` e a seção "Conteúdo" do arquivo de cada componente. A versão condensada para IA está em `llms-content.txt`.
- Use as palavras do glossário (`diretrizes/conteudo/glossario.md`): Entrar, não Login; Excluir, não Deletar; E-mail com hífen.
- Botões começam com verbo e dizem o que acontece: "Salvar alterações", não "OK" nem "Clique aqui". Sem exclamação.
- Mensagens de erro dizem o que houve e como resolver, sem códigos técnicos e sem culpar a pessoa.
- Linguagem inclusiva dentro da norma (Boas-vindas, quem se inscreveu, você). **NÃO** use todes, elu ou barras como bem-vindo(a): `diretrizes/conteudo/linguagem-inclusiva.md`.
- Datas, dinheiro, CPF, CNPJ, CEP e telefone no formato brasileiro, com `Intl` e localidade `pt-BR`: `diretrizes/conteudo/formatos-brasileiros.md`.

## Componentes em código (piloto)

- Botão, Link, Campo de texto, Checkbox e Alerta já existem como web components: `<passi-botao>`, `<passi-link>`, `<passi-campo-de-texto>`, `<passi-checkbox>` e `<passi-alerta>`. Use esses no lugar de `<button>`, `<a>`, `<input>` e de alertas feitos à mão. Atributos e exemplos em `componentes/README.md`.
- Para incluir: `css/passi.css`, `componentes/passi-componentes.css` e `<script src="componentes/passi-componentes.js" defer></script>`.
- Os outros componentes ainda não têm código. **NÃO** invente `<passi-*>` que não existe: monte com HTML nativo seguindo o arquivo do componente em `diretrizes/componentes/`.
- Os dados de cada componente (propriedades, estados, acessibilidade, regras) estão em `fichas/<componente>.json`.

## Ícones

- Use só os 201 nomes listados em `diretrizes/fundamentos/icones.md` (ex.: `seta-direita`, `busca`, `lixeira`). Nos componentes em código, passe o nome (`icone-esquerda="busca"`): os desenhos já vêm dentro de `componentes/passi-componentes.js`. Fora deles, exporte o SVG do Figma.
- **NÃO** invente ícones, não misture bibliotecas e não use imagens de preenchimento genéricas.

## Ao terminar

- Confira se não sobrou nenhum valor solto (busque por `#` e por `px` fora de `var(...)`). Se tiver Node, rode `node scripts/verificar.mjs <arquivo>` e corrija o que ele apontar.
- Teste no claro, no escuro e no alto contraste, só com o teclado e com movimento reduzido ligado.
- Diga à pessoa qual componente ou padrão do PASSI DS cada parte da tela usa.
