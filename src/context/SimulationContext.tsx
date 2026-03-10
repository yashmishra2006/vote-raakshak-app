import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CANDIDATES } from '../data/candidates';

export type AuditLevel = 'info' | 'warning' | 'alert' | 'success';

export interface AuditEntry {
  id: string;
  time: string;
  level: AuditLevel;
  message: string;
}

export interface VoteReceipt {
  token: string;
  hash: string;
  encryptedWith: string;
  status: 'Pending Verification' | 'Verified';
  createdAt: string;
}

interface SimulationState {
  systemActive: boolean;
  fingerprintPlaced: boolean;
  identityVerified: boolean;
  uid: string | null;
  ballotUnlocked: boolean;
  selectedCandidateId: number | null;
  voteRecorded: boolean;
  voteReceipt: VoteReceipt | null;
  verificationStatus: 'idle' | 'in_progress' | 'verified';
  totalVotesCast: number;
  totalVotesVerified: number;
  duplicateVotesDetected: number;
  nodesOnline: number;
  totalNodes: number;
  consensusHealthy: boolean;
  auditLog: AuditEntry[];
}

interface SimulationContextValue {
  state: SimulationState;
  candidates: typeof CANDIDATES;
  startVerification: () => void;
  completeVerification: () => string;
  selectCandidate: (candidateId: number | null) => void;
  castVote: () => VoteReceipt | null;
  verifyLatestVote: () => void;
  addAuditLog: (level: AuditLevel, message: string) => void;
  exportAuditLog: () => void;
  simulateFullProcess: () => VoteReceipt;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextValue | undefined>(undefined);

const INITIAL_STATE: SimulationState = {
  systemActive: true,
  fingerprintPlaced: true,
  identityVerified: false,
  uid: null,
  ballotUnlocked: false,
  selectedCandidateId: null,
  voteRecorded: false,
  voteReceipt: null,
  verificationStatus: 'idle',
  totalVotesCast: 15234567,
  totalVotesVerified: 15234562,
  duplicateVotesDetected: 5,
  nodesOnline: 12,
  totalNodes: 12,
  consensusHealthy: true,
  auditLog: [
    {
      id: 'seed-1',
      time: '14:20:30',
      level: 'info',
      message: 'Consensus reached: 12/12 nodes agreed',
    },
    {
      id: 'seed-2',
      time: '14:22:45',
      level: 'alert',
      message: 'Fingerprint mismatch for UID 0x9D4C1F8B...',
    },
    {
      id: 'seed-3',
      time: '14:25:01',
      level: 'success',
      message: 'Block #45,679 validated successfully',
    },
  ],
};

const nowTime = () =>
  new Date().toLocaleTimeString('en-IN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const nowStamp = () =>
  new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

const randomHex = (length: number) => {
  const chars = 'abcdef0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const createUid = () =>
  `${randomHex(4).toUpperCase()}-${randomHex(4).toUpperCase()}-${randomHex(4).toUpperCase()}-${randomHex(4).toUpperCase()}`;

const createToken = () => `VT-${new Date().getFullYear()}-${Math.floor(10000000 + Math.random() * 89999999)}`;

const createHash = () => `0x${randomHex(16)}...`;

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SimulationState>(INITIAL_STATE);

  const addAuditLog = useCallback((level: AuditLevel, message: string) => {
    setState((prev) => ({
      ...prev,
      auditLog: [
        {
          id: `${Date.now()}-${Math.random()}`,
          time: nowTime(),
          level,
          message,
        },
        ...prev.auditLog,
      ].slice(0, 20),
    }));
  }, []);

  const startVerification = useCallback(() => {
    setState((prev) => ({ ...prev, verificationStatus: 'in_progress' }));
  }, []);

  const completeVerification = useCallback(() => {
    const newUid = createUid();
    setState((prev) => ({
      ...prev,
      verificationStatus: 'verified',
      identityVerified: true,
      uid: newUid,
      ballotUnlocked: true,
    }));
    addAuditLog('success', `Biometric identity verified. UID issued: ${newUid}`);
    return newUid;
  }, [addAuditLog]);

  const selectCandidate = useCallback((candidateId: number | null) => {
    setState((prev) => ({ ...prev, selectedCandidateId: candidateId }));
  }, []);

  const castVote = useCallback(() => {
    if (!state.ballotUnlocked || !state.selectedCandidateId || state.voteRecorded) {
      return null;
    }

    const receipt: VoteReceipt = {
      token: createToken(),
      hash: createHash(),
      encryptedWith: 'AES-256',
      status: 'Pending Verification',
      createdAt: nowStamp(),
    };

    setState((prev) => ({
      ...prev,
      voteRecorded: true,
      voteReceipt: receipt,
      totalVotesCast: prev.totalVotesCast + 1,
    }));

    const votedCandidate = CANDIDATES.find((candidate) => candidate.id === state.selectedCandidateId);
    addAuditLog('success', `Vote cast for ${votedCandidate?.name ?? 'selected candidate'} with token ${receipt.token}`);

    return receipt;
  }, [addAuditLog, state.ballotUnlocked, state.selectedCandidateId, state.voteRecorded]);

  const verifyLatestVote = useCallback(() => {
    setState((prev) => {
      if (!prev.voteReceipt) {
        return prev;
      }

      if (prev.voteReceipt.status === 'Verified') {
        return prev;
      }

      return {
        ...prev,
        totalVotesVerified: prev.totalVotesVerified + 1,
        voteReceipt: {
          ...prev.voteReceipt,
          status: 'Verified',
        },
      };
    });

    addAuditLog('info', 'Latest vote reached validator consensus and is now verified.');
  }, [addAuditLog]);

  const exportAuditLog = useCallback(() => {
    const header = 'time,level,message\n';
    const lines = state.auditLog.map((entry) => `${entry.time},${entry.level},"${entry.message.replace(/"/g, '""')}"`).join('\n');
    const blob = new Blob([header + lines], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `voteraakshak-audit-${Date.now()}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    addAuditLog('info', 'Audit log exported as CSV report.');
  }, [addAuditLog, state.auditLog]);

  const simulateFullProcess = useCallback(() => {
    const autoCandidate = CANDIDATES[Math.floor(Math.random() * CANDIDATES.length)];
    const generatedUid = createUid();
    const receipt: VoteReceipt = {
      token: createToken(),
      hash: createHash(),
      encryptedWith: 'AES-256',
      status: 'Verified',
      createdAt: nowStamp(),
    };

    setState((prev) => ({
      ...prev,
      verificationStatus: 'verified',
      identityVerified: true,
      uid: generatedUid,
      ballotUnlocked: true,
      selectedCandidateId: autoCandidate.id,
      voteRecorded: true,
      voteReceipt: receipt,
      totalVotesCast: prev.totalVotesCast + 1,
      totalVotesVerified: prev.totalVotesVerified + 1,
    }));

    addAuditLog('success', `Full simulation completed. Vote verified for ${autoCandidate.name}.`);
    return receipt;
  }, [addAuditLog]);

  const resetSimulation = useCallback(() => {
    setState((prev) => ({
      ...INITIAL_STATE,
      totalVotesCast: prev.totalVotesCast,
      totalVotesVerified: Math.min(prev.totalVotesVerified, prev.totalVotesCast),
      duplicateVotesDetected: prev.duplicateVotesDetected,
      auditLog: prev.auditLog,
    }));
    addAuditLog('warning', 'Simulation reset for a fresh voter session.');
  }, [addAuditLog]);

  const value = useMemo(
    () => ({
      state,
      candidates: CANDIDATES,
      startVerification,
      completeVerification,
      selectCandidate,
      castVote,
      verifyLatestVote,
      addAuditLog,
      exportAuditLog,
      simulateFullProcess,
      resetSimulation,
    }),
    [
      state,
      startVerification,
      completeVerification,
      selectCandidate,
      castVote,
      verifyLatestVote,
      addAuditLog,
      exportAuditLog,
      simulateFullProcess,
      resetSimulation,
    ]
  );

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
};
