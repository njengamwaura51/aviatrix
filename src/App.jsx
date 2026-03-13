import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import AviatorPage from './pages/AviatorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Account pages
import AccountLayout from './pages/account/AccountLayout';
import AccountOverview from './pages/account/AccountOverview';
import WalletPage from './pages/account/WalletPage';
import DepositPage from './pages/account/DepositPage';
import WithdrawPage from './pages/account/WithdrawPage';
import BetHistoryPage from './pages/account/BetHistoryPage';
import TransactionsPage from './pages/account/TransactionsPage';
import ProfilePage from './pages/account/ProfilePage';

function Layout({ children }) {
  return (
    <div id="__next" className="min-h-screen bg-[#0c0c1a] font-sans flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function FullScreenLayout({ children }) {
  return (
    <div id="__next" className="min-h-screen bg-[#0c0c1a] font-sans">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth pages — full screen */}
          <Route path="/login" element={<FullScreenLayout><LoginPage /></FullScreenLayout>} />
          <Route path="/register" element={<FullScreenLayout><RegisterPage /></FullScreenLayout>} />

          {/* Main game page */}
          <Route path="/" element={<Layout><AviatorPage /></Layout>} />
          <Route path="/aviator" element={<Navigate to="/" replace />} />

          {/* Account pages */}
          <Route path="/account" element={<Layout><AccountLayout /></Layout>}>
            <Route index element={<AccountOverview />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="deposit" element={<DepositPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="history" element={<BetHistoryPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
