/* filepath: d:\mocca\client\src\pages\Register.jsx */
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/register`,
        form
      );
      alert("✅ Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-bg">
      {/* Background Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[280px] h-[280px] bg-[#6f4e37] rounded-full opacity-25 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] left-[-120px] w-[220px] h-[220px] bg-[#d4a373] rounded-full opacity-35 blur-2xl animate-pulse delay-300" />
      
      <div className="w-full max-w-md px-4">
        <form onSubmit={handleSubmit} className="card">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#3e2723] mb-2">☕ Join Mocca</h1>
            <p className="text-[#6f4e37]">Create your account to start meeting</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              className="input"
              placeholder="👤 Choose a username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />

            <input
              type="email"
              className="input"
              placeholder="📧 Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="password"
              className="input"
              placeholder="🔒 Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full mt-6"
          >
            {loading ? "🔄 Creating Account..." : "🎯 Create Account"}
          </button>

          <div className="text-center mt-6">
            <p className="text-[#6f4e37]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#3e2723] font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;