import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Lora,
  Manrope,
  Poppins,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

// Uma variável CSS por fonte. Cada preset de estilo (ver globals.css)
// escolhe quais delas usar em --font-sans / --font-heading — todas ficam
// disponíveis o tempo todo no <html>, a troca é só de qual variável cada
// token aponta.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fontVariables = [
  inter.variable,
  lora.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
  poppins.variable,
  manrope.variable,
].join(" ");

export const metadata: Metadata = {
  title: "R.ds",
  description: "Projeto local com shadcn/ui, todos os componentes e tokens de tema",
  // 2026-07-22: pasta de favicon que o Rafael colocou na raiz do projeto —
  // movida pra public/ (Next.js só serve arquivos estáticos de lá; os
  // paths "/xxx.png" dentro do site.webmanifest já eram root-relative,
  // então tinham que ficar em public/ mesmo, não numa subpasta). Ícones e
  // manifest conectados via metadata (API oficial do App Router) em vez
  // de <link> manual no <head>.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Aplica o preset de estilo salvo ANTES da hidratação, para não piscar o
// estilo padrão por uma fração de segundo ao recarregar a página.
//
// 2026-07-22: também sincroniza a classe "dark" com o nativeMode do estilo
// (ver src/lib/styles-registry.ts). Antes desta mudança, midnight era o
// único preset que ficava escuro sem precisar da classe .dark — agora que
// todo estilo tem bloco claro E escuro completos em globals.css (pra
// resolver a divergência que o Rafael apontou), midnight PRECISA da classe
// .dark pra mostrar seu modo nativo. Como não existe (ainda) um toggle
// manual de tema no app, sincronizamos direto pelo nativeMode — se um
// toggle for adicionado depois, ele decide precisar rodar essa lógica só
// na ausência de uma preferência manual salva.
//
// Mapa duplicado aqui de propósito: script inline não importa módulo TS.
// Se adicionar um estilo novo em styles-registry.ts com nativeMode "dark",
// replicar a entrada aqui também.
const setStyleScript = `
(function () {
  var nativeModeByStyle = { midnight: "dark" };
  try {
    var style = window.localStorage.getItem("style-preset");
    if (style && style !== "default") {
      document.documentElement.setAttribute("data-style", style);
    }
    var mode = nativeModeByStyle[style] || "light";
    document.documentElement.classList.toggle("dark", mode === "dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`h-full antialiased ${fontVariables}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: setStyleScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
