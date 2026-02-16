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
  lastOrderId: null,
  stripePublicKey: 'pk_test_51Pxy00PlaceholderKeyOnly', // Replace with real key

  updateContent(html) {
    const mainContent = document.getElementById('mainContent');
    mainContent.className = 'container'; // Reset to base class
    mainContent.classList.remove('fade-slide-up');
    void mainContent.offsetWidth; // Trigger reflow
    mainContent.innerHTML = html;
    mainContent.classList.add('fade-slide-up');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  isRestaurantOpen(hours) {
    if (!hours) return true;
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    const [openH, openM] = hours.open.split(':').map(Number);
    const [closeH, closeM] = hours.close.split(':').map(Number);
    const openTime = openH * 100 + openM;
    const closeTime = closeH * 100 + closeM;

    return currentTime >= openTime && currentTime <= closeTime;
  },

  async handleSurpriseMe() {
    try {
      const resp = await fetch('https://restaurant-99en.onrender.com/api/restaurants/places');
      const places = await resp.json();
      const allRestaurants = [];
      places.forEach(p => {
        // Since we store restaurant IDs in Place, we need to fetch them or assume they are pre-loaded
        // For simplicity in surprise me, we'll just fetch all restaurants once
      });
      // Fallback or better implementation below
      this.showToast("Finding something special... ✨");
      this.navigateToRestaurant(101); // Simplified for now
    } catch (err) {
      console.error(err);
    }
  },

  // Initialize the application
  async init() {
    this.initTheme();
    this.checkAuth();
    this.loadFavorites(); // Non-blocking
    this.loadCart();
    this.setupEventListeners();

    // Render initial content immediately (using fallback from data.js)
    this.handleRoute();

    // Fetch live data in background
    this.fetchInitialData().then(() => {
      // Re-handle route if data loaded successfully to show updated live content
      if (this.currentView === 'home' || this.currentView === 'place') {
        this.handleRoute();
      }
    });

    this.initModalEvents();
    this.initLottie();
    window.addEventListener('hashchange', () => this.handleRoute());
  },

  async fetchInitialData() {
    console.log('📡 Fetching live data from backend...');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const response = await fetch('https://restaurant-99en.onrender.com/api/restaurants/places', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          window.restaurantData = { places: data };
          console.log('✅ Live data loaded successfully (' + data.length + ' places)');
          return;
        }
      }
      throw new Error('Backend returned no data');
    } catch (err) {
      if (err.name === 'AbortError') {
        console.warn('⚠️ Backend request timed out (cold start), using local fallback');
      } else {
        console.warn('⚠️ backend error:', err.message);
      }

      if (window.restaurantData && window.restaurantData.places) {
        console.log('🔄 Continuing with local fallback data.js');
      } else {
        this.showToast('Failed to load live data. 🛠️');
      }
    }
  },

  initLottie() {
    // Global lottie init if needed
  },

  loadLottie(containerId, animationUrl, loop = true) {
    const container = document.getElementById(containerId);
    if (!container) return;

    return lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: loop,
      autoplay: true,
      path: animationUrl
    });
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

  async loadFavorites() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('https://restaurant-99en.onrender.com/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const user = await response.json();
          this.favorites = user.favorites || { restaurants: [], items: [] };
          return;
        }
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    }
    // Fallback or guest mode
    const saved = localStorage.getItem('favorites');
    this.favorites = saved ? JSON.parse(saved) : { restaurants: [], items: [] };
  },

  async saveFavorites() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetch('https://restaurant-99en.onrender.com/api/auth/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(this.favorites)
        });
      } catch (err) {
        console.error('Error saving favorites to backend:', err);
      }
    } else {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
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
    window.restaurantData.places.forEach(place => {
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
          <div id="cartEmptyLottie" class="cart-lottie"></div>
          <p class="empty-state-text">Your cart is empty</p>
          <button class="submit-btn" style="margin-top: 1rem;" onclick="app.toggleCart()">Go Shopping</button>
        </div>
      `;
      summary.classList.add('hidden');
      setTimeout(() => this.loadLottie('cartEmptyLottie', 'https://assets9.lottiefiles.com/packages/lf20_5njp9vob.json'), 100);
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
    this.toggleUIElements(true);
    this.currentView = 'home';
    this.currentPlace = null;
    this.currentRestaurant = null;
    this.updateBreadcrumb([{ label: 'Home', onClick: () => this.navigateHome() }]);


    const content = `
      <div class="hero-premium fade-slide-up">
      <div class="hero-split">
        <div class="hero-left">
          <span class="hero-badge">PREMIUM DINING GUIDE</span>
          <h1 class="hero-title">Experience the Art of <span class="text-gradient">Kerala Flavors</span></h1>
          <p class="hero-subtitle">Discover curated dining experiences, from hidden gems to world-class restaurants across the heart of Kerala.</p>
          <div class="hero-actions">
            <button class="magic-btn" onclick="app.handleSurpriseMe()">✨ Surprise Me!</button>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-value">50+</span>
              <span class="stat-label">Restaurants</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">12</span>
              <span class="stat-label">Locations</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">4.8</span>
              <span class="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-visual">
            <div class="hero-visual-frame">
              <img src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Kerala Signature Dish" class="hero-dish-img">
              <div class="hero-visual-badge">
                <span class="badge-icon">⭐</span>
                <span class="badge-text">Chef's Choice</span>
              </div>
            </div>
            <div class="hero-glow"></div>
          </div>
        </div>
      </div>
    </div>



      ${this.renderMoodPicker()}
      
      <div class="map-section">
        <div class="section-header">
          <span class="section-badge">INTERACTIVE MAP</span>
          <h2 class="section-title">📍 Explore Kerala Visually</h2>
          <p class="section-subtitle">Navigate through Kerala's culinary landscape with our interactive location explorer</p>
        </div>
        <div id="mainMap" class="map-container"></div>
      </div>

      <h1 class="page-title">Discover Kerala's Best Restaurants</h1>
      <p class="page-subtitle">Choose a location to explore amazing dining experiences</p>
      
      <div class="places-grid">
        ${window.restaurantData.places.map((place, index) => `
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

    this.updateContent(content);
    this.initCarouselDrag();

    // Initialize Home Map
    const cityMarkers = window.restaurantData.places.map(p => ({
      name: p.name,
      description: p.description,
      coords: p.coords,
      onClick: `app.navigateToPlace(${p.id})`,
      linkText: "View Restaurants"
    }));
    this.initMap('mainMap', [10.5, 76.5], 7, cityMarkers);
  },


  renderMoodPicker() {
    return `
      <div class="mood-picker-section fade-slide-up">
        <div class="mood-header">
          <span class="section-badge">PERSONALIZED REVIEWS</span>
          <h2 class="mood-title">What's your <span class="text-gradient">food mood</span> today?</h2>
          <p class="mood-subtitle">Tell us how you feel, and we'll curate the perfect culinary experience for you.</p>
        </div>
        
        <div class="mood-grid">
          <div class="mood-option" onclick="app.handleMoodSelection('spicy')">
            <div class="mood-icon-wrapper">
              <span class="mood-emoji">🔥</span>
              <div class="mood-orb spicy-glow"></div>
            </div>
            <div class="mood-info">
              <span class="mood-label">Spicy & Bold</span>
              <span class="mood-desc">For the heat seekers</span>
            </div>
          </div>
          
          <div class="mood-option" onclick="app.handleMoodSelection('light')">
            <div class="mood-icon-wrapper">
              <span class="mood-emoji">🥗</span>
              <div class="mood-orb fresh-glow"></div>
            </div>
            <div class="mood-info">
              <span class="mood-label">Light & Fresh</span>
              <span class="mood-desc">Healthy & vibrant</span>
            </div>
          </div>
          
          <div class="mood-option" onclick="app.handleMoodSelection('sweet')">
            <div class="mood-icon-wrapper">
              <span class="mood-emoji">🍰</span>
              <div class="mood-orb sweet-glow"></div>
            </div>
            <div class="mood-info">
              <span class="mood-label">Sweet Tooth</span>
              <span class="mood-desc">Desserts & treats</span>
            </div>
          </div>
          
          <div class="mood-option" onclick="app.handleMoodSelection('traditional')">
            <div class="mood-icon-wrapper">
              <span class="mood-emoji">🏺</span>
              <div class="mood-orb trad-glow"></div>
            </div>
            <div class="mood-info">
              <span class="mood-label">Traditional</span>
              <span class="mood-desc">Kerala's timeless flavors</span>
            </div>
          </div>
          
          <div class="mood-option" onclick="app.handleMoodSelection('comfort')">
            <div class="mood-icon-wrapper">
              <span class="mood-emoji">🍲</span>
              <div class="mood-orb comfort-glow"></div>
            </div>
            <div class="mood-info">
              <span class="mood-label">Comfort Food</span>
              <span class="mood-desc">Soulful & satisfying</span>
            </div>
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
      window.restaurantData.places.forEach(p => {
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
    this.toggleUIElements(true);
    const place = window.restaurantData.places.find(p => p.id === placeId);
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
      <!-- Premium Hero Section -->
      <div class="place-hero" style="background-image: url('${place.image}');">
        <div class="place-hero-overlay">
          <div class="place-hero-content fade-slide-up">
            <span class="place-badge">EXPLORE</span>
            <h1 class="place-hero-title">${place.name}</h1>
            <p class="place-hero-subtitle">${place.description}</p>
            
            <div class="place-stats">
              <div class="stat-pill">
                <span class="stat-icon">🍽️</span>
                <span>${place.restaurants.length} Premium Spots</span>
              </div>
              <div class="stat-pill">
                <span class="stat-icon">⭐</span>
                <span>4.8 Avg Rating</span>
              </div>
              <div class="stat-pill">
                <span class="stat-icon">📍</span>
                <span>Kerala, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container" style="margin-top: -4rem; position: relative; z-index: 10;">
        <!-- Premium Filter Bar -->
        <div class="glass-filter-bar fade-slide-up" style="animation-delay: 0.1s;">
          <div class="filter-scroll">
            <button class="filter-chip ${this.currentFilters.place === 'all' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'all')">
              All Spots
            </button>
            <button class="filter-chip ${this.currentFilters.place === 'top' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'top')">
              ⭐ Top Rated
            </button>
            <button class="filter-chip ${this.currentFilters.place === 'Traditional' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'Traditional')">
              🏺 Traditional
            </button>
            <button class="filter-chip ${this.currentFilters.place === 'Modern' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'Modern')">
              🏙️ Modern
            </button>
            <button class="filter-chip ${this.currentFilters.place === 'Seafood' ? 'active' : ''}" onclick="app.applyPlaceFilter(${placeId}, 'Seafood')">
              🐟 Seafood
            </button>
          </div>
          
          <button class="map-toggle-btn" onclick="app.openPlaceMap(${placeId})">
            <span>🗺️ View Map</span>
          </button>
        </div>

        <div class="content-grid-layout">
          <div class="restaurants-section" style="width: 100%;">
             <h2 class="section-heading">Curated Dining List</h2>
             <div class="restaurants-grid" id="restaurantsGrid">
               ${this.renderRestaurants(place.restaurants)}
             </div>
          </div>
        </div>
      </div>
    `;

    this.updateContent(content);
  },

  openPlaceMap(placeId) {
    const place = window.restaurantData.places.find(p => p.id === placeId);
    if (!place) return;

    const modal = document.getElementById('mapModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Initialize Place Map
    const restMarkers = place.restaurants.map(r => ({
      name: r.name,
      cuisine: r.cuisine,
      coords: r.coords,
      onClick: `app.navigateToRestaurant(${r.id}); app.closeMapModal();`,
      linkText: "View Menu"
    }));

    // Wait for modal transition then init map
    setTimeout(() => {
      this.initMap('modalMap', place.coords, 13, restMarkers);
    }, 100);
  },

  closeMapModal() {
    const modal = document.getElementById('mapModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  },

  renderRestaurants(restaurants) {
    if (restaurants.length === 0) {
      return `<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No restaurants found matching your filter.</p>`;
    }

    return restaurants.map((restaurant, index) => {
      const isFav = this.favorites.restaurants.includes(restaurant.id);
      const isOpen = this.isRestaurantOpen(restaurant.hours);
      return `
        <div class="restaurant-card" style="animation-delay: ${index * 0.1}s">
          <div class="card-image" onclick="app.navigateToRestaurant(${restaurant.id})" style="background-image: url('${restaurant.image}'); background-size: cover; background-position: center;">
            <div class="status-badge ${isOpen ? 'open' : 'closed'}">${isOpen ? '● Open Now' : '● Closed'}</div>
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
    this.toggleUIElements(true);
    let restaurant = null;
    let place = null;

    for (const p of window.restaurantData.places) {
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

  showShareCard(restaurantId) {
    let restaurant = null;
    let place = null;

    for (const p of window.restaurantData.places) {
      const r = p.restaurants.find(r => r.id === restaurantId);
      if (r) {
        restaurant = r;
        place = p;
        break;
      }
    }

    if (!restaurant) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'shareModal';

    // Status Card Format (9:16 aspect ratio look)
    overlay.innerHTML = `
      <div class="status-card-modal">
        <button class="modal-close" onclick="document.getElementById('shareModal').remove()">×</button>
        <div class="status-card-wrapper" id="statusCard">
           <div class="status-card-inner" style="background-image: url('${restaurant.image}')">
              <div class="status-card-overlay"></div>
              
              <div class="status-card-content">
                 <div class="sc-header">
                    <div class="sc-brand">
                       <span class="sc-dot"></span>
                       FOOD VISTA
                    </div>
                    <div class="sc-location">
                       <span class="sc-icon">📍</span> ${place.name}
                    </div>
                 </div>

                 <div class="sc-main">
                    <div class="sc-category">${restaurant.cuisine}</div>
                    <h1 class="sc-name">${restaurant.name}</h1>
                    <div class="sc-rating">
                       <span class="sc-stars">${'★'.repeat(Math.floor(restaurant.rating))}</span>
                       <span class="sc-rating-val">${restaurant.rating}</span>
                    </div>
                 </div>

                 <div class="sc-footer">
                    <div class="sc-promo">DISCOVER KERALA'S BEST TASTE</div>
                    <div class="sc-url">mishabkp.github.io/restaurant</div>
                 </div>
              </div>
           </div>
        </div>
        <div class="share-actions">
           <button class="premium-share-btn" onclick="app.shareToWhatsApp(${restaurant.id})">
              <span class="btn-icon">💬</span> Share to WhatsApp
           </button>
           <p class="share-tip">Tip: Long press or screenshot to save!</p>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
  },

  shareToWhatsApp(restaurantId) {
    let restaurant = null;
    for (const p of window.restaurantData.places) {
      const r = p.restaurants.find(r => r.id === restaurantId);
      if (r) { restaurant = r; break; }
    }

    const text = `Check out this amazing place I found on Food Vista! 🤤\n\n🍴 *${restaurant.name}*\n⭐ ${restaurant.rating} Rating\n📍 Kochi, Kerala\n\nOrder here: https://mishabkp.github.io/restaurant/#restaurant/${restaurantId}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
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
          <span class="info-badge" style="cursor: pointer; background: var(--secondary-gradient); color: white;" onclick="app.showShareCard(${restaurant.id})">
            <span>🤳</span>
            Share Status
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

      <div class="map-section" style="margin-bottom: var(--spacing-lg);">
        <div id="restMap" class="map-container" style="height: 250px;"></div>
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
          <div class="skeleton" style="height: 100px;"></div>
        </div>
      </div>
`;
    this.updateContent(content);
    this.fetchReviews(restaurant.id);

    // Initialize Restaurant Map
    this.initMap('restMap', restaurant.coords, 16, [{
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      coords: restaurant.coords,
      onClick: `console.log('Already here')`,
      linkText: "Located Here"
    }]);
  },

  async fetchReviews(restaurantId) {
    try {
      const response = await fetch(`https://restaurant-99en.onrender.com/api/reviews/${restaurantId}`);
      const reviews = await response.json();
      const reviewsList = document.getElementById('reviewsList');
      if (reviewsList) {
        reviewsList.innerHTML = this.renderReviews(reviews);
      }
    } catch (err) {
      console.error('Fetch Reviews Error:', err);
    }
  },

  renderReviews(reviews) {
    if (!reviews || reviews.length === 0) {
      return `
        <div class="empty-state" style="padding: 2rem;">
          <p class="empty-state-text">No reviews yet. Be the first to review!</p>
        </div>
      `;
    }

    return reviews.map(r => `
      <div class="review-card fade-in">
        <div class="review-header">
          <span class="review-user">${r.userName || r.user}</span>
          <span class="review-date">${new Date(r.date).toLocaleDateString() || r.date}</span>
        </div>
        <div class="review-stars">${'⭐'.repeat(r.rating)}</div>
        <p class="review-comment">${r.comment}</p>
      </div>
    `).join('');
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

  async submitReview(restaurantId) {
    const comment = document.getElementById('reviewComment').value;
    const ratingEl = document.querySelector('input[name="rating"]:checked');

    if (!ratingEl || !comment) {
      this.showToast('Please provide a rating and comment! ⚠️');
      return;
    }

    const rating = parseInt(ratingEl.value);
    const userData = JSON.parse(localStorage.getItem('user')) || { name: 'Anonymous' };

    try {
      const response = await fetch('https://restaurant-99en.onrender.com/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          userName: userData.name,
          rating,
          comment
        })
      });

      if (response.ok) {
        this.fetchReviews(restaurantId);
        this.closeCheckout();
        this.showToast('Thank you! Your review has been published. ✨');
      } else {
        this.showToast('Failed to post review. ❌');
      }
    } catch (err) {
      console.error('Post Review Error:', err);
      this.showToast('Server error while posting review. 🛠️');
    }
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
    } else if (type === 'dashboard') {
      skeletonHtml = `
        <div class="skeleton-title skeleton" style="width: 50%;"></div>
        <div class="skeleton-text skeleton" style="width: 90%; margin-bottom: 3rem;"></div>
        <div class="stats-grid" style="margin-bottom: 3rem;">
          ${Array(4).fill('<div class="skeleton" style="height: 120px; border-radius: 15px;"></div>').join('')}
        </div>
        <div class="skeleton-title skeleton" style="width: 30%;"></div>
        <div class="orders-list">
          ${Array(2).fill('<div class="skeleton" style="height: 150px; border-radius: 15px; margin-bottom: 1rem;"></div>').join('')}
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
      const isBiriyani = item.name.toLowerCase().includes('biriyani');

      return `
        <div class="food-item" style="animation-delay: ${index * 0.05}s" onclick="app.showFoodModal(${restaurant.id}, '${item.name.replace(/'/g, "\\'")}')">
          <div class="food-item-image-container">
            ${isBiriyani ? '<div class="lottie-container steam-animation" id="steam-' + itemId + '"></div>' : ''}
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
        ${isBiriyani ? `<script>setTimeout(() => app.loadLottie('steam-${itemId}', 'https://assets10.lottiefiles.com/packages/lf20_qpwb7yqc.json'), 100)</script>` : ''}
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
    this.toggleUIElements(false);

    const mainContent = document.getElementById('mainContent');
    mainContent.className = '';

    mainContent.innerHTML = `
      <div class="login-page">
        <div class="login-card">
          <div class="login-header">
            <h1 class="login-logo">FOOD VISTA</h1>
            <p class="login-subtitle" id="loginSubtitle">Sign in to explore Kerala's flavors</p>
          </div>
          <form class="login-form" id="authForm" onsubmit="app.handleAuth(event)">
            <div id="signupFields" class="hidden">
               <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="login-input" placeholder="Enter your name" id="nameInput">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="login-input" placeholder="Enter your email" required id="emailInput">
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="login-input" placeholder="••••••••" required id="passwordInput">
            </div>
            <button type="submit" class="login-button" id="authBtn">Sign In</button>
          </form>
          <div class="login-footer">
            <p id="toggleAuthText">Don't have an account? <a href="javascript:void(0)" class="footer-link" onclick="app.toggleAuthMode()">Register Now</a></p>
          </div>
        </div>
      </div>
    `;
  },

  isSignup: false,
  toggleAuthMode() {
    this.isSignup = !this.isSignup;
    const signupFields = document.getElementById('signupFields');
    const authBtn = document.getElementById('authBtn');
    const toggleText = document.getElementById('toggleAuthText');
    const subtitle = document.getElementById('loginSubtitle');

    if (this.isSignup) {
      signupFields.classList.remove('hidden');
      authBtn.innerText = 'Create Account';
      subtitle.innerText = 'Join us and taste the magic';
      toggleText.innerHTML = `Already have an account? <a href="javascript:void(0)" class="footer-link" onclick="app.toggleAuthMode()">Sign In</a>`;
    } else {
      signupFields.classList.add('hidden');
      authBtn.innerText = 'Sign In';
      subtitle.innerText = "Sign in to explore Kerala's flavors";
      toggleText.innerHTML = `Don't have an account? <a href="javascript:void(0)" class="footer-link" onclick="app.toggleAuthMode()">Register Now</a>`;
    }
  },

  async handleAuth(event) {
    event.preventDefault();
    const authBtn = document.getElementById('authBtn');
    authBtn.innerText = 'Please wait...';
    authBtn.disabled = true;

    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const name = this.isSignup ? document.getElementById('nameInput').value : '';

    const endpoint = this.isSignup ? '/api/auth/signup' : '/api/auth/login';
    const body = this.isSignup ? { name, email, password } : { email, password };

    try {
      const response = await fetch(`https://restaurant-99en.onrender.com${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedIn = true;
        await this.loadFavorites(); // Sync favorites after login
        this.showToast(this.isSignup ? 'Account created! Welcome 🎉' : 'Welcome back! 👋');
        this.toggleUIElements(true);
        this.handleRoute();
      } else {
        this.showToast(data.msg || 'Authentication failed! ❌');
      }
    } catch (error) {
      console.error('Auth Error:', error);
      this.showToast('Server connection error! Make sure backend is running. 🛠️');
    } finally {
      authBtn.innerText = this.isSignup ? 'Create Account' : 'Sign In';
      authBtn.disabled = false;
    }
  },

  toggleUIElements(show) {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    if (show) {
      header?.classList.remove('hidden');
      footer?.classList.remove('hidden');
    } else {
      header?.classList.add('hidden');
      footer?.classList.add('hidden');
      window.scrollTo(0, 0);
    }
  },


  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favorites'); // Clear local favorites too
    this.isLoggedIn = false;
    this.favorites = { restaurants: [], items: [] };
    this.cart = [];
    window.location.hash = '/';
    this.handleRoute();
  },

  async toggleFavorite(id, type, btn) {
    const list = type === 'restaurant' ? this.favorites.restaurants : this.favorites.items;
    const index = list.indexOf(id);

    if (index === -1) {
      list.push(id);
      btn.classList.add('active');
    } else {
      list.splice(index, 1);
      btn.classList.remove('active');
    }
    await this.saveFavorites();
  },


  async showDashboardPage() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      this.showLoginPage();
      return;
    }

    this.currentView = 'dashboard';
    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: 'My Dashboard' }
    ]);

    this.showSkeletons('dashboard');

    try {
      const ordersResponse = await fetch(`https://restaurant-99en.onrender.com/api/orders/${user.id}`);
      const orders = await ordersResponse.json();
      this.renderDashboardPage(orders);
    } catch (err) {
      console.error('Dashboard Error:', err);
      this.renderDashboardPage([]);
    }
  },

  renderDashboardPage(orders) {

    const favRestaurants = [];
    window.restaurantData.places.forEach(place => {
      place.restaurants.forEach(rest => {
        if (this.favorites.restaurants.includes(rest.id)) {
          favRestaurants.push(rest);
        }
      });
    });

    const favItems = [];
    window.restaurantData.places.forEach(place => {
      place.restaurants.forEach(rest => {
        rest.foodItems.forEach(item => {
          const itemId = `${rest.id}-${item.name.replace(/\s+/g, '_')}`;
          if (this.favorites.items.includes(itemId)) {
            favItems.push({
              ...item,
              restaurantId: rest.id,
              restaurantName: rest.name
            });
          }
        });
      });
    });

    const content = `
      <h1 class="page-title">Welcome Back, ${JSON.parse(localStorage.getItem('user'))?.name || 'Foodie'}! 👋</h1>
      <p class="page-subtitle">Manage your favorite spots and personal settings</p>
      
      ${this.renderUserStats(orders.length)}

      <div class="dashboard-grid">
        <div class="dashboard-section main-content">
          <h2 class="section-title">📦 Recent Orders</h2>
          <div class="orders-list" style="margin-bottom: 3rem;">
            ${this.renderOrders(orders)}
          </div>

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
          
          <h2 class="section-title" style="margin-top: 3rem;">🍕 Favorite Dishes</h2>
  ${favItems.length > 0 ? `
            <div class="food-items dashboard-food-grid">
              ${favItems.map((item, index) => {
      const itemId = `${item.restaurantId}-${item.name.replace(/\s+/g, '_')}`;
      return `
                <div class="food-item" style="animation-delay: ${index * 0.05}s" onclick="app.showFoodModal(${item.restaurantId}, '${item.name.replace(/'/g, "\\'")}')">
                  <div class="food-item-image-container">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}" class="food-item-image" loading="lazy">` : ''}
                    <div class="food-item-price-tag">${item.price}</div>
                    <button class="fav-btn small overlay-fav active" onclick="event.stopPropagation(); app.toggleFavorite('${itemId}', 'item', this)">
                      ❤️
                    </button>
                  </div>
                  <div class="food-item-content">
                    <h3 class="food-item-name">${item.name}</h3>
                    <p class="food-item-description" style="font-size: 0.85rem; color: var(--text-muted);">From ${item.restaurantName}</p>
                    <div class="food-item-footer">
                      <span class="food-item-category">${item.category}</span>
                      <button class="add-to-cart-btn" onclick="event.stopPropagation(); app.addToCart(${item.restaurantId}, '${item.name.replace(/'/g, "\\'")}', event)">
                        <span>Add</span> 🛒
                      </button>
                    </div>
                  </div>
                </div>
              `}).join('')}
            </div>
          ` : `
            <div class="empty-state">
              <div class="empty-state-icon">🍕</div>
              <p class="empty-state-text">You haven't added any favorite dishes yet.</p>
            </div>
          `}
    <h2 class="section-title" style="margin-top: 3rem;">⚙️ Settings</h2>
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

    this.updateContent(content);
  },

  showAboutPage() {
    this.toggleUIElements(true);
    this.currentView = 'about';
    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: 'About Us' }
    ]);

    const content = `
    <div class="about-elite-wrapper">
        <section class="about-hero-elite">
          <div class="hero-glow-blob"></div>
          <h1 class="hero-title-elite">Kerala's <span class="highlight-text">Culinary Compass</span></h1>
          <p class="hero-subtitle-elite">Connecting the world to the authentic soul of God's Own Country.</p>
          <div class="scroll-indicator-elite">
            <span>Explore Our Soul</span>
            <div class="mouse-icon"></div>
          </div>
        </section>

        <section class="about-story-elite">
          <div class="story-container-elite">
            <div class="story-visual-elite">
              <div class="image-stack-elite">
                <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1280&h=720&fit=crop" alt="Kerala Landscape" class="main-img-elite">
                <div class="floating-badge-elite">Since 2024</div>
              </div>
            </div>
            <div class="story-content-elite">
              <span class="section-tag-elite">The Origin</span>
              <h2 class="section-title-elite">A Journey of Taste</h2>
              <p class="story-paragraph-elite">FOOD VISTA was born from a simple college epiphany: that Kerala's culinary map is as vast as its backwaters, yet undocumented in its fullest glory.</p>
              <p class="story-paragraph-elite">We didn't just build a directory; we crafted a tribute to the mothers, the local chefs, and the hidden gems across Kochi, Kozhikode, and Thrissur. We are here to ensure that every flavor of Kerala finds its home in your heart.</p>
              <div class="stats-grid-elite">
                <div class="stat-item-elite">
                  <span class="stat-val">50+</span>
                  <span class="stat-label">Cities Covered</span>
                </div>
                <div class="stat-item-elite">
                  <span class="stat-val">1000+</span>
                  <span class="stat-label">Restaurants</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="visionaries-hub-elite">
          <div class="hub-header-elite">
            <span class="section-tag-elite text-center">The Architects</span>
            <h2 class="section-title-elite text-center">The Minds Behind The Vision</h2>
            <p class="hub-subtitle-elite">A collective of innovators dedicated to documenting Kerala's food map.</p>
          </div>
          
          <div class="visionary-cards-elite">
            <div class="v-card-elite">
              <div class="v-card-inner">
                <div class="v-card-front">
                  <div class="v-initial">F</div>
                  <h3 class="v-name">Fina</h3>
                  <p class="v-role">Lead UI/UX Architect</p>
                  <div class="v-badge-elite">Visionary</div>
                </div>
              </div>
            </div>
            <div class="v-card-elite">
              <div class="v-card-inner">
                <div class="v-card-front">
                  <div class="v-initial">M</div>
                  <h3 class="v-name">Mishab</h3>
                  <p class="v-role">Full Stack Strategist</p>
                  <div class="v-badge-elite">Visionary</div>
                </div>
              </div>
            </div>
            <div class="v-card-elite">
              <div class="v-card-inner">
                <div class="v-card-front">
                  <div class="v-initial">S</div>
                  <h3 class="v-name">Shareef</h3>
                  <p class="v-role">Cloud & Data Specialist</p>
                  <div class="v-badge-elite">Visionary</div>
                </div>
              </div>
            </div>
            <div class="v-card-elite">
              <div class="v-card-inner">
                <div class="v-card-front">
                  <div class="v-initial">V</div>
                  <h3 class="v-name">Vimal</h3>
                  <p class="v-role">Innovation Lead</p>
                  <div class="v-badge-elite">Visionary</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  `;
    this.updateContent(content);
  },

  showContactPage() {
    this.toggleUIElements(true);
    this.currentView = 'contact';
    this.updateBreadcrumb([
      { label: 'Home', onClick: () => this.navigateHome() },
      { label: 'Contact Us' }
    ]);
    const content = `
    <div class="contact-elite-wrapper">
        <section class="contact-hero-elite">
          <h1 class="hero-title-elite">Elite <span class="highlight-text">Support Hub</span></h1>
          <p class="hero-subtitle-elite">Direct access to the architects of Kerala's culinary digital future.</p>
        </section>

        <div class="contact-grid-elite">
          <!-- Founder Direct Access -->
          <div class="founder-access-section">
            <h2 class="sub-section-title-elite">Direct Access</h2>
            <div class="founder-contact-scroll">
              <div class="f-contact-card-elite">
                <div class="f-avatar-elite">F</div>
                <div class="f-info-elite">
                  <h3 class="f-name-elite">Fina</h3>
                  <p class="f-role-elite">Lead Architect</p>
                </div>
                <div class="f-actions-elite">
                  <a href="https://wa.me/919496906158" class="f-btn-elite whatsapp" target="_blank"><i class="fab fa-whatsapp"></i> Chat</a>
                  <a href="tel:+919496906158" class="f-btn-elite call"><i class="fas fa-phone-alt"></i> Call</a>
                </div>
              </div>
              <div class="f-contact-card-elite">
                <div class="f-avatar-elite">M</div>
                <div class="f-info-elite">
                  <h3 class="f-name-elite">Mishab</h3>
                  <p class="f-role-elite">Full Stack Strategist</p>
                </div>
                <div class="f-actions-elite">
                  <a href="https://wa.me/919656760092" class="f-btn-elite whatsapp" target="_blank"><i class="fab fa-whatsapp"></i> Chat</a>
                  <a href="tel:+919656760092" class="f-btn-elite call"><i class="fas fa-phone-alt"></i> Call</a>
                </div>
              </div>
              <div class="f-contact-card-elite">
                <div class="f-avatar-elite">S</div>
                <div class="f-info-elite">
                  <h3 class="f-name-elite">Shareef</h3>
                  <p class="f-role-elite">Cloud Specialist</p>
                </div>
                <div class="f-actions-elite">
                  <a href="https://wa.me/917907470882" class="f-btn-elite whatsapp" target="_blank"><i class="fab fa-whatsapp"></i> Chat</a>
                  <a href="tel:+917907470882" class="f-btn-elite call"><i class="fas fa-phone-alt"></i> Call</a>
                </div>
              </div>
              <div class="f-contact-card-elite">
                <div class="f-avatar-elite">V</div>
                <div class="f-info-elite">
                  <h3 class="f-name-elite">Vimal</h3>
                  <p class="f-role-elite">Innovation Lead</p>
                </div>
                <div class="f-actions-elite">
                  <a href="https://wa.me/918075790266" class="f-btn-elite whatsapp" target="_blank"><i class="fab fa-whatsapp"></i> Chat</a>
                  <a href="tel:+918075790266" class="f-btn-elite call"><i class="fas fa-phone-alt"></i> Call</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Digital Concierge Form -->
          <div class="digital-concierge-section">
            <h2 class="sub-section-title-elite">Digital Concierge</h2>
            <div class="modern-form-card-elite">
              <form id="contactForm" onsubmit="app.handleContactSubmit(event)">
                <div class="form-group-elite">
                  <input type="text" class="elite-input" id="name" required>
                  <label for="name" class="elite-label">Your Name</label>
                  <div class="elite-line"></div>
                </div>
                <div class="form-group-elite">
                  <input type="email" class="elite-input" id="email" required>
                  <label for="email" class="elite-label">Email Address</label>
                  <div class="elite-line"></div>
                </div>
                <div class="form-group-elite">
                  <textarea class="elite-input" id="message" rows="4" required></textarea>
                  <label for="message" class="elite-label">How can we help you?</label>
                  <div class="elite-line"></div>
                </div>
                <button type="submit" class="elite-submit-btn" id="contactSubmit">
                  <span>Send Transmission</span>
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="contact-footer-elite">
          <div class="footer-info-elite">
            <span class="info-tag-elite"><i class="fas fa-map-marker-alt"></i> MGM Technological Campus, Valanchery</span>
            <span class="info-tag-elite"><i class="fas fa-envelope"></i> mgmcampus@gmail.com</span>
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
    window.restaurantData.places.forEach(place => {
      const found = place.restaurants.find(r => r.id === restaurantId);
      if (found) restaurant = found;
    });

    if (!restaurant) return;
    const item = restaurant.foodItems.find(i => i.name === itemName);
    if (!item) return;

    const modal = document.getElementById('foodModal');
    const modalBody = document.getElementById('modalBody');
    const itemId = `${restaurantId} -${item.name.replace(/\s+/g, '_')} `;
    const isFav = this.favorites.items.includes(itemId);

    modalBody.innerHTML = `
      ${item.image ? `<a href="${item.image}" target="_blank" title="Click to view full image"><img src="${item.image}" alt="${item.name}" class="modal-hero-image"></a>` : ''}
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
    this.currentCheckoutStep = 1; // Step 1: Payment Method
    this.renderCheckout();
    document.getElementById('checkoutModal').classList.remove('hidden');
  },

  renderCheckout() {
    const modalBody = document.getElementById('checkoutBody');
    if (!modalBody) return;

    console.log("Checkout v2.1 | Step:", this.currentCheckoutStep, "| Method:", this.checkoutData.paymentMethod);

    let stepHtml = '';
    if (this.currentCheckoutStep === 1) {
      stepHtml = `
        <div class="checkout-steps">
          <div class="step active">1</div>
          <div class="step">2</div>
          <div class="step">3</div>
        </div>
        <h2 class="checkout-title">Choose Payment</h2>
        <div class="payment-options">
          <div class="payment-option" onclick="app.selectPayment(this)">
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
      `;
    } else if (this.currentCheckoutStep === 2) {
      const isUPI = this.checkoutData.paymentMethod && this.checkoutData.paymentMethod.includes('UPI');
      if (isUPI) {
        stepHtml = `
          <div class="checkout-steps">
            <div class="step done">✓</div>
            <div class="step active">2</div>
            <div class="step">3</div>
          </div>
          <h2 class="checkout-title">UPI Payment</h2>
          <div class="upi-verification" style="text-align: center; animation: fadeIn 0.5s ease-out;">
            <div class="qr-container" style="background: white; padding: 1rem; border-radius: 15px; display: inline-block; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=misha@upi&am=${this.calculateTotal()}&tn=FoodVistaOrder" alt="Payment QR" style="display: block;">
               <p style="color: #333; font-size: 0.7rem; margin-top: 0.5rem; font-weight: 700;">Scan to Pay ₹${this.calculateTotal()}</p>
            </div>
            
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">Or Choose Your App</p>
            <div class="upi-apps" style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 2rem;">
              <div class="upi-app" style="cursor: pointer; transition: transform 0.3s;" onclick="this.style.transform='scale(0.9)'; setTimeout(() => app.nextCheckoutStep(), 300)">
                <img src="https://logowik.com/content/uploads/images/google-pay-new-20207865.jpg" style="width: 50px; border-radius: 10px;">
                <p style="font-size: 0.7rem; margin-top: 0.4rem;">GPay</p>
              </div>
              <div class="upi-app" style="cursor: pointer; transition: transform 0.3s;" onclick="this.style.transform='scale(0.9)'; setTimeout(() => app.nextCheckoutStep(), 300)">
                <img src="https://logowik.com/content/uploads/images/phonepe9082.jpg" style="width: 50px; border-radius: 10px;">
                <p style="font-size: 0.7rem; margin-top: 0.4rem;">PhonePe</p>
              </div>
              <div class="upi-app" style="cursor: pointer; transition: transform 0.3s;" onclick="this.style.transform='scale(0.9)'; setTimeout(() => app.nextCheckoutStep(), 300)">
                <img src="https://logowik.com/content/uploads/images/paytm6478.jpg" style="width: 50px; border-radius: 10px;">
                <p style="font-size: 0.7rem; margin-top: 0.4rem;">Paytm</p>
              </div>
            </div>

            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem;">
              <input type="text" id="upiId" class="form-control" style="background: rgba(255,255,255,0.03); margin-bottom: 1rem;" placeholder="e.g. user@okaxis">
              <button class="checkout-btn" style="background: var(--accent-gradient);" onclick="app.verifyUPI()">Verify & Continue ➔</button>
            </div>
          </div>
        `;
      } else {
        // If not UPI, skip straight to Address
        this.currentCheckoutStep = 3;
        this.renderCheckout();
        return;
      }
    } else if (this.currentCheckoutStep === 3) {
      stepHtml = `
        <div class="checkout-steps">
          <div class="step done">✓</div>
          <div class="step done">✓</div>
          <div class="step active">3</div>
        </div>
        <h2 class="checkout-title">Delivery Address</h2>
        <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; margin-bottom: 2rem;">Payment: <b>${this.checkoutData.paymentMethod}</b></p>
        
        <form class="checkout-form" onsubmit="event.preventDefault(); app.captureDeliveryDetails();">
          <div class="form-group" style="margin-bottom: 1rem;">
             <input type="text" id="deliveryName" class="form-control" style="background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.1); padding: 1.2rem;" placeholder="Your Name" required>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;">
             <input type="tel" id="deliveryPhone" class="form-control" style="background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.1); padding: 1.2rem;" placeholder="Phone Number" required>
          </div>
          <div class="form-group" style="margin-bottom: 1.5rem;">
             <textarea id="deliveryAddress" class="form-control" style="background: rgba(255,255,255,0.03); border: 1.5px solid rgba(255,255,255,0.1); padding: 1.2rem; height: 120px; resize: none;" placeholder="Detailed Home Address / Landmark" required></textarea>
          </div>
          
          <button type="submit" class="checkout-btn">Confirm Order ➔</button>
        </form>
      `;
    }
    else if (this.currentCheckoutStep === 4) {
      const orderId = this.lastOrderId || 'NAV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
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

  async startTracking(orderId) {
    if (this.trackingInterval) clearInterval(this.trackingInterval);
    this.currentStatus = null;
    this.maxTrackingNode = 0;

    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const modalBody = document.getElementById('checkoutBody');
    modalBody.innerHTML = `
      <div class="tracking-screen">
        <h2 class="checkout-title">Order Tracking</h2>
        <p style="color: var(--text-muted); font-size: 0.9rem;">ID: ${orderId}</p>
        
        <div class="tracking-timeline">
          <div class="tracking-progress" id="trackProgress"></div>
          
          <div class="tracking-node" id="node1">
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

        <div class="bike-container" id="bikeContainer">
          <div class="bike-icon">🛵</div>
        </div>

        <div id="trackingStatus" style="margin-top: 2rem; font-weight: 600; font-size: 1.1rem; color: var(--accent-color);">
          Fetching order status...
        </div>

        <button class="checkout-btn hidden" id="finishTrackBtn" style="margin-top: 3rem;" onclick="app.finishCheckout()">
          Enjoy Your Food! 🍔
        </button>
      </div>
    `;

    // Polling function
    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://restaurant-99en.onrender.com/api/orders/track/${orderId}`);
        const data = await response.json();
        this.updateTrackingUI(data.status);

        if (data.status === 'Arrived' || data.status === 'Delivered') {
          clearInterval(this.trackingInterval);
        }
      } catch (err) {
        console.error('Tracking Error:', err);
      }
    };

    // First fetch
    await fetchStatus();

    // Poll every 5 seconds
    this.trackingInterval = setInterval(fetchStatus, 5000);
  },

  updateTrackingUI(status) {
    if (status === this.currentStatus) return;
    this.currentStatus = status;

    const progress = document.getElementById('trackProgress');
    const statusText = document.getElementById('trackingStatus');
    const bikeIcon = document.querySelector('.bike-icon');

    const nodes = {
      // Stage 1: Order Placed
      'Pending': { width: '0%', node: 1, bikePos: '5%', text: 'Order has been received!', color: 'var(--accent-color)' },
      'Confirmed': { width: '0%', node: 1, bikePos: '5%', text: 'Order is confirmed!', color: 'var(--accent-color)' },
      'Order Placed': { width: '0%', node: 1, bikePos: '5%', text: 'Order has been received!', color: 'var(--accent-color)' },

      // Stage 2: Preparing
      'Preparing': { width: '33%', node: 2, bikePos: '33%', text: 'Chef is preparing your delicious meal...', color: 'var(--primary-color)' },

      // Stage 3: Delivery
      'Shipped': { width: '66%', node: 3, bikePos: '66%', text: 'Our delivery partner is on the way!', color: 'var(--accent-color)' },
      'Delivery': { width: '66%', node: 3, bikePos: '66%', text: 'Our delivery partner is on the way!', color: 'var(--accent-color)' },
      'Out for Delivery': { width: '66%', node: 3, bikePos: '66%', text: 'Our delivery partner is on the way!', color: 'var(--accent-color)' },

      // Stage 4: Arrived
      'Arrived': { width: '100%', node: 4, bikePos: '90%', text: 'Order Arrived! Please collect your food.', color: 'var(--success-color)' },
      'Delivered': { width: '100%', node: 4, bikePos: '90%', text: 'Order Delivered! Enjoy your food.', color: 'var(--success-color)' }
    };

    const config = nodes[status] || nodes['Confirmed'];

    // Prevent going backward if user specifically requested linear progress
    if (this.maxTrackingNode && config.node < this.maxTrackingNode) return;
    this.maxTrackingNode = config.node;

    // Reset pulses
    document.querySelectorAll('.tracking-node').forEach(n => n.classList.remove('active', 'pulse'));

    // Set active nodes up to current
    for (let i = 1; i <= config.node; i++) {
      const node = document.getElementById(`node${i}`);
      if (node) {
        node.classList.add('active');
        if (i === config.node && i < 4) node.classList.add('pulse');
      }
    }

    if (progress) progress.style.width = config.width;
    if (statusText) {
      statusText.innerText = config.text;
      statusText.style.color = config.color;
    }

    // Move Bike
    if (bikeIcon) {
      bikeIcon.style.left = config.bikePos;
      if (status !== 'Arrived' && status !== 'Delivered') {
        bikeIcon.classList.add('riding');
      } else {
        bikeIcon.classList.remove('riding');
      }
    }

    if (status === 'Arrived' || status === 'Delivered') {
      const btn = document.getElementById('finishTrackBtn');
      const container = document.getElementById('bikeContainer');
      if (btn) btn.classList.remove('hidden');
      if (container) {
        // Keep it visible but stop riding
        bikeIcon.classList.remove('riding');
      }
      this.celebrate();
    }
  },

  celebrate() {
    // Basic celebration effect without library
    const icon = document.querySelector('.success-icon') || { style: {} };
    icon.innerText = '🎊';
  },

  renderUserStats(orderCount = 0) {
    // Simulated user stats combined with real order count
    const stats = {
      orders: orderCount,
      bookings: 0,
      loyaltyPoints: orderCount * 50,
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

  renderOrders(orders) {
    if (!orders || orders.length === 0) {
      return `
        <div class="empty-state" style="background: rgba(255,255,255,0.03); border-radius: 15px; padding: 2rem;">
          <div class="empty-state-icon">🛍️</div>
          <p class="empty-state-text">No orders yet. Ready to taste something new?</p>
          <button class="checkout-btn" style="width: auto; margin-top: 1rem; padding: 0.8rem 2rem;" onclick="app.navigateHome()">Browse Menu</button>
        </div>
      `;
    }

    return orders.map(order => `
      <div class="order-card" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 15px; padding: 1.5rem; margin-bottom: 1rem;">
        <div class="order-header" style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <div>
            <div style="font-weight: 700; color: var(--accent-color); font-size: 1.1rem;">#${order.orderId}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">${new Date(order.createdAt).toLocaleDateString()}</div>
          </div>
          <span class="status-badge" style="background: ${['Delivered', 'Arrived'].includes(order.status) ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)'}; color: ${['Delivered', 'Arrived'].includes(order.status) ? '#4caf50' : '#ff9800'}; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">
            ${order.status}
          </span>
        </div>
        <div class="order-items" style="margin-bottom: 1rem;">
          ${order.items.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 0.95rem; margin-bottom: 0.3rem;">
              <span>${item.name} <span style="color: var(--text-muted)">x${item.quantity}</span></span>
              <span>${item.price}</span>
            </div>
          `).join('')}
        </div>
        <div class="order-footer" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem;">
          <div style="font-weight: 700; font-size: 1.1rem;">₹${order.totalAmount}</div>
          <button class="track-btn" style="background: var(--accent-gradient); color: white; border: none; padding: 6px 15px; border-radius: 8px; font-size: 0.85rem; cursor: pointer;" onclick="app.trackOrder('${order.orderId}')">
            ${['Delivered', 'Arrived'].includes(order.status) ? 'View Details' : 'Track Order'}
          </button>
        </div>
      </div>
    `).join('');
  },

  async trackOrder(orderId) {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.remove('hidden');
      this.startTracking(orderId);
    }
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
    for (const place of window.restaurantData.places) {
      const rest = place.restaurants.find(r => r.id === id);
      if (rest) return rest;
    }
    return null;
  },

  nextCheckoutStep() {
    this.currentCheckoutStep++;
    this.renderCheckout();
  },

  checkoutData: {},
  captureDeliveryDetails() {
    this.checkoutData.deliveryAddress = {
      name: document.getElementById('deliveryName').value,
      phone: document.getElementById('deliveryPhone').value,
      address: document.getElementById('deliveryAddress').value
    };
    this.placeOrder();
  },

  selectPayment(el) {
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
    el.classList.add('active');

    const method = el.querySelector('div div').innerText.trim();
    this.checkoutData.paymentMethod = method;
    console.log("Payment Selected:", method);

    // If COD, go to Address (Step 3), If UPI go to Verification (Step 2)
    if (method === 'Cash on Delivery') {
      this.currentCheckoutStep = 3;
    } else if (method === 'Credit / Debit Card') {
      this.currentCheckoutStep = 3;
    } else if (method.includes('UPI')) {
      this.currentCheckoutStep = 2;
    } else {
      this.currentCheckoutStep = 3; // Default to address
    }
    this.renderCheckout();
  },

  verifyUPI() {
    const id = document.getElementById('upiId').value;
    if (id && id.includes('@')) {
      this.showToast('UPI ID Verified! ✅');
      setTimeout(() => this.nextCheckoutStep(), 500);
    } else {
      this.showToast('Please enter a valid UPI ID! ⚠️');
    }
  },

  async placeOrder() {
    const orderId = 'NAV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    this.lastOrderId = orderId;
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      this.showToast('Please login to place an order! ⚠️');
      this.closeCheckout();
      this.showLoginPage();
      return;
    }

    const orderData = {
      user: user.id,
      items: this.cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        restaurantId: item.restaurantId
      })),
      totalAmount: this.calculateTotal(),
      deliveryAddress: this.checkoutData.deliveryAddress,
      paymentMethod: this.checkoutData.paymentMethod || 'Cash on Delivery',
      orderId: orderId
    };

    // Stripe Payment Flow
    if (this.checkoutData.paymentMethod === 'Credit / Debit Card') {
      try {
        this.showToast('Redirecting to secure payment... 💳');

        const response = await fetch('https://restaurant-99en.onrender.com/api/payments/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: this.cart,
            success_url: window.location.origin + window.location.pathname + '#/dashboard?payment=success',
            cancel_url: window.location.origin + window.location.pathname + '#/cart'
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create payment session');
        }

        const session = await response.json();

        // Save order as 'Pending' first
        await fetch('https://restaurant-99en.onrender.com/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...orderData, status: 'Pending' })
        });

        const stripe = Stripe(this.stripePublicKey);
        await stripe.redirectToCheckout({ sessionId: session.id });
        return;
      } catch (err) {
        console.error('Stripe Error:', err);
        this.showToast(`Payment error: ${err.message}. 🛠️`);
        return;
      }
    }

    // Standard COD Flow
    try {
      const response = await fetch('https://restaurant-99en.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        this.currentCheckoutStep = 4;
        this.renderCheckout();
        this.showToast('Order placed successfully! 🎁');

        // Clear cart
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
      } else {
        this.showToast('Failed to place order. ❌');
      }
    } catch (err) {
      console.error('Order Error:', err);
      this.showToast('Server connection error. 🛠️');
    }
  },


  calculateTotal() {
    let total = this.cart.reduce((sum, item) => sum + (parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity), 0);
    return total + 40; // Including delivery fee
  },

  finishCheckout() {
    this.closeCheckout();
    if (this.currentView === 'dashboard') {
      this.showDashboardPage();
    } else {
      this.navigateHome();
    }
  },

  closeCheckout() {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval);
      this.trackingInterval = null;
    }
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
  },

  // ========================================
  // INTERACTIVE MAP LOGIC
  // ========================================
  map: null,
  markers: [],

  initMap(containerId, coords, zoom, markersData = []) {
    if (!L) return;

    // Cleanup existing map
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    this.map = L.map(containerId).setView(coords, zoom);

    // Add Tile Layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add Markers
    this.markers = [];
    markersData.forEach(data => {
      const marker = L.marker(data.coords).addTo(this.map);

      const popupContent = `
        <div class="map-popup-card">
          <h3 class="map-popup-title">${data.name}</h3>
          <p style="margin:0; font-size:0.8rem; color:var(--text-secondary);">${data.description || data.cuisine || ""}</p>
          <a href="javascript:void(0)" onclick="${data.onClick}" class="map-popup-link">
            ${data.linkText} ➔
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      this.markers.push(marker);
    });

    // Fix for map not loading properly in hidden/dynamic containers
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  },

  // ========================================
  // SPLIT BILL LOGIC
  // ========================================
  splitParticipants: ['Me'],
  splitAssignments: {}, // { itemId: ['Me', 'Rahul'] }

  openSplitBill() {
    const modal = document.getElementById('splitBillModal');
    if (!modal) return;

    // Reset state
    this.splitParticipants = ['Me'];
    this.splitAssignments = {};

    // Initialize assignments with 'Me' for all items
    this.cart.forEach(item => {
      this.splitAssignments[item.cartId] = ['Me'];
    });

    this.renderSplitParticipants();
    document.getElementById('splitStep1').classList.remove('hidden');
    document.getElementById('splitStep2').classList.add('hidden');
    document.getElementById('splitStep3').classList.add('hidden');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  },

  closeSplitBill() {
    const modal = document.getElementById('splitBillModal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  },

  addSplitParticipant() {
    const input = document.getElementById('splitNameInput');
    const name = input.value.trim();

    if (name && !this.splitParticipants.includes(name)) {
      this.splitParticipants.push(name);
      input.value = '';
      this.renderSplitParticipants();
    }
  },

  removeSplitParticipant(name) {
    if (name === 'Me') return; // Cannot remove self
    this.splitParticipants = this.splitParticipants.filter(p => p !== name);

    // Remove from assignments
    Object.keys(this.splitAssignments).forEach(itemId => {
      this.splitAssignments[itemId] = this.splitAssignments[itemId].filter(p => p !== name);
      // Ensure at least someone is assigned (fallback to Me)
      if (this.splitAssignments[itemId].length === 0) {
        this.splitAssignments[itemId] = ['Me'];
      }
    });

    this.renderSplitParticipants();
  },

  renderSplitParticipants() {
    const container = document.getElementById('splitParticipants');
    container.innerHTML = this.splitParticipants.map(name => `
      <div class="participant-chip">
        ${name}
        ${name !== 'Me' ? `<span class="remove-btn" onclick="app.removeSplitParticipant('${name}')">×</span>` : ''}
      </div>
    `).join('');
  },

  nextSplitStep() {
    if (this.splitParticipants.length < 2) {
      this.showToast("Add at least one friend to split with! 👯‍♂️");
      return;
    }
    document.getElementById('splitStep1').classList.add('hidden');
    document.getElementById('splitStep2').classList.remove('hidden');
    this.renderSplitItems();
  },

  prevSplitStep() {
    document.getElementById('splitStep2').classList.add('hidden');
    document.getElementById('splitStep1').classList.remove('hidden');
  },

  renderSplitItems() {
    const list = document.getElementById('splitItemsList');
    list.innerHTML = this.cart.map(item => `
      <div class="split-item-row">
        <div class="split-item-header">
          <span>${item.name} (x${item.quantity})</span>
          <span>${item.price}</span>
        </div>
        <div class="split-assignees">
          ${this.splitParticipants.map(person => {
      const isAssigned = this.splitAssignments[item.cartId]?.includes(person);
      return `
              <div class="assign-chip ${isAssigned ? 'selected' : ''}" 
                   onclick="app.toggleSplitAssignment('${item.cartId}', '${person}')">
                ${person}
              </div>
            `;
    }).join('')}
        </div>
      </div>
    `).join('');
  },

  toggleSplitAssignment(itemId, person) {
    if (!this.splitAssignments[itemId]) this.splitAssignments[itemId] = [];

    const assigned = this.splitAssignments[itemId];
    if (assigned.includes(person)) {
      // Remove
      if (assigned.length > 1) { // Prevent removing last person
        this.splitAssignments[itemId] = assigned.filter(p => p !== person);
      } else {
        this.showToast("Item must be assigned to at least one person!");
      }
    } else {
      // Add
      this.splitAssignments[itemId].push(person);
    }
    this.renderSplitItems();
  },

  calculateSplitAndShow() {
    const breakdown = {};
    this.splitParticipants.forEach(p => breakdown[p] = 0);

    // Calculate Item Splits
    this.cart.forEach(item => {
      const price = parseInt(item.price.replace(/[^\d]/g, '')) * item.quantity;
      const assignedPeople = this.splitAssignments[item.cartId] || ['Me'];
      const splitAmount = price / assignedPeople.length;

      assignedPeople.forEach(person => {
        breakdown[person] += splitAmount;
      });
    });

    // Add Delivery / Tax (Split equally)
    // Assuming standard ₹40 delivery for now, or check logic
    const deliveryFee = 40;
    const feePerPerson = deliveryFee / this.splitParticipants.length;

    // Render Results
    const resultsContainer = document.getElementById('splitResults');
    let resultsHTML = '';

    Object.keys(breakdown).forEach(person => {
      const totalShare = breakdown[person] + feePerPerson;
      resultsHTML += `
        <div class="split-result-row">
          <span>${person}</span>
          <span>₹${Math.ceil(totalShare)} <small style="color:var(--text-muted)">(+₹${Math.ceil(feePerPerson)} fee)</small></span>
        </div>
      `;
    });

    // Total Row
    const grandTotal = Object.values(breakdown).reduce((a, b) => a + b, 0) + deliveryFee;
    resultsHTML += `
      <div class="split-result-row">
        <span>Total Bill</span>
        <span>₹${Math.ceil(grandTotal)}</span>
      </div>
    `;

    resultsContainer.innerHTML = resultsHTML;

    document.getElementById('splitStep3').classList.remove('hidden');
  },
};


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

