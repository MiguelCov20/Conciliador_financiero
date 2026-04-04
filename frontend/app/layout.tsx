'use client';

import { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeProvider } from "../components/theme-provider";
import { useTheme } from "next-themes";
import { 
  LayoutDashboard, Upload, FileText, BrainCircuit, 
  Settings, User, LogOut, ChevronUp, Bell, 
  Moon, Sun, BellRing, Globe, HelpCircle, Camera
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

// Componente interno para manejar la lógica del tema sin romper el RootLayout
function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // ESTADOS Y REFS
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const settingsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Evita errores de hidratación (espera a que el cliente esté listo)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* BARRA LATERAL */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20 border-r border-slate-800">
        <div className="p-6">
          <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
            <BrainCircuit size={24} />
            FinConcile IA
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive('/') ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/cargar" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive('/cargar') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Upload size={20} /> Cargar Archivos
          </Link>
          <Link href="/reportes" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive('/reportes') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <FileText size={20} /> Reportes
          </Link>
          <Link href="/analisis" className={`flex items-center gap-3 p-3 rounded-lg transition-all ${isActive('/analisis') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <BrainCircuit size={20} /> Análisis IA
          </Link>
        </nav>

        {/* CONFIGURACIÓN DEL SISTEMA */}
        <div className="p-4 border-t border-slate-800 relative" ref={settingsRef}>
          {showSettingsMenu && (
            <div className="absolute bottom-full left-4 mb-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-700 mb-1">
                Sistema
              </div>
              
              {/* BOTÓN MODO OSCURO - LÓGICA CORREGIDA */}
              <button 
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-between w-full p-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* ICONOS CORREGIDOS: Si es dark, muestra Luna. Si es light, muestra Sol */}
                  {resolvedTheme === 'dark' ? (
                    <Moon size={16} className="text-blue-400" />
                  ) : (
                    <Sun size={16} className="text-yellow-500" />
                  )}
                  <span>{resolvedTheme === 'dark' ? 'Modo Oscuro' : 'Modo Claro'}</span>
                </div>
                
                {/* SWITCH CORREGIDO */}
                <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${
                  resolvedTheme === 'dark' ? 'bg-blue-600' : 'bg-slate-600'
                }`}>
                  <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all duration-300 ${
                    resolvedTheme === 'dark' ? 'left-5' : 'left-1'
                  }`}></div>
                </div>
              </button>
              {/* LAS OPCIONES QUE FALTABAN */}
              <button className="flex items-center gap-3 w-full p-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md transition-colors">
                <BellRing size={16} /> Notificaciones
              </button>
              <button className="flex items-center gap-3 w-full p-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md transition-colors border-b border-slate-700 mb-1 pb-2">
                <Globe size={16} /> Idioma: ES
              </button>
              <button className="flex items-center gap-3 w-full p-2 text-sm text-slate-400 hover:text-white rounded-md transition-colors">
                <HelpCircle size={16} /> Soporte
              </button>
            </div>
          )}
          
          <button 
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            className={`flex items-center justify-between gap-3 p-3 w-full rounded-lg transition-colors ${showSettingsMenu ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <div className="flex items-center gap-3">
              <Settings size={20} />
              <span className="text-sm font-medium">Configuración</span>
            </div>
            <ChevronUp size={16} className={`transition-transform ${showSettingsMenu ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-8 justify-between shadow-sm z-10 transition-colors">
          <span className="text-slate-400 dark:text-slate-500 text-sm font-medium tracking-tight">
            PROYECTO MODULAR / <span className="text-slate-800 dark:text-slate-200 uppercase tracking-widest">Conciliación Inteligente</span>
          </span>
          
          <div className="flex items-center gap-6" ref={userRef}>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3 group">
                <div className="h-10 w-10 rounded-full bg-blue-600 group-hover:bg-blue-700 text-white flex items-center justify-center font-bold shadow-md transition-all group-active:scale-90 ring-2 ring-transparent group-hover:ring-blue-100 dark:group-hover:ring-blue-900">
                  C
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 animate-in fade-in zoom-in-95 origin-top-right">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 mb-1 flex flex-col items-center">
                    <div className="relative group cursor-pointer mb-2">
                       <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-blue-600 border-2 border-blue-50 dark:border-blue-900">C</div>
                       <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                         <Camera size={16} />
                       </div>
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Admin User</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">cucei@udg.mx</p>
                  </div>
                  <button className="flex items-center gap-3 w-full p-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
                    <User size={18} className="text-slate-400" /> Mi Cuenta
                  </button>
                  <button className="flex items-center gap-3 w-full p-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors">
                    <Settings size={18} className="text-slate-400" /> Ajustes de Cuenta
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                  <button className="flex items-center gap-3 w-full p-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                    <LogOut size={18} /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}