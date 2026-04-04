'use client';
import { Plus, Calendar, FileBox, ChevronDown, Download, Filter, Search, ArrowLeft, Table as TableIcon } from "lucide-react";
import Link from "next/link";
import { useConciliation, ConciliationRecord } from "../context/ConciliationContext";

export default function Home() {
  const { conciliations, activeConciliation, setActiveConciliation } = useConciliation();

  // Vista de Detalle (Imagen 4)
  if (activeConciliation) {
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
              <span className="text-blue-600">Mi fuente 1</span> / {activeConciliation.name}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Grupos conciliables:</span>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
                Sin grupo <ChevronDown size={14} />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg shadow-sm hover:bg-slate-50">
              <Download size={16} /> Descargar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              <Plus size={16} /> Agregar Columna
            </button>
          </div>
        </div>

        {/* TABLA DE DATOS (MOCK EXCEL-LIKE) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
          {/* Herramientas de tabla */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 px-2 text-slate-400">
              <Search size={14} />
              <input type="text" placeholder="fx" className="bg-transparent border-none focus:ring-0 text-sm font-mono w-64 text-slate-600 dark:text-slate-300" disabled />
            </div>
          </div>
          
          {/* Contenedor escrolleable superponiendo tabla */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 sticky top-0 z-10">
                {/* Definicion de letras columnas opcional */}
                <tr>
                  <th className="border border-slate-200 dark:border-slate-700 px-4 py-2 font-medium"><div className="flex justify-between items-center">Columna A <Filter size={12}/></div></th>
                  <th className="border border-slate-200 dark:border-slate-700 px-4 py-2 font-medium"><div className="flex justify-between items-center">Columna B <Filter size={12}/></div></th>
                  <th className="border border-slate-200 dark:border-slate-700 px-4 py-2 font-medium"><div className="flex justify-between items-center">Columna C <Filter size={12}/></div></th>
                  <th className="border border-slate-200 dark:border-slate-700 px-4 py-2 font-medium"><div className="flex justify-between items-center">Columna D <Filter size={12}/></div></th>
                  <th className="border border-slate-200 dark:border-slate-700 px-4 py-2 font-medium"><div className="flex justify-between items-center">Columna E <Filter size={12}/></div></th>
                  <th className="border border-slate-200 dark:border-slate-700 px-4 py-2 font-medium"><div className="flex justify-between items-center">Columna F <Filter size={12}/></div></th>
                  <th className="border border-slate-200 dark:border-slate-700 px-4 py-2 font-medium"><div className="flex justify-between items-center">Columna G <Filter size={12}/></div></th>
                </tr>
                {/* Titulos reales */}
                <tr className="bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 shadow-sm">
                  <th className="border-x border-slate-200 dark:border-slate-700 px-4 py-2 font-semibold">Fecha A</th>
                  <th className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 font-semibold">$ Montos</th>
                  <th className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 font-semibold">ID</th>
                  <th className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 font-semibold">Cards</th>
                  <th className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 font-semibold">Nombres</th>
                  <th className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 font-semibold">País</th>
                  <th className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 font-semibold">Caja</th>
                </tr>
              </thead>
              <tbody>
                {activeConciliation.details ? (
                  activeConciliation.details.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{row.fecha}</td>
                      <td className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 font-mono text-slate-700 dark:text-slate-200">{row.monto}</td>
                      <td className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-500">{row.internalId}</td>
                      <td className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-600 dark:text-slate-300">{row.cards}</td>
                      <td className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-600 dark:text-slate-300">{row.nombres}</td>
                      <td className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 text-slate-600 dark:text-slate-300">{row.pais}</td>
                      <td className="border-r border-slate-200 dark:border-slate-700 px-4 py-2 font-mono text-slate-500">{row.caja}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500">Datos no disponibles o en procesamiento...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer de Tabla */}
          <div className="flex items-center justify-between p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-sm font-medium">Original</button>
              <button className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded text-sm font-medium flex items-center gap-1">
                <Plus size={14} /> Tabla dinámica
              </button>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition">
              Ir a preparar columnas
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vista de Lista (Imagen 1)
  return (
    <div className="space-y-8">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Conciliaciones</h1>
        
        <Link href="/cargar">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all">
            <Plus size={20} />
            Crear nueva conciliación
          </button>
        </Link>
      </div>

      {/* LISTA DE CONCILIACIONES */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {conciliations.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No tienes conciliaciones activas. Haz clic en el botón superior derecho para empazar.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {conciliations.map((conciliacion: ConciliationRecord) => (
              <div 
                key={conciliacion.id} 
                className="group flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {/* Nombre de la conciliación */}
                <div className="flex-1">
                  <button 
                    onClick={() => setActiveConciliation(conciliacion.id)}
                    className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 text-left"
                  >
                    {conciliacion.name}
                  </button>
                </div>
                
                {/* Fecha */}
                <div className="flex-1 flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  <Calendar size={16} />
                  <div>
                    <span className="block text-slate-700 dark:text-slate-300">{conciliacion.date}</span>
                    <span className="text-xs">Fecha de creación</span>
                  </div>
                </div>
                
                {/* Archivos / Detalles */}
                <div className="flex-1 flex items-center justify-end gap-12">
                  <div className="text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300 block">{conciliacion.filesCount} Archivos</span>
                    <button 
                      onClick={() => setActiveConciliation(conciliacion.id)}
                      className="text-blue-500 text-xs flex items-center gap-1 mt-0.5 hover:underline"
                    >
                      Detalles <ChevronDown size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DASHBOARDS COMPLEMENTARIOS: Aquí conservamos los mini stats */}
      <div className="pt-8">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Métricas Generales</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h2 className="text-sm font-medium text-slate-500 uppercase">Total de Conciliaciones</h2>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-4">{conciliations.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
             <h2 className="text-sm font-medium text-slate-500 uppercase">Archivos Procesados</h2>
             <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-4">
                {conciliations.reduce((sum: number, item: ConciliationRecord) => sum + item.filesCount, 0)}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}