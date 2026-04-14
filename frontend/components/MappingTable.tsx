'use client';
import { Settings2, Plus, ArrowRightLeft, Trash2 } from "lucide-react";

export interface MappingRule {
  id: string;
  colA: string;
  colB: string;
}

interface MappingTableProps {
  headersA: string[];
  headersB: string[];
  rules: MappingRule[];
  onAddRule: () => void;
  onUpdateRule: (id: string, field: 'colA' | 'colB', value: string) => void;
  onRemoveRule: (id: string) => void;
  tolerance: number;
  onToleranceChange: (val: number) => void;
}

export function MappingTable({
  headersA,
  headersB,
  rules,
  onAddRule,
  onUpdateRule,
  onRemoveRule,
  tolerance,
  onToleranceChange
}: MappingTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <Settings2 size={18} className="text-blue-500" />
          <h3 className="font-semibold">Reglas de Barrida (Cruce 1:1)</h3>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">TOLERANCIA NUMÉRICA (±)</span>
          <input 
            type="number" 
            step="0.01" 
            min="0"
            value={tolerance}
            onChange={(e) => onToleranceChange(parseFloat(e.target.value) || 0)}
            className="w-20 text-sm font-mono text-right bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-200 p-0 outline-none"
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="space-y-3">
          {/* Encabezados de tabla falsos */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-4 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div>Campo - Recurso A</div>
            <div className="w-8"></div>
            <div>Campo - Recurso B</div>
            <div className="w-8"></div>
          </div>

          <div className="space-y-3">
            {rules.map((rule) => (
              <div key={rule.id} className="grid grid-cols-[1fr_auto_1fr_auto] gap-4 items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                
                {/* Select A */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <select 
                    value={rule.colA}
                    onChange={(e) => onUpdateRule(rule.id, 'colA', e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 dark:text-slate-200"
                  >
                    <option value="">Seleccione columna...</option>
                    {headersA.map((h, i) => (
                      <option key={i} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                {/* Connector */}
                <div className="flex items-center justify-center text-slate-400">
                  <ArrowRightLeft size={16} />
                </div>

                {/* Select B */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                  <select 
                    value={rule.colB}
                    onChange={(e) => onUpdateRule(rule.id, 'colB', e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-purple-500 outline-none text-slate-700 dark:text-slate-200"
                  >
                    <option value="">Seleccione columna...</option>
                    {headersB.map((h, i) => (
                      <option key={i} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                {/* Delete Rule */}
                <button 
                  onClick={() => onRemoveRule(rule.id)}
                  disabled={rules.length === 1}
                  className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Eliminar regla"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button 
            onClick={onAddRule}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors border border-dashed border-blue-200 dark:border-blue-900 w-full justify-center"
          >
            <Plus size={16} /> Añadir regla de cruce
          </button>
        </div>
      </div>
    </div>
  );
}
