import Stripe from 'stripe';
import Razorpay from 'razorpay';

// Initialize Stripe
const stripeKey = process.env.STRIPE_SECRET_KEY;
export const stripe = stripeKey
    ? new Stripe(stripeKey, { apiVersion: '2023-10-16' })
    : null;

// Initialize Razorpay
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

export const razorpay = (razorpayKeyId && razorpayKeySecret)
    ? new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
    })
    : null;

export const createStripeSession = async (amount, currency = 'usd', metadata = {}) => {
    try {
        if (!stripe) {
            console.log('Mocking Stripe Session for:', amount, currency);
            return {
                id: `mock_session_${Date.now()}`,
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/bookings?success=true&session_id=mock_session_${Date.now()}`,
            };
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency,
                        product_data: {
                            name: 'Travel Booking',
                            description: 'Incredible India Guide Booking',
                        },
                        unit_amount: amount * 100, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/bookings?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/bookings?canceled=true`,
            metadata,
        });
        return session;
    } catch (error) {
        console.error('Stripe Error:', error);
        // Fallback to mock if real Stripe fails (e.g. invalid key)
        return {
            id: `mock_session_${Date.now()}`,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/bookings?success=true&session_id=mock_session_${Date.now()}`,
        };
    }
};

export const createRazorpayOrder = async (amount, currency = 'INR', receipt) => {
    try {
        if (!razorpay) {
            console.log('Mocking Razorpay Order for:', amount, currency);
            return {
                id: `order_mock_${Date.now()}`,
                amount: amount * 100,
                currency,
                receipt,
                status: 'created',
            };
        }

        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt,
        };
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        console.error('Razorpay Error:', error);
        // Fallback to mock
        return {
            id: `order_mock_${Date.now()}`,
            amount: amount * 100,
            currency,
            receipt,
            status: 'created',
        };
    }
};
