import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';

// Contract ABI (simplified for demo)
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint32", "name": "_requestedAmount", "type": "uint32"},
      {"internalType": "uint32", "name": "_interestRate", "type": "uint32"},
      {"internalType": "uint32", "name": "_loanTerm", "type": "uint32"},
      {"internalType": "string", "name": "_purpose", "type": "string"},
      {"internalType": "string", "name": "_collateral", "type": "string"},
      {"internalType": "uint256", "name": "_deadline", "type": "uint256"}
    ],
    "name": "submitLoanApplication",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"internalType": "uint32", "name": "_contributionAmount", "type": "uint32"},
      {"internalType": "uint32", "name": "_riskTolerance", "type": "uint32"}
    ],
    "name": "joinSyndicate",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_poolName", "type": "string"},
      {"internalType": "uint32", "name": "_targetAmount", "type": "uint32"}
    ],
    "name": "createLoanPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "agreementId", "type": "uint256"}],
    "name": "repayLoan",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'; // Replace with actual deployed address

export const useLoanApplication = () => {
  const { writeContract, isPending, error } = useWriteContract();
  const { address } = useAccount();

  const submitApplication = async (
    requestedAmount: string,
    interestRate: number,
    loanTerm: number,
    purpose: string,
    collateral: string,
    deadline: number
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'submitLoanApplication',
      args: [
        BigInt(requestedAmount),
        BigInt(interestRate),
        BigInt(loanTerm),
        purpose,
        collateral,
        BigInt(deadline)
      ],
    });
  };

  return {
    submitApplication,
    isPending,
    error,
  };
};

export const useSyndicate = () => {
  const { writeContract, isPending, error } = useWriteContract();
  const { address } = useAccount();

  const joinSyndicate = async (
    poolId: number,
    contributionAmount: string,
    riskTolerance: number
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'joinSyndicate',
      args: [
        BigInt(poolId),
        BigInt(contributionAmount),
        BigInt(riskTolerance)
      ],
      value: parseEther(contributionAmount),
    });
  };

  const createPool = async (
    poolName: string,
    targetAmount: string
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'createLoanPool',
      args: [
        poolName,
        BigInt(targetAmount)
      ],
    });
  };

  return {
    joinSyndicate,
    createPool,
    isPending,
    error,
  };
};

export const useLoanRepayment = () => {
  const { writeContract, isPending, error } = useWriteContract();
  const { address } = useAccount();

  const repayLoan = async (
    agreementId: number,
    repaymentAmount: string
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'repayLoan',
      args: [BigInt(agreementId)],
      value: parseEther(repaymentAmount),
    });
  };

  return {
    repayLoan,
    isPending,
    error,
  };
};
