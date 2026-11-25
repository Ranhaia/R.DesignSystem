---
slug: icon
nome: Icon
camada: primitive
codigo: src/components/ui/icon.tsx
story: src/components/ui/icon.stories.tsx
status: piloto
sinonimos: [icone, ícone, simbolo, símbolo]
vizinhos: [icon-button, button, spinner]
referencias: [shadcn:icon]
---

# Icon

Renderiza um glifo do Material Symbols com controle de eixos variáveis e suporte a cor do tema. Usado para apoiar ações, estados e navegação.

## Quando usar

- Ilustrar ações e comandos dentro de botões, menus e barras de ferramentas.
- Reforçar o significado visual de alertas, badges e itens de listas informativas.
- Indicar estados do sistema como sucesso, erro ou aviso ao lado de texto explicativo.

## Quando NÃO usar

- Ação interativa que contém apenas o ícone, sem texto → `icon-button`.
- Disparar uma ação com texto e ícone de suporte → `button`.
- Indicar espera ou carregamento contínuo sem direção definida → `spinner`.

## Anatomia

| Parte | O que é |
|---|---|
| `Icon` | Elemento raiz SVG com data-slot="icon" que gerencia acessibilidade e dimensões |
| Glifo | Elemento de texto interno que renderiza a ligadura do Material Symbols |

## Composição

Não usa outro componente do R.DS.

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `name` | `MaterialSymbol` | — | Nome do símbolo no catálogo do Google Material Symbols |
| `size` | `number` | — | Tamanho do ícone em rem. Quando omitido, herda a dimensão do elemento pai |
| `fill` | `boolean` | — | Ativa o preenchimento do glifo quando verdadeiro, ou contorno quando falso |
| `rounded` | `boolean` | — | Alterna entre as famílias Material Symbols Rounded e Sharp |
| `weight` | `number` | — | Espessura do traço do símbolo (eixo wght da fonte variável) |
| `grade` | `number` | — | Ajuste fino de ênfase visual do glifo (eixo GRAD) |
| `opticalSize` | `number` | — | Tamanho óptico (eixo opsz), calculado automaticamente quando size é informado |

## Variantes

Nenhuma via CVA. O estilo é configurado pelos eixos variáveis e pelas props rounded e fill.

## Tamanhos

Nenhum pré-definido via CVA. Herda o tamanho ambiente do container ou aceita valor numérico em rem via prop size.

## Estados

Só leitura: não recebe foco.

## Conteúdo

- Não tem texto legível próprio; renderiza um símbolo visual.
- Deve sempre acompanhar texto de apoio ou receber rótulo acessível quando utilizado em elementos interativos.
- Mantenha o mesmo estilo e família de ícones em todo o fluxo da interface.

## Acessibilidade

- **Teclado:** Não recebe foco diretamente. Quando inserido dentro de um controle interativo, o foco é tratado pelo componente pai.
- **Leitor de tela:** Recebe aria-hidden="true" por padrão para ser ignorado como elemento decorativo. Se atributos como aria-label, aria-labelledby ou role forem fornecidos, eles são preservados no SVG.
- **Foco:** Não recebe nem retém foco.
- **Cuidados:** Nunca transmita uma informação crítica apenas pela presença do ícone sem alternativa em texto visível ou audível (WCAG 1.1.1 e 1.4.1).

## Tokens usados

- **Ícone:** `--font-material-rounded` `--font-material-sharp`
  `--icon-fill` `--icon-font-family` `--icon-grade`
  `--icon-optical-size` `--icon-weight`

## Faça

- Acompanhe o ícone de texto explicativo sempre que o significado não for universal.
- Use aria-hidden="true" para ícones puramente decorativos ao lado de rótulos de texto.
- Defina tamanhos proporcionais à escala tipográfica do elemento pai ou contexto visual.

## NÃO faça

- Usar ícone isolado sem rótulo textual em um botão interativo → `icon-button` com aria-label.
- Usar cor ou ícone como único indicador de status crítico ou erro → combine com mensagem textual clara.
- Utilizar ícone estático para indicar espera ou carregamento em andamento → `spinner`.

## Exemplo mínimo

```tsx
import { Icon } from "@/components/ui/icon"

<Icon name="check_circle" className="size-5 text-primary" />
```
