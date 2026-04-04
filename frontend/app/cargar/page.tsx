'use client';
import { Upload, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CargarArchivos() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">Carga de Documentos</h1>
        <p className="text-slate-500 dark:text-slate-400">Sube tus estados bancarios para iniciar la conciliación.</p>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative border-2 border-dashed rounded-2xl p-16
          flex flex-col items-center justify-center transition-all duration-300
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-blue-400'}
        `}
      >
        <div className="p-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full mb-4">
          <Upload size={40} />
        </div>
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Arrastra tus archivos aquí</h2>
        <p className="text-slate-400 dark:text-slate-500 mt-2 text-center">Soportamos .CSV y .XLSX</p>
        <button className="mt-6 px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg shadow-blue-600/20 transition-all">
          Seleccionar Archivo
        </button>
        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".csv, .xlsx" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
          <CheckCircle2 className="text-green-500 shrink-0" size={24} />
          <div>
            <h3 className="font-medium text-slate-800 dark:text-slate-100">Normalización Automática</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Nuestro motor ETL detecta el banco automáticamente.</p>
          </div>
        </div>
        <div className="flex gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
          <CheckCircle2 className="text-green-500 shrink-0" size={24} />
          <div>
            <h3 className="font-medium text-slate-800 dark:text-slate-100">Privacidad con IA</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Los datos se anonimizan antes del análisis.</p>
          </div>
        </div>
      </div>
    </div>
  );
}