import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/voting-status', label: 'Voting Status' },
    { path: '/results', label: 'Results' },
    { path: '/audit-trail', label: 'Audit Trail' },
    { path: '/help', label: 'Help' },
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
            <span className="title-divider">|</span>
            <span className="title-sub">Election Commission of India</span>
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
          <button className="icon-button">
            <Bell size={20} />
          </button>
          <button className="icon-button">
            <Settings size={20} />
          </button>
          <button className="icon-button">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
