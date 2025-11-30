import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure global users array exists
    if (!global.users) {
        global.users = [
            { id: "1", name: "Demo User", email: "demo@example.com", password: "password123" }
        ];
    }

    // Check if user already exists
    if (global.users.find(u => u.email === email)) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password, // In a real app, hash this password!
    };

    global.users.push(newUser);

    return res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
}
