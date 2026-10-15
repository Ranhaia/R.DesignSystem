# Relatório de acessibilidade — Componentes

Gerado por `npm run test:a11y:todos`. Não editar à mão. Perfil: **Standard (AA)** (alvo mínimo 24×24, foco contorno ≥ 2px e ≥ 3:1).
Contextos medidos: default/claro, default/escuro, editorial/claro, editorial/escuro, tech/claro, tech/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro.
Isenções consideradas: controles desabilitados, link em texto corrido. Coluna *na base* entra na Fase 3.

## Resumo

- **Stories × Contextos:** 3851 medições (386 stories em 10 contextos)
- **Componentes:** 94 componentes (35 reprovaram WCAG, 42 passaram com Regra da Casa 🟡, 17 passaram limpos)
- **Falhas WCAG:** 528
- **Regras da Casa (🟡):** 717

## Causas comuns

| Critério | Motivo | Cor / Fundo | Ocorrências | Componentes | Stories |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | alvo menor que 44×44 | - | 4725 | 63 | 204 |
| Regra da Casa (Alvo) | exceção de espaçamento | - | 800 | 10 | 30 |
| axe: button-name | Buttons must have discernible text | - | 280 | 11 | 28 |
| WCAG 2.4.7 (Foco) | foco só por preenchimento ou invisível | - | 280 | 7 | 19 |
| axe: label | Form elements must have labels | - | 60 | 3 | 6 |
| axe: select-name | Select element must have an accessible name | - | 60 | 1 | 6 |
| axe: aria-progressbar-name | ARIA progressbar nodes must have an accessible name | - | 40 | 4 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#C99B8B` / `#F6F3F2` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#8A6361` / `#151313` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#6E688A` / `#131315` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#A9A8A7` / `#F5F3F1` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#85A0EF` / `#F2F4F6` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#5F6D8A` / `#121315` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#6D6C6B` / `#141311` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#8A6457` / `#151312` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#B296E5` / `#F4F3F6` | 34 | 8 | 24 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#DA798E` / `#F6F3F2` | 34 | 8 | 24 |
| axe: scrollable-region-focusable | Scrollable region must have keyboard access | - | 31 | 2 | 4 |
| axe: aria-dialog-name | ARIA dialog and alertdialog nodes should have an accessible name | - | 30 | 2 | 3 |
| axe: aria-required-children | Certain ARIA roles must contain particular children | - | 30 | 2 | 3 |
| axe: aria-allowed-role | ARIA role should be appropriate for the element | - | 10 | 1 | 1 |
| axe: aria-hidden-focus | ARIA hidden element must not be focusable or contain focusable elements | - | 10 | 1 | 1 |
| axe: aria-input-field-name | ARIA input fields must have an accessible name | - | 10 | 1 | 1 |
| axe: nested-interactive | Interactive controls must not be nested | - | 10 | 1 | 1 |
| axe: image-alt | Images must have alternative text | - | 7 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#9D4323` / `#F6F3F2` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#FFFFFF` / `#151313` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#FFFFFF` / `#131315` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#5E5E5E` / `#F5F3F1` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#174CEA` / `#F2F4F6` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#FFFFFF` / `#121315` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#FFFFFF` / `#141311` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#FFFFFF` / `#151312` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#6F3AD5` / `#F4F3F6` | 6 | 1 | 4 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#BF002A` / `#F6F3F2` | 6 | 1 | 4 |
| axe: color-contrast | Elements must meet minimum color contrast ratio thresholds | - | 5 | 5 | 5 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#CC9F8F` / `#FCFBFB` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#926A68` / `#242121` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#766F92` / `#222123` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#ADADAC` / `#FCFCFB` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#89A4F2` / `#FBFCFC` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#667592` / `#212224` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#747372` / `#23211F` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#926B5E` / `#232120` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#B69AE8` / `#FCFBFC` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#DD7D92` / `#FCFBFB` | 4 | 1 | 2 |
| WCAG 2.4.7 (Foco) | contraste 1,4:1 (mínimo 3:1) | `#EAC7C9` / `#F6F3F2` | 2 | 1 | 1 |
| axe: aria-valid-attr-value | ARIA attributes must conform to valid values | - | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#CEA191` / `#FFFFFF` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#916967` / `#221F1F` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#756E90` / `#201F21` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#AEAEAE` / `#FFFFFF` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#8BA5F4` / `#FFFFFF` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#657491` / `#1F2022` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#737271` / `#201F1D` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#906A5D` / `#211F1E` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#B79CEA` / `#FFFFFF` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contorno de 1px (mínimo 2px) | `#DF7F94` / `#FFFFFF` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contraste 1,4:1 (mínimo 3:1) | `#E9C7C8` / `#F5F3F1` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contraste 1,4:1 (mínimo 3:1) | `#E7C8CC` / `#F2F4F6` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contraste 1,41:1 (mínimo 3:1) | `#E8C7CC` / `#F4F3F6` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contraste 1,45:1 (mínimo 3:1) | `#5B1D21` / `#131315` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contraste 1,45:1 (mínimo 3:1) | `#5B1D21` / `#121315` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contraste 1,45:1 (mínimo 3:1) | `#5C1D1E` / `#141311` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contraste 1,46:1 (mínimo 3:1) | `#5D1D1F` / `#151313` | 1 | 1 | 1 |
| WCAG 2.4.7 (Foco) | contraste 1,46:1 (mínimo 3:1) | `#5D1D1F` / `#151312` | 1 | 1 | 1 |

## Visão geral por componente

| Componente | Resultado | Falhas WCAG | Regra da Casa |
|---|---|---|---|
| atoms-aspect-ratio | passou | 0 | 0 |
| atoms-avatar | passou | 0 | 0 |
| atoms-badge | reprovou | 1 | 0 |
| atoms-box | passou | 0 | 0 |
| atoms-button | reprovou | 1 | 22 |
| atoms-checkbox | passou (🟡) | 0 | 3 |
| atoms-chip | reprovou | 1 | 3 |
| atoms-file-uploader | reprovou | 50 | 0 |
| atoms-icon | reprovou | 10 | 2 |
| atoms-icon-button | passou (🟡) | 0 | 12 |
| atoms-input | passou (🟡) | 0 | 10 |
| atoms-input-otp | reprovou | 8 | 4 |
| atoms-item | reprovou | 5 | 14 |
| atoms-kbd | passou (🟡) | 0 | 10 |
| atoms-label | passou (🟡) | 0 | 1 |
| atoms-link | passou (🟡) | 0 | 6 |
| atoms-list | passou | 0 | 0 |
| atoms-marker | passou | 0 | 0 |
| atoms-multiselect | reprovou | 1 | 3 |
| atoms-native-select | reprovou | 15 | 12 |
| atoms-popover | passou (🟡) | 0 | 2 |
| atoms-progress | reprovou | 1 | 0 |
| atoms-radio-group | passou (🟡) | 0 | 2 |
| atoms-select | reprovou | 5 | 8 |
| atoms-separator | passou | 0 | 0 |
| atoms-skeleton | passou | 0 | 0 |
| atoms-slider | reprovou | 1 | 0 |
| atoms-spinner | reprovou | 1 | 5 |
| atoms-switch | reprovou | 4 | 4 |
| atoms-tag | passou | 0 | 0 |
| atoms-text | passou | 0 | 0 |
| atoms-textarea | passou (🟡) | 0 | 1 |
| atoms-thumbnail | passou | 0 | 0 |
| atoms-title | passou | 0 | 0 |
| atoms-toggle | passou (🟡) | 0 | 9 |
| atoms-tooltip | passou (🟡) | 0 | 2 |
| atoms-treeselect | reprovou | 48 | 18 |
| molecules-alert | passou | 0 | 0 |
| molecules-attachment | passou (🟡) | 0 | 1 |
| molecules-breadcrumb | reprovou | 140 | 14 |
| molecules-button-group | reprovou | 6 | 59 |
| molecules-collapsible | passou (🟡) | 0 | 1 |
| molecules-combobox | reprovou | 2 | 4 |
| molecules-empty | reprovou | 10 | 12 |
| molecules-field | reprovou | 12 | 25 |
| molecules-hover-card | passou (🟡) | 0 | 1 |
| molecules-input-group | reprovou | 5 | 50 |
| molecules-pagination | passou (🟡) | 0 | 5 |
| molecules-scroll-area | reprovou | 2 | 0 |
| molecules-segmentedcontrol | passou (🟡) | 0 | 24 |
| molecules-sonner | passou (🟡) | 0 | 14 |
| molecules-splitbutton | passou (🟡) | 0 | 11 |
| molecules-toggle-group | passou (🟡) | 0 | 27 |
| organisms-accordion | passou | 0 | 0 |
| organisms-alert-dialog | passou (🟡) | 0 | 2 |
| organisms-bubble | passou | 0 | 0 |
| organisms-calendar | reprovou | 20 | 37 |
| organisms-card | reprovou | 10 | 15 |
| organisms-carousel | passou (🟡) | 0 | 6 |
| organisms-chart | reprovou | 5 | 0 |
| organisms-command | reprovou | 2 | 12 |
| organisms-context-menu | passou | 0 | 0 |
| organisms-dialog | passou (🟡) | 0 | 4 |
| organisms-drawer | passou (🟡) | 0 | 4 |
| organisms-dropdown-menu | passou (🟡) | 0 | 7 |
| organisms-form | reprovou | 3 | 54 |
| organisms-menubar | reprovou | 1 | 4 |
| organisms-message | passou | 0 | 0 |
| organisms-navigation-menu | passou (🟡) | 0 | 6 |
| organisms-resizable | reprovou | 40 | 0 |
| organisms-sheet | passou (🟡) | 0 | 6 |
| organisms-sidebar | passou (🟡) | 0 | 3 |
| organisms-stepper | passou (🟡) | 0 | 1 |
| organisms-table | passou | 0 | 0 |
| organisms-tabs | reprovou | 2 | 7 |
| organisms-timepicker | passou (🟡) | 0 | 4 |
| patterns-confirmation-dialog | passou (🟡) | 0 | 2 |
| patterns-crud | passou (🟡) | 0 | 5 |
| patterns-delete-flow | passou (🟡) | 0 | 2 |
| patterns-empty-state | passou (🟡) | 0 | 1 |
| patterns-error-state | passou (🟡) | 0 | 2 |
| patterns-filter-panel | reprovou | 1 | 9 |
| patterns-filters | passou (🟡) | 0 | 2 |
| patterns-infinite-scroll | passou (🟡) | 0 | 2 |
| patterns-loading | passou (🟡) | 0 | 2 |
| patterns-multi-step-form | reprovou | 1 | 3 |
| patterns-pagination | passou (🟡) | 0 | 7 |
| patterns-search-experience | passou (🟡) | 0 | 2 |
| patterns-skeleton | passou (🟡) | 0 | 2 |
| patterns-success-feedback | passou (🟡) | 0 | 1 |
| patterns-toast-strategy | passou (🟡) | 0 | 10 |
| patterns-upload | reprovou | 22 | 0 |
| testes-adaptação-à-tela | reprovou | 90 | 79 |
| testes-raio-concêntrico | reprovou | 2 | 13 |

