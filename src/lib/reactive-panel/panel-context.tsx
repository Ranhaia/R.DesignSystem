"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import type {
  PanelContextValue,
  WidgetContract,
  WidgetActionFn,
  EventCallback,
} from "./types";

const PanelContext = createContext<PanelContextValue | null>(null);

export interface PanelProviderProps {
  id?: string;
  children: ReactNode;
}

export function PanelProvider({ id = "default-panel", children }: PanelProviderProps) {
  // Estado global do painel: { [widgetId]: { ...state } }
  const [panelState, setPanelState] = useState<Record<string, Record<string, any>>>({});

  // Armazenamento em ref para ações e listeners (evita recriação desnecessária)
  const actionsRegistryRef = useRef<Record<string, Record<string, WidgetActionFn>>>({});
  const eventListenersRef = useRef<Record<string, Set<EventCallback>>>({});

  const registerWidget = useCallback(
    (widgetId: string, state: Record<string, any>, actions: Record<string, WidgetActionFn>) => {
      actionsRegistryRef.current[widgetId] = actions;
      setPanelState((prev) => ({
        ...prev,
        [widgetId]: state,
      }));
    },
    []
  );

  const unregisterWidget = useCallback((widgetId: string) => {
    delete actionsRegistryRef.current[widgetId];
    setPanelState((prev) => {
      const next = { ...prev };
      delete next[widgetId];
      return next;
    });
  }, []);

  const updateWidgetState = useCallback((widgetId: string, partialState: Record<string, any>) => {
    setPanelState((prev) => ({
      ...prev,
      [widgetId]: {
        ...(prev[widgetId] || {}),
        ...partialState,
      },
    }));
  }, []);

  const getWidgetState = useCallback(
    (widgetId: string, key?: string) => {
      const wState = panelState[widgetId];
      if (!wState) return undefined;
      return key ? wState[key] : wState;
    },
    [panelState]
  );

  const invokeAction = useCallback(
    async (widgetId: string, actionName: string, ...args: any[]) => {
      const widgetActions = actionsRegistryRef.current[widgetId];
      if (!widgetActions || !widgetActions[actionName]) {
        console.warn(`[PanelProvider] Ação "${actionName}" não encontrada no widget "${widgetId}".`);
        return;
      }
      return widgetActions[actionName](...args);
    },
    []
  );

  const emitEvent = useCallback((sourceWidgetId: string, eventName: string, payload?: any) => {
    const qualifiedEvent = `${sourceWidgetId}:${eventName}`;
    const specificListeners = eventListenersRef.current[qualifiedEvent];
    const genericListeners = eventListenersRef.current[eventName];

    specificListeners?.forEach((cb) => cb(payload));
    genericListeners?.forEach((cb) => cb(payload));
  }, []);

  const subscribeEvent = useCallback((eventName: string, callback: EventCallback) => {
    if (!eventListenersRef.current[eventName]) {
      eventListenersRef.current[eventName] = new Set();
    }
    eventListenersRef.current[eventName].add(callback);

    return () => {
      eventListenersRef.current[eventName]?.delete(callback);
    };
  }, []);

  return (
    <PanelContext.Provider
      value={{
        panelId: id,
        registerWidget,
        unregisterWidget,
        updateWidgetState,
        getWidgetState,
        invokeAction,
        emitEvent,
        subscribeEvent,
        panelState,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel(): PanelContextValue {
  const ctx = useContext(PanelContext);
  if (!ctx) {
    throw new Error("usePanel deve ser usado dentro de um <PanelProvider />");
  }
  return ctx;
}

/**
 * Hook para um componente assinar o contrato tridimensional de Widget com o painel.
 */
export function useWidgetContract<
  TState extends Record<string, any>,
  TActions extends Record<string, WidgetActionFn>
>(contract: WidgetContract<TState, TActions>) {
  const panel = usePanel();
  const { widgetId, exposedState = {} as TState, actions = {} as TActions } = contract;

  // Atualiza ações no registro
  useEffect(() => {
    panel.registerWidget(widgetId, exposedState, actions);
    return () => {
      panel.unregisterWidget(widgetId);
    };
  }, [widgetId]);

  // Sincroniza estado exposto quando muda
  useEffect(() => {
    panel.updateWidgetState(widgetId, exposedState);
  }, [widgetId, JSON.stringify(exposedState)]);

  const emit = useCallback(
    (eventName: string, payload?: any) => {
      panel.emitEvent(widgetId, eventName, payload);
    },
    [panel, widgetId]
  );

  return {
    emit,
    panel,
  };
}

/**
 * Hook para ler reativamente o estado exposto por outro widget no painel.
 */
export function useWidgetState<T = any>(widgetId: string, key?: string): T | undefined {
  const panel = usePanel();
  const widgetState = panel.panelState[widgetId];

  if (!widgetState) return undefined;
  return key ? widgetState[key] : (widgetState as T);
}
