import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PAYMENT_METHODS = [
  { id: 'mpesa', label: 'M-PESA', icon: '📱', description: 'Instant deposit via M-PESA Paybill', min: 10, max: 150000 },
  { id: 'airtel', label: 'Airtel Money', icon: '📲', description: 'Deposit via Airtel Money', min: 10, max: 100000 },
  { id: 'card', label: 'Visa/Mastercard', icon: '💳', description: 'International card payments', min: 100, max: 500000 },
];

export default function DepositPage() {
  const { user, updateBalance } = useAuth();
  const [method, setMethod] = useState('mpesa');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [step, setStep] = useState(1); // 1: form, 2: confirm, 3: success
  const [loading, setLoading] = useState(false);

  const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];
  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === method);

  async function handleSubmit(e) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    updateBalance(parseFloat(amount));
    setLoading(false);
    setStep(3);
  }

  if (step === 3) {
    return (
      <div className="p-[16px] flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-[64px] h-[64px] rounded-full bg-[#00FF7F]/10 border border-[#00FF7F]/30 flex items-center justify-center mb-[16px]">
          <svg className="w-[32px] h-[32px] text-[#00FF7F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-[#E5E7EB] text-[20px] font-bold mb-[8px]">Deposit Successful!</h2>
        <p className="text-[#9CA3AF] text-[13px] text-center mb-[4px]">
          KES {parseFloat(amount).toLocaleString()} has been added to your account.
        </p>
        <p className="text-[#00FF7F] text-[18px] font-bold mb-[20px]">
          New Balance: KES {(user.balance).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
        </p>
        <button
          onClick={() => { setStep(1); setAmount(''); }}
          className="px-[24px] py-[10px] rounded-[8px] bg-[#2A2B2E] text-[#E5E7EB] text-[14px] font-medium border border-[#4B5563] hover:border-[#6B7280] transition-colors"
        >
          Make Another Deposit
        </button>
      </div>
    );
  }

  return (
    <div className="p-[16px]">
      <h1 className="text-[#E5E7EB] text-[20px] font-bold mb-[4px]">Deposit</h1>
      <p className="text-[#9CA3AF] text-[13px] mb-[20px]">Add funds to your account</p>

      <div className="max-w-[480px]">
        {/* Current balance */}
        <div className="bg-[#1B1C1D] rounded-[8px] border border-[#2A2B2E] px-[14px] py-[10px] mb-[16px] flex items-center justify-between">
          <span className="text-[#9CA3AF] text-[13px]">Current Balance</span>
          <span className="text-[#00FF7F] text-[16px] font-bold">
            KES {user.balance.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
            {/* Payment method */}
            <div>
              <label className="text-[#9CA3AF] text-[12px] font-medium block mb-[8px]">Payment Method</label>
              <div className="flex flex-col gap-[6px]">
                {PAYMENT_METHODS.map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] border cursor-pointer transition-colors ${
                      method === pm.id ? 'border-[#C017B4] bg-[#C017B4]/5' : 'border-[#2A2B2E] hover:border-[#4B5563]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={pm.id}
                      checked={method === pm.id}
                      onChange={() => setMethod(pm.id)}
                      className="accent-[#C017B4]"
                    />
                    <span className="text-[24px]">{pm.icon}</span>
                    <div>
                      <p className="text-[#E5E7EB] text-[13px] font-medium">{pm.label}</p>
                      <p className="text-[#9CA3AF] text-[11px]">{pm.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-[#9CA3AF] text-[12px] font-medium block mb-[8px]">
                Amount (KES {selectedMethod?.min.toLocaleString()} – {selectedMethod?.max.toLocaleString()})
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                min={selectedMethod?.min}
                max={selectedMethod?.max}
                className="w-full bg-[#2A2B2E] text-[#E5E7EB] text-[16px] font-bold px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
              />
              {/* Quick amounts */}
              <div className="flex flex-wrap gap-[4px] mt-[8px]">
                {QUICK_AMOUNTS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmount(v.toString())}
                    className={`px-[10px] py-[4px] rounded-[6px] text-[12px] font-medium transition-colors ${
                      amount === v.toString() ? 'bg-[#C017B4] text-white' : 'bg-[#2A2B2E] text-[#9CA3AF] hover:bg-[#4B5563] border border-[#4B5563]'
                    }`}
                  >
                    {v.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-[#9CA3AF] text-[12px] font-medium block mb-[8px]">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712345678"
                required
                className="w-full bg-[#2A2B2E] text-[#E5E7EB] text-[14px] px-[12px] py-[10px] rounded-[8px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={!amount || parseFloat(amount) < (selectedMethod?.min || 10)}
              className="w-full py-[12px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[15px] hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Continue
            </button>
          </form>
        ) : (
          /* Confirmation step */
          <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
            <div className="bg-[#2A2B2E] rounded-[8px] p-[16px]">
              <h3 className="text-[#E5E7EB] text-[14px] font-semibold mb-[12px]">Confirm Deposit</h3>
              {[
                ['Method', selectedMethod?.label],
                ['Amount', `KES ${parseFloat(amount).toLocaleString()}`],
                ['Phone', phone],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-[6px] border-b border-[#4B5563] last:border-0">
                  <span className="text-[#9CA3AF] text-[13px]">{k}</span>
                  <span className="text-[#E5E7EB] text-[13px] font-medium">{v}</span>
                </div>
              ))}
            </div>

            {method === 'mpesa' && (
              <div className="bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-[8px] p-[12px]">
                <p className="text-[#00FF7F] text-[12px] font-medium mb-[4px]">M-PESA Instructions</p>
                <p className="text-[#9CA3AF] text-[11px]">An M-PESA STK push will be sent to <strong className="text-[#E5E7EB]">{phone}</strong>. Enter your M-PESA PIN to complete.</p>
              </div>
            )}

            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-[12px] rounded-[8px] bg-[#2A2B2E] text-[#E5E7EB] font-medium text-[14px] border border-[#4B5563] hover:border-[#6B7280]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-[12px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[14px] hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Processing…' : 'Confirm Deposit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
