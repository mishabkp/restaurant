// ========================================
// RESTAURANT NAVIGATOR - APPLICATION LOGIC
// ========================================

const app = {
  currentView: 'home',
  currentPlace: null,
  currentRestaurant: null,
  currentCategory: 'all',

  // Initialize the application
  init() {
    this.setupEventListeners();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
  },

  // Setup event listeners
  setupEventListeners() {
    // Search functionality will be handled by search.js
  },

  // Handle routing based on URL hash
  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const parts = hash.split('/').filter(p => p);

    if (parts.length === 0) {
      this.showHomePage();
    } else if (parts[0] === 'place' && parts[1]) {
      this.showPlacePage(parseInt(parts[1]));
    } else if (parts[0] === 'restaurant' && parts[1]) {
      this.showRestaurantPage(parseInt(parts[1]));
    } else {
      this.showHomePage();
    }
  },

  // Navigate to home
  navigateHome() {
    window.location.hash = '/';
  },

  // Navigate to place
  navigateToPlace(placeId) {
    window.location.hash = `/place/${placeId}`;
  },

  // Navigate to restaurant
  navigateToRestaurant(restaurantId) {
    window.location.hash = `/restaurant/${restaurantId}`;
  },

  // Show home page with all places
  showHomePage() {
    this.currentView = 'home';
    this.currentPlace = null;
    this.currentRestaurant = null;
    this.updateBreadcrumb([{ label: 'Home', onClick: () => this.navigateHome() }]);

    const content = `
      <h1 class="page-title">Discover Kerala's Best Restaurants</h1>
      <p class="page-subtitle">Choose a location to explore amazing dining experiences</p>
      
      <div class="places-grid">
        ${restaurantData.places.map((place, index) => `
          <div class="place-card" onclick="app.navigateToPlace(${place.id})" style="animation-delay: ${index * 0.1}s">
            <div class="card-image" style="background-image: url('${place.image}'); background-size: cover; background-position: center;"></div>
            <div class="card-content">
              <h2 class="card-title">${place.name}</h2>
              <p class="card-description">${place.description}</p>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">
                ${place.restaurants.length} Restaurants
              </p>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('mainContent').innerHTML = content;
  },

  // Show place page with restaurants
  showPlacePage(placeId) {
    const place = restaurantData.places.find(p => p.id === placeId);

    if (!place) {
      this.showHomePage();
      return;
    }

    this.currentView = 'place';
    this.currentPlace = place;
    this.currentRestaurant = null;

    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: place.name }
    ]);

    const content = `
      <h1 class="page-title">Restaurants in ${place.name}</h1>
      <p class="page-subtitle">${place.description}</p>
      
      <div class="restaurants-grid">
        ${place.restaurants.map((restaurant, index) => `
          <div class="restaurant-card" onclick="app.navigateToRestaurant(${restaurant.id})" style="animation-delay: ${index * 0.1}s">
            <div class="card-image" style="background-image: url('${restaurant.image}'); background-size: cover; background-position: center;"></div>
            <div class="card-content">
              <h2 class="card-title">${restaurant.name}</h2>
              <p class="card-cuisine">${restaurant.cuisine}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                <span class="card-rating">
                  <span class="star-icon">⭐</span>
                  ${restaurant.rating}
                </span>
                <span style="color: var(--text-muted); font-size: 0.9rem;">
                  ${restaurant.foodItems.length} Items
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    document.getElementById('mainContent').innerHTML = content;
  },

  // Show restaurant page with menu
  showRestaurantPage(restaurantId) {
    let restaurant = null;
    let place = null;

    // Find the restaurant across all places
    for (const p of restaurantData.places) {
      const r = p.restaurants.find(r => r.id === restaurantId);
      if (r) {
        restaurant = r;
        place = p;
        break;
      }
    }

    if (!restaurant || !place) {
      this.showHomePage();
      return;
    }

    this.currentView = 'restaurant';
    this.currentRestaurant = restaurant;
    this.currentPlace = place;
    this.currentCategory = 'all';

    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: place.name, onClick: () => this.navigateToPlace(place.id) },
      { label: restaurant.name }
    ]);

    this.renderRestaurantPage(restaurant);
  },

  // Render restaurant page
  renderRestaurantPage(restaurant) {
    const categories = ['All Items', 'Starters', 'Main Course', 'Desserts'];

    const content = `
      <div class="restaurant-header">
        <h1 class="restaurant-name">${restaurant.name}</h1>
        <div class="restaurant-info">
          <span class="info-badge">
            <span>🍴</span>
            ${restaurant.cuisine}
          </span>
          <span class="info-badge">
            <span class="star-icon">⭐</span>
            ${restaurant.rating} Rating
          </span>
          <span class="info-badge">
            <span>📋</span>
            ${restaurant.foodItems.length} Items
          </span>
        </div>
      </div>

      <div class="category-tabs">
        ${categories.map(category => {
      const categoryKey = category === 'All Items' ? 'all' : category;
      const isActive = this.currentCategory === categoryKey || (this.currentCategory === 'all' && category === 'All Items');
      return `
            <button class="category-tab ${isActive ? 'active' : ''}" 
                    onclick="app.filterByCategory('${categoryKey}')">
              ${category}
            </button>
          `;
    }).join('')}
      </div>

      <div class="food-items" id="foodItemsContainer">
        ${this.renderFoodItems(restaurant)}
      </div>
    `;

    document.getElementById('mainContent').innerHTML = content;
  },

  // Render food items based on current category
  renderFoodItems(restaurant) {
    const items = this.currentCategory === 'all'
      ? restaurant.foodItems
      : restaurant.foodItems.filter(item => item.category === this.currentCategory);

    if (items.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-state-icon">🍽️</div>
          <p class="empty-state-text">No items found in this category</p>
        </div>
      `;
    }

    return items.map((item, index) => `
      <div class="food-item" style="animation-delay: ${index * 0.05}s">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" class="food-item-image" loading="lazy">` : ''}
        <div class="food-item-content">
          <h3 class="food-item-name">${item.name}</h3>
          <p class="food-item-description">${item.description}</p>
          <span class="food-item-category">${item.category}</span>
        </div>
        <div class="food-item-price">${item.price}</div>
      </div>
    `).join('');
  },

  // Filter food items by category
  filterByCategory(category) {
    this.currentCategory = category;

    if (this.currentRestaurant) {
      // Update only the food items and category tabs
      const categoryTabs = document.querySelectorAll('.category-tab');
      categoryTabs.forEach(tab => {
        const tabCategory = tab.textContent.trim() === 'All Items' ? 'all' : tab.textContent.trim();
        if (tabCategory === category) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      const foodItemsContainer = document.getElementById('foodItemsContainer');
      foodItemsContainer.innerHTML = this.renderFoodItems(this.currentRestaurant);
    }
  },

  // Update breadcrumb navigation
  updateBreadcrumb(items) {
    const breadcrumb = document.getElementById('breadcrumb');

    const html = items.map((item, index) => {
      const isLast = index === items.length - 1;
      const clickable = item.onClick ? `onclick="${item.onClick.toString().replace(/"/g, '&quot;')}"` : '';

      if (isLast) {
        return `<span class="breadcrumb-item">${item.label}</span>`;
      } else {
        return `
          <span class="breadcrumb-item" ${item.onClick ? `onclick="app.${item.onClick.name}(${item.onClick.toString().match(/\d+/)?.[0] || ''})"` : ''}>${item.label}</span>
          <span class="breadcrumb-separator">›</span>
        `;
      }
    }).join('');

    breadcrumb.innerHTML = html;
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
