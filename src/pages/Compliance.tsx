
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComplianceMap from '@/components/ComplianceMap';
import { AlertTriangle, CheckCircle, FileText, Download, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Compliance = () => {
  // Mock compliance scores
  const complianceScores = {
    hipaa: 92,
    gdpr: 85,
    pipeda: 88,
    aiAct: 72,
    overall: 84,
  };
  
  // Get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 80) return 'bg-blue-600';
    if (score >= 70) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-hdep-primary">Compliance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-4">
                <span className="text-2xl font-bold text-hdep-primary">{complianceScores.overall}%</span>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#0077B6" 
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45 * complianceScores.overall / 100} ${2 * Math.PI * 45 * (100 - complianceScores.overall) / 100}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-lg">Overall Compliance</h3>
              <p className="text-sm text-muted-foreground">System-wide score</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">HIPAA (US)</span>
                  <span className="text-sm font-medium">{complianceScores.hipaa}%</span>
                </div>
                <Progress 
                  value={complianceScores.hipaa} 
                  className="h-2" 
                  indicatorClassName={getProgressColor(complianceScores.hipaa)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">GDPR (EU)</span>
                  <span className="text-sm font-medium">{complianceScores.gdpr}%</span>
                </div>
                <Progress 
                  value={complianceScores.gdpr} 
                  className="h-2" 
                  indicatorClassName={getProgressColor(complianceScores.gdpr)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">PIPEDA (Canada)</span>
                  <span className="text-sm font-medium">{complianceScores.pipeda}%</span>
                </div>
                <Progress 
                  value={complianceScores.pipeda} 
                  className="h-2" 
                  indicatorClassName={getProgressColor(complianceScores.pipeda)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">EU AI Act</span>
                  <span className="text-sm font-medium">{complianceScores.aiAct}%</span>
                </div>
                <Progress 
                  value={complianceScores.aiAct} 
                  className="h-2" 
                  indicatorClassName={getProgressColor(complianceScores.aiAct)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-hdep-primary" />
              <CardTitle>Compliance Actions</CardTitle>
            </div>
            <CardDescription>Required actions to improve compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md bg-red-50 border-red-100">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Critical: EU AI Act</h4>
                    <p className="text-sm text-red-700">Complete risk assessment for high-risk AI system</p>
                    <Button size="sm" variant="outline" className="mt-2 h-8 text-xs">
                      Start Assessment
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md bg-yellow-50 border-yellow-100">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Warning: GDPR</h4>
                    <p className="text-sm text-yellow-700">Verify training data erasure process</p>
                    <Button size="sm" variant="outline" className="mt-2 h-8 text-xs">
                      Review Process
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md bg-blue-50 border-blue-100">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800">Recommended: HIPAA</h4>
                    <p className="text-sm text-blue-700">Update model documentation for training data sources</p>
                    <Button size="sm" variant="outline" className="mt-2 h-8 text-xs">
                      Update Docs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Regulatory Compliance Map</CardTitle>
            <CardDescription>Detailed compliance status by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ComplianceMap />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-hdep-primary" />
                <CardTitle>Compliance Reporting</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
            <CardDescription>Generated reports and audit trail</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-hdep-primary mr-3" />
                  <div>
                    <h4 className="font-medium">Monthly HIPAA Compliance Report</h4>
                    <p className="text-xs text-muted-foreground">Generated May 1, 2025</p>
                  </div>
                </div>
                <Download className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-hdep-primary mr-3" />
                  <div>
                    <h4 className="font-medium">GDPR Data Processing Audit</h4>
                    <p className="text-xs text-muted-foreground">Generated April 15, 2025</p>
                  </div>
                </div>
                <Download className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-hdep-primary mr-3" />
                  <div>
                    <h4 className="font-medium">AI Ethics Committee Review</h4>
                    <p className="text-xs text-muted-foreground">Generated April 5, 2025</p>
                  </div>
                </div>
                <Download className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-hdep-primary mr-3" />
                  <div>
                    <h4 className="font-medium">Quarterly Compliance Assessment</h4>
                    <p className="text-xs text-muted-foreground">Generated March 31, 2025</p>
                  </div>
                </div>
                <Download className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Updates</CardTitle>
            <CardDescription>Recent and upcoming regulatory changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <h4 className="font-medium">EU AI Act - New Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  New risk assessment requirements for high-risk AI systems take effect on June 15, 2025.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Upcoming</span>
                  <span className="text-xs text-muted-foreground ml-2">45 days remaining</span>
                </div>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <h4 className="font-medium">HIPAA Safe Harbor Update</h4>
                <p className="text-sm text-muted-foreground">
                  Updated guidance on de-identification standards for AI training data published.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Recent</span>
                  <span className="text-xs text-muted-foreground ml-2">Published April 22, 2025</span>
                </div>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-1">
                <h4 className="font-medium">Canada's PIPEDA Modernization</h4>
                <p className="text-sm text-muted-foreground">
                  Public consultation on PIPEDA amendments related to AI governance open for comments.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Action Required</span>
                  <span className="text-xs text-muted-foreground ml-2">Deadline May 30, 2025</span>
                </div>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <h4 className="font-medium">US FDA AI/ML Framework</h4>
                <p className="text-sm text-muted-foreground">
                  FDA released new framework for regulating AI/ML in medical devices and clinical decision support.
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Industry Update</span>
                  <span className="text-xs text-muted-foreground ml-2">Published March 15, 2025</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compliance;
