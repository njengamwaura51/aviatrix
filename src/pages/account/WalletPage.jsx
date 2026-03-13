import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function WalletPage() {
  const { user } = useAuth();

  return (
    <div className="p-[16px]">
      <h1 className="text-[#E5E7EB] text-[20px] font-bold mb-[4px]">Wallet</h1>
      <p className="text-[#9CA3AF] text-[13px] mb-[20px]">Manage your funds</p>

      {/* Balance overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[8px] mb-[20px]">
        {[
          { label: 'Main Balance', value: user.balance, color: '#00FF7F', icon: '💵' },
          { label: 'Bonus Balance', value: user.bonus, color: '#FFCF92', icon: '🎁' },
          { label: 'Total', value: user.balance + user.bonus, color: '#E5E7EB', icon: '💰' },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[16px]">
            <div className="flex items-center gap-[8px] mb-[8px]">
              <span className="text-[24px]">{icon}</span>
              <p className="text-[#9CA3AF] text-[12px]">{label}</p>
            </div>
            <p className="text-[22px] font-bold" style={{ color }}>
              KES {value.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px] mb-[20px]">
        {[
          { label: 'Deposit', path: '/account/deposit', icon: '⬇️', color: '#00FF7F', bg: 'bg-[#00FF7F]', text: 'text-[#11181C]' },
          { label: 'Withdraw', path: '/account/withdraw', icon: '⬆️', color: '#FFCF92', bg: 'bg-[#2A2B2E]', text: 'text-[#E5E7EB]', border: 'border border-[#4B5563]' },
          { label: 'History', path: '/account/history', icon: '📋', color: '#9CA3AF', bg: 'bg-[#2A2B2E]', text: 'text-[#E5E7EB]', border: 'border border-[#4B5563]' },
          { label: 'Transactions', path: '/account/transactions', icon: '🔄', color: '#9CA3AF', bg: 'bg-[#2A2B2E]', text: 'text-[#E5E7EB]', border: 'border border-[#4B5563]' },
        ].map(({ label, path, icon, bg, text, border = '' }) => (
          <Link
            key={label}
            to={path}
            className={`${bg} ${text} ${border} rounded-[8px] p-[12px] flex flex-col items-center gap-[6px] hover:opacity-90 transition-opacity`}
          >
            <span className="text-[28px]">{icon}</span>
            <span className="text-[13px] font-semibold">{label}</span>
          </Link>
        ))}
      </div>

      {/* Recent transactions */}
      <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E]">
        <div className="px-[16px] py-[12px] border-b border-[#2A2B2E] flex items-center justify-between">
          <h3 className="text-[#E5E7EB] text-[14px] font-semibold">Recent Transactions</h3>
          <Link to="/account/transactions" className="text-[#C017B4] text-[12px] hover:underline">
            View all
          </Link>
        </div>
        {[
          { type: 'Deposit', method: 'M-PESA', amount: +1000, date: '2026-03-13 09:12' },
          { type: 'Bet Placed', method: 'Aviator', amount: -500, date: '2026-03-13 14:22' },
          { type: 'Win', method: 'Aviator', amount: +1235, date: '2026-03-13 14:22' },
          { type: 'Withdrawal', method: 'M-PESA', amount: -735, date: '2026-03-12 16:00' },
          { type: 'Deposit', method: 'M-PESA', amount: +500, date: '2026-03-11 08:30' },
        ].map((tx, i) => (
          <div key={i} className="flex items-center justify-between px-[16px] py-[10px] border-b border-[#2A2B2E] last:border-0">
            <div>
              <p className="text-[#E5E7EB] text-[13px] font-medium">{tx.type}</p>
              <p className="text-[#6B7280] text-[11px]">{tx.method} · {tx.date}</p>
            </div>
            <span className={`text-[14px] font-bold ${tx.amount > 0 ? 'text-[#00FF7F]' : 'text-[#F55D5D]'}`}>
              {tx.amount > 0 ? '+' : ''}KES {Math.abs(tx.amount).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
