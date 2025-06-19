import React from 'react';
import { 
  BriefcaseIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { useAppContext } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const { jobs, contacts, companies, tasks } = useAppContext();
  
  // Calculate job metrics
  const totalJobs = jobs.length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  
  // Job status distribution
  const statusCounts = {
    applied: jobs.filter(job => job.status === 'applied').length,
    'hr-screen': jobs.filter(job => job.status === 'hr-screen').length,
    'recruiter-call': jobs.filter(job => job.status === 'recruiter-call').length,
    'hiring-manager': jobs.filter(job => job.status === 'hiring-manager').length,
    'team-interview': jobs.filter(job => job.status === 'team-interview').length,
    'final-interview': jobs.filter(job => job.status === 'final-interview').length,
    'on-site': jobs.filter(job => job.status === 'on-site').length,
    offered: jobs.filter(job => job.status === 'offered').length,
    'offer-accepted': jobs.filter(job => job.status === 'offer-accepted').length,
    'offer-declined': jobs.filter(job => job.status === 'offer-declined').length,
    rejected: jobs.filter(job => job.status === 'rejected').length,
    'pending-visa': jobs.filter(job => job.status === 'pending-visa').length,
    withdrawn: jobs.filter(job => job.status === 'withdrawn').length,
  };

  // Calculate active pipeline (not rejected, withdrawn, or completed)
  const activePipeline = totalJobs - statusCounts.rejected - statusCounts.withdrawn - statusCounts['offer-accepted'] - statusCounts['offer-declined'];
  
  // Calculate interview stages
  const inInterviewProcess = statusCounts['hr-screen'] + statusCounts['recruiter-call'] + statusCounts['hiring-manager'] + 
                           statusCounts['team-interview'] + statusCounts['final-interview'] + statusCounts['on-site'];
  
  // Success rate (offers received / total applications)
  const totalOffers = statusCounts.offered + statusCounts['offer-accepted'] + statusCounts['offer-declined'];
  const successRate = totalJobs > 0 ? ((totalOffers / totalJobs) * 100).toFixed(1) : '0';

  // Response rate (applications that got past "applied" stage)
  const gotResponse = totalJobs - statusCounts.applied;
  const responseRate = totalJobs > 0 ? ((gotResponse / totalJobs) * 100).toFixed(1) : '0';

  const mainStats = [
    { name: 'Total Applications', value: totalJobs.toString(), icon: BriefcaseIcon, color: 'bg-blue-500' },
    { name: 'Active Pipeline', value: activePipeline.toString(), icon: ArrowTrendingUpIcon, color: 'bg-green-500' },
    { name: 'In Interview Process', value: inInterviewProcess.toString(), icon: ClockIcon, color: 'bg-yellow-500' },
    { name: 'Success Rate', value: `${successRate}%`, icon: CheckCircleIcon, color: 'bg-purple-500' },
  ];

  const secondaryStats = [
    { name: 'Contacts', value: contacts.length.toString(), icon: UserGroupIcon },
    { name: 'Companies', value: companies.length.toString(), icon: BuildingOfficeIcon },
    { name: 'Pending Tasks', value: pendingTasks.toString(), icon: ClipboardDocumentListIcon },
    { name: 'Response Rate', value: `${responseRate}%`, icon: ArrowTrendingUpIcon },
  ];

  const statusLabels = {
    applied: 'Applied',
    'hr-screen': 'HR Screen',
    'recruiter-call': 'Recruiter Call',
    'hiring-manager': 'Hiring Manager',
    'team-interview': 'Team Interview',
    'final-interview': 'Final Interview',
    'on-site': 'On-site',
    offered: 'Offered',
    'offer-accepted': 'Offer Accepted',
    'offer-declined': 'Offer Declined',
    rejected: 'Rejected',
    'pending-visa': 'Pending Visa',
    withdrawn: 'Withdrawn',
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        {totalJobs > 0 && (
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        )}
      </div>
      
      {/* Main KPI Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className={`absolute rounded-md ${stat.color} p-3`}>
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

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {secondaryStats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <stat.icon className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Pipeline Breakdown */}
      {totalJobs > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Job Application Pipeline</h3>
            <p className="mt-1 text-sm text-gray-500">
              Track your applications through each stage of the hiring process
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Object.entries(statusCounts).map(([status, count]) => (
                  count > 0 && (
                    <div key={status} className="text-center">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[status as keyof typeof statusColors]}`}>
                        {statusLabels[status as keyof typeof statusLabels]}
                      </div>
                      <div className="mt-2 text-2xl font-bold text-gray-900">{count}</div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Getting Started or Insights */}
      {totalJobs === 0 ? (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Welcome to Job Tracker!</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start tracking your job applications to see analytics and insights here.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by going to the Jobs page and adding your first application.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowTrendingUpIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-900">
                Job Search Analytics
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="font-medium">Response Rate: {responseRate}%</p>
                    <p className="text-xs">Applications that got past initial screening</p>
                  </div>
                  <div>
                    <p className="font-medium">Interview Rate: {totalJobs > 0 ? ((inInterviewProcess / totalJobs) * 100).toFixed(1) : 0}%</p>
                    <p className="text-xs">Applications that reached interview stage</p>
                  </div>
                  <div>
                    <p className="font-medium">Offer Rate: {successRate}%</p>
                    <p className="text-xs">Applications that resulted in offers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Summary */}
      {jobs.some(job => job.notesList && job.notesList.length > 0) && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Great job tracking! 🎉
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  You have detailed notes on {jobs.filter(job => job.notesList && job.notesList.length > 0).length} applications. 
                  This data will be valuable for AI-powered insights and interview preparation.
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