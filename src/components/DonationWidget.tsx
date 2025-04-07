import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  ParsedTransactionWithMeta,
  ConfirmedSignatureInfo,
  Connection,
  TransactionInstruction,
  ComputeBudgetProgram
} from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import '@solana/wallet-adapter-react-ui/styles.css';

interface DonationWidgetProps {
  recipientAddress: string;
  theme: string;
}

interface TransactionHistory {
  signature: string;
  amount: number;
  timestamp: number;
}

interface NetworkStats {
  currentSlot: number;
  averageBlockTime: number;
  solPrice: number;
  recentFees: number[];
}

const PRIORITY_FEES = {
  low: 1,
  medium: 5,
  high: 10
};

const DonationWidget: React.FC<DonationWidgetProps> = ({ recipientAddress, theme }) => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalDonations, setTotalDonations] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
  const [donorCount, setDonorCount] = useState(0);
  const [networkStats, setNetworkStats] = useState<NetworkStats | null>(null);
  const [priorityFee, setPriorityFee] = useState<keyof typeof PRIORITY_FEES>('medium');
  const [donationType, setDonationType] = useState<'sol' | 'usdc'>('sol');
  const [message, setMessage] = useState('');
  const [estimatedFee, setEstimatedFee] = useState<number | null>(null);

  // Fetch network stats
  useEffect(() => {
    const fetchNetworkStats = async () => {
      if (!connection) return;
      try {
        const [slot, blockTime] = await Promise.all([
          connection.getSlot(),
          connection.getRecentPerformanceSamples(1)
        ]);

        // Fetch SOL price from CoinGecko
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        
        setNetworkStats({
          currentSlot: slot,
          averageBlockTime: blockTime[0]?.samplePeriodSecs || 0,
          solPrice: data.solana.usd,
          recentFees: []
        });
      } catch (error) {
        console.error('Error fetching network stats:', error);
      }
    };

    fetchNetworkStats();
    const interval = setInterval(fetchNetworkStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [connection]);

  // Fetch transaction history and analytics
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      if (!connection || !recipientAddress) return;

      try {
        const recipientPubkey = new PublicKey(recipientAddress);
        const signatures = await connection.getSignaturesForAddress(recipientPubkey, { limit: 10 });
        
        const history = await Promise.all(
          signatures.map(async (sig: ConfirmedSignatureInfo) => {
            const tx = await connection.getParsedTransaction(sig.signature);
            if (!tx?.meta?.postBalances) return null;

            const amount = tx.meta.postBalances[0] - tx.meta.preBalances[0];
            return {
              signature: sig.signature,
              amount: Math.abs(amount) / LAMPORTS_PER_SOL,
              timestamp: sig.blockTime || 0
            };
          })
        );

        const validHistory = history.filter((tx): tx is TransactionHistory => tx !== null);
        setTransactionHistory(validHistory);
        setTotalDonations(validHistory.reduce((acc, tx) => acc + tx.amount, 0));
        setDonorCount(new Set(validHistory.map(tx => tx.signature)).size);
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    fetchTransactionHistory();
    const interval = setInterval(fetchTransactionHistory, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [connection, recipientAddress]);

  // Add this new useEffect for fee estimation
  useEffect(() => {
    const estimateFee = async () => {
      if (!connection || !publicKey || !amount) return;
      
      try {
        const tx = new Transaction();
        
        // Add priority fee instruction if needed
        if (priorityFee !== 'low') {
          tx.add(
            ComputeBudgetProgram.setComputeUnitPrice({
              microLamports: PRIORITY_FEES[priorityFee] * 1_000_000
            })
          );
        }

        // Add transfer instruction
        tx.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(recipientAddress),
            lamports: Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL),
          })
        );

        const latestBlockhash = await connection.getLatestBlockhash('finalized');
        tx.recentBlockhash = latestBlockhash.blockhash;
        tx.feePayer = publicKey;

        const fee = await tx.getEstimatedFee(connection);
        setEstimatedFee(fee ? fee / LAMPORTS_PER_SOL : null);
      } catch (error) {
        console.error('Error estimating fee:', error);
        setEstimatedFee(null);
      }
    };

    estimateFee();
  }, [connection, publicKey, amount, priorityFee, recipientAddress]);

  const handleDonate = useCallback(async () => {
    if (!publicKey || !amount || !connection) {
      toast.error('Please connect your wallet and enter an amount');
      return;
    }

    try {
      setIsLoading(true);
      const recipientPubkey = new PublicKey(recipientAddress);
      const amountInLamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);

      if (isNaN(amountInLamports)) {
        throw new Error('Invalid amount');
      }

      // Get latest blockhash and verify connection
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');
      if (!blockhash) {
        throw new Error('Failed to get recent blockhash');
      }

      // Check wallet balance before transaction
      const balance = await connection.getBalance(publicKey, 'confirmed');
      
      // Create transaction for fee estimation
      const preflightTx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: amountInLamports,
        })
      );
      preflightTx.recentBlockhash = blockhash;
      preflightTx.feePayer = publicKey;

      // Estimate fee
      const fees = await preflightTx.getEstimatedFee(connection);
      if (!fees) {
        throw new Error('Failed to estimate fees');
      }

      if (balance < (amountInLamports + fees)) {
        throw new Error(`Insufficient balance. Required: ${((amountInLamports + fees) / LAMPORTS_PER_SOL).toFixed(4)} SOL`);
      }

      // Build actual transaction
      const transaction = new Transaction();
      
      // Add priority fee instruction if needed
      if (priorityFee !== 'low') {
        transaction.add(
          ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: PRIORITY_FEES[priorityFee] * 1_000_000
          })
        );
      }

      // Add transfer instruction
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: amountInLamports,
        })
      );

      // Add memo if message exists
      if (message) {
        const messageData = Buffer.from(message, 'utf-8');
        transaction.add(
          new TransactionInstruction({
            keys: [],
            programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
            data: messageData,
          })
        );
      }

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
        maxRetries: 5
      });
      
      toast.loading('Confirming transaction...');
      
      // Wait for confirmation with timeout
      const status = await Promise.race([
        connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Transaction confirmation timeout')), 30000)
        )
      ]);

      if (typeof status === 'object' && status.value.err) {
        throw new Error('Transaction failed');
      }

      toast.success('Donation sent successfully!');
      setAmount('');
      setMessage('');
    } catch (error) {
      console.error('Error sending donation:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send donation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, amount, connection, recipientAddress, sendTransaction, priorityFee, message]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const getUsdValue = (sol: number) => {
    if (!networkStats?.solPrice) return null;
    return (sol * networkStats.solPrice).toFixed(2);
  };

  return (
    <Card className={`p-6 max-w-md mx-auto ${theme === 'dark' ? 'bg-highlight text-white' : 'bg-white text-gray-900'}`}>
      <h3 className="text-xl font-bold mb-4 text-center">Support My Caffeine Habit</h3>
      
      {/* Network Stats */}
      {networkStats && (
        <div className="mb-4 text-xs text-center opacity-70">
          <p>Current Slot: {networkStats.currentSlot.toLocaleString()}</p>
          <p>SOL Price: ${networkStats.solPrice.toFixed(2)}</p>
        </div>
      )}

      {/* QR Code */}
      <div className="mb-6 flex justify-center">
        <QRCodeSVG
          value={`solana:${recipientAddress}`}
          size={128}
          level="H"
          includeMargin
          className="p-2 bg-white rounded"
        />
      </div>

      {/* Analytics Section */}
      <div className="mb-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm opacity-70">Total Donated</p>
          <p className="font-bold">{totalDonations.toFixed(2)} SOL</p>
          {getUsdValue(totalDonations) && (
            <p className="text-xs opacity-70">${getUsdValue(totalDonations)}</p>
          )}
        </div>
        <div>
          <p className="text-sm opacity-70">Donors</p>
          <p className="font-bold">{donorCount}</p>
        </div>
        <div>
          <p className="text-sm opacity-70">Transactions</p>
          <p className="font-bold">{transactionHistory.length}</p>
        </div>
      </div>

      <Tabs defaultValue="sol" className="w-full" onValueChange={(value: string) => setDonationType(value as 'sol' | 'usdc')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sol">SOL</TabsTrigger>
          <TabsTrigger value="usdc">USDC</TabsTrigger>
        </TabsList>
        <TabsContent value="sol" className="space-y-4">
          <div className="flex justify-center">
            <WalletMultiButton className="wallet-adapter-button" />
          </div>
          {publicKey && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Amount (SOL)</label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount in SOL"
                  className="w-full bg-transparent"
                />
                <div className="flex justify-between text-xs opacity-70">
                  {amount && networkStats?.solPrice && (
                    <p>≈ ${(parseFloat(amount) * networkStats.solPrice).toFixed(2)} USD</p>
                  )}
                  {estimatedFee !== null && (
                    <p>Est. Fee: {estimatedFee.toFixed(6)} SOL 
                      {networkStats?.solPrice && (
                        <span className="ml-1">
                          (${(estimatedFee * networkStats.solPrice).toFixed(3)})
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Transaction Speed</label>
                <Select value={priorityFee} onValueChange={(value: string) => setPriorityFee(value as keyof typeof PRIORITY_FEES)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" className="w-full z-50">
                    <SelectItem value="low">Low Priority (~30s)</SelectItem>
                    <SelectItem value="medium">Medium Priority (~15s)</SelectItem>
                    <SelectItem value="high">High Priority (~5s)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Message (Optional)</label>
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add a message to your donation"
                  maxLength={50}
                  className="w-full bg-transparent"
                />
              </div>

              <Button
                onClick={handleDonate}
                disabled={isLoading || !amount}
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                {isLoading ? 'Processing...' : 'Donate Now'}
              </Button>
            </>
          )}
        </TabsContent>
        <TabsContent value="usdc" className="space-y-4">
          {/* USDC implementation coming soon */}
          <p className="text-center opacity-70">USDC donations coming soon!</p>
        </TabsContent>
      </Tabs>

      {/* Transaction History */}
      {transactionHistory.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Recent Transactions</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {transactionHistory.map((tx) => (
              <div key={tx.signature} className="text-xs flex justify-between items-center">
                <a 
                  href={`https://solscan.io/tx/${tx.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate max-w-[200px]"
                >
                  {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                </a>
                <div className="text-right">
                  <p>{tx.amount.toFixed(2)} SOL</p>
                  {getUsdValue(tx.amount) && (
                    <p className="opacity-70">${getUsdValue(tx.amount)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default DonationWidget; 