## Detalhes por componente

### atoms-badge

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: color-contrast | séria | examples | `.bg-blue-500` | Elements must meet minimum color contrast ratio thresholds | default/claro |

### atoms-button

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | as-child | `a[data-slot=button] "Entrar"` | 70,2×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Button"` | 75,2×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | destructive | `button[data-slot=button] "Button"` | 75,2×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | elevation-feedback | `button[data-slot=button] "Passe o mouse para ver o feedb"` | 254,1×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=button] "Botão"` | 71,5×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=button] "Botão"` | 73,5×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=button] "Enviar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | ghost | `button[data-slot=button] "Button"` | 75,2×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | icon-and-label | `button[data-slot=button] "downloadBaixar"` | 86,9×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | icon-only | `button[data-slot=button] "Excluir"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | label-only | `button[data-slot=button] "Confirmar"` | 95,8×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | link | `button[data-slot=button] "Button"` | 75,2×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=button] "Button"` | 77,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=button] "Button"` | 79,2×40 (< 44×44) | tech/claro, tech/escuro |
| axe: button-name | crítica | rounded | `.inline-flex` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | rounded | `button[data-slot=button] "arrow_upward"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | secondary | `button[data-slot=button] "Button"` | 75,2×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size-showcase | `button[data-slot=button] "Enviar"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size-showcase | `button[data-slot=button] "Enviar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size-showcase | `button[data-slot=button] "Padrão"` | 78,4×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size-showcase | `button[data-slot=button] "Padrão"` | 80,4×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | size-showcase | `button[data-slot=button] "Pequeno"` | 81,7×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size-showcase | `button[data-slot=button] "Pequeno"` | 83,7×32 (< 44×44) | tech/claro, tech/escuro |

### atoms-checkbox

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=checkbox][role=checkbox]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=checkbox][role=checkbox] "check"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-text | `button[data-slot=checkbox][role=checkbox]` | 16×16 (exceção de espaçamento, < 44×44) | todos |

### atoms-chip

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: color-contrast | séria | disabled | `.min-h-6` | Elements must meet minimum color contrast ratio thresholds | default/claro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=button] "Remover"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | removable | `button[data-slot=button] "Remover"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-icon | `button[data-slot=button] "Remover"` | 24×24 (< 44×44) | todos |

### atoms-file-uploader

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | accept-images | `input` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | examples | `input` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | multiple | `input` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | with-max-size | `input` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |

### atoms-icon

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | auto-tamanho-ambiente | `button "downloadBaixar"` | 88,2×38 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | auto-tamanho-ambiente | `button "downloadBaixar"` | 90,2×40 (< 44×44) | tech/claro, tech/escuro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | auto-tamanho-ambiente | `button "downloadBaixar"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |

### atoms-icon-button

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=icon-button] "Favoritar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | destructive | `button[data-slot=icon-button] "Excluir"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=icon-button] "Baixar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=icon-button] "Excluir"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=icon-button] "Favoritar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=icon-button] "Fechar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=icon-button] "Mais opções"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | ghost | `button[data-slot=icon-button] "Favoritar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=icon-button] "Favoritar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | secondary | `button[data-slot=icon-button] "Favoritar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size-sm | `button[data-slot=icon-button] "Favoritar"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size-xs | `button[data-slot=icon-button] "Favoritar"` | 24×24 (< 44×44) | todos |

### atoms-input

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 1200×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | file | `input[data-slot=input]` | 384×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | fixed-label | `input[data-slot=input]` | 384×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | floating-label | `input[data-slot=input]` | 384×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-button | `button[data-slot=button] "Inscrever-se"` | 109,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-button | `button[data-slot=button] "Inscrever-se"` | 111,3×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-button | `input[data-slot=input]` | 264,7×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-button | `input[data-slot=input]` | 266,7×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-label | `input[data-slot=input]` | 384×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-text | `input[data-slot=input]` | 384×36 (< 44×44) | todos |

### atoms-input-otp

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: label | crítica | controlled | `input` | Form elements must have labels | todos |
| Regra da Casa (Alvo) | 🟡 | controlled | `input[data-slot=input-otp]` | 1200×36 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | controlled | `input[data-slot=input-otp]` | foco só por preenchimento ou invisível | todos |
| axe: label | crítica | default | `input` | Form elements must have labels | todos |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-otp]` | 1200×36 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | default | `input[data-slot=input-otp]` | foco só por preenchimento ou invisível | todos |
| axe: label | crítica | pattern | `input` | Form elements must have labels | todos |
| Regra da Casa (Alvo) | 🟡 | pattern | `input[data-slot=input-otp]` | 1200×36 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | pattern | `input[data-slot=input-otp]` | foco só por preenchimento ou invisível | todos |
| axe: label | crítica | with-separator | `input` | Form elements must have labels | todos |
| Regra da Casa (Alvo) | 🟡 | with-separator | `input[data-slot=input-otp]` | 1200×36 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | with-separator | `input[data-slot=input-otp]` | foco só por preenchimento ou invisível | todos |

### atoms-item

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=button] "Ação"` | 57,7×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=button] "Ação"` | 59,7×32 (< 44×44) | tech/claro, tech/escuro |
| axe: aria-required-children | crítica | group | `.group\/item-group` | Certain ARIA roles must contain particular children | todos |
| axe: button-name | crítica | group | `.group\/item.flex-wrap.rounded-md:nth-child(1) > .gap-2.items-center[data-slot="item-actions"] > .inline-flex.whitespace-nowrap.transition-all .group\/item.flex-wrap.rounded-md:nth-child(3) > .gap-2.items-center[data-slot="item-actions"] > .inline-flex.whitespace-nowrap.transition-all .group\/item.flex-wrap.rounded-md:nth-child(5) > .gap-2.items-center[data-slot="item-actions"] > .inline-flex.whitespace-nowrap.transition-all` | Buttons must have discernible text | todos |
| axe: image-alt | crítica | group | `img[src$="shadcn.png"] .group\/item.flex-wrap.rounded-md:nth-child(3) > .group-has-\[\[data-slot\=item-description\]\]\/item\:translate-y-0\.5.group-has-\[\[data-slot\=item-description\]\]\/item\:self-start[data-slot="item-media"] > .group\/avatar.relative.size-8 > img .group\/item.flex-wrap.rounded-md:nth-child(5) > .group-has-\[\[data-slot\=item-description\]\]\/item\:translate-y-0\.5.group-has-\[\[data-slot\=item-description\]\]\/item\:self-start[data-slot="item-media"] > .group\/avatar.relative.size-8 > img` | Images must have alternative text | editorial/claro, editorial/escuro, tech/claro, tech/escuro, soft/claro, soft/escuro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | group | `button[data-slot=button] "add"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size-showcase | `button[data-slot=button] "Ação"` | 57,7×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size-showcase | `button[data-slot=button] "Ação"` | 59,7×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | variant-showcase | `button[data-slot=button] "Abrir"` | 57,9×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | variant-showcase | `button[data-slot=button] "Abrir"` | 59,9×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-avatar | `button[data-slot=button] "Convidar"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-avatar | `button[data-slot=button] "Convidar"` | 82,9×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-avatar | `button[data-slot=button] "Convidar"` | 84,9×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-dropdown | `button[data-slot=dropdown-menu-trigger] "Selecionar keyboard_arrow_down"` | 109,4×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-dropdown | `button[data-slot=dropdown-menu-trigger] "Selecionar keyboard_arrow_down"` | 111,4×32 (< 44×44) | tech/claro, tech/escuro |
| axe: aria-required-children | crítica | with-header | `.group\/item-group` | Certain ARIA roles must contain particular children | todos |
| Regra da Casa (Alvo) | 🟡 | with-icon | `button[data-slot=button] "Revisar"` | 71,1×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-icon | `button[data-slot=button] "Revisar"` | 73,1×32 (< 44×44) | tech/claro, tech/escuro |
| axe: aria-allowed-role | leve | with-image | `.group\/item.flex-wrap.rounded-md:nth-child(1) .group\/item.flex-wrap.rounded-md:nth-child(2) .group\/item.flex-wrap.rounded-md:nth-child(3)` | ARIA role should be appropriate for the element | todos |

### atoms-kbd

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | with-button | `button[data-slot=button] "Aceitar ⏎"` | 92,6×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-button | `button[data-slot=button] "Aceitar ⏎"` | 94,6×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-button | `button[data-slot=button] "Cancelar Esc"` | 107,4×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-button | `button[data-slot=button] "Cancelar Esc"` | 109,4×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-input-group | `input[data-slot=input-group-control]` | 233,6×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-input-group | `input[data-slot=input-group-control]` | 235,6×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-tooltip | `button[data-slot=tooltip-trigger] "Imprimir"` | 80×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-tooltip | `button[data-slot=tooltip-trigger] "Imprimir"` | 81×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-tooltip | `button[data-slot=tooltip-trigger] "Salvar"` | 64×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-tooltip | `button[data-slot=tooltip-trigger] "Salvar"` | 66×32 (< 44×44) | tech/claro, tech/escuro |

### atoms-label

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=checkbox][role=checkbox]` | 16×16 (exceção de espaçamento, < 44×44) | todos |

