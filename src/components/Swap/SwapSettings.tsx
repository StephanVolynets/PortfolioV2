"use client";

import React from 'react';
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
  const commonSlippageValues = [0.1, 0.5, 1.0];

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
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-white font-medium">Slippage Tolerance</h4>
                  <Info className="w-4 h-4 text-[#B2B5BE]" />
                </div>
                <div className="flex gap-2 mb-2">
                  {commonSlippageValues.map((value) => (
                    <button
                      key={value}
                      onClick={() => onSlippageChange(value)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        slippage === value
                          ? 'bg-[#85bb65] text-white'
                          : 'bg-[#1A1D24] text-[#B2B5BE] hover:bg-[#363A45]/20'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                  <div className="relative flex-1">
                    <input
                      type="number"
                      value={slippage}
                      onChange={(e) => onSlippageChange(parseFloat(e.target.value))}
                      className="w-full px-4 py-2 bg-[#1A1D24] text-white rounded-lg outline-none"
                      placeholder="Custom"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B2B5BE]">%</span>
                  </div>
                </div>
              </div>

              {/* Transaction Deadline */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-white font-medium">Transaction Deadline</h4>
                  <Info className="w-4 h-4 text-[#B2B5BE]" />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={deadline}
                    onChange={(e) => onDeadlineChange(parseInt(e.target.value))}
                    className="w-full px-4 py-2 bg-[#1A1D24] text-white rounded-lg outline-none"
                    placeholder="20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B2B5BE]">minutes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 