import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ─── Constants ────────────────────────────────────────────────────────────────

const USERNAMES = [
  'Player***12','Ace***77','Lucky***33','Falcon***88','Storm***21',
  'Blaze***55','Eagle***44','Pro***66','Star***99','Maverick***11',
  'Champion***28','High***73','Punter***56','Gamer***39','Win***84',
  'Jet***17','Sky***62','Top***95','Fast***48','Max***31',
];

const AMOUNTS = [10, 20, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000];

const INITIAL_HISTORY = [
  1.24, 5.62, 1.03, 2.47, 10.00, 1.18, 3.31, 47.82,
  1.56, 8.09, 1.02, 2.19, 15.43, 1.07, 4.55,
];

const INITIAL_CHAT = [
  { id: 1, user: 'Lucky***33', msg: '🔥 10x let\'s go!' },
  { id: 2, user: 'Ace***77', msg: 'cashed at 5x nice' },
  { id: 3, user: 'Storm***21', msg: 'let it fly boys' },
  { id: 4, user: 'Pro***66', msg: 'got 12x 💰💰' },
  { id: 5, user: 'Blaze***55', msg: 'missed again 😭' },
  { id: 6, user: 'Eagle***44', msg: 'going for 20x' },
];

const INITIAL_ROUND_NUMBER = 4822;
const MAX_GUEST_ID = 99;

const MY_BETS_HISTORY = [
  { round: `R-${INITIAL_ROUND_NUMBER - 4}`, amount: 100, cashedAt: 2.47, win: 247 },
  { round: `R-${INITIAL_ROUND_NUMBER - 3}`, amount: 200, cashedAt: null, win: 0 },
  { round: `R-${INITIAL_ROUND_NUMBER - 2}`, amount: 50, cashedAt: 10.00, win: 500 },
  { round: `R-${INITIAL_ROUND_NUMBER - 1}`, amount: 100, cashedAt: 1.56, win: 156 },
  { round: `R-${INITIAL_ROUND_NUMBER}`, amount: 300, cashedAt: null, win: 0 },
];

// ─── Provably-fair RNG ────────────────────────────────────────────────────────

function generateCrashAt() {
  // 3% house edge: instant crash; otherwise geometric distribution
  const r = Math.random();
  if (r < 0.03) return 1.00;
  return Math.max(1.00, parseFloat((0.99 / (1 - r)).toFixed(2)));
}

function generateSimPlayers(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    user: USERNAMES[i % USERNAMES.length],
    amount: AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)],
    targetCashout: 1.3 + Math.random() * 12,
    cashedAt: null,
    lost: false,
  }));
}

// ─── Canvas drawing ───────────────────────────────────────────────────────────

const CANVAS_W = 800;
const CANVAS_H = 350;
const RATE = 0.15; // multiplier = e^(RATE * t_seconds)

