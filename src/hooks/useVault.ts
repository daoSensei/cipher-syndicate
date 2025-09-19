import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { parseEther } from 'viem';

// Contract ABI for data encryption operations
const VAULT_ABI = [
  {
    "inputs": [
      {"internalType": "uint32", "name": "_amount", "type": "uint32"},
      {"internalType": "uint32", "name": "_interestRate", "type": "uint32"},
      {"internalType": "uint32", "name": "_term", "type": "uint32"},
      {"internalType": "string", "name": "_encryptedPurpose", "type": "string"},
      {"internalType": "string", "name": "_encryptedCollateral", "type": "string"}
    ],
    "name": "encryptLoanData",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint32", "name": "_totalCommitment", "type": "uint32"},
      {"internalType": "uint32", "name": "_riskLevel", "type": "uint32"},
      {"internalType": "string", "name": "_encryptedTerms", "type": "string"}
    ],
    "name": "encryptSyndicateData",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "syndicateId", "type": "uint256"}],
    "name": "joinSyndicate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "loanId", "type": "uint256"},
      {"internalType": "bool", "name": "isApproved", "type": "bool"}
    ],
    "name": "approveLoanData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const VAULT_ADDRESS = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'; // Replace with actual deployed address

export const useLoanEncryption = () => {
  const { writeContract, isPending, error } = useWriteContract();
  const { address } = useAccount();

  const encryptLoanData = async (
    amount: string,
    interestRate: number,
    term: number,
    encryptedPurpose: string,
    encryptedCollateral: string
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'encryptLoanData',
      args: [
        BigInt(amount),
        BigInt(interestRate),
        BigInt(term),
        encryptedPurpose,
        encryptedCollateral
      ],
    });
  };

  return {
    encryptLoanData,
    isPending,
    error,
  };
};

export const useSyndicateEncryption = () => {
  const { writeContract, isPending, error } = useWriteContract();
  const { address } = useAccount();

  const encryptSyndicateData = async (
    totalCommitment: string,
    riskLevel: number,
    encryptedTerms: string
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'encryptSyndicateData',
      args: [
        BigInt(totalCommitment),
        BigInt(riskLevel),
        encryptedTerms
      ],
    });
  };

  const joinSyndicate = async (syndicateId: number) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'joinSyndicate',
      args: [BigInt(syndicateId)],
    });
  };

  return {
    encryptSyndicateData,
    joinSyndicate,
    isPending,
    error,
  };
};

export const useDataAccess = () => {
  const { readContract } = useReadContract();
  const { address } = useAccount();

  const getEncryptedLoanData = async (loanId: number) => {
    if (!address) throw new Error('Wallet not connected');
    
    return readContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'getEncryptedLoanData',
      args: [BigInt(loanId)],
    });
  };

  const getEncryptedSyndicateData = async (syndicateId: number) => {
    if (!address) throw new Error('Wallet not connected');
    
    return readContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'getEncryptedSyndicateData',
      args: [BigInt(syndicateId)],
    });
  };

  const getUserLoans = async () => {
    if (!address) throw new Error('Wallet not connected');
    
    return readContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'getUserLoans',
      args: [address],
    });
  };

  const getUserSyndicates = async () => {
    if (!address) throw new Error('Wallet not connected');
    
    return readContract({
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'getUserSyndicates',
      args: [address],
    });
  };

  return {
    getEncryptedLoanData,
    getEncryptedSyndicateData,
    getUserLoans,
    getUserSyndicates,
  };
};
