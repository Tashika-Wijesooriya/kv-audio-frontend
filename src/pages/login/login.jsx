import { useState } from "react";
import "./login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  function handleOnSubmit(e) {
    e.preventDefault();

const bachendUrl = import.meta.env.VITE_BACKEND_URL;

    // Check if email or password are empty
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    setIsLoading(true);

    axios
      .post(bachendUrl+"/api/users/login", { email, password })
      .then((res) => {
        setIsLoading(false);
        toast.success("Login Success");

        const user = res.data.user
        localStorage.setItem("token", res.data.token);
        if (user.role === "admin") {
          navigate("/admin"); 
        } else {
          navigate("/"); 
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        toast.error("Login Failed. Please check your credentials.");
      });
  }

  return (
    <div className="bg-picture w-full h-screen flex justify-center items-center">
      <form onSubmit={handleOnSubmit}>
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
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-[300px] h-[40px] rounded-lg p-2 mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-[300px] h-[40px] rounded-lg p-2 mb-4 bg-blue-500 text-white font-bold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
