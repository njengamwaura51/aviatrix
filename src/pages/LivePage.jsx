import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LIVE_MATCHES = [
  { id: 1, sport: '⚽', league: 'La Liga', home: 'Barcelona', away: 'Real Madrid', score: '1-0', minute: "67'", homeOdds: '1.90', drawOdds: '3.60', awayOdds: '4.20' },
  { id: 2, sport: '⚽', league: 'KPL', home: 'Gor Mahia', away: 'AFC Leopards', score: '0-0', minute: "34'", homeOdds: '2.40', drawOdds: '3.00', awayOdds: '3.10' },
  { id: 3, sport: '⚽', league: 'Premier League', home: 'Man Utd', away: 'Newcastle', score: '2-1', minute: "78'", homeOdds: '1.40', drawOdds: '5.00', awayOdds: '9.00' },
  { id: 4, sport: '🏀', league: 'NBA', home: 'LA Lakers', away: 'Golden State', score: '87-92', minute: "Q3 5:22", homeOdds: '2.10', drawOdds: null, awayOdds: '1.72' },
  { id: 5, sport: '🎾', league: 'ATP Tour', home: 'Djokovic N.', away: 'Alcaraz C.', score: '6-4, 3-2', minute: "Set 2", homeOdds: '1.65', drawOdds: null, awayOdds: '2.30' },
  { id: 6, sport: '🏐', league: 'Volleyball Int.', home: 'Brazil', away: 'Poland', score: '1-1', minute: "Set 3 14-18", homeOdds: '1.80', drawOdds: null, awayOdds: '2.00' },
];

export default function LivePage() {
  const { user } = useAuth();
  const [betSlip, setBetSlip] = useState([]);

  function addToBetSlip(match, outcome, odd) {
    const key = `${match.id}-${outcome}`;
    if (betSlip.find((b) => b.key === key)) {
      setBetSlip(betSlip.filter((b) => b.key !== key));
    } else {
      setBetSlip([...betSlip.filter((b) => b.matchId !== match.id), {
        key, matchId: match.id, match: `${match.home} vs ${match.away}`, outcome, odd
      }]);
    }
  }

  return (
    <div className="flex flex-1 bg-[#11181C]">
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-[8px] px-[8px] py-[10px] bg-[#1B1C1D] border-b border-[#2A2B2E]">
          <span className="w-[8px] h-[8px] rounded-full bg-[#F55D5D] animate-pulse" />
          <h1 className="text-[#E5E7EB] text-[16px] font-bold">Live Betting</h1>
          <span className="px-[6px] py-[2px] rounded-full bg-[#F55D5D]/20 text-[#F55D5D] text-[11px] font-bold">
            {LIVE_MATCHES.length} LIVE
          </span>
        </div>

        <div className="px-[8px] py-[8px] flex flex-col gap-[6px]">
          {LIVE_MATCHES.map((match) => (
            <div key={match.id} className="bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] p-[10px]">
              <div className="flex items-center justify-between mb-[6px]">
                <span className="text-[#9CA3AF] text-[11px]">{match.sport} {match.league}</span>
                <span className="flex items-center gap-[4px] text-[#F55D5D] text-[11px] font-semibold">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#F55D5D] animate-pulse" />
                  {match.minute}
                </span>
              </div>
              <div className="flex items-center gap-[8px] mb-[8px]">
                <span className="flex-1 text-[#E5E7EB] text-[14px] font-semibold">{match.home}</span>
                <span className="px-[10px] py-[2px] rounded-[6px] bg-[#C017B4] text-white text-[13px] font-bold">
                  {match.score}
                </span>
                <span className="flex-1 text-right text-[#E5E7EB] text-[14px] font-semibold">{match.away}</span>
              </div>
              <div className="flex gap-[4px]">
                {[
                  { label: '1', odd: match.homeOdds },
                  ...(match.drawOdds ? [{ label: 'X', odd: match.drawOdds }] : []),
                  { label: '2', odd: match.awayOdds },
                ].map(({ label, odd }) => (
                  <button
                    key={label}
                    onClick={() => addToBetSlip(match, label, odd)}
                    className={`flex-1 flex flex-col items-center py-[5px] rounded-[6px] transition-colors ${
                      betSlip.some((b) => b.matchId === match.id && b.outcome === label)
                        ? 'bg-[#C017B4]'
                        : 'bg-[#2A2B2E] hover:bg-[#4B5563]'
                    }`}
                  >
                    <span className="text-[10px] text-[#6B7280]">{label}</span>
                    <span className="text-[13px] font-bold text-[#E5E7EB]">{odd}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bet slip */}
      {betSlip.length > 0 && (
        <div className="hidden xl:flex w-[260px] flex-shrink-0 bg-[#1B1C1D] border-l border-[#2A2B2E] flex-col sticky top-[130px] h-fit">
          <div className="px-[12px] py-[10px] border-b border-[#2A2B2E] flex items-center justify-between">
            <span className="text-[#E5E7EB] text-[14px] font-bold">Bet Slip ({betSlip.length})</span>
            <button onClick={() => setBetSlip([])} className="text-[#F55D5D] text-[11px]">Clear</button>
          </div>
          <div className="p-[12px] flex flex-col gap-[8px]">
            {betSlip.map((b) => (
              <div key={b.key} className="flex items-start justify-between gap-[4px]">
                <div className="min-w-0">
                  <p className="text-[#9CA3AF] text-[10px] truncate">{b.match}</p>
                  <p className="text-[#E5E7EB] text-[12px] font-medium">{b.outcome}</p>
                </div>
                <div className="flex items-center gap-[4px]">
                  <span className="text-[#00FF7F] text-[13px] font-bold">{b.odd}</span>
                  <button onClick={() => setBetSlip(betSlip.filter((x) => x.key !== b.key))} className="text-[#F55D5D] text-[16px] leading-none">×</button>
                </div>
              </div>
            ))}
            <input type="number" placeholder="Stake (KES)" className="w-full bg-[#2A2B2E] text-[#E5E7EB] text-[13px] px-[10px] py-[8px] rounded-[6px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4]" />
            {!user ? (
              <Link to="/login" className="block w-full py-[10px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[14px] text-center">Login to Bet</Link>
            ) : (
              <button className="w-full py-[10px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[14px]">Place Bet</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
