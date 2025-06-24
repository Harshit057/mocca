const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
  console.error("❌ MongoDB Connection Failed:");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
});

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ["http://localhost:5173", "https://your-vercel-url.vercel.app"],
  credentials: true
}));
app.use(express.json());

// Auth API Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Mocca Backend is Live!");
});

// Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", ({ roomId, userId }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    // Handle offer
    socket.on("offer", ({ offer, roomId }) => {
      socket.to(roomId).emit("offer", offer);
    });

    // Handle answer
    socket.on("answer", ({ answer, roomId }) => {
      socket.to(roomId).emit("answer", answer);
    });

    // Handle ICE candidate
    socket.on("ice-candidate", ({ candidate, roomId }) => {
      socket.to(roomId).emit("ice-candidate", { candidate });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", userId);
    });
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
