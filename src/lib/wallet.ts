import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { ENV } from '../config/env';

export const config = getDefaultConfig({
  appName: 'Cipher Syndicate',
  projectId: ENV.WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});

export const chains = [sepolia];
