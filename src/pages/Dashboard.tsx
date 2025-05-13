
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RiskAlerts from '@/components/RiskAlerts';
import ModelAuditor from '@/components/ModelAuditor';
import DataAccessLog from '@/components/DataAccessLog';
import ComplianceMap from '@/components/ComplianceMap';
import { useHDEPStore } from '@/store/useHDEPStore';
import { User, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  const { consentRecords, accessLogs, riskAlerts } = useHDEPStore();
  
  // Calculate some statistics for the dashboard
  const stats = {
    totalPatients: new Set(consentRecords.map(record => record.patientId)).size,
    consentRate: consentRecords.filter(record => 
      record.scopes.diagnostics || record.scopes.research || record.scopes.training
    ).length / (consentRecords.length || 1) * 100,
    accessEvents: accessLogs.length,
    pendingAlerts: riskAlerts.filter(alert => !alert.acknowledged).length
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-hdep-primary">Healthcare Data Ethics Protocol Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="inline-flex p-3 rounded-lg bg-blue-100">
                <User className="h-6 w-6 text-hdep-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <h3 className="text-2xl font-bold">{stats.totalPatients}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="inline-flex p-3 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Consent Rate</p>
                <h3 className="text-2xl font-bold">{stats.consentRate.toFixed(1)}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="inline-flex p-3 rounded-lg bg-amber-100">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Access Events</p>
                <h3 className="text-2xl font-bold">{stats.accessEvents}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="inline-flex p-3 rounded-lg bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Alerts</p>
                <h3 className="text-2xl font-bold">{stats.pendingAlerts}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RiskAlerts />
        <ModelAuditor />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataAccessLog />
        <ComplianceMap />
      </div>
    </div>
  );
};

export default Dashboard;
