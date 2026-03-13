import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LOGO_URL = 'https://www.aspirebet.ke/_next/static/media/av_logo.809fbe43.svg';

export default function LoginPage() {
  const { login, loginError } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(username, password);
    setLoading(false);
    if (ok) navigate('/');
  }

  return (
    <div className="min-h-screen bg-[#11181C] flex flex-col items-center justify-center px-[8px]">
      {/* Logo */}
      <a href="/" className="mb-[24px]">
        <img src={LOGO_URL} alt="Aspirebet" className="h-[48px]" />
      </a>

      {/* Card */}
      <div className="w-full max-w-[380px] bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[24px]">
        <h1 className="text-[#E5E7EB] text-[20px] font-bold mb-[4px]">Welcome back</h1>
        <p className="text-[#9CA3AF] text-[13px] mb-[20px]">Sign in to your Aspirebet account</p>

        {loginError && (
          <div className="mb-[12px] px-[12px] py-[8px] rounded-[8px] bg-[#F55D5D]/10 border border-[#F55D5D]/30 text-[#F55D5D] text-[13px]">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
          {/* Phone / Username */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#9CA3AF] text-[12px] font-medium">Phone Number / Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. 799920245"
              required
              className="bg-[#2A2B2E] text-[#E5E7EB] placeholder-[#4B5563] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#9CA3AF] text-[12px] font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-[#2A2B2E] text-[#E5E7EB] placeholder-[#4B5563] text-[14px] px-[12px] py-[10px] pr-[40px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#9CA3AF]"
              >
                {showPassword ? (
                  <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a href="#" className="text-[#C017B4] text-[12px] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-[12px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-[8px]">
                <svg className="animate-spin w-[16px] h-[16px]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Signing in…
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-[8px] my-[16px]">
          <div className="flex-1 h-[1px] bg-[#2A2B2E]" />
          <span className="text-[#4B5563] text-[12px]">OR</span>
          <div className="flex-1 h-[1px] bg-[#2A2B2E]" />
        </div>

        {/* Register CTA */}
        <p className="text-center text-[#9CA3AF] text-[13px]">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-[#00FF7F] font-semibold hover:underline">
            Register
          </Link>
        </p>

        {/* Demo hint */}
        <div className="mt-[16px] px-[12px] py-[10px] rounded-[8px] bg-[#2A2B2E] border border-[#4B5563]">
          <p className="text-[#9CA3AF] text-[11px] font-medium mb-[4px]">Demo credentials</p>
          <p className="text-[#E5E7EB] text-[12px]">Username: <span className="text-[#00FF7F]">799920245</span></p>
          <p className="text-[#E5E7EB] text-[12px]">Password: <span className="text-[#00FF7F]">117402</span></p>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-[20px] text-[#6B7280] text-[11px] text-center">
        Must be 18+ to participate. Bet responsibly.
      </p>
    </div>
  );
}
