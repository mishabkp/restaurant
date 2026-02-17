const adminPortal = {
    isLoggedIn: false,
    orders: [],

    init() {
        const admin = localStorage.getItem('adminUser');
        if (admin) {
            this.isLoggedIn = true;
            document.getElementById('adminAuth').classList.add('hidden');
            document.getElementById('adminSidebar').classList.remove('hidden');
            document.getElementById('adminContent').classList.remove('hidden');

            this.loadDashboard();
            this.fetchOrders();
        }
    },

    switchPage(pageId, navEl) {
        // Update Sidebar
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        navEl.classList.add('active');

        // Update Pages
        document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
        document.getElementById(pageId + 'Page').classList.add('active');

        // Load specific content if needed
        if (pageId === 'dashboard') this.loadDashboard();
        if (pageId === 'orders') this.fetchOrders();
        if (pageId === 'menu') this.fetchMenuData();
        if (pageId === 'analytics') this.fetchAnalytics();
        if (pageId === 'reviews') this.fetchReviews();
        if (pageId === 'users') this.fetchUsers();
        if (pageId === 'discovery') this.fetchDiscoveryData();
    },

    // ==================== DISCOVERY MANAGEMENT ====================
    async fetchDiscoveryData() {
        const storiesBody = document.getElementById('storiesBody');
        const galleryBody = document.getElementById('galleryBody');
        storiesBody.innerHTML = '<tr><td colspan="5">Loading stories...</td></tr>';
        galleryBody.innerHTML = '<tr><td colspan="5">Loading gallery...</td></tr>';

        try {
            const [storiesResp, galleryResp] = await Promise.all([
                fetch('https://restaurant-99en.onrender.com/api/discovery/stories'),
                fetch('https://restaurant-99en.onrender.com/api/discovery/gallery')
            ]);
            const stories = await storiesResp.json();
            const gallery = await galleryResp.json();
            this.renderStoriesTable(stories);
            this.renderGalleryTable(gallery);
        } catch (err) {
            console.error('Discovery fetch error:', err);
            // Fallback to local data
            if (window.restaurantData) {
                this.renderStoriesTable(window.restaurantData.foodStories || []);
                this.renderGalleryTable(window.restaurantData.hiddenGems || []);
            }
        }
    },

    renderStoriesTable(stories) {
        const body = document.getElementById('storiesBody');
        body.innerHTML = stories.map(s => `
            <tr>
                <td><img src="${s.image}" alt="${s.title}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 8px;"></td>
                <td><b>${s.title}</b><br><small style="color: var(--text-muted);">${(s.excerpt || '').substring(0, 50)}...</small></td>
                <td>${s.author || '-'}</td>
                <td><span style="background: rgba(0,242,254,0.1); padding: 0.2rem 0.6rem; border-radius: 5px; font-size: 0.75rem;">${s.category || '-'}</span></td>
                <td>
                    <button class="nav-btn" onclick="adminPortal.editStory(${s.id})" style="font-size: 0.7rem; margin-right: 0.5rem;">✏️ Edit</button>
                    <button class="logout-btn" onclick="adminPortal.deleteStory(${s.id})" style="padding: 0.3rem 0.6rem; font-size: 0.7rem; background: rgba(255,0,0,0.1); color: #ff3d71;">🗑️</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="5" style="text-align:center;">No stories yet. Add your first story!</td></tr>';
    },

    renderGalleryTable(items) {
        const body = document.getElementById('galleryBody');
        body.innerHTML = items.map(g => `
            <tr>
                <td><img src="${g.image}" alt="${g.name}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 8px;"></td>
                <td><b>${g.name}</b></td>
                <td>${g.location || '-'}</td>
                <td><span style="background: rgba(0,242,254,0.1); padding: 0.2rem 0.6rem; border-radius: 5px; font-size: 0.75rem;">${g.tag || '-'}</span></td>
                <td>
                    <button class="nav-btn" onclick="adminPortal.editGalleryItem(${g.id})" style="font-size: 0.7rem; margin-right: 0.5rem;">✏️ Edit</button>
                    <button class="logout-btn" onclick="adminPortal.deleteGalleryItem(${g.id})" style="padding: 0.3rem 0.6rem; font-size: 0.7rem; background: rgba(255,0,0,0.1); color: #ff3d71;">🗑️</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="5" style="text-align:center;">No gallery items yet. Add your first gem!</td></tr>';
    },

    showAddStory() {
        document.getElementById('storyForm').reset();
        document.getElementById('editStoryId').value = '';
        document.getElementById('storyModalTitle').innerText = 'Add New Story';
        document.getElementById('storyModal').classList.remove('hidden');
    },

    async editStory(id) {
        try {
            const resp = await fetch(`https://restaurant-99en.onrender.com/api/discovery/stories/${id}`);
            const story = await resp.json();
            document.getElementById('editStoryId').value = story.id;
            document.getElementById('storyTitle').value = story.title;
            document.getElementById('storyExcerpt').value = story.excerpt || '';
            document.getElementById('storyContent').value = story.content || '';
            document.getElementById('storyAuthor').value = story.author || '';
            document.getElementById('storyCategory').value = story.category || '';
            document.getElementById('storyImage').value = story.image || '';
            document.getElementById('storyDate').value = story.date || '';
            document.getElementById('storyModalTitle').innerText = 'Edit Story';
            document.getElementById('storyModal').classList.remove('hidden');
        } catch (err) {
            this.showToast('Failed to load story details');
        }
    },

    async saveStory(e) {
        e.preventDefault();
        const editId = document.getElementById('editStoryId').value;
        const data = {
            title: document.getElementById('storyTitle').value,
            excerpt: document.getElementById('storyExcerpt').value,
            content: document.getElementById('storyContent').value,
            author: document.getElementById('storyAuthor').value,
            category: document.getElementById('storyCategory').value,
            image: document.getElementById('storyImage').value,
            date: document.getElementById('storyDate').value || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        };

        try {
            const url = editId
                ? `https://restaurant-99en.onrender.com/api/discovery/stories/${editId}`
                : 'https://restaurant-99en.onrender.com/api/discovery/stories';
            const resp = await fetch(url, {
                method: editId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (resp.ok) {
                this.showToast(editId ? 'Story Updated! ✅' : 'New Story Added! 📖');
                document.getElementById('storyModal').classList.add('hidden');
                this.fetchDiscoveryData();
            } else {
                throw new Error('Save failed');
            }
        } catch (err) {
            this.showToast('Failed to save story ❌');
        }
    },

    async deleteStory(id) {
        if (!confirm('Delete this story?')) return;
        try {
            const resp = await fetch(`https://restaurant-99en.onrender.com/api/discovery/stories/${id}`, { method: 'DELETE' });
            if (resp.ok) {
                this.showToast('Story deleted! 🗑️');
                this.fetchDiscoveryData();
            }
        } catch (err) {
            this.showToast('Failed to delete story');
        }
    },

    showAddGallery() {
        document.getElementById('galleryForm').reset();
        document.getElementById('editGalleryId').value = '';
        document.getElementById('galleryModalTitle').innerText = 'Add New Gem';
        document.getElementById('galleryModal').classList.remove('hidden');
    },

    async editGalleryItem(id) {
        try {
            const resp = await fetch('https://restaurant-99en.onrender.com/api/discovery/gallery');
            const items = await resp.json();
            const item = items.find(g => g.id === id);
            if (!item) throw new Error('Not found');
            document.getElementById('editGalleryId').value = item.id;
            document.getElementById('galleryName').value = item.name;
            document.getElementById('galleryLocation').value = item.location || '';
            document.getElementById('galleryTag').value = item.tag || '';
            document.getElementById('galleryImage').value = item.image || '';
            document.getElementById('galleryModalTitle').innerText = 'Edit Gallery Item';
            document.getElementById('galleryModal').classList.remove('hidden');
        } catch (err) {
            this.showToast('Failed to load gallery item');
        }
    },

    async saveGalleryItem(e) {
        e.preventDefault();
        const editId = document.getElementById('editGalleryId').value;
        const data = {
            name: document.getElementById('galleryName').value,
            location: document.getElementById('galleryLocation').value,
            tag: document.getElementById('galleryTag').value,
            image: document.getElementById('galleryImage').value
        };

        try {
            const url = editId
                ? `https://restaurant-99en.onrender.com/api/discovery/gallery/${editId}`
                : 'https://restaurant-99en.onrender.com/api/discovery/gallery';
            const resp = await fetch(url, {
                method: editId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (resp.ok) {
                this.showToast(editId ? 'Gallery Item Updated! ✅' : 'New Gem Added! 🖼️');
                document.getElementById('galleryModal').classList.add('hidden');
                this.fetchDiscoveryData();
            } else {
                throw new Error('Save failed');
            }
        } catch (err) {
            this.showToast('Failed to save gallery item ❌');
        }
    },

    async deleteGalleryItem(id) {
        if (!confirm('Delete this gallery item?')) return;
        try {
            const resp = await fetch(`https://restaurant-99en.onrender.com/api/discovery/gallery/${id}`, { method: 'DELETE' });
            if (resp.ok) {
                this.showToast('Gallery item deleted! 🗑️');
                this.fetchDiscoveryData();
            }
        } catch (err) {
            this.showToast('Failed to delete gallery item');
        }
    },


    async loadDashboard() {
        try {
            const statsResp = await fetch('https://restaurant-99en.onrender.com/api/admin/stats');
            const stats = await statsResp.json();

            const ordersResp = await fetch('https://restaurant-99en.onrender.com/api/admin/orders');
            const orders = await ordersResp.json();

            const placesResp = await fetch('https://restaurant-99en.onrender.com/api/restaurants/places');
            const places = await placesResp.json();

            // Update Stat Cards
            document.getElementById('statRevenue').innerText = `₹${stats.totalRevenue.toLocaleString()}`;
            document.getElementById('statOrders').innerText = stats.totalOrders;

            this.renderDashboardCharts(places, orders);
        } catch (err) {
            console.error('Dashboard Load Error:', err);
        }
    },

    renderDashboardCharts(places, orders) {
        // 1. Places Distribution Chart (Doughnut)
        const placesCtx = document.getElementById('placesChart').getContext('2d');
        if (window.pChart) window.pChart.destroy();

        window.pChart = new Chart(placesCtx, {
            type: 'doughnut',
            data: {
                labels: places.map(p => p.name),
                datasets: [{
                    data: places.map(p => p.restaurants?.length || 0),
                    backgroundColor: ['#00f2fe', '#4facfe', '#706fd3', '#ff3d71', '#fdb931', '#00ff88'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#fff' } }
                }
            }
        });

        // 2. Orders Status Chart (Bar)
        const ordersCtx = document.getElementById('ordersChart').getContext('2d');
        if (window.oChart) window.oChart.destroy();

        const statusCounts = orders.reduce((acc, curr) => {
            const status = curr.status || 'Pending';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        window.oChart = new Chart(ordersCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    label: 'Orders',
                    data: Object.values(statusCounts),
                    backgroundColor: 'rgba(0, 242, 254, 0.5)',
                    borderColor: '#00f2fe',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#fff' } },
                    x: { grid: { display: false }, ticks: { color: '#fff' } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    },

    async fetchMenuData() {
        const menuContent = document.getElementById('menuContent');
        menuContent.innerHTML = '<div class="loading-state">Loading restaurants...</div>';
        try {
            const response = await fetch('https://restaurant-99en.onrender.com/api/restaurants/places');
            if (response.ok) {
                const places = await response.json();
                window.restaurantData = { places: places }; // Update global data for sync
                this.renderMenuManagement(places);
            } else {
                throw new Error('Backend unresponsive');
            }
        } catch (err) {
            console.warn('Admin: Backend not available, using local data.js source.');
            if (window.restaurantData && window.restaurantData.places) {
                this.renderMenuManagement(window.restaurantData.places);
            } else {
                this.showToast('Error loading menu data!');
            }
        }
    },

    async renderMenuManagement(places) {
        const menuContent = document.getElementById('menuContent');
        menuContent.innerHTML = `
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                <button class="checkout-btn" style="padding: 0.5rem 1.5rem;" onclick="adminPortal.showAddRestaurant()">+ Add Restaurant</button>
            </div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Restaurants</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${places.map(place => `
                            <tr>
                                <td><b>${place.name}</b></td>
                                <td id="rest-list-${place.id}">Loading...</td>
                                <td>
                                    <button class="nav-btn" title="Edit Place">✏️</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        // Fetch restaurants for each place
        for (const place of places) {
            this.loadRestaurantsForPlace(place.id);
        }
    },

    async loadRestaurantsForPlace(placeId) {
        const listEl = document.getElementById(`rest-list-${placeId}`);
        try {
            const resp = await fetch(`https://restaurant-99en.onrender.com/api/restaurants/place/${placeId}`);
            if (resp.ok) {
                const rests = await resp.json();
                this.renderRestaurantsList(listEl, rests);
            } else {
                throw new Error('Backend unresponsive');
            }
        } catch (err) {
            console.warn(`Admin: Falling back to local restaurants for place ${placeId}`);
            if (window.restaurantData && window.restaurantData.places) {
                const place = window.restaurantData.places.find(p => p.id === placeId);
                if (place) {
                    this.renderRestaurantsList(listEl, place.restaurants);
                } else {
                    listEl.innerHTML = 'Error';
                }
            } else {
                listEl.innerHTML = 'Error';
            }
        }
    },

    renderRestaurantsList(container, rests) {
        container.innerHTML = rests.map(r => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: rgba(255,255,255,0.02); margin-bottom: 0.5rem; border-radius: 5px;">
                <span>${r.name} (${r.cuisine})</span>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="nav-btn" onclick="adminPortal.editRestaurant(${r.id})" style="font-size: 0.7rem;">✏️ Edit</button>
                    <button class="nav-btn" onclick="adminPortal.manageMenu(${r.id})" style="font-size: 0.7rem;">🍴 Menu</button>
                </div>
            </div>
        `).join('') || 'No restaurants';
    },

    async editRestaurant(restaurantId) {
        try {
            let rest;
            try {
                const resp = await fetch(`https://restaurant-99en.onrender.com/api/restaurants/${restaurantId}`);
                rest = await resp.json();
            } catch (e) {
                // Fallback to local
                if (window.restaurantData) {
                    window.restaurantData.places.forEach(p => {
                        const r = p.restaurants.find(res => res.id === restaurantId);
                        if (r) rest = r;
                    });
                }
            }

            if (!rest) throw new Error('Restaurant not found');

            // Populate form with existing data
            document.getElementById('restName').value = rest.name;
            document.getElementById('restCuisine').value = rest.cuisine;
            document.getElementById('restImage').value = rest.image;
            document.getElementById('editRestId').value = rest.id;
            document.getElementById('restaurantModal').classList.remove('hidden');
        } catch (err) {
            this.showToast('Failed to load restaurant details');
        }
    },

    async manageMenu(restaurantId) {
        this.currentManagingRest = restaurantId;
        const modal = document.getElementById('foodModal');
        const title = document.getElementById('foodModalTitle');
        const body = document.getElementById('foodItemsBody');

        modal.classList.remove('hidden');
        body.innerHTML = '<tr><td colspan="4">Loading items...</td></tr>';

        try {
            const resp = await fetch(`https://restaurant-99en.onrender.com/api/restaurants/${restaurantId}`);
            if (resp.ok) {
                const rest = await resp.json();
                title.innerText = `Manage Menu: ${rest.name}`;
                this.renderFoodItems(rest.foodItems);
            } else {
                throw new Error('Fallback to local');
            }
        } catch (err) {
            console.warn("Using local data for menu items");
            if (window.restaurantData && window.restaurantData.places) {
                let foundRest;
                window.restaurantData.places.forEach(p => {
                    const r = p.restaurants.find(res => res.id === restaurantId);
                    if (r) foundRest = r;
                });
                if (foundRest) {
                    title.innerText = `Manage Menu: ${foundRest.name} (Local)`;
                    this.renderFoodItems(foundRest.foodItems);
                }
            }
        }
    },

    renderFoodItems(items) {
        const body = document.getElementById('foodItemsBody');
        body.innerHTML = items.map((item, idx) => `
            <tr>
                <td><b>${item.name}</b><br><small>${item.category || '<span style="color:red">NULL</span>'} - ${item.description || ''}</small></td>
                <td>${item.price}</td>
                <td>${item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}</td>
                <td>
                    <button class="nav-btn" onclick="adminPortal.editFood(${idx})" style="padding: 0.3rem 0.6rem; font-size: 0.7rem; margin-right: 0.5rem;">✏️ Edit</button>
                    <button class="logout-btn" onclick="adminPortal.deleteFood(${idx})" style="padding: 0.3rem 0.6rem; font-size: 0.7rem; background: rgba(255,0,0,0.1); color: #ff3d71;">Delete</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="4" style="text-align:center;">No items added yet.</td></tr>';
    },

    async editFood(index) {
        try {
            let item;
            try {
                const resp = await fetch(`https://restaurant-99en.onrender.com/api/restaurants/${this.currentManagingRest}`);
                const rest = await resp.json();
                item = rest.foodItems[index];
            } catch (e) {
                // Fallback to local
                if (window.restaurantData) {
                    let foundRest;
                    window.restaurantData.places.forEach(p => {
                        const r = p.restaurants.find(res => res.id === this.currentManagingRest);
                        if (r) foundRest = r;
                    });
                    item = foundRest.foodItems[index];
                }
            }

            if (!item) throw new Error('Item not found');

            // Close the food list modal first
            document.getElementById('foodModal').classList.add('hidden');

            // Populate form
            document.getElementById('foodName').value = item.name;
            document.getElementById('foodPrice').value = item.price;
            document.getElementById('foodCategory').value = item.category || '';
            document.getElementById('foodDesc').value = item.description || '';
            document.getElementById('foodImage').value = item.image;
            document.getElementById('foodIsVeg').checked = item.isVeg;
            document.getElementById('editFoodIndex').value = index;
            document.getElementById('foodEntryTitle').innerText = 'Edit Food Item';
            document.getElementById('foodItemEntryModal').classList.remove('hidden');
        } catch (err) {
            this.showToast('Failed to load item details');
        }
    },

    async deleteFood(index) {
        if (!confirm('Delete this food item?')) return;
        try {
            const resp = await fetch(`https://restaurant-99en.onrender.com/api/restaurants/${this.currentManagingRest}`);
            const rest = await resp.json();

            rest.foodItems.splice(index, 1);

            const updateResp = await fetch(`https://restaurant-99en.onrender.com/api/admin/restaurants/${this.currentManagingRest}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ foodItems: rest.foodItems })
            });

            if (updateResp.ok) {
                this.showToast('Item removed! 🗑️');
                this.manageMenu(this.currentManagingRest);
            }
        } catch (err) {
            this.showToast('Failed to delete item');
        }
    },

    showAddFood() {
        document.getElementById('foodItemForm').reset();
        document.getElementById('editFoodIndex').value = '';
        document.getElementById('foodEntryTitle').innerText = 'Add New Food Item';
        document.getElementById('foodItemEntryModal').classList.remove('hidden');
    },

    async saveFoodItem(e) {
        e.preventDefault();

        const foodData = {
            name: document.getElementById('foodName').value,
            price: document.getElementById('foodPrice').value,
            category: document.getElementById('foodCategory').value,
            description: document.getElementById('foodDesc').value,
            image: document.getElementById('foodImage').value,
            isVeg: document.getElementById('foodIsVeg').checked
        };

        const editIndex = document.getElementById('editFoodIndex').value;

        try {
            const resp = await fetch(`https://restaurant-99en.onrender.com/api/restaurants/${this.currentManagingRest}`);
            const rest = await resp.json();

            if (editIndex !== '') {
                // Edit existing item
                rest.foodItems[parseInt(editIndex)] = foodData;
            } else {
                // Add new item
                rest.foodItems.push(foodData);
            }

            const updateResp = await fetch(`https://restaurant-99en.onrender.com/api/admin/restaurants/${this.currentManagingRest}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ foodItems: rest.foodItems })
            });

            if (updateResp.ok) {
                this.showToast(editIndex !== '' ? 'Item Updated! ✅' : 'New Food Added! 🍱');
                this.closeFoodEntryModal();
                this.manageMenu(this.currentManagingRest);
            }
        } catch (err) {
            this.showToast('Failed to save food item');
        }
    },

    closeFoodEntryModal() {
        document.getElementById('foodItemEntryModal').classList.add('hidden');
        // Reopen the food list modal
        if (this.currentManagingRest) {
            document.getElementById('foodModal').classList.remove('hidden');
        }
    },

    showAddRestaurant() {
        document.getElementById('restaurantForm').reset();
        document.getElementById('editRestId').value = '';
        if (document.getElementById('restPlaceId')) document.getElementById('restPlaceId').value = '';
        document.getElementById('restaurantModal').classList.remove('hidden');
    },

    async saveRestaurant(e) {
        e.preventDefault();
        const data = {
            name: document.getElementById('restName').value,
            cuisine: document.getElementById('restCuisine').value,
            image: document.getElementById('restImage').value,
            id: document.getElementById('editRestId').value || Math.floor(Math.random() * 10000)
        };

        const placeId = document.getElementById('restPlaceId')?.value;
        const isEdit = document.getElementById('editRestId').value !== '';

        try {
            // 1. Save/Update Restaurant
            const restUrl = isEdit
                ? `https://restaurant-99en.onrender.com/api/admin/restaurants/${data.id}`
                : 'https://restaurant-99en.onrender.com/api/admin/restaurants';

            const restResp = await fetch(restUrl, {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!restResp.ok) throw new Error('Failed to save restaurant');

            // 2. If it's a new restaurant, we MUST link it to a Place
            if (!isEdit && placeId) {
                const linkResp = await fetch(`https://restaurant-99en.onrender.com/api/admin/places/${placeId}/link-restaurant`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ restaurantId: data.id })
                });
                if (!linkResp.ok) throw new Error('Failed to link restaurant to place');
            }

            this.showToast('✅ Restaurant saved and synced!');
            this.closeModals();
            this.fetchMenuData(); // Refresh list
        } catch (err) {
            console.error(err);
            this.showToast('❌ Error: ' + err.message);
        }
    },

    closeModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
    },

    async fetchAnalytics() {
        const content = document.getElementById('analyticsContent');
        content.innerHTML = '<div class="loading-state">Calculating stats...</div>';
        try {
            const resp = await fetch('https://restaurant-99en.onrender.com/api/admin/stats');
            const stats = await resp.json();
            content.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <div class="stat-card" style="background: var(--card-bg); padding: 2rem; border-radius: 15px; border: 1px solid var(--card-border); text-align: center;">
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">TOTAL REVENUE</div>
                        <div style="font-size: 2rem; font-weight: 800; color: #00ff88;">${stats.totalRevenue}</div>
                    </div>
                    <div class="stat-card" style="background: var(--card-bg); padding: 2rem; border-radius: 15px; border: 1px solid var(--card-border); text-align: center;">
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">TOTAL ORDERS</div>
                        <div style="font-size: 2rem; font-weight: 800; color: var(--accent-color);">${stats.totalOrders}</div>
                    </div>
                    <div class="stat-card" style="background: var(--card-bg); padding: 2rem; border-radius: 15px; border: 1px solid var(--card-border); text-align: center;">
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">TOTAL USERS</div>
                        <div style="font-size: 2rem; font-weight: 800; color: #ff00ff;">${stats.totalUsers}</div>
                    </div>
                </div>
            `;
        } catch (err) {
            content.innerHTML = 'Error loading stats';
        }
    },

    async fetchReviews() {
        const content = document.getElementById('reviewsContent');
        content.innerHTML = '<div class="loading-state">Loading reviews...</div>';
        try {
            const resp = await fetch('https://restaurant-99en.onrender.com/api/admin/reviews');
            const reviews = await resp.json();
            content.innerHTML = `
                <div class="table-responsive" style="margin-top: 2rem;">
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reviews.map(rev => `
                                <tr>
                                    <td>${rev.userName}</td>
                                    <td>${'⭐'.repeat(rev.rating)}</td>
                                    <td style="max-width: 300px;">${rev.comment}</td>
                                    <td>
                                        <button class="logout-btn" onclick="adminPortal.deleteReview('${rev._id}')" style="padding: 0.3rem 0.6rem; font-size: 0.7rem;">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } catch (err) {
            content.innerHTML = 'Error loading reviews';
        }
    },

    async deleteReview(id) {
        if (!confirm('Are you sure you want to delete this review?')) return;
        try {
            const resp = await fetch(`https://restaurant-99en.onrender.com/api/admin/reviews/${id}`, { method: 'DELETE' });
            if (resp.ok) {
                this.showToast('Review deleted! 🗑️');
                this.fetchReviews();
            }
        } catch (err) {
            this.showToast('Failed to delete review');
        }
    },

    async fetchUsers() {
        const content = document.getElementById('usersContent');
        content.innerHTML = '<div class="loading-state">Loading users...</div>';
        try {
            const resp = await fetch('https://restaurant-99en.onrender.com/api/admin/users');
            const users = await resp.json();
            content.innerHTML = `
                <div class="table-responsive" style="margin-top: 2rem;">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${users.map(u => `
                                <tr>
                                    <td>${u.name}</td>
                                    <td>${u.email}</td>
                                    <td><span style="background: ${u.role === 'admin' ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.05)'}; padding: 0.2rem 0.5rem; border-radius: 5px; color: ${u.role === 'admin' ? '#ffd700' : 'inherit'}">${u.role}</span></td>
                                    <td>${new Date(u.createdAt).toLocaleDateString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } catch (err) {
            content.innerHTML = 'Error loading users';
        }
    },

    async login(e) {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPass').value;

        try {
            const response = await fetch('https://restaurant-99en.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (data.user.role === 'admin') {
                    localStorage.setItem('adminUser', JSON.stringify(data.user));
                    localStorage.setItem('adminToken', data.token);
                    this.showToast('Access Granted! 🔑');
                    location.reload();
                } else {
                    this.showToast('Access Denied. Admin only! ❌');
                }
            } else {
                this.showToast(data.msg || 'Login failed! ❌');
            }
        } catch (err) {
            this.showToast('Server connection error! 🛠️');
        }
    },

    logout() {
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
        location.reload();
    },

    async fetchOrders() {
        try {
            const response = await fetch('https://restaurant-99en.onrender.com/api/admin/orders');
            const data = await response.json();
            this.orders = data;
            this.renderOrders();
        } catch (err) {
            this.showToast('Error fetching orders! 🛠️');
        }
    },

    renderOrders() {
        const tbody = document.getElementById('ordersBody');
        document.getElementById('totalOrders').innerText = this.orders.length;

        if (this.orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No orders found.</td></tr>';
            return;
        }

        tbody.innerHTML = this.orders.map(order => `
            <tr>
                <td>
                    <div style="font-weight: 600;">${order.orderId}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">${new Date(order.createdAt).toLocaleString()}</div>
                </td>
                <td>
                    <b>${order.deliveryAddress?.name || 'User'}</b><br>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">${order.deliveryAddress?.phone || ''}</span>
                </td>
                <td style="font-size: 0.8rem;">
                    ${order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                </td>
                <td style="font-weight: 700; color: var(--accent-color);">₹${order.totalAmount}</td>
                <td>
                    <span class="status-badge" style="background: ${this.getStatusColor(order.status)}; padding: 0.3rem 0.6rem; border-radius: 5px; font-size: 0.75rem;">
                        ${order.status || 'Pending'}
                    </span>
                </td>
                <td>
                    <select onchange="adminPortal.updateStatus('${order.orderId}', this.value)">
                        <option value="">Update...</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivery">Out for Delivery</option>
                        <option value="Arrived">Arrived</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </td>
            </tr>
        `).join('');
    },

    async updateStatus(orderId, status) {
        if (!status) return;
        try {
            const response = await fetch(`https://restaurant-99en.onrender.com/api/admin/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                this.showToast(`Status updated to ${status}! ✅`);
                this.fetchOrders();
            }
        } catch (err) {
            this.showToast('Failed to update status. 🛠️');
        }
    },

    getStatusColor(status) {
        const colors = {
            'Pending': 'rgba(255, 171, 0, 0.2)',
            'Confirmed': 'rgba(0, 184, 217, 0.2)',
            'Preparing': 'rgba(102, 126, 234, 0.2)',
            'Delivery': 'rgba(255, 102, 0, 0.2)',
            'Arrived': 'rgba(54, 179, 126, 0.2)',
            'Delivered': 'rgba(54, 179, 126, 0.3)'
        };
        return colors[status] || 'rgba(255,255,255,0.1)';
    },

    showToast(msg) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.background = 'rgba(0, 242, 254, 0.9)';
        toast.style.color = 'black';
        toast.style.padding = '1rem 2rem';
        toast.style.borderRadius = '10px';
        toast.style.marginBottom = '1rem';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        toast.style.animation = 'fadeInUp 0.3s ease-out';
        toast.innerText = msg;
        document.getElementById('toastContainer').appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }
};

adminPortal.init();
