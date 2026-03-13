import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: '', dob: '' });
  const [saved, setSaved] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwSaved, setPwSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handlePwSave(e) {
    e.preventDefault();
    setPwSaved(true);
    setPwForm({ current: '', newPw: '', confirm: '' });
    setTimeout(() => setPwSaved(false), 3000);
  }

  return (
    <div className="p-[16px]">
      <h1 className="text-[#E5E7EB] text-[20px] font-bold mb-[4px]">Profile Settings</h1>
      <p className="text-[#9CA3AF] text-[13px] mb-[20px]">Manage your account details</p>

      <div className="max-w-[480px] flex flex-col gap-[20px]">
        {/* Avatar & basic info */}
        <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[16px]">
          <div className="flex items-center gap-[16px] mb-[16px]">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-[64px] h-[64px] rounded-full object-cover border-2 border-[#C017B4]"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <button className="absolute bottom-0 right-0 w-[20px] h-[20px] rounded-full bg-[#C017B4] flex items-center justify-center text-white text-[10px]">
                ✎
              </button>
            </div>
            <div>
              <p className="text-[#E5E7EB] text-[15px] font-bold">{user.phone}</p>
              <p className="text-[#9CA3AF] text-[12px]">{user.name}</p>
              <span className="inline-flex items-center gap-[4px] mt-[2px] px-[6px] py-[1px] rounded-full bg-[#16A34A]/20 text-[#00FF7F] text-[10px]">
                ✓ Verified
              </span>
            </div>
          </div>

          {saved && (
            <div className="mb-[12px] px-[12px] py-[8px] rounded-[8px] bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#00FF7F] text-[13px]">
              ✓ Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[4px]">
              <label className="text-[#9CA3AF] text-[12px] font-medium">Phone Number</label>
              <input
                type="text"
                value={user.phone}
                readOnly
                className="bg-[#252528] text-[#6B7280] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#2A2B2E] cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[#9CA3AF] text-[12px] font-medium">Display Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-[#2A2B2E] text-[#E5E7EB] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4]"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[#9CA3AF] text-[12px] font-medium">Email Address (optional)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="bg-[#2A2B2E] text-[#E5E7EB] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4]"
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[#9CA3AF] text-[12px] font-medium">Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className="bg-[#2A2B2E] text-[#E5E7EB] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-[10px] rounded-[8px] bg-[#C017B4] text-white font-bold text-[14px] hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Change password */}
        <div className="bg-[#1B1C1D] rounded-[12px] border border-[#2A2B2E] p-[16px]">
          <h3 className="text-[#E5E7EB] text-[14px] font-semibold mb-[12px]">Change Password</h3>
          {pwSaved && (
            <div className="mb-[12px] px-[12px] py-[8px] rounded-[8px] bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#00FF7F] text-[13px]">
              ✓ Password changed successfully!
            </div>
          )}
          <form onSubmit={handlePwSave} className="flex flex-col gap-[12px]">
            {[
              { label: 'Current Password', key: 'current' },
              { label: 'New Password', key: 'newPw' },
              { label: 'Confirm New Password', key: 'confirm' },
            ].map(({ label, key }) => (
              <div key={key} className="flex flex-col gap-[4px]">
                <label className="text-[#9CA3AF] text-[12px] font-medium">{label}</label>
                <input
                  type="password"
                  value={pwForm[key]}
                  onChange={(e) => setPwForm({ ...pwForm, [key]: e.target.value })}
                  required
                  className="bg-[#2A2B2E] text-[#E5E7EB] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4]"
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-[10px] rounded-[8px] bg-[#2A2B2E] text-[#E5E7EB] font-bold text-[14px] border border-[#4B5563] hover:border-[#C017B4] transition-colors"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Responsible gambling */}
        <div className="bg-[#1B1C1D] rounded-[12px] border border-[#CA8A04]/30 p-[16px]">
          <h3 className="text-[#FFCF92] text-[14px] font-semibold mb-[8px]">⚠️ Responsible Gambling</h3>
          <p className="text-[#9CA3AF] text-[12px] mb-[10px]">
            Set limits to keep your gambling in check.
          </p>
          <div className="flex flex-col gap-[8px]">
            {['Set Deposit Limit', 'Set Loss Limit', 'Take a Break', 'Self-Exclude'].map((action) => (
              <button
                key={action}
                className="w-full py-[8px] rounded-[6px] bg-[#2A2B2E] text-[#E5E7EB] text-[13px] font-medium border border-[#4B5563] hover:border-[#CA8A04] transition-colors text-left px-[12px]"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
