
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useHDEPStore, ConsentRecord, AccessLogEntry } from '@/store/useHDEPStore';
import { Search } from 'lucide-react';

interface EthicalReviewPanelProps {
  className?: string;
}

const EthicalReviewPanel: React.FC<EthicalReviewPanelProps> = ({ className }) => {
  const { consentRecords, accessLogs, modelMetrics } = useHDEPStore();
  
  const [activeTab, setActiveTab] = useState('consent');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter records based on search term
  const filteredConsent = consentRecords.filter(
    record => record.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredLogs = accessLogs.filter(
    log => 
      log.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <CardTitle className="text-hdep-primary">Ethical Review Panel</CardTitle>
        <CardDescription>Review and oversight of data usage</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="consent" className={activeTab === 'consent' ? 'bg-hdep-primary text-white' : ''}>
              Consent Trails
            </TabsTrigger>
            <TabsTrigger value="access" className={activeTab === 'access' ? 'bg-hdep-primary text-white' : ''}>
              Access Logs
            </TabsTrigger>
            <TabsTrigger value="models" className={activeTab === 'models' ? 'bg-hdep-primary text-white' : ''}>
              AI Models
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center mb-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab === 'consent' ? 'patient records' : activeTab === 'access' ? 'access logs' : 'models'}`}
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="consent" className="mt-0 space-y-4">
            {filteredConsent.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No consent records found. Try adjusting your search.
              </div>
            ) : (
              filteredConsent.map((record) => (
                <div key={record.id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Patient ID: {record.patientId}</h4>
                    <span className="text-xs text-muted-foreground">
                      Updated: {formatTimestamp(record.timestamp)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${record.scopes.diagnostics ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm">Diagnostics</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${record.scopes.research ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm">Research</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${record.scopes.training ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm">AI Training</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="access" className="mt-0">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No access logs found. Try adjusting your search.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{log.action}</h4>
                        <p className="text-sm text-muted-foreground">
                          Patient: {log.patientId}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{log.userName}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimestamp(log.timestamp)}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Data Category:</span> {log.dataCategory}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Purpose:</span> {log.purpose}
                      </div>
                      {log.blockchainHash && (
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Blockchain Record:</span>{' '}
                          <span className="font-mono text-xs">{log.blockchainHash}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="models" className="mt-0">
            <div className="space-y-6">
              {modelMetrics
                .filter(model => model.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((model) => (
                  <div key={model.modelId} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{model.name}</h4>
                        <p className="text-xs text-muted-foreground">ID: {model.modelId}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">
                          Last Updated: {formatTimestamp(model.timestamp)}
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Accuracy</Label>
                        <div className="text-lg font-medium">{(model.accuracy * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Fairness Score</Label>
                        <div className="text-lg font-medium">{(model.fairnessScore * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div>
                        <Label className="text-xs">Age Fairness</Label>
                        <div className={`text-sm ${model.categories.age < 0.75 ? 'text-red-600 font-medium' : ''}`}>
                          {(model.categories.age * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Gender Fairness</Label>
                        <div className={`text-sm ${model.categories.gender < 0.75 ? 'text-red-600 font-medium' : ''}`}>
                          {(model.categories.gender * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Ethnicity Fairness</Label>
                        <div className={`text-sm ${model.categories.ethnicity < 0.75 ? 'text-red-600 font-medium' : ''}`}>
                          {(model.categories.ethnicity * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Generate Detailed Report
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EthicalReviewPanel;
