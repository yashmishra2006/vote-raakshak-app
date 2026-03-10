export interface Candidate {
  id: number;
  name: string;
  party: string;
  color: string;
  photo: string;
}

export const CANDIDATES: Candidate[] = [
  { id: 1, name: 'Rajesh Kumar', party: 'National Progress Party', color: '#1565C0', photo: '👨‍💼' },
  { id: 2, name: 'Priya Sharma', party: 'Democratic Alliance', color: '#2E7D32', photo: '👩‍💼' },
  { id: 3, name: 'Arun Patel', party: "People's Front", color: '#F57C00', photo: '👨‍💼' },
  { id: 4, name: 'Meera Singh', party: 'Unity Party', color: '#7B1FA2', photo: '👩‍💼' },
  { id: 5, name: 'Vijay Reddy', party: 'Reform Coalition', color: '#C62828', photo: '👨‍💼' },
];
