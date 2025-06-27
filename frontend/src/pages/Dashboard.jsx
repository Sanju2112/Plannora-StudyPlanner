import { useEffect, useState } from "react";
import api from "../services/api";
import SubjectForm from "../components/SubjectForm";
import SubjectCard from "../components/SubjectCard";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (err) {
      setError("⚠️ Failed to load subjects.");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubjectAdded = (newSubject) => {
    setSubjects([newSubject, ...subjects]);
    setShowForm(false);
  };

  const handleSubjectDelete = (id) => {
    setSubjects(subjects.filter((subj) => subj._id !== id));
  };

  const handleSubjectUpdate = (updatedSubject) => {
    setSubjects(
      subjects.map((subj) =>
        subj._id === updatedSubject._id ? updatedSubject : subj
      )
    );
  };

  const filteredSubjects = subjects.filter((subj) =>
    subj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] p-6 flex flex-col items-center relative pt-20">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
          My Subjects
        </h1>

        {/* Search + Add Button */}
        <div className="flex gap-3 items-center w-full max-w-xl mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subjects..."
            className="flex-1 p-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Add Subject
          </button>
        </div>

        {error && (
          <div className="text-center text-red-600 bg-red-100 p-2 rounded my-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2 w-full">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subj) => (
              <SubjectCard
                key={subj._id}
                subject={subj}
                onDelete={handleSubjectDelete}
                onUpdate={handleSubjectUpdate}
              />
            ))
          ) : (
            <p className="text-center text-red-500 col-span-full mt-6">
              No subjects found.
            </p>
          )}
        </div>

        {/* Popup Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-80 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 text-lg hover:text-red-500"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4 text-purple-700">
                Add Subject
              </h2>
              <SubjectForm onAdd={handleSubjectAdded} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
