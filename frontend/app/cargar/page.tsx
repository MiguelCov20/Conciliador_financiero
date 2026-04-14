'use client';
import { Play, Save, Loader2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConciliation } from "../../context/ConciliationContext";
import * as XLSX from "xlsx";
import { ResourceCard } from "../../components/ResourceCard";
import { MappingTable, MappingRule } from "../../components/MappingTable";
import { ReconciliationSummary } from "../../components/ReconciliationSummary";

export default function CargarArchivos() {
  const router = useRouter();
  const { addConciliation } = useConciliation();
  
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Resource A State
  const [fileA, setFileA] = useState<File | null>(null);
  const [headersA, setHeadersA] = useState<string[]>([]);
  const [rowsA, setRowsA] = useState<any[]>([]);
  const [currencyA, setCurrencyA] = useState("MXN");

  // Resource B State
  const [fileB, setFileB] = useState<File | null>(null);
  const [headersB, setHeadersB] = useState<string[]>([]);
  const [rowsB, setRowsB] = useState<any[]>([]);
  const [currencyB, setCurrencyB] = useState("MXN");

  // Mapping State
  const [rules, setRules] = useState<MappingRule[]>([
    { id: '1', colA: '', colB: '' }
  ]);
  const [tolerance, setTolerance] = useState<number>(0);

  // Results State
  const [viewResults, setViewResults] = useState(false);
  const [summaryData, setSummaryData] = useState<any>(null);

  const handleFileDrop = (file: File, side: "A" | "B") => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Obtenemos los datos, asegurándonos de extraer bien las columnas
        const rows = XLSX.utils.sheet_to_json<any>(worksheet);
        
        let headers: string[] = [];
        if (rows.length > 0) {
          headers = Object.keys(rows[0]);
        } else {
          const headerRow = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 })[0];
          if (headerRow) headers = headerRow;
        }

        if (side === "A") {
          setFileA(file); setHeadersA(headers); setRowsA(rows);
        } else {
          setFileB(file); setHeadersB(headers); setRowsB(rows);
        }
      } catch (err) {
        console.error("Error reading Excel file:", err);
        alert(`No se pudo interpretar el archivo ${file.name}. Asegúrese de que sea un formato de tabla válido (.csv, .xlsx)`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUpdateRule = (id: string, field: 'colA' | 'colB', value: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };
  const handleAddRule = () => setRules([...rules, { id: Date.now().toString(), colA: '', colB: '' }]);
  const handleRemoveRule = (id: string) => setRules(rules.filter(r => r.id !== id));

  const validRules = rules.filter(r => r.colA && r.colB);
  const isReadyToRun = fileA && fileB && validRules.length > 0;
  
  const [unifiedHeaders, setUnifiedHeaders] = useState<string[]>([]);
  const [unifiedRows, setUnifiedRows] = useState<any[]>([]);

  const runSimulation = () => {
    if (!isReadyToRun) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      // Motor de Cruce
      const pkRule = validRules[0];
      let amountRule = validRules.find(r => 
        r.colA.toLowerCase().includes('monto') || r.colA.toLowerCase().includes('amount') || r.colA.toLowerCase().includes('saldo') || r.colA.toLowerCase().includes('valor') ||
        r.colB.toLowerCase().includes('monto') || r.colB.toLowerCase().includes('amount') || r.colB.toLowerCase().includes('saldo') || r.colB.toLowerCase().includes('valor')
      );
      if (!amountRule && validRules.length > 1) amountRule = validRules[1];

      let matchedACount = 0;
      let matchedBCount = 0;
      let totalDiff = 0;
      let adjustedCount = 0;

      const mapB = new Map();
      rowsB.forEach(rowB => {
        const key = String(rowB[pkRule.colB]).trim();
        if (!mapB.has(key)) mapB.set(key, []);
        mapB.get(key).push(rowB);
      });

      const newUnifiedRows: any[] = [];
      const usedB = new Set<any>();

      rowsA.forEach(rowA => {
        const key = String(rowA[pkRule.colA]).trim();
        const matchesInB = mapB.get(key);
        
        const newRow = { ...rowA };
        
        let amountA = 0;
        if (amountRule && rowA[amountRule.colA] !== undefined) {
          amountA = parseFloat(String(rowA[amountRule.colA]).replace(/[^0-9.-]+/g,"")) || 0;
        }
        
        if (matchesInB && matchesInB.length > 0) {
          const rowB = matchesInB[0];
          usedB.add(rowB);

          // Agregar columnas B con prefijo B_
          Object.keys(rowB).forEach(k => {
            newRow[`B_${k}`] = rowB[k];
          });

          let amountB = 0;
          if (amountRule && rowB[amountRule.colB] !== undefined) {
            amountB = parseFloat(String(rowB[amountRule.colB]).replace(/[^0-9.-]+/g,"")) || 0;
          }

          const diff = amountA - amountB;
          newRow['Diferencia_Monto'] = diff;
           // Lo sumamos a la diferencia total absoluta para mostrar discrepancia monetaria de la ejecución
          totalDiff += Math.abs(diff);

          if (Math.abs(diff) <= tolerance) {
            if (Math.abs(diff) > 0) adjustedCount++; 
            newRow['Estado'] = 'Conciliado';
            matchedACount++;
            matchedBCount++;
          } else {
            newRow['Estado'] = 'Diferencia';
          }
        } else {
          newRow['Diferencia_Monto'] = amountA;
          newRow['Estado'] = 'No en B';
          totalDiff += Math.abs(amountA);
        }
        newUnifiedRows.push(newRow);
      });

      rowsB.forEach(rowB => {
        if (!usedB.has(rowB)) {
          const newRow: any = {};
          // Filler para A
          headersA.forEach(h => newRow[h] = "");

          Object.keys(rowB).forEach(k => {
            newRow[`B_${k}`] = rowB[k];
          });
          
          let amountB = 0;
          if (amountRule && rowB[amountRule.colB] !== undefined) {
            amountB = parseFloat(String(rowB[amountRule.colB]).replace(/[^0-9.-]+/g,"")) || 0;
          }

          newRow['Diferencia_Monto'] = -amountB;
          newRow['Estado'] = 'No en A';
          totalDiff += Math.abs(amountB);
          newUnifiedRows.push(newRow);
        }
      });

      let extractedHeaders: string[] = [];
      if (newUnifiedRows.length > 0) {
        extractedHeaders = Object.keys(newUnifiedRows[0]);
      }

      setUnifiedHeaders(extractedHeaders);
      setUnifiedRows(newUnifiedRows);

      setSummaryData({
        totalA: rowsA.length,
        matchedA: matchedACount,
        totalB: rowsB.length,
        matchedB: matchedBCount,
        totalValueDiff: totalDiff, 
        adjusted: adjustedCount 
      });
      setViewResults(true);
      setIsProcessing(false);
    }, 1200);
  };

  const saveConciliation = () => {
    if (!name.trim()) {
      alert("Agrega un nombre para la conciliación en la parte superior.");
      return;
    }
    // Pasamos el mega dataset unificado
    addConciliation(name, unifiedHeaders, unifiedRows, 2);
    router.push('/');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Naming Section */}
      <div className="flex items-end gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
            Nombre del Cruce Activo
          </label>
          <input 
            type="text" 
            placeholder="Ej: Conciliación Quincena Stripe vs Banco" 
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-200 text-lg font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      {/* Dual Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <ResourceCard 
          title="Recurso A" 
          side="A" 
          selectedFile={fileA} 
          currency={currencyA}
          onCurrencyChange={setCurrencyA}
          onFileDrop={(f) => handleFileDrop(f, "A")}
          onClear={() => { setFileA(null); setHeadersA([]); setRowsA([]); }}
        />
        <ResourceCard 
          title="Recurso B" 
          side="B" 
          selectedFile={fileB} 
          currency={currencyB}
          onCurrencyChange={setCurrencyB}
          onFileDrop={(f) => handleFileDrop(f, "B")}
          onClear={() => { setFileB(null); setHeadersB([]); setRowsB([]); }}
        />
      </div>

      {/* Mapping Engine */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-slate-200 dark:border-slate-800 -z-10"></div>
        <MappingTable 
          headersA={headersA}
          headersB={headersB}
          rules={rules}
          onAddRule={handleAddRule}
          onUpdateRule={handleUpdateRule}
          onRemoveRule={handleRemoveRule}
          tolerance={tolerance}
          onToleranceChange={setTolerance}
        />
      </div>

      {/* Action to Simulate */}
      {!viewResults ? (
        <div className="flex justify-center pt-8">
          {/* Ocultamos o mostramos dependiendo de si se cumplen las reglas */}
          {isReadyToRun && (
            <button 
              onClick={runSimulation}
              disabled={isProcessing}
              className="flex items-center gap-2 px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed animate-in zoom-in-95"
            >
              {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
              {isProcessing ? "Conciliando transacciones..." : "Iniciar Conciliación"}
            </button>
          )}
        </div>
      ) : (
         <div className="space-y-8 pt-4">
           {/* Summary Section */}
           {summaryData && <ReconciliationSummary {...summaryData} />}
           
           {/* Final Save */}
           <div className="flex justify-end pt-4">
             <button 
               onClick={saveConciliation}
               className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 transition-all"
             >
               <Save size={18} />
               Guardar y Ver Detalles
               <ArrowRight size={18} />
             </button>
           </div>
         </div>
      )}
    </div>
  );
}