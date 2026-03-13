import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SPORTS_DATA = [
  {
    id: 'football', name: 'Football', icon: '⚽',
    leagues: [
      {
        name: 'English Premier League', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        matches: [
          { id: 101, home: 'Arsenal', away: 'Chelsea', time: 'Today 20:00', odds: ['2.10', '3.40', '3.50'] },
          { id: 102, home: 'Liverpool', away: 'Man City', time: 'Today 17:30', odds: ['2.60', '3.20', '2.80'] },
          { id: 103, home: 'Tottenham', away: 'Everton', time: 'Sat 15:00', odds: ['1.80', '3.60', '4.50'] },
        ],
      },
      {
        name: 'La Liga', country: '🇪🇸',
        matches: [
          { id: 201, home: 'Barcelona', away: 'Real Madrid', time: 'Today 21:45', odds: ['2.30', '3.10', '2.90'], live: true, score: '1-0', minute: "67'" },
          { id: 202, home: 'Atletico Madrid', away: 'Sevilla', time: 'Sun 19:00', odds: ['2.00', '3.30', '3.80'] },
        ],
      },
      {
        name: 'Kenyan Premier League', country: '🇰🇪',
        matches: [
          { id: 301, home: 'Gor Mahia', away: 'AFC Leopards', time: 'Today 16:00', odds: ['2.20', '3.00', '3.30'], live: true, score: '0-0', minute: "34'" },
          { id: 302, home: 'Tusker FC', away: 'Bandari', time: 'Sat 14:00', odds: ['2.40', '3.10', '2.95'] },
        ],
      },
    ],
  },
  {
    id: 'basketball', name: 'Basketball', icon: '🏀',
    leagues: [
      {
        name: 'NBA', country: '🇺🇸',
        matches: [
          { id: 401, home: 'LA Lakers', away: 'Golden State', time: 'Today 03:30', odds: ['1.95', '1.85'] },
          { id: 402, home: 'Boston Celtics', away: 'Miami Heat', time: 'Today 01:00', odds: ['1.65', '2.20'] },
        ],
      },
    ],
  },
  {
    id: 'tennis', name: 'Tennis', icon: '🎾',
    leagues: [
      {
        name: 'ATP Tour', country: '🌍',
        matches: [
          { id: 501, home: 'Djokovic N.', away: 'Alcaraz C.', time: 'Today 14:00', odds: ['1.50', '2.60'] },
          { id: 502, home: 'Medvedev D.', away: 'Sinner J.', time: 'Today 16:30', odds: ['2.10', '1.75'] },
        ],
      },
    ],
  },
];

