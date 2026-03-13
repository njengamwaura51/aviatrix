import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const USERNAMES = [
  'User***45','Player***8','Punter***69','Gamer***17','High***22',
  'Lucky***62','Ace***38','Pro***29','Star***13','Champion***19',
  'Maverick***32','Falcon***57','Eagle***26','Storm***50','Blaze***51',
];

function generateBet(idx) {
  const amounts = [50, 100, 200, 300, 500, 750, 1000, 1500, 2000];
  const amount = amounts[idx % amounts.length];
  const multiplier = (1.2 + Math.sin(idx * 1.618) * 8 + Math.abs(Math.cos(idx * 0.5)) * 5).toFixed(2);
  return {
    id: idx,
    user: USERNAMES[idx % USERNAMES.length],
    amount,
    multiplier: parseFloat(multiplier),
    win: Math.round(amount * parseFloat(multiplier)),
    avatar: AVATARS[idx % AVATARS.length],
    cashedOut: parseFloat(multiplier) > 2,
  };
}

const INITIAL_BETS = Array.from({ length: 15 }, (_, i) => generateBet(i));

const STARS = Array.from({ length: 40 }, (_, i) => ({
  w: 1 + (i * 0.17) % 2.5,
  h: 1 + (i * 0.23) % 2.5,
  top: (i * 13.7) % 100,
  left: (i * 17.3) % 100,
  opacity: 0.2 + (i * 0.07) % 0.5,
}));

const HISTORY = [1.24, 5.62, 1.03, 2.47, 10.00, 1.18, 3.31, 47.82, 1.56, 8.09, 1.02, 2.19, 15.43, 1.07];

function MultiplierHistory({ history }) {
  return (
    <div className="flex items-center gap-[4px] px-[8px] py-[4px] bg-[#11181C] overflow-x-auto scrollbar-hide">
      {history.map((m, i) => (
        <span
          key={i}
          className={`flex-shrink-0 px-[6px] py-[2px] rounded-full text-[10px] font-bold ${
            m >= 10 ? 'bg-[#CA8A04]/20 text-[#FFCF92]' :
            m >= 2 ? 'bg-[#16A34A]/20 text-[#00FF7F]' :
            'bg-[#2A2B2E] text-[#9CA3AF]'
          }`}
        >
          {m.toFixed(2)}x
        </span>
      ))}
    </div>
  );
}

