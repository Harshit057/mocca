import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full flex flex-col items-center space-y-8">
        <h1 className="text-5xl font-extrabold text-indigo-700 text-center drop-shadow-md">
          ☕ Mocca
        </h1>
        <p className="text-center text-gray-600 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-indigo-600">Mocca</span> —
          where code meets creativity. Join our community or log in to get started.
        </p>
        <div className="flex gap-6 mt-4">
          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium shadow-md transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
