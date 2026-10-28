# Entrar e criar conta

Padrão do PASSI DS 1.1.0 · página "Entrar e criar conta" no arquivo Figma.

Telas prontas para a pessoa entrar, criar conta, recuperar a senha e confirmar o e-mail. Todas usam os componentes do sistema, então mudam junto quando eles mudam.

## Entrar e criar conta

Entrar e criar conta · telas prontas de entrada, criação de conta, recuperação de senha e confirmação por código. Montadas com Campo de texto, Botão, Link, Checkbox, Divisor e Código de verificação.

- Variantes · Tela: Entrar, Criar conta, Recuperar senha, Confirmar código

## Como usar

### Telas

Cada tela tem um único objetivo e uma única ação principal.

### Em uso no computador

Tela dividida: a marca à esquerda, o formulário à direita.

### Em uso no celular

No celular, o formulário ocupa a tela toda e os botões ficam em largura total.

## Feito com

Campo de texto, Botão (Primário e Contorno, tamanho G), Link, Checkbox, Divisor com texto e Código de verificação.

## Faça

- Peça só o necessário para criar a conta. O resto pode vir depois.
- Mostre as regras da senha antes do erro, não depois.
- Permita colar senhas e códigos.
- Explique o que acontece depois de cada envio.

## NÃO faça

- Pedir para confirmar o e-mail digitando duas vezes.
- Esconder o link “Esqueci minha senha”.
- Mensagens que revelam se um e-mail já tem conta.
- Captcha logo na primeira tentativa.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
