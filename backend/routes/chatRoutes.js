const express = require("express");
const router = express.Router();
const { processChat } = require("../services/aiService");

/**
 * POST /api/chat
 * Request body:
 * {
 *   "message": "Plan a 4 day trip to Goa",
 *   "history": []
 * }
 */
router.post("/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message text is required."
      });
    }

    const response = await processChat({
      message: message.trim(),
      history: Array.isArray(history) ? history : []
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your message.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

module.exports = router;
