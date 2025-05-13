
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface ComplianceMapProps {
  className?: string;
}

interface ComplianceItem {
  id: string;
  name: string;
  status: 'compliant' | 'non-compliant' | 'warning';
  description: string;
}

interface ComplianceRegion {
  id: string;
  name: string;
  items: ComplianceItem[];
}

const ComplianceMap: React.FC<ComplianceMapProps> = ({ className }) => {
  const [region, setRegion] = useState('us');
  
  // Mock compliance data
  const complianceRegions: ComplianceRegion[] = [
    {
      id: 'us',
      name: 'United States (HIPAA)',
      items: [
        {
          id: 'us-1',
          name: 'Privacy Rule',
          status: 'compliant',
          description: 'Patient data is properly protected with access controls and encryption.'
        },
        {
          id: 'us-2',
          name: 'Security Rule',
          status: 'compliant',
          description: 'Technical safeguards are in place for all electronic PHI.'
        },
        {
          id: 'us-3',
          name: 'Breach Notification',
          status: 'compliant',
          description: 'Mechanisms in place to detect and report unauthorized disclosures.'
        },
        {
          id: 'us-4',
          name: 'AI Model Documentation',
          status: 'warning',
          description: 'Documentation for AI training data sources is incomplete.'
        },
      ]
    },
    {
      id: 'eu',
      name: 'European Union (GDPR)',
      items: [
        {
          id: 'eu-1',
          name: 'Lawful Basis',
          status: 'compliant',
          description: 'Consent management system provides valid lawful basis for processing.'
        },
        {
          id: 'eu-2',
          name: 'Data Minimization',
          status: 'compliant',
          description: 'Only necessary data is collected for specified purposes.'
        },
        {
          id: 'eu-3',
          name: 'Right to Erasure',
          status: 'warning',
          description: 'Erasure from AI training datasets needs verification.'
        },
        {
          id: 'eu-4',
          name: 'AI Act Compliance',
          status: 'non-compliant',
          description: 'Risk assessment for high-risk AI system incomplete.'
        },
      ]
    },
    {
      id: 'ca',
      name: 'Canada (PIPEDA)',
      items: [
        {
          id: 'ca-1',
          name: 'Consent',
          status: 'compliant',
          description: 'Consent is obtained for collection, use and disclosure.'
        },
        {
          id: 'ca-2',
          name: 'Limiting Collection',
          status: 'compliant',
          description: 'Only necessary information is collected.'
        },
        {
          id: 'ca-3',
          name: 'Individual Access',
          status: 'warning',
          description: 'Access request process for AI-derived insights needs review.'
        },
        {
          id: 'ca-4',
          name: 'Safeguards',
          status: 'compliant',
          description: 'Security measures appropriate to sensitivity of information.'
        },
      ]
    },
  ];
  
  // Get the current region data
  const currentRegion = complianceRegions.find(r => r.id === region) || complianceRegions[0];
  
  // Calculate compliance statistics
  const stats = currentRegion.items.reduce((acc, item) => {
    acc[item.status]++;
    return acc;
  }, { compliant: 0, warning: 0, 'non-compliant': 0 });
  
  // Get status icon component
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'non-compliant':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <CardTitle className="text-hdep-primary">Compliance Map</CardTitle>
        <CardDescription>Regulatory compliance status by region</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue={region} onValueChange={setRegion}>
          <TabsList className="mb-4">
            {complianceRegions.map((r) => (
              <TabsTrigger 
                key={r.id} 
                value={r.id}
                className={region === r.id ? 'bg-hdep-primary text-white' : ''}
              >
                {r.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {complianceRegions.map((r) => (
            <TabsContent key={r.id} value={r.id} className="mt-0">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 text-center">
                  <div className="text-xl font-semibold text-green-600">{stats.compliant}</div>
                  <div className="text-sm text-green-700">Compliant</div>
                </div>
                
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-center">
                  <div className="text-xl font-semibold text-amber-600">{stats.warning}</div>
                  <div className="text-sm text-amber-700">Warnings</div>
                </div>
                
                <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                  <div className="text-xl font-semibold text-red-600">{stats['non-compliant']}</div>
                  <div className="text-sm text-red-700">Non-Compliant</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {r.items.map((item) => (
                  <div key={item.id} className="flex items-start border-b pb-4">
                    <div className="mr-3 mt-1">{getStatusIcon(item.status)}</div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            item.status === 'compliant' 
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : item.status === 'warning'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          {item.status === 'compliant' ? 'Compliant' : item.status === 'warning' ? 'Warning' : 'Non-Compliant'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ComplianceMap;
