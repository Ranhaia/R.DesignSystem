"use client";

import * as React from "react";

import { useTexto } from "@/lib/idioma";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

// Lista que se reordena arrastando: ponteiro (mouse, toque, caneta) pela alça
// e teclado no modo pegar–mover–soltar (Espaço/Enter pega, setas movem,
// Espaço/Enter solta, Esc cancela). Sem biblioteca: o item erguido segue o
// ponteiro, um marcador mostra onde cai, e a ordem muda uma vez, ao soltar.
// A lista é controlada: quem usa guarda a ordem e recebe a nova em onReordenar.

type Orientacao = "vertical" | "horizontal";
type EstadoTeclado = { pego: string | null; origem: number | null };
type Anuncio = {
  tipo: "pegou" | "moveu" | "soltou" | "cancelou";
  posicao: number;
};

function mover<T>(lista: T[], de: number, para: number) {
  const nova = [...lista];
  nova.splice(para, 0, ...nova.splice(de, 1));
  return nova;
}

/** Índice final do item arrastado: quantos outros itens têm o meio antes do ponteiro. */
function destinoPorMeio(meios: number[], de: number, ponteiro: number) {
  return meios.filter((m, i) => i !== de && m < ponteiro).length;
}

const SETAS: Record<Orientacao, Record<string, number>> = {
  vertical: { ArrowUp: -1, ArrowDown: 1 },
  horizontal: { ArrowLeft: -1, ArrowRight: 1 },
};

/** Teclado do modo pegar–mover–soltar. null: a tecla não faz nada aqui. */
function teclaNaLista(
  ids: string[],
  estado: EstadoTeclado,
  id: string,
  tecla: string,
  orientacao: Orientacao = "vertical",
): { ordem?: string[]; estado: EstadoTeclado; anuncio: Anuncio } | null {
  const i = ids.indexOf(id);
  const livre = { pego: null, origem: null };
  if (estado.pego !== id) {
    return tecla === " " || tecla === "Enter"
      ? {
          estado: { pego: id, origem: i },
          anuncio: { tipo: "pegou", posicao: i + 1 },
        }
      : null;
  }
  if (tecla === " " || tecla === "Enter")
    return { estado: livre, anuncio: { tipo: "soltou", posicao: i + 1 } };
  if (tecla === "Escape") {
    const origem = estado.origem ?? i;
    return {
      ordem: mover(ids, i, origem),
      estado: livre,
      anuncio: { tipo: "cancelou", posicao: origem + 1 },
    };
  }
  const passo = SETAS[orientacao][tecla];
  const para = i + (passo ?? 0);
  if (!passo || para < 0 || para >= ids.length) return null;
  return {
    ordem: mover(ids, i, para),
    estado,
    anuncio: { tipo: "moveu", posicao: para + 1 },
  };
}

type Arrasto = {
  id: string;
  pointerId: number;
  de: number;
  inicio: number;
  delta: number;
  destino: number;
};

