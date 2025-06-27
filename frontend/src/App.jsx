import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import SubjectTopics from "./pages/SubjectTopics";
import LandingPage from "./pages/LandingPage";
import CalendarView from "./pages/CalendarView";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import QuickNotes from "./pages/QuickNotes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/subjects/:id"
          element={
            <PrivateRoute>
              <SubjectTopics />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalendarView />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <AnalyticsDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/quicknotes"
          element={
            <PrivateRoute>
              <QuickNotes />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
