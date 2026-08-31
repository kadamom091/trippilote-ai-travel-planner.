const { destinationDatabase } = require("./destinationData");
const { generateItinerary } = require("./itineraryService");

/**
 * TripPilote Domain Knowledge Engine for AI Assistant
 */
const travelKnowledge = {
  generalTips: [
    "Always carry digital and printed copies of key IDs and booking vouchers.",
    "Stay hydrated and try local street food from stalls with high turnover.",
    "Keep emergency numbers and offline maps downloaded for your destination.",
    "Respect local cultural norms, dress codes at religious sites, and photography rules."
  ],
  packingEssentials: {
    beach: "Sunscreen SPF 50+, polarized sunglasses, quick-dry swimwear, flip-flops, waterproof phone pouch, and linen clothing.",
    mountains: "Thermal base layers, fleece jacket, windproof outer shell, sturdy trekking shoes with grip, woollen socks, lip balm, and moisturizer.",
    city: "Comfortable walking sneakers, breathable cotton wear, portable power bank, universal adapter, and compact umbrella."
  }
};

/**
 * Heuristic travel co-pilot that answers queries intelligently without an external API key.
 */
function generateContextualTravelResponse(userMessage, conversationHistory = []) {
  const query = (userMessage || "").trim().toLowerCase();

  // 1. Destination-specific recommendations (e.g. "What should I visit in Goa?")
  for (const [key, data] of Object.entries(destinationDatabase)) {
    if (query.includes(key) || query.includes(data.name.toLowerCase())) {
      if (query.includes("time") || query.includes("season") || query.includes("when")) {
        return `📅 **Best Time to Visit ${data.name}:**\nThe ideal season is **${data.bestTimeToVisit}**. During this period, the weather is pleasant and comfortable for sightseeing and outdoor activities.\n\n✨ **Quick Highlights:** ${data.tagline}`;
      }

      if (query.includes("travel") || query.includes("transport") || query.includes("commute") || query.includes("reach") || query.includes("how to")) {
        return `🚗 **Transportation in ${data.name}:**\n\n• **Airport / Station:** ${data.transport.airportTransfer}\n• **Local Commute:** ${data.transport.localTravel}\n• **Short Distances:** ${data.transport.shortDistances}\n\n💡 *Tip: TripPilote can build a full step-by-step route for your travel dates in our Trip Planner!*`;
      }

      if (query.includes("stay") || query.includes("hotel") || query.includes("resort") || query.includes("where to stay")) {
        const stays = data.stays.map(s => `• **${s.type}** (${s.priceRange}) in *${s.area}*: ${s.description}`).join("\n");
        return `🏨 **Stay Recommendations for ${data.name}:**\n\n${stays}\n\n*Note: Rates are seasonal estimates to guide your budget.*`;
      }

      if (query.includes("budget") || query.includes("cost") || query.includes("price") || query.includes("how much")) {
        return `💰 **Budget Estimation for ${data.name}:**\n• Average baseline cost is approx **${data.currencySymbol}${data.baseDailyCostPerPerson.toLocaleString()} per person/day** for a comfortable travel style.\n• Budget/Backpacking styles can comfortably do **${data.currencySymbol}${Math.round(data.baseDailyCostPerPerson * 0.65).toLocaleString()}/day**.\n• Luxury resort experiences range upwards of **${data.currencySymbol}${Math.round(data.baseDailyCostPerPerson * 2.2).toLocaleString()}/day**.\n\nWould you like me to generate a complete custom budget breakdown? You can use our **Plan Trip** tool above!`;
      }

      // Default attraction/itinerary overview for this destination
      const topDays = data.days.slice(0, 3).map(d => `• **${d.title}**: ${d.morning}`).join("\n");
      return `🌟 **Top Experiences in ${data.name} (${data.tagline}):**\n\n${topDays}\n\n• **Best Time:** ${data.bestTimeToVisit}\n• **Recommended Stays:** ${data.stays[1]?.area || data.name}\n\nWould you like me to generate a customized ${data.idealDurationDays}-day itinerary for ${data.name}? Scroll up to our **AI Trip Planner** or tell me your budget!`;
    }
  }

  // 2. Trip generation request through chat (e.g. "Plan a 5-day trip to Manali" or "Plan a 3 day trip to Paris")
  const planMatch = query.match(/plan\s+(?:a\s+)?(\d+)\s*(?:-| )?day\s+trip\s+to\s+([a-zA-Z\s]+)/i) ||
                     query.match(/(\d+)\s*days?\s+(?:in|for|to)\s+([a-zA-Z\s]+)/i);

  if (planMatch) {
    const days = parseInt(planMatch[1], 10);
    const dest = planMatch[2].trim();
    const generated = generateItinerary({ destination: dest, days: Math.min(days, 10), budget: 20000 });

    if (generated && generated.trip) {
      const t = generated.trip;
      const preview = t.itinerary.slice(0, 3).map(d => `**${d.title}**\n- Morning: ${d.morning}\n- Afternoon: ${d.afternoon}\n- Evening: ${d.evening}`).join("\n\n");
      return `✈️ **TripPilote Itinerary Preview for ${t.destination} (${t.days} Days):**\n\n${preview}\n\n${t.days > 3 ? `*...and ${t.days - 3} more tailored days!*\n\n` : ""}💡 **Estimated Budget:** ${t.currencySymbol}${t.budgetBreakdown.estimatedTotal.toLocaleString()} for ${t.travelers} traveler(s).\n\n👉 *To view the complete interactive breakdown, stay suggestions, and exportable PDF, head to the AI Trip Planner above!*`;
    }
  }

  // 3. Packing advice
  if (query.includes("pack") || query.includes("what to bring") || query.includes("clothes") || query.includes("luggage")) {
    return `🎒 **TripPilote Smart Packing Guide:**\n\n• **Beach Destinations:** ${travelKnowledge.packingEssentials.beach}\n• **Mountain & Snow Escapes:** ${travelKnowledge.packingEssentials.mountains}\n• **City & Heritage Trails:** ${travelKnowledge.packingEssentials.city}\n\n💡 *Pro-tip: Always leave 15-20% space in your bag for local souvenirs and artisanal crafts!*`;
  }

  // 4. Budget saving tips
  if (query.includes("save money") || query.includes("cheap") || query.includes("low budget") || query.includes("affordable")) {
    return `💡 **TripPilote Co-Pilot Tips to Save on Travel:**\n\n1. **Book Flights & Trains Early:** Mid-week departures (Tuesday/Wednesday) are typically 15–25% cheaper.\n2. **Eat Where Locals Eat:** Street food hubs and family-run diners offer the freshest authentic food at a fraction of tourist resort prices.\n3. **Use Public Transit Passes:** Daily metro/bus cards save significant money compared to private cabs.\n4. **Travel Shoulder Season:** Visiting just before or after peak season guarantees great weather with lower hotel tariffs.`;
  }

  // 5. Greetings & general conversational
  if (query.match(/^(hi|hello|hey|greetings|hola|namaste)/i)) {
    return `👋 **Hello! I'm TripPilote AI, your personal travel co-pilot.**\n\nI can help you:\n• Plan custom day-by-day travel itineraries\n• Recommend top attractions, food spots & hidden gems\n• Estimate travel budgets & suggest stays\n• Give transport guides & packing tips\n\nWhere would you like to travel next? (e.g. *Goa, Manali, Paris, Bali, Dubai, Mumbai*)`;
  }

  // Fallback helpful assistant response
  return `🤖 **TripPilote AI Travel Co-Pilot:**\n\nI'd love to help you with that! Here are a few things you can ask me:\n• *"What should I visit in Goa?"*\n• *"Plan a 4-day trip to Manali on a ₹15,000 budget"*\n• *"What is the best time to visit Jaipur?"*\n• *"How can I travel around Mumbai efficiently?"*\n• *"Smart packing checklist for beach vacations"*\n\nTell me your destination or question, and I'll tailor the best recommendations for your journey!`;
}

/**
 * Dispatches chat request to either real AI provider (if configured) or fallback engine.
 */
async function processChat({ message, history = [] }) {
  const apiKey = process.env.AI_API_KEY;
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();

  // If live AI provider is configured and available
  if (apiKey && apiKey.trim().length > 5 && !apiKey.includes("your_api_key_here")) {
    try {
      if (provider === "gemini") {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `You are TripPilote AI, an elite, friendly, knowledgeable travel co-pilot. Answer the user's travel question concisely with markdown formatting (bullet points, bold text, emojis). Help them plan trips, discover attractions, optimize budgets, and understand local customs.\n\nUser Question: ${message}`
                  }
                ]
              }
            ]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return {
              success: true,
              source: "gemini-live",
              reply: replyText
            };
          }
        }
      }
    } catch (err) {
      console.warn("Live AI provider request failed; falling back to TripPilote internal travel engine:", err.message);
    }
  }

  // High-fidelity internal travel engine fallback
  const reply = generateContextualTravelResponse(message, history);
  return {
    success: true,
    source: "trippilote-engine",
    reply: reply
  };
}

module.exports = {
  processChat,
  generateContextualTravelResponse
};
