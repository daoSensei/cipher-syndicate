// Environment configuration
export const ENV = {
  CHAIN_ID: import.meta.env.VITE_CHAIN_ID || '11155111',
  RPC_URL: import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  INFURA_API_KEY: import.meta.env.VITE_INFURA_API_KEY || 'b18fb7e6ca7045ac83c41157ab93f990',
} as const;
