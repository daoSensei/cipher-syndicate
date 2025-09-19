import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoanWorkflow from '@/components/LoanWorkflow';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-corporate">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <LoanWorkflow />
      </main>
      <Footer />
    </div>
  );
};

export default Index;