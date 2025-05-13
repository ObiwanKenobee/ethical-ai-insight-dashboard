
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import EthicalReviewPanel from '@/components/EthicalReviewPanel';
import { useToast } from '@/hooks/use-toast';
import { useHDEPStore } from '@/store/useHDEPStore';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, FileText, AlertCircle, Save } from 'lucide-react';

const AdminPanel = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('review');
  
  // Mock settings
  const [settings, setSettings] = useState({
    blockchainLogging: true,
    ethicalReviewRequiredScore: 75,
    autoAlertCriticalIssues: true,
    retentionPeriodDays: 90,
    anonymizationLevel: 'high',
  });
  
  // Handle setting changes
  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Handle save settings
  const handleSaveSettings = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your configuration changes have been applied.',
    });
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-hdep-primary">Admin Panel</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger 
              value="review" 
              className={activeTab === 'review' ? 'bg-hdep-primary text-white' : ''}
            >
              Ethical Review
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className={activeTab === 'settings' ? 'bg-hdep-primary text-white' : ''}
            >
              System Settings
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className={activeTab === 'users' ? 'bg-hdep-primary text-white' : ''}
            >
              User Management
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="review" className="mt-0">
          <EthicalReviewPanel />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-hdep-primary" />
                <CardTitle>System Configuration</CardTitle>
              </div>
              <CardDescription>Configure security and compliance settings</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Blockchain Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="blockchain-logging"
                      checked={settings.blockchainLogging}
                      onCheckedChange={(checked) => 
                        handleSettingChange('blockchainLogging', Boolean(checked))
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label 
                        htmlFor="blockchain-logging" 
                        className="font-medium cursor-pointer"
                      >
                        Enable Blockchain Logging
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Log critical data access events to blockchain for immutable audit trail
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">AI Ethics Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ethical-threshold">Ethical Review Threshold Score</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="ethical-threshold"
                        type="number"
                        min="0"
                        max="100"
                        value={settings.ethicalReviewRequiredScore}
                        onChange={(e) => 
                          handleSettingChange('ethicalReviewRequiredScore', parseInt(e.target.value))
                        }
                        className="w-24"
                      />
                      <span className="text-muted-foreground">/ 100</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      AI models scoring below this fairness threshold will require manual review
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="auto-alert"
                      checked={settings.autoAlertCriticalIssues}
                      onCheckedChange={(checked) => 
                        handleSettingChange('autoAlertCriticalIssues', Boolean(checked))
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label 
                        htmlFor="auto-alert" 
                        className="font-medium cursor-pointer"
                      >
                        Automatic Critical Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically alert administrators when critical ethical issues are detected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Data Retention & Privacy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Audit Log Retention (Days)</Label>
                    <Input
                      id="retention-period"
                      type="number"
                      min="1"
                      value={settings.retentionPeriodDays}
                      onChange={(e) => 
                        handleSettingChange('retentionPeriodDays', parseInt(e.target.value))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Number of days to retain detailed access logs before summarization
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="anonymization">Default Anonymization Level</Label>
                    <select
                      id="anonymization"
                      value={settings.anonymizationLevel}
                      onChange={(e) => 
                        handleSettingChange('anonymizationLevel', e.target.value)
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="low">Low (Pseudonymization Only)</option>
                      <option value="medium">Medium (Limited Identifiers)</option>
                      <option value="high">High (Minimal Identifiers)</option>
                      <option value="complete">Complete (No Identifiers)</option>
                    </select>
                    <p className="text-xs text-muted-foreground">
                      Default level of anonymization for research data
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={handleSaveSettings}
                  className="bg-hdep-primary hover:bg-hdep-primary/90"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium mb-2">User Management</h3>
                <p className="text-muted-foreground mb-4">
                  This feature will be available in the next version of the HDEP Dashboard.
                </p>
                <Button variant="outline">Request Early Access</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
