const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const tripRoutes = require("./routes/tripRoutes");
const chatRoutes = require("./routes/chatRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging in development
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// REST API Endpoints
app.use("/api", tripRoutes);
app.use("/api", chatRoutes);
app.use("/api", contactRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "TripPilote AI Travel Planner API",
    version: "2.0.0",
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static files
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// Frontend SPA fallback for non-API routes
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({
      success: false,
      message: `API endpoint '${req.path}' not found.`
    });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 TripPilote AI Server running at http://localhost:${PORT}`);
  console.log(`🌍 Frontend & API available on http://localhost:${PORT}`);
  console.log(`⚙️  Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`====================================================`);
});
