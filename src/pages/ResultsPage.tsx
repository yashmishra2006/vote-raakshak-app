import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CheckCircle, Download, ExternalLink } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const voteData = [
    { name: 'National Progress Party', value: 42.3, votes: 285678901, seats: 245, color: '#1565C0', candidate: 'Rajesh Kumar' },
    { name: 'Democratic Alliance', value: 31.8, votes: 214645876, seats: 182, color: '#2E7D32', candidate: 'Priya Sharma' },
    { name: "People's Front", value: 15.2, votes: 102635622, seats: 87, color: '#F57C00', candidate: 'Arun Patel' },
    { name: 'Unity Party', value: 7.4, votes: 49967358, seats: 42, color: '#7B1FA2', candidate: 'Meera Singh' },
    { name: 'Others', value: 3.3, votes: 22307805, seats: 18, color: '#616161', candidate: 'Various' },
  ];

  const totalVotes = voteData.reduce((sum, item) => sum + item.votes, 0);
  const winner = voteData[0];

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>2026 General Election Results</h1>
        <div className="verification-badge">
          <CheckCircle size={32} color="#2E7D32" />
          <div>
            <div className="badge-title">All Votes Cryptographically Verified</div>
            <div className="badge-subtitle">Verified by 12 Independent Nodes</div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-label">Registered Voters</div>
          <div className="summary-value">900,000,000</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Total Votes Cast</div>
          <div className="summary-value">{totalVotes.toLocaleString()}</div>
          <div className="summary-subtitle">75% Turnout</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Valid Votes</div>
          <div className="summary-value">{(totalVotes - 5).toLocaleString()}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Blockchain Blocks</div>
          <div className="summary-value">2,641,486</div>
        </div>
        <div className="summary-card verified">
          <div className="summary-label">Verification Status</div>
          <div className="summary-value">100%</div>
          <div className="summary-subtitle success">Complete</div>
        </div>
      </div>

      {/* Results Visualization */}
      <div className="results-content">
        <div className="chart-section">
          <h2>Vote Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={voteData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {voteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value ? `${value}%` : ''} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="verification-panel">
          <h3>Verification Details</h3>
          <div className="verification-info">
            <div className="info-row">
              <span className="info-label">Election Date:</span>
              <span className="info-value">March 9, 2026</span>
            </div>
            <div className="info-row">
              <span className="info-label">Results Published:</span>
              <span className="info-value">March 10, 2026 02:45 AM</span>
            </div>
            <div className="info-row">
              <span className="info-label">Final Block Hash:</span>
              <span className="info-value mono">0xa9f7e3c2...</span>
            </div>
            <div className="info-row">
              <span className="info-label">Merkle Root:</span>
              <span className="info-value mono">0x3d8b...</span>
            </div>
            <div className="info-row">
              <span className="info-label">Digital Signature:</span>
              <span className="status-badge verified">
                <CheckCircle size={14} /> Valid
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Validator Consensus:</span>
              <span className="status-badge verified">
                <CheckCircle size={14} /> 12/12 Nodes
              </span>
            </div>
          </div>
          
          <button className="verify-button">
            <ExternalLink size={18} />
            Verify Election Integrity
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="results-table-section">
        <h2>Detailed Results by Party</h2>
        <table className="results-table">
          <thead>
            <tr>
              <th>Party</th>
              <th>Candidate</th>
              <th>Votes</th>
              <th>Percentage</th>
              <th>Seats Won</th>
            </tr>
          </thead>
          <tbody>
            {voteData.map((party, index) => (
              <tr key={index} className={index === 0 ? 'winner-row' : ''}>
                <td>
                  <div className="party-cell">
                    <div className="party-logo" style={{ backgroundColor: party.color }}></div>
                    <span>{party.name}</span>
                    {index === 0 && <span className="winner-badge">🏆 Winner</span>}
                  </div>
                </td>
                <td>{party.candidate}</td>
                <td className="votes-cell">{party.votes.toLocaleString()}</td>
                <td className="percentage-cell">{party.value}%</td>
                <td className="seats-cell">{party.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transparency Links */}
      <div className="transparency-section">
        <h3>Transparency & Audit</h3>
        <div className="links-grid">
          <button className="link-button">
            <ExternalLink size={18} />
            View Full Blockchain Explorer
          </button>
          <button className="link-button">
            <Download size={18} />
            Download Raw Vote Data
          </button>
          <button className="link-button">
            <Download size={18} />
            Audit Trail Report
          </button>
          <button className="link-button">
            <ExternalLink size={18} />
            International Observer Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
