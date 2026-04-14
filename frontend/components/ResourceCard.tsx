'use client';
import { UploadCloud, FileType, CheckCircle, X, Coins } from "lucide-react";
import { useState, useRef } from "react";

interface ResourceCardProps {
  title: string;
  side: "A" | "B";
  selectedFile: File | null;
  currency: string;
  onFileDrop: (file: File) => void;
  onCurrencyChange: (curr: string) => void;
  onClear: () => void;
}

export function ResourceCard({ title, side, selectedFile, currency, onFileDrop, onCurrencyChange, onClear }: ResourceCardProps) {
  const [isDragging, setIsDragging] = useState(false);
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
      onFileDrop(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileDrop(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full transition-all">
      {/* Header */}
      <div className={`p-4 border-b border-slate-200 dark:border-slate-800 ${side === 'A' ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'bg-purple-50/50 dark:bg-purple-900/10'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${side === 'A' ? 'bg-blue-600' : 'bg-purple-600'}`}>
              {side}
            </div>
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
          </div>
          
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <Coins size={14} className="text-slate-400" />
            <select 
              value={currency} 
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="bg-transparent text-sm font-medium outline-none text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="MXN">MXN - Peso</option>
              <option value="USD">USD - Dólar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Body: Upload or File View */}
      <div className="p-6 flex-1 flex flex-col justify-center">
        {!selectedFile ? (
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-8
              flex flex-col items-center justify-center transition-all duration-300 text-center
              ${isDragging 
                ? (side === 'A' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-purple-500 bg-purple-50 dark:bg-purple-900/20') 
                : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 hover:border-slate-400'}
            `}
          >
            <UploadCloud size={36} className={`mb-3 ${side === 'A' ? 'text-blue-500' : 'text-purple-500'}`} />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Arrastra tu archivo aquí</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Solo .CSV y .XLSX</p>
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 px-4 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-medium rounded-md shadow-sm transition-colors text-slate-700 dark:text-slate-200"
            >
              Explorar
            </button>
            <input ref={fileInputRef} type="file" className="hidden" accept=".csv, .xlsx, .xls" onChange={handleFileChange} />
          </div>
        ) : (
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${side === 'A' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600' : 'bg-purple-100 dark:bg-purple-900/50 text-purple-600'}`}>
                  <FileType size={24} />
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 text-sm truncate max-w-[200px]" title={selectedFile.name}>
                    {selectedFile.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle size={12} className="text-emerald-500" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                      {(selectedFile.size / 1024).toFixed(1)} KB listos
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClear} 
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                title="Quitar archivo"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Pequeña barra de estado de lectura falsa para la UX estetica */}
            <div className="mt-5 space-y-1.5">
               <div className="flex justify-between text-xs text-slate-500 font-medium">
                 <span>Metadatos procesados</span>
                 <span className="text-emerald-500">100%</span>
               </div>
               <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-full animate-in fade-in slide-in-from-left-full duration-1000"></div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
