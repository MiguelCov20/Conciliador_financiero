import { FileSpreadsheet, ExternalLink, Download } from "lucide-react";

export default function Reportes() {
  const reportes = [
    { id: 1, banco: "BBVA", fecha: "2026-04-01", estado: "Conciliado", total: "$125,400.00" },
    { id: 2, banco: "Santander", fecha: "2026-03-28", estado: "Pendiente", total: "$84,200.50" },
    { id: 3, banco: "Banamex", fecha: "2026-03-25", estado: "Conciliado", total: "$210,000.00" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Historial de Reportes</h1>
          <p className="text-slate-500">Consulta y descarga tus conciliaciones previas.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-600">Institución</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Fecha de Carga</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Monto Total</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Estado</th>
              <th className="p-4 text-sm font-semibold text-slate-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reportes.map((reporte) => (
              <tr key={reporte.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded">
                    <FileSpreadsheet size={18} />
                  </div>
                  <span className="font-medium text-slate-700">{reporte.banco}</span>
                </td>
                <td className="p-4 text-sm text-slate-500">{reporte.fecha}</td>
                <td className="p-4 text-sm font-semibold text-slate-700">{reporte.total}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    reporte.estado === 'Conciliado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {reporte.estado}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}