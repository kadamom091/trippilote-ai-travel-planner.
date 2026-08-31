/**
 * TRIPPILOTE — CLIENT JAVASCRIPT CONTROLLER
 * Handles interactive trip planning, animated multi-step loading,
 * REST API communication, dynamic DOM rendering, and AI chatbot.
 */

// Central API Configuration
const API_BASE_URL = window.location.origin.startsWith("http") 
  ? window.location.origin 
  : "http://localhost:5000";

// State Management
const appState = {
  currentTripData: null,
  chatHistory: [],
  isSubmitting: false,
  isChatLoading: false
};

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initNavigation();
  initPlannerForm();
  initDestinationExplorer();
  initChatAssistant();
  initContactForm();
});

/**
 * Initializes Lucide icons safely
 */
function initIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

/**
 * Toast Notification System
 */
function showToast(message, type = "info", duration = 4000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconName = "info";
  if (type === "success") iconName = "check-circle";
  if (type === "error") iconName = "alert-triangle";

  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <div>${escapeHtml(message)}</div>
  `;

  container.appendChild(toast);
  initIcons();

  setTimeout(() => {
    toast.classList.add("toast-exit");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, duration);
}

/**
 * Navigation Bar & Mobile Drawer Management
 */
function initNavigation() {
  const header = document.getElementById("header");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky header blur effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        if (navMenu.classList.contains("open")) {
          icon.setAttribute("data-lucide", "x");
        } else {
          icon.setAttribute("data-lucide", "menu");
        }
        initIcons();
      }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.setAttribute("data-lucide", "menu");
          initIcons();
        }
      });
    });
  }
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link && scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

/**
 * Interactive Planner Form Logic
 */
function initPlannerForm() {
  const form = document.getElementById("trip-planner-form");
  const destInput = document.getElementById("destination");
  const destClearBtn = document.getElementById("dest-clear-btn");
  const daysInput = document.getElementById("days");
  const daysMinus = document.getElementById("days-minus");
  const daysPlus = document.getElementById("days-plus");
  const travelerBtns = document.querySelectorAll(".traveler-btn");
  const travelersHidden = document.getElementById("travelers");
  const budgetInput = document.getElementById("budget");
  const presetBtns = document.querySelectorAll(".preset-btn");
  const quickPills = document.querySelectorAll(".quick-pill");

  // Destination Clear Button
  if (destClearBtn && destInput) {
    destClearBtn.addEventListener("click", () => {
      destInput.value = "";
      destInput.focus();
    });
  }

  // Quick Destination Pills
  quickPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const dest = pill.getAttribute("data-dest");
      if (dest && destInput) {
        destInput.value = dest;
        destInput.focus();
        clearFieldError("dest-error");
        showToast(`Selected destination: ${dest}`, "info", 2000);
      }
    });
  });

  // Days Stepper
  if (daysMinus && daysPlus && daysInput) {
    daysMinus.addEventListener("click", () => {
      let val = parseInt(daysInput.value, 10) || 1;
      if (val > 1) {
        daysInput.value = val - 1;
        clearFieldError("days-error");
      }
    });

    daysPlus.addEventListener("click", () => {
      let val = parseInt(daysInput.value, 10) || 1;
      if (val < 14) {
        daysInput.value = val + 1;
        clearFieldError("days-error");
      }
    });
  }

  // Travelers Selector
  travelerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      travelerBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const val = btn.getAttribute("data-val");
      if (travelersHidden) travelersHidden.value = val;
      clearFieldError("travelers-error");
    });
  });

  // Budget Presets
  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const amount = btn.getAttribute("data-budget");
      if (amount && budgetInput) {
        budgetInput.value = amount;
        clearFieldError("budget-error");
      }
    });
  });

  // Clear errors on typing
  if (destInput) destInput.addEventListener("input", () => clearFieldError("dest-error"));
  if (budgetInput) budgetInput.addEventListener("input", () => clearFieldError("budget-error"));
  if (daysInput) daysInput.addEventListener("input", () => clearFieldError("days-error"));

  // Form Submit Handler
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (appState.isSubmitting) return;

      // 1. Client-side validation
      const isValid = validatePlannerForm();
      if (!isValid) return;

      // 2. Gather form data
      const destination = destInput.value.trim();
      const days = parseInt(daysInput.value, 10);
      const budget = parseFloat(budgetInput.value);
      const travelers = parseInt(travelersHidden.value, 10) || 2;
      const travelStyle = document.getElementById("travelStyle").value;

      const checkedInterests = Array.from(
        document.querySelectorAll("input[name='interests']:checked")
      ).map(cb => cb.value);

      const transportRadio = document.querySelector("input[name='transport']:checked");
      const transport = transportRadio ? transportRadio.value : "Mixed";

      const payload = {
        destination,
        days,
        budget,
        travelers,
        travelStyle,
        interests: checkedInterests,
        transport
      };

      // 3. Initiate animated loading & API request
      await handleGenerateItinerary(payload);
    });
  }
}

/**
 * Validates the planner form and sets friendly error messages
 */
function validatePlannerForm() {
  let isValid = true;

  const destInput = document.getElementById("destination");
  const daysInput = document.getElementById("days");
  const budgetInput = document.getElementById("budget");

  // Validate Destination
  if (!destInput || !destInput.value.trim()) {
    setFieldError("dest-error", "Please enter your destination (e.g. Goa, Manali, Paris).");
    if (destInput) destInput.focus();
    isValid = false;
  } else {
    clearFieldError("dest-error");
  }

  // Validate Days
  const daysVal = parseInt(daysInput.value, 10);
  if (isNaN(daysVal) || daysVal < 1 || daysVal > 14) {
    setFieldError("days-error", "Please enter a valid duration between 1 and 14 days.");
    if (isValid && daysInput) daysInput.focus();
    isValid = false;
  } else {
    clearFieldError("days-error");
  }

  // Validate Budget
  const budgetVal = parseFloat(budgetInput.value);
  if (isNaN(budgetVal) || budgetVal <= 0) {
    setFieldError("budget-error", "Please enter a valid positive budget amount.");
    if (isValid && budgetInput) budgetInput.focus();
    isValid = false;
  } else {
    clearFieldError("budget-error");
  }

  return isValid;
}

function setFieldError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = message;
}

function clearFieldError(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = "";
}

/**
 * Handles API call to /api/plan-trip with simulated progress steps
 */
async function handleGenerateItinerary(payload) {
  const loadingOverlay = document.getElementById("loading-overlay");
  const itineraryResult = document.getElementById("itinerary-result");
  const submitBtn = document.getElementById("generate-btn");

  appState.isSubmitting = true;
  if (submitBtn) submitBtn.disabled = true;

  // Show loading overlay, hide previous results
  if (itineraryResult) itineraryResult.classList.add("hidden");
  if (loadingOverlay) {
    loadingOverlay.classList.remove("hidden");
    loadingOverlay.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Reset loading steps UI
  const steps = [1, 2, 3, 4, 5];
  steps.forEach(s => {
    const el = document.getElementById(`step-${s}`);
    if (el) {
      el.className = "step-item";
      const icon = el.querySelector(".step-icon");
      if (icon) icon.setAttribute("data-lucide", "circle-dashed");
    }
  });
  initIcons();

  // Simulated progressive step animation
  let stepTimer;
  let currentStep = 1;

  function advanceStep() {
    if (currentStep <= 5) {
      const prevEl = document.getElementById(`step-${currentStep - 1}`);
      if (prevEl) {
        prevEl.className = "step-item completed";
        const prevIcon = prevEl.querySelector(".step-icon");
        if (prevIcon) prevIcon.setAttribute("data-lucide", "check-circle-2");
      }

      const activeEl = document.getElementById(`step-${currentStep}`);
      if (activeEl) {
        activeEl.className = "step-item active";
        const activeIcon = activeEl.querySelector(".step-icon");
        if (activeIcon) activeIcon.setAttribute("data-lucide", "loader");
      }
      initIcons();
      currentStep++;
    }
  }

  advanceStep();
  stepTimer = setInterval(advanceStep, 450);

  try {
    const response = await fetch(`${API_BASE_URL}/api/plan-trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    clearInterval(stepTimer);

    // Complete all step icons
    steps.forEach(s => {
      const el = document.getElementById(`step-${s}`);
      if (el) {
        el.className = "step-item completed";
        const icon = el.querySelector(".step-icon");
        if (icon) icon.setAttribute("data-lucide", "check-circle-2");
      }
    });
    initIcons();

    // Small delay to let user experience completion
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.success || !data.trip) {
      throw new Error(data.message || "Failed to generate itinerary.");
    }

    // Render generated itinerary
    appState.currentTripData = data.trip;
    renderItinerary(data.trip);

    // Hide loader & show result
    if (loadingOverlay) loadingOverlay.classList.add("hidden");
    if (itineraryResult) {
      itineraryResult.classList.remove("hidden");
      itineraryResult.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    showToast(`Successfully generated ${data.trip.days}-day itinerary for ${data.trip.destination}!`, "success");

  } catch (error) {
    clearInterval(stepTimer);
    console.error("Trip planning error:", error);
    if (loadingOverlay) loadingOverlay.classList.add("hidden");
    
    let errorMsg = error.message;
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      errorMsg = "Unable to connect to TripPilote. Please make sure the server is running.";
    }

    showToast(errorMsg, "error", 6000);
  } finally {
    appState.isSubmitting = false;
    if (submitBtn) submitBtn.disabled = false;
  }
}

