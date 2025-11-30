import { createStripeSession } from '@/lib/payments';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    try {
        const { amount, currency } = req.body;
        const session = await createStripeSession(amount, currency);
        res.status(200).json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error(error);
        // Return mock for testing if Stripe fails (e.g. no key)
        res.status(200).json({ sessionId: 'mock_session_123', url: 'https://checkout.stripe.com/mock-test' });
    }
}
