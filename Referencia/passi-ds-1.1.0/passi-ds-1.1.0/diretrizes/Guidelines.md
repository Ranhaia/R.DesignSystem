# PASSI DS · Diretrizes

PASSI DS é o design system aberto, em português, que acompanha o livro "Design System: o que você também precisa saber", de João Passini. Versão 1.1.0. Licença CC BY 4.0.

Este arquivo é a porta de entrada. Leia os outros arquivos só quando a tarefa pedir.

## Antes de tudo

1. Tokens primeiro: toda cor, espaço, canto, sombra, fonte e duração vem de `css/passi.css` (ou de `tokens/`). Nunca escreva códigos de cor ou tamanhos soltos.
2. Use as cores com função (`--cor-fundo-*`, `--cor-texto-*`, `--cor-borda-*`). Os primitivos (`--azul-500`, `--neutro-950`) não entram em componentes.
3. Antes de criar um componente, leia o arquivo dele em `componentes/`. Siga as seções "Faça" e "NÃO faça".
4. Antes de montar uma tela inteira, veja se existe um padrão pronto em `padroes/`.
5. Textos da interface em português do Brasil, diretos, com verbos nos botões ("Salvar alterações", não "OK"). Siga [conteudo/microtexto.md](conteudo/microtexto.md), o [glossário](conteudo/glossario.md) e a seção "Conteúdo" de cada componente.
6. Acessibilidade não é opcional: siga a seção "Acessibilidade" de cada componente (teclado, leitor de tela e foco) e a meta WCAG 2.2 AA de [fundamentos/acessibilidade.md](fundamentos/acessibilidade.md).

## Quando ler cada arquivo

- Escolher cor: [tokens/cores.md](tokens/cores.md)
- Espaços, cantos, bordas e grade: [tokens/espacamento-raio-e-grade.md](tokens/espacamento-raio-e-grade.md)
- Texto e fontes: [tokens/tipografia.md](tokens/tipografia.md)
- Animação: [tokens/movimento.md](tokens/movimento.md)
- Sombra, vidro e gradiente: [tokens/sombras-desfoques-e-gradientes.md](tokens/sombras-desfoques-e-gradientes.md)
- Acessibilidade (vale para tudo): [fundamentos/acessibilidade.md](fundamentos/acessibilidade.md)
- Telas com inteligência artificial: [fundamentos/ia-no-produto.md](fundamentos/ia-no-produto.md)
- Escrever textos de interface: [conteudo/microtexto.md](conteudo/microtexto.md), [conteudo/voz-e-tom.md](conteudo/voz-e-tom.md) e [conteudo/glossario.md](conteudo/glossario.md)
- Datas, dinheiro, CPF, CEP e telefone: [conteudo/formatos-brasileiros.md](conteudo/formatos-brasileiros.md)
- Por que o sistema é assim (inclusive onde ele foge do livro): [decisoes.md](decisoes.md)

## Árvore de decisão rápida

- Ação → Botão. Navegação para outro lugar → Link. Ação só com ícone → Botão de ícone (com nome acessível e dica flutuante).
- Escolher 1 entre 2 a 4 opções visíveis → Controle segmentado ou Rádio. Mais de 5 opções → Seleção. Lista longa com digitação → Campo com sugestões.
- Marcar opções independentes → Checkbox. Ligar algo que vale na hora → Interruptor.
- Mensagem que fica na página → Alerta. Confirmação que some sozinha → Aviso rápido. Decisão que interrompe → Janela modal.
- Status só para leitura → Selo. Filtro clicável → Etiqueta.
- Conteúdo ou sugestão feita pela IA → Rótulo de IA (abre a Explicação da IA). Campo preenchido pela IA → Campo sugerido por IA. Conversa com a IA → padrão Conversa com IA. IA que vai agir por alguém → Plano de ação, com confirmação.

## Fundamentos