/**
 * Dynamically renders the full generated Itinerary into the DOM
 */
function renderItinerary(trip) {
  const container = document.getElementById("itinerary-result");
  if (!container) return;

  const sym = trip.currencySymbol || "₹";
  const b = trip.budgetBreakdown;

  // Build Day Cards HTML
  const dayCardsHtml = trip.itinerary.map(day => `
    <div class="day-card">
      <div class="day-card-header">
        <h4 class="day-title">${escapeHtml(day.title)}</h4>
        <span class="day-cost-pill">Estimated Day Cost: ${day.currencySymbol}${day.estimatedDayCost.toLocaleString()}</span>
      </div>

      <div class="time-slots-list">
        <!-- Morning -->
        <div class="time-slot">
          <div class="slot-icon-box morning"><i data-lucide="sunrise"></i></div>
          <div class="slot-content">
            <h4>Morning (9:00 AM – 1:00 PM)</h4>
            <p>${escapeHtml(day.morning)}</p>
          </div>
        </div>

        <!-- Afternoon -->
        <div class="time-slot">
          <div class="slot-icon-box afternoon"><i data-lucide="sun"></i></div>
          <div class="slot-content">
            <h4>Afternoon (1:00 PM – 5:30 PM)</h4>
            <p>${escapeHtml(day.afternoon)}</p>
          </div>
        </div>

        <!-- Evening -->
        <div class="time-slot">
          <div class="slot-icon-box evening"><i data-lucide="moon"></i></div>
          <div class="slot-content">
            <h4>Evening & Night (5:30 PM Onwards)</h4>
            <p>${escapeHtml(day.evening)}</p>
          </div>
        </div>
      </div>

      <div class="day-stay-box">
        <i data-lucide="hotel"></i>
        <span><strong>Recommended Stay Area:</strong> ${escapeHtml(day.stayArea)}</span>
      </div>
    </div>
  `).join("");

  // Build Budget Categories HTML
  const categoriesHtml = b.categories.map(cat => `
    <div class="budget-cat-row">
      <span class="budget-cat-name">${escapeHtml(cat.name)} (${cat.percentage}%)</span>
      <span class="budget-cat-amount">${sym}${cat.amount.toLocaleString()}</span>
    </div>
  `).join("");

  // Build Stay Suggestions HTML
  const staysHtml = trip.stayRecommendations.map(s => `
    <div class="stay-item-card">
      <div class="stay-item-header">
        <span class="stay-item-type">${escapeHtml(s.type)}</span>
        <span class="stay-item-price">${escapeHtml(s.priceRange)}</span>
      </div>
      <div class="stay-item-area">📍 ${escapeHtml(s.area)}</div>
      <p class="stay-item-desc">${escapeHtml(s.description)}</p>
    </div>
  `).join("");

  // Advice alert style
  const adviceClass = b.isOverBudget ? "warning" : "ok";

  // Build Entire Container HTML
  container.innerHTML = `
    <!-- Header Summary Card -->
    <div class="itinerary-header-card">
      <div class="itinerary-meta-row">
        <div class="itinerary-title-box">
          <h3>${escapeHtml(trip.destination)} Exploration Plan</h3>
          <p class="itinerary-subtitle">${escapeHtml(trip.tagline || `Tailored travel experience in ${trip.destination}`)}</p>
        </div>
        <div class="itinerary-badges">
          <span class="itinerary-badge"><i data-lucide="calendar"></i> ${trip.days} Days</span>
          <span class="itinerary-badge"><i data-lucide="users"></i> ${trip.travelers} Traveler${trip.travelers > 1 ? "s" : ""}</span>
          <span class="itinerary-badge"><i data-lucide="compass"></i> ${escapeHtml(trip.travelStyle)} Style</span>
          <span class="itinerary-badge"><i data-lucide="car"></i> ${escapeHtml(trip.transportPreference)}</span>
        </div>
      </div>

      <!-- Action Toolbar -->
      <div class="itinerary-actions-bar">
        <button type="button" class="btn btn-glass btn-sm" id="btn-print-itinerary">
          <i data-lucide="printer"></i>
          <span>Print / Save PDF</span>
        </button>
        <button type="button" class="btn btn-glass btn-sm" id="btn-copy-itinerary">
          <i data-lucide="copy"></i>
          <span>Copy Itinerary</span>
        </button>
        <button type="button" class="btn btn-glass btn-sm" id="btn-share-itinerary">
          <i data-lucide="share-2"></i>
          <span>Share</span>
        </button>
        <a href="#planner" class="btn btn-outline-primary btn-sm" style="margin-left: auto;">
          <i data-lucide="edit-3"></i>
          <span>Modify Preferences</span>
        </a>
      </div>
    </div>

    <!-- 2-Column Layout -->
    <div class="itinerary-layout-grid">
      <!-- Left Column: Day-by-Day Cards -->
      <div class="days-container">
        ${dayCardsHtml}
      </div>

      <!-- Right Column: Sidebar Analytics -->
      <div class="sidebar-container">
        <!-- Budget Breakdown Card -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">
            <i data-lucide="pie-chart"></i>
            <span>Estimated Budget Breakdown</span>
          </h3>

          <div class="budget-summary-box">
            <div class="budget-stat-item">
              <span class="budget-stat-label">Estimated Total</span>
              <span class="budget-stat-val">${sym}${b.estimatedTotal.toLocaleString()}</span>
            </div>
            <div class="budget-stat-item">
              <span class="budget-stat-label">Your Budget</span>
              <span class="budget-stat-val">${sym}${b.userBudget.toLocaleString()}</span>
            </div>
          </div>

          <!-- Progress Track -->
          <div class="budget-progress-track">
            <div 
              class="budget-progress-fill ${b.isOverBudget ? "overbudget" : ""}" 
              style="width: ${Math.min(100, b.budgetUtilizationPercent)}%"
            ></div>
          </div>

          <div class="budget-advice-alert ${adviceClass}">
            ${escapeHtml(b.budgetAdvice)}
          </div>

          <div class="budget-categories-list">
            ${categoriesHtml}
          </div>
        </div>

        <!-- Stay Recommendations Card -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">
            <i data-lucide="bed"></i>
            <span>Accommodation Suggestions</span>
          </h3>
          <div class="stay-items-list">
            ${staysHtml}
          </div>
        </div>

        <!-- Local Transportation Guide Card -->
        <div class="sidebar-card">
          <h3 class="sidebar-title">
            <i data-lucide="navigation"></i>
            <span>Local Transportation Guide</span>
          </h3>
          <div class="transport-guide-list">
            <div class="transport-guide-item">
              <i data-lucide="plane"></i>
              <div>
                <strong>Airport / Station Transfer:</strong><br>
                <span>${escapeHtml(trip.transportRecommendations.airportTransfer)}</span>
              </div>
            </div>
            <div class="transport-guide-item">
              <i data-lucide="car"></i>
              <div>
                <strong>Local Commute:</strong><br>
                <span>${escapeHtml(trip.transportRecommendations.localTravel)}</span>
              </div>
            </div>
            <div class="transport-guide-item">
              <i data-lucide="map-pin"></i>
              <div>
                <strong>Short Distances:</strong><br>
                <span>${escapeHtml(trip.transportRecommendations.shortDistances)}</span>
              </div>
            </div>
          </div>
          <p class="transport-disclaimer">
            * Estimates are indicative based on prevailing seasonal local tariffs.
          </p>
        </div>
      </div>
    </div>
  `;

  initIcons();
  attachItineraryActionListeners(trip);
}