### atoms-link

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=link] "Saiba mais"` | 99,4×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `a[data-slot=link] "Link externoopen_in_new"` | 126,5×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `a[data-slot=link] "Link padrão"` | 106,7×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `a[data-slot=link] "Link pequeno"` | 110,3×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | external | `a[data-slot=link] "Saiba maisopen_in_new"` | 115,4×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | small | `a[data-slot=link] "Saiba mais"` | 91,4×32 (< 44×44) | todos |

### atoms-multiselect

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: button-name | crítica | default | `.h-\[calc\(--spacing\(5\.5\)\)\].w-fit.gap-1:nth-child(1) > .inline-flex.gap-2.transition-all .h-\[calc\(--spacing\(5\.5\)\)\].w-fit.gap-1:nth-child(2) > .inline-flex.gap-2.transition-all` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=combobox-chip-remove] "close"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=combobox-chip-input][role=combobox] "Ramos de seguro"` | 1061,2×20 (exceção de espaçamento, < 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=combobox-chip-input][role=combobox] "Ramos de seguro"` | 1063,2×20 (exceção de espaçamento, < 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |

### atoms-native-select

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: select-name | crítica | default | `select` | Select element must have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | default | `select[data-slot=native-select] "Opção 1Opção 2"` | 102×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `select[data-slot=native-select] "Opção 1Opção 2"` | 104×36 (< 44×44) | tech/claro, tech/escuro |
| axe: select-name | crítica | disabled | `select` | Select element must have an accessible name | todos |
| axe: select-name | crítica | examples | `select` | Select element must have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `select[data-slot=native-select] "Selecionar statusA fazerEm and"` | 154×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `select[data-slot=native-select] "Selecionar statusA fazerEm and"` | 156×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | fixed-label | `select[data-slot=native-select] "BrasilPortugal"` | 224×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | floating-label | `select[data-slot=native-select] "SelecioneBrasilPortugal"` | 224×36 (< 44×44) | todos |
| axe: select-name | crítica | groups | `select` | Select element must have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | groups | `select[data-slot=native-select] "Selecionar departamentoFronten"` | 221×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | groups | `select[data-slot=native-select] "Selecionar departamentoFronten"` | 223×36 (< 44×44) | tech/claro, tech/escuro |
| axe: select-name | crítica | invalid | `select` | Select element must have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | 160×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | 162×36 (< 44×44) | tech/claro, tech/escuro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,4:1 (mínimo 3:1) (#E7C8CC sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,4:1 (mínimo 3:1) (#E9C7C8 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,4:1 (mínimo 3:1) (#EAC7C9 sobre #F6F3F2) | editorial/claro, soft/claro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,41:1 (mínimo 3:1) (#E8C7CC sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,45:1 (mínimo 3:1) (#5B1D21 sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,45:1 (mínimo 3:1) (#5B1D21 sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,45:1 (mínimo 3:1) (#5C1D1E sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,46:1 (mínimo 3:1) (#5D1D1F sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | invalid | `select[data-slot=native-select] "Selecionar funçãoAdministrador"` | contraste 1,46:1 (mínimo 3:1) (#5D1D1F sobre #151313) | soft/escuro |
| axe: select-name | crítica | small | `select` | Select element must have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | small | `select[data-slot=native-select] "Opção 1Opção 2"` | 102×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | small | `select[data-slot=native-select] "Opção 1Opção 2"` | 104×32 (< 44×44) | tech/claro, tech/escuro |

### atoms-popover

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "Abrir popover"` | 122,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "Abrir popover"` | 124,9×40 (< 44×44) | tech/claro, tech/escuro |

### atoms-progress

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: aria-progressbar-name | séria | default | `.relative` | ARIA progressbar nodes must have an accessible name | todos |

### atoms-radio-group

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=radio-group-item][role=radio]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=radio-group-item][role=radio] "circle"` | 16×16 (exceção de espaçamento, < 44×44) | todos |

### atoms-select

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: button-name | crítica | default | `.flex` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=select-trigger][role=combobox] "Selecionekeyboard_arrow_down"` | 108,8×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=select-trigger][role=combobox] "Selecionekeyboard_arrow_down"` | 110,8×36 (< 44×44) | tech/claro, tech/escuro |
| axe: button-name | crítica | disabled | `.flex` | Buttons must have discernible text | todos |
| axe: button-name | crítica | examples | `.flex` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=select-trigger][role=combobox] "Selecione uma frutakeyboard_ar"` | 180×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | fixed-label | `button[data-slot=select-trigger][role=combobox] "Selecione um planokeyboard_arr"` | 224×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | floating-label | `button[data-slot=select-trigger][role=combobox] "Selecione um planokeyboard_arr"` | 224×36 (< 44×44) | todos |
| axe: button-name | crítica | scrollable | `.flex` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | scrollable | `button[data-slot=select-trigger][role=combobox] "Selecione um fuso horáriokeybo"` | 280×36 (< 44×44) | todos |
| axe: button-name | crítica | small | `.flex` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=select-trigger][role=combobox] "Selecionekeyboard_arrow_down"` | 108,8×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=select-trigger][role=combobox] "Selecionekeyboard_arrow_down"` | 110,8×32 (< 44×44) | tech/claro, tech/escuro |

### atoms-slider

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: aria-input-field-name | séria | default | `.block` | ARIA input fields must have an accessible name | todos |

### atoms-spinner

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | empty | `button[data-slot=button] "Cancelar"` | 80,3×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | empty | `button[data-slot=button] "Cancelar"` | 82,3×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | input-group | `button[data-slot=button] "arrow_upwardEnviar"` | 30×24 (< 44×44) | todos |
| axe: aria-progressbar-name | séria | item | `.relative` | ARIA progressbar nodes must have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | item | `button[data-slot=button] "Cancelar"` | 80,3×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | item | `button[data-slot=button] "Cancelar"` | 82,3×32 (< 44×44) | tech/claro, tech/escuro |

### atoms-switch

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: button-name | crítica | checked | `.peer` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | checked | `button[data-slot=switch][role=switch]` | 32×18,4 (exceção de espaçamento, < 44×44) | todos |
| axe: button-name | crítica | default | `.peer` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=switch][role=switch]` | 32×18,4 (exceção de espaçamento, < 44×44) | todos |
| axe: button-name | crítica | disabled | `.peer` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=switch][role=switch]` | 32×18,4 (exceção de espaçamento, < 44×44) | todos |
| axe: button-name | crítica | small | `.peer` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=switch][role=switch]` | 24×14 (exceção de espaçamento, < 44×44) | todos |

### atoms-textarea

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | with-button | `button[data-slot=button] "Enviar mensagem"` | 1200×40 (< 44×44) | todos |

