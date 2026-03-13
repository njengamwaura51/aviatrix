import { useState } from 'react';
import { Link } from 'react-router-dom';

const LOGO_URL = 'https://www.aspirebet.ke/_next/static/media/av_logo.809fbe43.svg';

export default function RegisterPage() {
  const [form, setForm] = useState({ phone: '', username: '', password: '', confirm: '', referral: '' });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep(2);
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#11181C] flex flex-col items-center justify-center px-[8px]">
        <div className="w-full max-w-[380px] bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[24px] text-center">
          <div className="w-[64px] h-[64px] rounded-full bg-[#00FF7F]/10 border border-[#00FF7F]/30 flex items-center justify-center mx-auto mb-[16px]">
            <svg className="w-[32px] h-[32px] text-[#00FF7F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[#E5E7EB] text-[20px] font-bold mb-[8px]">Account Created!</h2>
          <p className="text-[#9CA3AF] text-[13px] mb-[20px]">
            Your Aspirebet account has been created successfully. You can now log in.
          </p>
          <Link
            to="/login"
            className="block w-full py-[12px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[15px] text-center hover:opacity-90 transition-opacity"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11181C] flex flex-col items-center justify-center px-[8px] py-[24px]">
      <a href="/" className="mb-[24px]">
        <img src={LOGO_URL} alt="Aspirebet" className="h-[48px]" />
      </a>

      <div className="w-full max-w-[380px] bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[24px]">
        <h1 className="text-[#E5E7EB] text-[20px] font-bold mb-[4px]">Create Account</h1>
        <p className="text-[#9CA3AF] text-[13px] mb-[20px]">Join Aspirebet and start winning today</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#9CA3AF] text-[12px] font-medium">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 0712345678"
              required
              className="bg-[#2A2B2E] text-[#E5E7EB] placeholder-[#4B5563] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-[4px]">
            <label className="text-[#9CA3AF] text-[12px] font-medium">Username</label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              className="bg-[#2A2B2E] text-[#E5E7EB] placeholder-[#4B5563] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-[4px]">
            <label className="text-[#9CA3AF] text-[12px] font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
              minLength={6}
              className="bg-[#2A2B2E] text-[#E5E7EB] placeholder-[#4B5563] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-[4px]">
            <label className="text-[#9CA3AF] text-[12px] font-medium">Confirm Password</label>
            <input
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Repeat your password"
              required
              className="bg-[#2A2B2E] text-[#E5E7EB] placeholder-[#4B5563] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-[4px]">
            <label className="text-[#9CA3AF] text-[12px] font-medium">Referral Code (optional)</label>
            <input
              name="referral"
              type="text"
              value={form.referral}
              onChange={handleChange}
              placeholder="Enter referral code"
              className="bg-[#2A2B2E] text-[#E5E7EB] placeholder-[#4B5563] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
            />
          </div>

          <label className="flex items-start gap-[8px] cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="mt-[2px] accent-[#C017B4]"
            />
            <span className="text-[#9CA3AF] text-[12px]">
              I agree to the{' '}
              <a href="#" className="text-[#C017B4] hover:underline">
                Terms &amp; Conditions
              </a>{' '}
              and confirm I am 18+ years old.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading || !agreed}
            className="w-full py-[12px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-[#9CA3AF] text-[13px] mt-[16px]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#C017B4] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>

      <p className="mt-[20px] text-[#6B7280] text-[11px] text-center">
        Must be 18+ to participate. Bet responsibly.
      </p>
    </div>
  );
}
