import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
