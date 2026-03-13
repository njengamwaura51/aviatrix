import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Demo user credentials as specified
const DEMO_USER = {
  username: '799920245',
  password: '117402',
  name: 'Demo User',
  phone: '799920245',
  balance: 5240.0,
  bonus: 200.0,
  currency: 'KES',
  avatarUrl:
    'https://www.aspirebet.ke/_next/image?url=https%3A%2F%2Fapisw.aspirebet.ke%2Faspirebet%2Fuploads%2Favatar45.png&w=1080&q=75',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState('');

  function login(username, password) {
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      setUser({ ...DEMO_USER });
      setLoginError('');
      return true;
    }
    setLoginError('Invalid username or password.');
    return false;
  }

  function logout() {
    setUser(null);
  }

  function updateBalance(amount) {
    setUser((prev) => prev && { ...prev, balance: prev.balance + amount });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loginError, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
