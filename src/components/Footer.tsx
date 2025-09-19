import React from 'react';
import { FileText, Users, Shield, Globe } from 'lucide-react';

const Footer = () => {
  const contracts = [
    { id: 'SYN-001', type: 'Senior Term Loan' },
    { id: 'SYN-002', type: 'Revolving Credit' },
    { id: 'SYN-003', type: 'Bridge Facility' },
  ];

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        {/* Animated Digital Contracts */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Live Contract Executions
          </h3>
          
          <div className="relative h-20 bg-muted/30 rounded-lg overflow-hidden border border-border">
            <div className="absolute inset-0 flex items-center">
              {contracts.map((contract, index) => (
                <div
                  key={contract.id}
                  className="absolute flex items-center gap-3 px-4 py-2 bg-gradient-corporate/20 rounded-lg border border-primary/30 animate-signing"
                  style={{ 
                    animationDelay: `${index * 0.7}s`,
                    left: '10%',
                    animationDuration: '4s'
                  }}
                >
                  <Shield className="w-4 h-4 text-primary" />
                  <div className="text-sm">
                    <div className="font-mono text-foreground">{contract.id}</div>
                    <div className="text-xs text-muted-foreground">{contract.type}</div>
                  </div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                </div>
              ))}
            </div>
            
            {/* Signature lines */}
            <div className="absolute bottom-2 left-4 right-4 flex justify-between">
              <div className="text-xs text-muted-foreground">Digital Signatures</div>
              <div className="text-xs text-muted-foreground">Simultaneously Executed</div>
            </div>
          </div>
        </div>

        {/* Footer Links and Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Syndication</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Compliance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">Security</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Encryption</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Audit Reports</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-3">Network</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Globe className="w-4 h-4" />
              Global Infrastructure
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              ***+ Active Lenders
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 SyndiLoan. All participation amounts encrypted for confidential syndication.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3 text-secondary" />
              Bank-Grade Security
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="w-3 h-3 text-accent" />
              Regulatory Compliant
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;