### atoms-toggle

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=toggle] "Aa"` | 36×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=toggle] "Alternar favorito"` | 87,6×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=toggle] "Alternar favorito"` | 89,6×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=toggle] "Alternar itálico"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=toggle] "Aa"` | 36,2×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=toggle] "Aa"` | 36×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | pressed | `button[data-slot=toggle] "Aa"` | 36×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=toggle] "Alternar itálico"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-text | `button[data-slot=toggle] "Alternar itálico"` | 77×36 (< 44×44) | todos |

### atoms-tooltip

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=tooltip-trigger] "Passe o mouse"` | 127,1×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=tooltip-trigger] "Passe o mouse"` | 129,1×40 (< 44×44) | tech/claro, tech/escuro |

### atoms-treeselect

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: aria-dialog-name | séria | checkable | `#radix-_r_5_` | ARIA dialog and alertdialog nodes should have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | checkable | `button "Limpar"` | 37,4×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | checkable | `button "Recolher"` | 20×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | checkable | `button "Todos"` | 32,2×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | checkable | `button[data-slot=checkbox][role=checkbox]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | checkable | `input "Buscar na lista"` | 256×16 (exceção de espaçamento, < 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | checkable | `input "Buscar na lista"` | 258×16 (exceção de espaçamento, < 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#667592 sobre #212224) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#747372 sobre #23211F) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#766F92 sobre #222123) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#89A4F2 sobre #FBFCFC) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#926A68 sobre #242121) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#926B5E sobre #232120) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#ADADAC sobre #FCFCFB) | default/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#B69AE8 sobre #FCFBFC) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#CC9F8F sobre #FCFBFB) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Limpar"` | contorno de 1px (mínimo 2px) (#DD7D92 sobre #FCFBFB) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#667592 sobre #212224) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#747372 sobre #23211F) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#766F92 sobre #222123) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#89A4F2 sobre #FBFCFC) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#926A68 sobre #242121) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#926B5E sobre #232120) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#ADADAC sobre #FCFCFB) | default/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#B69AE8 sobre #FCFBFC) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#CC9F8F sobre #FCFBFB) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `button "Todos"` | contorno de 1px (mínimo 2px) (#DD7D92 sobre #FCFBFB) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | checkable | `input "Buscar na lista"` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | checkable | `span` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | checkable | `ul[role=tree] "Ramos de seguro"` | foco só por preenchimento ou invisível | todos |
| Regra da Casa (Alvo) | 🟡 | checkable-show-parent | `button "Remover Patrimonial"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | checkable-show-parent | `button "Remover Vida"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| axe: aria-dialog-name | séria | custom-texts | `#radix-_r_9_` | ARIA dialog and alertdialog nodes should have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | custom-texts | `button "Limpar"` | 37,4×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | custom-texts | `button "Recolher"` | 20×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | custom-texts | `button "Remover Ana"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | custom-texts | `button "Remover Bia"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | custom-texts | `button "Todas"` | 31,3×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | custom-texts | `button[data-slot=checkbox][role=checkbox] "check"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | custom-texts | `input "Buscar na lista"` | 256×16 (exceção de espaçamento, < 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | custom-texts | `input "Buscar na lista"` | 258×16 (exceção de espaçamento, < 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#667592 sobre #212224) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#747372 sobre #23211F) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#766F92 sobre #222123) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#89A4F2 sobre #FBFCFC) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#926A68 sobre #242121) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#926B5E sobre #232120) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#ADADAC sobre #FCFCFB) | default/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#B69AE8 sobre #FCFBFC) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#CC9F8F sobre #FCFBFB) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Limpar"` | contorno de 1px (mínimo 2px) (#DD7D92 sobre #FCFBFB) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#667592 sobre #212224) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#747372 sobre #23211F) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#766F92 sobre #222123) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#89A4F2 sobre #FBFCFC) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#926A68 sobre #242121) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#926B5E sobre #232120) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#ADADAC sobre #FCFCFB) | default/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#B69AE8 sobre #FCFBFC) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#CC9F8F sobre #FCFBFB) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `button "Todas"` | contorno de 1px (mínimo 2px) (#DD7D92 sobre #FCFBFB) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `input "Buscar na lista"` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `span` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | custom-texts | `ul[role=tree] "Responsáveis"` | foco só por preenchimento ou invisível | todos |
| Regra da Casa (Alvo) | 🟡 | multiple | `button "Remover Auto"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | multiple | `button "Remover Vida"` | 16×16 (exceção de espaçamento, < 44×44) | todos |

### molecules-attachment

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=attachment-action] "Remover"` | 24×24 (< 44×44) | todos |

### molecules-breadcrumb

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | 86,5×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | 33,1×20 (exceção de espaçamento, < 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | custom-separator | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=breadcrumb-link] "Componentes"` | 86,5×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=breadcrumb-link] "Início"` | 33,1×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=dropdown-menu-trigger] "more_horizMoreAbrir menu"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | dropdown | `a[data-slot=breadcrumb-link] "Início"` | 33,1×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | 104,5×20 (exceção de espaçamento, < 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown | `button[data-slot=dropdown-menu-trigger] "Componenteskeyboard_arrow_down"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | 86,5×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | 33,1×20 (exceção de espaçamento, < 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | ellipsis | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | 96,5×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | responsive | `a[data-slot=breadcrumb-link] "Início"` | 33,1×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Busca de dados"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | responsive | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | 86,5×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-link | `a[data-slot=breadcrumb-link] "Início"` | 33,1×20 (exceção de espaçamento, < 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Componentes"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | with-link | `a[data-slot=breadcrumb-link] "Início"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |

### molecules-button-group

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Adiar"` | 68×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Adiar"` | 70×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Arquivar"` | 88×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Arquivar"` | 90×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Denunciar"` | 97,7×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Denunciar"` | 98,7×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Voltar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=dropdown-menu-trigger] "Mais opções"` | 40×40 (< 44×44) | todos |
| axe: button-name | crítica | dropdown | `#radix-_r_2_` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | dropdown | `button[data-slot=button] "Seguir"` | 74,5×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown | `button[data-slot=button] "Seguir"` | 76,5×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown | `button[data-slot=dropdown-menu-trigger] "keyboard_arrow_down"` | 37×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown | `button[data-slot=dropdown-menu-trigger] "keyboard_arrow_down"` | 38×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "1"` | 31,6×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "1"` | 33,6×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "2"` | 32,8×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "2"` | 33,8×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "3"` | 32,8×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "3"` | 33,8×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "4"` | 33,1×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "4"` | 34,1×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "5"` | 32,8×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "5"` | 33,8×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "Anterior"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | nested | `button[data-slot=button] "Próximo"` | 32×32 (< 44×44) | todos |
| axe: button-name | crítica | orientation | `.inline-flex.items-center.justify-center:nth-child(1) .inline-flex.items-center.justify-center:nth-child(2)` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | orientation | `button[data-slot=button] "add"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | orientation | `button[data-slot=button] "remove"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | popover | `button[data-slot=button] "smart_toy Copilot"` | 96,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | popover | `button[data-slot=button] "smart_toy Copilot"` | 98,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | popover | `button[data-slot=popover-trigger] "Abrir popover"` | 40×40 (< 44×44) | todos |
| axe: button-name | crítica | size | `.size-8 .size-10 .size-12` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "add"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "add"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Botão"` | 62,5×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Botão"` | 63,5×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Botão"` | 70,5×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Botão"` | 71,5×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Grupo"` | 64,9×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Grupo"` | 65,9×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Grupo"` | 72,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Grupo"` | 73,9×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Padrão"` | 78,4×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Padrão"` | 80,4×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Pequeno"` | 81,7×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=button] "Pequeno"` | 83,7×32 (< 44×44) | tech/claro, tech/escuro |
| axe: button-name | crítica | split | `.size-10` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | split | `button[data-slot=button]` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | split | `button[data-slot=button] "Botão"` | 69,5×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-input | `button[data-slot=button] "Buscar"` | 41×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-input | `button[data-slot=button] "Buscar"` | 42×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-input | `input[data-slot=input]` | 185×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-input | `input[data-slot=input]` | 187×36 (< 44×44) | tech/claro, tech/escuro |
| axe: button-name | crítica | with-input-group | `.inline-flex .dark\:hover\:bg-accent\/50` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | with-input-group | `button[data-slot=button] "add"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-input-group | `button[data-slot=tooltip-trigger] "graphic_eq"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-input-group | `input[data-slot=input-group-control]` | 179×36 (< 44×44) | todos |
| axe: button-name | crítica | with-select | `.justify-between` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | with-select | `button[data-slot=button] "Enviar"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-select | `button[data-slot=select-trigger][role=combobox] "$keyboard_arrow_down"` | 57,7×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-select | `button[data-slot=select-trigger][role=combobox] "$keyboard_arrow_down"` | 59,7×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-select | `input[data-slot=input]` | 184×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-select | `input[data-slot=input]` | 185×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-separator | `button[data-slot=button] "Colar"` | 57,2×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-separator | `button[data-slot=button] "Copiar"` | 65,6×32 (< 44×44) | todos |

### molecules-collapsible

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=collapsible-trigger] "unfold_moreAlternar"` | 32×32 (< 44×44) | todos |

