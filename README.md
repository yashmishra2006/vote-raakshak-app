# VoteRaakshak App

A React + TypeScript simulation of a secure digital voting workflow with biometric verification, ballot casting, audit trail, governance monitoring, and result visualization.

## 1. Project Scope

This project is a **simulation/demo UI** for election technology workflows. It is not a production election system and does not integrate with real voter databases, biometric devices, or blockchain networks.

## 2. Features

- Landing dashboard with election system overview
- Biometric verification flow (simulated)
- Ballot selection and vote confirmation flow
- Voting status dashboard with charted metrics
- Audit trail and admin security panel
- Governance network view
- Result summary and charts
- End-to-end simulator page linking all modules

## 3. Tech Stack

- React
- TypeScript
- React Router
- Recharts
- Lucide React icons
- Create React App tooling (`react-scripts`)

## 4. System Requirements

- Node.js `>=18` (LTS recommended)
- npm `>=9`
- OS: Linux/macOS/Windows

## 5. Installation

```bash
npm install
```

### Important: Use one package manager only

This repo currently includes both `package-lock.json` and `pnpm-lock.yaml`.
To avoid dependency conflicts (including ESLint plugin conflicts), use only one manager per install.

Recommended for this repo:

```bash
rm -rf node_modules
npm ci
```

## 6. Run Commands

```bash
# start dev server
npm start

# production build
npm run build

# tests
npm test
```

App default URL: `http://localhost:3000`

## 7. Environment Variables

- `.env` is currently empty.
- No required environment variables for local run at this time.

If you later add API integrations, document each variable in this section with:
- variable name
- required/optional status
- example value format

## 8. Routes / Screens

- `/` -> Landing page
- `/verification` -> Biometric verification
- `/voting` -> Voting ballot
- `/voting-status` -> Blockchain/status dashboard
- `/audit-trail` -> Admin audit panel
- `/governance` -> Governance network
- `/results` -> Election results
- `/simulator` -> Voting simulator

## 9. Project Structure

```text
src/
  components/
    Navbar.tsx
  context/
    SimulationContext.tsx
  pages/
    LandingPage.tsx
    EVMBiometric.tsx
    VotingBallot.tsx
    BlockchainDashboard.tsx
    AdminDashboard.tsx
    GovernanceNetwork.tsx
    ResultsPage.tsx
    VotingSimulator.tsx
  App.tsx
  App.css
```

## 10. Resources and References

### A. Official Documentation / Repositories

- React docs: https://react.dev/
- TypeScript docs: https://www.typescriptlang.org/docs/
- React Router docs: https://reactrouter.com/
- Recharts docs: https://recharts.org/en-US/
- Lucide React docs: https://lucide.dev/guide/packages/lucide-react
- Create React App docs: https://create-react-app.dev/

### B. Web/API References Used in Implementation Concepts

- Clipboard API (used for copy-to-clipboard interactions): https://developer.mozilla.org/docs/Web/API/Clipboard_API
- Web Crypto API (relevant for cryptographic hashing/signature simulation): https://developer.mozilla.org/docs/Web/API/Web_Crypto_API

### C. Research and Background Reading

- Satoshi Nakamoto, *Bitcoin: A Peer-to-Peer Electronic Cash System* (2008)  
  https://bitcoin.org/bitcoin.pdf
- Ben Adida, *Helios: Web-based Open-Audit Voting* (USENIX Security, 2008)

### D. Governance / Domain Context

- Election Commission of India (context/reference): https://www.eci.gov.in/

## 11. Current Limitations

- Simulation data is in-memory (no persistent backend)
- No real biometric device integration
- No real blockchain node integration
- No production-grade identity verification
- Not audited for real election deployment

## 12. Suggested Next Steps

- Add backend services for persistence and audit logs
- Add cryptographic proof verification pipeline
- Add role-based authentication and authorization
- Add automated integration tests for full voting flow
- Add deployment docs (Docker + CI/CD)

