import { useState } from 'react';
import { Trash2, CheckCircle, Clock, Loader2, AlertTriangle, X } from 'lucide-react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggleStatus = async () => {
    setUpdating(true);
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    await onUpdate(task.id, { status: newStatus });
    setUpdating(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(task.id);
    setDeleting(false);
    setShowConfirm(false);
  };

  const isCompleted = task.status === 'Completed';

  return (
    <div className={`group bg-white rounded-2xl p-5 border transition-all duration-300 hover:shadow-md ${
      isCompleted ? 'border-emerald-100 bg-emerald-50/30' : 'border-slate-100'
    }`}>
      {showConfirm ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Delete this task?</p>
              <p className="text-xs text-slate-500">This action cannot be undone.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold bg-red-600 text-white hover:bg-red-700 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {deleting ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Delete'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {isCompleted ? (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle className="h-3 w-3" />
                  Completed
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                  <Clock className="h-3 w-3" />
                  Pending
                </span>
              )}
              <span className="text-[10px] text-slate-400 font-medium">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h4 className={`text-lg font-semibold truncate transition-all ${
              isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'
            }`}>
              {task.title}
            </h4>
            {task.description && (
              <p className={`mt-1 text-sm line-clamp-2 ${
                isCompleted ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {task.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleToggleStatus}
              disabled={updating}
              className={`p-2 rounded-xl transition-all ${
                isCompleted
                  ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
              }`}
              title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
            >
              {updating ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-all"
              title="Delete Task"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
