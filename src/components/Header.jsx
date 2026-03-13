import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LOGO_URL = 'https://www.aspirebet.ke/_next/static/media/av_logo.809fbe43.svg';
const CALL_ICON =
  'https://www.aspirebet.ke/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcall_icon.555d4c2f.png&w=1080&q=75';
const WHATSAPP_ICON =
  'https://www.aspirebet.ke/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwhatsapp_logo.08182562.png&w=1080&q=75';
const HELP_ICON = 'https://www.aspirebet.ke/_next/static/media/question-gray.10476c54.svg';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Sports', path: '/sports' },
  { label: 'Live', path: '/live' },
  { label: 'Casino', path: '/casino' },
  { label: 'Aviator', path: '/aviator' },
  { label: 'Virtual', path: '/virtual' },
];

const SPORTS = ['All Sports', 'Football', 'Basketball', 'Tennis', 'Rugby', 'Cricket', 'Esports', 'Athletics'];

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSport, setActiveSport] = useState('All Sports');
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
    setProfileOpen(false);
  }

  return (
    <header className="w-full bg-[#11181C] border-b border-[#2A2B2E] sticky top-0 z-50">
      {/* Top support bar */}
      <div className="flex items-center justify-between px-[8px] py-[4px] bg-[#1B1C1D]">
        <div className="flex items-center gap-[8px]">
          <img src={CALL_ICON} alt="Call support" className="w-[20px] h-[20px]" onError={(e) => { e.target.style.display='none'; }} />
          <span className="text-[#9CA3AF] text-[12px]">0800 723 000</span>
          <img src={WHATSAPP_ICON} alt="WhatsApp" className="w-[20px] h-[20px] ml-[8px]" onError={(e) => { e.target.style.display='none'; }} />
          <span className="text-[#9CA3AF] text-[12px]">WhatsApp</span>
        </div>
        <div className="flex items-center gap-[8px]">
          <img src={HELP_ICON} alt="Help" className="w-[18px] h-[18px]" onError={(e) => { e.target.style.display='none'; }} />
          <a href="#" className="text-[#9CA3AF] text-[12px] hover:text-[#E5E7EB]">Help</a>
        </div>
      </div>

      {/* Main nav row */}
      <div className="flex items-center justify-between px-[8px] py-[8px]">
        <Link to="/" className="flex items-center gap-[4px]">
          <img src={LOGO_URL} alt="Aspirebet" className="h-[40px]" onError={(e) => { e.target.style.display='none'; }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-[3px]">
          {NAV_ITEMS.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className={`px-[8px] py-[4px] rounded-[6px] text-[13px] font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-[#C017B4] text-white'
                  : 'text-[#E5E7EB] hover:bg-[#2A2B2E]'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth / User actions */}
        <div className="flex items-center gap-[8px]">
          {user ? (
            <>
              {/* Balance */}
              <Link
                to="/account/wallet"
                className="hidden sm:flex items-center gap-[4px] px-[8px] py-[4px] rounded-[6px] bg-[#2A2B2E] border border-[#4B5563] hover:border-[#00FF7F] transition-colors"
              >
                <span className="text-[#9CA3AF] text-[11px]">KES</span>
                <span className="text-[#00FF7F] text-[13px] font-bold">
                  {user.balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </span>
              </Link>

              {/* Deposit button */}
              <Link
                to="/account/deposit"
                className="px-[8px] py-[4px] rounded-[6px] bg-[#00FF7F] text-[#11181C] text-[13px] font-semibold hover:opacity-90 transition-opacity"
              >
                + Deposit
              </Link>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-[4px] px-[6px] py-[4px] rounded-[6px] border border-[#2A2B2E] hover:border-[#4B5563] transition-colors"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-[24px] h-[24px] rounded-full object-cover"
                    onError={(e) => { e.target.style.display='none'; }}
                  />
                  <span className="text-[#E5E7EB] text-[12px] hidden sm:block">{user.phone}</span>
                  <svg className="w-[12px] h-[12px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-[4px] w-[200px] bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] shadow-xl z-50">
                    <div className="px-[12px] py-[10px] border-b border-[#2A2B2E]">
                      <p className="text-[#E5E7EB] text-[13px] font-semibold">{user.phone}</p>
                      <p className="text-[#9CA3AF] text-[11px]">{user.name}</p>
                    </div>
                    {[
                      { label: 'My Account', path: '/account' },
                      { label: 'Wallet', path: '/account/wallet' },
                      { label: 'Deposit', path: '/account/deposit' },
                      { label: 'Withdraw', path: '/account/withdraw' },
                      { label: 'Bet History', path: '/account/history' },
                      { label: 'Transactions', path: '/account/transactions' },
                    ].map(({ label, path }) => (
                      <Link
                        key={label}
                        to={path}
                        onClick={() => setProfileOpen(false)}
                        className="block px-[12px] py-[8px] text-[#9CA3AF] text-[13px] hover:bg-[#2A2B2E] hover:text-[#E5E7EB] transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                    <div className="border-t border-[#2A2B2E]">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-[12px] py-[8px] text-[#F55D5D] text-[13px] hover:bg-[#2A2B2E] transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-[8px] py-[4px] rounded-[6px] border border-[#C017B4] text-[#C017B4] text-[13px] font-medium hover:bg-[#C017B4] hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-[8px] py-[4px] rounded-[6px] bg-[#00FF7F] text-[#11181C] text-[13px] font-semibold hover:opacity-90 transition-opacity"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-[4px] rounded-[6px] text-[#9CA3AF] hover:bg-[#2A2B2E]"
          >
            <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1B1C1D] border-b border-[#2A2B2E] px-[8px] py-[8px]">
          {NAV_ITEMS.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`block px-[8px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors ${
                location.pathname === path ? 'bg-[#C017B4] text-white' : 'text-[#E5E7EB] hover:bg-[#2A2B2E]'
              }`}
            >
              {label}
            </Link>
          ))}
          {user && (
            <div className="mt-[8px] pt-[8px] border-t border-[#2A2B2E]">
              <div className="flex items-center justify-between px-[8px] py-[4px]">
                <span className="text-[#9CA3AF] text-[12px]">Balance</span>
                <span className="text-[#00FF7F] text-[13px] font-bold">KES {user.balance.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sports category tabs */}
      <div className="flex items-center gap-[2px] px-[8px] py-[4px] bg-[#1B1C1D] overflow-x-auto scrollbar-hide">
        {SPORTS.map((sport) => (
          <button
            key={sport}
            onClick={() => setActiveSport(sport)}
            className={`whitespace-nowrap px-[8px] py-[3px] rounded-[6px] text-[12px] font-medium transition-colors ${
              activeSport === sport
                ? 'bg-[#C017B4] text-white'
                : 'text-[#9CA3AF] hover:bg-[#2A2B2E] hover:text-[#E5E7EB]'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>
    </header>
  );
}
