// ========================================
// RESTAURANT NAVIGATOR - SEARCH FUNCTIONALITY
// ========================================

const search = {
    searchInput: null,
    searchResults: null,
    debounceTimer: null,

    // Initialize search
    init() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            this.searchInput.addEventListener('focus', (e) => {
                if (e.target.value) {
                    this.handleSearch(e.target.value);
                }
            });

            // Close search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                    this.hideResults();
                }
            });
        }
    },

    // Handle search with debouncing
    handleSearch(query) {
        clearTimeout(this.debounceTimer);

        if (!query || query.trim().length < 2) {
            this.hideResults();
            return;
        }

        this.debounceTimer = setTimeout(() => {
            this.performSearch(query.trim().toLowerCase());
        }, 300);
    },

    // Perform the actual search
    performSearch(query) {
        console.log('🔍 Performing Search for:', query);
        const results = [];

        // Wait for data to be loaded
        if (!window.restaurantData || !window.restaurantData.places) {
            console.warn('⚠️ Search: window.restaurantData not ready');
            if (this.searchResults) {
                this.searchResults.innerHTML = '<div class="no-results">Loading data...</div>';
                this.showResults();
            }
            return;
        }

        // Search through all places, restaurants, and food items
        window.restaurantData.places.forEach(place => {
            if (!place) return;

            // NEW: Check if place name matches
            if (place.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'place',
                    id: place.id,
                    title: `📍 ${place.name}`,
                    subtitle: `Explore ${place.restaurants?.length || 0} restaurants in ${place.name}`,
                    place: place
                });
            }

            if (!place.restaurants) return;

            place.restaurants.forEach(restaurant => {
                if (!restaurant) return;

                // Check if restaurant name matches
                if (restaurant.name.toLowerCase().includes(query)) {
                    results.push({
                        type: 'restaurant',
                        id: restaurant.id,
                        title: restaurant.name,
                        subtitle: `${restaurant.cuisine} • ${place.name}`,
                        place: place,
                        restaurant: restaurant
                    });
                }

                // Check if cuisine matches
                else if (restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(query)) {
                    results.push({
                        type: 'restaurant',
                        id: restaurant.id,
                        title: restaurant.name,
                        subtitle: `${restaurant.cuisine} • ${place.name}`,
                        place: place,
                        restaurant: restaurant
                    });
                }

                // Search through food items
                if (restaurant.foodItems) {
                    restaurant.foodItems.forEach(item => {
                        if (!item) return;
                        if (item.name.toLowerCase().includes(query) ||
                            (item.description && item.description.toLowerCase().includes(query)) ||
                            (item.category && item.category.toLowerCase().includes(query))) {
                            results.push({
                                type: 'food',
                                id: `${restaurant.id}-${item.name}`,
                                title: item.name,
                                subtitle: `${item.category} • ${restaurant.name} • ${place.name}`,
                                price: item.price,
                                place: place,
                                restaurant: restaurant,
                                foodItem: item
                            });
                        }
                    });
                }
            });
        });

        // Limit results and display
        this.displayResults(results.slice(0, 10));
    },

    // Display search results
    displayResults(results) {
        console.log('🔍 Displaying Search Results:', results.length);
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="no-results">No matches found for your query.</div>';
            this.showResults();
            return;
        }

        const html = results.map(result => {
            if (result.type === 'place') {
                return `
                  <div class="search-result-item" onclick="search.navigateToResult('${result.place.id}', 'place')">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-subtitle">${result.subtitle}</div>
                  </div>
                `;
            }

            const clickAction = `search.navigateToResult(${result.restaurant.id}, 'restaurant')`;
            if (result.type === 'restaurant') {
                return `
                  <div class="search-result-item" onclick="${clickAction}">
                    <div class="search-result-title">🍴 ${result.title}</div>
                    <div class="search-result-subtitle">${result.subtitle}</div>
                  </div>
                `;
            } else {
                return `
                  <div class="search-result-item" onclick="${clickAction}">
                    <div class="search-result-title">🍽️ ${result.title} <span style="color: var(--accent-color); font-size: 0.9rem;">${result.price}</span></div>
                    <div class="search-result-subtitle">${result.subtitle}</div>
                  </div>
                `;
            }
        }).join('');

        this.searchResults.innerHTML = html;
        this.showResults();
    },

    // Navigate to search result
    navigateToResult(id, type) {
        console.log('🚀 Navigating to:', type, id);
        this.hideResults();
        this.searchInput.value = '';

        if (type === 'place') {
            app.navigateToPlace(id);
        } else {
            app.navigateToRestaurant(id);
        }
    },

    // Show search results
    showResults() {
        this.searchResults.classList.remove('hidden');
    },

    // Hide search results
    hideResults() {
        this.searchResults.classList.add('hidden');
    }
};

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => search.init());
} else {
    search.init();
}