function drawCanvas(canvas, phase, startMs, multiplierNow, crashed) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = CANVAS_W;
  const H = CANVAS_H;

  ctx.clearRect(0, 0, W, H);

  // Dark background
  ctx.fillStyle = '#0c0c1a';
  ctx.fillRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = 'rgba(255,255,255,0.035)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 50) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y <= H; y += 50) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  if (phase === 'waiting') return;

  const elapsedSec = startMs > 0 ? (Date.now() - startMs) / 1000 : 0;
  const tMax = crashed ? elapsedSec : elapsedSec;

  // Scrolling window: always show the most recent 18 seconds
  const windowSec = 18;
  const timeOffset = Math.max(0, tMax - windowSec * 0.85);
  const xScale = (W - 60) / windowSec;

  // Build curve points
  const steps = 200;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = timeOffset + (i / steps) * (tMax - timeOffset);
    if (t < 0) continue;
    const m = Math.exp(RATE * t);
    const x = 30 + (t - timeOffset) * xScale;
    const logM = Math.log(Math.max(m, 1));
    const y = H - 30 - Math.min(Math.sqrt(logM) * 130, H - 50);
    points.push([x, y]);
  }

  if (points.length < 2) return;

  const trailColor = crashed ? 'rgba(233,30,99,0.35)' : '#E91E63';

  // Fill under curve
  ctx.beginPath();
  ctx.moveTo(points[0][0], H - 30);
  points.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.lineTo(points[points.length - 1][0], H - 30);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, crashed ? 'rgba(233,30,99,0.12)' : 'rgba(233,30,99,0.28)');
  grad.addColorStop(1, 'rgba(233,30,99,0.0)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Trail line
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  points.forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.strokeStyle = trailColor;
  ctx.lineWidth = crashed ? 2 : 3;
  ctx.lineJoin = 'round';
  if (!crashed) {
    ctx.shadowColor = '#E91E63';
    ctx.shadowBlur = 14;
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Return tip position so the plane can be positioned
  const tip = points[points.length - 1];
  return { tipX: tip[0] / W, tipY: tip[1] / H };
}

// ─── Multiplier badge ─────────────────────────────────────────────────────────

function MultiplierBadge({ value, size = 'sm' }) {
  let cls = '';
  if (value >= 10) cls = 'bg-[#FF0050]/20 text-[#FF6090] border border-[#FF0050]/40';
  else if (value >= 2) cls = 'bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/40';
  else cls = 'bg-[#1D4ED8]/20 text-[#60A5FA] border border-[#1D4ED8]/40';

  const sizeClass = size === 'lg'
    ? 'px-[10px] py-[4px] text-[13px]'
    : 'px-[7px] py-[2px] text-[11px]';

  return (
    <span className={`flex-shrink-0 rounded-full font-bold cursor-default select-none ${cls} ${sizeClass}`}>
      {value.toFixed(2)}x
    </span>
  );
}

// ─── History ribbon ───────────────────────────────────────────────────────────

function HistoryRibbon({ history }) {
  return (
    <div className="flex items-center gap-[6px] px-[12px] py-[6px] bg-[#0d0d0d] border-b border-[#1e1e2a] overflow-x-auto scrollbar-hide flex-shrink-0">
      <span className="text-[#444] text-[10px] uppercase tracking-wider flex-shrink-0 mr-[2px]">
        History:
      </span>
      {history.map((m, i) => <MultiplierBadge key={i} value={m} />)}
    </div>
  );
}

// ─── Toggle switch ────────────────────────────────────────────────────────────

function Toggle({ on, onChange, label }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="flex items-center gap-[5px] select-none"
    >
      <div
        className={`relative w-[28px] h-[15px] rounded-full transition-colors ${on ? 'bg-[#28A745]' : 'bg-[#333]'}`}
      >
        <div
          className={`absolute top-[2px] w-[11px] h-[11px] rounded-full bg-white shadow transition-transform ${on ? 'translate-x-[15px]' : 'translate-x-[2px]'}`}
        />
      </div>
      <span className="text-[10px] text-[#9CA3AF] whitespace-nowrap">{label}</span>
    </button>
  );
}

// ─── Bet panel ────────────────────────────────────────────────────────────────

