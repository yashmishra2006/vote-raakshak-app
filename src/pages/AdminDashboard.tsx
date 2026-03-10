import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

interface DuplicateAttempt {
  uidHash: string;
  fingerprintId: string;
  firstVote: string;
  duplicateTime: string;
  machineId: string;
  region: string;
  status: 'rejected' | 'accepted';
  timeDiff: string;
}

const AdminDashboard: React.FC = () => {
  const { state, exportAuditLog, addAuditLog } = useSimulation();
  const duplicateAttempts: DuplicateAttempt[] = useMemo(
    () => [
      {
        uidHash: '0xBC7F2A3E...',
        fingerprintId: 'FP-4523-8921',
        firstVote: '14:23:45.234',
        duplicateTime: '14:28:12.112',
        machineId: 'EVM-MH-234',
        region: 'Mumbai Central',
        status: 'rejected',
        timeDiff: '4 min 27 sec',
      },
      {
        uidHash: '0x9D4C1F8B...',
        fingerprintId: 'FP-7821-3456',
        firstVote: '14:15:30.567',
        duplicateTime: '14:22:45.890',
        machineId: 'EVM-MH-567',
        region: 'Mumbai North',
        status: 'rejected',
        timeDiff: '7 min 15 sec',
      },
      {
        uidHash: '0x2E5A7C3F...',
        fingerprintId: 'FP-1234-9876',
        firstVote: '14:10:15.123',
        duplicateTime: '14:10:16.234',
        machineId: 'EVM-DL-123',
        region: 'Delhi Central',
        status: 'rejected',
        timeDiff: '1 sec',
      },
      {
        uidHash: '0x6B8D9E4A...',
        fingerprintId: 'FP-5678-2345',
        firstVote: '13:45:20.789',
        duplicateTime: '13:58:35.456',
        machineId: 'EVM-UP-789',
        region: 'Lucknow',
        status: 'rejected',
        timeDiff: '13 min 15 sec',
      },
      {
        uidHash: '0x3C1D8F6A...',
        fingerprintId: 'FP-9012-7890',
        firstVote: '13:30:45.321',
        duplicateTime: '13:30:45.321',
        machineId: 'EVM-KA-456',
        region: 'Bangalore',
        status: 'accepted',
        timeDiff: '0 sec',
      },
    ],
    []
  );

  const [selectedAttempt, setSelectedAttempt] = useState<DuplicateAttempt>(duplicateAttempts[0]);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-content">
          <h1>Duplicate Vote Detection System</h1>
          <p>Real-time UID monitoring and blockchain deduplication</p>
        </div>
        <div className="alert-badge">
          <AlertTriangle size={20} />
          <span>{state.duplicateVotesDetected} Duplicates Detected Today</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{state.totalVotesCast.toLocaleString()}</div>
          <div className="stat-label">Total Votes Today</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{state.duplicateVotesDetected}</div>
          <div className="stat-label">Duplicate Attempts</div>
        </div>
        <div className="stat-card success">
          <div className="stat-value">
            {((1 - state.duplicateVotesDetected / Math.max(state.totalVotesCast, 1)) * 100).toFixed(3)}%
          </div>
          <div className="stat-label">Deduplication Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0.23s</div>
          <div className="stat-label">Avg Detection Time</div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="panel-header">
          <h2>Duplicate Attempts Log</h2>
          <button className="export-button" onClick={exportAuditLog}>Export Report</button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>UID Hash</th>
                <th>Fingerprint ID</th>
                <th>First Vote Time</th>
                <th>Duplicate Time</th>
                <th>Time Gap</th>
                <th>Machine ID</th>
                <th>Region</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {duplicateAttempts.map((attempt) => (
                <tr key={`${attempt.uidHash}-${attempt.machineId}`} className={attempt.status === 'rejected' ? 'rejected-row' : ''}>
                  <td className="mono">{attempt.uidHash}</td>
                  <td className="mono">{attempt.fingerprintId}</td>
                  <td>{attempt.firstVote}</td>
                  <td>{attempt.duplicateTime}</td>
                  <td>
                    <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {attempt.timeDiff}
                  </td>
                  <td className="mono">{attempt.machineId}</td>
                  <td>{attempt.region}</td>
                  <td>
                    <span className={`status-badge ${attempt.status}`}>
                      {attempt.status === 'accepted' ? (
                        <><CheckCircle size={14} /> ACCEPTED</>
                      ) : (
                        <><AlertTriangle size={14} /> REJECTED</>
                      )}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => {
                        setSelectedAttempt(attempt);
                        addAuditLog('warning', `Inspector opened attempt ${attempt.uidHash} at ${attempt.machineId}`);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="timeline-panel">
          <h3>Deduplication Timeline</h3>
          <div className="timeline">
            <div className="timeline-item verified">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-label">First Vote</div>
                <div className="timeline-time">{selectedAttempt.firstVote}</div>
                <div className="timeline-desc">Vote accepted at {selectedAttempt.machineId}</div>
              </div>
            </div>
            <div className="timeline-connector"></div>
            <div className={`timeline-item ${selectedAttempt.status === 'accepted' ? 'verified' : 'rejected'}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-label">Second Attempt</div>
                <div className="timeline-time">{selectedAttempt.duplicateTime}</div>
                <div className="timeline-desc">
                  {selectedAttempt.status === 'accepted' ? 'Reprocessed by election supervisor' : 'Same UID detected - Rejected'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="alert-log-panel">
          <h3>Real-time Alert Log</h3>
          <div className="alert-log">
            {state.auditLog.map((log) => (
              <div key={log.id} className={`log-entry ${log.level}`}>
                <span className="log-time">[{log.time}]</span>
                <span className="log-type">{log.level.toUpperCase()}:</span>
                <span className="log-message">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
