import { Link } from "react-router-dom";

export default function ErrorNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-900 via-purple-700 to-indigo-600 text-white">
      <div className="bg-white text-gray-800 shadow-lg rounded-lg p-10 text-center max-w-lg mx-auto">
        <h1 className="text-7xl font-extrabold">404</h1>
        <p className="text-xl text-gray-700 mt-2 mb-6">Oops! Page not found.</p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all transform hover:bg-indigo-700 hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
