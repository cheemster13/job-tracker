export interface Note {
  id: string;
  content: string;
  timestamp: string;
  type?: 'general' | 'interview' | 'follow-up' | 'research' | 'update';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: 'applied' | 'hr-screen' | 'recruiter-call' | 'hiring-manager' | 'team-interview' | 'final-interview' | 'on-site' | 'offered' | 'offer-accepted' | 'offer-declined' | 'rejected' | 'pending-visa' | 'withdrawn';
  dateApplied: string;
  description?: string;
  salary?: string;
  notes?: string; // Keep for backward compatibility
  notesList?: Note[]; // New timestamped notes
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  role: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  notes?: string; // Keep for backward compatibility
  notesList?: Note[]; // New timestamped notes
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  relatedTo?: {
    type: 'job' | 'contact';
    id: string;
  };
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  location?: string;
  notes?: string; // Keep for backward compatibility
  notesList?: Note[]; // New timestamped notes
} 