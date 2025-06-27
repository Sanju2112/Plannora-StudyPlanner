import { useState } from "react";
import api from "../services/api";

export default function SubjectForm({ onAdd }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/subjects", { name });
      onAdd(res.data);
      setName("");
    } catch (err) {
      setError("⚠️ Could not add subject.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        placeholder="Enter subject name"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
        required
      />
      <button
        type="submit"
        className="w-full bg-purple-400 text-white py-2 rounded hover:bg-purple-500 transition"
      >
        Add Subject
      </button>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </form>
  );
}
