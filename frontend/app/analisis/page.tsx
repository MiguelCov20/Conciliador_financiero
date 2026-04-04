import { AlertTriangle, BrainCircuit, MessageSquareQuote } from "lucide-react";

export default function AnalisisIA() {
  const anomalias = [
    { id: 1, tipo: "Duplicado", desc: "Se detectó un cargo de $1,500.00 repetido dos veces en menos de 5 segundos.", severidad: "Alta" },
    { id: 2, tipo: "Inconsistencia", desc: "El depósito de la factura #F-450 no coincide con el monto recibido en el banco.", severidad: "Media" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
          <BrainCircuit size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Motor de Análisis Inteligente</h1>
          <p className="text-slate-500">Inferencia predictiva basada en modelos de HuggingFace.</p>
        </div>
      </div>

      <div className="space-y-6">
        {anomalias.map((item) => (
          <div key={item.id} className="bg-white border-l-4 border-red-500 border-y border-r border-slate-200 p-6 rounded-r-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <AlertTriangle size={20} />
                <span>Anomalía detectada: {item.tipo}</span>
              </div>
              <span className="text-xs font-bold uppercase px-2 py-1 bg-red-50 text-red-600 rounded">Severidad {item.severidad}</span>
            </div>
            <div className="flex gap-4 items-start bg-slate-50 p-4 rounded-lg">
              <MessageSquareQuote className="text-slate-300 shrink-0" size={24} />
              <p className="text-slate-700 italic">"{item.desc}"</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="text-sm font-semibold text-blue-600 hover:underline">Resolver ahora</button>
              <button className="text-sm font-semibold text-slate-400 hover:text-slate-600">Descartar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}