import React from 'react';
import { BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { jobs, contacts, companies, tasks } = useAppContext();
  
  // Calculate real counts
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  const stats = [
    { name: 'Active Applications', value: jobs.length.toString(), icon: BriefcaseIcon },
    { name: 'Contacts', value: contacts.length.toString(), icon: UserGroupIcon },
    { name: 'Companies', value: companies.length.toString(), icon: BuildingOfficeIcon },
    { name: 'Pending Tasks', value: pendingTasks.toString(), icon: ClipboardDocumentListIcon },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      {/* Getting Started Guide */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Getting Started</h3>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to your Job Tracker! Start by adding your first entries in each section.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <BriefcaseIcon className="h-8 w-8 text-indigo-500" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Add Your First Job</h4>
                    <p className="text-sm text-gray-500">Track job applications and their status</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <UserGroupIcon className="h-8 w-8 text-indigo-500" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Add Contacts</h4>
                    <p className="text-sm text-gray-500">Keep track of recruiters and hiring managers</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="h-8 w-8 text-indigo-500" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Add Companies</h4>
                    <p className="text-sm text-gray-500">Research and track companies you're interested in</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-500" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Create Tasks</h4>
                    <p className="text-sm text-gray-500">Stay organized with follow-ups and reminders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-sync Feature Info */}
      {companies.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <BuildingOfficeIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Smart Company Sync Active! 🎉
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Companies are automatically added when you create jobs or contacts. 
                  You now have {companies.length} {companies.length === 1 ? 'company' : 'companies'} in your database!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 