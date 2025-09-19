import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, TrendingUp, Settings } from 'lucide-react';
import LoanApplication from './LoanApplication';
import LoanSyndication from './LoanSyndication';
import LoanManagement from './LoanManagement';
import Dashboard from './Dashboard';

const LoanWorkflow = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const workflowSteps = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: TrendingUp,
      description: 'Overview of loan portfolio',
      status: 'active'
    },
    {
      id: 'application',
      title: 'Application',
      icon: FileText,
      description: 'Submit new loan requests',
      status: 'available'
    },
    {
      id: 'syndication',
      title: 'Syndication',
      icon: Users,
      description: 'Manage loan syndications',
      status: 'available'
    },
    {
      id: 'management',
      title: 'Management',
      icon: Settings,
      description: 'Portfolio management',
      status: 'available'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Syndicated Loan Workflow</h1>
        <p className="text-muted-foreground">
          Complete confidential loan management platform
        </p>
      </div>

      {/* Workflow Navigation */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {workflowSteps.map((step, index) => (
              <div
                key={step.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                  activeTab === step.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
                onClick={() => setActiveTab(step.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    activeTab === step.id 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {step.title}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block w-8 h-px bg-border ml-auto" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
                <Badge 
                  variant={activeTab === step.id ? 'default' : 'secondary'}
                  className={`mt-2 text-xs ${
                    activeTab === step.id 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Content */}
      <div className="min-h-[600px]">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'application' && <LoanApplication />}
        {activeTab === 'syndication' && <LoanSyndication />}
        {activeTab === 'management' && <LoanManagement />}
      </div>
    </div>
  );
};

export default LoanWorkflow;