import { useState } from "react";
import "./register.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();

    const bachendUrl = import.meta.env.VITE_BACKEND_URL;

    // Check if any field is empty
    if (!email || !password || !firstName || !lastName || !address || !phone) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);

    axios
      .post(bachendUrl + "/api/users/register", {
        email,
        password,
        firstName,
        lastName,
        address,
        phone,
      })
      .then((res) => {
        setIsLoading(false);
        toast.success("Registration Successful!");
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        toast.error("Registration Failed. Please try again.");
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
            type="text"
            placeholder="First Name"
            className="w-[300px] h-[40px] rounded-lg p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-[300px] h-[40px] rounded-lg p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
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
            className="w-[300px] h-[40px] rounded-lg p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="w-[300px] h-[40px] rounded-lg p-2 mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-[300px] h-[40px] rounded-lg p-2 mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-[300px] h-[40px] rounded-lg p-2 mb-4 bg-blue-500 text-white font-bold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