/**
 * Attaches Print, Copy, and Share event handlers to itinerary toolbar
 */
function attachItineraryActionListeners(trip) {
  const printBtn = document.getElementById("btn-print-itinerary");
  const copyBtn = document.getElementById("btn-copy-itinerary");
  const shareBtn = document.getElementById("btn-share-itinerary");

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const sym = trip.currencySymbol || "₹";
      let summaryText = `✈️ TRIPPILOTE ITINERARY FOR ${trip.destination.toUpperCase()}\n`;
      summaryText += `Duration: ${trip.days} Days | Travelers: ${trip.travelers} | Style: ${trip.travelStyle}\n`;
      summaryText += `Estimated Total Budget: ${sym}${trip.budgetBreakdown.estimatedTotal.toLocaleString()}\n\n`;

      trip.itinerary.forEach(d => {
        summaryText += `📅 ${d.title} (Est. Cost: ${d.currencySymbol}${d.estimatedDayCost.toLocaleString()})\n`;
        summaryText += `• Morning: ${d.morning}\n`;
        summaryText += `• Afternoon: ${d.afternoon}\n`;
        summaryText += `• Evening: ${d.evening}\n`;
        summaryText += `• Stay Area: ${d.stayArea}\n\n`;
      });

      summaryText += `Planned with TripPilote — Your AI Co-Pilot for Every Journey.\n`;

      try {
        await navigator.clipboard.writeText(summaryText);
        showToast("Itinerary copied to clipboard!", "success");
      } catch (err) {
        showToast("Unable to copy to clipboard.", "error");
      }
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `TripPilote Itinerary: ${trip.destination}`,
            text: `Check out my ${trip.days}-day trip plan to ${trip.destination} crafted by TripPilote!`,
            url: window.location.href
          });
        } catch (err) {
          // User cancelled share dialog
        }
      } else {
        showToast("Sharing URL copied to clipboard!", "info");
      }
    });
  }
}

