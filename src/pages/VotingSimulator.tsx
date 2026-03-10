import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, RotateCcw, ScanFace, Vote, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const VotingSimulator: React.FC = () => {
  const navigate = useNavigate();
  const {
    state,
    candidates,
    completeVerification,
    selectCandidate,
    castVote,
    verifyLatestVote,
    simulateFullProcess,
    resetSimulation,
  } = useSimulation();

  const selectedCandidate = candidates.find((candidate) => candidate.id === state.selectedCandidateId) ?? null;

  const handleStepByStep = () => {
    if (!state.identityVerified) {
      completeVerification();
      return;
    }

    if (!state.selectedCandidateId) {
      selectCandidate(candidates[0].id);
      return;
    }

    if (!state.voteRecorded) {
      castVote();
      return;
    }

    if (state.voteReceipt?.status !== 'Verified') {
      verifyLatestVote();
    }
  };

  const currentStep = !state.identityVerified
    ? 'Verify voter identity'
    : !state.selectedCandidateId
      ? 'Select candidate'
      : !state.voteRecorded
        ? 'Cast vote'
        : state.voteReceipt?.status !== 'Verified'
          ? 'Verify vote on network'
          : 'Simulation complete';

  return (
    <div className="simulator-page">
      <div className="simulator-header">
        <h1>End-to-End Voting Simulator</h1>
        <p>Run the full biometric to blockchain process from one place.</p>
      </div>

      <div className="simulator-controls">
        <button className="simulator-btn primary" onClick={() => simulateFullProcess()}>
          <PlayCircle size={18} />
          Simulate Entire Flow
        </button>
        <button className="simulator-btn secondary" onClick={handleStepByStep}>
          <ArrowRight size={18} />
          Run Next Step
        </button>
        <button className="simulator-btn secondary" onClick={resetSimulation}>
          <RotateCcw size={18} />
          Reset Session
        </button>
      </div>

      <div className="simulator-grid">
        <div className="simulator-card">
          <h3>Process State</h3>
          <div className="sim-status-list">
            <div className={`sim-status-item ${state.identityVerified ? 'done' : ''}`}>
              <ScanFace size={18} />
              <span>Biometric Verification</span>
              <strong>{state.identityVerified ? 'Completed' : 'Pending'}</strong>
            </div>
            <div className={`sim-status-item ${Boolean(state.selectedCandidateId) ? 'done' : ''}`}>
              <Vote size={18} />
              <span>Candidate Selection</span>
              <strong>{state.selectedCandidateId ? 'Selected' : 'Pending'}</strong>
            </div>
            <div className={`sim-status-item ${state.voteRecorded ? 'done' : ''}`}>
              <CheckCircle2 size={18} />
              <span>Vote Recording</span>
              <strong>{state.voteRecorded ? 'Recorded' : 'Pending'}</strong>
            </div>
          </div>
          <p className="sim-current-step">Current step: {currentStep}</p>
        </div>

        <div className="simulator-card">
          <h3>Current Session</h3>
          <div className="sim-kv">
            <span>UID</span>
            <strong>{state.uid ?? 'Not generated'}</strong>
          </div>
          <div className="sim-kv">
            <span>Candidate</span>
            <strong>{selectedCandidate ? `${selectedCandidate.name} (${selectedCandidate.party})` : 'Not selected'}</strong>
          </div>
          <div className="sim-kv">
            <span>Token</span>
            <strong>{state.voteReceipt?.token ?? 'N/A'}</strong>
          </div>
          <div className="sim-kv">
            <span>Blockchain Hash</span>
            <strong>{state.voteReceipt?.hash ?? 'N/A'}</strong>
          </div>
          <div className="sim-kv">
            <span>Status</span>
            <strong>{state.voteReceipt?.status ?? 'Not submitted'}</strong>
          </div>
        </div>

        <div className="simulator-card full-width">
          <h3>Jump to Live Screens</h3>
          <div className="simulator-links">
            <button className="sim-link-btn" onClick={() => navigate('/verification')}>Biometric Console</button>
            <button className="sim-link-btn" onClick={() => navigate('/voting')}>Ballot Terminal</button>
            <button className="sim-link-btn" onClick={() => navigate('/voting-status')}>Blockchain Dashboard</button>
            <button className="sim-link-btn" onClick={() => navigate('/audit-trail')}>Audit Trail</button>
            <button className="sim-link-btn" onClick={() => navigate('/results')}>Election Results</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingSimulator;
