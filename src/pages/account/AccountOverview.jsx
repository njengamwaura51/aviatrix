import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const STATS = [
  { label: 'Total Bets', value: '47', icon: '🎯', color: '#C017B4' },
  { label: 'Won', value: '28', icon: '✅', color: '#00FF7F' },
  { label: 'Lost', value: '19', icon: '❌', color: '#F55D5D' },
  { label: 'Win Rate', value: '59.6%', icon: '📈', color: '#FFCF92' },
];

const RECENT_BETS = [
  { id: 1, type: 'Aviator', amount: 500, result: 2.47, win: 1235, status: 'won', time: '2h ago' },
  { id: 2, type: 'Football', amount: 200, result: null, win: 0, status: 'lost', time: '5h ago' },
  { id: 3, type: 'Aviator', amount: 100, result: 1.03, win: 103, status: 'won', time: '1d ago' },
  { id: 4, type: 'Basketball', amount: 300, result: null, win: 0, status: 'lost', time: '2d ago' },
  { id: 5, type: 'Aviator', amount: 750, result: 5.62, win: 4215, status: 'won', time: '3d ago' },
];

export default function AccountOverview() {
  const { user } = useAuth();

  return (
    <div className="p-[16px]">
      {/* Welcome */}
      <div className="mb-[20px]">
        <h1 className="text-[#E5E7EB] text-[20px] font-bold">My Account</h1>
        <p className="text-[#9CA3AF] text-[13px]">Welcome back, {user.phone}</p>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[8px] mb-[20px]">
        <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[16px]">
          <p className="text-[#9CA3AF] text-[12px] mb-[4px]">Main Balance</p>
          <p className="text-[#00FF7F] text-[24px] font-bold">
            KES {user.balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex gap-[8px] mt-[12px]">
            <Link
              to="/account/deposit"
              className="flex-1 py-[6px] rounded-[6px] bg-[#00FF7F] text-[#11181C] text-[12px] font-bold text-center"
            >
              Deposit
            </Link>
            <Link
              to="/account/withdraw"
              className="flex-1 py-[6px] rounded-[6px] bg-[#2A2B2E] text-[#E5E7EB] text-[12px] font-medium text-center border border-[#4B5563]"
            >
              Withdraw
            </Link>
          </div>
        </div>

        <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[16px]">
          <p className="text-[#9CA3AF] text-[12px] mb-[4px]">Bonus Balance</p>
          <p className="text-[#FFCF92] text-[24px] font-bold">
            KES {user.bonus.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[#6B7280] text-[11px] mt-[8px]">Welcome bonus — wager 5x to withdraw</p>
        </div>

        <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[16px]">
          <p className="text-[#9CA3AF] text-[12px] mb-[4px]">Account Status</p>
          <div className="flex items-center gap-[8px] mt-[4px]">
            <span className="w-[10px] h-[10px] rounded-full bg-[#00FF7F]" />
            <span className="text-[#00FF7F] text-[14px] font-semibold">Active</span>
          </div>
          <p className="text-[#6B7280] text-[11px] mt-[8px]">Verified account</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px] mb-[20px]">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] p-[12px] text-center">
            <div className="text-[24px] mb-[4px]">{stat.icon}</div>
            <p className="font-bold text-[18px]" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[#9CA3AF] text-[11px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent bets */}
      <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E]">
        <div className="px-[16px] py-[12px] border-b border-[#2A2B2E] flex items-center justify-between">
          <h3 className="text-[#E5E7EB] text-[14px] font-semibold">Recent Bets</h3>
          <Link to="/account/history" className="text-[#C017B4] text-[12px] hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2B2E]">
                {['Type', 'Stake', 'Result', 'Winnings', 'Time'].map((h) => (
                  <th key={h} className="px-[12px] py-[8px] text-left text-[#6B7280] text-[11px] font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_BETS.map((bet) => (
                <tr key={bet.id} className="border-b border-[#2A2B2E] hover:bg-[#2A2B2E] transition-colors">
                  <td className="px-[12px] py-[8px] text-[#E5E7EB] text-[12px]">{bet.type}</td>
                  <td className="px-[12px] py-[8px] text-[#E5E7EB] text-[12px]">KES {bet.amount.toLocaleString()}</td>
                  <td className="px-[12px] py-[8px]">
                    {bet.result ? (
                      <span className="text-[#00FF7F] text-[12px] font-semibold">{bet.result}x</span>
                    ) : (
                      <span className="text-[#F55D5D] text-[12px]">Lost</span>
                    )}
                  </td>
                  <td className="px-[12px] py-[8px]">
                    <span className={`text-[12px] font-semibold ${bet.status === 'won' ? 'text-[#00FF7F]' : 'text-[#F55D5D]'}`}>
                      {bet.status === 'won' ? `+KES ${bet.win.toLocaleString()}` : `-KES ${bet.amount.toLocaleString()}`}
                    </span>
                  </td>
                  <td className="px-[12px] py-[8px] text-[#6B7280] text-[11px]">{bet.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
