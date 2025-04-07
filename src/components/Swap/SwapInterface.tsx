"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, Settings, Info } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

export function SwapInterface() {
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [showSettings, setShowSettings] = useState<boolean>(false);

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
            <span className="text-sm text-[#B2B5BE]">Balance: 0.00</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl text-white outline-none"
            />
            <button className="flex items-center gap-2 px-3 py-2 bg-[#363A45]/20 rounded-lg hover:bg-[#363A45]/30 transition-colors">
              <span className="text-white">Select</span>
              <span className="text-sm text-[#B2B5BE]">▼</span>
            </button>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button className="p-2 rounded-lg bg-[#252832] border border-[#363A45]/30 hover:bg-[#363A45]/20 transition-colors">
            <ArrowDownUp className="w-5 h-5 text-[#85bb65]" />
          </button>
        </div>

        {/* To Token Input */}
        <div className="bg-[#1A1D24] rounded-lg p-4 mt-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#B2B5BE]">To</span>
            <span className="text-sm text-[#B2B5BE]">Balance: 0.00</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              placeholder="0.0"
              className="w-full bg-transparent text-2xl text-white outline-none"
            />
            <button className="flex items-center gap-2 px-3 py-2 bg-[#363A45]/20 rounded-lg hover:bg-[#363A45]/30 transition-colors">
              <span className="text-white">Select</span>
              <span className="text-sm text-[#B2B5BE]">▼</span>
            </button>
          </div>
        </div>

        {/* Swap Button */}
        <button className="w-full mt-4 px-4 py-3 bg-[#85bb65] hover:bg-[#5d8f3d] text-white rounded-lg font-medium transition-colors">
          Connect Wallet
        </button>
      </div>
    </div>
  );
} 