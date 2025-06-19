import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Contact } from '../types';
import { useAppContext } from '../context/AppContext';

const Contacts: React.FC = () => {
  const { contacts, addContact, updateContact, deleteContact } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    name: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    linkedin: '',
    notes: '',
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.company) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name,
        company: newContact.company,
        role: newContact.role || '',
        email: newContact.email,
        phone: newContact.phone,
        linkedin: newContact.linkedin,
        notes: newContact.notes,
      };
      addContact(contact);
      setNewContact({
        name: '',
        company: '',
        role: '',
        email: '',
        phone: '',
        linkedin: '',
        notes: '',
      });
      setShowAddForm(false);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setNewContact({
      name: contact.name,
      company: contact.company,
      role: contact.role,
      email: contact.email,
      phone: contact.phone,
      linkedin: contact.linkedin,
      notes: contact.notes,
    });
  };

  const handleUpdateContact = () => {
    if (editingContact && newContact.name && newContact.company) {
      updateContact(editingContact.id, {
        name: newContact.name,
        company: newContact.company,
        role: newContact.role || '',
        email: newContact.email,
        phone: newContact.phone,
        linkedin: newContact.linkedin,
        notes: newContact.notes,
      });
      setEditingContact(null);
      setNewContact({
        name: '',
        company: '',
        role: '',
        email: '',
        phone: '',
        linkedin: '',
        notes: '',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setShowAddForm(false);
    setNewContact({
      name: '',
      company: '',
      role: '',
      email: '',
      phone: '',
      linkedin: '',
      notes: '',
    });
  };

  const handleDeleteContact = (id: string) => {
    deleteContact(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Contact
        </button>
      </div>

      {/* Add/Edit Contact Form */}
      {(showAddForm || editingContact) && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h3>
          {!editingContact && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> When you add a contact with a company name, that company will automatically be added to your Companies tab if it doesn't already exist!
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company *</label>
              <input
                type="text"
                value={newContact.company}
                onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Tech Corp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={newContact.role}
                onChange={(e) => setNewContact({...newContact, role: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Hiring Manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. john@techcorp.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                type="url"
                value={newContact.linkedin}
                onChange={(e) => setNewContact({...newContact, linkedin: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. linkedin.com/in/johnsmith"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={newContact.notes}
                onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Additional notes about this contact..."
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
              onClick={editingContact ? handleUpdateContact : handleAddContact}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </button>
          </div>
        </div>
      )}

      {/* Contacts List */}
      {contacts.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">No contacts added yet. Click "Add Contact" to get started!</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <li key={contact.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-xl font-medium text-indigo-600">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.role} at {contact.company}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {contact.email && (
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <EnvelopeIcon className="h-5 w-5" />
                        </a>
                      )}
                      {contact.phone && (
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PhoneIcon className="h-5 w-5" />
                        </a>
                      )}
                      <button 
                        onClick={() => handleEditContact(contact)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      {contact.email && (
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {contact.email}
                        </div>
                      )}
                      {contact.phone && (
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Contacts; 