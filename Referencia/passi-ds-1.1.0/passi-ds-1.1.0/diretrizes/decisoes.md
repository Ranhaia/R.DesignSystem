# Decisões

Registro de decisões do PASSI DS 1.1.0. O registro do porquê das escolhas do PASSI DS. Cada decisão tem data e não é editada: quando uma decisão mudar, entra uma nova que aponta para a antiga, como o livro recomenda no capítulo 10.

## D1 · Nomes dos tokens em português

Data: 20 de outubro de 2026.

- O que o livro diz: Capítulo 7, página 98: o nome do token deve ser em inglês, e só a documentação em português.
- Decisão: Os nomes ficam em português: --cor-fundo-marca, --espaco-4, --raio-medio.
- Por quê: O PASSI DS existe para ensinar quem fala português, e o português é a marca dele. Nomes em português são lidos sem tradução por quem usa o sistema, e todo token de cor tem uma descrição que diz para que serve.
- Consequências: O código que usa o PASSI fica com um idioma só nos tokens. Quem misturar com bibliotecas em inglês deve manter os nomes do PASSI como estão, sem traduzir.
- Alternativa descartada: Traduzir para inglês: mudaria 151 variáveis e todas as ligações nos componentes, quebraria quem já usa e tiraria a identidade do sistema.

## D2 · “Fundo” no lugar de “superfície”

Data: 20 de outubro de 2026.

- O que o livro diz: Capítulo 7, página 99: chamar de superfície, porque a palavra comunica camada e elevação.
- Decisão: A família continua se chamando fundo, com os níveis fundo/pagina, fundo/superficie e fundo/sutil.
- Por quê: “Fundo” é a palavra que quem fala português usa. A ideia do livro está no segundo nível do nome: a superfície fica sobre a página, e no modo escuro ela é um pouco mais clara que a página, como o livro pede.
- Consequências: Ninguém precisa traduzir “surface” para usar o sistema.
- Alternativa descartada: Renomear cor/fundo/* para cor/superficie/*: 27 tokens renomeados e um nome repetido (superficie/superficie).

## D3 · Espaço por fator e cantos com nomes

Data: 20 de outubro de 2026.

- O que o livro diz: Capítulo 7, página 103: prefere o nome igual ao valor (space.16 = 16 px), aceita o fator quando todo o time conhece a base e manda evitar adjetivos como “médio”.
- Decisão: O espaço usa fator de 4 (--espaco-4 = 16 px) e os cantos usam nomes (--raio-pequeno, -medio, -grande, -extra, -pilula).
- Por quê: A base 4 está escrita em todas as páginas de espaço e no começo do arquivo de tokens. Os cantos são uma escala curta, de cinco valores, que quase nunca ganha valor novo, e cada nome vem com a medida ao lado.
- Consequências: Um valor novo de espaço entra pelo fator (ex.: --espaco-7 = 28 px) sem renomear os vizinhos.
- Alternativa descartada: Renomear pelo valor: --espaco-16 hoje vale 64 px e passaria a valer 16 px. O mesmo nome mudaria de valor, o que confunde quem já usa.

## D4 · Escalas de cor curtas

Data: 20 de outubro de 2026.

- O que o livro diz: Capítulo 8, página 112: cada cor ganha de 9 a 11 degraus. Capítulo 6, página 93: token sem uso é removido.
- Decisão: Azul e neutro têm escala completa. Âmbar, verde, vermelho e violeta têm só os degraus que algum componente usa (6 ou 7).
- Por quê: As duas regras do livro puxam para lados opostos. O PASSI segue a segunda: cada token é manutenção, e degrau sem uso só aumenta a lista.
- Consequências: Um degrau novo entra quando um componente precisar dele, com uma decisão nova neste registro.
- Alternativa descartada: Completar as escalas: cerca de 15 cores que nenhum componente usaria.

## D5 · rem no código, px no Figma

Data: 20 de outubro de 2026.

- O que o livro diz: Capítulo 8, página 115: tamanho de texto e espaço em rem, para crescer quando a pessoa aumenta a fonte do navegador; px só no que não deve crescer.
- Decisão: No pacote, espaços, tamanhos de texto, entrelinhas e espaçamento entre letras estão em rem (1 rem = 16 px no tamanho padrão do navegador). Bordas, cantos e sombras ficam em px. No Figma, tudo aparece em px.
- Por quê: É o que a WCAG pede para o texto crescer até 200% sem quebrar a tela. O Figma só trabalha em pixel, por isso os valores de lá são os mesmos multiplicados por 16.
- Consequências: Quem programa usa as variáveis do passi.css e não escreve px em texto nem em espaço.
- Alternativa descartada: Manter tudo em px: contrariava o próprio capítulo de acessibilidade do livro.

## D6 · Cinco estados nos componentes clicáveis

Data: 20 de outubro de 2026.

- O que o livro diz: Capítulo 7, página 101: todo elemento clicável tem cinco estados (padrão, hover, pressionado, foco e desabilitado). “Não quatro. Cinco.”
- Decisão: 20 peças clicáveis ganharam o estado Pressionado (17 componentes e, nos padrões, o Item de navegação, o Item do menu lateral e o Dia do calendário), com 6 cores novas: cor/fundo/marca-pressionado, cor/fundo/erro-pressionado, cor/fundo/invertido-pressionado, cor/fundo/fantasma-pressionado, cor/texto/marca-hover e cor/texto/marca-pressionado. Campo de texto, Área de texto e Seleção não têm pressionado: ao clicar, eles recebem foco ou abrem a lista.
- Por quê: Quem toca ou clica precisa ver que o sistema recebeu a ação.
- Consequências: O hover do Link passou a usar cor/texto/marca-hover. Antes ele usava uma cor de fundo, que ficava com contraste baixo no modo escuro.
- Alternativa descartada: Pressionado só nos botões: o PASSI continuaria contrariando a regra nos outros componentes.

## D7 · APCA como apoio, WCAG como regra

Data: 20 de outubro de 2026.

- O que o livro diz: Capítulo 8, página 114: medir cada par em duas réguas, a da WCAG e a APCA, com alvo Lc 75 para texto corrido.
- Decisão: A tabela de contraste mostra as duas medidas. A WCAG continua decidindo o que passa ou não; a APCA ajuda a escolher entre pares que já passam.
- Por quê: A WCAG 2.2 é o que a lei e a ABNT NBR 17225 cobram. A APCA ainda é estudo para a futura WCAG 3, mas considera o tamanho e o peso da letra.
- Consequências: Alvos de APCA usados no PASSI: Lc 75 para texto corrido, Lc 60 para textos curtos de conteúdo e Lc 45 para títulos grandes. Pares abaixo de Lc 75 servem para textos curtos, não para parágrafos.
- Alternativa descartada: Ficar só com a WCAG: o livro pede as duas réguas.

## D8 · Descrição em todo token de cor

Data: 20 de outubro de 2026.

- O que o livro diz: Capítulo 6, página 93, e Apêndice B, página 295: todo token com função diz para que serve, qual é o seu par e qual contraste atinge.
- Decisão: Os tokens de cor com função têm descrição no Figma e no pacote: o papel, o par e o contraste medido. Os primitivos ficam sem descrição.
- Por quê: Quem chega ao sistema escolhe o token certo sem precisar perguntar.
- Consequências: O contraste das descrições é calculado pelo gerador do pacote, nunca digitado à mão, e muda sozinho se uma cor mudar.
- Alternativa descartada: Descrição em todos os tokens: em espaço, cantos e movimento ela só repetiria o nome.

## D9 · Licença CC BY 4.0

Data: 20 de outubro de 2026.

- O que o livro diz: O livro não trata da licença do sistema.
- Decisão: O PASSI DS passa da licença CC BY-NC 4.0 para a CC BY 4.0, no Figma, no pacote e no site.
- Por quê: Para publicar o arquivo na Comunidade do Figma, onde todo arquivo gratuito usa a CC BY 4.0. Uma licença só em todos os lugares evita dúvida sobre o que pode e o que não pode.
- Consequências: Qualquer pessoa ou empresa pode usar e adaptar o PASSI DS, inclusive em projetos comerciais, desde que dê o crédito. Esta decisão substitui a licença CC BY-NC 4.0 da primeira publicação da versão 1.0.
- Alternativa descartada: Manter a CC BY-NC 4.0 e não publicar na Comunidade, deixando só o link do arquivo no site; ou publicar como recurso pago, com conta de vendedor no Figma.

## D10 · Feito para a web, com equivalência no nativo

Data: 21 de outubro de 2026.

- O que o livro diz: Capítulo 8, página 115: tamanho de texto e espaço em rem, uma unidade que só existe na web.
- Decisão: O PASSI DS é feito e testado para a web, onde funciona melhor. Em apps nativos, os tokens valem por equivalência: 1 rem = 16 pt no iOS, com Dynamic Type no texto, e 16 dp no Android, com sp no tamanho do texto.
- Por quê: Os componentes, o passi.css e os testes de zoom são de web. Dizer onde o sistema funciona melhor evita que alguém espere componentes nativos prontos.
- Consequências: Nomes, cores, proporções e regras de uso são os mesmos em qualquer plataforma. Quem leva para iOS ou Android converte as unidades e usa os componentes nativos da plataforma, seguindo as diretrizes do PASSI. Esta decisão completa a D5.
- Alternativa descartada: Gerar arquivos de tokens para iOS e Android agora: dobraria a manutenção sem um app nativo real para testar.