### molecules-combobox

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: button-name | crítica | default | `.inline-flex` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger][role=combobox] "Selecione um framework...unfol"` | 200×40 (< 44×44) | todos |
| axe: button-name | crítica | dropdown-menu | `#radix-_r_1_` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu | `button[data-slot=dropdown-menu-trigger] "more_horiz"` | 36×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | popover | `button[data-slot=popover-trigger] "+ Definir status"` | 150×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | responsive | `button[data-slot=popover-trigger] "+ Definir status"` | 150×40 (< 44×44) | todos |

### molecules-empty

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=button] "Saiba mais arrow_outward"` | 109,4×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Criar projeto"` | 112,2×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Importar projeto"` | 140,5×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Importar projeto"` | 142,5×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=button] "Enviar arquivos"` | 122,5×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=button] "Enviar arquivos"` | 124,5×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-avatar | `button[data-slot=button] "Deixar mensagem"` | 138,1×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-avatar-group | `button[data-slot=button] "addConvidar membros"` | 162,9×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-background | `button[data-slot=button] "refreshAtualizar"` | 100×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-background | `button[data-slot=button] "refreshAtualizar"` | 102×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-input-group | `input[data-slot=input-group-control]` | 229,6×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-input-group | `input[data-slot=input-group-control]` | 231,6×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | with-input-group | `a "Fale com o suporte"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |

### molecules-field

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | checkbox | `button[data-slot=checkbox][role=checkbox]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | checkbox | `button[data-slot=checkbox][role=checkbox] "check"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| axe: button-name | crítica | choice-card | `#kubernetes-r2h #vm-z4k` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | choice-card | `button[data-slot=radio-group-item][role=radio]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | choice-card | `button[data-slot=radio-group-item][role=radio] "circle"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Cancelar"` | 88,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Cancelar"` | 90,3×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Enviar"` | 70,7×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=checkbox][role=checkbox] "check"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=select-trigger][role=combobox] "AAAAkeyboard_arrow_down"` | 138,7×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=select-trigger][role=combobox] "MMkeyboard_arrow_down"` | 138,7×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 138,7×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 448×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | fieldset | `input[data-slot=input]` | 216×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | fieldset | `input[data-slot=input]` | 448×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | group | `button[data-slot=checkbox][role=checkbox]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | group | `a "Gerenciar tarefas"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | input | `input[data-slot=input]` | 448×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | radio | `button[data-slot=radio-group-item][role=radio]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | radio | `button[data-slot=radio-group-item][role=radio] "circle"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | responsive | `button[data-slot=button] "Cancelar"` | 88,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | responsive | `button[data-slot=button] "Cancelar"` | 90,3×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | responsive | `button[data-slot=button] "Enviar"` | 70,7×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | responsive | `input[data-slot=input]` | 185×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | responsive | `input[data-slot=input]` | 187×36 (< 44×44) | tech/claro, tech/escuro |
| axe: button-name | crítica | select | `.justify-between` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | select | `button[data-slot=select-trigger][role=combobox] "Escolha o departamentokeyboard"` | 448×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | switch | `button[data-slot=switch][role=switch]` | 32×18,4 (exceção de espaçamento, < 44×44) | todos |

### molecules-hover-card

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=hover-card-trigger] "@nextjs"` | 82,8×40 (< 44×44) | todos |

### molecules-input-group

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: button-name | crítica | button | `.pl-3 > .bg-secondary.text-secondary-foreground.hover\:shadow-xs .\[--radius\:9999px\] > .order-last.pr-3.has-\[\>button\]\:mr-\[calc\(--spacing\(-1\.8\)\)\] > .hover\:bg-accent.hover\:text-accent-foreground.dark\:hover\:bg-accent\/50` | Buttons must have discernible text | todos |
| axe: label | crítica | button | `#input-secure-19` | Form elements must have labels | todos |
| Regra da Casa (Alvo) | 🟡 | button | `button[data-slot=button]` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | button | `button[data-slot=button] "Buscar"` | 57,7×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | button | `button[data-slot=button] "Copiar"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | button | `input[data-slot=input-group-control]` | 268,7×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | button | `input[data-slot=input-group-control]` | 270,7×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | button | `input[data-slot=input-group-control]` | 317,5×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | button | `input[data-slot=input-group-control]` | 319,5×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | button | `input[data-slot=input-group-control]` | 351,2×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | button | `input[data-slot=input-group-control]` | 353,2×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | button-group | `input[data-slot=input-group-control]` | 179×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | custom | `button[data-slot=button] "Enviar"` | 58,7×32 (< 44×44) | todos |
| axe: button-name | crítica | default | `button[data-slot="tooltip-trigger"] .dark\:border-input` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button]` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=dropdown-menu-trigger] "Automático"` | 90,3×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=tooltip-trigger]` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-group-control]` | 257,2×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-group-control]` | 259,2×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-group-control]` | 291,5×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-group-control]` | 293,5×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-group-control]` | 352×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-group-control]` | 354×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown | `button[data-slot=dropdown-menu-trigger] "Buscar em... keyboard_arrow_do"` | 94,8×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | dropdown | `button[data-slot=dropdown-menu-trigger] "Mais"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | dropdown | `input[data-slot=input-group-control]` | 280,4×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown | `input[data-slot=input-group-control]` | 282,4×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown | `input[data-slot=input-group-control]` | 351,2×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown | `input[data-slot=input-group-control]` | 353,2×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | icon | `input[data-slot=input-group-control]` | 324×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | icon | `input[data-slot=input-group-control]` | 326×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | icon | `input[data-slot=input-group-control]` | 328×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | icon | `input[data-slot=input-group-control]` | 330×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | icon | `input[data-slot=input-group-control]` | 352×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | icon | `input[data-slot=input-group-control]` | 354×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | label | `button[data-slot=tooltip-trigger] "Ajuda"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | label | `input[data-slot=input-group-control]` | 354,6×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | label | `input[data-slot=input-group-control]` | 356,6×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | label | `input[data-slot=input-group-control]` | 380×35 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | label | `input[data-slot=input-group-control]` | 382×35 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| axe: color-contrast | séria | spinner | `.group\/input-group.relative.rounded-outer-md:nth-child(4) > .order-last.pr-3.has-\[\>button\]\:mr-\[calc\(--spacing\(-1\.8\)\)\] > .\[\&_svg\]\:pointer-events-none.\[\&_svg\:not\(\[class\*\=\'size-\'\]\)\]\:size-4.gap-2` | Elements must meet minimum color contrast ratio thresholds | default/claro |
| Regra da Casa (Alvo) | 🟡 | text | `input[data-slot=input-group-control]` | 266,5×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | text | `input[data-slot=input-group-control]` | 268,5×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | text | `input[data-slot=input-group-control]` | 277,6×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | text | `input[data-slot=input-group-control]` | 279,6×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | text | `input[data-slot=input-group-control]` | 320,7×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | text | `input[data-slot=input-group-control]` | 322,7×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| axe: button-name | crítica | textarea | `.hover\:bg-accent.hover\:text-accent-foreground.dark\:hover\:bg-accent\/50:nth-child(2) .hover\:bg-accent.hover\:text-accent-foreground.dark\:hover\:bg-accent\/50:nth-child(3)` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | textarea | `button[data-slot=button]` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | textarea | `button[data-slot=button] "Executar"` | 95,8×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | tooltip | `button[data-slot=button] "Ajuda"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | tooltip | `button[data-slot=tooltip-trigger] "Ajuda"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | tooltip | `button[data-slot=tooltip-trigger] "Informações"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | tooltip | `input[data-slot=input-group-control]` | 351,2×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | tooltip | `input[data-slot=input-group-control]` | 353,2×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |

### molecules-pagination

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "1"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "2"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "3"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "Ir para a página anterior"` | 96,4×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "Ir para a próxima página"` | 95,8×40 (< 44×44) | todos |

### molecules-scroll-area

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: scrollable-region-focusable | séria | default | `.size-full` | Scrollable region must have keyboard access | todos |
| axe: scrollable-region-focusable | séria | horizontal | `.size-full` | Scrollable region must have keyboard access | todos |

### molecules-segmentedcontrol

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 47×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 49×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=segmented-control-item][role=radio] "Mês"` | 52,4×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=segmented-control-item][role=radio] "Mês"` | 54,4×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 76,3×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 78,3×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 47×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 49×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=segmented-control-item][role=radio] "Mês"` | 52,4×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=segmented-control-item][role=radio] "Mês"` | 54,4×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 76,3×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 78,3×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 47×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 49×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=segmented-control-item][role=radio] "Mês"` | 52,4×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=segmented-control-item][role=radio] "Mês"` | 54,4×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 76,3×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 78,3×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 44×28 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 46×28 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=segmented-control-item][role=radio] "Mês"` | 48,6×28 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=segmented-control-item][role=radio] "Mês"` | 50,6×28 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 69,1×28 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 71,1×28 (< 44×44) | tech/claro, tech/escuro |

### molecules-sonner

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Mostrar notificação"` | 157,8×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Mostrar notificação"` | 159,8×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Aviso"` | 68,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Aviso"` | 70,3×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Erro"` | 59,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Erro"` | 61,9×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Informação"` | 106,6×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Informação"` | 108,6×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Padrão"` | 78,4×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Padrão"` | 80,4×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Promessa"` | 94,8×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Promessa"` | 96,8×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Sucesso"` | 84,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | types | `button[data-slot=button] "Sucesso"` | 86,3×40 (< 44×44) | tech/claro, tech/escuro |

