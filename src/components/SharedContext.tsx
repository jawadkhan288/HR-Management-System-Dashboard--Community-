import { createContext, useContext, useState, ReactNode } from "react";

export interface CandidateData {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  aiScore: number;
  experience: string;
  skills: string[];
  status: "Applied" | "Screened" | "Interview" | "Offer" | "Hired";
  avatar: string;
  appliedDate: string;
  matchReasons?: string[];
}

export interface InterviewData {
  id: number;
  candidate: string;
  position: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  interviewer: string;
  meetingLink: string;
  avatar: string;
}

const initialCandidates: CandidateData[] = [
  {
    id: 1,
    name: "Alexander Smith",
    email: "alex.smith@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer",
    aiScore: 94,
    experience: "8 years",
    skills: ["React", "TypeScript", "Node.js"],
    status: "Interview",
    avatar: "https://i.pravatar.cc/150?img=33",
    appliedDate: "2024-02-20",
    matchReasons: ["8+ years experience", "Expert in React & TypeScript", "Leadership experience"],
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    phone: "+1 (555) 234-5678",
    position: "Product Manager",
    aiScore: 88,
    experience: "6 years",
    skills: ["Product Strategy", "Agile", "Data Analysis"],
    status: "Screened",
    avatar: "https://i.pravatar.cc/150?img=11",
    appliedDate: "2024-02-19",
    matchReasons: ["Strong product background", "Agile certification", "Data-driven approach"],
  },
  {
    id: 3,
    name: "Steven Chen",
    email: "steven.c@email.com",
    phone: "+1 (555) 345-6789",
    position: "UX/UI Designer",
    aiScore: 92,
    experience: "5 years",
    skills: ["Figma", "User Research", "Prototyping"],
    status: "Offer",
    avatar: "https://i.pravatar.cc/150?img=51",
    appliedDate: "2024-02-18",
    matchReasons: ["Portfolio excellence", "User-centered design", "5+ years experience"],
  },
  {
    id: 4,
    name: "James Williams",
    email: "james.w@email.com",
    phone: "+1 (555) 456-7890",
    position: "Backend Developer",
    aiScore: 85,
    experience: "7 years",
    skills: ["Python", "Django", "PostgreSQL"],
    status: "Applied",
    avatar: "https://i.pravatar.cc/150?img=13",
    appliedDate: "2024-02-21",
    matchReasons: ["Strong backend skills", "Database expertise", "Scalable architecture"],
  },
  {
    id: 5,
    name: "Ethan Davis",
    email: "ethan.d@email.com",
    phone: "+1 (555) 567-8901",
    position: "Data Analyst",
    aiScore: 90,
    experience: "4 years",
    skills: ["SQL", "Python", "Tableau"],
    status: "Hired",
    avatar: "https://i.pravatar.cc/150?img=52",
    appliedDate: "2024-02-10",
    matchReasons: ["Advanced analytics", "Visualization expert", "Business insights"],
  },
  {
    id: 6,
    name: "Robert Martinez",
    email: "robert.m@email.com",
    phone: "+1 (555) 678-9012",
    position: "DevOps Engineer",
    aiScore: 87,
    experience: "6 years",
    skills: ["AWS", "Docker", "Kubernetes"],
    status: "Interview",
    avatar: "https://i.pravatar.cc/150?img=14",
    appliedDate: "2024-02-17",
    matchReasons: ["Cloud expertise", "CI/CD mastery", "Infrastructure automation"],
  },
  {
    id: 7,
    name: "Liam Anderson",
    email: "liam.a@email.com",
    phone: "+1 (555) 789-0123",
    position: "Senior Frontend Developer",
    aiScore: 78,
    experience: "3 years",
    skills: ["React", "JavaScript", "CSS"],
    status: "Screened",
    avatar: "https://i.pravatar.cc/150?img=53",
    appliedDate: "2024-02-22",
    matchReasons: ["Modern framework skills", "Growing portfolio", "Team player"],
  },
  {
    id: 8,
    name: "Daniel Brown",
    email: "daniel.b@email.com",
    phone: "+1 (555) 890-1234",
    position: "Product Manager",
    aiScore: 82,
    experience: "5 years",
    skills: ["Product Management", "Roadmapping", "Analytics"],
    status: "Applied",
    avatar: "https://i.pravatar.cc/150?img=16",
    appliedDate: "2024-02-23",
    matchReasons: ["Strategic thinking", "Cross-functional lead", "User focus"],
  },
];

const initialInterviews: InterviewData[] = [
  {
    id: 1,
    candidate: "Alexander Smith",
    position: "Senior Frontend Developer",
    date: "2024-02-27",
    time: "10:00 AM",
    duration: "1 hour",
    type: "Technical Interview",
    interviewer: "John Doe",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 2,
    candidate: "Marcus Johnson",
    position: "Product Manager",
    date: "2024-02-27",
    time: "2:00 PM",
    duration: "45 min",
    type: "HR Round",
    interviewer: "Scott Williams",
    meetingLink: "https://meet.google.com/klm-nopq-rst",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    candidate: "Steven Chen",
    position: "UX/UI Designer",
    date: "2024-02-28",
    time: "11:00 AM",
    duration: "1 hour",
    type: "Portfolio Review",
    interviewer: "Ethan Davis",
    meetingLink: "https://meet.google.com/uvw-xyzz-abc",
    avatar: "https://i.pravatar.cc/150?img=51",
  },
  {
    id: 4,
    candidate: "Robert Martinez",
    position: "DevOps Engineer",
    date: "2024-02-28",
    time: "3:30 PM",
    duration: "1.5 hours",
    type: "Technical Interview",
    interviewer: "Michael Chen",
    meetingLink: "https://meet.google.com/def-ghij-klm",
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 5,
    candidate: "Daniel Brown",
    position: "Product Manager",
    date: "2024-02-29",
    time: "10:30 AM",
    duration: "1 hour",
    type: "Final Interview",
    interviewer: "David Kim",
    meetingLink: "https://meet.google.com/nop-qrst-uvw",
    avatar: "https://i.pravatar.cc/150?img=16",
  },
];

interface SharedContextType {
  candidates: CandidateData[];
  setCandidates: React.Dispatch<React.SetStateAction<CandidateData[]>>;
  addCandidate: (candidate: CandidateData) => void;
  interviews: InterviewData[];
  setInterviews: React.Dispatch<React.SetStateAction<InterviewData[]>>;
  addInterview: (interview: InterviewData) => void;
  removeInterview: (id: number) => void;
}

const SharedContext = createContext<SharedContextType | null>(null);

export function SharedProvider({ children }: { children: ReactNode }) {
  const [candidates, setCandidates] = useState<CandidateData[]>(initialCandidates);
  const [interviews, setInterviews] = useState<InterviewData[]>(initialInterviews);

  const addCandidate = (candidate: CandidateData) => {
    setCandidates((prev) => [candidate, ...prev]);
  };

  const addInterview = (interview: InterviewData) => {
    setInterviews((prev) => [interview, ...prev]);
  };

  const removeInterview = (id: number) => {
    setInterviews((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <SharedContext.Provider
      value={{ candidates, setCandidates, addCandidate, interviews, setInterviews, addInterview, removeInterview }}
    >
      {children}
    </SharedContext.Provider>
  );
}

export function useSharedContext() {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error("useSharedContext must be used within a SharedProvider");
  }
  return context;
}