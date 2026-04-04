'use client'; // Esto es necesario porque usaremos interacción (clics/arrastre)

import { Upload, FileType, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CargarArchivos() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Carga de Documentos</h1>
        <p className="text-slate-500">Sube tus estados bancarios o reportes internos para iniciar la conciliación.</p>
      </div>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative border-2 border-dashed rounded-2xl p-12
          flex flex-col items-center justify-center transition-all
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-slate-400'}
        `}
      >
        <div className="p-4 bg-blue-100 rounded-full text-blue-600 mb-4">
          <Upload size={40} />
        </div>
        
        <h2 className="text-xl font-semibold text-slate-700">Arrastra tus archivos aquí</h2>
        <p className="text-slate-400 mt-2 text-center">
          Soportamos archivos .CSV y .XLSX de cualquier institución financiera.
        </p>

        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Seleccionar Archivo
        </button>

        <input 
          type="file" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          accept=".csv, .xlsx"
        />
      </div>

      {/* Guía de Formatos (Para que se vea más Pro) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
          <div className="text-green-500"><CheckCircle2 size={24} /></div>
          <div>
            <h3 className="font-medium text-slate-800">Normalización Automática</h3>
            <p className="text-sm text-slate-500">Nuestro motor ETL detecta el banco automáticamente[cite: 196].</p>
          </div>
        </div>
        <div className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100">
          <div className="text-green-500"><CheckCircle2 size={24} /></div>
          <div>
            <h3 className="font-medium text-slate-800">Privacidad con IA</h3>
            <p className="text-sm text-slate-500">Los datos sensibles se anonimizan antes del análisis[cite: 206].</p>
          </div>
        </div>
      </div>
    </div>
  );
}