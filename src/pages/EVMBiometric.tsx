import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const EVMBiometric: React.FC = () => {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(87);
  const [verified, setVerified] = useState(false);

  const handleScan = () => {
    setScanning(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          setVerified(true);
          return 100;
        }
        return prev + 3;
      });
    }, 100);
  };

  return (
    <div className="evm-page">
      <div className="evm-container">
        {/* Step Indicator */}
        <div className="step-indicator">
          <div className="step completed">
            <div className="step-number">✓</div>
            <div className="step-label">Place 5 Fingers</div>
          </div>
          <div className={`step ${scanning || verified ? 'active' : ''}`}>
            <div className="step-number">{verified ? '✓' : '2'}</div>
            <div className="step-label">Identity Verification</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-label">UID Generated</div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-label">Vote Access Granted</div>
          </div>
        </div>

        {/* Fingerprint Scanner */}
        <div className="scanner-section">
          <div className={`fingerprint-scanner ${scanning ? 'scanning' : ''} ${verified ? 'verified' : ''}`}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              {scanning && (
                <>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#003D82" strokeWidth="2" opacity="0.3">
                    <animate attributeName="r" from="80" to="100" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#003D82" strokeWidth="2" opacity="0.3">
                    <animate attributeName="r" from="80" to="100" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#003D82" strokeWidth="2" opacity="0.3">
                    <animate attributeName="r" from="80" to="100" dur="1.5s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" begin="1s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
              <circle cx="100" cy="100" r="75" fill={verified ? '#E8F5E9' : '#E8EDF2'} />
              {verified && (
                <CheckCircle size={80} color="#2E7D32" x="60" y="60" />
              )}
              {!verified && (
                <>
                  <ellipse cx="100" cy="90" rx="30" ry="35" fill="none" stroke="#003D82" strokeWidth="2" />
                  <path d="M 70 90 Q 70 60, 100 60 Q 130 60, 130 90" fill="none" stroke="#003D82" strokeWidth="2" />
                  <path d="M 75 100 Q 75 125, 100 125 Q 125 125, 125 100" fill="none" stroke="#003D82" strokeWidth="2" />
                  <path d="M 85 105 Q 85 118, 100 118 Q 115 118, 115 105" fill="none" stroke="#003D82" strokeWidth="2" />
                </>
              )}
            </svg>
          </div>

          {scanning && (
            <div className="scan-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="progress-text">Capturing biometric data... {progress}%</p>
            </div>
          )}

          {verified && (
            <div className="verification-success">
              <h2 className="success-title">Voter Verified ✓</h2>
              <p className="success-subtitle">Ballot Unlocked</p>
              <div className="uid-display">
                <span className="uid-label">Unique ID:</span>
                <span className="uid-value">BC7F-2A3E-9D4C-1F8B</span>
              </div>
              <button className="proceed-button" onClick={() => window.location.href = '/voting'}>
                Proceed to Ballot
              </button>
            </div>
          )}

          {!scanning && !verified && (
            <button className="scan-button" onClick={handleScan}>
              Start Biometric Scan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EVMBiometric;
