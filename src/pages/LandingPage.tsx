import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Vote, Network, Shield, Lock, PlayCircle } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useSimulation();

  return (
    <div className="landing-page">
      <section className="hero-section">
        <h1 className="hero-title">Decentralized Biometric Voting Infrastructure</h1>
        <p className="hero-subtitle">
          <span>Secure</span> • <span>Transparent</span> • <span>Tamper-proof elections powered by blockchain and biometrics</span>
        </p>

        <div className="hero-actions">
          <button className="hero-button primary" onClick={() => navigate('/verification')}>
            Start Voter Verification
          </button>
          <button className="hero-button secondary" onClick={() => navigate('/simulator')}>
            <PlayCircle size={18} />
            Simulate Full Voting Process
          </button>
        </div>

        <div className="process-flow">
          <div className="flow-item">
            <div className="flow-icon">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="28" fill="#E8EDF2" />
                <text x="30" y="38" textAnchor="middle" fontSize="16" fill="#003D82">👤</text>
              </svg>
            </div>
            <p>Voter</p>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">
            <div className="flow-icon">
              <Fingerprint size={32} strokeWidth={2} color="#003D82" />
            </div>
            <p>Fingerprint</p>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">
            <div className="flow-icon">
              <Lock size={32} strokeWidth={2} color="#003D82" />
            </div>
            <p>UID</p>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">
            <div className="flow-icon">
              <Vote size={32} strokeWidth={2} color="#003D82" />
            </div>
            <p>Vote</p>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">
            <div className="flow-icon">
              <Network size={32} strokeWidth={2} color="#003D82" />
            </div>
            <p>Blockchain</p>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">
            <div className="flow-icon">
              <Shield size={32} strokeWidth={2} color="#2E7D32" />
            </div>
            <p>Verification</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">System Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Fingerprint size={40} color="#003D82" />
            </div>
            <h3>Biometric Identity</h3>
            <p>5-finger biometric authentication ensures unique voter identification and prevents impersonation</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <rect x="5" y="10" width="30" height="25" rx="2" fill="none" stroke="#003D82" strokeWidth="2" />
                <rect x="15" y="15" width="10" height="12" rx="1" fill="#003D82" />
              </svg>
            </div>
            <h3>Offline EVM Voting</h3>
            <p>Standalone electronic voting machines work without internet connectivity for enhanced security</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Network size={40} color="#003D82" />
            </div>
            <h3>Blockchain Audit Trail</h3>
            <p>Every vote is cryptographically recorded on an immutable distributed ledger for transparency</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="4" fill="#003D82" />
                <circle cx="10" cy="15" r="3" fill="#003D82" />
                <circle cx="30" cy="15" r="3" fill="#003D82" />
                <circle cx="10" cy="25" r="3" fill="#003D82" />
                <circle cx="30" cy="25" r="3" fill="#003D82" />
                <line x1="20" y1="20" x2="10" y2="15" stroke="#003D82" strokeWidth="1.5" />
                <line x1="20" y1="20" x2="30" y2="15" stroke="#003D82" strokeWidth="1.5" />
                <line x1="20" y1="20" x2="10" y2="25" stroke="#003D82" strokeWidth="1.5" />
                <line x1="20" y1="20" x2="30" y2="25" stroke="#003D82" strokeWidth="1.5" />
              </svg>
            </div>
            <h3>Distributed Governance</h3>
            <p>Multiple independent validator nodes ensure no single point of control or failure</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={40} color="#003D82" />
            </div>
            <h3>Vote Privacy Protection</h3>
            <p>Advanced encryption ensures ballot secrecy while maintaining verifiability</p>
          </div>
        </div>
      </section>

      <section className="metrics-section">
        <h2 className="section-title">Live Election Transparency Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{state.totalVotesCast.toLocaleString()}</div>
            <div className="metric-label">Total Votes Cast</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">1,234</div>
            <div className="metric-label">Active EVM Machines</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">45,678</div>
            <div className="metric-label">Blockchain Blocks Created</div>
          </div>
          <div className="metric-card">
            <div className="metric-value status-verified">
              {((state.totalVotesVerified / Math.max(state.totalVotesCast, 1)) * 100).toFixed(2)}%
            </div>
            <div className="metric-label">Verification Status</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
