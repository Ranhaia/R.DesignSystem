# Formatos brasileiros

Conteúdo do PASSI DS 1.1.0 · página "Formatos brasileiros" no arquivo Figma.

Como escrever dinheiro, números, datas, horas, documentos e endereços do jeito que o Brasil lê. No código, use as funções de formatação do navegador com a localidade pt-BR em vez de montar o texto à mão.

## Números, dinheiro e tempo

Ponto separa milhares e vírgula separa decimais.

| Tipo | Formato | Exemplo | No código |
|---|---|---|---|
| Moeda | R$, espaço, valor com 2 casas | R$ 1.234,56 | Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }) |
| Número | Ponto no milhar, vírgula no decimal | 12.345,6 | Intl.NumberFormat('pt-BR') |
| Porcentagem | Número e % sem espaço | 12,5% | Intl.NumberFormat('pt-BR', { style: 'percent' }) |
| Data | dd/mm/aaaa, ou por extenso | 20/10/2026 · 20 de outubro de 2026 | Intl.DateTimeFormat('pt-BR') |
| Hora | 24 horas | 14h30 ou 14:30 | Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }) |
| Tempo relativo | Há ou em, por extenso | há 2 dias · ontem · em 3 horas | Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' }) |
| Plural | 0 e 1 ficam no singular | 0 item · 1 item · 2 itens | Intl.PluralRules('pt-BR') |

## Documentos, telefone e endereço

Mostre o formato na ajuda do campo, aceite colar com ou sem pontuação e coloque a pontuação sozinho.

| Campo | Formato | Exemplo | No código |
|---|---|---|---|
| CPF | 000.000.000-00 | 123.456.789-09 | inputmode='numeric' |
| CNPJ | 00.000.000/0000-00. Desde julho de 2026, novos CNPJs podem ter letras nas 12 primeiras posições | 12.ABC.345/01DE-35 | Aceite letras e números |
| CEP | 00000-000 | 01310-100 | inputmode='numeric', autocomplete='postal-code' |
| Celular | (00) 00000-0000 | (11) 91234-5678 | inputmode='tel', autocomplete='tel' |
| Telefone fixo | (00) 0000-0000 | (11) 3123-4567 | inputmode='tel' |
| Endereço | Rua, número, complemento, bairro, cidade, UF e CEP | Av. Paulista, 1000, apto 12, Bela Vista, São Paulo, SP, 01310-100 | Preencha cidade e UF a partir do CEP |

## Faça

- Use as funções Intl do navegador com pt-BR.
- Aceite colar documentos com ou sem pontos e traços.
- Mostre o exemplo do formato na ajuda do campo.

## NÃO faça

- Bloquear a digitação de quem digita a pontuação.
- Datas no formato americano, como 10/20/2026.
- Montar plural à mão com (s), como 1 item(s).
