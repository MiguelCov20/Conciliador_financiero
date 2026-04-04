'use client'; // Paso 1: Activar modo cliente

import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation"; // Para detectar la ruta
import Link from "next/link"; // Para navegación rápida sin recargar
import { LayoutDashboard, Upload, FileText, BrainCircuit, Settings } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Obtenemos la ruta actual (ej: "/cargar")

  // Función para saber si un link está activo
  const isActive = (path: string) => pathname === path;

  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex h-screen bg-slate-50">
          
          {/* BARRA LATERAL */}
          <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                <BrainCircuit size={24} />
                FinConcile IA
              </h2>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              {/* DASHBOARD */}
              <Link 
                href="/" 
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive('/') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>

              {/* CARGAR */}
              <Link 
                href="/cargar" 
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive('/cargar') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Upload size={20} />
                Cargar Archivos
              </Link>

              {/* REPORTES */}
              <Link 
                href="/reportes" 
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive('/reportes') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileText size={20} />
                Reportes
              </Link>

              {/* ANÁLISIS IA */}
              <Link 
                href="/analisis" 
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive('/analisis') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BrainCircuit size={20} />
                Análisis IA
              </Link>
            </nav>

            <div className="p-4 border-t border-slate-800">
              <button className="flex items-center gap-3 p-3 w-full text-slate-500 hover:text-white transition-colors">
                <Settings size={20} />
                Configuración
              </button>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="h-16 bg-white border-b flex items-center px-8 justify-between shadow-sm">
              <span className="text-slate-500 font-medium italic underline decoration-blue-200">
                CUCEI - Proyecto Modular 2026 A
              </span>
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                C
              </div>
            </header>
            
            <main className="flex-1 overflow-y-auto p-8">
              {children}
            </main>
          </div>

        </div>
      </body>
    </html>
  );
}