"use client";

import React, { useState } from "react";
import {
  PanelProvider,
  useWidgetContract,
  useWidgetState,
  usePanel,
} from "@/lib/reactive-panel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Customer {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Pro" | "Enterprise";
  status: "Ativo" | "Pendente" | "Inativo";
  spent: string;
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Acme Corp", email: "contact@acme.com", plan: "Enterprise", status: "Ativo", spent: "R$ 14.200" },
  { id: "c2", name: "Starlight Media", email: "tech@starlight.io", plan: "Pro", status: "Ativo", spent: "R$ 4.800" },
  { id: "c3", name: "Studio Lambda", email: "design@lambda.dev", plan: "Pro", status: "Pendente", spent: "R$ 3.200" },
  { id: "c4", name: "NovaTech Solutions", email: "ops@novatech.br", plan: "Free", status: "Inativo", spent: "R$ 0" },
];

/**
 * Widget 1: Tabela Reativa de Clientes
 * Assina o contrato expondo `selectedCustomer` e ações imperativas.
 */
function CustomerTableWidget() {
  const [selectedId, setSelectedId] = useState<string | null>("c1");
  const selectedCustomer = MOCK_CUSTOMERS.find((c) => c.id === selectedId) || null;

  const { emit } = useWidgetContract({
    widgetId: "customers-table",
    exposedState: {
      selectedCustomer,
      totalCount: MOCK_CUSTOMERS.length,
    },
    actions: {
      clearSelection: () => setSelectedId(null),
      selectFirst: () => setSelectedId(MOCK_CUSTOMERS[0]?.id || null),
    },
  });

  const handleSelect = (customer: Customer) => {
    setSelectedId(customer.id);
    emit("customerSelected", customer);
  };

  return (
    <Card className="col-span-12 lg:col-span-8 border-border/60 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight">Contas & Clientes</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Selecione um cliente para inspecionar métricas e ações no painel lateral
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-mono">
            {MOCK_CUSTOMERS.length} registros
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-45">Cliente</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Faturamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CUSTOMERS.map((customer) => {
              const isSelected = customer.id === selectedId;
              return (
                <TableRow
                  key={customer.id}
                  onClick={() => handleSelect(customer)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-muted/70 font-medium" : "hover:bg-muted/30"
                  }`}
                >
                  <TableCell className="font-medium text-foreground">{customer.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{customer.email}</TableCell>
                  <TableCell>
                    <Badge variant={customer.plan === "Enterprise" ? "default" : "secondary"} className="text-2xs">
                      {customer.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs ${
                        customer.status === "Ativo"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : customer.status === "Pendente"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="size-1.5 rounded-full bg-current" />
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">{customer.spent}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

/**
 * Widget 2: Inspetor Lateral Reativo
 * Consome o cliente selecionado na tabela sem acoplamento direto via `useWidgetState`.
 */
function CustomerInspectorWidget() {
  const panel = usePanel();
  const selectedCustomer = useWidgetState<Customer>("customers-table", "selectedCustomer");

  return (
    <Card className="col-span-12 lg:col-span-4 border-border/60 shadow-xs flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-sm font-semibold tracking-tight">Detalhes da Conta</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Sincronizado automaticamente via barramento reativo
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {selectedCustomer ? (
            <>
              <div className="space-y-1">
                <span className="text-2xs uppercase tracking-wider text-muted-foreground font-mono">Nome da Organização</span>
                <p className="text-base font-semibold text-foreground">{selectedCustomer.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg border border-border/40 bg-muted/20 p-2.5">
                  <span className="text-2xs text-muted-foreground">Nível do Plano</span>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{selectedCustomer.plan}</p>
                </div>
                <div className="rounded-lg border border-border/40 bg-muted/20 p-2.5">
                  <span className="text-2xs text-muted-foreground">Receita Acumulada</span>
                  <p className="text-sm font-mono font-semibold text-foreground mt-0.5">{selectedCustomer.spent}</p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <span className="text-2xs text-muted-foreground">Contato Principal</span>
                <p className="text-muted-foreground">{selectedCustomer.email}</p>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-muted-foreground">
              Nenhuma conta selecionada. Clique em uma linha da tabela para inspecionar.
            </div>
          )}
        </CardContent>
      </div>

      {selectedCustomer && (
        <div className="p-4 border-t border-border/40 bg-muted/10 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-8"
            onClick={() => panel.invokeAction("customers-table", "clearSelection")}
          >
            Limpar Seleção
          </Button>
          <Button size="sm" className="text-xs h-8">
            Gerenciar Acessos
          </Button>
        </div>
      )}
    </Card>
  );
}

/**
 * Padrão Completo: Dashboard com Barramento Reativo
 */
export function ReactiveDashboardPanel() {
  return (
    <PanelProvider id="main-analytics-dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">Painel de Operações</h2>
          <p className="text-xs text-muted-foreground">
            Exemplo de orquestração desacoplada: cada widget assina um contrato tridimensional (estado, eventos e ações).
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6 items-start">
          <CustomerTableWidget />
          <CustomerInspectorWidget />
        </div>
      </div>
    </PanelProvider>
  );
}
