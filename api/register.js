import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// TODO: implement actual DB logic (e.g., Vercel KV or PostgreSQL)
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password, photoUrl } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const inviteCode = uuidv4();
        // TODO: save { name, email, hashedPassword, photoUrl, inviteCode } to database
        return res.status(200).json({ message: 'User registered', inviteCode });
    }
    return res.status(405).json({ error: 'Method not allowed' });
} 