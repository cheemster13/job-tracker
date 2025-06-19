import React, { useState } from 'react';
import { XMarkIcon, PencilIcon, TrashIcon, CalendarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Job } from '../types';
import { useAppContext } from '../context/AppContext';
import NotesSection from './NotesSection';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
  onEdit: (job: Job) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose, onEdit }) => {
  const { addNoteToJob, deleteJob } = useAppContext();

  const statusColors = {
    applied: 'bg-blue-100 text-blue-800',
    interviewing: 'bg-yellow-100 text-yellow-800',
    offered: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    accepted: 'bg-purple-100 text-purple-800',
  };

  const handleAddNote = (noteData: Parameters<typeof addNoteToJob>[1]) => {
    addNoteToJob(job.id, noteData);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(job.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <p className="text-lg text-gray-600">{job.company}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(job)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[job.status]}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
              
              {job.location && (
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <span>Applied: {new Date(job.dateApplied).toLocaleDateString()}</span>
              </div>
              
              {job.salary && (
                <div className="flex items-center text-gray-600">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                  <span>{job.salary}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {job.description && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
              </div>
            )}
          </div>

          {/* Legacy Notes */}
          {job.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">Legacy Note:</h3>
              <p className="text-yellow-700 text-sm">{job.notes}</p>
            </div>
          )}

          {/* Enhanced Notes Section */}
          <NotesSection
            notes={job.notesList || []}
            onAddNote={handleAddNote}
            title="Job Notes & Updates"
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 