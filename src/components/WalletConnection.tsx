import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const WalletConnection = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gradient-corporate hover:opacity-90 text-primary-foreground border-0 px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-all duration-200"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm font-mono text-foreground">
                      {account.displayName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {chain.name}
                    </div>
                  </div>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="border border-border hover:bg-muted px-3 py-1 rounded-md text-sm transition-all duration-200"
                  >
                    Account
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnection;