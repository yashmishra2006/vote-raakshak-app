import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const VotingBallot: React.FC = () => {
  const navigate = useNavigate();
  const { state, candidates, selectCandidate, castVote, verifyLatestVote } = useSimulation();
  const [timeRemaining, setTimeRemaining] = useState(165);

  useEffect(() => {
    if (!state.ballotUnlocked) {
      navigate('/verification');
    }
  }, [navigate, state.ballotUnlocked]);

  useEffect(() => {
    if (state.voteRecorded) {
      return undefined;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [state.voteRecorded]);

  useEffect(() => {
    if (state.voteRecorded && state.voteReceipt?.status !== 'Verified') {
      const verifyTimeout = setTimeout(() => {
        verifyLatestVote();
      }, 2500);

      return () => clearTimeout(verifyTimeout);
    }

    return undefined;
  }, [state.voteReceipt?.status, state.voteRecorded, verifyLatestVote]);

  const handleConfirmVote = () => {
    castVote();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (state.voteRecorded && state.voteReceipt) {
    return (
      <div className="voting-page">
        <div className="confirmation-modal">
          <CheckCircle size={80} color="#2E7D32" />
          <h2 className="confirmation-title">Vote Recorded Successfully</h2>
          <div className="vote-details">
            <div className="detail-row">
              <span className="detail-label">Ballot Token:</span>
              <span className="detail-value">{state.voteReceipt.token}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Vote Encrypted:</span>
              <span className="detail-value">{state.voteReceipt.encryptedWith}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Blockchain Hash:</span>
              <span className="detail-value">{state.voteReceipt.hash}</span>
            </div>
            <div className="detail-row status-row">
              <span className="detail-label">Status:</span>
              <span className="status-badge">{state.voteReceipt.status}</span>
            </div>
          </div>
          <p className="confirmation-message">
            Your vote has been securely recorded and encrypted. It is being validated by the blockchain network.
          </p>
          <div className="voting-actions confirmation-actions">
            <button className="cancel-button" onClick={() => navigate('/')}>
              Close &amp; Return to Home
            </button>
            <button className="confirm-button" onClick={() => navigate('/voting-status')}>
              View Verification Status
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="voting-page">
      <div className="voting-container">
        <div className="voting-header">
          <h2>Select Your Candidate</h2>
          <div className="timer">
            <Clock size={20} />
            <span>Time Remaining: {formatTime(timeRemaining)}</span>
          </div>
        </div>

        <div className="candidates-list">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`candidate-card ${state.selectedCandidateId === candidate.id ? 'selected' : ''}`}
              onClick={() => selectCandidate(candidate.id)}
            >
              <div className="candidate-info">
                <div className="party-logo" style={{ backgroundColor: candidate.color }}>
                  <span>{candidate.photo}</span>
                </div>
                <div className="candidate-photo">{candidate.photo}</div>
                <div className="candidate-details">
                  <h3 className="candidate-name">{candidate.name}</h3>
                  <p className="candidate-party">{candidate.party}</p>
                </div>
              </div>
              <button
                className={`select-button ${state.selectedCandidateId === candidate.id ? 'selected' : ''}`}
                style={{
                  backgroundColor: state.selectedCandidateId === candidate.id ? candidate.color : undefined,
                }}
                type="button"
              >
                {state.selectedCandidateId === candidate.id ? 'SELECTED ✓' : 'SELECT'}
              </button>
            </div>
          ))}
        </div>

        <div className="voting-actions">
          <button
            className="confirm-button"
            disabled={!state.selectedCandidateId}
            onClick={handleConfirmVote}
          >
            Confirm Vote
          </button>
          <button className="cancel-button" onClick={() => selectCandidate(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingBallot;
