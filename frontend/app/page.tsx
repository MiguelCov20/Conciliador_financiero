'use client';
import { Plus, Calendar, FileBox, ChevronDown, Download, Filter, Search, ArrowLeft, Table as TableIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useConciliation, ConciliationRecord } from "../context/ConciliationContext";
import * as XLSX from "xlsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Home() {
  const { conciliations, activeConciliation, setActiveConciliation, addColumnToActive } = useConciliation();
  const [statusFilter, setStatusFilter] = useState("Todos");

  const handleDownload = () => {
    if (!activeConciliation || !activeConciliation.rows?.length) return;
    
    // Filtramos lo que está viendo el usuario para exportar
    const rowsToExport = statusFilter === "Todos" 
      ? activeConciliation.rows 
      : activeConciliation.rows.filter((r: any) => r["Estado"] === statusFilter);

    const worksheet = XLSX.utils.json_to_sheet(rowsToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resultados Unificados");
    XLSX.writeFile(workbook, `Conciliacion_${activeConciliation.name.replace(/\s+/g, '_')}.xlsx`);
  };

  const handleAddColumn = () => {
    const colName = window.prompt("Nombre de la nueva columna:");
    if (colName && colName.trim() !== "") {
      addColumnToActive(colName);
    }
  };

  const handlePivot = () => {
    alert("Función de Tabla Dinámica en desarrollo...");
  };

  // 1. Gráfica de Distribución (Pie Chart) basada explícitamente en el "Estado"
  const getPieData = (rows: any[]) => {
    if (!rows || rows.length === 0) return [];
    
    const grouping: Record<string, number> = {};
    rows.forEach(row => {
      const val = row['Estado'] || "Desconocido";
      grouping[val] = (grouping[val] || 0) + 1;
    });

    return Object.entries(grouping).map(([key, value]) => ({ name: key, value }));
  };

  // 2. Gráfica de Montos Totales / Volúmenes (Recurso A vs Recurso B)
  const getBarData = (rows: any[]) => {
    if (!rows || rows.length === 0) return [];
    let volA = 0;
    let volB = 0;
    
    rows.forEach(r => {
       if (r['Estado'] !== 'No en A') volA++;
       if (r['Estado'] !== 'No en B') volB++;
    });

    return [
      { name: "Recurso A", Volúmen: volA },
      { name: "Recurso B", Volúmen: volB }
    ];
  };

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#64748b', '#3b82f6'];

  // Vista de Detalle
  if (activeConciliation) {
    const pieData = getPieData(activeConciliation.rows);
    const barData = getBarData(activeConciliation.rows);

    const filteredRows = activeConciliation.rows?.filter((row: any) => {
      if (statusFilter === "Todos") return true;
      return row["Estado"] === statusFilter;
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setActiveConciliation(null); setStatusFilter("Todos"); }}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 truncate max-w-xs">{activeConciliation.name}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap">
             {/* Filtro Rápido de Estado */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Filter size={16} />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-3 pr-8 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-200"
              >
                <option value="Todos">Ver Todos ({activeConciliation.rows.length})</option>
                <option value="Conciliado">✓ Conciliados</option>
                <option value="Diferencia">⚠ Diferencias</option>
                <option value="No en B">✖ Solo en A</option>
                <option value="No en A">✖ Solo en B</option>
              </select>
            </div>
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
              <Download size={16} /> Descargar Excel
            </button>
            <button onClick={handleAddColumn} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              <Plus size={16} /> Agregar Columna
            </button>
          </div>
        </div>

        {/* TABLA DE DATOS UNIFICADA */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col max-h-[500px]">
          <div className="flex-1 overflow-x-auto overflow-y-auto w-full">
            <table className="w-full text-sm text-left border-collapse min-w-max">
              <thead className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 sticky top-0 z-10">
                <tr className="bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 shadow-sm">
                  {/* Encabezados Dinámicos Unificados */}
                  {activeConciliation.headers?.map((header, idx) => {
                    const isSystemCol = header === 'Estado' || header === 'Diferencia_Monto';
                    const isBCold = header.startsWith('B_');
                    return (
                      <th 
                        key={idx} 
                        className={`border-x border-slate-200 dark:border-slate-700 px-6 py-4 font-semibold whitespace-nowrap ${isSystemCol ? 'bg-blue-50/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300' : ''} ${isBCold ? 'bg-purple-50/30 dark:bg-purple-900/20' : ''}`}
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredRows && filteredRows.length > 0 ? (
                  filteredRows.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 transition-colors">
                      {activeConciliation.headers.map((header, idx) => {
                        const val = row[header];
                        const isEstado = header === 'Estado';
                        
                        let cellContent = val !== undefined ? String(val) : '';
                        
                        return (
                          <td key={idx} className="border-r border-slate-200 dark:border-slate-700 px-6 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                            {isEstado ? (
                              <span className={`px-3 py-1.5 text-xs font-bold rounded-full border ${
                                val === 'Conciliado' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800' :
                                val === 'Diferencia' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800' :
                                val === 'No en B' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                              }`}>
                                {val}
                              </span>
                            ) : (
                              cellContent
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeConciliation.headers?.length || 1} className="text-center py-16 text-slate-500">
                      No hay registros que coincidan con este filtro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md text-sm font-medium shadow-sm">Vista Original</button>
              <button onClick={handlePivot} className="px-4 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md text-sm font-medium flex items-center gap-1">
                <TableIcon size={14} /> Tabla dinámica
              </button>
            </div>
            <div className="text-sm font-bold text-slate-500 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-900 shadow-inner">
              Mostrando {filteredRows?.length || 0} de {activeConciliation.rows?.length || 0}
            </div>
          </div>
        </div>

        {/* DASHBOARDS DINÁMICOS PARA LA CONCILIACION ACTIVA */}
        {pieData.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 mt-6">
             <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div> Distribución de Resultados
                </h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} label>
                         {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
             </div>
             
             <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase mb-4 flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-purple-500"></div> Volumen Total de Registros
                </h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Volúmen" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  // Vista de Lista
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Conciliaciones Creadas</h1>
        <Link href="/cargar">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all">
            <Plus size={20} />
            Crear nueva conciliación
          </button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[200px]">
        {conciliations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center h-full">
            <FileBox size={48} className="mb-4 text-slate-300 dark:text-slate-700" />
            No tienes conciliaciones activas. Haz clic en superior derecho para empezar.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {conciliations.map((conciliacion) => (
              <div 
                key={conciliacion.id} 
                className="group flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                onClick={() => setActiveConciliation(conciliacion.id)}
              >
                <div className="flex-1">
                  <span className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-left">
                    {conciliacion.name}
                  </span>
                </div>
                
                <div className="flex-1 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  <Calendar size={16} />
                  <div>
                    <span className="block text-slate-700 dark:text-slate-300">{conciliacion.date}</span>
                    <span className="text-xs">Fecha de creación</span>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-end gap-12">
                  <div className="text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300 block">{conciliacion.filesCount} Archivos Procesados</span>
                    <span className="text-blue-500 text-xs flex items-center gap-1 mt-0.5 hover:underline">
                      Abrir Reporte <ChevronDown size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DASHBOARDS GENERALES */}
       <div className="pt-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Métricas Globales</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-center items-center">
            <h2 className="text-sm font-medium text-slate-500 uppercase">Total Análisis</h2>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mt-4">{conciliations.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-center items-center">
             <h2 className="text-sm font-medium text-slate-500 uppercase">Fuentes Mapeadas</h2>
             <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-4">
                {conciliations.reduce((sum, item) => sum + item.filesCount, 0)}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}