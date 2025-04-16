"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Github, Linkedin, TrendingUp, Code2, Activity, ChevronUp, ChevronDown, Star, Maximize2, Volume2 } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationControls, AnimatePresence } from 'framer-motion';
import { TypewriterEffect } from './ui/typewriter-effect';
import { ColorfulText } from './ui/colorful-text';
import { cn } from '@/lib/utils';
import { SparklesCore } from './ui/sparkles';

interface HeroProps {
  theme: string;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [currentPrice, setCurrentPrice] = useState(84.29);
  const [priceChange, setPriceChange] = useState(-0.13);
  const [timeframe, setTimeframe] = useState('1D');
  const [volume, setVolume] = useState(1243567);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState({ price: 0, time: '' });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isRaining, setIsRaining] = useState(false);
  const [moneyBills, setMoneyBills] = useState<Array<{ id: number; x: number; rotation: number }>>([]);

  // Generate more frequent candlestick data
  const generateCandlestickData = (count: number) => {
    let candles = [];
    let volumes = [];
    let basePrice = 80;
    let lastClose = basePrice;
    let lastVolume = 1000000;
    
    for (let i = 0; i < count; i++) {
      const volatility = 2.5; // Increased volatility
      const trend = Math.sin(i / 10) * 0.5; // Oscillating trend
      
      // Generate more volatile OHLC data
      const range = Math.random() * volatility;
      const open = lastClose;
      const close = open + (Math.random() - 0.5) * range + trend;
      const high = Math.max(open, close) + Math.random() * range * 1.5;
      const low = Math.min(open, close) - Math.random() * range * 1.5;
      
      lastClose = close;
      
      // More volatile volume
      lastVolume = Math.max(200000, lastVolume + (Math.random() - 0.5) * 500000);
      
      const time = new Date();
      time.setMinutes(time.getMinutes() - (count - i));
      
      candles.push({
        x: (i / (count - 1)) * 100,
        open,
        high,
        low,
        close,
        volume: lastVolume,
        time: time.toLocaleTimeString()
      });
      
      volumes.push({ x: (i / (count - 1)) * 100, y: lastVolume / 2000000 });
    }
    
    return { candles, volumes };
  };

  const { candles, volumes } = generateCandlestickData(100); // Increased number of candles

  // Render candlestick
  const renderCandlestick = (candle: any, index: number) => {
    const candleWidth = 0.8; // Width of each candle
    const x = candle.x;
    const isGreen = candle.close >= candle.open;
    
    return (
      <g key={index} opacity={0.8}>
        {/* Wick */}
        <line
          x1={x}
          y1={100 - candle.high}
          x2={x}
          y2={100 - candle.low}
          stroke={isGreen ? "#85bb65" : "#ff5555"}
          strokeWidth="0.2"
        />
        {/* Body */}
        <rect
          x={x - candleWidth / 2}
          y={100 - Math.max(candle.open, candle.close)}
          width={candleWidth}
          height={Math.abs(candle.close - candle.open)}
          fill={isGreen ? "#85bb65" : "#ff5555"}
          fillOpacity={0.8}
        />
      </g>
    );
  };

  // Handle chart hover interactions
  const handleChartHover = (e: React.MouseEvent) => {
    if (!chartRef.current) return;
    
    const rect = chartRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const closestPoint = candles.reduce((prev, curr) => 
      Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev
    );
    
    setTooltipPosition({ 
      x: (closestPoint.x / 100) * rect.width,
      y: ((100 - Math.max(closestPoint.open, closestPoint.close)) / 100) * rect.height
    });
    setTooltipData({ 
      price: closestPoint.close,
      time: closestPoint.time
    });
    setShowTooltip(true);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.5;
      setCurrentPrice(prev => {
        const newPrice = +(prev + change).toFixed(2);
        setPriceChange(+(change * 2).toFixed(2));
        setVolume(prev => Math.max(100000, prev + (Math.random() - 0.5) * 100000));
        return newPrice;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      pathLength: 1,
      transition: { duration: 2, ease: "easeInOut" }
    });
  }, [controls]);

  const timeframes = ['1H', '1D', '1W', '1M', '1Y'];
  const indicators = ['RSI', 'MACD', 'VOL'];

  // Function to generate money bills
  const generateBills = () => {
    const newBills = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      rotation: Math.random() * 360
    }));
    setMoneyBills(newBills);
    setIsRaining(true);
    setTimeout(() => setIsRaining(false), 3000);
  };

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-[#1A1D24]">
      {/* Money Rain Animation */}
      <AnimatePresence>
        {isRaining && moneyBills.map((bill) => (
          <motion.div
            key={bill.id}
            initial={{ 
              y: -100, 
              x: `${bill.x}vw`, 
              rotate: bill.rotation,
              scale: 1
            }}
            animate={{ 
              y: '120vh',
              x: [`${bill.x}vw`, `${bill.x + (Math.random() * 20 - 10)}vw`],
              rotate: [bill.rotation, bill.rotation + (Math.random() * 720 - 360)],
              scale: [1, Math.random() * 0.5 + 0.75]
            }}
            transition={{ 
              duration: Math.random() * 2 + 4, // Random duration between 4-6 seconds
              ease: [0.1, 0.4, 0.8, 0.9], // Custom ease for floating effect
              x: {
                duration: Math.random() * 2 + 4,
                repeat: 3,
                repeatType: "mirror"
              },
              rotate: {
                duration: Math.random() * 2 + 4,
                repeat: 2,
                repeatType: "mirror"
              }
            }}
            className="fixed z-50 pointer-events-none"
          >
            <motion.div
              animate={{
                y: [-5, 5, -5],
                x: [-5, 5, -5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            >
              <div 
                className="w-16 h-8 bg-[#85bb65] rounded shadow-lg relative overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)',
                  border: '1px solid rgba(133, 187, 101, 0.5)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs font-mono">$100</div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Background with stronger blur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:16px_16px]" />
        <motion.div 
          className="absolute inset-0 bg-gradient-radial from-[#85bb65]/5 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1D24]/60 via-transparent to-[#1A1D24]/80" />
      </div>

      <div className="absolute inset-0 flex items-start justify-center px-4 sm:px-6 pt-12 sm:pt-24">
        <div className="w-full max-w-7xl mx-auto">
          {/* Reduced size header - responsive version */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 px-3 sm:px-4 py-2 bg-[#252832]/80 rounded-lg backdrop-blur-md border border-[#363A45]/50">
            <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-0">
              <motion.div
                className="flex items-center gap-1 sm:gap-2 text-[#85bb65]"
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-mono text-xs sm:text-sm font-medium">DEV/SKILLS</span>
                <Star className="w-2 h-2 sm:w-3 sm:h-3 text-[#85bb65]" />
              </motion.div>
              <motion.div 
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-[#2A2E39]/60 border border-[#85bb65]/20"
              >
                <span className="text-[#85bb65] font-mono text-xs sm:text-sm">${currentPrice}</span>
                <span className={cn(
                  "flex items-center gap-1 font-mono text-[10px] sm:text-xs",
                  priceChange >= 0 ? "text-[#85bb65]" : "text-red-500"
                )}>
                  {priceChange >= 0 ? <ChevronUp className="w-2 h-2 sm:w-3 sm:h-3" /> : <ChevronDown className="w-2 h-2 sm:w-3 sm:h-3" />}
                  {Math.abs(priceChange)}%
                </span>
              </motion.div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-normal gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2 border-r border-[#363A45]/50 pr-2 sm:pr-4">
                {indicators.map((indicator) => (
                  <span
                    key={indicator}
                    className="text-[10px] sm:text-xs font-mono text-[#B2B5BE]/50"
                  >
                    {indicator}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-px sm:gap-1">
                {timeframes.map((tf) => (
                  <span
                    key={tf}
                    className={cn(
                      "px-1 sm:px-2 py-1 text-[10px] sm:text-xs font-mono cursor-pointer transition-colors",
                      timeframe === tf 
                        ? "text-white bg-[#85bb65] rounded-md" 
                        : "text-[#B2B5BE]/50 hover:text-[#B2B5BE]"
                    )}
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Chart area with name and sparkles - responsive version */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-[#252832]/50 rounded-xl p-4 sm:p-8 backdrop-blur-xl border border-[#363A45]/30 shadow-2xl overflow-hidden">
            <div ref={chartRef} className="absolute inset-4 sm:inset-6">
              {/* Enhanced chart background with faint grid numbers */}
              <div className="absolute inset-0 backdrop-blur-[8px]">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Price axis labels */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <g key={`price-${i}`} className="text-[#363A45]/20">
                      <text
                        x="0"
                        y={i * 20}
                        className="text-[4px] fill-current font-mono"
                        style={{ transform: 'translateY(1px)' }}
                      >
                        ${(100 - i * 20).toFixed(2)}
                      </text>
                    </g>
                  ))}

                  {/* Time axis labels */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <g key={`time-${i}`} className="text-[#363A45]/20">
                      <text
                        x={i * 25}
                        y="100"
                        className="text-[4px] fill-current font-mono"
                        style={{ transform: 'translateY(4px)' }}
                      >
                        {new Date().getHours() - (4 - i)}:00
                      </text>
                    </g>
                  ))}

                  {/* Grid lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <g key={`grid-${i}`}>
                      <line
                        x1="0"
                        y1={5 * i}
                        x2="100"
                        y2={5 * i}
                        stroke="#363A45"
                        strokeWidth="0.1"
                        strokeDasharray="0.5 1"
                        opacity="0.1"
                      />
                      <line
                        x1={5 * i}
                        y1="0"
                        x2={5 * i}
                        y2="100"
                        stroke="#363A45"
                        strokeWidth="0.1"
                        strokeDasharray="0.5 1"
                        opacity="0.1"
                      />
                    </g>
                  ))}

                  {/* Busier volume bars */}
                  {volumes.map((vol, i) => (
                    <rect
                      key={i}
                      x={vol.x - 0.2}
                      y={100 - vol.y * 0.3}
                      width={0.4}
                      height={vol.y * 0.3}
                      fill="url(#volumeGradient)"
                      opacity="0.1"
                    />
                  ))}

                  {/* More frequent candlesticks */}
                  {candles.map((candle, i) => renderCandlestick(candle, i))}

                  <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#85bb65" />
                      <stop offset="100%" stopColor="#85bb65" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Content overlay with sparkles - responsive version */}
              <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 sm:pt-24">
                {/* Name with sparkles - adjusted position */}
                <div className="relative w-full h-20 sm:h-32">
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center text-white relative z-20 translate-y-6 sm:translate-y-8">
                    Stephan Volynets
                  </h1>
                  
                  {/* Centered gradients with responsive widths */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-gradient-to-r from-transparent via-[#85bb65] to-transparent h-[2px] sm:h-[3px] w-[90%] sm:w-[800px] blur-sm" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 bg-gradient-to-r from-transparent via-[#85bb65] to-transparent h-[1px] sm:h-[1.5px] w-[90%] sm:w-[800px]" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-2px] bg-gradient-to-r from-transparent via-[#85bb65] to-transparent h-[4px] sm:h-[6px] w-[60%] sm:w-[300px] blur-sm" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-2px] bg-gradient-to-r from-transparent via-[#85bb65] to-transparent h-[1px] sm:h-[1.5px] w-[60%] sm:w-[300px]" />

                  {/* Sparkles */}
                  <SparklesCore
                    background="transparent"
                    minSize={0.3}
                    maxSize={0.8}
                    particleDensity={800}
                    className="w-full h-full"
                    particleColor="#85bb65"
                  />

                  {/* Radial Gradient */}
                  <div className="absolute inset-0 w-full h-full bg-[#252832]/50 [mask-image:radial-gradient(250px_150px_at_top,transparent_20%,white)]"></div>
                </div>

                {/* Info box with gradient border - responsive version */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative p-3 sm:p-8 rounded-xl overflow-hidden mt-4 sm:mt-8 mx-2 sm:mx-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#85bb65]/20 via-[#85bb65]/10 to-[#85bb65]/20 backdrop-blur-sm rounded-xl" />
                  <div className="absolute inset-[1px] bg-[#252832]/90 rounded-xl" />
                  
                  <div className="relative space-y-2 sm:space-y-4 text-sm sm:text-xl md:text-2xl font-light">
                    <p className="text-[#B2B5BE] flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                      <span>📚</span> Studying Computer and Data Science @ 
                      <span className="relative">
                        Cornell University
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#85bb65]/40"></span>
                      </span>
                    </p>
                    <p className="text-[#B2B5BE] flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                      <span>⛓️</span> Consulting Team Member @ 
                      <span className="relative">
                        Cornell Blockchain
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#85bb65]/40"></span>
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social links - responsive version */}
            <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 flex gap-2 sm:gap-4">
              {[
                { href: "https://github.com/StephanVolynets", Icon: Github },
                { href: "https://linkedin.com/in-stephan-volynets", Icon: Linkedin }
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 rounded-lg bg-[#2A2E39]/60 hover:bg-[#85bb65]/20 border border-[#85bb65]/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#85bb65]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA buttons - responsive version */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          >
            <motion.a
              href="#projects"
              className="group px-4 sm:px-6 py-2 sm:py-3 bg-[#85bb65] rounded-lg overflow-hidden flex items-center justify-center sm:justify-start gap-2 hover:bg-[#5d8f3d] transition-all shadow-lg shadow-[#85bb65]/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="font-medium text-base sm:text-lg text-white">View Projects</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform text-white" />
            </motion.a>

            <motion.button
              onClick={generateBills}
              className="group px-4 sm:px-6 py-2 sm:py-3 bg-[#85bb65] rounded-lg overflow-hidden flex items-center justify-center gap-2 hover:bg-[#5d8f3d] transition-all shadow-lg shadow-[#85bb65]/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium text-base sm:text-lg text-white">Make it Rain</span>
              <span className="text-xl sm:text-2xl">💸</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
