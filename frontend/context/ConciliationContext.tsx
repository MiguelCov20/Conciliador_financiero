'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ConciliationRecord {
  id: string;
  name: string;
  date: string;
  filesCount: number;
  status: 'completed' | 'processing';
  details?: any[]; // The mock table data
}

// Datos falsos para mostrar la tabla como en la Imagen 4
const MOCK_TABLE_DATA = [
  { id: 1, fecha: '1/2/2020', monto: '$23.562', cards: 'VISA', nombres: 'Tienda_1', pais: 'Colombia', caja: '0001', prodRef: 'Ref_1549685', adminDept: 'A_1', noDatos: 0, internalId: 1 },
  { id: 2, fecha: '2/2/2020', monto: '$5.456', cards: 'VISA', nombres: 'Tienda_1', pais: 'Colombia', caja: '0001', prodRef: 'Ref_6514841', adminDept: 'A_1', noDatos: 0, internalId: 1 },
  { id: 3, fecha: '3/2/2020', monto: '$2.124', cards: 'VISA', nombres: 'Tienda_1', pais: 'Colombia', caja: '0001', prodRef: 'Ref_1549685', adminDept: 'A_1', noDatos: 0, internalId: 2 },
  { id: 4, fecha: '4/2/2020', monto: '$14.156', cards: 'Mastercard', nombres: 'Tienda_20', pais: 'México', caja: '0002', prodRef: 'Ref_00515864', adminDept: 'A_1', noDatos: 0, internalId: 3 },
  { id: 5, fecha: '5/2/2020', monto: '$78.541', cards: 'Mastercard', nombres: 'Tienda_20', pais: 'México', caja: '0002', prodRef: 'Ref_6514841', adminDept: 'A_1', noDatos: 0, internalId: 3 },
  { id: 6, fecha: '6/2/2020', monto: '$14.561', cards: 'Mastercard', nombres: 'Tienda_1', pais: 'Colombia', caja: '0001', prodRef: 'Ref_1549685', adminDept: 'A_1', noDatos: 0, internalId: 3 },
  { id: 7, fecha: '7/2/2020', monto: '$23.562', cards: 'VISA', nombres: 'Tienda_20', pais: 'México', caja: '0002', prodRef: 'Ref_31502156', adminDept: 'A_1', noDatos: 0, internalId: 3 },
  { id: 8, fecha: '8/2/2020', monto: '$23.562', cards: 'VISA', nombres: 'Tienda_1', pais: 'Colombia', caja: '0001', prodRef: 'Ref_1549685', adminDept: 'A_1', noDatos: 0, internalId: 2 },
  { id: 9, fecha: '9/2/2020', monto: '$10.000', cards: 'VISA', nombres: 'Tienda_20', pais: 'México', caja: '0002', prodRef: 'Ref_31502156', adminDept: 'A_1', noDatos: 0, internalId: 2 },
  { id: 10, fecha: '10/2/2020', monto: '$45.156', cards: 'Mastercard', nombres: 'Tienda_20', pais: 'México', caja: '0002', prodRef: 'Ref_31502156', adminDept: 'A_1', noDatos: 0, internalId: 1 }
];

const INITIAL_CONCILIATIONS: ConciliationRecord[] = [
  { id: 'c1', name: 'Transacciones de BANCO NACIONAL', date: '25 Septiembre, 2020', filesCount: 10, status: 'completed' },
  { id: 'c2', name: 'Tarjetas VISA Noviembre', date: '25 Septiembre, 2020', filesCount: 10, status: 'completed' },
  { id: 'c3', name: 'Devoluciones de ENERO / FEBRERO', date: '25 Septiembre, 2020', filesCount: 10, status: 'completed' },
  { id: 'c4', name: 'Devoluciones de MARZO / MAYO', date: '25 Septiembre, 2020', filesCount: 10, status: 'completed' },
  { id: 'c5', name: 'BONOS Y CUPONES / rechazados', date: '25 Septiembre, 2020', filesCount: 10, status: 'completed' },
  { id: 'c6', name: 'Movimientos TIENDAS NACIONALES', date: '25 Septiembre, 2020', filesCount: 10, status: 'completed' }
];

interface ConciliationContextType {
  conciliations: ConciliationRecord[];
  activeConciliation: ConciliationRecord | null;
  addConciliation: (name: string) => void;
  setActiveConciliation: (id: string | null) => void;
}

const ConciliationContext = createContext<ConciliationContextType | undefined>(undefined);

export function ConciliationProvider({ children }: { children: ReactNode }) {
  const [conciliations, setConciliations] = useState<ConciliationRecord[]>(INITIAL_CONCILIATIONS);
  const [activeConciliationId, setActiveConciliationId] = useState<string | null>(null);

  const addConciliation = (name: string) => {
    const newConciliation: ConciliationRecord = {
      id: `c${Date.now()}`,
      name,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      filesCount: 2, // Simulado 2 fuentes
      status: 'completed',
      details: MOCK_TABLE_DATA // Le asignamos datos para mostrar en la tabla
    };
    // Lo agregamos al inicio de la lista
    setConciliations(prev => [newConciliation, ...prev]);
    // Lo activamos inmediatamente para verlo en el dashboard
    setActiveConciliationId(newConciliation.id);
  };

  const activeConciliation = conciliations.find(c => c.id === activeConciliationId) || null;

  return (
    <ConciliationContext.Provider value={{
      conciliations,
      activeConciliation,
      addConciliation,
      setActiveConciliation: setActiveConciliationId
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