function BetPanel({
  amount, setAmount,
  placed, cashedAt, lostRound, phase, multiplier,
  onBet, onCancel, onCashOut,
  autoBet, setAutoBet,
  autoCashOut, setAutoCashOut,
  autoCashOutAt, setAutoCashOutAt,
  user,
}) {
  const QUICK = [1, 2, 5, 10];
  const parsedAmount = parseFloat(amount) || 0;
  const potential = (parsedAmount * multiplier).toFixed(2);

  const canBet = phase === 'waiting' && !placed;
  const canCancel = phase === 'waiting' && placed;
  const canCashOut = phase === 'flying' && placed && !cashedAt;
  const showCashedOut = cashedAt !== null;
  const showLost = lostRound && !cashedAt;

  return (
    <div className="flex-1 bg-[#141420] border border-[#222240] rounded-[10px] p-[10px] flex flex-col gap-[7px]">
      {/* Toggles */}
      <div className="flex items-center justify-between gap-[6px]">
        <Toggle on={autoBet} onChange={setAutoBet} label="Auto Bet" />
        <div className="flex items-center gap-[4px]">
          <Toggle on={autoCashOut} onChange={setAutoCashOut} label="Auto Cash Out" />
          {autoCashOut && (
            <input
              type="number"
              value={autoCashOutAt}
              onChange={(e) => setAutoCashOutAt(e.target.value)}
              className="w-[50px] bg-[#0c0c1a] text-[#E5E7EB] text-[11px] text-center px-[4px] py-[2px] rounded-[4px] border border-[#333] focus:outline-none focus:border-[#E91E63]"
              min="1.01"
              step="0.1"
            />
          )}
        </div>
      </div>

      {/* Amount input row */}
      <div className="flex items-center gap-[5px]">
        <button
          onClick={() => setAmount(String(Math.max(1, parsedAmount - 10)))}
          className="w-[28px] h-[28px] rounded-[6px] bg-[#222240] text-[#E5E7EB] text-[18px] leading-none flex items-center justify-center hover:bg-[#333360] flex-shrink-0"
        >
          −
        </button>
        <div className="flex-1 relative">
          <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[#666] text-[11px]">KES</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#0c0c1a] text-[#E5E7EB] text-[14px] font-bold text-center pl-[28px] pr-[6px] py-[6px] rounded-[6px] border border-[#333] focus:outline-none focus:border-[#E91E63]"
            min="1"
          />
        </div>
        <button
          onClick={() => setAmount(String(parsedAmount + 10))}
          className="w-[28px] h-[28px] rounded-[6px] bg-[#222240] text-[#E5E7EB] text-[18px] leading-none flex items-center justify-center hover:bg-[#333360] flex-shrink-0"
        >
          +
        </button>
      </div>

      {/* Quick presets */}
      <div className="flex gap-[4px]">
        {QUICK.map((v) => (
          <button
            key={v}
            onClick={() => setAmount(String(v))}
            className="flex-1 py-[3px] rounded-[5px] bg-[#222240] text-[#9CA3AF] text-[10px] hover:bg-[#333360] hover:text-[#E5E7EB] transition-colors"
          >
            {v.toFixed(2)}
          </button>
        ))}
      </div>

      {/* Action button */}
      {!user ? (
        <Link
          to="/login"
          className="block w-full py-[10px] rounded-[8px] bg-[#28A745] text-white font-bold text-[14px] text-center hover:opacity-90 transition-opacity"
        >
          Login to Play
        </Link>
      ) : showCashedOut ? (
        <div className="w-full py-[10px] rounded-[8px] bg-[#28A745]/20 border border-[#28A745]/50 text-[#4ADE80] font-bold text-[13px] text-center">
          ✓ Cashed Out @ {cashedAt.toFixed(2)}x · KES {(parsedAmount * cashedAt).toFixed(0)}
        </div>
      ) : showLost ? (
        <div className="w-full py-[10px] rounded-[8px] bg-[#FF0050]/10 border border-[#FF0050]/30 text-[#FF6090] font-bold text-[13px] text-center">
          ✗ Lost · KES {parsedAmount.toFixed(0)}
        </div>
      ) : canCashOut ? (
        <button
          onClick={onCashOut}
          className="w-full py-[10px] rounded-[8px] font-bold text-[15px] text-white transition-colors"
          style={{ background: '#FF5722', boxShadow: '0 0 14px rgba(255,87,34,0.45)' }}
        >
          CASH OUT · KES {potential}
        </button>
      ) : canCancel ? (
        <button
          onClick={onCancel}
          className="w-full py-[10px] rounded-[8px] bg-[#E91E63]/20 border border-[#E91E63]/50 text-[#E91E63] font-bold text-[14px] hover:bg-[#E91E63]/30 transition-colors"
        >
          CANCEL BET
        </button>
      ) : canBet ? (
        <button
          onClick={onBet}
          className="w-full py-[10px] rounded-[8px] font-bold text-[15px] text-white transition-opacity hover:opacity-90"
          style={{ background: '#28A745', boxShadow: '0 0 10px rgba(40,167,69,0.3)' }}
        >
          BET · KES {parsedAmount.toFixed(2)}
        </button>
      ) : (
        <button
          disabled
          className="w-full py-[10px] rounded-[8px] bg-[#222240] text-[#555] font-bold text-[14px] cursor-not-allowed"
        >
          {phase === 'flying' ? '— In Flight —' : '— Round Over —'}
        </button>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ liveBets, myBets, activeTab, setActiveTab, chatMessages, chatInput, setChatInput, onSendChat }) {
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const tabs = ['All Bets', 'My Bets', 'Top Bets', 'Chat'];

  const topBets = [...liveBets]
    .filter((b) => b.cashedAt)
    .sort((a, b) => b.cashedAt * b.amount - a.cashedAt * a.amount)
    .slice(0, 10);

  return (
    <div className="hidden lg:flex w-[220px] flex-shrink-0 flex-col bg-[#0f0f1e] border-l border-[#1e1e2a]">
      {/* Tab headers */}
      <div className="flex border-b border-[#1e1e2a] flex-shrink-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-[7px] text-[9px] font-semibold uppercase tracking-wide transition-colors ${
              activeTab === t
                ? 'text-[#E91E63] border-b-2 border-[#E91E63]'
                : 'text-[#555] hover:text-[#9CA3AF]'
            }`}
          >
            {t === 'All Bets' ? 'All' : t === 'My Bets' ? 'Mine' : t === 'Top Bets' ? 'Top' : 'Chat'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'All Bets' && (
          <div>
            {liveBets.map((bet) => (
              <div key={bet.id} className="flex items-center gap-[5px] px-[8px] py-[5px] border-b border-[#111120] hover:bg-[#141422]">
                <div className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${bet.cashedAt ? 'bg-[#4ADE80]' : bet.lost ? 'bg-[#FF6090]' : 'bg-[#FBBF24]'}`} />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[#C0C0D0] text-[10px] truncate">{bet.user}</span>
                  <span className="text-[#555] text-[9px]">KES {bet.amount.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  {bet.cashedAt && (
                    <span className="text-[#4ADE80] text-[10px] font-bold">{bet.cashedAt.toFixed(2)}x</span>
                  )}
                  {bet.cashedAt && (
                    <span className="text-[#FBBF24] text-[9px]">+{(bet.amount * bet.cashedAt).toFixed(0)}</span>
                  )}
                  {bet.lost && <span className="text-[#FF6090] text-[9px]">Lost</span>}
                  {!bet.cashedAt && !bet.lost && (
                    <span className="text-[#FBBF24] text-[9px] animate-pulse">Flying…</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'My Bets' && (
          <div>
            {myBets.length === 0 ? (
              <p className="text-[#444] text-[11px] text-center p-[16px]">No bets yet this session</p>
            ) : (
              myBets.map((b, i) => (
                <div key={i} className="flex items-center justify-between px-[8px] py-[6px] border-b border-[#111120]">
                  <div>
                    <span className="text-[#9CA3AF] text-[10px]">{b.round}</span>
                    <br />
                    <span className="text-[#666] text-[9px]">KES {b.amount}</span>
                  </div>
                  <div className="text-right">
                    {b.cashedAt ? (
                      <>
                        <span className="text-[#4ADE80] text-[10px] font-bold">{b.cashedAt.toFixed(2)}x</span>
                        <br />
                        <span className="text-[#FBBF24] text-[9px]">+{b.win}</span>
                      </>
                    ) : (
                      <span className="text-[#FF6090] text-[10px]">Lost</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'Top Bets' && (
          <div>
            <div className="px-[8px] py-[4px] text-[9px] text-[#444] uppercase tracking-wider border-b border-[#111120]">
              Highest wins this round
            </div>
            {topBets.length === 0 ? (
              <p className="text-[#444] text-[11px] text-center p-[16px]">Waiting for cashouts…</p>
            ) : (
              topBets.map((bet, i) => (
                <div key={bet.id} className="flex items-center gap-[5px] px-[8px] py-[5px] border-b border-[#111120]">
                  <span className="text-[#555] text-[10px] w-[14px] flex-shrink-0">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[#C0C0D0] text-[10px] truncate block">{bet.user}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[#4ADE80] text-[10px] font-bold">{bet.cashedAt.toFixed(2)}x</span>
                    <br />
                    <span className="text-[#FBBF24] text-[9px]">+{(bet.amount * bet.cashedAt).toFixed(0)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'Chat' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-[6px] space-y-[4px]">
              {chatMessages.map((m) => (
                <div key={m.id} className="text-[10px]">
                  <span className="text-[#E91E63] font-semibold">{m.user}: </span>
                  <span className="text-[#C0C0D0]">{m.msg}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Chat input */}
      {activeTab === 'Chat' && (
        <form
          onSubmit={onSendChat}
          className="flex items-center gap-[4px] p-[6px] border-t border-[#1e1e2a] flex-shrink-0"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Say something…"
            className="flex-1 bg-[#141422] text-[#C0C0D0] text-[10px] px-[6px] py-[5px] rounded-[5px] border border-[#222240] focus:outline-none focus:border-[#E91E63] min-w-0"
            maxLength={80}
          />
          <button
            type="submit"
            className="px-[8px] py-[5px] rounded-[5px] bg-[#E91E63] text-white text-[10px] font-bold hover:opacity-90 flex-shrink-0"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AviatorPage() {
  const { user } = useAuth();

  // Game state
  const [phase, setPhase] = useState('waiting');
  const [multiplier, setMultiplier] = useState(1.00);
  const [countdown, setCountdown] = useState(5);
  const [history, setHistory] = useState(INITIAL_HISTORY);

  // Plane visual position (percentage)
  const [planePos, setPlanePos] = useState({ x: 5, yBottom: 8 });
  const [planeVisible, setPlaneVisible] = useState(false);
  const [planeCrashing, setPlaneCrashing] = useState(false);

  // Bet panel 1 state
  const [amount1, setAmount1] = useState('100');
  const [placed1, setPlaced1] = useState(false);
  const [cashedAt1, setCashedAt1] = useState(null);
  const [lostRound1, setLostRound1] = useState(false);
  const [autoBet1, setAutoBet1] = useState(false);
  const [autoCO1, setAutoCO1] = useState(false);
  const [autoCOAt1, setAutoCOAt1] = useState('2.00');

  // Bet panel 2 state
  const [amount2, setAmount2] = useState('50');
  const [placed2, setPlaced2] = useState(false);
  const [cashedAt2, setCashedAt2] = useState(null);
  const [lostRound2, setLostRound2] = useState(false);
  const [autoBet2, setAutoBet2] = useState(false);
  const [autoCO2, setAutoCO2] = useState(false);
  const [autoCOAt2, setAutoCOAt2] = useState('3.00');

  // Sidebar
  const [activeTab, setActiveTab] = useState('All Bets');
  const [liveBets, setLiveBets] = useState([]);
  const [myBets, setMyBets] = useState(MY_BETS_HISTORY);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState('');
  const chatIdRef = useRef(100);

  // Canvas
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Refs for game loop
  const phaseRef = useRef('waiting');
  const multiplierRef = useRef(1.00);
  const startMsRef = useRef(0);
  const crashAtRef = useRef(1.00);
  const placed1Ref = useRef(false);
  const placed2Ref = useRef(false);
  const cashedAt1Ref = useRef(null);
  const cashedAt2Ref = useRef(null);
  const autoCO1Ref = useRef(false);
  const autoCO2Ref = useRef(false);
  const autoCOAt1Ref = useRef('2.00');
  const autoCOAt2Ref = useRef('3.00');
  const simPlayersRef = useRef([]);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  // Keep refs in sync with state
  placed1Ref.current = placed1;
  placed2Ref.current = placed2;
  cashedAt1Ref.current = cashedAt1;
  cashedAt2Ref.current = cashedAt2;
  autoCO1Ref.current = autoCO1;
  autoCO2Ref.current = autoCO2;
  autoCOAt1Ref.current = autoCOAt1;
  autoCOAt2Ref.current = autoCOAt2;

  // ─ Canvas animation loop ─────────────────────────────────────────────────────

  const canvasDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const result = drawCanvas(
      canvas,
      phaseRef.current,
      startMsRef.current,
      multiplierRef.current,
      phaseRef.current === 'crashed',
    );
    if (result && phaseRef.current === 'flying') {
      const { tipX, tipY } = result;
      setPlanePos({ x: tipX * 100, yBottom: (1 - tipY) * 100 });
    }
    if (phaseRef.current === 'flying') {
      animRef.current = requestAnimationFrame(canvasDraw);
    }
  // drawCanvas is a pure module-level function and canvasDraw is intentionally
  // self-referential for the RAF loop — not a reactive dependency.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─ Game flow ─────────────────────────────────────────────────────────────────

  const startWaiting = useCallback(() => {
    clearInterval(intervalRef.current);
    cancelAnimationFrame(animRef.current);

    phaseRef.current = 'waiting';
    setPhase('waiting');
    setMultiplier(1.00);
    multiplierRef.current = 1.00;
    setPlaneVisible(false);
    setPlaneCrashing(false);
    setPlaced1(false);
    setPlaced2(false);
    setCashedAt1(null);
    setCashedAt2(null);
    setLostRound1(false);
    setLostRound2(false);

    // Draw static waiting canvas
    drawCanvas(canvasRef.current, 'waiting', 0, 1.00, false);

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startFlying = useCallback(() => {
    const crashAt = generateCrashAt();
    crashAtRef.current = crashAt;
    const simPlayers = generateSimPlayers(14 + Math.floor(Math.random() * 6));
    simPlayersRef.current = simPlayers;

    setLiveBets(simPlayers.map((p) => ({ ...p })));

    const startMs = Date.now();
    startMsRef.current = startMs;
    phaseRef.current = 'flying';
    setPhase('flying');
    setPlaneVisible(true);
    setPlaneCrashing(false);

    // Auto-bet panels
    if (autoBet1) setPlaced1(true);
    if (autoBet2) setPlaced2(true);

    // Start canvas animation
    animRef.current = requestAnimationFrame(canvasDraw);

    // Game update interval (100 ms)
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startMs) / 1000;
      const m = parseFloat(Math.exp(RATE * elapsed).toFixed(2));
      multiplierRef.current = m;
      setMultiplier(m);

      // Auto cash-out panel 1
      if (
        placed1Ref.current &&
        !cashedAt1Ref.current &&
        autoCO1Ref.current &&
        m >= parseFloat(autoCOAt1Ref.current)
      ) {
        const co = m;
        cashedAt1Ref.current = co;
        setCashedAt1(co);
      }

      // Auto cash-out panel 2
      if (
        placed2Ref.current &&
        !cashedAt2Ref.current &&
        autoCO2Ref.current &&
        m >= parseFloat(autoCOAt2Ref.current)
      ) {
        const co = m;
        cashedAt2Ref.current = co;
        setCashedAt2(co);
      }

      // Simulate other players cashing out
      let betsChanged = false;
      simPlayersRef.current = simPlayersRef.current.map((p) => {
        if (!p.cashedAt && !p.lost && m >= p.targetCashout) {
          betsChanged = true;
          return { ...p, cashedAt: m };
        }
        return p;
      });
      if (betsChanged) {
        setLiveBets([...simPlayersRef.current]);
      }

      // Check crash
      if (m >= crashAt) {
        clearInterval(intervalRef.current);
        cancelAnimationFrame(animRef.current);

        // Mark remaining sim players as lost
        simPlayersRef.current = simPlayersRef.current.map((p) =>
          p.cashedAt ? p : { ...p, lost: true }
        );
        setLiveBets([...simPlayersRef.current]);

        // Mark user bets as lost if not cashed out
        if (placed1Ref.current && !cashedAt1Ref.current) setLostRound1(true);
        if (placed2Ref.current && !cashedAt2Ref.current) setLostRound2(true);

        phaseRef.current = 'crashed';
        setPhase('crashed');
        setPlaneVisible(false);
        setPlaneCrashing(false);

        // Final canvas draw
        drawCanvas(canvasRef.current, 'crashed', startMs, m, true);

        setHistory((prev) => [m, ...prev.slice(0, 14)]);

        timerRef.current = setTimeout(startWaiting, 3500);
      }
    }, 100);
  }, [autoBet1, autoBet2, canvasDraw, startWaiting]);

  useEffect(() => {
    startWaiting();
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timerRef.current);
      cancelAnimationFrame(animRef.current);
    };
  // startWaiting is defined with useCallback but intentionally excluded from deps
  // to avoid restarting the game loop on every render — it is stable across renders.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─ Player actions ─────────────────────────────────────────────────────────────

  function handleBet(slot) {
    if (phaseRef.current !== 'waiting') return;
    if (slot === 1) setPlaced1(true);
    else setPlaced2(true);
  }

  function handleCancel(slot) {
    if (phaseRef.current !== 'waiting') return;
    if (slot === 1) setPlaced1(false);
    else setPlaced2(false);
  }

  function handleCashOut(slot) {
    if (phaseRef.current !== 'flying') return;
    const m = multiplierRef.current;
    if (slot === 1 && placed1Ref.current && !cashedAt1Ref.current) {
      cashedAt1Ref.current = m;
      setCashedAt1(m);
      setMyBets((prev) => [{
        round: `R-${INITIAL_ROUND_NUMBER + prev.length}`,
        amount: parseFloat(amount1) || 0,
        cashedAt: m,
        win: Math.round((parseFloat(amount1) || 0) * m),
      }, ...prev.slice(0, 19)]);
    }
    if (slot === 2 && placed2Ref.current && !cashedAt2Ref.current) {
      cashedAt2Ref.current = m;
      setCashedAt2(m);
      setMyBets((prev) => [{
        round: `R-${INITIAL_ROUND_NUMBER + prev.length}`,
        amount: parseFloat(amount2) || 0,
        cashedAt: m,
        win: Math.round((parseFloat(amount2) || 0) * m),
      }, ...prev.slice(0, 19)]);
    }
  }

  function handleSendChat(e) {
    e.preventDefault();
    const msg = chatInput.trim();
    if (!msg) return;
    const name = user ? user.phone : 'Guest***' + Math.floor(Math.random() * MAX_GUEST_ID);
    chatIdRef.current += 1;
    setChatMessages((prev) => [...prev, { id: chatIdRef.current, user: name, msg }]);
    setChatInput('');
  }

  // ─ Waiting progress bar ───────────────────────────────────────────────────────

  const progressPct = phase === 'waiting' ? ((5 - countdown) / 5) * 100 : 0;

  // ─ Render ─────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col bg-[#0c0c1a] min-h-full">
      {/* History ribbon */}
      <HistoryRibbon history={history} />

      <div className="flex flex-1 overflow-hidden">
        {/* Game + betting area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Canvas game area */}
          <div className="relative flex-1" style={{ minHeight: '320px' }}>
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="absolute inset-0 w-full h-full block"
            />

            {/* Animated plane */}
            {planeVisible && !planeCrashing && (
              <div
                className="absolute text-[36px] pointer-events-none z-10 transition-none"
                style={{
                  left: `${Math.min(planePos.x, 88)}%`,
                  bottom: `${Math.min(planePos.yBottom, 88)}%`,
                  transform: 'rotate(-25deg) scaleX(-1)',
                  filter: 'drop-shadow(0 0 6px rgba(233,30,99,0.8))',
                }}
              >
                ✈️
              </div>
            )}

            {/* Multiplier / overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
              {phase === 'waiting' && (
                <div className="text-center px-[16px] w-full max-w-[300px]">
                  <p className="text-[#888] text-[13px] mb-[10px] uppercase tracking-widest">
                    Waiting for next round
                  </p>
                  <div className="w-full h-[6px] rounded-full bg-[#1e1e2a] overflow-hidden mb-[10px]">
                    <div
                      className="h-full rounded-full bg-[#E91E63] transition-all duration-1000"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <span className="text-[#FBBF24] text-[52px] font-bold leading-none">
                    {countdown}
                  </span>
                </div>
              )}

              {phase === 'flying' && (
                <div className="text-center">
                  <span
                    className="font-black leading-none tracking-tight"
                    style={{
                      fontSize: 'clamp(56px, 10vw, 88px)',
                      color: multiplier >= 10 ? '#FBBF24' : multiplier >= 3 ? '#4ADE80' : '#ffffff',
                      textShadow: multiplier >= 10
                        ? '0 0 40px rgba(251,191,36,0.6)'
                        : multiplier >= 3
                        ? '0 0 35px rgba(74,222,128,0.55)'
                        : '0 0 30px rgba(255,255,255,0.3)',
                    }}
                  >
                    {multiplier.toFixed(2)}
                    <span style={{ fontSize: '0.55em', opacity: 0.9 }}>x</span>
                  </span>
                </div>
              )}

              {phase === 'crashed' && (
                <div className="text-center">
                  <span
                    className="font-black leading-none tracking-tight"
                    style={{
                      fontSize: 'clamp(48px, 9vw, 76px)',
                      color: '#FF6090',
                      textShadow: '0 0 40px rgba(233,30,99,0.7)',
                    }}
                  >
                    {multiplier.toFixed(2)}
                    <span style={{ fontSize: '0.55em', opacity: 0.9 }}>x</span>
                  </span>
                  <p
                    className="font-black text-[22px] mt-[4px] uppercase tracking-widest"
                    style={{ color: '#FF0050', textShadow: '0 0 20px rgba(255,0,80,0.8)' }}
                  >
                    FLEW AWAY!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bet panels */}
          <div className="bg-[#0f0f1e] border-t border-[#1e1e2a] p-[10px] flex-shrink-0">
            <div className="flex gap-[10px]">
              <BetPanel
                amount={amount1} setAmount={setAmount1}
                placed={placed1} cashedAt={cashedAt1} lostRound={lostRound1}
                phase={phase} multiplier={multiplier}
                onBet={() => handleBet(1)} onCancel={() => handleCancel(1)} onCashOut={() => handleCashOut(1)}
                autoBet={autoBet1} setAutoBet={setAutoBet1}
                autoCashOut={autoCO1} setAutoCashOut={setAutoCO1}
                autoCashOutAt={autoCOAt1} setAutoCashOutAt={setAutoCOAt1}
                user={user}
              />
              <BetPanel
                amount={amount2} setAmount={setAmount2}
                placed={placed2} cashedAt={cashedAt2} lostRound={lostRound2}
                phase={phase} multiplier={multiplier}
                onBet={() => handleBet(2)} onCancel={() => handleCancel(2)} onCashOut={() => handleCashOut(2)}
                autoBet={autoBet2} setAutoBet={setAutoBet2}
                autoCashOut={autoCO2} setAutoCashOut={setAutoCO2}
                autoCashOutAt={autoCOAt2} setAutoCashOutAt={setAutoCOAt2}
                user={user}
              />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <Sidebar
          liveBets={liveBets}
          myBets={myBets}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSendChat={handleSendChat}
        />
      </div>
    </div>
  );
}
