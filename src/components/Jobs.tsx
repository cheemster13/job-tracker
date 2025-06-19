import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Job } from '../types';
import { useAppContext } from '../context/AppContext';
import JobDetails from './JobDetails';

const Jobs: React.FC = () => {
  const { jobs, addJob, updateJob, deleteJob } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '',
    company: '',
    location: '',
    status: 'applied',
    dateApplied: new Date().toISOString().split('T')[0],
    description: '',
    salary: '',
  });

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

  const handleAddJob = () => {
    if (newJob.title && newJob.company) {
      const job: Job = {
        id: Date.now().toString(),
        title: newJob.title,
        company: newJob.company,
        location: newJob.location || '',
        status: newJob.status || 'applied',
        dateApplied: newJob.dateApplied || new Date().toISOString().split('T')[0],
        description: newJob.description,
        salary: newJob.salary,
      };
      addJob(job);
      setNewJob({
        title: '',
        company: '',
        location: '',
        status: 'applied',
        dateApplied: new Date().toISOString().split('T')[0],
        description: '',
        salary: '',
      });
      setShowAddForm(false);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setViewingJob(null); // Close details view if open
    setNewJob({
      title: job.title,
      company: job.company,
      location: job.location,
      status: job.status,
      dateApplied: job.dateApplied,
      description: job.description,
      salary: job.salary,
    });
  };

  const handleViewJob = (job: Job) => {
    setViewingJob(job);
  };

  const handleUpdateJob = () => {
    if (editingJob && newJob.title && newJob.company) {
      updateJob(editingJob.id, {
        title: newJob.title,
        company: newJob.company,
        location: newJob.location || '',
        status: newJob.status || 'applied',
        dateApplied: newJob.dateApplied || new Date().toISOString().split('T')[0],
        description: newJob.description,
        salary: newJob.salary,
      });
      setEditingJob(null);
      setNewJob({
        title: '',
        company: '',
        location: '',
        status: 'applied',
        dateApplied: new Date().toISOString().split('T')[0],
        description: '',
        salary: '',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setShowAddForm(false);
    setNewJob({
      title: '',
      company: '',
      location: '',
      status: 'applied',
      dateApplied: new Date().toISOString().split('T')[0],
      description: '',
      salary: '',
    });
  };

  const handleDeleteJob = (id: string) => {
    deleteJob(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Job
        </button>
      </div>

      {/* Add/Edit Job Form */}
      {(showAddForm || editingJob) && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingJob ? 'Edit Job' : 'Add New Job'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title *</label>
              <input
                type="text"
                value={newJob.title}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Senior Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company *</label>
              <input
                type="text"
                value={newJob.company}
                onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Tech Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={newJob.location}
                onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={newJob.status}
                onChange={(e) => setNewJob({...newJob, status: e.target.value as Job['status']})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="applied">Applied</option>
                <option value="hr-screen">HR Screen</option>
                <option value="recruiter-call">Recruiter Call</option>
                <option value="hiring-manager">Hiring Manager</option>
                <option value="team-interview">Team Interview</option>
                <option value="final-interview">Final Interview</option>
                <option value="on-site">On-site</option>
                <option value="offered">Offered</option>
                <option value="offer-accepted">Offer Accepted</option>
                <option value="offer-declined">Offer Declined</option>
                <option value="rejected">Rejected</option>
                <option value="pending-visa">Pending Visa</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date Applied</label>
              <input
                type="date"
                value={newJob.dateApplied}
                onChange={(e) => setNewJob({...newJob, dateApplied: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Salary</label>
              <input
                type="text"
                value={newJob.salary}
                onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. $120k - $150k"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Job description, requirements, etc."
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={editingJob ? handleUpdateJob : handleAddJob}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingJob ? 'Update Job' : 'Add Job'}
            </button>
          </div>
        </div>
      )}

      {/* Jobs Table */}
      {jobs.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">No jobs added yet. Click "Add Job" to get started!</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Applied
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        {job.salary && <div className="text-sm text-gray-500">{job.salary}</div>}
                      </div>
                      {(job.notesList && job.notesList.length > 0) && (
                        <div className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                          {job.notesList.length} notes
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.dateApplied).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewJob(job)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="View Details"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleEditJob(job)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                      title="Edit Job"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete Job"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Job Details Modal */}
      {viewingJob && (
        <JobDetails
          job={viewingJob}
          onClose={() => setViewingJob(null)}
          onEdit={handleEditJob}
        />
      )}
    </div>
  );
};

export default Jobs; 