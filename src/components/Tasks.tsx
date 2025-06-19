import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, CheckCircleIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Task } from '../types';
import { useAppContext } from '../context/AppContext';

const Tasks: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    type: 'other',
    company: '',
  });
  const [showPostCallNotes, setShowPostCallNotes] = useState<string | null>(null);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const handleAddTask = () => {
    if (newTask.title) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        status: newTask.status || 'pending',
        priority: newTask.priority || 'medium',
        type: newTask.type || 'other',
        company: newTask.company,
      };
      addTask(task);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        status: 'pending',
        priority: 'medium',
        type: 'other',
        company: '',
      });
      setShowAddForm(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      type: task.type,
      company: task.company,
    });
  };

  const handleUpdateTask = () => {
    if (editingTask && newTask.title) {
      updateTask(editingTask.id, {
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        status: newTask.status || 'pending',
        priority: newTask.priority || 'medium',
        type: newTask.type || 'other',
        company: newTask.company,
      });
      setEditingTask(null);
      setNewTask({
        title: '',
        description: '',
        dueDate: '',
        status: 'pending',
        priority: 'medium',
        type: 'other',
        company: '',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setShowAddForm(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      status: 'pending',
      priority: 'medium',
      type: 'other',
      company: '',
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const toggleTaskStatus = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updates: Partial<Task> = {
        status: task.status === 'pending' ? 'completed' : 'pending'
      };
      
      // If completing a call/meeting task, prompt for post-call notes
      if (task.status === 'pending' && (task.type === 'call' || task.type === 'meeting')) {
        setShowPostCallNotes(taskId);
        return;
      }
      
      if (updates.status === 'completed') {
        updates.completedDate = new Date().toISOString();
      }
      
      updateTask(taskId, updates);
    }
  };

  const handlePostCallNotes = (taskId: string, notes: string) => {
    updateTask(taskId, {
      status: 'completed',
      postCallNotes: notes,
      completedDate: new Date().toISOString(),
    });
    setShowPostCallNotes(null);
  };

  const isOverdue = (task: Task) => {
    if (!task.dueDate || task.status === 'completed') return false;
    return new Date(task.dueDate) < new Date();
  };

  // Separate overdue tasks
  const overdueTasks = tasks.filter(task => isOverdue(task));
  const regularTasks = tasks.filter(task => !isOverdue(task));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Task
        </button>
      </div>

      {/* Add/Edit Task Form */}
      {(showAddForm || editingTask) && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Task Title *</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g. Follow up with hiring manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Type</label>
              <select
                value={newTask.type}
                onChange={(e) => setNewTask({...newTask, type: e.target.value as Task['type']})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="call">Call</option>
                <option value="meeting">Meeting</option>
                <option value="follow-up">Follow-up</option>
                <option value="research">Research</option>
                <option value="application">Application</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={newTask.company}
                onChange={(e) => setNewTask({...newTask, company: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value as Task['priority']})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {editingTask && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({...newTask, status: e.target.value as Task['status']})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Additional details about this task..."
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
              onClick={editingTask ? handleUpdateTask : handleAddTask}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      )}

      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-sm font-medium text-red-800">
              {overdueTasks.length} Overdue Task{overdueTasks.length > 1 ? 's' : ''}
            </h3>
          </div>
          <div className="mt-3 space-y-2">
            {overdueTasks.map((task) => (
              <div key={task.id} className="bg-white rounded border border-red-200 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="mr-3 text-gray-400"
                    >
                      <CheckCircleIcon className="h-5 w-5" />
                    </button>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-red-900">{task.title}</p>
                        <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                          {task.type}
                        </span>
                        {task.company && (
                          <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                            {task.company}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-red-600 mt-1">
                        Due: {new Date(task.dueDate!).toLocaleDateString()} (Overdue)
                      </p>
                      {(task.type === 'call' || task.type === 'meeting') && (
                        <p className="text-xs text-red-500 mt-1">
                          ⚠️ Post-call notes required when completed
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditTask(task)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Tasks List */}
      {regularTasks.length === 0 && overdueTasks.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">No tasks added yet. Click "Add Task" to get started!</p>
        </div>
      ) : regularTasks.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {regularTasks.map((task) => (
              <li key={task.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`mr-3 ${
                          task.status === 'completed' ? 'text-green-500' : 'text-gray-400'
                        }`}
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-medium ${
                            task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </p>
                          <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                            {task.type}
                          </span>
                          {task.company && (
                            <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                              {task.company}
                            </span>
                          )}
                        </div>
                        {task.description && (
                          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        )}
                        {task.postCallNotes && (
                          <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                            <p className="text-xs font-medium text-blue-800">Post-Call Notes:</p>
                            <p className="text-xs text-blue-700">{task.postCallNotes}</p>
                          </div>
                        )}
                        {task.completedDate && (
                          <p className="text-xs text-green-600 mt-1">
                            Completed: {new Date(task.completedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="text-sm text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditTask(task)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Post-Call Notes Modal */}
      {showPostCallNotes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Post-Call Notes</h3>
              <textarea
                placeholder="How did the call/meeting go? Any key takeaways, next steps, or feedback..."
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                id="postCallNotes"
              />
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowPostCallNotes(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const notes = (document.getElementById('postCallNotes') as HTMLTextAreaElement).value;
                    handlePostCallNotes(showPostCallNotes, notes);
                  }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Complete Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks; 