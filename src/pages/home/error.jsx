import { Link } from "react-router-dom";

export default function ErrorNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600 mt-2">Oops! Page not found.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
