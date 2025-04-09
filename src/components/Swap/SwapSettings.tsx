"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';

interface SwapSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  slippage: number;
  onSlippageChange: (value: number) => void;
  deadline: number;
  onDeadlineChange: (value: number) => void;
}

export function SwapSettings({
  isOpen,
  onClose,
  slippage,
  onSlippageChange,
  deadline,
  onDeadlineChange
}: SwapSettingsProps) {
  const [customSlippage, setCustomSlippage] = useState<string>('');
  const [customDeadline, setCustomDeadline] = useState<string>('');

  const handleSlippageChange = (value: number) => {
    setCustomSlippage('');
    onSlippageChange(value);
  };

  const handleCustomSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setCustomSlippage(value);
    
    if (value && !isNaN(Number(value))) {
      onSlippageChange(Number(value));
    }
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomDeadline(value);
    
    if (value && !isNaN(Number(value))) {
      onDeadlineChange(Number(value));
    }
  };

  // Common slippage presets
  const slippagePresets = [0.1, 0.5, 1.0];

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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Transaction Settings</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#363A45]/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#85bb65]" />
                </button>
              </div>

              {/* Slippage Tolerance */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <h4 className="text-md font-medium text-white">Slippage Tolerance</h4>
                  <Info className="w-4 h-4 ml-1 text-[#B2B5BE]" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {slippagePresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleSlippageChange(preset)}
                      className={`px-3 py-2 rounded-lg font-medium text-sm ${
                        slippage === preset && customSlippage === ''
                          ? 'bg-[#85bb65] text-white'
                          : 'bg-[#1A1D24] text-[#B2B5BE] hover:bg-[#363A45]/20'
                      }`}
                    >
                      {preset.toFixed(1)}%
                    </button>
                  ))}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={customSlippage}
                      onChange={handleCustomSlippageChange}
                      placeholder={slippage.toString()}
                      className="w-full bg-[#1A1D24] text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#85bb65]/20"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B2B5BE]">
                      %
                    </span>
                  </div>
                </div>
                {slippage > 3 && (
                  <p className="text-yellow-500 text-sm">
                    Warning: High slippage tolerance. Your transaction may be frontrun.
                  </p>
                )}
              </div>

              {/* Transaction Deadline */}
              <div>
                <div className="flex items-center mb-2">
                  <h4 className="text-md font-medium text-white">Transaction Deadline</h4>
                  <Info className="w-4 h-4 ml-1 text-[#B2B5BE]" />
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={customDeadline || deadline.toString()}
                    onChange={handleDeadlineChange}
                    className="w-20 bg-[#1A1D24] text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#85bb65]/20 mr-2"
                  />
                  <span className="text-[#B2B5BE]">minutes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 