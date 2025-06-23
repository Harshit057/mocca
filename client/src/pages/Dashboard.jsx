import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";

  const handleJoin = () => {
    const roomId = prompt("Enter Room ID to Join or Create:");
    if (roomId) {
      navigate(`/meet/${roomId}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {username} 👋</h1>

      <div className="flex gap-4">
        <button onClick={handleJoin} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">
          🎥 Start / Join Meeting
        </button>
        <button onClick={handleLogout} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded">
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
