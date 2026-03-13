import './index.css';
import Header from './components/Header';
import AviatorSection from './components/AviatorSection';
import Footer from './components/Footer';

/**
 * Root component mirrors the source site DOM skeleton:
 * div#__next > div.flex.flex-col > div.flex > div.flex.w-screen
 */
export default function App() {
  return (
    // div#__next equivalent
    <div id="__next" className="min-h-screen bg-[#11181C] font-sans">
      {/* div.flex.flex-col */}
      <div className="flex flex-col min-h-screen">
        {/* div.flex */}
        <div className="flex flex-col flex-1">
          {/* div.flex.w-screen */}
          <div className="flex flex-col w-screen">

            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="flex-1">
              {/* Aviator section — react-p5-wrapper, 419px, block, stacked, 1 col, paddingY 0 */}
              <AviatorSection />

              {/* Spacer / additional betting area */}
              <section className="px-[8px] py-[8px] bg-[#11181C]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[8px]">
                  {/* Featured match cards */}
                  {[
                    {
                      league: 'Premier League',
                      home: 'Arsenal',
                      away: 'Chelsea',
                      time: 'Today 20:00',
                      odds: ['2.10', '3.40', '3.50'],
                    },
                    {
                      league: 'La Liga',
                      home: 'Barcelona',
                      away: 'Real Madrid',
                      time: 'Tomorrow 21:45',
                      odds: ['2.30', '3.10', '2.90'],
                    },
                    {
                      league: 'Serie A',
                      home: 'AC Milan',
                      away: 'Juventus',
                      time: 'Tomorrow 19:45',
                      odds: ['2.50', '3.20', '2.70'],
                    },
                  ].map((match, i) => (
                    <div
                      key={i}
                      className="bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] p-[8px] hover:border-[#C017B4] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-[4px]">
                        <span className="text-[#9CA3AF] text-[11px]">{match.league}</span>
                        <span className="text-[#FFCF92] text-[11px]">{match.time}</span>
                      </div>
                      <div className="flex items-center justify-between mb-[8px]">
                        <span className="text-[#E5E7EB] text-[13px] font-medium">{match.home}</span>
                        <span className="text-[#6B7280] text-[11px] mx-[4px]">vs</span>
                        <span className="text-[#E5E7EB] text-[13px] font-medium">{match.away}</span>
                      </div>
                      <div className="flex gap-[4px]">
                        {['1', 'X', '2'].map((label, j) => (
                          <button
                            key={label}
                            className="flex-1 flex flex-col items-center py-[4px] rounded-[6px] bg-[#2A2B2E] hover:bg-[#C017B4] transition-colors group"
                          >
                            <span className="text-[#6B7280] text-[10px] group-hover:text-white">{label}</span>
                            <span className="text-[#E5E7EB] text-[13px] font-semibold group-hover:text-white">
                              {match.odds[j]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
