
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RiskAlerts from '@/components/RiskAlerts';
import ModelAuditor from '@/components/ModelAuditor';
import { Button } from '@/components/ui/button';
import { useHDEPStore } from '@/store/useHDEPStore';
import { AlertTriangle, BarChart, Activity, Sliders } from 'lucide-react';

const RiskManagement = () => {
  const { riskAlerts, modelMetrics } = useHDEPStore();
  
  // Calculate risk statistics
  const activeAlerts = riskAlerts.filter(alert => !alert.acknowledged);
  const highRiskAlerts = riskAlerts.filter(alert => 
    (alert.level === 'critical' || alert.level === 'high') && !alert.acknowledged
  );
  
  // Calculate model risk scores
  const modelRiskScores = modelMetrics.map(model => ({
    id: model.modelId,
    name: model.name,
    riskScore: 100 - (model.fairnessScore * 100),
  }));
  
  // Sort models by risk score (highest risk first)
  modelRiskScores.sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-hdep-primary">Risk Management</h1>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" className="text-sm">
            <Sliders className="h-4 w-4 mr-1" />
            Configure Alerts
          </Button>
          <Button className="bg-hdep-primary hover:bg-hdep-primary/90 text-sm">
            Run Risk Assessment
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <h3 className="text-2xl font-bold">{activeAlerts.length}</h3>
              </div>
              <div className="bg-orange-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Risk Alerts</p>
                <h3 className="text-2xl font-bold">{highRiskAlerts.length}</h3>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Models Monitored</p>
                <h3 className="text-2xl font-bold">{modelMetrics.length}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <BarChart className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Trend</p>
                <h3 className="text-2xl font-bold text-green-600">↓ 12%</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Activity className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Alerts</CardTitle>
            <CardDescription>Current ethical and operational risk alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <RiskAlerts />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Model Risk Rankings</CardTitle>
            <CardDescription>AI models ranked by risk score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {modelRiskScores.map((model, index) => (
                <div key={model.id} className="flex items-center">
                  <span className="w-6 text-muted-foreground font-medium text-sm">{index + 1}</span>
                  <div className="flex-grow ml-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{model.name}</span>
                      <span className="text-sm font-medium">
                        {model.riskScore < 15 ? (
                          <span className="text-green-600">{model.riskScore.toFixed(1)}%</span>
                        ) : model.riskScore < 25 ? (
                          <span className="text-yellow-600">{model.riskScore.toFixed(1)}%</span>
                        ) : (
                          <span className="text-red-600">{model.riskScore.toFixed(1)}%</span>
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          model.riskScore < 15 
                            ? 'bg-green-500' 
                            : model.riskScore < 25 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${model.riskScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  View Detailed Risk Assessment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Model Auditor</CardTitle>
            <CardDescription>In-depth performance and fairness analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ModelAuditor />
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Risk Mitigation Recommendations</CardTitle>
            <CardDescription>Suggested actions to reduce identified risks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-red-50 border-red-100">
                <h3 className="font-medium text-red-800 mb-2">High Priority: Address Model Bias</h3>
                <p className="text-sm text-red-700 mb-4">
                  The Cardiac Risk Assessment model shows potential bias in age-related predictions, with a fairness 
                  score of 68% for age demographics. This could lead to under-diagnosis in elderly patients.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-hdep-primary hover:bg-hdep-primary/90 h-8 text-xs">
                    Review Training Data
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    Schedule Ethics Review
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-100">
                <h3 className="font-medium text-yellow-800 mb-2">Medium Priority: Consent Verification Process</h3>
                <p className="text-sm text-yellow-700 mb-4">
                  Several instances of patient data being accessed for research without proper consent verification 
                  have been detected. Implement stronger consent verification checks.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-hdep-primary hover:bg-hdep-primary/90 h-8 text-xs">
                    Update Access Controls
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    Audit Consent Records
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Preventative: Enhance AI Model Documentation</h3>
                <p className="text-sm text-blue-700 mb-4">
                  To prevent future compliance issues, improve documentation of AI model development processes, 
                  including data sources, training methods, and validation procedures.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="bg-hdep-primary hover:bg-hdep-primary/90 h-8 text-xs">
                    Create Documentation Templates
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    Schedule Team Training
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiskManagement;
