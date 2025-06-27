import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CalendarView() {
  const [topics, setTopics] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get("/topics/all");
        setTopics(res.data);
      } catch (err) {
        console.error("Failed to fetch topics:", err);
      }
    };
    fetchTopics();
  }, []);

  const topicsOnSelectedDate = topics.filter((topic) => {
    return (
      topic.dueDate &&
      new Date(topic.dueDate).toDateString() === selectedDate.toDateString()
    );
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6 bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] pt-20">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-25">
          📅 Calendar View
        </h1>

        <div className="flex flex-col md:flex-row gap-20 items-center justify-center">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded-lg shadow"
          />

          <div className="bg-white p-6 rounded-xl shadow-md w-90">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              {selectedDate.toDateString()}
            </h2>
            {topicsOnSelectedDate.length === 0 ? (
              <p className="text-gray-500">No topics due.</p>
            ) : (
              <ul className="space-y-2">
                {topicsOnSelectedDate.map((topic) => (
                  <li
                    key={topic._id}
                    className="p-2 border rounded text-md hover:bg-purple-50 cursor-pointer"
                    onClick={() =>
                      navigate(`/subjects/${topic.subjectId._id}`, {
                        state: { subjectName: topic.subjectName },
                      })
                    }
                  >
                    <span className="font-semibold">{topic.title}</span>
                    <br />
                    <span className="text-sm text-blue-500">
                      Status: {topic.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
