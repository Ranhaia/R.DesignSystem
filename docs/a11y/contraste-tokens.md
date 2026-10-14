# Contraste dos tokens

Gerado por `src/lib/a11y/tokens.test.ts`. Não editar à mão. Perfil: **Standard (AA)** (texto 4,50:1, interface 3,00:1). Razão truncada, nunca arredondada. Cor com transparência composta sobre o fundo. Controle desabilitado é isento (WCAG) e não é medido.

**220 medidas, 36 abaixo do piso.**

## default/claro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#0A0A0A` | `#FFFFFF` | 19,79 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#0A0A0A` | `#FFFFFF` | 19,79 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#0A0A0A` | `#FFFFFF` | 19,79 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#FAFAFA` | `#171717` | 17,17 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#171717` | `#F5F5F5` | 16,44 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#171717` | `#F5F5F5` | 16,44 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#E7000B` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#6F6F6F` | `#FFFFFF` | 5,02 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#6F6F6F` | `#F5F5F5` | 4,60 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#6F6F6F` | `#FFFFFF` | 5,02 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#0A0A0A` | `#FAFAFA` | 18,96 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#FAFAFA` | `#171717` | 17,17 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#171717` | `#D7E8FF` | 14,40 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `#E5E5E5` | `#FFFFFF` | 1,25 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `#E5E5E5` | `#FFFFFF` | 1,25 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `#A1A1A1` | `#FFFFFF` | 2,58 | 3,00 | **reprova** |
| Foco | `--ring` / `--card` | `#A1A1A1` | `#FFFFFF` | 2,58 | 3,00 | **reprova** |
| Foco | `--sidebar-ring` / `--sidebar` | `#A1A1A1` | `#FAFAFA` | 2,47 | 3,00 | **reprova** |
| Ação contra a página | `--primary` / `--background` | `#171717` | `#FFFFFF` | 17,92 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#E7000B` | `#FFFFFF` | 4,76 | 3,00 | passa |

## default/escuro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#FAFAFA` | `#0A0A0A` | 18,96 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#FAFAFA` | `#171717` | 17,17 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#FAFAFA` | `#171717` | 17,17 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#171717` | `#E5E5E5` | 14,23 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#FAFAFA` | `#262626` | 14,49 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#FAFAFA` | `#262626` | 14,49 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#D23943` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#A1A1A1` | `#0A0A0A` | 7,66 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#A1A1A1` | `#262626` | 5,85 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#A1A1A1` | `#171717` | 6,93 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#FAFAFA` | `#171717` | 17,17 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#FAFAFA` | `#1447E6` | 6,54 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#FAFAFA` | `#262626` | 14,49 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `oklch(1 0 0 / 15%)` | `#0A0A0A` | 1,47 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `oklch(1 0 0 / 10%)` | `#0A0A0A` | 1,25 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `#737373` | `#0A0A0A` | 4,17 | 3,00 | passa |
| Foco | `--ring` / `--card` | `#737373` | `#171717` | 3,78 | 3,00 | passa |
| Foco | `--sidebar-ring` / `--sidebar` | `#737373` | `#171717` | 3,78 | 3,00 | passa |
| Ação contra a página | `--primary` / `--background` | `#E5E5E5` | `#0A0A0A` | 15,71 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#D23943` | `#0A0A0A` | 4,15 | 3,00 | passa |

## editorial/claro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#472215` | `#FAF0E8` | 12,40 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#472215` | `#FFFFFF` | 13,92 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#472215` | `#FFFFFF` | 13,92 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#FFF7ED` | `#7E2600` | 9,13 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#472215` | `#F9ECE1` | 12,01 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#472215` | `#F9E3D5` | 11,26 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#E7000B` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#7C5A4D` | `#FAF0E8` | 5,45 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#7C5A4D` | `#FAF0E8` | 5,45 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#7C5A4D` | `#FFFFFF` | 6,12 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#0A0A0A` | `#FAFAFA` | 18,96 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#FFF7ED` | `#7E2600` | 9,13 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#472215` | `#F9E3D5` | 11,26 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `#E2D5CB` | `#FAF0E8` | 1,27 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `#E2D5CB` | `#FAF0E8` | 1,27 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `oklch(0.4 0.13 41 / 40%)` | `#FAF0E8` | 2,12 | 3,00 | **reprova** |
| Foco | `--ring` / `--card` | `oklch(0.4 0.13 41 / 40%)` | `#FFFFFF` | 2,18 | 3,00 | **reprova** |
| Foco | `--sidebar-ring` / `--sidebar` | `#A1A1A1` | `#FAFAFA` | 2,47 | 3,00 | **reprova** |
| Ação contra a página | `--primary` / `--background` | `#7E2600` | `#FAF0E8` | 8,63 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#E7000B` | `#FAF0E8` | 4,24 | 3,00 | passa |

