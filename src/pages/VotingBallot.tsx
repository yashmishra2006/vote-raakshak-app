import React, { useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  party: string;
  color: string;
  photo: string;
}

const VotingBallot: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [voteConfirmed, setVoteConfirmed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(165); // 2:45 in seconds

  const candidates: Candidate[] = [
    { id: 1, name: 'Rajesh Kumar', party: 'National Progress Party', color: '#1565C0', photo: '👨‍💼' },
    { id: 2, name: 'Priya Sharma', party: 'Democratic Alliance', color: '#2E7D32', photo: '👩‍💼' },
    { id: 3, name: 'Arun Patel', party: "People's Front", color: '#F57C00', photo: '👨‍💼' },
    { id: 4, name: 'Meera Singh', party: 'Unity Party', color: '#7B1FA2', photo: '👩‍💼' },
    { id: 5, name: 'Vijay Reddy', party: 'Reform Coalition', color: '#C62828', photo: '👨‍💼' },
  ];

  const handleConfirmVote = () => {
    if (selectedCandidate) {
      setVoteConfirmed(true);
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (voteConfirmed) {
    return (
      <div className="voting-page">
        <div className="confirmation-modal">
          <CheckCircle size={80} color="#2E7D32" />
          <h2 className="confirmation-title">Vote Recorded Successfully</h2>
          <div className="vote-details">
            <div className="detail-row">
              <span className="detail-label">Ballot Token:</span>
              <span className="detail-value">VT-2026-15234568</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Vote Encrypted:</span>
              <span className="detail-value">AES-256</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Blockchain Hash:</span>
              <span className="detail-value">0x7a9f4b2e3c1d8f6a...</span>
            </div>
            <div className="detail-row status-row">
              <span className="detail-label">Status:</span>
              <span className="status-badge">Pending Verification</span>
            </div>
          </div>
          <p className="confirmation-message">
            Your vote has been securely recorded and encrypted. It will be verified by the blockchain network within the next few minutes.
          </p>
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
              className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}
              onClick={() => setSelectedCandidate(candidate.id)}
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
                className={`select-button ${selectedCandidate === candidate.id ? 'selected' : ''}`}
                style={{
                  backgroundColor: selectedCandidate === candidate.id ? candidate.color : undefined,
                }}
              >
                {selectedCandidate === candidate.id ? 'SELECTED ✓' : 'SELECT'}
              </button>
            </div>
          ))}
        </div>

        <div className="voting-actions">
          <button
            className="confirm-button"
            disabled={!selectedCandidate}
            onClick={handleConfirmVote}
          >
            Confirm Vote
          </button>
          <button className="cancel-button" onClick={() => setSelectedCandidate(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingBallot;
