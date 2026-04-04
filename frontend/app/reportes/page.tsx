import { FileSpreadsheet, ExternalLink } from "lucide-react";

export default function Reportes() {
  const reportes = [
    { id: 1, banco: "BBVA", fecha: "2026-04-01", estado: "Conciliado", total: "$125,400.00" },
    { id: 2, banco: "Santander", fecha: "2026-03-28", estado: "Pendiente", total: "$84,200.50" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">Historial de Reportes</h1>
        <p className="text-slate-500 dark:text-slate-400">Consulta y descarga tus conciliaciones previas.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Institución</th>
              <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Fecha</th>
              <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Monto</th>
              <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Estado</th>
              <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {reportes.map((reporte) => (
              <tr key={reporte.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 flex items-center gap-3 font-medium text-slate-700 dark:text-slate-200 text-sm">
                  <FileSpreadsheet size={18} className="text-blue-500" /> {reporte.banco}
                </td>
                <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{reporte.fecha}</td>
                <td className="p-4 text-sm font-semibold text-slate-700 dark:text-slate-200">{reporte.total}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    reporte.estado === 'Conciliado' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                  }`}>
                    {reporte.estado}
                  </span>
                </td>
                <td className="p-4"><ExternalLink size={18} className="text-slate-400 hover:text-blue-500 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}