## editorial/escuro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#F9ECE1` | `#1F0E08` | 16,10 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#F9ECE1` | `#2C1A14` | 14,31 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#F9ECE1` | `#2C1A14` | 14,31 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#250F07` | `#EA9952` | 7,97 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#E8DBD1` | `#2E241D` | 11,16 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#F9ECE1` | `#482A1E` | 11,14 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#D23943` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#AD9A8C` | `#1F0E08` | 6,91 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#AD9A8C` | `#36241D` | 5,45 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#AD9A8C` | `#2C1A14` | 6,14 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#FAFAFA` | `#171717` | 17,17 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#250F07` | `#EA9952` | 7,97 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#F9ECE1` | `#482A1E` | 11,14 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `oklch(1 0 0 / 16%)` | `#1F0E08` | 1,58 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `oklch(1 0 0 / 12%)` | `#1F0E08` | 1,37 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `#EA9952` | `#1F0E08` | 8,16 | 3,00 | passa |
| Foco | `--ring` / `--card` | `#EA9952` | `#2C1A14` | 7,25 | 3,00 | passa |
| Foco | `--sidebar-ring` / `--sidebar` | `#EA9952` | `#171717` | 7,83 | 3,00 | passa |
| Ação contra a página | `--primary` / `--background` | `#EA9952` | `#1F0E08` | 8,16 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#D23943` | `#1F0E08` | 3,91 | 3,00 | passa |

## tech/claro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#18181B` | `#E9EFF9` | 15,33 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#18181B` | `#FFFFFF` | 17,71 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#18181B` | `#FFFFFF` | 17,71 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#EFF6FF` | `#1447E6` | 6,27 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#18181B` | `#E4ECF9` | 14,90 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#18181B` | `#DBE5F6` | 13,96 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#E7000B` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#5D646F` | `#E9EFF9` | 5,16 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#5D646F` | `#E9EFF9` | 5,16 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#5D646F` | `#FFFFFF` | 5,96 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#0A0A0A` | `#FAFAFA` | 18,96 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#EFF6FF` | `#1447E6` | 6,27 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#18181B` | `#DBE5F6` | 13,96 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `#0B0B0B` | `#E9EFF9` | 17,03 | 3,00 | passa |
| Limite de controle | `--border` / `--background` | `#0B0B0B` | `#E9EFF9` | 17,03 | 3,00 | passa |
| Foco | `--ring` / `--background` | `oklch(0.488 0.243 264.376 / 50%)` | `#E9EFF9` | 2,31 | 3,00 | **reprova** |
| Foco | `--ring` / `--card` | `oklch(0.488 0.243 264.376 / 50%)` | `#FFFFFF` | 2,44 | 3,00 | **reprova** |
| Foco | `--sidebar-ring` / `--sidebar` | `#A1A1A1` | `#FAFAFA` | 2,47 | 3,00 | **reprova** |
| Ação contra a página | `--primary` / `--background` | `#1447E6` | `#E9EFF9` | 5,91 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#E7000B` | `#E9EFF9` | 4,12 | 3,00 | passa |

## tech/escuro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#D6DFEC` | `#0F1319` | 13,85 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#D6DFEC` | `#171B22` | 12,84 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#D6DFEC` | `#171B22` | 12,84 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#050B18` | `#62B0FF` | 8,59 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#D6DFEC` | `#1E242E` | 11,60 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#D6DFEC` | `#252E3D` | 10,16 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#D23943` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#88909C` | `#0F1319` | 5,77 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#88909C` | `#1E242E` | 4,83 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#88909C` | `#171B22` | 5,35 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#FAFAFA` | `#171717` | 17,17 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#050B18` | `#62B0FF` | 8,59 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#D6DFEC` | `#252E3D` | 10,16 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `oklch(1 0 0 / 25%)` | `#0F1319` | 2,22 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `oklch(1 0 0 / 25%)` | `#0F1319` | 2,22 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `#62B0FF` | `#0F1319` | 8,13 | 3,00 | passa |
| Foco | `--ring` / `--card` | `#62B0FF` | `#171B22` | 7,54 | 3,00 | passa |
| Foco | `--sidebar-ring` / `--sidebar` | `#62B0FF` | `#171717` | 7,83 | 3,00 | passa |
| Ação contra a página | `--primary` / `--background` | `#62B0FF` | `#0F1319` | 8,13 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#D23943` | `#0F1319` | 3,90 | 3,00 | passa |

