'use client';
import { Plus, Calendar, FileBox, ChevronDown, Download, Filter, Search, ArrowLeft, Table as TableIcon } from "lucide-react";
import Link from "next/link";
import { useConciliation, ConciliationRecord } from "../context/ConciliationContext";
import Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Home() {
  const { conciliations, activeConciliation, setActiveConciliation, addColumnToActive } = useConciliation();

  const handleDownload = () => {
    if (!activeConciliation || !activeConciliation.rows?.length) return;
    const csv = Papa.unparse(activeConciliation.rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `conciliacion_${activeConciliation.name.replace(/\s+/g, '_')}.csv`;
    link.click();
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

  // Función para obtener datos de una gráfica basada en una columna cualitativa probable (ej País, Estado)
  const getPieData = (rows: any[], headers: string[]) => {
    if (!rows || rows.length === 0) return [];
    
    // Tratamos de buscar una columna para clasificar
    const potentialColumns = headers.filter(h => 
      h.toLowerCase().includes('país') || h.toLowerCase().includes('pais') || 
      h.toLowerCase().includes('estado') || h.toLowerCase().includes('status') ||
      h.toLowerCase().includes('tarjeta') || h.toLowerCase().includes('tipo')
    );
    
    // Si encontramos una columna categórica, o usamos la segunda columna asumiendo que no es ID
    const colToUse = potentialColumns.length > 0 ? potentialColumns[0] : (headers.length > 1 ? headers[1] : headers[0]);
    if (!colToUse) return [];

    const grouping: Record<string, number> = {};
    rows.forEach(row => {
      const val = row[colToUse] || "Desconocido";
      grouping[val] = (grouping[val] || 0) + 1;
    });

    return Object.entries(grouping).map(([key, value]) => ({ name: key, value }));
  };

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  // Vista de Detalle
  if (activeConciliation) {
    const pieData = getPieData(activeConciliation.rows, activeConciliation.headers);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveConciliation(null)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 truncate max-w-xs">{activeConciliation.name}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Grupos conciliables:</span>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
                Sin grupo <ChevronDown size={14} />
              </button>
            </div>
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg shadow-sm hover:bg-slate-50">
              <Download size={16} /> Descargar CSV
            </button>
            <button onClick={handleAddColumn} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              <Plus size={16} /> Agregar Columna
            </button>
          </div>
        </div>

        {/* TABLA DE DATOS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col max-h-[500px]">
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 sticky top-0 z-10">
                <tr className="bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 shadow-sm">
                  {/* Encabezados Dinámicos */}
                  {activeConciliation.headers?.map((header, idx) => (
                    <th key={idx} className="border-x border-slate-200 dark:border-slate-700 px-4 py-2 font-semibold whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeConciliation.rows && activeConciliation.rows.length > 0 ? (
                  activeConciliation.rows.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 transition-colors">
                      {activeConciliation.headers.map((header, idx) => (
                        <td key={idx} className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {row[header] !== undefined ? String(row[header]) : ''}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeConciliation.headers?.length || 1} className="text-center py-8 text-slate-500">
                      Datos no disponibles o en procesamiento...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-sm font-medium">Original</button>
              <button onClick={handlePivot} className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded text-sm font-medium flex items-center gap-1">
                <Plus size={14} /> Tabla dinámica
              </button>
            </div>
            <div className="text-sm font-bold text-slate-500">
              Total filas: {activeConciliation.rows?.length || 0}
            </div>
          </div>
        </div>

        {/* DASHBOARDS DINÁMICOS PARA LA CONCILIACION ACTIVA */}
        {pieData.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 mt-6">
             <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <h2 className="text-sm font-medium text-slate-500 uppercase mb-4">Gráfica de Distribución</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                         {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
             </div>
             
             <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <h2 className="text-sm font-medium text-slate-500 uppercase mb-4">Conteo de Categorías</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pieData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Conciliaciones</h1>
        <Link href="/cargar">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all">
            <Plus size={20} />
            Crear nueva conciliación
          </button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {conciliations.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No tienes conciliaciones activas. Haz clic en el botón superior derecho para empazar.
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
                    <span className="font-medium text-slate-700 dark:text-slate-300 block">{conciliacion.filesCount} Archivos</span>
                    <span className="text-blue-500 text-xs flex items-center gap-1 mt-0.5 hover:underline">
                      Ver Detalles <ChevronDown size={12} />
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
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Métricas Generales</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-center items-center">
            <h2 className="text-sm font-medium text-slate-500 uppercase">Total Conciliaciones</h2>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mt-4">{conciliations.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-center items-center">
             <h2 className="text-sm font-medium text-slate-500 uppercase">Total Archivos Subidos</h2>
             <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-4">
                {conciliations.reduce((sum, item) => sum + item.filesCount, 0)}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}