export default function AviatorPage() {
  const { user } = useAuth();
  const [phase, setPhase] = useState('waiting'); // waiting | flying | crashed
  const [multiplier, setMultiplier] = useState(1.00);
  const [bets, setBets] = useState(INITIAL_BETS);
  const [betAmount1, setBetAmount1] = useState('100');
  const [betAmount2, setBetAmount2] = useState('50');
  const [placed1, setPlaced1] = useState(false);
  const [placed2, setPlaced2] = useState(false);
  const [cashedOut1, setCashedOut1] = useState(null);
  const [cashedOut2, setCashedOut2] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [history, setHistory] = useState(HISTORY);
  const [activeTab, setActiveTab] = useState('all'); // all | mine | top
  const timerRef = useRef(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    startWaiting();
    return () => clearTimeout(timerRef.current);
  }, []);

  function startWaiting() {
    setPhase('waiting');
    setMultiplier(1.00);
    setCashedOut1(null);
    setCashedOut2(null);
    setPlaced1(false);
    setPlaced2(false);
    let c = 5;
    setCountdown(c);
    const tick = () => {
      c -= 1;
      setCountdown(c);
      if (c <= 0) {
        startFlying();
      } else {
        timerRef.current = setTimeout(tick, 1000);
      }
    };
    timerRef.current = setTimeout(tick, 1000);
  }

  function startFlying() {
    setPhase('flying');
    let m = 1.00;
    const crashAt = 1.0 + Math.random() * 15;
    const interval = setInterval(() => {
      m = parseFloat((m * 1.03).toFixed(2));
      setMultiplier(m);
      if (m >= crashAt) {
        clearInterval(interval);
        setPhase('crashed');
        setHistory((prev) => [m, ...prev.slice(0, 13)]);
        timerRef.current = setTimeout(startWaiting, 3000);
      }
    }, 100);
  }

  function cashOut(slot) {
    if (phaseRef.current !== 'flying') return;
    if (slot === 1 && placed1 && !cashedOut1) {
      setCashedOut1(multiplier);
    }
    if (slot === 2 && placed2 && !cashedOut2) {
      setCashedOut2(multiplier);
    }
  }

  function placeBet(slot) {
    if (phase !== 'waiting') return;
    if (slot === 1) setPlaced1(true);
    if (slot === 2) setPlaced2(true);
  }

  return (
    <div className="flex flex-col bg-[#11181C] min-h-full">
      {/* History bar */}
      <MultiplierHistory history={history} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: bets panel */}
        <div className="hidden lg:flex w-[220px] flex-shrink-0 flex-col bg-[#1B1C1D] border-r border-[#2A2B2E]">
          {/* Tabs */}
          <div className="flex border-b border-[#2A2B2E]">
            {['all', 'mine', 'top'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`flex-1 py-[8px] text-[11px] font-medium capitalize transition-colors ${
                  activeTab === t ? 'text-[#E5E7EB] border-b-2 border-[#C017B4]' : 'text-[#6B7280] hover:text-[#9CA3AF]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto">
            {bets.map((bet) => (
              <div key={bet.id} className="flex items-center gap-[4px] px-[8px] py-[4px] border-b border-[#2A2B2E] hover:bg-[#2A2B2E]">
                <img
                  src={bet.avatar}
                  alt=""
                  className="w-[24px] h-[24px] rounded-full object-cover flex-shrink-0"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[#E5E7EB] text-[10px] truncate">{bet.user}</span>
                  <span className="text-[#9CA3AF] text-[10px]">KES {bet.amount.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold ${bet.cashedOut ? 'text-[#00FF7F]' : 'text-[#F55D5D]'}`}>
                    {bet.multiplier.toFixed(2)}x
                  </span>
                  {bet.cashedOut && (
                    <span className="text-[#FFCF92] text-[10px]">KES {bet.win.toLocaleString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: game canvas */}
        <div className="flex-1 flex flex-col">
          <div
            className="relative flex-1 bg-gradient-to-b from-[#0d0f11] via-[#1B1C1D] to-[#11181C] overflow-hidden"
            style={{ minHeight: '320px' }}
          >
            {/* Stars */}
            {STARS.map((s, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{ width: `${s.w}px`, height: `${s.h}px`, top: `${s.top}%`, left: `${s.left}%`, opacity: s.opacity }}
              />
            ))}

            {/* Multiplier display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[8px]">
              {phase === 'waiting' && (
                <div className="text-center">
                  <p className="text-[#9CA3AF] text-[14px] mb-[8px]">Next round starting in</p>
                  <span className="text-[#FFCF92] text-[64px] font-bold leading-none">{countdown}</span>
                </div>
              )}
              {phase === 'flying' && (
                <div className="text-center">
                  <span
                    className="font-bold leading-none"
                    style={{
                      fontSize: '72px',
                      color: multiplier >= 10 ? '#FFCF92' : multiplier >= 3 ? '#00FF7F' : '#C017B4',
                      textShadow: `0 0 30px ${multiplier >= 10 ? '#CA8A04' : multiplier >= 3 ? '#00FF7F' : '#C017B4'}`,
                    }}
                  >
                    {multiplier.toFixed(2)}<span style={{ fontSize: '48px' }}>x</span>
                  </span>
                  <p className="text-[#9CA3AF] text-[13px] mt-[4px]">Flying away…</p>
                </div>
              )}
              {phase === 'crashed' && (
                <div className="text-center">
                  <span className="text-[#F55D5D] text-[64px] font-bold leading-none drop-shadow-lg">
                    {multiplier.toFixed(2)}<span className="text-[40px]">x</span>
                  </span>
                  <p className="text-[#F55D5D] text-[16px] font-bold mt-[4px]">FLEW AWAY!</p>
                </div>
              )}
            </div>

            {/* Airplane */}
            {phase === 'flying' && (
              <div
                className="absolute text-[48px] transition-all duration-100"
                style={{
                  bottom: `${Math.min(10 + multiplier * 5, 75)}%`,
                  right: `${Math.max(5, 30 - multiplier * 1.5)}%`,
                  transform: 'rotate(-20deg)',
                }}
              >
                ✈️
              </div>
            )}

            {/* Trajectory */}
            {phase === 'flying' && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 300" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trajGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C017B4" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#C017B4" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <polyline
                  points="0,300 100,270 200,220 300,140 400,60 500,10"
                  fill="none"
                  stroke="#C017B4"
                  strokeWidth="2"
                  opacity="0.7"
                />
              </svg>
            )}
          </div>

          {/* Bet controls */}
          <div className="bg-[#1B1C1D] border-t border-[#2A2B2E] p-[8px]">
            <div className="flex gap-[8px]">
              {/* Bet panel 1 */}
              <BetPanel
                slot={1}
                amount={betAmount1}
                setAmount={setBetAmount1}
                placed={placed1}
                cashedOut={cashedOut1}
                phase={phase}
                onPlace={() => placeBet(1)}
                onCashOut={() => cashOut(1)}
                user={user}
              />
              {/* Bet panel 2 */}
              <BetPanel
                slot={2}
                amount={betAmount2}
                setAmount={setBetAmount2}
                placed={placed2}
                cashedOut={cashedOut2}
                phase={phase}
                onPlace={() => placeBet(2)}
                onCashOut={() => cashOut(2)}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BetPanel({ slot, amount, setAmount, placed, cashedOut, phase, onPlace, onCashOut, user }) {
  const quickAmounts = [10, 50, 100, 500];

  return (
    <div className="flex-1 bg-[#2A2B2E] rounded-[8px] p-[8px]">
      {/* Amount input */}
      <div className="flex items-center gap-[4px] mb-[4px]">
        <button onClick={() => setAmount(Math.max(10, parseFloat(amount) - 10).toString())} className="w-[24px] h-[24px] rounded-[4px] bg-[#4B5563] text-[#E5E7EB] text-[16px] leading-none flex items-center justify-center hover:bg-[#6B7280]">−</button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 bg-[#11181C] text-[#E5E7EB] text-[14px] font-bold text-center px-[4px] py-[4px] rounded-[4px] border border-[#4B5563] focus:outline-none focus:border-[#C017B4] min-w-0"
        />
        <button onClick={() => setAmount((parseFloat(amount) + 10).toString())} className="w-[24px] h-[24px] rounded-[4px] bg-[#4B5563] text-[#E5E7EB] text-[16px] leading-none flex items-center justify-center hover:bg-[#6B7280]">+</button>
      </div>

      {/* Quick amounts */}
      <div className="flex gap-[2px] mb-[6px]">
        {quickAmounts.map((v) => (
          <button
            key={v}
            onClick={() => setAmount(v.toString())}
            className="flex-1 py-[2px] rounded-[4px] bg-[#11181C] text-[#9CA3AF] text-[10px] hover:bg-[#4B5563] transition-colors"
          >
            {v}
          </button>
        ))}
      </div>

      {/* Action button */}
      {!user ? (
        <Link
          to="/login"
          className="block w-full py-[8px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[13px] text-center hover:opacity-90 transition-opacity"
        >
          Login to Play
        </Link>
      ) : cashedOut ? (
        <div className="w-full py-[8px] rounded-[8px] bg-[#16A34A]/20 border border-[#16A34A] text-[#00FF7F] font-bold text-[13px] text-center">
          Cashed out at {cashedOut.toFixed(2)}x
        </div>
      ) : placed && phase === 'flying' ? (
        <button
          onClick={onCashOut}
          className="w-full py-[8px] rounded-[8px] bg-[#FFCF92] text-[#11181C] font-bold text-[13px] hover:opacity-90 transition-opacity animate-pulse"
        >
          Cash Out (KES {Math.round(parseFloat(amount) * 1).toLocaleString()})
        </button>
      ) : placed && phase === 'waiting' ? (
        <div className="w-full py-[8px] rounded-[8px] bg-[#C017B4]/20 border border-[#C017B4] text-[#C017B4] font-bold text-[13px] text-center">
          Bet placed — Waiting…
        </div>
      ) : (
        <button
          onClick={onPlace}
          disabled={phase !== 'waiting'}
          className="w-full py-[8px] rounded-[8px] bg-[#00FF7F] text-[#11181C] font-bold text-[13px] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {phase === 'waiting' ? 'Place Bet' : phase === 'flying' ? 'Wait…' : 'Round Over'}
        </button>
      )}
    </div>
  );
}