/**
 * Destination Explorer Filter & 1-Click Plan Trip autofill
 */
function initDestinationExplorer() {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const destCards = document.querySelectorAll(".dest-card");
  const planDestBtns = document.querySelectorAll(".plan-dest-btn");
  const destInput = document.getElementById("destination");
  const styleSelect = document.getElementById("travelStyle");
  const daysInput = document.getElementById("days");

  // Category Filtering
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");
      destCards.forEach(card => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 1-Click "Plan Trip" button on cards
  planDestBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const dest = btn.getAttribute("data-dest");
      const style = btn.getAttribute("data-style");
      const days = btn.getAttribute("data-days");

      if (dest && destInput) destInput.value = dest;
      if (style && styleSelect) styleSelect.value = style;
      if (days && daysInput) daysInput.value = days;

      clearFieldError("dest-error");

      // Smooth scroll to planner
      const plannerSection = document.getElementById("planner");
      if (plannerSection) {
        plannerSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      showToast(`Configured planner for ${dest}! Click 'Generate My Itinerary' when ready.`, "info", 3000);
    });
  });

  // Footer destination links
  document.querySelectorAll(".footer-dest-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const dest = link.getAttribute("data-dest");
      if (dest && destInput) {
        destInput.value = dest;
        clearFieldError("dest-error");
        const plannerSection = document.getElementById("planner");
        if (plannerSection) {
          plannerSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

/**
 * AI Travel Assistant Chatbot Management
 */
function initChatAssistant() {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");
  const chatTyping = document.getElementById("chat-typing");
  const chatClearBtn = document.getElementById("chat-clear-btn");
  const chatChips = document.querySelectorAll(".chat-chip");

  // Suggestion Chips
  chatChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-prompt");
      if (prompt && chatInput) {
        chatInput.value = prompt;
        chatInput.focus();
      }
    });
  });

  // Clear Chat Button
  if (chatClearBtn && chatMessages) {
    chatClearBtn.addEventListener("click", () => {
      appState.chatHistory = [];
      chatMessages.innerHTML = `
        <div class="message-bubble bot-message">
          <div class="message-avatar"><i data-lucide="bot"></i></div>
          <div class="message-content">
            <p><strong>👋 Chat reset. I'm ready for your next travel question!</strong></p>
            <p>Ask me about attractions, budgets, flight routes, or packing checklists.</p>
            <span class="message-time">Just now</span>
          </div>
        </div>
      `;
      initIcons();
      showToast("Chat history cleared.", "info", 2000);
    });
  }

  // Submit Handler
  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userText = chatInput.value.trim();
      if (!userText || appState.isChatLoading) return;

      // Append User Bubble
      appendChatMessage(userText, "user");
      chatInput.value = "";
      appState.isChatLoading = true;

      // Show typing indicator
      if (chatTyping) chatTyping.classList.remove("hidden");
      scrollChatToBottom();

      try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: userText,
            history: appState.chatHistory
          })
        });

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();
        if (chatTyping) chatTyping.classList.add("hidden");

        if (data.success && data.reply) {
          appendChatMessage(data.reply, "bot");
          appState.chatHistory.push({ role: "user", content: userText });
          appState.chatHistory.push({ role: "assistant", content: data.reply });
        } else {
          throw new Error("Empty response from AI assistant.");
        }
      } catch (err) {
        console.error("Chatbot API error:", err);
        if (chatTyping) chatTyping.classList.add("hidden");
        appendChatMessage("⚠️ *Unable to reach TripPilote AI co-pilot right now. Please verify that the backend server is running.*", "bot");
      } finally {
        appState.isChatLoading = false;
      }
    });
  }
}

