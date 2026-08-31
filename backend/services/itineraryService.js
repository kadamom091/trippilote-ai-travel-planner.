const { destinationDatabase } = require("./destinationData");

/**
 * Normalizes destination input and finds the best match in the curated database.
 */
function findDestination(destInput) {
  if (!destInput || typeof destInput !== "string") return null;
  const clean = destInput.trim().toLowerCase();

  // Direct key lookup
  if (destinationDatabase[clean]) {
    return destinationDatabase[clean];
  }

  // Common aliases
  const aliases = {
    "bangalore": "bengaluru",
    "bombay": "mumbai",
    "calcutta": "kolkata",
    "madras": "chennai",
    "north goa": "goa",
    "south goa": "goa",
    "old goa": "goa",
    "panaji": "goa",
    "panjim": "goa",
    "kullu manali": "manali",
    "new delhi": "delhi",
    "ncr": "delhi",
    "pink city": "jaipur",
    "denpasar": "bali",
    "ubud": "bali",
    "seminyak": "bali",
    "canggu": "bali",
    "dubai city": "dubai",
    "uae": "dubai",
    "greater london": "london"
  };

  if (aliases[clean] && destinationDatabase[aliases[clean]]) {
    return destinationDatabase[aliases[clean]];
  }

  // Partial match search
  for (const [key, data] of Object.entries(destinationDatabase)) {
    if (clean.includes(key) || data.name.toLowerCase().includes(clean)) {
      return data;
    }
  }

  return null;
}

/**
 * Calculates travel style multiplier
 */
function getStyleMultiplier(travelStyle) {
  switch ((travelStyle || "").toLowerCase()) {
    case "backpacking":
      return 0.6;
    case "budget":
      return 0.75;
    case "adventure":
      return 1.1;
    case "family":
      return 1.15;
    case "romantic":
      return 1.3;
    case "solo":
      return 0.9;
    case "luxury":
      return 2.2;
    case "comfort":
    default:
      return 1.0;
  }
}

/**
 * Generates custom generic destination itinerary for unlisted locations.
 */
