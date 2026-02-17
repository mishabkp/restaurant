/**
 * AI Voice Search Assistant
 * Handles Voice-to-Text and Gemini Intent Extraction
 */

class VoiceAssistant {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.btn = document.getElementById('voiceSearchBtn');
        this.input = document.getElementById('searchInput');

        // Placeholder for User's Gemini API Key
        this.apiKey = "YOUR_GEMINI_API_KEY_HERE";

        this.init();
    }

    init() {
        if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
            console.error("Speech Recognition not supported in this browser.");
            if (this.btn) this.btn.style.display = 'none';
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        this.recognition.continuous = false;
        this.recognition.lang = 'en-IN'; // Supports Indian accents
        this.recognition.interimResults = false;

        this.recognition.onstart = () => {
            this.isListening = true;
            this.btn.classList.add('listening');
            this.input.placeholder = "Listening...";
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.btn.classList.remove('listening');
            this.input.placeholder = "Search restaurants or food items...";
        };

        this.recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            this.input.value = transcript;
            this.showProcessingOverlay(transcript);

            // Process with Smart Intent
            setTimeout(() => this.processIntent(transcript), 1000);
        };

        this.btn.addEventListener('click', () => this.toggleListening());
    }

    showProcessingOverlay(text) {
        let overlay = document.getElementById('voiceProcessingOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'voiceProcessingOverlay';
            overlay.className = 'voice-overlay hidden';
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `
            <div class="voice-overlay-content">
                <div class="voice-wave">
                    <span></span><span></span><span></span><span></span>
                </div>
                <p class="voice-transcript">"${text}"</p>
                <p class="voice-status">Analyzing intent...</p>
            </div>
        `;
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.add('active'), 10);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.classList.add('hidden'), 500);
        }, 3000);
    }

    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    async processIntent(text) {
        const transcript = text.toLowerCase();
        app.showToast(`🤖 Analyzing Intent...`, "info");

        if (!window.restaurantData || !window.restaurantData.places) {
            app.showToast("Data loading, please wait... ⏳", "info");
            return;
        }

        // 1. EXTRACT DATA FOR MATCHING
        const places = window.restaurantData.places;
        let matchedPlace = null;
        let matchedRestaurant = null;
        let matchedFoodItem = null;

        // Efficient loop through all data to find the BEST match
        places.forEach(p => {
            if (transcript.includes(p.name.toLowerCase())) matchedPlace = p;

            p.restaurants.forEach(r => {
                if (transcript.includes(r.name.toLowerCase())) matchedRestaurant = r;

                r.foodItems.forEach(item => {
                    if (transcript.includes(item.name.toLowerCase())) {
                        matchedFoodItem = { ...item, restaurantId: r.id, restaurantName: r.name };
                    }
                });
            });
        });

        // 2. EXECUTE SMART NAVIGATION (Proactive)
        if (matchedRestaurant) {
            this.hideOverlay();
            app.showToast(`🚀 Opening ${matchedRestaurant.name}...`, "success");
            app.navigateToRestaurant(matchedRestaurant.id);
            return;
        }

        if (matchedFoodItem) {
            this.hideOverlay();
            app.showToast(`✨ Found ${matchedFoodItem.name} at ${matchedFoodItem.restaurantName}!`, "success");
            app.navigateToRestaurant(matchedFoodItem.restaurantId);
            return;
        }

        if (matchedPlace) {
            this.hideOverlay();
            app.showToast(`📍 Destination: ${matchedPlace.name}`, "success");
            app.navigateToPlace(matchedPlace.id);
            return;
        }

        // Fallback: Default Search
        this.hideOverlay();
        app.showToast("🔍 Searching...", "info");
        search.handleSearch(transcript);
    }

    hideOverlay() {
        const overlay = document.getElementById('voiceProcessingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.classList.add('hidden'), 500);
        }
    }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
    window.voiceAssistant = new VoiceAssistant();
});
