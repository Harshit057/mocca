const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// ✅ Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  console.log("📩 Register request received:", req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashed });

    console.log("✅ User registered:", newUser.email);
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Login request received:", req.body);

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("❌ Invalid password");
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET missing");
      return res.status(500).json({ msg: "JWT_SECRET not set in .env" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    console.log("✅ Login successful:", user.email);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("❌ Login Server Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get Authenticated User Route
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    console.error("❌ Me Route Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
