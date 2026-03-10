import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, FileText } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

interface Node {
  id: number;
  name: string;
  organization: string;
  type: string;
  status: string;
  uptime: string;
  blocksValidated: number;
  lastActive: string;
  publicKey: string;
  x: number;
  y: number;
  tier: number;
}

const GovernanceNetwork: React.FC = () => {
  const navigate = useNavigate();
  const { state, addAuditLog } = useSimulation();

  const nodes: Node[] = useMemo(
    () => [
      { id: 1, name: 'Election Commission of India', organization: 'ECI', type: 'Primary Validator', status: 'Active', uptime: '100%', blocksValidated: 45678, lastActive: '2 seconds ago', publicKey: '0x3a7f8c9d2e1b4a5f...', x: 400, y: 300, tier: 0 },
      { id: 2, name: 'Supreme Court Observer', organization: 'Supreme Court', type: 'Consensus Validator', status: 'Active', uptime: '99.99%', blocksValidated: 45677, lastActive: '3 seconds ago', publicKey: '0x8b2c7f8da1c3b5ef...', x: 400, y: 150, tier: 1 },
      { id: 3, name: 'Parliamentary Observer', organization: 'Parliament', type: 'Consensus Validator', status: 'Active', uptime: '99.98%', blocksValidated: 45676, lastActive: '2 seconds ago', publicKey: '0x5d9a77b8af67b123...', x: 250, y: 250, tier: 1 },
      { id: 4, name: 'Chief Electoral Officer', organization: 'CEO Office', type: 'Consensus Validator', status: 'Active', uptime: '99.97%', blocksValidated: 45675, lastActive: '4 seconds ago', publicKey: '0x1e4ff6a6c3f57d2b...', x: 550, y: 250, tier: 1 },
      { id: 5, name: 'National Progress Party Node', organization: 'NPP', type: 'Observer Node', status: 'Active', uptime: '99.95%', blocksValidated: 45670, lastActive: '5 seconds ago', publicKey: '0x7c3b66df8ab2517c...', x: 200, y: 400, tier: 2 },
      { id: 6, name: 'Democratic Alliance Node', organization: 'DA', type: 'Observer Node', status: 'Active', uptime: '99.93%', blocksValidated: 45668, lastActive: '6 seconds ago', publicKey: '0x9f8eef777bc6fa12...', x: 600, y: 400, tier: 2 },
      { id: 7, name: 'IIT Delhi Audit Node', organization: 'IIT Delhi', type: 'Independent Validator', status: 'Active', uptime: '99.92%', blocksValidated: 45665, lastActive: '7 seconds ago', publicKey: '0x4a6d1239c6ef572a...', x: 150, y: 200, tier: 3 },
      { id: 8, name: 'IIM Bangalore Monitor', organization: 'IIM Bangalore', type: 'Independent Validator', status: 'Active', uptime: '99.91%', blocksValidated: 45663, lastActive: '8 seconds ago', publicKey: '0x2b5c34de77fca951...', x: 650, y: 200, tier: 3 },
      { id: 9, name: 'Observer NGO Node', organization: 'NGO Watch', type: 'Independent Validator', status: 'Active', uptime: '99.90%', blocksValidated: 45660, lastActive: '9 seconds ago', publicKey: '0x6e9a8912afd8812e...', x: 100, y: 350, tier: 3 },
      { id: 10, name: 'Media Watchdog Node', organization: 'Media Trust', type: 'Independent Validator', status: 'Active', uptime: '99.89%', blocksValidated: 45658, lastActive: '10 seconds ago', publicKey: '0x8d7f9900bb2ac9f4...', x: 700, y: 350, tier: 3 },
    ],
    []
  );

  const [selectedNode, setSelectedNode] = useState<Node | null>(nodes[6]);

  const getNodeColor = (tier: number) => {
    switch (tier) {
      case 0:
        return '#003D82';
      case 1:
        return '#1565C0';
      case 2:
        return '#7B1FA2';
      case 3:
        return '#2E7D32';
      default:
        return '#616161';
    }
  };

  const copyPublicKey = async () => {
    if (!selectedNode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(selectedNode.publicKey);
      addAuditLog('info', `Copied public key for ${selectedNode.organization}.`);
    } catch {
      addAuditLog('alert', 'Public key copy failed: clipboard permission unavailable.');
    }
  };

  return (
    <div className="governance-page">
      <div className="governance-header">
        <div>
          <h1>Distributed Governance Network</h1>
          <p>Multi-stakeholder blockchain consensus system</p>
        </div>
        <div className="governance-actions">
          <div className="consensus-status">
            <CheckCircle size={24} color="#2E7D32" />
            <div>
              <div className="status-title">Consensus: {state.consensusHealthy ? 'Healthy' : 'Degraded'}</div>
              <div className="status-subtitle">Nodes Online: {state.nodesOnline}/{state.totalNodes}</div>
            </div>
          </div>
          <button className="verify-button" onClick={() => navigate('/audit-trail')}>
            <FileText size={16} />
            View Audit Report
          </button>
        </div>
      </div>

      <div className="network-container">
        <div className="network-visualization">
          <svg width="800" height="600" viewBox="0 0 800 600">
            {nodes.slice(1).map((node) => (
              <line
                key={`line-${node.id}`}
                x1={nodes[0].x}
                y1={nodes[0].y}
                x2={node.x}
                y2={node.y}
                stroke="#D0D5DD"
                strokeWidth="2"
                strokeDasharray={node.tier === 3 ? '5,5' : '0'}
              />
            ))}

            {nodes.map((node) => (
              <g key={node.id} onClick={() => setSelectedNode(node)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.tier === 0 ? 40 : node.tier === 1 ? 30 : 25}
                  fill={getNodeColor(node.tier)}
                  opacity={selectedNode?.id === node.id ? 1 : 0.9}
                  stroke={selectedNode?.id === node.id ? '#003D82' : '#fff'}
                  strokeWidth={selectedNode?.id === node.id ? 3 : 2}
                />
                {node.tier === 0 && (
                  <circle cx={node.x} cy={node.y} r="50" fill="none" stroke={getNodeColor(node.tier)} strokeWidth="2" opacity="0.3">
                    <animate attributeName="r" from="50" to="70" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={node.x + 20} cy={node.y - 20} r="6" fill="#2E7D32" stroke="#fff" strokeWidth="2" />
                <text x={node.x} y={node.y + (node.tier === 0 ? 55 : node.tier === 1 ? 45 : 40)} textAnchor="middle" fontSize="12" fill="#212121" fontWeight="500">
                  {node.organization}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {selectedNode && (
          <div className="node-details-panel">
            <div className="panel-header">
              <h3>Node Inspector</h3>
              <button className="close-button" onClick={() => setSelectedNode(null)}>
                ✕
              </button>
            </div>
            <div className="node-info">
              <div className="info-row">
                <span className="info-label">Node Name:</span>
                <span className="info-value">{selectedNode.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Organization:</span>
                <span className="info-value">{selectedNode.organization}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Node Type:</span>
                <span className="info-value">{selectedNode.type}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Blocks Validated:</span>
                <span className="info-value">{selectedNode.blocksValidated.toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Uptime:</span>
                <span className="info-value uptime">{selectedNode.uptime}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Last Active:</span>
                <span className="info-value">{selectedNode.lastActive}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Public Key:</span>
                <span className="info-value mono">{selectedNode.publicKey}</span>
                <button className="icon-button" onClick={copyPublicKey} title="Copy public key">
                  <Copy size={16} />
                </button>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className="status-badge synced">
                  <CheckCircle size={14} /> Synced
                </span>
              </div>
              <button className="sim-link-btn" onClick={() => navigate('/audit-trail')}>View Detailed Logs</button>
            </div>
          </div>
        )}
      </div>

      <div className="consensus-metrics">
        <div className="metric-item">
          <div className="metric-label">Consensus Algorithm</div>
          <div className="metric-value">Proof of Authority (PoA)</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Block Time</div>
          <div className="metric-value">30s</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Validator Quorum</div>
          <div className="metric-value">9/12 Required</div>
        </div>
        <div className="metric-item">
          <div className="metric-label">Last Block Consensus</div>
          <div className="metric-value success">100% Agreement</div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceNetwork;
