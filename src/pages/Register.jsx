import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toastErrorNotify } from "../helper/ToastNotify";
import GoogleIcon from "../assets/GoogleIcon";

const Register = () => {
  const { signUp, signUpWithGoogle } = useAuth(); // Use signUp for email registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password);
      navigate("/chat"); // Redirect after successful registration
    } catch (error) {
      toastErrorNotify(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signUpWithGoogle();
      navigate("/chat");
    } catch (error) {
      toastErrorNotify(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 w-[380px] h-[500px] p-8 rounded-xl shadow-2xl card-shadow animate-pulseRGB">
        <h2 className="text-red-500 text-2xl font-semibold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="peer w-full p-3 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="relative z-0 w-full mb-6">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="peer w-full p-3 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 mb-4 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            disabled={loading}
          >
            Continue with Google
            <GoogleIcon className="ml-2" />
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
