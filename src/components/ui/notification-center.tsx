"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useTexto } from "@/lib/idioma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Notification = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Quando aconteceu, já formatado pelo produto ("há 5 min"). */
  time?: React.ReactNode;
  read?: boolean;
};

type ListProps = {
  notifications: Notification[];
  /** Clique numa notificação: o produto marca como lida e/ou navega. */
  onSelect?: (id: string) => void;
  onMarkAllRead?: () => void;
};

// Lista do popover. Exportada à parte para o produto usar numa página de
// notificações também.
function NotificationList({
  notifications,
  onSelect,
  onMarkAllRead,
  className,
}: ListProps & { className?: string }) {
  const t = useTexto();
  const naoLidas = notifications.filter((n) => !n.read).length;

  return (
    <div
      data-slot="notification-list"
      className={cn("flex flex-col gap-2", className)}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-medium">{t("notifications.titulo")}</h2>
        {naoLidas > 0 && (
          <Button variant="link" size="xs" onClick={onMarkAllRead}>
            {t("notifications.marcarTodas")}
          </Button>
        )}
      </div>
      {notifications.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          {t("notifications.vazio")}
        </p>
      ) : (
        <ul className="-mx-2 flex flex-col">
          {notifications.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                data-slot="notification-item"
                data-unread={!n.read}
                onClick={() => onSelect?.(n.id)}
                className="flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    n.read ? "bg-transparent" : "bg-primary",
                  )}
                />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className={cn(!n.read && "font-medium")}>
                    {!n.read && (
                      <span className="sr-only">
                        {t("notifications.naoLida")}:{" "}
                      </span>
                    )}
                    {n.title}
                  </span>
                  {n.description && (
                    <span className="text-muted-foreground">
                      {n.description}
                    </span>
                  )}
                  {n.time && (
                    <span className="text-xs text-muted-foreground">
                      {n.time}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Sino com contador de não lidas (Badge) que abre a lista num Popover. Os
// dados e o estado de lida são do produto: o componente só mostra e avisa.
function NotificationCenter({
  notifications,
  onSelect,
  onMarkAllRead,
  className,
  ...props
}: ListProps &
  Omit<React.ComponentProps<typeof Popover>, "children"> & {
    className?: string;
  }) {
  const t = useTexto();
  const naoLidas = notifications.filter((n) => !n.read).length;

  return (
    <Popover {...props}>
      <span
        data-slot="notification-center"
        className={cn("relative inline-flex", className)}
      >
        <PopoverTrigger asChild>
          <IconButton
            variant="ghost"
            icon={<Icon name="notifications" />}
            aria-label={
              naoLidas > 0
                ? t("notifications.botaoNaoLidas", { n: naoLidas })
                : t("notifications.titulo")
            }
          />
        </PopoverTrigger>
        {naoLidas > 0 && (
          <Badge
            data-slot="notification-center-count"
            aria-hidden="true"
            className="pointer-events-none absolute -top-0.5 -right-0.5 min-h-5 min-w-5 px-1 tabular-nums"
          >
            {naoLidas > 9 ? "9+" : naoLidas}
          </Badge>
        )}
      </span>
      <PopoverContent align="end" className="w-80">
        <NotificationList
          notifications={notifications}
          onSelect={onSelect}
          onMarkAllRead={onMarkAllRead}
        />
      </PopoverContent>
    </Popover>
  );
}

export { NotificationCenter, NotificationList };
export type { Notification };
