import { useState } from 'react';

const ALL_BETS = [
  { id: 'BT-1001', type: 'Aviator', stake: 500, multiplier: '2.47x', payout: 1235, status: 'won', date: '2026-03-13 14:22' },
  { id: 'BT-1002', type: 'Football', stake: 200, multiplier: '3.40', payout: 0, status: 'lost', date: '2026-03-13 10:15' },
  { id: 'BT-1003', type: 'Aviator', stake: 100, multiplier: '1.03x', payout: 103, status: 'won', date: '2026-03-12 22:44' },
  { id: 'BT-1004', type: 'Basketball', stake: 300, multiplier: '1.95', payout: 0, status: 'lost', date: '2026-03-12 19:30' },
  { id: 'BT-1005', type: 'Aviator', stake: 750, multiplier: '5.62x', payout: 4215, status: 'won', date: '2026-03-11 18:05' },
  { id: 'BT-1006', type: 'Football', stake: 100, multiplier: '2.10', payout: 210, status: 'won', date: '2026-03-11 15:00' },
  { id: 'BT-1007', type: 'Casino', stake: 250, multiplier: '—', payout: 0, status: 'lost', date: '2026-03-10 21:33' },
  { id: 'BT-1008', type: 'Aviator', stake: 200, multiplier: '10.00x', payout: 2000, status: 'won', date: '2026-03-10 20:12' },
  { id: 'BT-1009', type: 'Tennis', stake: 150, multiplier: '1.50', payout: 225, status: 'won', date: '2026-03-09 16:45' },
  { id: 'BT-1010', type: 'Aviator', stake: 1000, multiplier: '1.02x', payout: 1020, status: 'won', date: '2026-03-09 14:22' },
  { id: 'BT-1011', type: 'Football', stake: 500, multiplier: '3.50', payout: 0, status: 'lost', date: '2026-03-08 20:00' },
  { id: 'BT-1012', type: 'Aviator', stake: 300, multiplier: '1.18x', payout: 354, status: 'won', date: '2026-03-08 18:33' },
];

const STATUS_LABELS = { all: 'All', won: 'Won', lost: 'Lost' };

export default function BetHistoryPage() {
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const types = ['all', ...Array.from(new Set(ALL_BETS.map((b) => b.type)))];

  const filtered = ALL_BETS.filter((b) => {
    const statusOk = filter === 'all' || b.status === filter;
    const typeOk = typeFilter === 'all' || b.type === typeFilter;
    return statusOk && typeOk;
  });

  const totalStake = filtered.reduce((s, b) => s + b.stake, 0);
  const totalPayout = filtered.reduce((s, b) => s + b.payout, 0);

  return (
    <div className="p-[16px]">
      <h1 className="text-[#E5E7EB] text-[20px] font-bold mb-[4px]">Bet History</h1>
      <p className="text-[#9CA3AF] text-[13px] mb-[16px]">Your complete betting history</p>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-[8px] mb-[16px]">
        {[
          { label: 'Total Bets', value: ALL_BETS.length, color: '#E5E7EB' },
          { label: 'Total Staked', value: `KES ${ALL_BETS.reduce((s, b) => s + b.stake, 0).toLocaleString()}`, color: '#FFCF92' },
          { label: 'Net P&L', value: `KES ${(ALL_BETS.reduce((s, b) => s + b.payout - b.stake, 0)).toLocaleString()}`, color: '#00FF7F' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] p-[10px]">
            <p className="text-[#6B7280] text-[11px]">{label}</p>
            <p className="text-[14px] font-bold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-[6px] mb-[12px]">
        {Object.entries(STATUS_LABELS).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-[10px] py-[4px] rounded-[6px] text-[12px] font-medium transition-colors ${
              filter === k ? 'bg-[#C017B4] text-white' : 'bg-[#2A2B2E] text-[#9CA3AF] hover:text-[#E5E7EB] border border-[#4B5563]'
            }`}
          >
            {v}
          </button>
        ))}
        <div className="h-[28px] w-[1px] bg-[#2A2B2E] self-center" />
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-[10px] py-[4px] rounded-[6px] text-[12px] font-medium capitalize transition-colors ${
              typeFilter === t ? 'bg-[#2A2B2E] text-[#E5E7EB] border border-[#C017B4]' : 'bg-[#1B1C1D] text-[#9CA3AF] hover:text-[#E5E7EB] border border-[#2A2B2E]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2B2E] bg-[#252528]">
                {['Ref', 'Type', 'Stake', 'Multiplier', 'Payout', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-[12px] py-[10px] text-left text-[#6B7280] text-[11px] font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((bet) => (
                <tr key={bet.id} className="border-b border-[#2A2B2E] hover:bg-[#2A2B2E] transition-colors">
                  <td className="px-[12px] py-[8px] text-[#6B7280] text-[11px] font-mono">{bet.id}</td>
                  <td className="px-[12px] py-[8px] text-[#E5E7EB] text-[12px]">{bet.type}</td>
                  <td className="px-[12px] py-[8px] text-[#E5E7EB] text-[12px]">KES {bet.stake.toLocaleString()}</td>
                  <td className="px-[12px] py-[8px]">
                    <span className={`text-[12px] font-semibold ${bet.status === 'won' ? 'text-[#00FF7F]' : 'text-[#9CA3AF]'}`}>
                      {bet.multiplier}
                    </span>
                  </td>
                  <td className="px-[12px] py-[8px]">
                    <span className={`text-[12px] font-semibold ${bet.payout > 0 ? 'text-[#00FF7F]' : 'text-[#F55D5D]'}`}>
                      {bet.payout > 0 ? `KES ${bet.payout.toLocaleString()}` : '—'}
                    </span>
                  </td>
                  <td className="px-[12px] py-[8px]">
                    <span
                      className={`px-[6px] py-[2px] rounded-full text-[10px] font-semibold ${
                        bet.status === 'won'
                          ? 'bg-[#16A34A]/20 text-[#00FF7F]'
                          : 'bg-[#F55D5D]/10 text-[#F55D5D]'
                      }`}
                    >
                      {bet.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-[12px] py-[8px] text-[#6B7280] text-[11px] whitespace-nowrap">{bet.date}</td>
                </tr>
              ))}
            </tbody>
            {/* Footer totals */}
            <tfoot>
              <tr className="bg-[#252528] border-t border-[#4B5563]">
                <td colSpan={2} className="px-[12px] py-[8px] text-[#9CA3AF] text-[11px] font-medium">
                  {filtered.length} records
                </td>
                <td className="px-[12px] py-[8px] text-[#FFCF92] text-[12px] font-bold">
                  KES {totalStake.toLocaleString()}
                </td>
                <td />
                <td className="px-[12px] py-[8px] text-[#00FF7F] text-[12px] font-bold">
                  KES {totalPayout.toLocaleString()}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
