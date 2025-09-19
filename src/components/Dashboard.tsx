import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const tranchesData = [
    { 
      id: 'A1', 
      amount: '***.*M', 
      participation: 75, 
      status: 'Active',
      risk: 'Senior',
      yield: '4.2%'
    },
    { 
      id: 'B2', 
      amount: '**.*M', 
      participation: 60, 
      status: 'Syndicated',
      risk: 'Mezzanine',
      yield: '6.8%'
    },
    { 
      id: 'C3', 
      amount: '*.**M', 
      participation: 40, 
      status: 'Pending',
      risk: 'Junior',
      yield: '9.1%'
    },
  ];

  const stats = [
    { 
      title: 'Total Committed',
      value: '$***.*M',
      icon: DollarSign,
      trend: '+12.3%',
      color: 'text-secondary'
    },
    {
      title: 'Active Positions',
      value: '***',
      icon: TrendingUp,
      trend: '+5.7%',
      color: 'text-primary'
    },
    {
      title: 'Encrypted Tranches',
      value: '***',
      icon: Shield,
      trend: '100%',
      color: 'text-accent'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:bg-card/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${stat.color} font-medium`}>
                    {stat.trend} from last period
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-corporate/20 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Encrypted Tranche Dashboard */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Lock className="w-5 h-5 text-primary" />
              Confidential Loan Tranches
            </CardTitle>
            <Badge variant="secondary" className="bg-secondary/20 text-secondary">
              <Shield className="w-3 h-3 mr-1" />
              End-to-End Encrypted
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {tranchesData.map((tranche) => (
            <div 
              key={tranche.id}
              className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-foreground">
                    Tranche {tranche.id}
                  </div>
                  <Badge 
                    variant={tranche.status === 'Active' ? 'default' : 'secondary'}
                    className={
                      tranche.status === 'Active' 
                        ? 'bg-secondary/20 text-secondary' 
                        : 'bg-muted text-muted-foreground'
                    }
                  >
                    {tranche.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {tranche.risk}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-mono text-primary font-bold">
                    {tranche.amount}
                  </span>
                  <span className="text-accent font-bold">
                    {tranche.yield}
                  </span>
                </div>
              </div>
              
              {/* Encrypted Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Participation Level</span>
                  <span className="font-mono text-foreground">***%</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-encrypted animate-encrypt rounded-full transition-all duration-500"
                    style={{ 
                      width: `${tranche.participation}%`,
                      backgroundSize: '200% 100%'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;