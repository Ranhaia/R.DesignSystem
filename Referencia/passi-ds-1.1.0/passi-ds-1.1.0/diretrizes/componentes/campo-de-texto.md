# Campo de texto

Componente do PASSI DS 1.1.0 · página "Campo de texto" no arquivo Figma.

O campo de texto recebe informações curtas digitadas pela pessoa, como nome, e-mail ou senha. O rótulo fica sempre visível acima do campo, e a mensagem de ajuda vira mensagem de erro quando algo não está certo.

## Campo de texto

Campo de texto · entrada de uma linha. Sempre com rótulo visível acima do campo. A mensagem de ajuda vira mensagem de erro quando a validação falha. Ícone à direita serve para ações do campo, como mostrar ou esconder a senha. Tamanhos: M 40 px (padrão) e G 48 px (celular e formulários de destaque).

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Rótulo | Texto |  | Nome completo |
| Valor | Texto |  | Digite seu nome |
| Ajuda | Texto |  | Como aparece no seu documento. |
| Mostrar rótulo | Liga/desliga |  | Ligado |
| Mostrar ajuda | Liga/desliga |  | Ligado |
| Ícone à esquerda | Liga/desliga |  | Desligado |
| Trocar ícone esquerdo | Troca de ícone ou componente |  |  |
| Trocar ícone direito | Troca de ícone ou componente |  |  |
| Ícone à direita | Liga/desliga |  | Desligado |
| Tamanho | Variante | M, G | M |
| Estado | Variante | Padrão, Hover, Foco, Preenchido, Erro, Sucesso, Desabilitado | Padrão |

## Como usar

### Estados

Preenchido mostra o texto digitado. Erro e sucesso aparecem depois da validação, com cor, ícone e mensagem, nunca só com cor.

Exemplos no Figma: Padrão; Hover; Foco; Preenchido; Erro; Sucesso; Desabilitado.

### Tamanhos

Exemplos no Figma: M · 40 px; G · 48 px.

### Com ícones

Ícone à esquerda indica o tipo de dado, como busca ou e-mail. O ícone à direita mostra o resultado da validação ou uma ação, como mostrar a senha.

Exemplos no Figma: Busca; Senha.

### Em uso

Formulário curto de cadastro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Rótulo curto, sem dois-pontos: E-mail.
- Ajuda diz o que saber antes de digitar; o erro diz como resolver.
- O texto de exemplo é um exemplo real e nunca substitui o rótulo.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Tab chega ao campo. A pessoa digita e Tab segue para o próximo campo. Colar sempre funciona, inclusive em senhas.
- Leitor de tela: O rótulo visível é o nome do campo. A ajuda é lida junto com o campo. No erro, o campo é anunciado como inválido e a mensagem de erro é lida.
- Foco: Borda azul de 2 px. Ao enviar um formulário com erro, o foco vai para o primeiro campo com problema ou para um resumo de erros no topo.
- Cuidados: Rótulo sempre visível; o texto de exemplo não substitui o rótulo. Erro com ícone e texto, nunca só a cor vermelha. Use o tipo certo de teclado no celular (e-mail, número, telefone) e o preenchimento automático do navegador.

## Tokens usados

Fundo: cor/fundo/superficie, cor/fundo/desabilitado. Borda: cor/borda/controle, cor/borda/marca, cor/borda/erro, cor/borda/sucesso. Texto: cor/texto/padrao, cor/texto/terciario (placeholder), cor/texto/erro, cor/texto/sucesso. Espaço: espaco/2, espaco/3. Canto: raio/medio.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Mantenha o rótulo sempre visível, acima do campo.
- Escreva mensagens de erro que digam como resolver.
- Marque o que é opcional, não o que é obrigatório.
- Ajuste a largura ao tamanho esperado da resposta.

## NÃO faça

- Usar o placeholder no lugar do rótulo.
- Mensagens genéricas como “Campo inválido”.
- Mostrar erro antes da pessoa terminar de digitar.
- Indicar erro só com a cor vermelha.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