function generateGenericItinerary(destination, daysCount, travelStyle, interests, transportPref) {
  const capDest = destination.charAt(0).toUpperCase() + destination.slice(1);
  const userInterests = Array.isArray(interests) && interests.length > 0 ? interests : ["Sightseeing", "Local Food", "Culture"];
  const transport = transportPref || "Mixed (Cab & Public Transit)";

  const dayTemplates = [
    {
      title: `Arrival, Orientation & Historic Center of ${capDest}`,
      morning: `Arrive in ${capDest}, check into your accommodation, and orient yourself with a relaxed walking tour of the main central plaza.`,
      afternoon: `Visit the primary historical landmarks and iconic viewpoints. Enjoy authentic local cuisine at a recommended traditional cafe.`,
      evening: `Sunset stroll along the lively central boulevard or waterfront, sampling popular street treats and settling in with a warm welcome dinner.`,
      stayArea: `Central ${capDest} / Downtown Area`
    },
    {
      title: `Iconic Highlights, Art & Local Culture in ${capDest}`,
      morning: `Explore the top-rated architectural monuments, museums, or cultural galleries of ${capDest} during quieter morning hours.`,
      afternoon: `Immerse in a local food discovery walk, tasting regional specialties and visiting a bustling market for artisanal crafts.`,
      evening: `Experience an authentic cultural show, scenic river/rooftop viewpoint, and dinner at a cozy local restaurant.`,
      stayArea: `Arts & Heritage District, ${capDest}`
    },
    {
      title: `Scenic Nature, Hidden Neighborhoods & Panoramic Views`,
      morning: `Head to scenic botanical gardens, natural lakes, mountain overlooks, or coastal areas surrounding ${capDest}.`,
      afternoon: `Engage in outdoor activities (${userInterests.join(", ")}) followed by a picturesque outdoor lunch.`,
      evening: `Unwind at a scenic sunset terrace or rooftop lounge admiring panoramic city lights over ${capDest}.`,
      stayArea: `Scenic Promenade / Vibrant Quarter`
    },
    {
      title: `Day Trip & Surrounding Countryside Adventure`,
      morning: `Take a short scenic excursion to nearby historic towns, national parks, or scenic valleys in the ${capDest} region.`,
      afternoon: `Participate in guided adventure walks, local farm visits, or craft workshops with local artisans.`,
      evening: `Return to ${capDest} for a relaxing evening and a relaxed dining experience tasting regional culinary classics.`,
      stayArea: `Central ${capDest}`
    },
    {
      title: `Immersion, Culinary Trail & Hidden Gems`,
      morning: `Discover off-the-beaten-path alleyways, vintage antique markets, and specialty local coffee roasteries.`,
      afternoon: `Take an interactive local cooking class or guided heritage food tasting trail across historic quarters.`,
      evening: `Enjoy live acoustic music, vibrant night bazaars, or twilight harbor walks.`,
      stayArea: `Culinary & Cultural Quarter`
    },
    {
      title: `Outdoor Exploration, Wellness & Scenic Photography`,
      morning: `Sunrise photography session at iconic vantage points, followed by a leisurely artisanal breakfast.`,
      afternoon: `Relaxing wellness spa session, thermal spring, or scenic river cruise enjoying gentle breezes.`,
      evening: `Fine dining dinner celebrating the journey with signature local dishes and wine/mocktail pairings.`,
      stayArea: `Boutique Stay Quarter`
    },
    {
      title: `Souvenir Hunting & Farewell Celebration in ${capDest}`,
      morning: `Final shopping for authentic souvenirs, regional spices, and local artisan gifts at the main bazaar.`,
      afternoon: `Leisurely farewell lunch at a celebrated rooftop restaurant overlooking ${capDest}'s skyline.`,
      evening: `Pack memories, check out, and transfer smoothly to the airport/station for your onward journey.`,
      stayArea: `Departure / Airport Vicinity`
    }
  ];

  const generatedDays = [];
  for (let i = 0; i < daysCount; i++) {
    const templateIndex = i % dayTemplates.length;
    const base = dayTemplates[templateIndex];
    const dayNumber = i + 1;

    generatedDays.push({
      dayNumber: dayNumber,
      title: dayNumber <= dayTemplates.length ? base.title : `Day ${dayNumber} — Exploration & Specialized Interests in ${capDest}`,
      morning: base.morning,
      afternoon: base.afternoon,
      evening: base.evening,
      stayArea: base.stayArea,
      costMultiplier: 0.95 + (i % 3) * 0.1
    });
  }

  return {
    name: capDest,
    stateOrCountry: "Custom Destination",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 3500,
    tagline: `Unforgettable journey through ${capDest} tailored for ${travelStyle || "Comfort"} travelers`,
    bestTimeToVisit: "Spring & Autumn (Peak Travel Season)",
    idealDurationDays: Math.min(daysCount, 5),
    tags: userInterests,
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,200 – ₹2,200 / night",
        area: `Central ${capDest} Backstreets & Hostel Hubs`,
        description: `Highly-rated traveler hostels, cozy guesthouses, and homestays with essential amenities.`
      },
      {
        type: "Comfort Stay",
        priceRange: "₹3,500 – ₹6,500 / night",
        area: `Downtown & Tourist Quarter, ${capDest}`,
        description: `3-4 star contemporary hotels with complimentary breakfast, WiFi, and central transit access.`
      },
      {
        type: "Luxury Stay",
        priceRange: "₹10,000 – ₹28,000+ / night",
        area: `Prime View Estates & Waterfronts in ${capDest}`,
        description: `5-star boutique resorts and luxury heritage hotels with spa, concierge, and fine dining.`
      }
    ],
    transport: {
      airportTransfer: `Pre-booked airport shuttle, official airport taxi queue, or express train directly into ${capDest} center.`,
      localTravel: `Public transit (metro/bus), ride-hailing apps (Uber/local apps), or day rental vehicle based on your preference (${transport}).`,
      shortDistances: `Walkable downtown districts, licensed city cabs, and local point-to-point transit.`
    },
    days: generatedDays
  };
}

/**
 * Main function to generate full customized itinerary.
 */
