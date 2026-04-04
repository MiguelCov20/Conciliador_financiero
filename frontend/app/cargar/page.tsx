'use client';
import { Upload, CheckCircle2, ArrowRight, File as FileIcon, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useConciliation } from "../../context/ConciliationContext";

export default function CargarArchivos() {
  const router = useRouter();
  const { addConciliation } = useConciliation();
  
  const [step, setStep] = useState(1);
  const [conciliationName, setConciliationName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const startConciliation = () => {
    if (!conciliationName || files.length === 0) return;
    
    setIsProcessing(true);
    
    // Simular tiempo de carga de 2 segundos
    setTimeout(() => {
      addConciliation(conciliationName);
      router.push("/");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">Nueva Conciliación</h1>
        <p className="text-slate-500 dark:text-slate-400">Configura tus fuentes de datos y sube los archivos de transacciones.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6 space-y-8">
        
        {/* PASO 1: Nombre */}
        <div className={`transition-opacity ${step !== 1 && !isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Paso 1: Configurar Cruce</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nombre de la conciliación activa</label>
              <input 
                type="text" 
                autoFocus
                placeholder="Ej. Conciliación Quincena VISA" 
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-200"
                value={conciliationName}
                onChange={(e) => setConciliationName(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            {step === 1 && (
              <button 
                onClick={() => setStep(2)}
                disabled={!conciliationName.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
              >
                Siguiente <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* PASO 2: Subir Archivo */}
        {step >= 2 && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Paso 2: Sube tus archivos</h2>
            
            {files.length === 0 ? (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-2xl p-12
                  flex flex-col items-center justify-center transition-all duration-300
                  ${isDragging 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-400'}
                `}
              >
                <div className="p-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                  <Upload size={32} />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Arrastra todos tus archivos XLSX, XLS y CSV</h3>
                <p className="text-slate-400 dark:text-slate-500 mt-1 text-center text-sm">puedes subir uno o más simultáneamente.</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 px-6 py-2 border border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:text-blue-600 dark:text-slate-200 rounded-lg font-medium transition-all"
                >
                  Cargar desde tu computadora
                </button>
                <input ref={fileInputRef} type="file" multiple className="hidden" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-500 grid grid-cols-12 gap-4">
                    <div className="col-span-6">Nombre</div>
                    <div className="col-span-3">Tamaño</div>
                    <div className="col-span-3 text-right">Acción</div>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {files.map((file, idx) => (
                      <div key={idx} className="px-4 py-3 grid grid-cols-12 gap-4 items-center text-sm bg-white dark:bg-slate-900">
                        <div className="col-span-6 flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                          <FileIcon size={16} className="text-blue-500" />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <div className="col-span-3 text-slate-500">
                          {(file.size / 1024).toFixed(1)} KB
                        </div>
                        <div className="col-span-3 flex justify-end">
                          <button onClick={() => removeFile(idx)} disabled={isProcessing} className="text-slate-400 hover:text-red-500 transition-colors">
                             <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={startConciliation}
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-75"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Alineando grupos y cruzando datos...
                      </>
                    ) : (
                      "Ejecutar Conciliación"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Características del sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 opacity-70">
        <div className="flex gap-4 p-5 bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl">
          <CheckCircle2 className="text-green-500 shrink-0" size={24} />
          <div>
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Normalización Automática</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Nuestro motor ETL detecta el formato del banco automáticamente.</p>
          </div>
        </div>
        <div className="flex gap-4 p-5 bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl">
          <CheckCircle2 className="text-green-500 shrink-0" size={24} />
          <div>
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Privacidad en Servidor</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Los datos se procesan en memoria y no se comparten de forma visible para IAs ajenas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}