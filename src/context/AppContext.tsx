import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job, Contact, Company, Task, Note } from '../types';

interface AppContextType {
  jobs: Job[];
  contacts: Contact[];
  companies: Company[];
  tasks: Task[];
  addJob: (job: Job) => void;
  addContact: (contact: Contact) => void;
  addCompany: (company: Company) => void;
  addTask: (task: Task) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteJob: (id: string) => void;
  deleteContact: (id: string) => void;
  deleteCompany: (id: string) => void;
  deleteTask: (id: string) => void;
  addNoteToJob: (jobId: string, note: Omit<Note, 'id' | 'timestamp'>) => void;
  addNoteToContact: (contactId: string, note: Omit<Note, 'id' | 'timestamp'>) => void;
  addNoteToCompany: (companyId: string, note: Omit<Note, 'id' | 'timestamp'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Load data from localStorage on startup
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('jobTracker-jobs');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('jobTracker-contacts');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem('jobTracker-companies');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('jobTracker-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever data changes
  React.useEffect(() => {
    localStorage.setItem('jobTracker-jobs', JSON.stringify(jobs));
  }, [jobs]);

  React.useEffect(() => {
    localStorage.setItem('jobTracker-contacts', JSON.stringify(contacts));
  }, [contacts]);

  React.useEffect(() => {
    localStorage.setItem('jobTracker-companies', JSON.stringify(companies));
  }, [companies]);

  React.useEffect(() => {
    localStorage.setItem('jobTracker-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addCompanyIfNotExists = (companyName: string) => {
    if (companyName && !companies.find(c => c.name.toLowerCase() === companyName.toLowerCase())) {
      const newCompany: Company = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: companyName,
      };
      setCompanies(prev => [...prev, newCompany]);
    }
  };

  const addJob = (job: Job) => {
    setJobs(prev => [...prev, job]);
    // Auto-add company if it doesn't exist
    addCompanyIfNotExists(job.company);
  };

  const addContact = (contact: Contact) => {
    setContacts(prev => [...prev, contact]);
    // Auto-add company if it doesn't exist
    addCompanyIfNotExists(contact.company);
  };

  const addCompany = (company: Company) => {
    // Check if company already exists
    if (!companies.find(c => c.name.toLowerCase() === company.name.toLowerCase())) {
      setCompanies(prev => [...prev, company]);
    }
  };

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updates } : job
    ));
    // If company name changed, auto-add new company if it doesn't exist
    if (updates.company) {
      addCompanyIfNotExists(updates.company);
    }
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
    // If company name changed, auto-add new company if it doesn't exist
    if (updates.company) {
      addCompanyIfNotExists(updates.company);
    }
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(prev => prev.map(company => 
      company.id === id ? { ...company, ...updates } : company
    ));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const deleteCompany = (id: string) => {
    setCompanies(prev => prev.filter(company => company.id !== id));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addNoteToJob = (jobId: string, noteData: Omit<Note, 'id' | 'timestamp'>) => {
    const newNote: Note = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...noteData,
    };
    
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            notesList: [...(job.notesList || []), newNote] 
          }
        : job
    ));
  };

  const addNoteToContact = (contactId: string, noteData: Omit<Note, 'id' | 'timestamp'>) => {
    const newNote: Note = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...noteData,
    };
    
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { 
            ...contact, 
            notesList: [...(contact.notesList || []), newNote] 
          }
        : contact
    ));
  };

  const addNoteToCompany = (companyId: string, noteData: Omit<Note, 'id' | 'timestamp'>) => {
    const newNote: Note = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      ...noteData,
    };
    
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { 
            ...company, 
            notesList: [...(company.notesList || []), newNote] 
          }
        : company
    ));
  };

  const value: AppContextType = {
    jobs,
    contacts,
    companies,
    tasks,
    addJob,
    addContact,
    addCompany,
    addTask,
    updateJob,
    updateContact,
    updateCompany,
    updateTask,
    deleteJob,
    deleteContact,
    deleteCompany,
    deleteTask,
    addNoteToJob,
    addNoteToContact,
    addNoteToCompany,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 