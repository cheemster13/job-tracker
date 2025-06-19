import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomeIcon, BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

import { AppProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';
import Jobs from './components/Jobs';
import Contacts from './components/Contacts';
import Companies from './components/Companies';
import Tasks from './components/Tasks';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
                <h1 className="text-xl font-bold text-white">Job Tracker</h1>
              </div>
              <nav className="flex-1 px-4 py-4 space-y-1">
                <Link to="/" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                  <HomeIcon className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>
                <Link to="/jobs" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                  <BriefcaseIcon className="w-5 h-5 mr-3" />
                  Jobs
                </Link>
                <Link to="/contacts" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                  <UserGroupIcon className="w-5 h-5 mr-3" />
                  Contacts
                </Link>
                <Link to="/companies" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                  <BuildingOfficeIcon className="w-5 h-5 mr-3" />
                  Companies
                </Link>
                <Link to="/tasks" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                  <ClipboardDocumentListIcon className="w-5 h-5 mr-3" />
                  Tasks
                </Link>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="pl-64">
            <main className="p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/tasks" element={<Tasks />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App; 