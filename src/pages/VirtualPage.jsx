const VIRTUAL_GAMES = [
  { id: 1, name: 'Virtual Football', icon: '⚽', description: 'AI-powered 90-second virtual football matches', status: 'active', players: '1,247' },
  { id: 2, name: 'Virtual Basketball', icon: '🏀', description: 'Fast-paced virtual NBA-style basketball', status: 'active', players: '843' },
  { id: 3, name: 'Virtual Horse Racing', icon: '🐎', description: 'Race against 8 virtual horses', status: 'active', players: '632' },
  { id: 4, name: 'Virtual Tennis', icon: '🎾', description: 'Simulate Grand Slam virtual tennis', status: 'active', players: '412' },
  { id: 5, name: 'Keno', icon: '🎱', description: 'Pick numbers in virtual Keno draws', status: 'active', players: '1,089' },
  { id: 6, name: 'Virtual Greyhounds', icon: '🐕', description: 'High-speed virtual greyhound racing', status: 'active', players: '294' },
];

export default function VirtualPage() {
  return (
    <div className="bg-[#11181C] min-h-full">
      <div className="bg-gradient-to-r from-[#1B1C1D] to-[#252528] border-b border-[#2A2B2E] px-[8px] py-[16px]">
        <h1 className="text-[#E5E7EB] text-[22px] font-bold mb-[4px]">Virtual Sports</h1>
        <p className="text-[#9CA3AF] text-[13px]">AI-powered virtual sports with fast results every 3 minutes</p>
      </div>

      <div className="p-[8px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[8px]">
        {VIRTUAL_GAMES.map((game) => (
          <div
            key={game.id}
            className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[16px] hover:border-[#C017B4] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-[12px] mb-[10px]">
              <span className="text-[40px]">{game.icon}</span>
              <div>
                <h3 className="text-[#E5E7EB] text-[15px] font-bold">{game.name}</h3>
                <div className="flex items-center gap-[4px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#00FF7F]" />
                  <span className="text-[#00FF7F] text-[11px]">{game.players} playing</span>
                </div>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-[12px] mb-[12px]">{game.description}</p>
            <button className="w-full py-[8px] rounded-[8px] bg-[#C017B4]/0 border border-[#C017B4] text-[#C017B4] text-[13px] font-semibold group-hover:bg-[#C017B4] group-hover:text-white transition-colors">
              Play Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
