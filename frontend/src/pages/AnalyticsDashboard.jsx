import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AnalyticsDashboard() {
  const [topics, setTopics] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const topicRes = await api.get("/topics/all");
      const subjectRes = await api.get("/subjects");
      setTopics(topicRes.data);
      setSubjects(subjectRes.data);
    };
    fetchData();
  }, []);

  // Individual Days (past 7 days)
  const today = new Date();
  const dailyCounts = {};

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    dailyCounts[key] = 0;
  }

  topics.forEach((topic) => {
    if (topic.status === "completed" && topic.dueDate) {
      const date = new Date(topic.dueDate);
      const key = date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
      if (dailyCounts.hasOwnProperty(key)) {
        dailyCounts[key]++;
      }
    }
  });

  const weeklyChartData = Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count,
  }));

  // ✅ Subject-wise progress
  const subjectChartData = subjects.map((subject) => {
    const subjectTopics = topics.filter(
      (t) => t.subjectId?._id === subject._id
    );
    const completed = subjectTopics.filter(
      (t) => t.status === "completed"
    ).length;
    const total = subjectTopics.length || 1;
    return {
      name: subject.name,
      progress: Math.round((completed / total) * 100),
    };
  });

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bcd4"];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE] p-6 pt-20">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          📊 Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bar Chart: Topics Completed Per Day */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              Topics Completed (Past 7 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyChartData}>
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart: Subject-wise Progress */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              Subject-wise Progress (% Completed)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectChartData}
                  dataKey="progress"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {subjectChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
