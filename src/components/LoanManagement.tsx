import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, DollarSign, Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const LoanManagement = () => {
  const [selectedLoan, setSelectedLoan] = useState('all');

  const loans = [
    {
      id: 'SYN-2024-001',
      borrower: 'Global Tech Corp',
      amount: 250000000,
      outstanding: 180000000,
      rate: '5.75%',
      maturity: '2029-10-15',
      status: 'Active',
      nextPayment: '2024-11-15',
      paymentAmount: 2500000,
      risk: 'Low'
    },
    {
      id: 'SYN-2024-002',
      borrower: 'Energy Solutions Inc',
      amount: 150000000,
      outstanding: 125000000,
      rate: '6.25%',
      maturity: '2027-08-20',
      status: 'Active',
      nextPayment: '2024-10-20',
      paymentAmount: 1875000,
      risk: 'Medium'
    },
    {
      id: 'SYN-2023-045',
      borrower: 'Manufacturing Ltd',
      amount: 85000000,
      outstanding: 45000000,
      rate: '5.50%',
      maturity: '2026-12-01',
      status: 'Performing',
      nextPayment: '2024-12-01',
      paymentAmount: 1100000,
      risk: 'Low'
    }
  ];

  const payments = [
    {
      id: 1,
      loanId: 'SYN-2024-001',
      date: '2024-09-15',
      amount: 2500000,
      type: 'Interest',
      status: 'Received'
    },
    {
      id: 2,
      loanId: 'SYN-2024-002',
      date: '2024-09-20',
      amount: 1875000,
      type: 'Principal + Interest',
      status: 'Received'
    },
    {
      id: 3,
      loanId: 'SYN-2024-001',
      date: '2024-11-15',
      amount: 2500000,
      type: 'Interest',
      status: 'Scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Performing':
        return 'bg-secondary/20 text-secondary';
      case 'Scheduled':
        return 'bg-accent/20 text-accent';
      case 'Received':
        return 'bg-secondary/20 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-secondary';
      case 'Medium':
        return 'text-accent';
      case 'High':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Loan Management</h2>
          <p className="text-muted-foreground">Monitor and manage loan portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedLoan} onValueChange={setSelectedLoan}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Loans</SelectItem>
              {loans.map((loan) => (
                <SelectItem key={loan.id} value={loan.id}>
                  {loan.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Portfolio</p>
                <p className="text-2xl font-bold text-foreground">
                  ${(loans.reduce((sum, loan) => sum + loan.amount, 0) / 1000000).toFixed(0)}M
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-secondary">
                  ${(loans.reduce((sum, loan) => sum + loan.outstanding, 0) / 1000000).toFixed(0)}M
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <p className="text-2xl font-bold text-accent">{loans.length}</p>
              </div>
              <FileText className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="text-2xl font-bold text-primary">
                  ${(Math.min(...loans.map(l => l.paymentAmount)) / 1000000).toFixed(1)}M
                </p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="loans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="loans">Active Loans</TabsTrigger>
          <TabsTrigger value="payments">Payment Schedule</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="loans">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Loan Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Maturity</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell className="font-mono">{loan.id}</TableCell>
                      <TableCell className="font-medium">{loan.borrower}</TableCell>
                      <TableCell>${(loan.amount / 1000000).toFixed(0)}M</TableCell>
                      <TableCell className="text-secondary font-semibold">
                        ${(loan.outstanding / 1000000).toFixed(0)}M
                      </TableCell>
                      <TableCell className="text-accent">{loan.rate}</TableCell>
                      <TableCell>{loan.maturity}</TableCell>
                      <TableCell>
                        <span className={getRiskColor(loan.risk)}>
                          {loan.risk}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(loan.status)}>
                          {loan.status === 'Active' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {loan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Loan ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="font-mono">{payment.loanId}</TableCell>
                      <TableCell className="font-semibold">
                        ${(payment.amount / 1000000).toFixed(1)}M
                      </TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status === 'Received' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {payment.status === 'Scheduled' && <Clock className="w-3 h-3 mr-1" />}
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          {payment.status === 'Scheduled' ? 'Mark Received' : 'View Receipt'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Portfolio Summary Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Risk Assessment Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Payment Schedule Export
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Interest Rate:</span>
                  <span className="font-semibold text-secondary">5.83%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Portfolio Yield:</span>
                  <span className="font-semibold text-accent">6.12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Default Rate:</span>
                  <span className="font-semibold text-secondary">0.00%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg. Loan Term:</span>
                  <span className="font-semibold">4.2 years</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoanManagement;