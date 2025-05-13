
import { create } from 'zustand';

export interface ConsentRecord {
  id: string;
  patientId: string;
  scopes: {
    diagnostics: boolean;
    research: boolean;
    training: boolean;
  };
  timestamp: string;
}

export interface AccessLogEntry {
  id: string;
  userId: string;
  userName: string;
  patientId: string;
  action: string;
  timestamp: string;
  dataCategory: string;
  purpose: string;
  blockchainHash?: string;
}

export interface RiskAlert {
  id: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  modelId?: string;
  patientId?: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface ModelPerformanceMetric {
  modelId: string;
  name: string;
  accuracy: number;
  falsePositives: number;
  falseNegatives: number;
  fairnessScore: number;
  timestamp: string;
  categories: {
    age: number;
    gender: number;
    ethnicity: number;
  };
}

interface HDEPState {
  // User state
  currentUser: string;
  isAdmin: boolean;
  
  // Consent management
  consentRecords: ConsentRecord[];
  
  // Audit logs
  accessLogs: AccessLogEntry[];
  
  // Risk monitoring
  riskAlerts: RiskAlert[];
  modelMetrics: ModelPerformanceMetric[];
  
  // Application state
  activePage: string;
  
  // Actions
  setCurrentUser: (userId: string, isAdmin: boolean) => void;
  updateConsent: (patientId: string, scopes: {
    diagnostics?: boolean;
    research?: boolean;
    training?: boolean;
  }) => void;
  addAccessLog: (log: Omit<AccessLogEntry, 'id' | 'timestamp'>) => void;
  addRiskAlert: (alert: Omit<RiskAlert, 'id' | 'timestamp' | 'acknowledged'>) => void;
  acknowledgeAlert: (alertId: string) => void;
  updateModelMetrics: (metrics: Omit<ModelPerformanceMetric, 'timestamp'>) => void;
  setActivePage: (page: string) => void;
}

export const useHDEPStore = create<HDEPState>((set) => ({
  // Initial state
  currentUser: 'dr-smith',
  isAdmin: true,
  consentRecords: [
    {
      id: '1',
      patientId: 'patient-001',
      scopes: {
        diagnostics: true,
        research: true,
        training: false,
      },
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      patientId: 'patient-002',
      scopes: {
        diagnostics: true,
        research: false,
        training: false,
      },
      timestamp: new Date().toISOString(),
    },
  ],
  accessLogs: [
    {
      id: '1',
      userId: 'dr-jones',
      userName: 'Dr. Jones',
      patientId: 'patient-001',
      action: 'VIEW_RECORDS',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      dataCategory: 'Clinical Notes',
      purpose: 'Treatment',
      blockchainHash: '0x1a2b3c4d5e6f',
    },
    {
      id: '2',
      userId: 'dr-smith',
      userName: 'Dr. Smith',
      patientId: 'patient-001',
      action: 'RUN_AI_DIAGNOSIS',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      dataCategory: 'Imaging Data',
      purpose: 'Diagnosis',
      blockchainHash: '0x2b3c4d5e6f7g',
    },
  ],
  riskAlerts: [
    {
      id: '1',
      level: 'high',
      title: 'Model Bias Detected',
      description: 'Potential age-based treatment bias in cardiac model recommendations.',
      modelId: 'cardiac-v2',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      acknowledged: false,
    },
    {
      id: '2',
      level: 'medium',
      title: 'Consent Verification Required',
      description: 'Patient data used without explicit research consent verification.',
      patientId: 'patient-003',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      acknowledged: true,
    },
  ],
  modelMetrics: [
    {
      modelId: 'cardiac-v2',
      name: 'Cardiac Risk Assessment',
      accuracy: 0.89,
      falsePositives: 0.07,
      falseNegatives: 0.04,
      fairnessScore: 0.76,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      categories: {
        age: 0.68,
        gender: 0.82,
        ethnicity: 0.79,
      },
    },
    {
      modelId: 'oncology-v1',
      name: 'Tumor Detection',
      accuracy: 0.92,
      falsePositives: 0.05,
      falseNegatives: 0.03,
      fairnessScore: 0.85,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      categories: {
        age: 0.84,
        gender: 0.86,
        ethnicity: 0.85,
      },
    },
  ],
  activePage: 'dashboard',
  
  // Actions
  setCurrentUser: (userId, isAdmin) => set({ currentUser: userId, isAdmin }),
  
  updateConsent: (patientId, scopes) => set((state) => {
    // Find if consent record exists
    const existingIndex = state.consentRecords.findIndex(record => record.patientId === patientId);
    
    if (existingIndex >= 0) {
      // Update existing record
      const newRecords = [...state.consentRecords];
      newRecords[existingIndex] = {
        ...newRecords[existingIndex],
        scopes: {
          ...newRecords[existingIndex].scopes,
          ...scopes
        },
        timestamp: new Date().toISOString()
      };
      
      return { consentRecords: newRecords };
    } else {
      // Create new record
      const newRecord: ConsentRecord = {
        id: Date.now().toString(),
        patientId,
        scopes: {
          diagnostics: scopes.diagnostics || false,
          research: scopes.research || false,
          training: scopes.training || false
        },
        timestamp: new Date().toISOString()
      };
      
      return { consentRecords: [...state.consentRecords, newRecord] };
    }
  }),
  
  addAccessLog: (log) => set((state) => ({
    accessLogs: [
      {
        ...log,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      },
      ...state.accessLogs
    ]
  })),
  
  addRiskAlert: (alert) => set((state) => ({
    riskAlerts: [
      {
        ...alert,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        acknowledged: false
      },
      ...state.riskAlerts
    ]
  })),
  
  acknowledgeAlert: (alertId) => set((state) => ({
    riskAlerts: state.riskAlerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    )
  })),
  
  updateModelMetrics: (metrics) => set((state) => {
    const existingIndex = state.modelMetrics.findIndex(m => m.modelId === metrics.modelId);
    
    if (existingIndex >= 0) {
      const newMetrics = [...state.modelMetrics];
      newMetrics[existingIndex] = {
        ...metrics,
        timestamp: new Date().toISOString()
      };
      
      return { modelMetrics: newMetrics };
    } else {
      return {
        modelMetrics: [
          ...state.modelMetrics,
          {
            ...metrics,
            timestamp: new Date().toISOString()
          }
        ]
      };
    }
  }),
  
  setActivePage: (page) => set({ activePage: page })
}));
