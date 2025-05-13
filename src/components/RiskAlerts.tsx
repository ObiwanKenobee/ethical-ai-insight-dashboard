
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useHDEPStore, RiskAlert } from '@/store/useHDEPStore';
import { Check, AlertTriangle } from 'lucide-react';

interface RiskAlertsProps {
  maxAlerts?: number;
  className?: string;
}

const RiskAlerts: React.FC<RiskAlertsProps> = ({ maxAlerts = 5, className }) => {
  const { riskAlerts, acknowledgeAlert } = useHDEPStore();
  
  // Filter and sort alerts (unacknowledged first, then by level, then by timestamp)
  const sortedAlerts = [...riskAlerts]
    .sort((a, b) => {
      // Unacknowledged first
      if (a.acknowledged !== b.acknowledged) {
        return a.acknowledged ? 1 : -1;
      }
      
      // Then by level severity
      const levelOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      if (levelOrder[a.level] !== levelOrder[b.level]) {
        return levelOrder[a.level] - levelOrder[b.level];
      }
      
      // Then by timestamp (newest first)
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })
    .slice(0, maxAlerts);
  
  // Get the level badge styling
  const getLevelBadge = (level: RiskAlert['level']) => {
    switch (level) {
      case 'critical':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Critical
          </Badge>
        );
      case 'high':
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Low
          </Badge>
        );
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  // Handle acknowledging an alert
  const handleAcknowledge = (alertId: string) => {
    acknowledgeAlert(alertId);
  };
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <CardTitle className="text-hdep-primary flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-hdep-accent" />
          Risk Alerts
        </CardTitle>
        <CardDescription>Model and compliance risk notifications</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-80">
          {sortedAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No active alerts at this time.
            </div>
          ) : (
            <div className="space-y-4">
              {sortedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.acknowledged
                      ? 'bg-gray-50 border-gray-200'
                      : alert.level === 'critical'
                      ? 'bg-red-50 border-red-200'
                      : alert.level === 'high'
                      ? 'bg-orange-50 border-orange-200'
                      : alert.level === 'medium'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {getLevelBadge(alert.level)}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                    
                    {alert.acknowledged ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Check size={12} className="mr-1" />
                        Acknowledged
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAcknowledge(alert.id)}
                        className="h-7 text-xs"
                      >
                        Acknowledge
                      </Button>
                    )}
                  </div>
                  
                  <h4 className="font-medium mb-1">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {alert.description}
                  </p>
                  
                  {(alert.modelId || alert.patientId) && (
                    <div className="text-xs text-muted-foreground">
                      {alert.modelId && <div>Model ID: {alert.modelId}</div>}
                      {alert.patientId && <div>Patient ID: {alert.patientId}</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" onClick={() => {}}>
          View All Alerts
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RiskAlerts;