- [Cores](fundamentos/cores.md): As cores têm duas camadas.
- [Tipografia](fundamentos/tipografia.md): Três famílias, cada uma com um papel.
- [Espaçamento e grid](fundamentos/espacamento-e-grid.md): Todo espaço do sistema é múltiplo de 4.
- [Cantos e sombras](fundamentos/cantos-e-sombras.md): Cantos arredondados deixam a interface mais amigável; a regra é simples: quanto maior o elemento, maior o canto.
- [Ícones](fundamentos/icones.md): 201 ícones desenhados para o PASSI DS, todos no mesmo grid de 24 px, com traço de 1,75 px e pontas arredondadas.
- [Gradientes](fundamentos/gradientes.md): Seis gradientes feitos com as cores do sistema.
- [Vidro e desfoque](fundamentos/vidro-e-desfoque.md): O efeito de vidro deixa um painel translúcido e desfoca o que está atrás.
- [Movimento](fundamentos/movimento.md): O movimento explica o que está acontecendo: de onde algo veio e para onde foi.
- [Logo](fundamentos/logo.md): O logo do PASSI DS junta um símbolo, um círculo cheio e um anel do mesmo tamanho sobrepostos, com o nome em dois pesos: PASSI forte e DS fino.
- [Utilitários](fundamentos/utilitarios.md): Peças de apoio para documentar e entregar telas ao time de desenvolvimento: marcadores numerados, notas de comportamento, medidas e o cabeçalho de cada tela.
- [Acessibilidade](fundamentos/acessibilidade.md): O que o PASSI DS faz para que mais pessoas consigam usar o que você criar, e o que ainda depende de quem desenha e de quem programa.
- [IA no produto](fundamentos/ia-no-produto.md): Como mostrar inteligência artificial nas telas sem exagero e sem esconder nada.

## Conteúdo

- [Voz e tom](conteudo/voz-e-tom.md): A voz do PASSI é sempre a mesma: clara, direta, próxima e honesta.
- [Microtexto](conteudo/microtexto.md): Microtexto é todo texto curto da interface: botões, rótulos, ajudas, erros, avisos e telas vazias.
- [Glossário](conteudo/glossario.md): As palavras da interface do PASSI, sempre as mesmas, em todas as telas.
- [Linguagem inclusiva](conteudo/linguagem-inclusiva.md): Texto que inclui todo mundo sem pedir esforço extra para ler.
- [Formatos brasileiros](conteudo/formatos-brasileiros.md): Como escrever dinheiro, números, datas, horas, documentos e endereços do jeito que o Brasil lê.

## Componentes

