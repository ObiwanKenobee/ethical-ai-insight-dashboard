
import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useHDEPStore } from '@/store/useHDEPStore';
import { consentService } from '@/services/consentService';
import { Info } from 'lucide-react';

interface ConsentManagerProps {
  patientId: string;
  patientName: string;
  className?: string;
}

const ConsentManager: React.FC<ConsentManagerProps> = ({ patientId, patientName, className }) => {
  const { toast } = useToast();
  const { consentRecords, updateConsent } = useHDEPStore();
  
  const [loading, setLoading] = useState(false);
  const [consentScopes, setConsentScopes] = useState({
    diagnostics: false,
    research: false,
    training: false,
  });
  
  // Find existing consent for this patient
  useEffect(() => {
    const existingConsent = consentRecords.find(record => record.patientId === patientId);
    
    if (existingConsent) {
      setConsentScopes(existingConsent.scopes);
    }
  }, [consentRecords, patientId]);
  
  const handleScopeChange = (scope: 'diagnostics' | 'research' | 'training', value: boolean) => {
    setConsentScopes(prev => ({
      ...prev,
      [scope]: value
    }));
  };
  
  const handleSaveConsent = async () => {
    try {
      setLoading(true);
      
      // Call the service and update the store
      const updatedConsent = await consentService.updateConsent(patientId, consentScopes);
      updateConsent(patientId, consentScopes);
      
      toast({
        title: "Consent updated",
        description: `Consent preferences for ${patientName} have been updated.`,
      });
    } catch (error) {
      console.error("Error updating consent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update consent preferences. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <CardTitle className="text-hdep-primary">Consent Manager</CardTitle>
        <CardDescription>Manage patient consent preferences</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Alert className="bg-hdep-light border-hdep-primary">
          <Info className="h-4 w-4 text-hdep-primary" />
          <AlertTitle>Patient: {patientName}</AlertTitle>
          <AlertDescription>
            ID: {patientId}
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">Diagnostics</h4>
              <p className="text-sm text-muted-foreground">
                Allow AI use for diagnostic purposes
              </p>
            </div>
            <Switch 
              checked={consentScopes.diagnostics}
              onCheckedChange={(value) => handleScopeChange('diagnostics', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">Research</h4>
              <p className="text-sm text-muted-foreground">
                Allow anonymized data use for research
              </p>
            </div>
            <Switch 
              checked={consentScopes.research}
              onCheckedChange={(value) => handleScopeChange('research', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">AI Training</h4>
              <p className="text-sm text-muted-foreground">
                Allow data to train AI models
              </p>
            </div>
            <Switch 
              checked={consentScopes.training}
              onCheckedChange={(value) => handleScopeChange('training', value)}
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSaveConsent}
          disabled={loading}
          className="w-full bg-hdep-primary hover:bg-hdep-primary/90"
        >
          {loading ? "Updating..." : "Save Consent Preferences"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConsentManager;
