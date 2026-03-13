const AVATARS = [
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar45.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar8.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar69.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar17.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar22.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar62.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar38.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar29.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar13.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar19.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar32.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar57.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar26.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar50.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar51.png&w=1080&q=75',
  'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar35.png&w=1080&q=75',
];

const SAMPLE_BETS = [
  { user: 'User***45', amount: 'KES 500', multiplier: '2.50x', win: 'KES 1,250', avatar: AVATARS[0] },
  { user: 'Player***8', amount: 'KES 200', multiplier: '5.00x', win: 'KES 1,000', avatar: AVATARS[1] },
  { user: 'Punter***69', amount: 'KES 1,000', multiplier: '1.80x', win: 'KES 1,800', avatar: AVATARS[2] },
  { user: 'Gamer***17', amount: 'KES 300', multiplier: '10.00x', win: 'KES 3,000', avatar: AVATARS[3] },
  { user: 'High***22', amount: 'KES 750', multiplier: '3.20x', win: 'KES 2,400', avatar: AVATARS[4] },
];

// Pre-computed star positions to keep render pure
const STARS = [
  { w: 2.4, h: 1.8, top: 12, left: 5 },
  { w: 1.2, h: 2.1, top: 34, left: 18 },
  { w: 3.1, h: 1.5, top: 58, left: 28 },
  { w: 1.8, h: 2.7, top: 7, left: 42 },
  { w: 2.0, h: 1.2, top: 76, left: 55 },
  { w: 1.5, h: 3.0, top: 22, left: 63 },
  { w: 2.8, h: 1.9, top: 45, left: 72 },
  { w: 1.1, h: 2.4, top: 88, left: 80 },
  { w: 3.0, h: 1.3, top: 15, left: 88 },
  { w: 1.7, h: 2.0, top: 65, left: 95 },
  { w: 2.2, h: 1.6, top: 30, left: 33 },
  { w: 1.4, h: 2.9, top: 50, left: 10 },
  { w: 2.9, h: 1.1, top: 70, left: 47 },
  { w: 1.6, h: 2.3, top: 5, left: 70 },
  { w: 2.5, h: 1.7, top: 80, left: 20 },
  { w: 1.3, h: 2.6, top: 40, left: 85 },
  { w: 2.7, h: 1.4, top: 93, left: 60 },
  { w: 1.9, h: 2.2, top: 18, left: 52 },
  { w: 3.2, h: 1.0, top: 60, left: 38 },
  { w: 1.0, h: 2.8, top: 25, left: 77 },
  { w: 2.3, h: 1.5, top: 85, left: 12 },
  { w: 1.5, h: 2.0, top: 10, left: 25 },
  { w: 2.6, h: 1.8, top: 55, left: 90 },
  { w: 1.2, h: 3.0, top: 38, left: 65 },
  { w: 2.0, h: 1.3, top: 72, left: 30 },
  { w: 3.0, h: 2.0, top: 48, left: 50 },
  { w: 1.8, h: 1.6, top: 20, left: 95 },
  { w: 2.4, h: 2.5, top: 90, left: 44 },
  { w: 1.6, h: 1.9, top: 3, left: 15 },
  { w: 2.1, h: 2.2, top: 68, left: 8 },
];

/**
 * AviatorSection — mirrors the 419px react-p5-wrapper section on the source site.
 * It renders as a block-display single-column stacked layout with paddingY of 0.
 */
export default function AviatorSection() {
  return (
    <div
      className="react-p5-wrapper block"
      style={{ minHeight: '419px', paddingTop: '0px', paddingBottom: '0px' }}
    >
      {/* Aviator game frame */}
      <div className="flex flex-col w-full h-full bg-[#11181C]">
        {/* Game area header */}
        <div className="flex items-center justify-between px-[8px] py-[4px] bg-[#1B1C1D] border-b border-[#2A2B2E]">
          <div className="flex items-center gap-[8px]">
            <span className="text-[#C017B4] font-bold text-[14px] tracking-wide uppercase">
              ✈ Aviator
            </span>
            <span className="text-[#9CA3AF] text-[11px]">Spribe</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span className="w-[8px] h-[8px] rounded-full bg-[#00FF7F] inline-block" />
            <span className="text-[#9CA3AF] text-[11px]">Live</span>
          </div>
        </div>

        {/* Main content: game canvas + bets sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Simulated game canvas */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-[#1B1C1D] to-[#11181C] relative overflow-hidden">
            {/* Starfield dots */}
            {STARS.map((star, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white opacity-40"
                style={{
                  width: `${star.w}px`,
                  height: `${star.h}px`,
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                }}
              />
            ))}

            {/* Multiplier display */}
            <div className="flex flex-col items-center gap-[8px]">
              <span className="text-[#C017B4] text-[64px] font-bold leading-none drop-shadow-lg">
                2.57<span className="text-[40px]">x</span>
              </span>
              <span className="text-[#9CA3AF] text-[13px]">Flying away…</span>
            </div>

            {/* Airplane icon */}
            <div
              className="absolute text-[40px]"
              style={{ bottom: '60px', right: '120px', transform: 'rotate(-20deg)' }}
            >
              ✈️
            </div>

            {/* Trajectory line */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 250"
              preserveAspectRatio="none"
            >
              <polyline
                points="0,250 80,220 160,180 240,120 320,60 400,10"
                fill="none"
                stroke="#C017B4"
                strokeWidth="2"
                strokeDasharray="4 2"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Bets sidebar */}
          <div className="w-[180px] bg-[#1B1C1D] border-l border-[#2A2B2E] flex flex-col overflow-hidden hidden sm:flex">
            <div className="px-[8px] py-[4px] border-b border-[#2A2B2E]">
              <span className="text-[#9CA3AF] text-[11px] font-medium uppercase tracking-wide">
                Live Bets
              </span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {SAMPLE_BETS.map((bet, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[4px] px-[8px] py-[4px] border-b border-[#2A2B2E] hover:bg-[#2A2B2E]"
                >
                  <img
                    src={bet.avatar}
                    alt={bet.user}
                    className="w-[24px] h-[24px] rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[#E5E7EB] text-[11px] truncate">{bet.user}</span>
                    <span className="text-[#9CA3AF] text-[10px]">{bet.amount}</span>
                  </div>
                  <div className="ml-auto flex flex-col items-end">
                    <span className="text-[#00FF7F] text-[11px] font-semibold">{bet.multiplier}</span>
                    <span className="text-[#FFCF92] text-[10px]">{bet.win}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bet controls */}
        <div className="flex items-center gap-[8px] px-[8px] py-[8px] bg-[#1B1C1D] border-t border-[#2A2B2E]">
          <div className="flex-1 flex items-center gap-[4px]">
            <input
              type="number"
              placeholder="Bet amount"
              className="flex-1 bg-[#2A2B2E] text-[#E5E7EB] text-[13px] px-[8px] py-[4px] rounded-[6px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4]"
            />
            <div className="flex gap-[2px]">
              {['10', '50', '100', '500'].map((v) => (
                <button
                  key={v}
                  className="px-[4px] py-[2px] rounded-[6px] bg-[#2A2B2E] text-[#9CA3AF] text-[11px] hover:bg-[#4B5563] transition-colors"
                >
                  +{v}
                </button>
              ))}
            </div>
          </div>
          <button className="px-[40px] py-[8px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[14px] hover:opacity-90 transition-opacity whitespace-nowrap">
            Place Bet
          </button>
        </div>
      </div>
    </div>
  );
}
