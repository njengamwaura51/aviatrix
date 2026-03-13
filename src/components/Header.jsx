import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
    setProfileOpen(false);
  }

  return (
    <header className="w-full bg-[#0c0c1a] border-b border-[#1e1e2a] sticky top-0 z-50 flex-shrink-0">
      <div className="flex items-center justify-between px-[14px] py-[10px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-[8px]">
          <span className="text-[24px]">✈️</span>
          <span
            className="font-black text-[20px] tracking-tight"
            style={{ color: '#E91E63', textShadow: '0 0 12px rgba(233,30,99,0.5)' }}
          >
            AVIATRIX
          </span>
          <span className="hidden sm:inline text-[11px] text-[#555] font-medium uppercase tracking-widest mt-[2px]">
            Casino
          </span>
        </Link>

        {/* Live indicator */}
        <div className="hidden md:flex items-center gap-[6px] px-[10px] py-[4px] rounded-full bg-[#141422] border border-[#1e1e2a]">
          <span className="w-[7px] h-[7px] rounded-full bg-[#4ADE80] animate-pulse" />
          <span className="text-[#4ADE80] text-[11px] font-semibold">LIVE</span>
          <span className="text-[#666] text-[11px]">Aviator Crash</span>
        </div>

        {/* Auth / user actions */}
        <div className="flex items-center gap-[8px]">
          {user ? (
            <>
              <Link
                to="/account/wallet"
                className="hidden sm:flex items-center gap-[5px] px-[10px] py-[5px] rounded-[6px] bg-[#141422] border border-[#1e1e2a] hover:border-[#E91E63]/40 transition-colors"
              >
                <span className="text-[#888] text-[11px]">KES</span>
                <span className="text-[#4ADE80] text-[13px] font-bold">
                  {user.balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </span>
              </Link>

              <Link
                to="/account/deposit"
                className="px-[10px] py-[5px] rounded-[6px] text-white text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: '#28A745' }}
              >
                + Deposit
              </Link>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-[5px] px-[8px] py-[5px] rounded-[6px] border border-[#1e1e2a] hover:border-[#333] transition-colors"
                >
                  <span className="text-[#C0C0D0] text-[12px] hidden sm:block">{user.phone}</span>
                  <svg className="w-[12px] h-[12px] text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-[6px] w-[200px] bg-[#141422] rounded-[8px] border border-[#1e1e2a] shadow-2xl z-50">
                    <div className="px-[12px] py-[10px] border-b border-[#1e1e2a]">
                      <p className="text-[#E5E7EB] text-[13px] font-semibold">{user.phone}</p>
                      <p className="text-[#666] text-[11px]">{user.name}</p>
                    </div>
                    {[
                      { label: 'My Account', path: '/account' },
                      { label: 'Wallet', path: '/account/wallet' },
                      { label: 'Deposit', path: '/account/deposit' },
                      { label: 'Withdraw', path: '/account/withdraw' },
                      { label: 'Bet History', path: '/account/history' },
                    ].map(({ label, path }) => (
                      <Link
                        key={label}
                        to={path}
                        onClick={() => setProfileOpen(false)}
                        className="block px-[12px] py-[8px] text-[#9CA3AF] text-[13px] hover:bg-[#1e1e2a] hover:text-[#E5E7EB] transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                    <div className="border-t border-[#1e1e2a]">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-[12px] py-[8px] text-[#FF6090] text-[13px] hover:bg-[#1e1e2a] transition-colors"
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
                className="px-[10px] py-[5px] rounded-[6px] border border-[#E91E63]/60 text-[#E91E63] text-[13px] font-medium hover:bg-[#E91E63]/10 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-[10px] py-[5px] rounded-[6px] text-white text-[13px] font-semibold hover:opacity-90 transition-opacity"
                style={{ background: '#28A745' }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
