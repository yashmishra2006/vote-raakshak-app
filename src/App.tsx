import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import EVMBiometric from './pages/EVMBiometric';
import VotingBallot from './pages/VotingBallot';
import BlockchainDashboard from './pages/BlockchainDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GovernanceNetwork from './pages/GovernanceNetwork';
import ResultsPage from './pages/ResultsPage';
import VotingSimulator from './pages/VotingSimulator';
import { SimulationProvider } from './context/SimulationContext';
import './App.css';

function App() {
  return (
    <SimulationProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/verification" element={<EVMBiometric />} />
              <Route path="/voting" element={<VotingBallot />} />
              <Route path="/voting-status" element={<BlockchainDashboard />} />
              <Route path="/audit-trail" element={<AdminDashboard />} />
              <Route path="/governance" element={<GovernanceNetwork />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/simulator" element={<VotingSimulator />} />
              <Route path="/help" element={<VotingSimulator />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SimulationProvider>
  );
}

export default App;
