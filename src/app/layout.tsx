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
  title: "shadcn/ui local",
  description: "Projeto local com shadcn/ui, todos os componentes e tokens de tema",
};

// Aplica o preset de estilo salvo ANTES da hidratação, para não piscar o
// estilo padrão por uma fração de segundo ao recarregar a página.
const setStyleScript = `
(function () {
  try {
    var style = window.localStorage.getItem("style-preset");
    if (style && style !== "default") {
      document.documentElement.setAttribute("data-style", style);
    }
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