### molecules-splitbutton

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=dropdown-menu-trigger] "Mais ações"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=dropdown-menu-trigger] "Mais ações"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=button] "Salvar"` | 72×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=button] "Salvar"` | 74×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=dropdown-menu-trigger] "Mais ações"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | secondary | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | secondary | `button[data-slot=dropdown-menu-trigger] "Mais ações"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=button] "Salvar"` | 62×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=dropdown-menu-trigger] "Mais ações"` | 32×32 (< 44×44) | todos |

### molecules-toggle-group

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=toggle-group-item][role=radio] "A"` | 33×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=toggle-group-item][role=radio] "B"` | 32×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=toggle-group-item] "Alternar itálico"` | 41×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=toggle-group-item] "Alternar itálico"` | 42×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=toggle-group-item] "Alternar negrito"` | 42×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=toggle-group-item] "Alternar negrito"` | 44×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=toggle-group-item] "Alternar tachado"` | 41×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=toggle-group-item] "Alternar tachado"` | 42×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=toggle-group-item] "Alternar itálico"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=toggle-group-item] "Alternar negrito"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | large | `button[data-slot=toggle-group-item] "Alternar tachado"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=toggle-group-item][role=radio] "A"` | 35×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=toggle-group-item][role=radio] "A"` | 37×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=toggle-group-item][role=radio] "B"` | 33×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | outline | `button[data-slot=toggle-group-item][role=radio] "B"` | 34×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | single | `button[data-slot=toggle-group-item][role=radio] "Alternar itálico"` | 40×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | single | `button[data-slot=toggle-group-item][role=radio] "Alternar negrito"` | 40×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | single | `button[data-slot=toggle-group-item][role=radio] "Alternar tachado"` | 40×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=toggle-group-item][role=radio] "Alternar itálico"` | 40×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=toggle-group-item][role=radio] "Alternar negrito"` | 40×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | small | `button[data-slot=toggle-group-item][role=radio] "Alternar tachado"` | 40×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | spacing | `button[data-slot=toggle-group-item] "Alternar coração"` | 100,7×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | spacing | `button[data-slot=toggle-group-item] "Alternar coração"` | 102,7×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | spacing | `button[data-slot=toggle-group-item] "Alternar estrela"` | 90,5×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | spacing | `button[data-slot=toggle-group-item] "Alternar estrela"` | 92,5×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | spacing | `button[data-slot=toggle-group-item] "Alternar favorito"` | 101,6×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | spacing | `button[data-slot=toggle-group-item] "Alternar favorito"` | 99,6×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |

### organisms-alert-dialog

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=alert-dialog-trigger] "Mostrar diálogo"` | 136,1×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=alert-dialog-trigger] "Mostrar diálogo"` | 138,1×40 (< 44×44) | tech/claro, tech/escuro |

### organisms-calendar

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button "Go to the Next Month"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button "Go to the Previous Month"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "domingo, 11 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "domingo, 18 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "domingo, 25 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "domingo, 27 de setembro de 202"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "domingo, 4 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quarta-feira, 14 de outubro de"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quarta-feira, 21 de outubro de"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quarta-feira, 28 de outubro de"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quarta-feira, 30 de setembro d"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quarta-feira, 7 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quinta-feira, 1 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quinta-feira, 22 de outubro de"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quinta-feira, 29 de outubro de"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "quinta-feira, 8 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sábado, 10 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sábado, 17 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sábado, 24 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sábado, 3 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sábado, 31 de outubro de 2026"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "segunda-feira, 12 de outubro d"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "segunda-feira, 19 de outubro d"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "segunda-feira, 26 de outubro d"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "segunda-feira, 28 de setembro "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "segunda-feira, 5 de outubro de"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sexta-feira, 16 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sexta-feira, 2 de outubro de 2"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sexta-feira, 23 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sexta-feira, 30 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "sexta-feira, 9 de outubro de 2"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "terça-feira, 13 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "terça-feira, 20 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "terça-feira, 27 de outubro de "` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "terça-feira, 29 de setembro de"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "terça-feira, 6 de outubro de 2"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Today, quinta-feira, 15 de out"` | 32×32 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Month"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `select "Choose the Year"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |

### organisms-card

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `a "Esqueceu sua senha?"` | 129,4×20 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Criar conta"` | 101,4×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Entrar com o Google"` | 332×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Entrar com o Google"` | 334×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Entrar"` | 332×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Entrar"` | 334×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 332×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 334×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#657491 sobre #1F2022) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#737271 sobre #201F1D) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#756E90 sobre #201F21) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#8BA5F4 sobre #FFFFFF) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#906A5D sobre #211F1E) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#916967 sobre #221F1F) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#AEAEAE sobre #FFFFFF) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#B79CEA sobre #FFFFFF) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#CEA191 sobre #FFFFFF) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `a "Esqueceu sua senha?"` | contorno de 1px (mínimo 2px) (#DF7F94 sobre #FFFFFF) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | with-form | `button[data-slot=button] "Cancelar"` | 88,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-form | `button[data-slot=button] "Cancelar"` | 90,3×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-form | `button[data-slot=button] "Publicar"` | 83,2×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | with-form | `button[data-slot=select-trigger][role=combobox] "Selecionekeyboard_arrow_down"` | 298×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-form | `button[data-slot=select-trigger][role=combobox] "Selecionekeyboard_arrow_down"` | 300×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | with-form | `input[data-slot=input]` | 298×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | with-form | `input[data-slot=input]` | 300×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |

### organisms-carousel

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | api | `button[data-slot=carousel-next] "arrow_forwardNext slide"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=carousel-next] "arrow_forwardNext slide"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | orientation | `button[data-slot=carousel-next] "arrow_forwardNext slide"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | plugin | `button[data-slot=carousel-next] "arrow_forwardNext slide"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | size | `button[data-slot=carousel-next] "arrow_forwardNext slide"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | spacing | `button[data-slot=carousel-next] "arrow_forwardNext slide"` | 32×32 (< 44×44) | todos |

### organisms-chart

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| WCAG 2.4.7 (Foco) | séria | axis | `svg[role=application] "JanFevMarAbrMaiJun"` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | default | `svg[role=application]` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | grid | `svg[role=application]` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | legend | `svg[role=application] "JanFevMarAbrMaiJun"` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | with-tooltip | `svg[role=application] "JanFevMarAbrMaiJun"` | foco só por preenchimento ou invisível | todos |

### organisms-command

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: aria-required-children | crítica | default | `#radix-_r_0_` | Certain ARIA roles must contain particular children | todos |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "calendar_todayCalendário"` | 1188×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "calendar_todayCalendário"` | 1190×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "credit_cardCobrança⌘B"` | 1188×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "credit_cardCobrança⌘B"` | 1190×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "moodBuscar emoji"` | 1188×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "moodBuscar emoji"` | 1190×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "personPerfil⌘P"` | 1188×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "personPerfil⌘P"` | 1190×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "settingsConfigurações⌘S"` | 1188×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `div[data-slot=command-item][role=option] "settingsConfigurações⌘S"` | 1190×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=command-input][role=combobox]` | 1148×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=command-input][role=combobox]` | 1150×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input[data-slot=command-input][role=combobox]` | foco só por preenchimento ou invisível | todos |

### organisms-dialog

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | close-button | `button[data-slot=dialog-trigger] "Compartilhar"` | 117,6×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | close-button | `button[data-slot=dialog-trigger] "Compartilhar"` | 119,6×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=dialog-trigger] "Abrir diálogo"` | 117,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=dialog-trigger] "Abrir diálogo"` | 119,9×40 (< 44×44) | tech/claro, tech/escuro |

### organisms-drawer

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=drawer-trigger] "Abrir gaveta"` | 112,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=drawer-trigger] "Abrir gaveta"` | 114,3×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | responsive-dialog | `button[data-slot=dialog-trigger] "Editar perfil"` | 108,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | responsive-dialog | `button[data-slot=dialog-trigger] "Editar perfil"` | 110,2×40 (< 44×44) | tech/claro, tech/escuro |