- [Botão](componentes/botao.md): Botões disparam ações.
- [Botão de ícone](componentes/botao-de-icone.md): O botão de ícone executa uma ação usando só um símbolo, como fechar, curtir ou compartilhar.
- [Grupo de botões](componentes/grupo-de-botoes.md): O grupo de botões organiza duas ou mais ações relacionadas, como cancelar e salvar.
- [Link](componentes/link.md): O link leva a pessoa para outra página, seção ou site.
- [Campo de texto](componentes/campo-de-texto.md): O campo de texto recebe informações curtas digitadas pela pessoa, como nome, e-mail ou senha.
- [Área de texto](componentes/area-de-texto.md): A área de texto recebe respostas longas, de várias linhas, como comentários, descrições e mensagens.
- [Seleção](componentes/selecao.md): A seleção mostra uma lista de opções que abre sob o campo.
- [Checkbox](componentes/checkbox.md): O checkbox permite escolher uma ou mais opções de uma lista, ou confirmar algo de forma independente, como aceitar os termos de uso.
- [Rádio](componentes/radio.md): O rádio serve para escolher uma única opção dentro de um grupo.
- [Interruptor](componentes/interruptor.md): O interruptor liga e desliga uma configuração.
- [Controle deslizante](componentes/controle-deslizante.md): O controle deslizante escolhe um valor aproximado dentro de um limite, arrastando um pegador.
- [Controle segmentado](componentes/controle-segmentado.md): O controle segmentado alterna entre poucas opções que se excluem, como mensal e anual.
- [Código de verificação](componentes/codigo-de-verificacao.md): O código de verificação recebe números enviados por e-mail ou SMS, uma casa por dígito.
- [Envio de arquivo](componentes/envio-de-arquivo.md): O envio de arquivo deixa a pessoa arrastar um arquivo para a área marcada ou clicar para escolher no computador.
- [Etiqueta](componentes/etiqueta.md): A etiqueta é clicável.
- [Selo](componentes/selo.md): O selo mostra o status ou a categoria de algo, como “Publicado” ou “Em revisão”.
- [Avatar](componentes/avatar.md): O avatar representa uma pessoa.
- [Card](componentes/card.md): O card agrupa informações sobre um mesmo assunto, como um artigo, um produto ou um indicador.
- [Acordeão](componentes/acordeao.md): O acordeão organiza conteúdos em seções que abrem e fecham.
- [Abas](componentes/abas.md): As abas dividem um conteúdo em partes e mostram uma de cada vez, sem sair da página.
- [Migalhas de pão](componentes/migalhas-de-pao.md): As migalhas de pão mostram onde a pessoa está dentro do site e o caminho até ali.
- [Paginação](componentes/paginacao.md): A paginação divide listas longas em páginas menores e permite ir para a anterior, a próxima ou uma página específica.
- [Indicador de página](componentes/indicador-de-pagina.md): O indicador de página mostra, com pontos, em qual tela de um carrossel ou de uma introdução a pessoa está.
- [Passos](componentes/passos.md): Os passos mostram em que etapa de um processo a pessoa está, quantas já foram e quantas faltam.
- [Barra de progresso](componentes/barra-de-progresso.md): A barra de progresso mostra quanto de uma tarefa já foi feito, como um envio de arquivo ou o avanço na leitura.
- [Carregando](componentes/carregando.md): Quando algo demora, a pessoa precisa saber que o sistema está trabalhando.
- [Alerta](componentes/alerta.md): O alerta é uma mensagem que fica na página, perto do conteúdo a que se refere.
- [Aviso rápido](componentes/aviso-rapido.md): O aviso rápido confirma que algo aconteceu, como “Link copiado”.
- [Dica flutuante](componentes/dica-flutuante.md): A dica flutuante é um balão pequeno que explica um elemento quando a pessoa passa o mouse ou navega com o teclado.
- [Popover](componentes/popover.md): O popover é um painel pequeno que abre quando a pessoa clica em algo.
- [Janela modal](componentes/janela-modal.md): A janela modal aparece por cima da tela e pede uma decisão ou uma informação curta antes de continuar.
- [Menu](componentes/menu.md): O menu reúne ações que não cabem na tela, como editar, duplicar ou excluir.
- [Item de lista](componentes/item-de-lista.md): O item de lista organiza conteúdos parecidos um embaixo do outro: capítulos, arquivos, pessoas ou configurações.
- [Barra de ferramentas](componentes/barra-de-ferramentas.md): A barra de ferramentas reúne ações rápidas sobre um conteúdo, como editar, copiar ou compartilhar.
- [Sobreposição](componentes/sobreposicao.md): A sobreposição é uma camada escura e semitransparente que cobre a tela quando uma janela modal abre.
- [Atalho de teclado](componentes/atalho-de-teclado.md): O atalho de teclado mostra quais teclas fazem uma ação mais rápido, como ⌘ + K para buscar.
- [Divisor](componentes/divisor.md): O divisor é uma linha fina que separa grupos de conteúdo.
- [Botão em bloco](componentes/botao-em-bloco.md): O botão em bloco transforma uma escolha importante em cartões grandes e fáceis de tocar.
- [Seletor de cor](componentes/seletor-de-cor.md): O seletor de cor deixa a pessoa escolher uma cor.
- [Campo com sugestões](componentes/campo-com-sugestoes.md): O campo com sugestões junta um campo de texto com uma lista.
- [Índice alfabético](componentes/indice-alfabetico.md): O índice alfabético leva direto a uma letra em listas longas, como glossários e contatos.
- [Rótulo informativo](componentes/rotulo-informativo.md): O rótulo informativo dá nome a um campo ou a um número e oferece uma explicação curta num ícone de ajuda, sem poluir a tela.
- [Lista em árvore](componentes/lista-em-arvore.md): A lista em árvore mostra conteúdos organizados em níveis, como pastas e arquivos ou partes e capítulos de um livro.
- [Proporção de imagem](componentes/proporcao-de-imagem.md): A proporção define a relação entre largura e altura de uma imagem ou vídeo.
- [Área de destaque](componentes/area-de-destaque.md): A área de destaque separa um trecho do texto principal para chamar atenção: uma dica, um exemplo prático, um alerta ou um resumo.
- [Rótulo de IA](componentes/rotulo-de-ia.md): O rótulo de IA avisa que um conteúdo, uma sugestão ou uma resposta veio de inteligência artificial.
- [Explicação da IA](componentes/explicacao-da-ia.md): A explicação abre quando a pessoa clica no rótulo de IA.
- [Campo sugerido por IA](componentes/campo-sugerido-por-ia.md): Quando a IA preenche um campo por você, o PASSI mostra isso com clareza: rótulo de IA, borda própria e uma frase dizendo de onde veio a sugestão.
- [Campo de pedido](componentes/campo-de-pedido.md): O campo de pedido é onde a pessoa escreve para a IA.
- [Mensagem da conversa](componentes/mensagem-da-conversa.md): Cada fala da conversa com a IA.
- [Plano de ação](componentes/plano-de-acao.md): Quando a IA vai agir por você, como mover arquivos ou enviar algo, ela primeiro mostra o plano.
- [Aviso de IA](componentes/aviso-de-ia.md): Avisos curtos que dizem a verdade sobre a IA: quando a pessoa está falando com uma, o que ela não sabe, o que foi gerado por ela e como chegar a uma pessoa.

