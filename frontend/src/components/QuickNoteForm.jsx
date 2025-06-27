import { useState } from "react";
import api from "../services/api";

export default function QuickNoteForm({ onAdd }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title.trim() && !note.content.trim()) return;
    try {
      setLoading(true);
      const res = await api.post("/quicknotes", note);
      onAdd(res.data);
      setNote({ title: "", content: "" });
    } catch (err) {
      alert("❌ Failed to add note.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-3"
    >
      <input
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title (optional)"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="content"
        value={note.content}
        onChange={handleChange}
        placeholder="Write something..."
        rows={4}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "➕ Add Note"}
      </button>
    </form>
  );
}
