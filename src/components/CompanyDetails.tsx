import React, { useState } from 'react';
import { 
  XMarkIcon, 
  BriefcaseIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon,
  GlobeAltIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Company, Job, Contact, Task } from '../types';
import { useAppContext } from '../context/AppContext';
import NotesSection from './NotesSection';

interface CompanyDetailsProps {
  company: Company;
  onClose: () => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, onClose }) => {
  const { jobs, contacts, tasks, addNoteToCompany } = useAppContext();
  
  // Get all related data for this company
  const companyJobs = jobs.filter(job => job.company.toLowerCase() === company.name.toLowerCase());
  const companyContacts = contacts.filter(contact => contact.company.toLowerCase() === company.name.toLowerCase());
  const companyTasks = tasks.filter(task => 
    task.company?.toLowerCase() === company.name.toLowerCase() ||
    (task.relatedTo?.type === 'company' && task.relatedTo.id === company.id)
  );

  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'contacts' | 'tasks' | 'notes'>('overview');

  const handleAddNote = (noteData: Parameters<typeof addNoteToCompany>[1]) => {
    addNoteToCompany(company.id, noteData);
  };

  const statusColors = {
    applied: 'bg-blue-100 text-blue-800',
    'hr-screen': 'bg-indigo-100 text-indigo-800',
    'recruiter-call': 'bg-purple-100 text-purple-800',
    'hiring-manager': 'bg-pink-100 text-pink-800',
    'team-interview': 'bg-orange-100 text-orange-800',
    'final-interview': 'bg-amber-100 text-amber-800',
    'on-site': 'bg-yellow-100 text-yellow-800',
    offered: 'bg-green-100 text-green-800',
    'offer-accepted': 'bg-emerald-100 text-emerald-800',
    'offer-declined': 'bg-gray-100 text-gray-800',
    rejected: 'bg-red-100 text-red-800',
    'pending-visa': 'bg-cyan-100 text-cyan-800',
    withdrawn: 'bg-slate-100 text-slate-800',
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const taskTypeColors = {
    call: 'bg-blue-100 text-blue-800',
    meeting: 'bg-purple-100 text-purple-800',
    'follow-up': 'bg-green-100 text-green-800',
    research: 'bg-orange-100 text-orange-800',
    application: 'bg-indigo-100 text-indigo-800',
    other: 'bg-gray-100 text-gray-800',
  };

  const isOverdue = (task: Task) => {
    if (!task.dueDate || task.status === 'completed') return false;
    return new Date(task.dueDate) < new Date();
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BuildingOfficeIcon },
    { id: 'jobs', name: `Jobs (${companyJobs.length})`, icon: BriefcaseIcon },
    { id: 'contacts', name: `Contacts (${companyContacts.length})`, icon: UserGroupIcon },
    { id: 'tasks', name: `Tasks (${companyTasks.length})`, icon: ClipboardDocumentListIcon },
    { id: 'notes', name: `Notes (${company.notesList?.length || 0})`, icon: ClipboardDocumentListIcon },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-white">
              <h2 className="text-2xl font-bold">{company.name}</h2>
              <div className="flex items-center space-x-4 mt-2 text-indigo-100">
                {company.industry && (
                  <span className="text-sm">{company.industry}</span>
                )}
                {company.location && (
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{company.location}</span>
                  </div>
                )}
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-white transition-colors"
                  >
                    <GlobeAltIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm">Website</span>
                  </a>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-8 w-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-600">Active Jobs</p>
                      <p className="text-2xl font-bold text-blue-900">{companyJobs.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-8 w-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-600">Contacts</p>
                      <p className="text-2xl font-bold text-green-900">{companyContacts.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <ClipboardDocumentListIcon className="h-8 w-8 text-yellow-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-600">Tasks</p>
                      <p className="text-2xl font-bold text-yellow-900">
                        {companyTasks.filter(t => t.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {/* Recent Jobs */}
                  {companyJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{job.title}</p>
                          <p className="text-xs text-gray-500">Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[job.status]}`}>
                        {job.status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}

                  {/* Recent Tasks */}
                  {companyTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center">
                        <ClipboardDocumentListIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          {task.dueDate && (
                            <p className={`text-xs ${isOverdue(task) ? 'text-red-500' : 'text-gray-500'}`}>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${taskTypeColors[task.type]}`}>
                          {task.type}
                        </span>
                        {task.status === 'completed' ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ClockIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-4">
              {companyJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BriefcaseIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No jobs found for this company</p>
                </div>
              ) : (
                companyJobs.map((job) => (
                  <div key={job.id} className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-500">Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
                        {job.salary && <p className="text-sm text-gray-600 mt-1">{job.salary}</p>}
                        {job.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.description}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[job.status]}`}>
                        {job.status.replace('-', ' ')}
                      </span>
                    </div>
                    {job.notesList && job.notesList.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          {job.notesList.length} notes • Last updated: {
                            new Date(job.notesList[job.notesList.length - 1].timestamp).toLocaleDateString()
                          }
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-4">
              {companyContacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UserGroupIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No contacts found for this company</p>
                </div>
              ) : (
                companyContacts.map((contact) => (
                  <div key={contact.id} className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.role}</p>
                        <div className="mt-2 space-y-1">
                          {contact.email && (
                            <p className="text-sm text-gray-500">📧 {contact.email}</p>
                          )}
                          {contact.phone && (
                            <p className="text-sm text-gray-500">📞 {contact.phone}</p>
                          )}
                          {contact.linkedin && (
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800">
                              🔗 LinkedIn Profile
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    {contact.notesList && contact.notesList.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          {contact.notesList.length} notes • Last updated: {
                            new Date(contact.notesList[contact.notesList.length - 1].timestamp).toLocaleDateString()
                          }
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              {companyTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ClipboardDocumentListIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No tasks found for this company</p>
                </div>
              ) : (
                companyTasks.map((task) => (
                  <div key={task.id} className={`bg-white border rounded-lg p-4 ${isOverdue(task) ? 'border-red-200 bg-red-50' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${taskTypeColors[task.type]}`}>
                            {task.type}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                        </div>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          {task.dueDate && (
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              <span className={isOverdue(task) ? 'text-red-600 font-medium' : ''}>
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                {isOverdue(task) && ' (Overdue)'}
                              </span>
                            </div>
                          )}
                          {task.completedDate && (
                            <div className="flex items-center">
                              <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
                              <span>Completed: {new Date(task.completedDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        {task.postCallNotes && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-blue-800">Post-Call Notes:</p>
                            <p className="text-sm text-blue-700 mt-1">{task.postCallNotes}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.status === 'completed' ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-500" />
                        ) : (
                          <ClockIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <NotesSection
              notes={company.notesList || []}
              onAddNote={handleAddNote}
              title={`Company Research & Notes`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails; 