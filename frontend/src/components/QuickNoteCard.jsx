import { useState, useEffect } from "react";
import api from "../services/api";

export default function QuickNoteCard({ note, onUpdate, onDelete }) {
  if (!note || !note.title || !note.content) return null; // safeguard

  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ title: "", content: "" });

  useEffect(() => {
    if (note) {
      setEditedNote({
        title: note.title || "",
        content: note.content || "",
      });
    }
  }, [note]);

  const handleSave = async () => {
    try {
      const res = await api.put(`/quicknotes/${note._id}`, editedNote);
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("❌ Failed to update note.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      {isEditing ? (
        <div className="space-y-2">
          <input
            value={editedNote.title}
            onChange={(e) =>
              setEditedNote({ ...editedNote, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Title"
          />
          <textarea
            value={editedNote.content}
            onChange={(e) =>
              setEditedNote({ ...editedNote, content: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Content"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-purple-700">
            {note.title || "Untitled"}
          </h3>
          <p className="text-gray-600 whitespace-pre-line mt-1">
            {note.content}
          </p>
          <div className="text-sm text-gray-600 mt-2">
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </div>
          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="text-red-600 hover:underline"
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
