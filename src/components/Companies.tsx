import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Company } from '../types';
import { useAppContext } from '../context/AppContext';

const Companies: React.FC = () => {
  const { companies, addCompany, updateCompany, deleteCompany } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: '',
    website: '',
    industry: '',
    location: '',
    notes: '',
  });

  const handleAddCompany = () => {
    if (newCompany.name) {
      const company: Company = {
        id: Date.now().toString(),
        name: newCompany.name,
        website: newCompany.website,
        industry: newCompany.industry,
        location: newCompany.location,
        notes: newCompany.notes,
      };
      addCompany(company);
      setNewCompany({
        name: '',
        website: '',
        industry: '',
        location: '',
        notes: '',
      });
      setShowAddForm(false);
    }
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setNewCompany({
      name: company.name,
      website: company.website,
      industry: company.industry,
      location: company.location,
      notes: company.notes,
    });
  };

  const handleUpdateCompany = () => {
    if (editingCompany && newCompany.name) {
      updateCompany(editingCompany.id, {
        name: newCompany.name,
        website: newCompany.website,
        industry: newCompany.industry,
        location: newCompany.location,
        notes: newCompany.notes,
      });
      setEditingCompany(null);
      setNewCompany({
        name: '',
        website: '',
        industry: '',
        location: '',
        notes: '',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCompany(null);
    setShowAddForm(false);
    setNewCompany({
      name: '',
      website: '',
      industry: '',
      location: '',
      notes: '',
    });
  };

  const handleDeleteCompany = (id: string) => {
    deleteCompany(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Company
        </button>
      </div>

      {/* Add/Edit Company Form */}
      {(showAddForm || editingCompany) && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingCompany ? 'Edit Company' : 'Add New Company'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name *</label>
              <input
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Tech Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                value={newCompany.website}
                onChange={(e) => setNewCompany({...newCompany, website: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. https://techcorp.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <input
                type="text"
                value={newCompany.industry}
                onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={newCompany.location}
                onChange={(e) => setNewCompany({...newCompany, location: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. San Francisco, CA"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={newCompany.notes}
                onChange={(e) => setNewCompany({...newCompany, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Additional notes about this company..."
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
              onClick={editingCompany ? handleUpdateCompany : handleAddCompany}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingCompany ? 'Update Company' : 'Add Company'}
            </button>
          </div>
        </div>
      )}

      {/* Companies Grid */}
      {companies.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-2">No companies added yet.</p>
          <p className="text-sm text-blue-600">💡 Companies are automatically added when you create jobs or contacts!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                  <div className="flex space-x-2">
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <GlobeAltIcon className="h-5 w-5" />
                      </a>
                    )}
                    <button 
                      onClick={() => handleEditCompany(company)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCompany(company.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  {company.industry && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Industry</dt>
                      <dd className="mt-1 text-sm text-gray-900">{company.industry}</dd>
                    </div>
                  )}
                  {company.location && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="mt-1 text-sm text-gray-900">{company.location}</dd>
                    </div>
                  )}
                  {company.notes && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Notes</dt>
                      <dd className="mt-1 text-sm text-gray-900">{company.notes}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies; 