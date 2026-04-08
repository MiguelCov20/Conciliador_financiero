'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ConciliationRecord {
  id: string;
  name: string;
  date: string;
  filesCount: number;
  status: 'completed' | 'processing';
  headers: string[];
  rows: Record<string, any>[];
}

const INITIAL_CONCILIATIONS: ConciliationRecord[] = [];

interface ConciliationContextType {
  conciliations: ConciliationRecord[];
  activeConciliation: ConciliationRecord | null;
  addConciliation: (name: string, headers: string[], rows: Record<string, any>[], filesCount?: number) => void;
  setActiveConciliation: (id: string | null) => void;
  addColumnToActive: (colName: string) => void;
}

const ConciliationContext = createContext<ConciliationContextType | undefined>(undefined);

export function ConciliationProvider({ children }: { children: ReactNode }) {
  const [conciliations, setConciliations] = useState<ConciliationRecord[]>(INITIAL_CONCILIATIONS);
  const [activeConciliationId, setActiveConciliationId] = useState<string | null>(null);

  const addConciliation = (name: string, headers: string[], rows: Record<string, any>[], filesCount: number = 1) => {
    const newConciliation: ConciliationRecord = {
      id: `c${Date.now()}`,
      name,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      filesCount,
      status: 'completed',
      headers,
      rows
    };
    setConciliations(prev => [newConciliation, ...prev]);
    setActiveConciliationId(newConciliation.id);
  };

  const addColumnToActive = (colName: string) => {
    if (!activeConciliationId) return;
    
    setConciliations(prev => prev.map(c => {
      if (c.id === activeConciliationId) {
        // Añadir a headers
        const newHeaders = [...c.headers, colName];
        // Añadir a todas las filas con un valor vacío
        const newRows = c.rows.map(row => ({ ...row, [colName]: '' }));
        return { ...c, headers: newHeaders, rows: newRows };
      }
      return c;
    }));
  };

  const activeConciliation = conciliations.find(c => c.id === activeConciliationId) || null;

  return (
    <ConciliationContext.Provider value={{
      conciliations,
      activeConciliation,
      addConciliation,
      setActiveConciliation: setActiveConciliationId,
      addColumnToActive
    }}>
      {children}
    </ConciliationContext.Provider>
  );
}

export function useConciliation() {
  const context = useContext(ConciliationContext);
  if (context === undefined) {
    throw new Error('useConciliation must be used within a ConciliationProvider');
  }
  return context;
}
