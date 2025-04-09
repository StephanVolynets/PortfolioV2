
# Portfolio with Blockchain Integration

[![Netlify Status](https://api.netlify.com/api/v1/badges/73d5f701-8479-41d2-90a2-78a5976fbf38/deploy-status)](https://app.netlify.com/sites/stephan-volynets/deploys)

> A modern portfolio website showcasing both traditional web development skills and blockchain implementations. The site features a responsive design, smooth animations, and interactive Web3 components including a full-featured token swap interface powered by the 0x Protocol and a Solana-based donation widget.


<p>
   <img src="https://github.com/user-attachments/assets/d98bc0c5-108a-422c-9674-a9e0ad203038" alt="Desktop Browser" style="width:100% height="700">
        <br>

</p>

 <p align="center">
    <img src="https://github.com/user-attachments/assets/0b221bdd-a46d-4926-b429-f29e12a51fe1" alt="Desktop Browser"  style="width:100% height="700">
     
 </p>


 <p align="center">
    <img src="https://github.com/user-attachments/assets/853661c2-9dd6-4ffb-b26b-70d431f01913" alt="Desktop Browser"  style="width:65% height=85%">
     
 </p>

## Table of Contents

- [Portfolio with Blockchain Integration](#portfolio-with-blockchain-integration)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Blockchain/Web3](#blockchainweb3)
  - [Blockchain Components](#blockchain-components)
    - [Token Swap Interface](#token-swap-interface)
    - [Solana Donation Widget](#solana-donation-widget)
    - [Wallet Connection](#wallet-connection)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Project Structure](#project-structure)
  - [External APIs](#external-apis)
  - [License](#license)
- [Designed and developed with ❤️](#designed-and-developed-with-️)

## Features

- **Responsive Design**: Mobile-friendly interface that adapts to all screen sizes
- **Animated UI**: Smooth transitions and animations powered by Framer Motion
- **Web3 Integration**: Connect multiple wallets including MetaMask, Phantom, and Coinbase Wallet
- **Token Swap**: Execute token swaps on Base network using the 0x Protocol
- **Dynamic Content**: Sections for education, technical skills, and experience are dynamically rendered
- **Dark Mode**: Sleek dark-themed UI for optimal viewing

## Technologies Used

### Frontend
- **React**: Component-based UI development
- **TypeScript**: Type-safe JavaScript for robust code
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions

### Blockchain/Web3
- **0x Protocol API**: Decentralized exchange aggregator for best swap rates
- **Solana Web3.js**: Core library for Solana blockchain interaction
- **SPL Token**: Solana Program Library for token operations
- **Web3 Providers**: Support for multiple wallet providers
- **Ethereum/Base**: Smart contract interactions on Base network
- **Solana Wallet Adapter**: Unified wallet connection interface for Solana

## Blockchain Components

### Token Swap Interface

The portfolio includes a fully-functional DEX interface that allows users to:

- Connect their preferred Web3 wallet
- Select from a list of popular tokens on Base network
- Get real-time price quotes with gas estimates
- Configure slippage tolerance and transaction settings
- Execute token swaps with transaction confirmation

The swap interface leverages the 0x Protocol API to aggregate liquidity from multiple DEXes, ensuring users get the best possible rates for their swaps.

### Solana Donation Widget

The portfolio features a comprehensive Solana-based donation widget that includes:

- **Direct SOL Donations**: Send SOL directly to a specified recipient address
- **QR Code Support**: Generate scannable QR codes for mobile wallet donations
- **Transaction Priority**: Choose between low, medium, and high priority fees
- **Message Attachment**: Include optional messages with donations using Solana's Memo program
- **Real-time Fee Estimation**: Display estimated transaction fees before sending
- **Transaction History**: View recent donation transactions with links to block explorer
- **Network Statistics**: Show current Solana network stats including SOL price and slot
- **Analytics Dashboard**: Track total donations, unique donors, and transaction counts
- **USD Conversion**: Automatically convert SOL amounts to USD using CoinGecko API

Future plans include USDC token support alongside native SOL donations.

### Wallet Connection

The application includes multiple wallet connection systems:

- **Ethereum Wallet Selector**: Custom modal for connecting to MetaMask, Phantom, or Coinbase Wallet for Base network operations
- **Solana Wallet Adapter**: Integration with the official Solana wallet adapter for SOL donations
- **Multi-Chain Support**: Seamless switching between Ethereum-compatible and Solana-based features

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/PortfolioV2-1.git
   cd PortfolioV2-1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_ZRX_API_KEY=your_0x_api_key
   ```

## Running Locally

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify
npm run deploy
```

Access the development server at `http://localhost:5173`

## Project Structure


```
PortfolioV2-1/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Swap/        # Token swap components
│   │   │   ├── SwapInterface.tsx   # Main swap UI
│   │   │   ├── TokenSelector.tsx   # Token selection modal
│   │   │   └── SwapSettings.tsx    # Slippage settings
│   │   ├── DonationWidget.tsx   # Solana donation component
│   │   └── WalletProvider.tsx   # Wallet connection provider
│   ├── lib/
│   │   ├── swapService.ts   # 0x API integration
│   │   └── tokens.ts        # Token definitions
│   ├── App.tsx          # Main application component
│   └── index.tsx        # Application entry point
├── .env                 # Environment variables (create this file)
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## External APIs

- **0x Protocol API**: Used for token swaps (https://docs.0x.org/0x-swap-api/introduction)
- **Solana Web3.js**: Core Solana blockchain interaction (https://docs.solana.com/developing/clients/javascript-api)
- **CoinGecko API**: Used for cryptocurrency price data
- **Base Network**: Ethereum L2 for blockchain transactions
- **Solana RPC**: Network interaction for the donation widget

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

# Designed and developed with ❤️

