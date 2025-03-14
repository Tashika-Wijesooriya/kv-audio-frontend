import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    console.log(email, password);
  }

  return (
    <div className="bg-picture w-full h-screen flex justify-center items-center">
      <div className="w-[400px] p-8 bg-white bg-opacity-80 rounded-2xl shadow-lg backdrop-blur-xl flex flex-col justify-center items-center relative">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[100px] h-[100px] object-cover mb-6"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-[300px] h-[40px] rounded-lg p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-[300px] h-[40px] rounded-lg p-2 mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-[300px] h-[40px] rounded-lg p-2 mb-4 bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
          onClick={login}
        >
          Login
        </button>
        <button className="w-[300px] h-[40px] rounded-lg p-2 mb-4 bg-green-500 text-white font-bold hover:bg-green-600 transition">
          Register
        </button>
      </div>
    </div>
  );
}
