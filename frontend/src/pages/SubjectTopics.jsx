import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function SubjectTopics() {
  const { id } = useParams();
  const { state } = useLocation();
  const subjectName = state?.subjectName;

  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get(`/topics/subject/${id}`);
        setTopics(res.data);
      } catch (err) {
        setError("⚠️ Failed to load topics.");
        console.error(err.response?.data || err.message);
      }
    };
    fetchTopics();
  }, [id]);

  const handleAddTopic = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/topics", {
        title,
        subjectId: id,
        dueDate,
        notes,
      });
      setTopics([res.data, ...topics]);
      setTitle("");
      setDueDate("");
      setNotes("");
      setShowForm(false);
    } catch (err) {
      setError("⚠️ Failed to add topic.");
    }
  };

  const handleDelete = async (topicId) => {
    try {
      await api.delete(`/topics/${topicId}`);
      setTopics(topics.filter((t) => t._id !== topicId));
    } catch {
      setError("❌ Failed to delete topic.");
    }
  };

  const handleStatusChange = async (topicId, newStatus) => {
    try {
      const res = await api.put(`/topics/${topicId}`, { status: newStatus });
      setTopics(
        topics.map((t) =>
          t._id === topicId ? { ...t, status: res.data.status } : t
        )
      );
    } catch {
      setError("❌ Failed to update status.");
    }
  };

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || t.status === filterStatus)
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] p-6 pt-20">
        <h1 className="text-3xl font-bold text-purple-800 text-center mb-6">
          {subjectName || "Subject"}
        </h1>

        {/* Search & Filter */}
        <div className="max-w-3xl mx-auto mb-6 flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-500 w-full md:w-1/2"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded border border-gray-500"
          >
            <option value="all">All</option>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Add Topic Button */}
        <div className="text-center mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
          >
            Add Topic
          </button>
        </div>

        {/* Add Topic Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 text-lg hover:text-red-500"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4 text-purple-700">
                Add Topic
              </h2>
              <form onSubmit={handleAddTopic} className="space-y-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Topic title"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes (optional)"
                  className="w-full border border-gray-300 p-2 rounded"
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

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-600 bg-red-100 p-2 mt-4 rounded">
            {error}
          </p>
        )}

        {/* List of Topics */}
        <div className="grid gap-4 md:grid-cols-3 grid-cols-1 mt-6 mx-auto">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <div
                key={topic._id}
                className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start"
              >
                <div>
                  <h3
                    className={`font-semibold text-lg ${
                      topic.status === "completed"
                        ? "line-through text-gray-600"
                        : ""
                    }`}
                  >
                    {topic.title}
                  </h3>
                  <p className="text-md text-gray-800 mb-1">
                    Status:{" "}
                    <span className="font-medium text-purple-600">
                      {topic.status}
                    </span>
                  </p>

                  {topic.dueDate && (
                    <p className="text-md text-blue-600">
                      Due Date:{" "}
                      {new Date(topic.dueDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  {topic.notes && (
                    <p className="text-md text-black italic mt-1">
                      Notes: <br />
                      {topic.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <select
                    value={topic.status}
                    onChange={(e) =>
                      handleStatusChange(topic._id, e.target.value)
                    }
                    className="border rounded p-1 text-sm"
                  >
                    <option value="not started">Not Started</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    onClick={() => handleDelete(topic._id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-500 col-span-full mt-6">
              No topics found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
