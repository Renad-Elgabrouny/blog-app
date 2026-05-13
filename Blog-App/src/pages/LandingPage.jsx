import { NavLink } from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 flex items-center justify-center px-6">

      <div className="text-center max-w-2xl">

        {/* Title */}
        <h1 className="text-6xl font-extrabold text-white mb-6">
          Blog<span className="text-blue-400">Sphere</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg mb-10 leading-8">
          A simple space to write, share, and explore meaningful stories.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <NavLink to="/home">
            <button className="px-8 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all shadow-md">
              Explore Blogs
            </button>
          </NavLink>

          <NavLink to="/Registeration&Login">
            <button className="px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all">
              Login / Register
            </button>
          </NavLink>

        </div>

      </div>
    </div>
  );
}