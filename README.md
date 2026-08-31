# ✈️ TripPilote — AI Travel Planner

> **"Your AI Co-Pilot for Every Journey."**

TripPilote is a commercial-grade, AI-powered travel planning web application that takes user preferences (destination, duration, budget, travelers, style, interests, and transportation) and generates fully customized, day-by-day itineraries, smart budget breakdowns, accommodation recommendations, transit guides, and an interactive 24/7 AI travel assistant.

---

## 🌟 Key Features

1. **AI-Powered Itinerary Generator**
   - Dynamic day-by-day scheduling matching the exact duration requested (1–14+ days).
   - Time-slotted activities: **Morning** (9:00 AM – 1:00 PM), **Afternoon** (1:00 PM – 5:30 PM), and **Evening** (5:30 PM onwards).
   - Rich destination-aware itineraries for popular hubs (Goa, Mumbai, Delhi, Jaipur, Manali, Pune, Bengaluru, Hyderabad, Dubai, Paris, London, Bali) and a smart generative engine for any custom destination worldwide.

2. **Budget Optimization & Breakdown**
   - Granular cost forecasting across:
     - 🏨 Accommodation (38%)
     - 🍜 Food & Dining (25%)
     - 🚗 Local Transportation (18%)
     - 🎟️ Sightseeing & Activities (12%)
     - 🛡️ Miscellaneous & Buffer (7%)
   - Real-time comparison with the user's budget with over-budget alerts and actionable cost-saving advice.
   - Individual estimated cost per day.

3. **Curated Stay & Hotel Suggestions**
   - Categorized tiers: **Budget Stay**, **Comfort Stay**, and **Luxury Stay**.
   - Price bands per night, recommended neighborhoods, and transparent rationale.

4. **Local Transportation Guides**
   - Airport/rail transfers, local transit recommendations (metro, cabs, auto-rickshaws, bike rentals), and walking routes tailored to the destination.

5. **TripPilote AI Travel Co-Pilot (Chatbot)**
   - Interactive chat assistant for queries regarding best travel seasons, packing checklists, flight routes, and local customs.
   - Built with a dual-engine architecture: an intelligent travel domain engine out of the box, and seamless plug-and-play support for Google Gemini / OpenAI LLMs via `.env`.

6. **Destination Explorer with 1-Click Autofill**
   - Categorized showcase (Beaches, Mountains, Metros, Heritage, International).
   - 1-Click "Plan Trip" button instantly fills form parameters and scrolls to the generator.

7. **Export & Sharing Tools**
   - Clean printable/PDF-friendly stylesheet (`@media print`).
   - One-click "Copy Itinerary" to clipboard.
   - Native Web Share API integration.

8. **Design & Accessibility**
   - Premium travel-tech dark navy theme with electric cyan and sunset orange accents.
   - 100% responsive on desktops, tablets, and smartphones.
   - Semantic HTML5, ARIA labels, and keyboard accessibility.

---

## 📁 Project Structure

```
TripPilote/
├── frontend/
│   ├── index.html           # Semantic HTML5 single-page application structure
│   ├── style.css            # Responsive travel-tech design system & dark theme
│   └── script.js            # Modular client logic, form validation, loader & chat
│
├── backend/
│   ├── server.js            # Express server entry point & static file hosting
│   ├── package.json         # Dependencies (express, cors, dotenv)
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   ├── routes/
│   │   ├── tripRoutes.js    # POST /api/plan-trip
│   │   ├── chatRoutes.js    # POST /api/chat
│   │   └── contactRoutes.js # POST /api/contact
│   └── services/
│       ├── itineraryService.js # Core generation logic & budget calculation
│       ├── aiService.js        # AI co-pilot chat service & LLM hook
│       └── destinationData.js  # Curated destination database
│
├── README.md                # Comprehensive documentation
└── .gitignore               # Ignored files (node_modules, .env, etc.)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher

### 1. Installation

Clone or navigate to the project directory:

```bash
cd TripPilote/backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in `TripPilote/backend/` (or copy from `.env.example`):

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=*

# Optional: Real AI Provider Integration (Google Gemini API)
AI_API_KEY=
AI_PROVIDER=gemini
```

> **Note:** If `AI_API_KEY` is left blank, TripPilote automatically uses its built-in heuristic travel knowledge engine.

### 3. Launch the Application

Start the Express backend (which also serves the frontend):

```bash
npm start
```

Or for auto-reload during development:

```bash
npm run dev
```

Open your browser and visit:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🔌 REST API Documentation

### 1. Plan Trip
- **Endpoint:** `POST /api/plan-trip`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "destination": "Goa",
  "days": 3,
  "budget": 15000,
  "travelers": 2,
  "travelStyle": "Adventure",
  "interests": ["Beaches", "Food"],
  "transport": "Mixed"
}
```
- **Response:**
```json
{
  "success": true,
  "trip": {
    "destination": "Goa",
    "days": 3,
    "budget": 15000,
    "travelers": 2,
    "travelStyle": "Adventure",
    "currencySymbol": "₹",
    "itinerary": [
      {
        "dayNumber": 1,
        "title": "Day 1 — North Goa Beach Vibes & Sunset Shacks",
        "morning": "Arrive in Goa, check in to hotel, and head to Candolim Beach...",
        "afternoon": "Explore historic Aguada Fort & Lighthouse...",
        "evening": "Catch a spectacular sunset at Vagator Beach...",
        "stayArea": "Candolim or Vagator",
        "estimatedDayCost": 4100
      }
    ],
    "budgetBreakdown": {
      "estimatedTotal": 12800,
      "userBudget": 15000,
      "remainingBudget": 2200,
      "isOverBudget": false,
      "categories": [
        { "name": "Accommodation", "amount": 4864, "percentage": 38 },
        { "name": "Food & Dining", "amount": 3200, "percentage": 25 },
        { "name": "Transportation", "amount": 2304, "percentage": 18 },
        { "name": "Activities & Sightseeing", "amount": 1536, "percentage": 12 },
        { "name": "Miscellaneous & Buffer", "amount": 896, "percentage": 7 }
      ]
    },
    "stayRecommendations": [...],
    "transportRecommendations": {...}
  }
}
```

### 2. AI Travel Assistant Chat
- **Endpoint:** `POST /api/chat`
- **Request Body:**
```json
{
  "message": "What is the best time to visit Jaipur?",
  "history": []
}
```
- **Response:**
```json
{
  "success": true,
  "source": "trippilote-engine",
  "reply": "📅 **Best Time to Visit Jaipur:**\nThe ideal season is **October to March**..."
}
```

### 3. Contact Form
- **Endpoint:** `POST /api/contact`
- **Request Body:**
```json
{
  "name": "Alex Sharma",
  "email": "alex@example.com",
  "message": "Interested in custom group travel planning."
}
```

### 4. Health Check
- **Endpoint:** `GET /api/health`

---

## 🔒 Security Best Practices
- **No Secret Leaks:** Frontend JavaScript never communicates directly with third-party LLMs using private API keys. All inference is securely proxied through the Express backend.
- **Input Sanitization:** Client and server-side validation with HTML entity escaping to protect against XSS injections.
- **CORS Configured:** Secure cross-origin resource sharing policy.

---

## 📄 License
MIT License © 2026 TripPilote. All rights reserved.
"# FinPilot-AI" 
