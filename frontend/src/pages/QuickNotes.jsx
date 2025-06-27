import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function QuickNotes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/quicknotes");
        setNotes(res.data);
      } catch {
        setError("⚠️ Failed to load notes.");
      }
    };
    fetchNotes();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    try {
      const res = await api.post("/quicknotes", { title, content });
      setNotes([res.data, ...notes]);
      setTitle("");
      setContent("");
      setShowAddForm(false);
    } catch {
      setError("❌ Failed to add note.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editNote.title.trim() && !editNote.content.trim()) return;
    try {
      const res = await api.put(`/quicknotes/${editNote._id}`, editNote);
      setNotes(notes.map((n) => (n._id === editNote._id ? res.data : n)));
      setShowEditForm(false);
    } catch {
      setError("❌ Failed to update note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/quicknotes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch {
      setError("❌ Failed to delete note.");
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] p-6 pt-20">
        <h1 className="text-3xl font-bold text-purple-800 text-center mb-6">
          Quick Notes
        </h1>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-4 text-center">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-500 w-full max-w-sm"
          />
        </div>

        {/* Add Note Button */}
        <div className="text-center mb-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
          >
            ➕ Add Note
          </button>
        </div>

        {/* Add Note Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 text-lg hover:text-red-500"
                onClick={() => setShowAddForm(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4 text-purple-700">
                Add Note
              </h2>
              <form onSubmit={handleAdd} className="space-y-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note title"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note..."
                  className="w-full border border-gray-300 p-2 rounded"
                  rows={4}
                />
                <button
                  type="submit"
                  className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500 transition"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Edit Note Modal */}
        {showEditForm && editNote && (
          <div className="fixed inset-0 bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 text-lg hover:text-red-500"
                onClick={() => setShowEditForm(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4 text-purple-700">
                Edit Note
              </h2>
              <form onSubmit={handleEditSubmit} className="space-y-3">
                <input
                  type="text"
                  value={editNote.title}
                  onChange={(e) =>
                    setEditNote({ ...editNote, title: e.target.value })
                  }
                  placeholder="Note title"
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <textarea
                  value={editNote.content}
                  onChange={(e) =>
                    setEditNote({ ...editNote, content: e.target.value })
                  }
                  placeholder="Write your note..."
                  className="w-full border border-gray-300 p-2 rounded"
                  rows={4}
                />
                <button
                  type="submit"
                  className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500 transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 bg-red-100 p-2 mt-4 rounded">
            {error}
          </p>
        )}

        {/* Notes List */}
        <div className="grid gap-4 md:grid-cols-3 grid-cols-1 mt-6 mx-auto">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg text-purple-700">
                    {note.title || "Untitled"}
                  </h3>
                  <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created:{" "}
                    {new Date(note.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditNote(note);
                      setShowEditForm(true);
                    }}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-500 col-span-full mt-6">
              No notes found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
