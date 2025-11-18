import React, { useContext, useState } from 'react';
import {
  FiDisc,
  FiEdit3,
  FiHome,
  FiLogOut,
  FiMenu,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const RestrictedLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext não está disponível');
  }

  const { usuario /*, verificarLogin */ } = authContext;

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const menuItems: MenuItem[] = [
    { path: '/admin/home', label: 'Home', icon: <FiHome /> },
    { path: '/admin/novo-prato', label: 'Novo prato', icon: <FiDisc /> },
    { path: '/admin/usuarios', label: 'Usuários', icon: <FiUsers /> },
    { path: '/admin/pedidos', label: 'Pedidos', icon: <FiEdit3 /> },
    { path: '/admin/logout', label: 'Sair', icon: <FiLogOut /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 text-slate-50 transition-transform duration-300
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Menu lateral"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          <span className="text-sm font-semibold tracking-tight">
            Meu Sistema
          </span>
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-md p-1 text-slate-100 outline-none hover:bg-slate-800 lg:hidden"
            aria-label={isSidebarOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <FiMenu size={20} />
          </button>
        </div>

        <nav className="mt-2 space-y-1 px-2 py-2 text-sm">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-200 hover:bg-slate-800/70 hover:text-white',
                ].join(' ')
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* TopBar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md p-1 text-slate-700 outline-none hover:bg-slate-100 lg:hidden"
              aria-label={isSidebarOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <FiMenu size={22} />
            </button>
            <h1 className="text-base font-semibold text-slate-900 sm:text-lg">
              Área restrita
            </h1>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={toggleUserMenu}
              className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:bg-slate-200"
              aria-haspopup="true"
              aria-expanded={isUserMenuOpen}
            >
              <FiUser size={20} />
              <span className="hidden sm:inline truncate max-w-[120px]">
                {usuario?.email ?? 'Usuário'}
              </span>
            </button>

            {isUserMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-slate-100 bg-white text-sm text-slate-700 shadow-lg"
                role="menu"
              >
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="truncate text-xs font-semibold text-slate-900">
                    {usuario?.email ?? 'Usuário'}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-500">
                    {usuario?.role ?? 'Sem perfil'}
                  </p>
                </div>

                <NavLink
                  to="/user/details"
                  className="block px-4 py-2 hover:bg-slate-50"
                  role="menuitem"
                  onClick={closeUserMenu}
                >
                  Detalhes do usuário
                </NavLink>

                <NavLink
                  to="/logout"
                  className="block px-4 py-2 hover:bg-slate-50"
                  role="menuitem"
                  onClick={closeUserMenu}
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RestrictedLayout;
 