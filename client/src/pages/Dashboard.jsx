/* filepath: d:\mocca\client\src\pages\Dashboard.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const [roomId, setRoomId] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleCreateRoom = () => {
    const newRoomId = `mocca-${Date.now()}`;
    navigate(`/meet/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/meet/${roomId.trim()}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="glass-bg">
      {/* Background Elements */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-[#a9745d] rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#6f4e37] rounded-full opacity-15 blur-3xl animate-pulse delay-500" />
      
      <div className="w-full max-w-4xl px-4">
        <div className="card text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-[#3e2723] mb-2">
              ☕ Welcome, {username}!
            </h1>
            <p className="text-xl text-[#6f4e37]">Ready for your next coffee chat?</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/30 backdrop-blur-sm border border-[#d4a373] rounded-xl p-6">
              <h3 className="text-2xl font-bold text-[#3e2723] mb-3">🚀 Start Meeting</h3>
              <p className="text-[#6f4e37] mb-4">Create a new room instantly</p>
              <button 
                onClick={handleCreateRoom}
                className="btn-primary w-full"
              >
                ✨ Create New Room
              </button>
            </div>

            <div className="bg-white/30 backdrop-blur-sm border border-[#d4a373] rounded-xl p-6">
              <h3 className="text-2xl font-bold text-[#3e2723] mb-3">🎯 Join Meeting</h3>
              <p className="text-[#6f4e37] mb-4">Enter an existing room ID</p>
              <button 
                onClick={() => setShowJoinModal(true)}
                className="btn-secondary w-full"
              >
                🔗 Join Existing Room
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/20 backdrop-blur-sm border border-[#d4a373] rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-[#3e2723] mb-3">📊 Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#6f4e37]">0</p>
                <p className="text-sm text-[#8b5b29]">Meetings Today</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#6f4e37]">0</p>
                <p className="text-sm text-[#8b5b29]">Total Minutes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#6f4e37]">0</p>
                <p className="text-sm text-[#8b5b29]">Participants</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-gradient-to-r from-[#b91c1c] to-[#dc2626] hover:from-[#991b1b] hover:to-[#b91c1c] text-white rounded-xl shadow-lg transition-all duration-200"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Join Room Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-md border-2 border-[#d4a373] rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-[#3e2723] mb-4">🔗 Join Meeting Room</h3>
            <input
              type="text"
              className="input"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleJoinRoom}
                disabled={!roomId.trim()}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                🎯 Join Room
              </button>
              <button 
                onClick={() => {
                  setShowJoinModal(false);
                  setRoomId("");
                }}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;