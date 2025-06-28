/* filepath: d:\mocca\client\src\pages\Login.jsx */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/login`,
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-bg">
      {/* Background Elements */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#8b5b29] rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[250px] h-[250px] bg-[#a9745d] rounded-full opacity-30 blur-2xl animate-pulse delay-200" />
      
      <div className="w-full max-w-md px-4">
        <form onSubmit={handleSubmit} className="card">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#3e2723] mb-2">☕ Welcome Back</h1>
            <p className="text-[#6f4e37]">Sign in to your Mocca account</p>
          </div>

          <div className="space-y-4">
            <input
              className="input"
              type="email"
              placeholder="📧 Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="🔒 Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6"
          >
            {loading ? "🔄 Signing in..." : "🚀 Sign In"}
          </button>

          <div className="text-center mt-6">
            <p className="text-[#6f4e37]">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#3e2723] font-semibold hover:underline">
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;