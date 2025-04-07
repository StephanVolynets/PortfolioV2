import React, { useEffect, useState, useRef, useCallback } from 'react';
import { TrendingUp, TrendingDown, Filter, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import '../styles/ticker.css'; // Updated import path for the ticker animations

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h?: number;
  price_change_percentage_7d?: number;
  price_change_percentage_30d?: number;
}

type TimeInterval = '1h' | '24h' | '7d' | '30d';

const intervalLabels: Record<TimeInterval, string> = {
  '1h': 'Hourly',
  '24h': 'Daily',
  '7d': 'Weekly',
  '30d': 'Monthly'
};

// Default fallback data to show
const fallbackData: CoinData[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 87268, price_change_percentage_24h: -0.07, price_change_percentage_1h: -0.02, price_change_percentage_7d: 2.4, price_change_percentage_30d: 8.3 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 2005.03, price_change_percentage_24h: -0.26, price_change_percentage_1h: -0.1, price_change_percentage_7d: 1.2, price_change_percentage_30d: 5.6 },
  { id: 'tether', symbol: 'usdt', name: 'Tether', current_price: 1, price_change_percentage_24h: 0.0, price_change_percentage_1h: 0.0, price_change_percentage_7d: 0.0, price_change_percentage_30d: -0.1 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 2.34, price_change_percentage_24h: -0.28, price_change_percentage_1h: -0.1, price_change_percentage_7d: -1.1, price_change_percentage_30d: -3.4 },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 638.16, price_change_percentage_24h: 0.04, price_change_percentage_1h: 0.02, price_change_percentage_7d: 4.2, price_change_percentage_30d: 12.8 },
  { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 138.74, price_change_percentage_24h: -0.3, price_change_percentage_1h: -0.2, price_change_percentage_7d: 3.2, price_change_percentage_30d: 7.9 },
  { id: 'usd-coin', symbol: 'usdc', name: 'USD Coin', current_price: 1, price_change_percentage_24h: 0.0, price_change_percentage_1h: 0.0, price_change_percentage_7d: 0.0, price_change_percentage_30d: 0.0 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 0.74, price_change_percentage_24h: -0.11, price_change_percentage_1h: -0.06, price_change_percentage_7d: 5.1, price_change_percentage_30d: 9.4 },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', current_price: 0.19, price_change_percentage_24h: -1.11, price_change_percentage_1h: -0.2, price_change_percentage_7d: -2.4, price_change_percentage_30d: -4.7 },
  { id: 'tron', symbol: 'trx', name: 'TRON', current_price: 0.13, price_change_percentage_24h: -0.5, price_change_percentage_1h: -0.07, price_change_percentage_7d: -2.8, price_change_percentage_30d: -5.1 }
];

interface CryptoTickerProps {
  theme: string;
  toggleTheme: () => void;
}

