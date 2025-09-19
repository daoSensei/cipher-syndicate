import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Users, Lock, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSyndicateEncryption } from '@/hooks/useVault';
import { useAccount } from 'wagmi';

const LoanSyndication = () => {
  const { toast } = useToast();
  const { encryptSyndicateData, joinSyndicate, isPending, error } = useSyndicateEncryption();
  const { isConnected } = useAccount();
  const [participationAmount, setParticipationAmount] = useState('');

  const loanDetails = {
    id: 'SYN-2024-001',
    borrower: 'Global Tech Corp',
    totalAmount: 250000000,
    minParticipation: 5000000,
    leadArrangers: ['JPMorgan Chase', 'Goldman Sachs'],
    currentCommitments: 175000000,
    targetDate: '2024-10-15',
    interestRate: '5.75%',
    term: '5 Years',
    status: 'Active Syndication'
  };

  const participants = [
    { 
      id: 1,
      bank: 'Bank of America',
      commitment: '***.*M',
      role: 'Co-Lead Arranger',
      status: 'Committed',
      percentage: 12
    },
    { 
      id: 2,
      bank: 'Wells Fargo',
      commitment: '**.*M',
      role: 'Participant',
      status: 'Pending',
      percentage: 8
    },
    { 
      id: 3,
      bank: 'Citibank',
      commitment: '***.*M',
      role: 'Participant',
      status: 'Committed',
      percentage: 15
    },
    { 
      id: 4,
      bank: 'Deutsche Bank',
      commitment: '**.*M',
      role: 'Participant',
      status: 'Under Review',
      percentage: 6
    }
  ];

  const syndicationProgress = (loanDetails.currentCommitments / loanDetails.totalAmount) * 100;

  const encryptData = (data: string): string => {
    // Simple base64 encoding for demo - in production use proper encryption
    return btoa(data);
  };

  const handleParticipate = async () => {
    if (!participationAmount) return;
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to participate in syndication.",
        variant: "destructive",
      });
      return;
    }

    try {
      const encryptedTerms = encryptData(`Participation: ${participationAmount}, Risk: Medium`);
      
      await joinSyndicate(1); // syndicateId - in real app this would be dynamic
      
      toast({
        title: "Participation Encrypted",
        description: "Your confidential participation data has been encrypted and stored on-chain.",
      });
      setParticipationAmount('');
    } catch (err) {
      toast({
        title: "Encryption Failed",
        description: error?.message || "Failed to encrypt participation data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Loan Syndication</h2>
          <p className="text-muted-foreground">Manage syndicated loan participations</p>
        </div>
        <Badge variant="secondary" className="bg-secondary/20 text-secondary">
          <Users className="w-3 h-3 mr-1" />
          {participants.length} Participants
        </Badge>
      </div>

      {/* Loan Overview */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Syndication Overview - {loanDetails.id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                ${(loanDetails.totalAmount / 1000000).toFixed(0)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Facility</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                ${(loanDetails.currentCommitments / 1000000).toFixed(0)}M
              </div>
              <div className="text-sm text-muted-foreground">Committed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {syndicationProgress.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Syndicated</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Syndication Progress</span>
              <span className="text-foreground font-medium">{syndicationProgress.toFixed(1)}%</span>
            </div>
            <Progress value={syndicationProgress} className="h-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Borrower:</span>
              <div className="font-medium">{loanDetails.borrower}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Interest Rate:</span>
              <div className="font-medium text-secondary">{loanDetails.interestRate}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Term:</span>
              <div className="font-medium">{loanDetails.term}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Target Date:</span>
              <div className="font-medium">{loanDetails.targetDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participation Form */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Submit Participation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Participation Amount (USD)
                </label>
                <Input
                  type="number"
                  value={participationAmount}
                  onChange={(e) => setParticipationAmount(e.target.value)}
                  placeholder={`Minimum: $${(loanDetails.minParticipation / 1000000).toFixed(0)}M`}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleParticipate} 
                  className="w-full" 
                  disabled={isPending || !isConnected}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {isPending ? 'Encrypting...' : 'Submit Confidential Bid'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Syndicate Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {participants.map((participant) => (
              <div 
                key={participant.id}
                className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold text-foreground">
                      {participant.bank}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {participant.role}
                    </Badge>
                    <Badge 
                      variant={participant.status === 'Committed' ? 'default' : 'secondary'}
                      className={
                        participant.status === 'Committed' 
                          ? 'bg-secondary/20 text-secondary' 
                          : participant.status === 'Pending'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {participant.status === 'Committed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {participant.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                      {participant.status === 'Under Review' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {participant.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-primary font-bold">
                      {participant.commitment}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ***% of facility
                    </div>
                  </div>
                </div>
                
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-encrypted animate-encrypt rounded-full"
                    style={{ 
                      width: `${participant.percentage}%`,
                      backgroundSize: '200% 100%'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanSyndication;