import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AviatorSection from '../components/AviatorSection';

const MATCHES = [
  { id: 1, league: 'Premier League', leagueIcon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', home: 'Arsenal', away: 'Chelsea', time: 'Today 20:00', odds: ['2.10', '3.40', '3.50'], live: false },
  { id: 2, league: 'La Liga', leagueIcon: '🇪🇸', home: 'Barcelona', away: 'Real Madrid', time: 'Today 21:45', odds: ['2.30', '3.10', '2.90'], live: true, score: '1-0', minute: "67'" },
  { id: 3, league: 'Serie A', leagueIcon: '🇮🇹', home: 'AC Milan', away: 'Juventus', time: 'Tomorrow 19:45', odds: ['2.50', '3.20', '2.70'], live: false },
  { id: 4, league: 'Bundesliga', leagueIcon: '🇩🇪', home: 'Bayern Munich', away: 'Dortmund', time: 'Tomorrow 20:30', odds: ['1.70', '4.00', '5.20'], live: false },
  { id: 5, league: 'Ligue 1', leagueIcon: '🇫🇷', home: 'PSG', away: 'Marseille', time: 'Today 22:00', odds: ['1.45', '4.50', '7.00'], live: true, score: '2-1', minute: "80'" },
  { id: 6, league: 'Champions League', leagueIcon: '⭐', home: 'Inter Milan', away: 'Porto', time: 'Wed 21:00', odds: ['1.90', '3.50', '4.10'], live: false },
  { id: 7, league: 'KPL', leagueIcon: '🇰🇪', home: 'Gor Mahia', away: 'AFC Leopards', time: 'Today 16:00', odds: ['2.20', '3.00', '3.30'], live: true, score: '0-0', minute: "34'" },
  { id: 8, league: 'AFCON Qualifiers', leagueIcon: '🌍', home: 'Kenya', away: 'Ethiopia', time: 'Sat 15:00', odds: ['2.60', '2.80', '2.90'], live: false },
];

const POPULAR_MARKETS = [
  { label: 'Both Teams to Score', odds: ['Yes 1.75', 'No 2.05'] },
  { label: 'Over/Under 2.5', odds: ['Over 1.85', 'Under 1.95'] },
  { label: 'Double Chance', odds: ['1X 1.40', 'X2 1.55', '12 1.25'] },
  { label: 'First Half Result', odds: ['H 2.30', 'D 2.40', 'A 2.80'] },
];

const PROMOS = [
  { title: 'Welcome Bonus', desc: '100% up to KES 5,000 on first deposit', color: '#C017B4', badge: 'NEW' },
  { title: 'Aviator Cashback', desc: 'Get 10% cashback on Aviator losses every Friday', color: '#CA8A04', badge: 'HOT' },
  { title: 'Accumulator Boost', desc: 'Up to 50% extra winnings on 5+ leg accumulators', color: '#16A34A', badge: '' },
];

export default function HomePage() {
  const { user } = useAuth();
  const [betSlip, setBetSlip] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  function addToBetSlip(match, outcome, odd) {
    const key = `${match.id}-${outcome}`;
    if (betSlip.find((b) => b.key === key)) {
      setBetSlip(betSlip.filter((b) => b.key !== key));
    } else {
      setBetSlip([...betSlip.filter((b) => b.matchId !== match.id), {
        key,
        matchId: match.id,
        match: `${match.home} vs ${match.away}`,
        outcome,
        odd,
      }]);
    }
  }

  function isSelected(matchId, outcome) {
    return betSlip.some((b) => b.matchId === matchId && b.outcome === outcome);
  }

  const totalOdds = betSlip.reduce((acc, b) => acc * parseFloat(b.odd), 1).toFixed(2);

  const displayMatches = activeTab === 'live'
    ? MATCHES.filter((m) => m.live)
    : MATCHES.filter((m) => !m.live);

  return (
    <div className="flex flex-1 bg-[#11181C]">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Aviator quick access banner */}
        <div className="mx-[8px] mt-[8px] rounded-[12px] bg-gradient-to-r from-[#1B1C1D] to-[#252528] border border-[#2A2B2E] overflow-hidden">
          <div className="flex items-center justify-between px-[16px] py-[12px]">
            <div className="flex items-center gap-[12px]">
              <span className="text-[36px]">✈️</span>
              <div>
                <p className="text-[#E5E7EB] text-[15px] font-bold">Play Aviator Now</p>
                <p className="text-[#9CA3AF] text-[12px]">Win up to 10,000x your bet!</p>
              </div>
            </div>
            <Link
              to="/aviator"
              className="px-[16px] py-[8px] rounded-[8px] bg-[#C017B4] text-white text-[13px] font-bold hover:opacity-90 transition-opacity"
            >
              Play Now
            </Link>
          </div>
        </div>

        {/* Promotions */}
        <div className="flex gap-[8px] px-[8px] mt-[8px] overflow-x-auto scrollbar-hide">
          {PROMOS.map((promo) => (
            <div
              key={promo.title}
              className="flex-shrink-0 w-[260px] rounded-[12px] bg-[#1B1C1D] border border-[#2A2B2E] p-[12px] hover:border-[#4B5563] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-[6px]">
                <span className="text-[#E5E7EB] text-[13px] font-bold">{promo.title}</span>
                {promo.badge && (
                  <span
                    className="px-[6px] py-[2px] rounded-full text-[10px] font-bold text-white"
                    style={{ background: promo.color }}
                  >
                    {promo.badge}
                  </span>
                )}
              </div>
              <p className="text-[#9CA3AF] text-[11px]">{promo.desc}</p>
              <button
                className="mt-[8px] px-[10px] py-[4px] rounded-[6px] text-[11px] font-semibold border transition-colors"
                style={{ borderColor: promo.color, color: promo.color }}
              >
                Claim Now
              </button>
            </div>
          ))}
        </div>

        {/* Tabs: Upcoming / Live */}
        <div className="flex items-center gap-[2px] px-[8px] mt-[12px]">
          {['upcoming', 'live'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[12px] py-[6px] rounded-[6px] text-[13px] font-medium capitalize transition-colors ${
                activeTab === tab ? 'bg-[#C017B4] text-white' : 'text-[#9CA3AF] hover:bg-[#2A2B2E] hover:text-[#E5E7EB]'
              }`}
            >
              {tab === 'live' ? '🔴 Live' : 'Upcoming'}
            </button>
          ))}
          {activeTab === 'live' && (
            <span className="ml-[4px] px-[6px] py-[2px] rounded-full bg-[#F55D5D]/20 text-[#F55D5D] text-[11px] font-bold">
              {MATCHES.filter((m) => m.live).length}
            </span>
          )}
        </div>

        {/* Match grid */}
        <div className="px-[8px] mt-[8px] grid grid-cols-1 lg:grid-cols-2 gap-[8px] pb-[16px]">
          {displayMatches.map((match) => (
            <div
              key={match.id}
              className="bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] p-[8px] hover:border-[#4B5563] transition-colors"
            >
              {/* Match header */}
              <div className="flex items-center justify-between mb-[6px]">
                <span className="text-[#9CA3AF] text-[11px] flex items-center gap-[4px]">
                  <span>{match.leagueIcon}</span>
                  <span>{match.league}</span>
                </span>
                {match.live ? (
                  <span className="flex items-center gap-[4px] text-[#F55D5D] text-[11px] font-semibold">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#F55D5D] animate-pulse" />
                    {match.minute} {match.score}
                  </span>
                ) : (
                  <span className="text-[#FFCF92] text-[11px]">{match.time}</span>
                )}
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between mb-[8px]">
                <span className="text-[#E5E7EB] text-[14px] font-semibold">{match.home}</span>
                <span className="text-[#4B5563] text-[11px] font-medium px-[6px]">vs</span>
                <span className="text-[#E5E7EB] text-[14px] font-semibold">{match.away}</span>
              </div>

              {/* Odds */}
              <div className="flex gap-[4px]">
                {['1', 'X', '2'].map((label, j) => (
                  <button
                    key={label}
                    onClick={() => addToBetSlip(match, label, match.odds[j])}
                    className={`flex-1 flex flex-col items-center py-[6px] rounded-[6px] transition-colors ${
                      isSelected(match.id, label)
                        ? 'bg-[#C017B4] text-white'
                        : 'bg-[#2A2B2E] hover:bg-[#4B5563] text-[#E5E7EB]'
                    }`}
                  >
                    <span className={`text-[10px] ${isSelected(match.id, label) ? 'text-white/70' : 'text-[#6B7280]'}`}>
                      {label}
                    </span>
                    <span className="text-[13px] font-bold">{match.odds[j]}</span>
                  </button>
                ))}
              </div>

              {/* More markets */}
              <div className="flex items-center justify-between mt-[6px]">
                <button className="text-[#6B7280] text-[11px] hover:text-[#9CA3AF] transition-colors">
                  +24 markets
                </button>
                <button className="text-[#6B7280] text-[11px] hover:text-[#9CA3AF] transition-colors">
                  📊 Stats
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popular markets */}
        <div className="px-[8px] pb-[16px]">
          <h3 className="text-[#E5E7EB] text-[14px] font-semibold mb-[8px]">Popular Markets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
            {POPULAR_MARKETS.map((market) => (
              <div key={market.label} className="bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] p-[10px]">
                <p className="text-[#9CA3AF] text-[11px] mb-[6px]">{market.label}</p>
                <div className="flex gap-[4px]">
                  {market.odds.map((odd) => (
                    <button
                      key={odd}
                      className="flex-1 px-[4px] py-[4px] rounded-[6px] bg-[#2A2B2E] text-[#E5E7EB] text-[12px] hover:bg-[#4B5563] transition-colors"
                    >
                      {odd}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bet Slip sidebar */}
      <div className="hidden xl:flex w-[280px] flex-shrink-0 bg-[#1B1C1D] border-l border-[#2A2B2E] flex-col h-[calc(100vh-130px)] sticky top-[130px]">
        <div className="px-[12px] py-[10px] border-b border-[#2A2B2E] flex items-center justify-between">
          <span className="text-[#E5E7EB] text-[14px] font-bold">Bet Slip</span>
          {betSlip.length > 0 && (
            <button
              onClick={() => setBetSlip([])}
              className="text-[#F55D5D] text-[11px] hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {betSlip.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-[16px]">
            <div className="text-[40px] mb-[8px]">🎰</div>
            <p className="text-[#6B7280] text-[12px]">Click odds to add selections to your bet slip</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {betSlip.map((b) => (
                <div key={b.key} className="px-[12px] py-[8px] border-b border-[#2A2B2E]">
                  <div className="flex items-start justify-between gap-[4px]">
                    <div className="min-w-0">
                      <p className="text-[#9CA3AF] text-[10px] truncate">{b.match}</p>
                      <p className="text-[#E5E7EB] text-[12px] font-medium">Result: {b.outcome}</p>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <span className="text-[#00FF7F] text-[13px] font-bold">{b.odd}</span>
                      <button
                        onClick={() => setBetSlip(betSlip.filter((x) => x.key !== b.key))}
                        className="text-[#F55D5D] hover:text-[#ff7c7c] text-[16px] leading-none"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stake & place bet */}
            <div className="p-[12px] border-t border-[#2A2B2E]">
              <div className="flex items-center justify-between mb-[4px]">
                <span className="text-[#9CA3AF] text-[12px]">Total Odds</span>
                <span className="text-[#00FF7F] text-[14px] font-bold">{totalOdds}</span>
              </div>
              <input
                type="number"
                placeholder="Stake (KES)"
                min="10"
                className="w-full bg-[#2A2B2E] text-[#E5E7EB] text-[13px] px-[10px] py-[8px] rounded-[6px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] mb-[8px]"
              />
              {!user ? (
                <Link
                  to="/login"
                  className="block w-full py-[10px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[14px] text-center hover:opacity-90 transition-opacity"
                >
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
