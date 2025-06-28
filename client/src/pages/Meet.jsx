import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

// ✅ Connect to Backend Socket Server
const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'],
  secure: true,
});

const Meet = () => {
  const { roomId = "mocca-room" } = useParams();
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    const startCall = async () => {
      try {
        // 🎥 Get Local Media
        localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = localStream.current;

        // 📞 Peer Connection
        peerConnection.current = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });

        // Add Tracks to Peer
        localStream.current.getTracks().forEach(track => {
          peerConnection.current.addTrack(track, localStream.current);
        });

        // On Remote Stream
        peerConnection.current.ontrack = ({ streams }) => {
          remoteVideoRef.current.srcObject = streams[0];
        };

        // On ICE Candidate
        peerConnection.current.onicecandidate = ({ candidate }) => {
          if (candidate) {
            socket.emit('ice-candidate', { roomId, candidate });
          }
        };

        // Join Room
        socket.emit("join-room", { roomId });

        // When another user joins
        socket.on("user-connected", async () => {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.emit("offer", { roomId, offer });
        });

        // Receive Offer
        socket.on("offer", async ({ offer }) => {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.emit("answer", { roomId, answer });
        });

        // Receive Answer
        socket.on("answer", async ({ answer }) => {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        });

        // Receive ICE
        socket.on("ice-candidate", async ({ candidate }) => {
          try {
            await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (err) {
            console.error("Error adding ICE candidate:", err);
          }
        });

      } catch (err) {
        console.error("Failed to access camera or mic:", err);
        alert("Please allow access to camera and microphone.");
      }
    };

    startCall();

    // 🧹 Cleanup
    return () => {
      socket.disconnect();
      peerConnection.current?.close();
      localStream.current?.getTracks()?.forEach(track => track.stop());
    };
  }, [roomId]);

  // 🎤 Toggle Microphone
  const toggleMic = () => {
    const audioTrack = localStream.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  // 📷 Toggle Camera
  const toggleCam = () => {
    const videoTrack = localStream.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setCamOn(videoTrack.enabled);
    }
  };

  // 🚪 Leave Meeting
  const leaveMeeting = () => {
    peerConnection.current?.close();
    localStream.current?.getTracks()?.forEach(track => track.stop());
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f5f0e6] flex flex-col items-center justify-center px-4 py-10 text-[#3e2723]">
      <h1 className="text-3xl font-bold mb-6">
        ☕ Mocca Meet Room: <span className="font-mono text-[#6f4e37]">{roomId}</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="backdrop-blur bg-white/40 border border-[#d4a373] shadow-xl rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">👤 You</h2>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-80 h-60 rounded-xl bg-[#ccc] shadow-md"
          />
        </div>
        <div className="backdrop-blur bg-white/40 border border-[#6f4e37] shadow-xl rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">👥 Guest</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-80 h-60 rounded-xl bg-[#ccc] shadow-md"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={toggleMic}
          className="px-6 py-2 bg-[#6f4e37] hover:bg-[#5a3d2b] text-white rounded-lg shadow transition"
        >
          {micOn ? "🎤 Mute Mic" : "🔇 Unmute Mic"}
        </button>
        <button
          onClick={toggleCam}
          className="px-6 py-2 bg-[#a9745d] hover:bg-[#8a5a46] text-white rounded-lg shadow transition"
        >
          {camOn ? "🎥 Stop Cam" : "📷 Start Cam"}
        </button>
        <button
          onClick={leaveMeeting}
          className="px-6 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-lg shadow transition"
        >
          🚪 Leave
        </button>
      </div>
    </div>
  );
};

export default Meet;
