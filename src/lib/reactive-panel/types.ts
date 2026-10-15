/**
 * Tipos e Contratos da Arquitetura de Painéis Reativos (Inspirada no ToolJet)
 * Adaptada para o padrão Shadcn / Tailwind v4 no Design System local.
 */

export type WidgetActionFn = (...args: any[]) => void | Promise<void>;

export interface WidgetContract<
  TState extends Record<string, any> = Record<string, any>,
  TActions extends Record<string, WidgetActionFn> = Record<string, WidgetActionFn>
> {
  widgetId: string;
  exposedState?: TState;
  actions?: TActions;
}

export type EventCallback = (payload: any) => void;

export interface PanelContextValue {
  panelId: string;
  registerWidget: (widgetId: string, state: Record<string, any>, actions: Record<string, WidgetActionFn>) => void;
  unregisterWidget: (widgetId: string) => void;
  updateWidgetState: (widgetId: string, partialState: Record<string, any>) => void;
  getWidgetState: (widgetId: string, key?: string) => any;
  invokeAction: (widgetId: string, actionName: string, ...args: any[]) => Promise<void> | void;
  emitEvent: (sourceWidgetId: string, eventName: string, payload?: any) => void;
  subscribeEvent: (eventName: string, callback: EventCallback) => () => void;
  panelState: Record<string, Record<string, any>>;
}
