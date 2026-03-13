const LOGO_URL = 'https://www.aspirebet.ke/_next/static/media/av_logo.809fbe43.svg';
const CALL_ICON =
  'https://www.aspirebet.ke/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcall_icon.555d4c2f.png&w=1080&q=75';
const WHATSAPP_ICON =
  'https://www.aspirebet.ke/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwhatsapp_logo.08182562.png&w=1080&q=75';
const HELP_ICON = 'https://www.aspirebet.ke/_next/static/media/question-gray.10476c54.svg';

export default function Header() {
  return (
    <header className="w-full bg-[#11181C] border-b border-[#2A2B2E]">
      {/* Top support bar */}
      <div className="flex items-center justify-between px-[8px] py-[4px] bg-[#1B1C1D]">
        <div className="flex items-center gap-[8px]">
          <img src={CALL_ICON} alt="Call support" className="w-[20px] h-[20px]" />
          <span className="text-[#9CA3AF] text-[12px]">0800 723 000</span>
          <img src={WHATSAPP_ICON} alt="WhatsApp" className="w-[20px] h-[20px] ml-[8px]" />
          <span className="text-[#9CA3AF] text-[12px]">WhatsApp</span>
        </div>
        <div className="flex items-center gap-[8px]">
          <img src={HELP_ICON} alt="Help" className="w-[18px] h-[18px]" />
          <span className="text-[#9CA3AF] text-[12px]">Help</span>
        </div>
      </div>

      {/* Main nav row */}
      <div className="flex items-center justify-between px-[8px] py-[8px]">
        <a href="/" className="flex items-center gap-[4px]">
          <img src={LOGO_URL} alt="Aspirebet" className="h-[40px]" />
        </a>

        <nav className="hidden md:flex items-center gap-[3px]">
          {['Home', 'Sports', 'Live', 'Casino', 'Aviator', 'Virtual'].map((item) => (
            <a
              key={item}
              href="#"
              className="px-[8px] py-[4px] rounded-[6px] text-[#E5E7EB] text-[13px] font-medium hover:bg-[#2A2B2E] transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[8px]">
          <button className="px-[8px] py-[4px] rounded-[6px] border border-[#C017B4] text-[#C017B4] text-[13px] font-medium hover:bg-[#C017B4] hover:text-white transition-colors">
            Login
          </button>
          <button className="px-[8px] py-[4px] rounded-[6px] bg-[#00FF7F] text-[#11181C] text-[13px] font-semibold hover:opacity-90 transition-opacity">
            Register
          </button>
        </div>
      </div>

      {/* Sports category tabs */}
      <div className="flex items-center gap-[2px] px-[8px] py-[4px] bg-[#1B1C1D] overflow-x-auto">
        {['All Sports', 'Football', 'Basketball', 'Tennis', 'Rugby', 'Cricket', 'Esports', 'Athletics'].map(
          (sport, i) => (
            <button
              key={sport}
              className={`whitespace-nowrap px-[8px] py-[3px] rounded-[6px] text-[12px] font-medium transition-colors ${
                i === 0
                  ? 'bg-[#C017B4] text-white'
                  : 'text-[#9CA3AF] hover:bg-[#2A2B2E] hover:text-[#E5E7EB]'
              }`}
            >
              {sport}
            </button>
          )
        )}
      </div>
    </header>
  );
}