function SortableList<T>({
  itens,
  idDoItem,
  rotuloDoItem,
  onReordenar,
  children,
  orientacao = "vertical",
  className,
  "aria-label": ariaLabel,
}: {
  itens: T[];
  idDoItem: (item: T) => string;
  /** Nome do item na alça e nos anúncios ("Reordenar Revisar"). */
  rotuloDoItem: (item: T) => string;
  /** Nova ordem, ao soltar (ponteiro) ou a cada seta (teclado). */
  onReordenar: (itens: T[]) => void;
  /** Conteúdo de cada item, ao lado da alça. */
  children: (item: T) => React.ReactNode;
  orientacao?: Orientacao;
  className?: string;
  "aria-label": string;
}) {
  const t = useTexto();
  const lista = React.useRef<HTMLUListElement>(null);
  const alcas = React.useRef(new Map<string, HTMLButtonElement>());
  const movendo = React.useRef<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const [teclado, setTeclado] = React.useState<EstadoTeclado>({
    pego: null,
    origem: null,
  });
  // o ref é a verdade do arrasto (eventos de ponteiro chegam antes do render); o state só pinta
  const arrastoRef = React.useRef<Arrasto | null>(null);
  const [arrasto, setArrastoState] = React.useState<Arrasto | null>(null);
  const setArrasto = (a: Arrasto | null) => {
    arrastoRef.current = a;
    setArrastoState(a);
  };
  const [aviso, setAviso] = React.useState("");
  const ids = itens.map(idDoItem);
  const horizontal = orientacao === "horizontal";

  // limpa e reescreve com atraso: o refoco da alça depois de mover não engole o anúncio
  const anunciar = (item: T, a: Anuncio) => {
    clearTimeout(timer.current);
    setAviso("");
    const vars = {
      item: rotuloDoItem(item),
      n: a.posicao,
      total: itens.length,
    };
    timer.current = setTimeout(
      () => setAviso(t(`sortableList.${a.tipo}`, vars)),
      500,
    );
  };
  React.useEffect(() => () => clearTimeout(timer.current), []);

  // o React reinsere o nó ao reordenar e a alça perde o foco: devolve
  React.useLayoutEffect(() => {
    if (!movendo.current) return;
    alcas.current.get(movendo.current)?.focus({ preventScroll: true });
    alcas.current
      .get(movendo.current)
      ?.closest("li")
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
    movendo.current = null;
  });

  const aplicar = (id: string, ordem: string[]) => {
    movendo.current = id;
    onReordenar(ordem.map((x) => itens[ids.indexOf(x)]));
  };

  const naTecla = (item: T, e: React.KeyboardEvent) => {
    if (arrastoRef.current) return; // ponteiro arrastando: o teclado espera
    const id = idDoItem(item);
    const r = teclaNaLista(ids, teclado, id, e.key, orientacao);
    if (!r) return;
    e.preventDefault();
    setTeclado(r.estado);
    if (r.ordem && r.ordem.join() !== ids.join()) aplicar(id, r.ordem);
    anunciar(item, r.anuncio);
  };

  // meios dos itens no eixo da lista, pelo layout (não pelo que está pintado)
  const meios = () =>
    [...(lista.current?.children ?? [])].map((el) => {
      const li = el as HTMLElement;
      return horizontal
        ? li.offsetLeft + li.offsetWidth / 2
        : li.offsetTop + li.offsetHeight / 2;
    });

  const posicaoNaLista = (e: React.PointerEvent) => {
    const ul = lista.current!;
    const r = ul.getBoundingClientRect();
    return horizontal
      ? e.clientX - r.left + ul.scrollLeft - ul.clientLeft
      : e.clientY - r.top + ul.scrollTop - ul.clientTop;
  };

  const fimDoArrasto = (soltar: boolean) => {
    const a = arrastoRef.current;
    if (!a) return; // já terminou (pointerup seguido de lostpointercapture)
    setArrasto(null);
    const de = ids.indexOf(a.id); // pelo id: a lista pode ter mudado por fora durante o arrasto
    if (de < 0) return;
    if (soltar && a.destino !== de) {
      aplicar(a.id, mover(ids, de, a.destino));
      anunciar(itens[de], { tipo: "soltou", posicao: a.destino + 1 });
    } else if (!soltar)
      anunciar(itens[de], { tipo: "cancelou", posicao: de + 1 });
  };

  // Esc cancela o arrasto mesmo sem foco na alça (Safari e Firefox no Mac não focam botão no clique)
  const fimRef = React.useRef(fimDoArrasto);
  React.useLayoutEffect(() => {
    fimRef.current = fimDoArrasto;
  });
  React.useEffect(() => {
    if (!arrasto?.id) return;
    const naTeclaGlobal = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      fimRef.current(false);
    };
    document.addEventListener("keydown", naTeclaGlobal, true);
    return () => document.removeEventListener("keydown", naTeclaGlobal, true);
  }, [arrasto?.id]);

  // marcador no vão entre os vizinhos do destino; nada quando cai no mesmo lugar
  const marcador = (() => {
    if (!arrasto || arrasto.destino === arrasto.de || !lista.current)
      return null;
    const outros = [...lista.current.children].filter(
      (_, i) => i !== arrasto.de,
    ) as HTMLElement[];
    const antes = outros[arrasto.destino - 1];
    const depois = outros[arrasto.destino];
    const fimDe = (el: HTMLElement) =>
      horizontal
        ? el.offsetLeft + el.offsetWidth
        : el.offsetTop + el.offsetHeight;
    const inicioDe = (el: HTMLElement) =>
      horizontal ? el.offsetLeft : el.offsetTop;
    const pos =
      antes && depois
        ? (fimDe(antes) + inicioDe(depois)) / 2
        : antes
          ? fimDe(antes)
          : inicioDe(depois);
    return pos;
  })();

  return (
    <div data-slot="sortable-list" className={className}>
      {/* marcador e ul no mesmo contêiner relativo: o offset do ul vale para o marcador, com qualquer padding na raiz */}
      <div className="relative">
        <ul
          ref={lista}
          aria-label={ariaLabel}
          data-orientacao={orientacao}
          className={cn(
            "relative flex gap-2",
            horizontal ? "flex-row" : "flex-col",
            arrasto && "cursor-grabbing select-none **:cursor-grabbing",
          )}
        >
          {itens.map((item, i) => {
            const id = idDoItem(item);
            const pego = teclado.pego === id;
            const erguido = arrasto?.id === id;
            return (
              <li
                key={id}
                data-slot="sortable-list-item"
                data-pego={pego || erguido || undefined}
                className={cn(
                  "group/item relative flex items-center gap-2 rounded-md border bg-card p-2 text-sm text-card-foreground has-[[data-slot=sortable-list-handle]:focus-visible]:ring-[3px] has-[[data-slot=sortable-list-handle]:focus-visible]:ring-ring",
                  (pego || erguido) && "z-10 scale-102 shadow-lg",
                  erguido && "pointer-events-none",
                )}
                style={
                  erguido
                    ? {
                        translate: horizontal
                          ? `${arrasto.delta}px 0`
                          : `0 ${arrasto.delta}px`,
                      }
                    : undefined
                }
              >
                <button
                  type="button"
                  data-slot="sortable-list-handle"
                  ref={(el) => {
                    if (el) alcas.current.set(id, el);
                    else alcas.current.delete(id);
                  }}
                  aria-label={t("sortableList.reordenar", {
                    item: rotuloDoItem(item),
                  })}
                  aria-pressed={pego}
                  className="inline-flex size-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-sm text-muted-foreground outline-none select-none hover:bg-accent focus-visible:bg-accent aria-pressed:bg-primary aria-pressed:text-primary-foreground"
                  onKeyDown={(e) => naTecla(item, e)}
                  onBlur={() => {
                    // sair da alça solta o item; o blur do próprio movimento não conta
                    if (pego && movendo.current !== id) {
                      setTeclado({ pego: null, origem: null });
                      anunciar(item, { tipo: "soltou", posicao: i + 1 });
                    }
                  }}
                  onPointerDown={(e) => {
                    if (e.button !== 0 || arrastoRef.current) return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setArrasto({
                      id,
                      pointerId: e.pointerId,
                      de: i,
                      inicio: posicaoNaLista(e),
                      delta: 0,
                      destino: i,
                    });
                  }}
                  onPointerMove={(e) => {
                    const a = arrastoRef.current;
                    if (a?.pointerId !== e.pointerId) return;
                    const p = posicaoNaLista(e);
                    setArrasto({
                      ...a,
                      delta: p - a.inicio,
                      destino: destinoPorMeio(meios(), a.de, p),
                    });
                  }}
                  onPointerUp={(e) =>
                    arrastoRef.current?.pointerId === e.pointerId &&
                    fimDoArrasto(true)
                  }
                  onPointerCancel={(e) =>
                    arrastoRef.current?.pointerId === e.pointerId &&
                    fimDoArrasto(false)
                  }
                  // perdeu a captura sem pointerup (nó removido, outra captura): cancela
                  onLostPointerCapture={() =>
                    arrastoRef.current?.id === id && fimDoArrasto(false)
                  }
                >
                  <Icon name="drag_indicator" size={1.25} aria-hidden="true" />
                </button>
                <div className="min-w-0 flex-1">{children(item)}</div>
                <span
                  aria-hidden="true"
                  className="hidden text-xs text-muted-foreground group-has-[[data-slot=sortable-list-handle]:focus-visible]/item:inline"
                >
                  {pego ? t("sortableList.dicaPego") : t("sortableList.dica")}
                </span>
              </li>
            );
          })}
        </ul>
        {marcador !== null && (
          <div
            aria-hidden="true"
            data-slot="sortable-list-marker"
            className={cn(
              "pointer-events-none absolute rounded-full bg-primary",
              horizontal ? "inset-y-0 w-0.5" : "inset-x-0 h-0.5",
            )}
            style={horizontal ? { left: marcador - 1 } : { top: marcador - 1 }}
          />
        )}
      </div>
      <p role="status" className="sr-only">
        {aviso}
      </p>
    </div>
  );
}

export { SortableList, destinoPorMeio, mover, teclaNaLista };
