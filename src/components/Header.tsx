import React from 'react';
import Logo from './Logo';
import WalletConnection from './WalletConnection';

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex-1 text-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-corporate bg-clip-text text-transparent">
              Syndicated Finance with Confidential Allocation
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Secure • Private • Encrypted Loan Participation Platform
            </p>
          </div>
          
          <WalletConnection />
        </div>
      </div>
    </header>
  );
};

export default Header;