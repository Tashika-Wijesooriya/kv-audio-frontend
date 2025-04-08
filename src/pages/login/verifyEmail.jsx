import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in first.");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data.status === "success") {
          setMessage("OTP sent to your email.");
        } else {
          setMessage("Failed to send OTP.");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        setMessage("An error occurred while sending OTP.");
      });
  }, [token]);

  function handleVerifyEmail() {
    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    setIsLoading(true);

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`,
        { code: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "Email verified successfully") {
          setMessage("Email verified successfully!");
          toast.success("Email verified successfully!");

          setTimeout(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }, 2000);
        } else {
          setMessage("Failed to verify OTP.");
          toast.error("Failed to verify OTP.");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        setMessage("An error occurred while verifying OTP.");
        toast.error("Error verifying OTP.");
      });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[400px] h-[300px] bg-white shadow-lg rounded-lg flex flex-col justify-center items-center gap-3 p-4">
        <h1 className="text-2xl font-bold">Verify Email</h1>
        <p className="text-gray-500">
          {message || "Enter OTP sent to your email"}
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 rounded-lg w-[80%]"
        />
        <button
          onClick={handleVerifyEmail}
          disabled={isLoading}
          className={`${
            isLoading ? "bg-blue-300" : "bg-blue-500"
          } text-white p-2 rounded-lg w-[80%]`}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
}
