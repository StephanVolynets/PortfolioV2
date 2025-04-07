import React from 'react';
import CryptoTicker from './CryptoTicker';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <CryptoTicker theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;