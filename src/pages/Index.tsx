
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/pages/Dashboard';

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
