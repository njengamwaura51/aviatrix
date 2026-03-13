import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CASINO_GAMES = [
  { id: 1, name: 'Aviator', provider: 'Spribe', category: 'crash', badge: 'HOT', badgeColor: '#F55D5D', icon: '✈️', rtp: '97%' },
  { id: 2, name: 'JetX', provider: 'SmartSoft', category: 'crash', badge: 'NEW', badgeColor: '#00FF7F', icon: '🚀', rtp: '96.5%' },
  { id: 3, name: 'Mines', provider: 'Spribe', category: 'instant', badge: '', badgeColor: '', icon: '💣', rtp: '96%' },
  { id: 4, name: 'Dice', provider: 'Spribe', category: 'instant', badge: '', badgeColor: '', icon: '🎲', rtp: '98.6%' },
  { id: 5, name: 'Goal', provider: 'Spribe', category: 'instant', badge: '', badgeColor: '', icon: '⚽', rtp: '97%' },
  { id: 6, name: 'Hilo', provider: 'Spribe', category: 'instant', badge: '', badgeColor: '', icon: '🃏', rtp: '96%' },
  { id: 7, name: 'Plinko', provider: 'Spribe', category: 'instant', badge: 'HOT', badgeColor: '#FFCF92', icon: '🔵', rtp: '96%' },
  { id: 8, name: 'Mini Roulette', provider: 'Spribe', category: 'table', badge: '', badgeColor: '', icon: '🎡', rtp: '96.5%' },
  { id: 9, name: 'Book of Dead', provider: 'Play\'n GO', category: 'slots', badge: '', badgeColor: '', icon: '📖', rtp: '96.2%' },
  { id: 10, name: 'Gates of Olympus', provider: 'Pragmatic', category: 'slots', badge: 'HOT', badgeColor: '#C017B4', icon: '⚡', rtp: '96.5%' },
  { id: 11, name: 'Sweet Bonanza', provider: 'Pragmatic', category: 'slots', badge: '', badgeColor: '', icon: '🍬', rtp: '96.5%' },
  { id: 12, name: 'Big Bass Bonanza', provider: 'Pragmatic', category: 'slots', badge: '', badgeColor: '', icon: '🎣', rtp: '96.7%' },
  { id: 13, name: 'Wolf Gold', provider: 'Pragmatic', category: 'slots', badge: '', badgeColor: '', icon: '🐺', rtp: '96%' },
  { id: 14, name: 'Starburst', provider: 'NetEnt', category: 'slots', badge: '', badgeColor: '', icon: '⭐', rtp: '96.1%' },
  { id: 15, name: 'Blackjack', provider: 'Evolution', category: 'live', badge: 'LIVE', badgeColor: '#F55D5D', icon: '🃏', rtp: '99.5%' },
  { id: 16, name: 'Live Roulette', provider: 'Evolution', category: 'live', badge: 'LIVE', badgeColor: '#F55D5D', icon: '🎡', rtp: '97.3%' },
  { id: 17, name: 'Baccarat', provider: 'Evolution', category: 'live', badge: 'LIVE', badgeColor: '#F55D5D', icon: '👑', rtp: '98.9%' },
  { id: 18, name: 'Crazy Time', provider: 'Evolution', category: 'live', badge: 'LIVE', badgeColor: '#F55D5D', icon: '🎠', rtp: '95.5%' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Games', icon: '🎮' },
  { id: 'crash', label: 'Crash', icon: '✈️' },
  { id: 'instant', label: 'Instant', icon: '⚡' },
  { id: 'slots', label: 'Slots', icon: '🎰' },
  { id: 'live', label: 'Live Casino', icon: '🎥' },
  { id: 'table', label: 'Table', icon: '🃏' },
];

export default function CasinoPage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = CASINO_GAMES.filter((g) => {
    const matchCat = activeCategory === 'all' || g.category === activeCategory;
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.provider.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#11181C] min-h-full">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1B1C1D] to-[#252528] border-b border-[#2A2B2E] px-[8px] py-[16px]">
        <h1 className="text-[#E5E7EB] text-[22px] font-bold mb-[4px]">Casino</h1>
        <p className="text-[#9CA3AF] text-[13px]">
          Crash games, slots, live casino &amp; more
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-[4px] px-[8px] py-[8px] bg-[#1B1C1D] border-b border-[#2A2B2E] overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-[4px] whitespace-nowrap px-[10px] py-[6px] rounded-[6px] text-[12px] font-medium transition-colors ${
              activeCategory === cat.id ? 'bg-[#C017B4] text-white' : 'bg-[#2A2B2E] text-[#9CA3AF] hover:text-[#E5E7EB]'
            }`}
          >
            <span>{cat.icon}</span> {cat.label}
          </button>
        ))}
      </div>

      <div className="px-[8px] py-[8px]">
        {/* Search */}
        <div className="relative mb-[12px]">
          <svg className="absolute left-[10px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search games…"
            className="w-full max-w-[320px] bg-[#1B1C1D] text-[#E5E7EB] placeholder-[#4B5563] text-[13px] pl-[32px] pr-[12px] py-[8px] rounded-[8px] border border-[#2A2B2E] focus:outline-none focus:border-[#C017B4]"
          />
        </div>

        {/* Games grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[8px]">
          {filtered.map((game) => (
            <div
              key={game.id}
              className="relative bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] overflow-hidden hover:border-[#C017B4] transition-colors cursor-pointer group"
            >
              {game.badge && (
                <span
                  className="absolute top-[6px] left-[6px] px-[4px] py-[1px] rounded-full text-[9px] font-bold text-[#11181C] z-10"
                  style={{ background: game.badgeColor }}
                >
                  {game.badge}
                </span>
              )}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#252528] to-[#2A2B2E] flex items-center justify-center">
                <span className="text-[48px]">{game.icon}</span>
              </div>
              <div className="p-[8px]">
                <p className="text-[#E5E7EB] text-[12px] font-semibold truncate">{game.name}</p>
                <p className="text-[#6B7280] text-[10px]">{game.provider}</p>
                <p className="text-[#9CA3AF] text-[10px]">RTP {game.rtp}</p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#C017B4]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {!user ? (
                  <Link
                    to="/login"
                    className="px-[12px] py-[6px] rounded-[8px] bg-[#00FF7F] text-[#11181C] text-[12px] font-bold"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Login to Play
                  </Link>
                ) : (
                  <button className="px-[12px] py-[6px] rounded-[8px] bg-[#00FF7F] text-[#11181C] text-[12px] font-bold">
                    Play Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-[40px]">
            <div className="text-[40px] mb-[8px]">🎮</div>
            <p className="text-[#6B7280] text-[14px]">No games found</p>
          </div>
        )}
      </div>
    </div>
  );
}
