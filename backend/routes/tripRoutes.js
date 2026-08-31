const express = require("express");
const router = express.Router();
const { generateItinerary } = require("../services/itineraryService");

/**
 * POST /api/plan-trip
 * Request body:
 * {
 *   "destination": "Goa",
 *   "days": 3,
 *   "budget": 15000,
 *   "travelers": 2,
 *   "travelStyle": "Adventure",
 *   "interests": ["Beaches", "Food"],
 *   "transport": "Mixed"
 * }
 */
router.post("/plan-trip", (req, res) => {
  try {
    const {
      destination,
      days,
      budget,
      travelers,
      travelStyle,
      interests,
      transport
    } = req.body;

    // Server-side validation
    const errors = [];

    if (!destination || typeof destination !== "string" || !destination.trim()) {
      errors.push("Destination is required.");
    }

    const parsedDays = parseInt(days, 10);
    if (!days || isNaN(parsedDays) || parsedDays < 1 || parsedDays > 30) {
      errors.push("Number of days must be between 1 and 30.");
    }

    const parsedBudget = parseFloat(budget);
    if (!budget || isNaN(parsedBudget) || parsedBudget <= 0) {
      errors.push("Please enter a valid positive budget amount.");
    }

    const parsedTravelers = parseInt(travelers, 10);
    if (!travelers || isNaN(parsedTravelers) || parsedTravelers < 1 || parsedTravelers > 20) {
      errors.push("Number of travelers must be between 1 and 20.");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors
      });
    }

    // Generate smart itinerary
    const result = generateItinerary({
      destination: destination.trim(),
      days: parsedDays,
      budget: parsedBudget,
      travelers: parsedTravelers,
      travelStyle: travelStyle || "Comfort",
      interests: Array.isArray(interests) ? interests : [],
      transport: transport || "Mixed"
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in /api/plan-trip:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating the itinerary. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

module.exports = router;
