import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AviatorPage from './pages/AviatorPage';
import SportsPage from './pages/SportsPage';
import CasinoPage from './pages/CasinoPage';
import LivePage from './pages/LivePage';
import VirtualPage from './pages/VirtualPage';

// Account pages
import AccountLayout from './pages/account/AccountLayout';
import AccountOverview from './pages/account/AccountOverview';
import WalletPage from './pages/account/WalletPage';
import DepositPage from './pages/account/DepositPage';
import WithdrawPage from './pages/account/WithdrawPage';
import BetHistoryPage from './pages/account/BetHistoryPage';
import TransactionsPage from './pages/account/TransactionsPage';
import ProfilePage from './pages/account/ProfilePage';

/**
 * Root component — mirrors the source site DOM skeleton:
 * div#__next > div.flex.flex-col > div.flex > div.flex.w-screen
 */
function Layout({ children }) {
  return (
    <div id="__next" className="min-h-screen bg-[#11181C] font-sans flex flex-col">
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col w-full">
            <Header />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

function FullScreenLayout({ children }) {
  return (
    <div id="__next" className="min-h-screen bg-[#11181C] font-sans">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth pages — full screen, no header/footer */}
          <Route path="/login" element={<FullScreenLayout><LoginPage /></FullScreenLayout>} />
          <Route path="/register" element={<FullScreenLayout><RegisterPage /></FullScreenLayout>} />

          {/* Main layout pages */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/sports" element={<Layout><SportsPage /></Layout>} />
          <Route path="/live" element={<Layout><LivePage /></Layout>} />
          <Route path="/casino" element={<Layout><CasinoPage /></Layout>} />
          <Route path="/aviator" element={<Layout><AviatorPage /></Layout>} />
          <Route path="/virtual" element={<Layout><VirtualPage /></Layout>} />

          {/* Account pages — require auth, nested */}
          <Route path="/account" element={<Layout><AccountLayout /></Layout>}>
            <Route index element={<AccountOverview />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="history" element={<BetHistoryPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
