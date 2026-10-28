# Tokens de movimento

| Token | CSS | Padrão | Reduzido |
|---|---|---|---|
| duracao/instantanea | `--duracao-instantanea` | 80 ms | 0 ms |
| duracao/rapida | `--duracao-rapida` | 150 ms | 0 ms |
| duracao/media | `--duracao-media` | 250 ms | 0 ms |
| duracao/lenta | `--duracao-lenta` | 400 ms | 0 ms |
| duracao/expressiva | `--duracao-expressiva` | 700 ms | 0 ms |
| curva/padrao | `--curva-padrao` | cubic-bezier(0.2, 0, 0, 1) | igual |
| curva/entrada | `--curva-entrada` | cubic-bezier(0, 0, 0.2, 1) | igual |
| curva/saida | `--curva-saida` | cubic-bezier(0.4, 0, 1, 1) | igual |
| curva/enfatizada | `--curva-enfatizada` | cubic-bezier(0.3, 1.4, 0.5, 1) | igual |

Regras: quanto maior o elemento ou a distância, maior a duração; a maioria das animações fica abaixo de 300 ms; curva de entrada para o que aparece e de saída para o que some. O modo Reduzido zera as durações; o `passi.css` aplica esse modo (com 1 ms) quando a pessoa pede menos movimento no sistema operacional.
