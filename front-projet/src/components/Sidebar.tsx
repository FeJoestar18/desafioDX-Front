import { LayoutDashboard, Users, PieChart, Settings, HelpCircle, ChevronDown, PlusCircle, Activity, Briefcase } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Sidebar() {
  const location = useLocation();
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isApiOpen, setIsApiOpen] = useState(false);

  // Mantém o menu aberto se uma das sub-rotas estiver ativa ao recarregar a página
  useEffect(() => {
    if (location.pathname.includes('/cadastro')) {
      setIsCadastroOpen(true);
    }
    if (location.pathname.includes('/estatisticas') || location.pathname.includes('/time-por-data')) {
      setIsApiOpen(true);
    }
  }, [location.pathname]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Times', path: '/times' },
    { icon: Briefcase, label: 'Cargos', path: '/cargos' },
  ];

  const cadastroItems = [
    { label: 'Times', path: '/cadastro-times' },
    { label: 'Integrantes', path: '/cadastro-integrantes' },
    { label: 'Cargos', path: '/cadastro-cargos' },
  ];

  const apiItems = [
    { label: 'Estatísticas de Período', path: '/estatisticas' },
    { label: 'Busca por Data', path: '/time-por-data' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', path: '#' },
    { icon: HelpCircle, label: 'Help Center', path: '#' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-[260px] bg-primary flex flex-col z-10">
      <div className="p-lg flex items-center gap-sm">
        <div className="w-8 h-8 rounded-[8px] bg-secondary flex items-center justify-center shrink-0">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-semibold text-white tracking-tight">InsightHub</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={`relative flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all duration-150 ${isActive
                ? 'bg-[#1E293B] text-white'
                : 'text-[#CBD5F5] hover:bg-[#1E293B] hover:text-white'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary rounded-l-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="text-[14.5px] font-medium leading-snug">{item.label}</span>
            </NavLink>
          );
        })}

        {/* Menu Retrátil de Cadastro */}
        <div>
          <button
            onClick={() => setIsCadastroOpen(!isCadastroOpen)}
            className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-lg transition-all duration-150 text-[#CBD5F5] hover:bg-[#1E293B] hover:text-white ${isCadastroOpen ? 'bg-[#1E293B] text-white' : ''
              }`}
          >
            {location.pathname.includes('/cadastro') && (
              <motion.div
                layoutId="active-indicator"
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary rounded-l-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="flex items-center gap-3">
              <PlusCircle className="w-[18px] h-[18px] shrink-0" />
              <span className="text-[14.5px] font-medium leading-snug">Cadastro</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${isCadastroOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-150 ease-in-out ${isCadastroOpen ? 'max-h-[200px] opacity-100 mt-1' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="pl-[38px] pr-2 py-1 space-y-1 border-l-2 border-[#1E293B] ml-[21px]">
              {cadastroItems.map((subItem, idx) => {
                const isSubActive = location.pathname === subItem.path || location.pathname.startsWith(subItem.path + '/');
                return (
                  <NavLink
                    key={idx}
                    to={subItem.path}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${isSubActive
                      ? 'text-white bg-[#1E293B]'
                      : 'text-[#CBD5F5] hover:text-white hover:bg-[#1E293B]'
                      }`}
                  >
                    {subItem.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Retrátil de Consultas/API */}
        <div>
          <button
            onClick={() => setIsApiOpen(!isApiOpen)}
            className={`relative w-full flex items-center justify-between px-3.5 py-3 rounded-lg transition-all duration-150 text-[#CBD5F5] hover:bg-[#1E293B] hover:text-white ${isApiOpen ? 'bg-[#1E293B] text-white' : ''
              }`}
          >
            {(location.pathname.includes('/estatisticas') || location.pathname.includes('/time-por-data')) && (
              <motion.div
                layoutId="active-indicator"
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary rounded-l-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <div className="flex items-center gap-3">
              <Activity className="w-[18px] h-[18px] shrink-0" />
              <span className="text-[14.5px] font-medium leading-snug">API de Times</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${isApiOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-150 ease-in-out ${isApiOpen ? 'max-h-[200px] opacity-100 mt-1' : 'max-h-0 opacity-0'
              }`}
          >
            <div className="pl-[38px] pr-2 py-1 space-y-1 border-l-2 border-[#1E293B] ml-[21px]">
              {apiItems.map((subItem, idx) => {
                const isSubActive = location.pathname === subItem.path;
                return (
                  <NavLink
                    key={idx}
                    to={subItem.path}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${isSubActive
                      ? 'text-white bg-[#1E293B]'
                      : 'text-[#CBD5F5] hover:text-white hover:bg-[#1E293B]'
                      }`}
                  >
                    {subItem.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="px-4 py-6 space-y-1 border-t border-[#1E293B] shrink-0">
        {bottomItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.path}
              className="flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all duration-150 text-[#CBD5F5] hover:bg-[#1E293B] hover:text-white"
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="text-[14.5px] font-medium leading-snug">{item.label}</span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
