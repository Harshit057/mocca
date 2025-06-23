import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Meet = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const navigate = useNavigate();

  const { roomId = "mocca-room" } = useParams();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  useEffect(() => {
    const initWebRTC = async () => {
      localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = localStream.current;

      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      localStream.current.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, localStream.current);
      });

      peerConnection.current.ontrack = event => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      peerConnection.current.onicecandidate = event => {
        if (event.candidate) {
          socket.emit("ice-candidate", { roomId, candidate: event.candidate });
        }
      };

      socket.emit("join-room", { roomId });

      socket.on("user-connected", async () => {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("offer", { offer, roomId });
      });

      socket.on("offer", async offer => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("answer", { answer, roomId });
      });

      socket.on("answer", async answer => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on("ice-candidate", async ({ candidate }) => {
        try {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding ICE candidate", err);
        }
      });
    };

    initWebRTC();

    return () => {
      socket.disconnect();
      peerConnection.current?.close();
      localStream.current?.getTracks().forEach(track => track.stop());
    };
  }, [roomId]);

  const toggleMic = () => {
    const audioTrack = localStream.current.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setMicOn(audioTrack.enabled);
  };

  const toggleCam = () => {
    const videoTrack = localStream.current.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setCamOn(videoTrack.enabled);
  };

  const leaveMeeting = () => {
    peerConnection.current?.close();
    localStream.current?.getTracks().forEach(track => track.stop());
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">👤 You</h2>
          <video ref={localVideoRef} autoPlay playsInline muted className="w-80 h-60 bg-gray-800 rounded" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">👥 Guest</h2>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-80 h-60 bg-gray-800 rounded" />
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={toggleMic} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          {micOn ? "🎤 Mute Mic" : "🔇 Unmute Mic"}
        </button>
        <button onClick={toggleCam} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
          {camOn ? "🎥 Stop Cam" : "📷 Start Cam"}
        </button>
        <button onClick={leaveMeeting} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
          🚪 Leave
        </button>
      </div>
    </div>
  );
};

export default Meet;
