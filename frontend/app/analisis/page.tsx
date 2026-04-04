import { AlertTriangle, BrainCircuit, MessageSquareQuote } from "lucide-react";

export default function AnalisisIA() {
  const anomalias = [
    { id: 1, tipo: "Duplicado", desc: "Se detectó un cargo de $1,500.00 repetido dos veces en menos de 5 segundos.", severidad: "Alta" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg">
          <BrainCircuit size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">Motor de Análisis Inteligente</h1>
          <p className="text-slate-500 dark:text-slate-400">Inferencia predictiva basada en modelos de HuggingFace.</p>
        </div>
      </div>

      <div className="space-y-6">
        {anomalias.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 border-l-4 border-red-500 border-y border-r border-slate-200 dark:border-slate-800 p-6 rounded-r-xl shadow-sm transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold uppercase text-xs tracking-widest">
                <AlertTriangle size={16} /> Anomalía: {item.tipo}
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded border border-red-100 dark:border-red-900/50">SEVERIDAD {item.severidad}</span>
            </div>
            <div className="flex gap-4 items-start bg-slate-50 dark:bg-slate-800/50 p-5 rounded-lg border border-slate-100 dark:border-slate-800">
              <MessageSquareQuote className="text-slate-300 dark:text-slate-600 shrink-0" size={24} />
              <p className="text-slate-700 dark:text-slate-300 italic font-medium">"{item.desc}"</p>
            </div>
            <div className="mt-5 flex gap-4">
              <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Resolver caso</button>
              <button className="text-sm font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Omitir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}