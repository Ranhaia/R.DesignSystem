# Interface com o R.DS

Este projeto usa o R.DS (Next.js + shadcn/ui + Tailwind v4). Antes de criar ou mudar uma tela,
leia o índice em /llms.txt e, para cada componente usado, o arquivo dele em /ia/componentes/.

Regras que valem sempre:

- Use só componentes que estão no índice. Não invente componente, variante, tamanho nem prop.
- Cor, espaço, raio, texto e tempo só por token (escala do Tailwind ou var(--token)); nunca valor fixo em px, rem ou cor solta.
- Siga as seções "Quando usar", "Quando NÃO usar" e "Acessibilidade" de cada componente: são regras.
- Elemento arredondado dentro de outro não repete o raio de fora (rounded-outer + rounded-inner).
- Se o índice não cobre o caso, avise a pessoa e diga qual foi a escolha mais próxima.

As instruções moram só no R.DS: o projeto não guarda cópia deste arquivo nem do índice.
Leia sempre daqui (C:\dev\R.DS\public\llms.txt, ou /llms.txt no site do DS), para valer a versão atual.
