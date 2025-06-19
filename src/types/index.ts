export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted';
  dateApplied: string;
  description?: string;
  salary?: string;
  notes?: string;
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  role: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  notes?: string;
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
  notes?: string;
} 