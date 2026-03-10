import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addAuditLog } = useSimulation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/verification', label: 'Biometric' },
    { path: '/voting', label: 'Ballot' },
    { path: '/voting-status', label: 'Voting Status' },
    { path: '/results', label: 'Results' },
    { path: '/audit-trail', label: 'Audit Trail' },
    { path: '/simulator', label: 'Simulator' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="#003D82" />
              <path d="M20 10 L20 30 M10 20 L30 20" stroke="white" strokeWidth="3" />
            </svg>
          </div>
          <div className="site-title">
            <span className="title-main">VoteRaakshak</span>
          </div>
        </div>

        <div className="navbar-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="navbar-right">
          <button
            className="icon-button"
            onClick={() => {
              addAuditLog('info', 'Notifications checked by admin console.');
              navigate('/audit-trail');
            }}
            title="View alerts"
          >
            <Bell size={20} />
          </button>
          <button
            className="icon-button"
            onClick={() => {
              addAuditLog('info', 'Governance settings opened.');
              navigate('/governance');
            }}
            title="Open governance settings"
          >
            <Settings size={20} />
          </button>
          <button
            className="icon-button"
            onClick={() => navigate('/simulator')}
            title="Open voter session simulator"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
