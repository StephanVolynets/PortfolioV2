export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
  chainId: number;
}

// Base network tokens (Chain ID: 8453)
export const baseTokens: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // Native ETH representation
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/0xProject/protocol/development/contracts/integrations/test/tokens/eth.png',
    chainId: 8453
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/0xProject/protocol/development/contracts/integrations/test/tokens/usdc.png',
    chainId: 8453
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/0xProject/protocol/development/contracts/integrations/test/tokens/dai.png',
    chainId: 8453
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/0xProject/protocol/development/contracts/integrations/test/tokens/usdt.png',
    chainId: 8453
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    logoURI: 'https://raw.githubusercontent.com/0xProject/protocol/development/contracts/integrations/test/tokens/weth.png',
    chainId: 8453
  },
  {
    symbol: 'LINK',
    name: 'ChainLink Token',
    address: '0x88D2dbBb3BFe7dBF6eaBD5A7006BE3F9C0e094D8',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
    chainId: 8453
  }
];

// Returns tokens for the specified chain ID
export function getTokensForChain(chainId: number): Token[] {
  switch (chainId) {
    case 8453:
      return baseTokens;
    default:
      return baseTokens; // Fallback to Base tokens
  }
}

// Utility function to find a token by address
export function findTokenByAddress(address: string, chainId: number): Token | undefined {
  return getTokensForChain(chainId).find(
    token => token.address.toLowerCase() === address.toLowerCase()
  );
}

// Utility function to find a token by symbol
export function findTokenBySymbol(symbol: string, chainId: number): Token | undefined {
  return getTokensForChain(chainId).find(
    token => token.symbol.toLowerCase() === symbol.toLowerCase()
  );
} 