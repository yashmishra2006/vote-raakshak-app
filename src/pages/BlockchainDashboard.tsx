import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const BlockchainDashboard: React.FC = () => {
  const voteData = [
    { region: 'MH', votes: 2500 },
    { region: 'UP', votes: 3200 },
    { region: 'DL', votes: 1800 },
    { region: 'KA', votes: 2100 },
    { region: 'TN', votes: 2800 },
    { region: 'GJ', votes: 1900 },
    { region: 'RJ', votes: 2300 },
    { region: 'WB', votes: 2600 },
  ];

  const timeData = [
    { time: '10:00', votes: 1000 },
    { time: '11:00', votes: 2500 },
    { time: '12:00', votes: 4200 },
    { time: '13:00', votes: 6800 },
    { time: '14:00', votes: 9500 },
    { time: '15:00', votes: 12000 },
  ];

  const liveVotes = [
    { hash: '0x7a9f4b2e...', timestamp: '14:23:45.234', region: 'MH-23', status: 'verified' },
    { hash: '0x3c1d8f6a...', timestamp: '14:23:45.567', region: 'UP-45', status: 'verified' },
    { hash: '0x9d4c1f8b...', timestamp: '14:23:45.891', region: 'DL-12', status: 'verified' },
    { hash: '0x2e5a7c3f...', timestamp: '14:23:46.123', region: 'KA-67', status: 'verified' },
    { hash: '0x6b8d9e4a...', timestamp: '14:23:46.456', region: 'TN-89', status: 'verified' },
  ];

  const nodes = [
    { name: 'Election Commission', status: 'active', type: 'primary' },
    { name: 'Supreme Court', status: 'active', type: 'validator' },
    { name: 'Political Party 1', status: 'active', type: 'observer' },
    { name: 'Political Party 2', status: 'active', type: 'observer' },
    { name: 'University 1', status: 'active', type: 'auditor' },
    { name: 'University 2', status: 'active', type: 'auditor' },
    { name: 'NGO Observer 1', status: 'active', type: 'observer' },
    { name: 'NGO Observer 2', status: 'active', type: 'observer' },
  ];

  return (
    <div className="dashboard-page">
      {/* Key Metrics */}
      <div className="metrics-row">
        <div className="metric-card">
          <h3>Votes Recorded</h3>
          <div className="metric-value">15,234,567</div>
          <div className="metric-trend positive">+2.3% from last hour</div>
        </div>
        <div className="metric-card">
          <h3>Votes Verified</h3>
          <div className="metric-value">15,234,562</div>
          <div className="metric-status verified">99.99%</div>
        </div>
        <div className="metric-card">
          <h3>Duplicate Votes Detected</h3>
          <div className="metric-value warning">5</div>
          <div className="metric-icon">
            <AlertCircle size={24} color="#F57C00" />
          </div>
        </div>
        <div className="metric-card">
          <h3>Hash Mismatch Alerts</h3>
          <div className="metric-value success">0</div>
          <div className="metric-icon">
            <CheckCircle size={24} color="#2E7D32" />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Live Vote Stream */}
        <div className="dashboard-panel live-stream">
          <div className="panel-header">
            <h3>Live Vote Stream</h3>
            <Activity size={20} className="activity-icon" />
          </div>
          <div className="vote-stream">
            {liveVotes.map((vote, index) => (
              <div key={index} className="vote-entry">
                <div className="vote-hash">{vote.hash}</div>
                <div className="vote-meta">
                  <span className="vote-timestamp">{vote.timestamp}</span>
                  <span className="vote-region">{vote.region}</span>
                  <span className="vote-status verified">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Blocks */}
        <div className="dashboard-panel blocks-panel">
          <div className="panel-header">
            <h3>Blockchain Blocks</h3>
          </div>
          <div className="blocks-visualization">
            {[45678, 45677, 45676, 45675, 45674].map((blockNum, index) => (
              <div key={blockNum} className={`block ${index === 0 ? 'latest' : ''}`}>
                <div className="block-number">Block #{blockNum}</div>
                <div className="block-votes">256 votes</div>
                <div className="block-hash">0xa3f9e2...</div>
                <div className="block-time">2 sec ago</div>
              </div>
            ))}
          </div>
        </div>

        {/* Distributed Nodes */}
        <div className="dashboard-panel nodes-panel">
          <div className="panel-header">
            <h3>Validator Nodes</h3>
            <span className="nodes-count">8/8 Online</span>
          </div>
          <div className="nodes-grid">
            {nodes.map((node, index) => (
              <div key={index} className={`node-item ${node.type}`}>
                <div className="node-status active"></div>
                <div className="node-name">{node.name}</div>
                <div className="node-type">{node.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="charts-grid">
        <div className="chart-panel">
          <h3>Votes Per Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={voteData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="region" stroke="#616161" />
              <YAxis stroke="#616161" />
              <Tooltip />
              <Bar dataKey="votes" fill="#003D82" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-panel">
          <h3>Votes Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="time" stroke="#616161" />
              <YAxis stroke="#616161" />
              <Tooltip />
              <Line type="monotone" dataKey="votes" stroke="#003D82" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BlockchainDashboard;
