import { createRazorpayOrder } from '@/lib/payments';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    try {
        const { amount, currency } = req.body;
        const order = await createRazorpayOrder(amount, currency);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        // Mock response
        res.status(200).json({
            id: 'order_mock_123',
            currency: currency || 'INR',
            amount: (amount || 100) * 100,
        });
    }
}