### organisms-dropdown-menu

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | checkboxes | `button[data-slot=dropdown-menu-trigger] "Abrir"` | 65,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | checkboxes | `button[data-slot=dropdown-menu-trigger] "Abrir"` | 67,9×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=dropdown-menu-trigger] "Abrir"` | 65,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=dropdown-menu-trigger] "Abrir"` | 67,9×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dialog | `button[data-slot=dropdown-menu-trigger] "Abrir menu"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | radio-group | `button[data-slot=dropdown-menu-trigger] "Abrir"` | 65,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | radio-group | `button[data-slot=dropdown-menu-trigger] "Abrir"` | 67,9×40 (< 44×44) | tech/claro, tech/escuro |

### organisms-form

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | array | `button[data-slot=button] "Adicionar endereço de e-mail"` | 396×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | array | `button[data-slot=button] "Adicionar endereço de e-mail"` | 398×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | array | `button[data-slot=button] "Redefinir"` | 91,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | array | `button[data-slot=button] "Redefinir"` | 93,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | array | `button[data-slot=button] "Remover e-mail 1"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | array | `button[data-slot=button] "Remover e-mail 2"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | array | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | array | `input[data-slot=input-group-control]` | 363,2×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | array | `input[data-slot=input-group-control]` | 367,2×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | checkbox | `button[data-slot=button] "Redefinir"` | 91,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | checkbox | `button[data-slot=button] "Redefinir"` | 93,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | checkbox | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | checkbox | `button[data-slot=checkbox][role=checkbox]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| axe: button-name | crítica | complex | `#form-rhf-complex-basic #form-rhf-complex-pro` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=button] "Redefinir"` | 332×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=button] "Redefinir"` | 334×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=button] "Salvar preferências"` | 332×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=button] "Salvar preferências"` | 334×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=checkbox][role=checkbox]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=radio-group-item][role=radio]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=radio-group-item][role=radio] "circle"` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=select-trigger][role=combobox] "Selecionarkeyboard_arrow_down"` | 332×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=select-trigger][role=combobox] "Selecionarkeyboard_arrow_down"` | 334×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | complex | `button[data-slot=switch][role=switch]` | 32×18,4 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Enviar"` | 70,7×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Redefinir"` | 91,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Redefinir"` | 93,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 396×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 398×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | input | `button[data-slot=button] "Redefinir"` | 91,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | input | `button[data-slot=button] "Redefinir"` | 93,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | input | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | input | `input[data-slot=input]` | 396×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | input | `input[data-slot=input]` | 398×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| axe: aria-progressbar-name | séria | password | `.h-2` | ARIA progressbar nodes must have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | password | `button[data-slot=button] "Criar senha"` | 396×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | password | `button[data-slot=button] "Criar senha"` | 398×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | password | `button[data-slot=button] "Redefinir"` | 396×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | password | `button[data-slot=button] "Redefinir"` | 398×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | password | `input[data-slot=input-group-control]` | 364×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | password | `input[data-slot=input-group-control]` | 368×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| axe: button-name | crítica | radio-group | `#form-rhf-radiogroup-starter #form-rhf-radiogroup-pro #form-rhf-radiogroup-enterprise` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | radio-group | `button[data-slot=button] "Redefinir"` | 91,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | radio-group | `button[data-slot=button] "Redefinir"` | 93,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | radio-group | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | radio-group | `button[data-slot=radio-group-item][role=radio]` | 16×16 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | select | `button[data-slot=button] "Redefinir"` | 91,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | select | `button[data-slot=button] "Redefinir"` | 93,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | select | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | select | `button[data-slot=select-trigger][role=combobox] "Selecionarkeyboard_arrow_down"` | 120×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | switch | `button[data-slot=button] "Redefinir"` | 91,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | switch | `button[data-slot=button] "Redefinir"` | 93,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | switch | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | switch | `button[data-slot=switch][role=switch]` | 32×18,4 (exceção de espaçamento, < 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | textarea | `button[data-slot=button] "Redefinir"` | 91,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | textarea | `button[data-slot=button] "Redefinir"` | 93,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | textarea | `button[data-slot=button] "Salvar"` | 70×40 (< 44×44) | todos |

### organisms-menubar

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=menubar-trigger][role=menuitem] "Arquivo"` | 66×28 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=menubar-trigger][role=menuitem] "Editar"` | 52,9×28 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=menubar-trigger][role=menuitem] "Perfis"` | 51,2×28 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=menubar-trigger][role=menuitem] "Visualizar"` | 76,5×28 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | default | `button[data-slot=menubar-trigger][role=menuitem] "Arquivo"` | foco só por preenchimento ou invisível | todos |

### organisms-navigation-menu

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=navigation-menu-link] "Documentação"` | 127,8×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=navigation-menu-trigger] "Com ícone keyboard_arrow_down"` | 115,5×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=navigation-menu-trigger] "Componentes keyboard_arrow_dow"` | 136,5×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=navigation-menu-trigger] "Início keyboard_arrow_down"` | 82,5×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=navigation-menu-trigger] "Lista keyboard_arrow_down"` | 76,9×36 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=navigation-menu-trigger] "Simples keyboard_arrow_down"` | 97,3×36 (< 44×44) | todos |

### organisms-resizable

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#174CEA sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#5E5E5E sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#6F3AD5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#9D4323 sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#BF002A sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#174CEA sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#5E5E5E sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#6F3AD5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#9D4323 sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#BF002A sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | handle-only | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#174CEA sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#5E5E5E sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#6F3AD5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#9D4323 sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#BF002A sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | vertical | `div[data-slot=resizable-handle][role=separator]` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#174CEA sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#5E5E5E sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#6F3AD5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#9D4323 sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#BF002A sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | with-handle | `div[data-slot=resizable-handle][role=separator] "drag_indicator"` | contorno de 1px (mínimo 2px) (#FFFFFF sobre #151313) | soft/escuro |

### organisms-sheet

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=sheet-trigger] "Abrir"` | 65,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=sheet-trigger] "Abrir"` | 67,9×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | side | `button[data-slot=sheet-trigger] "direita"` | 596×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | side | `button[data-slot=sheet-trigger] "esquerda"` | 596×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | side | `button[data-slot=sheet-trigger] "inferior"` | 596×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | side | `button[data-slot=sheet-trigger] "superior"` | 596×40 (< 44×44) | todos |

### organisms-sidebar

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=sidebar-menu-button] "groupTime"` | 240×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=sidebar-menu-button] "homeInício"` | 240×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=sidebar-menu-button] "settingsConfigurações"` | 240×32 (< 44×44) | todos |

### organisms-stepper

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | examples | `button[data-slot=button] "Próximo"` | 84,8×40 (< 44×44) | todos |

### organisms-tabs

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: color-contrast | séria | default | `#radix-_r_0_-trigger-password` | Elements must meet minimum color contrast ratio thresholds | default/claro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Salvar alterações"` | 138,1×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=tabs-trigger][role=tab] "Conta"` | 55,6×29 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=tabs-trigger][role=tab] "Conta"` | 57,6×29 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=tabs-trigger][role=tab] "Senha"` | 56,7×29 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=tabs-trigger][role=tab] "Senha"` | 58,7×29 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 332×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 334×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[data-slot=tabs-content][role=tabpanel] "ContaFaça alterações na sua co"` | foco só por preenchimento ou invisível | todos |

### organisms-timepicker

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "calendar_today14:30"` | 160×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | empty | `button[data-slot=popover-trigger] "calendar_todaySelecione um hor"` | 160×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | format-12-h | `button[data-slot=popover-trigger] "calendar_today02:30 PM"` | 160×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | minute-step-15 | `button[data-slot=popover-trigger] "calendar_todaySelecione um hor"` | 160×40 (< 44×44) | todos |

### patterns-confirmation-dialog

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=alert-dialog-trigger] "Cancelar assinatura do plano"` | 216,8×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=alert-dialog-trigger] "Cancelar assinatura do plano"` | 218,8×40 (< 44×44) | tech/claro, tech/escuro |

### patterns-crud

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=alert-dialog-trigger] "Excluir Carla Souza"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=alert-dialog-trigger] "Excluir João Batista"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "addNovo corretor"` | 131,5×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Editar Carla Souza"` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Editar João Batista"` | 32×32 (< 44×44) | todos |

### patterns-delete-flow

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=alert-dialog-trigger] "Excluir Boletim de ocorrência."` | 32×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=alert-dialog-trigger] "Excluir Laudo de vistoria.pdf"` | 32×32 (< 44×44) | todos |

### patterns-empty-state

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Nova apólice"` | 114,6×40 (< 44×44) | todos |

### patterns-error-state

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "refreshTentar novamente"` | 158,5×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "refreshTentar novamente"` | 160,5×32 (< 44×44) | tech/claro, tech/escuro |

### patterns-filter-panel

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: button-name | crítica | default | `.border-input` | Buttons must have discernible text | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "bar_chartProduto"` | 95,5×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "bar_chartProduto"` | 97,5×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "calendar_todayPeríodo"` | 93,2×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "calendar_todayPeríodo"` | 95,2×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "personSegurado ou Tomador"` | 185,6×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "personSegurado ou Tomador"` | 187,6×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "shieldCorretora"` | 104,6×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "shieldCorretora"` | 106,6×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=select-trigger][role=combobox] "assignmentStatuskeyboard_arrow"` | 160×32 (< 44×44) | todos |

### patterns-filters

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "tuneFiltros"` | 82,9×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=popover-trigger] "tuneFiltros"` | 84,9×32 (< 44×44) | tech/claro, tech/escuro |

### patterns-infinite-scroll

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Carregar mais"` | 113,9×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Carregar mais"` | 115,9×32 (< 44×44) | tech/claro, tech/escuro |

