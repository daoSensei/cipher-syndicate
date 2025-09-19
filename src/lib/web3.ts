import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = '2ec9743d0d0cd7fb94dee1a7e6d33475'

// Create wagmiConfig
const metadata = {
  name: 'SyndiLoan',
  description: 'Confidential Syndicated Finance Platform',
  url: 'https://syndiloan.com',
  icons: ['/favicon.svg']
}

const chains = [sepolia] as const
export const config = getDefaultConfig({
  appName: 'SyndiLoan',
  projectId,
  chains,
  ssr: false,
})

export { chains }