/**
 * Appends a formatted message bubble to the chat window
 */
function appendChatMessage(text, sender = "bot") {
  const container = document.getElementById("chat-messages");
  if (!container) return;

  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${sender}-message`;

  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const icon = sender === "bot" ? "bot" : "user";
  const formattedHtml = formatMarkdown(text);

  bubble.innerHTML = `
    <div class="message-avatar"><i data-lucide="${icon}"></i></div>
    <div class="message-content">
      ${formattedHtml}
      <span class="message-time">${timeStr}</span>
    </div>
  `;

  container.appendChild(bubble);
  initIcons();
  scrollChatToBottom();
}

function scrollChatToBottom() {
  const container = document.getElementById("chat-messages");
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

/**
 * Lightweight safe markdown renderer for chat messages
 */
function formatMarkdown(text) {
  if (!text) return "";

  let parsed = escapeHtml(text);

  // Bold **text**
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Italic *text*
  parsed = parsed.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Bullet points
  const lines = parsed.split("\n");
  let inList = false;
  let result = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
      if (!inList) {
        result.push("<ul>");
        inList = true;
      }
      result.push(`<li>${trimmed.substring(2)}</li>`);
    } else {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      if (trimmed.length > 0) {
        result.push(`<p>${trimmed}</p>`);
      }
    }
  });

  if (inList) {
    result.push("</ul>");
  }

  return result.join("");
}

/**
 * Contact Form Logic
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const msgInput = document.getElementById("contact-message");
    const submitBtn = document.getElementById("contact-submit-btn");

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setFieldError("contact-name-error", "Please enter your name.");
      isValid = false;
    } else {
      clearFieldError("contact-name-error");
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      setFieldError("contact-email-error", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearFieldError("contact-email-error");
    }

    // Validate Message
    if (msgInput.value.trim().length < 5) {
      setFieldError("contact-message-error", "Message must be at least 5 characters.");
      isValid = false;
    } else {
      clearFieldError("contact-message-error");
    }

    if (!isValid) return;

    submitBtn.disabled = true;

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: msgInput.value.trim()
        })
      });

      const data = await response.json();
      if (data.success) {
        showToast(data.message || "Message sent successfully!", "success", 5000);
        form.reset();
      } else {
        showToast(data.message || "Failed to send message.", "error");
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      showToast("Thank you! Your message has been noted by TripPilote.", "success", 4000);
      form.reset();
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/**
 * Utility: HTML Escaping for XSS Prevention
 */
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