## Padrões (telas prontas)

- [Entrar e criar conta](padroes/entrar-e-criar-conta.md): Telas prontas para a pessoa entrar, criar conta, recuperar a senha e confirmar o e-mail.
- [Cabeçalho do site](padroes/cabecalho-do-site.md): O cabeçalho fica no topo de todas as páginas.
- [Rodapé do site](padroes/rodape-do-site.md): O rodapé fecha todas as páginas.
- [Seções de página](padroes/secoes-de-pagina.md): Blocos prontos para montar páginas inteiras, como a página de um produto ou de um livro.
- [Menu lateral](padroes/menu-lateral.md): O menu lateral organiza a navegação de aplicativos e áreas logadas.
- [Navegação do celular](padroes/navegacao-do-celular.md): No celular, a navegação principal fica embaixo, ao alcance do polegar.
- [Busca](padroes/busca.md): A busca ajuda a pessoa a encontrar conteúdo sem navegar pelo menu.
- [Calendário](padroes/calendario.md): O calendário ajuda a escolher uma data ou um período, como a data de uma mentoria ou as férias da equipe.
- [Gráficos](padroes/graficos.md): Cards de gráfico para painéis de acompanhamento, como a adoção de um design system.
- [Tabela de dados](padroes/tabela-de-dados.md): A tabela organiza muitos itens em linhas e colunas, para comparar, ordenar e agir sobre eles.
- [Cards de conteúdo](padroes/cards-de-conteudo.md): Cards para listar artigos, capítulos e notícias.
- [Card de produto](padroes/card-de-produto.md): Cards para vender: mostram o produto, a avaliação, o preço e a ação de compra.
- [Card de equipe](padroes/card-de-equipe.md): Cards para apresentar pessoas, como o time que mantém o design system.
- [Planos e preços](padroes/planos-e-precos.md): Páginas de preço comparam opções lado a lado.
- [Trecho de código](padroes/trecho-de-codigo.md): O trecho de código mostra exemplos para quem vai implementar, como as variáveis do design system em CSS.
- [Player de vídeo](padroes/player-de-video.md): O player mostra vídeos com controles claros: tocar, avançar, volume, legendas e tela cheia.
- [Menus suspensos](padroes/menus-suspensos.md): Menus que abrem sobre a página: o menu de contexto, com submenus, o menu da conta, que abre a partir do avatar, e o mega menu, para sites com muitas seções.
- [Janela de ações](padroes/janela-de-acoes.md): No celular, as ações sobre um item aparecem numa folha que sobe da parte de baixo da tela, perto do polegar.
- [Central de notificações](padroes/central-de-notificacoes.md): A central reúne tudo o que aconteceu enquanto a pessoa estava fora: comentários, menções e atualizações.
- [Conversa com IA](padroes/conversa-com-ia.md): Tela de assistente montada só com componentes do PASSI.

## Miscelânea

- [Molduras de aparelho](miscelanea/molduras-de-aparelho.md): Molduras genéricas para mostrar telas em contexto: celular, tablet, notebook e janela de navegador.
- [Tipos de arquivo](miscelanea/tipos-de-arquivo.md): Ícones de formato para anexos, downloads e listas de arquivos.
- [Bandeiras](miscelanea/bandeiras.md): Bandeiras simplificadas para seletores de país, códigos de telefone e endereços.
- [Formas](miscelanea/formas.md): Formas básicas e orgânicas para montar ilustrações simples, fundos de seção e destaques.
- [Status](miscelanea/status.md): Peças para mostrar estado: o ponto de presença de uma pessoa e o indicador de status de um item.
- [Seleção de texto](miscelanea/selecao-de-texto.md): Como o texto aparece quando a pessoa seleciona, busca ou digita: cor de seleção, marca-texto de busca e cursor.
- [Reações](miscelanea/reacoes.md): Desenhos próprios para reagir a comentários e conteúdos, com o contador e a barra de reações rápidas.
