import React, { useState } from "react";
import useAuthStore from "../context/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const email = useAuthStore((state) => state.email);
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setCode(e.target.value);

  const handleSubmit = async (e) => {
    console.log(code, email);
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/auth/confirm-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token:code }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to confirm email.");

      toast.success("Email confirmed successfully");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeResend = async () => {
    console.log(code);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/api/auth/resend-verification-code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error resending code");

      toast.success(data.message || "Code resent successfully");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-center text-[#5253A3]">
          Confirm Your Email
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter the code sent to{" "}
          <span className="font-semibold text-[#5253A3]">
            {email?.slice(0, 3)}...{email?.split("@")[1]}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="code" className="block text-gray-700 font-medium">
              Six-digit Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5253A3] transition"
              placeholder="Enter code"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-[#34A853] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Confirming...
              </>
            ) : (
              "Continue"
            )}
          </button>

          <div className="mt-4 text-center text-gray-600">
            Didn’t receive the code?{" "}
            <span
              className="text-green-600 font-semibold cursor-pointer hover:underline"
              onClick={handleCodeResend}
            >
              Resend it
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmEmail;
