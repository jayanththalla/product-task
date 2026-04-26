import { useState, useEffect } from 'react';
import API from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { LayoutGrid, ListChecks, CheckCircle2, Circle, Loader2, Search } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = async (taskData) => {
    const response = await API.post('/tasks', taskData);
    setTasks([response.data, ...tasks]);
  };

  const handleTaskUpdate = async (id, updateData) => {
    const response = await API.put(`/tasks/${id}`, updateData);
    setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
  };

  const handleTaskDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && task.status === 'Completed') ||
                         (filter === 'pending' && task.status === 'Pending');
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    pending: tasks.filter(t => t.status === 'Pending').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Sidebar & Form */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard</h2>
            <p className="text-slate-500 mt-1">Manage your productivity and tasks</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Done</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
            </div>
          </div>

          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>

        {/* Right Column: Task List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="relative flex-1 w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === 'pending' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  filter === 'completed' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">Loading tasks...</p>
            </div>
          ) : filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={handleTaskUpdate}
                  onDelete={handleTaskDelete}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-100 py-20 flex flex-col items-center justify-center text-center px-4">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <ListChecks className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No tasks found</h3>
              <p className="text-slate-500 mt-1 max-w-xs mx-auto">
                {searchQuery ? `No results for "${searchQuery}"` : "You haven't added any tasks yet. Start by creating one on the left."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
