const express = require("express");
const router = express.Router();

/**
 * POST /api/contact
 * Request body:
 * {
 *   "name": "Alex Doe",
 *   "email": "alex@example.com",
 *   "message": "Interested in partnering with TripPilote"
 * }
 */
router.post("/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;

    const errors = [];
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.push("Name is required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      errors.push("A valid email address is required.");
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      errors.push("Message must be at least 5 characters long.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact submission",
        errors: errors
      });
    }

    // In production, integrate with SendGrid, Nodemailer, or Resend here.
    console.log(`[TripPilote Contact Inquiry] From: ${name} (${email}) - Message: ${message}`);

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out to TripPilote! Our travel team has received your message and will respond within 24 hours."
    });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later."
    });
  }
});

module.exports = router;
