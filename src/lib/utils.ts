import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Utilitários de raio concêntrico (globals.css) entram no grupo "rounded":
// sem isso, rounded-inner não substitui o rounded-md de um componente base.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { rounded: ["rounded-inner", { "rounded-outer": [() => true] }] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Distância mínima entre qualquer conteúdo flutuante (tooltip, popover,
// menus, select, combobox) e a borda da tela: ao colidir, o conteúdo vira
// de lado e desliza pra dentro antes de encostar no limite do viewport.
export const FLOATING_COLLISION_PADDING = 8

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}
