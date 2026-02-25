# 🎓 Presentation & Viva Guide

Use this guide to impress your teachers and evaluators during the project demo.

## 🎯 How to Present the "Wow" Factors

### 1. The "AI" Logic (Recommendation Engine)
*Highlight this when asked about technical complexity.*
- **What to say:** "We implemented a **Content-Based Filtering** logic. Instead of just static lists, the system profiles the user's interests (based on their selections) and ranks restaurants using a **weighted scoring algorithm**. For example, Cuisine has a higher weightage (3.5) than Recency (1.5) to ensure high-relevance matches."

### 2. Cinematic Page Transitions
*Showcase this while navigating the sidebar.*
- **What to say:** "To give the web app a native app feel, we integrated the **Native View Transitions API**. This allows DOM elements to morph and cross-fade smoothly during navigation, which is a cutting-edge feature in modern browsers."

### 3. Interactive Map & Async Data Handling
*Show the map on the Home page.*
- **What to say:** "We integrated **Leaflet.js** for spatial discovery. A technical challenge we solved was the synchronization of map rendering with asynchronous page transitions to ensure the map mounts perfectly every time its container is rendered."

---

## ❓ Potential Viva Questions

**Q: Why did you use Vanilla JavaScript instead of React?**
- **A:** "I wanted to demonstrate deep proficiency in **Core Web Standards (DOM API, Fetch API, CSS Variables)**. It ensures the application is extremely lightweight and fast without unnecessary library overhead."

**Q: How is the data stored?**
- **A:** "The data is served by a **Node.js/Express backend**. It uses a flexible architecture where data can be fetched from a live cloud database (on Render) while having a local fallback for offline-first resilience."

**Q: Is the design responsive?**
- **A:** "Yes, the entire design system is built using **CSS Flexbox and Grid** with a mobile-first approach, ensuring it looks premium on devices of all sizes."

---

## 📽️ Demo Workflow
1. **Start at Home:** Show the Video Hero and the smooth scroll.
2. **Open Smart Recommender:** Pick a Vibe and click "Get Match" to show the ML ranking.
3. **Navigate to Trends:** Show the charts and the "Trending Radar."
4. **Login as Admin:** Demonstrate how you can change a restaurant's status and see it update instantly.
5. **Checkout:** Show the premium payment/checkout flow.