### patterns-loading

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Atualizar"` | 90×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Atualizar"` | 92×40 (< 44×44) | tech/claro, tech/escuro |

### patterns-multi-step-form

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: aria-progressbar-name | séria | default | `.relative` | ARIA progressbar nodes must have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Avançar"` | 82,5×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 1148×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input]` | 1150×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |

### patterns-pagination

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "1"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "2"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "3"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "4"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "5"` | 40×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "Ir para a página anterior"` | 96,4×40 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | default | `a[data-slot=pagination-link] "Ir para a próxima página"` | 95,8×40 (< 44×44) | todos |

### patterns-search-experience

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-group-control] "Buscar apólice"` | 1168×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `input[data-slot=input-group-control] "Buscar apólice"` | 1170×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |

### patterns-skeleton

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Simular conteúdo carregado"` | 206,3×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Simular conteúdo carregado"` | 208,3×32 (< 44×44) | tech/claro, tech/escuro |

### patterns-success-feedback

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Salvar alterações"` | 138,1×40 (< 44×44) | todos |

### patterns-toast-strategy

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Ação assíncrona"` | 136,2×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Ação assíncrona"` | 138,2×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Aviso"` | 68,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Aviso"` | 70,3×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Erro"` | 59,9×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Erro"` | 61,9×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Informação"` | 106,6×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Informação"` | 108,6×40 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Sucesso"` | 84,3×40 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | default | `button[data-slot=button] "Sucesso"` | 86,3×40 (< 44×44) | tech/claro, tech/escuro |

### patterns-upload

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: label | crítica | default | `input` | Form elements must have labels | todos |
| axe: nested-interactive | séria | default | `.flex` | Interactive controls must not be nested | todos |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `div[role=button] "cloud_uploadArraste arquivos a"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | default | `input` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |

### testes-adaptação-à-tela

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| Regra da Casa (Alvo) | 🟡 | combobox-corner | `button[data-slot=input-group-button] "keyboard_arrow_down"` | 24×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | combobox-corner | `div[data-slot=combobox-item][role=option] "Cinco"` | 312×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | combobox-corner | `div[data-slot=combobox-item][role=option] "Dois"` | 312×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | combobox-corner | `div[data-slot=combobox-item][role=option] "Quatro"` | 312×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | combobox-corner | `div[data-slot=combobox-item][role=option] "Seis"` | 312×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | combobox-corner | `div[data-slot=combobox-item][role=option] "Três"` | 312×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | combobox-corner | `div[data-slot=combobox-item][role=option] "Um"` | 312×32 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | combobox-corner | `input[data-slot=input-group-control][role=combobox]` | 179×36 (< 44×44) | todos |
| axe: scrollable-region-focusable | séria | context-menu-corner | `.max-h-\(--radix-context-menu-content-available-height\)` | Scrollable region must have keyboard access | default/claro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Cinco"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Cinco"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Dois"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Dois"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Item"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Item"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Quatro"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Quatro"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Seis"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Seis"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Três"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Três"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Um"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-item][role=menuitem] "Um"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-sub-trigger][role=menuitem] "Maischevron_right"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | context-menu-corner | `div[data-slot=context-menu-sub-trigger][role=menuitem] "Maischevron_right"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | context-menu-corner | `span` | foco só por preenchimento ou invisível | todos |
| axe: scrollable-region-focusable | séria | dropdown-menu-corner | `#radix-_r_7_` | Scrollable region must have keyboard access | todos |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | 49,2×24 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Cinco"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Cinco"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Dois"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Dois"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Item"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Item"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Quatro"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Quatro"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Seis"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Seis"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Três"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Três"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Um"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-item][role=menuitem] "Um"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-sub-trigger][role=menuitem] "Maischevron_right"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | dropdown-menu-corner | `div[data-slot=dropdown-menu-sub-trigger][role=menuitem] "Maischevron_right"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `button[data-slot=dropdown-menu-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | dropdown-menu-corner | `span` | foco só por preenchimento ou invisível | todos |
| Regra da Casa (Alvo) | 🟡 | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | 49,2×24 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | hover-card-corner | `button[data-slot=hover-card-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `button[data-slot=menubar-trigger][role=menuitem] "Arquivo"` | 66×28 (< 44×44) | todos |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Cinco"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Cinco"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Dois"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Dois"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Item"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Item"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Quatro"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Quatro"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Seis"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Seis"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Três"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Três"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Um"` | 116×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-item][role=menuitem] "Um"` | 118×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-sub-trigger][role=menuitem] "Maischevron_right"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | menubar-corner | `div[data-slot=menubar-sub-trigger][role=menuitem] "Maischevron_right"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | menubar-corner | `button[data-slot=menubar-trigger][role=menuitem] "Arquivo"` | foco só por preenchimento ou invisível | todos |
| WCAG 2.4.7 (Foco) | séria | menubar-corner | `span` | foco só por preenchimento ou invisível | todos |
| axe: aria-dialog-name | séria | popover-corner | `#radix-_r_5_` | ARIA dialog and alertdialog nodes should have an accessible name | todos |
| Regra da Casa (Alvo) | 🟡 | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | 49,2×24 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `button[data-slot=popover-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| WCAG 2.4.7 (Foco) | séria | popover-corner | `span` | foco só por preenchimento ou invisível | todos |
| axe: aria-hidden-focus | séria | select-popper-corner | `div[data-aria-hidden="true"][aria-hidden="true"]:nth-child(7)` | ARIA hidden element must not be focusable or contain focusable elements | todos |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `button[data-slot=select-trigger][role=combobox] "Escolhakeyboard_arrow_down"` | 96,1×36 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `button[data-slot=select-trigger][role=combobox] "Escolhakeyboard_arrow_down"` | 98,1×36 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Cinco"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Cinco"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Dois"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Dois"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Quatro"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Quatro"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Seis"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Seis"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Três"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Três"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Um"` | 308×32 (< 44×44) | tech/claro, tech/escuro |
| Regra da Casa (Alvo) | 🟡 | select-popper-corner | `div[data-slot=select-item][role=option] "Um"` | 310×32 (< 44×44) | default/claro, default/escuro, editorial/claro, editorial/escuro, soft/claro, soft/escuro, midnight/claro, midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | select-popper-corner | `div[data-slot=select-item][role=option] "Um"` | foco só por preenchimento ou invisível | todos |
| Regra da Casa (Alvo) | 🟡 | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | 49,2×24 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-corner | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | 49,2×24 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-bottom | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | 49,2×24 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-left | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | 49,2×24 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-right | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |
| Regra da Casa (Alvo) | 🟡 | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | 49,2×24 (< 44×44) | todos |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#5F6D8A sobre #121315) | tech/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6D6C6B sobre #141311) | default/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#6E688A sobre #131315) | midnight/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#85A0EF sobre #F2F4F6) | tech/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6361 sobre #151313) | soft/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#8A6457 sobre #151312) | editorial/escuro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#A9A8A7 sobre #F5F3F1) | default/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#B296E5 sobre #F4F3F6) | midnight/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#C99B8B sobre #F6F3F2) | editorial/claro |
| WCAG 2.4.7 (Foco) | séria | tooltip-flip-from-top | `button[data-slot=tooltip-trigger] "gatilho"` | contorno de 1px (mínimo 2px) (#DA798E sobre #F6F3F2) | soft/claro |

### testes-raio-concêntrico

| Critério | Severidade | Story | Elemento | Medida | Contextos |
|---|---|---|---|---|---|
| axe: aria-valid-attr-value | crítica | concentrico | `#radix-_r_0_-trigger-a #radix-_r_7_-trigger-a #radix-_r_e_-trigger-a #radix-_r_l_-trigger-a #radix-_r_s_-trigger-a` | ARIA attributes must conform to valid values | default/claro |
| axe: color-contrast | séria | concentrico | `#radix-_r_0_-trigger-b #radix-_r_7_-trigger-b #radix-_r_e_-trigger-b #radix-_r_l_-trigger-b #radix-_r_s_-trigger-b` | Elements must meet minimum color contrast ratio thresholds | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=button] "Ir"` | 25,3×24 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 47×32 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=segmented-control-item][role=radio] "Dia"` | 49×32 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 76,3×32 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=segmented-control-item][role=radio] "Semana"` | 78,3×32 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=tabs-trigger][role=tab] "Conta"` | 55,6×29 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=tabs-trigger][role=tab] "Conta"` | 57,6×29 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=tabs-trigger][role=tab] "Senha"` | 56,7×29 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `button[data-slot=tabs-trigger][role=tab] "Senha"` | 58,7×29 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `input[data-slot=input-group-control] "Buscar"` | 221,9×36 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `input[data-slot=input-group-control] "Buscar"` | 223,9×36 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `input[data-slot=input-group-control] "Comando"` | 220,6×36 (< 44×44) | default/claro |
| Regra da Casa (Alvo) | 🟡 | concentrico | `input[data-slot=input-group-control] "Comando"` | 222,6×36 (< 44×44) | default/claro |