function generateItinerary({
  destination,
  days,
  budget,
  travelers = 1,
  travelStyle = "Comfort",
  interests = [],
  transport = "Mixed"
}) {
  const daysCount = parseInt(days, 10) || 3;
  const userBudget = parseFloat(budget) || 15000;
  const travelersCount = parseInt(travelers, 10) || 1;

  // 1. Resolve destination
  let destData = findDestination(destination);
  let isCustom = false;

  if (!destData) {
    isCustom = true;
    destData = generateGenericItinerary(destination, daysCount, travelStyle, interests, transport);
  }

  // 2. Build Day-by-Day Itinerary matching requested days
  const styleMultiplier = getStyleMultiplier(travelStyle);
  const baseCost = destData.baseDailyCostPerPerson || 3200;
  const effectiveDailyPerPerson = baseCost * styleMultiplier;

  const itineraryDays = [];
  const totalCuratedDays = destData.days.length;

  for (let i = 0; i < daysCount; i++) {
    let daySource;
    if (i < totalCuratedDays) {
      daySource = destData.days[i];
    } else {
      // Extended dynamic day for longer trips
      const extendedDayIndex = (i % totalCuratedDays) + 1;
      daySource = {
        title: `Deep Dive & Local Immersion (Day ${i + 1})`,
        morning: `Morning leisure walk through scenic local neighborhoods in ${destData.name}, exploring quaint local artisan shops.`,
        afternoon: `Specialized excursion focused on ${interests.length > 0 ? interests.join(" & ") : "cultural landmarks"} with regional lunch.`,
        evening: `Sunset relaxation, live music, and evening dining at a highly recommended local culinary gem.`,
        stayArea: destData.stays[1]?.area || `Central ${destData.name}`,
        costMultiplier: 1.0
      };
    }

    const dayCostMultiplier = daySource.costMultiplier || 1.0;
    // lodging is shared if multiple travelers, while food and activities scale linearly
    const lodgingShare = travelersCount > 1 ? 0.6 : 1.0;
    const estimatedDayCostTotal = Math.round(
      effectiveDailyPerPerson * (0.45 * lodgingShare + 0.55) * travelersCount * dayCostMultiplier
    );

    itineraryDays.push({
      dayNumber: i + 1,
      title: `Day ${i + 1} — ${daySource.title.replace(/^Day \d+ — /i, "")}`,
      morning: daySource.morning,
      afternoon: daySource.afternoon,
      evening: daySource.evening,
      stayArea: daySource.stayArea || destData.stays[1]?.area || `Central ${destData.name}`,
      estimatedDayCost: estimatedDayCostTotal,
      currencySymbol: destData.currencySymbol || "₹"
    });
  }

  // 3. Compute Budget Breakdown
  const totalEstimatedCost = itineraryDays.reduce((acc, curr) => acc + curr.estimatedDayCost, 0);

  const accommodationCost = Math.round(totalEstimatedCost * 0.38);
  const foodCost = Math.round(totalEstimatedCost * 0.25);
  const transportCost = Math.round(totalEstimatedCost * 0.18);
  const activitiesCost = Math.round(totalEstimatedCost * 0.12);
  const miscCost = Math.max(0, totalEstimatedCost - (accommodationCost + foodCost + transportCost + activitiesCost));

  const remainingBudget = userBudget - totalEstimatedCost;
  const isOverBudget = remainingBudget < 0;
  const budgetUtilizationPercent = Math.min(200, Math.round((totalEstimatedCost / userBudget) * 100));

  let budgetAdvice = "";
  if (isOverBudget) {
    const excess = Math.abs(remainingBudget).toLocaleString();
    budgetAdvice = `Your estimated trip cost exceeds your budget by approximately ${destData.currencySymbol}${excess}. Consider switching to a Budget travel style, choosing shared dorms or guesthouses, or reducing high-cost paid activities.`;
  } else if (remainingBudget > userBudget * 0.35) {
    budgetAdvice = `Great news! Your estimated cost is well within your budget with a comfortable buffer of ${destData.currencySymbol}${remainingBudget.toLocaleString()} for special dining, premium experiences, or shopping.`;
  } else {
    budgetAdvice = `Your budget matches your trip preferences nicely. You have a balanced allocation across stays, meals, and activities.`;
  }

  return {
    success: true,
    trip: {
      destination: destData.name,
      stateOrCountry: destData.stateOrCountry,
      days: daysCount,
      budget: userBudget,
      travelers: travelersCount,
      travelStyle: travelStyle,
      interests: Array.isArray(interests) ? interests : [],
      transportPreference: transport,
      currency: destData.currency || "INR",
      currencySymbol: destData.currencySymbol || "₹",
      tagline: destData.tagline,
      bestTimeToVisit: destData.bestTimeToVisit,
      tags: destData.tags || [],
      itinerary: itineraryDays,
      budgetBreakdown: {
        estimatedTotal: totalEstimatedCost,
        userBudget: userBudget,
        remainingBudget: remainingBudget,
        isOverBudget: isOverBudget,
        budgetUtilizationPercent: budgetUtilizationPercent,
        budgetAdvice: budgetAdvice,
        currencySymbol: destData.currencySymbol || "₹",
        categories: [
          { name: "Accommodation", amount: accommodationCost, percentage: 38, icon: "hotel" },
          { name: "Food & Dining", amount: foodCost, percentage: 25, icon: "utensils" },
          { name: "Transportation", amount: transportCost, percentage: 18, icon: "car" },
          { name: "Activities & Sightseeing", amount: activitiesCost, percentage: 12, icon: "ticket" },
          { name: "Miscellaneous & Buffer", amount: miscCost, percentage: 7, icon: "shield" }
        ]
      },
      stayRecommendations: destData.stays || [],
      transportRecommendations: destData.transport || {
        airportTransfer: "Taxi / Shuttle / Express Bus",
        localTravel: "Cab / Metro / Public Transport",
        shortDistances: "Walking / Auto"
      },
      meta: {
        generatedAt: new Date().toISOString(),
        isCustomDestination: isCustom,
        version: "2.0.0"
      }
    }
  };
}

module.exports = {
  generateItinerary,
  findDestination
};
