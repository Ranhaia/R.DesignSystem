# Selo

Componente do PASSI DS 1.1.0 · página "Selo" no arquivo Figma.

O selo mostra o status ou a categoria de algo, como “Publicado” ou “Em revisão”. Ele só informa, não é clicável. O contador mostra quantidades, como notificações novas.

## Selo

Selo · rótulo curto de status ou categoria, só para leitura (não é clicável). Use Sutil na maior parte das vezes e Forte para chamar atenção.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Texto | Texto |  | Novo |
| Mostrar ponto | Liga/desliga |  | Ligado |
| Cor | Variante | Neutro, Marca, Sucesso, Alerta, Erro | Neutro |
| Estilo | Variante | Sutil, Forte | Sutil |

## Contador

Contador · número pequeno sobre ícones e abas, como notificações não lidas. Acima de 99, mostre “99+”.

| Propriedade | Tipo | Opções | Padrão |
|---|---|---|---|
| Número | Texto |  | 3 |
| Cor | Variante | Marca, Erro, Neutro | Marca |

## Como usar

### Cores e estilos

A cor sempre vem acompanhada de texto, para não depender só dela.

Exemplos no Figma: Sutil · Neutro; Sutil · Marca; Sutil · Sucesso; Sutil · Alerta; Sutil · Erro; Forte · Neutro; Forte · Marca; Forte · Sucesso; Forte · Alerta; Forte · Erro.

### Sem ponto

### Contador

Fica sobre ícones, abas e itens de menu.

Exemplos no Figma: Marca; Erro; Neutro.

## Conteúdo

Como escrever os textos deste componente. Regras gerais em [conteudo/microtexto.md](../conteudo/microtexto.md) e [conteudo/glossario.md](../conteudo/glossario.md).

- Uma ou duas palavras que dizem o estado: Publicado, Em revisão.
- Use sempre o mesmo nome para o mesmo status.

## Acessibilidade

Meta: WCAG 2.2 AA, base da ABNT NBR 17225. Contraste, anel de foco e modos em [fundamentos/acessibilidade.md](../fundamentos/acessibilidade.md).

- Teclado: Não recebe foco: só informa.
- Leitor de tela: Lido como texto comum. O contador precisa de contexto em texto, por exemplo 3 notificações novas, e não só o número.
- Foco: Nenhum.
- Cuidados: Status nunca só pela cor: o texto do selo diz o estado. Quando o número muda enquanto a pessoa usa a tela, anuncie de forma discreta.

## Tokens usados

Sutil: cor/fundo/*-sutil com cor/texto/* da mesma família. Forte: cor/fundo/marca, sucesso, alerta, erro e invertido. Canto: raio/pilula.

No código, troque a barra por hífen e use o prefixo da coleção: cor/fundo/marca vira `var(--cor-fundo-marca)` e espaco/4 vira `var(--espaco-4)`.

## Faça

- Use uma ou duas palavras.
- Mantenha o mesmo significado de cor em todo o produto.
- Prefira o estilo Sutil; reserve o Forte para o que exige atenção.

## NÃO faça

- Usar selo como botão ou filtro clicável. Para isso use Etiqueta.
- Muitos selos fortes na mesma tela.
- Criar cores novas fora das cinco definidas.

## Regras gerais

- Cores, espaços, cantos e sombras vêm sempre dos tokens (`var(--cor-…)`, `var(--espaco-…)`, `var(--raio-…)`). Nunca use códigos de cor soltos.
- O componente funciona no claro e no escuro sem mudanças: as cores mudam pelos tokens.
- Foco visível em tudo o que é clicável: anel de 2 px em `--cor-borda-foco`, afastado 2 px. Área de toque de pelo menos 24 px, e 40 px no celular.
- Elementos clicáveis têm cinco estados: padrão, hover, pressionado, foco e desabilitado.
- A cor nunca é o único sinal: estados usam também ícone, forma ou texto.
