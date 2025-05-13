
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ConsentManager from '@/components/ConsentManager';
import DataAccessLog from '@/components/DataAccessLog';
import { User, Calendar, MapPin, Phone, Mail } from 'lucide-react';

// Mock patient data
const patients = [
  {
    id: 'patient-001',
    name: 'Sarah Johnson',
    dateOfBirth: '1982-05-15',
    address: '123 Main St, Boston, MA',
    phone: '(555) 123-4567',
    email: 'sarah.j@example.com',
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    id: 'patient-002',
    name: 'Michael Chen',
    dateOfBirth: '1975-11-30',
    address: '456 Oak Ave, San Francisco, CA',
    phone: '(555) 987-6543',
    email: 'michael.c@example.com',
    photo: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    id: 'patient-003',
    name: 'Emma Rodriguez',
    dateOfBirth: '1990-03-22',
    address: '789 Pine Rd, Chicago, IL',
    phone: '(555) 456-7890',
    email: 'emma.r@example.com',
    photo: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
];

const PatientProfile = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle patient selection
  const handleSelectPatient = (patient: typeof patients[0]) => {
    setSelectedPatient(patient);
    toast({
      title: "Patient Selected",
      description: `Viewing profile for ${patient.name}`,
    });
  };
  
  // Format date of birth
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-hdep-primary">Patient Profiles</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Patient Directory</CardTitle>
            <CardDescription>Select a patient to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input 
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 max-h-[500px] overflow-auto pr-2">
              {filteredPatients.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No patients found
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => handleSelectPatient(patient)}
                    className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                      selectedPatient.id === patient.id ? 'bg-hdep-light border border-hdep-primary' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img 
                        src={patient.photo} 
                        alt={patient.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {patient.id}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={selectedPatient.photo} 
                      alt={selectedPatient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>{selectedPatient.name}</CardTitle>
                    <CardDescription>Patient ID: {selectedPatient.id}</CardDescription>
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger 
                    value="profile" 
                    className={activeTab === 'profile' ? 'bg-hdep-primary text-white' : ''}
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="consent" 
                    className={activeTab === 'consent' ? 'bg-hdep-primary text-white' : ''}
                  >
                    Consent Management
                  </TabsTrigger>
                  <TabsTrigger 
                    value="access-logs" 
                    className={activeTab === 'access-logs' ? 'bg-hdep-primary text-white' : ''}
                  >
                    Access Logs
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Date of Birth</Label>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatDate(selectedPatient.dateOfBirth)}</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Address</Label>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedPatient.address}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground">Phone</Label>
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedPatient.phone}</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <div className="flex items-center mt-1">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedPatient.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium">Medical Summary</h3>
                      <Button variant="outline" size="sm" className="ml-auto">View Full Records</Button>
                    </div>
                    
                    <Card className="bg-muted/40">
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground italic">
                          Patient records are restricted. Full medical history can be accessed with 
                          appropriate permissions and will be logged for compliance purposes.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="consent" className="mt-0">
                  <ConsentManager 
                    patientId={selectedPatient.id}
                    patientName={selectedPatient.name}
                  />
                </TabsContent>
                
                <TabsContent value="access-logs" className="mt-0">
                  <DataAccessLog patientId={selectedPatient.id} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
