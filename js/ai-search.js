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
            app.showToast(`🎤 Recognized: "${transcript}"`);

            // Step 2: Process with Gemini for Smart Intent
            await this.processIntent(transcript);
        };

        this.btn.addEventListener('click', () => this.toggleListening());
    }

    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    async processIntent(text) {
        if (!this.apiKey || this.apiKey === "YOUR_GEMINI_API_KEY_HERE") {
            // Fallback to basic search if no API key
            console.log("No Gemini API key found, using basic search.");
            search.handleSearch(this.input.value);
            return;
        }

        app.showToast("🤖 AI is analyzing your request...");

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Analyze this restaurant search query: "${text}". 
                            Extract only the main search term (dish or restaurant name) and the location if mentioned.
                            Return ONLY a JSON object like {"term": "biryani", "location": "kochi"}. 
                            If no location, leave it null.`
                        }]
                    }]
                })
            });

            const data = await response.json();
            const resultText = data.candidates[0].content.parts[0].text;
            const intent = JSON.parse(resultText.replace(/```json|```/g, ''));

            if (intent.term) {
                this.input.value = intent.term + (intent.location ? ` in ${intent.location}` : "");
                search.handleSearch(this.input.value);
            }
        } catch (error) {
            console.error("Gemini Error:", error);
            // Fallback
            window.searchManager.handleSearch({ target: this.input });
        }
    }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
    window.voiceAssistant = new VoiceAssistant();
});
