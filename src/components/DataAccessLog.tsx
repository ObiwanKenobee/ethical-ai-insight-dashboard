
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHDEPStore, AccessLogEntry } from '@/store/useHDEPStore';
import { auditLogService } from '@/services/auditLogService';
import { blockchainLogger } from '@/services/blockchainLogger';
import { ExternalLink, Check, AlertTriangle } from 'lucide-react';

interface DataAccessLogProps {
  patientId?: string;
  maxEntries?: number;
  className?: string;
}

const DataAccessLog: React.FC<DataAccessLogProps> = ({ patientId, maxEntries = 10, className }) => {
  const { accessLogs } = useHDEPStore();
  const [filteredLogs, setFilteredLogs] = useState<AccessLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState<{[key: string]: boolean}>({});
  const [verified, setVerified] = useState<{[key: string]: boolean}>({});
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    let filtered = [...accessLogs];
    
    // Apply patient filter if provided
    if (patientId) {
      filtered = filtered.filter(log => log.patientId === patientId);
    }
    
    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(log => log.dataCategory === filter);
    }
    
    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Limit entries if specified
    if (maxEntries) {
      filtered = filtered.slice(0, maxEntries);
    }
    
    setFilteredLogs(filtered);
  }, [accessLogs, patientId, filter, maxEntries]);
  
  const handleVerifyHash = async (logId: string, hash?: string) => {
    if (!hash) return;
    
    setVerifying(prev => ({ ...prev, [logId]: true }));
    
    try {
      const isVerified = await blockchainLogger.verifyHash(hash);
      setVerified(prev => ({ ...prev, [logId]: isVerified }));
    } catch (error) {
      console.error('Error verifying hash:', error);
      setVerified(prev => ({ ...prev, [logId]: false }));
    } finally {
      setVerifying(prev => ({ ...prev, [logId]: false }));
    }
  };
  
  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-hdep-primary">Data Access Log</CardTitle>
            <CardDescription>Audit trail of data access events</CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Clinical Notes">Clinical Notes</SelectItem>
                <SelectItem value="Imaging Data">Imaging Data</SelectItem>
                <SelectItem value="Lab Results">Lab Results</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Data Category</TableHead>
                <TableHead>Blockchain Record</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No access logs found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{formatTimestamp(log.timestamp)}</TableCell>
                    <TableCell>{log.userName}</TableCell>
                    <TableCell>
                      <Badge variant={log.action.includes('VIEW') ? 'outline' : 'default'}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.dataCategory}</TableCell>
                    <TableCell>
                      {log.blockchainHash ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground truncate w-16">
                            {log.blockchainHash.substring(0, 10)}...
                          </span>
                          
                          {verifying[log.id] ? (
                            <Badge variant="outline" className="animate-pulse">Verifying...</Badge>
                          ) : verified[log.id] !== undefined ? (
                            verified[log.id] ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Check size={14} className="mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <AlertTriangle size={14} className="mr-1" />
                                Invalid
                              </Badge>
                            )
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleVerifyHash(log.id, log.blockchainHash)}
                              className="h-7"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              Verify
                            </Button>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not logged</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataAccessLog;
