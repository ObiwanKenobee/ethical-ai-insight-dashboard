
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  // Mock settings
  const [generalSettings, setGeneralSettings] = useState({
    dashboardName: "HDEP Dashboard",
    organizationName: "Healthcare Research Institute",
    timeZone: "America/New_York",
    language: "en-US",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    criticalRisksOnly: false,
    dailyDigest: true,
    weeklyReport: true,
  });
  
  const [apiSettings, setApiSettings] = useState({
    apiEnabled: true,
    apiKey: "hdep_sk_12345678abcdefgh",
    allowExternalAccess: false,
    rateLimitRequests: 100,
  });
  
  // Handle setting changes
  const updateGeneralSetting = (key: keyof typeof generalSettings, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const updateNotificationSetting = (key: keyof typeof notificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const updateApiSetting = (key: keyof typeof apiSettings, value: any) => {
    setApiSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const regenerateApiKey = () => {
    // In a real app, would call an API to generate a secure key
    const newKey = `hdep_sk_${Math.random().toString(36).substring(2, 15)}`;
    updateApiSetting('apiKey', newKey);
    
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been created. Remember to update your applications.",
    });
  };
  
  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-hdep-primary">Settings</h1>
      
      <Tabs defaultValue="general">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API & Integrations</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your dashboard preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dashboard-name">Dashboard Name</Label>
                  <Input
                    id="dashboard-name"
                    value={generalSettings.dashboardName}
                    onChange={(e) => updateGeneralSetting('dashboardName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input
                    id="org-name"
                    value={generalSettings.organizationName}
                    onChange={(e) => updateGeneralSetting('organizationName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <select
                    id="timezone"
                    value={generalSettings.timeZone}
                    onChange={(e) => updateGeneralSetting('timeZone', e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={generalSettings.language}
                    onChange={(e) => updateGeneralSetting('language', e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Español</option>
                    <option value="fr-FR">Français</option>
                    <option value="de-DE">Deutsch</option>
                  </select>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Display Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for the dashboard
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compact View</Label>
                      <p className="text-sm text-muted-foreground">
                        Display more information in a compact layout
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <Button onClick={saveSettings} className="bg-hdep-primary hover:bg-hdep-primary/90">
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Methods</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts and notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="email-alerts" 
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) => updateNotificationSetting('emailAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive critical alerts via SMS
                    </p>
                  </div>
                  <Switch 
                    id="sms-alerts"
                    checked={notificationSettings.smsAlerts}
                    onCheckedChange={(checked) => updateNotificationSetting('smsAlerts', checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="critical-risks">Critical Risks Only</Label>
                    <p className="text-sm text-muted-foreground">
                      Only receive alerts for critical risk events
                    </p>
                  </div>
                  <Switch 
                    id="critical-risks"
                    checked={notificationSettings.criticalRisksOnly}
                    onCheckedChange={(checked) => updateNotificationSetting('criticalRisksOnly', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-digest">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary of all alerts and activities
                    </p>
                  </div>
                  <Switch 
                    id="daily-digest"
                    checked={notificationSettings.dailyDigest}
                    onCheckedChange={(checked) => updateNotificationSetting('dailyDigest', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-report">Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a comprehensive weekly compliance report
                    </p>
                  </div>
                  <Switch 
                    id="weekly-report"
                    checked={notificationSettings.weeklyReport}
                    onCheckedChange={(checked) => updateNotificationSetting('weeklyReport', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <Button onClick={saveSettings} className="bg-hdep-primary hover:bg-hdep-primary/90">
                Save Notification Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage API access and integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-enabled">API Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable API access to your HDEP data
                  </p>
                </div>
                <Switch 
                  id="api-enabled"
                  checked={apiSettings.apiEnabled}
                  onCheckedChange={(checked) => updateApiSetting('apiEnabled', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="api-key"
                    value={apiSettings.apiKey}
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" onClick={regenerateApiKey}>
                    Regenerate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your secret API key. Keep this secure and never share it publicly.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rate-limit">Rate Limit (requests per minute)</Label>
                <Input
                  id="rate-limit"
                  type="number"
                  min="1"
                  value={apiSettings.rateLimitRequests}
                  onChange={(e) => updateApiSetting('rateLimitRequests', parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="external-access">External Network Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow API access from outside your organization's network
                  </p>
                </div>
                <Switch 
                  id="external-access"
                  checked={apiSettings.allowExternalAccess}
                  onCheckedChange={(checked) => updateApiSetting('allowExternalAccess', checked)}
                />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Connected Services</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold">EHR</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Electronic Health Record System</h4>
                        <p className="text-sm text-muted-foreground">Connected on April 12, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">BC</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Blockchain Verification Service</h4>
                        <p className="text-sm text-muted-foreground">Connected on March 5, 2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Connect New Service
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <Button onClick={saveSettings} className="bg-hdep-primary hover:bg-hdep-primary/90">
                Save API Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account and user profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">DS</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Dr. Smith</h3>
                  <p className="text-sm text-muted-foreground">Administrator</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Upload Photo</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" defaultValue="David Smith, MD" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="dr.smith@healthcareinstitute.org" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input id="job-title" defaultValue="Chief Medical Officer" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Medical Affairs" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button variant="outline" className="w-full">Change Password</Button>
                  <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Activity Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about new login attempts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="destructive" className="w-full sm:w-auto">
                  Deactivate Account
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-6">
              <Button onClick={saveSettings} className="bg-hdep-primary hover:bg-hdep-primary/90">
                Save Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