const CryptoTicker: React.FC<CryptoTickerProps> = ({ theme, toggleTheme }) => {
  // State for all essential functionality
  const [coins, setCoins] = useState<CoinData[]>(() => {
    // Always initialize with saved data if available, fallback otherwise
    try {
      const savedCoins = localStorage.getItem('cryptoData');
      if (savedCoins) {
        return JSON.parse(savedCoins);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    return fallbackData;
  });
  
  // Set default interval to 24h (daily)
  const [interval, setInterval] = useState<TimeInterval>('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showIntervalMenu, setShowIntervalMenu] = useState(false);
  const [changingInterval, setChangingInterval] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Utility function to check if we can make a request
  const canFetch = () => {
    return Date.now() - lastFetchTime > 60000; // Allow one request per minute
  };

  // Function to fetch coin data
  const fetchCoinData = useCallback(async () => {
    // Don't fetch if we recently made a request
    if (!canFetch()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const endpoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=false&price_change_percentage=1h,24h,7d,30d';
      
      const response = await fetch(endpoint, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      clearTimeout(timeoutId);
      setLastFetchTime(Date.now());
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid data received');
      }
      
      // Format the data
      const formattedData = data.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h || 0,
        price_change_percentage_1h: coin.price_change_percentage_1h_in_currency || 0,
        price_change_percentage_7d: coin.price_change_percentage_7d_in_currency || 0,
        price_change_percentage_30d: coin.price_change_percentage_30d_in_currency || 0
      }));
      
      // Save to localStorage for future use
      localStorage.setItem('cryptoData', JSON.stringify(formattedData));
      
      setCoins(formattedData);
    } catch (error) {
      console.error('Error fetching coin data:', error);
      // We don't update state on error - keep showing existing data
    } finally {
      setIsLoading(false);
    }
  }, [lastFetchTime]);

  // Set up initial data fetch and periodic updates
  useEffect(() => {
    // Try to fetch fresh data on component mount
    fetchCoinData();
    
    // Set up periodic fetching
    const intervalId = setInterval(() => {
      if (canFetch()) {
        fetchCoinData();
      }
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [fetchCoinData]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowIntervalMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle interval change with loading state
  const handleIntervalChange = (newInterval: TimeInterval) => {
    if (interval === newInterval) {
      setShowIntervalMenu(false);
      return;
    }
    
    // Show loading state for interval change
    setChangingInterval(true);
    setInterval(newInterval);
    
    // Brief animation for better UX
    setTimeout(() => {
      setChangingInterval(false);
    }, 400);
    
    setShowIntervalMenu(false);
  };

  // Get the correct percentage for currently selected interval
  const getPriceChangePercentage = (coin: CoinData): number => {
    switch (interval) {
      case '1h':
        return coin.price_change_percentage_1h ?? 0;
      case '7d':
        return coin.price_change_percentage_7d ?? 0;
      case '30d':
        return coin.price_change_percentage_30d ?? 0;
      default:
        return coin.price_change_percentage_24h;
    }
  };

  // Render a single coin in the ticker
  const renderCoin = (coin: CoinData, index: number) => {
    const percentage = getPriceChangePercentage(coin);
    
    return (
      <div
        key={`${coin.id}-${index}`}
        className="inline-flex items-center px-5 h-12 font-sans"
      >
        <span className="font-bold text-primary">{coin.symbol.toUpperCase()}</span>
        <span className="ml-2 text-text">${coin.current_price.toLocaleString()}</span>
        <div className="flex items-center ml-2">
          {percentage >= 0 ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          )}
          <span
            className={`ml-1 text-xs ${
              percentage >= 0
                ? 'text-emerald-500 font-medium'
                : 'text-red-500 font-medium'
            }`}
          >
            {percentage.toFixed(2)}%
          </span>
        </div>
      </div>
    );
  };
  
  // Render a loading state when changing intervals
  const renderSkeletonLoader = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex items-center animate-pulse space-x-4">
        <div className="h-4 w-24 bg-highlight rounded"></div>
        <div className="h-4 w-16 bg-highlight rounded"></div>
        <div className="h-4 w-12 bg-highlight rounded"></div>
      </div>
      <span className="ml-4 text-sm text-primary italic">
        Switching to {intervalLabels[interval]} data... 🔄
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-between w-full h-14 px-4 bg-background border-b border-highlight">
      {/* Logo */}
      <a 
        href="#hero" 
        className="flex-none font-mono text-xl font-bold tracking-tighter hover:text-primary transition-colors"
      >
        SV
      </a>
      
      {/* Ticker */}
      <div className="flex-1 mx-6 h-12 overflow-hidden relative">
        {changingInterval ? (
          renderSkeletonLoader()
        ) : (
          <div 
            ref={tickerRef}
            className="ticker-wrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className={`ticker-move ${isPaused ? 'paused' : ''}`}>
              {[...coins, ...coins, ...coins].map((coin, index) => renderCoin(coin, index))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex-none flex items-center space-x-2">
        {/* Interval filter button & dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center justify-center h-9 px-3 py-2 text-xs bg-highlight hover:bg-accent rounded-md transition-colors"
            onClick={() => setShowIntervalMenu(!showIntervalMenu)}
          >
            <Filter className="h-4 w-4 text-primary mr-1.5" />
            <span className="text-text font-medium">{intervalLabels[interval]}</span>
          </button>
          
          {showIntervalMenu && (
            <div className="absolute right-0 mt-1 w-36 py-1 bg-background border border-highlight rounded-md shadow-lg z-50">
              {(Object.keys(intervalLabels) as TimeInterval[]).map((key) => (
                <button
                  key={key}
                  className={cn(
                    "flex items-center w-full text-left px-4 py-2 text-xs",
                    interval === key ? "bg-primary/10 text-primary font-medium" : "text-text hover:bg-highlight"
                  )}
                  onClick={() => handleIntervalChange(key)}
                >
                  {intervalLabels[key]}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Theme toggle button */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-md bg-highlight hover:bg-accent transition-colors"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-primary" />
          ) : (
            <Moon className="h-4 w-4 text-primary" />
          )}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </div>
  );
};

export default CryptoTicker; 