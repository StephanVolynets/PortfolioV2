"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Image from 'next/image';

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken?: Token | null;
}

export function TokenSelector({ isOpen, onClose, onSelect, selectedToken }: TokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Example token list - replace with actual token list from your preferred source
  const tokens: Token[] = [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      logoURI: '/tokens/eth.png'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
      logoURI: '/tokens/usdc.png'
    },
    // Add more tokens as needed
  ];

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#252832] rounded-xl shadow-xl border border-[#363A45]/30 z-50"
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Select Token</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#363A45]/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#85bb65]" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B2B5BE]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or paste address"
                  className="w-full bg-[#1A1D24] text-white pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#85bb65]/20"
                />
              </div>

              {/* Token List */}
              <div className="max-h-[300px] overflow-y-auto">
                {filteredTokens.map((token) => (
                  <button
                    key={token.address}
                    onClick={() => {
                      onSelect(token);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-[#363A45]/20 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#363A45]/30 overflow-hidden">
                      <Image
                        src={token.logoURI}
                        alt={token.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-white font-medium">{token.symbol}</span>
                      <span className="text-sm text-[#B2B5BE]">{token.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 