/**
 * TripPilote Curated Destination Database
 * Rich, authentic travel knowledge for popular domestic and international destinations.
 */

const destinationDatabase = {
  goa: {
    name: "Goa",
    stateOrCountry: "India",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 3200,
    tagline: "Sun, Sand, Heritage & Vibrant Coastal Vibes",
    bestTimeToVisit: "November to March",
    idealDurationDays: 4,
    tags: ["Beaches", "Nightlife", "Food", "Water Sports", "Portuguese Heritage"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,200 – ₹2,200 / night",
        area: "Anjuna / Arambol / Calangute Backlanes",
        description: "Backpacker hostels (Zostel, Hosteller) and cozy Portuguese-style homestays near beach shacks."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹3,500 – ₹6,000 / night",
        area: "Candolim / Baga / Panaji City",
        description: "Boutique 3-star resorts with pools, complimentary breakfast, and quick beach access."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹9,000 – ₹22,000+ / night",
        area: "Cavelossim / Vagator / Morjim",
        description: "5-star beachside luxury villas, Taj Exotica, W Goa, and private infinity pool resorts."
      }
    ],
    transport: {
      airportTransfer: "Prepaid airport taxi from Dabolim (GOI) or Manohar Mopa (GOX) (₹1,000–₹1,800) or Goa EV Airport KSRTC Electric Bus.",
      localTravel: "Renting a scooter (₹350–₹500/day) or self-drive Thar/hatchback (₹1,500–₹2,500/day) is the most flexible way to explore North and South Goa.",
      shortDistances: "Pilot motorcycle taxis (local two-wheeler cabs), GoaMiles App taxi, or peaceful coastal walking."
    },
    days: [
      {
        title: "North Goa Beach Vibes & Sunset Shacks",
        morning: "Arrive in Goa, check in to hotel, and head to Candolim Beach for a refreshing coconut cooler and beachside stroll.",
        afternoon: "Explore historic Aguada Fort & Lighthouse overlooking the Arabian Sea, followed by authentic Goan Fish Curry lunch at Fisherman's Wharf.",
        evening: "Catch a spectacular sunset at Vagator Beach and enjoy live acoustic music and dinner at Curlies or Thalassa in Ozran.",
        stayArea: "Candolim or Vagator",
        costMultiplier: 1.0
      },
      {
        title: "Old Goa Heritage & Panaji Latin Quarter",
        morning: "Visit the UNESCO World Heritage Basilica of Bom Jesus and Sé Cathedral in Old Goa to admire 16th-century baroque architecture.",
        afternoon: "Walk through the colorful Portuguese alleyways of Fontainhas in Panaji. Stop by a heritage cafe for Bebinca and Poee sandwiches.",
        evening: "Take a scenic sunset cruise along the Mandovi River with traditional Goan folk dance performances, followed by dinner at Ritz Classic.",
        stayArea: "Panaji / Fontainhas",
        costMultiplier: 1.05
      },
      {
        title: "Water Sports, Chapora Fort & Night Markets",
        morning: "Indulge in parasailing, jet skiing, and banana boat rides at Calangute or Anjuna Beach.",
        afternoon: "Climb up to the iconic Chapora Fort (famous 'Dil Chahta Hai' spot) for panoramic estuary views, followed by lunch at Artjuna Cafe.",
        evening: "Explore the bustling Anjuna Flea Market / Saturday Night Market (seasonal) and enjoy sea-breeze nightlife at Tito's Lane in Baga.",
        stayArea: "Anjuna / Baga",
        costMultiplier: 1.15
      },
      {
        title: "Pristine South Goa & Spice Plantation",
        morning: "Drive down to South Goa and take a guided fragrant spice tour with traditional banana-leaf buffet lunch at Sahakari Spice Farm.",
        afternoon: "Relax on the tranquil white sands of Palolem Beach and take a small boat ride to Butterfly Beach.",
        evening: "Experience a quiet candlelit beach dinner at Palolem shore listening to gentle waves and stargazing.",
        stayArea: "Palolem / Agonda",
        costMultiplier: 1.0
      },
      {
        title: "Dudhsagar Waterfalls & Jungle Excursion",
        morning: "Early morning jeep safari through the lush Bhagwan Mahavir Wildlife Sanctuary to witness the majestic 4-tiered Dudhsagar Waterfalls.",
        afternoon: "Swim in the natural freshwater pools beneath the falls (life jackets provided) and enjoy a packed picnic lunch.",
        evening: "Return to your resort for a rejuvenating Ayurvedic spa session and authentic seafood feast.",
        stayArea: "South Goa or Central Resort",
        costMultiplier: 1.2
      },
      {
        title: "Hidden Islands & Kayaking in Backwaters",
        morning: "Take a ferry to the peaceful Divar Island or Chorao Island; explore mangrove bird sanctuaries by guided kayak.",
        afternoon: "Relish home-cooked Goan-Portuguese lunch at a heritage villa estate in Divar.",
        evening: "Sunset walk at secluded Morjim or Ashwem Beach, watching olive ridley turtle conservation zones.",
        stayArea: "Morjim / Ashwem",
        costMultiplier: 0.95
      },
      {
        title: "Souvenir Shopping & Farewell Coastal Brunch",
        morning: "Leisurely breakfast with freshly baked Goan bread (Pao), followed by cashew nut and local Feni shopping in Mapusa market.",
        afternoon: "Relax at a rooftop ocean club in Candolim enjoying chilled mocktails and Mediterranean platters.",
        evening: "Pack your memories, check out, and head to the airport with unforgettable sun-kissed memories.",
        stayArea: "Departure / Airport",
        costMultiplier: 0.9
      }
    ]
  },

  mumbai: {
    name: "Mumbai",
    stateOrCountry: "India",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 3800,
    tagline: "The City of Dreams — Heritage, Sea Breeze & Street Delights",
    bestTimeToVisit: "October to March",
    idealDurationDays: 3,
    tags: ["Culture", "History", "Street Food", "Architecture", "Nightlife"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,500 – ₹2,800 / night",
        area: "Colaba / Fort / Dadar",
        description: "Clean boutique hostels, YMCA guest houses, and heritage bed & breakfasts close to suburban train stations."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹4,500 – ₹8,000 / night",
        area: "Bandra West / Juhu / Marine Drive",
        description: "Modern business and boutique hotels with contemporary amenities and quick access to top dining."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹12,000 – ₹30,000+ / night",
        area: "Colaba (The Taj Mahal Palace) / Nariman Point / Bandra Kurla Complex (BKC)",
        description: "Iconic ocean-facing heritage landmarks and ultra-luxury 5-star properties (Oberoi, St. Regis)."
      }
    ],
    transport: {
      airportTransfer: "Chhatrapati Shivaji Maharaj International Airport (BOM) has dedicated Uber/Ola pickup points and prepaid black-and-yellow / cool cabs (₹400–₹800).",
      localTravel: "Mumbai Metro Line 2A/7/3, Western & Central local trains for quick north-south transit, and metered auto-rickshaws (suburbs) or black-and-yellow taxis (South Mumbai).",
      shortDistances: "Iconic Kaali-Peeli taxis in South Bombay, auto-rickshaws in suburbs, or walking along sea promenades."
    },
    days: [
      {
        title: "Colaba Heritage & Gateway of India",
        morning: "Start at the Gateway of India and marvel at The Taj Mahal Palace Hotel. Enjoy breakfast at legendary Cafe Mondegar or Leopold Cafe.",
        afternoon: "Stroll past Gothic Victorian architectural wonders in Fort & Kala Ghoda art district, followed by coastal thali at Trishna or Mahesh Lunch Home.",
        evening: "Take an evening walk along Marine Drive (Queen's Necklace) to watch the golden sunset, followed by street snacks at Girgaon Chowpatty.",
        stayArea: "Colaba or Marine Drive",
        costMultiplier: 1.0
      },
      {
        title: "Elephanta Caves & Bandra's Chic Lanes",
        morning: "Board a ferry from Gateway of India to UNESCO Elephanta Caves to explore 5th-century rock-cut Shiva sculptures.",
        afternoon: "Return to mainland and head to Bandra West. Walk down Pali Hill and Chapel Road to admire vibrant street art, followed by lunch at Subko Coffee or Bastian.",
        evening: "Sunset walk at Bandra Bandstand near Mannat and Mount Mary Church, ending with dinner at Carter Road seafront promenade.",
        stayArea: "Bandra West",
        costMultiplier: 1.1
      },
      {
        title: "Bollywood Vibe, Juhu Beach & High-End Dining",
        morning: "Visit Sanjay Gandhi National Park & Kanheri Caves for lush green trails and Buddhist rock caves inside city limits.",
        afternoon: "Indulge in Mumbai street food tour: Pav Bhaji at Cannon / Amar Juice Centre, Vada Pav at Ashok Vada Pav, and Sev Puri.",
        evening: "Relax at Juhu Beach watching the sunset while tasting warm roasted corn, followed by signature cocktails in Lower Parel's mill district.",
        stayArea: "Juhu / Lower Parel",
        costMultiplier: 1.05
      },
      {
        title: "Textile Mills, Markets & Modern Art",
        morning: "Explore Crawford Market and Mangaldas Cloth Market for vibrant spices, textiles, and antique souvenirs.",
        afternoon: "Visit the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS Museum) and National Gallery of Modern Art (NGMA).",
        evening: "Experience panoramic city skyline dining at Aer Rooftop in Four Seasons or High Street Phoenix dining avenue.",
        stayArea: "Worli / Lower Parel",
        costMultiplier: 1.2
      },
      {
        title: "Coastal Sea Link & Sunset Sailing",
        morning: "Drive across the architectural marvel Bandra-Worli Sea Link and visit the serene Haji Ali Dargah situated on an islet.",
        afternoon: "Savor Mughlai specialties at Copper Chimney or authentic Parsi cuisine at Britannia & Co. (Berry Pulao).",
        evening: "Private sunset sailboat hire from Gateway of India harbor, taking in Mumbai's sparkling illuminated harbor skyline.",
        stayArea: "South Mumbai",
        costMultiplier: 1.25
      }
    ]
  },

  delhi: {
    name: "Delhi",
    stateOrCountry: "India",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 3400,
    tagline: "Heart of India — Mughal Majesty, Vibrant Bazaars & Grand Monuments",
    bestTimeToVisit: "October to March",
    idealDurationDays: 3,
    tags: ["History", "Architecture", "Street Food", "Shopping", "Culture"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,200 – ₹2,500 / night",
        area: "Paharganj / Karol Bagh / South Extension",
        description: "Backpacker hostels and budget guest houses steps away from metro stations."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹3,800 – ₹7,000 / night",
        area: "Connaught Place / Aerocity / Saket",
        description: "Contemporary 4-star hotels with premier hospitality, in-house dining, and central metro access."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹10,000 – ₹26,000+ / night",
        area: "Chanakyapuri / Janpath (The Imperial) / Golf Links (The Oberoi)",
        description: "Diplomatic enclave luxury hotels with royal suites and Michelin-curated dining."
      }
    ],
    transport: {
      airportTransfer: "Delhi Airport Metro Express Line connects Indira Gandhi International Airport (DEL) to New Delhi Railway Station in under 20 minutes.",
      localTravel: "Delhi Metro network is one of the world's best, safest, and fastest ways to traverse Delhi NCR with smart cards.",
      shortDistances: "E-rickshaws, green CNG auto-rickshaws, and app-based cabs (Uber/Ola/BluSmart)."
    },
    days: [
      {
        title: "Old Delhi Mughal Splendor & Food Trail",
        morning: "Visit the massive Red Fort (Lal Qila) and Jama Masjid, India's largest congregational mosque.",
        afternoon: "Cycle-rickshaw ride through the narrow aromatic lanes of Chandni Chowk. Savor hot Paranthas at Paranthe Wali Gali and Jalebi at Old Famous Jalebi Wala.",
        evening: "Pay respects at Raj Ghat and visit the illuminated India Gate and Kartavya Path for an evening ice cream walk.",
        stayArea: "Connaught Place",
        costMultiplier: 1.0
      },
      {
        title: "Imperial Monuments & Sufi Evenings",
        morning: "Marvel at the red sandstone UNESCO Humayun's Tomb, the architectural predecessor to the Taj Mahal.",
        afternoon: "Explore the towering 73m Qutub Minar complex and the mysterious non-rusting Iron Pillar of Delhi, followed by lunch at Olive Bar & Kitchen in Mehrauli.",
        evening: "Experience soulful live Qawwali music at Hazrat Nizamuddin Dargah and taste delicious kebabs at Karim's or Al Bake.",
        stayArea: "South Delhi",
        costMultiplier: 1.05
      },
      {
        title: "Spiritual Marvels & Dilli Haat Crafts",
        morning: "Visit the lotus-shaped Bahá'í House of Worship (Lotus Temple) and the grand Swaminarayan Akshardham Temple complex.",
        afternoon: "Shop authentic handicrafts from every Indian state at open-air cultural bazaar Dilli Haat INA while tasting regional cuisines.",
        evening: "Stroll around the colonial colonnades of Connaught Place (CP), explore underground Palika Bazaar, and dine at United Coffee House.",
        stayArea: "Connaught Place / Central Delhi",
        costMultiplier: 1.1
      },
      {
        title: "Hauz Khas Village, Lodhi Gardens & Art District",
        morning: "Morning jog or walk through peaceful Lodhi Gardens surrounded by 15th-century Sayyid and Lodi dynastic tombs.",
        afternoon: "Explore India's first open-air public art gallery at Lodhi Art District, followed by lunch in Hauz Khas Village overlooking the royal water tank.",
        evening: "Sunset drinks at a lakeside balcony cafe in HKV, with indie boutique shopping for quirky souvenirs.",
        stayArea: "Hauz Khas / Greater Kailash",
        costMultiplier: 1.1
      }
    ]
  },

  jaipur: {
    name: "Jaipur",
    stateOrCountry: "India",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 3000,
    tagline: "The Pink City — Royal Forts, Palaces & Rajasthani Grandeur",
    bestTimeToVisit: "October to March",
    idealDurationDays: 3,
    tags: ["Royal Heritage", "Forts", "Palaces", "Shopping", "Rajasthani Food"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,000 – ₹2,000 / night",
        area: "MI Road / Bani Park / Sindhi Camp",
        description: "Traditional haveli guesthouses, boutique backpacker dorms with courtyard cafes."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹3,200 – ₹6,000 / night",
        area: "C-Scheme / Mansarovar / Civil Lines",
        description: "Heritage properties converted into comfortable boutique hotels with Rajasthani hospitality."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹11,000 – ₹35,000+ / night",
        area: "Rambagh Palace / Jai Mahal Palace / Kukas",
        description: "Living like royalty in authentic Taj & Oberoi palace estates with peacocks and royal courtyards."
      }
    ],
    transport: {
      airportTransfer: "Jaipur International Airport (JAI) is ~12km from city center; Uber/Ola and pre-paid airport cabs available (₹300–₹500).",
      localTravel: "Jaipur Metro (Mansarovar to Badi Chaupar) or hiring a full-day private air-conditioned cab (₹1,800–₹2,400/day) for fort tours.",
      shortDistances: "Auto-rickshaws, e-rickshaws in the walled Pink City, and battery golf carts near monuments."
    },
    days: [
      {
        title: "Pink City Walled Heritage & Iconic Hawa Mahal",
        morning: "Early morning photoshoot in front of the 953-casement pink sandstone Hawa Mahal (Palace of Winds).",
        afternoon: "Tour City Palace museum to see royal costumes and armory, followed by Jantar Mantar (UNESCO astronomical observatory).",
        evening: "Shop for block-print textiles, blue pottery, and silver jewelry in Johari & Bapu Bazaar, ending with Dal Baati Churma at Laxmi Mishthan Bhandar (LMB).",
        stayArea: "Pink City / MI Road",
        costMultiplier: 1.0
      },
      {
        title: "Amber Fort Majesty & Nahargarh Sunset",
        morning: "Ascend the hill to the majestic Amber Fort (Amer Fort) and admire the exquisite Sheesh Mahal (Mirror Palace).",
        afternoon: "Stop by the water-bound palace Jal Mahal in Man Sagar Lake for photos, followed by lunch at 1135 AD inside Amer.",
        evening: "Watch an unforgettable sunset over Jaipur's glittering city lights from the ramparts of Nahargarh Fort, followed by dinner at Padao.",
        stayArea: "Amer Road or Bani Park",
        costMultiplier: 1.1
      },
      {
        title: "Jaigarh Cannon, Stepwells & Cultural Village",
        morning: "Visit Jaigarh Fort to witness the Jaivana cannon (once the world's largest cannon on wheels) and underground armories.",
        afternoon: "Photograph the hypnotic geometric steps of Panna Meena Ka Kund stepwell and explore Albert Hall Museum.",
        evening: "Immerse in Rajasthani folk dance, puppet shows, camel rides, and traditional royal dining feast at Chokhi Dhani.",
        stayArea: "Tonk Road / Chokhi Dhani",
        costMultiplier: 1.2
      }
    ]
  },

  manali: {
    name: "Manali",
    stateOrCountry: "India",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 2900,
    tagline: "Valley of the Gods — Snow Peaks, Pine Forests & Adventure Trails",
    bestTimeToVisit: "October to June (Snow: Dec-Feb; Greenery: Mar-Jun)",
    idealDurationDays: 4,
    tags: ["Mountains", "Snow", "Adventure", "Nature", "River Rafting"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹900 – ₹1,800 / night",
        area: "Old Manali / Vashisht Village",
        description: "Wooden mountain cottages, river-facing hostel dorms, and bohemian cafes with apple orchard views."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹2,800 – ₹5,500 / night",
        area: "Aleo / Naggar Road / Mall Road vicinity",
        description: "Cozy 3-star mountain resorts with pine-wood interiors, balcony Himalayan vistas, and heating."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹8,500 – ₹20,000+ / night",
        area: "Solang Valley / Log Huts Area (The Himalayan)",
        description: "High-end luxury chalets, castle resorts, private Jacuzzis, and heated indoor pools."
      }
    ],
    transport: {
      airportTransfer: "Nearest airport is Bhuntar (KUU), 50km away (taxi ~₹2,000), or overnight luxury Volvo bus from Delhi / Chandigarh.",
      localTravel: "Local 4x4 cabs / Boleros for mountain passes (Atal Tunnel, Rohtang) and rented Royal Enfield / scooters (₹800–₹1,500/day).",
      shortDistances: "Pleasant walks through deodar pine forests and local auto-rickshaws between Mall Road and Old Manali."
    },
    days: [
      {
        title: "Old Manali, Hadimba Temple & Deodar Forests",
        morning: "Arrive in Manali, breathe crisp mountain air, and visit the 16th-century wooden pagoda Hadimba Devi Temple amid towering cedar woods.",
        afternoon: "Stroll across the cobblestone alleys of Old Manali. Savor wood-fired trout and shakshuka at Dylan's Toasted and Roasted or Cafe 1947 by the river.",
        evening: "Explore Mall Road, taste hot piping steamed Momos and Siddu, and browse Tibetan handicrafts and warm Pashmina shawls.",
        stayArea: "Old Manali",
        costMultiplier: 1.0
      },
      {
        title: "Solang Valley Snow & Adventure Thrills",
        morning: "Drive to Solang Valley for adrenaline-packed paragliding, zorbing, ATV quad biking, and skiing (winter).",
        afternoon: "Ride the Solang Ropeway cable car to Mount Phatru for 360-degree snow-capped Himalayan panoramas.",
        evening: "Return to Vashisht village for a soothing natural sulfur hot spring bath to relax tired muscles.",
        stayArea: "Solang or Vashisht",
        costMultiplier: 1.2
      },
      {
        title: "Atal Tunnel & Sissu Valley (Lahaul)",
        morning: "Drive through the engineering wonder Atal Tunnel (9.02 km) to enter the stark, mystical landscapes of Lahaul Valley.",
        afternoon: "Marvel at the majestic Sissu Waterfall and serene Chandra River bank, with a Maggi and hot tea break by the glacier streams.",
        evening: "Return to Manali for a riverside bonfire evening with acoustic music at your cottage.",
        stayArea: "Old Manali / Naggar",
        costMultiplier: 1.25
      },
      {
        title: "Naggar Castle & River Rafting in Beas",
        morning: "Visit historic Naggar Castle (15th-century wood and stone fortress) and the Nicholas Roerich Art Gallery.",
        afternoon: "Experience thrilling Grade II & III white water rafting in the glacial Beas River near Kullu/Babeli.",
        evening: "Farewell dinner with Himachali Dham delicacies and mountain herbal tea overlooking the twinkling valley.",
        stayArea: "Naggar / Manali",
        costMultiplier: 1.1
      }
    ]
  },

  dubai: {
    name: "Dubai",
    stateOrCountry: "United Arab Emirates",
    currency: "AED",
    currencySymbol: "AED ",
    baseDailyCostPerPerson: 8500,
    tagline: "City of Superlatives — Futuristic Skylines, Luxury & Desert Safaris",
    bestTimeToVisit: "November to March",
    idealDurationDays: 4,
    tags: ["Futuristic", "Shopping", "Luxury", "Desert Safari", "Architecture"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹3,500 – ₹6,000 / night (150–260 AED)",
        area: "Deira / Bur Dubai / Al Barsha",
        description: "Modern budget chain hotels and stylish aparthotels close to Red Line Metro stations."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹8,500 – ₹16,000 / night (370–700 AED)",
        area: "Downtown Dubai / Dubai Marina / Jumeirah Lake Towers (JLT)",
        description: "4-star high-rise hotels with rooftop infinity pools, gym, and views of city towers."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹25,000 – ₹80,000+ / night (1,100–3,500+ AED)",
        area: "Palm Jumeirah (Atlantis) / Downtown (Armani Hotel) / Jumeirah Beach",
        description: "Iconic ultra-luxury beachfront resorts, private butler service, and Michelin-starred dining."
      }
    ],
    transport: {
      airportTransfer: "Dubai International Airport (DXB) connects directly via Dubai Metro Red Line or official Dubai Taxi (cream cabs).",
      localTravel: "Dubai Metro (automated driverless trains), Dubai Tram (Marina), and Careem / Uber apps.",
      shortDistances: "Traditional Abra wooden boats across Dubai Creek (1 AED), air-conditioned walkways, or Careem Bike rentals."
    },
    days: [
      {
        title: "Downtown Wonders, Burj Khalifa & Dubai Mall",
        morning: "Arrive in Dubai, head to Dubai Mall, and visit the mesmerizing Dubai Aquarium & Underwater Zoo tunnel.",
        afternoon: "Ascend to the 124th/125th floor of Burj Khalifa, the world's tallest building, for awe-inspiring 360-degree desert and ocean vistas.",
        evening: "Watch the synchronized Dubai Fountain show set to music and light, followed by dinner overlooking the promenade.",
        stayArea: "Downtown Dubai",
        costMultiplier: 1.0
      },
      {
        title: "Arabian Desert Safari & Bedouin Camp",
        morning: "Relax at JBR (Jumeirah Beach Residence) open beach or visit the futuristic Museum of the Future.",
        afternoon: "Pick-up in a 4x4 Land Cruiser for thrilling Dune Bashing on red Arabian sand dunes, followed by sandboarding.",
        evening: "Arrive at a desert camp for camel rides, henna painting, belly dance & Tanoura performances, and lavish BBQ buffet dinner under the stars.",
        stayArea: "Downtown or Marina",
        costMultiplier: 1.2
      },
      {
        title: "Palm Jumeirah, Dubai Marina & Yacht Cruise",
        morning: "Ride the Palm Monorail to Atlantis The Palm and explore the Lost Chambers Aquarium or Aquaventure Waterpark.",
        afternoon: "Walk along the sparkling Dubai Marina Promenade and take in the architecture of Cayan Tower and waterfront yachts.",
        evening: "Board a luxury evening Marina sunset yacht cruise with gourmet dinner, sailing past Ain Dubai (the world's largest Ferris wheel).",
        stayArea: "Dubai Marina",
        costMultiplier: 1.3
      },
      {
        title: "Old Dubai Heritage, Gold Souk & Creek Abra",
        morning: "Explore the historic Al Fahidi Historical Neighbourhood with wind-tower architecture and coffee museums.",
        afternoon: "Hop on a traditional wooden Abra boat across Dubai Creek for 1 AED to explore the dazzling Gold Souk and fragrant Spice Souk.",
        evening: "Dine at Al Seef waterfront promenade sampling Arabic mezze, Shawarma, and Kunafa as dhow boats pass by.",
        stayArea: "Al Seef / Bur Dubai",
        costMultiplier: 0.9
      }
    ]
  },

  paris: {
    name: "Paris",
    stateOrCountry: "France",
    currency: "EUR",
    currencySymbol: "€",
    baseDailyCostPerPerson: 9500,
    tagline: "The City of Light — Timeless Art, Romantic Boulevards & Haute Cuisine",
    bestTimeToVisit: "April to October",
    idealDurationDays: 4,
    tags: ["Art", "Romance", "History", "Cuisine", "Architecture"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹4,000 – ₹7,500 / night (45–85 EUR)",
        area: "Montmartre / 11th Arrondissement / Belleville",
        description: "Charming boutique hostels (Generator, Jo&Joe) and classic Parisian budget pensions."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹10,000 – ₹20,000 / night (110–220 EUR)",
        area: "Latin Quarter / Le Marais / Saint-Germain-des-Prés",
        description: "Classic Haussmann-style boutique hotels with wrought-iron balconies and breakfast croissants."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹35,000 – ₹100,000+ / night (400–1,100+ EUR)",
        area: "Place Vendôme (The Ritz) / 8th Arrondissement (Four Seasons George V)",
        description: "Palace-category hotels with Michelin 3-star dining and Eiffel Tower view suites."
      }
    ],
    transport: {
      airportTransfer: "RER B commuter train from Charles de Gaulle (CDG) to central Paris (Châtelet-Les Halles) or direct RoissyBus to Opéra.",
      localTravel: "Paris Métro & RER system is dense, fast, and covers all 20 arrondissements (Navigo Easy or contactless tickets).",
      shortDistances: "Walking through picturesque boulevards, Vélib' bike sharing, or Batobus river shuttles."
    },
    days: [
      {
        title: "Eiffel Tower, Seine Cruise & Trocadéro",
        morning: "Arrive in Paris, check in, and view the Eiffel Tower from Place du Trocadéro for picture-perfect postcards.",
        afternoon: "Ascend to the Eiffel Tower summit, then walk across Champ de Mars for freshly baked pain au chocolat and espresso.",
        evening: "Embark on an illuminated Seine River cruise aboard Bateaux Parisiens, gliding under ornate bridges as the Eiffel Tower sparkles.",
        stayArea: "7th Arrondissement / Latin Quarter",
        costMultiplier: 1.0
      },
      {
        title: "The Louvre, Tuileries & Champs-Élysées",
        morning: "Enter the world's greatest art museum, The Louvre (Mona Lisa, Venus de Milo, Winged Victory).",
        afternoon: "Stroll through Tuileries Garden and Place de la Concorde; walk up Avenue des Champs-Élysées to Arc de Triomphe.",
        evening: "Climb the Arc de Triomphe rooftop for sunset vistas of the 12 radiating grand avenues, followed by dinner at a classic French bistro.",
        stayArea: "1st / 8th Arrondissement",
        costMultiplier: 1.15
      },
      {
        title: "Bohemian Montmartre, Sacré-Cœur & Moulin Rouge",
        morning: "Wander through the cobblestone hilly lanes of Montmartre, visit Place du Tertre where painters create live portraits.",
        afternoon: "Step inside the magnificent white domed Sacré-Cœur Basilica for breathtaking views over all of Paris.",
        evening: "Pass by the iconic red windmill of Moulin Rouge and enjoy escargots, duck confit, and crème brûlée at a bistro.",
        stayArea: "Montmartre / 18th Arr.",
        costMultiplier: 1.05
      },
      {
        title: "Notre-Dame, Latin Quarter & Le Marais",
        morning: "Visit Île de la Cité, marvel at the restored Notre-Dame Cathedral facade, and see the stained glass of Sainte-Chapelle.",
        afternoon: "Browse English books at Shakespeare and Company bookshop, walk through the vibrant Latin Quarter and Luxembourg Gardens.",
        evening: "Explore trendy fashion boutiques and art galleries in Le Marais, savoring hot falafel on Rue des Rosiers and macaron at Ladurée.",
        stayArea: "Le Marais / 4th Arr.",
        costMultiplier: 1.1
      }
    ]
  },

  london: {
    name: "London",
    stateOrCountry: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    baseDailyCostPerPerson: 10000,
    tagline: "The Royal Capital — Historic Monarchy, Global Culture & Thames Landmarks",
    bestTimeToVisit: "May to September",
    idealDurationDays: 4,
    tags: ["Royal Heritage", "Museums", "Theatre", "Architecture", "Shopping"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹4,500 – ₹8,000 / night (45–80 GBP)",
        area: "King's Cross / Shoreditch / Camden",
        description: "Trendy design hostels (Wombat's, Clink261) and clean budget inns near Zone 1 Tube stations."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹12,000 – ₹22,000 / night (115–210 GBP)",
        area: "Kensington / Covent Garden / South Bank",
        description: "Victorian townhouse boutique hotels, Premier Inn hubs, and serviced apartments."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹38,000 – ₹110,000+ / night (360–1,050+ GBP)",
        area: "Mayfair (The Savoy, Claridge's) / Westminster",
        description: "World-renowned 5-star royal heritage hotels with traditional afternoon tea and Michelin stars."
      }
    ],
    transport: {
      airportTransfer: "Heathrow Express train (15 mins to Paddington), Piccadilly Line Underground, or Elizabeth Line directly into central London.",
      localTravel: "London Underground (The Tube), iconic Red Double Decker buses (contactless card/Oyster).",
      shortDistances: "Walking via pedestrian routes, Santander Cycles ('Boris Bikes'), or Thames Clippers Uber Boat."
    },
    days: [
      {
        title: "Westminster, Big Ben & The London Eye",
        morning: "Witness the Changing of the Guard at Buckingham Palace, then walk through St. James's Park to Westminster Abbey.",
        afternoon: "Admire Big Ben and the Houses of Parliament, cross Westminster Bridge to ride the 135-meter-high London Eye.",
        evening: "Stroll along the lively South Bank promenade with street performers, dining at a riverside pub with traditional Fish and Chips.",
        stayArea: "Westminster / Waterloo",
        costMultiplier: 1.0
      },
      {
        title: "Tower of London, Tower Bridge & Borough Market",
        morning: "Explore the 1,000-year-old fortress Tower of London and gaze upon the magnificent Crown Jewels.",
        afternoon: "Walk across the glass floor walkway of Tower Bridge, then feast on artisanal street food at historic Borough Market.",
        evening: "Take the lift up to the Sky Garden (free observation deck with lush indoor gardens) for sunset cocktails over the city skyline.",
        stayArea: "City of London / Southwark",
        costMultiplier: 1.15
      },
      {
        title: "World-Class Free Museums & Hyde Park",
        morning: "Visit the British Museum to see the Rosetta Stone and Egyptian mummies (free general entry).",
        afternoon: "Explore the Natural History Museum and Victoria & Albert Museum in South Kensington, followed by a walk in Hyde Park and Serpentine lake.",
        evening: "Experience a West End musical theater show in Covent Garden (e.g., The Lion King, Phantom of the Opera, Wicked).",
        stayArea: "Covent Garden / Soho",
        costMultiplier: 1.2
      },
      {
        title: "Camden Market, Regent's Canal & Soho Vibes",
        morning: "Explore eclectic fashion, vintage vinyl, and global street food stalls at Camden Market and lock.",
        afternoon: "Take a scenic canal walk or waterbus from Camden to picturesque Little Venice, then browse shops on Oxford & Regent Street.",
        evening: "Explore the vibrant nightlife and restaurants in Soho and Chinatown, ending with craft beer at an English tavern.",
        stayArea: "Soho / Camden",
        costMultiplier: 1.05
      }
    ]
  },

  bali: {
    name: "Bali",
    stateOrCountry: "Indonesia",
    currency: "IDR",
    currencySymbol: "Rp ",
    baseDailyCostPerPerson: 3600,
    tagline: "Island of the Gods — Sacred Temples, Rice Terraces & Sunset Beaches",
    bestTimeToVisit: "April to October",
    idealDurationDays: 5,
    tags: ["Nature", "Beaches", "Temples", "Surfing", "Wellness"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,200 – ₹2,400 / night (220,000–450,000 IDR)",
        area: "Canggu / Ubud Center / Kuta",
        description: "Balinese bamboo bungalows, homestays with stone carvings, and community pool hostels."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹3,500 – ₹7,500 / night (650,000–1,400,000 IDR)",
        area: "Seminyak / Ubud Jungle / Sanur",
        description: "Private 1-bedroom pool villas, lush tropical garden resorts, and cliffside boutique stays."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹12,000 – ₹45,000+ / night (2,200,000–8,500,000+ IDR)",
        area: "Uluwatu / Nusa Dua (The Mulia, Bulgari Resort, Four Seasons Sayan)",
        description: "Ultra-luxury cliff-edge private estates with floating breakfasts and private butler service."
      }
    ],
    transport: {
      airportTransfer: "Ngurah Rai International Airport (DPS) in Denpasar; airport taxi counter or pre-booked Grab/Gojek (₹800–₹1,500).",
      localTravel: "Renting an automatic scooter (₹350–₹500/day) or hiring a private English-speaking Balinese driver with car (₹2,200–₹3,000/day).",
      shortDistances: "Gojek / Grab bike taxis and leisurely beach walking."
    },
    days: [
      {
        title: "Ubud Cultural Heart, Monkey Forest & Palace",
        morning: "Arrive in Bali, transfer to spiritual Ubud, and walk through the sacred Sacred Monkey Forest Sanctuary.",
        afternoon: "Visit Ubud Royal Palace and art market; savor organic Nasi Campur and smoothie bowls at a jungle garden cafe.",
        evening: "Watch an enchanting traditional Legong or Kecak fire dance performance under the stars at Ubud temple courtyard.",
        stayArea: "Ubud",
        costMultiplier: 1.0
      },
      {
        title: "Tegalalang Rice Terraces & Mount Batur View",
        morning: "Catch the morning sunlight through coconut palms at cascading Tegalalang Rice Terraces and try the famous Bali Jungle Swing.",
        afternoon: "Drive up to Kintamani for lunch with breathtaking panoramic views of active volcano Mount Batur and Lake Batur.",
        evening: "Purify mind and body at the sacred holy water temple Tirta Empul, then return to Ubud for Balinese massage.",
        stayArea: "Ubud",
        costMultiplier: 1.1
      },
      {
        title: "Seminyak Beach Clubs & Water Sports",
        morning: "Transfer to coastal Seminyak / Canggu, learn beginner surfing at Double Six Beach with local surf instructors.",
        afternoon: "Browse chic designer boutiques, bohemian jewelry, and stylish surf shops along Seminyak strip.",
        evening: "Lounge on colorful beanbags at Potato Head Beach Club or Ku De Ta, watching Bali's legendary purple-orange sunset.",
        stayArea: "Seminyak / Canggu",
        costMultiplier: 1.2
      },
      {
        title: "Nusa Penida Island Day Excursion",
        morning: "Take a 40-minute fast speed boat from Sanur to the rugged island of Nusa Penida.",
        afternoon: "Photograph the iconic T-Rex shaped cliff at Kelingking Beach and swim in the natural infinity pool of Angel's Billabong and Broken Beach.",
        evening: "Snorkel with graceful Giant Manta Rays at Crystal Bay before returning to mainland Bali for seafood dinner in Jimbaran Bay.",
        stayArea: "Jimbaran / Nusa Dua",
        costMultiplier: 1.3
      },
      {
        title: "Uluwatu Cliff Temple & Sunset Kecak Show",
        morning: "Relax at pristine white-sand Padang Padang or Melasti Beach surrounded by limestone cliffs.",
        afternoon: "Visit the clifftop Pura Luhur Uluwatu temple perched 70 meters above crashing Indian Ocean waves.",
        evening: "Witness the iconic cliffside Kecak & Fire Dance at sunset, followed by a candlelit grilled seafood feast right on the sand at Jimbaran.",
        stayArea: "Uluwatu / Jimbaran",
        costMultiplier: 1.2
      }
    ]
  },

  bengaluru: {
    name: "Bengaluru",
    stateOrCountry: "India",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 3200,
    tagline: "The Garden City & Silicon Capital — Craft Breweries, Palaces & Tech Vibe",
    bestTimeToVisit: "Year-Round (Pleasant climate)",
    idealDurationDays: 3,
    tags: ["Parks", "Craft Beer", "Food", "Heritage", "Tech Culture"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,200 – ₹2,200 / night",
        area: "Koramangala / Indiranagar / MG Road",
        description: "Modern co-living hubs, boutique backpacker hostels, and clean transit guest rooms."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹3,500 – ₹6,500 / night",
        area: "Indiranagar / Lavelle Road / Whitefield",
        description: "Sleek business boutique hotels with fitness centers and rooftop lounges."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹10,000 – ₹25,000+ / night",
        area: "The Leela Palace (Old Airport Rd) / ITC Gardenia / Taj West End",
        description: "Grand historic palaces with lush tropical gardens, heritage architecture, and fine dining."
      }
    ],
    transport: {
      airportTransfer: "Kempegowda International Airport (BLR) is ~35km from city center; Vayu Vajra luxury AC airport buses (₹250) or pre-paid/app cabs (₹900–₹1,400).",
      localTravel: "Namma Metro (Purple and Green lines) connects major tech and retail hubs fast and avoiding road congestion.",
      shortDistances: "Auto-rickshaws (metered/Namma Yatri app) or quick bike taxis (Rapido)."
    },
    days: [
      {
        title: "Cubbon Park, Vidhana Soudha & Craft Breweries",
        morning: "Morning walk beneath bamboo groves in 300-acre Cubbon Park; admire the neo-Dravidian architecture of Vidhana Soudha.",
        afternoon: "Breakfast with crispy Benne Masala Dosa and filter coffee at legendary Vidyarthi Bhavan or CTR (Shri Sagar).",
        evening: "Experience Bangalore's famous microbrewery culture on 100 Feet Road, Indiranagar (Toit / Arbor Brewing Company).",
        stayArea: "Indiranagar / MG Road",
        costMultiplier: 1.0
      },
      {
        title: "Bangalore Palace & Lalbagh Botanical Gardens",
        morning: "Tour Tudor-style Bangalore Palace with fortified towers, stained glass, and vintage royal paintings.",
        afternoon: "Visit Lalbagh Botanical Garden to see the famous 19th-century Glass House inspired by London's Crystal Palace and 3,000-million-year-old rock.",
        evening: "Shop along Church Street, visit the iconic Blossom Book House, and dine at Koshy's or Church Street Social.",
        stayArea: "Church Street / Lavelle Road",
        costMultiplier: 1.05
      },
      {
        title: "Artisanal Cafes, Bannerghatta Safari & Nightlife",
        morning: "Explore Bannerghatta Biological Park for tiger and lion safari and India's first butterfly conservatory.",
        afternoon: "Indulge in artisanal sourdough and specialty coffees at Koramangala's vibrant third-wave cafes.",
        evening: "Sunset drinks at High Ultra Lounge (South India's highest rooftop lounge on 31st floor) with panoramic city views.",
        stayArea: "Koramangala",
        costMultiplier: 1.15
      }
    ]
  },

  hyderabad: {
    name: "Hyderabad",
    stateOrCountry: "India",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 3100,
    tagline: "City of Pearls — Nizami Royalty, Legendary Biryani & Golconda Fortress",
    bestTimeToVisit: "October to March",
    idealDurationDays: 3,
    tags: ["Heritage", "Biryani", "Forts", "Pearls", "Culture"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,000 – ₹2,200 / night",
        area: "Abids / Begumpet / Lakdikapul",
        description: "Central budget hotels and welcoming guest homes close to metro stations."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹3,200 – ₹6,000 / night",
        area: "Banjara Hills / Jubilee Hills / Gachibowli",
        description: "Modern hotels with great city connectivity, swimming pools, and culinary options."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹12,000 – ₹38,000+ / night",
        area: "Taj Falaknuma Palace (Engine Bowli) / Park Hyatt Banjara Hills",
        description: "Living in a real scorpion-shaped hilltop Nizami palace with horse carriage arrivals."
      }
    ],
    transport: {
      airportTransfer: "Rajiv Gandhi International Airport (HYD) in Shamshabad connected via Pushpak Airport AC buses (₹200–₹300) and app cabs (₹700–₹1,100).",
      localTravel: "Hyderabad Metro network across three major corridors connects key heritage and modern districts.",
      shortDistances: "Auto-rickshaws, city RTC buses, and app-based cabs (Uber/Ola)."
    },
    days: [
      {
        title: "Charminar, Laad Bazaar & Authentic Biryani",
        morning: "Stand before the 430-year-old iconic Charminar and climb up for panoramic views of Old City.",
        afternoon: "Shop for lac bangles and pearls in bustling Laad Bazaar; visit Mecca Masjid, followed by authentic Dum Biryani at Paradise or Shadab.",
        evening: "Tour the opulent Chowmahalla Palace, seat of the Asaf Jahi dynasty, admiring vintage Rolls Royces and crystal chandeliers.",
        stayArea: "Old City / Abids",
        costMultiplier: 1.0
      },
      {
        title: "Golconda Fort Acoustics & Qutb Shahi Tombs",
        morning: "Explore the impregnable medieval Golconda Fort, marveling at the acoustic clapping portico and royal ruins.",
        afternoon: "Walk among the domed stone architecture of the seven Qutb Shahi Tombs set within landscaped gardens.",
        evening: "Watch the spectacular sound and light show at Golconda Fort narrating tales of the Koh-i-Noor diamond and Nizams.",
        stayArea: "Banjara Hills",
        costMultiplier: 1.1
      },
      {
        title: "Hussain Sagar, Buddha Statue & Jubilee Hills",
        morning: "Take a motorboat ride in Hussain Sagar Lake to reach the monolithic 18-meter granite Buddha statue.",
        afternoon: "Visit Salar Jung Museum, one of the world's largest one-man antique collections, to see the Veiled Rebecca.",
        evening: "Dine at a trendy rooftop lounge in Jubilee Hills overlooking Durgam Cheruvu cable bridge.",
        stayArea: "Jubilee Hills / Hitec City",
        costMultiplier: 1.15
      }
    ]
  },

  pune: {
    name: "Pune",
    stateOrCountry: "India",
    currency: "INR",
    currencySymbol: "₹",
    baseDailyCostPerPerson: 2800,
    tagline: "Oxford of the East — Maratha Heritage, Hills & Youthful Cafe Culture",
    bestTimeToVisit: "July to February (Monsoon & Winter are best)",
    idealDurationDays: 3,
    tags: ["Maratha History", "Trekking", "Cafes", "Culture", "Monsoon Escapes"],
    stays: [
      {
        type: "Budget Stay",
        priceRange: "₹1,000 – ₹2,000 / night",
        area: "FC Road / Deccan Gymkhana / Shivajinagar",
        description: "Hostels and clean budget student & transit hotels near bustling food streets."
      },
      {
        type: "Comfort Stay",
        priceRange: "₹3,000 – ₹5,500 / night",
        area: "Koregaon Park / Kalyani Nagar / Viman Nagar",
        description: "Green boutique hotels, design aparthotels with leafy garden patios."
      },
      {
        type: "Luxury Stay",
        priceRange: "₹8,000 – ₹20,000+ / night",
        area: "JW Marriott (SB Road) / The Ritz-Carlton (Airport Rd)",
        description: "5-star luxury hotels with award-winning spas, golf course views, and fine dining."
      }
    ],
    transport: {
      airportTransfer: "Pune International Airport (PNQ) in Lohegaon; app cabs and prepaid auto-taxis (₹300–₹500).",
      localTravel: "Pune Metro (Vanaz to Ramwadi) and PMPML city buses or self-drive scooters.",
      shortDistances: "Auto-rickshaws and walking down pedestrian-friendly Koregaon Park lanes."
    },
    days: [
      {
        title: "Shaniwar Wada, Peshwa Legacy & Street Treats",
        morning: "Step through the massive spike-studded gates of Shaniwar Wada, seat of the Maratha Empire's Peshwas.",
        afternoon: "Walk to historic Lal Mahal and Dagdusheth Halwai Ganpati Temple. Taste fiery Kolhapuri Misal Pav at Kata Kirr.",
        evening: "Stroll down Fergusson College (FC) Road for shopping, cold coffee at Durga, and lively student vibes.",
        stayArea: "Deccan / FC Road",
        costMultiplier: 1.0
      },
      {
        title: "Sinhagad Fort Trek & Rural Maharashtrian Feast",
        morning: "Drive to Sinhagad Fort (Lion's Fort) atop a cliff; hike up the misty trails overlooking Khadakwasla Dam.",
        afternoon: "Savor piping hot Pitla Bhakri, Thecha, Kanda Bhaji, and fresh Matka Dahi made by local villagers on the fort.",
        evening: "Relax by Khadakwasla Dam backwaters eating roasted corn cob as the sun dips behind Western Ghats.",
        stayArea: "Kothrud / SB Road",
        costMultiplier: 1.05
      },
      {
        title: "Aga Khan Palace & Koregaon Park Tree Lanes",
        morning: "Visit serene Aga Khan Palace where Mahatma Gandhi was interned, set in Italian arches and sprawling lawns.",
        afternoon: "Explore the shaded lanes of Koregaon Park (KP), browse art cafes, and indulge in artisanal gelato.",
        evening: "Dinner and craft beer at high-energy brewpubs like Effingut or German Bakery in KP.",
        stayArea: "Koregaon Park",
        costMultiplier: 1.15
      }
    ]
  }
};

module.exports = {
  destinationDatabase
};