export default function SportsPage() {
  const { user } = useAuth();
  const [activeSport, setActiveSport] = useState('football');
  const [betSlip, setBetSlip] = useState([]);
  const [expandedLeagues, setExpandedLeagues] = useState({});

  const sport = SPORTS_DATA.find((s) => s.id === activeSport) || SPORTS_DATA[0];

  function toggleLeague(name) {
    setExpandedLeagues((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  function addToBetSlip(match, outcome, odd) {
    const key = `${match.id}-${outcome}`;
    if (betSlip.find((b) => b.key === key)) {
      setBetSlip(betSlip.filter((b) => b.key !== key));
    } else {
      setBetSlip([...betSlip.filter((b) => b.matchId !== match.id), { key, matchId: match.id, match: `${match.home} vs ${match.away}`, outcome, odd }]);
    }
  }

  function isSelected(matchId, outcome) {
    return betSlip.some((b) => b.matchId === matchId && b.outcome === outcome);
  }

  return (
    <div className="flex flex-1 bg-[#11181C]">
      {/* Sport selector sidebar */}
      <div className="w-[56px] bg-[#1B1C1D] border-r border-[#2A2B2E] flex flex-col items-center py-[8px] gap-[4px]">
        {SPORTS_DATA.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSport(s.id)}
            title={s.name}
            className={`w-[44px] h-[44px] rounded-[8px] flex flex-col items-center justify-center gap-[2px] transition-colors ${
              activeSport === s.id ? 'bg-[#C017B4]' : 'hover:bg-[#2A2B2E]'
            }`}
          >
            <span className="text-[20px]">{s.icon}</span>
            <span className="text-[8px] text-[#9CA3AF] truncate w-full text-center px-[2px]">
              {s.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Matches list */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="px-[8px] py-[8px]">
          <h2 className="text-[#E5E7EB] text-[15px] font-bold mb-[8px] flex items-center gap-[8px]">
            <span>{sport.icon}</span> {sport.name}
          </h2>

          {sport.leagues.map((league) => (
            <div key={league.name} className="mb-[8px]">
              <button
                onClick={() => toggleLeague(league.name)}
                className="w-full flex items-center justify-between px-[10px] py-[8px] bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] hover:border-[#4B5563] transition-colors"
              >
                <span className="text-[#E5E7EB] text-[13px] font-medium flex items-center gap-[6px]">
                  <span>{league.country}</span> {league.name}
                </span>
                <svg
                  className={`w-[14px] h-[14px] text-[#6B7280] transition-transform ${expandedLeagues[league.name] === false ? '' : 'rotate-180'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedLeagues[league.name] !== false && (
                <div className="mt-[2px] flex flex-col gap-[2px]">
                  {league.matches.map((match) => (
                    <div key={match.id} className="bg-[#1B1C1D] rounded-[6px] border border-[#2A2B2E] px-[10px] py-[8px]">
                      <div className="flex items-center justify-between mb-[4px]">
                        {match.live ? (
                          <span className="flex items-center gap-[4px] text-[#F55D5D] text-[11px] font-semibold">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#F55D5D] animate-pulse" />
                            {match.minute} {match.score}
                          </span>
                        ) : (
                          <span className="text-[#9CA3AF] text-[11px]">{match.time}</span>
                        )}
                        <button className="text-[#6B7280] text-[10px] hover:text-[#9CA3AF]">+markets</button>
                      </div>
                      <div className="flex items-center gap-[4px] mb-[6px]">
                        <span className="flex-1 text-[#E5E7EB] text-[13px] font-medium">{match.home}</span>
                        <span className="text-[#4B5563] text-[11px]">vs</span>
                        <span className="flex-1 text-right text-[#E5E7EB] text-[13px] font-medium">{match.away}</span>
                      </div>
                      <div className="flex gap-[4px]">
                        {match.odds.map((odd, j) => {
                          const label = match.odds.length === 2 ? ['1', '2'][j] : ['1', 'X', '2'][j];
                          return (
                            <button
                              key={label}
                              onClick={() => addToBetSlip(match, label, odd)}
                              className={`flex-1 flex flex-col items-center py-[4px] rounded-[6px] transition-colors ${
                                isSelected(match.id, label) ? 'bg-[#C017B4]' : 'bg-[#2A2B2E] hover:bg-[#4B5563]'
                              }`}
                            >
                              <span className="text-[10px] text-[#6B7280]">{label}</span>
                              <span className="text-[#E5E7EB] text-[12px] font-bold">{odd}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bet slip */}
      <div className="hidden xl:flex w-[260px] flex-shrink-0 bg-[#1B1C1D] border-l border-[#2A2B2E] flex-col h-[calc(100vh-130px)] sticky top-[130px]">
        <div className="px-[12px] py-[10px] border-b border-[#2A2B2E] flex items-center justify-between">
          <span className="text-[#E5E7EB] text-[14px] font-bold">Bet Slip</span>
          {betSlip.length > 0 && (
            <button onClick={() => setBetSlip([])} className="text-[#F55D5D] text-[11px] hover:underline">Clear</button>
          )}
        </div>
        {betSlip.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-[16px]">
            <div className="text-[40px] mb-[8px]">🎯</div>
            <p className="text-[#6B7280] text-[12px]">Select odds to add to your bet slip</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {betSlip.map((b) => (
                <div key={b.key} className="px-[12px] py-[8px] border-b border-[#2A2B2E] flex items-start justify-between gap-[4px]">
                  <div className="min-w-0">
                    <p className="text-[#9CA3AF] text-[10px] truncate">{b.match}</p>
                    <p className="text-[#E5E7EB] text-[12px] font-medium">Result: {b.outcome}</p>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-[#00FF7F] text-[13px] font-bold">{b.odd}</span>
                    <button onClick={() => setBetSlip(betSlip.filter((x) => x.key !== b.key))} className="text-[#F55D5D] text-[16px] leading-none">×</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-[12px] border-t border-[#2A2B2E]">
              <div className="flex items-center justify-between mb-[8px]">
                <span className="text-[#9CA3AF] text-[12px]">Total Odds</span>
                <span className="text-[#00FF7F] text-[14px] font-bold">
                  {betSlip.reduce((a, b) => a * parseFloat(b.odd), 1).toFixed(2)}
                </span>
              </div>
              <input
                type="number"
                placeholder="Stake (KES)"
                className="w-full bg-[#2A2B2E] text-[#E5E7EB] text-[13px] px-[10px] py-[8px] rounded-[6px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] mb-[8px]"
              />
              {!user ? (
                <Link to="/login" className="block w-full py-[10px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[14px] text-center">
                  Login to Bet
                </Link>
              ) : (
                <button className="w-full py-[10px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[14px] hover:opacity-90 transition-opacity">
                  Place Bet
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
