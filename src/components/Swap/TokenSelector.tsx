"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { Token, baseTokens } from '@/lib/tokens';

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  selectedToken?: Token | null;
  chainId?: number;
}

export function TokenSelector({ isOpen, onClose, onSelect, selectedToken, chainId = 8453 }: TokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use tokens from our token list
  const tokens = baseTokens;

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-[#252832] rounded-xl shadow-xl border border-[#363A45]/30 z-50 relative"
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
                {filteredTokens.length > 0 ? (
                  filteredTokens.map((token) => (
                    <button
                      key={token.address}
                      onClick={() => {
                        onSelect(token);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-[#363A45]/20 rounded-lg transition-colors ${
                        selectedToken?.address === token.address ? 'bg-[#363A45]/30' : ''
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#363A45]/30 overflow-hidden flex items-center justify-center">
                        {token.logoURI ? (
                          <img
                            src={token.logoURI}
                            alt={token.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-white text-xs">{token.symbol.slice(0, 3)}</span>
                        )}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-white font-medium">{token.symbol}</span>
                        <span className="text-sm text-[#B2B5BE]">{token.name}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4 text-[#B2B5BE]">
                    No tokens found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 