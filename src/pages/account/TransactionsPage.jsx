const TRANSACTIONS = [
  { id: 'TXN-5001', type: 'deposit', method: 'M-PESA', amount: 1000, balance: 5240, status: 'completed', date: '2026-03-13 09:12' },
  { id: 'TXN-5002', type: 'bet', method: 'Aviator', amount: -500, balance: 4740, status: 'completed', date: '2026-03-13 14:22' },
  { id: 'TXN-5003', type: 'win', method: 'Aviator', amount: 1235, balance: 5975, status: 'completed', date: '2026-03-13 14:22' },
  { id: 'TXN-5004', type: 'withdrawal', method: 'M-PESA', amount: -735, balance: 5240, status: 'completed', date: '2026-03-12 16:00' },
  { id: 'TXN-5005', type: 'bet', method: 'Football', amount: -200, balance: 5040, status: 'completed', date: '2026-03-12 10:15' },
  { id: 'TXN-5006', type: 'deposit', method: 'M-PESA', amount: 500, balance: 5240, status: 'completed', date: '2026-03-11 08:30' },
  { id: 'TXN-5007', type: 'win', method: 'Aviator', amount: 4215, balance: 9165, status: 'completed', date: '2026-03-11 18:05' },
  { id: 'TXN-5008', type: 'withdrawal', method: 'M-PESA', amount: -3925, balance: 5240, status: 'completed', date: '2026-03-11 19:00' },
  { id: 'TXN-5009', type: 'bet', method: 'Basketball', amount: -300, balance: 4940, status: 'completed', date: '2026-03-10 19:30' },
  { id: 'TXN-5010', type: 'bonus', method: 'Welcome Bonus', amount: 200, balance: 5140, status: 'completed', date: '2026-03-08 12:00' },
];

const TYPE_STYLES = {
  deposit: { color: '#00FF7F', bg: 'bg-[#16A34A]/10', label: 'Deposit' },
  withdrawal: { color: '#FFCF92', bg: 'bg-[#CA8A04]/10', label: 'Withdrawal' },
  bet: { color: '#F55D5D', bg: 'bg-[#F55D5D]/10', label: 'Bet Placed' },
  win: { color: '#00FF7F', bg: 'bg-[#16A34A]/10', label: 'Win' },
  bonus: { color: '#C017B4', bg: 'bg-[#C017B4]/10', label: 'Bonus' },
};

export default function TransactionsPage() {
  return (
    <div className="p-[16px]">
      <h1 className="text-[#E5E7EB] text-[20px] font-bold mb-[4px]">Transactions</h1>
      <p className="text-[#9CA3AF] text-[13px] mb-[16px]">Your complete transaction history</p>

      <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2B2E] bg-[#252528]">
                {['Reference', 'Type', 'Method', 'Amount', 'Balance', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-[12px] py-[10px] text-left text-[#6B7280] text-[11px] font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((tx) => {
                const style = TYPE_STYLES[tx.type] || TYPE_STYLES.bet;
                return (
                  <tr key={tx.id} className="border-b border-[#2A2B2E] hover:bg-[#2A2B2E] transition-colors">
                    <td className="px-[12px] py-[8px] text-[#6B7280] text-[11px] font-mono">{tx.id}</td>
                    <td className="px-[12px] py-[8px]">
                      <span className={`px-[6px] py-[2px] rounded-full text-[10px] font-semibold ${style.bg}`} style={{ color: style.color }}>
                        {style.label}
                      </span>
                    </td>
                    <td className="px-[12px] py-[8px] text-[#E5E7EB] text-[12px]">{tx.method}</td>
                    <td className="px-[12px] py-[8px]">
                      <span className={`text-[12px] font-semibold ${tx.amount > 0 ? 'text-[#00FF7F]' : 'text-[#F55D5D]'}`}>
                        {tx.amount > 0 ? '+' : ''}KES {Math.abs(tx.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-[12px] py-[8px] text-[#9CA3AF] text-[12px]">KES {tx.balance.toLocaleString()}</td>
                    <td className="px-[12px] py-[8px]">
                      <span className="px-[6px] py-[2px] rounded-full text-[10px] font-semibold bg-[#16A34A]/20 text-[#00FF7F]">
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-[12px] py-[8px] text-[#6B7280] text-[11px] whitespace-nowrap">{tx.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
