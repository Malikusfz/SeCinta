import bcrypt from 'bcrypt';

// TODO: implement actual DB logic
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        // TODO: fetch user by email and compare password
        // const user = await db.getUserByEmail(email);
        // const match = await bcrypt.compare(password, user.hashedPassword);
        return res.status(200).json({ message: 'User logged in', token: 'TODO' });
    }
    return res.status(405).json({ error: 'Method not allowed' });
} 