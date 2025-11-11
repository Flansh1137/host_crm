// src/components/TaskCard.jsx
import React, { useState } from "react";
import { CheckCircle, Edit, Trash, ChevronDown, ChevronUp } from "lucide-react";

const TaskCard = ({ task, onUpdate, onDelete, isManager = false }) => {
  const [showProgressOptions, setShowProgressOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const getStatusColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress > 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const progressOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const handleProgressUpdate = (newProgress) => {
    const updatedTask = {
      ...task,
      progress: newProgress,
      lastUpdated: new Date().toLocaleDateString()
    };
    
    if (newProgress === 100) {
      updatedTask.status = "completed";
    }
    
    onUpdate(updatedTask);
    setShowProgressOptions(false);
  };

  const handleSaveEdit = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        {isEditing ? (
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="text-lg font-semibold text-gray-800 border border-gray-300 rounded px-2 py-1 w-full"
          />
        ) : (
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        )}
        
        {!isManager && (
          <div className="flex space-x-2">
            {!isEditing ? (
              <>
                <button 
                  onClick={() => setShowProgressOptions(!showProgressOptions)}
                  className="text-green-500 hover:text-green-700"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-700"
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2 mb-3">
          <select
            value={editedTask.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Testing">Testing</option>
            <option value="Documentation">Documentation</option>
            <option value="Meeting">Meeting</option>
            <option value="Research">Research</option>
          </select>
          
          <textarea
            value={editedTask.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Add notes..."
            className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-300 w-full"
            rows="3"
          />
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-2">Type: {task.type}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className={`h-2.5 rounded-full ${getStatusColor(task.progress)}`}
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mb-2">Progress: {task.progress}%</p>
          <p className="text-xs text-gray-500">Last Updated: {task.lastUpdated || "N/A"}</p>
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-700">Notes:</h4>
            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">{task.notes || "No notes"}</p>
          </div>
        </>
      )}

      {/* Progress Update Options */}
      {showProgressOptions && !isEditing && !isManager && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Update Progress:</h4>
          <div className="grid grid-cols-5 gap-2">
            {progressOptions.map(progress => (
              <button
                key={progress}
                onClick={() => handleProgressUpdate(progress)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  task.progress === progress 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-purple-100'
                }`}
              >
                {progress}%
              </button>
            ))}
          </div>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => handleProgressUpdate(Math.max(0, task.progress - 10))}
              className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              -10%
            </button>
            <button
              onClick={() => handleProgressUpdate(Math.min(100, task.progress + 10))}
              className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              +10%
            </button>
            <button
              onClick={() => handleProgressUpdate(100)}
              className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Complete
            </button>
          </div>
        </div>
      )}

      {/* Completion Badge */}
      {task.progress === 100 && (
        <div className="mt-2 flex items-center text-green-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span className="text-xs font-medium">Completed</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;