## soft/claro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#0A0A0A` | `#FFF0F1` | 17,89 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#850E2C` | `#FFFFFF` | 10,01 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#850E2C` | `#FFFFFF` | 10,01 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#FFF9FA` | `#E31A39` | 4,51 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#850E2C` | `#FFEAEB` | 8,69 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#850E2C` | `#FFE1E3` | 8,17 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#E7000B` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#9B5E62` | `#FFF0F1` | 4,55 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#9B5E62` | `#FFF0F1` | 4,55 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#9B5E62` | `#FFFFFF` | 5,03 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#0A0A0A` | `#FAFAFA` | 18,96 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#FFF9FA` | `#E31A39` | 4,51 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#171717` | `#D7E8FF` | 14,40 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `#F8DDDE` | `#FFF0F1` | 1,15 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `#F8DDDE` | `#FFF0F1` | 1,15 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `oklch(0.65 0.19 15 / 35%)` | `#FFF0F1` | 1,50 | 3,00 | **reprova** |
| Foco | `--ring` / `--card` | `oklch(0.65 0.19 15 / 35%)` | `#FFFFFF` | 1,54 | 3,00 | **reprova** |
| Foco | `--sidebar-ring` / `--sidebar` | `#A1A1A1` | `#FAFAFA` | 2,47 | 3,00 | **reprova** |
| Ação contra a página | `--primary` / `--background` | `#E31A39` | `#FFF0F1` | 4,24 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#E7000B` | `#FFF0F1` | 4,31 | 3,00 | passa |

## soft/escuro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#F2E0E0` | `#220B0E` | 14,71 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#F2E0E0` | `#351C1E` | 12,35 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#F2E0E0` | `#351C1E` | 12,35 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#290B0F` | `#FC7182` | 6,80 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#F1D6D8` | `#3A2022` | 10,88 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#F2E0E0` | `#4F2D2F` | 9,44 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#D23943` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#B09798` | `#220B0E` | 6,88 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#B09798` | `#402527` | 5,11 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#B09798` | `#351C1E` | 5,78 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#FAFAFA` | `#171717` | 17,17 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#290B0F` | `#FC7182` | 6,80 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#FAFAFA` | `#262626` | 14,49 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `oklch(1 0 0 / 14%)` | `#220B0E` | 1,46 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `oklch(1 0 0 / 10%)` | `#220B0E` | 1,28 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `#FC7182` | `#220B0E` | 6,97 | 3,00 | passa |
| Foco | `--ring` / `--card` | `#FC7182` | `#351C1E` | 5,85 | 3,00 | passa |
| Foco | `--sidebar-ring` / `--sidebar` | `#FC7182` | `#171717` | 6,67 | 3,00 | passa |
| Ação contra a página | `--primary` / `--background` | `#FC7182` | `#220B0E` | 6,97 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#D23943` | `#220B0E` | 3,92 | 3,00 | passa |

