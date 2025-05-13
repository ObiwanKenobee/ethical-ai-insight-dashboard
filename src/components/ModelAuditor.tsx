
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useHDEPStore, ModelPerformanceMetric } from '@/store/useHDEPStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelAuditorProps {
  modelId?: string;
  className?: string;
}

const ModelAuditor: React.FC<ModelAuditorProps> = ({ modelId, className }) => {
  const { modelMetrics } = useHDEPStore();
  const [selectedModel, setSelectedModel] = useState<string | undefined>(modelId);
  
  // Filter metrics based on the selected model
  const allModels = modelMetrics;
  const filteredModel = selectedModel 
    ? modelMetrics.find(m => m.modelId === selectedModel) 
    : (modelMetrics.length > 0 ? modelMetrics[0] : null);
  
  // If no model is found, show empty state
  if (!filteredModel) {
    return (
      <Card className={`shadow-md ${className}`}>
        <CardHeader>
          <CardTitle className="text-hdep-primary">Model Auditor</CardTitle>
          <CardDescription>No model data available</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No model metrics available for analysis</p>
        </CardContent>
      </Card>
    );
  }
  
  // Prepare fairness category data for the chart
  const fairnessData = [
    { name: 'Age', score: filteredModel.categories.age * 100 },
    { name: 'Gender', score: filteredModel.categories.gender * 100 },
    { name: 'Ethnicity', score: filteredModel.categories.ethnicity * 100 },
  ];
  
  // Calculate the overall risk color based on the fairness score
  const getRiskColor = (score: number) => {
    if (score >= 0.85) return 'bg-hdep-success';
    if (score >= 0.75) return 'bg-hdep-warning';
    return 'bg-hdep-error';
  };
  
  const getFairnessColor = (score: number) => {
    if (score >= 85) return '#2EB67D'; // green
    if (score >= 75) return '#ECB22E'; // yellow
    return '#E01E5A'; // red
  };
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <CardTitle className="text-hdep-primary">Model Auditor</CardTitle>
        <CardDescription>Performance and fairness metrics</CardDescription>
      </CardHeader>
      
      <CardContent>
        {allModels.length > 1 && (
          <div className="mb-6">
            <Tabs defaultValue={selectedModel || allModels[0]?.modelId}>
              <TabsList className="w-full">
                {allModels.map(model => (
                  <TabsTrigger
                    key={model.modelId}
                    value={model.modelId}
                    onClick={() => setSelectedModel(model.modelId)}
                    className={selectedModel === model.modelId ? 'bg-hdep-primary text-white' : ''}
                  >
                    {model.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Accuracy</span>
                  <span className="text-sm">{(filteredModel.accuracy * 100).toFixed(1)}%</span>
                </div>
                <Progress value={filteredModel.accuracy * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">False Positives</span>
                  <span className="text-sm">{(filteredModel.falsePositives * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={filteredModel.falsePositives * 100} 
                  className={cn("h-2", filteredModel.falsePositives > 0.1 ? "bg-red-100" : "bg-amber-100")} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">False Negatives</span>
                  <span className="text-sm">{(filteredModel.falseNegatives * 100).toFixed(1)}%</span>
                </div>
                <Progress 
                  value={filteredModel.falseNegatives * 100} 
                  className={cn("h-2", filteredModel.falseNegatives > 0.05 ? "bg-red-100" : "bg-amber-100")}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Fairness Analysis</h3>
            
            <div className="mb-4 flex items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mr-4 ${getRiskColor(filteredModel.fairnessScore)}`}>
                <span className="text-white font-bold text-xl">
                  {(filteredModel.fairnessScore * 100).toFixed(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium">Overall Fairness Score</h4>
                <p className="text-sm text-muted-foreground">
                  {filteredModel.fairnessScore < 0.75 && (
                    <span className="flex items-center text-hdep-error">
                      <AlertCircle size={14} className="mr-1" />
                      Potential bias detected
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={fairnessData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Fairness Score']} />
                  <Bar dataKey="score" name="Fairness Score">
                    {fairnessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getFairnessColor(entry.score)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelAuditor;
