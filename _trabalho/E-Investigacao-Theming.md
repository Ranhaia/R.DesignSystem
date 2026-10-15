---
tipo: epico
projeto: shadcn-local
status: aguardando
sinal: 🟡 Aguardando definição
criado: 2026-09-17
dono: 
---

# Épico: Investigação - Adaptação de Temas (Figma para Shadcn)

## 🧭 Contexto do Épico (Product Context)
Este documento guarda a metodologia estratégica para adaptar estilos visuais de clientes (Figma/Componentes soltos) para a base do `shadcn/ui`. O objetivo é realizar o **Theming** sem quebrar a estrutura atômica nativa do Shadcn e sem gerar CSS redundante.

Este Épico servirá de base quando formos importar o visual do cliente para o projeto oficial.

## ⚖️ Log de Decisões e Metodologia (Decision Log)

### 1. O Fluxo de Trabalho (Mapping -> Tradução -> Auditoria)
Quando o trabalho for iniciado, a IA (Claude/AGY) e o Designer devem seguir estritamente estes passos:
1. **O Mapping (Designer):** Fornecer os dados brutos do Figma (Cores hexadecimais, Tipografia principal, Radius de bordas). Não é necessário criar componentes novos nesta fase.
2. **A Tradução (IA - Engenharia):** A IA deve pegar os dados brutos e converter estritamente para o sistema de variáveis semânticas HSL do `globals.css` do Shadcn (ex: mapear o azul do cliente para `--primary`, o tom de fundo para `--background` e `--card`).
3. **Auditoria "Impeccable" (IA - Consultoria):** A IA deve analisar o contraste das cores traduzidas (ex: `--primary` vs `--primary-foreground`) e alertar o Designer sobre problemas de acessibilidade ou hierarquia visual que existam no Figma original antes de consolidar o código.

### 2. Padrão de Engenharia (Anti "Yes-Man")
- **Regra de Ouro:** Não gerar componentes customizados do zero para tentar imitar o Figma se o Shadcn já possuir um componente equivalente que possa ser resolvido via Theming (`globals.css`).
- Novos componentes via chat só devem ser criados *após* a injeção e validação do tema base.

### 3. Visão de Futuro: HMR e Edição Contextual
A base atômica configurada por este Épico preparará o terreno para a futura ferramenta de **Inspecionar + Voz**:
- Onde o clique em um elemento isola o token semântico (ex: `--surface-card`).
- O comando de voz instrui a IA via payload leve.
- A IA responde via *Function Calling* alterando exclusivamente a variável no CSS para atualização em tempo real (HMR).

## ✋ Estado Atual (Handoff)
- **Status:** Metodologia definida e documentada.
- **Bloqueio/Próximo Passo:** Configurar o Figma MCP e aguardar o Designer fornecer o arquivo do cliente.

## 🔌 Infraestrutura: Setup do Figma MCP
Quando formos retomar este projeto, a extração visual não será manual. O ambiente precisará do **Figma MCP** configurado:
1. **Token:** No Figma, vá em *Settings > Personal Access Tokens* e gere uma nova chave.
2. **Instalação:** No terminal, rodar o comando oficial para plugar o Figma na IA:
   `claude mcp add figma npx -y @modelcontextprotocol/server-figma "SEU_TOKEN_AQUI"`
3. **Uso:** Fornecer a URL do arquivo do cliente para a IA ler as camadas e exportar direto para o `globals.css`.

## ⚙️ Padrões de Código (System Patterns)
- **Animações (Performance-First):** É ESTRITAMENTE PROIBIDO o uso de bibliotecas pesadas (como Framer Motion) para enfeites visuais. Todas as animações do Design System devem ser codificadas em **CSS Nativo** (`transition`, `keyframes`, `transform`). O código deve se manter leve.
- **Componentes Estruturais:** Foco em componentes limpos e bem estruturados. Não inventar componentes se o Shadcn já possuir um equivalente cobrível via Theming.
- **Vídeo Automático:** Ignorar ferramentas pesadas (ComfyUI) para inserção de legendas/efeitos simples. Preferir DaVinci Resolve ou API direta (Gemini Omni) no futuro.
