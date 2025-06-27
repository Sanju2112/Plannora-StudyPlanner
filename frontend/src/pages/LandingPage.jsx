import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-[#C8D8FF] via-[#F0D9FF] to-[#EBD4F5] text-gray-800">
      {/* Navbar */}
      <nav className="w-full py-4 px-6 flex justify-between items-center bg-white bg-opacity-40 backdrop-blur-md shadow-md fixed top-0 z-50">
        <h1 className="text-3xl font-bold text-purple-700 font-serif">
          📝 Plannora
        </h1>
        <div className="space-x-6 text-purple-700 font-medium">
          <Link to="/login" className="hover:text-pink-500 transition">
            Login
          </Link>
          <Link to="/register" className="hover:text-pink-500 transition">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-10 pt-28 lg:pt-36 pb-20">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-purple-800 leading-tight">
            Plan. Track. Succeed.
          </h2>
          <p className="text-xl text-gray-700">
            Turn your chaos into clarity — organize subjects, track progress,
            and conquer your study goals in style.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <Link
              to="/register"
              className="px-6 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 rounded-full border-2 border-purple-500 text-purple-600 hover:bg-purple-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2">
          <img
            src="/assets/image.png"
            alt="Study Illustration"
            className="w-full max-w-md mx-auto height-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white bg-opacity-60 backdrop-blur-md py-20 px-6">
        <h3 className="text-center text-3xl font-bold text-purple-800 mb-12 font-serif">
          What You Can Do
        </h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Organize Subjects",
              desc: "Add, edit, and delete subjects with ease.",
              icon: "📚",
            },
            {
              title: "Track Topics",
              desc: "Mark your topics as 'In Progress' or 'Completed'.",
              icon: "🖋",
            },
            {
              title: "Add Notes & Deadlines",
              desc: "Attach notes and due dates to every topic.",
              icon: "🗓️",
            },
            {
              title: "Quick Notes",
              desc: "Capture short thoughts or tasks instantly and access them anytime.",
              icon: "🗒️",
            },
            {
              title: "Analytics",
              desc: "Visualize your progress and productivity with interactive charts.",
              icon: "📊",
            },
            {
              title: "Chat Assistant",
              desc: "Need help? Ask our AI-powered assistant for tips or motivation!",
              icon: "💬",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-purple-100 rounded-2xl shadow-lg p-6 text-center space-y-4 transition hover:scale-105"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-purple-700">
                {feature.title}
              </h4>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-100 mt-auto py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Plannora. Built with 💜 for learners.
      </footer>
    </div>
  );
}
