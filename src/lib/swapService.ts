import { Token } from './tokens';

// Use Base network API for 0x swap
const ZRX_API_URL = 'https://base.api.0x.org/swap/v1';
// 0x API key
const ZRX_API_KEY = '11fd45cd-f86c-4357-8ddb-707acf40a5cc';

interface PriceResponse {
  price: string;
  estimatedGas: string;
  estimatedPriceImpact: string;
  value: string;
  gasPrice: string;
  sellTokenToEthRate: string;
  buyTokenToEthRate: string;
  sellAmount: string;
  buyAmount: string;
  allowanceTarget: string;
  sources: any[];
}

interface QuoteResponse extends PriceResponse {
  data: string; // Transaction data
  to: string;   // Contract address to send the transaction to
  gas: string;
}

interface SwapParams {
  sellToken: string;
  buyToken: string;
  sellAmount?: string;
  buyAmount?: string;
  slippagePercentage?: string;
  takerAddress?: string;
}

/**
 * Fetches price data from the 0x API
 */
export async function getPrice(params: SwapParams): Promise<PriceResponse> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });
  
  const response = await fetch(`${ZRX_API_URL}/price?${searchParams.toString()}`, {
    headers: {
      'Accept': 'application/json',
      '0x-api-key': ZRX_API_KEY,
      '0x-version': 'v2'
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch price: ${response.status} ${errorText}`);
  }
  
  return response.json();
}

/**
 * Fetches a firm quote from the 0x API
 */
export async function getQuote(params: SwapParams): Promise<QuoteResponse> {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.append(key, value);
  });
  
  const response = await fetch(`${ZRX_API_URL}/quote?${searchParams.toString()}`, {
    headers: {
      'Accept': 'application/json',
      '0x-api-key': ZRX_API_KEY,
      '0x-version': 'v2'
    }
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch quote: ${response.status} ${errorText}`);
  }
  
  return response.json();
}

/**
 * Formats a number for display
 */
export function formatNumber(value: string | number, decimals: number = 4): string {
  const num = Number(value);
  if (isNaN(num)) return '0';
  
  // Handle small numbers
  if (num < 0.00001) {
    return num.toExponential(decimals);
  }
  
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/**
 * Formats token amount based on its decimals
 */
export function formatTokenAmount(amount: string, decimals: number): string {
  const value = BigInt(amount) / BigInt(10 ** decimals);
  return value.toString();
}

/**
 * Calculates the amount in USD
 */
export function calculateUsdValue(amount: string, tokenPrice: number, decimals: number): number {
  if (!amount || !tokenPrice) return 0;
  
  const value = Number(amount) / (10 ** decimals);
  return value * tokenPrice;
} 