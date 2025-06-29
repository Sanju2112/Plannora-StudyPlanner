import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      // 1. Register user
      await api.post("/auth/register", formData);

      // 2. Immediately log in user
      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // 3. Store token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);

      // 4. Redirect
      setMessage("✅ Registered and logged in!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#A5D8FF] to-[#D8B4FE]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center  text-blue-600">
          Register
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition"
        >
          Register
        </button>

        {/* Flash Messages */}
        {message && (
          <div className="text-center text-sm bg-green-100 text-green-700 p-2 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="text-center text-sm bg-red-100 text-red-700 p-2 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
