// ========================================
// RESTAURANT NAVIGATOR - APPLICATION LOGIC
// ========================================

const app = {
  currentView: 'home',
  currentPlace: null,
  currentRestaurant: null,
  currentCategory: 'all',
  isLoggedIn: false,
  favorites: {
    restaurants: [],
    items: []
  },
  cart: [],
  theme: 'dark',
  currentFilters: {
    place: 'all',
    restaurant: 'all'
  },

  // Initialize the application
  init() {
    this.initTheme();
    this.checkAuth();
    this.loadFavorites();
    this.loadCart();
    this.setupEventListeners();
    this.handleRoute();
    this.initModalEvents();
    window.addEventListener('hashchange', () => this.handleRoute());
  },

  initModalEvents() {
    const modal = document.getElementById('foodModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
    }

    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
      cartSidebar.addEventListener('click', (e) => {
        if (e.target === cartSidebar) this.toggleCart();
      });
    }

    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
      checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) this.closeCheckout();
      });
    }
  },

  animateFlyToCart(btn, imageUrl) {
    if (!imageUrl) return;

    const cartIcon = document.querySelector('.cart-toggle-btn');
    if (!cartIcon) return;

    const btnRect = btn.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyer = document.createElement('img');
    flyer.src = imageUrl;
    flyer.className = 'flying-item';
    flyer.style.left = `${btnRect.left}px`;
    flyer.style.top = `${btnRect.top}px`;
    document.body.appendChild(flyer);

    // Animate to cart
    flyer.animate([
      { left: `${btnRect.left}px`, top: `${btnRect.top}px`, transform: 'scale(1) rotate(0deg)', opacity: 1 },
      { left: `${cartRect.left}px`, top: `${cartRect.top}px`, transform: 'scale(0.1) rotate(360deg)', opacity: 0 }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
      fill: 'forwards'
    }).onfinish = () => {
      flyer.remove();
      cartIcon.classList.add('cart-bump');
      setTimeout(() => cartIcon.classList.remove('cart-bump'), 400);
    };
  },

  initTheme() {
    this.theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
  },

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.innerHTML = this.theme === 'dark' ? '🌓' : '☀️';
    }
  },

  checkAuth() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  },

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites = JSON.parse(saved);
    }
  },

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  },

  // Cart Management
  loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cart = JSON.parse(saved);
      this.updateCartUI();
    }
  },

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartUI();
  },

  toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
      if (!sidebar.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  },

  addToCart(restaurantId, itemName, event) {
    let restaurant;
    restaurantData.places.forEach(place => {
      const found = place.restaurants.find(r => r.id === restaurantId);
      if (found) restaurant = found;
    });

    if (!restaurant) return;
    const item = restaurant.foodItems.find(i => i.name === itemName);
    if (!item) return;

    const cartId = `${restaurantId}-${itemName.replace(/\s+/g, '_')}`;
    const existing = this.cart.find(c => c.cartId === cartId);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        cartId,
        restaurantId,
        restaurantName: restaurant.name,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }

    this.saveCart();
    this.showToast(`Added ${item.name} to cart! 🛒`);

    // Trigger fly animation
    const btn = event?.currentTarget;
    if (btn) {
      this.animateFlyToCart(btn, item.image);
    }
  },

  removeFromCart(cartId) {
    this.cart = this.cart.filter(c => c.cartId !== cartId);
    this.saveCart();
  },

  changeQuantity(cartId, delta) {
    const item = this.cart.find(c => c.cartId === cartId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeFromCart(cartId);
      } else {
        this.saveCart();
      }
    }
  },

  updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const itemsContainer = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);

    if (badge) {
      badge.innerHTML = totalCount;
      badge.classList.toggle('hidden', totalCount === 0);
    }

    if (!itemsContainer) return;

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🛒</div>
          <p class="empty-state-text">Your cart is empty</p>
          <button class="submit-btn" style="margin-top: 1rem;" onclick="app.toggleCart()">Go Shopping</button>
        </div>
      `;
      summary.classList.add('hidden');
      return;
    }

    itemsContainer.innerHTML = this.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-rest">${item.restaurantName}</p>
          <div class="cart-item-controls">
            <div class="quantity-btns">
              <button class="qty-btn" onclick="app.changeQuantity('${item.cartId}', -1)">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="app.changeQuantity('${item.cartId}', 1)">+</button>
            </div>
            <span class="cart-item-price">${item.price}</span>
          </div>
        </div>
      </div>
    `).join('');

    summary.classList.remove('hidden');

    // Parse prices (e.g., "₹250") and calculate total
    const subtotal = this.cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return sum + (price * item.quantity);
    }, 0);

    document.getElementById('cartSubtotal').innerHTML = `₹${subtotal}`;
    document.getElementById('cartTotal').innerHTML = `₹${subtotal}`;
  },

  showToast(message) {
    // Simple toast notification simulation
    const toast = document.createElement('div');
    toast.className = 'toast-notification fade-in';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary-gradient);
      color: white;
      padding: 1rem 2rem;
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-glow);
      z-index: 5000;
      font-weight: 600;
    `;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('fade-in');
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  },

  // Setup event listeners
  setupEventListeners() {
    // Search functionality handled by search.js logic
  },

  // Handle routing based on URL hash
  handleRoute() {
    if (!this.isLoggedIn) {
      this.showLoginPage();
      return;
    }

    const hash = window.location.hash.slice(1) || '/';
    const parts = hash.split('/').filter(p => p);

    // Skeleton Simulation
    let type = 'home';
    if (parts[0] === 'place') type = 'place';
    if (parts[0] === 'restaurant') type = 'restaurant';

    this.showSkeletons(type);

    // Small delay for professional feel (Zomato/Swiggy style)
    setTimeout(() => {
      if (parts.length === 0) {
        this.showHomePage();
      } else if (parts[0] === 'place' && parts[1]) {
        this.showPlacePage(parseInt(parts[1]));
      } else if (parts[0] === 'restaurant' && parts[1]) {
        this.showRestaurantPage(parseInt(parts[1]));
      } else if (parts[0] === 'dashboard') {
        this.showDashboardPage();
      } else if (parts[0] === 'about') {
        this.showAboutPage();
      } else if (parts[0] === 'contact') {
        this.showContactPage();
      } else {
        this.showHomePage();
      }
    }, 400);
  },

  // Navigate methods
  navigateHome() {
    window.location.hash = '/';
  },

  navigateToPlace(placeId) {
    window.location.hash = `/place/${placeId}`;
  },

  navigateToRestaurant(restaurantId) {
    window.location.hash = `/restaurant/${restaurantId}`;
  },

  // Page Rendering Methods
  showHomePage() {
    this.currentView = 'home';
    this.currentPlace = null;
    this.currentRestaurant = null;
    this.updateBreadcrumb([{ label: 'Home', onClick: () => this.navigateHome() }]);

    // Filter featured restaurants
    const featured = [];
    restaurantData.places.forEach(p => {
      p.restaurants.forEach(r => {
        if (r.isFeatured) featured.push(r);
      });
    });

    const content = `
      <div class="featured-section">
        <h2 class="section-title">✨ Today's Featured Spots</h2>
        <div class="carousel-container" id="featuredCarousel">
          ${this.renderFeaturedCarousel(featured)}
        </div>
      </div>

      ${this.renderMoodPicker()}

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
    this.initCarouselDrag();
    this.initCardTilt();
  },

  renderFeaturedCarousel(featured) {
    return featured.map(r => `
      <div class="carousel-card" onclick="app.navigateToRestaurant(${r.id})">
        <img src="${r.image}" alt="${r.name}" class="carousel-img">
        <div class="carousel-content">
          <h3 class="card-title">${r.name}</h3>
          <p class="card-cuisine">${r.cuisine}</p>
          <div style="margin-top: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
            <span class="card-rating">⭐ ${r.rating}</span>
            <span class="tag-badge">Featured</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderMoodPicker() {
    return `
      <div class="mood-picker-section">
        <h2 class="mood-title">What's your food mood? 🍽️</h2>
        <p style="color: var(--text-secondary);">Tell us how you feel, and we'll suggest the perfect meal!</p>
        
        <div class="mood-grid">
          <div class="mood-option" onclick="app.handleMoodSelection('spicy')">
            <span class="mood-emoji">🔥</span>
            <span class="mood-label">Feeling Spicy</span>
          </div>
          <div class="mood-option" onclick="app.handleMoodSelection('light')">
            <span class="mood-emoji">🥗</span>
            <span class="mood-label">Light & Fresh</span>
          </div>
          <div class="mood-option" onclick="app.handleMoodSelection('sweet')">
            <span class="mood-emoji">🍰</span>
            <span class="mood-label">Sweet Tooth</span>
          </div>
          <div class="mood-option" onclick="app.handleMoodSelection('traditional')">
            <span class="mood-emoji">🏺</span>
            <span class="mood-label">Traditional</span>
          </div>
          <div class="mood-option" onclick="app.handleMoodSelection('comfort')">
            <span class="mood-emoji">🍲</span>
            <span class="mood-label">Comfort Food</span>
          </div>
        </div>
        
        <div id="moodSuggestions" class="suggestion-overlay hidden"></div>
      </div>
    `;
  },

  handleMoodSelection(mood) {
    const container = document.getElementById('moodSuggestions');
    container.classList.remove('hidden');
    container.innerHTML = `<div class="skeleton" style="height: 100px; border-radius: 20px;"></div>`;

    setTimeout(() => {
      let suggestions = [];
      restaurantData.places.forEach(p => {
        p.restaurants.forEach(r => {
          r.foodItems.forEach(item => {
            if (mood === 'spicy' && (item.name.toLowerCase().includes('biryani') || item.name.toLowerCase().includes('chilly'))) {
              suggestions.push({ ...item, restaurantId: r.id });
            } else if (mood === 'light' && (item.category === 'Starters' || item.isVeg)) {
              suggestions.push({ ...item, restaurantId: r.id });
            } else if (mood === 'sweet' && item.category === 'Desserts') {
              suggestions.push({ ...item, restaurantId: r.id });
            } else if (mood === 'traditional' && (p.name === 'Kochi' || item.name.toLowerCase().includes('sadya') || item.name.toLowerCase().includes('fish'))) {
              suggestions.push({ ...item, restaurantId: r.id });
            } else if (mood === 'comfort' && (item.category === 'Main Course')) {
              suggestions.push({ ...item, restaurantId: r.id });
            }
          });
        });
      });

      // Filter unique items and pick random 3
      suggestions = suggestions.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);
      const shuffled = suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);

      container.innerHTML = `
        <h3 style="margin: 2rem 0 1rem; color: var(--text-primary);">Chef's Recommendations for you:</h3>
        <div class="food-items">
          ${shuffled.map(item => `
            <div class="food-item fade-in" onclick="app.showFoodModal(${item.restaurantId}, '${item.name.replace(/'/g, "\\'")}')">
              <div class="food-item-image-container">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="food-item-image">` : ''}
                <div class="food-item-price-tag">${item.price}</div>
                <button class="fav-btn small overlay-fav" onclick="event.stopPropagation();">❤️</button>
              </div>
              <div class="food-item-content">
                <h3 class="food-item-name">${item.name}</h3>
                <p class="food-item-description">Perfect for your mood!</p>
                <div class="food-item-footer">
                  <span class="food-item-category">${item.category}</span>
                  <button class="add-to-cart-btn" onclick="event.stopPropagation(); app.addToCart(${item.restaurantId}, '${item.name.replace(/'/g, "\\'")}', event)">
                    <span>Add</span> 🛒
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }, 600);
  },

  initCardTilt() {
    // 3D Card Tilt interaction
    const cards = document.querySelectorAll('.place-card, .restaurant-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

        // Light reflection (CSS variable)
        const lightX = (x / rect.width) * 100;
        const lightY = (y / rect.height) * 100;
        card.style.setProperty('--light-x', `${lightX}%`);
        card.style.setProperty('--light-y', `${lightY}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      });
    });
  },

  initCarouselDrag() {
    const slider = document.getElementById('featuredCarousel');
    if (!slider) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  },

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
      
      <div class="filter-bar">
        <button class="filter-btn ${this.currentFilters.place === 'all' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'all')">All</button>
        <button class="filter-btn ${this.currentFilters.place === 'top' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'top')">⭐ Top Rated</button>
        <button class="filter-btn ${this.currentFilters.place === 'Traditional' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'Traditional')">🏺 Traditional</button>
        <button class="filter-btn ${this.currentFilters.place === 'Modern' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'Modern')">🏙️ Modern</button>
        <button class="filter-btn ${this.currentFilters.place === 'Seafood' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'Seafood')">🐟 Seafood</button>
      </div>

      <div class="restaurants-grid" id="restaurantsGrid">
        ${this.renderRestaurants(place.restaurants)}
      </div>
    `;

    document.getElementById('mainContent').innerHTML = content;
  },

  renderRestaurants(restaurants) {
    if (restaurants.length === 0) {
      return `<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No restaurants found matching your filter.</p>`;
    }

    return restaurants.map((restaurant, index) => {
      const isFav = this.favorites.restaurants.includes(restaurant.id);
      return `
        <div class="restaurant-card" style="animation-delay: ${index * 0.1}s">
          <div class="card-image" onclick="app.navigateToRestaurant(${restaurant.id})" style="background-image: url('${restaurant.image}'); background-size: cover; background-position: center;">
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); app.toggleFavorite(${restaurant.id}, 'restaurant', this)">
              ❤️
            </button>
          </div>
          <div class="card-content" onclick="app.navigateToRestaurant(${restaurant.id})">
            <h2 class="card-title">${restaurant.name}</h2>
            <p class="card-cuisine">${restaurant.cuisine}</p>
            <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.3rem;">
              ${(restaurant.tags || []).map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
            </div>
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
      `;
    }).join('');
  },

  showRestaurantPage(restaurantId) {
    let restaurant = null;
    let place = null;

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

    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: place.name, onClick: () => this.navigateToPlace(place.id) },
      { label: restaurant.name }
    ]);

    this.renderRestaurantPage(restaurant);
  },

  renderRestaurantPage(restaurant) {
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
          <span class="info-badge" style="cursor: pointer; background: var(--accent-gradient); color: white;" onclick="app.openBookingModal(${restaurant.id})">
            <span>📅</span>
            Book a Table
          </span>
        </div>
      </div>

      <div class="filter-bar">
        <button class="filter-btn ${this.currentFilters.restaurant === 'all' ? 'active' : ''}" onclick="app.applyRestaurantFilter(${restaurant.id}, 'all')">Full Menu</button>
        <button class="filter-btn ${this.currentFilters.restaurant === 'veg' ? 'active' : ''}" onclick="app.applyRestaurantFilter(${restaurant.id}, 'veg')">🥦 Veg Only</button>
        <button class="filter-btn ${this.currentFilters.restaurant === 'Starters' ? 'active' : ''}" onclick="app.applyRestaurantFilter(${restaurant.id}, 'Starters')">🥟 Starters</button>
        <button class="filter-btn ${this.currentFilters.restaurant === 'Main Course' ? 'active' : ''}" onclick="app.applyRestaurantFilter(${restaurant.id}, 'Main Course')">🥘 Main Course</button>
        <button class="filter-btn ${this.currentFilters.restaurant === 'Desserts' ? 'active' : ''}" onclick="app.applyRestaurantFilter(${restaurant.id}, 'Desserts')">🍰 Desserts</button>
      </div>

      <div class="food-items" id="foodItemsContainer">
        ${this.renderFoodItems(restaurant)}
      </div>

      <div class="reviews-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xl);">
          <h2 class="section-title" style="margin-bottom: 0;">Customer Reviews</h2>
          <span style="color: var(--text-muted); font-weight: 600;">⭐ ${restaurant.rating} Average</span>
        </div>
        
        <button class="add-review-btn" onclick="app.openReviewModal(${restaurant.id})">
          + Write a public review for ${restaurant.name}
        </button>

        <div id="reviewsList">
          ${this.renderReviews(restaurant.reviews || [])}
        </div>
      </div>
`;

    document.getElementById('mainContent').innerHTML = content;
  },

  renderReviews(reviews) {
    if (reviews.length === 0) {
      return `
        <div class="empty-state" style="padding: 2rem;">
          <p class="empty-state-text">No reviews yet. Be the first to review!</p>
        </div>
      `;
    }

    return reviews.map(r => `
      <div class="review-card fade-in">
        <div class="review-header">
          <span class="review-user">${r.user}</span>
          <span class="review-date">${r.date}</span>
        </div>
        <div class="review-stars">${'⭐'.repeat(r.rating)}</div>
        <p class="review-comment">${r.comment}</p>
      </div>
    `).reverse().join('');
  },

  openReviewModal(restaurantId) {
    const modal = document.getElementById('checkoutModal'); // Reusing checkout modal structure for review
    const body = document.getElementById('checkoutBody');

    body.innerHTML = `
      <h2 class="checkout-title">Rate your experience</h2>
      <p style="text-align: center; color: var(--text-muted); margin-bottom: 1rem;">How was your dinner at this restaurant?</p>
      
      <div class="star-rating-input">
        <input type="radio" id="star5" name="rating" value="5"><label for="star5">★</label>
        <input type="radio" id="star4" name="rating" value="4"><label for="star4">★</label>
        <input type="radio" id="star3" name="rating" value="3"><label for="star3">★</label>
        <input type="radio" id="star2" name="rating" value="2"><label for="star2">★</label>
        <input type="radio" id="star1" name="rating" value="1"><label for="star1">★</label>
      </div>

      <div class="checkout-form">
        <textarea id="reviewComment" class="search-input" style="padding-left: 1rem; height: 120px; padding-top: 1rem;" placeholder="Tell us what you liked or disliked..."></textarea>
        <button class="checkout-btn" onclick="app.submitReview(${restaurantId})">Publish Review</button>
      </div>
    `;
    modal.classList.remove('hidden');
  },

  submitReview(restaurantId) {
    const comment = document.getElementById('reviewComment').value;
    const ratingEl = document.querySelector('input[name="rating"]:checked');

    if (!ratingEl || !comment) {
      this.showToast('Please provide a rating and comment! ⚠️');
      return;
    }

    const rating = parseInt(ratingEl.value);

    // Find restaurant and add review
    for (let place of restaurantData.places) {
      const rest = place.restaurants.find(r => r.id === restaurantId);
      if (rest) {
        if (!rest.reviews) rest.reviews = [];
        rest.reviews.push({
          user: "You",
          rating: rating,
          comment: comment,
          date: "Just now"
        });

        // Refresh UI
        document.getElementById('reviewsList').innerHTML = this.renderReviews(rest.reviews);
        break;
      }
    }

    this.closeCheckout();
    this.showToast('Thank you! Your review has been published. ✨');
  },

  showSkeletons(type) {
    const container = document.getElementById('mainContent');
    let skeletonHtml = '';

    if (type === 'home') {
      skeletonHtml = `
        <div class="skeleton-title skeleton"></div>
        <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
          <div class="skeleton" style="flex: 0 0 300px; height: 250px;"></div>
          <div class="skeleton" style="flex: 0 0 300px; height: 250px;"></div>
        </div>
        <div class="skeleton-title skeleton"></div>
        <div class="places-grid">
          ${Array(4).fill('<div class="skeleton" style="height: 300px;"></div>').join('')}
        </div>
      `;
    } else if (type === 'place' || type === 'restaurant') {
      skeletonHtml = `
        <div class="skeleton-title skeleton" style="width: 40%;"></div>
        <div class="skeleton-text skeleton" style="width: 80%;"></div>
        <div style="display: flex; gap: 1rem; margin: 2rem 0;">
          ${Array(4).fill('<div class="skeleton" style="width: 80px; height: 40px; border-radius: 20px;"></div>').join('')}
        </div>
        <div class="restaurants-grid">
          ${Array(6).fill('<div class="skeleton" style="height: 250px;"></div>').join('')}
        </div>
      `;
    }

    container.innerHTML = skeletonHtml;
  },

  renderFoodItems(restaurant) {
    let items = restaurant.foodItems;

    if (this.currentFilters.restaurant === 'veg') {
      items = items.filter(item => item.isVeg);
    } else if (this.currentFilters.restaurant !== 'all') {
      items = items.filter(item => item.category === this.currentFilters.restaurant);
    }

    if (items.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-state-icon">🍽️</div>
          <p class="empty-state-text">No items found matching your filter</p>
        </div>
      `;
    }

    return items.map((item, index) => {
      const itemId = `${restaurant.id}-${item.name.replace(/\s+/g, '_')}`;
      const isFav = this.favorites.items.includes(itemId);
      return `
        <div class="food-item" style="animation-delay: ${index * 0.05}s" onclick="app.showFoodModal(${restaurant.id}, '${item.name.replace(/'/g, "\\'")}')">
          <div class="food-item-image-container">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="food-item-image" loading="lazy">` : ''}
            <div class="food-item-price-tag">${item.price}</div>
            <button class="fav-btn small overlay-fav ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); app.toggleFavorite('${itemId}', 'item', this)">
              ❤️
            </button>
          </div>
          <div class="food-item-content">
            <h3 class="food-item-name">${item.name}</h3>
            <p class="food-item-description">${item.description}</p>
            <div class="food-item-footer">
              <span class="food-item-category">${item.category}</span>
              <button class="add-to-cart-btn" onclick="event.stopPropagation(); app.addToCart(${restaurant.id}, '${item.name.replace(/'/g, "\\'")}', event)">
                <span>Add</span> 🛒
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // State Management & Utilities
  updateBreadcrumb(items) {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;

    const html = items.map((item, index) => {
      const isLast = index === items.length - 1;
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
  },

  showLoginPage() {
    document.querySelector('.header').classList.add('hidden');
    document.querySelector('.footer').classList.add('hidden');

    const content = `
      <div class="login-page">
        <div class="login-card">
          <div class="login-header">
            <h1 class="login-logo">🍽️ Navigator</h1>
            <p class="login-subtitle">Sign in to explore Kerala's flavors</p>
          </div>
          <form class="login-form" onsubmit="app.handleLogin(event)">
            <div class="form-group">
              <label class="form-label">Username</label>
              <input type="text" class="login-input" placeholder="Enter your username" required id="usernameInput">
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="login-input" placeholder="••••••••" required id="passwordInput">
            </div>
            <button type="submit" class="login-button">Sign In</button>
          </form>
          <div class="login-footer">
            <p>Don't have an account? <a href="#" class="footer-link">Register Now</a></p>
          </div>
        </div>
      </div>
    `;
    document.getElementById('mainContent').innerHTML = content;
  },

  handleLogin(event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = true;
    document.querySelector('.header').classList.remove('hidden');
    document.querySelector('.footer').classList.remove('hidden');
    this.handleRoute();
  },

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    window.location.hash = '/';
    this.handleRoute();
  },

  toggleFavorite(id, type, btn) {
    const list = type === 'restaurant' ? this.favorites.restaurants : this.favorites.items;
    const index = list.indexOf(id);

    if (index === -1) {
      list.push(id);
      btn.classList.add('active');
    } else {
      list.splice(index, 1);
      btn.classList.remove('active');
    }
    this.saveFavorites();
  },

  showDashboardPage() {
    this.currentView = 'dashboard';
    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: 'My Dashboard' }
    ]);

    const favRestaurants = [];
    restaurantData.places.forEach(place => {
      place.restaurants.forEach(rest => {
        if (this.favorites.restaurants.includes(rest.id)) {
          favRestaurants.push(rest);
        }
      });
    });

    const content = `
      <h1 class="page-title">Welcome Back! 👋</h1>
      <p class="page-subtitle">Manage your favorite spots and personal settings</p>
      
      ${this.renderUserStats()}

      <div class="dashboard-grid">
        <div class="dashboard-section main-content">
          <h2 class="section-title">❤️ Favorite Restaurants</h2>
          ${favRestaurants.length > 0 ? `
            <div class="restaurants-grid">
              ${favRestaurants.map((restaurant, index) => `
                <div class="restaurant-card" onclick="app.navigateToRestaurant(${restaurant.id})" style="animation-delay: ${index * 0.1}s">
                  <div class="card-image" style="background-image: url('${restaurant.image}'); background-size: cover; background-position: center;"></div>
                  <div class="card-content">
                    <h2 class="card-title">${restaurant.name}</h2>
                    <p class="card-cuisine">${restaurant.cuisine}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                      <span class="card-rating"><span class="star-icon">⭐</span> ${restaurant.rating}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-state-icon">🍽️</div>
              <p class="empty-state-text">You haven't added any favorites yet.</p>
            </div>
          `}
        </div>

        <div class="dashboard-section settings-sidebar">
          <h2 class="section-title">⚙️ Settings</h2>
          <div class="settings-card">
            <div class="setting-item">
              <span>Account Status</span>
              <span class="status-badge">Active</span>
            </div>
            <button class="logout-btn" onclick="app.logout()">Logout from Device</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('mainContent').innerHTML = content;
  },

  showAboutPage() {
    this.currentView = 'about';
    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: 'About Us' }
    ]);

    const content = `
      <div class="about-container">
        <div class="about-hero">
          <h1 class="page-title">Kerala's Culinary Compass</h1>
          <p class="page-subtitle">Connecting you to the authentic flavors of God's Own Country</p>
        </div>
        <div class="about-content">
          <img src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&h=600&fit=crop" alt="Kerala Food" class="about-image">
          <div class="about-text">
            <h2>Our Journey</h2>
            <p>Restaurant Navigator started as a college project with a simple mission: to make finding great food in Kerala as easy as possible.</p>
            <p style="margin-top: 1rem;">We curate the best dining experiences across Kochi, Kozhikode, Thrissur, and beyond.</p>
          </div>
        </div>
      </div>
    `;
    document.getElementById('mainContent').innerHTML = content;
  },

  showContactPage() {
    this.currentView = 'contact';
    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: 'Contact Us' }
    ]);
    const content = `
      <div class="contact-container">
        <h1 class="page-title">Get In Touch</h1>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="info-item"><span>📍</span> MGM Technological campus Valanchery</div>
            <div class="info-item"><span>📧</span> mgmcampus@gmail.com</div>
          </div>
          <div class="contact-card">
            <form id="contactForm" onsubmit="app.handleContactSubmit(event)">
              <input type="text" class="contact-input" placeholder="Your Name" required>
              <input type="email" class="contact-input" placeholder="Email" required>
              <textarea class="contact-input" rows="5" placeholder="Message" required></textarea>
              <button type="submit" class="submit-btn" id="contactSubmit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    `;
    document.getElementById('mainContent').innerHTML = content;
  },

  handleContactSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('contactSubmit');
    btn.innerHTML = 'Sending...';
    setTimeout(() => {
      btn.innerHTML = 'Message Sent! ✅';
      setTimeout(() => {
        btn.innerHTML = 'Send Message';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  },

  showFoodModal(restaurantId, itemName) {
    let restaurant;
    restaurantData.places.forEach(place => {
      const found = place.restaurants.find(r => r.id === restaurantId);
      if (found) restaurant = found;
    });

    if (!restaurant) return;
    const item = restaurant.foodItems.find(i => i.name === itemName);
    if (!item) return;

    const modal = document.getElementById('foodModal');
    const modalBody = document.getElementById('modalBody');
    const itemId = `${restaurantId}-${item.name.replace(/\s+/g, '_')}`;
    const isFav = this.favorites.items.includes(itemId);

    modalBody.innerHTML = `
      ${item.image ? `<img src="${item.image}" alt="${item.name}" class="modal-hero-image">` : ''}
      <div class="modal-details">
        <div class="modal-header">
          <h2 class="modal-title">${item.name}</h2>
          <div class="modal-price">${item.price}</div>
        </div>
        <p class="modal-description">${item.description}</p>
        <div class="modal-footer">
          <button class="fav-btn ${isFav ? 'active' : ''}" onclick="app.toggleFavorite('${itemId}', 'item', this)">❤️ Favorite</button>
          <button class="submit-btn" style="flex:1;" onclick="app.addToCart(${restaurantId}, '${item.name.replace(/'/g, "\\'")}')">Add to Cart 🛒</button>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    document.getElementById('foodModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
  },

  // Checkout Simulation Flow
  startCheckout() {
    this.toggleCart();
    this.currentCheckoutStep = 1;
    this.renderCheckout();
    document.getElementById('checkoutModal').classList.remove('hidden');
  },

  renderCheckout() {
    const modalBody = document.getElementById('checkoutBody');
    if (!modalBody) return;

    let stepHtml = '';
    if (this.currentCheckoutStep === 1) {
      stepHtml = `
        <div class="checkout-steps">
          <div class="step active">1</div>
          <div class="step">2</div>
          <div class="step">3</div>
        </div>
        <h2 class="checkout-title">Delivery Details</h2>
        <form class="checkout-form" onsubmit="event.preventDefault(); app.nextCheckoutStep();">
          <input type="text" class="search-input" style="padding-left: 1rem;" placeholder="Full Name" required>
          <input type="tel" class="search-input" style="padding-left: 1rem;" placeholder="Phone Number" required>
          <textarea class="search-input" style="padding-left: 1rem; height: 100px; padding-top: 1rem;" placeholder="Detailed Delivery Address" required></textarea>
          <button type="submit" class="checkout-btn">Continue to Payment</button>
        </form>
      `;
    } else if (this.currentCheckoutStep === 2) {
      stepHtml = `
        <div class="checkout-steps">
          <div class="step done">✓</div>
          <div class="step active">2</div>
          <div class="step">3</div>
        </div>
        <h2 class="checkout-title">Payment Method</h2>
        <div class="payment-options">
          <div class="payment-option active" onclick="app.selectPayment(this)">
            <span class="payment-icon">💵</span>
            <div>
              <div style="font-weight: 600;">Cash on Delivery</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Pay when you receive</div>
            </div>
          </div>
          <div class="payment-option" onclick="app.selectPayment(this)">
            <span class="payment-icon">📱</span>
            <div>
              <div style="font-weight: 600;">UPI / Wallet</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Google Pay, PhonePe, etc.</div>
            </div>
          </div>
          <div class="payment-option" onclick="app.selectPayment(this)">
            <span class="payment-icon">💳</span>
            <div>
              <div style="font-weight: 600;">Credit / Debit Card</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Secure online payment</div>
            </div>
          </div>
        </div>
        <button class="checkout-btn" style="margin-top: var(--spacing-xl);" onclick="app.nextCheckoutStep()">Place Order</button>
      `;
    } else if (this.currentCheckoutStep === 3) {
      const orderId = 'NAV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      stepHtml = `
        <div class="success-screen">
          <span class="success-icon">🎉</span>
          <h2 class="checkout-title" style="background: var(--success-color); -webkit-background-clip: text;">Order Placed Successfully!</h2>
          <p style="color: var(--text-secondary);">Your food is being prepared and will be delivered soon.</p>
          <div class="order-id">Order ID: ${orderId}</div>
          <button class="checkout-btn" style="margin-top: 2rem; background: var(--success-color);" onclick="app.startTracking('${orderId}')">Track Your Order ➔</button>
        </div>
      `;
      this.cart = [];
      this.saveCart();
    }

    modalBody.innerHTML = stepHtml;
  },

  startTracking(orderId) {
    const modalBody = document.getElementById('checkoutBody');
    modalBody.innerHTML = `
      <div class="tracking-screen">
        <h2 class="checkout-title">Order Tracking</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">ID: ${orderId}</p>
        
        <div class="tracking-timeline">
          <div class="tracking-progress" id="trackProgress"></div>
          
          <div class="tracking-node active" id="node1">
            <div class="node-icon">📝</div>
            <span class="node-label">Order Placed</span>
          </div>
          
          <div class="tracking-node" id="node2">
            <div class="node-icon">👨‍🍳</div>
            <span class="node-label">Preparing</span>
          </div>
          
          <div class="tracking-node" id="node3">
            <div class="node-icon">🛵</div>
            <span class="node-label">Delivery</span>
          </div>
          
          <div class="tracking-node" id="node4">
            <div class="node-icon">✅</div>
            <span class="node-label">Arrived</span>
          </div>
        </div>

        <div class="bike-container">
          <div class="bike-icon">🛵</div>
        </div>

        <div id="trackingStatus" style="margin-top: 2rem; font-weight: 600; font-size: 1.1rem; color: var(--accent-color);">
          Your order has been received!
        </div>

        <button class="checkout-btn hidden" id="finishTrackBtn" style="margin-top: 3rem;" onclick="app.finishCheckout()">
          Enjoy Your Food! 🍔
        </button>
      </div>
    `;

    // Simulate real-time updates
    const progress = document.getElementById('trackProgress');
    const status = document.getElementById('trackingStatus');
    const bike = document.querySelector('.bike-icon');

    // Step 2: Preparing (after 3s)
    setTimeout(() => {
      document.getElementById('node2').classList.add('active', 'pulse');
      progress.style.width = '33%';
      status.innerText = 'Chef is preparing your delicious meal...';
      status.style.color = 'var(--primary-color)';
    }, 3000);

    // Step 3: Out for Delivery (after 7s)
    setTimeout(() => {
      document.getElementById('node2').classList.remove('pulse');
      document.getElementById('node3').classList.add('active', 'pulse');
      progress.style.width = '66%';
      status.innerText = 'Our delivery partner is on the way!';
      status.style.color = 'var(--accent-color)';
    }, 7000);

    // Step 4: Arrived (after 12s)
    setTimeout(() => {
      document.getElementById('node3').classList.remove('pulse');
      document.getElementById('node4').classList.add('active');
      progress.style.width = '100%';
      status.innerText = 'Order Arrived! Please collect your food.';
      status.style.color = 'var(--success-color)';
      document.getElementById('finishTrackBtn').classList.remove('hidden');
      bike.style.display = 'none';

      // Celebrate
      this.celebrate();
    }, 12000);
  },

  celebrate() {
    // Basic celebration effect without library
    const icon = document.querySelector('.success-icon') || { style: {} };
    icon.innerText = '🎊';
  },

  renderUserStats() {
    // Simulated user stats
    const stats = {
      orders: 12,
      bookings: 4,
      loyaltyPoints: 750,
      nextLevel: 1000
    };

    const progress = (stats.loyaltyPoints / stats.nextLevel) * 100;

    return `
      <div class="stats-container">
        <div class="stats-grid">
          <div class="stats-card loyalty-card">
            <div class="stats-icon">💎</div>
            <div class="loyalty-progress-container">
              <h3 class="stats-label">Loyalty Status: Foodie Pro</h3>
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${progress}%"></div>
              </div>
              <p style="font-size: 0.8rem; color: var(--text-muted)">${stats.loyaltyPoints} / ${stats.nextLevel} points to Level Up</p>
            </div>
          </div>
          
          <div class="stats-card" style="animation-delay: 0.1s">
            <div class="stats-icon">🍔</div>
            <div class="stats-value">${stats.orders}</div>
            <div class="stats-label">Total Orders</div>
          </div>
          
          <div class="stats-card" style="animation-delay: 0.2s">
            <div class="stats-icon">📅</div>
            <div class="stats-value">${stats.bookings}</div>
            <div class="stats-label">Reservations</div>
          </div>

          <div class="stats-card" style="animation-delay: 0.3s">
            <div class="stats-icon">🏅</div>
            <div class="stats-value">Elite</div>
            <div class="stats-label">User Tier</div>
          </div>
        </div>
      </div>
    `;
  },

  openBookingModal(restaurantId) {
    const restaurant = this.findRestaurant(restaurantId);
    if (!restaurant) return;

    const modal = document.getElementById('checkoutModal');
    const body = document.getElementById('checkoutBody');

    body.innerHTML = `
      <h2 class="checkout-title">Reserve a Table</h2>
      <p style="text-align: center; color: var(--text-muted); margin-bottom: 1.5rem;">at ${restaurant.name}</p>
      
      <div class="booking-form">
        <div class="form-group">
          <label>Number of Guests</label>
          <select class="form-control" id="bookingGuests">
            <option value="2">2 People</option>
            <option value="4">4 People</option>
            <option value="6">6 People</option>
            <option value="8">8+ People</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Preferred Date</label>
          <input type="date" class="form-control" id="bookingDate" value="${new Date().toISOString().split('T')[0]}">
        </div>
        
        <div class="form-group">
          <label>Time Slot</label>
          <select class="form-control" id="bookingTime">
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
            <option value="22:00">10:00 PM</option>
          </select>
        </div>

        <button class="booking-btn" style="margin-top: 1.5rem;" onclick="app.processBooking(${restaurantId})">
          Confirm Reservation
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },

  processBooking(restaurantId) {
    const guests = document.getElementById('bookingGuests').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;

    const body = document.getElementById('checkoutBody');
    body.innerHTML = `
      <div class="success-screen">
        <span class="success-icon">🎫</span>
        <h2 class="checkout-title" style="background: var(--accent-gradient); -webkit-background-clip: text;">Table Reserved!</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">
          Your table for ${guests} guests on ${date} at ${time} is confirmed at ${this.findRestaurant(restaurantId).name}.
        </p>
        <div class="order-id" style="background: rgba(0, 242, 254, 0.1); color: var(--accent-color);">
          Booking ID: BK-${Math.random().toString(36).substr(2, 6).toUpperCase()}
        </div>
        <button class="checkout-btn" style="margin-top: 2rem;" onclick="app.closeCheckout()">Done</button>
      </div>
    `;

    // Visual celebration
    this.celebrate();
  },

  findRestaurant(id) {
    for (const place of restaurantData.places) {
      const rest = place.restaurants.find(r => r.id === id);
      if (rest) return rest;
    }
    return null;
  },

  nextCheckoutStep() {
    this.currentCheckoutStep++;
    this.renderCheckout();
  },

  selectPayment(el) {
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
    el.classList.add('active');
  },

  finishCheckout() {
    this.closeCheckout();
    this.navigateHome();
  },

  closeCheckout() {
    document.getElementById('checkoutModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
  },

  // Filtering Logic
  applyPlaceFilter(placeId, filter) {
    this.currentFilters.place = filter;
    this.showPlacePage(placeId);
  },

  applyRestaurantFilter(restaurantId, filter) {
    this.currentFilters.restaurant = filter;
    this.showRestaurantPage(restaurantId);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}
