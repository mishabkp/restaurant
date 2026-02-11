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
        const results = [];

        // Wait for data to be loaded
        if (!window.restaurantData || !window.restaurantData.places) {
            this.searchResults.innerHTML = '<div class="no-results">Loading data...</div>';
            this.showResults();
            return;
        }

        // Search through all places, restaurants, and food items
        window.restaurantData.places.forEach(place => {
            place.restaurants.forEach(restaurant => {
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
                if (restaurant.cuisine.toLowerCase().includes(query)) {
                    if (!results.find(r => r.id === restaurant.id && r.type === 'restaurant')) {
                        results.push({
                            type: 'restaurant',
                            id: restaurant.id,
                            title: restaurant.name,
                            subtitle: `${restaurant.cuisine} • ${place.name}`,
                            place: place,
                            restaurant: restaurant
                        });
                    }
                }

                // Search through food items
                restaurant.foodItems.forEach(item => {
                    if (item.name.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query) ||
                        item.category.toLowerCase().includes(query)) {
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
            });
        });

        // Limit results to 10 for better performance
        this.displayResults(results.slice(0, 10));
    },

    // Display search results
    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="no-results">No results found</div>';
            this.showResults();
            return;
        }

        const html = results.map(result => {
            if (result.type === 'restaurant') {
                return `
          <div class="search-result-item" onclick="search.navigateToResult(${result.restaurant.id}, 'restaurant')">
            <div class="search-result-title">🍴 ${result.title}</div>
            <div class="search-result-subtitle">${result.subtitle}</div>
          </div>
        `;
            } else {
                return `
          <div class="search-result-item" onclick="search.navigateToResult(${result.restaurant.id}, 'food')">
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
    navigateToResult(restaurantId, type) {
        this.hideResults();
        this.searchInput.value = '';
        app.navigateToRestaurant(restaurantId);
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
