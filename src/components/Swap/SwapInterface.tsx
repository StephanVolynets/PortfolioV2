"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, Settings, Info, Loader2, X } from 'lucide-react';
import { TokenSelector } from './TokenSelector';
import { SwapSettings } from './SwapSettings';
import { Token, baseTokens } from '@/lib/tokens';
import { getPrice, getQuote, formatNumber } from '@/lib/swapService';

// Note: Using existing window.ethereum and window.phantom types.
// TypeScript errors are suppressed with @ts-ignore where needed.

// Check if we're in a browser environment before referencing window
const isClient = typeof window !== 'undefined';

// Wallet types
type WalletOption = {
  name: string;
  icon: string;
  isInstalled: boolean;
  provider?: any;
};

// Wallet Selection Modal
function WalletSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectWallet 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSelectWallet: (provider: any, name: string) => void;
}) {
  const [wallets, setWallets] = useState<WalletOption[]>([
    { 
      name: 'MetaMask', 
      icon: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg', 
      isInstalled: false 
    },
    { 
      name: 'Phantom', 
      icon: 'https://www.phantom.app/img/logo.png', 
      isInstalled: false 
    },
    { 
      name: 'Coinbase Wallet', 
      icon: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0=w240-h480-rw', 
      isInstalled: false 
    }
  ]);

  useEffect(() => {
    if (!isClient) return;

    // Check for available wallets
    const updateWallets = async () => {
      const updatedWallets = [...wallets];

      // Check for window.ethereum providers
      if (window.ethereum) {
        // Check for MetaMask
        if (window.ethereum.isMetaMask) {
          const metaMaskIndex = updatedWallets.findIndex(w => w.name === 'MetaMask');
          if (metaMaskIndex >= 0) {
            updatedWallets[metaMaskIndex].isInstalled = true;
            updatedWallets[metaMaskIndex].provider = window.ethereum;
          }
        }

        // Check for Phantom
        if (window.ethereum.isPhantom) {
          const phantomIndex = updatedWallets.findIndex(w => w.name === 'Phantom');
          if (phantomIndex >= 0) {
            updatedWallets[phantomIndex].isInstalled = true;
            updatedWallets[phantomIndex].provider = window.ethereum;
          }
        }

        // Check for Coinbase Wallet
        if (window.ethereum.isCoinbaseWallet) {
          const coinbaseIndex = updatedWallets.findIndex(w => w.name === 'Coinbase Wallet');
          if (coinbaseIndex >= 0) {
            updatedWallets[coinbaseIndex].isInstalled = true;
            updatedWallets[coinbaseIndex].provider = window.ethereum;
          }
        }
      }

      // Check for individual window objects (some wallets expose themselves differently)
      // @ts-ignore - Phantom wallet may exist in window
      if (window.phantom) {
        const phantomIndex = updatedWallets.findIndex(w => w.name === 'Phantom');
        if (phantomIndex >= 0) {
          updatedWallets[phantomIndex].isInstalled = true;
          // @ts-ignore - Accessing phantom.ethereum
          updatedWallets[phantomIndex].provider = window.phantom.ethereum;
        }
      }

      setWallets(updatedWallets);
    };

    updateWallets();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-[#252832] w-full max-w-md rounded-xl shadow-xl border border-[#363A45]/30 p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Connect Wallet</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#363A45]/20"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="space-y-3 my-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border ${
                wallet.isInstalled 
                  ? 'border-[#363A45] hover:bg-[#363A45]/20 cursor-pointer' 
                  : 'border-[#363A45]/50 opacity-50 cursor-not-allowed'
              } transition-colors`}
              disabled={!wallet.isInstalled}
              onClick={() => {
                if (wallet.provider && wallet.isInstalled) {
                  onSelectWallet(wallet.provider, wallet.name);
                }
              }}
            >
              <img 
                src={wallet.icon} 
                alt={wallet.name} 
                className="w-8 h-8 rounded-md"
              />
              <div className="flex flex-col items-start">
                <span className="text-white font-medium">{wallet.name}</span>
                <span className="text-xs text-[#B2B5BE]">
                  {wallet.isInstalled ? 'Installed' : 'Not installed'}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        <p className="text-xs text-[#B2B5BE] mt-4">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export function SwapInterface() {
  // Token selection state
  const [fromToken, setFromToken] = useState<Token | null>(baseTokens[0]); // Default to ETH
  const [toToken, setToToken] = useState<Token | null>(baseTokens[1]); // Default to USDC
  
  // Amount input state
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  
  // Modal state
  const [showFromTokenSelector, setShowFromTokenSelector] = useState<boolean>(false);
  const [showToTokenSelector, setShowToTokenSelector] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  
  // Quote state
  const [slippage, setSlippage] = useState<number>(0.5);
  const [deadline, setDeadline] = useState<number>(10); // minutes
  const [isGettingPrice, setIsGettingPrice] = useState<boolean>(false);
  const [priceData, setPriceData] = useState<any | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  
  // Connection state
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectedWalletName, setConnectedWalletName] = useState<string>('');

  // Helper to format address for display
  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    setConnectedWalletName('');
    // Remove listeners
    if (window.ethereum && window.ethereum.removeAllListeners) {
      window.ethereum.removeAllListeners('accountsChanged');
    }
  };

  // Fetch price when inputs change
  useEffect(() => {
    const fetchPrice = async () => {
      if (!fromToken || !toToken || !fromAmount || Number(fromAmount) <= 0) {
        setPriceData(null);
        return;
      }

      try {
        setIsGettingPrice(true);
        setPriceError(null);
        
        // Convert amount to token units (considering decimals)
        const sellAmount = (Number(fromAmount) * 10 ** fromToken.decimals).toString();
        
        const params = {
          sellToken: fromToken.address,
          buyToken: toToken.address,
          sellAmount: sellAmount,
          // Add taker address if connected
          ...(walletAddress && { takerAddress: walletAddress })
        };
        
        const price = await getPrice(params);
        setPriceData(price);
        
        // Update toAmount
        const buyAmount = price.buyAmount;
        const formattedBuyAmount = (Number(buyAmount) / 10 ** toToken.decimals).toString();
        setToAmount(formattedBuyAmount);
      } catch (error) {
        console.error('Error fetching price:', error);
        setPriceError(error instanceof Error ? error.message : 'Failed to fetch price');
        setToAmount('');
      } finally {
        setIsGettingPrice(false);
      }
    };

    fetchPrice();
  }, [fromToken, toToken, fromAmount, walletAddress]);

  // Swap tokens function
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Connect wallet function (modified to handle specific wallet provider)
  const connectSpecificWallet = async (provider: any, walletName: string) => {
    if (!isClient || !provider) return;
    
    setConnecting(true);
    try {
      console.log(`Attempting to connect to ${walletName}...`);
      
      try {
        // Clear any previous connection state
        setWalletAddress(null);
        setIsConnected(false);
        setConnectedWalletName('');
        
        // Request accounts from the specific provider
        console.log(`Requesting accounts from ${walletName}...`);
        const accounts = await provider.request({ 
          method: 'eth_requestAccounts',
          params: []
        });
        
        console.log(`${walletName} accounts received:`, accounts);
        
        if (accounts && accounts.length > 0) {
          const connectedAddress = accounts[0];
          console.log(`Setting wallet address from ${walletName}:`, connectedAddress);
          
          setWalletAddress(connectedAddress);
          setIsConnected(true);
          setConnectedWalletName(walletName);
          
          // Set up listener for account changes on this provider
          provider.on('accountsChanged', (newAccounts: string[]) => {
            console.log(`${walletName} accounts changed:`, newAccounts);
            if (newAccounts.length === 0) {
              setIsConnected(false);
              setWalletAddress(null);
              setConnectedWalletName('');
            } else {
              setWalletAddress(newAccounts[0]);
              setIsConnected(true);
            }
          });

          // Close the wallet selection modal
          setShowWalletModal(false);
        } else {
          console.error('No accounts returned even though request successful');
          alert(`No accounts found in ${walletName}. Please make sure your wallet is unlocked and try again.`);
        }
      } catch (error) {
        console.error(`Error connecting to ${walletName}:`, error);
        alert(`Connection to ${walletName} was rejected or failed. Please try again and approve the connection request.`);
      }
    } finally {
      setConnecting(false);
    }
  };

  // Updated connect wallet function to show wallet selector
  const connectWallet = () => {
    setShowWalletModal(true);
  };

  // Execute swap function
  const executeSwap = async () => {
    if (!isConnected || !fromToken || !toToken || !fromAmount) {
      return;
    }

    try {
      // Convert amount to token units (considering decimals)
      const sellAmount = (Number(fromAmount) * 10 ** fromToken.decimals).toString();
      
      const params = {
        sellToken: fromToken.address,
        buyToken: toToken.address,
        sellAmount: sellAmount,
        slippagePercentage: (slippage / 100).toString(),
        takerAddress: walletAddress!
      };
      
      const quote = await getQuote(params);
      
      // Here you would execute the transaction with the quote
      console.log('Ready to execute quote:', quote);
      
      // Example transaction execution
      if (window.ethereum) {
        try {
          const tx = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
              from: walletAddress,
              to: quote.to,
              data: quote.data,
              value: fromToken.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' ? quote.value : '0x0',
              gasLimit: quote.gas
            }]
          });
          
          console.log('Transaction submitted:', tx);
          alert(`Transaction submitted! Hash: ${tx}`);
        } catch (error) {
          console.error('Error executing transaction:', error);
          alert('Transaction rejected or failed');
        }
      }
    } catch (error) {
      console.error('Error executing swap:', error);
      alert('Error fetching quote or executing swap');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#252832] rounded-xl shadow-xl border border-[#363A45]/30">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Swap</h2>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-[#363A45]/20 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-[#85bb65]" />
          </button>
        </div>

        {/* From Token Input */}
        <div className="bg-[#1A1D24] rounded-lg p-4 mb-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#B2B5BE]">From</span>
            <span className="text-sm text-[#B2B5BE]">Balance: {isConnected ? '0.00' : '-'}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl text-white outline-none"
            />
            <button 
              className="flex items-center gap-2 px-3 py-2 bg-[#363A45]/20 rounded-lg hover:bg-[#363A45]/30 transition-colors"
              onClick={() => setShowFromTokenSelector(true)}
            >
              {fromToken ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-[#363A45]/30 overflow-hidden flex items-center justify-center">
                    {fromToken.logoURI ? (
                      <img
                        src={fromToken.logoURI}
                        alt={fromToken.name}
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-white text-xs">{fromToken.symbol.slice(0, 3)}</span>
                    )}
                  </div>
                  <span className="text-white">{fromToken.symbol}</span>
                </>
              ) : (
                <span className="text-white">Select</span>
              )}
              <span className="text-sm text-[#B2B5BE]">▼</span>
            </button>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button 
            className="p-2 rounded-lg bg-[#252832] border border-[#363A45]/30 hover:bg-[#363A45]/20 transition-colors"
            onClick={handleSwapTokens}
          >
            <ArrowDownUp className="w-5 h-5 text-[#85bb65]" />
          </button>
        </div>

        {/* To Token Input */}
        <div className="bg-[#1A1D24] rounded-lg p-4 mt-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#B2B5BE]">To</span>
            <span className="text-sm text-[#B2B5BE]">Balance: {isConnected ? '0.00' : '-'}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl text-white outline-none"
              disabled={isGettingPrice}
            />
            <button 
              className="flex items-center gap-2 px-3 py-2 bg-[#363A45]/20 rounded-lg hover:bg-[#363A45]/30 transition-colors"
              onClick={() => setShowToTokenSelector(true)}
            >
              {toToken ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-[#363A45]/30 overflow-hidden flex items-center justify-center">
                    {toToken.logoURI ? (
                      <img
                        src={toToken.logoURI}
                        alt={toToken.name}
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-white text-xs">{toToken.symbol.slice(0, 3)}</span>
                    )}
                  </div>
                  <span className="text-white">{toToken.symbol}</span>
                </>
              ) : (
                <span className="text-white">Select</span>
              )}
              <span className="text-sm text-[#B2B5BE]">▼</span>
            </button>
          </div>
        </div>

        {/* Price Information */}
        {priceData && (
          <div className="mt-4 p-3 bg-[#1A1D24] rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#B2B5BE] flex items-center">
                Price <Info className="w-3 h-3 ml-1 text-[#B2B5BE]" />
              </span>
              <span className="text-sm text-white">
                1 {fromToken?.symbol} = {formatNumber(priceData.price)} {toToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-[#B2B5BE]">Est. Gas</span>
              <span className="text-sm text-white">${formatNumber(priceData.estimatedGas)}</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {priceError && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">{priceError}</p>
          </div>
        )}

        {/* Swap Button */}
        {isConnected ? (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#B2B5BE]">Connected via:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white">
                  {connectedWalletName} ({formatAddress(walletAddress)})
                </span>
                <button 
                  onClick={disconnectWallet}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Disconnect
                </button>
              </div>
            </div>
            <button 
              className={`w-full px-4 py-3 bg-[#85bb65] hover:bg-[#5d8f3d] text-white rounded-lg font-medium transition-colors ${
                !fromToken || !toToken || !fromAmount || isGettingPrice ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={executeSwap}
              disabled={!fromToken || !toToken || !fromAmount || isGettingPrice}
            >
              {isGettingPrice ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Getting Price...
                </div>
              ) : (
                'Swap'
              )}
            </button>
          </div>
        ) : (
          <button 
            className="w-full mt-4 px-4 py-3 bg-[#85bb65] hover:bg-[#5d8f3d] text-white rounded-lg font-medium transition-colors relative z-50 wallet-connect-button"
            onClick={(e) => {
              e.stopPropagation();
              connectWallet();
            }}
            disabled={connecting}
            style={{ pointerEvents: 'auto' }}
          >
            {connecting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Connecting...
              </div>
            ) : (
              'Connect Wallet'
            )}
          </button>
        )}
      </div>

      {/* Token Selectors */}
      {showFromTokenSelector && (
        <TokenSelector
          isOpen={showFromTokenSelector}
          onClose={() => setShowFromTokenSelector(false)}
          onSelect={setFromToken}
          selectedToken={fromToken}
        />
      )}
      
      {showToTokenSelector && (
        <TokenSelector
          isOpen={showToTokenSelector}
          onClose={() => setShowToTokenSelector(false)}
          onSelect={setToToken}
          selectedToken={toToken}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SwapSettings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          slippage={slippage}
          onSlippageChange={setSlippage}
          deadline={deadline}
          onDeadlineChange={setDeadline}
        />
      )}

      {/* Wallet Selection Modal */}
      <WalletSelectionModal 
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onSelectWallet={connectSpecificWallet}
      />
    </div>
  );
} 