## midnight/claro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#181721` | `#FCFBFF` | 17,22 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#181721` | `#FCFBFF` | 17,22 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#181721` | `#FCFBFF` | 17,22 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#F8F7FF` | `#6D37D2` | 6,31 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#181721` | `#EBEAF5` | 14,88 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#181721` | `#E5E2F4` | 13,95 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#E7000B` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#63616E` | `#FCFBFF` | 5,88 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#63616E` | `#EBEAF5` | 5,08 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#63616E` | `#FCFBFF` | 5,88 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#181721` | `#EBEAF5` | 14,88 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#F8F7FF` | `#6D37D2` | 6,31 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#181721` | `#E5E2F4` | 13,95 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `#D7D5E4` | `#FCFBFF` | 1,40 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `#D7D5E4` | `#FCFBFF` | 1,40 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `oklch(0.5 0.22 292.5 / 40%)` | `#FCFBFF` | 1,94 | 3,00 | **reprova** |
| Foco | `--ring` / `--card` | `oklch(0.5 0.22 292.5 / 40%)` | `#FCFBFF` | 1,94 | 3,00 | **reprova** |
| Foco | `--sidebar-ring` / `--sidebar` | `oklch(0.5 0.22 292.5 / 40%)` | `#EBEAF5` | 1,87 | 3,00 | **reprova** |
| Ação contra a página | `--primary` / `--background` | `#6D37D2` | `#FCFBFF` | 6,51 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#E7000B` | `#FCFBFF` | 4,62 | 3,00 | passa |

## midnight/escuro

| Grupo | Par | Frente | Fundo | Razão | Piso | Resultado |
|---|---|---|---|---|---|---|
| Texto base | `--foreground` / `--background` | `#EDEEF5` | `#0C0D14` | 16,75 | 4,50 | passa |
| Texto base | `--card-foreground` / `--card` | `#EDEEF5` | `#161721` | 15,39 | 4,50 | passa |
| Texto base | `--popover-foreground` / `--popover` | `#EDEEF5` | `#161721` | 15,39 | 4,50 | passa |
| Texto em ação | `--primary-foreground` / `--primary` | `#F8F7FF` | `#7F5CCE` | 4,56 | 4,50 | passa |
| Texto em ação | `--secondary-foreground` / `--secondary` | `#EDEEF5` | `#22232E` | 13,46 | 4,50 | passa |
| Texto em ação | `--accent-foreground` / `--accent` | `#EDEEF5` | `#262738` | 12,69 | 4,50 | passa |
| Texto em ação | `--destructive-foreground` / `--destructive` | `#FAFAFA` | `#D23943` | 4,56 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--background` | `#9597A5` | `#0C0D14` | 6,69 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--muted` | `#9597A5` | `#22232E` | 5,37 | 4,50 | passa |
| Texto de apoio | `--muted-foreground` / `--card` | `#9597A5` | `#161721` | 6,14 | 4,50 | passa |
| Menu lateral | `--sidebar-foreground` / `--sidebar` | `#EDEEF5` | `#06070D` | 17,38 | 4,50 | passa |
| Menu lateral | `--sidebar-primary-foreground` / `--sidebar-primary` | `#F8F7FF` | `#7F5CCE` | 4,56 | 4,50 | passa |
| Menu lateral | `--sidebar-accent-foreground` / `--sidebar-accent` | `#EDEEF5` | `#22232E` | 13,46 | 4,50 | passa |
| IA | `--ai-text-high` / `--ai-surface` | `#1F1254` | `#F8F7FD` | 15,48 | 4,50 | passa |
| IA | `--ai-text-low` / `--ai-surface` | `#452F9D` | `#F8F7FD` | 9,18 | 4,50 | passa |
| Limite de controle | `--input` / `--background` | `oklch(1 0 0 / 16%)` | `#0C0D14` | 1,55 | 3,00 | **dúvida** |
| Limite de controle | `--border` / `--background` | `oklch(1 0 0 / 12%)` | `#0C0D14` | 1,35 | 3,00 | **dúvida** |
| Foco | `--ring` / `--background` | `oklch(0.72 0.19 292.5 / 45%)` | `#0C0D14` | 2,32 | 3,00 | **reprova** |
| Foco | `--ring` / `--card` | `oklch(0.72 0.19 292.5 / 45%)` | `#161721` | 2,32 | 3,00 | **reprova** |
| Foco | `--sidebar-ring` / `--sidebar` | `oklch(0.72 0.19 292.5 / 45%)` | `#06070D` | 2,28 | 3,00 | **reprova** |
| Ação contra a página | `--primary` / `--background` | `#7F5CCE` | `#0C0D14` | 3,99 | 3,00 | passa |
| Ação contra a página | `--destructive` / `--background` | `#D23943` | `#0C0D14` | 4,06 | 3,00 | passa |

## Dúvidas de leitura do critério

- Com rótulo visível, a borda pode não ser o único limite do campo (SC 1.4.11). Reprovação vira dúvida no A11Y-DECISIONS.md.
