import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, DollarSign, Calendar, Building, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLoanEncryption } from '@/hooks/useVault';
import { useAccount } from 'wagmi';

const LoanApplication = () => {
  const { toast } = useToast();
  const { encryptLoanData, isPending, error } = useLoanEncryption();
  const { isConnected } = useAccount();
  const [formData, setFormData] = useState({
    borrowerName: '',
    companyName: '',
    loanAmount: '',
    purpose: '',
    term: '',
    collateral: '',
    creditRating: '',
    interestRate: ''
  });

  const encryptData = (data: string): string => {
    // Simple base64 encoding for demo - in production use proper encryption
    return btoa(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to submit a loan application.",
        variant: "destructive",
      });
      return;
    }

    try {
      const encryptedPurpose = encryptData(formData.purpose);
      const encryptedCollateral = encryptData(formData.collateral);
      
      await encryptLoanData(
        formData.loanAmount,
        parseFloat(formData.interestRate),
        parseInt(formData.term) * 30, // Convert months to days
        encryptedPurpose,
        encryptedCollateral
      );
      
      toast({
        title: "Loan Data Encrypted",
        description: "Your confidential loan data has been encrypted and stored on-chain.",
      });
    } catch (err) {
      toast({
        title: "Encryption Failed",
        description: error?.message || "Failed to encrypt loan data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">New Loan Application</h2>
          <p className="text-muted-foreground">Submit a confidential syndicated loan request</p>
        </div>
        <Badge variant="secondary" className="bg-secondary/20 text-secondary">
          <Lock className="w-3 h-3 mr-1" />
          Encrypted Submission
        </Badge>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Loan Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="borrowerName">Borrower Name</Label>
                <Input
                  id="borrowerName"
                  value={formData.borrowerName}
                  onChange={(e) => setFormData({...formData, borrowerName: e.target.value})}
                  placeholder="Primary borrower name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  placeholder="Borrowing entity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="loanAmount"
                    type="number"
                    className="pl-10"
                    value={formData.loanAmount}
                    onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Loan Term</Label>
                <Select value={formData.term} onValueChange={(value) => setFormData({...formData, term: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12m">12 Months</SelectItem>
                    <SelectItem value="24m">24 Months</SelectItem>
                    <SelectItem value="36m">36 Months</SelectItem>
                    <SelectItem value="60m">60 Months</SelectItem>
                    <SelectItem value="custom">Custom Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditRating">Credit Rating</Label>
                <Select value={formData.creditRating} onValueChange={(value) => setFormData({...formData, creditRating: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aaa">AAA</SelectItem>
                    <SelectItem value="aa">AA</SelectItem>
                    <SelectItem value="a">A</SelectItem>
                    <SelectItem value="bbb">BBB</SelectItem>
                    <SelectItem value="bb">BB</SelectItem>
                    <SelectItem value="b">B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Proposed Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Loan Purpose</Label>
              <Textarea
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                placeholder="Describe the purpose and use of funds..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collateral">Collateral Description</Label>
              <Textarea
                id="collateral"
                value={formData.collateral}
                onChange={(e) => setFormData({...formData, collateral: e.target.value})}
                placeholder="Describe collateral and security arrangements..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isPending || !isConnected}>
                <Lock className="w-4 h-4 mr-2" />
                {isPending ? 'Encrypting...' : 'Submit Encrypted Application'}
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                Save Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanApplication;