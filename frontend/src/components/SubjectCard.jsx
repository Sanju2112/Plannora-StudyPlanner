import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function SubjectCard({ subject, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(subject.name);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await api.delete(`/subjects/${subject._id}`);
      onDelete(subject._id);
    } catch (err) {
      setError("❌ Failed to delete.");
    }
  };

  const handleEdit = async () => {
    try {
      const res = await api.put(`/subjects/${subject._id}`, { name: newName });
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      setError("❌ Failed to update.");
    }
  };

  // ✅ Calculate progress
  const totalTopics = subject.topics?.length || 0;
  const completedTopics =
    subject.topics?.filter((t) => t.status === "completed").length || 0;
  const progress =
    totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-2">
      {isEditing ? (
        <div className="space-y-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-between gap-2">
            <button
              onClick={handleEdit}
              className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500"
            >
              ✅ Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-purple-700">
            {subject.name}
          </h2>
          <p className="text-sm text-gray-500 mb-1">
            Created: {new Date(subject.createdAt).toLocaleDateString()}
          </p>

          {/* ✅ Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              className="bg-green-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-black">{progress}% completed</p>

          {/* ✅ Actions */}
          <div className="flex justify-between items-center mt-3">
            <Link
              to={`/subjects/${subject._id}`}
              state={{ subjectName: subject.name }}
              className="text-sm text-blue-700 hover:underline border px-2 py-1 rounded"
            >
              View Topics
            </Link>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                ✏️ Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-sm text-red-500 hover:underline"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </>
      )}
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
