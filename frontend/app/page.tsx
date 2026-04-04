export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">Resumen del Proyecto</h1>
        <p className="text-slate-500 dark:text-slate-400">Visualización de conciliaciones financieras y anomalías.</p>
      </div>
      
      {/* Grid de Tarjetas Superiores */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta: Total Procesado */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Procesado</h2>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <span className="text-xs font-bold">$</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">$0.00</p>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Actualizado hace un momento</p>
        </div>

        {/* Tarjeta: Anomalías */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Anomalías</h2>
            <div className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <span className="text-xs font-bold">!</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">0</p>
          <p className="mt-2 text-xs text-red-400 font-medium">Requiere atención inmediata</p>
        </div>
      </div>

      {/* Sección de Distribución Bancaria */}
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 transition-colors">Distribución por Institución</h2>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
          <div className="space-y-6">
            {/* BBVA */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-600 dark:text-slate-300">BBVA</span>
                <span className="text-slate-400 dark:text-slate-500">45% de las transacciones</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: '45%' }}></div>
              </div>
            </div>
            {/* Santander */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-600 dark:text-slate-300">Santander</span>
                <span className="text-slate-400 dark:text-slate-500">30% de las transacciones</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full transition-all" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}