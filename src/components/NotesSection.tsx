import React, { useState } from 'react';
import { PlusIcon, ChatBubbleLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Note } from '../types';
import { format } from 'date-fns';

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'timestamp'>) => void;
  title?: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ 
  notes, 
  onAddNote, 
  title = "Notes & Updates" 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({
    content: '',
    type: 'general' as Note['type'],
  });

  const noteTypeColors = {
    general: 'bg-gray-100 text-gray-800 border-gray-200',
    interview: 'bg-blue-100 text-blue-800 border-blue-200',
    'follow-up': 'bg-green-100 text-green-800 border-green-200',
    research: 'bg-purple-100 text-purple-800 border-purple-200',
    update: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  const noteTypeLabels = {
    general: 'General',
    interview: 'Interview',
    'follow-up': 'Follow-up',
    research: 'Research',
    update: 'Update',
  };

  const handleAddNote = () => {
    if (newNote.content.trim()) {
      onAddNote({
        content: newNote.content.trim(),
        type: newNote.type,
      });
      setNewNote({ content: '', type: 'general' });
      setShowAddForm(false);
    }
  };

  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
          {title}
          {notes.length > 0 && (
            <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {notes.length}
            </span>
          )}
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note Type
              </label>
              <select
                value={newNote.type}
                onChange={(e) => setNewNote({...newNote, type: e.target.value as Note['type']})}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="general">General</option>
                <option value="interview">Interview</option>
                <option value="follow-up">Follow-up</option>
                <option value="research">Research</option>
                <option value="update">Update</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note Content
              </label>
              <textarea
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                placeholder="Add your note here..."
                rows={3}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                disabled={!newNote.content.trim()}
                className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-3">
        {sortedNotes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ChatBubbleLeftIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>No notes yet. Add your first note to start tracking!</p>
          </div>
        ) : (
          sortedNotes.map((note) => (
            <div key={note.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${noteTypeColors[note.type || 'general']}`}>
                  {noteTypeLabels[note.type || 'general']}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {format(new Date(note.timestamp), 'MMM d, yyyy • h:mm a')}
                </div>
              </div>
              <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))
        )}
      </div>

      {/* AI Summary Placeholder */}
      {notes.length >= 3 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">AI</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                <strong>Ready for AI Summary!</strong> You have {notes.length} notes. 
                We can generate insights and summaries from your tracking data.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesSection; 