export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Resumen del Proyecto</h1>
        <p className="text-slate-500">Visualización de conciliaciones financieras y anomalías.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta de Resumen */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Procesado</h2>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <span className="text-xs font-bold">$</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">$0.00</p>
          <p className="mt-2 text-xs text-slate-400">Actualizado hace un momento</p>
        </div>

        {/* Tarjeta de Anomalías */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Anomalías</h2>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <span className="text-xs font-bold">!</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">0</p>
          <p className="mt-2 text-xs text-red-400 font-medium">Requiere atención inmediata</p>
        </div>
        {/* Sección de Distribución Bancaria */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-slate-700 mb-4">Distribución por Institución</h2>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="space-y-4">
              {/* Barra de progreso de ejemplo para BBVA */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-600">BBVA</span>
                  <span className="text-slate-400">45% de las transacciones</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              {/* Barra de progreso de ejemplo para Santander */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-600">Santander</span>
                  <span className="text-slate-400">30% de las transacciones</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}