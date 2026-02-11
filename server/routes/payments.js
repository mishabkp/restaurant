const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @route   POST /api/payments/create-checkout-session
// @desc    Create a Stripe checkout session
router.post('/create-checkout-session', async (req, res) => {
    const { items, success_url, cancel_url } = req.body;

    try {
        const line_items = items.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                },
                unit_amount: parseInt(item.price.replace(/[^\d]/g, '')) * 100, // Stripe expects amounts in paise
            },
            quantity: item.quantity,
        }));

        // Add delivery fee as a line item if needed, or handle in total. 
        // For simplicity, we add it here.
        line_items.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Fee',
                },
                unit_amount: 4000, // ₹40.00
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url,
            cancel_url,
        });

        res.json({ id: session.id });
    } catch (err) {
        console.error('Stripe Session Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
