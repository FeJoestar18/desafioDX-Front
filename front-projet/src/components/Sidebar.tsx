import { LayoutDashboard, Users, PieChart, Settings, Bell, HelpCircle } from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Times' },
    { icon: PieChart, label: 'Cadastro de Times' },
    { icon: Bell, label: 'Cadastro de Integrantes' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help Center' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-[260px] bg-surface flex flex-col border-r border-border">
      <div className="p-lg flex items-center gap-sm">
        <div className="w-8 h-8 rounded-lg bg-gradient-main flex items-center justify-center">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-semibold text-text-primary tracking-tight">InsightHub</span>
      </div>

      <nav className="flex-1 px-md py-sm space-y-xs">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-md px-md py-3 rounded-md transition-all ${
                item.active
                  ? 'bg-gradient-primary text-white shadow-soft'
                  : 'text-text-secondary hover:bg-[#F1F5F9] hover:text-text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="px-md py-lg space-y-xs border-t border-border">
        {bottomItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href="#"
              className="flex items-center gap-md px-md py-3 rounded-md transition-all text-text-secondary hover:bg-[#F1F5F9] hover:text-text-primary"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
