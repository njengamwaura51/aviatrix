import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MENU_ITEMS = [
  { label: 'Overview', path: '/account', icon: '👤' },
  { label: 'Wallet', path: '/account/wallet', icon: '💰' },
  { label: 'Deposit', path: '/account/deposit', icon: '⬇️' },
  { label: 'Withdraw', path: '/account/withdraw', icon: '⬆️' },
  { label: 'Bet History', path: '/account/history', icon: '📋' },
  { label: 'Transactions', path: '/account/transactions', icon: '🔄' },
  { label: 'Profile', path: '/account/profile', icon: '⚙️' },
];

export default function AccountLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />;

  function handleLogout() {
    logout();
  }

  return (
    <div className="flex flex-1 bg-[#11181C]">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 bg-[#1B1C1D] border-r border-[#2A2B2E] hidden md:flex flex-col">
        {/* User card */}
        <div className="px-[12px] py-[16px] border-b border-[#2A2B2E]">
          <div className="flex items-center gap-[10px] mb-[12px]">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-[40px] h-[40px] rounded-full object-cover border-2 border-[#C017B4]"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <p className="text-[#E5E7EB] text-[13px] font-semibold">{user.phone}</p>
              <p className="text-[#9CA3AF] text-[11px]">{user.name}</p>
            </div>
          </div>
          <div className="bg-[#2A2B2E] rounded-[8px] p-[10px]">
            <p className="text-[#9CA3AF] text-[10px] mb-[2px]">Available Balance</p>
            <p className="text-[#00FF7F] text-[18px] font-bold">
              KES {user.balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
            </p>
            {user.bonus > 0 && (
              <p className="text-[#FFCF92] text-[11px]">Bonus: KES {user.bonus.toLocaleString()}</p>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-[8px]">
          {MENU_ITEMS.map(({ label, path, icon }) => (
            <Link
              key={path}
              to={path}
              end={path === '/account'}
              className={`flex items-center gap-[8px] px-[12px] py-[10px] text-[13px] transition-colors ${
                location.pathname === path
                  ? 'bg-[#C017B4]/10 text-[#E5E7EB] border-r-2 border-[#C017B4]'
                  : 'text-[#9CA3AF] hover:bg-[#2A2B2E] hover:text-[#E5E7EB]'
              }`}
            >
              <span>{icon}</span> {label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-[12px] py-[12px] border-t border-[#2A2B2E]">
          <Link
            to="/login"
            onClick={handleLogout}
            className="flex items-center gap-[8px] text-[#F55D5D] text-[13px] hover:text-[#ff7c7c]"
          >
            <span>🚪</span> Logout
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 overflow-y-auto pb-[70px] md:pb-0">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1B1C1D] border-t border-[#2A2B2E] flex items-center z-40">
        {MENU_ITEMS.slice(0, 5).map(({ label, path, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex-1 flex flex-col items-center py-[8px] text-[10px] transition-colors ${
              location.pathname === path ? 'text-[#C017B4]' : 'text-[#6B7280]'
            }`}
          >
            <span className="text-[18px]">{icon}</span>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
