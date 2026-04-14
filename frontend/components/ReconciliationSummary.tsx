'use client';
import { CheckCircle2, AlertCircle, DollarSign, ListChecks, Info } from "lucide-react";

interface ReconciliationSummaryProps {
  totalA: number;
  matchedA: number;
  totalB: number;
  matchedB: number;
  totalValueDiff: number;
  adjusted: number;
}

export function ReconciliationSummary({ totalA, matchedA, totalB, matchedB, totalValueDiff, adjusted }: ReconciliationSummaryProps) {
  
  const pctA = totalA > 0 ? (matchedA / totalA) * 100 : 0;
  const pctB = totalB > 0 ? (matchedB / totalB) * 100 : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <ListChecks className="text-blue-600" />
          Revisión de Resultados (Pre-Match)
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Simulación completada
        </span>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Bars (2/3 width) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Recurso A Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700 dark:text-slate-300">Recurso A</span>
                <span className="text-slate-500">{matchedA} / {totalA} filas cruzadas</span>
              </div>
              <div className="w-full h-6 bg-red-500 dark:bg-red-500/80 rounded-md overflow-hidden flex relative shadow-inner">
                {/* Green part */}
                <div 
                  className="h-full bg-emerald-500 dark:bg-emerald-500 transition-all duration-1000 ease-out" 
                  style={{ width: `${pctA}%` }} 
                />
                
                {/* Labels inside bar */}
                <div className="absolute inset-0 flex text-[10px] font-bold text-white items-center">
                   {pctA > 5 && (
                     <div className="flex-1 px-2 flex justify-start items-center" style={{ maxWidth: `${pctA}%` }}>
                       {pctA.toFixed(1)}% CONCILIADO
                     </div>
                   )}
                   {(100 - pctA) > 5 && (
                     <div className="flex-1 px-2 flex justify-end items-center text-red-50">
                       {(100 - pctA).toFixed(1)}% PENDIENTE
                     </div>
                   )}
                </div>
              </div>
            </div>

            {/* Recurso B Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-700 dark:text-slate-300">Recurso B</span>
                <span className="text-slate-500">{matchedB} / {totalB} filas cruzadas</span>
              </div>
              <div className="w-full h-6 bg-red-500 dark:bg-red-500/80 rounded-md overflow-hidden flex relative shadow-inner">
                <div 
                  className="h-full bg-emerald-500 dark:bg-emerald-500 transition-all duration-1000 ease-out" 
                  style={{ width: `${pctB}%` }} 
                />
                <div className="absolute inset-0 flex text-[10px] font-bold text-white items-center">
                   {pctB > 5 && (
                     <div className="flex-1 px-2 flex justify-start items-center" style={{ maxWidth: `${pctB}%` }}>
                       {pctB.toFixed(1)}% CONCILIADO
                     </div>
                   )}
                   {(100 - pctB) > 5 && (
                     <div className="flex-1 px-2 flex justify-end items-center text-red-50">
                       {(100 - pctB).toFixed(1)}% PENDIENTE
                     </div>
                   )}
                </div>
              </div>
            </div>

          </div>

          {/* Metrics */}
          <div className="space-y-4 border-l border-slate-200 dark:border-slate-800 pl-8">
             <div>
               <p className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-500" /> Total Conciliable
               </p>
               <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                 {Math.min(matchedA, matchedB)}
                 <span className="text-sm font-normal text-slate-400 ml-2">pares</span>
               </p>
             </div>
             
             <div>
               <p className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-amber-500" /> Diferencia de Valores
               </p>
               <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                 <span className="text-lg text-slate-400">$</span>
                 {totalValueDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </p>
             </div>

             <div>
               <p className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1.5">
                  <Info size={14} className="text-blue-500" /> Ajustados
               </p>
               <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                 {adjusted}
                 <span className="text-sm font-normal text-slate-400 ml-2">registros tolerados</span>
               </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
