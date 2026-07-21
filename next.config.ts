import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do workspace pro Turbopack — sem isso, o Next detecta um
  // package-lock.json extra em C:\Users\rca_1\ (fora da pasta do projeto)
  // e tenta inferir a raiz sozinho, o que pode confundir a resolução de
  // assets/chunks. Ver aviso "Next.js inferred your workspace root".
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "avatar.vercel.sh" },
    ],
  },
};

export default nextConfig;
